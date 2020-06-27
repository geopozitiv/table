<template>
  <div class="home">
    <tableWithEm/>
    <Buttons/>
  </div>
</template>

<script>
// @ is an alias to /src
import Buttons from '@/components/buttonsTable.vue'
import tableWithEm from '@/components/tableWithEm.vue'

export default {
  name: 'Home',
  components: {
    Buttons,
    tableWithEm
  }
}
</script>
