import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import classnames from 'classnames';
import mysql from 'mysql2/promise';
import urls from '../configs/serverConfigurations';
const type_data = [{
  "id_type_alerte":"1",
  "nom":"Alerte_1",
  "description" : "Template_1",
  "niveau_service" : "1",
  "durée" : 12,
  "tarifmensuel" : 500,
  "assurance_rc" : "Allianz"
}];
const alerte_data=[{
  "id_alerte" : 1,
  "niveau_assurance": 1,
  "address" : "Denfert Rochereau",
  "datedebut" : "2017-08-03",
  "annexe_batterie" : "1",
  "annexe_alerte" : "1",
  "annexe_accessoires" : "1",
  "annexe_scooter" : "1",
  "actif" : true
}];

const urlAlertes = urls.alertes;
const urlTypesAlertes = urls.types_alertes;
const traccarServer = "http://vps92599.ovh.net:8082/api/";
const traccarGroup = traccarServer + "groups";
export default class GestionDesAlertes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      isInsertAlerteModal : false,
      isInsertAlerteSuccess : true,
      isInsertTypeAlerteModal : false,
      isInsertTypeAlerteSuccess : true,
      isModifierAlerteModal : false,
      isModifierAlerteSuccess : true,
      alerteConcerne : null,
      typeAlerteConcerne : null,
      isModifierTypeAlerteModal : false,
      isModifierTypeAlerteSuccess : true,
      isAssocierAlerteModal : false,
      typeAssocierAlerteModal : 1,
      typeAlerteConcerne : null,
      alertesData : [],
      groupsData : [],
      typesAlertesData : [],
      typeAlerteSelection : {}
    }
    this.toggle = this.toggle.bind(this);
    this.toggleInsertAlerteModal = this.toggleInsertAlerteModal.bind(this);
    this.toggleInsertTypeAlerteModal = this.toggleInsertTypeAlerteModal.bind(this);
    this.toggleModifierAlerteModal = this.toggleModifierAlerteModal.bind(this);
    this.toggleModifierTypeAlerteModal = this.toggleModifierTypeAlerteModal.bind(this);
    this.toggleAssocierAlerteModal = this.toggleAssocierAlerteModal.bind(this);
    this.alertesGestionFormatter = this.alertesGestionFormatter.bind(this);
    this.alertesAssocierFormatter = this.alertesAssocierFormatter.bind(this);
    this.typeAlerteGestionFormatter = this.typeAlerteGestionFormatter.bind(this);
    this.alertesGroupFormatter = this.alertesGroupFormatter.bind(this);
    this.alertesNameFormatter = this.alertesNameFormatter.bind(this);
    this.handleSelectTypeAlerte = this.handleSelectTypeAlerte.bind(this);
    this.alertesInsertButton = this.alertesInsertButton.bind(this);
    this.addAlerteData = this.addAlerteData.bind(this);
    this.addTypeAlerteData = this.addTypeAlerteData.bind(this);
    this.modifierAlerteData = this.modifierAlerteData.bind(this);
    this.modifierTypeAlerteData = this.modifierTypeAlerteData.bind(this);
  }
  componentDidMount(){
    this.getData();
  }
  getData(){
    fetch(urlAlertes)
    .then((response) => response.json())
    .then((responseJson)=>{
      this.setState({
        alertesData : responseJson
      })
    })
    .catch((error) => {
      console.error(error);
    });
    fetch(urlTypesAlertes)
    .then((response) => response.json())
    .then((responseJson)=>{
      this.setState({
        typesAlertesData : responseJson
      })
    })
    .catch((error) => {
      console.error(error);
    });
    fetch(traccarGroup,{credentials: 'include'})
    .then((response) => response.json())
    .then((responseJson)=>{
      this.setState({
        groupsData : responseJson
      })
    })
    .catch((error) => {
      console.error(error);
    });
  }
  addAlerteData(){
    const queryMethod = "POST";
    let data = {};
    data['id_type_alerte']=document.getElementById("id_type_alerte").value?document.getElementById("id_type_alerte").value:null
    data['id_group']=document.getElementById("id_group").value?document.getElementById("id_group").value:null
    fetch(urlAlertes,{
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
            isInsertAlerteSuccess : false
          })
        }else {
          fetch(urlAlertes)
          .then((response) => response.json())
          .then((responseJson)=>{
            this.setState({
              alertesData : responseJson,
              isInsertAlerteModal : !this.state.isInsertAlerteModal
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
  addTypeAlerteData(){
    const queryMethod = "POST";
    let data = {};
    data['nom']=document.getElementById("nom").value?document.getElementById("nom").value:null
    data['parameter1']=document.getElementById("parameter1").value?document.getElementById("parameter1").value:null
    data['parameter2']=document.getElementById("parameter2").value?document.getElementById("parameter2").value:null
    fetch(urlAlertes,{
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
            isInsertTypeAlerteSuccess : false
          })
        }else {
          fetch(urlTypesAlertes)
          .then((response) => response.json())
          .then((responseJson)=>{
            this.setState({
              typesAlertesData : responseJson,
              isInsertTypeAlerteModal : !this.state.isInsertTypeAlerteModal
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
  modifierAlerteData(){
    const queryMethod = "PUT";
    let data = {};
    data["id_alerte"] = this.state.alerteConcerne["id_alerte"];
    data['id_type_alerte']=document.getElementById("id_type_alerte").value?document.getElementById("id_type_alerte").value:null
    data['id_group']=document.getElementById("id_group").value?document.getElementById("id_group").value:null
    fetch(urlAlertes,{
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
            isModifierAlerteSuccess : false
          })
        }else {
          fetch(urlAlertes)
          .then((response) => response.json())
          .then((responseJson)=>{
            this.setState({
              alertesData : responseJson,
              isModifierAlerteModal : !this.state.isModifierAlerteModal
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
  modifierTypeAlerteData(){
    const queryMethod = "PUT";
    let data = {};
    data["id_type_alerte"] = this.state.typeAlerteConcerne["id_type_alerte"];
    data['nom']=document.getElementById("nom").value?document.getElementById("nom").value:null
    data['parameter1']=document.getElementById("parameter1").value?document.getElementById("parameter1").value:null
    data['parameter2']=document.getElementById("parameter2").value?document.getElementById("parameter2").value:null
    fetch(urlTypesAlertes,{
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
            isModifierTypeAlerteSuccess : false
          })
        }else {
          fetch(urlTypesAlertes)
          .then((response) => response.json())
          .then((responseJson)=>{
            this.setState({
              typesAlertesData : responseJson,
              isModifierTypeAlerteModal : !this.state.isModifierTypeAlerteModal
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
  toggleModifierAlerteModal(data){
    this.setState({
      isModifierAlerteModal : !this.state.isModifierAlerteModal,
      alerteConcerne : data
    });
  }
  toggleModifierTypeAlerteModal(data){
    this.setState({
      isModifierTypeAlerteModal : !this.state.isModifierTypeAlerteModal,
      typeAlerteConcerne : data
    });
  }
  toggleInsertAlerteModal(){
    fetch(traccarGroup,{credentials: 'include'})
    .then((response) => response.json())
    .then((responseJson)=>{
      this.setState({
        groupsData : responseJson
      })
    })
    .catch((error) => {
      console.error(error);
    });
    this.setState({
      isInsertAlerteModal : !this.state.isInsertAlerteModal
    });
  }
  toggleInsertTypeAlerteModal(){
    this.setState({
      isInsertTypeAlerteModal : !this.state.isInsertTypeAlerteModal
    });
  }
  toggleAssocierAlerteModal(type,data){
    this.setState({
      isAssocierAlerteModal : !this.state.isAssocierAlerteModal,
      typeAssocierAlerteModal : type,
      alerteConcerne : data
    });
  }
  handleSelectTypeAlerte(e){
    let t={};
    this.state.typesAlertesData.map((instance,index)=>{
      if(instance['id_type_alerte']===parseInt(e.target.value)){
        t = instance;
      }
    })
    this.setState({
      typeAlerteSelection : t
    })
  }
  alertesGestionFormatter(cell,row){
    return (
      <div>
        <button type="button" className="btn btn-success btn-sm col-sm-6" onClick={()=>this.toggleModifierAlerteModal(row)}>Afficher/Modifier</button>
        <button type="button" className="btn btn-danger btn-sm col-sm-6" disabled>Supprimer</button>
      </div>
    );
  }
  alertesAssocierFormatter(cell,row){
    if(cell){
      return(<button type="button" className="btn btn-danger btn-sm col" onClick = {()=>this.toggleAssocierAlerteModal(2,row)}>Dissocier</button>)
    }else {
      return(<button type="button" className="btn btn-success btn-sm col"onClick = {()=>this.toggleAssocierAlerteModal(1,row)}>Associer</button>)
    }
  }
  typeAlerteGestionFormatter(cell,row){
    return (
      <div>
        <button type="button" className="btn btn-success btn-sm col-sm-6" onClick={()=>this.toggleModifierTypeAlerteModal(row)}>Modifier</button>
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
  alertesGroupFormatter(cell,row){
    let name;
    this.state.groupsData.map((instance)=>{
      if(cell===instance['id']){
        name = instance['name'];
      }
    });
    return name;
  }
  alertesNameFormatter(cell,row){
    let name;
    this.state.typesAlertesData.map((instance)=>{
      if(cell===instance['id_type_alerte']){
        name =  instance['nom'];
      }
    });
    return name;
  }
  alertesInsertButton = () => {
    return (
      <div>
        <button type="button" className="btn btn-info btn-md" onClick = {this.toggleInsertAlerteModal}>Ajouter un Nouveau Alerte</button>
        <Modal className="modal-info modal-lg" isOpen={this.state.isInsertAlerteModal} toggle={this.toggleInsertAlerteModal}>
          <ModalHeader toggle={this.toggleInsertAlerteModal}>Ajouter un Nouveau Alerte</ModalHeader>
          <ModalBody>
            <div>
              <div className="row">
                <div className="form-group col-sm-12">
                  <label htmlFor="id">N° Group</label>
                  <select className="form-control" id="id_group" placeholder="N° Group" defaultValue='selectionner un group' onChange={(e)=>this.handleSelectTypeAlerte(e)}>
                    <option disabled value='selectionner un group'> -- selectionner un group -- </option>
                    {
                      this.state.groupsData.map((instance,index)=>{
                        return <option value={instance['id']}>{'Group ID: '+instance['id']+'\tName: '+instance['name']}</option>
                      })
                    }
                  </select>
                </div>
                <div className="form-group col-sm-12">
                  <label htmlFor="id_type_alerte">Selectionner un Type de Alerte</label>
                  <select className="form-control" id="id_type_alerte" placeholder="Type de Alerte" defaultValue='selectionner un type de alerte' onChange={(e)=>this.handleSelectTypeAlerte(e)}>
                    <option disabled value='selectionner un type de alerte'> -- selectionner un type de alerte -- </option>
                    {
                      this.state.typesAlertesData.map((instance,index)=>{
                        return <option value={instance['id_type_alerte']}>{instance['nom']}</option>
                      })
                    }
                  </select>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-sm btn-success" onClick={this.addAlerteData}>Submit</button>
            <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleInsertAlerteModal}>Cancel</button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  typeAlertesInsertButton = () => {
    return (
      <div>
        <button type="button" className="btn btn-info btn-md" onClick={this.toggleInsertTypeAlerteModal}>Ajouter un Nouveau TypeAlerte</button>
        <Modal isOpen={this.state.isInsertTypeAlerteModal} toggle={this.toggleInsertTypeAlerteModal}>
          <ModalHeader toggle={this.toggleInsertTypeAlerteModal}>Ajouter un Nouveau Type Alerte</ModalHeader>
          <ModalBody>
            <div>
              <div className="row">
                <div className="form-group col-sm-12">
                  <label htmlFor="nom">Nom</label>
                  <input type="text" className="form-control" id="nom" placeholder="Nom"/>
                </div>
                <div className="form-group col-sm-12">
                  <label htmlFor="durée">Parameter 1</label>
                  <input type="text" className="form-control" id="parameter1" placeholder="Parameter 1"/>
                </div>
                <div className="form-group col-sm-12">
                  <label htmlFor="tarifmensuel">Parameter 2</label>
                  <input type="text" className="form-control" id="parameter2" placeholder="Parameter 2"/>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-sm btn-success" onClick={this.addTypeAlerteData}>Submit</button>
            <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleInsertTypeAlerteModal}>Cancel</button>
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
    const optionsAlertes = {
      insertBtn: cur.alertesInsertButton,
      toolBar: this.createCustomToolBar,
      sizePerPageDropDown: this.renderSizePerPageDropDown,
      sizePerPage: 5
    }
    const optionsTypeAlertes = {
      insertBtn: cur.typeAlertesInsertButton
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
                  Alertes
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}>
                  TypeAlerte
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <div className="card">
                  <div className="card-header">
                    <i className="fa fa-align-justify"></i> Gestion des Alertes
                  </div>
                  <div className="card-block">
                    <BootstrapTable
                      options = {optionsAlertes}
                      data={ this.state.alertesData }
                      headerStyle = { { "backgroundColor" : "#63c2de" } }
                      insertRow
                      pagination>
                      <TableHeaderColumn
                        dataField="id_alerte"
                        isKey
                        dataSort
                        width = "10%">
                        ID
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="id_group"
                        dataSort
                        width = "10%"
                        dataFormat={ this.alertesGroupFormatter }>
                        Group
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="id_type_alerte"
                        dataSort
                        width = "30%"
                        dataFormat={ this.alertesNameFormatter }>
                        Type Alerte
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField=""
                        dataFormat={ this.alertesGestionFormatter }
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
                  <i className="fa fa-user"></i> Gestion des TypeAlertes
                </div>
                <div className="card-block">
                  <BootstrapTable
                    options = {optionsTypeAlertes}
                    data = { this.state.typesAlertesData }
                    headerStyle = { { "backgroundColor" : "#63c2de" } }
                    insertRow>
                    <TableHeaderColumn
                      dataField="id_type_alerte"
                      isKey
                      dataSort
                      width = '5%'>
                      ID
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="nom"
                      dataSort
                      width = '30%'>
                      Nom
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="parameter1"
                      dataSort
                      width = '20%'>
                      Parameter 1
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="parameter2"
                      dataSort
                      width = '20%'>
                      Parameter 2
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField=""
                      dataSort
                      dataFormat={ this.typeAlerteGestionFormatter }>
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
          this.state.isModifierAlerteModal?
          <Modal isOpen={this.state.isModifierAlerteModal} toggle={this.toggleModifierAlerteModal}>
            <ModalHeader toggle={this.toggleModifierAlerteModal}>Modifier un Alerte</ModalHeader>
            <ModalBody>
              <div>
                <div className="row">
                  <div className="form-group col-sm-12">
                    <label htmlFor="id">N° Group</label>
                    <select className="form-control" id="id_group" placeholder="N° Group" defaultValue={this.state.alerteConcerne['id_alerte']} onChange={(e)=>this.handleSelectTypeAlerte(e)}>
                      <option disabled value='selectionner un group'> -- selectionner un group -- </option>
                      {
                        this.state.groupsData.map((instance,index)=>{
                          return <option value={instance['id']}>{'Group ID: '+instance['id']+'\tName'+instance['societe']}</option>
                        })
                      }
                    </select>
                  </div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="id_type_alerte">Selectionner un Type de Alerte</label>
                    <select className="form-control" id="id_type_alerte" placeholder="Type de Alerte" defaultValue={this.state.alerteConcerne['id_type_alerte']} onChange={(e)=>this.handleSelectTypeAlerte(e)}>
                      <option disabled value='selectionner un type de alerte'> -- selectionner un type de alerte -- </option>
                      {
                        this.state.typesAlertesData.map((instance,index)=>{
                          return <option value={instance['id_type_alerte']}>{instance['nom']}</option>
                        })
                      }
                    </select>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <button type="button" className="btn btn-sm btn-success" onClick={this.modifierAlerteData}>Submit</button>
              <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleModifierAlerteModal}>Cancel</button>
            </ModalFooter>
          </Modal>:null
        }
        {
          this.state.isModifierTypeAlerteModal?
          <Modal isOpen={this.state.isModifierTypeAlerteModal} toggle={this.toggleModifierTypeAlerteModal}>
            <ModalHeader toggle={this.toggleModifierTypeAlerteModal}>Modifier un TypeAlerte</ModalHeader>
            <ModalBody>
              <div>
                <div className="row">
                  <div className="form-group col-sm-12">
                    <label htmlFor="id_type_alerte">Alerte ID</label>
                    <input type="text" className="form-control" disabled id="id_type_alerte" placeholder="Alerte Type ID" defaultValue={this.state.typeAlerteConcerne["id_type_alerte"]}/>
                  </div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="nom">Nom</label>
                    <input type="text" className="form-control" id="nom" placeholder="Nom" defaultValue={this.state.typeAlerteConcerne["nom"]}/>
                  </div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="durée">Parameter 1</label>
                    <input type="text" className="form-control" id="parameter1" placeholder="Parameter 1" defaultValue={this.state.typeAlerteConcerne["parameter1"]}/>
                  </div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="tarifmensuel">Parameter 2</label>
                    <input type="text" className="form-control" id="parameter2" placeholder="Parameter 2" defaultValue={this.state.typeAlerteConcerne["parameter2"]}/>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <button type="button" className="btn btn-sm btn-success" onClick={this.modifierTypeAlerteData}>Submit</button>
              <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleModifierTypeAlerteModal}>Cancel</button>
            </ModalFooter>
          </Modal>:null
        }
        {
          this.state.isAssocierAlerteModal?<Modal isOpen={this.state.isAssocierAlerteModal} toggle={this.toggleAssocierAlerteModal}>
            <ModalHeader toggle={this.toggleAssocierAlerteModal}>{this.state.typeAssocierAlerteModal===1?"Associer un Alerte":"Dissocier un Alerte"}</ModalHeader>
            <ModalBody>
              {this.state.typeAssocierAlerteModal===1?
                <div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="id_alerte">Alerte ID</label>
                    <input type="input" className="form-control" id="id_alerte" placeholder="Alerte ID" defaultValue={this.state.alerteConcerne["id_alerte"]} disabled/>
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
                    <label htmlFor="id_alerte">Alerte ID</label>
                    <input type="input" className="form-control" id="id_alerte" placeholder="Alerte ID" defaultValue={this.state.alerteConcerne["id_alerte"]} disabled/>
                  </div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="id_flotte">Flotte ID</label>
                    <input type="input" className="form-control" id="id_flotte" placeholder="Flotte ID" defaultValue={this.state.alerteConcerne["id_flotte"]} disabled/>
                  </div>
                  <div className="form-group col-sm-4">
                    <label htmlFor="mention">Mention</label>
                    <input type="text" className="form-control" id="mention" placeholder="Mention"/>
                  </div>
                </div>
              }
            </ModalBody>
            <ModalFooter>
              <button type="button" className="btn btn-sm btn-success" onClick={this.toggleAssocierAlerteModal}>Submit</button>
              <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleAssocierAlerteModal}>Cancel</button>
            </ModalFooter>
          </Modal>:null
        }

      </div>
    );
  }
}
/*


*/
