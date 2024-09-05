import { createStore } from 'vuex';
import api from '../services/api';

export default createStore({
  state: {
    token: null,
    isLoggedIn: false,
    trending_movies: [],
    trending_tv_shows: [],
    posters: [],
    movies: [],
    tv_shows: [],
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    clearToken(state) {
      state.token = null;
    },
    setIsLoggedIn(state, value) {
      state.isLoggedIn = value;
    },
    setTrendingMovies(state, posters) {
      state.trending_movies = posters;
    },
    setTrendingTvShows(state, posters) {
      state.trending_tv_shows = posters;
    },
    setPosters(state, posters) {
      state.posters = posters;
    },
    setMovies(state, movies) {
      state.movies = movies;
    },
    setTvShows(state, tv_shows) {
      state.tv_shows = tv_shows;
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
        try {
          const response = await api.post('/login', { 
            email: email, 
            password: password 
          });

          if(response.data.token){
            commit('setToken', response.data.token);
            commit('setIsLoggedIn', true);
          }
        } catch (error) {
          console.error('Error fetching trending tv shows:', error);
        }
    },
    logout({ commit }) {
      commit('clearToken');
      commit('setIsLoggedIn', false);
    },
    async getTrendingMovies({ commit }) {
      try {
        const response = await api.get('/trending_movies');
        commit('setTrendingMovies', response.data);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
      }
    },
    async getTrendingTvShows({ commit }) {
      try {
        const response = await api.get('/trending_tv_shows');
        commit('setTrendingTvShows', response.data);
      } catch (error) {
        console.error('Error fetching trending tv shows:', error);
      }
    },
    async fetchPosters({ commit }) {
      try {
        const response = await api.get('/posters');
        commit('setPosters', response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    },
    async fetchMovies({ commit }) {
      try {
        const response = await api.get('/movies');
        console.log("🚀 ~ fetchMovies ~ response.data:", response.data);
        commit('setMovies', response.data); // Adjust based on response structure
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    },
    async fetchTvShows({ commit }) {
      try {
        const response = await api.get('/tv_shows'); // Use the `api` instance
        commit('setTvShows', response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    },
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    token: state => state.token,
    movies: state => state.movies,
  },
});
