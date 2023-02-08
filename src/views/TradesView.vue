<template>
  <div class="row justify-content-center">
    <CategoriesTable/>
    <ToyTable/>
  </div>
</template>

<script>
import ToyTable from "@/components/ToyTable.vue";
import CategoriesTable from "@/components/CategoriesTable.vue";
import CheckboxComponent from "@/components/CheckboxComponent.vue";

export default {
  name: "TradesView",
  components: {CheckboxComponent, CategoriesTable, ToyTable},
  data: function () {
    return {}
  },
  methods: {
    setChosenCategory: function (categoryId) {

    }
  }
}
</script>

