const style = {
  page: {
    backgroundColor: 'white',
    display: 'grid',
    padding: '20px',
    gridTemplateColumns: 'repeat(3,1fr)',
    gridGap: '10px',
  },
  title: {
    margin: 0,
    marginBottom: 8,
  },
  heading: {
    backgroundColor: '#beaf17',
    margin: 0,
    padding: '15px 15px ',
  },
  h1: {
    textAlign: 'right',
    textTransform: 'uppercase',
    margin: 0,
  },
  strong: {
    color: '#beaf17',
  },
  header: {
    gridColumn: '1/4',
    padding: '15px',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    gap: '15px',
  },
  warning: {
    gridColumn: '1/4',
    backgroundColor: '#f9cb9c',
    padding: '15px',
  },
  dades: {
    gridColumn: '1/2',
    backgroundColor: '#beaf17',
    padding: '15px',
  },
  coberta: {
    gridColumn: '2/3',
    backgroundColor: '#3f2c20',
    color: 'white',
    padding: '15px',
  },
  us: {
    gridColumn: '1/3',
    backgroundColor: '#d9d9d9',
    padding: '15px',
  },
  image: {
    gridColumn: '3/4',
    gridRow: '3/5',
    backgroundColor: '#ccc',
    padding: '15px',
  },
  plaques: {
    gridColumn: '1/2',
    backgroundColor: '#ccc',
    padding: '15px',
  },
  installacio: {
    gridColumn: '2/4',
    backgroundColor: '#d9d9d9',
    padding: '15px',
  },
  estudi: {
    gridColumn: '1/4',
  },
  properespases: {
    gridColumn: '1/4',
  },
  autogeneracio: {
    gridColumn: '1/4',
  },
  calculs: {
    gridColumn: '1/4',
  },
  peu: {
    gridColumn: '1/4',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '15px',
  },
  peuText: {
    padding: '15px',
    backgroundColor: '#b9db42',
    margin: 0,
    width: '100%',
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
  listitem: {
    marginBottom: 8,
  },
  table: {
    borderCollapse: 'collapse',
  },
  tableHeading: {
    backgroundColor: '#3f2c20',
    color: 'white',
    padding: 15,
    border: '1px solid #ccc',
  },
  tableCell: {
    padding: 15,
    border: '1px solid #ccc',
  },
  container: {
    display: 'flex',
  },
  graphicContainer: {
    width: '100%',
  },
  piesContainer: {
    display: 'flex',
  },
  graphicConsumContainer: {
    gridColumn: '1/4',
    height: '300px',
  },
}

export default style
