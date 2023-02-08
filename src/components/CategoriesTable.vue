<template>
  <div class="col-2 text-start"><h5>Filtreeri:</h5>
    <div class="form-check mt-3">
      <input v-model="isCheckAll" v-on:click="checkAll" class="form-check-input" type="checkbox" id="allCategories">
      <label class="form-check-label" for="allCategories">Kõik</label>
    </div>
    <div v-for="categoryName in categoryNames" class="form-check">
      <input v-model="selectedCategories" v-on:change="updateCheckAll" v-bind:value="categoryName" class="form-check-input" type="checkbox">
      <label class="form-check-label">
        {{ categoryName }}
      </label>
    </div>
    <button type="button" class="btn btn-outline-dark mt-3">Filtreeri</button>

  </div>
</template>
<script>
export default {
  name: 'CategoriesTable',
  data: function () {
    return {
      isCheckAll: false,
      categoryNames: [],
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
            for (let i = 0; i < this.categories.length; i++) {
              this.categoryNames.push(this.categories[i].name)
            }
          })
          .catch(error => {
          })
    },
    checkAll: function(){
      this.isCheckAll = !this.isCheckAll;
      this.selectedCategories = [];
      if(this.isCheckAll){
        for (let i in this.categoryNames) {
          this.selectedCategories.push(this.categoryNames[i]);
        }
      }
    },
    updateCheckAll: function(){
      if(this.selectedCategories.length == this.categoryNames.length){
        this.isCheckAll = true;
      }else{
        this.isCheckAll = false;
      }
    },
  },
  beforeMount() {
    this.getAllCategories()
  }
}
</script>