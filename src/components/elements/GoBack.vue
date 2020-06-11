<template>
  <div class="back" v-on:click="goBack()">
    <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M7.5 1.38462L6.09375 0L0 6L6.09375 12L7.5 10.6154L2.8125 6L7.5 1.38462Z" fill="#8B8C8F"/>
    </svg>
  </div>
</template>

<script>
import { question1, question2, question3Colour } from '../../assets/data/data'
import questionsJourney from '../../assets/data/questionsJourney.json'

export default {
  name: 'GoBack',
  props: ['currentScreen'],
  computed: {
    currentQuestion: function() {
      return this.$store.state.currentQuestion;
    },
    selectedColor : function() {
      return this.$store.state.selectedColor;
    },
    currentPattern : function() {
      return this.$store.state.currentPattern;
    },
    listOrGridView: function() {
      return this.$store.state.listOrGridView
    }
  },
  methods: {
    goBack() {
      //QUESTIONS PATH
      if(this.currentScreen === 'questions') {
        this.$store.commit('isLastQuestion', false)

        if (this.currentQuestion.number === 'two') {
          this.$store.commit('updateCurrentQuestion', question1)
        } else if (this.currentQuestion.number === 'three') {
          this.$store.commit('updateCurrentQuestion', question2)
        } else if (this.currentQuestion.number === 'four' && this.currentPattern === 'Colours') {
          this.$store.commit('updateCurrentQuestion', question3Colour)
        } else if (this.currentPattern === 'Greys' || this.currentPattern === 'Neutrals') {
          var copyQuestion = JSON.parse(JSON.stringify(this.currentQuestion))
          for (var i = 0; i < questionsJourney.length; i ++) {
            if (questionsJourney[i].name == this.currentPattern) {
              copyQuestion.colours = questionsJourney[i].colours
            }
          }
          copyQuestion.number = "three"
          copyQuestion.title = 'Which '+ this.currentPattern +' do you prefer?'
          this.$store.commit('updateCurrentQuestion', copyQuestion)
        }
        this.$store.commit('updateBg', [this.currentQuestion.color.red, this.currentQuestion.color.green, this.currentQuestion.color.blue])
        this.$store.commit('updateSelectedColor', this.currentQuestion.color)
        this.$emit('resetActiveItem') //unselect color
      } 
      ///RESULTS
      else if (this.currentScreen === 'results') { 
        if (this.listOrGridView === 'list') { //check if we come from the list view or grid view
          this.$router.push('/results-list')
        } else { this.$router.push('/results-gallery') }
      }
    },
  }
}
</script>
