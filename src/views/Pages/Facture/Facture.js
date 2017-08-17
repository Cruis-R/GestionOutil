import React, { Component } from 'react';
import urls from '../../GestionsComponents/configs/serverConfigurations'
export default class Facture extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facturationData : {}
    }
  }
  componentDidMount(){
    this.getData();
  }
  getData(){
    let urlFacturations =urls.facturations+this.props.location.search;
    fetch(urlFacturations)
    .then((response) => response.json())
    .then((responseJson)=>{
      this.setState({
        facturationData : responseJson?responseJson[0]:{}
      })
    })
    .catch((error) => {
      console.error(error);
    });
  }
  formatterDate(date){
    return new Date(date).toISOString().split('T')[0];
  }
  render(){
    console.log("props",this.props, this.state.facturationData);
    const styleBody = {
      background: "#ffffff",
      color: "#58666e",
      margin: "0",
      lineHeight: "1.7em",
      fontSize: "13px",
      fontFamily: "'Open Sans', sans-serif",
      outline: "0",
      textShadow: "0 0 1px rgba(0, 0, 0, 0.2)",
      height: "100vh"
    }
    return (
      <div className="facture_parent">
        <div className="facture_header">
            <div className="header_facture_left">
              <img src="img/Logo_CRUIS_RENT.png"/>
              <p>82 avenue DENFERT ROCHEREAU</p>
              <p>75014 Paris</p>
              <p>FRANCE</p>
              <p>+33 9 55 54 4000</p>
              <p>compta@cruisrent.com</p>
              <p>www.cruisrent.com</p>
            </div>
            <div className="header_facture_right">
              <h2>FACTURE</h2>
              <div className="facture_suivi_par">
                <p>AFFAIRE SUIVIE PAR : Célia Thurel</p>
                <p>Email : celia.thurel@cruisrent.com</p>
                <p>Téléphone : 09 54 55 4000</p>
              </div>
              <div className="header_facture_coord_client">
                <p>{this.state.facturationData["societe"]}</p>
                <p>{this.state.facturationData["adresse"]}</p>
                <p>{this.state.facturationData["cp"]+' '+this.state.facturationData["ville"]}</p>
              </div>
            </div>
        </div>
        <div className="facture_donnees">
          <p>N° FACTURE<br/><span>{this.state.facturationData['num_facture']}</span></p>
          <p>N° CLIENT<br/><span>{this.state.facturationData['id_client']}</span></p>
          <p>OPÉRATEUR<br/><span>Célia Thurel</span></p>
          <p>DATE<br/><span>{this.state.facturationDatadatefact}</span></p>
          <p>PAGE<br/><span>1/1</span></p>
        </div>
        <div className="facture_body">
          <table>
            <tbody>
              <tr>
                <th>DESIGNATION</th>
                <th>QUANTITE</th>
                <th>PRIX UNITAIRE HT</th>
                <th>PRIX UNITAIRE TTC</th>
                <th>MONTANT TTC</th>
                <th>TVA</th>
              </tr>
              <tr>
                <td>{this.state.facturationData['designation']}</td>
                <td>1</td>
                <td>{this.state.facturationData['totalht']} €</td>
                <td>{this.state.facturationData['totalttc']} €</td>
                <td>{this.state.facturationData['totalttc']} €</td>
                <td>{this.state.facturationData['tva']}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="facture_total">
          <div className="facture_total_left">
            <p>* Cette facture est soumise aux conditions générales de CRUIS RENT</p>
          </div>
          <div className="facture_total_right">
            <div className="facture_total_detail">
              <div className="facture_total_detail_price">
                <p>BRUT TTC</p>
                <p>{this.state.facturationData['totalttc']} €</p>
              </div>
              <div className="facture_total_detail_price">
                <p>NET HT</p>
                <p>{this.state.facturationData['totalht']} €</p>
              </div>
              <div className="facture_total_detail_price">
                <p>TOTAL TVA</p>
                <p>{this.state.facturationData['tva']} €</p>
              </div>
              <div className="facture_total_detail_price">
                <p>NET TTC</p>
                <p>{this.state.facturationData['totalttc']} €</p>
              </div>
            </div>
          </div>
        </div>
        ?&gt;
        <div className="facture_modalites">
          <p>ECHEANCE : <span>31/08/2017</span></p>
          <p>REGLEMENT : <span>Virement</span></p>
        </div>
        <div className="facture_footer">
          <div className="facture_footer_left">
            <p>CRUIS RENT SASU au capital de 30.000 euros - SIRET : 81263416000020<br/>
            CODE APE : 77.11B Location de longue durée de voitures et de véhiculers automobiles légers<br/>
            TVA INTRACOMMUNAUTAIRE : FR37 812634160<br/>
            IBAN CIC PONTOISE : FR7630066104610002035830179 - Swift : CMCIFRPP</p>
          </div>
          <div className="facture_footer_right">
            <img src="img/Logo_CRUISR.png" alt=""/>
            <p>GROUPE CRUIS'R SAS au capital de 552 000€</p>
          </div>
        </div>
      </div>

    )
  }
}
