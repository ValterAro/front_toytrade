<template>
  <div class="container-fluid my-5">
    <div class="row justify-content-center">
      <div class="col-2 mx-5 pb-3 back-white box-shadow text-center h-100 my-5">
        <div>
          <UserName @emitUserInfoEvent="emitUserInfo" />
          <!--        <MyPoints/>-->
          <div class="my-3">
            <button id="show-modal" class="btn btn-blue"  v-on:click="showModal = true">Muudan andmeid</button>
            <modal :show="showModal" ref="modal" @close="showModal = false" @emitUserInfoEvent="setUserInfo"></modal>
          </div>
          <div>
            <router-link :to="{name: 'toy'}">
              <button type="button" class="btn btn-outline-blue">Lisan mänguasja</button>
            </router-link>
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
        <MyTransactionTable @emitPointChangeEvent="updatePoints"/>
      </div>
    </div>
  </div>
</template>

<script>
import MyToyTable from "@/components/my/MyToyTable.vue";
import MyPoints from "@/components/my/MyPoints.vue";
import MyTransactionTable from "@/components/my/MyTransactionTable.vue";
import Modal from "@/components/Modal.vue";
import UserName from "@/components/my/UserName.vue";

export default {
  name: "MyView",
  components: {UserName, Modal, MyTransactionTable, MyPoints, MyToyTable},
  data: function () {
    return {
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
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    updatePoints() {
      this.$refs.myPoints.getMyPoints();
    },
    setUserInfo: function (userInfo) {
      this.userInfo = userInfo
      this.updateUser()
    },
    emitUserInfo: function (userInfo) {
      this.$refs.modal.populateInputs(userInfo)
    }
  }
}
</script>
