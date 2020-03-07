<template>
  <div class="content">
    <form @submit.prevent="submit()">
      <b-field grouped group-multiline>
        <b-field label="First Name" expanded>
          <b-input
            v-model.trim="firstName"
            @change.native="checkWaiver()"
            required
          />
        </b-field>
        <b-field label="Last Name" expanded>
          <b-input v-model.trim="lastName" @change.native="checkWaiver()" required />
        </b-field>
      </b-field>

      <b-field grouped group-multiline>
        <b-field label.trim="Email" expanded>
          <b-input
            v-model.lazy.trim="email"
            @input.native="checkWaiver()"
            type="email"
            required
          />
        </b-field>
        <b-field label="Date of Birth" expanded>
          <b-datepicker
            v-model="birthday"
            placeholder="Click to select..."
            editable
            required
          />
        </b-field>
      </b-field>

      <div v-if="!adult && birthday !== undefined">
        <div class="notification is-danger">
          <strong>
            Parent or guardian is required to complete this waiver.
          </strong>
        </div>

        <h4 class="title is-4">Parent or Guardian</h4>
        <b-field grouped group-multiline>
          <b-field label="First Name" expanded>
            <b-input v-model="parent.firstName" required />
          </b-field>
          <b-field label="Last Name" expanded>
            <b-input v-model="parent.lastName" required />
          </b-field>
        </b-field>

        <b-field label="Email" expanded>
          <b-input v-model="parent.email" type="email" required />
        </b-field>
      </div>

      <button class="button is-primary" type="submit">
        Terms & Agreements
      </button>
    </form>
  </div>
</template>

<script>
import { alpha, email, required } from "vuelidate/lib/validators";

export default {
  props: {
    setWaiver: {
      type: Function,
      default() {}
    },
    next: {
      type: Function,
      default() {}
    }
  },
  data() {
    return {
      email: undefined,
      firstName: undefined,
      lastName: undefined,
      birthday: undefined,
      parent: {
        email: undefined,
        firstName: undefined,
        lastName: undefined
      }
    };
  },
  computed: {
    adult() {
      const birthday = new Date(this.birthday);
      const today = new Date();
      const eighteenYears = 1000 * 3600 * 24 * 365 * 18;
      return today - birthday > eighteenYears;
    }
  },
  validations: {
    birthday: {
      required
    },
    email: {
      email,
      required
    },
    firstName: {
      alpha,
      required
    },
    lastName: {
      alpha,
      required
    },
    parent: {
      email: {
        email,
        required: required(() => {
          return !this.adult;
        })
      },
      firstName: {
        required: required(() => {
          return !this.adult;
        })
      },
      lastName: {
        required: required(() => {
          return !this.adult;
        })
      },
      required: required(() => {
        return !this.adult;
      })
    }
  },
  methods: {
    async checkWaiver() {
      const { firstName, lastName, email, $v } = this;
      if (
        firstName &&
        lastName &&
        email &&
        !$v.firstName.$invalid &&
        !$v.lastName.$invalid &&
        !$v.email.$invalid
      ) {
        const url = new URL(`${this.$config.serverUrl}/waivers/check`);
        url.search = new URLSearchParams({
          firstName,
          lastName,
          email
        }).toString();

        const res = await fetch(url.toString(), { mode: "cors" });
        if (res.ok) {
          const json = await res.json();
          if (json.length > 0) {
            json[0].accept = true;
            json[0].signature = true;
            this.setWaiver(json[0]);
            this.next({ step: 3 });
          }
        }
      }
    },
    submit() {
      const { adult, birthday, email, firstName, lastName, parent } = this;

      if (!this.$v.$invalid) {
        this.setWaiver({
          adult,
          birthday,
          email,
          firstName,
          lastName,
          parent
        });
        this.next({});
      }
    }
  }
};
</script>

<style scoped>
button[type="submit"] {
  margin-top: 1rem;
}

.notification {
  margin-top: 1.5rem;
}

.switch input[type="checkbox"] + .check {
  background: #ff3860 !important;
}

.switch:hover input[type="checkbox"] + .check {
  background: #ff3860 !important;
}

@media only screen and (max-width: 499px) {
  button[type="submit"] {
    width: 100%;
  }

  .field.is-grouped .field:not(:last-child) {
    margin-right: 0;
  }

  .field.is-grouped .field {
    margin-bottom: 0.5rem;
  }
}
</style>
