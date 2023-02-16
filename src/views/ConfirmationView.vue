<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-4">
        <img class="img-fluid" :src="toy.picture">
      </div>
      <div class="col-4 text-start">
        <p>Soovid toodet <b>{{toy.name}}</b></p>
        <p>Andja: <b>{{ toy.userUsername }}</b></p>
        <p>Andja telefoninumber: <b>{{ toy.userMobile }}</b></p>
        <div class="parcelDropdown">

        <select v-model="transaction.parcelPoint">
          <option selected disabled style="font-weight: bold" class="parcelDropdown">-- Vali pakiautomaat --</option>
          <option v-for="parcelPoint in parcelPoints">
            {{parcelPoint}}
          </option>
        </select>
        </div>

        <button v-on:click="confirmTransaction" type="button" class="btn btn-outline-dark mt-3 float-end">Kinnitan</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ConfirmationView",
  data: function () {
    return {
      toyId: this.$route.query.toyId,
      toy: {
        id: 0,
        userId: 0,
        userUsername: '',
        userMobile: '',
        cityId: 0,
        cityName: '',
        conditionId: 0,
        conditionName: '',
        categoryId: 0,
        categoryName: '',
        name: '',
        description: '',
        picture: '',
        status: ''
      },
      locations: [
        {
          NAME: '',
          A0_NAME: ''
        }

      ],
      parcelPoints: [
      ],
      transaction: {
        toyId: 0,
        buyerId: 0,
        parcelPoint: '-- Vali pakiautomaat --'
      }
    }
  },
  methods: {
    getToy: function () {
      this.$http.get("/toy", {
            params: {
              toyId: this.toyId
            }
          }
      ).then(response => {
        this.toy = response.data
      }).catch(error => {
        console.log(error)
      })
    },
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

  },
  beforeMount() {
    this.getToy()

    this.getParcelPoints()

  }
}
</script>