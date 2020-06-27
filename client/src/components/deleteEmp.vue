<template>
  <div>
    <addUser :active="active" @closed="setClosed" />
     <vs-button
        flat
        @click="active = true"
      >
        Add employee
      </vs-button>
  </div>
</template>

<script>
import addUser from './dialog'

export default {
  data() {
    return {
      active: false
    }
  },
  components: {
    addUser
  },
  methods: {
    setClosed(val) {
      this.active = val
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
