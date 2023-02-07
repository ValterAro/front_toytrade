<template>

  <div class="row justify-content-center">
    <div class="col-2 ">
      <form v-if="isLogin">
        <div class="mb-3">
          <input v-model="username" type="text" class="form-control" placeholder="Kasutajanimi">
        </div>
        <div class="mb-3">
          <input v-model="password" type="password" class="form-control" placeholder="Parool">
        </div>
        <button v-on:click="sendLoginRequest" type="submit" class="btn btn-primary">Logi sisse</button>
        <p class="mt-4">Pole veel kontot? <a href="" v-on:click.prevent="isLogin = false">Registreeru!</a></p>

      </form>
      <form v-else>
        <div class="mb-3">
          <input v-model="username" type="text" class="form-control" placeholder="Kasutajanimi">
        </div>
        <div class="mb-3">
          <input v-model="password" type="password" class="form-control" placeholder="Parool">
        </div>
        <button v-on:click="sendRegisterRequest" type="submit" class="btn btn-primary">Registreeru</button>
        <p class="mt-4">Konto juba olemas? <a href="" v-on:click.prevent="isLogin = true">Logi sisse!</a></p>
      </form>
    </div>
  </div>


</template>

<script>
export default {
  name: "LoginView",
  data: function () {

    return {
      username: '',
      password: '',
      userDto: {
        username: '',
        password: ''
      },
      isLogin: true,
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
        alert(response.data.roleName)
      }).catch(error => {
        alert(error.response.data.errorCode);
        console.log(error)
      })
    },
    sendRegisterRequest: function () {
      this.userDto.username = this.username;
      this.userDto.password = this.password;

      this.$http.post("/login", this.userDto
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    register: function () {
      this.isLogin = false
    }
  }
}
</script>