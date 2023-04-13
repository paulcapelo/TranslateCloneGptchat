import { type AUTO_LANGUAGE, type SUPORTED_LANGUAGE } from '../constants/languajesSuport'

export type tLanguage = keyof typeof SUPORTED_LANGUAGE
export type tAutoLanguage = typeof AUTO_LANGUAGE
export type tFromLanguage = tLanguage | tAutoLanguage

export interface LanguageType {
  fromLanguage: tFromLanguage
  toLanguage: tLanguage
  fromText: string
  result: string
  loading: boolean
  error: any
}

export enum Selectiontype {
  From = 'from',
  to = 'to'
}
