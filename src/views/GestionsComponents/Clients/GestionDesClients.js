import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import classnames from 'classnames';
import mysql from 'mysql2/promise';
import urls from '../configs/serverConfigurations';
const type_data = [{
  "id_type_client":"1",
  "nom":"Client_1",
  "description" : "Template_1",
  "niveau_service" : "1",
  "durée" : 12,
  "tarifmensuel" : 500,
  "assurance_rc" : "Allianz"
}];
const client_data=[{
  "id_client" : 1,
  "niveau_assurance": 1,
  "address" : "Denfert Rochereau",
  "datedebut" : "2017-08-03",
  "annexe_batterie" : "1",
  "annexe_client" : "1",
  "annexe_accessoires" : "1",
  "annexe_scooter" : "1",
  "actif" : true
}];

const urlClients = urls.clients;
export default class GestionDesClients extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      isInsertClientModal : false,
      isInsertClientSuccess : true,
      isModifierClientModal : false,
      isModifierClientSuccess : true,
      clientConcerne : null,
      clientsData : [],
    }
    this.toggle = this.toggle.bind(this);
    this.toggleInsertClientModal = this.toggleInsertClientModal.bind(this);
    this.toggleModifierClientModal = this.toggleModifierClientModal.bind(this);
    this.clientsGestionFormatter = this.clientsGestionFormatter.bind(this);
    this.clientsInsertButton = this.clientsInsertButton.bind(this);
    this.addClientData = this.addClientData.bind(this);
    this.modifierClientData = this.modifierClientData.bind(this);
  }
  componentDidMount(){
    this.getData();
  }
  getData(){
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
  addClientData(){
    const queryMethod = "POST";
    let data = {};
    data['societe']=document.getElementById("societe").value?document.getElementById("societe").value:null
    data['siret']=document.getElementById("siret").value?document.getElementById("siret").value:null
    data['referent']=document.getElementById("referent").value?document.getElementById("referent").value:null
    data['adresse']=document.getElementById("adresse").value?document.getElementById("adresse").value:null
    data['cp']=document.getElementById("cp").value?document.getElementById("cp").value:null
    data['ville']=document.getElementById("ville").value?document.getElementById("ville").value:null
    data['email']=document.getElementById("email").value?document.getElementById("email").value:null
    data['telfixe']=document.getElementById("telfixe").value?document.getElementById("telfixe").value:null
    data['portable']=document.getElementById("portable").value?document.getElementById("portable").value:null
    fetch(urlClients,{
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
            isInsertClientSuccess : false
          })
        }else {
          fetch(urlClients)
          .then((response) => response.json())
          .then((responseJson)=>{
            this.setState({
              clientsData : responseJson,
              isInsertClientModal : !this.state.isInsertClientModal
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
  modifierClientData(){
    const queryMethod = "PUT";
    let data = {};
    data["id_client"] = this.state.clientConcerne["id_client"];
    data['societe']=document.getElementById("societe").value?document.getElementById("societe").value:null
    data['siret']=document.getElementById("siret").value?document.getElementById("siret").value:null
    data['referent']=document.getElementById("referent").value?document.getElementById("referent").value:null
    data['adresse']=document.getElementById("adresse").value?document.getElementById("adresse").value:null
    data['cp']=document.getElementById("cp").value?document.getElementById("cp").value:null
    data['ville']=document.getElementById("ville").value?document.getElementById("ville").value:null
    data['email']=document.getElementById("email").value?document.getElementById("email").value:null
    data['telfixe']=document.getElementById("telfixe").value?document.getElementById("telfixe").value:null
    data['portable']=document.getElementById("portable").value?document.getElementById("portable").value:null
    fetch(urlClients,{
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
            isModifierClientSuccess : false
          })
        }else {
          fetch(urlClients)
          .then((response) => response.json())
          .then((responseJson)=>{
            this.setState({
              clientsData : responseJson,
              isModifierClientModal : !this.state.isModifierClientModal
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
  toggleModifierClientModal(data){
    this.setState({
      isModifierClientModal : !this.state.isModifierClientModal,
      clientConcerne : data
    });
  }
  toggleInsertClientModal(){
    this.setState({
      isInsertClientModal : !this.state.isInsertClientModal
    });
  }
  clientsGestionFormatter(cell,row){
    return (
      <div>
        <button type="button" className="btn btn-success btn-sm col-sm-4" onClick={()=>this.toggleModifierClientModal(row)}>Afficher/Modifier</button>
        <button type="button" className="btn btn-info btn-sm col-sm-4" disabled>Tableau de Bord</button>
        <button type="button" className="btn btn-danger btn-sm col-sm-4" disabled>Clore</button>
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
  clientsInsertButton = () => {
    return (
      <div>
        <button type="button" className="btn btn-info btn-md" onClick = {this.toggleInsertClientModal}>Ajouter un Nouveau Client</button>
        <Modal className="modal-info modal-lg" isOpen={this.state.isInsertClientModal} toggle={this.toggleInsertClientModal}>
          <ModalHeader toggle={this.toggleInsertClientModal}>Ajouter un Nouveau Client</ModalHeader>
          <ModalBody>
            <div>
              <div className="row">
                <div className="form-group col-sm-12">
                  <label htmlFor="societe">Société</label>
                  <input type="text" className="form-control" id="societe" placeholder="Société"/>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="siret">N° Siret</label>
                  <input type="text" className="form-control" id="siret" placeholder="N° Siret"/>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="referent">N° Référent</label>
                  <input type="text" className="form-control" id="referent" placeholder="N° Référent"/>
                </div>
                <div className="form-group col-sm-12">
                  <label htmlFor="adresse_facturation">Address Facturation</label>
                  <input type="text" className="form-control" id="adresse" placeholder="Address Facturation"/>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="cp">Code Postal</label>
                  <input type="text" className="form-control" id="cp" placeholder="Code Postal"/>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="ville">Ville</label>
                  <input type="text" className="form-control" id="ville" placeholder="Ville"/>
                </div>
                <div className="form-group col-sm-12">
                  <label htmlFor="email">Email</label>
                  <input type="email" className="form-control" id="email" placeholder="Email"/>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="telfixe">Tel Fixe</label>
                  <input type="tel" className="form-control" id="telfixe" placeholder="Tel Fixe"/>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="portable">Portable</label>
                  <input type="tel" className="form-control" id="portable" placeholder="Portable"/>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-sm btn-success" onClick={this.addClientData}>Submit</button>
            <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleInsertClientModal}>Cancel</button>
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
    const optionsClients = {
      insertBtn: cur.clientsInsertButton,
      toolBar: this.createCustomToolBar,
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
                  Clients
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <div className="card">
                  <div className="card-header">
                    <i className="fa fa-align-justify"></i> Gestion des Clients
                  </div>
                  <div className="card-block">
                    <BootstrapTable
                      options = {optionsClients}
                      data={ this.state.clientsData }
                      headerStyle = { { "backgroundColor" : "#63c2de" } }
                      insertRow
                      pagination>
                      <TableHeaderColumn
                        dataField="id_client"
                        isKey
                        dataSort
                        width = "10%">
                        ID
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="societe"
                        dataSort
                        width = "15%">
                        Société
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="adresse"
                        dataSort>
                        Adresse Facturation
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="cp"
                        dataSort>
                        Code Postal
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="ville"
                        dataSort>
                        Ville
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField=""
                        dataFormat={ this.clientsGestionFormatter }
                        tdStyle={{textAlign : "center"}}
                        width = "25%">
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
          this.state.isModifierClientModal?
          <Modal isOpen={this.state.isModifierClientModal} toggle={this.toggleModifierClientModal}>
            <ModalHeader toggle={this.toggleModifierClientModal}>Modifier un Client</ModalHeader>
            <ModalBody>
              <div>
                <div className="row">
                  <div className="form-group col-sm-12">
                    <label htmlFor="societe">Société</label>
                    <input type="text" className="form-control" id="societe" placeholder="Société" defaultValue={this.state.clientConcerne['societe']}/>
                  </div>
                  <div className="form-group col-sm-6">
                    <label htmlFor="siret">N° Siret</label>
                    <input type="text" className="form-control" id="siret" placeholder="N° Siret" defaultValue={this.state.clientConcerne['siret']}/>
                  </div>
                  <div className="form-group col-sm-6">
                    <label htmlFor="referent">N° Référent</label>
                    <input type="text" className="form-control" id="referent" placeholder="N° Référent" defaultValue={this.state.clientConcerne['referent']}/>
                  </div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="adresse_facturation">Address Facturation</label>
                    <input type="text" className="form-control" id="adresse" placeholder="Address Facturation" defaultValue={this.state.clientConcerne['adresse']}/>
                  </div>
                  <div className="form-group col-sm-6">
                    <label htmlFor="cp">Code Postal</label>
                    <input type="text" className="form-control" id="cp" placeholder="Code Postal" defaultValue={this.state.clientConcerne['cp']}/>
                  </div>
                  <div className="form-group col-sm-6">
                    <label htmlFor="ville">Ville</label>
                    <input type="text" className="form-control" id="ville" placeholder="Ville" defaultValue={this.state.clientConcerne['ville']}/>
                  </div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" id="email" placeholder="Email" defaultValue={this.state.clientConcerne['email']}/>
                  </div>
                  <div className="form-group col-sm-6">
                    <label htmlFor="telfixe">Tel Fixe</label>
                    <input type="tel" className="form-control" id="telfixe" placeholder="Tel Fixe" defaultValue={this.state.clientConcerne['telfixe']}/>
                  </div>
                  <div className="form-group col-sm-6">
                    <label htmlFor="portable">Portable</label>
                    <input type="tel" className="form-control" id="portable" placeholder="Portable" defaultValue={this.state.clientConcerne['portable']}/>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <button type="button" className="btn btn-sm btn-success" onClick={this.modifierClientData}>Submit</button>
              <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleModifierClientModal}>Cancel</button>
            </ModalFooter>
          </Modal>:null
        }
      </div>
    );
  }
}
/*


*/
