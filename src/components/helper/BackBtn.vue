<template>
  <q-btn size="md" outline rounded @click="props.to ? $router.push(props.to) : $router.go(-1)" color="primary" icon="chevron_left">
    Zurück
  </q-btn>
</template>

<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router';

const props = defineProps<{
  to?: RouteLocationRaw
}>()
</script>