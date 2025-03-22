<template>
  <div class="row justify-between items-center">
    <div class="text-h5">
      Meine Läufe
    </div>
    <div class="text-right">
      <q-toggle v-model="notify" :icon="notify ? 'fal fa-bells' : 'fal fa-bell-slash'" size="lg" color="secondary" />
    </div>

    <div class="col-12">
      <race-timeline :races="syncCenter.myRaces" :show-load-more="false" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, nextTick } from 'vue'
import RaceTimeline from 'components/races/RaceTimeline.vue'
import { useSyncCenter } from 'src/stores/syncCenter'
import { useEventBus } from 'src/stores/useEventBus'

const syncCenter = useSyncCenter()
const { eventBus } = useEventBus()

const notify = ref<boolean>(true)

onMounted(async () => {
  await nextTick(() => {
    eventBus.emit('scrollToSavedPosition')
  })
})

</script>
