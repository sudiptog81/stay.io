import Vue from "vue";
import Axios from "axios";

import API_URL from "../../api/config";

const state = {
  currentProfile: {},
};

const getters = {
  currentProfile: (state) => state.currentProfile,
};

const actions = {
  fetchProfile: async ({ commit }, { token, uid }) => {
    try {
      const response = await Axios.get(API_URL + "/api/user/profile/" + uid, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      commit("setCurrentProfile", response.data);
      return true;
    } catch (error) {
      console.error(error);
      Vue.toasted.error("Fetching Profile Failed", {
        duration: 5000,
        position: "bottom-center",
        icon: "exclamation-circle",
        iconPack: "fontawesome",
      });
      return false;
    }
  },
};

const mutations = {
  setCurrentProfile: (state, profile) => (state.currentProfile = profile),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
