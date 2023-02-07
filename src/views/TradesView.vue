<template>
  <div class="row justify-content-center">
    <CategoriesTable/>
    <ToyTable/>
  </div>
</template>

<script>
import ToyTable from "@/components/ToyTable.vue";
import CategoriesTable from "@/components/CategoriesTable.vue";

export default {
  name: "TradesView",
  components: {CategoriesTable, ToyTable},
  data: function () {
    return {}
  },
  methods: {
    setChosenCategory: function (categoryId) {

    }
  }
}
</script>

