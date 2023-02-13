<template>
  <table class="table table-bordered table-striped">
    <thead class="table-dark">
    <tr>
      <th scope="col">Seisukord</th>
      <th scope="col"></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="condition in conditions">
      <td>{{ condition.conditionName }}</td>
      <td class="text-center"><font-awesome-icon icon="fa-solid fa-pencil" class="px-2" /><font-awesome-icon icon="fa-solid fa-trash" class="px-2" /></td>
    </tr>
    <tr>
      <td></td>
      <td class="text-center fs-4"><font-awesome-icon icon="fa-solid fa-circle-plus" /></td>
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