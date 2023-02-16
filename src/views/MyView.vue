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
          <Teleport to="body">
            <modal :show="showModal" @close="showModal = false"></modal>
          </Teleport>
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
      showModal: false
    }
  },
  methods: {
    updatePoints() {
      this.$refs.myPoints.getMyPoints();
    },
  }
}
</script>
