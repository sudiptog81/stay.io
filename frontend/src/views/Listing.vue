<template>
  <div>
    <Navbar />
    <ListingDetail />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Navbar from "@/components/Navbar.vue";
import ListingDetail from "@/components/ListingDetail.vue";
export default {
  name: "Listing",
  components: {
    Navbar,
    ListingDetail
  },
  computed: {
    ...mapState(["user"])
  },
  created() {
    if (!this.user.profile.uid) this.$router.push("/login");
  }
};
</script>