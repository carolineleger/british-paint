<template>
  <button ref="tiBtn" v-on:click="animateRipple">
    {{text}}
    <div
      class="ripple"
      v-bind:key = "'ripple-' + i"
      v-bind:ref="'ripple-' + i"
      v-for="(val, i) in ripples"
      v-bind:style="{'top': val.y + '%', 'left': val.x + '%'}"
      v-on:animationend="rippleEnd(i)">
    </div>
  </button>
</template>

<script>

export default {
  name: 'Button',
	props: {
		text: { type: String }
	},
	data: function() {
		return {
			ripples: [],
		}
	},
	methods: {
		animateRipple: function() {
			this.ripples.push({
				x: 40,
				y: 40
			});
		},
		rippleEnd: function(i) {
			this.ripples.splice(i, 1);
			this.$emit('click');
		}
	},
}
</script>
