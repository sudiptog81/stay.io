<template>
  <div id="register-formdiv">
    <b-form class="form-register" @submit="onSubmit">
      <h1 class="h3 mb-3 font-weight-normal text-center">Provider Registration</h1>
      <b-form-group id="inputOrgNameGroup" label-for="inputOrgName">
        <b-form-input
          v-model="orgName"
          :state="validateState('orgName')"
          type="text"
          id="inputOrgName"
          class="form-control mb-2"
          placeholder="Organization"
          autofocus
        />
        <b-form-invalid-feedback id="inputOrgName-feedback">Enter the organization name (required)</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="inputFirstNameGroup" label-for="inputFirstName">
        <b-form-input
          v-model="firstName"
          :state="validateState('firstName')"
          type="text"
          id="inputFirstName"
          class="form-control mb-2"
          placeholder="First Name"
          autofocus
        />
        <b-form-invalid-feedback id="inputFirstName-feedback">Enter your first name (required)</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="inputLastNameGroup" label-for="inputLastName">
        <b-form-input
          v-model="lastName"
          :state="validateState('lastName')"
          type="text"
          id="inputLastName"
          class="form-control mb-2"
          placeholder="Last Name"
          autofocus
        />
        <b-form-invalid-feedback id="inputLastName-feedback">Enter your last name (required)</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="inputEmailGroup" label-for="inputEmail">
        <b-form-input
          v-model="email"
          :state="validateState('email')"
          type="email"
          id="inputEmail"
          class="form-control mb-2"
          placeholder="Email address"
          autofocus
        />
        <b-form-invalid-feedback id="inputEmail-feedback">Enter a valid e-mail address (required)</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="inputPasswordGroup" label-for="inputPassword">
        <b-form-input
          v-model="password"
          :state="validateState('password')"
          type="password"
          id="inputPassword"
          class="form-control mb-2"
          placeholder="Password"
        />
        <b-form-invalid-feedback
          id="inputPassword-feedback"
        >Enter a valid password longer than 6 characters (required)</b-form-invalid-feedback>
      </b-form-group>

      <b-form-group id="inputPassword2Group" label-for="inputPassword2">
        <b-form-input
          v-model="password2"
          :state="validateState('password2')"
          type="password"
          id="inputPassword2"
          class="form-control mb-2"
          placeholder="Confirm Password"
        />
        <b-form-invalid-feedback id="inputPassword2-feedback">Passwords do not match!</b-form-invalid-feedback>
      </b-form-group>

      <b-button type="submit" variant="dark" class="btn-block">Register</b-button>

      <b-form-group class="mt-4 text-center">
        <b-link :to="'login'" class="text-muted">Already have an account?</b-link>
      </b-form-group>
      <b-form-group class="mt-0 text-center">
        <b-link :to="'/register'" class="text-muted">User Registration</b-link>
      </b-form-group>
      <b-form-group class="mt-0 text-center">
        <b-link :to="'/'" class="text-muted">Go Back to Homepage</b-link>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { validationMixin } from "vuelidate";
import { required, minLength, sameAs, email } from "vuelidate/lib/validators";

export default {
  mixins: [validationMixin],
  data() {
    return {
      orgName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: null,
      errorToastOptions: {
        duration: 5000,
        position: "bottom-center",
        icon: "exclamation-circle",
        iconPack: "fontawesome"
      }
    };
  },
  validations: {
    orgName: {
      required,
      minLength: minLength(3)
    },
    firstName: {
      required,
      minLength: minLength(3)
    },
    lastName: {
      required,
      minLength: minLength(3)
    },
    email: {
      required,
      email: email()
    },
    password: {
      required,
      minLength: minLength(6)
    },
    password2: {
      sameAsPassword: sameAs("password")
    }
  },
  methods: {
    ...mapActions(["registerProvider"]),
    validateState(name) {
      const { $dirty, $error } = this.$v[name];
      return $dirty ? !$error : null;
    },
    onSubmit(e) {
      e.preventDefault();

      this.$v.$touch();
      if (this.$v.$anyError) {
        return;
      }
      if (!this.orgName)
        this.$toasted.error("Enter Organization Name", this.errorToastOptions);
      if (!this.firstName)
        this.$toasted.error("Enter First Name", this.errorToastOptions);
      if (!this.lastName)
        this.$toasted.error("Enter Last Name", this.errorToastOptions);
      if (!this.email)
        this.$toasted.error("Enter E-Mail Address", this.errorToastOptions);
      if (!this.password)
        this.$toasted.error("Enter Password", this.errorToastOptions);
      if (!this.password2)
        this.$toasted.error("Confirm Password", this.errorToastOptions);
      if (this.password !== this.password2)
        this.$toasted.error("Passwords do not match", this.errorToastOptions);
      if (
        this.orgName &&
        this.firstName &&
        this.lastName &&
        this.email &&
        this.password &&
        this.password2 &&
        this.password === this.password2
      ) {
        this.registerProvider({
          email: this.email,
          orgName: this.orgName,
          firstName: this.firstName,
          lastName: this.lastName,
          password: this.password
        }).then(() => {
          if (this.user.profile.uid) {
            this.$router.push("/feed");
          }
        });
      }
    }
  },
  computed: {
    ...mapState(["user"])
  },
  created() {
    if (this.user.profile.uid) this.$router.push("/feed");
  }
};
</script>

<style lang="scss" scoped>
#register-formdiv {
  height: 120vh;
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

.form-register {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-register .checkbox {
  font-weight: 400;
}
.form-register .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-register .form-control:focus {
  z-index: 2;
}
.form-register input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-register input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
