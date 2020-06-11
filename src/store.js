import Vue from "vue";
import Vuex from "vuex";
import {landing, question1} from './assets/data/data'

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		selectedColor: landing.colours,
		backgroundColor: 'rgb(255,255,255)',
		currentQuestion: question1,
		lastQuestion: false,
		interiorOrExterior: '',
		currentPattern: '',
		popupVisible: '',
		resultsList: '',
		listOrGridView: 'list',
	},
	mutations: {
		updateSelectedColor(state, color) {
			state.selectedColor = new Object(color)
		},
		updateBg(state, color) {
			state.backgroundColor = 'rgb('+ color[0] + ',' + color[1] + ',' + color[2] + ')'
		},
		updateCurrentQuestion(state, newQuestion) {
			state.currentQuestion = newQuestion
		},
		isLastQuestion(state, bool) {
			state.lastQuestion = bool
		},
		updatePattern(state, newPattern) {
			state.currentPattern = newPattern
		},
		togglePopup(state, toggle) {
			state.popupVisible = toggle
		},
		createResultsList(state, list) {
			state.resultsList = list
		},
		setInteriorExterior(state, inout) {
			state.interiorOrExterior = inout
		},
		isListOrGridView(state, view){
			state.listOrGridView = view
		},
	}
})