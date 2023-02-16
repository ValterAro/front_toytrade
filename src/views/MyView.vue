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
          <br><br><br><br>
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
import UserName from "@/views/UserName.vue";
// import {ref} from "vue";
// const componentKey = ref(0);
// const forceRerender = () => {
//   componentKey.value += 1;
// }

export default {
  name: "MyView",
  components: {UserName, MyTransactionTable, MyPoints, MyToyTable},
  data() {
    return {
    }
  },
  methods: {
    NavigateToAddToy: function () {

    },
    updatePoints() {
      this.$refs.myPoints.getMyPoints();
    },
  }
}
</script>
