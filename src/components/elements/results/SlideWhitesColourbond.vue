<template>
    <div class="complimentary" v-if="allowSlide">
      <img src="../../../assets/img/arrow.svg" alt='' 
           class="arrow arrow-L" v-on:click="slideGrid('left')" 
           v-bind:class="{'slided': slide === 'right'}"
           v-if="slide !== 'left'"/>
      <img src="../../../assets/img/arrow.svg" alt='' 
           class="arrow arrow-R" v-on:click="slideGrid('right')" 
           v-bind:class="{'slided': slide === 'left'}"
           v-if="slide !== 'right'"/>
    </div>
</template>

<script>

export default {
  name: 'SlideWhitesColourbond',
  props: {
    allowSlide: { type: Boolean },
    slide: {type: String}
  },
  methods: {
    slideGrid(arrow) {
      if (arrow === 'left' && this.slide !== 'right') {
        this.$emit('slideGrid', 'left')
      } else if (arrow === 'left' && this.slide === 'right')  {
        this.$emit('slideGrid', 'centerFromL')
      }else if(arrow === 'right' && this.slide !== 'left') {
        this.$emit('slideGrid', 'right')
      }else if(arrow === 'right' && this.slide === 'left') {
        this.$emit('slideGrid', 'centerFromR')
      } 
    }
  }
}
</script>