<template>
  <div class="section">
    <b-table :data="waivers" :columns="columns" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      waivers: [],
      columns: [
        { label: "id", field: "waiverId" },
        { label: "First", field: "firstName" },
        { label: "Last", field: "lastName" },
        { label: "Email", field: "email" },
        { label: "D.O.B.", field: "birthday" }
      ]
    };
  },
  methods: {
    async loadWaivers() {
      try {
        const res = await fetch(`${this.$config.serverUrl}/waivers`);
        if (res.ok) {
          const { waivers } = await res.json();
          this.waivers = waivers;
        }
      } catch (e) {}

      setTimeout(this.loadWaivers, 10000);
    }
  },
  created() {
    this.loadWaivers();
  }
};
</script>
