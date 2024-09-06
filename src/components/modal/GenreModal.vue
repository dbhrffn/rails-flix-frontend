<template>
    <div class="modal fade" id="editGenreModal" tabindex="-1" aria-labelledby="editGenreModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="editGenreModalLabel">Edit Genre</h5>
                    <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="updateGenre">
                        <div class="mb-3">
                            <label for="genreName" class="form-label">Genre Name</label>
                            <input
                                type="text"
                                id="genreName"
                                v-model="genre.name"
                                class="form-control"
                                placeholder="Enter genre name"
                                required
                            />
                        </div>

                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
                            <button type="submit" class="btn btn-primary">Save changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../../services/api';

export default {
    props: ['genreId'],
    data() {
        return {
            genre : []
        };
    },
    methods: {
        async fetchGenre() {
            try {
                const response = await api.get('/genres/' + this.genreId);
                this.genre = response.data
            } catch (error) {
                this.error = error.response?.data?.error || 'An error occurred';
            }
        },
        closeModal() {
            this.$nextTick(() => {
                const modalElement = document.getElementById('editGenreModal');
                const modal = new bootstrap.Modal(modalElement);
                modal.hide();

                // Manually remove the backdrop if it persists
                const backdropElement = document.querySelector('.modal-backdrop') ?? null;
                if (backdropElement) {
                    backdropElement.classList.remove('show'); // Hide backdrop
                    backdropElement.parentNode.removeChild(backdropElement); // Remove backdrop element
                }
                this.$emit('close');
            });
        },

        async updateGenre() {
            try {
                await api.put(`/genres/${this.genreId}`, { genre: this.genre });
                this.$emit('update');
                this.closeModal();
            } catch (error) {
                console.error('Error saving genre details:', error);
            }
        },
    },
    created(){
        this.fetchGenre();
    }
}
</script>
