import OptionField from 'components/SomSolet/OptionField'

const Project = (props) => {
  const { projectInfo } = props
  const project = {
    Nom: projectInfo.name,
    Campanya: projectInfo.campaign,
    'Data inici': projectInfo.dateStart,
  }
  return Object.entries(project).map(([label, value]) => (
    <OptionField key={label} label={label} value={value} />
  ))
}

export default Project
