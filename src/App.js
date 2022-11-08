import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ReportContextProvider from 'contexts/ReportContext'
import Report from './pages/Report'

import Loading from './components/Loading'

import './i18n/i18n'
import './App.css'

const App = (props) => {
  const loadSomSolet = () => {
    const SomSolet = lazy(() => import('./pages/SomSolet'))
    return <SomSolet {...props} />
  }

  const loadPVAutoSize = () => {
    const PVAutoSize = lazy(() => import('./pages/PVAutoSize'))
    return <PVAutoSize {...props} />
  }

  /* const loadReport = () => {
    const Report = lazy(() => import('./pages/Report'))
    return <Report {...props} />
  } */

  return (
    <>
      <ReportContextProvider>
        <Suspense fallback={<Loading />}>
          <Router>
            <Switch>
              <Route exact path="/" render={loadPVAutoSize} />
              <Route path="/somsolet" render={loadSomSolet} />
              <Route
                path="/:language/collective-purchases/"
                render={loadSomSolet}
              />
              <Route path="/:language/pvautosize" render={loadPVAutoSize} />
              <Route path="/report">
                <Report />
              </Route>
            </Switch>
          </Router>
        </Suspense>
      </ReportContextProvider>
    </>
  )
}

export default App
