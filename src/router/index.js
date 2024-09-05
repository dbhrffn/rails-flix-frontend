import { createRouter, createWebHistory } from 'vue-router';
import Main from '../components/Main.vue';
import Movies from '../components/views/Movies.vue';
import MovieDetail from '../components/views/MovieDetail.vue';
import MovieListing from '../components/admin/MovieListing.vue';
import TvShows from '../components/views/TvShows.vue';
import TvShowDetail from '../components/views/TvShowDetail.vue';
import TvShowListing from '../components/admin/TvShowListing.vue';
import GenreListing from '../components/admin/GenreListing.vue';
import PeopleListing from '../components/admin/PeopleListing.vue';

const routes = [
  { path: '/', component: Main },
  { path: '/movies', component: Movies, props: true },
  { path: '/movies/:id', name: 'MovieDetail', component: MovieDetail, props: true },
  { path: '/movie/listing', name: 'MovieListing', component: MovieListing, props: true },
  { path: '/tv_shows', component: TvShows, props: true },
  { path: '/tv_shows/:id', name: 'TvShowDetail', component: TvShowDetail, props: true },
  { path: '/tv_show/listing', name: 'TvShowListing', component: TvShowListing, props: true },
  { path: '/genre/listing', name: 'GenreListing', component: GenreListing, props: true },
  { path: '/people/listing', name: 'PeopleListing', component: PeopleListing, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
