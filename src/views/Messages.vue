<template>
  <div class="messages">
    <Messages 
      :msg='id'
      @changeMessage='changeMessage($event)' />

      <div key="1" v-if="loading" class="d-flex justify-content-center my-5">  
        <b-spinner variant="primary"/>
      </div>
      <div key="2" v-else>
        <b-row :key="message.id" v-for="(message, nodeId) in messages">
          <b-col sm="8" @click="showHide(nodeId)">{{message.id}} &nbsp; {{message.sendDate}} &nbsp; {{message.dict.senderCode}} &nbsp; {{message.dict.eventCode}}
            <b-card v-show="itemToShow.indexOf(nodeId) != -1">
              <Attributes :attributes='message.packedAttributes1'/>
              <Destinations :messageId='message.id' :dict='{
                senderCode: message.dict.senderCode,
                eventCode: message.dict.eventCode
              }'/>
            </b-card>
          </b-col>
        </b-row>
      </div>
    </div>
</template>

<script>
// @ is an alias to /src
import Messages from '@/components/Messages.vue'
import Attributes from '@/components/Attributes.vue'
import Destinations from '@/components/Destinations.vue'
import axios from 'axios';

export default {
  data() {
    return {
      loading: true,
      fields: ['id', 'sendDate', 'packedAttributes1'],
      messages: [],
      attributes: [],
      itemToShow: []
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
    Messages,
    Attributes,
    Destinations
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
        let {data} = await axios.post("http://localhost:8888/mom/messages", attributes, axiosConfig);
        this.messages = data;
      }catch(err){
        console.log(err);
      }
    },
    //if (messageId !== undefined && messageId !== this.$route.params.id) { 
    //  this.$router.push({ name: 'message',  params: { id: messageId } });
    //}
    showAttributes: function(attributes) {
      return attributes.split(';');
    },
    showHide: function(nodeId) {
      let idx = this.itemToShow.indexOf(nodeId);
      if (idx != -1) {
        this.itemToShow.splice(idx, 1);
      } else {
        this.itemToShow.push(nodeId);
      }
    }
  },
  async created(){
    try{
      let {data} = await this.axios("http://localhost:8888/mom/messages/10");
      this.messages = data;
      console.log(this.messages);
      this.loading = false;
    }catch(err){
      console.log('created error', err);
    }
  }
}
</script>
