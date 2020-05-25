import Vue from "vue";
import Axios from "axios";

import API_URL from "../../api/config";

const state = {
  profile: {},
};

const getters = {};

const actions = {
  loginUser: async ({ commit }, credentials) => {
    try {
      const response = await Axios({
        method: "post",
        url: API_URL + "/api/auth/login",
        data: credentials,
      });
      commit("setUser", response.data);
    } catch (error) {
      Vue.toasted.error("Login Failed", {
        duration: 5000,
        position: "bottom-center",
        icon: "exclamation-circle",
        iconPack: "fontawesome",
      });
      console.error(error);
    }
  },
  logoutUser: ({ commit }) => {
    commit("unsetUser");
  },
  registerUser: async ({ commit }, user) => {
    try {
      const response = await Axios({
        method: "post",
        url: API_URL + "/api/user/register",
        data: user,
      });
      commit("setUser", response.data);
    } catch (error) {
      Vue.toasted.error("Registration Failed", {
        duration: 5000,
        position: "bottom-center",
        icon: "exclamation-circle",
        iconPack: "fontawesome",
      });
      console.error(error);
    }
  },
  registerProvider: async ({ commit }, user) => {
    try {
      const response = await Axios({
        method: "post",
        url: API_URL + "/api/user/register/provider",
        data: user,
        headers: { adminloophole: true },
      });
      commit("setUser", response.data);
    } catch (error) {
      Vue.toasted.error("Registration Failed", {
        duration: 5000,
        position: "bottom-center",
        icon: "exclamation-circle",
        iconPack: "fontawesome",
      });
      console.error(error);
    }
  },
  addLikedListingToProfile: ({ commit }, listing) => {
    commit("_addLikedListingToProfile", listing);
  },
  deleteLikedListingFromProfile: ({ commit }, listing) => {
    commit("_deleteLikedListingFromProfile", listing);
  },
  addRatingToProfile: ({ state }, listing) => {
    state.profile.ratedListings.unshift(listing);
  },
  deleteRatingFromProfile: ({ state }, listing) =>
    (state.profile.ratedListings = state.profile.ratedListings.filter(
      (e) => e !== listing
    )),
  editUserProfile: async ({ commit }, { token, user, uid }) => {
    try {
      const response = await Axios({
        method: "put",
        url: API_URL + "/api/user/profile/" + uid,
        data: user,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return true;
    } catch (error) {
      Vue.toasted.error("Saving Profile Failed", {
        duration: 5000,
        position: "bottom-center",
        icon: "exclamation-circle",
        iconPack: "fontawesome",
      });
      console.error(error);
      return false;
    }
  },
  deleteUser: async ({ commit }, { token, uid }) => {
    try {
      const response = await Axios({
        method: "delete",
        url: API_URL + "/api/user/profile/" + uid,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      return true;
    } catch (error) {
      Vue.toasted.error("Deleting Profile Failed", {
        duration: 5000,
        position: "bottom-center",
        icon: "exclamation-circle",
        iconPack: "fontawesome",
      });
      console.error(error);
      return false;
    }
  },
};

const mutations = {
  setUser: (state, user) => {
    state.profile = user;
  },
  unsetUser: (state) => {
    state.profile = {};
  },
  _addLikedListingToProfile: (state, listing) => {
    state.profile.likedListings.unshift(listing);
  },
  _deleteLikedListingFromProfile: (state, listing) =>
    (state.profile.likedListings = state.profile.likedListings.filter(
      (e) => e !== listing
    )),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
