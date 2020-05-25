<template>
  <div>
    <Navbar />
    <UserFeed />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import UserFeed from "@/components/UserFeed.vue";
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
    UserFeed
  },
  computed: {
    ...mapState(["user"])
  },
  created() {
    if (!this.user.profile.uid) this.$router.push("/login");
  }
};
</script>
