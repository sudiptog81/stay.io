<template>
  <div>
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
          <b-card
            tag="article"
            class="mb-0"
            v-if="currentListing().photoUrl ? true : false"
            :img-src="currentListing().photoUrl"
            :img-alt="'IMAGE: ' + currentListing().title"
            :img-top="currentListing().photoUrl ? true : false"
          >
            <b-card-title>{{ currentListing().title }}</b-card-title>
            <b-card-sub-title>
              <em>
                Posted {{ getDateRep(currentListing().createdAt) }} by
                <b-link :to="'/profile/'+currentListing().by">{{ currentListing().byOrgName }}</b-link>
              </em>
            </b-card-sub-title>
            <b-card-text class="mt-2 text-justify">{{ currentListing().description }}</b-card-text>
            <template v-slot:footer>
              <b-row>
                <b-col>
                  <b-button
                    @click="unlikeListingTrigger(currentListing().lid)"
                    v-if="isLikedByUser(currentListing().lid)"
                    pill
                    variant="dark"
                  >{{ currentListing().likes }} Liked</b-button>
                  <b-button
                    @click="likeListingTrigger(currentListing().lid)"
                    v-else
                    pill
                    variant="outline-dark"
                  >{{ currentListing().likes }} Like</b-button>
                  <b-button
                    v-if="isRatedByUser(currentListing().lid)"
                    @click="onDeleteRatingTrigger"
                    pill
                    variant="success"
                    class="ml-2"
                  >Rated</b-button>
                  <b-button
                    v-else
                    pill
                    variant="warning"
                    class="ml-2"
                    @click="addRatingTrigger"
                  >Rate</b-button>
                </b-col>
                <b-col class="text-center d-flex align-items-center justify-content-end">
                  <span>
                    <span class="text-warning ml-2">
                      <i class="fas fa-star"></i>
                    </span>
                    <span
                      class="text-dark ml-2"
                    >{{currentListing().ratings.length === 0 ? "--" : calculateRating()}}</span>
                  </span>
                  <span
                    class="text-muted ml-2"
                  >({{ currentListing().ratings.length === 1 ? currentListing().ratings.length + " rating" : currentListing().ratings.length + " ratings"}})</span>
                </b-col>
              </b-row>
            </template>
          </b-card>
          <b-card tag="article" class="mb-0" v-else>
            <b-card-title>{{ currentListing().title }}</b-card-title>
            <b-card-sub-title>
              <em>
                Posted {{ getDateRep(currentListing().createdAt) }} by
                <b-link :to="'/profile/' + currentListing().by">{{ currentListing().byOrgName }}</b-link>
              </em>
            </b-card-sub-title>
            <b-card-text class="mt-2 text-justify">{{ currentListing().description }}</b-card-text>
            <template v-slot:footer>
              <b-row>
                <b-col>
                  <b-button
                    @click="unlikeListingTrigger(currentListing().lid)"
                    v-if="isLikedByUser(currentListing().lid)"
                    pill
                    variant="dark"
                  >{{ currentListing().likes }} Liked</b-button>
                  <b-button
                    @click="likeListingTrigger(currentListing().lid)"
                    v-else
                    pill
                    variant="outline-dark"
                  >{{ currentListing().likes }} Like</b-button>
                  <b-button
                    v-if="isRatedByUser(currentListing().lid)"
                    @click="onDeleteRatingTrigger"
                    pill
                    variant="success"
                    class="ml-2"
                  >Rated</b-button>
                  <b-button
                    v-else
                    pill
                    variant="warning"
                    class="ml-2"
                    @click="addRatingTrigger"
                  >Rate</b-button>
                </b-col>
                <b-col class="text-center d-flex align-items-center justify-content-end">
                  <span>
                    <span class="text-warning ml-2">
                      <i class="fas fa-star"></i>
                    </span>
                    <span
                      class="text-dark ml-2"
                    >{{currentListing().ratings.length === 0 ? "--" : calculateRating()}}</span>
                  </span>
                  <span
                    class="text-muted ml-2"
                  >({{ currentListing().ratings.length === 1 ? currentListing().ratings.length + " rating" : currentListing().ratings.length + " ratings"}})</span>
                </b-col>
              </b-row>
            </template>
          </b-card>
        </b-col>
      </b-row>
      <b-row v-if="ready" class="mt-0 pb-2">
        <b-col>
          <b-card>
            <b-card-text>
              <b-form-textarea v-model="userComment" placeholder="Enter Comment"></b-form-textarea>
            </b-card-text>
            <template v-slot:footer>
              <b-button pill variant="outline-dark" @click="addCommentTrigger">Add Comment</b-button>
            </template>
          </b-card>
          <b-card class="mt-1" v-for="comment in allComments()" :key="comment.cid">
            <b-card-text class="mb-0">
              <b-card-sub-title>
                <b-link :to="'/profile/' + comment.by">{{comment.commenter}}</b-link>
              </b-card-sub-title>
              {{comment.text}}
            </b-card-text>
            <div class="mt-1">
              <b-button
                v-if="user.profile.uid === comment.by"
                pill
                variant="outline-danger"
                size="sm"
                @click="deleteCommentTrigger(comment.cid)"
              >Delete</b-button>
            </div>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
    <b-modal
      id="addRatingModal"
      title="Submit Rating"
      scrollable
      centered
      busy
      header-bg-variant="warning"
      header-text-variant="dark"
    >
      <b-form-rating id="rating-lg-no-border" v-model="userRating" no-border size="lg"></b-form-rating>
      <template v-slot:modal-footer>
        <b-button pill variant="outline-dark" @click="onCancelRating">Cancel</b-button>
        <b-button pill variant="warning" @click="onAddRatingTrigger(currentListing().lid)">Submit</b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import moment from "moment-timezone";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  name: "ListingDetail",
  data: () => ({
    ready: false,
    userRating: 3,
    userComment: "",
    errorToastOptions: {
      duration: 5000,
      position: "bottom-center",
      icon: "exclamation-circle",
      iconPack: "fontawesome"
    }
  }),
  methods: {
    ...mapGetters(["currentListing", "allRatings", "allComments"]),
    ...mapActions([
      "setCurrentListingById",
      "likeListing",
      "addLikedListingToProfile",
      "unlikeListing",
      "deleteLikedListingFromProfile",
      "fetchRatings",
      "addRating",
      "addRatingToListing",
      "addRatingToProfile",
      "deleteRating",
      "deleteRatingFromListing",
      "deleteRatingFromProfile",
      "fetchComments",
      "addComment",
      "addCommentToListing",
      "deleteComment",
      "deleteCommentFromListing"
    ]),
    getDateRep(date) {
      const twoHrs = 2 * 60 * 60 * 1000;
      const isMoreThanTwoHrs = Date.now() - Date(date) > twoHrs;
      return isMoreThanTwoHrs
        ? moment(date).format("LLL")
        : moment(date).fromNow();
    },
    calculateRating() {
      const avg =
        Math.round(
          100 *
            (this.rating.ratings.reduce((a, b) => a + b.rating, 0) /
              this.rating.ratings.length)
        ) / 100;
      return avg;
    },
    isLikedByUser(lid) {
      return this.user.profile.likedListings.indexOf(lid) !== -1 ? true : false;
    },
    isRatedByUser(lid) {
      return this.user.profile.ratedListings.indexOf(lid) !== -1 ? true : false;
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
    },
    addRatingTrigger() {
      this.$bvModal.show("addRatingModal");
    },
    onAddRatingTrigger(lid) {
      this.addRating({
        token: this.user.profile.token,
        rating: { rating: this.userRating, by: this.user.profile.uid },
        lid
      }).then(rid => {
        if (rid)
          this.addRatingToListing({
            rid,
            lid
          }).then(l => {
            if (l)
              this.addRatingToProfile(lid).then(() => {
                this.userRating = 0;
                this.$bvModal.hide("addRatingModal");
              });
          });
      });
    },
    onCancelRating() {
      this.userRating = 0;
      this.$bvModal.hide("addRatingModal");
    },
    onDeleteRatingTrigger() {
      const lid = this.currentListing().lid;
      const rid = this.allRatings().filter(r => r.by === this.user.profile.uid);
      this.deleteRating({
        token: this.user.profile.token,
        uid: this.user.profile.uid,
        lid
      }).then(r => {
        if (r);
        this.deleteRatingFromListing({ rid: rid[0].rid, lid }).then(l => {
          if (l) {
            this.deleteRatingFromProfile(lid);
            this.userRating = 0;
          }
        });
      });
    },
    addCommentTrigger() {
      if (!this.userComment) {
        this.$toasted.error("Enter Comment", this.errorToastOptions);
      } else
        this.addComment({
          token: this.user.profile.token,
          comment: {
            text: this.userComment,
            commenter: this.user.profile.orgName
              ? this.user.profile.orgName
              : this.user.profile.lastName
              ? this.user.profile.firstName + " " + this.user.profile.lastName
              : this.user.profile.firstName,
            by: this.user.profile.uid
          },
          lid: this.currentListing().lid
        }).then(cid => {
          if (cid)
            this.addCommentToListing({
              cid,
              lid: this.currentListing().lid
            }).then(l => {
              this.userComment = "";
            });
        });
    },
    deleteCommentTrigger(cid) {
      this.deleteComment({
        token: this.user.profile.token,
        cid,
        lid: this.currentListing().lid
      }).then(cid => {
        if (cid)
          this.deleteCommentFromListing({
            cid,
            lid: this.currentListing().lid
          });
      });
    }
  },
  computed: {
    ...mapState(["user", "listing", "rating", "comment"])
  },
  created() {
    if (!this.user.profile.uid) this.$router.push("/login");
    else {
      if (this.setCurrentListingById(this.$route.params.id)) {
        this.fetchRatings({
          token: this.user.profile.token,
          lid: this.$route.params.id
        });
        this.fetchComments({
          token: this.user.profile.token,
          lid: this.$route.params.id
        });
        this.ready = true;
      } else this.ready = false;
      if (!this.currentListing()) this.$router.push("/page-not-found");
    }
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
