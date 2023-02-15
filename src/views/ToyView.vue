<template>
  <div>
    <div class="float-container">
      <div class="float-child">
        <div class="blue">
          <object :data="this.displayedPicture" type="image/jpeg" class="img-thumbnail"></object>
        </div>
      </div>

      <div class="float-child">
        <div v-if="!isEdit && !isView">
          <ToyForm @emitBase64Event="displayPicture"/>
        </div>
        <div v-if="isEdit || isView">
          <ToyFormFilled @emitPictureEvent="displayPictureFromDatabase" @emitBase64Event="displayPicture"
                         :toy-id-from-query="toyIdFromQuery" :is-edit="isEdit" :is-view="isView"/>
        </div>
      </div>

    </div>
  </div>

</template>

<script>

import ToyForm from "@/components/ToyForm.vue";
import ToyFormFilled from "@/components/ToyFormFilled.vue";

export default {
  name: "ToyView",
  components: {ToyFormFilled, ToyForm},
  data: function () {
    return {

      isView: false,
      isEdit: false,
      toyIdFromQuery: this.$route.query.toyId,

      userIdFromSession: sessionStorage.getItem('userId'),
      description: '',
      displayedPicture: '',
      // userId: 0,

      toyById: {
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

    displayPictureFromDatabase: function (pictureBase64Data) {
      this.displayedPicture = pictureBase64Data
    },

    displayPicture: function (pictureBase64Data) {
      this.displayedPicture = pictureBase64Data
    },


    getToyById() {
      this.$http.get("/toy", {
            params: {
              toyId: this.toyIdFromQuery
            }
          }
      ).then(response => {
        this.toyById = response.data
        this.checkIfViewOrEdit()
        this.alertMessage();

      }).catch(error => {
        console.log(error)
      })
    },


    checkIfViewOrEdit: function () {
      console.log(this.userIdFromSession)
      console.log(this.toyById.userId)
      if (this.userIdFromSession == this.toyById.userId) {
        this.isEdit = true;

      } else if (this.userIdFromSession != this.toyById.userId) {
        this.isView = true;

      }
    }
  },

  beforeMount() {
    if (typeof this.toyIdFromQuery !== 'undefined') {
      this.getToyById()
    }
  }

}

</script>


