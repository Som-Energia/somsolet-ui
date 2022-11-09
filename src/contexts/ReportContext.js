import React, { createContext, useEffect, useReducer, useState } from 'react'

export const initialState = {
  contract: null,
  scenario: null,
  params: null,
}

export const SET_REPORT = 'SET_REPORT'
export const SET_CONTRACT = 'SET_CONTRACT'
export const SET_DATA = 'SET_DATA'
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
    case SET_DATA:
      return action.data
    case RESET:
      return initialState
  }
}

const ReportContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [loadData, setLoadData] = useState(false)

  useEffect(() => {
    if (!loadData) {
      const data = JSON.parse(localStorage.getItem('REPORT'))
      if(data){
        dispatch({ type: SET_DATA, data: data })
        setLoadData(true)
      }
    }
  }, [])

  useEffect(() => {
    if(state!==initialState){
      localStorage.setItem('REPORT', JSON.stringify(state))
    }
  }, [state])

  return (
    <ReportContext.Provider value={{report:state,loadData:loadData}}>
      <ReportDispatch.Provider value={{ reportDispatch: dispatch }}>
        {children}
      </ReportDispatch.Provider>
    </ReportContext.Provider>
  )
}

export { ReportContext, ReportDispatch }

export default ReportContextProvider
