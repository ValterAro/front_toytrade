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
            </div>
            <div class="mb-3">
              <label for="exampleFormControlTextarea1" class="form-label">Saada sõnum</label>
              <textarea v-model="messageDto.message" class="form-control" style="border-radius:30px"
                        rows=2></textarea>
            </div>
            <button ref="bottomOfTable" v-on:click="sendMessage">Saada</button>
          </div>
        </template>
      </Modal>
      <div class="col-2 back-white box-shadow">
        <div class="list-group">
          <h2 class="py-1">Postkast</h2><span v-if="unreadMessages > 0">{{ unreadMessages }}</span>
          <button v-on:click="openChat(user)" v-for="user in users" :key="user.userId"
                  class="back-white border-0 border-top" :value="user.userId">

            <router-link :to="{name: 'profile', query: {userId:user.userId}}"
                         class="d-block text-decoration-none py-2 product-name ">
              <div v-if="messages123">
                <span class="badge text-bg-success"> {{ user.username }}</span>
              </div>
              <div v-if="!messages123">
                <span class="badge text-bg-danger"> {{ user.username }}</span>
              </div>
            </router-link>
          </button>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "@/components/Modal.vue";
import UserInfo from "@/components/my/UserInfo.vue";

export default {
  name: "Messaging",
  components: {Modal, UserInfo},
  data: function () {
    return {
      showModal: false,
      currentUserId: sessionStorage.getItem('userId'),
      otherUserId: this.userIdFromQuery,
      users: [{
        userId: 0,
        username: '',
      }],
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
      allReceivedMessages: [],
      messageFromSender: [[]]
    }
  },
  methods: {
    getReceivedMessages: function () {
      this.$http.get("/message/received", {
          params: {
            receiverId: this.currentUserId
          }
        }
      ).then(response => {
        this.allReceivedMessages = response.data
        this.sortMessagesBySender()
      }).catch(error => {
        console.log(error)
      })
    },
    sortMessagesBySender: function () {
      let uniqueSenders = this.getUniqueSenders()
      for (let i = 0; i < uniqueSenders.length; i++) {
        this.messageFromSender[i] = []
      }
      for (let i = 0; i < this.allReceivedMessages.length; i++) {
        for (let j = 0; j < uniqueSenders.length; j++) {
          if (this.allReceivedMessages[i].senderId === uniqueSenders[j]) {
            this.messageFromSender[j].push(this.allReceivedMessages[i].message)
          }
        }
      }
      console.log(this.messageFromSender)
    },
    getUniqueSenders: function () {
      let allSenders = []
      for (let i = 0; i < this.allReceivedMessages.length; i++) {
        allSenders.push(this.allReceivedMessages[i].senderId)
      }
      return [...new Set(allSenders)]
    }
  },
  beforeMount() {
    this.getReceivedMessages()
  }
}
</script>