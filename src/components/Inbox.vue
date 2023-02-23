<template>
  <div>
    <div v-if="gotTheStuff" class="list-group">
      <h2 class="py-1">Postkast</h2><span v-if="unreadMessages > 0">{{ unreadMessages }}</span>
      <button v-on:click="openChat(user)" v-for="user in users" :key="user.userId"
              class="back-white border-0 border-top" :value="user.userId">

        <router-link :to="{name: 'profile', query: {userId:user.userId}}"
                     class="d-block text-decoration-none py-2 product-name ">
          <div v-if="unreadSenders.includes(user.userId)">
            <span class="badge text-bg-success fs-5"> {{ user.username }}</span>
          </div>
          <div v-else>
            <span class="badge text-bg-secondary fs-5"> {{ user.username }}</span>
          </div>
        </router-link>
      </button>

    </div>
  </div>
</template>

<script>
export default {
  name: "Inbox",
  data: function () {
    return {
      showModal: false,
      currentUserId: sessionStorage.getItem('userId'),
      otherUserId: this.userIdFromQuery,
      users: [{
        userId: 0,
        username: '',
      }],
      gotTheStuff: false,
      messages123: true,

      messageDto: {
        id: 0,
        senderId: sessionStorage.getItem('userId'),
        receiverId: this.userIdFromQuery,
        message: '',
        status: 'A',
        created_at: ''
      },
      sentMessages: [{
        id: 0,
        senderId: 0,
        receiverId: 0,
        message: '',
        status: '',
        created_at: ''

      }],
      receivedMessages: [{
        id: 0,
        senderId: 0,
        receiverId: 0,
        message: '',
        status: '',
        created_at: ''
      }],

      allReceivedMessagesWithStatusA: [{
        id: 0,
        senderId: 0,
        receiverId: 0,
        message: '',
        status: '',
        created_at: ''
      }],

      timestamp: '',
      chatName: '',
      unreadMessages: 0,
      senderIds: [],
      unreadSenders: []
    }
  },
  methods: {
    getAllMessagesReceivedByCurrentUserWithStatusA: function () {
      this.$http.get("/message/received", {
          params: {
            receiverId: this.currentUserId,

          }
        }
      ).then(response => {
        this.allReceivedMessagesWithStatusA = response.data;
        let counter = 0
        this.storeUniqueSenderIds();
        for (let i = 0; i < this.allReceivedMessagesWithStatusA.length; i++) {
          if (this.allReceivedMessagesWithStatusA[i].status === 'A') {
            this.unreadSenders.push(this.allReceivedMessagesWithStatusA[i].senderId)
            counter += 1
          }
        }
        this.unreadSenders = [...new Set(this.unreadSenders)]
        this.unreadMessages = counter
      }).catch(error => {
        console.log(error)
      })
    },
    storeUniqueSenderIds() {
      for (const senderId of this.uniqueSenderIds) {
        // Do something with each unique sender ID, like store it in a variable

        const uniqueSenderId = senderId;
        this.getUserUsername(uniqueSenderId)
      }
      this.users.shift()
    },
    getUserUsername(senderId) {
      this.$http.get("/users/id", {
        params: {
          userId: senderId
        }
      })
        .then(response => {
          const username = response.data.username;
          const userId = response.data.userId;
          const userObj = {username, userId}; // create object with username and userId properties
          this.users.push(userObj); // push the object into the users array
          this.gotTheStuff = true;
        })
        .catch(error => {
          console.log(error);
        });
    },
  },
  computed: {
    sortedData() {
      const mergedArray = this.receivedMessages.concat(this.sentMessages);
      return mergedArray.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
    },
    uniqueSenderIds() {
      this.senderIds = [...new Set(this.allReceivedMessagesWithStatusA.map(message => message.senderId))]
      return this.senderIds
    },
  },
  beforeMount() {
    this.getAllMessagesReceivedByCurrentUserWithStatusA()
  }
}
</script>

<style>

.table-1 {
  background-color: rgba(0, 0, 0, 0.0) !important;
  border: none;
  position: relative;
  min-height: content-box;
}

.table-1 th,
.table-1 td,
.table-1 tr {
  border: none;
}

.table-1 th {

}

.table-container-1 {
  max-height: 400px;
  overflow-y: auto;
  scroll-behavior: auto;
}


.scrollable {
  overflow-y: scroll;
  border-radius: 30px;
}

.sent-message td {
  text-align: right;
  padding-left: 30px;
}

.received-message td {
  text-align: left;
  padding-right: 30px;
}
</style>