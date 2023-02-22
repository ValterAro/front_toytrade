<template>
  <div id="app">
    <nav class="navbar navbar-dark menu navbar-expand-lg nav-upper sticky-top">
      <div class="container-fluid">
        <router-link to="/"><img src="@/assets/LeluVahetus.png" alt="Logo" height="60"
                                 class="d-inline-block align-text-top navbar-brand"></router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggler"
                aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse justify-content-center" id="navbarToggler">
          <ul class="navbar-nav">
            <li class="nav-item" data-toggle="collapse" data-target=".navbar-collapse">
              <router-link to="/trade/all" data-toggle="collapse" data-target=".navbar-collapse">Kõik mänguasjad
              </router-link>
            </li>
            <li v-if="userLoggedIn" class="nav-item">
              <router-link to="/trade/me">Minu profiil<span v-if="this.neededActions > 0" class="badge text-bg-danger">{{
                  this.neededActions
                }}</span>
              </router-link>
            </li>
            <li v-if="userLoggedIn" class="nav-item">
              <router-link to="/toy">Lisa mänguasi</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/faq">KKK</router-link>
            </li>
            <li v-if="userLoggedIn && isAdmin" class="nav-item">
              <router-link to="/admin">Administraator</router-link>
            </li>
            <li v-if="userLoggedIn" v-on:click="resetSessionStorage" class="nav-item">
              <router-link to="/">Logi välja</router-link>
            </li>
            <li v-if="!userLoggedIn" class="nav-item">
              <router-link to="/login">Logi sisse</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view @updateActionsEvent="updateActions" @emitLoginSuccessEvent="updateNavigationMenu"/>
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
      neededActions: 0,
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
      this.userLoggedIn = this.userId !== '';
      this.isAdmin = this.roleName === 'admin'
    },
    resetSessionStorage: function () {
      sessionStorage.setItem('userId', this.resetUserId);
      sessionStorage.setItem('roleName', this.resetRoleName)
      this.userLoggedIn = false
      this.roleName = false
    },
    updateActions: function (numberOfActions) {
      this.neededActions = numberOfActions
    }

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
  color: #ffffff;
  font-weight: bold;
}
</style>
