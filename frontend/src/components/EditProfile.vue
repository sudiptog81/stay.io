<template>
  <b-container>
    <b-row class="pt-2">
      <b-col class="d-flex justify-content-between align-items-center">
        <b-link :to="'/feed'">
          <i class="fas fa-arrow-circle-left"></i> Go to Feed
        </b-link>
        <div class="d-flex justify-content-end">
          <b-button pill variant="outline-dark" class="mr-2" @click="editUserTrigger">Save Profile</b-button>
          <b-button pill variant="dark" :to="'/profile/' + user.profile.uid">View Public Profile</b-button>
        </div>
      </b-col>
    </b-row>
    <b-row class="pt-2">
      <b-col>
        <b-card title="User Information">
          <b-row>
            <b-col class="d-flex align-items-center" fluid="sm" md="2">E-Mail Address</b-col>
            <b-col fluid="sm" md="10">
              <b-form-input disabled v-model="user.profile.email"></b-form-input>
            </b-col>
          </b-row>
          <b-row v-if="user.profile.role === 'provider'">
            <b-col class="d-flex align-items-center" fluid="sm" md="2">Organization</b-col>
            <b-col fluid="sm" md="10">
              <b-form-input v-model="user.profile.orgName"></b-form-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="d-flex align-items-center" fluid="sm" md="2">First Name</b-col>
            <b-col fluid="sm" md="10">
              <b-form-input v-model="user.profile.firstName"></b-form-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="d-flex align-items-center" fluid="sm" md="2">Last Name</b-col>
            <b-col fluid="sm" md="10">
              <b-form-input v-model="user.profile.lastName"></b-form-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="d-flex align-items-center" fluid="sm" md="2">Location</b-col>
            <b-col fluid="sm" md="10">
              <b-form-input v-model="user.profile.location"></b-form-input>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="d-flex align-items-center" fluid="sm" md="2">About User</b-col>
            <b-col fluid="sm" md="10">
              <b-form-textarea rows="10" v-model="user.profile.about"></b-form-textarea>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="pt-2">
      <b-col>
        <b-card title="Delete Profile" bg-variant="danger" text-variant="light">
          This action is IRREVERSIBLE.
          <template v-slot:footer>
            <b-button pill variant="outline-light" @click="deleteUserTrigger">DELETE PROFILE</b-button>
          </template>
        </b-card>
      </b-col>
    </b-row>
    <b-modal
      id="deleteUserModal"
      title="Are you Sure?"
      scrollable
      centered
      busy
      header-bg-variant="danger"
      header-text-variant="light"
    >
      Are you sure you want to delete your profile?
      <template v-slot:modal-footer>
        <b-button pill variant="outline-dark" @click="onCancelDeleteUser">Cancel</b-button>
        <b-button pill variant="danger" @click="onDeleteUser">Delete</b-button>
      </template>
    </b-modal>
  </b-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  methods: {
    ...mapActions(["editUserProfile", "logoutUser", "deleteUser"]),
    editUserTrigger() {
      this.editUserProfile({
        token: this.user.profile.token,
        uid: this.user.profile.uid,
        user: {
          firstName: this.user.profile.firstName,
          lastName: this.user.profile.lastName,
          orgName: this.user.profile.orgName,
          location: this.user.profile.location,
          about: this.user.profile.about
        }
      })
        .then(r => {
          if (r) {
            this.$toasted.success("Saved", {
              duration: 5000,
              position: "bottom-center"
            });
          }
        })
        .catch(err => console.error(err));
    },
    deleteUserTrigger() {
      this.$bvModal.show("deleteUserModal");
    },
    onDeleteUser() {
      this.deleteUser({
        token: this.user.profile.token,
        uid: this.user.profile.uid
      }).then(d => {
        if (d) {
          this.$bvModal.hide("deleteUserModal");
          this.logoutUser();
          this.$router.push("/login");
        }
      });
    },
    onCancelDeleteUser() {
      this.$bvModal.hide("deleteUserModal");
    }
  },
  computed: {
    ...mapState(["user"])
  },
  created() {
    if (!this.user.profile.uid) this.$router.push("/login");
  }
};
</script>