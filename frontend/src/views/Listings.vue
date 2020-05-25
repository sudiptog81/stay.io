<template>
  <div>
    <Navbar />
    <ProviderFeed />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import ProviderFeed from "@/components/ProviderFeed.vue";
import { mapState, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["logoutUser", "filterListings"]),
    onClickLogout() {
      this.logoutUser();
      this.$router.push("/");
    }
  },
  components: {
    Navbar,
    ProviderFeed
  },
  computed: {
    ...mapState(["user", "listings"])
  }
};
</script>
