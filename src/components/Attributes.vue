<template>
    <div>
        <h4>Attributes</h4>
        <b-table :fields="fields" :items="attributeArray"/>                
    </div>
</template>

<script>
export default {
  data() {
      return {
          fields: [{
              key: 'Name',
              sortable: true
          },{
              key: 'Value',
              sortable: true
          }]
      }
  },
  name: 'Attributes',
  props: {
    attributes: {
      type: Object,
      required: true
    }
  },
  computed: {
      attributeArray: function() {
          let objArray = [];
          let data = this.attributes.split(';');
          for(var i = 0; i < data.length; i++) {
              if (data[i].indexOf("=") !== -1) {
                var kvp = data[i].split("=");
                if(kvp[1]){
                    let obj = {};
                    obj['Name'] = kvp[0];
                    obj['Value'] = kvp[1];
                    objArray.push(obj);
                }
              }
          }
          return objArray;
      }
  }
}
</script>

<style scoped>
</style>
