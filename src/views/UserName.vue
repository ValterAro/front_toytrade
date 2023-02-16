<template>
  <h3>Kasutaja: {{username}}</h3>
</template>
<script>
export default {
  name: 'UserName',
  data: function () {
    return {
      username: ''
    }
  },
  methods:{
    getMyUsername: function () {
      this.$http.get("/trade/my-username", {
            params: {
              userId: sessionStorage.getItem('userId'),
            }
          }
      ).then(response => {
        this.username = response.data
      }).catch(error => {
        console.log(error)
      })
    },
  },
  beforeMount() {
    this.getMyUsername()
  }
}
</script>