<template>
  <div class="results-gallery">
    <ResultsViews currentView= 'gallery'/>

    <div class="results-gallery__header">
      <div class="header__headline">{{resultTitle}}</div>
      <h1>{{selectedColor.colourName}}</h1>
      <h2>{{selectedColor.id}}</h2>
    </div>

    <!-- Zoom/pan main grid -->
    <!-- component panzoom doc: https://github.com/anvaka/panzoom & https://www.npmjs.com/package/vue-panzoom -->
    <div class="zoom-container">
      <panZoom :options="{minZoom: 1, maxZoom: 6, bounds: true, boundsPadding: 1, zoomSpeed: 0.04, zoomDoubleClickSpeed: 1, onTouch: function(e) {return false;}}"
               @zoom = onZoom>
        <div>
          <!-- Pinch/zoom image overlay -->
          <div class="pinch-zoom-overlay" v-bind:class="{'fadeOut': !overlayVisible}"></div>

          <!-- Whites section left -->
          <div class="grid-left" v-if="slide === 'left' || !mobileView">
            <h3>Whites</h3>
            <ColorGrid grid="whites"/>
          </div>
          
          <!-- main grid -->
          <ColorGrid grid="core" v-bind:class="slide" />

          <!-- Colorbond section right -->
          <div class="grid-right" v-if="slide === 'right' || !mobileView">
            <h3>Colorbond®</h3>
            <ColorGrid grid="colourbond"/>
          </div>
        </div>
      </panZoom>

      <SlideWhitesColourbond :slide = slide
                            :allowSlide = allowSlide 
                            @slideGrid = slideGrid
                            v-if="mobileView" />
    </div>

  </div>
</template>

<script>
import ResultsViews from './elements/results/ResultsViews'
import ColorGrid from './elements/results/ColorGrid'
import SlideWhitesColourbond from './elements/results/SlideWhitesColourbond'
import {randomTitlesResults} from '../assets/data/data.js'

export default {
  name: 'ResultsGallery',
  components: {ResultsViews, ColorGrid, SlideWhitesColourbond},

  data() {
    return {
      selectedColor: this.$store.state.selectedColor,
      resultsList: this.$store.state.resultsSList,
      resultTitle: randomTitlesResults[Math.floor(Math.random() * Math.floor(randomTitlesResults.length))],
      allowSlide: true,
      overlayVisible: true,
      slide: 'center',
      mobileView: true,
    }
  },
  mounted() {
    this.$store.commit('updateBg', [255,255,255]);
    this.overlayVisible = false;
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    onZoom(panzoomInstance) {
      if (panzoomInstance.getTransform().scale <= 1) { //hide slide to whites/colourbonds option when zoomed in
        this.allowSlide = true;
      } else {
        this.allowSlide = false;
      }
    },
    handleResize() {
      window.innerWidth > 767 ? this.mobileView = false : this.mobileView = true
    },
    slideGrid(slide){
      this.slide = slide //slide left center or right
    }
  },
}
</script>
