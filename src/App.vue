<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useCurrentUser } from 'vuefire';

const user = useCurrentUser();
const router = useRouter();
const route = useRoute();

watch(user, async (currentUser, previousUser) => {
  if (!currentUser &&previousUser) {
    return router.push({ name: 'login' })
  }

  if (currentUser && typeof route.query.redirect === 'string') {
    return router.push(route.query.redirect)
  }
});
</script>

