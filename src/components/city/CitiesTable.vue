<template>
  <table class="table table-striped box-shadow">
    <thead>
    <tr>
      <th scope="col">Asukoht</th>
      <th scope="col"></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="city in cities" :key="city.cityId" :class="{editing: city === editedCity}"
        v-cloak>
      <td>
        <div class="view">
          {{ city.cityName }}
        </div>
        <div class="edit">
          <input class="tableInput" type="text" v-model="city.cityName" :placeholder="city.cityName"/>
        </div>
      </td>
      <td class="text-center align-middle">
        <font-awesome-icon icon="fa-solid fa-pencil" class="px-2 fs-5 actionButton view"
                           v-on:click="editData(city)"/>
        <font-awesome-icon icon="fa-solid fa-circle-check" class="px-2 fs-5 actionButton edit"
                           v-on:click="saveData(city)"/>
        <font-awesome-icon icon="fa-solid fa-solid fa-trash" class="px-2 fs-5 actionButton view"
                           v-on:click="deleteCity(city.cityId)"/>
        <font-awesome-icon icon="fa-solid fa-circle-xmark" class="px-2 fs-5 actionButton edit"
                           v-on:click="cancelEdit"/>
      </td>
    </tr>
    <tr>
      <td><input class="tableInput" v-if="isAdd === true" type="text" v-model="city.cityName" placeholder="Asukoht"/>
      </td>
      <td class="text-center fs-4">
        <font-awesome-icon icon="fa-solid fa-circle-plus" v-if="isAdd === false" class="actionButton"
                           v-on:click="inputNewCity"/>
        <font-awesome-icon icon="fa-solid fa-circle-check" v-if="isAdd === true" class="px-2 fs-5 actionButton"
                           v-on:click="addCity"/>
        <font-awesome-icon icon="fa-solid fa-circle-xmark" v-if="isAdd === true" class="px-2 fs-5 actionButton"
                           v-on:click="isAdd = false"/>
      </td>
    </tr>

    </tbody>
  </table>
</template>

<script>
export default {
  name: "CitiesTable",
  data: function () {
    return {
      editedCity: null,
      isAdd: false,
      cities: [
        {
          cityId: 0,
          cityName: '',
        }
      ],
      city: {
        cityName: ''
      }
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
    },
    editData(city) {
      this.editedCity = city
    },
    saveData(city) {
      this.city.cityName = city.cityName
      this.updateCity(city.cityId)
      this.editedCity = null;
    },
    cancelEdit() {
      this.editedCity = null;
    },
    deleteCity: function (cityId) {
      this.$http.delete("/cities", {
            params: {
              cityId: cityId
            }
          }
      ).then(response => {
        this.getAllCities()
      }).catch(error => {
        console.log(error)
      })
    },
    inputNewCity: function () {
      this.isAdd= true
    },
    addCity: function () {
      this.$http.post("/cities", this.city
      ).then(response => {
        this.isAdd = false
        this.getAllCities()
      }).catch(error => {
        console.log(error)
      })
    },
    updateCity: function (cityId) {
      this.$http.put("/cities", this.city, {
            params: {
              cityId: cityId
            }
          }
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    }
  },
  beforeMount() {
    this.getAllCities()
  }
}
</script>