import { EventBus } from 'quasar'
import { defineBoot } from '#q-app/wrappers'

export default defineBoot(({ app }) => {
  const eventBus = new EventBus()

  // for Composition API
  app.provide('eventBus', eventBus)
})