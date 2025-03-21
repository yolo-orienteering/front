<template>
  <div class="q-pt-md">
    <!-- filter -->
    <Teleport v-if="teleportToMenuEl" :to="teleportToMenuEl">
      <!-- <races-filter v-show="races && races instanceof Races" @update-filter="updateFilter" :loading="loading" /> -->
    </Teleport>

    <race-timeline v-if="races" :races="races.races" @load-more="loadMore()" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import RaceTimeline from 'components/races/RaceTimeline.vue'
import { useRouter } from 'vue-router'
import { useRaces } from 'src/stores/useRaces'

// defining races
const loading = ref<boolean>(false)
const teleportToMenuEl = ref<HTMLElement | null>(null)
const router = useRouter()

// initially loads races with onMounted hook within composable
const races = useRaces()

onMounted(() => {
  teleportToMenuEl.value = document.getElementById('teleport-to-menu')
})

async function loadMore(): Promise<void> {
  races.currentPage += 1
  await races.loadRaces()
}

</script>
