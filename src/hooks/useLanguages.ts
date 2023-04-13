import { useAppDispatch, useAppSelector } from '../redux/store'
import { ChangeLanguage, FromLanguage, ToLanguage, Result, FromText } from '../redux/features/languajeSlice'
import { type tLanguage, type tFromLanguage } from '../types/languaje'

export default function useLanguages () {
  const dispatch = useAppDispatch()
  const estado = useAppSelector(state => state.language)
  const interchangeLanguajes = () => { dispatch(ChangeLanguage()) }
  const setFromLanguage = (payload: tFromLanguage) => { dispatch(FromLanguage(payload)) }
  const setToLanguage = (payload: tLanguage) => { dispatch(ToLanguage(payload)) }
  const setResult = (payload: string) => { dispatch(Result(payload)) }
  const setFromText = (payload: string) => { dispatch(FromText(payload)) }

  return {
    ...estado,
    interchangeLanguajes,
    setFromLanguage,
    setResult,
    setFromText,
    setToLanguage
  }
}
