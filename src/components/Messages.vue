<template>
  <div class="card" style="width: 48rem;">
    <div class="card-body">
        <div class="form-group row">
          <label for="messageId" class="col-sm-2 col-form-label">Message Id:</label>
          <div class="col-sm-10">
            <input type="number" class="form-control" id="messageId" placeholder="Message Id" v-model='messageId'>
          </div>
        </div>
        <div class="form-group row">
          <div class="col-sm-10">
            <button type="button" class="btn btn-primary" @click="showMessage">Show Message</button>
          </div>
        </div>
    </div>
    Message ID: {{messageId}}
  </div>
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
      type: String
    }
  },
  watch: {
    '$route'(to, from) {
      console.log(from.params.id + '=>' + to.params.id);
    }
  },
  methods: {
    showMessage() {
      this.$router.replace({
        name: 'message',
        params: {
          id: this.messageId
        }
      });
    }
  }
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
