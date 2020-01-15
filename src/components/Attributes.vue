<template>
    <div>
        <h4>Attributes</h4>
        <b-table :fields="fields" :items="attributeArray">
            <template v-slot:cell(Name)="data">            
                {{ data.item.Name }}
            </template>
            <template v-slot:cell(Value)="data">
                <div v-if="itemsToSave[data.index] == undefined">
                    {{ data.item.Value }}
                </div>
                <div v-else>
                    <b-form-input
                        size="sm"
                        type="text"
                        v-model.trim="newValues[data.index]"
                        @input="$v.newValues.$each[data.index].$model = $event.trim()"
                        :state="!$v.newValues.$each[data.index].$dirty ? null : !$v.newValues.$each[data.index].$error"
                        />
                        <b-form-invalid-feedback>
                            <span v-if="!$v.newValues.$each[data.index].minLength">Min length is 1. </span>
                            <span v-if="!$v.newValues.$each[data.index].diffrentThanOldValue">New value must be diffrent. </span>
                        </b-form-invalid-feedback>
                        <b-form-valid-feedback>
                            <span>Okay. </span>
                        </b-form-valid-feedback>
                </div>
            </template>
            <template v-slot:cell()="data">
                <span class="new badge blue" data-badge-caption="" @click="addItemToSave(data.index, data.item)">Edit</span>
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
          },{
              key: 'Action',
              sortable: false
          }],
          name: '',
          value: '',
          oldValues: [],
          newValues: [],
          itemsToSave: []
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
    },
    newValues: {
        $each: {
            minLength: minLength(1),
            diffrentThanOldValue: function(val, elem){
                let idx = null;
                for(var i = 0; i < elem.length; i++) {
                    if (elem[i] == val) {
                        idx = i;
                        break;
                    }
                }
                return (val !== this.oldValues[idx]);
            }
        }      
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
    },
    addItemToSave(item, payload) {
        if (this.itemsToSave[item] == undefined) {
            this.$set(this.itemsToSave, item, payload)
            this.$set(this.oldValues, item, payload.Value)
            this.$set(this.newValues, item, payload.Value)
        } else {
            this.itemsToSave.splice(item, 1);
            this.oldValues.splice(item, 1);
            this.newValues.splice(item, 1);
        }
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
