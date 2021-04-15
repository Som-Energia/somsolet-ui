import Button from '@material-ui/core/Button'
import OptionField from 'components/SomSolet/OptionField'

const PhaseInfo = ({ data }) => {
  return Object.entries(data).map(([label, value]) => {
    switch (label) {
      case 'file':
        return (
          <OptionField
            key={label}
            label={''}
            value={
              <Button
                size="small"
                variant="contained"
                color="primary"
                target="_blank"
                href={value}
              >
                Descarrega
              </Button>
            }
          />
        )
      case 'action':
        return (
          <OptionField
            key={label}
            label={''}
            value={
              <Button
                size="small"
                variant="contained"
                color="primary"
                target="_blank"
                href={value}
              >
                Som-hi!
              </Button>
            }
          />
        )
      case 'date':
        return <OptionField key={label} label={'Data'} value={value} />
      default:
        if (`${value}`.match('https:')) {
          return (
            <OptionField
              key={label}
              label={''}
              value={
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  target="_blank"
                  href={value}
                >
                  {label}
                </Button>
              }
            />
          )
        }
        return (
          <OptionField key={label} label={label} value={value ? 'Sí' : 'No'} />
        )
    }
  })
}

export default PhaseInfo
