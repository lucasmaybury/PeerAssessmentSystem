<template>
  <b-navbar toggleable="lg" variant="info">
    <b-nav-item-brand>
      <router-link to="/">PAS - Peer Assessment System</router-link>
    </b-nav-item-brand>

    <b-navbar-nav>
      <b-nav-item>
        <router-link to="/user">Users</router-link>
      </b-nav-item>
      <b-nav-item>
        <router-link to="/user/new">Add New Student</router-link>
      </b-nav-item>
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import '../assets/styles/global.css';

export default {
    name: 'Header'
}

</script>