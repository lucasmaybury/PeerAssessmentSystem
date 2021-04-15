<template>
  <b-navbar toggleable="lg" variant="info">
    <b-nav-item-brand>
      <b-button to="/">PAS - Peer Assessment System</b-button>
    </b-nav-item-brand>

    <b-navbar-toggle target="nav-collapse" />
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item>
          <b-link to="/user" router-tag="li">Users</b-link>
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import '../assets/styles/global.css';

export default {
  name: 'Header',
};
</script>
