<template>
  <div>
    <div class="input-group col-3">
      <span class="input-group-text">Kirjeldus</span>
      <textarea v-model="changedDescription" class="form-control" aria-label="With textarea"></textarea>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DescriptionBox',
  props: {
    selectedToy: {}
  },
  data: function() {
    return {

      changedDescription: '',

    }
  },

  methods: {

    emitChangedDescription: function () {
      this.$emit('emitDescriptionInputEvent', this.changedDescription)
    },

    setDescriptionBoxValue: function (descriptionInput) {
      this.changedDescription = descriptionInput
    }
  }
}
</script>