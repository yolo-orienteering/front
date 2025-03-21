<template>
  <div class="row q-col-gutter-sm justify-end">
    <!-- public transport starting location -->
    <div v-if="user" class="col-12 q-pt-md">
      <q-input v-model="user.location" label="Dein Wohnort (als Abfahrtsort)" outlined dense />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSyncCenter } from 'src/stores/syncCenter'

const { user } = useSyncCenter()
</script>
