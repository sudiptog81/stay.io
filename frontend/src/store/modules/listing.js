import Vue from "vue";
import Axios from "axios";

import API_URL from "../../api/config";

const state = {
  listings: [],
  currentListing: {},
};

const getters = {
  allListings: (state) => state.listings,
  currentListing: (state) => state.currentListing,
};

const actions = {
  fetchListings: async ({ commit }, token) => {
    try {
      const response = await Axios.get(API_URL + "/api/listing/", {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      commit("setListings", response.data);
    } catch (error) {
      console.error(error);
      Vue.toasted.error("Fetching Listings Failed", {
        duration: 5000,
        position: "bottom-center",
        icon: "exclamation-circle",
        iconPack: "fontawesome",
      });
    }
  },
  filterListings: async ({ commit }, { token, filters }) => {
    try {
      const response = await Axios.get(API_URL + "/api/listing/", {
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: filters,
      });
      commit("setListings", response.data);
    } catch (error) {
      console.error(error);
      Vue.toasted.error("Fetching Listings Failed", {
        duration: 5000,
        position: "bottom-center",
        icon: "exclamation-circle",
        iconPack: "fontawesome",
      });
    }
  },
  setCurrentListingById: ({ commit, state }, lid) => {
    const listing = state.listings.filter((e) => e.lid === lid);
    if (listing) {
      state.currentListing = listing[0];
      return true;
    } else return false;
  },
  addListing: async ({ commit }, { token, listing }) => {
    try {
      const response = await Axios({
        method: "post",
        url: API_URL + "/api/listing/",
        data: listing,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      commit("addListing", response.data);
      return true;
    } catch (error) {
      console.error(error);
      Vue.toasted.error("Adding Listing Failed", {
        duration: 5000,
        position: "bottom-center",
        icon: "exclamation-circle",
        iconPack: "fontawesome",
      });
      return false;
    }
  },
  editListing: async ({ commit }, data) => {
    const { token, listing } = data;
    try {
      const response = await Axios({
        method: "put",
        url: API_URL + "/api/listing/" + listing.lid,
        data: listing,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      commit("_editListing", listing);
      return true;
    } catch (error) {
      console.error(error);
      Vue.toasted.error("Saving Listing Failed", {
        duration: 5000,
        position: "bottom-center",
        icon: "exclamation-circle",
        iconPack: "fontawesome",
      });
      return false;
    }
  },
  likeListing: async ({ commit }, data) => {
    const { token, lid } = data;
    try {
      const response = await Axios({
        method: "post",
        url: API_URL + "/api/like/listing/" + lid,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      commit("_likeListing", lid);
      return true;
    } catch (error) {
      console.error(error);
      Vue.toasted.error("Liking Listing Failed", {
        duration: 5000,
        position: "bottom-center",
        icon: "exclamation-circle",
        iconPack: "fontawesome",
      });
      return false;
    }
  },
  unlikeListing: async ({ commit }, data) => {
    const { token, lid } = data;
    try {
      const response = await Axios({
        method: "delete",
        url: API_URL + "/api/like/listing/" + lid,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      commit("_unlikeListing", lid);
      return true;
    } catch (error) {
      console.error(error);
      Vue.toasted.error("Unliking Listing Failed", {
        duration: 5000,
        position: "bottom-center",
        icon: "exclamation-circle",
        iconPack: "fontawesome",
      });
      return false;
    }
  },
  deleteListing: async ({ commit }, data) => {
    const { token, lid } = data;
    try {
      const response = await Axios({
        method: "delete",
        url: API_URL + "/api/listing/" + lid,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      commit("removeListing", lid);
      return true;
    } catch (error) {
      console.error(error);
      Vue.toasted.error("Deleting Listing Failed", {
        duration: 5000,
        position: "bottom-center",
        icon: "exclamation-circle",
        iconPack: "fontawesome",
      });
      return false;
    }
  },
  setCurrentListing: ({ commit }, listing) => {
    commit("_setCurrentListing", listing);
  },
  addRatingToListing: async ({ state }, { rid, lid }) => {
    const index = state.listings.findIndex((e) => e.lid === lid);
    if (index !== -1) {
      let newListings = [...state.listings];
      newListings[index].ratings.unshift(rid);
      state.listings = newListings;
      return true;
    } else return false;
  },
  deleteRatingFromListing: async ({ state }, { rid, lid }) => {
    const index = state.listings.findIndex((e) => e.lid === lid);
    if (index !== -1) {
      state.listings[index].ratings = state.listings[index].ratings.filter(
        (r) => r !== rid
      );
      return true;
    } else return false;
  },
  addCommentToListing: async ({ state }, { cid, lid }) => {
    const index = state.listings.findIndex((e) => e.lid === lid);
    if (index !== -1) {
      let newListings = [...state.listings];
      newListings[index].comments.unshift(cid);
      state.listings = newListings;
      return true;
    } else return false;
  },
  deleteCommentFromListing: async ({ state }, { cid, lid }) => {
    const index = state.listings.findIndex((e) => e.lid === lid);
    if (index !== -1) {
      state.listings[index].comments = state.listings[index].comments.filter(
        (c) => c !== cid
      );
      return true;
    } else return false;
  },
};

const mutations = {
  setListings: (state, listings) => (state.listings = listings),
  addListing: (state, listing) => state.listings.unshift(listing),
  removeListing: (state, lid) =>
    (state.listings = state.listings.filter((e) => e.lid !== lid)),
  _likeListing: (state, listing) => {
    const index = state.listings.findIndex((e) => e.lid === listing);
    let newListings = [...state.listings];
    newListings[index].likes++;
    state.listings = newListings;
  },
  _unlikeListing: (state, listing) => {
    const index = state.listings.findIndex((e) => e.lid === listing);
    let newListings = [...state.listings];
    newListings[index].likes--;
    state.listings = newListings;
  },
  _setCurrentListing: (state, listing) => (state.currentListing = listing),
  _editListing: (state, listing) => {
    const index = state.listings.findIndex((e) => e.lid === listing.lid);
    let newListings = [...state.listings];
    newListings[index] = {
      ...newListings[index],
      title: listing.title,
      description: listing.description,
      photoUrl: listing.photoUrl,
    };
    state.listings = newListings;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
