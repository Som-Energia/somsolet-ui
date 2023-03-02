import OptionField from 'components/SomSolet/OptionField'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Divider from '@material-ui/core/Divider'

const SupplyPoint = (props) => {
  const { supplyPointInfo } = props
  const supplypoint = {
    CUPS: supplyPointInfo.cups,
    Direcció: supplyPointInfo.address?.street,
    Població: `${supplyPointInfo.address?.town} (${supplyPointInfo.address?.municipality})`,
    'Potència contractada': `${supplyPointInfo.power} kW`,
    "Tarifa d'accès": supplyPointInfo.tariff,
  }
  return (
    <Card sx={{ padding: '1rem' }}>
      <p />
      <b style={{ fontSize: 'larger' }}>Punt de Sumbimistrament</b>
      <p />
      <Divider />
      <CardContent>
        {Object.entries(supplypoint).map(([label, value]) => (
          <OptionField key={label} label={label} value={value} />
        ))}
      </CardContent>
    </Card>
  )
}

export default SupplyPoint
