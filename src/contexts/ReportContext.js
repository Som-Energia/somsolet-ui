import React, { createContext, useReducer } from 'react'

export const initialState = {
  contract: null,
  scenario: null,
  params: null
}

export const SET_REPORT = 'SET_REPORT'
export const SET_CONTRACT = 'SET_CONTRACT'
export const RESET = 'RESET'

const ReportContext = createContext()
const ReportDispatch = createContext()

export const reducer = (prevState, action) => {
  switch (action.type) {
    case SET_CONTRACT:
      return {
        ...prevState,
        contract: action.contract,
      }
    case SET_REPORT:
      return {
        ...prevState,
        scenario: action.data.scenario,
        params: action.data.params,
      }
    case RESET:
      return initialState
  }
}

const ReportContextProvider = ({ children }) => {
  // El tercer parametre del reducer pot ser una funció que ens inicialitzi l'estat
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <ReportContext.Provider value={state}>
      <ReportDispatch.Provider value={{ reportDispatch: dispatch }}>
        {children}
      </ReportDispatch.Provider>
    </ReportContext.Provider>
  )
}

export { ReportContext, ReportDispatch }

export default ReportContextProvider
