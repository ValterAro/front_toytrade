<template>
  <div>
  <div class="row justify-content-center">
    <CategoriesInput @emitSelectedCategoriesEvent="setSelectedCategories"/>
    <ToyTable ref="toyTable"/>

  </div>

  </div>
</template>

<script>
import ToyTable from "@/components/ToyTable.vue";
import CategoriesTable from "@/components/CategoriesTable.vue";
import CategoriesInput from "@/components/CategoriesInput.vue";

export default {
  name: "TradesView",
  components: {CategoriesInput, ToyTable},
  data: function () {
    return {}
  },
  methods: {
    setSelectedCategories: function (selectedCategories) {
      this.$refs.toyTable.setCategoryFilters(selectedCategories)
    }
  }
}
</script>

