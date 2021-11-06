<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title class="ion-text-center">Iniciar sesión</ion-card-title>
    </ion-card-header>
    <ion-card-content>
      <ion-item>
        <ion-label position="floating">Usuario:</ion-label>
        <ion-input v-model="usuario.email"></ion-input>
      </ion-item>
      <ion-item>
        <ion-label position="floating">Contraseña:</ion-label>
        <ion-input type="password" v-model="usuario.contrasena"></ion-input>
      </ion-item>
      <br />
      <ion-button @click="iniciarSesion()">
        Ingresar
      </ion-button>
    </ion-card-content>
  </ion-card>
</template>

<script>
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonCardContent,
  alertController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { mapGetters, mapActions } from "vuex";
export default defineComponent({
  components: {
    IonCard,
    IonCardHeader,
    IonCardTitle,
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
      if (this.usuario.email && this.usuario.contrasena) {
        await this.loginUser(this.usuario);
        if (this.loginStatus === "success") {
          window.location.href = "http://localhost:8100/home";
        } else {
          const datosIncorrectos = await alertController.create({
            cssClass: "my-custom-class",
            header: "Datos incorrectos!",
            subHeader: "Verifique los datos ingresados",
            message:
              "Ante cualquier inconveniente lo esperamos en nuestra sucursal mas cercana",
            buttons: ["OK"],
          });
          await datosIncorrectos.present();
        }
      } else {
        const camposInvalidos = await alertController.create({
          cssClass: "my-custom-class",
          header: "Datos no validos!",
          subHeader: "Campos vacíos",
          message:
            "Debe ingresar su correo y contraseña",
          buttons: ["OK"],
        });
        await camposInvalidos.present();
      }
    },
  },
});
</script>
