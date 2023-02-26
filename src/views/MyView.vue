<template>
  <div class="container-fluid my-5">
    <div class="row justify-content-center">
      <div class="col-2 mx-5 pb-3 back-white box-shadow text-center h-100 my-5">
        <div>
          <UserInfo ref="userInfo" @emitUserInfoEvent="emitUserInfo"/>
          <div class="my-3">
            <UserInfoModal :show-modal="showModal" @close="showModal = false" ref="userInfoModal" @emitUserInfoEvent="setUserInfo"/>
            <button id="show-modal" class="btn btn-blue" v-on:click="showModal = true">Muudan andmeid</button>
          </div>
          <div>
            <router-link :to="{name: 'toy'}">
              <button type="button" class="btn btn-outline-blue">Lisan mänguasja</button>
            </router-link>
            <MessageBox :user-id-from-query="userIdFromQuery"/>
          </div>
        </div>
      </div>
      <div class="col-8 mx-4">
        <MyToyTable ref="myToyTable"/>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-12">
        <br>
        <h3>Minu vahetused</h3>
        <br>
      </div>
      <div class="col-10">
        <MyTransactionTable @emitPointChangeEvent="updatePoints" @emitNeededActionsEvent="updateActions"/>
      </div>
    </div>

  </div>
</template>

<script>
import MyToyTable from "@/components/my/MyToyTable.vue";
import MyTransactionTable from "@/components/my/MyTransactionTable.vue";
import UserInfo from "@/components/my/UserInfo.vue";
import UserInfoModal from "@/components/my/UserInfoModal.vue";
import Modal from "@/components/Modal.vue";
import MessageBox from "@/components/MessageBox.vue";

export default {
  name: "MyView",
  components: {MessageBox, Modal, UserInfoModal, UserInfo, MyTransactionTable, MyToyTable},
  data: function () {
    return {
      userIdFromQuery: this.$route.query.userId,
      userIdFromSession: sessionStorage.getItem('userId'),
      currentUserOnPage: false,
      showModal: false,
      userId: sessionStorage.getItem('userId'),
      userInfo: {
        username: '',
        password: '',
        mobile: ''
      }
    }
  },
  methods: {
    updateUser: function () {
      this.$http.put("/users/me", this.userInfo, {
          params: {
            userId: this.userId
          }
        }
      ).then(response => {
      }).catch(error => {
        console.log(error)
      })
    },
    updatePoints() {
      this.$refs.userInfo.getUserInfo();
    },
    setUserInfo: function (userInfo) {
      this.userInfo = userInfo
      this.updateUser()
    },
    emitUserInfo: function (userInfo) {
      this.$refs.userInfoModal.populateInputs(userInfo)
    },
    updateActions: function (numberOfActions) {
      this.$emit('updateActionsEvent', numberOfActions)
    }
  }
}
</script>
