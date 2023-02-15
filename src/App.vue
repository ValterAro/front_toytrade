<template>
  <div id="app">
<div class="container">
    <nav class="navbar bg-white sticky-top mb-5">
      <router-link class="navbar-brand" to="/"><img src="@/assets/toys_logo.png" alt="Logo" height="24" class="d-inline-block align-text-top"></router-link>
      <router-link to="/trade/trades">Kõik mänguasjad</router-link>
      <router-link v-if="userLoggedIn" to="/trade/me">Minu profiil</router-link>
      <router-link v-if="userLoggedIn" to="/toy">Lisa mänguasi</router-link>
      <router-link to="/faq">KKK</router-link>
      <router-link v-if="userLoggedIn && isAdmin" to="/admin">Administraator</router-link>
      <router-link v-if="!userLoggedIn" to="/login">Logi sisse</router-link>
      <router-link v-if="userLoggedIn" v-on:click.native="resetSessionStorage" to="/">Logi välja</router-link>
    </nav>
</div>
    <router-view @emitLoginSuccessEvent="updateNavigationMenu"/>

  </div>

</template>


<script>
export default {
  name: "App",
  mounted() {
    document.title = "Mänguasjavahetus";
        this.updateNavigationMenu()
  },
  data: function () {
    return {
      userLoggedIn: false,
      isAdmin: false,
      resetUserId: '',
      resetRoleName: '',
      userId: sessionStorage.getItem('userId'),
      roleName: sessionStorage.getItem('roleName')

    }
  },
  methods: {

    updateNavigationMenu: function () {
      this.userId = sessionStorage.getItem('userId'),
          this.roleName = sessionStorage.getItem('roleName')
      this.userLoggedIn = this.userId != null;
      this.isAdmin = this.roleName === 'admin'
    },
      resetSessionStorage: function () {
       sessionStorage.setItem('userId', this.resetUserId);
       sessionStorage.setItem('roleName', this.resetRoleName)
        this.userLoggedIn = false,
            this.roleName = false

      },


    }


};


</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap');
#app {
  font-family: 'Montserrat', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
