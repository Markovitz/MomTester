<template>
    <b-container>
      <div>
        <b-button v-b-toggle.search-panel variant="primary">Search Panel</b-button>
        <b-collapse id="search-panel" class="mt-2">
        <b-card-group deck>
          <b-card title="Find Messages on MOM" header-tag="header" footer-tag="footer">
            <template v-slot:header>
              <h6 class="mb-0"></h6>
            </template>
            <b-card-text>
              <b-row class="my-1">
                <b-col sm="2">
                  <label for="input-small" >Message ID:</label>
                </b-col>
                <b-col sm="10">
                  <b-form-input id="input-small" size="sm" placeholder="Message ID" v-model='messageId'></b-form-input>
                </b-col>
              </b-row>

              <b-row class="my-1">
                <b-col sm="2">
                  <label for="input-small" >Sender Code:</label>
                </b-col>
                <b-col sm="10">
                  <b-form-input id="input-small" size="sm" placeholder="Sender Code" v-model='senderCode'></b-form-input>
                </b-col>
              </b-row>

              <b-row class="my-1">
                <b-col sm="2">
                  <label for="input-small" >Event Code:</label>
                </b-col>
                <b-col sm="10">
                  <b-form-input id="input-small" size="sm" placeholder="Event Code" v-model='eventCode'></b-form-input>
                </b-col>
              </b-row>


              <b-row class="my-1">
                <b-col sm="2">
                  <label for="input-small" >Attributes:</label>
                </b-col>
                <b-col sm="10">
                  <b-form-input id="input-small" size="sm" placeholder="Attributes" v-model='attributes'></b-form-input>
                </b-col>
              </b-row>

              
              <b-row class="my-1">
                <b-col sm="2">
                  <label for="input-small" >Destination:</label>
                </b-col>
                <b-col sm="10">
                  <b-form-input id="input-small" size="sm" placeholder="Destination" v-model='destination'></b-form-input>
                </b-col>
              </b-row>

            </b-card-text>
            <template v-slot:footer>
              <div>
                <b-button href="#" variant="primary" :disabled="!canShowMessage" @click="showMessage">Show Messages</b-button>
              </div>
            </template>
          </b-card>
        </b-card-group>
        </b-collapse>
      </div>
    </b-container>
</template>

<script>
export default {
  data() {
    return {
         messageId: 0,
        senderCode: '',
         eventCode: '',
        attributes: [],
      destinations: []
    }
  },
  name: 'MessagesSearch',
  methods: {
    showMessage() {
      this.$emit('changeMessage', {
        senderCode: this.senderCode,
         eventCode: this.eventCode
      });
    }
  },
  computed: {
    canShowMessage: function() {
      return this.senderCode.trim().length >= 3 && this.eventCode.trim().length >= 3;
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
