import React, { Component } from 'react';
import { Link } from 'react-router-dom'
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
      facturationConcerne : null,
      facturationsData : [],
      clientsData : [],
      numFacture : null
    }
    this.toggle = this.toggle.bind(this);
    this.toggleInsertFacturationModal = this.toggleInsertFacturationModal.bind(this);
    this.toggleModifierFacturationModal = this.toggleModifierFacturationModal.bind(this);
    this.facturationsGestionFormatter = this.facturationsGestionFormatter.bind(this);
    this.facturationsInsertButton = this.facturationsInsertButton.bind(this);
    this.numeroFacturationGenerator = this.numeroFacturationGenerator.bind(this);
    this.addFacturationData = this.addFacturationData.bind(this);
    this.modifierFacturationData = this.modifierFacturationData.bind(this);
    this.getNumFacture = this.getNumFacture.bind(this);
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
  getNumFacture(){
    fetch(urlFacturations+'/num_facture')
    .then((response) => response.json())
    .then((responseJson)=>{
      console.log("numFacture",responseJson[1]?responseJson[1][0]?responseJson[1][0]['num_facture']:null:null);
      this.setState({
        numFacture : responseJson[1]?responseJson[1][0]?responseJson[1][0]['num_facture']:null:null
      })
    })
    .catch((error) => {
      console.error(error);
    });
  }
  addFacturationData(){
    const queryMethod = "POST";
    let data = {};
    data['num_facture']=document.getElementById("num_facture").value?document.getElementById("num_facture").value:null
    data['id_client']=document.getElementById("id_client").value?document.getElementById("id_client").value:null
    data['designation']=document.getElementById("designation").value?document.getElementById("designation").value:null
    data['date_facture']=document.getElementById("date_facture").value?document.getElementById("date_facture").value:null
    fetch(urlFacturations,{
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
            isInsertFacturationSuccess : false
          })
        }else {
          fetch(urlFacturations)
          .then((response) => response.json())
          .then((responseJson)=>{
            this.setState({
              facturationsData : responseJson,
              isInsertFacturationModal : !this.state.isInsertFacturationModal
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
  modifierFacturationData(){
    const queryMethod = "PUT";
    let data = {};
    data['num_facture']=document.getElementById("num_facture").value?document.getElementById("num_facture").value:null;
    data['designation']=document.getElementById("designation").value?document.getElementById("designation").value:null;
    data['date_facture']=document.getElementById("date_facture").value?document.getElementById("date_facture").value:null;
    data["totalht"]=document.getElementById("totalht").value?document.getElementById("totalht").value:null;
    data["tva"]=document.getElementById("tva").value?document.getElementById("tva").value:null;
    data["id_facture"]=this.state.facturationConcerne['id_facture'];
    fetch(urlFacturations,{
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
            isModifierFacturationSuccess : false
          })
        }else {
          fetch(urlFacturations)
          .then((response) => response.json())
          .then((responseJson)=>{
            this.setState({
              facturationsData : responseJson,
              isModifierFacturationModal : !this.state.isModifierFacturationModal
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
  toggleModifierFacturationModal(data){
    this.setState({
      isModifierFacturationModal : !this.state.isModifierFacturationModal,
      isModifierFacturationSuccess : true,
      facturationConcerne : data
    });
  }
  toggleInsertFacturationModal(){
    if (!this.state.isInsertFacturationModal) {
      this.getNumFacture();
    }
    this.setState({
      isInsertFacturationModal : !this.state.isInsertFacturationModal,
      isInsertFacturationSuccess : true
    });
  }
  facturationsGestionFormatter(cell,row){
    return (
      <div>
        <button type="button" className="btn btn-success btn-sm col-sm-6" onClick={()=>this.toggleModifierFacturationModal(row)}>Modifier</button>
        <Link target="_blank" to={'/facture?id='+row["id_facture"]}  className="text-white"><button type="button" className="btn btn-info btn-sm col-sm-6">Imprimier</button></Link>
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
  numeroFacturationGenerator(){
    let t = new Date();
    let num = ((this.state.facturationsData.length+1)/10000).toString().split('.')[1];
    let numeroString = t.toISOString().split('T')[0].replace(/\-/g,'').slice(2,8)+num;
    return numeroString;
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
                <div className="form-group col-sm-12">
                  <label htmlFor="num_facture">N° Facturation</label>
                  <input type="text" className="form-control" id="num_facture" placeholder="N° Facturation" value={this.state.numFacture}/>
                </div>
                <div className="form-group col-sm-12">
                  <label htmlFor="id_client">N° Client</label>
                  <select className="form-control" id="id_client" placeholder="N° Client" defaultValue='selectionner un client'>
                    <option disabled value='selectionner un client'> -- selectionner un client -- </option>
                    {
                      this.state.clientsData.map((instance,index)=>{
                        return <option value={instance['id_client']}>{'ID: '+instance['id_client']+'\t'+instance['societe']}</option>
                      })
                    }
                  </select>
                </div>
                <div className="form-group col-sm-12">
                  <label htmlFor="designation">Désignation</label>
                  <input type="text" className="form-control" id="designation" placeholder="Désignation"/>
                </div>
                <div className="form-group col-sm-12">
                  <label htmlFor="date_facture">Date de Facturation</label>
                  <input type="date" className="form-control" id="date_facture" placeholder="Date de Facture"/>
                </div>
              </div>
            </div>
            {!this.state.isInsertFacturationSuccess?<span className="help-block text-danger">Error </span>:null}
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-sm btn-success" onClick={this.addFacturationData}>Submit</button>
            <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleInsertFacturationModal}>Cancel</button>
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
                  Les Facturations
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
                        dataSort
                        width = "5%">
                        ID
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="num_facture"
                        dataSort
                        width = "15%">
                        N° Facturation
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="id_client"
                        dataSort
                        width = "5%">
                        N° Client
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="societe"
                        dataSort
                        width = "10%">
                        Société
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="cp"
                        dataSort
                        width = "7%">
                        CP
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="ville"
                        dataSort
                        width = "10%">
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
                        dataSort
                        width = "10%">
                        Date de facture
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField=""
                        dataFormat={ this.facturationsGestionFormatter }
                        tdStyle={{textAlign : "center"}}
                        width = "180px">
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
                    <label htmlFor="id_facture">ID Facturation</label>
                    <input type="text" className="form-control" id="id_facture" placeholder="ID Facturation" disabled defaultValue={this.state.facturationConcerne['id_facture']}/>
                  </div>
                  <div className="form-group col-sm-6">
                    <label htmlFor="num_facture">N° Facturation</label>
                    <input type="text" className="form-control" id="num_facture" placeholder="N° Facturation" defaultValue={this.state.facturationConcerne['num_facture']}/>
                  </div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="designation">Désignation</label>
                    <input type="text" className="form-control" id="designation" placeholder="Désignation" defaultValue={this.state.facturationConcerne['designation']}/>
                  </div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="totalht">Total HT</label>
                    <div className="input-group">
                      <input type="text" className="form-control" id="totalht" placeholder="totalht" defaultValue={this.state.facturationConcerne['totalht']}/>
                      <span className="input-group-addon"><i className="fa fa-euro"></i></span>
                    </div>
                  </div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="totalht">TVA</label>
                    <div className="input-group">
                      <input type="text" className="form-control" id="tva" placeholder="totalht" defaultValue={this.state.facturationConcerne['tva']}/>
                      <span className="input-group-addon"><i className="fa fa-euro"></i></span>
                    </div>
                  </div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="totalht">Total TTC</label>
                    <div className="input-group">
                      <input type="text" className="form-control" id="totalttc" placeholder="totalht" defaultValue={this.state.facturationConcerne['totalttc']}/>
                      <span className="input-group-addon"><i className="fa fa-euro"></i></span>
                    </div>
                  </div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="date_facture">Date de Facturation</label>
                    <input type="date" className="form-control" id="date_facture" placeholder="Date de Facture" defaultValue={this.dateFormatter(this.state.facturationConcerne['date_facture'])}/>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <button type="button" className="btn btn-sm btn-success" onClick={this.modifierFacturationData}>Submit</button>
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
