import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import classnames from 'classnames';
import mysql from 'mysql2/promise';
import urls from '../configs/serverConfigurations';
const type_data = [{
  "id_type_contrat":"1",
  "nom":"Contrat_1",
  "description" : "Template_1",
  "niveau_service" : "1",
  "durée" : 12,
  "tarifmensuel" : 500,
  "assurance_rc" : "Allianz"
}];
const contrat_data=[{
  "id_contrat" : 1,
  "niveau_assurance": 1,
  "address" : "Denfert Rochereau",
  "datedebut" : "2017-08-03",
  "annexe_batterie" : "1",
  "annexe_contrat" : "1",
  "annexe_accessoires" : "1",
  "annexe_scooter" : "1",
  "actif" : true
}];

const urlContrats = urls.contrats;
const urlClients = urls.clients;
const urlTypesContrats = urls.types_contrats;
export default class GestionDesContrats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      isInsertContratModal : false,
      isInsertContratSuccess : true,
      isInsertTypeContratModal : false,
      isModifierContratModal : false,
      isModifierContratSuccess : true,
      isScooterModalModal : false,
      contratConcerne : null,
      isModifierTypeContratModal : false,
      isAssocierContratModal : false,
      typeAssocierContratModal : 1,
      typeContratConcerne : null,
      contratsData : [],
      clientsData : [],
      typesContratsData : [],
      typeContratSelection : {}
    }
    this.toggle = this.toggle.bind(this);
    this.toggleInsertContratModal = this.toggleInsertContratModal.bind(this);
    this.toggleInsertTypeContratModal = this.toggleInsertTypeContratModal.bind(this);
    this.toggleModifierContratModal = this.toggleModifierContratModal.bind(this);
    this.toggleModifierTypeContratModal = this.toggleModifierTypeContratModal.bind(this);
    this.toggleScooterModal = this.toggleScooterModal.bind(this);
    this.toggleAssocierContratModal = this.toggleAssocierContratModal.bind(this);
    this.contratsGestionFormatter = this.contratsGestionFormatter.bind(this);
    this.contratsAssocierFormatter = this.contratsAssocierFormatter.bind(this);
    this.typeContratGestionFormatter = this.typeContratGestionFormatter.bind(this);
    this.handleSelectTypeContrat = this.handleSelectTypeContrat.bind(this);
    this.contratsInsertButton = this.contratsInsertButton.bind(this);
    this.addContratData = this.addContratData.bind(this);
    this.modifierContratData = this.modifierContratData.bind(this);
  }
  componentDidMount(){
    this.getData();
  }
  getData(){
    fetch(urlContrats)
    .then((response) => response.json())
    .then((responseJson)=>{
      this.setState({
        contratsData : responseJson
      })
    })
    .catch((error) => {
      console.error(error);
    });
    fetch(urlTypesContrats)
    .then((response) => response.json())
    .then((responseJson)=>{
      this.setState({
        typesContratsData : responseJson
      })
    })
    .catch((error) => {
      console.error(error);
    });
    fetch(urlClients)
    .then((response) => response.json())
    .then((responseJson)=>{
      this.setState({
        clientsData : responseJson
      })
    })
    .catch((error) => {
      console.error(error);
    });
  }
  addContratData(){
    const queryMethod = "POST";
    let data = {};
    data['id_type_contrat']=document.getElementById("id_type_contrat").value?document.getElementById("id_type_contrat").value:null
    data['id_client']=document.getElementById("id_client").value?document.getElementById("id_client").value:null
    data['adresse_facturation']=document.getElementById("adresse_facturation").value?document.getElementById("adresse_facturation").value:null
    data['niveau_service']=document.getElementById("niveau_service").value?document.getElementById("niveau_service").value:null
    data['datedebut']=document.getElementById("datedebut").value?document.getElementById("datedebut").value:null
    data['duree']=document.getElementById("duree").value?document.getElementById("duree").value:null
    data['tarifassurance']=document.getElementById("tarifassurance").value?document.getElementById("tarifassurance").value:null
    data['mensualite_ht']=document.getElementById("mensualite_ht").value?document.getElementById("mensualite_ht").value:null
    fetch(urlContrats,{
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
            isInsertContratSuccess : false
          })
        }else {
          fetch(urlContrats)
          .then((response) => response.json())
          .then((responseJson)=>{
            this.setState({
              contratsData : responseJson,
              isInsertContratModal : !this.state.isInsertContratModal
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
  modifierContratData(){
    const queryMethod = "PUT";
    let data = {};
    data["id_contrat"] = this.state.contratConcerne["id_contrat"];
    data['id_type_contrat']=document.getElementById("id_type_contrat").value?document.getElementById("id_type_contrat").value:null
    data['id_client']=document.getElementById("id_client").value?document.getElementById("id_client").value:null
    data['adresse_facturation']=document.getElementById("adresse_facturation").value?document.getElementById("adresse_facturation").value:null
    data['niveau_service']=document.getElementById("niveau_service").value?document.getElementById("niveau_service").value:null
    data['datedebut']=document.getElementById("datedebut").value?document.getElementById("datedebut").value:null
    data['duree']=document.getElementById("duree").value?document.getElementById("duree").value:null
    data['tarifassurance']=document.getElementById("tarifassurance").value?document.getElementById("tarifassurance").value:null
    data['mensualite_ht']=document.getElementById("mensualite_ht").value?document.getElementById("mensualite_ht").value:null
    fetch(urlContrats,{
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
            isModifierContratSuccess : false
          })
        }else {
          fetch(urlContrats)
          .then((response) => response.json())
          .then((responseJson)=>{
            this.setState({
              contratsData : responseJson,
              isModifierContratModal : !this.state.isModifierContratModal
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
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  toggleScooterModal(data) {
    this.setState({
      isScooterModalModal : !this.state.isScooterModalModal,
      contratConcerne : data
    });
  }
  toggleModifierContratModal(data){
    this.setState({
      isModifierContratModal : !this.state.isModifierContratModal,
      contratConcerne : data
    });
  }
  toggleModifierTypeContratModal(data){
    this.setState({
      isModifierTypeContratModal : !this.state.isModifierTypeContratModal,
      typeContratConcerne : data
    });
  }
  toggleInsertContratModal(){
    this.setState({
      isInsertContratModal : !this.state.isInsertContratModal
    });
  }
  toggleInsertTypeContratModal(){
    this.setState({
      isInsertTypeContratModal : !this.state.isInsertTypeContratModal
    });
  }
  toggleAssocierContratModal(type,data){
    this.setState({
      isAssocierContratModal : !this.state.isAssocierContratModal,
      typeAssocierContratModal : type,
      contratConcerne : data
    });
  }
  handleSelectTypeContrat(e){
    let t={};
    this.state.typesContratsData.map((instance,index)=>{
      if(instance['id_type_contrat']===parseInt(e.target.value)){
        t = instance;
      }
    })
    this.setState({
      typeContratSelection : t
    })
  }
  contratsGestionFormatter(cell,row){
    return (
      <div>
        <button type="button" className="btn btn-success btn-sm col-sm-4" onClick={()=>this.toggleModifierContratModal(row)}>Afficher/Modifier</button>
        <button type="button" className="btn btn-info btn-sm col-sm-4" onClick={()=>this.toggleScooterModal(row)}>Scooters</button>
        <button type="button" className="btn btn-danger btn-sm col-sm-4" disabled>Clore</button>
      </div>
    );
  }
  contratsAssocierFormatter(cell,row){
    if(cell){
      return(<button type="button" className="btn btn-danger btn-sm col" onClick = {()=>this.toggleAssocierContratModal(2,row)}>Dissocier</button>)
    }else {
      return(<button type="button" className="btn btn-success btn-sm col"onClick = {()=>this.toggleAssocierContratModal(1,row)}>Associer</button>)
    }
  }
  typeContratGestionFormatter(cell,row){
    return (
      <div>
        <button type="button" className="btn btn-success btn-sm col-sm-6" onClick={()=>this.toggleModifierTypeContratModal(row)}>Modifier</button>
        <button type="button" className="btn btn-danger btn-sm col-sm-6">Supprimer</button>
      </div>
    );
  }
  actifFormatter(cell,row){
    if(cell){
      return <button type="button" className="btn btn-success btn-sm col">Oui</button>
    }else {
      return <button type="button" className="btn btn-danger btn-sm col">Non</button>
    }
  }
  dateFormatter(cell, row) {
    let t = cell?new Date(cell).toISOString().split('T')[0]:null;
    return t;
  }
  euroFormatter(cell,row){
    return(
      cell+' €'
    )
  }
  dureeFormatter(cell,row){
    return(
      cell+' mois'
    )
  }
  contratsInsertButton = () => {
    return (
      <div>
        <button type="button" className="btn btn-info btn-md" onClick = {this.toggleInsertContratModal}>Ajouter un Nouveau Contrat</button>
        <Modal className="modal-info modal-lg" isOpen={this.state.isInsertContratModal} toggle={this.toggleInsertContratModal}>
          <ModalHeader toggle={this.toggleInsertContratModal}>Ajouter un Nouveau Contrat</ModalHeader>
          <ModalBody>
            <div>
              <div className="row">
                <div className="form-group col-sm-12">
                  <label htmlFor="id_client">N° Client</label>
                  <select className="form-control" id="id_client" placeholder="N° Client" defaultValue='selectionner un client' onChange={(e)=>this.handleSelectTypeContrat(e)}>
                    <option disabled value='selectionner un client'> -- selectionner un client -- </option>
                    {
                      this.state.clientsData.map((instance,index)=>{
                        return <option value={instance['id_client']}>{'ID: '+instance['id_client']+'\t'+instance['societe']}</option>
                      })
                    }
                  </select>
                </div>
                <div className="form-group col-sm-12">
                  <label htmlFor="id_type_contrat">Selectionner un Type de Contrat</label>
                  <select className="form-control" id="id_type_contrat" placeholder="Type de Contrat" defaultValue='selectionner un forfait' onChange={(e)=>this.handleSelectTypeContrat(e)}>
                    <option disabled value='selectionner un forfait'> -- selectionner un forfait -- </option>
                    {
                      this.state.typesContratsData.map((instance,index)=>{
                        return <option value={instance['id_type_contrat']}>{instance['nom']}</option>
                      })
                    }
                  </select>
                </div>
                <div className="form-group col-sm-12">
                  <label htmlFor="adresse_facturation">Address Facturation</label>
                  <input type="text" className="form-control" id="adresse_facturation" placeholder="Address Facturation"/>
                </div>
                <div className="form-group col-sm-12">
                  <label htmlFor="niveau_service">Niveau Service / KMs</label>
                  <input type="text" className="form-control" id="niveau_service" placeholder="Niveau Service" value={this.state.typeContratSelection['niveau_service']}/>
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="durée">Durée / Mois</label>
                  <input type="text" className="form-control" id="duree" placeholder="Durée" value={this.state.typeContratSelection['duree']}/>
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="tarifmensuel">Mensualité HT / €</label>
                  <input type="text" className="form-control" id="mensualite_ht" placeholder="Mensualité HT" value={this.state.typeContratSelection['mensualite_ht']}/>
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="assurance_rc">Tarif Assurance / €</label>
                  <input type="text" className="form-control" id="tarifassurance" placeholder="Tarif Assurance" value={this.state.typeContratSelection['tarifassurance']}/>
                </div>
                <div className="form-group col-sm-12">
                  <label htmlFor="datedebut">Date Début</label>
                  <input type="date" className="form-control" id="datedebut" placeholder="Date Début"/>
                </div>
                <div className="form-group col-sm-12">
                  <label htmlFor="annexe_scooter">Annexe Scooter</label>
                  <input type="text" className="form-control" id="annexe_scooter" placeholder="Annexe Scooter"/>
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="annexe_accessoires">Annexe Accessoires</label>
                  <input type="text" className="form-control" id="annexe_accessoires" placeholder="Annexe Accessoires"/>
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="annexe_batterie">Annexe Batterie</label>
                  <input type="text" className="form-control" id="annexe_batterie" placeholder="Annexe Batterie"/>
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="annexe_contrat">Annexe Contrat</label>
                  <input type="text" className="form-control" id="annexe_contrat" placeholder="Annexe Contrat"/>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-sm btn-success" onClick={this.addContratData}>Submit</button>
            <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleInsertContratModal}>Cancel</button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  typeContratsInsertButton = () => {
    return (
      <div>
        <button type="button" className="btn btn-info btn-md" onClick={this.toggleInsertTypeContratModal}>Ajouter un Nouveau TypeContrat</button>
        <Modal isOpen={this.state.isInsertTypeContratModal} toggle={this.toggleInsertTypeContratModal}>
          <ModalHeader toggle={this.toggleInsertTypeContratModal}>Ajouter un Nouveau TypeContrat</ModalHeader>
          <ModalBody>
            <div>
              <div className="row">
                <div className="form-group col-sm-12">
                  <label htmlFor="nom">Nom</label>
                  <input type="text" className="form-control" id="nom" placeholder="Nom"/>
                </div>
                <div className="form-group col-sm-12">
                  <label htmlFor="description">Description</label>
                  <input type="text" className="form-control" id="description" placeholder="Description"/>
                </div>
                <div className="form-group col-sm-12">
                  <label htmlFor="niveau_service">Niveau Service / KMs</label>
                  <input type="text" className="form-control" id="niveau_service" placeholder="Niveau Service"/>
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="durée">Durée / Mois</label>
                  <input type="text" className="form-control" id="duree" placeholder="Durée"/>
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="tarifmensuel">Mensualité HT / €</label>
                  <input type="text" className="form-control" id="mensualite_ht" placeholder="Mensualité HT"/>
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="assurance_rc">Tarif Assurance / €</label>
                  <input type="text" className="form-control" id="tarifassurance" placeholder="Tarif Assurance"/>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-sm btn-success" onClick={this.toggleInsertTypeContratModal}>Submit</button>
            <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleInsertTypeContratModal}>Cancel</button>
          </ModalFooter>
        </Modal>
      </div>

    );
  }
  createCustomToolBar = props => {
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
  render(){
    let cur = this;
    const optionsContrats = {
      insertBtn: cur.contratsInsertButton,
      toolBar: this.createCustomToolBar
    }
    const optionsTypeContrats = {
      insertBtn: cur.typeContratsInsertButton
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
                  Contrats
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}>
                  TypeContrat
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <div className="card">
                  <div className="card-header">
                    <i className="fa fa-align-justify"></i> Gestion des Contrats
                  </div>
                  <div className="card-block">
                    <BootstrapTable
                      options = {optionsContrats}
                      data={ this.state.contratsData }
                      headerStyle = { { "backgroundColor" : "#63c2de" } }
                      insertRow>
                      <TableHeaderColumn
                        dataField="id_contrat"
                        isKey
                        dataSort
                        width = "10%">
                        ID
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="id_client"
                        dataSort
                        width = "10%">
                        N° Client
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="societe"
                        dataSort
                        width = "15%">
                        Société
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="datedebut"
                        dataFormat = {this.dateFormatter}
                        dataSort>
                        Date Début
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="flotte"
                        dataSort
                        dataFormat = {this.contratsAssocierFormatter}
                        tdStyle={{textAlign : "center"}}>
                        Flotte
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="actif"
                        dataSort
                        dataFormat = {this.actifFormatter}
                        tdStyle={{textAlign : "center"}}>
                        Actif
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField=""
                        dataFormat={ this.contratsGestionFormatter }
                        tdStyle={{textAlign : "center"}}
                        width = "25%">
                        Gestion
                      </TableHeaderColumn>
                    </BootstrapTable>
                  </div>
                </div>
              </TabPane>
              <TabPane tabId="2"><div className="card">
                <div className="card-header">
                  <i className="fa fa-user"></i> Gestion des TypeContrats
                </div>
                <div className="card-block">
                  <BootstrapTable
                    options = {optionsTypeContrats}
                    data = { this.state.typesContratsData }
                    headerStyle = { { "backgroundColor" : "#63c2de" } }
                    insertRow>
                    <TableHeaderColumn
                      dataField="id_type_contrat"
                      isKey
                      dataSort
                      width = '5%'>
                      ID
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="nom"
                      dataSort
                      width = '20%'>
                      Nom
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="description"
                      dataSort
                      width = '20%'>
                      Description
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="niveau_service"
                      dataSort
                      width = '10%'>
                      Niveau Service
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="mensualite_ht"
                      dataSort
                      dataFormat = {this.euroFormatter}
                      width = '10%'>
                      Mensualité HT
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="tarifassurance"
                      dataSort
                      dataFormat = {this.euroFormatter}
                      width = '10%'>
                      Tarif Assurance
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="duree"
                      dataSort
                      dataFormat = {this.dureeFormatter}
                      width = '10%'>
                      Durée
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField=""
                      dataSort
                      dataFormat={ this.typeContratGestionFormatter }>
                      Gestion
                    </TableHeaderColumn>
                  </BootstrapTable>
                </div>
              </div>

              </TabPane>
            </TabContent>

          </div>
        </div>
        {
          this.state.isModifierContratModal?
          <Modal isOpen={this.state.isModifierContratModal} toggle={this.toggleModifierContratModal}>
            <ModalHeader toggle={this.toggleModifierContratModal}>Modifier un Contrat</ModalHeader>
            <ModalBody>
              <div>
                <div className="row">
                  <div className="form-group col-sm-12">
                    <label htmlFor="id_client">N° Client</label>
                    <select className="form-control" id="id_client" placeholder="N° Client" defaultValue={this.state.contratConcerne['id_client']} onChange={(e)=>this.handleSelectTypeContrat(e)}>
                      <option disabled value='selectionner un client'> -- selectionner un client -- </option>
                      {
                        this.state.clientsData.map((instance,index)=>{
                          return <option value={instance['id_client']}>{'ID: '+instance['id_client']+'\t'+instance['societe']}</option>
                        })
                      }
                    </select>
                  </div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="id_type_contrat">Selectionner un Type de Contrat</label>
                    <select className="form-control" id="id_type_contrat" placeholder="Type de Contrat" defaultValue={this.state.contratConcerne['id_type_contrat']} onChange={(e)=>this.handleSelectTypeContrat(e)}>
                      <option disabled value='selectionner un forfait'> -- selectionner un forfait -- </option>
                      {
                        this.state.typesContratsData.map((instance,index)=>{
                          return <option value={instance['id_type_contrat']}>{instance['nom']}</option>
                        })
                      }
                    </select>
                  </div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="adresse_facturation">Address Facturation</label>
                    <input type="text" className="form-control" id="adresse_facturation" placeholder="Address Facturation" defaultValue ={this.state.contratConcerne['adresse_facturation']}/>
                  </div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="niveau_service">Niveau Service</label>
                    <input type="text" className="form-control" id="niveau_service" placeholder="Niveau Service" defaultValue ={this.state.contratConcerne['niveau_service']} value={this.state.typeContratSelection['niveau_service']}/>
                  </div>
                  <div className="form-group col-sm-4">
                    <label htmlFor="durée">Durée / Mois</label>
                    <input type="text" className="form-control" id="duree" placeholder="Durée" defaultValue ={this.state.contratConcerne['duree']} value={this.state.typeContratSelection['duree']}/>
                  </div>
                  <div className="form-group col-sm-4">
                    <label htmlFor="tarifmensuel">Mensualité HT / €</label>
                    <input type="text" className="form-control" id="mensualite_ht" placeholder="Mensualité HT" defaultValue ={this.state.contratConcerne['mensualite_ht']} value={this.state.typeContratSelection['mensualite_ht']}/>
                  </div>
                  <div className="form-group col-sm-4">
                    <label htmlFor="assurance_rc">Tarif Assurance / €</label>
                    <input type="text" className="form-control" id="tarifassurance" placeholder="Tarif Assurance" defaultValue ={this.state.contratConcerne['tarifassurance']} value={this.state.typeContratSelection['tarifassurance']}/>
                  </div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="datedebut">Date Début</label>
                    <input type="date" className="form-control" id="datedebut" placeholder="Date Début" defaultValue ={this.dateFormatter(this.state.contratConcerne['datedebut'])}/>
                  </div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="annexe_scooter">Annexe Scooter</label>
                    <input type="text" className="form-control" id="annexe_scooter" placeholder="Annexe Scooter"/>
                  </div>
                  <div className="form-group col-sm-4">
                    <label htmlFor="annexe_accessoires">Annexe Accessoires</label>
                    <input type="text" className="form-control" id="annexe_accessoires" placeholder="Annexe Accessoires"/>
                  </div>
                  <div className="form-group col-sm-4">
                    <label htmlFor="annexe_batterie">Annexe Batterie</label>
                    <input type="text" className="form-control" id="annexe_batterie" placeholder="Annexe Batterie"/>
                  </div>
                  <div className="form-group col-sm-4">
                    <label htmlFor="annexe_contrat">Annexe Contrat</label>
                    <input type="text" className="form-control" id="annexe_contrat" placeholder="Annexe Contrat"/>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <button type="button" className="btn btn-sm btn-success" onClick={this.modifierContratData}>Submit</button>
              <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleModifierContratModal}>Cancel</button>
            </ModalFooter>
          </Modal>:null
        }
        {
          this.state.isModifierTypeContratModal?
          <Modal isOpen={this.state.isModifierTypeContratModal} toggle={this.toggleModifierTypeContratModal}>
            <ModalHeader toggle={this.toggleModifierTypeContratModal}>Modifier un TypeContrat</ModalHeader>
            <ModalBody>
              <div>
                <div className="row">
                  <div className="form-group col-sm-6">
                    <label htmlFor="id_type_contrat">Contrat ID</label>
                    <input type="text" className="form-control" id="id_type_contrat" placeholder="Contrat Type ID" defaultValue={this.state.typeContratConcerne["id_type_contrat"]}/>
                  </div>
                  <div className="form-group col-sm-6">
                    <label htmlFor="nom">Nom</label>
                    <input type="text" className="form-control" id="nom" placeholder="Nom" defaultValue={this.state.typeContratConcerne["nom"]}/>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-sm-12">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" id="description" placeholder="Description" defaultValue={this.state.typeContratConcerne["description"]}/>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="niveau_service">Niveau Service / KMs</label>
                  <input type="text" className="form-control" id="niveau_service" placeholder="Niveau Service" defaultValue={this.state.typeContratConcerne["niveau_service"]}/>
                </div>
                <div className="row">
                  <div className="form-group col-sm-4">
                    <label htmlFor="durée">Durée / Mois</label>
                    <input type="text" className="form-control" id="duree" placeholder="Durée" defaultValue={this.state.typeContratConcerne["duree"]}/>
                  </div>
                  <div className="form-group col-sm-4">
                    <label htmlFor="tarifmensuel">Mensualité HT / €</label>
                    <input type="text" className="form-control" id="mensualite_ht" placeholder="Mensualité" defaultValue={this.state.typeContratConcerne["mensualite_ht"]}/>
                  </div>
                  <div className="form-group col-sm-4">
                    <label htmlFor="assurance_rc">Assurance / €</label>
                    <input type="text" className="form-control" id="tarifassurance" placeholder="Assurance" defaultValue={this.state.typeContratConcerne["tarifassurance"]}/>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <button type="button" className="btn btn-sm btn-success" onClick={this.toggleModifierTypeContratModal}>Submit</button>
              <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleModifierTypeContratModal}>Cancel</button>
            </ModalFooter>
          </Modal>:null
        }
        {
          this.state.isAssocierContratModal?<Modal isOpen={this.state.isAssocierContratModal} toggle={this.toggleAssocierContratModal}>
            <ModalHeader toggle={this.toggleAssocierContratModal}>{this.state.typeAssocierContratModal===1?"Associer un Contrat":"Dissocier un Contrat"}</ModalHeader>
            <ModalBody>
              {this.state.typeAssocierContratModal===1?
                <div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="id_contrat">Contrat ID</label>
                    <input type="input" className="form-control" id="id_contrat" placeholder="Contrat ID" defaultValue={this.state.contratConcerne["id_contrat"]} disabled/>
                  </div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="id_flotte">Flotte ID</label>
                    <input type="input" className="form-control" id="id_flotte" placeholder="Flotte ID"/>
                  </div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="address">Adresse de facturation</label>
                    <input type="input" className="form-control" id="address" placeholder="Adresse de facturation"/>
                  </div>
                </div>
                :
                <div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="id_contrat">Contrat ID</label>
                    <input type="input" className="form-control" id="id_contrat" placeholder="Contrat ID" defaultValue={this.state.contratConcerne["id_contrat"]} disabled/>
                  </div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="id_flotte">Flotte ID</label>
                    <input type="input" className="form-control" id="id_flotte" placeholder="Flotte ID" defaultValue={this.state.contratConcerne["id_flotte"]} disabled/>
                  </div>
                  <div className="form-group col-sm-4">
                    <label htmlFor="mention">Mention</label>
                    <input type="text" className="form-control" id="mention" placeholder="Mention"/>
                  </div>
                </div>
              }
            </ModalBody>
            <ModalFooter>
              <button type="button" className="btn btn-sm btn-success" onClick={this.toggleAssocierContratModal}>Submit</button>
              <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleAssocierContratModal}>Cancel</button>
            </ModalFooter>
          </Modal>:null
        }
        {
          this.state.isScooterModalModal?
          <Modal className='modal-lg modal-info' isOpen={this.state.isScooterModalModal} toggle={this.toggleScooterModal}>
            <ModalHeader toggle={this.toggleScooterModal}>Afficher l&#39;ensemble des Contrats</ModalHeader>
            <ModalBody>
              <div className="col-12">
                <div className="card">
                  <div className="card-block p-3 clearfix">
                    <div className="float-right mx-3  mb-0 mt-2">
                      <strong className="text-warning">Maintenance</strong>
                      <div className="text-muted text-uppercase font-weight-bold font-xs">Revision</div>
                    </div>
                    <div className="float-right mx-3  mb-0 mt-2">
                      <strong className="text-success">15.4 V</strong>
                      <div className="text-muted text-uppercase font-weight-bold font-xs">Batterie</div>
                    </div>
                    <div className="float-right mx-3  mb-0 mt-2">
                      <strong className="text-info">100 KM</strong>
                      <div className="text-muted text-uppercase font-weight-bold font-xs">parcours</div>
                    </div>
                    <div className="float-right mx-3 mb-0 mt-2">
                      <strong className="text-info">Conducteur 1</strong>
                      <div className="text-muted text-uppercase font-weight-bold font-xs">Conducteur</div>
                    </div>
                    <div className="float-right mx-3  mb-0 mt-2">
                      <strong className="text-success">Oui</strong>
                      <div className="text-muted text-uppercase font-weight-bold font-xs">Actif</div>
                    </div>
                    <i className="fa fa-motorcycle bg-primary p-3 font-2xl mr-3 float-left"></i>
                    <div className="h5 text-info mb-0 mt-2">Scooter 1</div>
                    <div className="text-muted text-uppercase font-weight-bold font-xs">Scooter</div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="card">
                  <div className="card-block p-3 clearfix">
                    <div className="float-right mx-3  mb-0 mt-2">
                      <strong className="text-info">2017-08-02</strong>
                      <div className="text-muted text-uppercase font-weight-bold font-xs">Revision</div>
                    </div>
                    <div className="float-right mx-3  mb-0 mt-2">
                      <strong className="text-warning">10.4 V</strong>
                      <div className="text-muted text-uppercase font-weight-bold font-xs">Batterie</div>
                    </div>
                    <div className="float-right mx-3  mb-0 mt-2">
                      <strong className="text-info">100 KM</strong>
                      <div className="text-muted text-uppercase font-weight-bold font-xs">parcours</div>
                    </div>
                    <div className="float-right mx-3 mb-0 mt-2">
                      <strong className="text-info">Conducteur 1</strong>
                      <div className="text-muted text-uppercase font-weight-bold font-xs">Conducteur</div>
                    </div>
                    <div className="float-right mx-3  mb-0 mt-2">
                      <strong className="text-danger">Non</strong>
                      <div className="text-muted text-uppercase font-weight-bold font-xs">Actif</div>
                    </div>
                    <i className="fa fa-motorcycle bg-primary p-3 font-2xl mr-3 float-left"></i>
                    <div className="h5 text-info mb-0 mt-2">Scooter 2</div>
                    <div className="text-muted text-uppercase font-weight-bold font-xs">Scooter</div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="card">
                  <div className="card-block p-3 clearfix">
                    <div className="float-right mx-3  mb-0 mt-2">
                      <strong className="text-info">2017-08-02</strong>
                      <div className="text-muted text-uppercase font-weight-bold font-xs">Revision</div>
                    </div>
                    <div className="float-right mx-3  mb-0 mt-2">
                      <strong className="text-danger">5.4 V</strong>
                      <div className="text-muted text-uppercase font-weight-bold font-xs">Batterie</div>
                    </div>
                    <div className="float-right mx-3  mb-0 mt-2">
                      <strong className="text-info">100 KM</strong>
                      <div className="text-muted text-uppercase font-weight-bold font-xs">parcours</div>
                    </div>
                    <div className="float-right mx-3 mb-0 mt-2">
                      <strong className="text-info">Conducteur 1</strong>
                      <div className="text-muted text-uppercase font-weight-bold font-xs">Conducteur</div>
                    </div>
                    <div className="float-right mx-3  mb-0 mt-2">
                      <strong className="text-success">Oui</strong>
                      <div className="text-muted text-uppercase font-weight-bold font-xs">Actif</div>
                    </div>
                    <i className="fa fa-motorcycle bg-primary p-3 font-2xl mr-3 float-left"></i>
                    <div className="h5 text-info mb-0 mt-2">Scooter 3</div>
                    <div className="text-muted text-uppercase font-weight-bold font-xs">Scooter</div>

                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <button type="button" className="btn btn-sm btn-primary" onClick={this.toggleScooterModal}>Close</button>
            </ModalFooter>
          </Modal>:null
        }
      </div>
    );
  }
}
/*


*/
