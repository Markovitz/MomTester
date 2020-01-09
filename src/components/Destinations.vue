<template>
    <div>
        <h4>Destinations</h4>
        <b-table :fields="fields" :items="destinations"/>                
    </div>
</template>

<script>

export default {
  data() {
      return {
          destinations: [],
          fields: [{
              key: 'destinationCode',
              sortable: true
          },{
              key: 'statusAsString',
              sortable: true
          }]
      }
  },
  name: 'Destinations',
  props: {
    messageId: {
      type: Number,
      required: true
    },
    dict: {
        type: Object,
        required: true
    }
  },
  async created() {
    try{
      let {data} = await this.axios.post("http://localhost:8888/mom/messages/"+this.messageId+"/destinations", this.dict)
      this.destinations = data;
      console.log(data);
    }catch(err){
      console.log('loadDestinations', err);
    }
  }
}
</script>

<style scoped>
</style>
