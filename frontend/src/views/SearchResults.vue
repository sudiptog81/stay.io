<template>
  <div>
    <Navbar />
    <SearchFeed />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import SearchFeed from "@/components/SearchFeed.vue";
import { mapState, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["logoutUser"]),
    onClickLogout() {
      this.logoutUser();
      this.$router.push("/");
    }
  },
  components: {
    Navbar,
    SearchFeed
  },
  computed: {
    ...mapState(["user"])
  },
  created() {
    if (!this.user.profile.uid) this.$router.push("/login");
  }
};
</script>