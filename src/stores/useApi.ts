import { defineStore } from 'pinia'
import { createDirectus, rest } from '@directus/sdk'
import type { CustomDirectusTypes } from '../types/DirectusTypes'

export const useApi = defineStore('useApi', () => {
  const API_URL = (): string => {
    return import.meta.env.VITE_API_URL || ''
  }

  const directus = createDirectus<CustomDirectusTypes>(API_URL())
    .with(rest())

  return {
    directus
  }
})
