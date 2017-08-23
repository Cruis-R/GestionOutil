import ReactDOM from 'react-dom'
import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { TabContent, TabPane, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter, Button, Progress } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import classnames from 'classnames';
import urls from '../configs/serverConfigurations';
import Map from './Geolocaliser/Map';
const data = [{
  "id_scooter" : 1,
  "num_cruisrent" : "00000001",
  "statut" : "1",
  "actif" : true ,
  "id_boitier" : "0001",
  "id_contrat" : "001",
  "immat" : "00000001",
  "date_immat" : "2017-08-03",
  "type_usage" : 1,
  "nb_kms" : 150
},{
  "id_scooter" : 1,
  "num_cruisrent" : "00000001",
  "statut" : "2",
  "actif" : true ,
  "id_boitier" : "",
  "id_contrat" : "",
  "immat" : "00000001",
  "date_immat" : "2017-08-03",
  "type_usage" : 1,
  "nb_kms" : 150
}];
const statut = {
  1 : "Maintenance",
  2 : "Disponible",
  3 : "Hors service",
  4 : "A récupérer"
}
const month_select = [
  {id:"01",nom:"Janvier"},
  {id:"02",nom:"Février"},
  {id:"03",nom:"Mars"},
  {id:"04",nom:"Avril"},
  {id:"05",nom:"Mai"},
  {id:"06",nom:"Juin"},
  {id:"07",nom:"Juillet"},
  {id:"08",nom:"Août"},
  {id:"09",nom:"Septembre"},
  {id:"10",nom:"Octobre"},
  {id:"11",nom:"Novembre"},
  {id:"12",nom:"Décembre"}];
