import ReactDOM from 'react-dom'
import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter, Button, Progress } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import classnames from 'classnames';
import urls from '../configs/serverConfigurations'
const data = [{
  "id_boitier" : 1,
  "code_puk" : "34",
  "code_pin" : "34",
  "forfait" : "34",
  "statut" : 1,
  "num_tel" : "0650651584",
  "password" : "123456",
  "imei" : "837741364846543",
  "date_reception" : "2017-08-03" ,
  "data_acuisition" : "2017-08-03",
  "date_activation" : "2017-08-03",
  "date_ajout" : "2017-08-03",
  "identifiant" : "001",
  "scooter" : "CruisR"
},{
  "id_boitier" : 2,
  "code_puk" : "34",
  "code_pin" : "34",
  "forfait" : "34",
  "statut" : 2,
  "num_tel" : "0650651584",
  "password" : "123456",
  "imei" : "837741364846543",
  "date_reception" : "2017-08-03" ,
  "data_acuisition" : "2017-08-03",
  "date_activation" : "2017-08-03",
  "date_ajout" : "2017-08-03",
  "identifiant" : "002"
},{
  "id_boitier" : 3,
  "code_puk" : "34",
  "code_pin" : "34",
  "forfait" : "34",
  "statut" : 3,
  "num_tel" : "0650651584",
  "password" : "123456",
  "imei" : "837741364846543",
  "date_reception" : "2017-08-03" ,
  "data_acuisition" : "2017-08-03",
  "date_activation" : "2017-08-03",
  "date_ajout" : "2017-08-03",
  "identifiant" : "003"
}];
const statut = {
  1 : "Disponible",
  2 : "Assigner",
  3 : "A récupérer"
}
const urlBoitiers = urls.boitiers;
const urlStatutsCles = urls.statutscles;
export default class GestionDesBoitiers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      isInsertBoitierModal : false,
      isInsertBoitierSuccess : true,
      isAssocierScooterModal : false,
      isAssocierScooterSuccess : true,
      isModifierBoitierModal : false,
      isModifierBoitierSuccess : true,
      isInfoCompletModal : false,
      isChangerStatutModal : false,
      isChangerStatutSuccess : true,
      scooterModalType : 1,
      boitierConcerne : {},
      boitiersData : [],
      statutsClesData : []
    }
    this.toggle = this.toggle.bind(this);
    this.toggleInsertBoitierModal = this.toggleInsertBoitierModal.bind(this);
    this.toggleModifierBoitierModal = this.toggleModifierBoitierModal.bind(this);
    this.toggleAssocierScooterModal = this.toggleAssocierScooterModal.bind(this);
    this.toggleInfoCompletModal = this.toggleInfoCompletModal.bind(this);
    this.toggleChangerStatutModal = this.toggleChangerStatutModal.bind(this);
    this.boitiersGestionFormatter = this.boitiersGestionFormatter.bind(this);
    this.boitiersScooterFormatter = this.boitiersScooterFormatter.bind(this);
    this.boitiersStatutFormatter = this.boitiersStatutFormatter.bind(this);
    this.addBoitierData = this.addBoitierData.bind(this);
    this.associerScooter = this.associerScooter.bind(this);
    this.changerStatut = this.changerStatut.bind(this);
    this.modifierBoitierData = this.modifierBoitierData.bind(this);
  }
  componentDidMount(){
    this.getData();
  }
  getData(){
    fetch(urlStatutsCles)
    .then((response) => response.json())
    .then((responseJson)=>{
      this.setState({
        statutsClesData : responseJson
      })
    })
    .catch((error) => {
      console.error(error);
    });
    fetch(urlBoitiers)
    .then((response) => response.json())
    .then((responseJson)=>{
      this.setState({
        boitiersData : responseJson
      })
    })
    .catch((error) => {
      console.error(error);
    });
  }
  addBoitierData(){
    const queryMethod = "POST";
    let data = {};
    /*data["date_acquisition"], data["date_reception"], data["identifiant"],data["date_mis_en_place"], data["num_tel"], data["code_puk"],
    data["imei"], data["password"],data["code_pin"], data["forfait"],,data["date_activation"], data["statut"]*/
    data["date_acquisition"] = document.getElementById("date_acquisition").value?document.getElementById("date_acquisition").value:null;
    data["date_reception"] = document.getElementById("date_reception").value?document.getElementById("date_reception").value:null;
    data["identifiant"] = document.getElementById("identifiant").value?document.getElementById("identifiant").value:null;
    data["num_tel"] = document.getElementById("num_tel").value?document.getElementById("num_tel").value:null;
    data["code_puk"] = document.getElementById("code_puk").value?document.getElementById("code_puk").value:null;
    data["imei"] = document.getElementById("imei").value?document.getElementById("imei").value:null;
    data["password"] = document.getElementById("password").value?document.getElementById("password").value:null;
    data["code_pin"] = document.getElementById("code_pin").value?document.getElementById("code_pin").value:null;
    data["forfait"] = document.getElementById("forfait").value?document.getElementById("forfait").value:null;
    data["date_activation"] = document.getElementById("date_activation").value?document.getElementById("date_activation").value:null;
    data["statut"] = document.getElementById("statut").value?document.getElementById("statut").value:null;
    fetch(urlBoitiers,{
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
            isInsertBoitierSuccess : false
          })
        }else {
          fetch(urlBoitiers)
          .then((response) => response.json())
          .then((responseJson)=>{
            this.setState({
              boitiersData : responseJson,
              isInsertBoitierModal : !this.state.isInsertBoitierModal
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
  modifierBoitierData(){
    const queryMethod = "PUT";
    let data = {};
    data["id_boitier"] = this.state.boitierConcerne["id_boitier"];
    data["date_acquisition"] = document.getElementById("date_acquisition").value?document.getElementById("date_acquisition").value:null;
    data["date_reception"] = document.getElementById("date_reception").value?document.getElementById("date_reception").value:null;
    data["identifiant"] = document.getElementById("identifiant").value?document.getElementById("identifiant").value:null;
    data["num_tel"] = document.getElementById("num_tel").value?document.getElementById("num_tel").value:null;
    data["code_puk"] = document.getElementById("code_puk").value?document.getElementById("code_puk").value:null;
    data["imei"] = document.getElementById("imei").value?document.getElementById("imei").value:null;
    data["password"] = document.getElementById("password").value?document.getElementById("password").value:null;
    data["code_pin"] = document.getElementById("code_pin").value?document.getElementById("code_pin").value:null;
    data["forfait"] = document.getElementById("forfait").value?document.getElementById("forfait").value:null;
    data["date_activation"] = document.getElementById("date_activation").value?document.getElementById("date_activation").value:null;
    data["statut"] = document.getElementById("statut").value?document.getElementById("statut").value:null;
    fetch(urlBoitiers,{
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
            isModifierBoitierSuccess : false
          })
        }else {
          fetch(urlBoitiers)
          .then((response) => response.json())
          .then((responseJson)=>{
            this.setState({
              boitiersData : responseJson,
              isModifierBoitierModal : !this.state.isModifierBoitierModal
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
  changerStatut(){
    const queryMethod = "PUT";
    const url = urlBoitiers + '/statut';
    let data = {};
    data['id_boitier'] = this.state.boitierConcerne['id_boitier'];
    data['statut'] = document.getElementById('statut').value;
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
            isChangerStatutSuccess : false
          })
        }else {
          fetch(urlBoitiers)
          .then((response) => response.json())
          .then((responseJson)=>{
            this.setState({
              boitiersData : responseJson,
              isChangerStatutModal : !this.state.isChangerStatutModal
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
  associerScooter(){
    const queryMethod = "PUT";
    const url = urlBoitiers + '/scooter';
    let data = {};
    data['id_boitier'] = this.state.boitierConcerne['id_boitier'];
    data['id_scooter'] = document.getElementById('id_scooter').value;
    data['scooterModalType'] = this.state.scooterModalType;
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
            isAssocierScooterSucess : false
          })
        }else {
          fetch(urlBoitiers)
          .then((response) => response.json())
          .then((responseJson)=>{
            this.setState({
              boitiersData : responseJson,
              isAssocierScooterModal : !this.state.isAssocierScooterModal
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
  getUTCDate(date){
    if(date) return date.split('T')[0];
    else {
      return 'Unknown';
    }
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  toggleInsertBoitierModal(){
    this.setState({
      isInsertBoitierModal : !this.state.isInsertBoitierModal,
      isInsertBoitierSuccess : true
    });
  }
  toggleModifierBoitierModal(data){
    this.setState({
      isModifierBoitierModal : !this.state.isModifierBoitierModal,
      isModifierBoitierSuccess : true,
      boitierConcerne : data
    });
  }
  toggleAssocierScooterModal(data,type){
    console.log("toggleAssocierScooterModal data",data,"type",type);
    this.setState({
      isAssocierScooterModal : !this.state.isAssocierScooterModal,
      isAssocierScooterSuccess : true,
      boitierConcerne : data,
      scooterModalType : type
    });
  }
  toggleInfoCompletModal(data){
    console.log("toggleInfoCompletModal data",data);
    this.setState({
      isInfoCompletModal : !this.state.isInfoCompletModal,
      boitierConcerne : data
    });
  }
  toggleChangerStatutModal(data){
    this.setState({
      isChangerStatutModal : !this.state.isChangerStatutModal,
      isChangerStatutSuccess : true,
      boitierConcerne : data
    });
  }
  boitiersGestionFormatter(cell,row){
    return (
      <div>
        <button type="button" className="btn btn-info btn-sm col-sm-12" onClick={()=>this.toggleModifierBoitierModal(row)}>Modifier</button>
      </div>
    );
  }
  boitiersStatutFormatter(cell,row){
    return (
      <div>
        <button type="button" className={classnames("btn btn-sm col-sm-12",{ "btn-success" : cell===1,"btn-info" : cell===2,"btn-warning" : cell===3})} onClick={()=>this.toggleChangerStatutModal(row)}>
        {
          this.state.statutsClesData.map((instance)=>{
            if(instance['id_statutcle']===cell) return instance['lib_statutcle'];
          })
        }
        </button>
      </div>
    );
  }
  boitiersScooterFormatter(cell,row){
    if(!cell){
      return (
        <button type="button" className="btn btn-success btn-sm col-sm-12" onClick={()=>this.toggleAssocierScooterModal(row,1)}>Associer</button>
      );
    }else {
      return (
        <button type="button" className="btn btn-danger btn-sm col-sm-12" onClick={()=>this.toggleAssocierScooterModal(row,2)}>Dissocier {cell}</button>
      );
    }
  }
  boitiersInsertButton = () => {
    return (
      <div>
        <button type="button" className="btn btn-primary btn-md" onClick = {this.toggleInsertBoitierModal}>Ajouter un Nouveau Boitier</button>
        <Modal className='modal-lg modal-info' isOpen={this.state.isInsertBoitierModal} toggle={this.toggleInsertBoitierModal}>
          <ModalHeader toggle={this.toggleInsertBoitierModal}>Ajouter un Nouveau Boitier</ModalHeader>
          <ModalBody>
            <div>
              <div className="row">
                <div className="form-group col-sm-4">
                  <label htmlFor="date_reception">Date de Reception</label>
                  <input type="date" className="form-control" id="date_reception" placeholder="Date de Reception"/>
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="date_acquisition">Date d&#39;acquisition</label>
                  <input type="date" className="form-control" id="date_acquisition" placeholder="Date d'acquisition"/>
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="date_activation">Date d&#39;activation</label>
                  <input type="date" className="form-control" id="date_activation" placeholder="Date d'activation"/>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="identifiant">Identifiant</label>
                  <input type="text" className="form-control" id="identifiant" placeholder="Identifiant"/>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="imei">IMEI</label>
                  <input type="text" className="form-control" id="imei" placeholder="IMEI"/>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="num_tel">Numéro de Téléphone</label>
                  <input type="text" className="form-control" id="num_tel" placeholder="Numéro de Téléphone"/>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="forfait">Type de Forfait</label>
                  <input type="text" className="form-control" id="forfait" placeholder="Type de Forfait"/>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="code_puk">Code PUK</label>
                  <input type="text" className="form-control" id="code_puk" placeholder="Code PUK"/>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="code_pin">Code PIN</label>
                  <input type="text" className="form-control" id="code_pin" placeholder="Code PIN"/>
                </div>
                <div className="form-group col-sm-12">
                  <label htmlFor="password">Mot de Passe</label>
                  <input type="text" className="form-control" id="password" placeholder="Mot de Passe"/>
                </div>
                <div className="form-group col-sm-12">
                  <label htmlFor="statut">Statut</label>
                  <select className="form-control" id="statut" placeholder="Statut">
                  {
                    this.state.statutsClesData.map((instance,index)=>{
                      return <option value={instance['id_statutcle']}>{instance['lib_statutcle']}</option>
                    })
                  }
                  </select>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-sm btn-success" onClick={this.addBoitierData}>Submit</button>
            <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleInsertBoitierModal}>Cancel</button>
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
  render(){
    let cur = this;
    const optionsScooters = {
      insertBtn: cur.boitiersInsertButton,
      toolBar: this.createCustomToolBar,
      clearSearch: true,
      clearSearchBtn : this.createCustomClearButton
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
                  Boitiers
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <div className="card">
                  <div className="card-header">
                    <i className="fa fa-align-justify"></i> Gestion des Boitier
                  </div>
                  <div className="card-block">
                    <BootstrapTable
                      options = {optionsScooters}
                      data={ this.state.boitiersData }
                      headerStyle = { { "backgroundColor" : "#63c2de" } }
                      insertRow
                      search>
                      <TableHeaderColumn
                        dataField="id_boitier"
                        isKey
                        dataSort>
                        ID
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="imei"
                        dataSort>
                        IMEI
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="statut"
                        dataSort
                        dataFormat = {this.boitiersStatutFormatter}>
                        Statut
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="id_scooter"
                        dataSort
                        dataFormat={ this.boitiersScooterFormatter }
                        tdStyle = {{"textAlign" : "center"}}>
                        Scooter
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField=""
                        dataFormat={ this.boitiersGestionFormatter }
                        tdStyle = {{"textAlign" : "center"}}
                        width = "25%">
                        Gestion
                      </TableHeaderColumn>
                    </BootstrapTable>
                  </div>
                </div>
              </TabPane>
              <TabPane tabId="2">

              </TabPane>
              <TabPane tabId="3">

              </TabPane>
            </TabContent>
          </div>
          {
            this.state.isAssocierScooterModal?
            <Modal className='modal-lg modal-info' isOpen={this.state.isAssocierScooterModal} toggle={this.toggleAssocierScooterModal}>
              <ModalHeader toggle={this.toggleAssocierScooterModal}>{this.state.scooterModalType===1?"Associer un Scooter":"Dissocier un Scooter"}</ModalHeader>
              <ModalBody>
                <div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="id_boitier">Boitier ID</label>
                    <input type="text" className="form-control" id="id_boitier" placeholder="Boitier ID" defaultValue = {this.state.boitierConcerne["id_boitier"]} disabled/>
                  </div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="id_scooter">Scooter ID</label>
                    <input type="text" className="form-control" id="id_scooter" placeholder="Scooter ID" defaultValue = {this.state.scooterModalType===1?null:this.state.boitierConcerne["id_scooter"]} disabled={this.state.scooterModalType!==1}/>
                  </div>
                </div>
                {!this.state.isAssocierScooterSuccess?<span className="help-block text-danger">Error </span>:null}
              </ModalBody>
              <ModalFooter>
                <button type="button" className="btn btn-sm btn-success" onClick={this.associerScooter}>Submit</button>
                <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleAssocierScooterModal}>Cancel</button>
              </ModalFooter>
            </Modal>:null
          }
          {
            this.state.isChangerStatutModal?
            <Modal className='modal-lg modal-info' isOpen={this.state.isChangerStatutModal} toggle={this.toggleChangerStatutModal}>
              <ModalHeader toggle={this.toggleChangerStatutModal}>Changer le Statut</ModalHeader>
              <ModalBody>
                <div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="id_boitier">Boitier ID</label>
                    <input type="text" className="form-control" id="id_boitier" placeholder="Boitier ID" defaultValue = {this.state.boitierConcerne["id_boitier"]} disabled/>
                  </div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="id_contrat">Statut</label>
                    <select className="form-control" id="statut" placeholder="Statut">
                    {
                      this.state.statutsClesData.map((instance,index)=>{
                        return <option value={instance['id_statutcle']}>{instance['lib_statutcle']}</option>
                      })
                    }
                    </select>
                  </div>
                </div>
                {!this.state.isChangerStatutSuccess?<span className="help-block text-danger">Error </span>:null}
              </ModalBody>
              <ModalFooter>
                <button type="button" className="btn btn-sm btn-success" onClick={this.changerStatut}>Submit</button>
                <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleChangerStatutModal}>Cancel</button>
              </ModalFooter>
            </Modal>:null
          }
          {
            this.state.isModifierBoitierModal?
            <Modal className='modal-lg modal-info' isOpen={this.state.isModifierBoitierModal} toggle={this.toggleModifierBoitierModal}>
              <ModalHeader toggle={this.toggleModifierBoitierModal}>Ajouter un Nouveau Boitier</ModalHeader>
              <ModalBody>
                <div>
                  <div className="row">
                    <div className="form-group col-sm-4">
                      <label htmlFor="date_reception">Date de Reception</label>
                      <input type="date" className="form-control" id="date_reception" placeholder="Date de Reception" defaultValue={this.getUTCDate(this.state.boitierConcerne['date_reception'])}/>
                    </div>
                    <div className="form-group col-sm-4">
                      <label htmlFor="date_acquisition">Date d&#39;acquisition</label>
                      <input type="date" className="form-control" id="date_acquisition" placeholder="Date d'acquisition" defaultValue={this.getUTCDate(this.state.boitierConcerne['date_acquisition'])}/>
                    </div>
                    <div className="form-group col-sm-4">
                      <label htmlFor="date_activation">Date d&#39;activation</label>
                      <input type="date" className="form-control" id="date_activation" placeholder="Date d'activation" defaultValue={this.getUTCDate(this.state.boitierConcerne['date_activation'])}/>
                    </div>
                    <div className="form-group col-sm-6">
                      <label htmlFor="identifiant">Identifiant</label>
                      <input type="text" className="form-control" id="identifiant" placeholder="Identifiant" defaultValue = {this.state.boitierConcerne['identifiant']}/>
                    </div>
                    <div className="form-group col-sm-6">
                      <label htmlFor="imei">IMEI</label>
                      <input type="text" className="form-control" id="imei" placeholder="IMEI" defaultValue = {this.state.boitierConcerne['imei']}/>
                    </div>
                    <div className="form-group col-sm-6">
                      <label htmlFor="num_tel">Numéro de Téléphone</label>
                      <input type="text" className="form-control" id="num_tel" placeholder="Numéro de Téléphone" defaultValue = {this.state.boitierConcerne['num_tel']}/>
                    </div>
                    <div className="form-group col-sm-6">
                      <label htmlFor="forfait">Type de Forfait</label>
                      <input type="text" className="form-control" id="forfait" placeholder="Type de Forfait" defaultValue = {this.state.boitierConcerne['forfait']}/>
                    </div>
                    <div className="form-group col-sm-6">
                      <label htmlFor="code_puk">Code PUK</label>
                      <input type="text" className="form-control" id="code_puk" placeholder="Code PUK"  defaultValue = {this.state.boitierConcerne['code_puk']}/>
                    </div>
                    <div className="form-group col-sm-6">
                      <label htmlFor="code_pin">Code PIN</label>
                      <input type="text" className="form-control" id="code_pin" placeholder="Code PIN"  defaultValue = {this.state.boitierConcerne['code_pin']}/>
                    </div>
                    <div className="form-group col-sm-12">
                      <label htmlFor="password">Mot de Passe</label>
                      <input type="text" className="form-control" id="password" placeholder="Mot de Passe"  defaultValue = {this.state.boitierConcerne['password']}/>
                    </div>
                    <div className="form-group col-sm-12">
                      <label htmlFor="statut">Statut</label>
                      <select className="form-control" id="statut" placeholder="Statut"  defaultValue = {this.state.boitierConcerne['statut']}>
                      {
                        this.state.statutsClesData.map((instance,index)=>{
                          return <option value={instance['id_statutcle']}>{instance['lib_statutcle']}</option>
                        })
                      }
                      </select>
                    </div>
                  </div>
                </div>
                {!this.state.isModifierBoitierSuccess?<span className="help-block text-danger">Error </span>:null}
              </ModalBody>
              <ModalFooter>
                <button type="button" className="btn btn-sm btn-success" onClick={this.modifierBoitierData}>Submit</button>
                <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleModifierBoitierModal}>Cancel</button>
              </ModalFooter>
            </Modal>:null
          }
        </div>
      </div>
    );
  }
}
