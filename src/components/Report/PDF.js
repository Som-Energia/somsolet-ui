import * as React from 'react'
import styles from '../../themes/pdfStyle'
import GraphicPerfil from './GraphicPerfil'
import PieChart from './PieChart'
import ReportConsumGraph from './ReportConsumGraph'
import logo from '../../images/logo_som_energia.png'
import bombeta from '../../images/bombeta.png'
import dona from '../../images/dona.png'
import placa from '../../images/placa.png'
import { useTranslation } from 'react-i18next'

// eslint-disable-next-line react/display-name
export const PDF = React.forwardRef((props, ref) => {
  const { t } = useTranslation()

  return (
    <div style={styles.page} ref={ref}>
      <div style={styles.header}>
        <h1 style={styles.h1}>
          {t('TITLE_PRIMER')}
          <br />
          <strong style={styles.strong}>{t('TITLE_STRONG')}</strong>{' '}
          {t('TITLE_SEGON')}
        </h1>
        <img src={logo} width="120" />
      </div>
      <div style={styles.warning}>
        <p style={styles.warningText}>{t('ATENCIO')}</p>
      </div>
      <div style={styles.dades}>
        <h2 style={styles.title}>{t('DADES_TITLE')}</h2>
        <ul style={styles.list}>
          <li style={styles.listitem}>
            {t('DADES_NOM')}: <strong>Oscar</strong>
          </li>
          <li style={styles.listitem}>
            {t('DADES_DIRECCIO')}:{' '}
            <strong>Av Principe de Asturias 6 Ciñera 24660 Leon</strong>
          </li>
          <li style={styles.listitem}>
            {t('DADES_CONTRACTE')}: <strong>123456</strong>
          </li>
        </ul>
      </div>
      <div style={styles.coberta}>
        <h2 style={styles.title}> {t('COBERTA_TITLE')}</h2>
        <ul style={styles.list}>
          <li style={styles.listitem}>
            {t('COBERTA_ORIENTACIO')}: <strong>Sud</strong>
          </li>
          <li style={styles.listitem}>
            {t('COBERTA_INCLINACIO')}: <strong>10</strong>
          </li>
          <li style={styles.listitem}>
            {t('COBERTA_SUPERFICIE')}: <strong>35</strong>
          </li>
        </ul>
      </div>
      <div style={styles.us}>
        <h2 style={styles.title}> {t('US_TITLE')}</h2>
        <ul style={styles.list}>
          <li style={styles.listitem}>
            {t('US_POTENCIA')}: <strong>P1 - P3</strong>
          </li>
          <li style={styles.listitem}>
            {t('US_TARIFA')}: <strong>P3</strong>
          </li>
          <li style={styles.listitem}>
            {t('US_ANUAL')}: <strong>P3</strong>
          </li>
        </ul>
      </div>
      <div style={styles.image}></div>

      <div style={styles.plaques}>
        <img src={placa} width="auto" height="200px" />
      </div>
      <div style={styles.installacio}>
        <h2 style={styles.title}>{t('INSTALACIO_TITLE')}</h2>
        <ul style={styles.list}>
          <li style={styles.listitem}>
            {t('INSTALACIO_NOMBRE')}: <strong>9</strong>
          </li>
          <li style={styles.listitem}>
            {t('INSTALACIO_POTENCIA')}: <strong>100</strong>
          </li>
          <li style={styles.listitem}>
            {t('INSTALACIO_TOTAL')}: <strong>900</strong>
          </li>
          <li style={styles.listitem}>
            {t('INSTALACIO_ANUAL')}: <strong>10800</strong>
          </li>
          <li style={styles.listitem}>
            {t('INSTALACIO_COST')}: <strong>7000</strong>
          </li>
        </ul>
      </div>
      <div style={styles.estudi}>
        <h2 style={styles.heading}>{t('ESTUDI_TITLE')}</h2>
        <div style={styles.container}>
          <div>
            <table style={styles.table}>
              <tr>
                <td style={styles.tableHeading}>{t('ESTUDI_AUTOGENERACIO')}</td>
                <td style={styles.tableCell}>5800 kWh/{t('ANY')}º</td>
                <td style={styles.tableCell}>6000 €/{t('ANY')}</td>
              </tr>
              <tr>
                <td style={styles.tableHeading}>{t('ESTUDI_EXCEDENT')}</td>
                <td style={styles.tableCell}>100 kWh/{t('ANY')}</td>
                <td style={styles.tableCell}>500 €/{t('ANY')}</td>
              </tr>
              <tr>
                <td style={styles.tableHeading}>{t('ESTUDI_XARXA')}</td>
                <td colSpan="2" style={styles.tableCell}>
                  800 kWh/{t('ANY')}
                </td>
              </tr>
              <tr>
                <td style={styles.tableHeading}>
                  <strong>{t('ESTUDI_ESTALVI')}</strong>
                </td>
                <td colSpan="2" style={styles.tableCell}>
                  9000 €/{t('ANY')}
                </td>
              </tr>
              <tr>
                <td style={styles.tableHeading}>
                  <strong>{t('ESTUDI_RETORN')}</strong>
                </td>
                <td colSpan="2" style={styles.tableCell}>
                  5 {t('ANYS')}
                </td>
              </tr>
            </table>
          </div>
          <div style={styles.piesContainer}>
            <PieChart
              percentage={25}
              color="#b9db42"
              label={t('PIE_AUTOCONSUM_TITLE')}
              description={t('PIE_AUTOCONSUM_DESCRIPTION')}
            />
            <PieChart
              percentage={39}
              color="#b9db42"
              label={t('PIE_AUTOSUFICIENCIA_TITLE')}
              description={t('PIE_AUTOSUFICIENCIA_DESCRIPTION')}
            />
          </div>
        </div>
      </div>
      <div style={styles.graphicContainer}>
        <h3>{t('PERFIL_TITLE')}</h3>
        <GraphicPerfil />
      </div>
      <div style={styles.graphicConsumContainer}>
        <h3>{t('PIE_AUTOSUFICIENCIA_TITLE')}</h3>
        <ReportConsumGraph />
      </div>
      <div style={styles.properespases}>
        <h2 style={styles.heading}>{t('PROPERESPASES_TITLE')}</h2>
        <div style={styles.container}>
          <div style={styles.properespasesContainer}>
            <h3 style={styles.primerpas}>
              <img style={styles.primerpasImage} src={dona} />
              {t('PROPERESPASES_DESCRIPTION')}{' '}
              <strong style={styles.primerpasBold}>
                {t('PROPERESPASES_DESCRIPTION_STRONG')}
              </strong>{' '}
              {t('PROPERESPASES_DESCRIPTION_FINAL')}
            </h3>
            <p style={styles.properespasesAmbImage}>
              <a href="https://www.somenergia.coop/ca/produeix-energia-renovable/autoproduccio/">
                {t('PROPERESPASES_TEXT')}
              </a>
            </p>
            <p style={styles.properespasesText}>
              <a href="https://ca.support.somenergia.coop/article/781-com-funcionen-les-compres-col-lectives-d-autoproduccio-de-som-energia">
                {t('PROPERESPASES_LINK')}{' '}
              </a>
            </p>
          </div>
          <div style={styles.properespasesContainer}>
            <h3 style={styles.segonpas}>
              {t('PROPERESPASES_TITLE_SEGON')}{' '}
              <strong style={styles.segonpasBold}>
                {t('PROPERESPASES_TITLE_SEGON_STRONG')}{' '}
              </strong>
            </h3>
            <p style={styles.properespasesText}>
              <a href="https://docs.google.com/document/d/1b2J3-gZeJlrv6DkWiYRhpqvflW_ACQZcsOL3if8IyF0/edit">
                {t('PROPERESPASES_TEXT_SEGON')}{' '}
              </a>
              .
            </p>
            <p style={styles.properespasesText}>
              <a href="https://www.idae.es/companies/energetic-services">
                {t('PROPERESPASES_TEXT_TERCER')}{' '}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
      <div style={styles.autogeneracio}>
        <h2 style={styles.heading}>{t('AUTOGENERACIO_TITLE')} </h2>
        <div style={styles.container}>
          <div>
            <h3 style={styles.autogeneracioTitle}>
              {t('AUTOGENERACIO_TEXT')}{' '}
              <strong style={styles.autogeneracioBold}>
                {t('AUTOGENERACIO_TEXT_STRONG')}{' '}
              </strong>
              {t('AUTOGENERACIO_TEXT_FINAL')}{' '}
            </h3>
          </div>
          <div style={styles.listContainer}>
            <ul style={styles.list}>
              <li style={styles.listitem}>
                <a href="https://ca.support.somenergia.coop/article/778-que-es-l-autoproduccio">
                  {t('AUTOGENERACIO_LINK_PRIMER')}{' '}
                </a>
              </li>
              <li style={styles.listitem}>
                <a href="https://ca.support.somenergia.coop/article/783-com-funciona-la-compensacio-simplificada-dexcedents">
                  {t('AUTOGENERACIO_LINK_SEGON')}{' '}
                </a>
              </li>
              <li style={styles.listitem}>
                <a href="https://ca.support.somenergia.coop/article/929-autoproduccio-que-passa-si-marxa-la-llum">
                  {t('AUTOGENERACIO_LINK_TERCER')}{' '}
                </a>
              </li>
              <li style={styles.listitem}>
                <a href="https://ca.support.somenergia.coop/category/777-autoproduccio">
                  {t('AUTOGENERACIO_LINK_CUART')}{' '}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div style={styles.calculs}>
        <h2 style={styles.heading}>{t('INFORME_TITLE')} </h2>
      </div>
      <div style={styles.calculsContainer}>
        <img src={placa} style={styles.calculsImage} />
        <h3 style={styles.calculsTitle}>{t('GENERACIO_TITLE')} </h3>
        <p style={styles.calculsPrimera}>{t('GENERACIO_DESCRIPTION')} </p>
        <p style={styles.calculsSegona}>{t('GENERACIO_TEXT')} </p>
      </div>
      <div style={styles.calculsContainer}>
        <img src={bombeta} style={styles.calculsImage} />
        <h3 style={styles.calculsTitle}>{t('TITLE')} </h3>
        <p style={styles.calculsPrimera}>{t('DESCRIPTION')} </p>
        <p style={styles.calculsSegona}>{t('TEXT')} </p>
      </div>
      <div>
        <h3 style={styles.calculsTitle}>{t('ECONOMIQUES_TITLE')} </h3>
        <p style={styles.calculsPrimera}>
          <a href="https://www.somenergia.coop/ca/tarifes-d-electricitat/">
            {t('ECONOMIQUES_DESCRIPTION')}{' '}
          </a>{' '}
        </p>
        <p style={styles.calculsSegona}></p>
      </div>
      <div style={styles.peu}>
        <p style={styles.peuText}>{t('PEU')} </p>
        <img src={logo} width="120" />
      </div>
    </div>
  )
})

export default PDF
