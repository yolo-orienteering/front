<template>
  <div class="row justify-center">
    <div class="col-12">
      <q-timeline layout="dense">
        <template v-for="race in races" :key="race.id">
          <!-- monthly delimiter -->
          <q-timeline-entry v-if="monthChangeInArray(race.id)" heading>
            {{ getMonthlyDelimiter(race.date!) }}
          </q-timeline-entry>

          <!-- races -->
          <q-timeline-entry :title="race.name!" @click="$router.push({ name: 'race', params: { id: race.id } })">
            <!-- date & deadline -->
            <template v-slot:subtitle>
              <div class="row items-center">
                <div class="col-6">
                  {{ formatDate(race.date!, 'dd, DD.MM yyyy') }}
                </div>
                <div v-if="race.deadline" class="col-6 text-right">
                  <q-chip color="accent" dense outline>
                    <span class="fal fa-bells q-mr-xs" />
                    {{ formatDate(race.deadline!, 'dd, DD.MMM') }}
                  </q-chip>
                </div>
              </div>
            </template>
            <!-- title & favorites -->
            <template v-slot:title>
              <div class="row items-center">
                <div class="col-10">
                  {{ race.name }}
                </div>
                <div class="col-2 text-right">
                  <q-btn round color="primary" :outline="!syncCenter.myRaces.find(myRace => myRace.id === race.id)"
                    dense @click.stop="raceCompose.addOrRemoveRace(race)">
                    <q-icon name="star" />
                  </q-btn>
                </div>
              </div>
            </template>
            <!-- text body -->
            <div class="row">
              <div class="col-auto">
                <span class="fal fa-map-pin q-mr-xs" /> {{ race.city || 'vakant' }} {{ race.region ? `(${race.region})`
                  :
                  '' }}
              </div>
            </div>
          </q-timeline-entry>
        </template>
      </q-timeline>
    </div>

    <!-- pagination -->
    <div v-if="showLoadMore" class="col-12 text-center q-pb-lg">
      <q-btn outline @click="loadMore()">
        Mehr Läufe laden
      </q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from 'moment'
import { Race } from 'src/types/DirectusTypes'
import { formatDate } from 'src/utils/DateUtils'
import { useSyncCenter } from 'src/stores/syncCenter'
import { useRace } from 'src/composables/useRace'

const syncCenter = useSyncCenter()
const raceCompose = useRace()

const props = withDefaults(defineProps<{
  races: Race[],
  showLoadMore?: boolean
}>(), {
  races: () => [],
  showLoadMore: true
})

const emit = defineEmits<{ (e: 'loadMore'): void }>()

function loadMore() {
  emit('loadMore')
}

function getMonthlyDelimiter(date: string): string {
  const momentDate = moment(date)
  return momentDate.year() > moment().year() ? momentDate.locale('de-CH').format('MMMM YY') : momentDate.locale('de-CH').format('MMMM')
}

function monthChangeInArray(raceId: string, firstMonth: boolean = true): boolean {
  const foundIndex = props.races.findIndex(tmpRace => tmpRace.id === raceId)
  // race doesn't exist
  if (foundIndex < 0 || !props.races) {
    return false
  }
  // beginning is always a month change
  if (foundIndex === 0) {
    return firstMonth
  }

  const previousRaceDate = props.races[foundIndex - 1]?.date
  const currentRaceDate = props.races[foundIndex]?.date

  const monthOfPreviousRace = previousRaceDate ? new Date(previousRaceDate).getMonth() : undefined
  const currentMonth = currentRaceDate ? new Date(currentRaceDate).getMonth() : undefined
  return monthOfPreviousRace !== currentMonth
}
</script>
