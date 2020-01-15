<template>
  <div class="padding">
    <div class="white-card">
      <h1>Login</h1>
      <b-row>
        <b-col sm="6" offset-sm="3">
          <b-form @submit="onSubmit" @reset="onReset">
            <b-form-group
                    label="Username:"
                    label-for="username"
            >
              <b-form-input
                      id="username"
                      type="text"
                      v-model="username"
                      @input="$v.username.$model = $event.trim()"
                      :state="!$v.username.$dirty ? null : !$v.username.$error"
                      required
                      placeholder="User Name" />
              <b-form-invalid-feedback>
                <span v-if="!$v.username.required">This field is required. </span>
                <span v-if="!$v.username.minLength">The username length must have 3 characters. </span>
              </b-form-invalid-feedback>
              <b-form-valid-feedback>
                <span>Okay. </span>
              </b-form-valid-feedback>
            </b-form-group>
            <b-form-group
                    label="Hasło:"
                    label-for="password"
            >
              <b-form-input
                      id="password"
                      type="password"
                      v-model="password"
                      @input="$v.password.$model = $event.trim()"
                      :state="!$v.password.$dirty ? null : !$v.password.$error"
                      required
                      placeholder="Password" />

              <b-form-invalid-feedback>
                <span v-if="!$v.password.required">This field is required. </span>
                <span v-if="!$v.password.minLength">The password length must have 8 characters. </span>
              </b-form-invalid-feedback>
              <b-form-valid-feedback>
                <span>Okay. </span>
              </b-form-valid-feedback>
            </b-form-group>

            <b-button type="submit" variant="primary" :disabled="$v.$invalid">Login</b-button> &nbsp;
            <b-button type="reset" variant="danger">Reset</b-button>
          </b-form>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
  import { required, minLength } from 'vuelidate/lib/validators'
  
  export default {
    data(){
      return {
        username: '',
        password: ''
      }
    },
    validations: {
      username: {
        required,
        minLength: minLength(3)
      },
      password: {
        required,
        minLength: minLength(8)
      }
    },
    methods: {
      async onSubmit(event){
        event.preventDefault();
        await this.$store.dispatch('login', {
          username: this.username,
          password: this.password,
          returnSecureToken: true
        });
        this.$router.push({name: 'messages'});
      },
      onReset(event){
        event.preventDefault();
        this.username = '';
        this.password = '';
        this.$v.$reset();
      }
    }
  };
</script>