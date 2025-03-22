import { defineStore } from 'pinia'
import {useQuasar} from 'quasar'
import RaceFilter from 'src/classes/RaceFilter'
import { DirectusUsers, Race } from 'src/types/DirectusTypes'
import { ref, watch } from 'vue'

export const useSyncCenter = defineStore('syncCenter', () => {
  /**
   * DEFINE DATA YOU WANT SYNC
   */
  const myRaces = ref<Race[]>([])
  const user = ref<Partial<DirectusUsers> | null>(null)
  const filter = ref<RaceFilter>(new RaceFilter())
  

  /**
   * DEFINE STORE KEY NAMES
   */
  // local storage variables
  const localStorage = useQuasar().localStorage
  const MY_RACES_STORAGE_KEY = 'my-races'
  const FILTERS_STORAGE_KEY = 'filters'
  const USER_STORAGE_KEY = 'user'

  /**
   * INITIAL DATA READING FROM STORE
   */
  // load data from local store
  readMyRaces()
  readFilters()
  readUser()
  function readMyRaces (): void {
    myRaces.value = localStorage.getItem<Race[]>(MY_RACES_STORAGE_KEY) || []
  }
  function readFilters (): void {
    const filtersFromStore: RaceFilter | null = localStorage.getItem<RaceFilter>(FILTERS_STORAGE_KEY)
    if (filtersFromStore) {
      filter.value = new RaceFilter(filtersFromStore)
    } else {
      filter.value = new RaceFilter()
    }
  }
  function readUser (): void {
    const userFromStore: Partial<DirectusUsers> | null = localStorage.getItem<Partial<DirectusUsers>>(USER_STORAGE_KEY)
    if (userFromStore) {
      user.value = userFromStore
    } else {
      user.value = {}
    }
  }

  /**
   * WATCH CHANGES ON THE DATA AND SAVE THEM
   */
  // races
  watch(myRaces, () => {
    // sort by date
    localStorage.set(MY_RACES_STORAGE_KEY, myRaces.value)
  }, {deep: true})
  // filters
  watch(filter, () => {
    localStorage.set(FILTERS_STORAGE_KEY, filter.value)
  }, {deep: true})
  // user
  watch(user, () => {
    localStorage.set(USER_STORAGE_KEY, user.value)
  }, {deep: true})

  return {
    myRaces,
    user,
    filter
  }
})
