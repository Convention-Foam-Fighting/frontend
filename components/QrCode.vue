<template>
  <img :src="qrcode" alt="qr code" />
</template>

<script>
import * as qrcode from "qrcode";

export default {
  props: {
    waiver: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  asyncComputed: {
    qrcode() {
      return qrcode.toDataURL(JSON.stringify(this.waiver));
    }
  }
};
</script>
