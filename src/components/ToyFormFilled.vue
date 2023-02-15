<template>
<div>
  <div>
    <NameInput ref="toyName" :is-view="isView" @emitToyNameEvent="setToyNameEmitRequest"/>
    <br>
    <CategoryDropdown ref="categoryDropdown" @emitCategoryIdEvent="setCategoryIdEmitRequest"/>
    <br>
    <ConditionDropdown ref="conditionsDropdown" @emitConditionIdEvent="setConditionIdEmitRequest"/>
    <br>
    <CityDropdown ref="citiesDropdown" @emitCityIdEvent="setCityIdEmitRequest"/>
    <br>
    <DescriptionBox ref="descriptionBox" @emitDescriptionInputEvent="setDescription" />
    <div>
    <ImageInput class="col-3" v-on="$listeners" @emitBase64Event="setToyRequestPicture"/>
    </div>
    <div>
      <button v-on:click="updateToy" type="button" class="btn btn-primary">Muuda</button>
      <button v-on:click="putToyUpdate" type="button" class="btn btn-primary">Kinnita</button>
    </div>
  </div>
  </div>
</template>
<script>

import ImageInput from "@/components/ImageInput.vue"
import NameInput from "@/components/NameInput.vue";
import CategoryDropdown from "@/components/CategoryDropdown.vue";
import ConditionDropdown from "@/components/ConditionDropdown.vue";
import CityDropdown from "@/components/CityDropdown.vue";
import DescriptionBox from "@/components/DescriptionBox.vue";

export default {
  name: 'ToyFormFilled',
  components: {DescriptionBox, CityDropdown, ConditionDropdown, CategoryDropdown, NameInput, ImageInput},
  data: function () {
    return {
      toyIdFromQuery: this.$route.query.toyId,
      addedPicture: '',
      isEdit: true,
      isView: true,

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
    setDescription: function(descriptionInput) {
      this.updatedToy.description = descriptionInput
    },

    callToyRequestEmits: function () {
      this.$refs.toyName.emitToyName()
      this.$refs.categoryDropdown.emitSelectedCategoryId()
      this.$refs.citiesDropdown.emitSelectedCityId()
      this.$refs.conditionsDropdown.emitSelectedConditionId()
      this.$refs.descriptionBox.emitChangedDescription()

    },
    updateToy: function () {
      this.callToyRequestEmits()
    },



    emitPicture: function () {
      this.$emit('emitPictureEvent', this.selectedToy.picture)
    },
    setToyRequestPicture: function (pictureBase64Data) {
      this.picture = pictureBase64Data
      this.updatedToy.picture = pictureBase64Data
    },
    getToyById() {
      this.$http.get("/toy", {
            params: {
              toyId: this.toyIdFromQuery
            }
          }
      ).then(response => {
        this.selectedToy = response.data
        this.$refs.toyName.setToyName(this.selectedToy.name)
        this.$refs.categoryDropdown.setSelectedCategoryId(this.selectedToy.categoryId)
        this.$refs.citiesDropdown.setSelectedCityId(this.selectedToy.cityId)
        this.$refs.conditionsDropdown.setSelectedConditionId(this.selectedToy.conditionId)
        this.$refs.descriptionBox.setDescriptionBoxValue(this.selectedToy.description)
        this.emitPicture()

      }).catch(error => {
        console.log(error)
      })
    },
    putToyUpdate: function () {
      this.$http.put("/toy", this.updatedToy, {
            params: {
              toyId: this.selectedToy.id
            }
          }
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },

  },
  beforeMount() {
    this.getToyById()
  }
}
</script>