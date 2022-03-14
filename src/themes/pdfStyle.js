const style = {
  page: {
    backgroundColor: 'white',
    display: 'grid',
    padding: '20px',
    gridTemplateColumns: 'repeat(3,1fr)',
    gridGap: 10,
    fontSize: 13,
  },
  title: {
    margin: 0,
    marginBottom: 8,
  },
  heading: {
    backgroundColor: '#beaf17',
    margin: 0,
    padding: 10,
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
    padding: 10,
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    gap: 10,
  },
  warning: {
    gridColumn: '1/4',
    backgroundColor: '#f9cb9c',
    padding: 10,
  },
  warningText: {
    margin: 0,
  },
  dades: {
    gridColumn: '1/2',
    backgroundColor: '#beaf17',
    padding: 10,
  },
  coberta: {
    gridColumn: '2/3',
    backgroundColor: '#3f2c20',
    color: 'white',
    padding: 10,
  },
  us: {
    gridColumn: '1/3',
    backgroundColor: '#d9d9d9',
    padding: 10,
  },
  image: {
    gridColumn: '3/4',
    gridRow: '3/5',
    backgroundColor: '#ccc',
    padding: 10,
  },
  plaques: {
    gridColumn: '1/2',
    backgroundColor: '#ccc',
    padding: 10,
  },
  installacio: {
    gridColumn: '2/4',
    backgroundColor: '#d9d9d9',
    padding: 10,
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
    gap: 10,
  },
  peuText: {
    padding: 10,
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
    padding: 10,
    border: '1px solid #ccc',
  },
  tableCell: {
    padding: 10,
    border: '1px solid #ccc',
    textAlign: 'center',
  },
  container: {
    display: 'flex',
  },
  graphicContainer: {
    gridColumn: '1/4',
    width: '100%',
    height: 300,
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
