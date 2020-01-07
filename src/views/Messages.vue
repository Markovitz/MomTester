<template>
  <div class="messages">
    <Messages 
      :msg='id'
      @changeMessage='changeMessage($event)' />
  </div>
</template>

<script>
// @ is an alias to /src
import Messages from '@/components/Messages.vue'

export default {
  name: 'messages',
  props: {
    id: {
      type: String,
      required: false
    }
  },
  components: {
    Messages
  },
  methods: {
    changeMessage(messageId) {
      console.log('New message Id:' + messageId);
      if (messageId !== undefined && messageId !== this.$route.params.id) { 
        this.$router.push({ name: 'message',  params: { id: messageId } });
      }
    }
  }
}
</script>
