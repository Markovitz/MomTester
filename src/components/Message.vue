<template>
      <div>
        <b-card>
          <Attributes 
            :attributes='message.packedAttributes1'
            @add="add($event)"
          />
          </b-card>
          <b-card>
            <Destinations 
              :messageId='message.id' 
              :dict='{
                senderCode: message.dict.senderCode,
                eventCode: message.dict.eventCode
              }'
            />                  
          </b-card>
          <b-card>
            <ChildrenMessages 
              :messageId='message.id' 
            />
          </b-card>
      </div>
</template>

<script>

import Attributes from '@/components/Attributes.vue'
import Destinations from '@/components/Destinations.vue'
import ChildrenMessages from '@/components/ChildrenMessages.vue'
import axios from 'axios';

export default {
  data() {
    return {
    }
  },
  name: 'Message',
  props: {
    message: {
      type: Object,
      required: true
    }
  },
  methods: {
    async add(attributeData) {
      try{
        let response =  await axios.post(`/mom/messages/${this.message.id}/attribute/add`, attributeData);
        this.$set(this.message, 'packedAttributes1', '['+response.data+']');
        console.log('add new attribute', response);
      }catch(err){
        console.log('add new attribute', err);
      }
    }
  },
  components: {
    Attributes,
    Destinations,
    ChildrenMessages
  }
}
</script>

<style scoped>
</style>
