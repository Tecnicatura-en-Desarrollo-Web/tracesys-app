<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="ion-text-center">Seguimiento del producto</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col>
            Producto:
          </ion-col>
          <ion-col>
            {{ producto.tipo }}
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            Motivo de reaparación:
          </ion-col>
          <ion-col>
            {{ producto.motivo }}
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            Código de operación:
          </ion-col>
          <ion-col>
            {{ producto.product_id }}
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="3">
            Fecha
          </ion-col>
          <ion-col size="3">
            Hora
          </ion-col>
          <ion-col>
            Estado
          </ion-col>
        </ion-row>
        <ion-row class="ion-align-items-center">
          <ion-col size="6">
            {{ producto.created }}
          </ion-col>
          <ion-col>
            En reparación
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            <router-link
              :to="{ path: `/lista-productos/${producto.product_id}/mensajes` }"
              class="item"
              title="View"
              ><ion-button>Mensajes</ion-button></router-link
            >
          </ion-col>
          <ion-col>
            <router-link
              :to="{ path: `/lista-productos/${producto.product_id}/aprobar` }"
              class="item"
              title="View"
            >
              <ion-button>
                Presupuesto
              </ion-button>
            </router-link>
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
});
</script>
