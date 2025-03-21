import { defineStore } from 'pinia'
import {useQuasar} from 'quasar'
import { DirectusUsers } from 'src/types/DirectusTypes'
import { ref, watch } from 'vue'

export const useSyncCenter = defineStore('syncCenter', () => {
  /**
   * DEFINE DATA YOU WANT SYNC
   */
  // const myRaces = ref<Races>(new Races())
  // let filters = reactive<RaceFilter>(new RaceFilter())
  const user = ref<Partial<DirectusUsers> | null>(null)

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
  // readMyRaces()
  // readFilters()
  readUser()
  // function readMyRaces (): void {
  //   const racesFromStore = localStorage.getItem<Races>(MY_RACES_STORAGE_KEY)
  //   if (racesFromStore) {
  //     myRaces.value = new Races().parseJson(racesFromStore)
  //   }
  // }
  // function readFilters (): void {
  //   const filtersFromStore: RaceFilter | null = localStorage.getItem<RaceFilter>(FILTERS_STORAGE_KEY)
  //   if (filtersFromStore) {
  //     Object.assign(filters, filtersFromStore)
  //   }
  // }
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
  // watch(myRaces, () => {
  //   // sort by date
  //   myRaces.value.sortByDate()
  //   localStorage.set(MY_RACES_STORAGE_KEY, myRaces.value)
  // }, {deep: true})
  // // filters
  // watch(filters, () => {
  //   localStorage.set(FILTERS_STORAGE_KEY, filters)
  // }, {deep: true})
  // user
  watch(user, () => {
    localStorage.set(USER_STORAGE_KEY, user.value)
  }, {deep: true})

  return {
    user
  }
})
