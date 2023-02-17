<template>
  <div class="col-2 box-shadow text-start" id="leftMenu" >
    <nav class="navbar navbar-expand-lg">

      <button class="navbar-toggler btn-outline-blue" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarOffcanvasLg" aria-controls="navbarOffcanvasLg">
        <font-awesome-icon icon="fa-solid fa-filter"/>
      </button>
      <div class="offcanvas offcanvas-start px-2" tabindex="-1" id="navbarOffcanvasLg" aria-labelledby="navbarOffcanvasLgLabel">
        <div class="offcanvas-header justify-content-end">
          <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <h5>Filtreeri:</h5>
        <div class="form-check mt-3">
          <input v-model="isCheckAll" v-on:click="checkAll" class="form-check-input" type="checkbox"
                 id="allCategoriesCheckbox">
          <label class="form-check-label" for="allCategoriesCheckbox">Kõik</label>
        </div>
        <div v-for="category in categories" class="form-check">
          <input v-model="selectedCategories" v-on:change="updateCheckAll" v-bind:value="category.categoryId"
                 class="form-check-input" type="checkbox">
          <label class="form-check-label">
            {{ category.categoryName }}
          </label>
        </div>
        <button type="button" v-on:click="emitSelectedCategories" class="btn btn-blue mt-3">Filtreeri</button>
      </div>
    </nav>
  </div>

</template>

<script>
export default {
  name: "CategoriesInput",
  data: function () {
    return {
      isCheckAll: false,
      selectedCategories: [],
      selectedCategory: "",
      categories: [
        {
          categoryId: 0,
          categoryName: '',
          isSelected: false
        }
      ],

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
          this.selectedCategories.push(this.categories[i].categoryId);
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

    emitSelectedCategories: function () {
      this.$emit('emitSelectedCategoriesEvent', this.selectedCategories)
    }

  },
  beforeMount() {
    this.getAllCategories()
  }
}
</script>