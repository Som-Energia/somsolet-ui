import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import { ThemeProvider, makeStyles } from '@material-ui/core/styles'
import { theme } from 'themes/somsolet'

import CssBaseline from '@material-ui/core/CssBaseline'

import { useTranslation } from 'react-i18next'

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import SpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'

import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined'
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined'
import MailOutlinedIcon from '@material-ui/icons/MailOutlined'
import PowerSettingsNewOutlinedIcon from '@material-ui/icons/PowerSettingsNewOutlined'
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined'
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined'
import RedoOutlinedIcon from '@material-ui/icons/RedoOutlined'
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined'
import UndoOutlinedIcon from '@material-ui/icons/UndoOutlined'
import WbSunnyOutlinedIcon from '@material-ui/icons/WbSunnyOutlined'

import Loading from 'components/Loading'
import PhaseInfo from 'components/SomSolet/PhaseInfo'
import SupplyPoint from 'components/SomSolet/SupplyPoint'
import Project from 'components/SomSolet/Project'
import RegisteredPerson from 'components/SomSolet/RegisteredPerson'
import Preregistration from 'components/SomSolet/Preregistration'
import Registered from 'components/SomSolet/Registered'
import ContactDialog from 'components/SomSolet/ContactDialog'
import IncidenceDialog from 'components/SomSolet/IncidenceDialog'

// services
import {
  getCampaign,
  getProject,
  sendContact,
  sendIncidence,
} from '../services/somsolet/api'

