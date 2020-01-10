<template>
      <div>
        <b-card>
          <Attributes 
            :attributes='message.packedAttributes1'
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
  components: {
    Attributes,
    Destinations,
    ChildrenMessages
  }
}
</script>

<style scoped>
</style>
