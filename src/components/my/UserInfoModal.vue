<template>
  <Modal :show="showModal">
    <template #header>
      <h5>Muuda andmeid</h5>
      <button type="button" class="btn-close float-end" v-on:click="$emit('close')"
              aria-label="Close"></button>
    </template>
    <template #body>
      <AlertDanger :alert-message="messageError"/>
      <form>
        <div class="txt_field">
          <input v-model="user.username" type="text" required>
          <span></span>
          <label>Kasutajanimi</label>
        </div>
        <div class="txt_field">
          <input v-model="user.password" type="password" required>
          <span></span>
          <label>Parool</label>
        </div>
        <div class="txt_field">
          <input v-model="user.mobile" type="text" required>
          <span></span>
          <label>Telefon</label>
        </div>
      </form>
    </template>
    <template #footer><input type="submit" v-on:click="emitUserInfo" value="Muuda"></template>
  </Modal>
</template>
<script>
import Modal from "@/components/Modal.vue"
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
  name: 'UserInfoModal',
  components: {AlertDanger, Modal},
  props: {
    showModal: {}
  },
  data: function () {
    return {
      messageError: '',
      user: {
        username: '',
        password: '',
        mobile: ''
      }
    }
  },
  methods: {
    emitUserInfo: function () {
      this.messageError = ''
      if (this.user.username === '' || this.user.password === '' || this.user.mobile === '') {
        this.messageError = 'Täida kõik väljad'
      } else {
        this.$emit('emitUserInfoEvent', this.user)
        this.$emit('close')
      }
    },
    populateInputs: function (userInfo) {
      this.user = userInfo
    }
  }

}
</script>