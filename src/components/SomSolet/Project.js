import OptionField from 'components/SomSolet/OptionField'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'

const Project = (props) => {
  const { projectInfo } = props
  const project = {
    Nom: projectInfo.name,
    Campanya: projectInfo.campaign,
    'Data inici': projectInfo.dateStart,
  }

  return (
    <Card sx={{ padding: '1rem' }}>
      <p />
      <b style={{ fontSize: 'larger' }}>Projecte</b>
      <p />
      <Divider />
      <CardContent>
        {Object.entries(project).map(([label, value]) => (
          <OptionField key={label} label={label} value={value} />
        ))}
      </CardContent>
    </Card>
  )
}

export default Project
