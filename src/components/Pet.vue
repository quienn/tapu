<template>
  <section>
    <main>
      <h1>{{ pet.name }}</h1>
      <p>Nivel {{ pet.level }}</p>

      <img v-if="mood == 'happy'" src="@/assets/images/happy.png" />
      <img v-if="mood == 'confused'" src="@/assets/images/confused.png" />
      <img v-if="mood == 'sad'" src="@/assets/images/sad.png" />
    </main>
  </section>

  <section>
    <main>
      <ion-grid>
        <ion-row>
          <ion-col>
            <ion-card>
              <ion-card-content>
                <span>
                  <ion-icon :icon="batteryFull" />
                </span>
                <p>{{ pet.battery }}%</p>
              </ion-card-content>
            </ion-card>
          </ion-col>

          <ion-col>
            <ion-card>
              <ion-card-content>
                <span>
                  <ion-icon :icon="water" />
                </span>
                <p>{{ pet.moisturePercentage }}%</p>
              </ion-card-content>
            </ion-card>
          </ion-col>

          <ion-col>
            <ion-card>
              <ion-card-content>
                <span>
                  <ion-icon :icon="thermometer" />
                </span>
                <p>{{ pet.temperature }}°C</p>
              </ion-card-content>
            </ion-card>
          </ion-col>
        </ion-row>

      </ion-grid>
    </main>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { batteryFull, water, thermometer } from 'ionicons/icons';
import { IonButton, IonIcon, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent } from '@ionic/vue';

import { Pet } from '@/database/types';

const props = defineProps<{
  pet: Pet
}>();

let happiness = ref(100);

const mood = computed(() => {
  if (happiness.value <= 100 && happiness.value >= 70) {
    return 'happy';
  } else if (happiness.value < 70 && happiness.value >= 40) {
    return 'confused';
  } else {
    return 'sad';
  }
});

const calculateMood = () => {
  if (props.pet.temperature > props.pet.maxTemperature || props.pet.temperature < props.pet.minTemperature) {
    happiness.value -= 20;
  }

  if (props.pet.moisturePercentage > props.pet.maxMoisturePercentage || props.pet.moisturePercentage < props.pet.minMoisturePercentage) {
    happiness.value -= 10;
  }

  if (happiness.value < 0) {
    happiness.value = 0;
  } else {
    happiness.value += 15;
  }
}

calculateMood();
setInterval(calculateMood, 5000);
</script>

<style scoped>
img {
  width: 200px;
  height: 200px;
}
</style>
