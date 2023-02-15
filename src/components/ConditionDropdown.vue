<template>
  <div>
    <div class="dropdown">
      <select v-model="selectedConditionId" :disabled="isView" class="form-select col-3" aria-label="Default select example">
        <option value="0" disabled>Seisukord</option>
        <option :selected="isView" :disabled="isView" v-for="condition in conditions" :value="condition.conditionId">{{condition.conditionName}}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConditionDropdown',
  props: {
    isView: Boolean,
    isEdit: Boolean
  },
  data: function () {
    return {

      selectedConditionId: 0,

      conditions: [
        {
          conditionId: 0,
          conditionName: '',
        }
      ],
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

    emitSelectedConditionId: function () {

        this.$emit('emitConditionIdEvent', this.selectedConditionId)

    },

    setSelectedConditionId(conditionId) {
      this.selectedConditionId = conditionId
    }

  },
  beforeMount() {
    this.getAllConditions()
  }

}

</script>