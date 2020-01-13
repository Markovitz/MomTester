<template>
    <div>
        <h4>Attributes</h4>
        <b-table :fields="fields" :items="attributeArray">
            <template v-slot:cell(Name)="data">
                {{ data.item.Name }}
            </template>
            <template v-slot:cell(Value)="data">
                <input :value='data.item.Value'/>
                <b-button-group>
                    <b-button>Modify</b-button>
                    <b-button>Remove</b-button>
                </b-button-group>
            </template>
        </b-table>
        <b-card title="Add New Attribute" header-tag="header" footer-tag="footer">
            <h6 slot="header" class="mb-0">Adding attribute</h6>
                <b-card-text>
                    <b-row class="my-1">
                        <b-col sm="2">
                            <label for="input-small">Name:</label>
                        </b-col>
                        <b-col sm="10">
                            <b-form-input 
                                size="sm"
                                type="text"
                                v-model="name"
                                @input="$v.name.$model = $event.trim()"
                                :state="!$v.name.$dirty ? null : !$v.name.$error"
                                placeholder="Attribute Name" />
                            <b-form-invalid-feedback>
                                <span v-if="!$v.name.required">Field is required, </span>
                                <span v-if="!$v.name.minLength">Min lenght is 3. </span>
                            </b-form-invalid-feedback>
                            <b-form-valid-feedback>
                                <span>Okay. </span>
                            </b-form-valid-feedback>
                        </b-col>
                    </b-row>

                    <b-row class="my-1">
                        <b-col sm="2">
                            <label for="input-small">Nazwisko:</label>
                        </b-col>
                        <b-col sm="10">
                            <b-form-input 
                                size="sm"
                                type="text"
                                v-model="value"
                                @input="$v.value.$model = $event.trim()"
                                :state="!$v.value.$dirty ? null : !$v.value.$error"
                                placeholder="Attribute Value" />
                            <b-form-invalid-feedback>
                                <span v-if="!$v.name.required">Field is required, </span>
                                <span v-if="!$v.name.minLength">Min lenght is 3. </span>
                            </b-form-invalid-feedback>
                            <b-form-valid-feedback>
                                <span>Okay. </span>
                            </b-form-valid-feedback>
                        </b-col>
                    </b-row>
                </b-card-text>
                <div slot="footer">
                    <b-button variant="primary" :disabled="$v.$invalid" @click="add">Add</b-button>
                </div>
        </b-card>
    </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  data() {
      return {
          fields: [{
              key: 'Name',
              sortable: true
          },{
              key: 'Value',
              sortable: true
          }],
          name: '',
          value: ''
      }
  },
  validations: {
    name: {
      required,
      minLength: minLength(3)
    },
    value: {
      required,
      minLength: minLength(1)
    }
  },
  name: 'Attributes',
  props: {
    attributes: {
      type: String,
      required: true
    }
  },
  methods: {
    add() {
        this.$emit('add', {
            name: this.name, 
            value: this.value
            });
    }
  },
  computed: {
      attributeArray: function() {
          let objArray = [];
          if (this.attributes != undefined && this.attributes != null) {
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
          }
          return objArray;
      }
  }
}
</script>

<style scoped>
</style>
