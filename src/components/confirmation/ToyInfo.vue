<template>
  <div class="row justify-content-center">
    <div class="col-4">
      <img class="img-fluid" :src="toy.picture">
    </div>
    <div class="col-4 text-start">
      <p>Soovid toodet <b>{{ toy.name }}</b></p>
      <p>Andja: <b>{{ toy.userUsername }}</b></p>
      <p>Andja telefoninumber: <b>{{ toy.userMobile }}</b></p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'toyInfo',
  data: function () {
    return {
      toyId: this.$route.query.toyId,
      toy: {
        id: 0,
        userId: 0,
        userUsername: '',
        userMobile: '',
        cityId: 0,
        cityName: '',
        conditionId: 0,
        conditionName: '',
        categoryId: 0,
        categoryName: '',
        name: '',
        description: '',
        picture: '',
        status: ''
      }
    }
  },
  methods: {
    getToy: function () {
      this.$http.get("/toy", {
            params: {
              toyId: this.toyId
            }
          }
      ).then(response => {
        this.toy = response.data
      }).catch(error => {
        console.log(error)
      })
    }
  },
  beforeMount() {
    this.getToy()
  }
}
</script>