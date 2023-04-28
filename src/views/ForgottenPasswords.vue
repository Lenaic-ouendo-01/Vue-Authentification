<script setup>
import { ref } from 'vue';


    let form= ref(false)
    let email= ref(null)
    let loading= ref(false)

    
    function  onSubmit () {
        if (!form.value){
            loading.value = true
        }
        setTimeout(() => (loading.value = false), 2000)
    }
    function  required (v) {
        return !!v || 'Field is required'
    }
</script>

<template>
  <v-sheet class="bg-blue-grey-darken-4 pa-12"  rounded>
    <v-card class="mx-auto px-6 py-8" max-width="344">
        <v-form
            v-model="form"
            @submit.prevent="onSubmit"
        >
            <v-text-field
            v-model="email"
            :readonly="loading"
            :rules="[required]"
            class="mb-2"
            clearable
            label="Email"
            ></v-text-field>

            <br>

            <v-btn
            :disabled="!form"
            :loading="loading"
            block
            color="success"
            size="large"
            type="submit"
            variant="elevated"
            >
            Send e-Mail
            </v-btn>

            <br>
            
            <h2>Check your mail !</h2>
        </v-form>
    </v-card>
  </v-sheet>
</template>