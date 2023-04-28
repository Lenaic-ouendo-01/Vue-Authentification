<script setup>
import { RouterLink, RouterView } from 'vue-router'
import {useRouter} from 'vue-router'
import axios from 'axios';
import { ref } from 'vue';

  let email=ref("")
  let password=ref("")
  let router=useRouter()

  function login(){
    console.log(email.value, password.value)
    axios
    .post("http://127.0.0.1:8000/api/login",{
      "password": password.value,
      "email": email.value
    })
    .then(
      (response) =>{
        console.log(response)
        if(response.status === 200){
          localStorage.setItem('token', response.data.token);
          router.push({path: '/protected-page'});
        }
      }
    )
    .catch(error => console.log(error));
  }


</script>

<template>
  <div class="piper">
    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >

      <div class="text-subtitle-1 text-medium-emphasis">Account</div>

      <v-text-field
        v-model="email"
        density="compact"
        placeholder="Email address"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password

        <RouterLink to="/forgotten-passwords"
          class="text-caption text-decoration-none text-blue"
          rel="noopener noreferrer"
        >
          Forgot login password?
        </RouterLink>
        <RouterView></RouterView>
      </div>

      <v-text-field
        v-model="password"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-card
        class="mb-12"
        color="surface-variant"
        variant="tonal"
      >
        <v-card-text class="text-medium-emphasis text-caption">
          Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password.
        </v-card-text>
      </v-card>

      <v-btn
        block
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
        @click="login"
      >
        Log In
      </v-btn>

      <v-card-text class="text-center">
        <RouterLink to="/signup" 
          class="text-blue text-decoration-none"
          rel="noopener noreferrer"
        >
          Sign up now
        </RouterLink>
      </v-card-text>
    </v-card>
    <RouterView></RouterView>
  </div>
</template>

<style scoped>
  .piper{
    width: 200%;
  }
</style>