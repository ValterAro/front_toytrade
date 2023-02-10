<template>
  <div>
    <table class="table table-bordered table-striped">
      <thead class="table-dark">
      <tr>
        <th scope="col">Kasutajanimi</th>
        <th scope="col">Roll</th>
        <th scope="col">Telefon</th>
        <th scope="col">Punkte</th>
        <th scope="col">Staatus</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users">
        <td>{{user.username}}</td>
        <td>{{user.roleName}}</td>
        <td>{{user.mobile}}</td>
        <td>{{user.points}}</td>
        <td>{{user.status}}</td>
      </tr>

      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "UserTable",
  data: function () {
    return {
      users: [
        {
          id: 0,
          roleId: 0,
          roleName: '',
          username: '',
          points: 0,
          mobile: '',
          status: ''
        }
      ]
    }
  },
  methods: {
    getAllUsers: function () {
      this.$http.get("/users")
          .then(response => {
           this.users = response.data
          })
          .catch(error => {
            console.log(error)
          })
    },
  },
  beforeMount() {
    this.getAllUsers()
  }
}
</script>