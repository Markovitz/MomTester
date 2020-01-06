<template>
  <div class="messages">
    <Messages :msg='id'/>
  </div>
</template>

<script>
// @ is an alias to /src
import Messages from '@/components/Messages.vue'

export default {
  name: 'messages',
  props: {
    id: {
      type: String
    }
  },
  components: {
    Messages
  }
}
</script>
