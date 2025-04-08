import { useSyncCenter } from 'src/stores/syncCenter'
import { Race } from 'src/types/DirectusTypes'

type RaceLinkType = 'event' | 'publication' | 'ranking' | 'inscription' | 'liveResult'

export function useRace () {
  const syncCenter = useSyncCenter()

  function composeLink ({race, linkType}: {race: Race, linkType: RaceLinkType}): string | undefined {
    let linkToOpen: string | undefined | null = undefined
    switch (linkType) {
      case 'event':
        linkToOpen = race.eventLink
        break
      case 'inscription':
        linkToOpen = race.inscriptionLink
        break
      case 'publication':
        linkToOpen = race.publicationLink
        break
      case 'ranking':
        linkToOpen = race.rankingLink
        break
      case 'liveResult':
        linkToOpen = race.liveResultLink
        break
      default:
        break
    }

    return linkToOpen || undefined
  }

  function addOrRemoveRace(race: Race) {
    const index = syncCenter.myRaces.findIndex((r) => r.id === race.id)
    if (index === -1) {
      syncCenter.myRaces.push(race)
    } else {
      syncCenter.myRaces.splice(index, 1)
    }
  }


  return {
    composeLink,
    addOrRemoveRace
  }
}