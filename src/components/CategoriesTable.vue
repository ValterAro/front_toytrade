<template>
  <div class="col-2 text-start"><h5>Filtreeri:</h5>
    <div class="form-check">
      <input v-model="isCheckAll" v-on:click="checkAll" class="form-check-input" type="checkbox" ref="allCategories" id="allCategories">
      <label class="form-check-label" for="allCategories">Kõik</label>
    </div>
    <div v-for="category in categories" class="form-check">
      <input v-model="allCategories" v-on:change="updateCheckAll" class="form-check-input" type="checkbox">
      <label class="form-check-label">
        {{ category.name }}
      </label>
    </div>

  </div>
</template>
<script>
export default {
  name: 'CategoriesTable',
  data: function () {
    return {
      isCheckAll: false,
      categories: [
        {
          id: 0,
          name: ''
        }
      ],
      allCategories: []
  }
  },
  methods: {
    getAllCategories: function () {
      this.$http.get("/categories")
          .then(response => {
            this.categories = response.data
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          })
    },
    changeCategorySelection: function () {
      if (this.$refs.allCategories.checked) {
        console.log("C")
        this.$refs.others.forEach(select => select.checked = true)
        // this.$el.querySelectorAll(".check-others").checked = true
      } else {
        // this.$el.querySelectorAll(".check-others").checked = false
        console.log("U")
      }
    },
    checkAll: function () {
      this.isCheckAll = !this.isCheckAll
      this.allCategories  = []

      if (this.isCheckAll) {
        for (var key in this.categories.id) {
          this.allCategories.push(this.categories.id[key])
          console.log(this.categories.id[key])
        }
      }
    },
    updateCheckAll: function () {
      if (this.categories.length == this.allCategories.length) {
        this.isCheckAll = true;
      } else {
        this.isCheckAll = false
      }
    }
  },
  beforeMount() {
    this.getAllCategories()
  }
}
</script>