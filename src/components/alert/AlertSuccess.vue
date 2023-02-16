<template>
  <div v-if="alertMessage != ''" class="alert alert-success" role="alert">
    {{alertMessage}}
  </div>
</template>
<script>
export default {
  name: 'AlertSuccess',
  props: {
    alertMessage: {}
  }
}
</script>