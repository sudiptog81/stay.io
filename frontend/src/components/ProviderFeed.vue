<template>
  <div>
    <b-container>
      <b-row class="pt-2">
        <b-col>
          <b-button pill variant="dark" @click="addListingTrigger">Add New Listing</b-button>
        </b-col>
        <b-col class="text-right pt-2">
          <span v-if="ready">You have {{ allListings().length }} listings</span>
          <span v-else>Not Ready</span>
        </b-col>
      </b-row>
      <b-row class="pt-2">
        <b-col>
          <b-table
            v-if="ready"
            id="listingTable"
            :items="allListings()"
            :fields="fields"
            :sort-by="'createdAt'"
            :sort-desc="true"
            :per-page="10"
            small
            primary-key="lid"
            :tbody-transition-props="transProps"
          >
            <template v-slot:cell(createdAt)="data">{{ getDateRep(data) }}</template>
            <template v-slot:cell(actions)="row">
              <b-button
                size="sm"
                variant="dark"
                @click="editListingTrigger(row.item, row.index, $event.target)"
                class="mr-1"
              >
                <i class="fas fa-pencil-alt"></i>
              </b-button>
              <b-button
                size="sm"
                variant="danger"
                @click="
                  deleteListingTrigger(row.item, row.index, $event.target)
                "
              >
                <i class="fas fa-trash"></i>
              </b-button>
            </template>
          </b-table>
        </b-col>
      </b-row>
    </b-container>
    <b-modal
      id="addListingModal"
      title="Add New Listing"
      scrollable
      centered
      busy
      header-bg-variant="dark"
      header-text-variant="light"
    >
      <b-form>
        <b-form-group id="titleInputGroup" label-for="titleInput">
          <b-form-input id="titleInput" v-model="title" type="text" placeholder="Title" />
        </b-form-group>
        <b-form-group id="photoUrlInputGroup" label-for="photoUrlInput">
          <b-form-input id="photoUrlInput" v-model="photoUrl" type="url" placeholder="Photo URL" />
        </b-form-group>
        <b-form-group id="descInputGroup" label-for="descInput">
          <b-form-textarea
            id="descInput"
            rows="10"
            v-model="description"
            placeholder="Description"
          />
        </b-form-group>
      </b-form>
      <template v-slot:modal-footer>
        <b-button pill variant="outline-dark" @click="onCancel">Cancel</b-button>
        <b-button pill variant="dark" @click="onSubmit">Submit</b-button>
      </template>
    </b-modal>
    <b-modal
      id="editListingModal"
      title="Edit Listing"
      scrollable
      centered
      busy
      header-bg-variant="dark"
      header-text-variant="light"
    >
      <b-form>
        <b-form-group id="titleInputEditGroup" label-for="titleInputEdit">
          <b-form-input
            id="titleInputEdit"
            v-model="currentListing().title"
            type="text"
            placeholder="Title"
          />
        </b-form-group>
        <b-form-group id="photoUrlInputEditGroup" label-for="photoUrlInputEdit">
          <b-form-input
            id="photoUrlInputEdit"
            v-model="currentListing().photoUrl"
            type="url"
            placeholder="Photo URL"
          />
        </b-form-group>
        <b-form-group id="descInputEditGroup" label-for="descInputEdit">
          <b-form-textarea id="descInputEdit" rows="10" v-model="currentListing().description" />
        </b-form-group>
      </b-form>
      <template v-slot:modal-footer>
        <b-button pill variant="outline-dark" @click="onCancelEdit">Cancel</b-button>
        <b-button pill variant="dark" @click="onSubmitEdit">Save</b-button>
      </template>
    </b-modal>
    <b-modal
      id="deleteListingModal"
      title="Delete Listing"
      scrollable
      centered
      busy
      header-bg-variant="danger"
      header-text-variant="light"
    >
      Are you sure you want to delete {{ currentListing().title }}?
      <template v-slot:modal-footer>
        <b-button pill variant="outline-dark" @click="onCancelDelete">Cancel</b-button>
        <b-button pill variant="danger" @click="onSubmitDelete">Delete</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import moment from "moment-timezone";

export default {
  name: "ProviderFeed",
  data() {
    return {
      ready: false,
      title: "",
      description: "",
      photoUrl: "",
      transProps: {
        name: "flip-list"
      },
      fields: [
        { key: "title", sortable: true },
        { key: "createdAt", sortable: true },
        { key: "actions", label: "" }
      ]
    };
  },
  methods: {
    ...mapGetters(["allListings", "currentListing"]),
    ...mapActions([
      "filterListings",
      "addListing",
      "setCurrentListing",
      "editListing",
      "deleteListing",
      "deleteLikedListingFromProfile"
    ]),
    getDateRep({ value: date }) {
      const twoHrs = 2 * 60 * 60 * 1000;
      const isMoreThanTwoHrs = Date.now() - Date(date) > twoHrs;
      return isMoreThanTwoHrs
        ? moment(date).format("LLL")
        : moment(date).fromNow();
    },
    addListingTrigger(e) {
      e.preventDefault();
      this.title = "";
      this.description = "";
      this.photoUrl = "";
      this.$bvModal.show("addListingModal");
    },
    onSubmit(e) {
      e.preventDefault();
      this.addListing({
        token: this.user.profile.token,
        listing: {
          title: this.title,
          description: this.description,
          photoUrl: this.photoUrl,
          by: this.user.profile.uid,
          byOrgName: this.user.profile.orgName
        }
      }).then(r => {
        if (r) {
          this.title = "";
          this.description = "";
          this.photoUrl = "";
          this.$bvModal.hide("addListingModal");
        }
      });
    },
    onCancel(e) {
      e.preventDefault();
      this.title = "";
      this.description = "";
      this.photoUrl = "";
      this.$bvModal.hide("addListingModal");
    },
    editListingTrigger(item, index, button) {
      this.setCurrentListing(item);
      this.$bvModal.show("editListingModal");
    },
    onSubmitEdit(e) {
      e.preventDefault();
      this.editListing({
        token: this.user.profile.token,
        listing: {
          title: this.currentListing().title,
          description: this.currentListing().description,
          photoUrl: this.currentListing().photoUrl,
          lid: this.currentListing().lid
        }
      }).then(r => {
        if (r) {
          this.setCurrentListing({});
          this.$bvModal.hide("editListingModal");
        }
      });
    },
    onCancelEdit(e) {
      e.preventDefault();
      this.setCurrentListing({});
      this.$bvModal.hide("editListingModal");
    },
    deleteListingTrigger(item, index, button) {
      this.setCurrentListing(item);
      this.$bvModal.show("deleteListingModal");
    },
    onSubmitDelete(e) {
      e.preventDefault();
      this.deleteListing({
        token: this.user.profile.token,
        lid: this.currentListing().lid
      }).then(r => {
        if (r) {
          this.setCurrentListing({});
          this.$bvModal.hide("deleteListingModal");
        }
      });
    },
    onCancelDelete(e) {
      e.preventDefault();
      this.setCurrentListing({});
      this.$bvModal.hide("deleteListingModal");
    }
  },
  computed: {
    ...mapState(["user", "listing"])
  },
  created() {
    if (this.user.profile.uid)
      this.filterListings({
        token: this.user.profile.token,
        filters: {
          filterBy: "by",
          filterVal: this.user.profile.uid,
          filter: true
        }
      }).then(() => {
        this.ready = true;
      });
  }
};
</script>
