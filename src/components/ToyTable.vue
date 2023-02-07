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
      <tr v-for="toy in toys" :key="toy.category.id">
        <td>{{ toy.name }}</td>
        <td>{{ toy.description }}</td>
        <td>{{ toy.category.name }}</td>
        <td>{{ toy.condition.name }}</td>
        <td>{{ toy.city.name }}</td>
        <td>{{ toy.picture }}</td>
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
          category: [
            {
              categoryId: 0,
              categoryName: ''
            }
          ],
          condition: [
            {
              conditionId: 0,
              conditionName: ''
            }
          ],
          city: [
            {
              cityId: 0,
              cityName: '',
            }
          ],
          picture: ''
        }
      ],
      categoryId: 1,
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
        alert(this.toys)
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
