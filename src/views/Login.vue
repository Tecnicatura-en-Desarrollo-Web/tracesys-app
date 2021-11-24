<template>
  <ion-app>
    <ion-page>
      <ion-toolbar color="light" class="ion-padding">
        <ion-title>
          <ion-img :src="`/img/logoTracesysyChiquito.png`" id="idImg">
          </ion-img>
        </ion-title>
      </ion-toolbar>
      <ion-content class="ion-padding" color="light">
        <ion-card class="ion-padding">
          <ion-card-content>
            <ion-item>
              <ion-label position="floating">Usuario:</ion-label>
              <ion-input
                v-model="usuario.email"
                type="text"
                placeholder="Usuario"
                @change="validarUsuario()"
              ></ion-input>
            </ion-item>
            <ion-item>
              <ion-label position="floating">Contraseña:</ion-label>
              <ion-input
                type="password"
                v-model="usuario.contrasena"
                placeholder="Contraseña"
              ></ion-input>
            </ion-item>
            <ion-button id="botonLogin" shape="round" @click="iniciarSesion()">
              Ingresar
            </ion-button>
          </ion-card-content>
        </ion-card>
      </ion-content>
    </ion-page>
  </ion-app>
</template>
<style>
#idImg {
  margin-left: auto;
  margin-right: auto;
  max-width: 65%;
}
ion-button {
  --background: #6d9886;
}
</style>
<script>
import {
  IonApp,
  IonPage,
  IonToolbar,
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
        alias: "",
        contrasena: "",
      },
      datosValidos: false,
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
    async validarUsuario() {
      if (this.usuario.email.includes("@")) {
        // ingresa al if si es que el cliente ingresa un arroba, quiere decir que ingresa por correo
        // var er = new RegExp(`[a-zA-Z0-9_-]([\\.]?[a-zA-Z0-9_-])+@[a-zA-Z0-9]([^@\\//()=?¿!.,:;]|\\d)+[a-zA-Z0-9][\\.][a-zA-Z]{2,4}([\\.][a-zA-Z]{2,5})?`);
        if (
          !this.usuario.email.match(
            /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+){1,4}$/
          )
        ) {
          //verificamos si el correo es valido antes de enviar al backend
          this.datosValidos = false;
          const correoInvalido = await alertController.create({
            cssClass: "my-custom-class",
            header: "Correo no valido!",
            animated: true,
            buttons: ["OK"],
          });
          await correoInvalido.present();
        } else {
          //es cuando el usuario ingresa un correo valido
          this.datosValidos = true;
        }
      } else {
        //cuando no encuentra un arroba, se toma en cuenta que el usuario quiere ingresar por su alias
        this.datosValidos = true;
        this.usuario.alias = this.usuario.email;
      }
    },
    async iniciarSesion() {
      const cargando = await loadingController.create({
        cssClass: "my-custom-class",
        message: "Cargando...",
        duration: this.timeout,
      });
      await cargando.present();
      console.log(this.usuario,this.datosValidos)
      if (this.usuario.email && this.usuario.contrasena) {
        if (this.datosValidos) {
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
          const datosIncorrectos = await alertController.create({
            cssClass: "my-custom-class",
            header: "Datos incorrectos!",
            animated: true,
            message: "Verifique su usuario/email",
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
