<template>
  <ion-footer>
    <ion-toolbar>
      <ion-title>
          <ion-img :src="`/img/logoTracesysyChiquito.png`" id="imgFooter">
          </ion-img>
      </ion-title>
    </ion-toolbar>
  </ion-footer>
</template>
<style>
ion-footer {
  height: 10%;
}
#imgFooter {
  margin-left: auto;
  margin-right: auto;
  max-width: 65%;
}
</style>
<script>
import { IonFooter, IonToolbar, IonTitle, IonImg } from "@ionic/vue";

export default {
  components: {
    IonFooter,
    IonTitle,
    IonToolbar,
    IonImg,
  },
  data() {
    return {};
  },
};
</script>
