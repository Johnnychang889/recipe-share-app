<template>
  <section class="hero is-medium is-primary">
    <div class="columns is-vcentered">
      <div class="column is-4">
        <div class="hero-body">
          <p class="title">
            尋找食譜
          </p>
          <p class="subtitle">
            或者
          </p>
          <p class="title">
            分享你的獨門料理
          </p>
        </div>
      </div>
      <div class="column">
        <figure class="image">
          <img src="../../assets/picture.png">
        </figure>
      </div>
    </div>
  </section>
  <div class="container">
    <section class="section">
      <h1 class="title">瀏覽食譜...</h1>
    </section>
    <div class="block">
      <div class="columns is-multiline">
        <div class="column is-3" v-for="dishItem in dishItems" :key="dishItem.id">
          <DishListItem :dishItem="dishItem" :token="token"></DishListItem>
        </div>
      </div>
    </div>
  </div>
  <section class="hero is-medium is-primary">
    <div class="columns is-vcentered">
      <div class="column">
        <figure class="image">
          <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/healthy-food-clean-eating-selection-in-wooden-box-royalty-free-image-854725398-1551469724.jpg?crop=1xw:0.84415xh;center,top&resize=1200:*">
        </figure>
      </div>
      <div class="column is-4">
        <div class="hero-body">
          <p class="title">
            立刻分享你的食譜
          </p>
          <button @click="share" class="button is-focused">
            點我分享
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import DishListItem from './DishListItem';

export default {
  name: 'DishList',
  components: {
    DishListItem
  },
  computed: {
    ...mapGetters([
      'dishItems',
      'token'
    ])
  },
  methods: {
    share() {
      this.$router.push({ path: '/share'});
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 2rem;
  margin-bottom: 2rem;
  margin-left: 1rem;
  margin-right: 1rem;
}
</style>
