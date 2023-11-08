<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/app/home">
          <ion-icon aria-hidden="true" :icon="home" />
          <ion-label>Inicio</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/app/entries">
          <ion-icon aria-hidden="true" :icon="leaf" />
          <ion-label>Registros</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/app/settings">
          <ion-icon aria-hidden="true" :icon="cog" />
          <ion-label>Ajustes</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { home, leaf, cog } from 'ionicons/icons';
</script>

<style scoped></style>
