<template>
    <b-container>
      <div>
        <b-card-group deck>
          <b-card title="Patient-Order" header-tag="header" footer-tag="footer">
            <template v-slot:header>
              <h6 class="mb-0"></h6>
            </template>
            <b-card-text>
              <b-row class="my-1">
                <b-col sm="2">
                  <label for="input-small" >Order#:</label>
                </b-col>
                <b-col sm="10">
                  <b-form-input id="input-small" size="sm" placeholder="Order Number" v-model='messageId'></b-form-input>
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
      </div>
    </b-container>
</template>

<script>
export default {
  data() {
    return {
      messageId: this.msg
    }
  },
  name: 'Messages',
  props: {
    msg: {
      type: String,
      required: false
    }
  },
  methods: {
    showMessage() {
      this.$emit('changeMessage', this.messageId);
    }
  },
  computed: {
    canShowMessage: function() {
      return this.messageId !== undefined && this.messageId.trim().length >= 3;
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
