<template>
  <div id="app">
    <div class="card">
      <div class="card-header">
        <TheNavigation/>
      </div>
      <div class="card-body">
        <transition name="slide" mode="out-in">
          <router-view/>  
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import TheNavigation from '@/components/TheNavigation.vue'
export default {
  components:{
    TheNavigation
  }
};
</script>

<style>

.slide-enter-active {
  transition: .5s;
}

.slide-leave-active {
  transition: 1s;
}

.slide-enter, .slide-leave-to {
  opacity: 0;
}

</style>
