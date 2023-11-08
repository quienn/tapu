<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Cuenta</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Cuenta Tapu</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list :inset="true">
        <ion-item>
          <ion-input v-model="email" label="Correo electrónico" placeholder="correo@dominio.com"></ion-input>
        </ion-item>
        <ion-item>
          <ion-input v-model="password" type="password" label="Contraseña"></ion-input>
        </ion-item>
      </ion-list>

      <section class="ion-text-center ion-align-items-center">
        <p>
          <a href="/signup">Registrarse</a>
        </p>

        <ion-button @click="login" color="primary">
          Iniciar Sesión
        </ion-button>
      </section>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonItem,
  IonList,
  IonButton,
  toastController
} from '@ionic/vue';

import {
  signInWithEmailAndPassword,
  getAuth,
} from 'firebase/auth';

const auth = getAuth();

const email = ref<string>();
const password = ref<string>();

const login = async () => {
  let toast: HTMLIonToastElement;

  signInWithEmailAndPassword(auth, email.value!, password.value!)
    .then(async (_) => {
      toast = await toastController.create({
        message: '¡Sesión iniciada correctamente!',
        duration: 1500,
        position: 'bottom',
      });
    })
    .catch(async (error) => {
      toast = await toastController.create({
        message: `Hubo un error al realizar la operación. ${error.message!}`,
        duration: 2000,
        position: 'bottom',
      })
    })
    .finally(async () => {
      if (toast != null)
        await toast.present();
    });
};
</script>
