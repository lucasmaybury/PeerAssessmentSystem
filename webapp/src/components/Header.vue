<template>
  <b-navbar toggleable="lg" variant="info">
    <b-navbar-brand>
      <b-button to="/">PAS - Peer Assessment System</b-button>
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse" />
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item>
          <b-link to="/user" router-tag="li">Students</b-link>
        </b-nav-item>
        <b-nav-item>
          <b-link to="/group" router-tag="li">Groups</b-link>
        </b-nav-item>
        <b-nav-item>
          <b-link to="/assessment" router-tag="li">Assessments</b-link>
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item>
          <b-link to="/login">
            <b-button>Assess Your Team</b-button>
          </b-link>
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
