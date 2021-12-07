import { makeStyles } from '@material-ui/core/styles'

import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'

const AccordionPanel = (props) => {
  const { panelId, icon, title, children, onChange, expandedPanel } = props
  const classes = useStyles()

  return (
    <Accordion
      square
      elevation={0}
      expanded={expandedPanel === panelId}
      onChange={() => onChange(panelId)}
    >
      <AccordionSummary
        aria-controls={`${panelId}-content`}
        id={`${panelId}-header`}
      >
        <Typography className={classes.heading}>
          {icon}
          {title}
        </Typography>
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
  heading: {
    display: 'flex',
    alignItems: 'center',
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
