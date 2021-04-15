import OptionField from 'components/SomSolet/OptionField'

const RegisteredPerson = (props) => {
  const { registeredPersonInfo } = props
  const registeredPerson = {
    Nom: registeredPersonInfo.name,
    Email: registeredPersonInfo.email,
    Telèfon: registeredPersonInfo.phoneNumber,
    Idioma: registeredPersonInfo.language,
  }
  return Object.entries(registeredPerson).map(([label, value]) => (
    <OptionField key={label} label={label} value={value} />
  ))
}

export default RegisteredPerson
