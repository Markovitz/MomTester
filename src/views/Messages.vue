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
import axios from 'axios';

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
    async changeMessage(attributes) {
      console.log('Sender Code:' + attributes.senderCode);
      console.log('Event Code:' + attributes.eventCode);

      let axiosConfig = {
        headers: {
          'Content-Type' : 'application/json'
        }
      }
      try {
        let response = await axios.post("http://localhost:8888/mom/messages", attributes, axiosConfig);
        console.log(response);
      }catch(err){
        console.log(err);
      }
    }
    //if (messageId !== undefined && messageId !== this.$route.params.id) { 
    //  this.$router.push({ name: 'message',  params: { id: messageId } });
    //}
  }
}
</script>
