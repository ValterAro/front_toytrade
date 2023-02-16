<template>
  <div>
    <div class="row justify-content-center">
      <div class="col-12">
        <h3>Minu asjad</h3>
        <br>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-2">
        <div>
          <UserName/>
        </div>
        <div>
          <MyPoints/>
        </div>
        <div>
          <button id="show-modal" class="btn btn-primary" v-on:click="showModal = true">Muuda andmeid</button>
          <div>
            <modal :show="showModal" @close="showModal = false" @emitUserInfoEvent="setUserInfo"></modal>
          </div>
        </div>
        <div>
          <br><br><br><br><br><br>
          <router-link :to="{name: 'toy'}">
            <button type="button" class="btn btn-primary">Tahan lisada mänguasja</button>
          </router-link>
        </div>
      </div>
      <div class="col-8">
        <MyToyTable  ref="myToyTable"/>
      </div>
      <div class="col-12">
        <br>
        <h3>Minu vahetused</h3>
        <br>
      </div>
      <div class="col-8">
        <MyTransactionTable @emitPointChangeEvent="updatePoints"/>
      </div>
    </div>
  </div>
</template>

<script>
import MyToyTable from "@/components/MyToyTable.vue";
import MyPoints from "@/components/MyPoints.vue";
import MyTransactionTable from "@/components/MyTransactionTable.vue";
import Modal from "@/components/Modal.vue";
import UserName from "@/views/UserName.vue";

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
      this.$http.put("/my-user-edit", this.userInfo, {
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
    }
  }
}
</script>
