import OptionField from 'components/SomSolet/OptionField'

const Preregistration = (props) => {
  const { preregistrationInfo } = props
  const preregisrtation = {
    Data: preregistrationInfo.date,
    Pagat: preregistrationInfo.paid ? 'Sí' : 'No',
  }
  return Object.entries(preregisrtation).map(([label, value]) => (
    <OptionField key={label} label={label} value={value} />
  ))
}

export default Preregistration
