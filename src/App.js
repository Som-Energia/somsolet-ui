import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

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

  const loadCampaignDetail = () => {
    const CampaignDetails = lazy(() => import('./pages/SomSolet/CampaignDetails'))
    return <CampaignDetails {...props} />
  }

  const loadCampaignDetailNew = () => {
    const CampaignDetailsNew = lazy(() => import('./pages/SomSolet/CampaignDetail-new'))
    return <CampaignDetailsNew {...props} />
  }

  const loadCampaigns = () => {
    const CampaignsPage = lazy(() => import('./pages/SomSolet/Campaigns'))
    return <CampaignsPage {...props} />
  }

  return (
    <>
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
            <Route path="/campaign-detail/:id" render={loadCampaignDetail} />
            <Route path="/campaigns/" render={loadCampaigns} />
            <Route path="/campaign-detail-new" render={loadCampaignDetailNew} />
          </Switch>
        </Router>
      </Suspense>
    </>
  )
}

export default App
