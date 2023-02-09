<template>

  <div class="row justify-content-center">
    <div class="col-2 ">
      <form>
        <div class="mb-3">
          <input v-model="username" type="text" class="form-control" placeholder="Kasutajanimi">
        </div>
        <div class="mb-3">
          <input v-model="password" type="password" class="form-control" placeholder="Parool">
        </div>
        <button v-on:click="sendLoginRequest" type="submit" class="btn btn-primary">Logi sisse</button>
        <p class="mt-4">Pole veel kontot? <router-link to="/register">Registreeru</router-link>!</p>

      </form>
    </div>
  </div>


</template>

<script>
export default {
  name: "LoginView",
  data: function () {

    return {
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
        localStorage.setItem('lang', 'EST')
        this.$emit('emitLoginSuccessEvent')
        this.$router.push({name: 'toy'})

      }).catch(error => {
        this.message = error.response.data.message
        alert(this.message)
      });

    }
  }
}
</script>