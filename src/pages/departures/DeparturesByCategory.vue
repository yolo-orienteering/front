<template>
  <div class="row">
    <div class="col-12 q-pt-md">
      <div class="text-h5">{{ race?.name }}</div>

      <div class="row items-center q-pt-md">
        <div class="col-6 text-h6">
          Startliste {{ (departures?.[0]?.raceCategory as RaceCategory)?.name }}
        </div>
        <div class="col-6 text-right">
          {{ departures.length }} Teilnehmer:innen
        </div>
      </div>
    </div>
    <div class="col-12 q-pt-md">  
      <q-table
        :columns="columns"
        :rows="departures"
        :rows-per-page-options="[0]"
        dense
        flat
        hide-bottom
      />
    </div>
  </div>

  <!-- filter -->
  <Teleport v-if="teleportToMenuEl" :to="teleportToMenuEl">
    <div class="row no-wrap q-py-sm items-center justify-center" style="overflow-x: scroll;">
      <div class="col-auto q-px-xs"><back-btn /></div>

      <div class="col-6 q-px-xs">
        <q-select
          :model-value="categories.find(category => category.id === params.raceCategoryId)"
          @update:model-value="updateCategoryFilter"
          :options="categories"
          option-label="name"
          option-value="id"
          outlined
          rounded
          dense
        />
      </div>
    </div>
  </Teleport>
</template>


<script setup lang="ts">
import { aggregate, readItem, readItems } from '@directus/sdk'
import { QTableColumn } from 'quasar'
import BackBtn from 'src/components/helper/BackBtn.vue'
import { useDeparture } from 'src/composables/useDeparture'
import { useApi } from 'src/stores/useApi'
import { DirectusUsers, Race, RaceCategory, UserDeparture } from 'src/types/DirectusTypes'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const {directus} = useApi()
const {params} = useRoute()
const router = useRouter()
const {formatDepartureTime} = useDeparture()

const columns: QTableColumn[] = [
  {
    name: 'startTime',
    label: 'Startzeit',
    align: 'left',
    field: (userDeparture: UserDeparture) => formatDepartureTime(userDeparture.startTimeInMinutes)
  },
  {
    name: 'user',
    label: 'Läufer:in',
    align: 'left',
    field: (userDeparture: UserDeparture) => {
      const user = (userDeparture.user as DirectusUsers | undefined)
      if (!user) return `Unbekannte:r Läufer:in`
      return `${user.first_name} ${user.last_name}`
    }
  },
  {
    name: 'birthYear',
    label: 'Jahrgang',
    align: 'left',
    field: (userDeparture: UserDeparture) => (userDeparture.user as DirectusUsers).birthYear
  }
]

const departures = ref<UserDeparture[]>([])
const categories = ref<Pick<RaceCategory, 'id' | 'name'>[]>([])
const race = ref<Race| undefined>(undefined)
const teleportToMenuEl = ref<HTMLElement | null>(null)

onMounted(async () => {
  teleportToMenuEl.value = document.getElementById('teleport-to-menu')

  const [tmpDepartures, tmpCategories, tmpRace] = await Promise.all([
    getDepartures(),
    getRaceCategories(),
    getRace()
  ])
  departures.value = tmpDepartures
  categories.value = tmpCategories
  race.value = tmpRace
})

async function getDepartures (): Promise<UserDeparture[]> {
  const raceCategoryId = params.raceCategoryId

  if (!raceCategoryId) {
    return []
  }

  return await directus.request<UserDeparture[]>(readItems('UserDeparture', {
    filter: {
      raceCategory: {
        _eq: raceCategoryId
      }
    },
    fields: ['id', 'startTimeInMinutes', {
      raceCategory: ['id', 'name', 'amountOfControls', 'distanceInMeter', 'equidistanceInMeter'],
      user: ['first_name', 'last_name', 'birthYear']
    }],
    sort: ['startTimeInMinutes'],
    limit: -1
  }))
}

async function getRaceCategories (): Promise<Pick<RaceCategory, 'id' | 'name'>[]> {
  const raceId = params.raceId

  if (!raceId) {
    return []
  }

  return await directus.request<RaceCategory[]>(aggregate('RaceCategory', {
    query: {
      filter: {
        race: {
          _eq: raceId
        }
      },
      sort: ['name']
    },
    aggregate: {},
    groupBy: ['id', 'name']
  }))
}

async function getRace (): Promise<Race | undefined> {
  const raceId = params.raceId
  if (!raceId) {
    return undefined
  }
  return await directus.request<Race>(readItem('Race', raceId as string, {
    fields: ['id', 'name']
  }))
}

async function updateCategoryFilter (newCategory: RaceCategory): Promise<void> {
  await router.replace({name: 'departures-by-category', params: {
    raceId: params.raceId,
    raceCategoryId: newCategory.id
  }})
}
</script>