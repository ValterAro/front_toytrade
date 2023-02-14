<template>
  <div class="container">
    <div class="row">
      <div class="col-2 pe-4 text-start">
        <AdminMenu @emitSelectedMenuItemEvent="setSelectedMenuItem"/>
      </div>
      <div class="col-7 text-start">
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
import ToyTable from "@/components/ToyTable.vue";
import CategoriesTable from "@/components/CategoriesTable.vue";
import ConditionsTable from "@/components/ConditionsTable.vue";
import AdminMenu from "@/components/AdminMenu.vue";
import CitiesTable from "@/components/CitiesTable.vue";
import Test from "@/components/Test.vue";

export default {
  name: "AdminView",
  components: {Test, CitiesTable, AdminMenu, ConditionsTable, CategoriesTable, ToyTable, UsersTable},
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
