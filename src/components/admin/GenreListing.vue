<template>
    <div class="row">
        <div class="col-12">
            <div class="card my-4">
                <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                        <h6 class="text-white text-capitalize ps-3">Genres Listing</h6>
                    </div>
                </div>
                <div class="card-body px-0 pb-2">
                    <div class="table-responsive p-0">
                        <table class="table align-items-center mb-0">
                            <thead>
                                <tr>
                                    <th
                                        class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Name</th>
                                    <th class="text-secondary opacity-7"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr  v-for="genre in genres" :key="genre.id">
                                    <td class="align-middle text-center">
                                        <span class="text-secondary text-xs font-weight-bold">{{ genre.name }}</span>
                                    </td>
                                    <td class="align-middle">
                                        <a href="#" @click="openModal(genre.id)" class="text-secondary font-weight-bold text-xs"
                                            data-toggle="tooltip" data-original-title="Edit user">
                                            <i class="fas fa-edit"></i> Edit
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
                        <button class="page-link" @click="fetchGenres(currentPage - 1)" :disabled="currentPage === 1"
                            aria-label="Previous">
                            <i class="fa fa-arrow-left" aria-hidden="true"></i>
                            <span class="sr-only">Previous</span>
                        </button>
                    </li>
                    <span class="pagination-desc">Page {{ currentPage }} of {{ totalPages }}</span>
                    <li class="page-item">
                        <button class="page-link" @click="fetchGenres(currentPage + 1)"
                            :disabled="currentPage === totalPages" aria-label="Next">
                            <i class="fa fa-arrow-right" aria-hidden="true"></i>
                            <span class="sr-only">Next</span>
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
        <!-- Modal Component -->
        <GenreModal
            v-if="selectedGenreId !== null"
            :genreId="selectedGenreId"
            @close="selectedGenreId = null"
            @update="fetchGenres"
        />
    </div>

</template>

<script>
import { mapState } from 'vuex';
import api from '../../services/api';
import GenreModal from '../../components/modal/GenreModal.vue'; // Adjust the path as needed


export default {
    components: {
        GenreModal // Register the component here
    },
    data() {
    return {
        genres: [],
        selectedGenreId: null,
        currentPage: 1,
        totalPages: 1,
        totalCount: 0
    }
  },
  methods: {
        async fetchGenres(page) {
            try {
                const response = await api.get(`/genres`, {
                    params: { page }
                });
                this.genres = response.data.data;
                this.currentPage = response.data.meta.current_page;
                this.totalPages = response.data.meta.total_pages;
                this.totalCount = response.data.meta.total_count;
            } catch (error) {
                console.error('Error fetching movies:', error);
            }
        },
        openModal(id){
            this.selectedGenreId = id
            this.$nextTick(() => {
                const modalElement = document.getElementById('editGenreModal');
                const modal = new bootstrap.Modal(modalElement);
                modal.show();
            });
        }
    },
  computed: {
    ...mapState({
        // genres: state => state.genres.data
    })
  },
  created() {
    // this.$store.dispatch('fetchGenres');
    this.fetchGenres(this.currentPage)
  }
}
</script>

<style>
body.modal-open {
    overflow: none;
}
</style>