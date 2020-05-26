<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="dark">
      <b-navbar-brand href="#">stay.io</b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-navbar-nav v-if="user.profile.uid" class="text-center">
            <b-nav-item>
              <b-button pill variant="outline-light" :to="'feed'"
                >Feed</b-button
              >
            </b-nav-item>
            <b-nav-item>
              <b-button pill variant="light" @click="onClickLogout">
                <i class="fas fa-sign-out-alt"></i>
              </b-button>
            </b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav v-else class="text-center">
            <b-nav-item>
              <b-button pill variant="light" :to="'login'">Sign In</b-button>
            </b-nav-item>
          </b-navbar-nav>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-jumbotron class="mb-0">
      <template v-slot:header>Trustable Lodging</template>
      <template v-slot:lead
        >simple, scalable, containerized rating application made on open-source
        technologies</template
      >
      <b-button variant="primary" @click="gotoLogin">Get Started</b-button>
      <b-button
        class="ml-2"
        variant="dark"
        href="https://github.com/sudiptog81/stay.io"
        >View Source Code</b-button
      >
    </b-jumbotron>
    <div
      class="d-flex bg-dark text-light align-items-center justify-content-center px-3 py-2"
    >
      <span class="py-2">Made with VueJS</span>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  methods: {
    ...mapActions(["logoutUser"]),
    gotoLogin() {
      this.$router.push("/login");
    },
    onClickLogout() {
      this.logoutUser();
    },
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>
