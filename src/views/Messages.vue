<template>
  <div class="messages">
    <Messages 
      :msg='id'
      @changeMessage='changeMessage($event)' />

      <div key="1" v-if="loading" class="d-flex justify-content-center my-5">  
        <b-spinner variant="primary"/>
      </div>
      <div key="2" v-else>
        <b-table :items="messages" :fields="fields" :tbody-tr-class="rowClass"></b-table>
      </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Messages from '@/components/Messages.vue'
import axios from 'axios';

export default {
  data() {
    return {
      loading: true,
      fields: ['id', 'date'],
      messages: []
    }
  },
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
  },
  async created(){
    try{
      //let {data} = await this.axios('');
      this.messages.push({ id: '123', date: 'date1'});
      this.messages.push({ id: '456', date: 'date2'});
      this.loading = false;
    }catch(err){
      console.log('created error', err);
    }
  }
}
</script>
