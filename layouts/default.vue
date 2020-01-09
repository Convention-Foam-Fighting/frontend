<template>
  <section class="section">
    <Nav />
    <nuxt ref="page" />
  </section>
</template>

<script>
import Nav from "~/components/Nav.vue";

export default {
  components: {
    Nav
  }
};
</script>
