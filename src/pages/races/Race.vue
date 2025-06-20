<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import SbbTimetable from 'components/publicTransport/switzerland/SbbTimetable.vue'
import { Race, RaceCategory, RaceInstruction, UserDeparture } from 'src/types/DirectusTypes'
import { useApi } from 'src/stores/useApi'
import { readItem } from '@directus/sdk'
import { formatDate } from 'src/utils/DateUtils'
import { useRace } from 'src/composables/useRace'
import { useSyncCenter } from 'src/stores/syncCenter'

const route = useRoute()
const { directus } = useApi()
const raceCompose = useRace()
const syncCenter = useSyncCenter()

const race = ref<Race | null>(null)
const expandedInstructions = ref<boolean>(false)

// load race
onMounted(async () => {
  const raceId: string = route.params.id as string

  race.value = await directus.request<Race>(readItem('Race', raceId, {
    fields: ['*', {
      instruction: ['*']
    }]
  }))
})

const myDeparture = computed<UserDeparture | undefined>(() => syncCenter.myDepartures.getDepartureFor(race.value?.id))
const raceCategory = computed<RaceCategory | undefined | null>(() => myDeparture.value?.raceCategory as RaceCategory | null | undefined)

function getInstruction (race: Race) {
  return (race?.instruction as RaceInstruction[])?.[0]
}
</script>

