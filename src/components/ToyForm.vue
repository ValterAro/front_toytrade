<template>
  <div>
    <div class="input-group col-3">
      <span class="input-group-text">Nimi</span>
      <input v-model="name" type="text" class="form-control">
    </div>
    <br>
    <div class="dropdown">
      <select v-model="categoryId" class="form-select col-3">
        <option value="0" disabled>Kategooriad</option>
        <option v-for="category in categories" :value="category.categoryId">{{ category.categoryName }}</option>
      </select>

    </div>
    <br><select v-model="conditionId" class="form-select col-3">
    <option value="0" disabled>Seisukord</option>
    <option v-for="condition in conditions" :value="condition.conditionId">{{ condition.conditionName }}
    </option>
  </select><br><select v-model="cityId" class="form-select col-3">
    <option value="0" disabled>Linn</option>
    <option v-for="city in cities" :value="city.cityId">{{ city.cityName }}</option>
  </select><br>
    <div>
      <ImageInput class=" col-3" v-on="$listeners" @emitBase64Event="setToyRequestPicture"/>
    </div>
    <br>
    <div class="input-group col-3">
      <span class="input-group-text">Kirjeldus</span>
      <textarea v-model="description" class="form-control" aria-label="With textarea"></textarea>
    </div>
    <div>
      <button v-on:click="sendAddRequest" type="button" class="btn btn-primary">Lisa</button>
    </div>
  </div>
</template>
<script>
import ImageInput from "@/components/ImageInput.vue"

export default {
  name: 'ToyForm',
  components: {ImageInput},
  props: {
  },
  data: function () {
    return {

      isView: false,
      isEdit: false,
      toyIdFromQuery: this.$route.query.toyId,
      userIdFromSession: sessionStorage.getItem('userId'),


      name: '',
      categoryId: 0,
      conditionId: 0,
      cityId: 0,
      description: '',
      displayPicture: '',
      toyId: '',
      userId: 0,
      picture: '',

      // toy: {
      //   id: 0,
      //   userId: 0,
      //   userUsername: '',
      //   cityId: 0,
      //   cityName: '',
      //   conditionId: 0,
      //   conditionName: '',
      //   categoryId: 0,
      //   categoryName: '',
      //   name: '',
      //   description: '',
      //   picture: '',
      //   status: '',
      // },


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

    setToyRequestPicture: function (pictureBase64Data) {
      this.picture = pictureBase64Data
    },

    // getToyById() {
    //   this.$http.get("/toy", {
    //         params: {
    //           toyId: this.toyIdFromQuery
    //         }
    //    }
    //   ).then(response => {
    //     this.toy.cityName = response.data.cityName
    //     this.toy.userId = response.data.userId
    //     this.toy.conditionName = response.data.conditionName
    //     this.toy.categoryName = response.data.categoryName
    //     this.toy.picture = response.data.picture
    //     this.toy.condtionId = response.data.conditionId
    //     this.toy.description = response.data.description
    //     this.toy.status = response.data.status
    //     this.toy.name = response.data.name
    //   }).catch(error => {
    //     console.log(error)
    //   })
    // },

    sendAddRequest: function () {
      this.toyDto.name = this.name;
      this.toyDto.categoryId = this.categoryId;
      this.toyDto.conditionId = this.conditionId;
      this.toyDto.cityId = this.cityId;
      this.toyDto.description = this.description;
      this.toyDto.picture = this.picture;
      this.toyDto.userId = sessionStorage.getItem('userId');

      this.$http.post("/toy", this.toyDto
      ).then(response => {
        console.log(response.data)
        alert("lelu edukalt lisatud")
      }).catch(error => {
        console.log(error)
      })
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
      this.getAllConditions()
      this.getAllCities()
    }
  }
</script>