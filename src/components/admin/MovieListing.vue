<template>
    <div class="row">
        <div class="col-12">
            <div class="card my-4">
                <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                        <h6 class="text-white text-capitalize ps-3">Movies Listing</h6>
                    </div>
                    <div class="px-0 pb-2">
                        <input v-model="query" @input="search" class="form-control" placeholder="Search">
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
                                        Last aired date
                                    </th>
                                    <th
                                        class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Score</th>
                                    <th class="text-secondary opacity-7"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="movie in movies" :key="movie.id">
                                    <td>
                                        <div class="d-flex px-2 py-1">
                                            <div>
                                                <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
                                                    class="avatar avatar-sm me-3 border-radius-lg" :alt="movie.id">
                                            </div>
                                            <div class="d-flex flex-column justify-content-center">
                                                <h6 class="mb-0 text-sm">{{ movie.title }}</h6>
                                                <!-- <p class="text-xs text-secondary mb-0">john@creative-tim.com</p> -->
                                            </div>
                                        </div>
                                    </td>
                                    <!-- <td class="align-middle text-center text-sm">
                                        <span class="badge badge-sm bg-gradient-success">Online</span>
                                    </td> -->
                                    <td class="align-middle text-center text-sm">
                                        <span class="badge badge-sm bg-gradient-success">{{ movie.status }}</span>
                                    </td>
                                    <td class="align-middle text-center">
                                        <span class="text-secondary text-xs font-weight-bold">23/04/18</span>
                                    </td>
                                    <td class="align-middle text-center">
                                        <span class="text-secondary text-xs font-weight-bold">23/04/18</span>
                                    </td>
                                    <td class="align-middle text-center">
                                        <span class="text-secondary text-xs font-weight-bold">{{
                                            $filters.voteAveragePercentage(movie.vote_average)}}</span>
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
                        <button class="page-link" @click="fetchMovies(currentPage - 1)" :disabled="currentPage === 1"
                            aria-label="Previous">
                            <i class="fa fa-arrow-left" aria-hidden="true"></i>
                            <span class="sr-only">Previous</span>
                        </button>
                    </li>
                    <span class="pagination-desc">Page {{ currentPage }} of {{ totalPages }}</span>
                    <li class="page-item">
                        <button class="page-link" @click="fetchMovies(currentPage + 1)"
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
            query: '',
            movies: [],
            currentPage: 1,
            totalPages: 1,
            totalCount: 0
        }
    },
    computed: {
        ...mapState({
            // Unused
            // movies: state => state.movies.data,
            // meta: state => state.movies.meta
        })
    },
    methods: {
        async search() {
            if (this.query.length < 2) {
                this.movies = this.fetchMovies(this.currentPage);
                return;
            }
            try {
                const response = await api.get('/search', {
                    params: { query: this.query }
                });
                this.movies = response.data;
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
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
    },
    created() {
        // Reference if want to re-use in the future
        // this.$store.dispatch('fetchMovies');
        this.fetchMovies(this.currentPage)
    }
}
</script>

<style></style>