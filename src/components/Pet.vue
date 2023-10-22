<template>
  <section>
    <main>
      <h1>{{ pet.name }}</h1>
      <p>Nivel {{ pet.level }}</p>
      <h3>{{ pet.plant.soilMoisture }}</h3>
    </main>
  </section>
</template>

<script setup lang="ts">
import { Pet } from '@/database/types';

const props = defineProps<{
  pet: Pet
}>();
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

img {
  width: 200px;
  height: 200px;
}

ion-progress-bar {
  position: absolute;
  height: 30px;
  width: 250px;
  left: 20;
  right: 20%;
}
</style>
