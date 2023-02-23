<template>
  <div>
    <div v-for="spinner in 3" v-show="loading" class="spinner-grow text-blue mx-2 my-5" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>


    <div v-show="!loading" class="row g-4 my-2 mx-auto">
      <AlertDanger :alert-message="messageError"/>
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
          <div class="product-type">
            Andja:
            <router-link v-if="isLoggedIn" :to="{name: 'profile', query: {otherUser:toy.userId}}" class="text-decoration-none ">{{ toy.userUsername }}</router-link>
            <span v-else>{{ toy.userUsername }}</span>
          </div>
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
import AlertDanger from "@/components/alert/AlertDanger.vue";

export default {
  name: "ToyList",
  components: {AlertDanger},
  data: function () {
    return {
      messageError: '',
      loading: false,
      isLoggedIn: false,
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
          userUsername: '',
          status: ''
        }
      ],
      categoryId: 0,
      toyId: 0
    }
  },
  methods: {

    getToys: function () {
      this.messageError = ''
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 1000)
      this.$http.get("/trade/all"
      ).then(response => {
        this.toys = response.data
        if (this.toys.length === 0) {
          this.messageError = 'Ühtegi mänguasja ei leitud!'
        }
        if (sessionStorage.getItem('userId') !== '') {
          this.isLoggedIn = true
        }
      }).catch(error => {
        console.log(error)
      })
    },
    setCategoryFilters: function (selectedCategories) {
      this.messageError = ''
      this.categories.forEach(category => category.isSelected = false)
      for (let i = 0; i < this.categories.length; i++) {
        for (let j = 0; j <= selectedCategories.length; j++) {
          if (this.categories[i].categoryId === selectedCategories[j]) {
            this.categories[i].isSelected = true;
          }
        }
      }
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 1000)
      this.$http.post("/trade/filter", this.categories
      ).then(response => {
        this.toys = response.data
        if (this.toys.length === 0) {
          this.messageError = 'Ühtegi mänguasja ei leitud!'
        }
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
