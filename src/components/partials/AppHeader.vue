<template>
  <div v-if="!isLoggedIn">
    <nav class="navbar fixed-top">
      <div class="container-fluid">
        <div class="navbar-wrapper">
          <a class="navbar-brand" href="/">DibsFlix</a>
          <router-link class="navbar-items" to="/movies" :class="{ active: isActive('/movies') }">Movies</router-link>
          <router-link class="navbar-items" to="/tv_shows" :class="{ active: isActive('/tv_shows') }">TV
            Shows</router-link>
        </div>

        <button type="button" class="btn btn-primary" @click="showModal()" data-bs-toggle="modal" data-bs-target="#loginModal"><i
            class="fa fa-lock" style="margin-right:10px"></i>Admin
          Login
        </button>
      </div>
    </nav>
  </div>
  
  <!-- Modal -->
  <div v-if="showDialog" class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="loginModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-md" role="document">
      <div class="modal-content">
        <div class="modal-body">
          <div class="card-header pb-0 text-center">
            <h5 class="">Admin Login</h5>
            <p class="mb-0">Enter your email and password to register</p>
          </div>
          <div>
            <form @submit.prevent="handleLogin">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">Email</span>
                </div>
                <input v-model="email" type="email" class="form-control" placeholder="Email" aria-label="Username" aria-describedby="basic-addon1">
              </div>

              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">Password</span>
                </div>
                <input v-model="password" type="password" class="form-control" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1">
              </div>

              <div class="text-center px-sm-6 ">
                <button type="submit" class="btn bg-gradient-primary btn-lg btn-rounded w-100 mt-4 mb-0">Login</button>
              </div>
            </form>
          </div>


        <p v-if="error">{{ error }}</p>
        </div>
        <div class="card-footer text-center pt-0 px-sm-4 px-1">
          <p class="mb-4 mx-auto">
            Don't have an account?
            <a href="javascrpt:;" class="text-primary text-gradient font-weight-bold">Sign up</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: "AppHeader",
  data() {
    return {
      email: '',
      password: '',
      showDialog: false,
      error : ''
    }
  },
  computed: {
    ...mapState(['isLoggedIn']),
    ...mapGetters([])
  },
  methods: {
    ...mapActions(['login', 'token']),
    showModal(){
      this.showDialog = true;
    },
    isActive(path) {
      return this.$route.path === path;
    },
    handleLogin() {
      this.login({ email: this.email, password: this.password })
        .then(() => {
          this.$router.push("/movie/listing");
          this.showDialog = false; // Hide modal by setting state
          this.$nextTick(() => {
            const modalElement = document.getElementById('loginModal');
            if (modalElement) {
              const modal = bootstrap.Modal.getInstance(modalElement);
              if (modal) {
                modal.hide(); // Programmatically hide modal
              }
            }
            // Manually remove the backdrop if it persists
            const backdropElement = document.querySelector('.modal-backdrop');
            if (backdropElement) {
              backdropElement.classList.remove('show'); // Hide backdrop
              backdropElement.parentNode.removeChild(backdropElement); // Remove backdrop element
            }
          });
        })
        .catch(error => {
          this.error = 'Login failed. Please try again.';
        });
    },
  }
};
</script>

<style scoped>
.navbar {
  background-color: #ffffff;
  /* Change this to customize the background color */
  height: 70px;
}

.navbar-brand {
  font-weight: bold;
  font-family: Helvetica;
  font-size: 30px;
  color: #e91e63;
}

.navbar-items {
  margin-left: 10px;
  margin-right: 10px;
}

.active {
  font-weight: bold;
  color: #e91e63;
}
</style>
