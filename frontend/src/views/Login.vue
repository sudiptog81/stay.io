<template>
  <div id="signin-formdiv">
    <b-form class="form-signin" @submit="onSubmit">
      <h1 class="h3 mb-3 font-weight-normal text-center">Sign In</h1>
      <label for="inputEmail" class="sr-only">Email address</label>
      <b-form-input
        v-model="email"
        type="email"
        id="inputEmail"
        class="form-control mb-2"
        placeholder="Email address"
        required
        autofocus
      />
      <label for="inputPassword" class="sr-only">Password</label>
      <b-form-input
        v-model="password"
        type="password"
        id="inputPassword"
        class="form-control mb-2"
        placeholder="Password"
        required
      />
      <b-button type="submit" variant="dark" class="mb-2 btn-block">
        Sign In
      </b-button>
      <b-form-group class="mt-4 text-center">
        <b-link :to="'register'" class="text-muted">
          Create an Account
        </b-link>
      </b-form-group>
      <b-form-group class="mt-0 text-center">
        <b-link :to="'/'" class="text-muted">
          Go Back to Homepage
        </b-link>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["loginUser"]),
    onSubmit(e) {
      e.preventDefault();
      this.loginUser({
        email: this.email,
        password: this.password,
      }).then(() => {
        if (this.user.profile.uid) {
          this.$router.push("/feed");
        }
      });
    },
  },
  computed: {
    ...mapState(["user"]),
  },
  created() {
    if (this.user.profile.uid) this.$router.push("/feed");
  },
};
</script>

<style lang="scss" scoped>
#signin-formdiv {
  height: 100vh;
  display: -ms-flexbox;
  display: -webkit-box;
  display: flex;
  -ms-flex-align: center;
  -ms-flex-pack: center;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
