<template>
  <div class="col-6">
    <table class="table table-dark table-hover">
      <thead>
      <tr>
        <th scope="col">Mänguasi</th>
        <th scope="col">Kirjeldus</th>
        <th scope="col">Kategooria</th>
        <th scope="col">Seisukord</th>
        <th scope="col">Asuoht</th>
        <th scope="col">Pilt</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="toy in toys">
        <td>{{ toy.name }}</td>
        <td>{{ toy.description }}</td>
        <td>{{ toy.categoryName }}</td>
        <td>{{ toy.conditionName }}</td>
        <td>{{ toy.cityName }}</td>
        <td><img src="toy.picture" class="img-thumbnail" ></td>
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
          picture: ''
        }
      ],
      categoryId: 0,
    }
  },
  methods: {
    getToys: function () {
      this.$http.get("/trade/trades", {
            params: {
              categoryId: this.categoryId,

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
    this.getToys()
  }

}
</script>
