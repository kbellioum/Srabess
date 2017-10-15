<template>
  <v-app toolbar>
    <v-navigation-drawer temporary v-model="sideNav">
        <v-list>
           <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.link">
             <v-list-tile-action>
               <v-icon>{{ item.icon }}</v-icon>
             </v-list-tile-action>
             <v-list-tile-content>
               <v-list-tile-title>{{ item.title }}</v-list-tile-title>
             </v-list-tile-content>
           </v-list-tile>
           <v-list-tile v-if="userIsAuthenticated" @click="onLogout">
             <v-list-tile-action>
               <v-icon>exit_to_app</v-icon>
             </v-list-tile-action>
             <v-list-tile-content>
               <v-list-tile-title>Logout</v-list-tile-title>
             </v-list-tile-content>
           </v-list-tile>
        </v-list>
    </v-navigation-drawer>
    <v-toolbar dark class="primary" fixed>
      <v-toolbar-side-icon @click.stop="sideNav = !sideNav" class="hidden-sm-and-up"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Srabess</router-link>
        <v-spacer></v-spacer>
        <v-fab-transition>
          <v-btn
          class="red"
          fab
          dark
          small
          absolute
          bottom
          left
          v-if="userIsAuthenticated && userIsAnEmployer"
          to="/employer/new"
          >
            <v-icon>add</v-icon>
          </v-btn>
        </v-fab-transition>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.link ">
          <v-icon left>{{ item.icon }} </v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn flat v-if="userIsAuthenticated" @click="onLogout">
          <v-icon left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
  export default {
    data () {
      return {
        sideNav: false
      }
    },
    computed: {
      menuItems () {
        let menuItems = [
          {icon: 'face', title: 'Sign in', link: '/signin'},
          {icon: 'lock_open', title: 'Sign up', link: '/signup'}
        ]
        if (this.userIsAuthenticated) {
          const id = this.$store.getters.user.id
          const link = '/profile/' + id
          menuItems = [
            // {icon: 'work', title: 'Jobs', link: '/jobs'},
            {icon: 'people', title: 'Employers', link: '/'},
            {icon: 'person', title: 'Profile', link: link}
          ]
        }
        return menuItems
      },
      userIsAuthenticated () {
        return this.$store.getters.user !== null && this.$store.getters.user !== undefined
      },
      userIsAnEmployer () {
        const IsHere = this.$store.getters.loadedEmployersByUserId(this.$store.getters.user.id)
        return !(IsHere !== null && IsHere !== undefined)
      }
    },
    methods: {
      onLogout () {
        this.$router.push('/')
        this.$store.dispatch('logout')
      }
    }
  }
</script>

<style lang="stylus">
  @import './stylus/main'
</style>
