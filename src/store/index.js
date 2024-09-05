import { createStore } from 'vuex';
import api from '../services/api';

export default createStore({
  state: {
    token: localStorage.getItem('authToken') || null,
    isLoggedIn: !!localStorage.getItem('authToken'),
    trending_movies: [],
    trending_tv_shows: [],
    posters: [],
    movies: [],
    tv_shows: [],
    genres: [],
    people: [],
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
    setGenres(state, genres) {
      state.genres = genres;
    },
    setPeople(state, people) {
      state.people = people;
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
            // Store the token in localStorage
            localStorage.setItem('authToken', response.data.token);
          }
        } catch (error) {
          console.error('Error fetching trending tv shows:', error);
        }
    },
    async logout({ commit }) {
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
        console.error('Error fetching posters:', error);
      }
    },
    async fetchMovies({ commit }) {
      try {
        const response = await api.get('/movies');
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
        console.error('Error fetching tv_shows:', error);
      }
    },
    async fetchGenres({ commit }) {
      try {
        const response = await api.get('/genres'); // Use the `api` instance
        commit('setGenres', response.data);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    },
    async fetchPeople({ commit }) {
      try {
        const response = await api.get('/people'); // Use the `api` instance
        commit('setPeople', response.data);
      } catch (error) {
        console.error('Error fetching people:', error);
      }
    },
  },
  getters: {
    isLoggedIn: state => state.isLoggedIn,
    token: state => state.token,
    movies: state => state.movies,
    tv_shows: state => state.tv_shows,
    genres: state => state.genres,
    people: state => state.people,
  },
});
