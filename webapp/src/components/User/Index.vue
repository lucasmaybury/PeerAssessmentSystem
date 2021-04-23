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
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.first_name }}</td>
            <td>{{ user.last_name }}</td>
            <td>{{ user.role }}</td>
            <td>
              <b-link :to="`/user/${user.id}/view`">
                <b-icon icon="file-text" variant="dark" />
              </b-link>

              <b-link :to="`/user/${user.id}/edit`">
                <b-icon icon="pencil-square" variant="dark" />
              </b-link>

              <b-icon icon="trash" @click="deleteUser(user)" variant="dark" />
            </td>
          </tr>
        </tbody>
      </table>
    </b-row>
  </b-container>
</template>

<script>
import { getUsers } from '../../services/UserService';

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
    deleteUser(user) {
      confirm(
        `Are you sure you want to delete ${user.firstName} ${user.lastName}?`
      );
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>
