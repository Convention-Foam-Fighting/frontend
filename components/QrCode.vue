<template>
  <img :src="code" alt="qr code" />
</template>

<script>
import * as QRCode from "qrcode";

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
    async code() {
      const code = await QRCode.toDataURL(JSON.stringify(this.waiver));
      return code;
    }
  }
};
</script>
