import * as React from 'react'
import styles from '../../themes/pdfStyle'
import GraphicPerfil from './GraphicPerfil'
import PieChart from './PieChart'
import ReportConsumGraph from './ReportConsumGraph'
import logo from '../../images/logo_som_energia.png'
import bombeta from '../../images/bombeta.png'
import dona from '../../images/dona.png'
import placa from '../../images/placa.png'
import casa from '../../images/casa.png'
import euro from '../../images/euro.png'
import { useTranslation } from 'react-i18next'

// eslint-disable-next-line react/display-name
export const PDF = React.forwardRef(({ data }, ref) => {
  const { t } = useTranslation()
  const formatNumber = (number) =>
    number ? new Intl.NumberFormat('de-DE').format(Number(number).toFixed(2)) : '-'

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
            {t('DADES_NOM')}: <strong>{data.contract.owner_name}</strong>
          </li>
          <li style={styles.listitem}>
            {t('DADES_DIRECCIO')}:{' '}
            <strong>{data.contract.address.place_name}</strong>
          </li>
          <li style={styles.listitem}>
            {t('DADES_CONTRACTE')}: <strong>{data.contract.name}</strong>
          </li>
        </ul>
      </div>
      <div style={styles.coberta}>
        <h2 style={styles.title}> {t('COBERTA_TITLE')}</h2>
        <ul style={styles.list}>
          <li style={styles.listitem}>
            {t('COBERTA_ORIENTACIO')}:{' '}
            <strong>{data.params.orientation}</strong>
          </li>
          <li style={styles.listitem}>
            {t('COBERTA_INCLINACIO')}:{' '}
            <strong>{data.scenario.tiltDegrees}º</strong>
          </li>
          <li style={styles.listitem}>
            {t('COBERTA_SUPERFICIE')}: <strong>{data.scenario.areaM2}m²</strong>
          </li>
        </ul>
      </div>
      <div style={styles.us}>
        <h2 style={styles.title}> {t('US_TITLE')}</h2>
        <ul style={styles.list}>
          <li style={styles.listitem}>
            {t('US_POTENCIA')}:{' '}
           {/*  <div style={styles.listpowers}>
              {data.contract.powers.map((value, index) => (
                  <span key={index}>
                      {'P'+(index + 1)}: <strong>{formatNumber(value)}kW</strong>
                  </span>
              ))}
            </div> */}
          </li>
          <li style={styles.listitem}>
            {t('US_TARIFA')}: <strong>{data.contract.tariff}</strong>
          </li>
          <li style={styles.listitem}>
            {t('US_ANUAL')}:{' '}
            <div style={styles.listpowers}>
              {data.scenario.loadByPeriodKwh &&
                Object.entries(data.scenario.loadByPeriodKwh)
                  .sort()
                  .map(([key, value]) => (
                    <span key={key}>
                      {key}: <strong>{formatNumber(value)}€/kWh </strong>
                    </span>
                  ))}
            </div>
          </li>
        </ul>
      </div>
      <div style={styles.image}>
        <img src={data.params.img} style={{ maxWidth: '100%' }} />
      </div>

      <div style={styles.plaques}>
        <img src={casa} width="auto" height="200px" />
      </div>
      <div style={styles.installacio}>
        <h2 style={styles.title}>{t('INSTALACIO_TITLE')}</h2>
        <ul style={styles.list}>
          <li style={styles.listitem}>
            {t('INSTALACIO_NOMBRE')}: <strong>{data.scenario.nModules}</strong>
          </li>
          <li style={styles.listitem}>
            {t('INSTALACIO_POTENCIA')}:{' '}
            <strong>
              {formatNumber(data.scenario.peakPowerKw * data.scenario.nModules)}{' '}
              kWh
            </strong>
          </li>
          <li style={styles.listitem}>
            {t('INSTALACIO_TOTAL')}:{' '}
            <strong>{formatNumber(data.scenario.peakPowerKw)} kWh</strong>
          </li>
          <li style={styles.listitem}>
            {t('INSTALACIO_ANUAL')}:{' '}
            <strong>{formatNumber(data.scenario.productionKwhYear)} kWa</strong>
          </li>
          <li style={styles.listitem}>
            {t('INSTALACIO_COST')}:{' '}
            <strong>
              {formatNumber(data.scenario.installationCostEuro)} €
            </strong>
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
                <td style={styles.tableCell}>
                  {formatNumber(data.scenario.productionToLoadKwhYear)} kWh/
                  {t('ANY')}
                </td>
                <td style={styles.tableCell}>
                  {formatNumber(data.scenario.productionToLoadEuroYear)} €/
                  {t('ANY')}
                </td>
              </tr>
              <tr>
                <td style={styles.tableHeading}>{t('ESTUDI_EXCEDENT')}</td>
                <td style={styles.tableCell}>
                  {formatNumber(data.scenario.productionToGridKwhYear)} kWh/
                  {t('ANY')}
                </td>
                <td style={styles.tableCell}>
                  {formatNumber(data.scenario.productionToGridEuroYear)} €/
                  {t('ANY')}
                </td>
              </tr>
              <tr>
                <td style={styles.tableHeading}>{t('ESTUDI_XARXA')}</td>
                <td style={styles.tableCell}>
                  {formatNumber(data.scenario.loadFromGridKwhYear)} kWh/
                  {t('ANY')}
                </td>
                <td style={styles.tableCell}>
                  {formatNumber(data.scenario.loadFromGridEuroYear)} kWh/
                  {t('ANY')}
                </td>
              </tr>
              <tr>
                <td style={styles.tableHeading}>
                  <strong>{t('ESTUDI_ESTALVI')}</strong>
                </td>
                <td colSpan="2" style={styles.tableCell}>
                  {formatNumber(data.scenario.savingsEuroYear)} €/{t('ANY')}
                </td>
              </tr>
              <tr>
                <td style={styles.tableHeading}>
                  <strong>{t('ESTUDI_RETORN')}</strong>
                </td>
                <td colSpan="2" style={styles.tableCell}>
                  {Math.round(data.scenario.paybackYears)} {t('ANYS')}
                </td>
              </tr>
            </table>
          </div>
          <div style={styles.piesContainer}>
            <PieChart
              percentage={data.scenario.productionToLoadPercent}
              color="#b9db42"
              label={t('PIE_AUTOCONSUM_TITLE')}
              description={t('PIE_AUTOCONSUM_DESCRIPTION')}
            />
            <PieChart
              percentage={data.scenario.productionToGridPercent}
              color="#b9db42"
              label={t('PIE_AUTOSUFICIENCIA_TITLE')}
              description={t('PIE_AUTOSUFICIENCIA_DESCRIPTION')}
            />
          </div>
        </div>
      </div>
      <div style={styles.graphicContainer}>
        <h3>{t('PERFIL_TITLE')}</h3>
        <GraphicPerfil
          profile={data.scenario.dailyLoadProfileKwh}
          autoproduction={data.scenario.dailyProductionProfileKwh}
        />
      </div>
      <div style={styles.graphicConsumContainer}>
        <h3>{t('PIE_AUTOSUFICIENCIA_TITLE')}</h3>
        <ReportConsumGraph
          autoconsum={data.scenario.monthlyProductionToLoadEuro}
          consum={data.scenario.monthlyGridToLoadEuro}
          excedencia={data.scenario.monthlyProductionToGridEuro}
        />
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
      <div style={styles.calculsContainer}>
        <img src={euro} style={styles.calculsImage} />
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
