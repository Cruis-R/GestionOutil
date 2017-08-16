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
    <div style={styleBody}>
      <table>
        <tbody>
          <tr>
            <td style={{width:"300px"}}><br />
              <img src='img/logo.jpg'/><br />
              67 avenue Denfert Rochereau<br />
              75014 Paris<br />
              France<br /><br />
              +33 9 55 54 4000<br />
              compta@cruisrent.com<br />
              www.cuisrent.com
            </td>
            <td style={{width:"700px", textAlign: "right"}}>
              <div style={{marginTop: "-30px", marginLeft: "500px", textAlign:"justify"}}>
                <h2>FACTURE</h2>
                {this.state.facturationData['societe']}<br/>
                {this.state.facturationData['adresse']}<br/>
                {this.state.facturationData['cp']+' '+this.state.facturationData['ville']}
              </div>
            </td>
          </tr>
        </tbody>
        <br /><br />
      </table>
      <table style={{marginLeft: "330px"}}>
        <tbody>
          <tr>
            <td style={{width:"120px"}}>N° FACTURE<br />{this.state.facturationData['num_facture']}</td>
            <td style={{width:"100px"}}>N° CLIENT<br />{this.state.facturationData['id_client']}</td>
            <td style={{width:"120px"}}>DATE FACTURE<br />{this.state.facturationData['date_facture']?this.formatterDate(this.state.facturationData['date_facture']):null}</td>
          </tr>
        </tbody>
        <br /><br />
      </table>
      <table style={{marginLeft: "120px"}}>
        <tbody>
          <tr>
            <td style={{width:"220px"}}>DESIGNATION</td>
            <td style={{width:"90px"}}>QUANTITE</td>
            <td style={{width:"130px"}}>PRIX UNITAIRE HT</td>
            <td style={{width:"130px"}}>PRIX UNITAIRE TTC</td>
            <td style={{width:"100px"}}>MONTANT TTC</td>
            <td style={{width:"90px"}}>TVA</td>
          </tr>
          <tr>
            <td>{this.state.facturationData['designation']}</td>
            <td>1</td>
            <td>{this.state.facturationData['totalht']}</td>
            <td>{this.state.facturationData['totalttc']}</td>
            <td>{this.state.facturationData['totalttc']}</td>
            <td>{this.state.facturationData['tva']}</td>
          </tr>
        </tbody>
        <br /><br />
      </table>
      <div style={{marginLeft: "670px", border: "2px #000 solid", width:"200px", padding: "10px"}}>
        <table>
          <tbody>
          <tr>
            <td width='90px'>BRUT TTC &nbsp;</td><td style={{width: "80px", textAlign:"right"}}>{this.state.facturationData['designation']} €</td>
          </tr>
          <tr>
            <td>NET HT &nbsp;</td><td style={{textAlign:"right"}}>{this.state.facturationData['totalht']} €</td>
          </tr>
          <tr>
            <td>TOTAL TVA &nbsp;</td><td style={{textAlign:"right"}}>{this.state.facturationData['tva']} €</td>
          </tr>
          <tr>
            <td>NET TTC &nbsp;</td><td style={{textAlign:"right"}}>{this.state.facturationData['totalttc']} €</td>
          </tr>
          </tbody>
        </table>
      </div>
      <br /><br />
      CRUIS RENT SASU au capital de 30.000 euros - SIRET : 81263416000020<br />
      CODE APE : 77.11B Location de longue durée de voitures et de véhiculers automobiles légers<br />
      TVA INTRACOMMUNAUTAIRE : FR37 812634160<br />
      IBAN CIC PONTOISE : FR7630066104610002035830179 - Swift : CMCIFRPP<br />
    </div>
    )
  }
}
