<template>
  <div v-if="alertMessage !==''" class="alert alert-danger" role="alert">{{alertMessage}}</div>
</template>
<script>
export default {
  name: 'AlertDanger',
  props: {
    alertMessage: {}
  }
}
</script>