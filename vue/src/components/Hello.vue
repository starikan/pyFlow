<template>
  <div>
    {{ count }} and {{ countPlus10 }}
    <button @click="increment()">++++++</button>
    <button @click="incrementAsync()">++++++ Lazy</button>
  </div>
</template>



<script>

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'hello',
  computed: {
    ...mapState(['count',]),
    ...mapGetters(['countPlus10',])
  },
  methods: {
    ...mapMutations(['increment']),
    ...mapActions({ incrementAsync: 'increment' })
  }
}
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
