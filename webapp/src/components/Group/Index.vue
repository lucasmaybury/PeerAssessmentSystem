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
      <b-table :items="groups" :fields="fields" bordered small hover>
        <template #cell(users)="group">
          {{
            group.item.users
              .map(user => `${user.firstName} ${user.lastName}`)
              .join(', ') || 'Empty'
          }}
        </template>
        <template #cell(actions)="group">
          <b-link :to="`/group/${group.item.id}/view`">
            <b-icon icon="file-text" variant="dark" />
          </b-link>

          <b-link :to="`/group/${group.item.id}/edit`">
            <b-icon icon="pencil-square" variant="dark" />
          </b-link>

          <b-icon
            icon="trash"
            @click="showDeleteModal(group.item)"
            variant="dark"
          />
        </template>
      </b-table>
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
      fields: [
        { key: 'name', label: 'Name' },
        { key: 'users', label: 'Members' },
        { key: 'grade', label: 'Grade' },
        { key: 'actions', label: '' },
      ],
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
