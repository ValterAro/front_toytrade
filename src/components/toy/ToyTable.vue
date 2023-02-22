<template>
  <div class="col">
    <table class="table table-striped box-shadow">
      <thead>
      <tr>
        <th scope="col">Mänguasi</th>
        <th scope="col">Kirjeldus</th>
        <th scope="col">Kategooria</th>
        <th scope="col">Seisukord</th>
        <th scope="col">Asukoht</th>
        <th scope="col">Müüja</th>
        <th scope="col">Pilt</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="toy in toys" class="text-start">
        <td><router-link :to="{name: 'toy', query: {toyId:toy.id}}">{{ toy.name }}</router-link></td>
        <td>{{ toy.description }}</td>
        <td>{{ toy.categoryName }}</td>
        <td>{{ toy.conditionName }}</td>
        <td>{{ toy.cityName }}</td>
        <td>{{ toy.userUsername}}</td>
        <td><img :src="toy.picture" class="img-thumbnail"></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'ToyTable',
  data: function () {
    return {
      categories: [
        {
          categoryId: 0,
          categoryName: '',
          isSelected: false
        }
      ],
      toys: [
        {
          id: 0,
          name: '',
          description: '',
          categoryId: 0,
          categoryName: '',
          conditionId: 0,
          conditionName: '',
          cityId: 0,
          cityName: '',
          picture: '',
          userId: 0,
          userUserName: '',
          status: ''
        }
      ],
      categoryId: 0,
      toyId: 0
    }
  },
  methods: {

    getToys: function () {
      this.$http.get("/trade/all"
      ).then(response => {
        this.toys = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    setCategoryFilters: function (selectedCategories) {
      this.categories.forEach(category => category.isSelected = false)
      for (let i = 0; i < this.categories.length; i++) {
        for (let j = 0; j <= selectedCategories.length; j++) {
          if (this.categories[i].categoryId === selectedCategories[j]) {
            this.categories[i].isSelected = true;
          }
        }
      }
      this.$http.post("/trade/filter", this.categories
      ).then(response => {
        this.toys = response.data
      }).catch(error => {

      })
    },
    getAllCategories: function () {
      this.$http.get("/categories")
          .then(response => {
            this.categories = response.data
          })
          .catch(error => {
          })
    }
  },
  beforeMount() {
    this.getToys()
    this.getAllCategories()
  }
}
</script>
