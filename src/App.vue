<template>
  <div id="app">
    <nav class="text-uppercase mx-3">
      <router-link class="mx-1 text-decoration-none" to="/">Avaleht</router-link>
      <router-link class="mx-1 text-decoration-none" to="/trade/trades">Kõik mänguasjad</router-link>
      <router-link class="mx-1 text-decoration-none" v-if="userLoggedIn" to="/trade/me">Minu profiil</router-link>
      <router-link class="mx-1 text-decoration-none" v-if="userLoggedIn" to="/toy">Lisa mänguasi</router-link>
      <router-link class="mx-1 text-decoration-none" to="/faq">KKK</router-link>
      <router-link class="mx-1 text-decoration-none" v-if="userLoggedIn && isAdmin" to="/admin">Administraator</router-link>
      <router-link class="mx-1 text-decoration-none" to="/confirmation">Confirmation</router-link>
      <router-link class="mx-1 text-decoration-none" v-if="!userLoggedIn" to="/login">Logi sisse</router-link>
      <router-link class="mx-1 text-decoration-none" v-if="userLoggedIn" v-on:click.native="resetSessionStorage" to="/">Logi välja</router-link>
    </nav>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
