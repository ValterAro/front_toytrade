<template>
  <div class="container-fluid">
    <div class="row flex-nowrap">
          <CategoriesInput class="my-3" @emitSelectedCategoriesEvent="setSelectedCategories"/>
      <div class="col col-lg-10 col-md-12 col-sm-12 py-3 ms-5">
        <ToyList ref="toyList"/>
      </div>
    </div>
  </div>
</template>

<script>
import ToyTable from "@/components/toy/ToyTable.vue";
import CategoriesInput from "@/components/category/CategoriesInput.vue";
import ToyList from "@/components/toy/ToyList.vue";

export default {
  name: "TradesView",
  components: {ToyList, CategoriesInput, ToyTable},
  data: function () {
    return {}
  },
  methods: {
    setSelectedCategories: function (selectedCategories) {
      this.$refs.toyList.setCategoryFilters(selectedCategories)
    }
  }
}
</script>

