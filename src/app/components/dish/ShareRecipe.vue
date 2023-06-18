<template>
  <section class="hero is-small is-primary">
    <div class="hero-body">
      <div class="columns">
        <div class="column is-6">
          <p class="title">
            分享你的食譜
          </p>
          <p class="subtitle">
            然後
          </p>
          <p class="title">
            讓其他人看到
          </p>
        </div>
      </div>
    </div>
  </section>
  <div class="box frame">
    <div class="field">
      <label class="label">上傳者</label>
      <div class="control">
        <input class="input" type="text" v-model="user.account" readonly>
      </div>
    </div>

    <div class="field">
      <label class="label">菜名</label>
      <div class="control">
        <input class="input" type="text" v-model="dish.dish">
      </div>
    </div>

    <div class="container">
      <label class="label">圖片</label>
      <div class="columns has-text-centered">
        <div class="column is-4 is-offset-4">
          <figure class="image is-4by3">
            <img :src="inputImage">
          </figure>
        </div>
      </div>
      <div class="columns has-text-centered">
        <div class="column is-4 is-offset-4">
          <div class="file is-primary has-name">
            <label class="file-label">
              <input @change="handleFileUpload" class="file-input" type="file" name="dishImage">
              <span class="file-cta">
                <span class="file-icon">
                  <i class="fa fa-upload" aria-hidden="true"></i>
                </span>
                <span class="file-label">
                  Select file…
                </span>
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  
    <div class="field">
      <label class="label">份量</label>
      <div class="control">
        <input class="input" type="text" v-model="dish.servings">
      </div>
    </div>

    <div class="field">
      <label class="label">花費時間</label>
      <div class="control">
        <input class="input" type="text" v-model="dish.timespent">
      </div>
    </div>

    <div class="field">
      <label class="label">描述</label>
      <div class="control">
        <input class="input" type="text" v-model="dish.description">
      </div>
    </div>

    <div class="field">
      <div class="columns" v-for="(ingredient, index) in inputIngredient" :key="index">
        <div class="column">
          <div class="field">
            <label class="label">食材</label>
            <div class="control">
              <input class="input" type="text" v-model="inputIngredient[index][0]">
            </div>
          </div>
        </div>
        <div class="column">
          <div class="field">
            <label class="label">食材數量</label>
            <div class="control">
              <input class="input" type="text" v-model="inputIngredient[index][1]">
            </div>
          </div>
        </div>
      </div>
      <div class="block is-pulled-right">
        <a class="mark" @click="addIngredient">
          <i class="fa fa-plus" aria-hidden="true"></i>
        </a>
        <a @click="subtractIngredient">
          <i class="fa fa-minus" aria-hidden="true"></i>
        </a>
      </div>
    </div>

    <div class="field">
      <label class="label">步驟</label>
      <div class="control" v-for="(step, index) in steps" :key="index">
        <div class="columns" style="margin-top: 0;">
          <div class="column is-1 has-text-centered">
            <strong>{{ index+1 }}</strong>
          </div>
          <div class="column is-11">
            <input class="input" type="text" v-model="steps[index]">
          </div>
        </div>
      </div>
      <div class="block is-pulled-right">
        <a class="mark" @click="addStep">
          <i class="fa fa-plus" aria-hidden="true"></i>
        </a>
        <a @click="subtractStep">
          <i class="fa fa-minus" aria-hidden="true"></i>
        </a>
      </div>
    </div>

    <div class="field">
      <label class="label">notes</label>
      <div class="control">
        <input class="input" type="text" v-model="dish.notes">
      </div>
    </div>

    <div class="field is-grouped is-grouped-centered">
      <p class="control">
        <a @click="addDishItem()" class="button is-primary">
          Submit
        </a>
      </p>
      <p class="control">
        <a @click="$router.go(-1)" class="button is-light">
          Cancel
        </a>
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default { 
  name: "ShareRecipe",
  data() {
    return {
      dish: {
        uploader: {
          name: '',
          avatar: 'https://static.vecteezy.com/system/resources/previews/001/840/618/original/picture-profile-icon-male-icon-human-or-people-sign-and-symbol-free-vector.jpg'
        },
        dish: '',
        servings: '',
        timespent: '',
        image: '',
        description: '',
        ingredients: [],
        step: [],
        notes: ''
      },
      inputImage: '',
      inputIngredient: [['','']],
      steps: [''],
    }
  },
  computed: {
    ...mapGetters(["user"])
  }, 
  methods: {
    addDishItem() {
      this.dish.uploader.name = this.user.account;
      this.dish.image = this.inputImage;
      this.dish.ingredients = this.inputIngredient;
      this.dish.step = this.steps;

      this.$store.dispatch('addDishItem', this.dish)
      .then(() => {
        this.$router.push('/dishes'); 
      });
    },
    addStep() {
      this.steps.push('');
    },
    subtractStep() {
      if(this.steps.length > 1) this.steps.pop();
    },
    addIngredient() {
      this.inputIngredient.push(['','']);
    },
    subtractIngredient() {
      if(this.inputIngredient.length > 1) this.inputIngredient.pop();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        const imageData = reader.result;
        this.inputImage = imageData;
      };

      reader.readAsDataURL(file);
    }
  },
};
</script> 

<style scoped> 
.frame {
  margin-top: 24px;
  margin-bottom: 24px;
}
.mark {
  padding: 10px;
}
</style>