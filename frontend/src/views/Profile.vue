<template>
  <div>
    <Navbar />
    <EditProfile />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Navbar from "@/components/Navbar.vue";
import EditProfile from "@/components/EditProfile.vue";
export default {
  methods: {
    ...mapActions(["logoutUser"])
  },
  components: {
    Navbar,
    EditProfile
  },
  computed: {
    ...mapState(["user"])
  },
  created() {
    if (!this.user.profile.uid) this.$router.push("/login");
  }
};
</script>
