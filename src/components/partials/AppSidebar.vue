<template>
    <div>
        <aside class="sidenav navbar navbar-vertical navbar-expand-xs border-0 border-radius-xl my-3 fixed-start ms-3 bg-gradient-dark" id="sidenav-main">
            <a class="navbar-brand" href="/">DibsFlix</a>
            <hr class="horizontal light mt-0 mb-2">
            <div class="collapse navbar-collapse  w-auto " id="sidenav-collapse-main">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link class="nav-link text-white" to="/movie/listing">Movies</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-white" to="/tv_show/listing">TV Shows</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-white" to="/people/listing">People</router-link>
                    </li>

                    <li class="nav-item">
                        <router-link class="nav-link text-white" to="/genre/listing">Genres</router-link>
                    </li>
                </ul>
            </div>
            <div class="sidenav-footer position-absolute w-100 bottom-0 ">
                <div class="mx-3">
                <a class="btn bg-gradient-primary w-100" @click="logout" type="button">Log Out</a>
                </div>
            </div>
        </aside>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
    data() {
        return {
            
        }
    },
    computed: {
        ...mapState(['isLoggedIn']),
        ...mapGetters([])
    },
    methods: {
        ...mapActions(['logout']),
        isActive(path) {
            return this.$route.path === path;
        },
        logout() {
            this.$store.dispatch('logout');
            // Redirect to the main page
            this.$router.push('/');
        },
    }
};
</script>

<style>
    .active {
        font-weight: bold;
        color: #e91e63;
    }
    .navbar-brand {
        font-weight: bold !important;
        font-family: Helvetica !important;
        font-size: 30px !important;
        color: #e91e63 !important;
    }
</style>