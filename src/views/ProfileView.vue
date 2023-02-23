<template>
  <div class="container">

    <div class="row">
      <div class="col-3 back-white px-3 my-5 py-3 text-start box-shadow">
        <h5 class="text-black">Kasutajaprofiil:</h5>
        <div>Nimi: {{ userInfo.username }}</div>
        <div>Telefon: {{ userInfo.mobile }}</div>
        <button class="btn-blue my-3" v-on:click="openMessageBox">Saada sõnum</button>
        <div class="align-baseline">
          <MessageBox ref="messageBox" :user-id-from-query="userIdFromQuery" @closeMailEmit="closeMail" :hidden="hideMail"/>
        </div>
      </div>
      <!--      <Inbox/>-->
      <div class="col-8">
        <MyToyTable/>
      </div>

    </div>
  </div>

</template>

<script>

import MessageBox from "@/components/MessageBox.vue";
import Messaging from "@/components/Messaging.vue";
import MyToyTable from "@/components/my/MyToyTable.vue";
import Inbox from "@/components/Inbox.vue";

export default {
  name: "ProfileView",
  components: {Inbox, MyToyTable, Messaging, MessageBox},
  data: function () {
    return {
      hideMail: true,
      showModal: false,
      userIdFromQuery: this.$route.query.otherUser,
      userIdFromSession: sessionStorage.getItem('userId'),
      currentUserOnPage: false,
      userInfo: {
        roleId: 0,
        username: '',
        points: 0,
        mobile: 0
      }

    }

  },
  methods: {
    closeMail: function () {
      this.hideMail = true
    // window.location.reload()
    },
    getUserInfo: function () {
      this.$http.get("/users/me", {
            params: {
              userId: this.userIdFromQuery
            }
          }
      ).then(response => {
        this.userInfo = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    openMessageBox: function () {
      this.hideMail = false
      this.$refs.messageBox.openModal()
    }
  },
  beforeMount() {
    if (this.userIdFromSession === this.userIdFromQuery) {
      this.currentUserOnPage = true
    }
    this.getUserInfo()
  }
}
</script>

