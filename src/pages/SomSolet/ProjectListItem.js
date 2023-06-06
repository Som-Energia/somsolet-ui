import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Badge from '@material-ui/core/Badge'
import NotificationsIcon from '@material-ui/icons/Notifications'
import VisibilityIcon from '@material-ui/icons/Visibility'
import { Typography } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '5px',
  },
  action: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))

export default function ProjectListItem({ project }) {
  const classes = useStyles()

  console.log(project)
  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <Badge
            badgeContent={project.description.warning !== 'No Warn' ? 0 : 1}
            color="error"
          >
            <NotificationsIcon />
          </Badge>
        }
        title={project.description.registeredPerson.name}
        subheader={project.description.name}
      />
      <CardContent>
        {project.description.warning !== 'No Warn' ? null : (
          <Alert severity="warning">
            This is a warning alert — check it out!
          </Alert>
        )}

        <Typography component="h6">{project.description.stageId}</Typography>
      </CardContent>
      <CardActions className={classes.action}>
        <Button startIcon={<VisibilityIcon />}>VIEW DETAILS</Button>
      </CardActions>
    </Card>
  )
}
