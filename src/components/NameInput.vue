<template>
  <div>
    <span class="input-group-text">Nimi</span>
    <input v-model="toyName" :disabled="isView" type="text" class="form-control">
  </div>
</template>
<script>
export default {
  name: 'NameInput',
  props: {
    isView: Boolean
  },
  data: function () {
    return {
      toyName: '',
    }
  },
  methods: {

    emitToyName: function () {
      this.$emit('emitToyNameEvent', this.toyName)
    },

    setToyName(toyName) {
      this.toyName = toyName
    }


  }
}

</script>