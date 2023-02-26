<template>
  <div>
    <div class="mx-5 my-5">
      <Modal class="modal-chat" :show="showModal" @close="showModal = false">
        <template #header>
          <h5>Vestle kasutajaga {{ chatName }}</h5>
          <button type="button" class="btn-close float-end bord" v-on:click="showModal = false"
                  aria-label="Close"></button>
        </template>
        <template #body>
          <div>
            <div ref="tableContainer" class="table-container-1" :class="{'scrollable': sortedData.length > 15}">
              <table class="table table-1">
                <thead>
                <tr>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in sortedData"
                    :class="{'sent-message': isSentMessage(index), 'received-message': isReceivedMessage(index)}">
                  <td>{{ item.message }}</td>
                </tr>
                </tbody>
              </table>
              <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Saada sõnum</label>
                <textarea v-model="messageDto.message" class="form-control" style="border-radius:30px"
                          rows=2></textarea>
              </div>
              <button ref="bottomOfTable" v-on:click="sendMessage">Saada</button>
            </div>
          </div>
        </template>
      </Modal>
      <div class="col-2 back-white box-shadow">
        <div v-if="gotTheStuff" class="list-group text-start">
          <h4 class="py-1">Postkast</h4><span v-if="unreadMessages > 0">{{ unreadMessages }}</span>
          <button v-on:click="openChat(user)" v-for="user in users" :key="user.userId"
                  class="back-white border-0 border-top" :value="user.userId">
            <router-link :to="{name: 'mytrades', query: {otherUser:user.userId}}"
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
    </div>
  </div>

</template>
<script>
import UserInfo from "@/components/my/UserInfo.vue";
import Modal from "@/components/Modal.vue";

export default {
  components: {Modal, UserInfo},
  props: {
    userIdFromQuery: {}
  },
  data() {
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

  mounted() {
    this.scrollToBottomOnMount();

  },
  methods: {
    openModal: function () {
      this.showModal = true
    },
    openChat: function (user) {
      this.chatName = user.username
      this.otherUserId = user.userId
      this.showModal = true
      this.scrollToBottomOnMount()
      this.changeStatusOfMessages()
    },
    storeUniqueSenderIds() {
      for (const senderId of this.uniqueSenderIds) {
        // Do something with each unique sender ID, like store it in a variable

        const uniqueSenderId = senderId;
        this.getUserUsername(uniqueSenderId)
      }
      this.users.shift()
    },

    changeStatusOfMessages: function () {
      this.$http.put("/message/change", null, {
          params: {
            receiverId: this.otherUserId,
            senderId: this.currentUserId,
          }
        }
      ).then(response => {
        this.messages123 = false;
      }).catch(error => {
        console.log(error)
      })
    },

    isSentMessage(index) {
      return this.sentMessages.includes(this.sortedData[index]);
    },
    isReceivedMessage(index) {
      return this.receivedMessages.includes(this.sortedData[index]);
    },

    scrollToBottom() {
      // scroll to the bottom of the table container
      this.$refs.tableContainer.scrollTop = this.$refs.tableContainer.scrollHeight;

    },
    scrollToBottomOnMount() {
      // wait for the data to be fetched before scrolling to the bottom
      Promise.all([this.getMessagesSentByCurrentUser(), this.getMessagesSentByOtherUser()])
        .then(() => {
          this.$nextTick(() => {
            this.scrollToBottom();
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    saveTimestamp() {
      this.messageDto.created_at = new Date().toISOString();
    },
    sendMessage() {
      this.$http.post("/message", this.messageDto)
        .then(response => {
          // add new message data to sentMessages array
          this.sentMessages.push(response.data);

          // clear the message text field
          this.messageDto.message = '';

          // scroll to the bottom of the table container
          this.$nextTick(() => {
            this.scrollToBottom();
          });

          // fetch updated messages
          Promise.all([this.getMessagesSentByCurrentUser(), this.getMessagesSentByOtherUser()])
            .then(() => {
              // do nothing
            })
            .catch(error => {
              console.log(error);
            });

        })
        .catch(error => {
          console.log(error);
          this.alertMessage();
        });
    },
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
          if(this.otherUserId === undefined) {
          this.gotTheStuff = true }

        })
        .catch(error => {
          console.log(error);
        });
    },

    getMessagesSentByCurrentUser() {
      return this.$http.get("/message", {
        params: {
          senderId: this.currentUserId,
          receiverId: this.otherUserId
        }
      })
        .then(response => {
          this.sentMessages = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    getMessagesSentByOtherUser: function () {
      this.$http.get("/message", {
          params: {
            senderId: this.otherUserId,
            receiverId: this.currentUserId
          }
        }
      ).then(response => {
        this.receivedMessages = response.data

      }).catch(error => {
        console.log(error)
      })
    },
    timeoutAndReloadPage: function (timeOut) {
      this.changeStatusOfMessages()
      setTimeout(() => {
        this.$router.go(0)
      }, timeOut)

    }
  },
  beforeMount() {
    this.getMessagesSentByCurrentUser()
    this.getMessagesSentByOtherUser()
    this.saveTimestamp()
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