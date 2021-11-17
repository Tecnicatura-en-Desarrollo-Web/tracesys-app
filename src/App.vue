<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  components: {
    IonApp,
    IonRouterOutlet,
  },
});
</script>
<style>
#botonLogin {
  float: right;
  margin-top: 20%;
}

.my-custom-class {
  background-color: rgba(0, 0, 0, 0.8);
}

.my-custom-class .alert-wrapper .alert-message {
  color: black;
}
</style>
