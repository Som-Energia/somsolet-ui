import { makeStyles } from '@material-ui/core/styles'

const OptionField = ({ label, value }) => {
  const classes = useStyles()
  return (
    <div className={classes.optionField}>
      <div className={classes.label}>{label}</div>
      <div className={classes.value}>{value}</div>
    </div>
  )
}
export default OptionField

const useStyles = makeStyles((theme) => ({
  label: {
    fontWeight: 500,
    fontSize: '0.9rem',
    color: 'black',
  },
  optionField: {
    display: 'flex',
    justifyContent: 'space-between'
  }
}))
