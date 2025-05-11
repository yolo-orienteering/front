<template>
  <div class="q-row">
    <div class="q-col-12">
      <q-table
        title="Startliste TODO: Kategorie"
        :columns="columns"
        :rows="departures"
        :rows-per-page-options="[0]"
        dense
        flat
      />
    </div>
  </div>
</template>


<script setup lang="ts">
import { readItems } from '@directus/sdk'
import { QTableColumn } from 'quasar'
import { useDeparture } from 'src/composables/useDeparture'
import { useApi } from 'src/stores/useApi'
import { DirectusUsers, UserDeparture } from 'src/types/DirectusTypes'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const {directus} = useApi()
const {params} = useRoute()
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

onMounted(async () => {
  departures.value = await getDepartures()
})

async function getDepartures (): Promise<UserDeparture[]> {
  const raceCategoryId = params.id

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
    sort: ['startTimeInMinutes']
  }))
}
</script>