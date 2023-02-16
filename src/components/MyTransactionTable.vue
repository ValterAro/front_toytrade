<template>
  <div>
    <table class="table table-dark table-hover">
      <thead>
      <tr>
        <th scope="col">Mänguasi</th>
        <th scope="col">Andja</th>
        <th scope="col">Saaja</th>
        <th scope="col">Saaja telefon</th>
        <th scope="col">Postiautomaat</th>
        <th scope="col">Tehingu staatus</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="transaction in transactions" class="text-start">
        <td>{{transaction.toyName}}</td>
        <td>{{transaction.sellerUsername}}</td>
        <td>{{transaction.buyerUsername}}</td>
        <td>{{transaction.buyerMobile}}</td>
        <td>{{transaction.parcelPoint}}</td>
        <td>{{transaction.status}}</td>
        <button v-if="transaction.sellerUsername === username && transaction.status === waitingForSeller" v-on:click="setToyTransactionToSent(transaction.transactionId)" type="button" class="btn btn-outline-light">Välja saadetud</button>
        <button v-if="transaction.buyerUsername === username && transaction.status === waitingForBuyer" v-on:click="setToyTransactionToCompleted(transaction.transactionId)" type="button" class="btn btn-outline-light">Kätte saadud</button>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'MyTransactionTable',
  data: function () {
    return {
      waitingForBuyer:'Välja saadetud, ootab ostjani jõudmist',
      waitingForSeller:'Mänguasi ootab müüja poolt välja saatmist',
      username: '',
      transactions: [
        {
          transactionId: 0,
          toyName: '',
          sellerUsername: '',
          buyerUsername: '',
          buyerMobile:'',
          parcelPoint: '',
          status: ''
        }
      ]
    }

  },
  methods: {
    getMyTransactions: function () {
      this.$http.get("/trade/my-transactions", {
            params: {
              userId: sessionStorage.getItem('userId'),
            }
          }
      ).then(response => {
        this.transactions = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    setToyTransactionToSent: function (transactionId) {
      console.log(transactionId)
      this.$http.put("/trade/transaction-sent", null, {
            params: {
              toyTransactionId: transactionId
            }
          }
      ).then(response => {
        this.getMyTransactions()
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
  setToyTransactionToCompleted: function (transactionId) {
    this.$http.put("/trade/transaction-completed", null, {
          params: {
            toyTransactionId: transactionId
          }
        }
    ).then(response => {
      this.getMyTransactions()
      this.emitPointChange()
      console.log(response.data)
    }).catch(error => {
      console.log(error)
    })

  },
    emitPointChange: function () {
      this.$emit('emitPointChangeEvent')
    },

    getMyUsername: function () {
      this.$http.get("/trade/my-username", {
            params: {
              userId: sessionStorage.getItem('userId'),
            }
          }
      ).then(response => {
        this.username = response.data
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },

},
  beforeMount() {
    this.getMyTransactions()
    this.getMyUsername()
  }

}
</script>