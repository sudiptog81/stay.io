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
    <b-jumbotron class="mb-0 text-center">
      <template v-slot:header>trustable lodging</template>
      <template v-slot:lead>
        simple, scalable, containerized rating application made on open-source
        technologies
      </template>
      <b-button variant="primary" @click="gotoLogin">get started</b-button>
      <b-button
        class="ml-2"
        variant="dark"
        href="https://github.com/sudiptog81/stay.io"
      >
        source code
      </b-button>
    </b-jumbotron>
    <div class="album py-5 bg-light">
      <b-container fluid="sm">
        <b-row>
          <b-col sm="12" md="4">
            <b-card
              class="mb-4 shadow-sm text-center"
              img-top
              img-src="https://miro.medium.com/max/800/1*Pk2mZo1cBqfVqQi-mtAkuA.png"
              title="vue.js"
            >
              <b-card-text>
                an incrementally adoptable and progressive ecosystem that scales
                between a library and a full-featured framework
              </b-card-text>
            </b-card>
          </b-col>
          <b-col sm="12" md="4">
            <b-card
              class="mb-4 shadow-sm text-center"
              img-top
              img-src="https://user-images.githubusercontent.com/7110136/29002857-9e802f08-7ab4-11e7-9c31-604b5d0d0c19.png"
              title="vuex"
            >
              <b-card-text>
                a state management pattern + library with rules ensuring that
                the state can only be mutated in a predictable fashion
              </b-card-text>
            </b-card>
          </b-col>
          <b-col sm="12" md="4">
            <b-card
              class="mb-4 shadow-sm text-center"
              img-top
              img-src="https://user-images.githubusercontent.com/7110136/29002858-a09570d2-7ab4-11e7-8faa-5dd6d4458b0d.png"
              title="vue-router"
            >
              <b-card-text>
                vue-router deeply integrates with vue.js to make building single
                page applications with a breeze
              </b-card-text>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
    </div>
    <div
      class="d-flex bg-dark text-light align-items-center justify-content-center px-3 py-2"
    >
      <span class="py-2">gh: @sudiptog81</span>
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
      if (
        this.user.profile.isSocial &&
        this.user.profile.socialType === "facebook"
      ) {
        FB.logout();
      }
      this.logoutUser();
    },
  },
  computed: {
    ...mapState(["user"]),
  },
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
