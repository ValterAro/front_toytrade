<template>
  <div>
    <div>
      <AlertSuccess :alert-message="messageSuccess"/>
      <AlertDanger :alert-message="messageError"/>
      <NameInput ref="toyName" :is-view="isView" @emitToyNameEvent="setToyNameEmitRequest"/>
      <br>
      <CategoryDropdown ref="categoryDropdown" :is-view="isView" @emitCategoryIdEvent="setCategoryIdEmitRequest"/>
      <br>
      <ConditionDropdown ref="conditionsDropdown" :is-view="isView" @emitConditionIdEvent="setConditionIdEmitRequest"/>
      <br>
      <CityDropdown ref="citiesDropdown" :is-view="isView" @emitCityIdEvent="setCityIdEmitRequest"/>
      <br>
      <DescriptionBox ref="descriptionBox" :is-view="isView" @emitDescriptionInputEvent="setDescription"/>
      <div v-if="isEdit">
        <ImageInput ref="pictureInput" class="col-3" v-on="$listeners" :is-view="isView"
                    @emitBase64Event="setToyRequestPicture"/>
      </div>
      <br>
      <div class="float-end">
        <button v-if="isEdit" v-on:click="updateToy" type="button" class="btn btn-blue mx-2">Muuda</button>
        <button v-if="isView && isLoggedIn" type="button" class="btn btn-blue">
          <router-link class="text-light" :to="{name: 'confirmation', query: {toyId:selectedToy.id}}">Soovin endale
          </router-link>
        </button>
        <button v-if="isEdit" v-on:click="deleteToy" type="button" class="btn btn-outline-blue">Kustuta</button>

      </div>
    </div>
  </div>
</template>
<script>

import ImageInput from "@/components/ImageInput.vue"
import NameInput from "@/components/toy/NameInput.vue";
import CategoryDropdown from "@/components/category/CategoryDropdown.vue";
import ConditionDropdown from "@/components/condition/ConditionDropdown.vue";
import CityDropdown from "@/components/toy/CityDropdown.vue";
import DescriptionBox from "@/components/toy/DescriptionBox.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
  name: 'ToyFormFilled',
  components: {
    AlertDanger,
    AlertSuccess, DescriptionBox, CityDropdown, ConditionDropdown, CategoryDropdown, NameInput, ImageInput},
  props: {
    isView: false,
    isEdit: false,
  },
  data: function () {
    return {
      messageSuccess: '',
      messageError: '',
      toyIdFromQuery: this.$route.query.toyId,
      addedPicture: '',
      isLoggedIn: false,
      selectedToy: {
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
      },

      updatedToy: {
        id: 0,
        userId: 0,
        userUsername: '',
        cityId: 0,
        conditionId: 0,
        categoryId: 0,
        name: '',
        description: '',
        picture: '',
        status: ''
      },
    }
  },

  methods: {


    setToyNameEmitRequest: function (toyName) {
      this.updatedToy.name = toyName
    },
    setCategoryIdEmitRequest: function (categoryId) {
      this.updatedToy.categoryId = categoryId
    },
    setCityIdEmitRequest: function (cityId) {
      this.updatedToy.cityId = cityId
    },
    setConditionIdEmitRequest: function (conditionId) {
      this.updatedToy.conditionId = conditionId
    },
    setDescription: function (descriptionInput) {
      this.updatedToy.description = descriptionInput
    },
    setToyRequestPicture: function (pictureBase64Data) {
      this.picture = pictureBase64Data
      this.updatedToy.picture = pictureBase64Data
    },

    callToyRequestEmits: function () {
      this.$refs.toyName.emitToyName()
      this.$refs.categoryDropdown.emitSelectedCategoryId()
      this.$refs.citiesDropdown.emitSelectedCityId()
      this.$refs.conditionsDropdown.emitSelectedConditionId()
      this.$refs.descriptionBox.emitChangedDescription()

    },
    updateToy: function () {
      this.messageError = ''
      this.messageSuccess = ''
      this.callToyRequestEmits()
      if (this.allRequiredFieldsAreFilled()) {
        this.putToyUpdate()
      } else {
        this.messageError = 'Täida kõik väljad'
      }
    },

    deleteToy: function () {
      this.messageError = ''
      this.messageSuccess = ''
      this.$http.delete("/toy", {
            params: {
              toyId: this.toyIdFromQuery,
            }
          }
      ).then(response => {
        this.messageSuccess = 'Mänguasi edukalt kustutatud'
        this.timeoutAndReloadPage(2000)
      }).catch(error => {
        console.log(error)
      })
    },
    allRequiredFieldsAreFilled: function () {
      return this.updatedToy.cityId > 0 &&
          this.updatedToy.name !== '' &&
          this.selectedToy.picture !== '' &&
          this.updatedToy.description !== '' &&
          this.updatedToy.categoryId > 0 &&
          this.updatedToy.conditionId > 0

    },
    timeoutAndReloadPage: function (timeOut) {
      setTimeout(() => {
        this.$router.go(0)
      }, timeOut)
    },

    emitPicture: function () {
      this.$emit('emitPictureEvent', this.selectedToy.picture)
    },

    getToyById() {
      this.$http.get("/toy", {
            params: {
              toyId: this.toyIdFromQuery
            }
          }
      ).then(response => {
        this.selectedToy = response.data
        if (this.selectedToy.status !== "A") {
          this.$router.push({name: 'mytrades'})
        } else {
          this.$refs.toyName.setToyName(this.selectedToy.name)
          this.$refs.categoryDropdown.setSelectedCategoryId(this.selectedToy.categoryId)
          this.$refs.citiesDropdown.setSelectedCityId(this.selectedToy.cityId)
          this.$refs.conditionsDropdown.setSelectedConditionId(this.selectedToy.conditionId)
          this.$refs.descriptionBox.setDescriptionBoxValue(this.selectedToy.description)
        }
        this.updatedToy.picture = this.selectedToy.picture
        this.emitPicture()

      }).catch(error => {
        console.log(error)
      })
    },
    isUserLoggedIn: function () {
      if (sessionStorage.getItem('userId') !== '') {
        this.isLoggedIn = true
      } else {
        this.isLoggedIn = false
      }
    },

    putToyUpdate: function () {
      this.$http.put("/toy", this.updatedToy, {
            params: {
              toyId: this.selectedToy.id
            }
          }
      ).then(response => {
        this.messageSuccess = 'Mänguasi edukalt muudetud'
        setTimeout(() => {
          this.$router.push({name: 'mytrades'})
        }, 2000)
      }).catch(error => {
        console.log(error)
      })
    },

  },
  beforeMount() {
    this.getToyById()
    this.isUserLoggedIn()
  }
}
</script>