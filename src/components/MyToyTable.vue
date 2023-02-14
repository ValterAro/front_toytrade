<template>
  <div>
    <table class="table table-dark table-hover">
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
      <tr v-for="toy in toys" :key="toy.id" class="text-start">
        <td>{{ toy.name }}</td>
        <td>{{ toy.description }}</td>
        <td>{{ toy.categoryName }}</td>
        <td>{{ toy.conditionName }}</td>
        <td>{{ toy.cityName }}</td>
        <td>{{ toy.userUsername }}</td>
        <td><img :src="toy.picture" class="img-thumbnail"></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: "MyToyTable",
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
          userId: '',
          picture: ''
        }
      ],
    }
  },
  methods: {


    getMyToys: function () {
      this.$http.get("/trade/me", {
            params: {
              userId: sessionStorage.getItem('userId'),
            }
          }
      ).then(response => {
        this.toys = response.data
      }).catch(error => {
        console.log(error)
      })
    },
  },
  beforeMount() {
    this.getMyToys()
  }
}
</script>
