import './App.css'
import { SelectLanguaje, TextArea } from './components'
import { useDebounce, useLanguages } from './hooks'
import { Arrowchange } from './assets'
import { AUTO_LANGUAGE } from './constants'
import { Selectiontype } from './types'
import { useEffect } from 'react'
import { translate } from './services/Translate'

function App () {
  const { fromLanguage, toLanguage, fromText, result, loading, setFromText, setResult, interchangeLanguajes, setFromLanguage, setToLanguage } = useLanguages()
  const debounceText = useDebounce(fromText, 500)

  const translateHandle = () => {
    if (debounceText === '') return ''

    translate({ fromLanguage, toLanguage, text: debounceText }).then(result => {
      if (result == null) return
      setResult(result)
    }).catch(() => { setResult('Error') })
  }
  useEffect(() => {
    translateHandle()
  }, [debounceText, toLanguage, fromLanguage])

  return (
    <div className="App">
      <h1 className='text-lg'>Google translate Clone</h1>
      <div className="flex gap-2 min-w-[600px] p-3">
        <div className='flex flex-1 flex-col gap-5' >
          <SelectLanguaje type='from' title='From: ' onchange={setFromLanguage} value={fromLanguage} />
          <TextArea type={Selectiontype.From} placeholder='Introducir Texto' value={fromText} onChange={setFromText} />
        </div>
        <div>
          <button type='button' className={`flex align-top  py-0 text-white ${fromLanguage === AUTO_LANGUAGE ? 'cursor-not-allowed' : ''}`} onClick={() => { interchangeLanguajes() }} disabled={fromLanguage === AUTO_LANGUAGE}>
            <Arrowchange />
          </button>
        </div>
        <div className='flex flex-1 flex-col gap-5' >
          <SelectLanguaje type='to' title='To: ' onchange={setToLanguage} value={toLanguage} />
          <TextArea type={Selectiontype.to} placeholder={`${loading ? 'Cargando...' : 'Traduccion'}`} value={result} onChange={setResult} />
        </div>
      </div>
    </div >
  )
}

export default App
