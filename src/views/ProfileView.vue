<template>
  <div>

        <div v-if="!currentUserOnPage">
          <MessageBox :user-id-from-query="userIdFromQuery"/>
        </div>
      </div>

</template>

<script>

import MessageBox from "@/components/MessageBox.vue";


export default {
  name: "ProfileView",
  components: {MessageBox},
  data: function () {
    return {
      userIdFromQuery: this.$route.query.userId,
      userIdFromSession: sessionStorage.getItem('userId'),
      currentUserOnPage: false

    }

  },
  beforeMount() {
    if (this.userIdFromSession === this.userIdFromQuery) {
      this.currentUserOnPage = true
    }
  }
}
</script>

