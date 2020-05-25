import Vue from "vue";
import Axios from "axios";

import API_URL from "../../api/config";

const state = {
  ratings: [],
  currentRating: {},
};

const getters = {
  allRatings: (state) => state.ratings,
};

const actions = {
  fetchRatings: async ({ commit }, { token, lid }) => {
    try {
      const response = await Axios.get(API_URL + "/api/rating/" + lid, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      commit("setRatings", response.data);
    } catch (error) {
      console.error(error);
      Vue.toasted.error("Fetching Ratings Failed", {
        duration: 5000,
        position: "bottom-center",
        icon: "exclamation-circle",
        iconPack: "fontawesome",
      });
    }
  },
  addRating: async ({ commit }, { token, rating, lid }) => {
    try {
      const response = await Axios({
        method: "post",
        url: API_URL + "/api/rating/" + lid,
        data: rating,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      commit("addRating", response.data);
      return response.data.rid;
    } catch (error) {
      console.error(error);
      Vue.toasted.error("Adding Rating Failed", {
        duration: 5000,
        position: "bottom-center",
        icon: "exclamation-circle",
        iconPack: "fontawesome",
      });
      return false;
    }
  },
  deleteRating: async ({ commit }, { token, uid, lid }) => {
    try {
      const response = await Axios({
        method: "delete",
        url: API_URL + "/api/rating/" + lid + "/" + uid,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      commit("deleteRating", uid);
      return true;
    } catch (error) {
      console.error(error);
      Vue.toasted.error("Deleting Rating Failed", {
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
  setRatings: (state, ratings) => (state.ratings = ratings),
  addRating: (state, rating) => state.ratings.unshift(rating),
  deleteRating: (state, uid) =>
    (state.ratings = state.ratings.filter((e) => e.by !== uid)),
};

export default {
  state,
  getters,
  actions,
  mutations,
};
