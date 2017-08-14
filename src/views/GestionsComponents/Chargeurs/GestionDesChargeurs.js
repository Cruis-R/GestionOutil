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
  "client" : "CruisR",
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
export default class GestionDesChargeurs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      isInsertChargeurModal : false,
      isInsertChargeurSuccess : true,
      isAssocierClientModal : false,
      isAssocierClientSuccess : true,
      isModifierChargeurModal : false,
      isModifierChargeurSuccess : true,
      isInfoCompletModal : false,
      isChangerStatutModal : false,
      isChangerStatutSuccess : true,
      clientModalType : 1,
      chargeurConcerne : {},
      chargeursData : [],
      statutsClesData : []
    }
    this.toggle = this.toggle.bind(this);
    this.toggleInsertChargeurModal = this.toggleInsertChargeurModal.bind(this);
    this.toggleModifierChargeurModal = this.toggleModifierChargeurModal.bind(this);
    this.toggleAssocierClientModal = this.toggleAssocierClientModal.bind(this);
    this.toggleInfoCompletModal = this.toggleInfoCompletModal.bind(this);
    this.toggleChangerStatutModal = this.toggleChangerStatutModal.bind(this);
    this.chargeursGestionFormatter = this.chargeursGestionFormatter.bind(this);
    this.chargeursClientFormatter = this.chargeursClientFormatter.bind(this);
    this.chargeursStatutFormatter = this.chargeursStatutFormatter.bind(this);
    this.addChargeurData = this.addChargeurData.bind(this);
    this.associerClient = this.associerClient.bind(this);
    this.changerStatut = this.changerStatut.bind(this);
    this.modifierChargeurData = this.modifierChargeurData.bind(this);
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
  associerClient(){
    const queryMethod = "PUT";
    const url = urlChargeurs + '/client';
    let data = {};
    data['id_chargeur'] = this.state.chargeurConcerne['id_chargeur'];
    data['id_client'] = document.getElementById('id_client').value;
    data['clientModalType'] = this.state.clientModalType;
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
            isAssocierClientSucess : false
          })
        }else {
          fetch(urlChargeurs)
          .then((response) => response.json())
          .then((responseJson)=>{
            this.setState({
              chargeursData : responseJson,
              isAssocierClientModal : !this.state.isAssocierClientModal
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
  toggleAssocierClientModal(data,type){
    console.log("toggleAssocierClientModal data",data,"type",type);
    this.setState({
      isAssocierClientModal : !this.state.isAssocierClientModal,
      isAssocierClientSuccess : true,
      chargeurConcerne : data,
      clientModalType : type
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
          {
            this.state.statutsClesData.map((instance)=>{
              if(instance['id_statutcle']===cell) return instance['lib_statutcle'];
            })
          }
        </button>
      </div>
    );
  }
  chargeursClientFormatter(cell,row){
    if(!cell){
      return (
        <button type="button" className="btn btn-success btn-sm col-sm-12" onClick={()=>this.toggleAssocierClientModal(row,1)}>Associer</button>
      );
    }else {
      return (
        <button type="button" className="btn btn-danger btn-sm col-sm-12" onClick={()=>this.toggleAssocierClientModal(row,2)}>Dissocier {cell}</button>
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
                        dataField="id_client"
                        dataSort
                        dataFormat={ this.chargeursClientFormatter }
                        filter={ { type: 'TextFilter', placeholder: "Client"} }
                        tdStyle = {{"textAlign" : "center"}}>
                        Client
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
            this.state.isAssocierClientModal?
            <Modal className='modal-lg modal-info' isOpen={this.state.isAssocierClientModal} toggle={this.toggleAssocierClientModal}>
              <ModalHeader toggle={this.toggleAssocierClientModal}>{this.state.clientModalType===1?"Associer un Client":"Dissocier un Client"}</ModalHeader>
              <ModalBody>
                <div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="id_chargeur">Chargeur ID</label>
                    <input type="text" className="form-control" id="id_chargeur" placeholder="Chargeur ID" defaultValue = {this.state.chargeurConcerne["id_chargeur"]} disabled/>
                  </div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="id_client">Client ID</label>
                    <input type="text" className="form-control" id="id_client" placeholder="Client ID" defaultValue = {this.state.clientModalType===1?null:this.state.chargeurConcerne["id_client"]} disabled={this.state.clientModalType!==1}/>
                  </div>
                </div>
                {!this.state.isAssocierClientSuccess?<span className="help-block text-danger">Error </span>:null}
              </ModalBody>
              <ModalFooter>
                <button type="button" className="btn btn-sm btn-success" onClick={this.associerClient}>Submit</button>
                <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleAssocierClientModal}>Cancel</button>
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
                        <div>{this.state.chargeurConcerne["date_production"]}</div>
                        <small className="text-muted">Date de Production</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-lg-3">
                    <div className="card">
                      <div className="card-block">
                        <div>{this.state.chargeurConcerne["date_acquisition"]}</div>
                        <small className="text-muted">Date d&#39;Acquisition</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-lg-3">
                    <div className="card">
                      <div className="card-block">
                        <div>{this.state.chargeurConcerne["date_ajout"]}</div>
                        <small className="text-muted">Date d&#39;Ajout</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-group">
                  <div className={classnames("card card-inverse",{ "card-success" : this.state.chargeurConcerne["statut"]==='1',"card-info" : this.state.chargeurConcerne["statut"]==='2',"card-warning" : this.state.chargeurConcerne["statut"]==='3'})}>
                    <div className="card-block">
                      <div className="h1 text-muted text-right mb-2">
                        <i className="icon-speedometer"></i>
                      </div>
                      <div className="h4 mb-0">{statut[this.state.chargeurConcerne["statut"]]}</div>
                      <small className="text-muted text-uppercase font-weight-bold">Statut</small>
                    </div>
                  </div>
                </div>
                <div>
                  <div>Historique client</div>
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
                      <input type="date" className="form-control" id="date_production" placeholder="Date de Production" defaultValue = {this.getUTCDate(this.state.chargeurConcerne["date_production"])}/>
                    </div>
                    <div className="form-group col-sm-12">
                      <label htmlFor="date_acquisition">Date d&#39;acquisition</label>
                      <input type="date" className="form-control" id="date_acquisition" placeholder="Date d'acquisition" defaultValue = {this.getUTCDate(this.state.chargeurConcerne["date_acquisition"])}/>
                    </div>
                    <div className="form-group col-sm-12">
                      <label htmlFor="date_ajout">Date d&#39;ajout</label>
                      <input type="date" className="form-control" id="date_ajout" placeholder="Date d'ajout" defaultValue = {this.getUTCDate(this.state.chargeurConcerne["date_ajout"])}/>
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
