<template>
  <div class="container my-8">
    <div v-for="movie in movies" :key="movie.id">
      <div class="card card-frame" @click="viewMovieDetail(movie.id)">

        <img class="card-img-left" alt :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" width="200" />
        <div class="card-body card-body-movie mb-4">
          <h5>
            {{ movie.title }}
          </h5>
          <h6>{{ movie.tagline }}</h6>
          <p>{{ truncate(movie.overview, 200) }}</p>
          <h2 class="media-rating" style="float:inline-end;">{{ $filters.voteAveragePercentage(movie.vote_average) }}</h2>
        </div>
      </div>
    </div>

    <div v-if="totalPages > 1" class="pagination">
      <nav class="paginate-center">
        <ul class="pagination">
          <li class="page-item">
            <button class="page-link" @click="fetchMovies(currentPage - 1)" :disabled="currentPage === 1"
              aria-label="Previous">
              <i class="fa fa-arrow-left" aria-hidden="true"></i>
              <span class="sr-only">Previous</span>
            </button>
          </li>
          <span class="pagination-desc">Page {{ currentPage }} of {{ totalPages }}</span>
          <li class="page-item">
            <button class="page-link" @click="fetchMovies(currentPage + 1)" :disabled="currentPage === totalPages"
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
    ...mapGetters(['movies']),
  },
  data() {
    return {
      movies: [],
      currentPage: 1,
      totalPages: 1,
      totalCount: 0
    };
  },
  methods: {
    truncate(text, length) {
      return text.length > length ? text.substring(0, length) + '...' : text;
    },
    async fetchMovies(page) {
      try {
        const response = await api.get(`/movies`, {
          params: { page }
        });
        this.movies = response.data.data;
        this.currentPage = response.data.meta.current_page;
        this.totalPages = response.data.meta.total_pages;
        this.totalCount = response.data.meta.total_count;
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    },
    viewMovieDetail(id) {
      this.$router.push({ name: 'MovieDetail', params: { id } });
    }
  },
  created() {
    this.fetchMovies(this.currentPage);
  },
};
</script>

<style>
.card {
  display: block;
  margin-top: 30px;
  margin-bottom: 20px;
  word-wrap: break-word;
}

.card:hover {
  filter: drop-shadow(1px 1px 1px grey);
  cursor: pointer;
}

.card-body-movie {
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