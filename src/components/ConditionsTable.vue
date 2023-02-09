<template>
  <table class="table table-bordered table-striped">
    <thead class="table-dark">
    <tr>
      <th scope="col">Seisukord</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="condition in conditions">
      <td>{{ condition.conditionName }}</td>
    </tr>

    </tbody>
  </table>
</template>

<script>
export default {
  name: "ConditionsTable",
  data: function () {
    return {
      conditions: [
        {
          conditionId: 0,
          conditionName: '',
        }
      ]
    }
  },
  methods: {
    getAllConditions: function () {
      this.$http.get("/conditions")
          .then(response => {
            this.conditions = response.data
          })
          .catch(error => {
            console.log(error)
          })
    }
  },
  beforeMount() {
    this.getAllConditions()
  }
}
</script>