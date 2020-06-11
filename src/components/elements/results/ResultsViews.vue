<template>
  <div class="results__views">
    <!-- List-->
    <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg" 
         v-bind:class="['icon-list', {'active': currentView === 'list'}]"
         v-on:click="toggleView('list')">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M0 12H18V10H0V12ZM0 7H18V5H0V7ZM0 0V2H18V0H0Z"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M0 15V17H18V15H0Z"/>
    </svg>

    <!-- Gallery -->
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
         v-bind:class="['icon-colorwall', {'active': currentView === 'gallery'}]"
         v-on:click="toggleView('gallery')">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M4 8H8V4H4V8ZM10 20H14V16H10V20ZM4 20H8V16H4V20ZM4 14H8V10H4V14ZM10 14H14V10H10V14ZM16 4V8H20V4H16ZM10 8H14V4H10V8ZM16 14H20V10H16V14ZM16 20H20V16H16V20Z"/>
    </svg>

  </div>
</template>

<script>

export default {
  name: 'ResultsViews',
  props: ['currentView'],
	data: function() {
		return {
		}
	},
	methods: {
    toggleView(view) {
      if (view === 'list') {
        this.$router.push('/results-list')
      } else {
        this.$router.push('/results-gallery')
      }
    }
  }
}
</script>
