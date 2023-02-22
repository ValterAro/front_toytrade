<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          <slot name="header">
            <h5>Muuda andmeid</h5>
            <button type="button" class="btn-close float-end" v-on:click="$emit('close')" aria-label="Close"></button>
          </slot>
        </div>

        <div class="modal-body">
          <slot name="body">
            <AlertDanger :alert-message="messageError" />
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
          </slot>
        </div>

        <div class="modal-footer">
          <slot name="footer">
            <input type="submit" value="Muuda" v-on:click="emitUserInfo">
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>
<script>
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
  components: {AlertDanger},
  props: {
    show: Boolean
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
    // updateInfo: function () {
    //   console.log(this.username)
    // },
    populateInputs: function (userInfo) {
      this.user = userInfo
    }
  },
  beforeMount() {
    // this.updateInfo()
  }
}
</script>


<style>
.modal-mask {
  position: fixed;
  z-index: 9999;
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 300px;
  margin: auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  opacity: 1;
  z-index: 100;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>