<template>
  <section class="section">
    <b-field grouped group-multiline>
      <label class="title is-2">
        Total Checkin Counts
      </label>
      <b-input
        v-model="search"
        type="search"
        icon="magnify"
        size="is-medium"
        custom-class="is-primary"
        placeholder="Search..."
        @input.native="loadTotals(true)"
        rounded
      />
    </b-field>
    <b-table :data="counts" :columns="columns" />
  </section>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      columns: [
        { label: "Date", field: "date" },
        { label: "Count", field: "count" }
      ],
      search: "",
      totals: []
    };
  },
  methods: {
    async loadTotals(ignoreTimeout = false) {
      try {
        const url = new URL(`${this.$config.serverUrl}/checkin`);
        url.search = new URLSearchParams({ search: this.search }).toString();

        const res = await fetch(url.toString(), {
          method: "GET",
          mode: "cors"
        });

        console.log(res);

        if (res.ok) {
          const { totals } = await res.json();
          this.totals = totals;
        }
      } catch (e) {
        console.log(e);
      }

      if (!ignoreTimeout) {
        this.timer = setTimeout(this.loadTotals, 10000);
      }
    }
  },
  created() {
    if (process.client) {
      this.loadTotals();
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
