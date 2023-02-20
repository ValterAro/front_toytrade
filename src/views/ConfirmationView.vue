<template>
  <div class="container my-5">
    <ToyInfo/>
    <ParcelDropdown @emitSelectedParcelPointEvent="setSelectedParcelPoint" class=" my-3"/>
    <div class="row justify-content-end">
      <div class="col-10 text-end me-5">
        <button v-on:click="confirmTransaction" type="button" class="btn btn-blue mt-3 ">Kinnitan
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import ToyInfo from "@/components/confirmation/ToyInfo.vue";
import ParcelDropdown from "@/components/confirmation/ParcelDropdown.vue";

export default {
  name: "ConfirmationView",
  components: {ParcelDropdown, ToyInfo},
  data: function () {
    return {
      toyId: this.$route.query.toyId,
      transaction: {
        toyId: 0,
        buyerId: 0,
        parcelPoint: '-- Vali pakiautomaat --'
      }
    }
  },
  methods: {
    confirmTransaction: function () {
      this.transaction.buyerId = sessionStorage.getItem('userId')
      this.transaction.toyId = this.toyId
      if (this.transaction.parcelPoint === '-- Vali pakiautomaat --') {
        //errormessage
      } else {
        this.$http.post("/trade/transaction", this.transaction
        ).then(response => {
          this.$router.push({name: 'mytrades'})
        }).catch(error => {
          console.log(error)
        })
      }
    },
    setSelectedParcelPoint: function (selectedParcelPoint) {
      this.transaction.parcelPoint = selectedParcelPoint
    }
  }
}
</script>