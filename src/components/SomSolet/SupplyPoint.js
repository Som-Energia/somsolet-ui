import OptionField from 'components/SomSolet/OptionField'

const SupplyPoint = (props) => {
  const { supplyPointInfo } = props
  const supplypoint = {
    CUPS: supplyPointInfo.cups,
    Direcció: supplyPointInfo.address?.street,
    Població: `${supplyPointInfo.address?.town} (${supplyPointInfo.address?.municipality})`,
    'Potència contractada': `${supplyPointInfo.power} kW`,
    "Tarifa d'accès": supplyPointInfo.tariff,
  }
  return Object.entries(supplypoint).map(([label, value]) => (
    <OptionField key={label} label={label} value={value} />
  ))
}

export default SupplyPoint
