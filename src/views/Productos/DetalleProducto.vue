<template>
  <ion-page>
    <header-layout
      titulo-pagina="Detalles del seguimiento"
      enlace-pagina-anterior="/lista-productos"
    >
      <ion-grid>
        <ion-row>
          <ion-col>Producto:</ion-col>
          <ion-col>{{ producto.nombre }}</ion-col>
        </ion-row>
        <ion-row>
          <ion-col>Motivo de reparación:</ion-col>
          <ion-col>{{ producto.motivo }}</ion-col>
        </ion-row>
        <ion-row>
          <ion-col>Código de operación:</ion-col>
          <ion-col>{{ producto.codigo }}</ion-col>
        </ion-row>
        <ion-row>
          <ion-col>Fecha</ion-col>
          <ion-col>{{ producto.fecha }}</ion-col>
        </ion-row>
        <ion-row>
          <ion-col>Hora</ion-col>
          <ion-col>{{ producto.hora }}</ion-col>
        </ion-row>
        <ion-row>
          <ion-col>Estado</ion-col>
          <ion-col>{{ producto.estado }}</ion-col>
        </ion-row>
        <ion-row>
          <ion-col v-if="botonPresupuesto">
            <router-link
              :to="{ path: `/lista-productos/${producto.codigo}/aprobar` }"
              class="item"
              title="View"
            >
              <ion-button>Presupuesto</ion-button>
            </router-link>
          </ion-col>
        </ion-row>
      </ion-grid>
    </header-layout>
  </ion-page>
</template>

<script>
import { IonCol, IonGrid, IonRow, IonPage, IonButton } from "@ionic/vue";
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
      botonPresupuesto: false,
      id_producto: null,
      producto: [],
    };
  },
  computed: {
    ...mapGetters("auth", {
      authData: "getAuthData",
    }),
  },
  created() {
    let data = new FormData();
    data.append("id_product", this.$route.params.id);
    data.append("id_client", this.authData.userId);
    axios
      .post(
        `http://localhost:8765/api/informeempleadoestados/verInforme`,
        data,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((response) => {
        this.producto = response.data.product;
        if(this.producto.estado=='Aprobacion cliente'){
          this.botonPresupuesto=true;
        }
      })
      .catch((error) => {
        console.log("Error: " + error);
      });
  },
});
</script>
