<template>
  <div>
    <div class="container mrgnbtm">
      <div class="row">
        <div class="col-md-8">
          <CreateUser @createUser="userCreate($event)" />
        </div>
        <div class="col-md-4">
          <DisplayBoard @getUsers="getUsers()" />
        </div>
      </div>
    </div>
    <div class="row mrgnbtm">
      <Users v-if="users.length > 0" :users="users" />
    </div>
  </div>
</template>

<script>
import CreateUser from './CreateUser.vue';
import DisplayBoard from './DisplayBoard.vue';
import Users from './Users.vue';
import {
  getUsers,
  //getUserByUsername,
  //createUser,
} from '../services/UserService';

export default {
  name: 'Dashboard',
  components: {
    CreateUser,
    DisplayBoard,
    Users,
  },
  data() {
    return {
      users: [],
    };
  },
  methods: {
    getUsers() {
      getUsers().then(response => {
        console.log(response);
        this.users = response;
        this.numberOfUsers = this.users.length;
      });
    },
  },
  mounted() {
    this.getAllUsers();
  },
};
</script>
