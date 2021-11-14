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
            {{ producto.nombre }}
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            Motivo de reparación:
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
            {{ producto.codigo }}
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            Fecha
          </ion-col>
          <ion-col>
            {{ producto.fecha }}
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            Hora
          </ion-col>
          <ion-col>
            {{ producto.hora }}
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col>
            Estado
          </ion-col>
          <ion-col>
            {{producto.estado}}
          </ion-col>
        </ion-row>
        <ion-row>
          <!-- <ion-col>
            <router-link
              :to="{ path: `/lista-productos/${producto.codigo}/mensajes` }"
              class="item"
              title="View"
              ><ion-button>Mensajes</ion-button></router-link
            >
          </ion-col> -->
          <ion-col v-if="botonPresupuesto">
            <router-link
              :to="{ path: `/lista-productos/${producto.codigo}/aprobar` }"
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
import { mapGetters } from "vuex";
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
      botonPresupuesto:false,
      id_producto: null,
      producto: [],
    };
  },
  computed: {
    ...mapGetters("auth", {
      authData: "getAuthData",
    }),
  },
  mounted() {
    let data = new FormData();
    data.append('id_product',this.$route.params.id);
    data.append('id_client',this.authData.userId);
    axios
      .post(`http://localhost:8765/api/informeempleadoestados/verInforme`, data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
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