const month_day_select = [31,28,31,30,31,30,31,31,30,31,30,31];
const month_day_list = ['01','02','03','04','05','06','07','08','09',10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
const urlStatuts = urls.statuts;
const urlScooters = urls.scooters;
const urlBoitiersAssocier = urls.boitiers_associer;
const urlContratsAssocier = urls.contrats_associer;
const urlScootersAssocier = urls.scooters_associer;
export default class GestionDesScooters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      isInsertScooterModal : false,
      isInsertScooterSuccess : true,
      isModifierScooterModal : false,
      isModifierScooterSuccess : true,
      isAssocierContratModal : false,
      isAssocierContratSuccess : true,
      isAssocierBoitierModal : false,
      isAssocierBoitierSucess : true,
      isInfoCompletModal : false,
      isScooterContratModal : false,
      isAttribuerScooter : false,
      contratModalType : 1,
      boitierModalType : 1,
      scooterConcerne : {},
      scootersData : [],
      statutsData : [],
      boitiersAssocier : [],
      contratsAssocier : [],
      scootersAssocier : [],
      rapport_mois: "2017-08",
      rapport_jour : 1,
      rapport_url : 'report?deviceId=1'
    }
    this.handleSelectRapportMois = this.handleSelectRapportMois.bind(this);
    this.handleSelectRapportJour = this.handleSelectRapportJour.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleInsertScooterModal = this.toggleInsertScooterModal.bind(this);
    this.toggleAssocierContratModal = this.toggleAssocierContratModal.bind(this);
    this.toggleAssocierBoitierModal = this.toggleAssocierBoitierModal.bind(this);
    this.toggleInfoCompletModal = this.toggleInfoCompletModal.bind(this);
    this.toggleAttribuerScooter = this.toggleAttribuerScooter.bind(this);
    this.toggleModifierScooterModal = this.toggleModifierScooterModal.bind(this);
    this.toggleScooterContratModal = this.toggleScooterContratModal.bind(this);
    this.scooterStatutFormatter = this.scooterStatutFormatter.bind(this);
    this.scootersInsertButton = this.scootersInsertButton.bind(this);
    this.scootersGestionFormatter = this.scootersGestionFormatter.bind(this);
    this.scootersBoitierFormatter = this.scootersBoitierFormatter.bind(this);
    this.scootersContratFormatter = this.scootersContratFormatter.bind(this);
    this.addScooterData = this.addScooterData.bind(this);
    this.associerBoiter = this.associerBoiter.bind(this);
    this.associerContrat = this.associerContrat.bind(this);
    this.modifierScooterData = this.modifierScooterData.bind(this);
  }
  componentDidMount(){
    this.getData();
  }
  getData(){
    fetch(urlStatuts)
    .then((response) => response.json())
    .then((responseJson)=>{
      this.setState({
        statutsData : responseJson
      })
    })
    .catch((error) => {
      console.error(error);
    });
    fetch(urlScooters)
    .then((response) => response.json())
    .then((responseJson)=>{
      this.setState({
        scootersData : responseJson
      })
    })
    .catch((error) => {
      console.error(error);
    });
  }
  getAssocierBoitierData(){
    fetch(urlBoitiersAssocier)
    .then((response) => response.json())
    .then((responseJson)=>{
      this.setState({
        boitiersAssocier : responseJson
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }
  getAssocierScooterData(){
    fetch(urlScootersAssocier)
    .then((response) => response.json())
    .then((responseJson)=>{
      this.setState({
        scootersAssocier : responseJson
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }
  getAssocierContratData(){
    fetch(urlContratsAssocier)
    .then((response) => response.json())
    .then((responseJson)=>{
      this.setState({
        contratsAssocier : responseJson
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }
  addScooterData(){
    const queryMethod = "POST";
    let data = {};
    data["num_cruisrent"] = document.getElementById("num_cruisrent").value?document.getElementById("num_cruisrent").value:null;
    data["marque"] = document.getElementById("marque").value;
    data["modele"] = document.getElementById("modele").value;
    data["immat"] = document.getElementById("immat").value;
    data["date_immat"] = document.getElementById("date_immat").value?document.getElementById("date_immat").value:null;
    data["type_usage"] = document.getElementById("type_usage").value;
    data["composants"] = document.getElementById("composants").value;
    data["num_chassis"] = document.getElementById("num_chassis").value?document.getElementById("num_chassis").value:null;
    data["nb_kms"] = document.getElementById("nb_kms").value?document.getElementById("nb_kms").value:null;
    data["controle_qualite"] = document.getElementById("controle_qualite").value;
    data["num_contratassurance"] = document.getElementById("num_contratassurance").value;
    data["assureur"] = document.getElementById("assureur").value;
    data["debut_assurance"] = document.getElementById("debut_assurance").value?document.getElementById("debut_assurance").value:null;
    data["duree_assurance"] = document.getElementById("duree_assurance").value;
    data["statut"] = document.getElementById("statut").value?document.getElementById("statut").value:null;
    fetch(urlScooters,{
      method: queryMethod,
      body: JSON.stringify(data),
      headers: new Headers({
    		'Content-Type': 'application/json'
    	})
    })
    .then(
      (response)=>{
        if(response.status!==200){
          console.log("error");
          this.setState({
            isInsertScooterSuccess : false
          })
        }else {
          fetch(urlScooters)
          .then((response) => response.json())
          .then((responseJson)=>{
            this.setState({
              scootersData : responseJson,
              isInsertScooterModal : !this.state.isInsertScooterModal
            })
          })
          .catch((error) => {
            console.error(error);
          });
        }
      }
    )
    .catch((error) => {
      console.error(error);
    });
  }
  modifierScooterData(){
    const queryMethod = "PUT";
    let data = {};
    data["id_scooter"] = this.state.scooterConcerne["id_scooter"];
    data["num_cruisrent"] = document.getElementById("num_cruisrent").value?document.getElementById("num_cruisrent").value:null;
    data["marque"] = document.getElementById("marque").value;
    data["modele"] = document.getElementById("modele").value;
    data["immat"] = document.getElementById("immat").value;
    data["date_immat"] = document.getElementById("date_immat").value?document.getElementById("date_immat").value:null;
    data["type_usage"] = document.getElementById("type_usage").value;
    data["composants"] = document.getElementById("composants").value;
    data["num_chassis"] = document.getElementById("num_chassis").value?document.getElementById("num_chassis").value:null;
    data["nb_kms"] = document.getElementById("nb_kms").value?document.getElementById("nb_kms").value:null;
    data["controle_qualite"] = document.getElementById("controle_qualite").value;
    data["num_contratassurance"] = document.getElementById("num_contratassurance").value;
    data["assureur"] = document.getElementById("assureur").value;
    data["debut_assurance"] = document.getElementById("debut_assurance").value?document.getElementById("debut_assurance").value:null;
    data["duree_assurance"] = document.getElementById("duree_assurance").value;
    data["statut"] = document.getElementById("statut").value?document.getElementById("statut").value:null;
    fetch(urlScooters,{
      method: queryMethod,
      body: JSON.stringify(data),
      headers: new Headers({
    		'Content-Type': 'application/json'
    	})
    })
    .then(
      (response)=>{
        if(response.status!==200){
          console.log("error");
          this.setState({
            isModifierScooterSuccess : false
          })
        }else {
          fetch(urlScooters)
          .then((response) => response.json())
          .then((responseJson)=>{
            this.setState({
              scootersData : responseJson,
              isModifierScooterModal : !this.state.isModifierScooterModal
            })
          })
          .catch((error) => {
            console.error(error);
          });
        }
      }
    )
    .catch((error) => {
      console.error(error);
    });
  }
  associerBoiter(){
    const queryMethod = "PUT";
    const url = urlScooters + '/boitier';
    let data = {};
    data['id_scooter'] = this.state.scooterConcerne['id_scooter'];
    data['id_boitier'] = document.getElementById('id_boitier').value;
    data['boitierModalType'] = this.state.boitierModalType;
    fetch(url,{
      method: queryMethod,
      body: JSON.stringify(data),
      headers: new Headers({
    		'Content-Type': 'application/json'
    	})
    })
    .then(
      (response)=>{
        if(response.status!==200){
          console.log("error");
          this.setState({
            isAssocierBoitierSucess : false
          })
        }else {
          fetch(urlScooters)
          .then((response) => response.json())
          .then((responseJson)=>{
            this.setState({
              scootersData : responseJson,
              isAssocierBoitierModal : !this.state.isAssocierBoitierModal
            })
          })
          .catch((error) => {
            console.error(error);
          });
        }
      }
    )
    .catch((error) => {
      console.error(error);
    });
  }
  associerContrat(){
    const queryMethod = "PUT";
    const url = urlScooters + '/contrat';
    let data = {};
    data['id_scooter'] = this.state.scooterConcerne['id_scooter'];
    data['id_contrat'] = document.getElementById('id_contrat').value;
    data['contratModalType'] = this.state.contratModalType;
    data['isAttribuerScooter'] = this.state.isAttribuerScooter;
    data['id_scooter_new'] = this.state.isAttribuerScooter?document.getElementById('id_scooter_new').value:null;
    data['statut'] = this.state.contratModalType===1?null:document.getElementById('statut').value;
    fetch(url,{
      method: queryMethod,
      body: JSON.stringify(data),
      headers: new Headers({
    		'Content-Type': 'application/json'
    	})
    })
    .then(
      (response)=>{
        if(response.status!==200){
          console.log("error");
          this.setState({
            isAssocierContratSuccess : false
          })
        }else {
          fetch(urlScooters)
          .then((response) => response.json())
          .then((responseJson)=>{
            this.setState({
              scootersData : responseJson,
              isAssocierContratModal : !this.state.isAssocierContratModal
            })
          })
          .catch((error) => {
            console.error(error);
          });
        }
      }
    )
    .catch((error) => {
      console.error(error);
    });
  }
  handleSelectRapportMois(mois){
    let year = parseInt(mois.split('-')[0]);
    let mois_index = parseInt(mois.split('-')[1]);
    let jourFin = year%4===0&&mois_index===2?29:month_day_select[mois_index-1];
    let date1 = new Date(mois+'-'+document.getElementById('rapport_jour').value);
    let date2 = new Date(mois+'-'+jourFin);
    let id = this.state.scooterConcerne['id_scooter'];
    let nom_scooter = this.state.scooterConcerne['num_cruisrent'];
    let dateFrom = date1.toISOString();
    let dateTo = date2.toISOString();
    let rapport_url ='report?deviceId='+id+'&from='+dateFrom+'&to='+dateTo+'&nom_scooter='+nom_scooter;
    this.setState({
      rapport_mois : mois,
      rapport_url : rapport_url
    })
  }
  handleSelectRapportJour(jour){
    let year = parseInt(this.state.rapport_mois.split('-')[0]);
    let mois_index = parseInt(this.state.rapport_mois.split('-')[1]);
    let jourFin = year%4===0&&mois_index===2?29:month_day_select[mois_index-1];
    let date1 = new Date(this.state.rapport_mois+'-'+jour);
    let date2 = new Date(this.state.rapport_mois+'-'+jourFin);
    let id = this.state.scooterConcerne['id_scooter'];
    let nom_scooter = this.state.scooterConcerne['num_cruisrent'];
    let dateFrom = date1.toISOString();
    let dateTo = date2.toISOString();
    let rapport_url ='report?deviceId='+id+'&from='+dateFrom+'&to='+dateTo+'&nom_scooter='+nom_scooter;
    this.setState({
      rapport_jour : jour,
      rapport_url : rapport_url
    })
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  toggleInsertScooterModal(){
    this.setState({
      isInsertScooterModal : !this.state.isInsertScooterModal,
      isInsertScooterSuccess : true
    });
  }
  toggleAssocierContratModal(data,type){
    console.log("toggleAssocierContratModal data",data,"type",type);
    if(type===1){
      this.getAssocierContratData();
    }
    this.setState({
      isAssocierContratModal : !this.state.isAssocierContratModal,
      scooterConcerne : data,
      contratModalType : type,
      isAssocierContratSuccess : true,
      isAttribuerScooter : false
    });
  }
  toggleAssocierBoitierModal(data,type){
    console.log("toggleAssocierBoitierModal data",data,"type",type);
    if(type===1){
      this.getAssocierBoitierData();
    }
    this.setState({
      isAssocierBoitierModal : !this.state.isAssocierBoitierModal,
      scooterConcerne : data,
      isAssocierBoitierSucess : true,
      boitierModalType : type
    });
  }
  toggleModifierScooterModal(data){
    console.log("modifier data",data);
    this.setState({
      isModifierScooterModal : !this.state.isModifierScooterModal,
      scooterConcerne : data,
      isModifierScooterSuccess : true
    });
  }
  toggleInfoCompletModal(data){
    if (!this.state.isInfoCompletModal) {
      let monthIndex = new Date().getMonth();
      let monthIndex2 = (parseInt(monthIndex)+1)%12;
      let year = new Date().getFullYear();
      let date1 = new Date(year+'-'+month_select[monthIndex]['id']);
      let date2 = new Date(year+'-'+month_select[monthIndex2]['id']);
      let id = data['id_scooter'];
      let nom_scooter = data['num_cruisrent'];
      let dateFrom = date1.toISOString();
      let dateTo = date2.toISOString();
      let rapport_url ='report?deviceId='+id+'&from='+dateFrom+'&to='+dateTo+'&nom_scooter='+nom_scooter;
      this.setState({
        isInfoCompletModal : !this.state.isInfoCompletModal,
        scooterConcerne : data,
        rapport_url : rapport_url
      });
    }else {
      this.setState({
        isInfoCompletModal : !this.state.isInfoCompletModal,
        scooterConcerne : data
      });
    }

    /*
    console.log("toggleInfoCompletModal data",data);
    */
  }
  toggleScooterContratModal(data){
    console.log("ScooterContrat data",data);
    this.setState({
      isScooterContratModal : !this.state.isScooterContratModal,
      scooterConcerne : data
    });
  }
  toggleAttribuerScooter(){
    console.log("AttribuerScooter");
    this.getAssocierScooterData();
    this.setState({
      isAttribuerScooter : !this.state.isAttribuerScooter
    });
  }
  actifFormatter(cell,row){
    if(cell){
      return <button type="button" className="btn btn-success btn-sm col">Oui</button>
    }else {
      return <button type="button" className="btn btn-danger btn-sm col">Non</button>
    }
  }
  scootersGestionFormatter(cell,row){
    return (
      <div>
        <button type="button" className="btn btn-success btn-sm col-sm-4" onClick={()=>this.toggleModifierScooterModal(row)}>Modifier</button>
        <button type="button" className="btn btn-primary btn-sm col-sm-4" onClick={()=>this.toggleInfoCompletModal(row)}>Rapport</button>
        <button type="button" className="btn btn-info btn-sm col-sm-4" onClick={()=>this.toggleScooterContratModal(row)}>Voir Contrat</button>
      </div>
    );
  }
  scooterStatutFormatter(cell,row){
    return (
      <div>
        <button type="button" className={classnames("btn btn-sm col-sm-12",{ "btn-info" : cell===1,"btn-success" : cell===2,"btn-danger" : cell===3, "btn-warning" : cell===4})}>
        {
          this.state.statutsData.map((instance)=>{
            if(instance['id_statut']===cell) return instance['lib_statut'];
          })
        }
        </button>
      </div>
    );
  }
  scootersBoitierFormatter(cell,row){
    if(!cell){
      return (
        <button type="button" className="btn btn-success btn-sm col" onClick={()=>this.toggleAssocierBoitierModal(row,1)}>Associer</button>
      );
    }else {
      return (
        <button type="button" className="btn btn-danger btn-sm col" onClick={()=>this.toggleAssocierBoitierModal(row,2)}>Dissocier {cell}</button>
      );
    }

  }
  scootersContratFormatter(cell,row){
    if(!cell){
      return (
        <button type="button" className="btn btn-success btn-sm col" onClick={()=>this.toggleAssocierContratModal(row,1)}>Associer</button>
      );
    }else {
      return (
        <button type="button" className="btn btn-danger btn-sm col" onClick={()=>this.toggleAssocierContratModal(row,2)}>Dissocier {cell}</button>
      );
    }
  }
  scootersInsertButton = () => {
    return (
      <div>
        <button type="button" className="btn btn-primary btn-md" onClick = {this.toggleInsertScooterModal}>Ajouter un Nouveau Scooter</button>
        <Modal className='modal-lg modal-info' isOpen={this.state.isInsertScooterModal} toggle={this.toggleInsertScooterModal}>
          <ModalHeader toggle={this.toggleInsertScooterModal}>Ajouter un Nouveau Scooter</ModalHeader>
          <ModalBody>
            <div>
              <div className="row">
                <div className="form-group col-sm-6">
                  <label htmlFor="num_cruisrent">Numéro CRUIS RENT</label>
                  <input type="text" className="form-control" id="num_cruisrent" placeholder="Numéro CRUIS RENT"/>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="immat">Numéro d&#39;immatriculation</label>
                  <input type="text" className="form-control" id="immat" placeholder="Numéro d'immatriculation"/>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-sm-6">
                  <label htmlFor="marque">Marque</label>
                  <input type="text" className="form-control" id="marque" placeholder="Marque"/>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="modele">Modèle</label>
                  <input type="text" className="form-control" id="modele" placeholder="Modèle"/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="date_immat">Date d&#39;immatriculation</label>
                <input type="date" className="form-control" id="date_immat" placeholder="Date d'immatriculation"/>
              </div>
              <div className="form-group">
                <label htmlFor="composants">Détail des Composants consommables</label>
                <input type="text" className="form-control" id="composants" placeholder="Detail des composants"/>
              </div>
              <div className="row">
                <div className="form-group col-sm-6">
                  <label htmlFor="type_usage">Type d&#39;usage</label>
                  <input type="text" className="form-control" id="type_usage" placeholder="Type d'usage"/>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="statut">Statut</label>
                  <select className="form-control" id="statut" placeholder="Statut">
                  {
                    this.state.statutsData.map((instance,index)=>{
                      return <option value={instance['id_statut']}>{instance['lib_statut']}</option>
                    })
                  }
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-sm-6">
                  <label htmlFor="num_chassis">Numéro de châssis</label>
                  <input type="text" className="form-control" id="num_chassis" placeholder="Numéro de châssis"/>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="nb_kms">Nombre de Kilomètres</label>
                  <input type="text" className="form-control" id="nb_kms" placeholder="Nombre de Kilomètres"/>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="controle_qualite">Contrôle qualité</label>
                <input type="text" className="form-control" id="controle_qualite" placeholder="Contrôle qualité"/>
              </div>
              <div className="row">
                <div className="form-group col-sm-6">
                  <label htmlFor="assureur">Assureur</label>
                  <input type="text" className="form-control" id="assureur" placeholder="Assureur"/>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="num_contratassurance">Numéro de contrat d&#39;assurance</label>
                  <input type="text" className="form-control" id="num_contratassurance" placeholder="Numéro de contrat d'assurance"/>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="debut_assurance">Date de début d&#39;assurance</label>
                  <input type="date" className="form-control" id="debut_assurance" placeholder="Date de début d'assurance"/>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="duree_assurance">Durée de l&#39;assurance</label>
                  <input type="text" className="form-control" id="duree_assurance" placeholder="Durée de l'assurance"/>
                </div>
              </div>
            </div>
            {!this.state.isInsertScooterSuccess?<span className="help-block text-danger">Error </span>:null}
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-sm btn-success" onClick={this.addScooterData}>Submit</button>
            <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleInsertScooterModal}>Cancel</button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }

  createCustomToolBar = props => {
    /**
   *  This function only pass one argument, is props object which has following properties
   *
   *  {
   *    components: {  // here are all the components
   *      exportCSVBtn,  // export CSV button JSX
   *      insertBtn,  // insert button JSX
   *      deleteBtn,  // delete button JSX
   *      showSelectedOnlyBtn,  // show selected button JSX
   *      searchPanel,  // search panel JSX
   *      btnGroup,  // button groups JSX
   *      searchField,  // search field JSX
   *      clearBtn  // clear search field JSX
   *    },
   *    event: {  // here are all the related event you may use it
   *      openInsertModal,   // call it to open insert modal
   *      closeInsertModal,  // call it to close insert modal
   *      dropRow,   // call it to drop row
   *      showOnlyToogle,   // call it to toogle show only selections
   *      exportCSV,   // call it to export CSV file
   *      search  // call it with search text to search table
   *    }
   *  }
   *
   **/
    return (
      <div style={ { margin: '15px', width: "100%" } }>
        <div className='row'>
          <div className="col-8">
            { props.components.btnGroup }
          </div>
          <div className="col-4">
            { props.components.searchPanel }
          </div>
        </div>
      </div>
    );
  }
  createCustomClearButton = (onClick) => {
    return (
      <button className='btn btn-warning' onClick={ onClick }>Clean</button>
    );
  }
  renderSizePerPageDropDown = props => {
    return (
      <div className='btn-group'>
        {
          [ 5, 10, 15 ].map((n, idx) => {
            const isActive = (n === props.currSizePerPage) ? 'active' : null;
            return (
              <button key={ idx } type='button' className={ `btn btn-info ${isActive}` } onClick={ () => props.changeSizePerPage(n) }>{ n }</button>
            );
          })
        }
      </div>
    );
  }
  render(){
    let cur = this;
    const optionsScooters = {
      insertBtn: this.scootersInsertButton,
      toolBar: this.createCustomToolBar,
      clearSearch: true,
      clearSearchBtn : this.createCustomClearButton,
      sizePerPageDropDown: this.renderSizePerPageDropDown,
      sizePerPage: 5
    }
    return(
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-12">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '1' })}
                  onClick={() => { this.toggle('1'); }}>
                  Scooters
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}>
                  Géolocaliser
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <div className="card">
                  <div className="card-header">
                    <i className="fa fa-align-justify"></i> Gestion des Scooters
                  </div>
                  <div className="card-block">
                    <BootstrapTable
                      options = {optionsScooters}
                      data={ this.state.scootersData }
                      headerStyle = { { "backgroundColor" : "#63c2de" } }
                      insertRow
                      search
                      pagination>

                      <TableHeaderColumn
                        dataField="id_scooter"
                        isKey
                        dataSort>
                        ID
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="num_cruisrent"
                        dataSort>
                        Numéro CruisRent
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="statut"
                        dataSort
                        dataFormat={ this.scooterStatutFormatter }>
                        Statut
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="actif"
                        dataSort
                        dataFormat={ this.actifFormatter }>
                        Active
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="id_boitier"
                        dataSort
                        dataFormat={ this.scootersBoitierFormatter }
                        tdStyle = {{"textAlign" : "center"}}>
                        Boitier
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="id_contrat"
                        dataSort
                        dataFormat={ this.scootersContratFormatter }
                        tdStyle = {{"textAlign" : "center"}}>
                        Contrat
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField=""
                        dataFormat={ this.scootersGestionFormatter }
                        tdStyle = {{"textAlign" : "center"}}
                        width = "25%">
                        Gestion
                      </TableHeaderColumn>
                    </BootstrapTable>
                  </div>
                </div>
              </TabPane>
              <TabPane tabId="2">
                {this.state.activeTab==='2'?<Map/>:null}
              </TabPane>
            </TabContent>
          </div>
          {
            this.state.isAssocierBoitierModal?
            <Modal className='modal-lg modal-info' isOpen={this.state.isAssocierBoitierModal} toggle={this.toggleAssocierBoitierModal}>
              <ModalHeader toggle={this.toggleAssocierBoitierModal}>{this.state.boitierModalType===1?"Associer un Boitier Communiquant":"Dissocier un Boitier Communiquant"}</ModalHeader>
              <ModalBody>
                <div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="id_scooter">Scooter ID</label>
                    <input type="text" className="form-control" id="id_scooter" placeholder="Scooter ID" defaultValue = {this.state.scooterConcerne["id_scooter"]} disabled/>
                  </div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="id_boitier">Boitier ID</label>
                    {
                      this.state.boitierModalType===1?
                      <select className="form-control" id="id_boitier" placeholder="id_boitier" key="id_boitier">
                      {
                        this.state.boitiersAssocier.length>0?this.state.boitiersAssocier.map((instance,index)=>{
                          return <option  key={index+instance['id_boitier']} value={instance['id_boitier']}>{'ID: '+instance['id_boitier']+'\tIMEI: '+instance['imei']}</option>
                        }):<option key="non_disponible">Non Boitier Disponible</option>
                      }
                      </select>:
                      <input type="text" className="form-control"  key="id_boitier" id="id_boitier" placeholder="Boitier ID" defaultValue = {this.state.scooterConcerne["id_boitier"]} disabled/>
                    }
                </div>
                </div>
                {!this.state.isAssocierBoitierSucess?<span className="help-block text-danger">Error </span>:null}
              </ModalBody>
              <ModalFooter>
                <button type="button" className="btn btn-sm btn-success" onClick={this.associerBoiter}>Submit</button>
                <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleAssocierBoitierModal}>Cancel</button>
              </ModalFooter>
            </Modal>
            :null
          }
          {
            this.state.isAssocierContratModal?
            <Modal className='modal-lg modal-info' isOpen={this.state.isAssocierContratModal} toggle={this.toggleAssocierContratModal}>
              <ModalHeader toggle={this.toggleAssocierContratModal}>{this.state.contratModalType===1?"Associer un Contrat":"Dissocier un Contrat"}</ModalHeader>
              <ModalBody>
                <div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="id_scooter">Scooter ID</label>
                    <input type="text" className="form-control" id="id_scooter" placeholder="Scooter ID" defaultValue = {this.state.scooterConcerne["id_scooter"]} disabled/>
                  </div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="id_contrat">Contrat ID</label>
                    {
                      this.state.contratModalType===1?
                      <select className="form-control" id="id_contrat" placeholder="id_contrat" key="id_contrat">
                      {
                        this.state.contratsAssocier.length>0?this.state.contratsAssocier.map((instance,index)=>{
                          return <option  key={index+instance['id_contrat']} value={instance['id_contrat']}>{instance['id_contrat']+'\t'+instance['societe']}</option>
                        }):<option key="non_disponible">Non Contrat Disponible</option>
                      }
                      </select>:
                      <input type="text" className="form-control"  key="id_contrat" id="id_contrat" placeholder="Contrat ID" defaultValue = {this.state.scooterConcerne["id_contrat"]} disabled/>
                    }
                  </div>
                  {
                    this.state.contratModalType!==1?
                    <div>
                      <div className="form-group col-sm-12">
                        <label htmlFor="statut">Statut</label>
                        <select className="form-control" id="statut" placeholder="Statut">
                        {
                          this.state.statutsData.map((instance,index)=>{
                            return <option value={instance['id_statut']}>{instance['lib_statut']}</option>
                          })
                        }
                        </select>
                      </div>
                      <div className="form-group col-sm-12">
                        <label htmlFor="statut">Attribuer l&#39;autre Scooter?</label>
                        <label className="switch switch-default switch-primary float-right">
                          <input type="checkbox" className="switch-input" onClick={this.toggleAttribuerScooter} />
                          <span className="switch-label"></span>
                          <span className="switch-handle"></span>
                        </label>
                        {
                          this.state.isAttribuerScooter?
                          <div>
                            <label htmlFor="statut">Nouveau Scooter ID</label>
                            <select className="form-control" id="id_scooter_new" placeholder="Nouveau Scooter ID">
                            {
                              this.state.scootersAssocier.map((instance,index)=>{
                                return <option value={instance['id_scooter']}>{instance['id_scooter']}</option>
                              })
                            }
                            </select>
                          </div>:null
                        }
                      </div>
                    </div>:null
                  }
                </div>
                {!this.state.isAssocierContratSuccess?<span className="help-block text-danger">Error </span>:null}
              </ModalBody>
              <ModalFooter>
                <button type="button" className="btn btn-sm btn-success" onClick={this.associerContrat}>Submit</button>
                <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleAssocierContratModal}>Cancel</button>
              </ModalFooter>
            </Modal>:null
          }
          {

            this.state.isInfoCompletModal?
            <Modal className='modal-lg modal-info' isOpen={this.state.isInfoCompletModal} toggle={this.toggleInfoCompletModal}>
              <ModalHeader toggle={this.toggleInfoCompletModal}>Rapport Mensuelle</ModalHeader>
              <ModalBody>
                <div className="row">
                  <div className="form-group col-sm-12">
                    <label htmlFor="rapport_mois">N° CruisrRent</label>
                    <input disabled type="text" className="form-control" id="num_cruisrent" placeholder="Scooter" defaultValue = {this.state.scooterConcerne["num_cruisrent"]}/>
                  </div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="rapport_mois">Selectionner le mois</label>
                    <input type="month" className="form-control" id="rapport_mois2" placeholder="Rapport Mois" defaultValue = {new Date().toISOString()} onChange={(e)=>this.handleSelectRapportMois(e.target.value)}/>
                  </div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="rapport_start_day">Selectionner le Jour Début</label>
                    <select className="form-control" id="rapport_jour" placeholder="Rapport Jour Début" onChange={(e)=>this.handleSelectRapportJour(e.target.value)}>
                      {
                        month_day_list.map((instance,index)=>{
                          if (parseInt(instance)<=month_day_select[parseInt(this.state.rapport_mois.split('-')[1])-1]) {
                            return <option value={instance}>{instance}</option>
                          }
                        })
                      }
                    </select>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Link target="_blank" to={this.state.rapport_url}  className="text-white"><button type="button" className="btn btn-info btn-sm">Afficher</button></Link>
                <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleInfoCompletModal}>Fermer</button>
              </ModalFooter>
            </Modal>:null
          }
          {
            this.state.isScooterContratModal?
            <Modal className='modal-lg modal-info' isOpen={this.state.isScooterContratModal} toggle={this.toggleScooterContratModal}>
              <ModalHeader toggle={this.toggleScooterContratModal}>{this.state.contratModalType===1?"Associer un Contrat":"Dissocier un Contrat"}</ModalHeader>
              <ModalBody>
                <div>
                  lien
                </div>
              </ModalBody>
              <ModalFooter>
                <button type="button" className="btn btn-sm btn-primary" onClick={this.toggleScooterContratModal}>Close</button>
              </ModalFooter>
            </Modal>:null
          }
          {
            this.state.isModifierScooterModal?

              <Modal className='modal-lg modal-info' isOpen={this.state.isModifierScooterModal} toggle={this.toggleModifierScooterModal}>
                <ModalHeader toggle={this.toggleModifierScooterModal}>Ajouter un Nouveau Scooter</ModalHeader>
                <ModalBody>
                  <div>
                    <div className="row">
                      <div className="form-group col-sm-6">
                        <label htmlFor="num_cruisrent">Numéro CRUIS RENT</label>
                        <input type="text" className="form-control" id="num_cruisrent" placeholder="Numéro CRUIS RENT" defaultValue = {this.state.scooterConcerne['num_cruisrent']}/>
                      </div>
                      <div className="form-group col-sm-6">
                        <label htmlFor="immat">Numéro d&#39;immatriculation</label>
                        <input type="text" className="form-control" id="immat" placeholder="Numéro d'immatriculation" defaultValue = {this.state.scooterConcerne['immat']}/>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-sm-6">
                        <label htmlFor="marque">Marque</label>
                        <input type="text" className="form-control" id="marque" placeholder="Marque" defaultValue = {this.state.scooterConcerne['marque']}/>
                      </div>
                      <div className="form-group col-sm-6">
                        <label htmlFor="modele">Modèle</label>
                        <input type="text" className="form-control" id="modele" placeholder="Modèle" defaultValue = {this.state.scooterConcerne['marque']}/>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="date_immat">Date d&#39;immatriculation</label>
                      <input type="date" className="form-control" id="date_immat" placeholder="Date d'immatriculation" defaultValue = {this.state.scooterConcerne['date_immat']}/>
                    </div>
                    <div className="form-group">
                      <label htmlFor="composants">Détail des Composants consommables</label>
                      <input type="text" className="form-control" id="composants" placeholder="Detail des composants" defaultValue = {this.state.scooterConcerne['composants']}/>
                    </div>
                    <div className="row">
                      <div className="form-group col-sm-6">
                        <label htmlFor="type_usage">Type d&#39;usage</label>
                        <input type="text" className="form-control" id="type_usage" placeholder="Type d'usage" defaultValue = {this.state.scooterConcerne['type_usage']}/>
                      </div>
                      <div className="form-group col-sm-6">
                        <label htmlFor="statut">Statut</label>
                        <select className="form-control" id="statut" placeholder="Statut" defaultValue = {this.state.scooterConcerne['statut']}>
                        {
                          this.state.statutsData.map((instance,index)=>{
                            return <option value={instance['id_statut']}>{instance['lib_statut']}</option>
                          })
                        }
                        </select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group col-sm-6">
                        <label htmlFor="num_chassis">Numéro de châssis</label>
                        <input type="text" className="form-control" id="num_chassis" placeholder="Numéro de châssis" defaultValue = {this.state.scooterConcerne['num_chassis']}/>
                      </div>
                      <div className="form-group col-sm-6">
                        <label htmlFor="nb_kms">Nombre de Kilomètres</label>
                        <input type="text" className="form-control" id="nb_kms" placeholder="Nombre de Kilomètres" defaultValue = {this.state.scooterConcerne['nb_kms']}/>
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="controle_qualite">Contrôle qualité</label>
                      <input type="text" className="form-control" id="controle_qualite" placeholder="Contrôle qualité" defaultValue = {this.state.scooterConcerne['controle_qualite']}/>
                    </div>
                    <div className="row">
                      <div className="form-group col-sm-6">
                        <label htmlFor="assureur">Assureur</label>
                        <input type="text" className="form-control" id="assureur" placeholder="Assureur" defaultValue = {this.state.scooterConcerne['assureur']}/>
                      </div>
                      <div className="form-group col-sm-6">
                        <label htmlFor="num_contratassurance">Numéro de contrat d&#39;assurance</label>
                        <input type="text" className="form-control" id="num_contratassurance" placeholder="Numéro de contrat d'assurance" defaultValue = {this.state.scooterConcerne['num_contratassurance']}/>
                      </div>
                      <div className="form-group col-sm-6">
                        <label htmlFor="debut_assurance">Date de début d&#39;assurance</label>
                        <input type="date" className="form-control" id="debut_assurance" placeholder="Date de début d'assurance" defaultValue = {this.state.scooterConcerne['debut_assurance']}/>
                      </div>
                      <div className="form-group col-sm-6">
                        <label htmlFor="duree_assurance">Durée de l&#39;assurance</label>
                        <input type="text" className="form-control" id="duree_assurance" placeholder="Durée de l'assurance" defaultValue = {this.state.scooterConcerne['duree_assurance']}/>
                      </div>
                    </div>
                  </div>
                  {!this.state.isModifierScooterSuccess?<span className="help-block text-danger">Error </span>:null}
                </ModalBody>
                <ModalFooter>
                  <button type="button" className="btn btn-sm btn-success" onClick={this.modifierScooterData}>Submit</button>
                  <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleModifierScooterModal}>Cancel</button>
                </ModalFooter>
                </Modal>:null
          }
        </div>
      </div>
    );
  }
}
