<template>
  <div>
    <h3>Mänguasjad</h3>
    <table class="table table-striped box-shadow my-3">
      <thead>
      <tr>
        <th scope="col">Mänguasi</th>
        <th scope="col">Kirjeldus</th>
        <th scope="col">Kategooria</th>
        <th scope="col">Seisukord</th>
        <th scope="col">Asukoht</th>
        <th scope="col">Pilt</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="toy in toys" :key="toy.id" class="text-start">
        <td>
          <router-link :to="{name: 'toy', query: {toyId:toy.id}}" class="fw-bold">{{ toy.name }}</router-link>
        </td>
        <td>{{ toy.description }}</td>
        <td>{{ toy.categoryName }}</td>
        <td>{{ toy.conditionName }}</td>
        <td>{{ toy.cityName }}</td>
        <td><img :src="toy.picture" class="img-thumbnail" style="max-height: 200px"></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "MyToyTable",
  props: {
    userIdFromQuery: {}
  },
  data: function () {
    return {
      userId: 0,
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
          userId: '',
          picture: ''
        }
      ],
    }
  },
  methods: {
    getMyToys: function () {
      if (this.$route.name === 'mytrades') {
       this.userId = sessionStorage.getItem('userId')
      } else {
        this.getUser()
      }
      this.$http.get("/trade/me", {
          params: {
            userId: this.userId,
          }
        }
      ).then(response => {
        this.toys = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    getUser: function () {
      if (this.$route.query.otherUser === undefined) {
        this.userId = sessionStorage.getItem('userId')
      } else {
        this.userId = this.$route.query.otherUser
      }
    }
  },
  beforeMount() {
    this.getMyToys()

  }
}
</script>
