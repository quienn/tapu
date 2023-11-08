<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="light">
        <ion-title>Ajustes</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" color="light">
      <ion-header collapse="condense">
        <ion-toolbar color="light">
          <ion-title size="large">Ajustes</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-list :inset="true">
        <ion-item button detail>
          <ion-avatar aria-hidden="true" slot="start">
            <img v-if="user?.photoURL" :src="user?.photoURL" />
            <img v-else alt="" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
          </ion-avatar>
          <ion-label>
            <h1>Martín Aguilar</h1>

            <p>{{ user?.email }}</p>
          </ion-label>
        </ion-item>

        <ion-item button detail>
          <ion-icon slot="start" color="primary" :icon="languageSharp" />
          <ion-label>Idioma</ion-label><ion-note slot="end">Español</ion-note>
        </ion-item>
      </ion-list>

      <ion-list :inset="true">
        <ion-list-header>
          Mascotas
        </ion-list-header>

        <ion-item v-if="petsPending">
          Cargando mascotas...
        </ion-item>

        <ion-item-sliding v-else>
          <ion-item v-for="(pet, indexPet) in pets">
            {{ pet.name }}
          </ion-item>

          <ion-item-options>
            <ion-item-option color="danger">
              Eliminar
            </ion-item-option>
          </ion-item-options>
        </ion-item-sliding>

        <ion-item button detail>
          <ion-icon slot="start" color="success" :icon="addCircleOutline" />
          <ion-label>
            Agregar...
          </ion-label>
        </ion-item>
      </ion-list>

      <ion-list :inset="true">
        <ion-item button detail @click="userSignOut">
          <ion-icon :icon="logOutSharp" color="danger" slot="start"></ion-icon>
          <ion-label>
            Cerrar sesión
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { usersRef } from '@/database';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonList,
  IonLabel,
  IonIcon,
  IonNote,
  IonAvatar,
  IonItemSliding,
  IonListHeader,
  IonItemOption,
  IonItemOptions,
} from '@ionic/vue';
import { collection } from 'firebase/firestore';

import { addCircleOutline, languageSharp, logOutSharp } from 'ionicons/icons';

import { Pet as DbPet } from '@/database/types';

import { useCollection, useCurrentUser, useFirebaseAuth } from 'vuefire';

import { signOut } from 'firebase/auth';

const user = useCurrentUser();
const auth = useFirebaseAuth()!;

const { data: pets, pending: petsPending } = useCollection<DbPet>(collection(usersRef, user.value?.uid!, 'pets'));

const userSignOut = async () => {
  await signOut(auth);
  window.location.href = "/";
};
</script>

<style scoped>
ion-avatar {
  width: 55px;
  height: 55px;
}
</style>
