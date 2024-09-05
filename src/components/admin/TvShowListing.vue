<template>
    <div class="row">
        <div class="col-12">
            <div class="card my-4">
                <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                        <h6 class="text-white text-capitalize ps-3">TV Shows Listing</h6>
                    </div>
                </div>
                <div class="card-body px-0 pb-2">
                    <div class="table-responsive p-0">
                        <table class="table align-items-center mb-0">
                            <thead>
                                <tr>
                                    <th class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Title</th>
                                    <!-- <th
                                        class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2">
                                        Genre</th> -->
                                    <th
                                        class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Status</th>
                                    <th
                                        class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        First aired date</th>
                                    <th
                                        class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Last  aired date
                                    </th>
                                    <th
                                        class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Score</th>
                                    <th class="text-secondary opacity-7"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr  v-for="tv_show in tv_shows" :key="tv_show.id">
                                    <td>
                                        <div class="d-flex px-2 py-1">
                                            <div>
                                                <img  :src="'https://image.tmdb.org/t/p/w500' + tv_show.poster_path"
                                                    class="avatar avatar-sm me-3 border-radius-lg" :alt="tv_show.id">
                                            </div>
                                            <div class="d-flex flex-column justify-content-center">
                                                <h6 class="mb-0 text-sm">{{ tv_show.name }}</h6>
                                                <p class="text-xs text-secondary mb-0">john@creative-tim.com</p>
                                            </div>
                                        </div>
                                    </td>
                                    <!-- <td class="align-middle text-center text-sm">
                                        <span class="badge badge-sm bg-gradient-success">Online</span>
                                    </td> -->
                                    <td class="align-middle text-center text-sm">
                                        <span class="badge badge-sm bg-gradient-success">{{ tv_show.status }}</span>
                                    </td>
                                    <td class="align-middle text-center">
                                        <span class="text-secondary text-xs font-weight-bold">23/04/18</span>
                                    </td>
                                    <td class="align-middle text-center">
                                        <span class="text-secondary text-xs font-weight-bold">23/04/18</span>
                                    </td>
                                    <td class="align-middle text-center">
                                        <span class="text-secondary text-xs font-weight-bold">{{ $filters.voteAveragePercentage(tv_show.vote_average)}}</span>
                                    </td>
                                    <td class="align-middle">
                                        <a href="javascript:;" class="text-secondary font-weight-bold text-xs"
                                            data-toggle="tooltip" data-original-title="Edit user">
                                            Edit
                                        </a>
                                    </td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
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
                        <button class="page-link" @click="fetchTvShows(currentPage + 1)"
                            :disabled="currentPage === totalPages" aria-label="Next">
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
import { mapState } from 'vuex';
import api from '../../services/api';

export default {
    data() {
    return {
        tv_shows: [],
        currentPage: 1,
        totalPages: 1,
        totalCount: 0
    }
  },
  methods: {
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
    },
  computed: {
    ...mapState({
        // tv_shows: state => state.tv_shows.data,
        // meta: state => state.tv_shows.meta
    })
  },
  created() {
    // this.$store.dispatch('fetchTvShows');
    this.fetchTvShows(this.currentPage)
  }
}
</script>

<style>
</style>