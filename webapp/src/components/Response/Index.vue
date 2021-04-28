<template>
  <b-container>
    <b-modal ref="modal" id="modalDelete" title="Delete Response?">
      <p>
        Are you sure you want to delete {{ responseToDelete.firstName }}
        {{ responseToDelete.lastName }}?
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
      <h3>Responses</h3>
      <b-button to="/response/new" class="ml-auto">Add New</b-button>
    </b-row>

    <b-row class="m-1">
      <b-table :items="responses" :fields="fields" bordered small hover>
        <template #cell(users)="response">
          {{
            response.item.users
              .map(user => `${user.firstName} ${user.lastName}`)
              .join(', ') || 'Empty'
          }}
        </template>
        <template #cell(actions)="response">
          <b-link :to="`/response/${response.item.id}/view`">
            <b-icon icon="file-text" variant="dark" />
          </b-link>

          <b-link :to="`/response/${response.item.id}/edit`">
            <b-icon icon="pencil-square" variant="dark" />
          </b-link>

          <b-icon
            icon="trash"
            @click="showDeleteModal(response.item)"
            variant="dark"
          />
        </template>
      </b-table>
    </b-row>
  </b-container>
</template>

<script>
import { getAll, deleteRecord } from '../../services/ResponseService';

export default {
  name: 'Responses',
  data: () => {
    return {
      responses: [],
      fields: [
        { key: 'name', label: 'Name' },
        { key: 'users', label: 'Members' },
        { key: 'grade', label: 'Grade' },
        { key: 'actions', label: '' },
      ],
      responseToDelete: {},
    };
  },
  methods: {
    fetchResponses() {
      getAll().then(response => {
        this.responses = response;
      });
    },
    showDeleteModal(response) {
      this.responseToDelete = response;
      this.$bvModal.show('modalDelete');
    },
    async confirmDelete() {
      deleteRecord(this.responseToDelete)
        .then(() => {
          this.$bvModal.hide('modalDelete');
          this.fetchResponses();
        })
        .catch(err => alert(err.message));
    },
  },
  mounted() {
    this.fetchResponses();
  },
};
</script>
