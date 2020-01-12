<template>
    <div>
        <h4>ChildMessages</h4>
        <b-table :fields="fields" :items="messages"/>                
    </div>
</template>

<script>

export default {
  data() {
      return {
          messages: [],
          fields: [{
              key: 'id',
              sortable: true
          }]
      }
  },
  name: 'Destinations',
  props: {
    messageId: {
      type: Number,
      required: true
    }
  },
  watch: {
      messageId: function(newValue, oldValue) {
          console.log('Prop changed: '+newValue+', was '+oldValue);
          this.loadChildren();
      }
  },
  methods: {
    async loadChildren() {
      try{
        let {data} = await this.axios("/mom/messages/"+this.messageId+"/children")
        this.messages = data;
        console.log(data);
      }catch(err){
        console.log('', err);
      }
    }
  },
  created() {
    this.loadChildren();
  }
}
</script>

<style scoped>
</style>
