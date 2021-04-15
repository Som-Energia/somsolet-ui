import OptionField from 'components/SomSolet/OptionField'

const Registered = (props) => {
  const { registeredInfo } = props
  const registered = {
    Data: registeredInfo.date,
  }
  return Object.entries(registered).map(([label, value]) => (
    <OptionField key={label} label={label} value={value} />
  ))
}

export default Registered
