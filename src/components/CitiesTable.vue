<template>
  <table class="table table-bordered table-striped">
    <thead class="table-dark">
    <tr>
      <th scope="col">Asukoht</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="city in cities">
      <td>{{ city.cityName }}</td>
    </tr>

    </tbody>
  </table>
</template>

<script>
export default {
  name: "CitiesTable",
  data: function () {
    return {
      cities: [
        {
          cityId: 0,
          cityName: '',
        }
      ]
    }
  },
  methods: {
    getAllCities: function () {
      this.$http.get("/cities")
          .then(response => {
            this.cities = response.data
          })
          .catch(error => {
            console.log(error)
          })
    }
  },
  beforeMount() {
    this.getAllCities()
  }
}
</script>