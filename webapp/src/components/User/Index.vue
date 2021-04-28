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
      <b-table :items="users" :fields="fields" bordered>
        <template #cell(actions)="data">
          <b-link :to="`/user/${data.item.id}/view`">
            <b-icon icon="file-text" variant="dark" />
          </b-link>

          <b-link :to="`/user/${data.item.id}/edit`">
            <b-icon icon="pencil-square" variant="dark" />
          </b-link>

          <b-icon
            icon="trash"
            @click="showDeleteModal(data.item)"
            variant="dark"
          />
        </template>
      </b-table>
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
      fields: [
        { key: 'id', label: 'Username' },
        { key: 'firstName' },
        { key: 'lastName' },
        { key: 'actions', label: '' },
      ],
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
