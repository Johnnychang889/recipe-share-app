<template>
  <div class="card">
    <div class="card-image">
      <router-link :to="'/dishes/' + dishItem.id" >
        <figure class="image is-4by3">
          <img :src="dishItem.image" :alt="dishItem.dish">
        </figure>
      </router-link>
    </div>
    <div class="card-content">

      <div class="columns">
        <div class="column is-12 padding-bottom-0">
          <div v-if="token" class="container" id="small-tool">
            <i @click="handleLike" ref="likeIcon" class="fa fa-heart" aria-hidden="true" style="padding-left: 5px;">
            </i>
            <span style="padding-left: 5px;">{{ dishItem.like }}
            </span>
            <i @click="removeDishItem(dishItem)" ref="deleteIcon" class="fa fa-trash is-pulled-right" aria-hidden="true">
            </i>
          </div>
        </div>
      </div>
      <div class="columns">
        <div class="column is-12">
          <p class="title is-5" style="margin: 0;">
            {{dishItem.dish}}
          </p>
        </div>
      </div>
      <div class="columns is-vcentered">
        <div class="column is-3">
          <figure class="image is-24x24">
            <img :src="dishItem.uploader.avatar" :alt="dishItem.dish">
          </figure>
        </div>
        <div class="column is-9">
          <p>@{{dishItem.uploader.name}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import { mapActions } from 'vuex';
  export default {
    name: 'DishList',
    props: ['dishItem','token'],
    data() {
      return {
        like: false
      }
    },
    methods: {
      ...mapActions(["removeDishItem"]),
      handleLike() {
        if(this.like) {
          this.$store.dispatch('minusLikeNumber', this.dishItem.id)
          this.$refs.likeIcon.classList.remove('color-primary');
        }
        else {
          this.$store.dispatch('addLikeNumber', this.dishItem.id)
          this.$refs.likeIcon.classList.add('color-primary');
        }
        this.like = !this.like;
      }
    }
  }
  </script>
  
  <style scoped>
  .card-content {
    padding: 1rem;
  }
  .paddingy-0 {
    padding-top: 0;
    padding-bottom: 0;
  }
  .padding-bottom-0 {
    padding-bottom: 0;
  }
  .color-primary {
    color: #00d1b2;
  }
  </style>
  