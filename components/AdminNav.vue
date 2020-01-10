<template>
  <b-navbar transparent fixed-top>
    <template slot="brand">
      <b-navbar-item :to="{ path: '/admin' }" tag="nuxt-link">
        <h4 class="title is-4">
          Convention Foam Fighting
        </h4>
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item :to="{ path: '/admin/scan' }" tag="nuxt-link">
        <b-button type="is-primary">
          Scan Code
        </b-button>
      </b-navbar-item>
      <b-navbar-item :to="{ path: '/admin/waivers' }" tag="nuxt-link">
        <b-button type="is-primary">
          Waivers
        </b-button>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: "AdminNav"
};
</script>

<style scoped>
nav {
  background-color: lavender;
}
</style>
