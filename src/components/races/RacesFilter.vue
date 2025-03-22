<template>
  <div v-if="filter" class="row bg-white items-center races-filter-container q-py-sm no-wrap q-px-sm">
    <!-- filter icon -->
    <div class="col-auto text-secondary">
      <span class="fal fa-sliders-h fa-2x q-mx-sm" />
    </div>

    <!-- search -->
    <div class="q-mr-xs" :class="[!!filter?.searchString ? 'col-6' : 'col-4']">
      <q-input v-model="filter.searchString" :loading="loading" outlined label="Lauf suchen" color="secondary" dense
        rounded label-color="secondary" clearable clear-icon="fal fa-times" />
    </div>

    <!-- deadline -->
    <div class="col-auto">
      <q-chip @click="updateFilter('deadline')" :selected="filter.deadline" outline class="q-ml-none" color="secondary"
        dense size="xl" :class="filter.deadline ? 'bg-secondary text-white' : 'bg-white'">
        <span class="text-body2">
          <span v-if="!filter.deadline" class="fal fa-bells" />
          Anmeldeschluss
        </span>
      </q-chip>
    </div>
    <!-- relevance -->
    <div class="col-auto">
      <q-chip @click="filter.geographicalScale = !filter.geographicalScale ? 'national' : undefined"
        :selected="!!filter.geographicalScale" outline icon-selected="" class="q-ml-none" color="secondary" dense
        size="xl" :class="filter.geographicalScale ? 'bg-secondary text-white' : 'bg-white'">
        <span class="text-body2">
          <span v-if="!filter.geographicalScale" class="fal fa-map-marked" />
          Nat. Meisterschaft
        </span>
      </q-chip>
    </div>

    <!-- region -->
    <div :class="[filter.regions ? 'col-7' : 'col-5']">
      <q-select v-model="filter.regions" :options="regionsList" dense rounded multiple outlined clearable
        color="secondary" label-color="secondary" label="Regionen" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useSyncCenter } from 'src/stores/syncCenter'
import { RaceQuery } from 'src/classes/RaceFilter'

const { filter } = useSyncCenter()

withDefaults(
  defineProps<{
    loading?: boolean
  }>(),
  {
    loading: false
  }
)

const emits = defineEmits<{
  (e: 'update:filter'): void
}>()

onMounted(() => {
  searchEngine()
  // await loadRegionsList()
})


// text search helpers
const lastSearchString = ref<string | undefined>(undefined)
const regionsList = ref<string[]>([])

/**
 * FUNCTIONS
 */
// async function loadRegionsList() {
//   const response = await RaceService.getRegions()
//   if (response) {
//     regionsList.value = response
//   }
// }


/**
 * handles user search input
 */
function searchEngine() {
  setInterval(() => {
    if (filter && filter?.searchString !== lastSearchString.value) {
      lastSearchString.value = filter.searchString
      // emits('updateFilter', composeFilter())
    }
  }, 1000)
}

function updateFilter(filterType: 'deadline') {
  if (filterType === 'deadline') {
    filter.deadline = !filter.deadline
  }

  emits('update:filter')
}

</script>

<style lang="scss">
.races-filter-container {
  overflow-x: scroll;
}
</style>
