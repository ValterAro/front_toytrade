<template>
  <div>
    <table class="table table-bordered table-striped">
      <thead class="table-dark">
      <tr>
        <th scope="col">Kategooria</th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="category in categories">
        <td>{{ category.categoryName }}</td>
        <td class="text-center"><font-awesome-icon icon="fa-solid fa-pencil" class="px-2" /><font-awesome-icon icon="fa-solid fa-trash" class="px-2" /></td>
      </tr>
      <tr>
        <td></td>
        <td class="text-center fs-4"><font-awesome-icon icon="fa-solid fa-circle-plus" /></td>
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
