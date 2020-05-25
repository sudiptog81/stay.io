<template>
  <div>
    <b-container>
      <b-row v-if="ready" class="py-2">
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
import { mapGetters, mapActions, mapState } from "vuex";
import moment from "moment-timezone";
export default {
  name: "UserFeed",
  data() {
    return {
      ready: false
    };
  },
  methods: {
    ...mapGetters(["allListings"]),
    ...mapActions([
      "fetchListings",
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
  computed: {
    ...mapState(["user", "listing"])
  },
  created() {
    if (this.user.profile.uid)
      this.fetchListings(this.user.profile.token).then(() => {
        this.ready = true;
      });
  }
};
</script>

<style lang="scss" scoped>
article.card {
  img {
    max-height: 5cm;
    object-fit: cover;
  }
}
</style>
