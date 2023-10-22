<template>
  <ion-page>
    <ion-content :class="{ 'night-background': isNight, 'day-background': !isNight }" :fullscreen="true">
      <section class="ion-text-center ion-padding-top">
        <h1 v-if="isNight">Buenas noches, Daniel.</h1>
        <h1 v-else>Buenos días, Daniel.</h1>
      </section>

      <section class="container">
        <ion-spinner v-if="petsPending" />
        <h1 v-if="petsError">Hubo un error al cargar la información del usuario.</h1>

        <swiper v-else :pager="true" :scrollbar="true" :modules="[Virtual, Pagination]" virtual
          :pagination="{ clickable: true }">
          <swiper-slide :title="pet.name" v-for="(pet, index) in pets" :key="index" :virtualindex="index">
            <pet :pet="pet" />
          </swiper-slide>
        </swiper>
      </section>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { IonPage, IonContent, IonSpinner } from '@ionic/vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Virtual, Pagination } from 'swiper/modules';
import { useCollection } from 'vuefire';
import { collection } from 'firebase/firestore';

import 'swiper/css';
import 'swiper/css/pagination';

import { useCurrentTime } from '@/utilities/time';
import { usersRef } from '@/database';
import { Pet as DbPet } from '@/database/types';

import Pet from '@/components/Pet.vue';

const { currentTime } = useCurrentTime();

const isNight = computed(() => {
  return currentTime.value.getHours() >= 19 || currentTime.value.getHours() <= 6;
});

const { data: pets, pending: petsPending, error: petsError } = useCollection<DbPet>(collection(usersRef, 'FsGf3wcVfX3GQh4Iaawf2AROEdID', 'pets'));
</script>

<style scoped>
.container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 45%;
  transform: translateY(-50%);
}

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

.swiper {
  height: 100%;
}
</style>