<template>
  <div class="row items-center" v-if="race">
    <!-- title and favorite -->
    <div class="col-12 q-pt-md">
      <div class="row justify-center items-center">
        <div class="col-10 text-h5" style="line-height: 1.4em;">
          {{ race.name }}
        </div>
        <q-space />
        <div class="col-2 text-right">
          <q-btn round color="primary" :outline="!syncCenter.myRaces.find(myRace => myRace.id === race?.id)" dense
                 @click="raceCompose.addOrRemoveRace(race)">
            <q-icon name="bookmark_outline" />
          </q-btn>
        </div>
      </div>
    </div>


    <!-- deadline -->
    <div v-if="race.deadline && new Date(race.deadline) >= new Date()" class="col-12 q-pt-md">
      <q-banner dense rounded class="bg-secondary text-white">
        <span class="fal fa-bells" />
        Anmeldung erforderlich bis am {{ formatDate(race.deadline, 'dd, DD.MMM YYYY') }}
      </q-banner>
    </div>

    <!-- date, location, map name -->
    <div class="col-12 q-pt-md q-pl-sm text-body1">
      <div class="row">
        <!-- your departure -->
        <div v-if="myDeparture" class="col-12 q-pt-xs">
          <q-icon name="change_history" class="q-mr-xs" />
          {{ raceCategory?.name ? `${raceCategory.name} | ` : '' }}
          {{ raceCategory?.distanceInMeter ? `${raceCategory.distanceInMeter / 1000} km | ` : '' }}
          {{ raceCategory?.equidistanceInMeter ? `${raceCategory.equidistanceInMeter} m | ` : '' }}
          {{ raceCategory?.amountOfControls ? `${raceCategory.amountOfControls} p` : '' }}
        </div>
        <!-- date -->
        <div class="col-12 q-pt-xs">
          <q-icon name="event" class="q-mr-xs" />
          {{ formatDate(race.date!, 'dd, DD.MMM YYYY') }}
        </div>
        <!-- location -->
        <div class="col-12 q-pt-xs">
          <q-icon name="location_on" class="q-mr-xs" />
          {{ race.city || race.mapName || 'vakant' }} {{ race.region ? `(${race.region}` : '' }}<span
          class="text-capitalize">{{ race.country ? `,
            ${race.country})` :
          ')' }}</span>
        </div>
        <!-- map name -->
        <div class="col-12 q-pt-xs">
          <q-icon name="map" class="q-mr-xs" />
          {{ race.mapName }}
        </div>
      </div>
    </div>


    <!-- my departure -->
    <div v-if="myDeparture" class="col-12">
      <q-separator class="q-my-lg" />

      <div class="text-h5">Deine Startzeit</div>

       <div class="q-mt-md q-pl-sm text-body1">
         {{ syncCenter.user?.first_name }}, du startest um
         <router-link
           v-if="myDeparture"
           class="q-mt-md"
           style="color: unset;"
           :to="{
            name: 'departures-by-category',
            params: {
              raceId: race.id,
              raceCategoryId: (myDeparture.raceCategory as UserDeparture).id
            }
          }"
         >
           <b><u>{{ syncCenter.myDepartures.getFormatedDeparture(race.id)}}</u></b>
         </router-link>
       </div>
    </div>

    <!-- instruction & departure time -->
    <div v-if="!!race.instruction.length || myDeparture" class="col-12">
      <q-separator class="q-my-lg" />

      <div class="text-h5">Weisungen</div>

      <div v-if="getInstruction(race)?.summaryAI" class="row text-body1 q-col-gutter-sm q-pl-sm q-pt-md">
        <div class="col-12" :class="{'text-fadeout': !expandedInstructions}" @click="expandedInstructions = true">
          <p style="white-space: pre-wrap;">
            {{ getInstruction(race)?.summaryAI }}
          </p>

          <b v-if="getInstruction(race)?.summaryAI">Die Weisungen wurden von einer KI zusammengefasst. Angaben ohne Gewähr.</b>
        </div>
        <div class="col-12 text-center q-pt-none" @click="expandedInstructions = !expandedInstructions">
          <q-btn flat round><q-icon :name="expandedInstructions ? 'keyboard_arrow_up' : 'keyboard_arrow_down'" size="xl"/>
          </q-btn>
        </div>

        <!-- Instruction PDF -->
        <div v-if="raceCompose.composeLink({ race, linkType: 'instruction' })" class="col-12 text-center q-mt-md">
          <q-btn target="_blank" color="black" outline :href="raceCompose.composeLink({ race, linkType: 'instruction' })">
            <q-icon name="signpost" class="q-mr-sm" />
            Original-Weisungen lesen
          </q-btn>
        </div>
      </div>
    </div>

    <!-- links -->
    <div class="col-12">
      <q-separator class="q-my-lg" />

      <div class="text-h5">Links</div>

      <div class="row q-col-gutter-sm q-pl-sm q-pt-md">
        <!-- Ausschreibung -->
        <div class="col-auto">
          <q-btn v-if="race.publicationLink" outline :href="raceCompose.composeLink({ race, linkType: 'publication' })"
                 target="_blank">
            <q-icon name="picture_as_pdf" class="q-mr-sm" />
            Ausschreibung
          </q-btn>
        </div>

        <!-- website -->
        <div v-if="race.eventLink" class="col-auto">
          <q-btn outline :href="raceCompose.composeLink({ race, linkType: 'event' })" target="_blank">
            <q-icon name="open_in_new" class="q-mr-sm" />
            Webseite
          </q-btn>
        </div>

        <!-- inscription link -->
        <div v-if="race.inscriptionLink" class="col-auto">
          <q-btn outline :href="raceCompose.composeLink({ race, linkType: 'inscription' })" target="_blank">
            <q-icon name="play_circle" class="q-mr-sm" />
            Anmelden
          </q-btn>
        </div>

        <!-- live results -->
        <div v-if="race.liveResultLink" class="col-auto">
          <q-btn outline :href="raceCompose.composeLink({ race, linkType: 'liveResult' })" target="_blank">
            <q-icon name="live_tv" class="q-mr-sm" />
            Live-Resultate
          </q-btn>
        </div>

        <!-- ranking -->
        <div v-if="race.rankingLink" class="col-auto">
          <q-btn outline :href="raceCompose.composeLink({ race, linkType: 'ranking' })" target="_blank">
            <q-icon name="list" class="q-mr-sm" />
            Rangliste
          </q-btn>
        </div>
      </div>
    </div>
  </div>

  <q-separator class="q-my-lg" />

  <!-- sbb -->
  <div v-if="race" class="col-12 q-pb-sm">
    <sbb-timetable :race="race" />
  </div>
</template>


<style lang="scss">
.text-fadeout {
  max-height: 100px;
  white-space: nowrap;
  overflow: hidden;
  position: relative;
  mask-image: linear-gradient(to bottom, black 10%, transparent 100%);
}
</style>
