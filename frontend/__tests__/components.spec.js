import Vuex from "vuex";
import BootstrapVue from "bootstrap-vue";

import Sinon from "sinon";
import { shallowMount, createLocalVue } from "@vue/test-utils";

import router from "@/router";

import Landing from "@/components/Landing.vue";
import Navbar from "@/components/Navbar.vue";
import UserFeed from "@/components/UserFeed.vue";
import ProviderFeed from "@/components/ProviderFeed.vue";
import SearchFeed from "@/components/SearchFeed.vue";
import ListingDetail from "@/components/ListingDetail.vue";
import EditProfile from "@/components/EditProfile.vue";

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(BootstrapVue);
localVue.use(router);

const mockedState = {
  user: {
    profile: {},
  },
  listing: {
    listings: [],
    currentListing: {},
  },
  search: {
    searchResults: [],
    searchTerm: "",
  },
};

const mockedGetters = {
  currentListing: () => mockedState.listing.currentListing,
};

const mockedActions = {
  logoutUser: async () => await Sinon.fake(),
};

const store = new Vuex.Store({
  state: mockedState,
  actions: mockedActions,
  getters: mockedGetters,
});

describe("Landing.vue", () => {
  const wrapper = shallowMount(Landing, {
    localVue,
    store,
  });

  it("Landing is a component", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});

describe("Navbar.vue", () => {
  const wrapper = shallowMount(Navbar, {
    localVue,
    store,
    router,
  });
  it("Navbar is a component", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});

describe("UserFeed.vue", () => {
  const wrapper = shallowMount(UserFeed, {
    localVue,
    store,
    router,
  });
  it("UserFeed is a component", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});

describe("ProviderFeed.vue", () => {
  const wrapper = shallowMount(ProviderFeed, {
    localVue,
    store,
    router,
  });
  it("ProviderFeed is a component", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});

describe("SearchFeed.vue", () => {
  const wrapper = shallowMount(SearchFeed, {
    localVue,
    store,
    router,
  });
  it("SearchFeed is a component", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});

describe("ListingDetail.vue", () => {
  const wrapper = shallowMount(ListingDetail, {
    localVue,
    store,
    router,
  });
  it("ListingDetail is a component", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});

describe("EditProfile.vue", () => {
  const wrapper = shallowMount(EditProfile, {
    localVue,
    store,
    router,
  });
  it("EditProfile is a component", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
});
