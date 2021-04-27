<template>
  <b-container>
    <b-modal ref="modal" id="modalDelete" title="Delete Group?">
      <p>
        Are you sure you want to delete {{ groupToDelete.firstName }}
        {{ groupToDelete.lastName }}?
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
      <h3>Groups</h3>
      <b-button to="/group/new" class="ml-auto">Add New</b-button>
    </b-row>

    <b-row class="m-1">
      <table class="table table-bordered">
        <thead>
          <tr>
            <th>Group Name</th>
            <th>Members</th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="group in groups" :key="group.id">
            <td>{{ group.name }}</td>
            <td>{{ group.members }}</td>
            <td>{{ group.grade }}</td>
            <td>
              <b-link :to="`/group/${group.id}/view`">
                <b-icon icon="file-text" variant="dark" />
              </b-link>

              <b-link :to="`/group/${group.id}/edit`">
                <b-icon icon="pencil-square" variant="dark" />
              </b-link>

              <b-icon
                icon="trash"
                @click="showDeleteModal(group)"
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
import { getAll, deleteRecord } from '../../services/GroupService';

export default {
  name: 'Groups',
  data: () => {
    return {
      groups: [],
      groupToDelete: {},
    };
  },
  methods: {
    fetchGroups() {
      getAll().then(response => {
        this.groups = response;
      });
    },
    showDeleteModal(group) {
      this.groupToDelete = group;
      this.$bvModal.show('modalDelete');
    },
    async confirmDelete() {
      deleteRecord(this.groupToDelete)
        .then(() => {
          this.$bvModal.hide('modalDelete');
          this.fetchGroups();
        })
        .catch(err => alert(err.message));
    },
  },
  mounted() {
    this.fetchGroups();
  },
};
</script>
