<template>
  <div>
    <div class="float-container">
      <div class="float-child">
        <div class="blue">
          <object :data="this.displayedPicture" type="image/jpeg" class="img-large"></object>
        </div>
      </div>

      <div class="float-child">
        <div v-if="!isEdit && !isEdit">
          <ToyForm @emitBase64Event="displayPicture"/>
        </div>
        <div v-if="isEdit || isView">
          <ToyFormFilled @emitPictureEvent="displayPictureFromDatabase" @emitBase64Event="displayPicture" :toy-id-from-query="toyIdFromQuery"/>
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
      userId: 0,

      toyById: {
        userId: 0,
      }

    }
  },
      methods: {

         displayPictureFromDatabase: function(pictureBase64Data){
           this.displayedPicture = pictureBase64Data
         },

         displayPicture: function(pictureBase64Data) {
          this.displayedPicture = pictureBase64Data
         },

        getToyById() {
          this.$http.get("/toy", {
                params: {
                  toyId: this.toyIdFromQuery
                }
              }
          ).then(response => {
            this.toyById.userId = response.data.userId

          }).catch(error => {
            console.log(error)
          })
        },


        checkIfViewOrEdit: function () {
          if (this.toyIdFromQuery !== '' && sessionStorage.getItem('userId') === this.toy.userId) {
            this.isEdit = true;
            console.log(this.isEdit)
            if (this.toyIdFromQuery !== '' && sessionStorage.getItem('userId') !== this.toy.userId) {
              this.isEdit = false;
              this.isView = true;

            }
          }
        },

      },
      beforeMount() {

    this.getToyById()
        this.checkIfViewOrEdit()
        alert(this.isView + " " + " " + this.isEdit + " " + this.toy.userId)

      }

    }

</script>


