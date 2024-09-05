<template>
    <div v-if="tv_show">
        <div class="media-banner">
            <div class="page-header min-height-400 border-radius-xl mt-7">
                <figure class="backdrop">
                    <img :src="bannerImg">
                </figure>
                <div class="container">
                    <div class="row my-2">
                        <div class="col-md-3">
                            <img class="poster" :src="posterImg">
                        </div>
                        <div class="col-md-9">
                            <div class="media-info">
                                <h2 class="media-rating">{{ $filters.voteAveragePercentage(tv_show.vote_average) }}</h2>

                                <h1 class="mb-4">{{ tv_show.name }}</h1>

                                <h5>Overview</h5>
                                <p>{{ tv_show.overview }}</p>

                                <a target="_blank" class="btn btn-info rounded-pill" :href="tmdbUrl">TMDb
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container my-4">
            <ul class="nav nav-tabs">
                <li class="nav-item"><a class="nav-link active" data-bs-toggle="tab" href="#cast">Cast</a></li>
                <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#seasons">Seasons</a></li>
                <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#videos">Videos</a></li>
                <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#posters">Posters</a></li>
                <li class="nav-item"><a class="nav-link" data-bs-toggle="tab" href="#backdrops">Backdrops</a></li>
            </ul>
        </div>

        <div class="tab-content mt-3 my-6">
            <div class="tab-pane fade show" :class="{ active: activeTab === 'cast' }" @click="activeTab = 'cast'" role="tabpanel" id="cast">
                <div class="container mt-3" style="background-color: white;">
                    <div class="row">
                        <div class="col-md-4" v-for="(item, index) in credits" :key="index">
                            <!-- Credit -->
                            <div class="cast-item">
                                <figure class="cast-image mr-3">
                                    <div v-if="item.person.profile_path">
                                        <img :src="'https://image.tmdb.org/t/p/original/' + item.person.profile_path"
                                            alt="Cast Image">
                                    </div>
                                </figure>
                                <div class="media-body">
                                    <h6 class="mt-2">{{ item.person.name }}</h6>
                                    <p class="small text-muted mb-0">{{ item.credit.role }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="seasons" role="tabpanel">
                <div class="container mt-3" style="background-color: white;">
                    <ul class="list-group" v-for="(item, index) in seasons" :key="index">
                        <li class="list-group-item my-3">
                            {{ item.name }}  ({{ item.episode_count }} episodes)
                            <p v-if="item.overview">{{ item.overview }}</p>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="tab-pane fade" id="videos" role="tabpanel">
                <div class="container mt-3" style="background-color: white;">
                    <div class="row">
                        <div class="col-md-4" v-for="(item, index) in videos" :key="index">

                            <div class="video-item">
                                <a data-behavior="video" :href="'https://www.youtube.com/watch?v=' + item.key"
                                    target="_blank">
                                    <img class="embed-responsive-item"
                                        :src="'https://img.youtube.com/vi/' + item.key + '/hqdefault.jpg'">
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="posters" role="tabpanel">
                <div class="container mt-3" style="background-color: white;">
                    <div class="row">
                        <div class="col-md-4" v-for="(item, index) in posters" :key="index">
                            <div class="video-item">
                                <picture>
                                    <img :src="'https://image.tmdb.org/t/p/original' + item.file_path"
                                        class="img-fluid img-thumbnail" alt="...">
                                </picture>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="backdrops" role="tabpanel">
                <div class="container mt-3" style="background-color: white;">
                    <div class="row">
                        <div class="col-md-4" v-for="(item, index) in backdrops" :key="index">
                            <div class="video-item">
                                <picture>
                                    <img :src="'https://image.tmdb.org/t/p/original' + item.file_path"
                                        class="img-fluid img-thumbnail" alt="...">
                                </picture>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from '../../services/api';

export default {
    data() {
        return {
            activeTab: 'cast',
            bannerImg: null,
            posterImg: null,
            imdbUrl: null,
            error: null,
            tv_show: [],
            credits: [],
            videos: [],
            posters: [],
            seasons: [],
            backdrops: [],
        };
    },
    created() {
        this.fetchTvShow();
        //Init
        this.activeTab = 'cast'
    },
    methods: {
        async fetchTvShow() {
            try {
                const tvShowId = this.$route.params.id; // assuming you're using vue-router
                const response = await api.get('/tv_shows/' + tvShowId);
                this.tv_show = response.data.tv_show;
                this.credits = response.data.credits;
                this.videos = response.data.videos;
                this.posters = response.data.posters;
                this.seasons = response.data.seasons;
                this.backdrops = response.data.backdrops;
                this.bannerImg = 'https://image.tmdb.org/t/p/original' + this.tv_show.backdrop_path
                this.posterImg = 'https://image.tmdb.org/t/p/w500' + this.tv_show.poster_path
                this.tmdbUrl = 'https://www.themoviedb.org/movie/' + this.tv_show.tmdb_id
            } catch (error) {
                this.error = error.response?.data?.error || 'An error occurred';
            }
        }
    }
};
</script>

<style></style>