<template>
  <div class="selected-color">
    <p><strong>{{selectedColor.colourName.toLowerCase()}}</strong></p>
    <span>{{selectedColor.id}}</span>
  </div>
</template>

<script>
export default {
  name: 'SelectedColor',

  computed: {
    selectedColor: function() {
      return this.$store.state.selectedColor;
    }
  }
}
</script>
