<template>
  <table class="table table-bordered table-striped">
    <thead class="table-dark">
    <tr>
      <th scope="col">Seisukord</th>
      <th scope="col"></th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="condition in conditions" :key="condition.conditionId" :class="{editing: condition === editedCondition}"
        v-cloak>
      <td>
        <div class="view">
          {{ condition.conditionName }}
        </div>
        <div class="edit">
          <input class="tableInput" type="text" v-model="condition.conditionName" :placeholder="condition.conditionName"/>
        </div>
      </td>
      <td class="text-center align-middle">
        <font-awesome-icon icon="fa-solid fa-pencil" class="px-2 fs-5 actionButton view"
                           v-on:click="editData(condition)"/>
        <font-awesome-icon icon="fa-solid fa-circle-check" class="px-2 fs-5 actionButton edit"
                           v-on:click="saveData(condition)"/>
        <font-awesome-icon icon="fa-solid fa-solid fa-trash" class="px-2 fs-5 actionButton view"
                           v-on:click="deleteCondition(condition.conditionId)"/>
        <font-awesome-icon icon="fa-solid fa-circle-xmark" class="px-2 fs-5 actionButton edit"
                           v-on:click="cancelEdit"/>
      </td>
    </tr>
    <tr>
      <td><input class="tableInput" v-if="isAdd === true" type="text" v-model="condition.conditionName" placeholder="Seisukord"/></td>
      <td class="text-center fs-4" >
        <font-awesome-icon icon="fa-solid fa-circle-plus" v-if="isAdd === false" class="actionButton" v-on:click="inputNewCondition" />
        <font-awesome-icon icon="fa-solid fa-circle-check" v-if="isAdd === true" class="px-2 fs-5 actionButton"
                           v-on:click="addCondition"/>
        <font-awesome-icon icon="fa-solid fa-circle-xmark" v-if="isAdd === true" class="px-2 fs-5 actionButton"
                           v-on:click="isAdd = false"/>
      </td>
    </tr>

    </tbody>
  </table>
</template>

<script>
export default {
  name: "ConditionsTable",
  data: function () {
    return {
      editedCondition: null,
      isAdd: false,
      conditions: [
        {
          conditionId: 0,
          conditionName: '',
        }
      ],
      condition: {
        conditionName: ''
      }
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
    },
    editData(condition) {
      this.editedCondition = condition
    },
    saveData(condition) {
      this.condition.conditionName = condition.conditionName
      this.updateCondition(condition.conditionId)
      this.editedCondition = null;
    },
    cancelEdit() {
      this.editedCondition = null;
    },
    deleteCondition: function (conditionId) {
      this.$http.delete("/conditions", {
            params: {
              conditionId: conditionId
            }
          }
      ).then(response => {
        this.getAllConditions()
      }).catch(error => {
        console.log(error)
      })
    },
    inputNewCondition: function () {
      this.isAdd= true
    },
    addCondition: function () {
      this.$http.post("/conditions", this.condition
      ).then(response => {
        this.isAdd = false
        this.getAllConditions()
      }).catch(error => {
        console.log(error)
      })
    },
    updateCondition: function (conditionId) {
      this.$http.put("/conditions", this.condition, {
            params: {
              conditionId: conditionId
            }
          }
      ).then(response => {
        this.getAllConditions()
      }).catch(error => {
        console.log(error)
      })
    }
  },
  beforeMount() {
    this.getAllConditions()
  }
}
</script>