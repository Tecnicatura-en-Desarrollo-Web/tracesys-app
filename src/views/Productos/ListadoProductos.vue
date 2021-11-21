<template>
  <ion-page>
    <header-layout titulo-pagina="Lista de Productos">
          <ion-grid>
            <ion-row class="ion-align-items-center ion-text-center">
              <ion-col size="1"> # </ion-col>
              <ion-col> Fecha </ion-col>
              <ion-col> Producto </ion-col>
              <ion-col size="2"> Ver </ion-col>
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
                >
                  <ion-icon
                    :src="addCircleOutline"
                    size="large"
                    class="btnVer"
                  ></ion-icon>
                </router-link>
              </ion-col>
            </ion-row>
          </ion-grid>
    </header-layout>
  </ion-page>
</template>
<script>
import {
  IonPage,
  IonCol,
  IonGrid,
  IonRow,
  IonIcon,
} from "@ionic/vue";
import { defineComponent } from "vue";
import axios from "axios";
import { mapGetters } from "vuex";
import { addCircleOutline } from "ionicons/icons";
import HeaderLayout from "@/components/layout/HeaderLayout.vue";
export default defineComponent({
  components: {
    IonPage,
    IonCol,
    IonGrid,
    IonRow,
    HeaderLayout,
    IonIcon,
  },
  data() {
    return {
      addCircleOutline,
      productos: [],
    };
  },
  computed: {
    ...mapGetters("auth", {
      authData: "getAuthData",
    }),
  },
  created() {
    let data = new FormData();
    data.append("idCliente", this.authData.userId);
    axios
      .post("http://localhost:8765/api/products/productsClient", data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then((response) => {
        this.productos = response.data;
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  },
});
</script>
