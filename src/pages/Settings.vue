<template>
  <div class="q-pt-md">
    <div class="row justify-between items-center">
      <div class="text-h5">
        Benachrichtigungen
      </div>
    </div>

    <div class="row q-mt-xs">
      <div class="text-subtitle1">
        Anmeldeschlüsse
      </div>
      <div class="col-12">
        <q-btn-toggle v-model="deadlineAlert" :options="[
          { label: 'Alle', value: 'all' },
          { label: 'Nur meine Läufe', value: 'only-mine' },
          { label: 'Keine', value: 'none' }
        ]" class="q-mt-sm" />
      </div>
    </div>

    <div class="row justify-between items-center q-mt-lg">
      <div class="text-h5">
        App weiterentwickeln
      </div>

      <div class="col-12 text-subtitle1">
        Finanzieren
      </div>
      <q-linear-progress size="40px" :value="89" color="primary">
        <div class="absolute-full flex flex-center">
          <q-badge color="white" text-color="primary" label="6'000 / 8'000 chf" />
        </div>
      </q-linear-progress>

      <div class="col-12 text-subtitle1 q-mt-md">
        Entscheiden
      </div>
    </div>

    <!-- personal data -->
    <div class="row q-mt-lg">
      <div class="col-12 text-h5">
        Persönliche Daten
      </div>
      <div class="col-12">
        <user-form />
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UserForm from 'components/user/UserForm.vue'
const deadlineAlert = ref('all')
</script>
