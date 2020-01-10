<template>
  <div class="container">
    <b-steps v-model="activeStep" :has-navigation="false">
      <b-step-item label="Waiver">
        <WaiverForm :setWaiver="setWaiver" :next="next" />
      </b-step-item>
      <b-step-item label="Terms & Agreements">
        <Terms />
        <b-button @click="next({})" class="title is-5 is-primary">
          Accept
        </b-button>
      </b-step-item>
      <b-step-item label="Sign & Accept">
        <b-field label="Sign Below">
          <div class="signature">
            <VueSignaturePad
              ref="signature"
              :options="{ onBegin }"
              width="100%"
              height="200px"
            />
          </div>
        </b-field>

        <b-field class="bottom">
          <label class="checkbox">
            <input v-model="waiver.accept" type="checkbox" required />
            I agree to the
            <a @click="next({ step: 3 })">terms and conditions</a>.
          </label>
        </b-field>

        <b-button @click="save" type="is-primary">Submit</b-button>
      </b-step-item>
      <b-step-item label="Confirmation">
        <QrCode :waiver="waiver" />
      </b-step-item>
    </b-steps>
  </div>
</template>

<script>
import QrCode from "~/components/QrCode.vue";
import Terms from "~/components/Terms.vue";
import WaiverForm from "~/components/WaiverForm.vue";

export default {
  components: {
    QrCode,
    Terms,
    WaiverForm
  },
  data() {
    return {
      activeStep: 0,
      waiver: {
        accept: undefined,
        signature: undefined
      }
    };
  },
  methods: {
    next({ step }) {
      if (step) {
        this.activeStep = step;
      } else {
        this.activeStep = this.activeStep + 1;
      }
    },
    onBegin() {
      this.$refs.signature.resizeCanvas();
    },
    async save() {
      console.log("Saving the waiver.");
      const { isEmpty, data: signature } = this.$refs.signature.saveSignature();
      if (!isEmpty && this.waiver.accept) {
        try {
          await this.sendWaiver(signature);
          this.next({});
        } catch (error) {
          console.error(error);
        }
      }
    },
    async sendWaiver(signature) {
      const options = {
        method: "post",
        mode: "cors",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ...this.waiver, signature })
      };

      const res = await fetch(`${this.$config.serverUrl}/waivers`, options);
      if (res.status >= 400 && res.status !== 409) {
        const json = await res.json();
        throw new Error(json);
      }
      return undefined;
    },
    setWaiver(waiver) {
      this.waiver = waiver;
    }
  }
};
</script>

<style scoped>
.signature {
  border: 2px solid #7957d5;
  border-radius: 25px;
}

.step-item {
  padding-top: 1.5rem;
}
.container {
  margin-top: 1rem;
}

@media only screen and (max-width: 499px) {
  .bottom {
    padding-top: 25vh;
  }

  .button {
    width: 100%;
  }

  .signature {
    height: 100px;
  }
}
</style>
