<template>
  <section class="section">
    <b-field grouped group-multiline>
      <label class="title is-2">
        Signed Waivers
      </label>
      <b-input
        v-model="search"
        type="search"
        icon="magnify"
        size="is-medium"
        custom-class="is-primary"
        placeholder="Search..."
        @input.native="loadWaivers(true)"
        rounded
      />
    </b-field>
    <b-table :data="waivers" :columns="columns" />
  </section>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      columns: [
        { label: "ID", field: "waiverId" },
        { label: "First", field: "firstName" },
        { label: "Last", field: "lastName" },
        { label: "Email", field: "email" },
        { label: "D.O.B.", field: "birthday" }
      ],
      search: "",
      waivers: []
    };
  },
  methods: {
    async loadWaivers(ignoreTimeout = false) {
      try {
        const url = new URL(`${this.$config.serverUrl}/waivers`);
        url.search = new URLSearchParams({ search: this.search }).toString();

        const res = await fetch(url.toString(), {
          method: "GET",
          mode: "cors"
        });

        console.log(res);

        if (res.ok) {
          const { waivers } = await res.json();
          this.waivers = waivers;
        }
      } catch (e) {
        console.log(e);
      }

      if (!ignoreTimeout) {
        this.timer = setTimeout(this.loadWaivers, 10000);
      }
    }
  },
  created() {
    if (process.client) {
      this.loadWaivers();
    }
  },
  destroyed() {
    clearTimeout(this.timer);
  }
};
</script>

<style scoped>
.section {
  padding-top: 0;
}

.field {
  padding-top: 0;
  margin-top: 0;
  justify-content: space-between;
}

.control {
  margin-left: 1rem;
  margin-top: 0.1rem;
}
</style>

<style>
tbody > tr:nth-child(even) {
  background: lavender;
}
</style>
