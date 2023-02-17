<template>
  <div>
    <div class="row g-4 my-2 mx-auto">
      <div v-for="toy in toys" class="col-4 product-item mx-3 px-3 text-start card-back">
        <div class="product-img">
          <img :src="toy.picture" alt="" style="max-height: 200px" class="img-fluid d-block mx-auto">
          <div class="row btns w-100 mx-auto text-center">
            <button type="button" class="col py-2">
              <router-link :to="{name: 'toy', query: {toyId:toy.id}}" class="d-block text-white text-decoration-none py-2 product-name ">{{ toy.name }}</router-link>
            </button>
          </div>
        </div>
        <div class="product-info p-3">
          <span class="product-type">{{ toy.categoryName }}</span>
            <router-link :to="{name: 'toy', query: {toyId:toy.id}}" class="d-block text-dark py-2 product-name fw-bold text-decoration-none">{{ toy.name }}</router-link>
          <span class="product-price">{{ toy.conditionName }}</span>
          <div class="rating d-flex mt-1">
            <span>{{ toy.description }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ToyList",
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
      this.$http.post("/trade/trades", this.categories
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
