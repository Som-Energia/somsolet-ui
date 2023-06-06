import React, { useState, useEffect } from 'react'
import { Select, MenuItem, Grid } from '@material-ui/core'
import { getCampaign } from 'services/somsolet/api'
import CampaignDetails from './CampaignDetail-new'

const CampaignsPage = () => {
  const [campaigns, setCampaigns] = useState([])
  const [currentCampaign, setCurrentCampaign] = useState('')

  const getCampaigns = async () => {
    const campaigns = await getCampaign()
    setCampaigns(campaigns)
  }

  useEffect(() => {
    getCampaigns()
  }, [])

  const handleChange = (event) => {
    setCurrentCampaign(event.target.value)
  }


  return (
    <Grid container>
      <Grid item xs={12}>
        {currentCampaign ? (
          <CampaignDetails campaign={currentCampaign} campaigns={campaigns} handleChange={handleChange}/>
        ) : null}
      </Grid>
      <Grid item xs={12}>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={campaigns.length === 0 ? '' : currentCampaign}
          onChange={(event) => handleChange(event)}
        >
          {campaigns.map((campaign) => (
            <MenuItem key={campaign.campaignId} value={campaign}>
              {campaign.name}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  )
}

export default CampaignsPage
