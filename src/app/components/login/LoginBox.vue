<template>
  <div id="login" class="box has-text-centered">
    <router-link to="/dishes">
      <h1 class="title title-size">Cooking Trove</h1>
    </router-link>
    <div class="field">
      <label class="label is-pulled-left">ID</label>
      <div class="control">
        <input class="input" type="text" v-model="loginData.id" @focus="clear_loginfailed">
      </div>
    </div>

    <div class="field">
      <label class="label is-pulled-left">PASSWORD</label>
      <div class="control">
        <input class="input" type="password" v-model="loginData.password" @focus="clear_loginfailed">
      </div>
    </div>
    <div>
      <span v-if="loginFailed" style="color: red; display: block; margin:20px;">
        ID or PASSWORD is incorrect !
      </span>
    </div>
    <button @click="login" :class="[{'is-loading': loading}, 'button is-primary']">
      Login
    </button> 
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: "LoginBox", 
  data() {
    return {
      loginData: {
        id: 'pccu',
        password: '1234',
      }
    }
  },
  computed: {
    ...mapGetters([ 'loading','loginFailed' ]) 
  },
  methods: {
    ...mapActions(['clear_loginfailed']),
    login() {
      this.$store
        .dispatch("login", this.loginData)
        .then(() => { 
          if(!this.loginFailed)
            this.$router.push({ path: '/dishes'});
        }); 
    }
  }
};
</script>

<style scoped> 
.box {
  padding: 30px; 
}
.title-size {
  margin: 30px;
}
</style>