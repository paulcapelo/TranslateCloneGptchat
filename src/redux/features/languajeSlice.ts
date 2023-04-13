import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { AUTO_LANGUAGE } from '../../constants/languajesSuport'
import { type tFromLanguage, type tLanguage, type LanguageType } from '../../types/languaje'

const initialState: LanguageType = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false,
  error: null
}

// actions para language

const getTranslateResult = createAsyncThunk(
  'language/getResul',
  async (_, gptApi) => {
    try {
      return `sacsacsa${Math.random()}`
    } catch (error) {
      return gptApi.rejectWithValue(error)
    }
  }
)

// reducers
export const languajeSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    ChangeLanguage: (state) => {
      if (state.fromLanguage === AUTO_LANGUAGE) return state
      return {
        ...state,
        toLanguage: state.fromLanguage,
        fromLanguage: state.toLanguage
      }
    },
    FromLanguage: (state, action: PayloadAction<tFromLanguage>) => {
      state.fromLanguage = action.payload
      state.loading = state.fromText !== ''
      state.result = ''
    },
    ToLanguage: (state, action: PayloadAction<tLanguage>) => {
      state.toLanguage = action.payload
      state.loading = state.fromText !== ''
      state.result = ''
    },
    Result: (state, action: PayloadAction<string>) => {
      state.result = action.payload
      state.loading = false
    },
    FromText: (state, action: PayloadAction<string>) => {
      state.fromText = action.payload
      state.loading = false
      state.result = ''
      state.loading = state.fromText !== ''
    }

  },
  extraReducers: (builder) => {
    builder.addCase(getTranslateResult.pending, (state) => { state.loading = true })
    builder.addCase(getTranslateResult.fulfilled, (state, action) => { state.loading = false; state.result = action.payload })
    builder.addCase(getTranslateResult.rejected, (state, action) => { state.loading = false; state.error = action.payload })
  }

})

export default languajeSlice.reducer
export const { FromLanguage, ToLanguage, ChangeLanguage, Result, FromText } = languajeSlice.actions
