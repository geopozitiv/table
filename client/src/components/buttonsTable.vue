<template>
  <div class="button-inner">
    <addUser :active="active" @closed="setClosed" @editChange="editChange" :edit="edit" />
     <vs-button
        @click="active = true; edit = false"
      >
        Add employee
      </vs-button>
        <vs-button
        flat
        border
        :disabled='!selected.length || selected.length > 1'
        @click="active = true; edit = true"
      >
        Edit
      </vs-button>
        <vs-button
        flat
        border
        danger
        :disabled='!selected.length'
        @click="userDelete()"
      >
        Delete
      </vs-button>
  </div>
</template>

<script>
import addUser from './dialog'

export default {
  data() {
    return {
      active: false,
      edit: false
    }
  },
  computed: {
    selected() {
      return this.$store.state.selected
    }
  },
  components: {
    addUser
  },
  methods: {
    setClosed(val) {
      this.active = val
    },
    userDelete() {
      this.$store.dispatch('deleteUser');
    },
    editChange(val) {
      this.edit = val
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button-inner {
  display: flex;
}
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
