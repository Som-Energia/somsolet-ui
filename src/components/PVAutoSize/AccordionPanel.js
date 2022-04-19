import { makeStyles } from '@material-ui/core/styles'

import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'

const AccordionPanel = ({
  panelId,
  icon,
  title,
  children,
  onChange,
  expandedPanel,
  description,
  onClickTab,
  disabled,
}) => {
  const classes = useStyles()

  const panelNumber = Number(panelId.charAt(panelId.length - 1))

  return (
    <Accordion
      square
      elevation={0}
      expanded={expandedPanel === panelId}
      onChange={() => onChange(panelId)}
      onClick={() => !disabled && onClickTab(panelNumber)}
    >
      <AccordionSummary
        className={classes.summary}
        aria-controls={`${panelId}-content`}
        id={`${panelId}-header`}
      >
        <Typography className={classes.heading}>
          {icon}
          {title}
        </Typography>
        {description && (
          <Typography className={classes.description}>{description}</Typography>
        )}
      </AccordionSummary>
      <AccordionDetails className={classes.detailsNoPadding}>
        {children}
      </AccordionDetails>
    </Accordion>
  )
}

const useStyles = makeStyles((theme) => ({
  expandIconColor: {
    color: theme.palette.primary.main,
  },
  detailsNoPadding: {
    borderTop: '1px solid rgba(0, 0, 0, 0.12)',
    padding: 0,
  },
  description: {
    width: '100%',
    fontSize: theme.typography.pxToRem(14),
    marginTop: 8,
    marginBottom: 0,
  },
  summary: {
    '& .MuiAccordionSummary-content': {
      display: 'block',
    },
  },
  heading: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginTop: 8,
    cursor: 'pointer',
    fontSize: theme.typography.pxToRem(16),
    [theme.breakpoints.up('sm')]: {
      fontSize: theme.typography.pxToRem(18),
    },
    fontWeight: 300,
    textTransform: 'uppercase',
    '& .MuiSvgIcon-root': {
      marginRight: '16px',
    },
  },
}))

export default AccordionPanel
