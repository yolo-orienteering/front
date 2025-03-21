import { readItems, type Query } from '@directus/sdk'
import { defineStore } from 'pinia'
import type { CustomDirectusTypes, Race } from 'src/types/DirectusTypes'
import { computed, onMounted, ref } from 'vue'
import { useApi } from './useApi'
import { Notify } from 'quasar'

export const useRaces = defineStore('useRaces', () => {
  const {directus} = useApi()

  const LIMIT = 25
  const races = ref<Race[]>([])
  const currentPage = ref<number>(1)

  const query = computed<Query<CustomDirectusTypes, Race>>(() => {
    return {
      page: currentPage.value,
      limit: LIMIT,
      sort: '-date'
    }
  })

  onMounted(async () => {
    await loadRaces()
  })

  async function loadRaces (): Promise<void> {
    try {
      const newRaces = await directus.request<Race[]>(readItems('Race', query.value))

      // no more races to load
      if (!newRaces.length) {
        currentPage.value -= 1
        Notify.create({
          message: 'Keine weiteren Läufe verfügbar.'
        })
        return
      }

      races.value = [...races.value, ...newRaces]
    } catch (error) {
      Notify.create({
        message: (error as any).toString(),
        multiLine: true
      })
    }
  }

  return {
    races,
    query,
    currentPage,
    loadRaces
  }
})