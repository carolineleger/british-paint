  <template>
    <div class="popup"
         v-bind:class="{'hide': !popupVisible, 'slideDown': popupVisible}">
      <p><b>Tip:</b> Grab a sample pot and check the colour throughout the day as colours can look different.</p>

      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" v-on:click="closePopup()">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M19 6.4L17.6 5L12 10.6L6.4 5L5 6.4L10.6 12L5 17.6L6.4 19L12 13.4L17.6 19L19 17.6L13.4 12L19 6.4Z" fill="white"/>
      </svg>
    </div>
</template>

<script>

export default {
  name: 'Popup',

  computed: {
    popupVisible: function() {
      return this.$store.state.popupVisible;
    },
  },
  mounted() {
    if (this.popupVisible === '') {
      setTimeout(() => this.$store.commit('togglePopup', true), 500);
    }
  },
  methods: {
    closePopup(){
      this.$store.commit('togglePopup', false)
    }
  }
}
</script>