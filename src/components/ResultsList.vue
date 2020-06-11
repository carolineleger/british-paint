<template>
  <div class="results-list">
    <ResultsViews currentView= 'list'/>

    <div class="results-list__content">
      <div v-for="(item) in resultsList" 
          v-bind:class="['results-list__item', lightOrDark('rgb('+ item.red + ',' + item.green + ',' + item.blue + ')') ? 'dark' : 'light']"
          v-bind:style="{'backgroundColor': 'rgb('+ item.red + ',' + item.green + ',' + item.blue + ')'}"
          v-on:click="showResult(item)"
          :key="item.colourName + item.id">
          <p>{{item.colourName}}</p>
          <p>{{item.id}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import ResultsViews from './elements/results/ResultsViews'
import {lightOrDark} from '../assets/data/lightOrDark'

export default {
  name: 'ResultsList',
  components: {ResultsViews},

  data() {
    return {
      selectedColor: this.$store.state.selectedColor,
      resultsList: this.$store.state.resultsList,
      lightOrDark: lightOrDark
    }
  },
  mounted() {
    this.$store.commit('updateBg', [this.selectedColor.red, this.selectedColor.green, this.selectedColor.blue])
  },
  methods: {
    showResult(item) {
      this.$store.commit('updateSelectedColor', item)
      this.$store.commit('isListOrGridView', 'list')
      this.$router.push('/results')
    }
  }
}
</script>
