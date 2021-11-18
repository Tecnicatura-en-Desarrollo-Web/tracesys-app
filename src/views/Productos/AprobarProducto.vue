<template>
  <ion-page>
    <header-layout titulo-pagina="Presupuesto estimado" enlace-pagina-anterior="`/lista-productos/{{producto.codigo}}`">
      <ion-grid>
        <ion-row>
          <ion-col size="4"> Producto: </ion-col>
          <ion-col>{{ producto.tipo }} {{ producto.marca }}</ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="4"> Estado: </ion-col>
          <ion-col> Pendiente de aprobación </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="4"> Reparación a realizar: </ion-col>
          <ion-col>{{ sugerencia.nombre_sugerencia }}</ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="4"> Presupuesto: </ion-col>
          <ion-col> $ {{ presupuesto.monto }} </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="4">Comentario:</ion-col>
          <ion-col> {{ sugerencia.descripcion_sugerencia }} </ion-col>
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
    </header-layout>
  </ion-page>
</template>

<script>
import {
  IonCol,
  IonGrid,
  IonRow,
  IonPage,
  IonButton,
  alertController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import axios from "axios";
import { mapGetters } from "vuex";
import HeaderLayout from "@/components/layout/HeaderLayout.vue";
export default defineComponent({
  components: {
    IonCol,
    IonGrid,
    IonRow,
    IonPage,
    IonButton,
    HeaderLayout,
  },
  data() {
    return {
      presupuesto: [],
      producto: [],
      informe: [],
      sugerencia: [],
    };
  },
  computed: {
    ...mapGetters("auth", {
      authData: "getAuthData",
    }),
  },
  created() {
    let data = new FormData();
    data.append("id_producto", this.$route.params.id);
    data.append("id_cliente", this.authData.userId);
    axios
      .post(`http://localhost:8765/api/budgets/presupuesto`, data, {
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
        let datoPresupuesto = new FormData();
        datoPresupuesto.append('idInforme',this.informe.report_id);
        datoPresupuesto.append('decision','rechazado');
        axios
          .post(`http://localhost:8765/api/Informeempleadoestados/decisionPresupuesto`, datoPresupuesto, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log("Error: " + error);
          });
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
        buttons: ["OK"],
      });
      let datoPresupuesto = new FormData();
        datoPresupuesto.append('idInforme',this.informe.report_id);
        datoPresupuesto.append('decision','aprobado');
        axios
          .post(`http://localhost:8765/api/Informeempleadoestados/decisionPresupuesto`, datoPresupuesto, {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log("Error: " + error);
          });
      await cartelAcepta.present();
    },
  },
});
</script>
