<template>
  <ion-app>
    <ion-page>
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
              <!--agregamos el boton de retroceso para navegabilidad
              ademas guardamos como variable la pagina anterior-->
          <ion-buttons slot="end">
            <ion-back-button :default-href="enlacePaginaAnterior">
            </ion-back-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-header>
      <ion-content color="light" class="ion-padding">
        <ion-card>
          <ion-card-content>
            <slot />
          </ion-card-content>
        </ion-card>
      </ion-content>
      <footer-layout></footer-layout>
    </ion-page>
  </ion-app>
</template>
<style>
ion-toolbar {
  --background: #212121;
  color: #fff;
}
ion-back-button,
ion-icon {
  color: #6d9886;
}
ion-row {
  border-bottom: 1px solid #dadada;
}
</style>
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
  IonCard,
  IonCardContent,
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
    IonCard,
    IonCardContent,
  },
  data() {
    return {
      menuSharp,
    };
  },
});
</script>