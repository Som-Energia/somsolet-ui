import React, { useEffect, useState } from 'react'
import { Page, Text, Document, StyleSheet } from '@react-pdf/renderer'
import axios from 'axios'
import pdfStyle from '../themes/pdfStyle'

const styles = StyleSheet.create(pdfStyle)

const Report = () => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  console.log({ data, isLoading, isError })

  useEffect(() => {
    const fetchData = async () => {
      setIsError(false)
      setIsLoading(true)
      try {
        const result = await axios(
          `https://run.mocky.io/v3/0dc09e7a-da78-484f-99e3-63137f0400ad`
        )

        setData(result.data)
      } catch (error) {
        setIsError(true)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [])

  return (
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
            dd-mm-aaaa al dd-mm-aaaa i estimacions aproximades del rendiment de
            la instal·lació així com del seu cost Hem procurat que les fonts
            siguin el màxim fiables i pròximes a la realitat però en cap cas
            garantim des de Som Energia el seu acompliment en el transcurs dels
            25 anys de vida utils estimats.
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
}

export default Report
