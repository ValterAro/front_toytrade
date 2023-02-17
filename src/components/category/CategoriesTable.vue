<template>
  <div>
    <table class="table table-striped box-shadow">
      <thead>
      <tr>
        <th scope="col">Kategooria</th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="category in categories" :key="category.categoryId" :class="{editing: category === editedCategory}"
          v-cloak>
        <td>
          <div class="view">
            {{ category.categoryName }}
          </div>
          <div class="edit">
            <input class="tableInput" type="text" v-model="category.categoryName" :placeholder="category.categoryName"/>
          </div>
        </td>
        <td class="text-center align-middle">
          <font-awesome-icon icon="fa-solid fa-pencil" class="px-2 fs-5 actionButton view"
                             v-on:click="editData(category)"/>
          <font-awesome-icon icon="fa-solid fa-circle-check" class="px-2 fs-5 actionButton edit"
                             v-on:click="saveData(category)"/>
          <font-awesome-icon icon="fa-solid fa-solid fa-trash" class="px-2 fs-5 actionButton view"
                             v-on:click="deleteCategory(category.categoryId)"/>
          <font-awesome-icon icon="fa-solid fa-circle-xmark" class="px-2 fs-5 actionButton edit"
                             v-on:click="cancelEdit"/>
        </td>
      </tr>
      <tr>
        <td><input class="tableInput" v-if="isAdd === true" type="text" v-model="category.categoryName" placeholder="Kategooria nimi"/></td>
        <td class="text-center fs-4" >
          <font-awesome-icon icon="fa-solid fa-circle-plus" v-if="isAdd === false" class="actionButton" v-on:click="inputNewCategory" />
          <font-awesome-icon icon="fa-solid fa-circle-check" v-if="isAdd === true" class="px-2 fs-5 actionButton"
                             v-on:click="addCategory"/>
          <font-awesome-icon icon="fa-solid fa-circle-xmark" v-if="isAdd === true" class="px-2 fs-5 actionButton"
                             v-on:click="isAdd = false"/>
        </td>
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
      editedCategory: null,
      isAdd: false,
      categories: [
        {
          categoryId: 0,
          categoryName: '',
          isSelected: false,
          editedCategory: null,
        }
      ],
      category: {
        categoryName: ''
      }
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
    editData(category) {
      this.editedCategory = category
    },
    saveData(category) {
      this.category.categoryName = category.categoryName
      this.updateCategory(category.categoryId)
      this.editedCategory = null;
    },
    cancelEdit() {
      this.editedCategory = null;
    },
    deleteCategory: function (categoryId) {
      this.$http.delete("/categories", {
            params: {
              categoryId: categoryId
            }
          }
      ).then(response => {
        this.getAllCategories()
      }).catch(error => {
        console.log(error)
      })
    },
    inputNewCategory: function () {
      this.isAdd= true
    },
    addCategory: function () {
      this.$http.post("/categories", this.category
      ).then(response => {
        this.isAdd = false
        this.getAllCategories()
      }).catch(error => {
        console.log(error)
      })
    },
    updateCategory: function (categoryId) {
      this.$http.put("/categories", this.category, {
            params: {
              categoryId: categoryId
            }
          }
      ).then(response => {
        this.getAllCategories()
      }).catch(error => {
        console.log(error)
      })
    },

  },
  beforeMount() {
    this.getAllCategories()
  }
}
</script>