const SomSolet = (props) => {
  const classes = useStyles()
  const { t, i18n } = useTranslation()

  const [stages, setStages] = useState([])
  const [campaign, setCampaign] = useState([])
  const [isLoadingCampaign, setIsLoadingCampaign] = useState(true)
  const [project, setProject] = useState([])
  const [isLoadingProject, setIsLoadingProject] = useState(true)
  const [activeOption, setActiveOption] = useState(1)
  const [activePhase, setActivePhase] = useState(0)
  const [currentPhase, setCurrentPhase] = useState('preinforme')
  const [prevPhase, setPrevPhase] = useState('prereport')
  const [nextPhase, setNextPhase] = useState('technicalVisit')

  const [openContact, setOpenContact] = useState(false)
  const [openIncidence, setOpenIncidence] = useState(false)
  const [open, setOpen] = React.useState(false)
  const [isSending, setSending] = useState(false)

  let afterCurrent = false

  useEffect(() => {
    const language = props?.match?.params?.language
    language && i18n.changeLanguage(language)
  }, [props?.match?.params?.language, i18n])

  useEffect(() => {
    setIsLoadingProject(true)
    getProject({ dni: '', language: i18n.language }) // TODO: find vat from OV
      .then((response) => {
        const projectInfo = response[0] // TODO: to check
        const projectDescription = projectInfo.description
        const project = getProjectList(projectDescription)
        setProject(project.reverse())
        const stages = projectInfo.stages
        const phasesList = getPhasesList(stages)
        setStages(phasesList)
        setCurrentPhase(projectDescription?.stageId)
        setActivePhase(projectDescription?.stageId)
        setIsLoadingProject(false)
      })
      .catch((error) => {
        console.error(error)
        setIsLoadingProject(false)
      })
  }, [])

  useEffect(() => {
    setIsLoadingCampaign(true)
    getCampaign()
      .then((response) => {
        const campaign = response[0] // TODO: to check
        setCampaign(campaign)
        setIsLoadingCampaign(false)
      })
      .catch((error) => {
        console.error(error)
        setIsLoadingCampaign(false)
      })
  }, [])

  useEffect(() => {
    if (stages.length) {
      const itemPhase = stages.find((item) => item.id === activePhase)
      const indexPhase = stages.indexOf(itemPhase)
      const prevIndexPhase = indexPhase - 1
      const nextIndexPhase = indexPhase + 1
      setPrevPhase(prevIndexPhase >= 0 ? stages[prevIndexPhase]?.id : false)
      setNextPhase(
        nextIndexPhase <= stages.length ? stages[nextIndexPhase]?.id : false
      )
    }
  }, [activePhase, stages])

  const getPhasesList = (stages) => {
    const phasesist = []
    Object.entries(stages).forEach(([key, value], index) => {
      if (key !== 'stageId' && key !== 'discardedType') {
        const title = getPhaseTitle(key)
        const content = getPhaseContent(key, value)
        const info = {
          id: key,
          title: title,
          content: content,
        }
        phasesist.push(info)
      }
    })
    return phasesist
  }

  const getProjectList = (projectDescription) => {
    const project = []
    Object.entries(projectDescription).forEach(([key, value]) => {
      const content = getOptionContent(key, value)
      const title = getOptionTitle(key)
      const info = {
        id: key,
        title: title,
        content: content,
      }
      info.title && info.content && project.push(info)
    })
    return project
  }

  // TODO: Refactor
  const getOptionTitle = (key) => {
    switch (key) {
      case 'supplyPoint':
        return 'Punt de Subministrament'
      case 'projectId':
        return 'Projecte'
      case 'registeredPerson':
        return 'Persona inscrita'
      case 'preregistration':
        return 'Inscripció inicial'
      case 'registered':
        return 'Proposta final'
      default:
        return ''
    }
  }

  const getOptionContent = (key, value) => {
    switch (key) {
      case 'supplyPoint':
        return <SupplyPoint supplyPointInfo={value} />
      case 'project':
        return <Project projectInfo={value} />
      case 'registeredPerson':
        return <RegisteredPerson registeredPersonInfo={value} />
      case 'preregistration':
        return <Preregistration preregistrationInfo={value} />
      case 'registered':
        return <Registered registeredInfo={value} />
      default:
        return <></>
    }
  }

  const getPhaseTitle = (key) => {
    switch (key) {
      case 'registered':
        return 'Registre'
      case 'prereport':
        return 'Preinforme'
      case 'technicalVisits':
        return 'Informe visita tècnica'
      case 'report':
        return 'Report'
      case 'offer':
        return "Proposta d'oferta final"
      case 'offer_accepted':
        return 'Oferta acceptada'
      case 'constructionPermit':
        return "Permís d'obra"
      case 'installation':
        return 'Instal·lació'
      case 'deliveryCertificate':
        return 'Acta de recepció'
      case 'legalRegistration':
        return 'Registre Legal'
      case 'legalization':
        return 'Legalització'
      case 'invoices':
        return 'Factura'
      case 'signature':
        return 'Signatura Contracte Clau en mà'
      default:
        return ''
    }
  }

  // TODO: Refactor
  const getPhaseContent = (key, value) => {
    return <PhaseInfo data={value} />
  }

  const getPhase = (stages, phaseId, withContent = false) => {
    if (stages.length) {
      const { title, content } = stages.find(({ id }) => phaseId === id)
      return (
        <>
          <h3>{title}</h3>
          {withContent && <div> {content} </div>}
        </>
      )
    }
  }

  const handleSendContact = async (data) => {
    try {
      setSending(true)
      await sendContact(data)
    } catch (error) {
      // report error
      console.error(error)
    }
    setSending(false)
    setOpenContact(false)
  }

  const handleSendIncidence = async (data) => {
    try {
      setSending(true)
      await sendIncidence(data)
    } catch (error) {
      // report error
      console.error(error)
    }
    setSending(false)
    setOpenIncidence(false)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const actions = [
    {
      name: t('CONTACT_INSTALL'),
      icon: <MailOutlinedIcon fontSize="small" />,
      click: () => setOpenContact(true),
    },
    {
      name: t('NOTIFY_INCIDENCE'),
      icon: <ReportProblemOutlinedIcon fontSize="small" />,
      click: () => setOpenIncidence(true),
    },
    {
      name: t('UNSUBSCRIBE'),
      icon: <PowerSettingsNewOutlinedIcon fontSize="small" />,
    },
  ]

  return isLoadingCampaign || isLoadingProject ? (
    <Loading />
  ) : (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg" className={classes.root}>
        <Grid container>
          {!project || project.length === 0 ? (
            <Grid item xs={12}>
              <div className={clsx(classes.column, classes.noResultsContainer)}>
                <h3 className={classes.noResults}>
                  {' '}
                  {t('NOT_COLLECTIVE_PURCHASES')}{' '}
                </h3>
              </div>
            </Grid>
          ) : (
            <>
              <Grid item sm={12} xs={12}>
                <div className="">
                  <div className={clsx(classes.column, classes.mainHeader)}>
                    <h2> {campaign.name} </h2>
                    <div className={classes.mainHeaderInfo}>
                      <div>
                        {' '}
                        <WbSunnyOutlinedIcon fontSize="small" />
                        &nbsp;{campaign.installations?.completed}
                        &nbsp; {t('INSTALLATIONS')}
                        &nbsp;
                        <RoomOutlinedIcon fontSize="small" />
                        &nbsp;{campaign.region?.geographicalRegion}, &nbsp;
                        {campaign.region?.autonomousCommunity}
                      </div>
                      <div>
                        {' '}
                        {campaign?.engineering &&
                          campaign.engineering.map(
                            ({ name, address, email, phoneNumber }) => (
                              <div
                                key={name}
                                className={classes.engineeringInfo}
                              >
                                &nbsp; <SettingsOutlinedIcon fontSize="small" />
                                &nbsp;{' '}
                                <div>
                                  <a
                                    href={`mailto:${address}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    {name}
                                  </a>
                                  &nbsp; ({phoneNumber})
                                </div>
                              </div>
                            )
                          )}
                        &nbsp;
                      </div>
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid item sm={12} xs={12}>
                <div className={clsx(classes.column, classes.fullHeight)}>
                  <div>
                    <div
                      className={clsx(
                        classes.option,
                        activeOption === 0 && classes.activeOption
                      )}
                      onClick={() => {
                        activeOption === 0
                          ? setActiveOption(false)
                          : setActiveOption(0)
                      }}
                    >
                      {activeOption === 0 ? (
                        <ArrowDropDownIcon fontSize="small" />
                      ) : (
                        <ArrowRightIcon fontSize="small" />
                      )}
                      &nbsp;{'INFO GENERAL'}
                    </div>
                    {activeOption === 0 && (
                      <div
                        className={clsx(
                          classes.optionContent,
                          classes.generalInfo
                        )}
                      >
                        {project.map(({ title, content }, index) => (
                          <Grid key={index} item sm={4} xs={12}>
                            <div key={index}>{content}</div>
                          </Grid>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className={classes.separator}> </div>
                  <div>
                    <div
                      className={clsx(
                        classes.option,
                        activeOption === 1 && classes.activeOption
                      )}
                      onClick={() => {
                        activeOption === 1
                          ? setActiveOption(false)
                          : setActiveOption(1)
                      }}
                    >
                      {activeOption === 1 ? (
                        <ArrowDropDownIcon fontSize="small" />
                      ) : (
                        <ArrowRightIcon fontSize="small" />
                      )}
                      &nbsp;{'PROCES'}
                    </div>
                    {activeOption === 1 && (
                      <div className={classes.optionContent}>
                        <div className={clsx(classes.column, classes.main)}>
                          <>
                            <Grid item sm={9} xs={12}>
                              <div className={classes.column}>
                                {prevPhase && (
                                  <div
                                    className={classes.phaseTitle}
                                    onClick={(event) =>
                                      setActivePhase(prevPhase)
                                    }
                                  >
                                    {getPhase(stages, prevPhase)}
                                    <UndoOutlinedIcon />
                                  </div>
                                )}

                                <div className={classes.mainPhase}>
                                  {getPhase(stages, activePhase, true)}
                                </div>
                              </div>
                              <div className={classes.column}>
                                {nextPhase && (
                                  <div
                                    className={classes.phaseTitle}
                                    onClick={() =>
                                      currentPhase === activePhase
                                        ? ''
                                        : setActivePhase(nextPhase)
                                    }
                                  >
                                    {getPhase(stages, nextPhase)}
                                    <RedoOutlinedIcon />
                                  </div>
                                )}
                              </div>
                            </Grid>
                            <Grid item sm={3} xs={12}>
                              <div className={classes.column}>
                                {stages &&
                                  stages.map(({ id, title }) => {
                                    const isClickable = !afterCurrent
                                    afterCurrent =
                                      afterCurrent || currentPhase === id
                                    return (
                                      <div
                                        key={id}
                                        className={clsx(
                                          classes.phase,
                                          afterCurrent && classes.futurePhase,
                                          currentPhase === id &&
                                            classes.currentPhase
                                        )}
                                        onClick={() =>
                                          isClickable && setActivePhase(id)
                                        }
                                      >
                                        <div className={classes.phaseIcon}>
                                          {afterCurrent ? (
                                            <CheckBoxOutlineBlankOutlinedIcon />
                                          ) : (
                                            <CheckBoxOutlinedIcon />
                                          )}
                                        </div>
                                        <div className={classes.phaseName}>
                                          {title}
                                        </div>
                                      </div>
                                    )
                                  })}
                              </div>
                            </Grid>
                          </>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className={classes.separator}> </div>
                </div>
              </Grid>
            </>
          )}
        </Grid>
        <ContactDialog
          open={openContact}
          handleClose={() => setOpenContact(false)}
          isSending={isSending}
          handleSend={handleSendContact}
        />
        <IncidenceDialog
          open={openIncidence}
          handleClose={() => setOpenIncidence(false)}
          isSending={isSending}
          handleSend={handleSendIncidence}
        />
      </Container>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        className={classes.speedDial}
        icon={<SpeedDialIcon />}
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action?.click}
          />
        ))}
      </SpeedDial>
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
    padding: '16px 12px 1px 12px',
    textAlign: 'center',
    color: '#4d4d4d',
    backgroundColor: '#ffffff',
  },
  fullHeight: {
    display: 'flex',
    flexDirection: 'column',
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
    alignItems: 'baseline',
    flexWrap: 'wrap',
    '& h2': {
      fontSize: '32px',
      margin: 0,
      paddingRight: '1rem',
      whiteSpace: 'nowrap',
    },
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
  buttons: {
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  generalInfo: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  speedDial: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}))
