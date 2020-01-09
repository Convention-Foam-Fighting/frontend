<template>
  <b-navbar transparent fixed-top>
    <template slot="brand">
      <b-navbar-item :to="{ path: '/' }" tag="nuxt-link">
        <h4 class="title is-4">
          <a href="/">Convention Foam Fighting</a>
        </h4>
      </b-navbar-item>
    </template>
    <template slot="end">
      <b-navbar-item>
        <a href="/waiver">
          <b-button type="is-primary">
            New Waiver
          </b-button>
        </a>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
export default {
  name: "Nav"
};
</script>

<style scoped></style>
