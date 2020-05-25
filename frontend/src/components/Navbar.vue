<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-brand class="flex-grow-1">
        <b-button variant="dark" v-b-toggle.sidebar>
          <i class="fas fa-bars"></i>
        </b-button>
      </b-navbar-brand>
      <b-sidebar id="sidebar" bg-variant="dark" text-variant="light" shadow>
        <div class="px-4 py-2 text-center">
          <b-navbar-brand :to="'/'" class="mr-0" id="navbar-logo">stay.io</b-navbar-brand>
          <hr class="my-2" />
          <div class="sidebar-menu px-4">
            <ul>
              <li>
                <b-link class="btn my-2" :to="'/feed'">
                  <span>Feed</span>
                </b-link>
              </li>
              <li v-if="user.profile.role === 'provider'">
                <b-link class="btn my-2" :to="'/listings'">
                  <span>Listings</span>
                </b-link>
              </li>
              <li>
                <b-link class="btn my-2" :to="'/profile'">
                  <span>Profile</span>
                </b-link>
              </li>
            </ul>
          </div>
        </div>
      </b-sidebar>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-form @submit="onSearch" class="ml-auto mx-lg-auto search-form">
            <b-form-group class>
              <b-form-input
                size="sm"
                v-model="userSearchTerm"
                class="text-center"
                placeholder="search"
              ></b-form-input>
              <b-button size="sm" class="sr-only" type="submit">Search</b-button>
            </b-form-group>
          </b-nav-form>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            <b-button pill variant="light" @click="onClickLogout">
              <i class="fas fa-sign-out-alt"></i>
            </b-button>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      userSearchTerm: ""
    };
  },
  methods: {
    ...mapActions(["logoutUser", "fetchSearchResults"]),
    onClickLogout() {
      this.logoutUser();
      this.$router.push("/");
    },
    onSearch(e) {
      e.preventDefault();
      this.search.searchTerm = this.userSearchTerm;
      this.fetchSearchResults(this.user.profile.token);
      this.$router.push("/search");
    }
  },
  computed: {
    ...mapState(["user", "search"])
  },
  created() {
    if (!this.user.profile.uid) this.$router.push("/login");
  }
};
</script>

<style lang="scss" scoped>
#navbar-logo {
  font-size: 2rem;
}

.sidebar-menu {
  ul {
    list-style: none;
    li {
      text-transform: uppercase;
      a {
        color: white;
        &.router-link-exact-active {
          font-weight: 800;
        }
      }
    }
  }
}

@media screen and (max-width: 786px) {
  .search-form {
    margin-top: 1em;
  }
}
</style>