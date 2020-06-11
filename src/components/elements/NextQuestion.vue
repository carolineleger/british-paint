<template>
    <NewButton v-on:click="next()"
            v-bind:style="currentQuestion.number === 'three' || currentQuestion.number === 'four' ? 
                         {'backgroundColor': 'rgb('+ selectedColor.red + ',' + selectedColor.green + ',' + selectedColor.blue + ')'}: null"
            v-bind:class="[{'white' : selectedColor.type === 'dark'}, {'visible': activeItem !== null}]"
            text="Next">
    </NewButton>
</template>

<script>
import { question1, question2, question3Colour } from '../../assets/data/data'
import NewButton from './NewButton.vue'
import questionsJourney from '../../assets/data/questionsJourney.json'

export default {
  name: 'NextQuestion',
  components: {NewButton},
  props:{
		activeItem: { type: Number }
	},
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
    lastQuestion: function() {
      return this.$store.state.lastQuestion;
    }
  },
  methods: {
    next() {
      if (this.lastQuestion) { // if it's the last question, generate results list, update selected color, reset question and go to mixing
        this.$store.commit('createResultsList', this.currentQuestion.colours[this.activeItem].colours)
        this.$store.commit('updateSelectedColor', this.currentQuestion.colours[this.activeItem])
        this.$store.commit('updateCurrentQuestion', question1)
        this.$store.commit('isLastQuestion', false)
        this.$router.push('/mixing')
      } else {
        //special question one
        if (this.currentQuestion.number === "one") {
          this.questionOne()
        } else {
          switch (this.currentPattern) {
            case 'Whites':
              this.whitePath();
              break;
            case 'Greys':
              this.greyPath();
              break;
            case 'Neutrals':
              this.neutralPath();
              break;
            case 'Colours':
              this.colorPath();
              break;
            default:
              break;
          }
        }
        this.$store.commit('updateSelectedColor', this.currentQuestion.color)
        this.$store.commit('updateBg', [this.currentQuestion.color.red, this.currentQuestion.color.green, this.currentQuestion.color.blue])

        this.$emit('resetActiveItem')//unselect item
      }
    },
    questionOne() {
      this.$store.commit('updateCurrentQuestion', question2)
    },
    colorPath() {
      if (this.currentQuestion.number === 'two') {
        this.$store.commit('updateCurrentQuestion', question3Colour)
      } else {
        this.commonPath()
        this.$store.commit('isLastQuestion', true)
      }
    },
    whitePath() {
      this.commonPath()
      this.$store.commit('isLastQuestion', true)
    },
    greyPath(){
      if(this.currentQuestion.number === 'two') {
        this.commonPath()
      } else {
        this.greyNeutralSecondPath()
      }
    },
    neutralPath(){
      if(this.currentQuestion.number === 'two') {
        this.commonPath()
      } else {
        this.greyNeutralSecondPath()
      }
    },
    commonPath() {
      var copyQuestion = JSON.parse(JSON.stringify(this.currentQuestion))
      var currentJourney = ''

      for (var i = 0; i < questionsJourney.length; i ++) {
        if (questionsJourney[i].name == this.selectedColor.category) {
          currentJourney = questionsJourney[i].colours
        }
      }
      copyQuestion.title = 'Which '+ this.selectedColor.category +' do you prefer?'
      copyQuestion.number === 'two' ? copyQuestion.number = "three": copyQuestion.number = "four"
      copyQuestion.colours = currentJourney

      this.$store.commit('updateCurrentQuestion', copyQuestion)
    },
    greyNeutralSecondPath() {
      var copyQuestion = JSON.parse(JSON.stringify(this.currentQuestion))
      copyQuestion.title = 'Do you prefer the two on the left or on the right?'
      copyQuestion.number = "four"
      copyQuestion.colours = this.currentQuestion.colours[this.activeItem].colours
      this.$store.commit('updateCurrentQuestion', copyQuestion)
      this.$store.commit('isLastQuestion', true)
    },
  }
}
</script>
