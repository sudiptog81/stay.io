import Vue from "vue";
import Axios from "axios";

import API_URL from "../../api/config";

const state = {
  comments: [],
};

const getters = {
  allComments: (state) => state.comments,
};

const actions = {
  fetchComments: async ({ commit }, { token, lid }) => {
    try {
      const response = await Axios.get(API_URL + "/api/comment/" + lid, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      commit("setComments", response.data);
    } catch (error) {
      console.error(error);
      Vue.toasted.error("Fetching Comments Failed", {
        duration: 5000,
        position: "bottom-center",
        icon: "exclamation-circle",
        iconPack: "fontawesome",
      });
    }
  },
  addComment: async ({ commit }, { token, comment, lid }) => {
    try {
      const response = await Axios({
        method: "post",
        url: API_URL + "/api/comment/" + lid,
        data: comment,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      commit("addComment", response.data);
      return response.data.cid;
    } catch (error) {
      console.error(error);
      Vue.toasted.error("Adding Comment Failed", {
        duration: 5000,
        position: "bottom-center",
        icon: "exclamation-circle",
        iconPack: "fontawesome",
      });
      return false;
    }
  },
  deleteComment: async ({ commit }, { token, cid, lid }) => {
    try {
      const response = await Axios({
        method: "delete",
        url: API_URL + "/api/comment/" + lid + "/" + cid,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      commit("deleteComment", cid);
      return true;
    } catch (error) {
      console.error(error);
      Vue.toasted.error("Deleting Comment Failed", {
        duration: 5000,
        position: "bottom-center",
        icon: "exclamation-circle",
        iconPack: "fontawesome",
      });
      return false;
    }
  },
  likeComment: async ({ commit }, data) => {
    const { token, cid } = data;
    try {
      const response = await Axios({
        method: "post",
        url: API_URL + "/api/like/comment/" + cid,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      commit("_likeComment", cid);
      return true;
    } catch (error) {
      console.error(error);
      Vue.toasted.error("Liking Comment Failed", {
        duration: 5000,
        position: "bottom-center",
        icon: "exclamation-circle",
        iconPack: "fontawesome",
      });
      return false;
    }
  },
  unlikeComment: async ({ commit }, data) => {
    const { token, cid } = data;
    try {
      const response = await Axios({
        method: "delete",
        url: API_URL + "/api/like/comment/" + cid,
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      commit("_unlikeComment", cid);
      return true;
    } catch (error) {
      console.error(error);
      Vue.toasted.error("Unliking Comment Failed", {
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
  setComments: (state, comments) => (state.comments = comments),
  addComment: (state, comment) => state.comments.push(comment),
  deleteComment: (state, cid) =>
    (state.comments = state.comments.filter((e) => e.cid !== cid)),
  _likeComment: (state, comment) => {
    const index = state.comments.findIndex((e) => e.cid === comment);
    let newComments = [...state.comments];
    newComments[index].likes++;
    state.comments = newComments;
  },
  _unlikeComment: (state, comment) => {
    const index = state.comments.findIndex((e) => e.cid === comment);
    let newComments = [...state.comments];
    newComments[index].likes--;
    state.comments = newComments;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
