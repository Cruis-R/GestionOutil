import ReactDOM from 'react-dom'
import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter, Button, Progress } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import classnames from 'classnames';
import urls from '../configs/serverConfigurations'
const data = [{
  "id_chargeur" : 1,
  "num_cruisrent" : "34",
  "statut" : '1',
  "date_production" : "2017-08-03" ,
  "date_acquisition" : "2017-08-03",
  "date_ajout" : "2017-08-03",
  "contrat" : "CruisR",
  "identifiant" : "001"
},{
  "id_chargeur" : 2,
  "num_cruisrent" : "34",
  "statut" : '2',
  "date_production" : "2017-08-03" ,
  "date_acquisition" : "2017-08-03",
  "date_ajout" : "2017-08-03",
  "identifiant" : "002"
},{
  "id_chargeur" : 3,
  "num_cruisrent" : "34",
  "statut" : '3',
  "date_production" : "2017-08-03" ,
  "date_acquisition" : "2017-08-03",
  "date_ajout" : "2017-08-03",
  "identifiant" : "003"
}];
const statut = {
  1 : "Disponible",
  2 : "Assigner",
  3 : "A récupérer"
}
const urlChargeurs = urls.chargeurs;
const urlStatutsCles = urls.statutscles;
const urlContratsAssocier = urls.contrats_associer;
export default class GestionDesChargeurs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      isInsertChargeurModal : false,
      isInsertChargeurSuccess : true,
      isAssocierContratModal : false,
      isAssocierContratSuccess : true,
      isModifierChargeurModal : false,
      isModifierChargeurSuccess : true,
      isInfoCompletModal : false,
      isChangerStatutModal : false,
      isChangerStatutSuccess : true,
      contratModalType : 1,
      chargeurConcerne : {},
      chargeursData : [],
      contratsAssocier : [],
      statutsClesData : []
    }
    this.toggle = this.toggle.bind(this);
    this.toggleInsertChargeurModal = this.toggleInsertChargeurModal.bind(this);
    this.toggleModifierChargeurModal = this.toggleModifierChargeurModal.bind(this);
    this.toggleAssocierContratModal = this.toggleAssocierContratModal.bind(this);
    this.toggleInfoCompletModal = this.toggleInfoCompletModal.bind(this);
    this.toggleChangerStatutModal = this.toggleChangerStatutModal.bind(this);
    this.chargeursGestionFormatter = this.chargeursGestionFormatter.bind(this);
    this.chargeursContratFormatter = this.chargeursContratFormatter.bind(this);
    this.chargeursStatutFormatter = this.chargeursStatutFormatter.bind(this);
    this.addChargeurData = this.addChargeurData.bind(this);
    this.associerContrat = this.associerContrat.bind(this);
    this.changerStatut = this.changerStatut.bind(this);
    this.modifierChargeurData = this.modifierChargeurData.bind(this);
    this.statutFormatter = this.statutFormatter.bind(this);
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
    fetch(urlChargeurs)
    .then((response) => response.json())
    .then((responseJson)=>{
      this.setState({
        chargeursData : responseJson
      })
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
  addChargeurData(){
    const queryMethod = "POST";
    let data = {};
    data["identifiant"] = document.getElementById("identifiant").value?document.getElementById("identifiant").value:null
    data["statut"] = document.getElementById("statut").value?document.getElementById("statut").value:null
    data["date_production"] = document.getElementById("date_production").value?document.getElementById("date_production").value:null
    data["date_acquisition"] = document.getElementById("date_acquisition").value?document.getElementById("date_acquisition").value:null
    data["date_ajout"] = document.getElementById("date_ajout").value?document.getElementById("date_ajout").value:null
    fetch(urlChargeurs,{
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
            isInsertChargeurSuccess : false
          })
        }else {
          fetch(urlChargeurs)
          .then((response) => response.json())
          .then((responseJson)=>{
            this.setState({
              chargeursData : responseJson,
              isInsertChargeurModal : !this.state.isInsertChargeurModal
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
  modifierChargeurData(){
    const queryMethod = "PUT";
    let data = {};
    data["id_chargeur"] = this.state.chargeurConcerne["id_chargeur"];
    data["identifiant"] = document.getElementById("identifiant").value?document.getElementById("identifiant").value:null
    data["statut"] = document.getElementById("statut").value?document.getElementById("statut").value:null
    data["date_production"] = document.getElementById("date_production").value?document.getElementById("date_production").value:null
    data["date_acquisition"] = document.getElementById("date_acquisition").value?document.getElementById("date_acquisition").value:null
    data["date_ajout"] = document.getElementById("date_ajout").value?document.getElementById("date_ajout").value:null
    fetch(urlChargeurs,{
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
            isModifierChargeurSuccess : false
          })
        }else {
          fetch(urlChargeurs)
          .then((response) => response.json())
          .then((responseJson)=>{
            this.setState({
              chargeursData : responseJson,
              isModifierChargeurModal : !this.state.isModifierChargeurModal
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
    const url = urlChargeurs + '/statut';
    let data = {};
    data['id_chargeur'] = this.state.chargeurConcerne['id_chargeur'];
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
          fetch(urlChargeurs)
          .then((response) => response.json())
          .then((responseJson)=>{
            this.setState({
              chargeursData : responseJson,
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
  associerContrat(){
    const queryMethod = "PUT";
    const url = urlChargeurs + '/contrat';
    let data = {};
    data['id_chargeur'] = this.state.chargeurConcerne['id_chargeur'];
    data['id_contrat'] = document.getElementById('id_contrat').value;
    data['contratModalType'] = this.state.contratModalType;
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
            isAssocierContratSucess : false
          })
        }else {
          fetch(urlChargeurs)
          .then((response) => response.json())
          .then((responseJson)=>{
            this.setState({
              chargeursData : responseJson,
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
  dateFormatter(cell, row) {
    let t = cell?new Date(cell).toISOString().split('T')[0]:null;
    return t;
  }
  statutFormatter(data){
    let statut = null;
    this.state.statutsClesData.map((instance)=>{
      if(instance['id_statutcle']===data) statut = instance['lib_statutcle'];
    })
    return statut;
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  toggleInsertChargeurModal(){
    this.setState({
      isInsertChargeurModal : !this.state.isInsertChargeurModal,
      isInsertChargeurSuccess : true
    });
  }
  toggleModifierChargeurModal(data){
    this.setState({
      isModifierChargeurModal : !this.state.isModifierChargeurModal,
      isModifierChargeurSuccess : true,
      chargeurConcerne : data
    });
  }
  toggleAssocierContratModal(data,type){
    console.log("toggleAssocierContratModal data",data,"type",type);
    this.getAssocierContratData();
    this.setState({
      isAssocierContratModal : !this.state.isAssocierContratModal,
      isAssocierContratSuccess : true,
      chargeurConcerne : data,
      contratModalType : type
    });
  }
  toggleInfoCompletModal(data){
    console.log("toggleInfoCompletModal data",data);
    this.setState({
      isInfoCompletModal : !this.state.isInfoCompletModal,
      chargeurConcerne : data
    });
  }
  toggleChangerStatutModal(data){
    this.setState({
      isChangerStatutModal : !this.state.isChangerStatutModal,
      isChangerStatutSuccess : true,
      chargeurConcerne : data
    });
  }
  chargeursGestionFormatter(cell,row){
    return (
      <div>
        <button type="button" className="btn btn-info btn-sm col-sm-6" onClick={()=>this.toggleModifierChargeurModal(row)}>Modifier</button>
        <button type="button" className="btn btn-success btn-sm col-sm-6" onClick={()=>this.toggleInfoCompletModal(row)}>Afficher les Informations</button>
      </div>
    );
  }
  chargeursStatutFormatter(cell,row){
    return (
      <div>
        <button type="button" className={classnames("btn btn-sm col-sm-12",{ "btn-success" : cell===1,"btn-info" : cell===2,"btn-warning" : cell===3})} onClick={()=>this.toggleChangerStatutModal(row)}>
          {this.statutFormatter(cell)}
        </button>
      </div>
    );
  }
  chargeursContratFormatter(cell,row){
    if(!cell){
      return (
        <button type="button" className="btn btn-success btn-sm col-sm-12" onClick={()=>this.toggleAssocierContratModal(row,1)}>Associer</button>
      );
    }else {
      return (
        <button type="button" className="btn btn-danger btn-sm col-sm-12" onClick={()=>this.toggleAssocierContratModal(row,2)}>Dissocier {cell}</button>
      );
    }
  }
  chargeursInsertButton = () => {
    return (
      <div>
        <button type="button" className="btn btn-primary btn-md" onClick = {this.toggleInsertChargeurModal}>Ajouter un Nouveau Chargeur</button>
        <Modal className='modal-lg modal-info' isOpen={this.state.isInsertChargeurModal} toggle={this.toggleInsertChargeurModal}>
          <ModalHeader toggle={this.toggleInsertChargeurModal}>Ajouter un Nouveau Chargeur</ModalHeader>
          <ModalBody>
            <div>
              <div className="row">
                <div className="form-group col-sm-12">
                  <label htmlFor="date_production">Date de Production</label>
                  <input type="date" className="form-control" id="date_production" placeholder="Date de Production"/>
                </div>
                <div className="form-group col-sm-12">
                  <label htmlFor="date_acquisition">Date d&#39;acquisition</label>
                  <input type="date" className="form-control" id="date_acquisition" placeholder="Date d'acquisition"/>
                </div>
                <div className="form-group col-sm-12">
                  <label htmlFor="date_ajout">Date d&#39;ajout</label>
                  <input type="date" className="form-control" id="date_ajout" placeholder="Date d'ajout"/>
                </div>
                <div className="form-group col-sm-12">
                  <label htmlFor="identifiant">Identifiant</label>
                  <input type="text" className="form-control" id="identifiant" placeholder="Identifiant"/>
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
            {!this.state.isInsertChargeurSuccess?<span className="help-block text-danger">Error </span>:null}
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-sm btn-success" onClick={this.addChargeurData}>Submit</button>
            <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleInsertChargeurModal}>Cancel</button>
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
      insertBtn: cur.chargeursInsertButton,
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
                  Chargeurs
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <div className="card">
                  <div className="card-header">
                    <i className="fa fa-align-justify"></i> Gestion des Chargeur
                  </div>
                  <div className="card-block">
                    <BootstrapTable
                      options = {optionsScooters}
                      data={ this.state.chargeursData }
                      headerStyle = { { "backgroundColor" : "#63c2de" } }
                      insertRow
                      search>
                      <TableHeaderColumn
                        dataField="id_chargeur"
                        isKey
                        dataSort
                        searchable={ false }>
                        ID
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="identifiant"
                        dataSort
                        filter={ { type: 'TextFilter', placeholder: "Identifiant"} }>
                        Identifiant
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="statut"
                        dataSort
                        dataFormat = {this.chargeursStatutFormatter}
                        filter={ { type: 'SelectFilter', options: statut, placeholder: "Statut"} }>
                        Statut
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="id_contrat"
                        dataSort
                        dataFormat={ this.chargeursContratFormatter }
                        filter={ { type: 'TextFilter', placeholder: "Contrat"} }
                        tdStyle = {{"textAlign" : "center"}}>
                        Contrat
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField=""
                        dataFormat={ this.chargeursGestionFormatter }
                        tdStyle = {{"textAlign" : "center"}}
                        searchable={ false }
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
            this.state.isAssocierContratModal?
            <Modal className='modal-lg modal-info' isOpen={this.state.isAssocierContratModal} toggle={this.toggleAssocierContratModal}>
              <ModalHeader toggle={this.toggleAssocierContratModal}>{this.state.contratModalType===1?"Associer un Contrat":"Dissocier un Contrat"}</ModalHeader>
              <ModalBody>
                <div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="id_chargeur">Chargeur ID</label>
                    <input type="text" className="form-control" id="id_chargeur" placeholder="Chargeur ID" defaultValue = {this.state.chargeurConcerne["id_chargeur"]} disabled/>
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
                      </select>:<input type="text" className="form-control" id="id_contrat" placeholder="Contrat ID" defaultValue = {this.state.chargeurConcerne["id_contrat"]} disabled/>

                    }
                  </div>
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
            this.state.isChangerStatutModal?
            <Modal className='modal-lg modal-info' isOpen={this.state.isChangerStatutModal} toggle={this.toggleChangerStatutModal}>
              <ModalHeader toggle={this.toggleChangerStatutModal}>Changer le Statut</ModalHeader>
              <ModalBody>
                <div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="id_chargeur">Chargeur ID</label>
                    <input type="text" className="form-control" id="id_chargeur" placeholder="Chargeur ID" defaultValue = {this.state.chargeurConcerne["id_chargeur"]} disabled/>
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
                {!this.state.isChangerStatutSuccess?<span className="help-block text-danger">Error </span>:null}
              </ModalBody>
              <ModalFooter>
                <button type="button" className="btn btn-sm btn-success" onClick={this.changerStatut}>Submit</button>
                <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleChangerStatutModal}>Cancel</button>
              </ModalFooter>
            </Modal>:null
          }
          {
            this.state.isInfoCompletModal?
            <Modal className='modal-lg modal-info' isOpen={this.state.isInfoCompletModal} toggle={this.toggleInfoCompletModal}>
              <ModalHeader toggle={this.toggleInfoCompletModal}>Information du Chargeur</ModalHeader>
              <ModalBody>
                <div className="row">
                  <div className="col-sm-6 col-lg-3">
                    <div className="card">
                      <div className="card-block">
                        <div>{this.state.chargeurConcerne["identifiant"]}</div>
                        <small className="text-muted">Identifiant</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-lg-3">
                    <div className="card">
                      <div className="card-block">
                        <div>{this.dateFormatter(this.state.chargeurConcerne["date_production"])}</div>
                        <small className="text-muted">Date de Production</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-lg-3">
                    <div className="card">
                      <div className="card-block">
                        <div>{this.dateFormatter(this.state.chargeurConcerne["date_acquisition"])}</div>
                        <small className="text-muted">Date d&#39;Acquisition</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-lg-3">
                    <div className="card">
                      <div className="card-block">
                        <div>{this.dateFormatter(this.state.chargeurConcerne["date_ajout"])}</div>
                        <small className="text-muted">Date d&#39;Ajout</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-group">
                  <div className={classnames("card card-inverse",{ "card-success" : this.state.chargeurConcerne["statut"]===1,"card-info" : this.state.chargeurConcerne["statut"]===2,"card-warning" : this.state.chargeurConcerne["statut"]===3})}>
                    <div className="card-block">
                      <div className="h1 text-muted text-right mb-2">
                        <i className="icon-speedometer"></i>
                      </div>
                      <div className="h4 mb-0">{this.statutFormatter(this.state.chargeurConcerne["statut"])}</div>
                      <small className="text-muted text-uppercase font-weight-bold">Statut</small>
                    </div>
                  </div>
                </div>
                <div>
                  <div>Historique contrat</div>
                  <div>Historique des Chargeur ayant été rechargé</div>
                </div>
              </ModalBody>
              <ModalFooter>
                <button type="button" className="btn btn-sm btn-success" onClick={this.toggleInfoCompletModal}>Close</button>
              </ModalFooter>
            </Modal>:null
          }
          {
            this.state.isModifierChargeurModal?
            <Modal className='modal-lg modal-info' isOpen={this.state.isModifierChargeurModal} toggle={this.toggleModifierChargeurModal}>
              <ModalHeader toggle={this.toggleModifierChargeurModal}>Modifier un Chargeur</ModalHeader>
              <ModalBody>
                <div>
                  <div className="row">
                    <div className="form-group col-sm-12">
                      <label htmlFor="date_production">Date de Production</label>
                      <input type="date" className="form-control" id="date_production" placeholder="Date de Production" defaultValue = {this.dateFormatter(this.state.chargeurConcerne["date_production"])}/>
                    </div>
                    <div className="form-group col-sm-12">
                      <label htmlFor="date_acquisition">Date d&#39;acquisition</label>
                      <input type="date" className="form-control" id="date_acquisition" placeholder="Date d'acquisition" defaultValue = {this.dateFormatter(this.state.chargeurConcerne["date_acquisition"])}/>
                    </div>
                    <div className="form-group col-sm-12">
                      <label htmlFor="date_ajout">Date d&#39;ajout</label>
                      <input type="date" className="form-control" id="date_ajout" placeholder="Date d'ajout" defaultValue = {this.dateFormatter(this.state.chargeurConcerne["date_ajout"])}/>
                    </div>
                    <div className="form-group col-sm-12">
                      <label htmlFor="identifiant">Identifiant</label>
                      <input type="text" className="form-control" id="identifiant" placeholder="Identifiant" defaultValue = {this.state.chargeurConcerne['identifiant']}/>
                    </div>
                    <div className="form-group col-sm-12">
                      <label htmlFor="statut">Statut</label>
                      <select className="form-control" id="statut" placeholder="Statut" defaultValue = {this.state.chargeurConcerne['statut']}>
                      {
                        this.state.statutsClesData.map((instance,index)=>{
                          return <option value={instance['id_statutcle']}>{instance['lib_statutcle']}</option>
                        })
                      }
                      </select>
                    </div>
                  </div>
                </div>
                {!this.state.isModifierChargeurSuccess?<span className="help-block text-danger">Error </span>:null}
              </ModalBody>
              <ModalFooter>
                <button type="button" className="btn btn-sm btn-success" onClick={this.modifierChargeurData}>Submit</button>
                <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleModifierChargeurModal}>Cancel</button>
              </ModalFooter>
            </Modal>:null
          }
        </div>
      </div>
    );
  }
}
