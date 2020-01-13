<template>
  <div class="padding">
    <div class="white-card">
      <h1>Login</h1>
      <b-row>
        <b-col sm="6" offset-sm="3">
          <b-form @submit="onSubmit" @reset="onReset">
            <b-form-group
                    label="Email:"
                    label-for="email"
            >
              <b-form-input
                      id="email"
                      type="email"
                      v-model="email"
                      @input="$v.email.$model = $event.trim()"
                      :state="!$v.email.$dirty ? null : !$v.email.$error"
                      required
                      placeholder="Email address" />
              <b-form-invalid-feedback>
                <span v-if="!$v.email.required">This field is required. </span>
                <span v-if="!$v.email.email">Email is not valid. </span>
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
  import { required, minLength, email } from 'vuelidate/lib/validators'
  
  export default {
    data(){
      return {
        email: '',
        password: ''
      }
    },
    validations: {
      email: {
        required,
        email
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
          email: this.email,
          password: this.password,
          returnSecureToken: true
        });
        this.$router.push({name: 'messages'});
      },
      onReset(event){
        event.preventDefault();
        this.email = '';
        this.password = '';
        this.$v.$reset();
      }
    }
  };
</script>