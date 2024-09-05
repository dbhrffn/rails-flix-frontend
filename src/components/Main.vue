<template>
    <div v-if="!isLoggedIn" class="background">
        <div class="mt-8 my-6">
            <div class="content">
                <h1>Millions of movies, TV shows and people to discover.</h1>
                <h3>We need you!</h3>
                <p>Ready to contribute? Enter your email to enrol under administrator account!</p>
                <form @submit.prevent="signup">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="input-group input-group-outline my-3">
                                <label class="form-label" for="email">Email</label>
                                <input v-model="email" id="email" type="email" class="form-control" required>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <button type="button" class="btn btn-primary" style="margin-top:13px; width:200px;">Sign Me Up</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

        <div class="trending-now">
            <h1>Top 10 Movies</h1>
            <div class="trending-slider my-3">
                <div v-for="movie in movies" :key="movie.id" class="movie-card">
                    <h2 class="media-rating" style="position:absolute;">{{ $filters.voteAveragePercentage(movie.vote_average) }}</h2>
                    <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" :alt="movie.title" @click="viewMovieDetail(movie.id)" />
                    <div class="movie-info">
                        <h2>{{ movie.title }}</h2>
                    </div>
                </div>
            </div>
            <h1>Top 10 TV Shows</h1>
            <div class="trending-slider">
                <div v-for="tv_show in tv_shows" :key="tv_show.id" class="movie-card">
                    <h2 class="media-rating" style="position:absolute;">{{ $filters.voteAveragePercentage(tv_show.vote_average) }}</h2>
                    <img :src="'https://image.tmdb.org/t/p/w500' + tv_show.poster_path" :alt="tv_show.title" @click="viewTvShowDetail(tv_show.id)"/>
                    <div class="movie-info">
                        <h2>{{ tv_show.name }}</h2>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import api from '../services/api';

export default {
    computed: {
        ...mapState(['isLoggedIn']),
        ...mapGetters([]),
    },
    data() {
        return {
            movies: [],
            tv_shows: [],
        };
    },
    methods: {
        viewMovieDetail(id) {
            this.$router.push({ name: 'MovieDetail', params: { id } });
        },
        viewTvShowDetail(id) {
        this.$router.push({ name: 'TvShowDetail', params: { id } });
        },
        async getTrendingMovies() {
            try {
                const response = await api.get(`/trending_movies`, {
                });
                this.movies = response.data.data;
            } catch (error) {
                console.error('Error fetching trending movies:', error);
            }
        },
        async getTrendingTvShows() {
            try {
                const response = await api.get(`/trending_tv_shows`, {
                });
                this.tv_shows = response.data.data;
            } catch (error) {
                console.error('Error fetching trending tv shows:', error);
            }
        },
    },

    created() {
        this.getTrendingMovies();
        this.getTrendingTvShows();
    },
};
</script>


<style scoped>
.trending-now {
    padding: 20px;
    color: #e91e63;
    background-image: linear-gradient(to bottom right, white, pink);
}

.trending-now h1 {
    font-size: 24px;
    margin-bottom: 10px;
    font-weight: bold;
}

.trending-slider {
    display: flex;
    overflow-x: auto;
    gap: 15px;
    padding: 10px 0;
}

.movie-card {
    position: relative;
    flex: 0 0 auto;
    width: 200px;
    /* Adjust the width of movie cards */
    border-radius: 8px;
    overflow: hidden;
    background-color: #e91e63;
    /* Card background */
}

.movie-card img {
    width: 100%;
    height: auto;
    display: block;
    cursor: pointer;
}

.movie-info {
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.7);
    /* Semi-transparent overlay */
    color: #fff;
    position: absolute;
    bottom: 0;
    width: 100%;
}

.movie-info h2 {
    font-size: 16px;
    margin: 0;
}

.movie-info p {
    font-size: 14px;
    margin: 5px 0 0;
}

/* Scrollbar styles (optional) */
.trending-slider::-webkit-scrollbar {
    height: 8px;
    display: none;
}

</style>
