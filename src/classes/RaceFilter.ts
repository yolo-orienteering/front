import { Query } from '@directus/sdk'
import { CustomDirectusTypes, Race } from 'src/types/DirectusTypes'

export type RaceQuery = Query<CustomDirectusTypes, Race>

export default class RaceFilter {
  public deadline: boolean
  public searchString: string | undefined
  public geographicalScale: string | undefined | null
  public regions: string[]
  public limit: number
  public page: number

  constructor (props?: Partial<RaceFilter>) {
    this.deadline = props?.deadline || false
    this.searchString = props?.searchString
    this.geographicalScale = props?.geographicalScale
    this.regions = props?.regions || []
    this.limit = props?.limit || 25
    this.page = props?.page || 1
  }

  public composeRaceQuery ({initialLoad}: {initialLoad?: boolean}): RaceQuery {
    let limit = this.limit
    let page = this.page

    // in case of initial load
    if (initialLoad && page > 1) {
      limit = page * limit
      page = 1
    }

    const composedFilter: RaceQuery = {
      limit,
      page,
      sort: 'date',
      filter: {
        date: {
          _gte: new Date().toISOString()
        }
      }
    } as RaceQuery
  
    composedFilter.filter = {
      ...composedFilter.filter,
      // deadline
      deadline: {
        _nnull: !!this.deadline
      },
      geographicalScale: {
        _eq: this.geographicalScale || null
      }
    }
  
    return composedFilter
  }
}
