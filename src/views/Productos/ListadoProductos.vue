<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="ion-text-center">Listado de productos</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row class="ion-align-items-center ion-text-center">
          <ion-col size="1">
            #
          </ion-col>
          <ion-col>
            Fecha
          </ion-col>
          <ion-col>
            Producto
          </ion-col>
          <ion-col size="2">
            Ver
          </ion-col>
        </ion-row>
        <ion-row
          class="ion-align-items-center ion-text-center"
          v-for="producto in productos"
          :key="producto.product_id"
        >
          <ion-col size="1">
            {{ producto.codigo }}
          </ion-col>
          <ion-col>
            {{ producto.fecha }}
          </ion-col>
          <ion-col>
            {{ producto.nombre }}
          </ion-col>
          <ion-col size="2">
            <router-link
              :to="{ path: `/lista-productos/${producto.codigo}` }"
              class="item"
              title="View"
              >+</router-link
            >
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
  IonPage,
  IonHeader,
  IonTitle,
  IonContent,
  IonToolbar,
} from "@ionic/vue";
import { defineComponent } from "vue";
import axios from "axios";
import { mapGetters } from "vuex";
export default defineComponent({
  components: {
    IonCol,
    IonGrid,
    IonRow,
    IonPage,
    IonHeader,
    IonTitle,
    IonContent,
    IonToolbar,
  },
  data() {
    return {
      productos: [],
    };
  },
  computed: {
    ...mapGetters("auth", {
      authData: "getAuthData",
    }),
  },
  mounted() {
    let data = new FormData();
    data.append("idCliente", this.authData.userId);
    axios
      .post("http://localhost:8765/api/products/productsClient", data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((response) => {
        // console.log(response.data);
        this.productos = response.data;
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  },
});
</script>
