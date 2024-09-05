<template>
  <div v-if="isLoggedIn" :class="isLoggedIn ? 'sidebar' : ''">
    <AppSidebar />
  </div>

  <AppHeader />

  <div :class="isLoggedIn ? 'main-content' : ''">
    <router-view></router-view>
  </div>

  <div>
    <AppFooter />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AppHeader from './components/partials/AppHeader.vue';
import AppFooter from './components/partials/AppFooter.vue';
import AppSidebar from './components/partials/AppSidebar.vue';

export default {
  components: {
    AppHeader,
    AppFooter,
    AppSidebar
  },
  computed: {
    ...mapState(['isLoggedIn'])
  }
};
</script>


<style scoped></style>
