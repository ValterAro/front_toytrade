<template>
  <div class="row justify-content-center">
    <div class="col-2 ">
      <div class="center">
        <font-awesome-icon icon="fa-solid fa-user-plus" class="login-icon fs-1 circle-icon" />
        <AlertDanger :alert-message="messageError"/>
        <AlertSuccess :alert-message="messageSuccess"/>
        <form>
          <div class="txt_field">
            <input v-model="userDto.username" type="text" required>
            <span></span>
            <label>Kasutajanimi</label>
          </div>
          <div class="txt_field">
            <input v-model="userDto.password" type="password" required>
            <span></span>
            <label>Parool</label>
          </div>
          <div class="txt_field">
            <input v-model="userDto.mobile" type="text" required>
            <span></span>
            <label>Telefon</label>
          </div>
          <input v-on:click="sendRegisterRequest" type="submit" value="Registreeru">
          <div class="signup_link">
            Konto juba olemas? <router-link to="/login">Logi sisse</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import AlertDanger from "@/components/alert/AlertDanger.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";

export default {
  name: "RegisterView",
  components: {AlertSuccess, AlertDanger},
  data: function () {
    return {
      messageError: '',
      messageSuccess: '',
      userDto: {
        username: '',
        password: '',
        mobile: ''
      }
    }
  },
  methods: {
    sendRegisterRequest: function () {
      this.$http.post("/register", this.userDto
      ).then(response => {
        this.messageSuccess = 'Kasutaja edukalt lisatud!'
        setTimeout(() => {
          this.$router.push({name: 'login'})
        }, 2000)
      }).catch(error => {
        this.alertMessage = error.response.data.message
      })
    }
  }
}
</script>