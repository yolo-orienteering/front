<template>
  <div class="row">
    <!-- title -->
    <div class="col-auto text-h5">
      Verbindung suchen
    </div>
    <q-space />
    <!-- sbb logo -->
    <div class="col-auto">
      <q-img width="50px" src="img/sbb_logo.svg" />
    </div>

    <!-- form -->
    <div class="col-12 q-px-sm q-pt-md">
      <q-form @submit="callSbb()">
        <div class="row q-col-gutter-sm">
          <!-- from -->
          <div class="col-6 q-pb-none">
            <!-- <q-input v-model="user.ptStartingPoint" label="Von" outlined dense
              :rules="[val => !!val || 'Wo soll\'s losgehen?']" /> -->
          </div>
          <!-- to -->
          <div class="col-6 q-pb-none">
            <q-input v-model="sbbSearchParams.to" label="Nach" outlined dense
              :rules="[val => !!val || 'Wohin des Weges?']" />
          </div>
          <!-- date -->
          <div class="col-6 q-py-none">
            <q-input v-model="sbbSearchParams.date" mask="##.##.####" outlined dense
              :rules="[val => !!val || 'Aber wann?']">
              <template v-slot:append>
                <q-icon name="fal fa-calendar" class="cursor-pointer">
                  <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                    <q-date mask="DD.MM.YYYY" v-model="sbbSearchParams.date">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
          <!-- time -->
          <div class="col-6 q-py-none">
            <q-input v-model="sbbSearchParams.time" :label="sbbSearchParams.arrival ? 'Ankunft' : 'Abfahrt'" outlined
              dense mask="##:##" :rules="[val => !!val || 'Frühaufsteher:in?']" />
          </div>
          <!-- arrival? -->
          <div class="col-4 q-py-none">
            <q-toggle v-model="sbbSearchParams.arrival" :label="sbbSearchParams.arrival ? 'Ankunft' : 'Abfahrt'" />
          </div>

          <!-- search button -->
          <div class="col-8 q-py-none">
            <q-btn outline class="bg-sbb" type="submit">
              <span class="fal fa-external-link q-mr-sm" />
              Verbindung suchen
            </q-btn>
          </div>
        </div>
      </q-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import type { Race } from '../../../types/DirectusTypes'
import { formatDate } from 'src/utils/DateUtils'
// import {useSyncCenter} from 'src/store/syncCenter'

interface SbbSearchParams {
  to?: string
  date?: string
  time?: string
  arrival: boolean
}

const props = withDefaults(defineProps<{ race: Race | null }>(), { race: null })

// const { user } = useSyncCenter()
const sbbSearchParams = reactive<SbbSearchParams>({
  arrival: true
})

onMounted(() => {
  // prefill form
  autoFillForm()
})

function autoFillForm() {
  if (props.race?.city) {
    sbbSearchParams.to = props.race.city
  }
  if (props.race?.date) {
    sbbSearchParams.date = formatDate(props.race.date, 'DD.MM.YYYY')
  }
  sbbSearchParams.time = '10:00'
}

function callSbb() {
  const link = composeSbbLink()
  setTimeout(() => {
    window.open(link, '_blank')
  }, 50)
}

function composeSbbLink(): string {
  const baseUrl = 'https://www.sbb.ch/de/kaufen/pages/fahrplan/fahrplan.xhtml'
  let link = `${baseUrl}?nach=${sbbSearchParams.to}`
  if (sbbSearchParams.date) {
    link += `&datum=${sbbSearchParams.date}`
  }
  if (sbbSearchParams.time) {
    link += `&zeit=${sbbSearchParams.time}`
  }
  // todo: include again
  /* if (user.ptStartingPoint) {
    link += `&von=${user.ptStartingPoint}`
  } */
  if (sbbSearchParams.arrival) {
    link += `&an=${sbbSearchParams.arrival ? 'true' : 'false'}`
  }
  link += '&suche=true'
  return link
}
</script>

<style lang="scss">
.bg-sbb {
  color: #eb0000;
  width: 100%;
}
</style>
