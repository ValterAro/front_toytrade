<template>
  <div>
    <div v-if="isView || isEdit">
      <div class="dropdown">
        <select v-model="selectedCityId" :disabled="isView" class="form-select col-3"
                aria-label="Default select example">>
          <option value="0" disabled>Linn</option>
          <option :selected="isView" :disabled="isView" v-for="city in cities" :value="city.cityId">
            {{ city.cityName }}
          </option>
        </select>
      </div>
    </div>
    <div>
      <div class="dropdown">
        <select v-model="selectedCityId" class="form-select col-3"
                aria-label="Default select example">>
          <option value="0" disabled>Linn</option>
          <option v-for="city in cities" :value="city.cityId">
            {{ city.cityName }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CityDropdown',
  props: {
    isView: Boolean,
    isEdit: Boolean
  },
  data: function () {
    return {

      selectedCityId: 0,


      cities: [
        {
          cityId: 0,
          cityName: '',
        }
      ],
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

    emitSelectedCityId: function () {

      this.$emit('emitCityIdEvent', this.selectedCityId)

    },

    setSelectedCityId(cityId) {
      this.selectedCityId = cityId
    }

  },
  beforeMount() {
    this.getAllCities()
  }
}
</script>