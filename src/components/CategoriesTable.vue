<template>
  <div class="col-2"><h3>Filtreeri:</h3>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="allCategories">
      <label class="form-check-label" for="allCategories">Kõik</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
      <label class="form-check-label" for="flexCheckChecked">
        Checked checkbox
      </label>
    </div>

  </div>
</template>
<script>
export default {
  name: 'CategoriesTable',
  data: function () {
    return {}
  },
  methods: {
    getAllCategories: function () {
      this.$http.get("/categories")
          .then(response => {
            console.log(response.data)
          })
          .catch(error => {
            console.log(error)
          })
    },
  },
  beforeMount() {
    this.getAllCategories()
  }
}
</script>