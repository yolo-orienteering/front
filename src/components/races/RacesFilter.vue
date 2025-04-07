<template>
  <div v-if="filter"
    class="row bg-white items-center races-filter-container q-py-sm no-wrap q-px-sm border-bottom-primary">

    <div v-if="filter.previousDays" class="col-auto">
      <q-chip color="primary" text-color="white" size="xl" dense removable @remove="updateFilter({ previousDays: 0 })">
        <span class="text-body2">-{{ filter.previousDays }} {{ filter.previousDays > 1 ? `Tage` : `Tag` }}</span>
      </q-chip>
    </div>

    <!-- deadline -->
    <div class="col-auto">
      <q-chip @click="updateFilter({ deadline: !filter.deadline })" :selected="filter.deadline" outline
        class="q-ml-none" color="primary" dense size="xl"
        :class="filter.deadline ? 'bg-primary text-white' : 'bg-white'">
        <span class="text-body2">
          <q-icon v-if="!filter.deadline" name="notifications" size="sm" />
          Anmeldeschluss
        </span>
      </q-chip>
    </div>
    <!-- relevance -->
    <div class="col-auto">
      <q-chip @click="updateFilter({ geographicalScale: filter.geographicalScale ? null : 'national' })"
        :selected="!!filter.geographicalScale" outline icon-selected="" class="q-ml-none" color="primary" dense
        size="xl" :class="filter.geographicalScale ? 'bg-primary text-white' : 'bg-white'">
        <span class="text-body2">
          <q-icon v-if="!filter.geographicalScale" name="location_on" size="sm" />
          Nat. Meisterschaft
        </span>
      </q-chip>
    </div>

    <!-- search -->
    <div class="q-mr-xs" :class="[!!filter?.searchString ? 'col-6' : 'col-4']">
      <q-input v-model="filter.searchString" :loading="loading" outlined label="Lauf suchen" color="primary" dense
        rounded label-color="primary" clearable clear-icon="close" />
    </div>

    <!-- region -->
    <div :class="[filter.regions ? 'col-7' : 'col-5']">
      <q-select v-model="filter.regions" :options="regionStore.regions.map(region => region.region)"
        @update:model-value="emits('update:filter')" @clear="emits('update:filter')" dense rounded multiple outlined
        clearable color="primary" label-color="primary" label="Regionen" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useSyncCenter } from 'src/stores/syncCenter'
import { useRegion } from 'src/stores/useRegion'

const { filter } = useSyncCenter()
const regionStore = useRegion()

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
})


// text search helpers
const lastSearchString = ref<string | undefined>(filter.searchString)

/**
 * handles user search input
 */
function searchEngine() {
  setInterval(() => {
    if (filter && filter?.searchString !== lastSearchString.value) {
      lastSearchString.value = filter.searchString
      emits('update:filter')
    }
  }, 1000)
}

function updateFilter(
  { deadline, geographicalScale, previousDays }:
    { deadline?: boolean, geographicalScale?: string | null, previousDays?: number }
) {
  if (deadline !== undefined) {
    filter.deadline = deadline
  }

  if (geographicalScale !== undefined) {
    filter.geographicalScale = geographicalScale || undefined
  }

  if (previousDays !== undefined) {
    filter.previousDays = previousDays
  }

  emits('update:filter')
}

</script>

<style lang="scss">
.races-filter-container {
  overflow-x: scroll;
}
</style>
