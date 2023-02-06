<template>
  <div class="row justify-content-center">
    <div class="col-2">
      <form>
        <div class="mb-3">
          <input v-model="username" type="text" class="form-control" placeholder="Kasutajanimi">
        </div>
        <div class="mb-3">
          <input v-model="password" type="password" class="form-control" placeholder="Parool">
        </div>
        <button v-on:click="sendLoginRequest" type="submit" class="btn btn-primary">Logi sisse</button>
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
      password: ''
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
        console.log(error)
      })
    },
  }
}
</script>