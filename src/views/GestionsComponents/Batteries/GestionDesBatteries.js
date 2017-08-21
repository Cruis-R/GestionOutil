import ReactDOM from 'react-dom'
import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter, Button, Progress } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import classnames from 'classnames';
import urls from '../configs/serverConfigurations'
const data = [{
  "id_batterie" : 1,
  "num_cruisrent" : "34",
  "statut" : '1',
  "date_production" : "2017-08-03" ,
  "date_acquisition" : "2017-08-03",
  "date_ajout" : "2017-08-03",
  "poids" : "3.7",
  "puissance" : "11",
  "bms" : "unknown",
  "identifiant_bms" : "1",
  "cellule" : 150,
  "nb_cycles" : 2000,
  "identifiant" : "0001",
  "contrat" : "CruisR"
},{
  "id_batterie" : 1,
  "num_cruisrent" : "34",
  "statut" : '2',
  "date_production" : "2017-08-03" ,
  "date_acquisition" : "2017-08-03",
  "date_ajout" : "2017-08-03",
  "poids" : "3.6",
  "puissance" : "12",
  "bms" : "unknown",
  "identifiant_bms" : "2",
  "cellule" : 130,
  "nb_cycles" : 1500,
  "identifiant" : "0002",
},{
  "id_batterie" : 1,
  "num_cruisrent" : "34",
  "statut" : '3',
  "date_production" : "2017-08-03" ,
  "date_acquisition" : "2017-08-03",
  "date_ajout" : "2017-08-03",
  "poids" : "3.5",
  "puissance" : "10",
  "bms" : "unknown",
  "identifiant_bms" : "3",
  "cellule" : 120,
  "nb_cycles" : 1000,
  "identifiant" : "0003",
}];
const statut = {
  1 : "Disponible",
  2 : "Assigner",
  3 : "A récupérer"
}
const urlBatteries = urls.batteries;
const urlStatutsCles = urls.statutscles;
const urlContratsAssocier = urls.contrats_associer;
export default class GestionDesBatteries extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      isInsertBatterieModal : false,
      isInsertBatterieSuccess : true,
      isModifierBatterieModal : false,
      isModifierBatterieSuccess : true,
      isAssocierContratModal : false,
      isAssocierContratSuccess : true,
      isInfoCompletModal : false,
      isChangerStatutModal : false,
      isChangerStatutSuccess : true,
      contratModalType : 1,
      batterieConcerne : {},
      batteriesData : [],
      contratsAssocier : [],
      statutsClesData : []
    }
    this.toggle = this.toggle.bind(this);
    this.toggleInsertBatterieModal = this.toggleInsertBatterieModal.bind(this);
    this.toggleModifierBatterieModal = this.toggleModifierBatterieModal.bind(this);
    this.toggleAssocierContratModal = this.toggleAssocierContratModal.bind(this);
    this.toggleInfoCompletModal = this.toggleInfoCompletModal.bind(this);
    this.toggleChangerStatutModal = this.toggleChangerStatutModal.bind(this);
    this.batteriesGestionFormatter = this.batteriesGestionFormatter.bind(this);
    this.batteriesContratFormatter = this.batteriesContratFormatter.bind(this);
    this.batteriesStatutFormatter = this.batteriesStatutFormatter.bind(this);
    this.addBatterieData = this.addBatterieData.bind(this);
    this.associerContrat = this.associerContrat.bind(this);
    this.changerStatut = this.changerStatut.bind(this);
    this.modifierBatterieData = this.modifierBatterieData.bind(this);
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
    fetch(urlBatteries)
    .then((response) => response.json())
    .then((responseJson)=>{
      this.setState({
        batteriesData : responseJson
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
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  toggleInsertBatterieModal(){
    this.setState({
      isInsertBatterieModal : !this.state.isInsertBatterieModal,
      isInsertBatterieSuccess : true
    });
  }
  toggleModifierBatterieModal(data){
    this.setState({
      isModifierBatterieModal : !this.state.isModifierBatterieModal,
      isModifierBatterieSuccess : true,
      batterieConcerne : data
    });
  }
  toggleAssocierContratModal(data,type){
    console.log("toggleAssocierContratModal data",data,"type",type);
    this.getAssocierContratData();
    this.setState({
      isAssocierContratModal : !this.state.isAssocierContratModal,
      isAssocierContratSuccess : true,
      batterieConcerne : data,
      contratModalType : type
    });
  }
  toggleInfoCompletModal(data){
    console.log("toggleInfoCompletModal data",data);
    this.setState({
      isInfoCompletModal : !this.state.isInfoCompletModal,
      batterieConcerne : data
    });
  }
  toggleChangerStatutModal(data){
    this.setState({
      isChangerStatutModal : !this.state.isChangerStatutModal,
      isChangerStatutSuccess : true,
      batterieConcerne : data
    });
  }
  getUTCDate(date){
    if(date) return date.split('T')[0];
    else {
      return 'Unknown';
    }
  }
  addBatterieData(){
    const queryMethod = "POST";
    let data = {};
    data["date_production"] = document.getElementById("date_production").value?document.getElementById("date_production").value:null;
    data["date_ajout"] = document.getElementById("date_ajout").value?document.getElementById("date_ajout").value:null;
    data["date_acquisition"] = document.getElementById("date_acquisition").value?document.getElementById("date_acquisition").value:null;
    data["poids"] = document.getElementById("poids").value?data["poids"] = document.getElementById("poids").value:null;
    data["puissance"] = document.getElementById("puissance").value;
    data["cellule"] = document.getElementById("cellule").value;
    data["nb_cycles"] = document.getElementById("nb_cycles").value?document.getElementById("nb_cycles").value:null;
    data["bms"] = document.getElementById("bms").value;
    data["identifiant_bms"] = document.getElementById("identifiant_bms").value;
    data["identifiant"] = document.getElementById("identifiant").value;
    data["statut"] = document.getElementById("statut").value?document.getElementById("statut").value:null;
    fetch(urlBatteries,{
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
            isInsertBatterieSuccess : false
          })
        }else {
          fetch(urlBatteries)
          .then((response) => response.json())
          .then((responseJson)=>{
            this.setState({
              batteriesData : responseJson,
              isInsertBatterieModal : !this.state.isInsertBatterieModal
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
  modifierBatterieData(){
    const queryMethod = "PUT";
    let data = {};
    data["id_batterie"] = this.state.batterieConcerne["id_batterie"];
    data["date_production"] = document.getElementById("date_production").value?document.getElementById("date_production").value:null;
    data["date_ajout"] = document.getElementById("date_ajout").value?document.getElementById("date_ajout").value:null;
    data["date_acquisition"] = document.getElementById("date_acquisition").value?document.getElementById("date_acquisition").value:null;
    data["poids"] = document.getElementById("poids").value?data["poids"] = document.getElementById("poids").value:null;
    data["puissance"] = document.getElementById("puissance").value;
    data["cellule"] = document.getElementById("cellule").value;
    data["nb_cycles"] = document.getElementById("nb_cycles").value?document.getElementById("nb_cycles").value:null;
    data["bms"] = document.getElementById("bms").value;
    data["identifiant_bms"] = document.getElementById("identifiant_bms").value;
    data["identifiant"] = document.getElementById("identifiant").value;
    data["statut"] = document.getElementById("statut").value?document.getElementById("statut").value:null;
    fetch(urlBatteries,{
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
            isModifierBatterieSuccess : false
          })
        }else {
          fetch(urlBatteries)
          .then((response) => response.json())
          .then((responseJson)=>{
            this.setState({
              batteriesData : responseJson,
              isModifierBatterieModal : !this.state.isModifierBatterieModal
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
    const url = urlBatteries + '/statut';
    let data = {};
    data['id_batterie'] = this.state.batterieConcerne['id_batterie'];
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
          fetch(urlBatteries)
          .then((response) => response.json())
          .then((responseJson)=>{
            this.setState({
              batteriesData : responseJson,
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
    const url = urlBatteries + '/contrat';
    let data = {};
    data['id_batterie'] = this.state.batterieConcerne['id_batterie'];
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
          fetch(urlBatteries)
          .then((response) => response.json())
          .then((responseJson)=>{
            this.setState({
              batteriesData : responseJson,
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
  batteriesGestionFormatter(cell,row){
    return (
      <div>
        <button type="button" className="btn btn-info btn-sm col-sm-6" onClick={()=>this.toggleModifierBatterieModal(row)}>Modifier</button>
        <button type="button" className="btn btn-success btn-sm col-sm-6" onClick={()=>this.toggleInfoCompletModal(row)}>Afficher les Informations</button>
      </div>
    );
  }
  batteriesStatutFormatter(cell,row){
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
  batteriesContratFormatter(cell,row){
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
  batteriesInsertButton = () => {
    return (
      <div>
        <button type="button" className="btn btn-primary btn-md" onClick = {this.toggleInsertBatterieModal}>Ajouter un Nouveau Batterie</button>
        <Modal className='modal-lg modal-info' isOpen={this.state.isInsertBatterieModal} toggle={this.toggleInsertBatterieModal}>
          <ModalHeader toggle={this.toggleInsertBatterieModal}>Ajouter un Nouveau Batterie</ModalHeader>
          <ModalBody>
            <div>
              <div className="row">
                <div className="form-group col-sm-4">
                  <label htmlFor="date_production">Date de Production</label>
                  <input type="date" className="form-control" id="date_production" placeholder="Date de Production"/>
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="date_acquisition">Date d&#39;acquisition</label>
                  <input type="date" className="form-control" id="date_acquisition" placeholder="Date d'acquisition"/>
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="date_ajout">Date d&#39;ajout</label>
                  <input type="date" className="form-control" id="date_ajout" placeholder="Date d'ajout"/>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="poids">Poids</label>
                  <input type="text" className="form-control" id="poids" placeholder="Poids"/>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="puissance">Puissance</label>
                  <input type="text" className="form-control" id="puissance" placeholder="Puissance"/>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="cellule">Cellule</label>
                  <input type="text" className="form-control" id="cellule" placeholder="Cellule"/>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="nb_cycles">Nombre de Cycle</label>
                  <input type="text" className="form-control" id="nb_cycles" placeholder="Nombre de Cycle"/>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="bms">BMS</label>
                  <input type="text" className="form-control" id="bms" placeholder="BMS"/>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="identifiant_bms">Identifiant du BMS</label>
                  <input type="text" className="form-control" id="identifiant_bms" placeholder="Identifiant du BMS"/>
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
            {!this.state.isInsertBatterieSuccess?<span className="help-block text-danger">Error </span>:null}
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-sm btn-success" onClick={this.addBatterieData}>Submit</button>
            <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleInsertBatterieModal}>Cancel</button>
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
    const optionsBatteries = {
      insertBtn: cur.batteriesInsertButton,
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
                  Batteries
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <div className="card">
                  <div className="card-header">
                    <i className="fa fa-align-justify"></i> Gestion des Batterie
                  </div>
                  <div className="card-block">
                    <BootstrapTable
                      options = {optionsBatteries}
                      data={ this.state.batteriesData }
                      headerStyle = { { "backgroundColor" : "#63c2de" } }
                      insertRow
                      search>
                      <TableHeaderColumn
                        dataField="id_batterie"
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
                        dataFormat = {this.batteriesStatutFormatter}
                        filter={ { type: 'SelectFilter', options: statut, placeholder: "Statut"} }>
                        Statut
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="id_contrat"
                        dataSort
                        dataFormat={ this.batteriesContratFormatter }
                        filter={ { type: 'TextFilter', placeholder: "Contrat"} }
                        tdStyle = {{"textAlign" : "center"}}>
                        Contrat
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField=""
                        dataFormat={ this.batteriesGestionFormatter }
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
                    <label htmlFor="id_batterie">Batterie ID</label>
                    <input type="text" className="form-control" id="id_batterie" placeholder="Batterie ID" defaultValue = {this.state.batterieConcerne["id_batterie"]} disabled/>
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
                    </select>:<input type="text" className="form-control"  key="id_contrat" id="id_contrat" placeholder="Contrat ID" defaultValue = {this.state.batterieConcerne["id_contrat"]} disabled/>
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
                    <label htmlFor="id_batterie">Batterie ID</label>
                    <input type="text" className="form-control" id="id_batterie" placeholder="Batterie ID" defaultValue = {this.state.batterieConcerne["id_batterie"]} disabled/>
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
              <ModalHeader toggle={this.toggleInfoCompletModal}>Information du Batterie</ModalHeader>
              <ModalBody>
                <div className="row">
                  <div className="col-sm-6 col-lg-3">
                    <div className="card">
                      <div className="card-block">
                        <div>{this.state.batterieConcerne["identifiant"]}</div>
                        <small className="text-muted">Identifiant</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-lg-3">
                    <div className="card">
                      <div className="card-block">
                        <div>{this.getUTCDate(this.state.batterieConcerne["date_production"])}</div>
                        <small className="text-muted">Date de Production</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-lg-3">
                    <div className="card">
                      <div className="card-block">
                        <div>{this.getUTCDate(this.state.batterieConcerne["date_acquisition"])}</div>
                        <small className="text-muted">Date d&#39;Acquisition</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-lg-3">
                    <div className="card">
                      <div className="card-block">
                        <div>{this.getUTCDate(this.state.batterieConcerne["date_ajout"])}</div>
                        <small className="text-muted">Date d&#39;Ajout</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-group">
                  <div className="card card-inverse card-success">
                    <div className="card-block">
                      <div className="h1 text-muted text-right mb-2">
                        <i className="icon-speedometer"></i>
                      </div>
                      <div className="h4 mb-0">{this.state.batterieConcerne["fq_recharge"]?this.state.batterieConcerne["fq_recharge"]:"4.3"}</div>
                      <small className="text-muted text-uppercase font-weight-bold">Fréquence moyenne des recharges</small>
                    </div>
                  </div>
                  <div className="card card-inverse card-primary">
                    <div className="card-block">
                      <div className="h1 text-muted text-right mb-2">
                        <i className="icon-speedometer"></i>
                      </div>
                      <div className="h4 mb-0">{this.state.batterieConcerne["nb_cycles_recharge"]?this.state.batterieConcerne["nb_cycles_recharge"]:"2"}</div>
                      <small className="text-muted text-uppercase font-weight-bold">Nombre Cycle Recharge</small>
                    </div>
                  </div>
                  <div className={classnames("card card-inverse",{ "card-success" : this.state.batterieConcerne["statut"]===1,"card-info" : this.state.batterieConcerne["statut"]===2,"card-warning" : this.state.batterieConcerne["statut"]===3})}>
                    <div className="card-block">
                      <div className="h1 text-muted text-right mb-2">
                        <i className="icon-speedometer"></i>
                      </div>
                      <div className="h4 mb-0">
                        {
                          this.state.statutsClesData.map((instance)=>{
                            if(instance['id_statutcle']===this.state.batterieConcerne["statut"]) return instance['lib_statutcle'];
                          })
                        }
                      </div>
                      <small className="text-muted text-uppercase font-weight-bold">Statut</small>
                    </div>
                  </div>
                  <div className="card card-inverse card-primary">
                    <div className="card-block">
                      <div className="h1 text-muted text-right mb-2">
                        <i className="icon-speedometer"></i>
                      </div>
                      <div className="h4 mb-0">3.2</div>
                      <small className="text-muted text-uppercase font-weight-bold">Niveau Moyen des débuts de recharge</small>
                    </div>
                  </div>
                </div>
                <div className="row">

                  <div className="col-6">
                    <div className="card">
                      <div className="card-block p-3 clearfix">
                        <i className="fa fa-laptop bg-primary p-3 font-2xl mr-3 float-left"></i>
                        <div className="h5 text-info mb-0 mt-2">{this.state.batterieConcerne["poids"]}</div>
                        <div className="text-muted text-uppercase font-weight-bold font-xs">Poids</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="card">
                      <div className="card-block p-3 clearfix">
                        <i className="fa fa-moon-o bg-primary p-3 font-2xl mr-3 float-left"></i>
                        <div className="h5 text-info mb-0 mt-2">{this.state.batterieConcerne["puissance"]}</div>
                        <div className="text-muted text-uppercase font-weight-bold font-xs">Puissance</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="card">
                      <div className="card-block p-3 clearfix">
                        <i className="fa fa-cogs bg-primary p-3 font-2xl mr-3 float-left"></i>
                        <div className="h5 text-info mb-0 mt-2">{this.state.batterieConcerne["bms"]}</div>
                        <div className="text-muted text-uppercase font-weight-bold font-xs">BMS</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="card">
                      <div className="card-block p-3 clearfix">
                        <i className="fa fa-cogs bg-primary p-3 font-2xl mr-3 float-left"></i>
                        <div className="h5 text-info mb-0 mt-2">{this.state.batterieConcerne["identifiant_bms"]}</div>
                        <div className="text-muted text-uppercase font-weight-bold font-xs">Identifiant du BMS</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="card">
                      <div className="card-block p-3 clearfix">
                        <i className="fa fa-cogs bg-primary p-3 font-2xl mr-3 float-left"></i>
                        <div className="h5 text-info mb-0 mt-2">{this.state.batterieConcerne["cellule"]}</div>
                        <div className="text-muted text-uppercase font-weight-bold font-xs">Cellule</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="card">
                      <div className="card-block p-3 clearfix">
                        <i className="fa fa-cogs bg-primary p-3 font-2xl mr-3 float-left"></i>
                        <div className="h5 text-info mb-0 mt-2">{this.state.batterieConcerne["nb_cycles"]}</div>
                        <div className="text-muted text-uppercase font-weight-bold font-xs">Nombre Cycle</div>
                      </div>
                    </div>
                  </div>

                </div>
                <div>
                  <div>Historique contrat</div>
                  <div>Historique statut</div>
                  <div>Historique maintenances</div>
                </div>
              </ModalBody>
              <ModalFooter>
                <button type="button" className="btn btn-sm btn-success" onClick={this.toggleInfoCompletModal}>Close</button>
              </ModalFooter>
            </Modal>:null
          }
          {
            this.state.isModifierBatterieModal?
            <Modal className='modal-lg modal-info' isOpen={this.state.isModifierBatterieModal} toggle={this.toggleModifierBatterieModal}>
              <ModalHeader toggle={this.toggleModifierBatterieModal}>Modifier un Batterie</ModalHeader>
              <ModalBody>
                <div>
                  <div className="row">
                    <div className="form-group col-sm-4">
                      <label htmlFor="date_production">Date de Production</label>
                      <input type="date" className="form-control" id="date_production" placeholder="Date de Production" defaultValue = {this.getUTCDate(this.state.batterieConcerne["date_production"])}/>
                    </div>
                    <div className="form-group col-sm-4">
                      <label htmlFor="date_acquisition">Date d&#39;acquisition</label>
                      <input type="date" className="form-control" id="date_acquisition" placeholder="Date d'acquisition" defaultValue = {this.getUTCDate(this.state.batterieConcerne["date_acquisition"])}/>
                    </div>
                    <div className="form-group col-sm-4">
                      <label htmlFor="date_ajout">Date d&#39;ajout</label>
                      <input type="date" className="form-control" id="date_ajout" placeholder="Date d'ajout" defaultValue = {this.getUTCDate(this.state.batterieConcerne["date_ajout"])}/>
                    </div>
                    <div className="form-group col-sm-6">
                      <label htmlFor="poids">Poids</label>
                      <input type="text" className="form-control" id="poids" placeholder="Poids" defaultValue = {this.state.batterieConcerne['poids']}/>
                    </div>
                    <div className="form-group col-sm-6">
                      <label htmlFor="puissance">Puissance</label>
                      <input type="text" className="form-control" id="puissance" placeholder="Puissance" defaultValue = {this.state.batterieConcerne['puissance']}/>
                    </div>
                    <div className="form-group col-sm-6">
                      <label htmlFor="cellule">Cellule</label>
                      <input type="text" className="form-control" id="cellule" placeholder="Cellule" defaultValue = {this.state.batterieConcerne['cellule']}/>
                    </div>
                    <div className="form-group col-sm-6">
                      <label htmlFor="nb_cycles">Nombre de Cycle</label>

                      <input type="text" className="form-control" id="nb_cycles" placeholder="Nombre de Cycle" defaultValue = {this.state.batterieConcerne['nb_cycles']}/>
                    </div>
                    <div className="form-group col-sm-6">
                      <label htmlFor="bms">BMS</label>
                      <input type="text" className="form-control" id="bms" placeholder="BMS" defaultValue = {this.state.batterieConcerne['bms']}/>
                    </div>
                    <div className="form-group col-sm-6">
                      <label htmlFor="identifiant_bms">Identifiant du BMS</label>
                      <input type="text" className="form-control" id="identifiant_bms" placeholder="Identifiant du BMS" defaultValue = {this.state.batterieConcerne['identifiant_bms']}/>
                    </div>
                    <div className="form-group col-sm-12">
                      <label htmlFor="identifiant">Identifiant</label>
                      <input type="text" className="form-control" id="identifiant" placeholder="Identifiant" defaultValue = {this.state.batterieConcerne['identifiant']}/>
                    </div>
                    <div className="form-group col-sm-12">
                      <label htmlFor="statut">Statut</label>
                      <select className="form-control" id="statut" placeholder="Statut" defaultValue = {this.state.batterieConcerne['statut']}>
                        {
                          this.state.statutsClesData.map((instance,index)=>{
                            return <option value={instance['id_statutcle']}>{instance['lib_statutcle']}</option>
                          })
                        }
                      </select>
                    </div>
                  </div>
                </div>
                {!this.state.isModifierBatterieSuccess?<span className="help-block text-danger">Error </span>:null}
              </ModalBody>
              <ModalFooter>
                <button type="button" className="btn btn-sm btn-success" onClick={this.modifierBatterieData}>Submit</button>
                <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleModifierBatterieModal}>Cancel</button>
              </ModalFooter>
            </Modal>:null
          }
        </div>
      </div>
    );
  }
}
