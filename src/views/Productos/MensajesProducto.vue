<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title class="ion-text-center">Mensajes del producto</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col size="9">
            Empresa:
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="9">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex
            distinctio, perspiciatis vero magni ab velit aspernatur ipsam natus
            esse et earum, harum aut ullam dolorem obcaecati odio impedit.
            Recusandae, numquam!
          </ion-col>
        </ion-row>
        <ion-row class="ion-justify-content-end">
          <ion-col size="9" class="ion-text-end">
            Yo:
          </ion-col>
        </ion-row>
        <ion-row class="ion-justify-content-end">
          <ion-col size="9" class="ion-text-end">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores
            sint hic voluptatibus suscipit quae saepe repellat! Nulla officia,
            iste delectus repellendus est, dolore ullam porro id culpa fugit
            labore animi?
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="9">
            Empresa:
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="9">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ex
            distinctio, perspiciatis vero magni ab velit aspernatur ipsam natus
            esse et earum, harum aut ullam dolorem obcaecati odio impedit.
            Recusandae, numquam!
          </ion-col>
        </ion-row>
        <ion-row class="ion-justify-content-end">
          <ion-col size="9" class="ion-text-end">
            Yo:
          </ion-col>
        </ion-row>
        <ion-row class="ion-justify-content-end">
          <ion-col size="9" class="ion-text-end">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores
            sint hic voluptatibus suscipit quae saepe repellat! Nulla officia,
            iste delectus repellendus est, dolore ullam porro id culpa fugit
            labore animi?
          </ion-col>
        </ion-row>
        <form @submit.prevent="enviarMensaje">
          <ion-item>
            <ion-textarea
              rows="4"
              placeholder="Escribir un comentario..."
              v-model="sms"
            ></ion-textarea>
          </ion-item>
          <ion-row class="ion-justify-content-end">
              <ion-button type="submit">
                Enviar
              </ion-button>
          </ion-row>
        </form>
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
  IonItem,
  IonTextarea,
} from "@ionic/vue";
import { defineComponent } from "vue";

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
    IonItem,
    IonTextarea,
  },
  data() {
    return {
      sms: '',
    };
  },
  methods: {
    async enviarMensaje() {
      console.log(this.sms);
    },
  },
});
</script>
