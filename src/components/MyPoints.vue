<template>
  <h3>Minu punktid: {{points}}</h3>
</template>
<script>
export default {
  name: 'MyPoints',
  data: function () {
    return {
      points: 0,
    }
  },
  methods:{
    getMyPoints: function () {
      this.$http.get("/trade/myPoints", {
            params: {
              userId: sessionStorage.getItem('userId'),
            }
          }
      ).then(response => {
        this.points = response.data
      }).catch(error => {
        console.log(error)
      })
    },
  },
  beforeMount() {
    this.getMyPoints()
  }
}
</script>