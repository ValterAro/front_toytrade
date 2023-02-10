<template>
  <div>
    <div>
      <div class="col-3">
        <div class="input-group">

          <input v-model="name" type="text" class="form-control" placeholder="Nimi">

        </div>
        <br>
        <div class="dropdown">

          <select v-model="categoryId" class="form-select"
                  aria-label="Default select example">
            <option value="0">Kategooriad</option>
            <option v-for="category in categories" :value="category.categoryId">{{ category.categoryName }}</option>
          </select>

        </div>
        <br>
        <select v-model="conditionId" class="form-select"
                aria-label="Default select example">
          <option value="0">Seisukord</option>
          <option v-for="condition in conditions" :value="condition.conditionId">{{ condition.conditionName }}</option>
        </select>
        <br>
        <select v-model="cityId" class="form-select"
                aria-label="Default select example">
          <option value="0">Linn</option>
          <option v-for="city in cities" :value="city.cityId">{{ city.cityName }}</option>
        </select>

      </div>
      <br>
      <div>
        <ImageInput @emitBase64Event="setAtmRequestPicture"/>

      </div>
      <br>
      <div class="input-group">
        <span class="input-group-text">Kirjeldus</span>
        <textarea v-model="description" class="form-control" aria-label="With textarea"></textarea>
      </div>
      <button v-on:click="sendAddRequest" type="button" class="btn btn-primary">Lisa</button>
    </div>
  </div>

</template>

<script>

import ImageInput from "@/views/ImageInput.vue";

export default {
  name: "ToyView",
  components: {ImageInput},
  data: function () {
    return {

      name: '',
      categoryId: 0,
      conditionId: 0,
      cityId: 0,
      description: '',
      picture: '',


      toyDto: {
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
        status: 'A'
      },
      categories: {
        categoryId: '',
        categoryName: ''
      },
      conditions: {
        conditionId: '',
        conditionName: ''
      },
      cities: {
        cityId: '',
        cityName: ''
      }


    }
  },
  methods: {

    sendAddRequest: function () {
      this.toyDto.name = this.name;
      this.toyDto.categoryId = this.categoryId;
      this.toyDto.conditionId = this.conditionId;
      this.toyDto.cityId = this.cityId;
      this.toyDto.description = this.description;
      this.toyDto.picture = this.picture;
      this.toyDto.userId =  sessionStorage.getItem('userId')

      this.$http.post("/toy", this.toyDto
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    setAtmRequestPicture: function (pictureBase64Data) {
      this.picture = pictureBase64Data
    },

    getAllCategories: function () {
      this.$http.get("/categories")
          .then(response => {
            this.categories = response.data
          }).catch(error => {
        console.log(error)
      })
    },
    getAllConditions: function () {
      this.$http.get("/conditions")
          .then(response => {
            this.conditions = response.data
          }).catch(error => {
        console.log(error)
      })
    },
    getAllCities: function () {
      this.$http.get("/cities")
          .then(response => {
            this.cities = response.data
          }).catch(error => {
        console.log(error)
      })

    },


  },
  beforeMount() {
    this.getAllCategories()
    this.getAllCities()
    this.getAllConditions()
  }

}
</script>


