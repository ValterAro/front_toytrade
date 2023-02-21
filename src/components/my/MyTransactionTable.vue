<template>
  <div>
    <AlertSuccess :alert-message="messageSuccess" />
    <table class="table table-striped box-shadow">
      <thead>
      <tr>
        <th scope="col">Mänguasi</th>
        <th scope="col">Andja</th>
        <th scope="col">Saaja</th>
        <th scope="col">Saaja telefon</th>
        <th scope="col">Postiautomaat</th>
        <th scope="col">Tehingu staatus</th>
        <th scope="col">Viimase tegevuse aeg</th>
        <th scope="col">Ootel tegevused</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="transaction in transactions" class="text-start">
        <td>{{transaction.toyName}}</td>
        <td>{{transaction.sellerUsername}}</td>
        <td>{{transaction.buyerUsername}}</td>
        <td>{{transaction.buyerMobile}}</td>
        <td>{{transaction.parcelPoint}}</td>
        <td>{{transaction.transactionStatusName}}</td>
        <td>{{transaction.timeChanged}}</td>
        <td>
          <button v-if="transaction.sellerUsername === username && transaction.transactionStatusName === waitingForSeller" v-on:click="setToyTransactionToSent(transaction.transactionId)" type="button" class="btn btn-outline-blue">Välja saadetud</button>
          <button v-if="transaction.buyerUsername === username && transaction.transactionStatusName === waitingForBuyer" v-on:click="setToyTransactionToCompleted(transaction.transactionId)" type="button" class="btn btn-outline-blue">Kätte saadud</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import AlertSuccess from "@/components/alert/AlertSuccess.vue";

export default {
  name: 'MyTransactionTable',
  components: {AlertSuccess},
  data: function () {
    return {
      messageSuccess: '',
      waitingForBuyer:'Välja saadetud, ootab saajani jõudmist',
      waitingForSeller:'Mänguasi ootab andja poolt välja saatmist',
      username: '',
      transactions: [
        {
          transactionId: 0,
          toyName: '',
          sellerUsername: '',
          buyerUsername: '',
          buyerMobile:'',
          parcelPoint: '',
          timeChanged: '',
          transactionStatusName: ''
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
        this.messageSuccess = 'Kinnitatud, mänguasi välja saadetud!'
        this.timeoutAndReloadPage(2000)
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
      this.messageSuccess = 'Kinnitatud, mänguasi kätte saadud!'
      this.timeoutAndReloadPage(2000)
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
    timeoutAndReloadPage: function (timeOut) {
      setTimeout(() => {
        this.$router.go(0)
      }, timeOut)
    }

},
  beforeMount() {
    this.getMyTransactions()
    this.getMyUsername()
  }

}
</script>