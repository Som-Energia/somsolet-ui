import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { ThemeProvider, makeStyles } from '@material-ui/core/styles'
import { theme } from 'themes/somsolet'

import { CssBaseline, Select, MenuItem } from '@material-ui/core'

import { useTranslation } from 'react-i18next'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined'
import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined'
import ListIcon from '@material-ui/icons/List'
import ProjectListItem from './ProjectListItem'

// services
import { getProject } from '../../services/somsolet/api'

const CampaignSelector = (props) => {
  const { handleChange, campaign, campaigns } = props
  return (
    <Select
      labelId="demo-simple-select-helper-label"
      id="demo-simple-select-helper"
      value={campaign}
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

const SomSolet = (props) => {
  console.log('PROPSSSSSS', props)
  const classes = useStyles()
  const { t, i18n } = useTranslation()
  const { campaign, handleChange, campaigns } = props
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const language = props?.match?.params?.language
    language && i18n.changeLanguage(language)
  }, [props?.match?.params?.language, i18n])

  const getProjects = async () => {
    const projects = await getProject()
    setProjects(projects)
  }

  useEffect(() => {
    getProjects()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" className={classes.root}>
        <Grid container>
          {!projects || projects.length === 0 ? (
            <Grid item xs={12}>
              <div className={clsx(classes.column, classes.noResultsContainer)}>
                <h3 className={classes.noResults}>
                  {' '}
                  {t('NOT_COLLECTIVE_PURCHASES')}{' '}
                </h3>
              </div>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <div className={clsx(classes.column)}>
                <div className={clsx(classes.mainHeader)}>
                  <h2> {campaign.name} </h2>
                  <CampaignSelector
                    campaign={campaign}
                    campaigns={campaigns}
                    handleChange={handleChange}
                  />
                </div>
                <div>
                  <div className={clsx(classes.projInfo)}>
                    {' '}
                    <div className={classes.projInfoItems}>
                      <RoomOutlinedIcon fontSize="small" />
                      &nbsp;{campaign.region?.geographicalRegion}, &nbsp;
                      {campaign.region?.autonomousCommunity}
                    </div>
                    <div className={classes.projInfoItems}>
                      <ListIcon fontSize="small" />
                      &nbsp;{campaign.installations?.inscriptions}
                      &nbsp; {t('INSCRIPTIONS')}
                      &nbsp;
                      <WbSunnyOutlinedIcon fontSize="small" />
                      &nbsp;{campaign.installations?.completed}
                      &nbsp; {t('INSTALLATIONS')}
                      &nbsp;
                    </div>
                  </div>
                </div>
              </div>
              <div>
                {projects.map((element) => (
                  <ProjectListItem key={element.id} project={element} />
                ))}
              </div>
            </Grid>
          )}
        </Grid>
      </Container>
    </ThemeProvider>
  )
}

export default SomSolet

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: '4px',
    paddingRight: '4px',
  },
  column: {
    margin: theme.spacing(1),
    padding: '16px 12px 25px 12px',
    textAlign: 'center',
    color: '#4d4d4d',
    backgroundColor: '#ffffff',
  },
  projInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: theme.spacing(2),
  },
  projInfoItems: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(2),
  },
  fullHeight: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: 'calc(100vh - 34px)',
  },
  option: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    marginBottom: '12px',
    padding: '8px 12px',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: '#96b633',
      color: '#fff',
    },
  },
  activeOption: {
    backgroundColor: '#96b633',
    color: '#fff',
    '&:hover': {
      color: '#4d4d4d',
    },
    '&::before': {
      backgroundColor: '#96b633',
    },
  },
  optionContent: {
    marginBottom: '16px',
    fontSize: '14px',
  },
  optionField: {
    textAlign: 'left',
    padding: '8px 16px',
  },
  mainHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  mainHeaderInfo: {
    textAlign: 'right',
    fontSize: '0.85rem',
    lineHeight: '1.25rem',
    '& div': {
      alignItems: 'center',
      justifyContent: 'flex-end',
      display: 'flex',
    },
  },
  engineeringInfo: {
    paddingTop: '8px',
    paddingBottom: '16px',
  },
  main: {
    marginTop: theme.spacing(2),
    paddingTop: '16px',
    paddingBottom: '16px',
    minHeight: '620px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  phase: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#b1bf82',
    marginBottom: '12px',
    padding: '8px 12px',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: 500,
    color: '#fff',
    '&:hover': {},
    '& div': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  futurePhase: {
    backgroundColor: '#f2f2f2',
    color: '#4d4d4d',
    cursor: 'default',
  },
  currentPhase: {
    backgroundColor: '#96b633',
    color: '#fff',
    cursor: 'pointer',
  },
  phaseName: {
    paddingLeft: '8px',
  },
  phaseIcon: {
    display: 'flex',
    alignItems: 'center',
    opacity: '0.7',
  },
  phaseTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    color: 'rgba(77, 77, 77, 0.65)',
    padding: '0 16px 0 16px',
    cursor: 'pointer',
    '& h3': {
      fontSize: '1em',
      margin: '16px 0 16px 0',
      fontWeight: 500,
    },
  },
  mainPhase: {
    display: 'block',
    textAlign: 'left',
    color: '#4d4d4d',
    backgroundColor: '#fff',
    margin: '24px 0',
    padding: '0 16px 0 16px',
    '& h3': {
      fontSize: '1.25em',
      fontWeight: 600,
      marginBottom: '24px',
    },
  },
  separator: {
    flexGrow: 1,
  },
  noResults: {
    fontSize: '1rem',
    fontWeight: 400,
    margin: 0,
  },
  noResultsContainer: {
    marginTop: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  },
}))
