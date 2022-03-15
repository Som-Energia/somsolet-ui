import * as React from 'react'
import styles from '../../themes/pdfStyle'
import GraphicPerfil from './GraphicPerfil'
import PieChart from './PieChart'
import ReportConsumGraph from './ReportConsumGraph'
import logo from '../../images/logo_som_energia.png'

export class PDF extends React.PureComponent {
  render() {
    return (
      <div style={styles.page}>
        <div style={styles.header}>
          <h1 style={styles.h1}>
            Informe provisional
            <br />
            <strong style={styles.strong}>autogeneració</strong> fotovoltaica
          </h1>
          <img src={logo} width="120" />
        </div>
        <div style={styles.warning}>
          <p style={styles.warningText}>
            <strong>Atenció</strong>: Aquest informe procura donar una
            informació orientativa a partir de les dades reals de consum del
            període dd-mm-aaaa al dd-mm-aaaa i estimacions aproximades del
            rendiment de la instal·lació així com del seu cost Hem procurat que
            les fonts siguin el màxim fiables i pròximes a la realitat però en
            cap cas garantim des de Som Energia el seu acompliment en el
            transcurs dels 25 anys de vida utils estimats.
          </p>
        </div>
        <div style={styles.dades}>
          <h2 style={styles.title}>Dades principals</h2>
          <ul style={styles.list}>
            <li style={styles.listitem}>
              Nom: <strong>Oscar</strong>
            </li>
            <li style={styles.listitem}>
              Direcció:{' '}
              <strong>Av Principe de Asturias 6 Ciñera 24660 Leon</strong>
            </li>
            <li style={styles.listitem}>
              Num. Contracte: <strong>123456</strong>
            </li>
          </ul>
        </div>
        <div style={styles.coberta}>
          <h2 style={styles.title}>Dades coberta</h2>
          <ul style={styles.list}>
            <li style={styles.listitem}>
              Orientació: <strong>Sud</strong>
            </li>
            <li style={styles.listitem}>
              Inclinació: <strong>10</strong>
            </li>
            <li style={styles.listitem}>
              Superficie útil: <strong>35</strong>
            </li>
          </ul>
        </div>
        <div style={styles.us}>
          <h2 style={styles.title}>Ús de lenergia</h2>
          <ul style={styles.list}>
            <li style={styles.listitem}>
              Potència contractada: <strong>P1 - P3</strong>
            </li>
            <li style={styles.listitem}>
              Tarifa: <strong>P3</strong>
            </li>
            <li style={styles.listitem}>
              Ús anual de lenergia: <strong>P3</strong>
            </li>
          </ul>
        </div>
        <div style={styles.image}></div>

        <div style={styles.plaques}></div>
        <div style={styles.installacio}>
          <h2 style={styles.title}>Característiques instal·lació proposada</h2>
          <ul style={styles.list}>
            <li style={styles.listitem}>
              Nombre de panells: <strong>9</strong>
            </li>
            <li style={styles.listitem}>
              Potència panells: <strong>100</strong>
            </li>
            <li style={styles.listitem}>
              Potència total: <strong>900</strong>
            </li>
            <li style={styles.listitem}>
              Generació anual: <strong>10800</strong>
            </li>
            <li style={styles.listitem}>
              Cost aproximat: <strong>7000</strong>
            </li>
          </ul>
        </div>
        <div style={styles.estudi}>
          <h2 style={styles.heading}>Estudi energètic - econòmic</h2>
          <div style={styles.container}>
            <div>
              <table style={styles.table}>
                <tr>
                  <td style={styles.tableHeading}>
                    Autogeneració directa anual
                  </td>
                  <td style={styles.tableCell}>5800 kWh/anyº</td>
                  <td style={styles.tableCell}>6000 €/any</td>
                </tr>
                <tr>
                  <td style={styles.tableHeading}>Excedent</td>
                  <td style={styles.tableCell}>100 kWh/any</td>
                  <td style={styles.tableCell}>500 €/any</td>
                </tr>
                <tr>
                  <td style={styles.tableHeading}>Energia de xarxa</td>
                  <td colSpan="2" style={styles.tableCell}>
                    800 kWh/any
                  </td>
                </tr>
                <tr>
                  <td style={styles.tableHeading}>
                    <strong>Estalvi total anual</strong>
                  </td>
                  <td colSpan="2" style={styles.tableCell}>
                    9000 €/any
                  </td>
                </tr>
                <tr>
                  <td style={styles.tableHeading}>
                    <strong>Retorn inversió</strong>
                  </td>
                  <td colSpan="2" style={styles.tableCell}>
                    5 anys
                  </td>
                </tr>
              </table>
            </div>
            <div style={styles.piesContainer}>
              <PieChart
                percentage={25}
                color="#b9db42"
                label="% Autoconsum directe"
                description="(Energia anual consumida / energia anual produida)"
              />
              <PieChart
                percentage={39}
                color="#b9db42"
                label="% Autosuficiencia"
                description="(Energia anual autoconsumida / energia anual denergia"
              />
            </div>
          </div>
        </div>
        <div style={styles.graphicContainer}>
          <h3>El teu perfil diari denergia</h3>
          <GraphicPerfil />
        </div>
        <div style={styles.graphicConsumContainer}>
          <h3>Consum per mesos</h3>
          <ReportConsumGraph />
        </div>
        <div style={styles.properespases}>
          <h2 style={styles.heading}>Properes pases</h2>
          <div style={styles.container}>
            <div style={styles.properespasesContainer}>
              <h3 style={styles.primerpas}>
                Apuntat a una
                <strong style={styles.primerpasBold}>
                  compra col·lectiva
                </strong>{' '}
                de Som Energia
              </h3>
              <p style={styles.properespasesText}>
                Accedeix a l
                <a href="https://www.somenergia.coop/ca/produeix-energia-renovable/autoproduccio/">
                  apartat de compres
                </a>
                col·lectives de la web de
                <a href="https://www.somenergia.coop/">Som Energia</a> i mira si
                hi ha alguna iniciativa oberta a la teva zona.
              </p>
              <p style={styles.properespasesText}>
                <a href="https://ca.support.somenergia.coop/article/781-com-funcionen-les-compres-col-lectives-d-autoproduccio-de-som-energia">
                  Com funcionen les compres col·lectives de Som Energia?
                </a>
              </p>
            </div>
            <div style={styles.properespasesContainer}>
              <h3 style={styles.segonpas}>
                Contacta amb una{' '}
                <strong style={styles.segonpasBold}>
                  empresa instal·ladora especialitzada i de confiança
                </strong>
              </h3>
              <p style={styles.properespasesText}>
                Com no pot ser duna altra manera, et recomanem contactar
                empreses cooperatives de leconomia solidària com ara les que
                trobaràs en aquest{' '}
                <a href="https://docs.google.com/document/d/1b2J3-gZeJlrv6DkWiYRhpqvflW_ACQZcsOL3if8IyF0/edit">
                  enllaç
                </a>
                .
              </p>
              <p style={styles.properespasesText}>
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
          <div style={styles.container}>
            <div>
              <h3 style={styles.autogeneracioTitle}>
                Pots trobar informació general sobre{' '}
                <strong style={styles.autogeneracioBold}>
                  què és i com funciona lautoconsum{' '}
                </strong>
                en els següents articles del nostre centre dajuda
              </h3>
            </div>
            <div style={styles.listContainer}>
              <ul style={styles.list}>
                <li style={styles.listitem}>
                  <a href="https://ca.support.somenergia.coop/article/778-que-es-l-autoproduccio">
                    Què és lautoproducció?
                  </a>
                </li>
                <li style={styles.listitem}>
                  <a href="https://ca.support.somenergia.coop/article/783-com-funciona-la-compensacio-simplificada-dexcedents">
                    Com funciona la compensació simplificada dexcedents?
                  </a>
                </li>
                <li style={styles.listitem}>
                  <a href="https://ca.support.somenergia.coop/article/929-autoproduccio-que-passa-si-marxa-la-llum">
                    Què passa si marxa la llum i tinc plaques solars?
                  </a>
                </li>
                <li style={styles.listitem}>
                  <a href="https://ca.support.somenergia.coop/category/777-autoproduccio">
                    Mes artícles sobre lautogeneració
                  </a>
                </li>
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
          <h3 style={styles.calculsTitle}>
            Dades de <strong>Generació</strong>
          </h3>
          <p style={styles.calculsPrimera}>
            Font PVGis Ubicació de referencia Generació estimada segons ubicació
            Afectació de la inclinació Afectació de la orientació
          </p>
          <p style={styles.calculsSegona}>
            Cal tenir en compte que, tot i estar extretes de fons oficials,
            aquestes son dades estimades teòriques i per tant no sajustaran 100%
            a la realitat. També cal tenir en compte possibles ombres que en
            aquest estudi no shan tingut en compte i poden afectar de forma molt
            important els resultats.
          </p>
        </div>
        <div>
          <h3 style={styles.calculsTitle}>
            Dades de <strong>consum</strong>
          </h3>
          <p style={styles.calculsPrimera}>
            Corbes de consum horari del periode dd-mm-aaaa al dd-mm-aaaaa
            extretes dels comptadors gestionats per lempresa de distribució
            elèctrica de la teva zona.
          </p>
          <p style={styles.calculsSegona}>
            Cal tenir en compte que si es modifiquen aquests usos denergia es
            pot millorar o empitjorar els resultats daquest informe. Lobjectiu
            de tota persona autogeneradora és incrementar al màxim
            lautogeneració directa, es a dir, utilitzar lenergia en hores
            solars.
          </p>
        </div>
        <div>
          <h3 style={styles.calculsTitle}>
            Dades de <strong>economiques</strong>
          </h3>
          <p style={styles.calculsPrimera}>
            <a href="https://www.somenergia.coop/ca/tarifes-d-electricitat/">
              Tarifes
            </a>{' '}
            dús de lenergia de Som Energia actuals: P1: €/kWh P2: €/kWh P3:
            €/kWh Tarifa de compensació dexcedents €/kWh
          </p>
          <p style={styles.calculsSegona}></p>
        </div>
        <div style={styles.peu}>
          <p style={styles.peuText}>
            Per a qualsevol dubte pots escriure a auto@somenergia.coop
          </p>
          <img src={logo} width="120" />
        </div>
      </div>
    )
  }
}
