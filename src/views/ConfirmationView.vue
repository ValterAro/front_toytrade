<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-4">
        <img class="img-fluid" :src="toy.picture">
      </div>
      <div class="col-4 text-start">
        <p>Soovid toodet <b>{{toy.name}}</b></p>
        <p>Andja telefoninumber: <span>toote nimi</span></p>
        <div id="omniva_container2" class="parcelDropdown"></div>
        <button type="button" class="btn btn-outline-dark mt-3 float-end">Kinnitan</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmationView",
  data: function () {
    return {
      toyId: this.$route.query.toyId,
      toy: {
        id: 0,
        userId: 0,
        userUsername: '',
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
    },
    omnivaWidget: function () {
      var wd2 = new OmnivaWidget({
        compact_mode: true,
        show_offices: false,
        custom_html: false,
        id: 2,
        selection_value: '',
      });

    }
  },
  beforeMount() {
    this.getToy()
    this.omnivaWidget()

  }
}
</script>