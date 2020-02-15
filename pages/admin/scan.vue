<template>
  <section class="section">
    <h2 class="title is-2">
      Scan Code Below
    </h2>
    <div v-if="!result.email" class="reader">
      <qrcode-stream @decode="onDecode" @init="onInit"></qrcode-stream>
    </div>
    <div v-if="result.email">
      <p><b>Name:</b> {{ result.firstName }} {{ result.lastName }}</p>
      <p :class="{ red: !isOver18(result.birthday) }">
        <b>Over 18:</b> {{ isOver18(result.birthday) }}
      </p>
      <p><b>D.O.B:</b> {{ result.birthday.slice(0, 10) }}</p>
      <p><b>Accepted Agreements:</b> {{ result.accept }}</p>
      <p><b>Data Valid On Server:</b> {{ isValidData }}</p>
      <br />
      <button @click="newScan()" class="button is-primary">
        New Scan
      </button>
    </div>
  </section>
</template>

<script>
import { QrcodeStream } from "vue-qrcode-reader";
export default {
  layout: "admin",
  components: {
    QrcodeStream
  },
  data() {
    return {
      server: {},
      result: {},
      error: ""
    };
  },
  computed: {
    isValidData() {
      return this.result.email === this.server.email;
    }
  },
  methods: {
    onDecode(code) {
      this.result = JSON.parse(code);
      this.fetchServerData(this.result.email);
    },
    newScan() {
      this.result = {};
      this.server = {};
    },
    isOver18(birthday = "") {
      console.log(birthday.slice(0, 10));
      const now = new Date();
      const dob = new Date(birthday.slice(0, 10));
      console.log(dob);
      return now - dob > 180000;
    },
    async fetchServerData(result) {
      try {
        const url = new URL(`${this.$config.serverUrl}/waivers`);
        url.search = new URLSearchParams({ search: result.email }).toString();

        const res = await fetch(url.toString(), {
          method: "GET",
          mode: "cors"
        });

        if (res.ok) {
          const { waivers } = await res.json();
          this.server = waivers[0] || undefined;
        }
      } catch (e) {
        console.log(e);
      }
    },
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permisson";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        }
        console.log("error:", this.error);
      }
    }
  }
};
</script>

<style scoped>
.section {
  padding-top: 0;
}
.reader {
  width: 400px;
  height: 400px;
}
.red {
  color: red;
  font-weight: bold;
}
</style>
