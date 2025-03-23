<template>
  <div class="q-pt-md">
    <div class="row justify-between items-center">
      <div class="text-h5">
        Benachrichtigungen (Funktion in Entwicklung)
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
