<template>
  <div>
  <div>
    <div class="col-3">
      <div class="input-group">

        <input v-model="name" type="text" class="form-control" placeholder="Nimi">

      </div>
      <br>
      <div class="dropdown">

        <select v-on:change="getAllCategories" class="form-select"
                aria-label="Default select example">
          <option value="0" disabled>Kategooriad</option>
          <option v-for="category in categories" :value="category.categoryId" >{{category.categoryName}}</option>

        </select>

      </div>
      <br>
      <select v-model="conditionId" v-on:change="" class="form-select"
              aria-label="Default select example">
        <option value="0" disabled>Seisukord</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>
      <br>
      <select v-model="cityId" v-on:change="" class="form-select"
              aria-label="Default select example">
        <option value="0" disabled>Linn</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>
    </div>
    <br>
    <div>
      <input class="form-control" type="file" id="formFile">

    </div>
    <br>
    <div class="input-group">
      <span class="input-group-text">Kirjeldus</span>
      <textarea v-model="description" class="form-control" aria-label="With textarea"></textarea>
    </div>
    <button v-on:click="sendAddRequest" type="button" class="btn btn-primary">Lisa</button>
  </div>
  </div>

</template>

<script>

export default {
  name: "ToyView",
  data: function () {
    return {

      name: '',
      categoryId: 0,
      conditionId: 0,
      cityId: 0,
      description: '',
      picture: '',


    toyDto: {
        id: 0,
        userId: 2,
        userUsername: '',
        cityId: 0,
        cityName: '',
        conditionId: 0,
        conditionName: '',
        categoryId: 0,
        categoryName: '',
        name: '',
        description: '',
        picture: [ ''
    ],
        status: ''
    },
      categories: {
           categoryId: '',
           categoryName: ''
      },

    }
  },
  methods: {
    sendAddRequest: function () {
      this.toyDto.name = this.name;
      this.toyDto.categoryId = this.categoryId;
      this.toyDto.conditionId = this.conditionId;
      this.toyDto.cityId = this.cityId;
      this.toyDto.description = this.description;
      this.toyDto.picture = this.picture;
      this.toyDto.userId = 2;

      this.$http.post("/toy", this.toyDto
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },

    getAllCategories: function () {
      this.$http.get("/categories")
          .then(response => {
        this.categories = response.data
      }).catch(error => {
        console.log(error)
      })
    },
  }

}
</script>

<style scoped>

</style>