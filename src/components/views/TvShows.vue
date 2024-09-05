<template>
  <div class="container my-8">
    <div v-for="tv_show in tv_shows" :key="tv_show.id">
      <div class="card card-frame" @click="viewTvShowDetail(tv_show.id)">

        <img class="card-img-left" alt :src="'https://image.tmdb.org/t/p/w500' + tv_show.poster_path" width="200" />
        <div class="card-body card-body-show mb-4">
          <h5>
            {{ tv_show.name }}
          </h5>
          <p>{{ truncate(tv_show.overview, 200) }}</p>
          <h2 class="media-rating" style="float:inline-end;">{{ $filters.voteAveragePercentage(tv_show.vote_average) }}</h2>
        </div>
      </div>
    </div>

    <div v-if="totalPages > 1" class="pagination">
      <nav class="paginate-center">
        <ul class="pagination">
          <li class="page-item">
            <button class="page-link" @click="fetchTvShows(currentPage - 1)" :disabled="currentPage === 1"
              aria-label="Previous">
              <i class="fa fa-arrow-left" aria-hidden="true"></i>
              <span class="sr-only">Previous</span>
            </button>
          </li>
          <span class="pagination-desc">Page {{ currentPage }} of {{ totalPages }}</span>
          <li class="page-item">
            <button class="page-link" @click="fetchTvShows(currentPage + 1)" :disabled="currentPage === totalPages"
              aria-label="Next">
              <i class="fa fa-arrow-right" aria-hidden="true"></i>
              <span class="sr-only">Next</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import api from '../../services/api';

export default {
  computed: {
    ...mapGetters(['tv_shows']),
  },
  data() {
    return {
      tv_shows: [],
      currentPage: 1,
      totalPages: 1,
      totalCount: 0
    };
  },
  methods: {
    truncate(text, length) {
      return text.length > length ? text.substring(0, length) + '...' : text;
    },
    async fetchTvShows(page) {
      try {
        const response = await api.get(`/tv_shows`, {
          params: { page }
        });
        this.tv_shows = response.data.data;
        this.currentPage = response.data.meta.current_page;
        this.totalPages = response.data.meta.total_pages;
        this.totalCount = response.data.meta.total_count;
      } catch (error) {
        console.error('Error fetching TV Shows:', error);
      }
    },
    viewTvShowDetail(id) {
      this.$router.push({ name: 'TvShowDetail', params: { id } });
    }
  },
  created() {
    this.fetchTvShows(this.currentPage);
  },
};
</script>

<style scoped>
.card {
  display: block;
  margin-left: auto;
  margin-top: 30px;
  margin-bottom: 20px;
  margin-right: auto;
  word-wrap: break-word;
}

.card:hover {
  filter: drop-shadow(1px 1px 1px grey);
  cursor: pointer;
}

.card-body-show {
  width: 85% !important;
  position: absolute;
  display: inline-block;
}

.card-img-left {
  width: 153px;
  height: auto;
  border-radius: 4px;
}
</style>