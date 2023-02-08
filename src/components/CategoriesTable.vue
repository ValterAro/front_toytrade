<template>
  <div class="col-2 text-start"><h5>Filtreeri:</h5>
    <div class="form-check mt-3">
      <input v-model="isCheckAll" v-on:click="checkAll" class="form-check-input" type="checkbox"
             id="allCategoriesCheckbox">
      <label class="form-check-label" for="allCategoriesCheckbox">Kõik</label>
    </div>
    <div v-for="category in categories" class="form-check">
      <input v-model="selectedCategories" v-on:change="updateCheckAll" v-bind:value="category.id"
             class="form-check-input" type="checkbox">
      <label class="form-check-label">
        {{ category.name }}
      </label>
    </div>
    <button type="button" v-on:click="" class="btn btn-outline-dark mt-3">Filtreeri</button>
    <br>
    {{ selectedCategories }}
  </div>
</template>
<script>
export default {
  name: 'CategoriesTable',
  data: function () {
    return {
      isCheckAll: false,
      selectedCategories: [],
      selectedCategory: "",
      categories: [
        {
          id: 0,
          name: ''
        }
      ]
    }
  },
  methods: {
    getAllCategories: function () {
      this.$http.get("/categories")
          .then(response => {
            this.categories = response.data
          })
          .catch(error => {
          })
    },
    checkAll: function () {
      this.isCheckAll = !this.isCheckAll;
      this.selectedCategories = [];
      if (this.isCheckAll) {
        for (let i = 0; i < this.categories.length; i++) {
          this.selectedCategories.push(this.categories[i].id);
        }
      }
    },
    updateCheckAll: function () {
      if (this.selectedCategories.length === this.categories.length) {
        this.isCheckAll = true;
      } else {
        this.isCheckAll = false;
      }
    },
  },
  beforeMount() {
    this.getAllCategories()
  }
}
</script>