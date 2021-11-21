<template>
  <ion-footer>
    <ion-toolbar>
      <ion-title>
        <ion-img
          :src="`/img/logoTracesysyChiquito.png`"
          id="imgFooter"
          :alt="`Logo tracesys`"
        >
        </ion-img>
      </ion-title>
    </ion-toolbar>
  </ion-footer>
</template>
<style>
#imgFooter {
  padding: 2%;
  margin-left: auto;
  margin-right: auto;
  max-width: 40%;
  border-radius: 15px;
  background: #f4f5f8;
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
};
</script>
