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
          <ion-col>{{producto.tipo}} {{producto.marca}}</ion-col>
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
          <ion-col>{{sugerencia.nombre_sugerencia}}</ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="4">
            Presupuesto:
          </ion-col>
          <ion-col>
            $ {{presupuesto.monto}}
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="4">
            Comentario:
          </ion-col>
          <ion-col>
            {{sugerencia.descripcion_sugerencia}}
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <a @click="cartelRechazado()">
              <ion-button color="danger">
                Rechazar
              </ion-button>
            </a>
          </ion-col>
          <ion-col>
            <a @click="cartelAceptado()">
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
      data: {
        id_cliente: "3"
      },
      presupuesto: [],
      producto:[],
      informe:[],
      sugerencia:[]
    };
  },
  mounted() {
    const formData = new FormData();
    formData.append('id_producto',this.$route.params.id);
    formData.append('id_cliente',this.data.id_cliente);
    axios
      .post(`http://localhost:8765/api/budgets/presupuesto`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((response) => {
        this.presupuesto = response.data.budget;
        this.informe = response.data.budget.report;
        this.producto = response.data.budget.report.product;
        this.sugerencia = response.data.suggestion.suggestion;
        // console.log(this.presupuesto,this.informe,this.producto);
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  },
  methods: {
    async cartelRechazado() {
      const cartelRechaza = await alertController.create({
        cssClass: "my-custom-class",
        header: "Rechazar",
        subHeader: "Estas seguro de rechazar?",
        message:
          "No podrá revertir la decisión si rechaza el <br>presupuesto presentado por la empresa.",
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
          message: "Retire su producto de forma inmediata<br>sino sera NUESTRA",
          buttons: ["OK"],
        });
        await avisoRechazo.present();
      }
    },
    async cartelAceptado() {
      const cartelAcepta = await alertController.create({
        cssClass: "my-custom-class",
        header: "Gracias por confiar en nosotros!",
        subHeader: "Estaremos en contacto",
        message:
          "De manera inmediata entrara en reparación su producto!<br>No dude en escribirnos por el chat :D<br>",
        buttons: ["OK"]
      });
      await cartelAcepta.present();
    },
  },
});
</script>
