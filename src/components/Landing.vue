<template>
  <div class="landing">
    <h1>{{title}}</h1>

    <div class="landing__subtitle">
      <sup>* </sup>Fear Of Mucking Up
    </div>

    <p class="landing__subtitle2">Answer a few questions to find your perfect colour.</p>

    <NewButton text ='Find your perfect colour'
               v-on:click="getStarted()"></NewButton>

  </div>
</template>

<script>
import NewButton from './elements/NewButton'
import {landing} from '../assets/data/data'

export default {
  name: 'Landing',
  components: { NewButton },

  data() {
    return {
      title: landing.title,
    }
  },
  mounted() {
    this.updateSelectedColor()
	},
  methods: {
    updateSelectedColor() {
      this.$store.commit('updateSelectedColor', landing.colours)
      this.$store.commit('updateBg', [landing.colours.red, landing.colours.green, landing.colours.blue])
    },
    getStarted() {
      this.$router.push('/questions')
    },
  }

}
</script>
