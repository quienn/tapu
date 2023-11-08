<template>
  <ion-page>
    <ion-content :class="{ 'night-background': isNight, 'day-background': !isNight }" :fullscreen="true">

      <br>
      <br>

      <section class="ion-text-center ion-padding-top ion-margin-bottom">
        <h1 v-if="isNight">Buenas noches, Martín.</h1>
        <h1 v-else>Buenos días, Martín.</h1>
      </section>

      <section>
        <ion-spinner v-if="petsPending" />
          <h1 v-if="petsError">Hubo un error al cargar la información del usuario. {{ petsError }}</h1>

        <div v-else>
          <swiper class="slider" :pagination="true" :scrollbar="true" :modules="[Pagination, Virtual]" virtual>
            <swiper-slide :title="pet.name" v-for="(pet, index) in pets" :key="index" :virtualindex="index">
              <pet :pet="pet" />
            </swiper-slide>
            <swiper-slide class="ion-align-items-center">
              <br>
              <br>
              <br>

              <h2>¿Falta algo?</h2>

              <br>
              <br>
              <br>

              <ion-icon :icon="help" size="large" />

              <br>
              <br>
              <br>

              <h3>Agrega dispositivos en el menú de <u>Ajustes</u>.</h3>
            </swiper-slide>
          </swiper>
        </div>

      </section>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import 'swiper/css';
import 'swiper/css/pagination';

import { computed } from 'vue';
import { IonPage, IonIcon, IonContent, IonSpinner } from '@ionic/vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Virtual, Pagination } from 'swiper/modules';
import { useCollection, useCurrentUser } from 'vuefire';
import { collection } from 'firebase/firestore';

import { help } from 'ionicons/icons';

import { useCurrentTime } from '@/utilities/time';
import { usersRef } from '@/database';
import { Pet as DbPet } from '@/database/types';
import Pet from '@/components/Pet.vue';

const user = useCurrentUser();

const { currentTime } = useCurrentTime();

const isNight = computed(() => {
  return currentTime.value.getHours() >= 19 || currentTime.value.getHours() <= 6;
});

const { data: pets, pending: petsPending, error: petsError } = useCollection<DbPet>(collection(usersRef, user.value?.uid!, 'pets'));
</script>

<style scoped>
@font-face {
  font-family: "Pixelify Sans";
  src: url(../assets/fonts/PixelifySans-VariableFont_wght.ttf);
}

ion-content {
  font-family: "Pixelify Sans";
}

ion-content h1 {
  font-size: 30px;
  overflow-wrap: break-word;
}

.day-background {
  --background: url(../assets/images/day.png) no-repeat center center / cover;
  --color: white;
}

.night-background {
  --background: url(../assets/images/night.png) no-repeat center center / cover;
  --color: white;
}

.slider {
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  display: block;
}

.missing-pets {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
