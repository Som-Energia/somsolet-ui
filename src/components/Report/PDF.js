import { Page, Text, Document, StyleSheet } from '@react-pdf/renderer'
import pdfStyle from '../../themes/pdfStyle'
import GraphicPerfil from './GraphicPerfil'
import PieChart from './PieChart'
import ReportConsumGraph from './ReportConsumGraph'
import logo from '../../images/logo_som_energia.svg'

const styles = StyleSheet.create(pdfStyle)

const PDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.h1}>
          Informe provisional
          <br />
          <strong style={styles.strong}>autogeneració</strong> fotovoltaica
        </h1>
        <img src={logo} width="120" />
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
        <h2 style={styles.title}>Ús de lenergia</h2>
        <ul style={styles.list}>
          <li style={styles.listitem}>
            Potència contractada: <b>P1 - P3</b>
          </li>
          <li style={styles.listitem}>
            Tarifa: <b>-</b>
          </li>
          <li style={styles.listitem}>
            Ús anual de lenergia: <b>P3</b>
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
        <div style={styles.container}>
          <div>
            <table style={styles.table}>
              <tr>
                <td style={styles.tableHeading}>Autogeneració directa anual</td>
                <td style={styles.tableCell}>kWh/anyº</td>
                <td style={styles.tableCell}>€/any</td>
              </tr>
              <tr>
                <td style={styles.tableHeading}>Excedent</td>
                <td style={styles.tableCell}>kWh/any</td>
                <td style={styles.tableCell}>€/any</td>
              </tr>
              <tr>
                <td style={styles.tableHeading}>Energia de xarxa</td>
                <td colSpan="2" style={styles.tableCell}>
                  kWh/any
                </td>
              </tr>
              <tr>
                <td style={styles.tableHeading}>
                  <b>Estalvi total anual</b>
                </td>
                <td colSpan="2" style={styles.tableCell}>
                  €/any
                </td>
              </tr>
              <tr>
                <td style={styles.tableHeading}>
                  <b>Retorn inversió</b>
                </td>
                <td colSpan="2" style={styles.tableCell}>
                  anys
                </td>
              </tr>
            </table>
            <div style={styles.piesContainer}>
              <PieChart percentage={25} color="#b9db42" />
              <PieChart percentage={39} color="#b9db42" />
            </div>
          </div>
          <div style={styles.graphicContainer}>
            <GraphicPerfil />
          </div>
        </div>
      </div>
      <div style={styles.graphicConsumContainer}>
        <ReportConsumGraph />
      </div>
      <div style={styles.properespases}>
        <h2 style={styles.heading}>Properes pases</h2>
        <div style={styles.container}>
          <div>
            <h3>Apuntat a una compra col·lectiva de Som Energia</h3>
            <p>
              Accedeix a l
              <a href="https://www.somenergia.coop/ca/produeix-energia-renovable/autoproduccio/">
                apartat de compres
              </a>
              col·lectives de la web de
              <a href="https://www.somenergia.coop/">Som Energia</a> i mira si
              hi ha alguna iniciativa oberta a la teva zona.
            </p>
            <p>
              <a href="https://ca.support.somenergia.coop/article/781-com-funcionen-les-compres-col-lectives-d-autoproduccio-de-som-energia">
                Com funcionen les compres col·lectives de Som Energia?
              </a>
            </p>
          </div>
          <div>
            <h3>
              Contacta amb una empresa instal·ladora especialitzada i de
              confiança
            </h3>
            <p>
              Com no pot ser duna altra manera, et recomanem contactar empreses
              cooperatives de leconomia solidària com ara les que trobaràs en
              aquest{' '}
              <a href="https://docs.google.com/document/d/1b2J3-gZeJlrv6DkWiYRhpqvflW_ACQZcsOL3if8IyF0/edit">
                enllaç
              </a>
              .
            </p>
            <p>
              També pots buscar entre les empreses que han tirat endavant les
              diferents compres col·lectives de lSom Energia o també altres
              empreses expertes del sector que pots trobar
              <a href="https://www.idae.es/companies/energetic-services">
                aquí
              </a>
              .
            </p>
          </div>
        </div>
      </div>
      <div style={styles.autogeneracio}>
        <h2 style={styles.heading}>Informació general sobre autogeneració</h2>
        <div>
          <div>
            Pots trobar informació general sobre què és i com funciona
            lautoconsum en els següents articles del nostre centre dajuda
          </div>
          <div>
            <ul>
              <li>Què és lautoproducció?</li>
              <li>Com funciona la compensació simplificada dexcedents?</li>
              <li>Què passa si marxa la llum i tinc plaques solars?</li>
              <li>Mes artícles sobre lautogeneració</li>
            </ul>
          </div>
        </div>
      </div>
      <div style={styles.calculs}>
        <h2 style={styles.heading}>
          Com shan generat els càlculs daquest informe?
        </h2>
      </div>
      <div>
        <h3>Dades de Generació</h3>
        <p>
          Font PVGis Ubicació de referencia Generació estimada segons ubicació
          Afectació de la inclinació Afectació de la orientació
        </p>
        <p>
          Cal tenir en compte que, tot i estar extretes de fons oficials,
          aquestes son dades estimades teòriques i per tant no sajustaran 100% a
          la realitat. També cal tenir en compte possibles ombres que en aquest
          estudi no shan tingut en compte i poden afectar de forma molt
          important els resultats.
        </p>
      </div>
      <div>
        <h3>Dades de consum</h3>
        <p>
          Corbes de consum horari del periode dd-mm-aaaa al dd-mm-aaaaa extretes
          dels comptadors gestionats per lempresa de distribució elèctrica de la
          teva zona.
        </p>
        <p>
          Cal tenir en compte que si es modifiquen aquests usos denergia es pot
          millorar o empitjorar els resultats daquest informe. Lobjectiu de tota
          persona autogeneradora és incrementar al màxim lautogeneració directa,
          es a dir, utilitzar lenergia en hores solars.
        </p>
      </div>
      <div>
        <h3>Dades de economiques</h3>
        <p>
          <a href="https://www.somenergia.coop/ca/tarifes-d-electricitat/">
            Tarifes
          </a>{' '}
          dús de lenergia de Som Energia actuals: P1: €/kWh P2: €/kWh P3: €/kWh
          Tarifa de compensació dexcedents €/kWh
        </p>
        <p>
          Cal tenir en compte que levolució del preu final de lenergia també
          afecta als resultats de lestudi. Preus més elevats provoquen un
          aprofitament més rendible de la instal·lació en termes econòmics i
          preus més baixos signifiquen un aprofitament menys rendible en termes
          econòmics.
        </p>
      </div>
      <div style={styles.peu}>
        <p style={styles.peuText}>
          Per a qualsevol dubte pots escriure a auto@somenergia.coop
        </p>
        <img src={logo} width="120" />
      </div>
    </Page>
  </Document>
)

export default PDF
