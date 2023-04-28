<script setup>
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
  let drawer= ref(true)
  let items= ref([
    { title: 'Home', icon: 'mdi-home-city' },
    { title: 'My Account', icon: 'mdi-account' },
    { title: 'Users', icon: 'mdi-account-group-outline' },
  ])
  let rail=ref(true)
  let router=useRouter()
  let infoUser =ref({})
  let isLoading = ref(true)

  const config = {
  headers:{
    Authorization: 'Bearer ' + localStorage.getItem('token'),    
  }
};
const url = "http://127.0.0.1:8000/api/me";
onMounted(() => {
  axios.get(url, config)
  .then(res=> {
    console.log(res)
    if(res.status === 200){
      isLoading.value = false;
      infoUser.value = res.data;
    }
})
  .catch(err=> {
    console.log(err)
    router.push({path: '/'});
  })
})
</script>

<template>
  <v-skeleton-loader
    class="mx-auto border"
    max-width="300"
    type="card-avatar, actions"
    v-if="isLoading"
  >Loading...</v-skeleton-loader>
  
  <v-card v-else>
    <v-layout>
      <v-navigation-drawer
        v-model="drawer"
        image="https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        :rail="rail"
        permanent
        @click="rail = false"
      >
        <v-list-item
          prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
          :title="infoUser.name"
          nav
        >
          <template v-slot:append>
            <v-btn
              variant="text"
              icon="mdi-chevron-left"
              @click.stop="rail = !rail"
            ></v-btn>
          </template>
        </v-list-item>

        <v-divider></v-divider>

        <v-list density="compact" nav>
          <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <h1>Welcom {{infoUser.name}} . Today is a new day 😎. So enjoy ❤️.</h1>
    </v-layout>
  </v-card>

</template>

<style scoped>

</style>
