import React, { useEffect, useState } from 'react'
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Select,
  MenuItem
} from '@material-ui/core'
import { getProject } from 'services/somsolet/api'
import ProjectListItem from './ProjectListItem'
import { makeStyles } from '@material-ui/core/styles'

const CampaignSelector = (props) => {
    const {handleChange,currentCampaign,campaigns} = props
  return (
    <Select
      labelId="demo-simple-select-helper-label"
      id="demo-simple-select-helper"
      value={currentCampaign}
      onChange={(event) => handleChange(event)}
    >
      {campaigns.map((campaign) => (
        <MenuItem key={campaign.campaignId} value={campaign}>
          {campaign.name}
        </MenuItem>
      ))}
    </Select>
  )
}


const useStyles = makeStyles((theme) => ({
    header: {
      display: 'flex',
      justifyContent:'space-between'
    }
  }))

function CampaignDetails(props) {
  const { campaign, handleChange, campaigns } = props
  const [projects, setProjects] = useState([])
  const classes = useStyles()

  const getProjects = async () => {
    const projects = await getProject()
    setProjects(projects)
  }

  useEffect(() => {
    getProjects()
  }, [])

  /*  zona
    num total instal·lacions
    num total de projectes en marxa
    num total de projectes complerts
*/

  return (
    <Grid container>
      <Grid item xs={12} className={classes.header}>
        <Typography component="h1">CAMPANYA SARGANTANA</Typography>
        <CampaignSelector currentCampaign={campaign} campaigns={campaigns} handleChange={handleChange} />
      </Grid>
      <Grid item container>
        <Grid item xs={12} md={6}>
          <List>
            <ListItem>
              <ListItemText
                primary={campaign.region.autonomousCommunity}
                secondary={campaign.region.geographicalRegion}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Total instal·lacions"
                secondary={campaign.installationsStatus.inscriptions}
              />
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <List>
            <ListItem>
              <ListItemText
                primary="Projectes en marxa"
                secondary={campaign.installationsStatus.ongoing}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Projectes complerts"
                secondary={campaign.installationsStatus.completed}
              />
            </ListItem>
          </List>
        </Grid>
      </Grid>
      <Typography component="h1">CAMPANYA SARGANTANA</Typography>

      <Grid item xs={12}>
        {projects.map((element) => (
          <ProjectListItem key={element.id} project={element} />
        ))}
      </Grid>
    </Grid>
  )
}

export default CampaignDetails
