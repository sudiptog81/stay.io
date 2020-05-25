import Vue from "vue";
import Vuex from "vuex";
import user from "./modules/user";
import listing from "./modules/listing";
import rating from "./modules/rating";
import comment from "./modules/comment";
import profile from "./modules/profile";
import search from "./modules/search";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { user, listing, rating, comment, profile, search },
});
