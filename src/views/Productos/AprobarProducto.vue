<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="ion-text-center">Aprobar presupuesto</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col size="4">
            Producto:
          </ion-col>
          <ion-col> {{ producto.tipo }} {{ producto.marca }} </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="4">
            Estado:
          </ion-col>
          <ion-col>
            Pendiente de aprobación
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="4">
            Reparación a realizar:
          </ion-col>
          <ion-col>
            {{ producto.motivo }}
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="4">
            Presupuesto:
          </ion-col>
          <ion-col>
            $1231321
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="4">
            Comentario:
          </ion-col>
          <ion-col>
            El nuevo repuesto es de marca "samsung" ya que es compatible con la
            motherboard de su netbook
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <a @click="cartelRechazado(producto.product_id)">
              <ion-button color="danger">
                Rechazar
              </ion-button>
            </a>
          </ion-col>
          <ion-col>
            <a @click="cartelAceptado(producto.product_id)">
              <ion-button color="success">
                Aceptar
              </ion-button>
            </a>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import {
  IonCol,
  IonGrid,
  IonRow,
  IonToolbar,
  IonTitle,
  IonPage,
  IonContent,
  IonHeader,
  IonButton,
  alertController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import axios from "axios";
export default defineComponent({
  components: {
    IonCol,
    IonGrid,
    IonRow,
    IonToolbar,
    IonContent,
    IonTitle,
    IonPage,
    IonHeader,
    IonButton,
  },
  data() {
    return {
      id_producto: null,
      producto: [],
    };
  },
  mounted() {
    this.id_producto = this.$route.params.id;
    axios
      .get(`http://localhost:8765/api/products/view/${this.id_producto}`, {
        headers: {
          "X-Requested-With": "XMLHttpRequest",
        },
      })
      .then((response) => {
        this.producto = response.data.product;
        console.log(response.data.product);
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  },
  methods: {
    async cartelRechazado(id_producto) {
      // $swal function calls SweetAlert into the application with the specified configuration.
      const cartelRechaza = await alertController.create({
        cssClass: "my-custom-class",
        header: "Rechazar",
        subHeader: "Estas seguro de rechazar?",
        message:
          "No podrá revertir la decisión si rechaza el <br>presupuesto presentado por la empresa." +
          id_producto,
        buttons: [
          {
            text: "Cancelar",
            role: "cancel",
            cssClass: "secondary",
          },
          {
            text: "Aceptar",
            role: "ok",
          },
        ],
      });
      await cartelRechaza.present();
      const { role } = await cartelRechaza.onDidDismiss();
      if (role == "ok") {
        const avisoRechazo = await alertController.create({
          cssClass: "my-custom-class",
          header: "Gracias por no pagar!",
          message: "Retire su producto de forma inmediata<br>sino sera nuetra",
          buttons: ["OK"],
        });
        await avisoRechazo.present();
      }
    },
    async cartelAceptado(id_producto) {
      // $swal function calls SweetAlert into the application with the specified configuration.
      const cartelAcepta = await alertController.create({
        cssClass: "my-custom-class",
        header: "Gracias por confiar en nosotros!",
        subHeader: "Estaremos en contacto",
        message:
          "De manera inmediata entrara en reparación su producto!<br>No dude en escribirnos por el chat :D<br>"+
          id_producto,
        buttons: ["OK"]
      });
      await cartelAcepta.present();
    },
  },
});
</script>
