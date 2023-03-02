import OptionField from 'components/SomSolet/OptionField'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'

const RegisteredPerson = (props) => {
  const { registeredPersonInfo } = props
  const registeredPerson = {
    Nom: registeredPersonInfo.name,
    Email: registeredPersonInfo.email,
    Telèfon: registeredPersonInfo.phoneNumber,
    Idioma: registeredPersonInfo.language,
  }

  return (
    <Card sx={{ padding: '1rem' }}>
      <p />
      <b style={{ fontSize: 'larger' }}>Persona Inscrita</b>
      <p />
      <Divider />
      <CardContent>
        {Object.entries(registeredPerson).map(([label, value]) => (
          <OptionField key={label} label={label} value={value} />
        ))}
      </CardContent>
    </Card>
  )
}

export default RegisteredPerson
