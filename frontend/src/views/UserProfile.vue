<template>
  <div>
    <Navbar />
    <b-container v-if="ready">
      <b-row class="pt-2">
        <b-col>
          <b-link :to="'/feed'">
            <i class="fas fa-arrow-circle-left"></i> Go to Feed
          </b-link>
        </b-col>
      </b-row>
      <b-row class="pt-2">
        <b-col>
          <b-card>
            <b-card-title>
              <div class="d-flex align-items-center justify-content-between">
                <span>{{currentProfile().orgName ? currentProfile().orgName : currentProfile().lastName ? currentProfile().firstName + ' ' + currentProfile().lastName : currentProfile().firstName}}</span>
                <b-badge v-if="currentProfile().role === 'provider'" pill variant="dark">Provider</b-badge>
              </div>
            </b-card-title>
            <b-card-sub-title v-if="currentProfile().location ? true : false">
              <i class="fas fa-map-marker-alt"></i>
              {{ currentProfile().location }}
            </b-card-sub-title>
            <b-card-text class="mt-2 text-justify">{{ currentProfile().about }}</b-card-text>
          </b-card>
        </b-col>
      </b-row>
      <b-row class="pt-2">
        <b-col>
          <div v-for="listing in allListings()" :key="listing.lid">
            <b-card
              v-if="listing.photoUrl"
              tag="article"
              class="mb-2"
              :img-src="listing.photoUrl"
              :img-alt="'IMAGE: ' + listing.title"
              :img-top="listing.photoUrl ? true : false"
            >
              <b-card-title>{{ listing.title }}</b-card-title>
              <b-card-sub-title>
                <em>
                  Posted {{ getDateRep(listing.createdAt) }} by
                  <b-link :to="'/profile/' + listing.by">{{ listing.byOrgName }}</b-link>
                </em>
              </b-card-sub-title>
              <template v-slot:footer>
                <b-button
                  @click="unlikeListingTrigger(listing.lid)"
                  v-if="isLikedByUser(listing.lid)"
                  pill
                  variant="dark"
                >{{ listing.likes }} Liked</b-button>
                <b-button
                  @click="likeListingTrigger(listing.lid)"
                  v-else
                  pill
                  variant="outline-dark"
                >{{ listing.likes }} Like</b-button>
                <b-button
                  pill
                  variant="outline-dark"
                  class="ml-2"
                  :to="'/listing/' + listing.lid"
                >View Listing</b-button>
              </template>
            </b-card>
            <b-card v-else tag="article" class="mb-2">
              <b-card-title>{{ listing.title }}</b-card-title>
              <b-card-sub-title>
                <em>
                  Posted {{ getDateRep(listing.createdAt) }} by
                  <b-link :to="'/profile/'+listing.by">{{ listing.byOrgName }}</b-link>
                </em>
              </b-card-sub-title>
              <template v-slot:footer>
                <b-button
                  @click="unlikeListingTrigger(listing.lid)"
                  v-if="isLikedByUser(listing.lid)"
                  pill
                  variant="dark"
                >{{ listing.likes }} Liked</b-button>
                <b-button
                  @click="likeListingTrigger(listing.lid)"
                  v-else
                  pill
                  variant="outline-dark"
                >{{ listing.likes }} Like</b-button>
                <b-button
                  pill
                  variant="outline-dark"
                  class="ml-2"
                  :to="'/listing/' + listing.lid"
                >View Listing</b-button>
              </template>
            </b-card>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import moment from "moment-timezone";
import Navbar from "@/components/Navbar.vue";
export default {
  data: () => ({
    ready: false
  }),
  methods: {
    ...mapGetters(["currentProfile", "allListings"]),
    ...mapActions([
      "fetchProfile",
      "filterListings",
      "likeListing",
      "addLikedListingToProfile",
      "unlikeListing",
      "deleteLikedListingFromProfile"
    ]),
    getDateRep(date) {
      const twoHrs = 2 * 60 * 60 * 1000;
      const isMoreThanTwoHrs = Date.now() - Date(date) > twoHrs;
      return isMoreThanTwoHrs
        ? moment(date).format("LLL")
        : moment(date).fromNow();
    },
    isLikedByUser(lid) {
      return this.user.profile.likedListings.indexOf(lid) !== -1 ? true : false;
    },
    likeListingTrigger(lid) {
      this.likeListing({
        token: this.user.profile.token,
        lid
      }).then(r => {
        if (r) this.addLikedListingToProfile(lid);
      });
    },
    unlikeListingTrigger(lid) {
      this.unlikeListing({
        token: this.user.profile.token,
        lid
      }).then(r => {
        if (r) this.deleteLikedListingFromProfile(lid);
      });
    }
  },
  components: {
    Navbar
  },
  computed: {
    ...mapState(["user", "profile", "listing"])
  },
  created() {
    if (!this.user.profile.uid) this.$router.push("/login");
    else {
      this.fetchProfile({
        token: this.user.profile.token,
        uid: this.$route.params.id
      }).then(p => {
        this.filterListings({
          token: this.user.profile.token,
          filters: {
            filterBy: "by",
            filterVal: this.$route.params.id,
            filter: true
          }
        }).then(() => {
          if (p) this.ready = true;
          else this.ready = false;
          if (!this.currentProfile()) this.$router.push("/page-not-found");
        });
      });
    }
  }
};
</script>
