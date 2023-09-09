<template>
   <v-layout>
         <v-app-bar color="primary" v-if="renderizarMenu">
          <v-app-bar-title>WorkoutVue</v-app-bar-title>
          <RouterLink to="/home">
             <v-btn icon="mdi-home"></v-btn>
          </RouterLink>
          <RouterLink to="/students">
             <v-btn icon="mdi-account-multiple"></v-btn>
          </RouterLink>
          <RouterLink to="/exercises">
             <v-btn icon="mdi-weight-lifter"></v-btn>
          </RouterLink>
        <RouterLink to="/">
            <v-btn icon="mdi-logout-variant"></v-btn>
        </RouterLink>
       </v-app-bar>
       <v-main>
          <router-view></router-view>
       </v-main>
      </v-layout>
 </template>
 <script>
 export default {
    computed: {
       renderizarMenu() {
          return this.$route.path !== '/' && this.$route.path !== '/new/user'
       }
    }
 }
 </script>
 