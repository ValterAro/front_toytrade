<template>
  <div class="row justify-content-center">
    <div class="col-2 ">
      <form>
        <div class="mb-3">
          <input v-model="userDto.username" type="text" class="form-control" placeholder="Kasutajanimi">
        </div>
        <div class="mb-3">
          <input v-model="userDto.password" type="password" class="form-control" placeholder="Parool">
        </div>
        <div class="mb-3">
          <input v-model="userDto.mobile" type="text" class="form-control" placeholder="Telefon">
        </div>
        <button v-on:click="sendRegisterRequest" type="submit" class="btn btn-primary">Registreeru</button>
        <p class="mt-4">Konto juba olemas? <a href="" v-on:click.prevent="isLogin = true">Logi sisse!</a></p>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "RegisterView",
  data: function () {
    return {
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
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>