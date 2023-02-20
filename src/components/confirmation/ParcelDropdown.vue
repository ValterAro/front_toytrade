<template>
  <div class="row justify-content-end parcelDropdown">
    <div class="col-10 justify-content-end text-end me-5">
      <select v-on:change="emitSelectedParcelPoint" v-model="selectedParcelPoint">
        <option selected disabled class="parcelDropdown">-- Vali pakiautomaat --</option>
        <option v-for="parcelPoint in parcelPoints">
          {{ parcelPoint }}
        </option>
      </select>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ParcelDropdown',
  data: function () {
    return {
      selectedParcelPoint: '-- Vali pakiautomaat --',
      locations: [
        {
          NAME: '',
          A0_NAME: ''
        }

      ],
      parcelPoints: [],
    }
  },
  methods: {
    getParcelPoints: function () {
      this.$http.get("https://www.omniva.ee/locations.json")
          .then(response => {
            this.locations = response.data
            for (let i = 0; i < this.locations.length; i++) {
              if (this.locations[i].A0_NAME === 'EE') {
                this.parcelPoints.push(this.locations[i].NAME)
              }
            }
            this.parcelPoints.shift()
          })
          .catch(error => {
            console.log(error)
          })
    },
    emitSelectedParcelPoint: function () {
      this.$emit('emitSelectedParcelPointEvent', this.selectedParcelPoint)
    }
  },
  beforeMount() {
    this.getParcelPoints()
  }
}
</script>