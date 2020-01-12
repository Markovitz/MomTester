<template>
  <div class="messages">
      <TheMessagesSearch @changeMessage='changeMessage($event)'/>

      <div class="top-margin">
        <div key="1" v-if="loading" class="d-flex justify-content-center my-5">  
          <b-spinner variant="primary"/>
        </div>
        <div key="2" v-else>
          <div class="row">
            <div class="col s3">
                <table>
                  <thead>
                    <tr>
                      <th>Messages</th>
                    </tr>
                  </thead>
                <tbody>
                          <tr :key="msg.id" v-for="msg in messages">
                            <td><span>{{msg.dict.senderCode}}</span></td>
                            <td><span>{{msg.dict.eventCode}}</span></td>
                            <td>
                            <a href="#!" @click="loadMessage(msg)" class="secondary-content">
                              <i class="material-icons">{{msg.id}}</i>
                            </a>
                            </td>
                            <td><span class="new badge blue" data-badge-caption="child">1</span></td>
                          </tr>
                </tbody>
                </table>
            </div>
            <div class="col s9">
               <Message :message='message' v-if="active"/>
            </div>  
          </div>
        </div>

      </div>
    </div>
</template>

<script>
// @ is an alias to /src
import TheMessagesSearch from '@/components/TheMessagesSearch.vue'
import Message from '@/components/Message.vue'
import axios from 'axios';

export default {
  data() {
    return {
      loading: true,
      active: false,
      fields: ['id', 'sendDate', 'packedAttributes1'],
      messages: [],
      message: {}
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
    TheMessagesSearch,
    Message
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
        let {data} = await axios.post("/mom/messages", attributes, axiosConfig);
        this.messages = data;
      }catch(err){
        console.log(err);
      }
    },
    loadMessage: function(msg) {
      this.message = msg;
      this.active = true;
    }
  },
  async created(){
    try{
      let {data} = await this.axios("/mom/messages/10");
      this.messages = data;
      console.log(this.messages);
      this.loading = false;
    }catch(err){
      console.log('created error', err);
    }
  }
}
</script>

<style scoped>
  .top-margin {
    margin-top: 50px;
  }
</style>
