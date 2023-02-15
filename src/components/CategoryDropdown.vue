<template>
  <div>
    <div class="dropdown">
      <select v-model="selectedCategoryId" class="form-select col-3" aria-label="Default select example">
        <option value="0">Kategooriad</option>
        <option v-for="category in categories" :value="category.categoryId">{{category.categoryName}}</option>
      </select>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CategoryDropdown',
  props: {
    isView: Boolean,
    isEdit: Boolean
  },
  data: function () {
    return {



      categories: [
          {
        categoryId: 0,
        categoryName: '',
      }
      ],
      selectedCategoryId: 0,
    }
  },
  methods: {

    getAllCategories: function () {
      this.$http.get("/categories")
          .then(response => {
            this.categories = response.data
          })
          .catch(error => {
            console.log(error)
          })
    },

    emitSelectedCategoryId: function () {
      if (this.isEdit) {
        this.$emit('emitCategoryIdEvent', this.selectedCategoryId)
      }
    },

    setSelectedCategoryId(categoryId) {
      this.selectedCategoryId = categoryId
    }

  },
  beforeMount()
  {
    this.getAllCategories()
  }
}


</script>