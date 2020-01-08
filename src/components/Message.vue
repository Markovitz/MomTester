<template>
      <div>
          One Message
      </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  name: 'Message',
  props: {
    msg: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
</style>
