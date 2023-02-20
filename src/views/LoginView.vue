<template>
  <div class="row justify-content-center">

    <div class="col-2 ">
      <div class="center">
        <font-awesome-icon icon="fa-solid fa-user" class="login-icon fs-1 circle-icon"/>
        <AlertDanger :alert-message="messageError"/>
        <form>
          <div class="txt_field">
            <input v-model="username" type="text" required>
            <span></span>
            <label>Kasutajanimi</label>
          </div>
          <div class="txt_field">
            <input v-model="password" type="password" required>
            <span></span>
            <label>Parool</label>
          </div>
          <input v-on:click="login" type="submit" value="Logi sisse">
          <div class="signup_link">
            Pole veel kontot?
            <router-link to="/register">Registreeru</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
  name: "LoginView",
  components: {AlertDanger},
  data: function () {

    return {
      messageError: '',
      loginResponse: {
        userId: '',
        roleName: '',
      },
      message: '',
      username: '',
      password: '',
      userDto: {
        username: '',
        password: ''
      },
      categoryId: 1
    }
  },
  methods: {
    login: function () {
      this.messageError = ''
      if (this.username === '' || this.password === '') {
        this.messageError = 'Täida kõik väljad';
      } else {
        this.sendLoginRequest();
      }
    },
    sendLoginRequest: function () {
      this.$http.get("/login", {
            params: {
              username: this.username,
              password: this.password
            }
          }
      ).then(response => {
        this.loginResponse = response.data
        sessionStorage.setItem('userId', this.loginResponse.userId)
        sessionStorage.setItem('roleName', this.loginResponse.roleName)
        this.$emit('emitLoginSuccessEvent')
        this.$router.push({name: 'mytrades'})
      }).catch(error => {
        this.messageError = error.response.data.message
      });

    }
  }
}
</script>