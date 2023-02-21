<template>
  <div class="fs-5">
    Punkte: {{points}}
  </div>
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
      this.$http.get("/users/points", {
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