<template>
  <div>
    <table class="table table-bordered table-striped">
      <thead class="table-dark">
      <tr>
        <th scope="col">Kategooria</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="category in categories">
        <td>{{ category.categoryName }}</td>
      </tr>

      </tbody>
    </table>
  </div>

</template>

<script>
export default {
  name: "CategoryTable",
  data: function () {
    return {
      categories: [
        {
          categoryId: 0,
          categoryName: '',
          isSelected: false
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
            console.log(error)
          })
    }
  },
  beforeMount() {
    this.getAllCategories()
  }
}
</script>
