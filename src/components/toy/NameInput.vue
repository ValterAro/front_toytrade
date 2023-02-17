<template>
  <div>
    <div>
      <input v-model="toyName" :disabled="isView" type="text" class="form-control" placeholder="Nimi">
    </div>
  </div>
</template>
<script>
export default {
  name: 'NameInput',
  props: {
    isView: Boolean,
    isEdit: Boolean
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