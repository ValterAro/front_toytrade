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
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(user, index) in users" :key="user.id">
        <td>{{user.username}}<input type="text" v-bind:disabled="disabled" :placeholder="user.username"/></td>
        <td>{{user.roleName}}</td>
        <td>{{user.mobile}}</td>
        <td>{{user.points}}</td>
        <td>{{user.status}}</td>
        <td class="text-center"><font-awesome-icon icon="fa-solid fa-user-pen" class="px-2" v-on:click="disabled = !disabled" /><font-awesome-icon icon="fa-solid fa-user-slash" class="px-2" /></td>
      </tr>
      <tr>
        <td></td><td></td><td></td><td></td><td></td>
        <td class="text-center fs-4"><font-awesome-icon icon="fa-solid fa-circle-plus" /></td>
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
      disabled: true,
      isEdit: false,
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