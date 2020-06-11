<template>
  <div class="results-gallery__grid"
        ref="grid"
        v-bind:style="{'height': gridHeight + 'px' }"
        v-bind:class="[grid, {'all-visible': activeColors.length === 0}]">

    <div v-for="(item, i) in resultsGrid" 
        :key="item + i"
        ref="gridBlock"
        v-on:click="activate(item)"
        v-bind:style="[{'backgroundColor': 'rgb('+ item.red + ',' + item.green + ',' + item.blue + ')'}, {'height': gridBlockHeight + 'px'}]"
        v-bind:class="['grid__block', {'active': activeColors.includes(convertToCompare(item)) }]">
    </div>
  </div>
</template>

<script>
import colorwall from '../../../assets/data/allColours.json'

export default {
  name: 'ColorGrid',
  props: {
    grid: { type: String },
	},

  data() {
    return {
      resultsGrid: [],
      gridBlockHeight: 0,
      gridHeight: 500,
      activeColors: [],
      resultsList: this.$store.state.resultsList,
      colorWall: colorwall
    }
  },
  computed: {
    selectedColor: function() {
      return this.$store.state.selectedColor;
    },
  },
  mounted(){    
    if (this.currentPattern !== "white") {
      this.checkActiveColors()
    }

    this.reOrderWall()
    this.setupWall()
  },
  methods: {
    reOrderWall(){
      this.colorwall = colorwall.sort(
        function(a, b) {
          // compare columns
          if (a.column < b.column)
            return -1;
          else if (a.column > b.column)
            return 1;

          // columns were equal, rows
          if (a.row < b.row)
            return -1;
          else if (a.row > b.row)
            return 1;
          return 0;
        }
      );
    },
    setupWall(){
      for (var i = 0; i < this.colorWall.length; i ++) {
        if (this.colorWall[i].wall === this.grid) { //push to current grid (core, white, colourbond)
          this.resultsGrid.push(this.colorWall[i])
        } 
      }

      if (this.grid === 'core') {
        this.$nextTick(()=>{
          this.gridBlockHeight = this.$refs.gridBlock[0].clientWidth/1.3 // keep block with design ratio
          this.gridHeight = Math.ceil(this.gridBlockHeight * 23) // define grid height
        })
      }
    },
    checkActiveColors() {
      for (var i = 0; i < this.resultsList.length; i ++) {
        this.activeColors.push(this.convertToCompare(this.resultsList[i]));
      }
    },
    activate(item) {
      this.$store.commit('updateSelectedColor', item)
      this.$store.commit('isListOrGridView', 'grid')
      this.$router.push('/results');
    },
    convertToCompare(item) { // convert rgb values to string to compare
      return "" + item.red + item.green + item.blue
    }
  }
}
</script>
