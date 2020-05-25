import Vue from "vue";
import Axios from "axios";

import API_URL from "../../api/config";

const state = {
  searchTerm: "",
  searchResults: [],
};

const getters = {
  allSearchResults: (state) => state.searchResults,
};

const actions = {
  fetchSearchResults: async ({ commit, state }, token) => {
    try {
      const response = await Axios.get(API_URL + "/api/listing/", {
        headers: {
          authorization: `Bearer ${token}`,
        },
        params: {
          search: true,
          term: state.searchTerm,
        },
      });
      commit("setSearchResults", response.data);
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
};

const mutations = {
  setSearchResults: (state, listings) => (state.searchResults = listings),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
