<template>
  <table class="table table-bordered table-striped">
    <thead class="table-dark">
    <tr>
      <th scope="col">Asukoht</th>
      <th scope="col"></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="city in cities">
      <td>{{ city.cityName }}</td>
      <td class="text-center"><font-awesome-icon icon="fa-solid fa-pencil" class="px-2" /><font-awesome-icon icon="fa-solid fa-trash" class="px-2" /></td>
    </tr>
    <tr>
      <td></td>
      <td class="text-center fs-4"><font-awesome-icon icon="fa-solid fa-circle-plus" /></td>
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