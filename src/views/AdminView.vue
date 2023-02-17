<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
      <div class="col-auto col-md-2 col-xl-2 px-0">
        <div div class="side-navbar active-nav d-flex justify-content-between flex-wrap flex-column" id="sidebar">
          <AdminMenu @emitSelectedMenuItemEvent="setSelectedMenuItem"/>
        </div>
      </div>
      <div class="col-8 py-3 my-3">
        <UsersTable v-if="selectedItem === 'usersMenuItem'"/>
        <ToyTable v-else-if="selectedItem === 'toysMenuItem'"/>
        <CategoriesTable v-else-if="selectedItem === 'categoriesMenuItem'"/>
        <ConditionsTable v-else-if="selectedItem === 'conditionsMenuItem'"/>
        <CitiesTable v-else-if="selectedItem === 'citiesMenuItem'"/>
      </div>
    </div>
  </div>
</template>

<script>
import UsersTable from "@/components/UsersTable.vue";
import ToyTable from "@/components/toy/ToyTable.vue";
import CategoriesTable from "@/components/category/CategoriesTable.vue";
import ConditionsTable from "@/components/condition/ConditionsTable.vue";
import AdminMenu from "@/components/AdminMenu.vue";
import CitiesTable from "@/components/city/CitiesTable.vue";

export default {
  name: "AdminView",
  components: {CitiesTable, AdminMenu, ConditionsTable, CategoriesTable, ToyTable, UsersTable},
  data: function () {
    return {
      selectedItem: 'usersMenuItem'
    }
  },
  methods: {
    setSelectedMenuItem: function (selectedMenuItem) {
      this.selectedItem = selectedMenuItem
    }
  }
}
</script>
