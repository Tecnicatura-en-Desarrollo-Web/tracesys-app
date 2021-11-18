<template>
  <ion-app>
    <ion-page>
      <ion-header class="ion-padding">
        <ion-toolbar>
          <ion-title>
            <ion-img :src="`/img/logoTracesysyChiquito.png`"> </ion-img>
          </ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding" color="light">
        <ion-card class="ion-padding">
          <ion-card-content>
            <ion-item>
              <ion-label position="floating">Usuario:</ion-label>
              <ion-input v-model="usuario.email"></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Contraseña:</ion-label>
              <ion-input
                type="password"
                v-model="usuario.contrasena"
              ></ion-input>
            </ion-item>
            <ion-button
              id="botonLogin"
              shape="round"
              color="primary"
              @click="iniciarSesion()"
            >
              Ingresar
            </ion-button>
          </ion-card-content>
        </ion-card>
      </ion-content>
    </ion-page>
  </ion-app>
</template>
<script>
import {
  IonApp,
  IonPage,
  IonToolbar,
  IonHeader,
  IonTitle,
  IonContent,
  IonImg,
  IonCard,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonCardContent,
  alertController,
  loadingController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
export default defineComponent({
  components: {
    IonApp,
    IonPage,
    IonToolbar,
    IonHeader,
    IonTitle,
    IonContent,
    IonImg,
    IonCard,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonCardContent,
  },
  data() {
    return {
      usuario: {
        email: "",
        contrasena: "",
      },
      timeout: {
        type: Number,
        default: 5000,
      },
    };
  },
  computed: {
    ...mapGetters("auth", {
      loginStatus: "getLoginStatus",
    }),
  },
  methods: {
    ...mapActions("auth", {
      loginUser: "loginUser",
    }),
    async iniciarSesion() {
      const cargando = await loadingController.create({
        cssClass: "my-custom-class",
        message: "Cargando...",
        duration: this.timeout,
      });
      await cargando.present();
      if (this.usuario.email && this.usuario.contrasena) {
        await this.loginUser(this.usuario);
        if (this.loginStatus === "success") {
          window.location.href = "http://localhost:8100/lista-productos";
        } else {
          const datosIncorrectos = await alertController.create({
            cssClass: "my-custom-class",
            header: "Datos incorrectos!",
            animated: true,
            message: "Verifique los datos ingresados",
            buttons: ["OK"],
          });
          cargando.dismiss();
          await datosIncorrectos.present();
        }
      } else {
        const camposInvalidos = await alertController.create({
          cssClass: "my-custom-class",
          header: "Datos vacíos",
          animated: true,
          subHeader: "Campos vacíos",
          message: "Debe ingresar su correo y contraseña",
          buttons: ["OK"],
        });
        cargando.dismiss();
        await camposInvalidos.present();
      }
    },
  },
});
</script>
