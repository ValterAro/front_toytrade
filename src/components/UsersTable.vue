<template>
  <div>
    <table class="table table-bordered table-striped">
      <thead class="table-dark">
      <tr>
        <th scope="col">Kasutajanimi</th>
        <th scope="col">Roll</th>
        <th scope="col">Telefon</th>
        <th scope="col">Punkte</th>
        <th scope="col"></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.userId" :class="{editing: user == editedUser}" v-cloak>
        <td>
          <div class="view">
            {{ user.username }}
          </div>
          <div class="edit">
            <input class="tableInput" type="text" v-model="user.username" :placeholder="user.username"/>
          </div>
        </td>
        <td>
          <div class="view">
            {{ user.roleName }}
          </div>
          <div class="edit">
            <select class="form-select form-select-sm" v-model="previousRole">
              <option v-for="role in roles" v-model="role.id" :key="role.id" >{{role.id}}{{role.name}}</option>
            </select>
          </div>
        </td>
        <td>
          <div class="view">
            {{ user.mobile }}
          </div>
          <div class="edit">
            <input class="tableInput" type="text" v-model="user.mobile" :placeholder="user.mobile"/>
          </div>
        </td>
        <td>
          <div class="view">
            {{ user.points }}
          </div>
          <div class="col-1 edit">
            <input type="number" v-model="user.points" :placeholder="user.points"/>
          </div>
        </td>
        <td class="text-center align-middle">
          <font-awesome-icon icon="fa-solid fa-user-pen" class="px-2 fs-5 actionButton view"
                             v-on:click="editData(user)"/>
          <font-awesome-icon icon="fa-solid fa-circle-check" class="px-2 fs-5 actionButton edit"
                             v-on:click="saveData(user)"/>
          <font-awesome-icon icon="fa-solid fa-user-slash" class="px-2 fs-5 actionButton view"
                             v-on:click="deleteUser(user.id)"/>
          <font-awesome-icon icon="fa-solid fa-circle-xmark" class="px-2 fs-5 actionButton edit"
                             v-on:click="cancelEdit"/>
        </td>
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
      editedUser: null,
      previousRole: '',
      userId: 1,
      users: [
        {
          userId: 0,
          roleId: 0,
          roleName: '',
          username: '',
          points: 0,
          mobile: '',
          status: ''
        }
      ],
      user: {
        roleId: 0,
        username: '',
        points: 0,
        mobile: ''
      },
      roles: [
        {
          id: 0,
          name: ''
        }
      ]
    }
  },
  methods: {
    cancelEdit() {
      this.editedUser = null;
    },
    editData(user) {
      this.editedUser = user
      this.previousRole = user.roleName
      console.log(this.previousRole)
    },
    saveData(user) {
      this.userId = user.userId
      console.log(this.userId)
      this.user.username = user.username

      this.user.roleId =
      console.log(user.roleId)
      this.user.mobile = user.mobile
      this.user.points = user.points
      this.updateUserInfo(this.userId)
      this.editedUser = null;
    },
    getAllRoles: function () {
      this.$http.get("/users/roles")
          .then(response => {
            this.roles = response.data
          })
          .catch(error => {
            console.log(error)
          })
    },
    getAllUsers: function () {
      this.$http.get("/users")
          .then(response => {
            this.users = response.data
          })
          .catch(error => {
            console.log(error)
          })
    },
    updateUserInfo: function (userId) {
      this.$http.put("/users", this.user, {
            params: {
              userId: userId
            }
          }
      ).then(response => {
        console.log(response.data)
      }).catch(error => {
        console.log(error)
      })
    },
    deleteUser: function (userId) {
      this.$http.delete("/users", {
            params: {
              userId: userId
            }
          }
      ).then(response => {
        this.getAllUsers()
      }).catch(error => {
        console.log(error)
      })
    },
  },
  beforeMount() {
    this.getAllUsers()
    this.getAllRoles()
  }
}
</script>