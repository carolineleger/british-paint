<template>
  <div class="results">
    <GoBack currentScreen="results"/>

    <ResultsViews />
    <ResultsPopup />

    <div class="results__headline">{{resultTitle}}</div>
    <h1>{{selectedColor.colourName}}</h1>
    <h2>{{selectedColor.id}}</h2>

    <a v-on:click="startAgain()"><b>Not right?</b> Start again </a>

    <div class="results__bottom">

      <NewButton :text = buttonText
                  v-on:click="handleOnClick()"></NewButton>

      <p v-if="mobileView">Explore complimentary colours</p>
    </div>

    <div class="results__complimentary-section">
      <div class="results__complimentary" 
           v-for="(item, i) in selectedColor.complimentaryColours"
           :key="item.colourName + i"
           v-bind:class="lightOrDark('rgb('+ item.red + ',' + item.green + ',' + item.blue + ')') ? 'dark' : 'light'"
           v-bind:style="{'backgroundColor': 'rgb('+ item.red + ',' + item.green + ',' + item.blue + ')'}">
        <strong>{{item.colourName}}</strong><br/>
        {{item.id}}
      </div>
    </div>
  </div>
</template>

<script>
import NewButton from './elements/NewButton'
import GoBack from './elements/GoBack.vue'
import ResultsPopup from './elements/results/Popup'
import ResultsViews from './elements/results/ResultsViews'
import {randomTitlesResults} from '../assets/data/data.js'
import allColours from '../assets/data/allColours.json'
import {lightOrDark} from '../assets/data/lightOrDark'

export default {
  name: 'Results',
  components: { NewButton, GoBack, ResultsPopup, ResultsViews },

  data() {
    return {
      currentPattern: this.$store.state.currentPattern,
      buttonText: 'Buy online at Bunnings',
      lightOrDark: lightOrDark,
      mobileView: true,
      interiorOrExterior: this.$store.state.interiorOrExterior,
      resultTitle: randomTitlesResults[Math.floor(Math.random() * Math.floor(randomTitlesResults.length))],
    }
  },
  computed: {
    selectedColor : function() {
      return this.$store.state.selectedColor;
    },
  },
  mounted() {
    this.$store.commit('updateBg', [this.selectedColor.red, this.selectedColor.green, this.selectedColor.blue])
    this.findInAllColours()
    this.handleResize();
  },
  methods: {
    startAgain() {
      this.$router.push('/')
    },
    handleResize() {
      window.innerWidth > 767 ? this.mobileView = false : this.mobileView = true
    },
    handleOnClick() {
      if (this.interiorOrExterior === 'interior') {
        window.open('https://www.bunnings.com.au/our-range/paint-decorating/paint/interior/wall?facets=BrandName%3DBritish%20Paints', "_blank")
      } else { window.open('https://www.bunnings.com.au/our-range/paint-decorating/paint/exterior/wall?facets=BrandName%3DBritish%20Paints', "_blank") }
    },
    findInAllColours(){ //match result from questionsJourney.json to allColours.json
      for (var i = 0; i < allColours.length; i++) {
        if (this.selectedColor.id === allColours[i].id) {
          this.$store.commit('updateSelectedColor', allColours[i])
        }
      }
    }
  }
}
</script>
