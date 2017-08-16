import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import classnames from 'classnames';
import mysql from 'mysql2/promise';
import urls from '../configs/serverConfigurations';

const urlFacturations = urls.facturations;
const urlClients = urls.clients;
export default class GestionDesFacturations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      isInsertFacturationModal : false,
      isInsertFacturationSuccess : true,
      isModifierFacturationModal : false,
      isModifierFacturationSuccess : true,
      isImprimier : false,
      facturationConcerne : null,
      facturationsData : [],
      clientsData : []
    }
    this.toggle = this.toggle.bind(this);
    this.toggleInsertFacturationModal = this.toggleInsertFacturationModal.bind(this);
    this.toggleModifierFacturationModal = this.toggleModifierFacturationModal.bind(this);
    this.toggleImprimierModal = this.toggleImprimierModal.bind(this);
    this.facturationsGestionFormatter = this.facturationsGestionFormatter.bind(this);
  }
  componentDidMount(){
    this.getData();
  }
  getData(){
    fetch(urlFacturations)
    .then((response) => response.json())
    .then((responseJson)=>{
      this.setState({
        facturationsData : responseJson
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
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  toggleModifierFacturationModal(data){
    this.setState({
      isModifierFacturationModal : !this.state.isModifierFacturationModal,
      isModifierFacturationSuccess : true,
      facturationConcerne : data
    });
  }
  toggleInsertFacturationModal(){
    this.setState({
      isInsertFacturationModal : !this.state.isInsertFacturationModal,
      isInsertFacturationSuccess : true
    });
  }
  toggleImprimierModal(data){
    this.setState({
      isImprimier : !this.state.isImprimier,
      facturationConcerne : data
    });
  }
  facturationsGestionFormatter(cell,row){
    return (
      <div>
        <button type="button" className="btn btn-success btn-sm col-sm-6" onClick={()=>this.toggleModifierFacturationModal(row)}>Modifier</button>
        <button type="button" className="btn btn-info btn-sm col-sm-6" onClick={()=>this.toggleImprimierModal(row)}>Imprimier</button>
      </div>
    );
  }
  euroFormatter(cell,row){
    return(
      cell+' €'
    )
  }
  dateFormatter(cell, row) {
    let t = cell?new Date(cell).toISOString().split('T')[0]:null;
    return t;
  }
  facturationsInsertButton = () => {
    return (
      <div>
        <button type="button" className="btn btn-info btn-md" onClick = {this.toggleInsertFacturationModal}>Ajouter un Nouveau Facturation</button>
        <Modal className="modal-info modal-lg" isOpen={this.state.isInsertFacturationModal} toggle={this.toggleInsertFacturationModal}>
          <ModalHeader toggle={this.toggleInsertFacturationModal}>Ajouter un Nouveau Facturation</ModalHeader>
          <ModalBody>
            <div>
              <div className="row">
                <div className="form-group col-sm-6">
                  <label htmlFor="id_facturation">N° Facture</label>
                  <input type="text" className="form-control" id="id_facturation" placeholder="N° Facture"/>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="niveau_assurance">N° Contrat</label>
                  <input type="text" className="form-control" id="id_contrat" placeholder="N° Contrat"/>
                </div>
                <div className="form-group col-sm-12">
                  <label htmlFor="annexe_scooter">Total HT</label>
                  <input type="text" className="form-control" id="totalht" placeholder="totalht"/>
                </div>
                <div className="form-group col-sm-12">
                  <label htmlFor="annexe_scooter">Désignation</label>
                  <input type="text" className="form-control" id="designation" placeholder="Désignation"/>
                </div>
                <div className="form-group col-sm-12">
                  <label htmlFor="datedebut">Date de Facturation</label>
                  <input type="date" className="form-control" id="date_facture" placeholder="Date de Facturation"/>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-sm btn-success" onClick={this.toggleInsertFacturationModal}>Submit</button>
            <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleInsertFacturationModal}>Cancel</button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  typeFacturationsInsertButton = () => {
    return (
      <div>
        <button type="button" className="btn btn-info btn-md" onClick={this.toggleInsertTypeFacturationModal}>Ajouter un Nouveau TypeFacturation</button>
        <Modal isOpen={this.state.isInsertTypeFacturationModal} toggle={this.toggleInsertTypeFacturationModal}>
          <ModalHeader toggle={this.toggleInsertTypeFacturationModal}>Ajouter un Nouveau TypeFacturation</ModalHeader>
          <ModalBody>
            <div>
              <div className="row">
                <div className="form-group col-sm-6">
                  <label htmlFor="id_type_facturation">Facturation ID</label>
                  <input type="text" className="form-control" id="id_type_facturation" placeholder="Facturation Type ID"/>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="nom">Nom</label>
                  <input type="text" className="form-control" id="nom" placeholder="Nom"/>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-sm-12">
                  <label htmlFor="description">Description</label>
                  <input type="text" className="form-control" id="description" placeholder="Description"/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="niveau_service">Niveau Service</label>
                <input type="text" className="form-control" id="niveau_service" placeholder="Niveau Service"/>
              </div>
              <div className="row">
                <div className="form-group col-sm-4">
                  <label htmlFor="durée">Durée</label>
                  <input type="text" className="form-control" id="durée" placeholder="Durée"/>
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="tarifmensuel">Mensualité</label>
                  <input type="text" className="form-control" id="tarifmensuel" placeholder="Mensualité"/>
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="assurance_rc">Assurance</label>
                  <input type="text" className="form-control" id="assurance_rc" placeholder="Assurance"/>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-sm btn-success" onClick={this.toggleInsertTypeFacturationModal}>Submit</button>
            <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleInsertTypeFacturationModal}>Cancel</button>
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
    const optionsFacturations = {
      insertBtn: cur.facturationsInsertButton,
      toolBar: this.createCustomToolBar
    }
    const optionsTypeFacturations = {
      insertBtn: cur.typeFacturationsInsertButton
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
                  Les Factures
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}>
                  Facturation Mensuelle
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <div className="card">
                  <div className="card-header">
                    <i className="fa fa-align-justify"></i> Gestion des Facturations
                  </div>
                  <div className="card-block">
                    <BootstrapTable
                      options = {optionsFacturations}
                      data={ this.state.facturationsData }
                      headerStyle = { { "backgroundColor" : "#63c2de" } }
                      insertRow>
                      <TableHeaderColumn
                        dataField="id_facture"
                        isKey
                        dataSort>
                        ID
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="num_facture"
                        dataSort>
                        Numéro de Facture
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="id_contrat"
                        dataSort>
                        ID Contrat
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="societe"
                        dataSort
                        dataFormat={this.clientFormatter}>
                        Société
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="cp"
                        dataSort
                        dataFormat={this.clientFormatter}>
                        CP
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="ville"
                        dataSort
                        dataFormat={this.clientFormatter}
                        width='170px'>
                        Ville
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="totalht"
                        dataSort
                        dataFormat={this.euroFormatter}>
                        HT
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="tva"
                        dataSort
                        dataFormat={this.euroFormatter}>
                        TVA
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="totalttc"
                        dataSort
                        dataFormat={this.euroFormatter}>
                        TTC
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="date_facture"
                        dataFormat={this.dateFormatter}
                        dataSort>
                        Date de facture
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField=""
                        dataFormat={ this.facturationsGestionFormatter }
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
          this.state.isModifierFacturationModal?
          <Modal isOpen={this.state.isModifierFacturationModal} toggle={this.toggleModifierFacturationModal}>
            <ModalHeader toggle={this.toggleModifierFacturationModal}>Modifier un Facturation</ModalHeader>
            <ModalBody>
              <div>
                <div className="row">
                  <div className="form-group col-sm-6">
                    <label htmlFor="id_facturation">N° Facture</label>
                    <input type="text" className="form-control" id="id_facturation" placeholder="N° Facture"/>
                  </div>
                  <div className="form-group col-sm-6">
                    <label htmlFor="niveau_assurance">N° Contrat</label>
                    <input type="text" className="form-control" id="id_contrat" placeholder="N° Contrat"/>
                  </div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="annexe_scooter">Total HT</label>
                    <input type="text" className="form-control" id="totalht" placeholder="totalht"/>
                  </div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="annexe_scooter">Désignation</label>
                    <input type="text" className="form-control" id="designation" placeholder="Désignation"/>
                  </div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="datedebut">Date de Facturation</label>
                    <input type="date" className="form-control" id="date_facture" placeholder="Date de Facturation"/>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <button type="button" className="btn btn-sm btn-success" onClick={this.toggleModifierFacturationModal}>Submit</button>
              <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleModifierFacturationModal}>Cancel</button>
            </ModalFooter>
          </Modal>:null
        }
      </div>
    );
  }
}
/*


*/
