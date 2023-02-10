<template>
  <div>
    <div class="custom-file">
      <div class="input-group">
        <input v-on:change="handleImage" type="file" class="form-control" id="inputGroupFile04" aria-describedby="inputGroupFileAddon04" aria-label="Upload">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ImageInput',
  data: function () {
    return {
      pictureDataBase64: String
    }
  },
  methods: {
    handleImage: function (event) {
      const selectedImage = event.target.files[0];
      this.emitBase64(selectedImage);
    },

    emitBase64: function (fileObject) {
      const reader = new FileReader();
      reader.onload = () => {
        this.pictureDataBase64 = reader.result;
        this.$emit('emitBase64Event', this.pictureDataBase64)
      };
      reader.onerror = function (error) {
        alert(error);
      }
      reader.readAsDataURL(fileObject);
    }
  }
}
</script>