<template>
  <div class="block">
    <div class="container">
      <div v-if="$route.path !== '/login'" class="navigation-buttons">
        <div class="is-pulled-left">
          <router-link v-if="!token" to="/login" class="button is-primary">
            <i class="fa fa-user-circle"></i><span>Login</span>
          </router-link>
          <div v-if="token">
            <button @click="logout" class="button">
              <i class="fa fa-sign-out"></i><span>Logout</span>
            </button>
          </div>
        </div>
      </div>
      <div v-if="$route.path === '/login'" class="navigation-buttons">
        <div class="is-pulled-left">
          <router-link to="/dishes" class="button">
            <span>首頁</span>
          </router-link>
        </div>
      </div>
      <div v-if="token" class="media is-pulled-right">
        <figure class="image is-32x32">
          <img class="is-rounded" src="https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg">
        </figure>
      
        <span>{{ user.account }}</span>
      </div>
    </div>
    <div class="columns" style="margin-top: 36px;">
      <div class="column column--align-center"> 
        <router-view></router-view>
      </div>
    </div>

    <footer v-if="$route.path !== '/login'" class="footer">
      <div class="content has-text-centered">
        <h1 class="title">Cooking Trove</h1>
        <p>
          <strong>© 2023, Cooking Trove, Inc.</strong>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: 'App',
  computed: {
    ...mapGetters(["token","user","dishItems"]), 
  },
  created() {
    const token = localStorage.getItem("token");
    this.updateInitialState(token);
  },
  methods: {
    logout() {
      this.$store
        .dispatch("logout")
        .then(() => { this.$router.push("/login")})
        .catch((error) => { console.log(error);}); 
    },
    updateInitialState(token) {
      this.$store.dispatch('checkTokenValid', {"token": token});
      this.$store.dispatch('getDishItems');
    },
  },
  watch: {
    token() {
      if (this.token) { 
        this.updateInitialState(this.token);
      }
    } 
  },
}
</script>

<style>
html, body {
  height: 100%;
  background: #F2F6FA;
}

#app {
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  width: 100%;
}

.column--align-center {
  margin: 0 auto;
}

.navigation-buttons {
  position: absolute;
  top: 5px;
  width: 99%;
  z-index: 99;
}

.navigation-buttons .button {
  margin: 0 2px;
}

.navigation-buttons .button .fa {
  padding-right: 5px;
}


</style>
