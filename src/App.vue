<template>
  <div id="app"
       v-bind:class="lightBG ? 'light' : 'dark'"
       v-bind:style="{'backgroundColor': backgroundColor, 'height': windowHeight + 'px'}">

    <div class="main"
         v-bind:style="{'height': windowHeight + 'px'}">

      <div class="logo" v-on:click="handleClick()"></div>

      <transition name="fade" mode="out-in">
        <router-view></router-view>
      </transition>

      <SelectedColor v-if="currentRouteName === 'questions' || currentRouteName === 'landing'" />
    </div>
  </div>
</template>

<script>
import {lightOrDark} from './assets/data/lightOrDark'
import SelectedColor from './components/elements/SelectedColor.vue'

export default {
  name: 'App', 
  data() {
    return {
      windowHeight: 0,
      lightBG: false,
      lightOrDark: lightOrDark
    }
  },
  components: {SelectedColor},
  computed: {
    backgroundColor() {
      return this.$store.state.backgroundColor;
    },
    currentRouteName(){
      return this.$route.name
    }
  },
  mounted() {
    this.windowHeight = window.innerHeight //maximum height for mobile to avoid scrolling
    window.addEventListener('resize', this.onResize);
  },
  beforeDestroy() { 
    window.removeEventListener('resize', this.onResize); 
  },
  onResize() {
    this.windowHeight = window.innerHeight
  },
  watch: {
    backgroundColor(newValue) {
      this.lightBG = this.lightOrDark(newValue)
    }
  },
  methods: {
    handleClick() {
      window.open('https://www.britishpaints.com.au', "_blank")
    },  
  }
}
</script>

<style lang="scss">
  @import "./assets/sass/main.scss";
</style>

