<template>
    <div class="row">
        <div class="col-12">
            <div class="card my-4">
                <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                    <div class="bg-gradient-primary shadow-primary border-radius-lg pt-4 pb-3">
                        <h6 class="text-white text-capitalize ps-3">People Listing</h6>
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
                                        Name</th>
                                    <th
                                        class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Gender</th>
                                    <th
                                        class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7">
                                        Credits</th>=
                                    <th class="text-secondary opacity-7"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr  v-for="person in people" :key="person.id">
                                    <td>
                                        <div class="d-flex px-2 py-1">
                                            <div v-if="person.profile_path">
                                                <img  :src="'https://image.tmdb.org/t/p/original/' + person.profile_path"
                                                    class="avatar avatar-sm me-3 border-radius-lg" :alt="person.id">
                                            </div>
                                            <div class="d-flex flex-column justify-content-center">
                                                <h6 class="mb-0 text-sm">{{ person.name }}</h6>
                                                <!-- <p class="text-xs text-secondary mb-0">john@creative-tim.com</p> -->
                                            </div>
                                        </div>
                                    </td>
                                    <td class="align-middle text-center text-sm">
                                        <span class="badge badge-sm bg-gradient-success">{{ person.gender }}</span>
                                    </td>
                                    <td class="align-middle text-center text-sm">
                                        <span class="badge badge-sm bg-gradient-success">{{ person.gender }}</span>
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
                        <button class="page-link" @click="fetchPeople(currentPage - 1)" :disabled="currentPage === 1"
                            aria-label="Previous">
                            <i class="fa fa-arrow-left" aria-hidden="true"></i>
                            <span class="sr-only">Previous</span>
                        </button>
                    </li>
                    <span class="pagination-desc">Page {{ currentPage }} of {{ totalPages }}</span>
                    <li class="page-item">
                        <button class="page-link" @click="fetchPeople(currentPage + 1)"
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
        people: [],
        currentPage: 1,
        totalPages: 1,
        totalCount: 0
    }
  },
  methods: {
        async search() {
            if (this.query.length < 2) {
                this.people = this.fetchPeople(this.currentPage);
                return;
            }
            try {
                const response = await api.get('/people_search', {
                    params: { query: this.query }
                });
                this.people = response.data;
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        },
        async fetchPeople(page) {
            try {
                const response = await api.get(`/people`, {
                    params: { page }
                });
                this.people = response.data.data;
                this.currentPage = response.data.meta.current_page;
                this.totalPages = response.data.meta.total_pages;
                this.totalCount = response.data.meta.total_count;
            } catch (error) {
                console.error('Error fetching people:', error);
            }
        },
    },
  computed: {
    ...mapState({
        // people: state => state.people.data,
        // meta: state => state.people.meta
    })
  },
  created() {
    // this.$store.dispatch('fetchPeople');
    this.fetchPeople(this.currentPage)
  }
}
</script>

<style>
</style>