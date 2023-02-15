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
          <MyPoints/>
        </div>
        <div>
          <br><br><br><br><br><br>
          <router-link :to="{name: 'toy'}">
            <button type="button" class="btn btn-primary">Tahan lisada mänguasja</button>
          </router-link>
        </div>
      </div>
      <div class="col-8">
        <MyToyTable ref="myToyTable"/>
      </div>
      <div class="col-12">
        <br>
        <h3>Minu vahetused</h3>
        <br>
      </div>
      <div class="col-8">
        <MyTransactionTable/>
      </div>
    </div>
  </div>
</template>

<script>
import MyToyTable from "@/components/MyToyTable.vue";
import ConnectionInput from "@/views/ConnectionInput.vue";
import MyPoints from "@/components/MyPoints.vue";
import MyTransactionTable from "@/components/MyTransactionTable.vue";

export default {
  name: "MyView",
  components: {MyTransactionTable, MyPoints, MyToyTable, ConnectionInput},
  methods: {
    NavigateToAddToy: function () {

    }
  }
}
</script>
