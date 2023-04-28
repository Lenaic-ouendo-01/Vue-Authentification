<script setup>
import { ref } from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router'
import { RouterLink, routerKey } from 'vue-router';

defineProps({
  msg: {
    type: String,
    required: true
  }
})
  let name=ref("")
  let email=ref("")
  let password=ref("")
  let router=useRouter()

  function onSubmit(){
    console.log(name.value, email.value, password.value)
    axios
    .post("http://127.0.0.1:8000/api/register",{
      "name":  name.value,
      "password": password.value,
      "email": email.value
    })
    .then(
      (response) =>{
        console.log(response)
        if(response.status === 200 || response.status === 201){
          router.push({path: '/'});
        }
      }
    )
    .catch(error => console.log(error));
  }

</script>

<template>
  <v-card
    class="mx-auto"
    max-width="344"
    title="Create Account"
  >
    <v-container>
      <v-text-field
        v-model="name"
        color="primary"
        label="First name"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="email"
        color="primary"
        label="Email"
        variant="underlined"
      ></v-text-field>

      <v-text-field
        v-model="password"
        color="primary"
        label="Password"
        placeholder="Enter your password"
        variant="underlined"
      ></v-text-field>
  
      <v-checkbox
        v-model="terms"
        color="secondary"
        label="I agree to site terms and conditions"
      ></v-checkbox>
    </v-container>

    <v-btn
      block
      class="mb-8"
      color="green"
      size="large"
      variant=""
      @click="onSubmit"
    >
      Submit
    </v-btn>
  </v-card>
</template>

<style scoped>
</style>
