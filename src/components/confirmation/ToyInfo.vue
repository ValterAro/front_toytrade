<template>
  <div class="row justify-content-end">
    <div class="col-6 pe-5">
      <img class="img-fluid" :src="toy.picture">
    </div>
    <div class="col-4 text-start back-white py-3 me-5">
      <p class="fs-5">Soovid toodet <b>{{ toy.name }}</b></p>
      <p>Seisukord <b>{{ toy.conditionName }}</b></p>
      <p>Asukoht <b>{{ toy.cityName }}</b></p>
      <p>Andja: <b>{{ toy.userUsername }}</b></p>
      <p>Andja telefoninumber: <b>{{ toy.userMobile }}</b></p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ToyInfo',
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