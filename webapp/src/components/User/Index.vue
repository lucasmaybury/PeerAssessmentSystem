<template>
  <b-container>
    <b-modal ref="modal" id="modalDelete" title="Delete Student?">
      <p>
        Are you sure you want to delete {{ userToDelete.firstName }}
        {{ userToDelete.lastName }}?
      </p>
      <div slot="modal-footer">
        <b-button variant="danger" @click="confirmDelete()" class="mr-2">
          Confirm
        </b-button>
        <b-button variant="secondary" @click="$bvModal.hide('modalDelete')">
          Cancel
        </b-button>
      </div>
    </b-modal>

    <b-row class="m-1">
      <h3>Students</h3>
      <b-button to="/user/new" class="ml-auto">Add New</b-button>
    </b-row>

    <b-row class="m-1">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Username</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td>{{ user.role }}</td>
            <td>
              <b-link :to="`/user/${user.id}/view`">
                <b-icon icon="file-text" variant="dark" />
              </b-link>

              <b-link :to="`/user/${user.id}/edit`">
                <b-icon icon="pencil-square" variant="dark" />
              </b-link>

              <b-icon
                icon="trash"
                @click="showDeleteModal(user)"
                variant="dark"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </b-row>
  </b-container>
</template>

<script>
import { getAll, deleteRecord } from '../../services/UserService';

export default {
  name: 'Users',
  data: () => {
    return {
      users: [],
      userToDelete: {},
    };
  },
  methods: {
    fetchUsers() {
      getAll().then(response => {
        this.users = response;
      });
    },
    showDeleteModal(user) {
      this.userToDelete = user;
      this.$bvModal.show('modalDelete');
    },
    async confirmDelete() {
      deleteRecord(this.userToDelete)
        .then(() => {
          this.$bvModal.hide('modalDelete');
          this.fetchUsers();
        })
        .catch(err => alert(err.message));
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>
