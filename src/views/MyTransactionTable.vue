<template>
  <div>
    <table class="table table-dark table-hover">
      <thead>
      <tr>
        <th scope="col">Mänguasi</th>
        <th scope="col">Müüja</th>
        <th scope="col">Ostja</th>
        <th scope="col">Postiautomaat</th>
        <th scope="col">Tehingu staatus</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="transaction in transactions" class="text-start">
        <td>{{transaction.toyName}}</td>
        <td>{{transaction.buyerUsername}}</td>
        <td>{{transaction.sellerUsername}}</td>
        <td>{{transaction.terminalName}}</td>
        <td>{{transaction.status}}</td>
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
      transactions: [
        {
          toyName: '',
          sellerUsername: '',
          buyerUsername: '',
          terminalName: '',
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
  },
  beforeMount() {
    this.getMyTransactions()
  }

}
</script>