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
  methods: {
    loadDestinations() {
        this.axios.post("/mom/messages/"+this.messageId+"/destinations", this.dict)
        .then(response => {
            this.destinations = response.data;
        }).catch(err => {
            console.log('loadDestinations', err);
        });
    }
  },
  watch: {
      messageId: function(newValue, oldValue) {
          console.log('Prop changed: '+newValue+', was '+oldValue);
          this.loadDestinations();
      }
  },
  created: function() {
      this.loadDestinations();
  }
}
</script>

<style scoped>
</style>
