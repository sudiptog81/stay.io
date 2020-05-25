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

import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";
import ProviderRegister from "@/views/ProviderRegister.vue";
import Feed from "@/views/Feed.vue";
import SearchResults from "@/views/SearchResults.vue";
import Listings from "@/views/Listings.vue";
import Listing from "@/views/Listing.vue";
import Profile from "@/views/Profile.vue";
import UserProfile from "@/views/UserProfile.vue";
import PageNotFound from "@/views/PageNotFound.vue";

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
  currentListing: Sinon.stub(),
};

const mockedActions = {
  logoutUser: Sinon.stub(),
};

const store = new Vuex.Store({
  state: mockedState,
  actions: mockedActions,
  getters: mockedGetters,
});

describe("Login.vue", () => {
  const wrapper = shallowMount(Login, {
    localVue,
    store,
  });

  it("Login is a component", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("Renders Login Form", () => {
    expect(wrapper.find(".form-signin").isVisible()).toBe(true);
  });
});

describe("Register.vue", () => {
  const wrapper = shallowMount(Register, {
    localVue,
    store,
    router,
  });

  it("Register is a component", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("Renders Registration Form", () => {
    expect(wrapper.find(".form-register").isVisible()).toBe(true);
  });
});

describe("ProviderRegister.vue", () => {
  const wrapper = shallowMount(ProviderRegister, {
    localVue,
    store,
    router,
  });

  it("ProviderRegister is a component", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("Renders Registration Form", () => {
    expect(wrapper.find(".form-register").isVisible()).toBe(true);
  });
});

describe("Feed.vue", () => {
  const wrapper = shallowMount(Feed, {
    localVue,
    store,
    router,
  });

  it("Feed is a component", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("Renders Navbar", () => {
    expect(wrapper.find(Navbar).isVisible()).toBe(true);
  });

  it("Renders UserFeed", () => {
    expect(wrapper.find(UserFeed).isVisible()).toBe(true);
  });
});

describe("SearchResults.vue", () => {
  const wrapper = shallowMount(SearchResults, {
    localVue,
    store,
    router,
  });

  it("SearchResults is a component", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("Renders Navbar", () => {
    expect(wrapper.find(Navbar).isVisible()).toBe(true);
  });

  it("Renders SearchFeed", () => {
    expect(wrapper.find(SearchFeed).isVisible()).toBe(true);
  });
});

describe("Listings.vue", () => {
  const wrapper = shallowMount(Listings, {
    localVue,
    store,
    router,
  });

  it("Listings is a component", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("Renders Navbar", () => {
    expect(wrapper.find(Navbar).isVisible()).toBe(true);
  });

  it("Renders ProviderFeed", () => {
    expect(wrapper.find(ProviderFeed).isVisible()).toBe(true);
  });
});

describe("Listing.vue", () => {
  const wrapper = shallowMount(Listing, {
    localVue,
    store,
    router,
  });

  it("Listing is a component", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("Renders Navbar", () => {
    expect(wrapper.find(Navbar).isVisible()).toBe(true);
  });

  it("Renders ListingDetail", () => {
    expect(wrapper.find(ListingDetail).isVisible()).toBe(true);
  });
});

describe("Profile.vue", () => {
  const wrapper = shallowMount(Profile, {
    localVue,
    store,
    router,
  });

  it("Profile is a component", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("Renders Navbar", () => {
    expect(wrapper.find(Navbar).isVisible()).toBe(true);
  });

  it("Renders EditProfile", () => {
    expect(wrapper.find(EditProfile).isVisible()).toBe(true);
  });
});

describe("UserProfile.vue", () => {
  const wrapper = shallowMount(UserProfile, {
    localVue,
    store,
    router,
  });

  it("UserProfile is a component", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("Renders Navbar", () => {
    expect(wrapper.find(Navbar).isVisible()).toBe(true);
  });
});

describe("PageNotFound.vue", () => {
  const wrapper = shallowMount(PageNotFound, {
    localVue,
    store,
    router,
  });

  it("PageNotFound is a component", () => {
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  it("Renders Error Text", () => {
    expect(wrapper.find("h1").text()).toBe("ERROR 404");
  });
});
