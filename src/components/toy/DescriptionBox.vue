<template>
  <div>
    <div>
      <div class="input-group col-3">
        <span class="input-group-text">Kirjeldus</span>
        <textarea v-model="changedDescription" :disabled="isView" class="form-control"
                  aria-label="With textarea"></textarea>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DescriptionBox',
  props: {
    isView: Boolean,
    isEdit: Boolean
  },
  data: function () {
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