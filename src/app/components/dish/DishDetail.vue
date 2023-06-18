<template>
  <div class="columns">
    <div class="column is-10 column--align-center">
      <span class="return-icon" @click="$router.go(-1)"> 
        <i class="fa fa-arrow-left is-primary"></i>
      </span>
      <div v-if="!dishItem">
        dish not found!
      </div>
      <div v-if="dishItem">
        <div class="card">
          <div class="card-image">
            <figure class="image">
              <img :src="dishItem.image" :alt="dishItem.dish">
            </figure>
          </div>
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img :src="dishItem.uploader.avatar" :alt="dishItem.uploader.name">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">{{dishItem.dish}}</p>
                <p class="subtitle is-6">@{{dishItem.uploader.name}}</p>
              </div>
            </div>

            <div class="content">
              <p style="word-wrap: break-word;">
                {{dishItem.description}}
              </p>
              <br>

              <nav class="level is-mobile">
                <div class="level-item has-text-centered">
                  <div>
                    <p class="heading">份量</p>
                    <p class="title">{{ dishItem.servings }}人份</p>
                  </div>
                </div>
                <div class="level-item has-text-centered">
                  <div>
                    <p class="heading">時間</p>
                    <p class="title">{{ dishItem.timespent }}</p>
                  </div>
                </div>
              </nav>

              <table>
                <thead>
                  <tr>
                    <th colspan="2">食材</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(ingredient, index) in dishItem.ingredients" :key="index">
                    <td>{{ ingredient[0] }}</td>
                    <td>{{ ingredient[1] }}</td>
                  </tr>
                </tbody>
              </table>

              <table>
                <thead>
                  <tr>
                    <th colspan="2">步驟</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(step, index) in dishItem.step"  :key="index">
                    <td><strong>{{ index + 1 }}</strong></td>
                    <td>{{ step }}</td>
                  </tr>
                </tbody>
              </table>

              <article class="message is-primary" v-if="dishItem.notes">
                <div class="message-header">
                  <p>Notes</p>
                </div>
                <div class="message-body">
                  {{ dishItem.notes }}
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default { 
  name: "DishDetail", 
  props: ["id"],
  computed: {
    dishItem () {
      return this.$store.getters.dishItemFromId(this.id);
    }, 
  },
};
</script> 

<style scoped> 
  .return-icon { 
    position: relative; 
    color: #00d1b2; 
    cursor: pointer;
  }
  .return-icon>i {
    margin: 10px;
  }
</style>