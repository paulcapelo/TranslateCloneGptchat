import { type FC } from 'react'
import { AUTO_LANGUAGE, SUPORTED_LANGUAGE } from '../constants/languajesSuport'
import { Selectiontype, type tFromLanguage, type tLanguage } from '../types/languaje.d'

type Props =
  | { title: string, type: 'from', value?: tFromLanguage, onchange: (languaje: tFromLanguage) => void }
  | { title: string, type: 'to', value?: tLanguage, onchange: (languaje: tLanguage) => void }

const SelectLanguaje: FC<Props> = ({ type, value, onchange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onchange(event.target.value as tLanguage)
  }

  return (
    <div className='flex flex-row'>
      <select id={`lenguage${type}`} role={`select${type}`} onChange={handleChange} value={value} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        { type === Selectiontype.From && <option value={`${AUTO_LANGUAGE}`}>Detectar idioma</option>}
        {Object.entries(SUPORTED_LANGUAGE).map(([key, value]) =>
          <option key={`${key}`} value={`${key}`}>{value}</option>
        )}
      </select>
    </div>
  )
}

export default SelectLanguaje
