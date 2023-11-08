<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="light">
        <ion-title>Registros</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true" color="light">
      <ion-header collapse="condense">
        <ion-toolbar color="light">
          <ion-title size="large">Registros</ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-card v-for="pet in pets" :class="{ 'plant-card-impatiens': pet.species === 'Impatiens hawkeri', 'plant-card-lampra': pet.species === 'Lampranthus multiradiatus', 'plant-card': true, 'plant-card-text': true }">
        <ion-card-header>
          <ion-card-title>
            {{ pet?.name }}
          </ion-card-title>
          <ion-card-subtitle class="subtitle">
            {{ pet?.species }}
          </ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          <ion-card>
            <ion-card-header>
              <ion-card-subtitle>
                Condición
              </ion-card-subtitle>
            </ion-card-header>

            <ion-card-content>
              Buena
            </ion-card-content>
          </ion-card>

          <!-- <ion-card> -->
          <!--   <ion-card-header> -->
          <!--     <ion-card-subtitle> -->
          <!--       Registro de riegos -->
          <!--     </ion-card-subtitle> -->
          <!--   </ion-card-header> -->
          <!-- </ion-card> -->

          <ion-card>
            <ion-card-header>
              <ion-card-subtitle>
                Recomendaciones
              </ion-card-subtitle>
            </ion-card-header>

            <ion-card-content>
              <p>
                Riego abundante en verano y escaso en invierno, añadiendo fertilizante para macetas cada 15 días durante la etapa de crecimiento.
              </p>
            </ion-card-content>
          </ion-card>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
} from '@ionic/vue';

import { useCollection, useCurrentUser } from 'vuefire';
import { collection } from 'firebase/firestore';

import { functions, usersRef } from '@/database';
import { Pet as DbPet } from '@/database/types';

const user = useCurrentUser();
const { data: pets, pending: petsPending, error: petsError } = useCollection<DbPet>(collection(usersRef, user.value?.uid!, 'pets'));
</script>

<style scoped>
.plant-card-text ion-card-header ion-card-title {
  z-index: 2;
  color: white;
}

.subtitle {
  color: white;
}

.plant-card-impatiens {
  background-image: url('@/assets/images/impatiens.jpeg');
}

.plant-card-lampra {
  background-image: url('@/assets/images/lampranthus.jpg');
}

.plant-card {
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
/*  filter: blur(8px);*/
}
</style>

