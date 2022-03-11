import React from 'react'
import { Page, Text, Document, StyleSheet } from '@react-pdf/renderer'

// Create styles
const styles = StyleSheet.create({
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

    backgroundColor: '#b9db42',
    padding: '15px',
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },

  listitem: {
    marginBottom: 8,
  },
})

// Create Document Component
const Report = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.h1}>
          Informe provisional
          <br />
          <strong style={styles.strong}>autogeneració</strong> fotovoltaica
        </h1>
      </div>
      <div style={styles.warning}>
        <Text>
          <b>Atenció</b>: Aquest informe procura donar una informació
          orientativa a partir de les dades reals de consum del període
          dd-mm-aaaa al dd-mm-aaaa i estimacions aproximades del rendiment de la
          instal·lació així com del seu cost Hem procurat que les fonts siguin
          el màxim fiables i pròximes a la realitat però en cap cas garantim des
          de Som Energia el seu acompliment en el transcurs dels 25 anys de vida
          utils estimats.
        </Text>
      </div>
      <div style={styles.dades}>
        <h2 style={styles.title}>Dades principals</h2>
        <ul style={styles.list}>
          <li style={styles.listitem}>
            Nom: <b>Oscar</b>
          </li>
          <li style={styles.listitem}>
            Direcció: <b>Av Principe de Asturias 6 Ciñera 24660 Leon</b>
          </li>
          <li style={styles.listitem}>
            Num. Contracte: <b>123456</b>
          </li>
        </ul>
      </div>
      <div style={styles.coberta}>
        <h2 style={styles.title}>Dades coberta</h2>
        <ul style={styles.list}>
          <li style={styles.listitem}>
            Orientació: <b>Sud</b>
          </li>
          <li style={styles.listitem}>
            Inclinació: <b>10</b>
          </li>
          <li style={styles.listitem}>
            Superficie útil: <b>35</b>
          </li>
        </ul>
      </div>
      <div style={styles.us}>
        <h2 style={styles.title}>Ús de l’energia</h2>

        <ul style={styles.list}>
          <li style={styles.listitem}>
            Potència contractada: <b>P1 - P3</b>
          </li>
          <li style={styles.listitem}>
            Tarifa: <b>-</b>
          </li>
          <li style={styles.listitem}>
            Ús anual de l’energia: <b>P3</b>
          </li>
        </ul>
      </div>
      <div style={styles.image}></div>

      <div style={styles.plaques}></div>
      <div style={styles.installacio}>
        <h2 style={styles.title}>Característiques instal·lació proposada</h2>
        <ul style={styles.list}>
          <li style={styles.listitem}>
            Nombre de panells: <b>-</b>
          </li>
          <li style={styles.listitem}>
            Potència panells: <b>-</b>
          </li>
          <li style={styles.listitem}>
            Potència total: <b>-</b>
          </li>
          <li style={styles.listitem}>
            Generació anual: <b>-</b>
          </li>
          <li style={styles.listitem}>
            Cost aproximat: <b>-</b>
          </li>
        </ul>
      </div>
      <div style={styles.estudi}>
        <h2 style={styles.heading}>Estudi energètic - econòmic</h2>
      </div>
      <div style={styles.properespases}>
        <h2 style={styles.heading}>Properes pases</h2>
      </div>
      <div style={styles.autogeneracio}>
        <h2 style={styles.heading}>Informació general sobre autogeneració</h2>
      </div>
      <div style={styles.calculs}>
        <h2 style={styles.heading}>
          Com s’han generat els càlculs d’aquest informe?
        </h2>
      </div>
      <div style={styles.peu}>
        <p>Per a qualsevol dubte pots escriure a auto@somenergia.coop</p>
      </div>
    </Page>
  </Document>
)

export default Report
