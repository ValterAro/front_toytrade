<template>
  <div>
    <div>
      <NameInput ref="toyName" :is-view="isView" :is-edit="isEdit" @emitToyNameEvent="setToyNameEmitRequest"/>
      <br>
      <CategoryDropdown ref="categoryDropdown" :is-view="isView" @emitCategoryIdEvent="setCategoryIdEmitRequest"/>
      <br>
      <ConditionDropdown ref="conditionsDropdown" :is-view="isView" @emitConditionIdEvent="setConditionIdEmitRequest"/>
      <br>
      <CityDropdown ref="citiesDropdown" :is-view="isView" @emitCityIdEvent="setCityIdEmitRequest"/>
      <br>
      <DescriptionBox ref="descriptionBox" :is-view="isView" @emitDescriptionInputEvent="setDescription"/>
      <br>
      <div>
        <ImageInput class="col-3" v-on="$listeners" :is-view="isView" @emitBase64Event="setToyRequestPicture"/>
      </div>

    </div>
  <div class="float-end">
    <button v-on:click="checkAndPost" type="button" class="btn btn-blue">Lisa</button>
  </div>
  </div>

</template>
<script>
import ImageInput from "@/components/ImageInput.vue"
import DescriptionBox from "@/components/toy/DescriptionBox.vue";
import CityDropdown from "@/components/toy/CityDropdown.vue";
import ConditionDropdown from "@/components/condition/ConditionDropdown.vue";
import CategoryDropdown from "@/components/category/CategoryDropdown.vue";
import NameInput from "@/components/toy/NameInput.vue";


export default {
  name: 'ToyForm',
  components: {DescriptionBox, CityDropdown, ConditionDropdown, CategoryDropdown, NameInput, ImageInput},
  props: {},
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


    setToyNameEmitRequest: function (toyName) {
      this.name = toyName
    },
    setCategoryIdEmitRequest: function (categoryId) {
      this.categoryId = categoryId
    },
    setCityIdEmitRequest: function (cityId) {
      this.cityId = cityId
    },
    setConditionIdEmitRequest: function (conditionId) {
      this.conditionId = conditionId
    },
    setDescription: function(descriptionInput) {
      this.description = descriptionInput
    },

    callToyRequestEmits: function () {
      this.$refs.toyName.emitToyName()
      this.$refs.categoryDropdown.emitSelectedCategoryId()
      this.$refs.citiesDropdown.emitSelectedCityId()
      this.$refs.conditionsDropdown.emitSelectedConditionId()
      this.$refs.descriptionBox.emitChangedDescription()

    },

    checkAndPost: function () {
      this.callToyRequestEmits()
      if (this.allRequiredFieldsAreFilled()) {
        this.sendAddRequest()
      } else {
        alert('täida k6ik v2ljad')
      }
    },
    allRequiredFieldsAreFilled: function () {
      return this.cityId > 0 &&
          this.name !== '' &&
          this.picture !== '' &&
          this.description !== '' &&
          this.categoryId > 0 &&
          this.conditionId > 0

    },


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
        this.$router.push({name: 'mytrades'})
      }).catch(error => {
        console.log(error)
      })
    },
  },
  beforeMount() {
  }
}
</script>