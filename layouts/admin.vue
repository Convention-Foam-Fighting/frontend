<template>
  <section class="section">
    <AdminNav />
    <nuxt ref="page" />
  </section>
</template>

<script>
import AdminNav from "~/components/AdminNav.vue";

export default {
  components: {
    AdminNav
  }
};
</script>
