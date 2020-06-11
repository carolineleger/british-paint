<template>
  <div class="mixing">
    <div class="wave-container">
      <div class='wave' 
           v-bind:style="{'backgroundColor': 'rgb('+ currentWaveColor[0] + ',' + currentWaveColor[1] + ',' + currentWaveColor[2] + ')'}"
           v-if = !this.resultsReady
      ></div>
    </div>

    <div class="mixing__content">
      <div v-if = "resultsReady" class="ding-icon">
        <ul class="bursts">
          <li class="deg0"></li>
          <li class="deg36"></li>
          <li class="deg72"></li>
          <li class="deg108"></li>
          <li class="deg144"></li>
          <li class="deg180"></li>
          <li class="deg216"></li>
          <li class="deg252"></li>
          <li class="deg288"></li>
          <li class="deg324"></li>
        </ul>
      </div>

      <h1>{{title}}</h1>
      <p v-if = "resultsReady">Your results are in</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Mixing',
  data(){
    return{
      title: "Mixing...",
      bgRed: [33,212,247],
      bgGreen: [46,27,181],
      bgBlue: [132,93,0],
      waveRed: [50,224,247],
      waveGreen: [197,92,207],
      waveBlue: [255,139,97],
      currentWaveColor: '',
      resultsReady: false
    }
  },
  mounted() {
    this.updateSelectedColor(0)
    this.animateBg()
  },
  methods: {
    updateSelectedColor(id) {
      this.$store.commit('updateBg', [this.bgRed[id], this.bgGreen[id], this.bgBlue[id]])
      this.currentWaveColor = [this.waveRed[id], this.waveGreen[id], this.waveBlue[id]]
    },
    animateBg(){
      setTimeout(() => this.updateSelectedColor(1), 1000);
      setTimeout(() => this.updateSelectedColor(2), 2000);
      setTimeout(() => this.finishAnimation(), 3000);
    },
    finishAnimation() {
      this.$store.commit('updateBg', [this.bgRed[0], this.bgGreen[0], this.bgBlue[0]])
      this.resultsReady = true;
      this.title = "Ding!"
      setTimeout(() => this.$router.push('/results-list'), 2000);
    }
  }
}
</script>
