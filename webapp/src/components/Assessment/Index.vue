<template>
  <b-container>
    <b-modal ref="modal" id="modalDelete" title="Delete Assessment?">
      <p>
        Are you sure you want to delete {{ assessmentToDelete.firstName }}
        {{ assessmentToDelete.lastName }}?
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
      <h3>Assessments</h3>
      <b-button to="/assessment/new" class="ml-auto">Add New</b-button>
    </b-row>

    <b-row class="m-1">
      <b-table :items="assessments" :fields="fields" bordered>
        <template #cell(groups)="data">
          {{ data.item.groups.map(group => group.name).join(', ') }}
        </template>
        <template #cell(actions)="data">
          <b-link :to="`/assessment/${data.item.id}/view`">
            <b-icon icon="file-text" variant="dark" />
          </b-link>

          <b-link :to="`/assessment/${data.item.id}/edit`">
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
import { getAll, deleteRecord } from '../../services/AssessmentService';

export default {
  name: 'Assessments',
  data: () => {
    return {
      assessments: [],
      fields: [
        { key: 'name', label: 'Assessments' },
        { key: 'groups', label: 'Groups' },
        { key: 'actions', label: '' },
      ],
      assessmentToDelete: {},
    };
  },
  methods: {
    fetchAssessments() {
      getAll().then(response => {
        this.assessments = response;
      });
    },
    showDeleteModal(assessment) {
      this.assessmentToDelete = assessment;
      this.$bvModal.show('modalDelete');
    },
    async confirmDelete() {
      deleteRecord(this.assessmentToDelete)
        .then(() => {
          this.$bvModal.hide('modalDelete');
          this.fetchAssessments();
        })
        .catch(err => alert(err.message));
    },
  },
  mounted() {
    this.fetchAssessments();
  },
};
</script>
