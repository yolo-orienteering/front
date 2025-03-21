<template>
  <q-footer elevated class="bg-white">
    <div id="teleport-to-menu" />

    <!-- back button -->
    <div v-if="showBackButton" class="row justify-center bg-white">
      <div class="col-auto q-py-sm">
        <q-btn size="md" outline rounded color="secondary" @click="$router.go(-1)">
          <span class="fal fa-chevron-left q-mr-xs" />
          Zurück
        </q-btn>
      </div>
    </div>
    <!-- menu entries -->
    <div class="row q-mt-sm text-black">
      <div v-for="(menuEntry, menuEntryId) in menuEntries" :key="menuEntryId"
        @click="$router.push({ name: menuEntry.routeName })" class="col-4 text-center text-caption">
        <div>
          <q-icon :name="menuEntry.icon" size="sm" />
        </div>
        {{ menuEntry.name }}
      </div>
    </div>
  </q-footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

interface IMenuEntry {
  name: string,
  icon: string,
  routeName: string
}

const menuEntries = ref<IMenuEntry[]>([
  {
    name: 'Einstellungen',
    icon: 'settings',
    routeName: 'settings'
  },
  {
    name: 'Entdecken',
    icon: 'search',
    routeName: 'home'
  },
  {
    name: 'Meine Läufe',
    icon: 'directions_run',
    routeName: 'races'
  }
])
const showBackButton = ref<boolean>(false)
const router = useRouter()

// decide whether to show the back button or not
router.afterEach((to) => {
  const insideMenuEntries: boolean = !!menuEntries.value.find((menuEntry: IMenuEntry) => {
    return menuEntry.routeName === to.name
  })
  if (!insideMenuEntries) {
    showBackButton.value = true
  } else {
    showBackButton.value = false
  }
})

</script>
