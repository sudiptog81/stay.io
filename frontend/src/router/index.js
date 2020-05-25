import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import ProviderRegister from "../views/ProviderRegister.vue";
import Feed from "../views/Feed.vue";
import Listing from "../views/Listing.vue";
import Listings from "../views/Listings.vue";
import Profile from "../views/Profile.vue";
import UserProfile from "../views/UserProfile.vue";
import SearchResults from "../views/SearchResults.vue";
import PageNotFound from "../views/PageNotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "stay.io | Trustable Lodging",
    },
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "Login | stay.io | Trustable Lodging",
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      title: "Register | stay.io | Trustable Lodging",
    },
  },
  {
    path: "/provider/register",
    name: "Provider Register",
    component: ProviderRegister,
    meta: {
      title: "Provider Registration | stay.io | Trustable Lodging",
    },
  },
  {
    path: "/feed",
    name: "Feed",
    component: Feed,
    meta: {
      title: "Feed | stay.io | Trustable Lodging",
    },
  },
  {
    path: "/listings",
    name: "Listings",
    component: Listings,
    meta: {
      title: "Your Listings | stay.io | Trustable Lodging",
    },
  },
  {
    path: "/listing/:id",
    component: Listing,
    meta: {
      title: "Listing Detail | stay.io | Trustable Lodging",
    },
  },
  {
    path: "/search",
    name: "SearchResults",
    component: SearchResults,
    meta: {
      title: "Search Results | stay.io | Trustable Lodging",
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      title: "Edit Profile | stay.io | Trustable Lodging",
    },
  },
  {
    path: "/profile/:id",
    name: "UserProfile",
    component: UserProfile,
    meta: {
      title: "User Profile | stay.io | Trustable Lodging",
    },
  },
  {
    path: "/page-not-found",
    component: PageNotFound,
    meta: {
      title: "Page Not Found | stay.io | Trustable Lodging",
    },
  },
  {
    path: "*",
    component: PageNotFound,
    meta: {
      title: "Page Not Found | stay.io | Trustable Lodging",
    },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.title);
  const nearestWithMeta = to.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);
  const previousNearestWithMeta = from.matched
    .slice()
    .reverse()
    .find((r) => r.meta && r.meta.metaTags);
  if (nearestWithTitle) document.title = nearestWithTitle.meta.title;
  Array.from(
    document.querySelectorAll("[data-vue-router-controlled]")
  ).map((el) => el.parentNode.removeChild(el));
  if (!nearestWithMeta) return next();
  nearestWithMeta.meta.metaTags
    .map((tagDef) => {
      const tag = document.createElement("meta");
      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key]);
      });
      tag.setAttribute("data-vue-router-controlled", "");
      return tag;
    })
    .forEach((tag) => document.head.appendChild(tag));
  next();
});

export default router;
