<template>
  <div class="has-text-centered">
    <h1 class="title">
      Sorry. Page Not Found :(
    </h1> 
    <p>
      <router-link to="/dishes">
        回首頁
      </router-link>
    </p> 
  </div> 
</template> 

<script> 
export default {
    name: 'NotFound',
}
</script> 

<style scoped> 
</style>