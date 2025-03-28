<template>
  <div class="q-pt-xl">
    <!-- personal data -->
    <div class="row">
      <div class="col-12 text-h5">
        Persönliche Daten
      </div>
      <div class="col-12 q-px-sm q-pt-sm">
        <user-form />
      </div>
    </div>

    <!-- roadmap -->
    <div class="row q-mt-xl">
      <div class="col-12 text-h5">
        Roadmap
      </div>
      <div class="col-12 q-px-sm q-pt-sm text-body1">
        <div v-for="(milestone, milestoneIndex) in milestones" :key="milestoneIndex" class="q-pb-sm">
          <q-icon name="check_box_outline_blank" size="sm" class="q-mr-xs" /> {{ milestone.text }}
        </div>
      </div>
    </div>

    <!-- deadline notifications -->
    <div class="row justify-between items-center q-pt-xl">
      <div class="text-h5">
        Benachrichtigungen
      </div>
    </div>

    <div class="row q-pb-xl">
      <div class="text-subtitle1 q-px-sm q-pt-xs">
        Anmeldeschlüsse - Funktion in Entwicklung
      </div>
      <div class="col-12 q-px-sm">
        <q-btn-toggle v-model="deadlineAlert" :options="[
          { label: 'Alle', value: 'all' },
          { label: 'Nur meine Läufe', value: 'only-mine' },
          { label: 'Keine', value: 'none' }
        ]" class="q-mt-sm" />
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UserForm from 'components/user/UserForm.vue'
const deadlineAlert = ref('all')

const milestones: { text: string, done: boolean }[] = [
  {
    text: 'o-mate als Android App',
    done: false
  }, {
    text: 'o-mate als IOS App',
    done: false
  }, {
    text: 'Zeige deine Startzeit automatisch an, wenn Du an einem Lauf angemeldet bist.',
    done: false
  }, {
    text: 'Übersetze die App in andere Sprachen, insbesondere Englisch',
    done: false
  }, {
    text: 'Synchronisiere deine vorgemerkten Läufe automatisch mit deinem Kalender.',
    done: false
  }, {
    text: 'Plane deine Anreise mit einer integrierten Karte und dem genauem Standort des OLs.',
    done: false
  }, {
    text: 'Erhalte Erinnerungen bei Anmeldeschlüssen.',
    done: false
  }, {
    text: 'Bilde Freundeskreise und sehe, welche Freunde an welchen OLs teilnehmen.',
    done: false
  }, {
    text: 'Bilde Fahrgemeinschaften an OLs.',
    done: false
  }, {
    text: 'Suche nach internationalen OLs.',
    done: false
  }
]
</script>
