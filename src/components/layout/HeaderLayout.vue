<template>
  <ion-app>
    <ion-page >
      <menu-layout></menu-layout>
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button id="menuOpciones">
              <ion-icon :src="menuSharp"></ion-icon>
            </ion-menu-button>
          </ion-buttons>
          <ion-title>
            {{ tituloPagina }}
          </ion-title>
          <ion-buttons slot="end">
            <ion-back-button :default-href="enlacePaginaAnterior">
            </ion-back-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content color="light" class="ion-padding">
        <slot />
      </ion-content>
      <!-- <ion-footer> -->
        <footer-layout></footer-layout>
      <!-- </ion-footer> -->
    </ion-page>
  </ion-app>
</template>
<script>
import {
  IonApp,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonBackButton,
  IonTitle,
  IonContent,
  IonIcon,
  // IonFooter,
} from "@ionic/vue";
import { defineComponent } from "@vue/runtime-core";
import { menuSharp } from "ionicons/icons";
import MenuLayout from "@/components/layout/MenuLayout.vue";
import FooterLayout from "@/components/layout/FooterLayout.vue";
export default defineComponent({
  props: ["tituloPagina", "enlacePaginaAnterior"],
  components: {
    IonApp,
    IonPage,
    IonHeader,
    IonTitle,
    IonButtons,
    IonMenuButton,
    IonBackButton,
    IonToolbar,
    IonContent,
    IonIcon,
    MenuLayout,
    FooterLayout,
    // IonFooter,
  },
  data() {
    return {
      menuSharp,
    };
  },
});
</script>
<style>
ion-icon,
ion-back-button {
  color: blue;
}
</style>
