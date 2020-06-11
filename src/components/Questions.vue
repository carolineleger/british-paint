<template>
  <div class="questions">
    <GoBack v-if="currentQuestion.number !== 'one'"
            currentScreen="questions" 
            @resetActiveItem = "resetActiveItem" />

    <div class="questions__number"> Question {{currentQuestion.number}}</div>

    <!-- fade in/out title -->
    <transition name="slide-fade" mode="out-in">
      <h1 :key="currentQuestion.title">{{ currentQuestion.title }}</h1>
    </transition>

    <!-- fade in/out questions items -->
    <transition name="fade" mode="out-in">
      <div class="questions__items" :key="currentQuestion.number">

        <div v-for="(item, i) in currentQuestion.colours" 
            :key="item.red + item.green + item.blue + i"
            :class="['questions__item', currentQuestion.number, 
                    { 'active': i === activeItem, 
                      'disabled': i !== activeItem && activeItem !== null,
                      'no-name': !item.name
                    }]"
            v-on:click="selectItem(i)">

          <div class="item__circle"
                v-bind:style="[{'backgroundColor': 'rgb('+ item.red + ',' + item.green + ',' + item.blue + ')'}, 
                              item.image ? {'backgroundImage': 'url(' + require('@/assets/img/' + item.image) + ')' } : null]">
          </div>

          <p>{{item.name ? item.name : null}}</p>
        </div>
      </div>
    </transition>

    <NextQuestion :activeItem = activeItem 
                  @resetActiveItem = "resetActiveItem"/>
  </div>
</template>

<script>

import NextQuestion from './elements/NextQuestion.vue'
import GoBack from './elements/GoBack.vue'

export default {
  name: 'Questions',
  components: {GoBack, NextQuestion},

  data() {
    return {
      activeItem: null
    }
  },
  computed: {
    currentQuestion: function() {
      return this.$store.state.currentQuestion;
    },
    selectedColor : function() {
      return this.$store.state.selectedColor;
    }
  },
  mounted() {
    this.$store.commit('updateSelectedColor', this.currentQuestion.color)
    this.$store.commit('updateBg', [this.currentQuestion.color.red, this.currentQuestion.color.green, this.currentQuestion.color.blue])
    this.activeItem = null
	},
  methods: {
    resetActiveItem() {
      this.activeItem = null;
    },
    selectItem(i){
      this.activeItem = i

      if (this.currentQuestion.number === 'one' ) {
        this.$store.commit('setInteriorExterior', this.currentQuestion.colours[i].name) //setup interior/exterior for link on Results page
      } else {
        this.$store.commit('updateSelectedColor', this.currentQuestion.colours[i])

        if (this.currentQuestion.number === 'two') { //question 2 changes background color
          this.$store.commit('updateBg', [this.currentQuestion.colours[i].red, this.currentQuestion.colours[i].green, this.currentQuestion.colours[i].blue])
          this.$store.commit('updatePattern', this.currentQuestion.colours[i].name) //update pattern Whites/Colours/Neutrals/Greys
        }

        if (this.currentQuestion.colours[i].mainTitle) { //if the color selected change the title
          var copyQuestion = JSON.parse(JSON.stringify(this.currentQuestion))
          copyQuestion.title = this.currentQuestion.colours[i].mainTitle
          this.$store.commit('updateCurrentQuestion', copyQuestion)
        }
      }
    },
  },
}
</script>
