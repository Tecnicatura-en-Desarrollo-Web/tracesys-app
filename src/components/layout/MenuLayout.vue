<template>
  <ion-menu side="start" content-id="menuOpciones" class="ion-text-center">
    <ion-header>
      <ion-toolbar>
        <ion-title> Menu </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-router-link href="/">
          <ion-item>
            <ion-icon :src="notifications"> </ion-icon>
            <ion-label class="ion-margin"> Productos </ion-label>
          </ion-item>
        </ion-router-link>
        <ion-router-link href="#">
          <ion-item>
            <ion-icon :src="person"></ion-icon>
            <ion-label class="ion-margin"> Perfil </ion-label>
          </ion-item>
        </ion-router-link>
        <ion-router-link href="/login">
          <ion-item @click="cerrarSesion()">
            <ion-icon :src="logOut"></ion-icon>
            <ion-label class="ion-margin"> Cerrar sesion </ion-label>
          </ion-item>
        </ion-router-link>
      </ion-list>
    </ion-content>
    <ion-footer>
      <ion-toolbar class="ion-text-capitalize">
        <ion-icon :src="person"></ion-icon>
        Cliente: {{ authData.userName }}
      </ion-toolbar>
    </ion-footer>
  </ion-menu>
  <ion-router-outlet id="menuOpciones"></ion-router-outlet>
</template>

<script>
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonRouterOutlet,
  IonFooter,
} from "@ionic/vue";
import { defineComponent } from "@vue/runtime-core";
import { notifications, person, logOut } from "ionicons/icons";
import { mapActions, mapGetters } from "vuex";
export default defineComponent({
  props: ["tituloPagina", "enlacePaginaAnterior"],
  components: {
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonFooter,
    IonRouterOutlet,
  },
  data() {
    return {
      person,
      notifications,
      logOut,
    };
  },
  computed: {
    ...mapGetters("auth", {
      authData: "getAuthData",
    }),
  },
  methods: {
    ...mapActions("auth", {
      logout: "logoutUser",
    }),
    async cerrarSesion() {
      //borramos el access token, el cual es se lee para sacar la info del usuario logueado
      await this.logout();
    },
  },
});
</script>
