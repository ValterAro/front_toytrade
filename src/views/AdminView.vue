<template>
  <div class="container">
    <div class="row">
      <div class="col-2 pe-4 text-start">
        <div class="list-group">
          <a href="#" v-on:click.prevent="setSelectedMenuItem" id="usersMenuItem"
             class="list-group-item list-group-item-action active">Kasutajad</a>
          <a href="#" v-on:click.prevent="setSelectedMenuItem" id="toysMenuItem"
             class="list-group-item list-group-item-action">Mänguasjad</a>
          <a href="#" v-on:click.prevent="setSelectedMenuItem" id="categoriesMenuItem"
             class="list-group-item list-group-item-action">Kategooriad</a>
          <a href="#" v-on:click.prevent="setSelectedMenuItem" id="conditionsMenuItem"
             class="list-group-item list-group-item-action">Seisukorrad</a>
          <a href="#" v-on:click.prevent="setSelectedMenuItem" id="citiesMenuItem"
             class="list-group-item list-group-item-action">Asukohad</a>
          <a href="#" v-on:click.prevent="setSelectedMenuItem" id="transactionsMenuItem"
             class="list-group-item list-group-item-action">Tehingud</a>
        </div>

      </div>
      <div class="col-7 text-start">
        <UserTable v-if="selectedItem === 'usersMenuItem'"/>
        <ToyTable v-else-if="selectedItem === 'toysMenuItem'"/>
      </div>
    </div>
  </div>
</template>

<script>
import UserTable from "@/components/UserTable.vue";
import ToyTable from "@/components/ToyTable.vue";

export default {
  name: "AdminView",
  components: {ToyTable, UserTable},
  data: function () {
    return {
      selectedItem: ''
    }
  },
  methods: {
    setSelectedMenuItem: function (event) {
      this.$el.querySelectorAll('.list-group-item').forEach(activeClass => activeClass.classList.remove('active'))
      event.target.classList.toggle('active')
      this.selectedItem = event.target.id
      console.log(this.selectedItem)
    }
  }
}
</script>
