<template>
  <b-container>
    <b-row class="m-1">
      <h3>Users</h3>
      <b-button to="/user/new" class="ml-auto">Add New</b-button>
    </b-row>

    <b-row class="m-1">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Username</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in users" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.first_name }}</td>
            <td>{{ item.last_name }}</td>
            <td>{{ item.role }}</td>
            <td>
              <fa icon="file-alt" class="mr-2" />
              <fa icon="edit" class="mr-2" />
              <fa icon="trash-alt" class="mr-2" />
            </td>
          </tr>
        </tbody>
      </table>
    </b-row>
  </b-container>
</template>

<script>
import { getUsers } from '../services/UserService';

export default {
  name: 'Users',
  data: () => {
    return {
      users: [],
    };
  },
  methods: {
    getUsers() {
      getUsers().then(response => {
        this.users = response;
      });
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>
