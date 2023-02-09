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
        <h3>Punktid: 2</h3>
        <br>
        <div class="dropdown">
          <ConnectionInput/>
        </div>
        <div>
          <br><br><br><br><br><br>
          <button type="button" class="btn btn-primary">Tahan lisada mänguasja</button>
        </div>
      </div>
      <div class="col-8">
        <MyToyTable ref="myToyTable"/>
      </div>
    </div>
  </div>
</template>

<script>
import MyToyTable from "@/components/MyToyTable.vue";
import ConnectionInput from "@/views/ConnectionInput.vue";

export default {
  name: "MyView",
  components: {MyToyTable, ConnectionInput}
}
</script>
