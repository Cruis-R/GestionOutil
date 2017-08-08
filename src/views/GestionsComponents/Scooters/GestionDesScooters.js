import ReactDOM from 'react-dom'
import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter, Button, Progress } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import classnames from 'classnames';
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
export default class GestionDesScooters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      isInsertScooterModal : false,
      isAssocierContratModal : false,
      isAssocierBoitierModal : false,
      isInfoCompletModal : false,
      isScooterContratModal : false,
      isAttribuerScooter : false,
      contratModalType : 1,
      boitierModalType : 1,
      scooterConcerne : {}
    }
    this.toggle = this.toggle.bind(this);
    this.toggleInsertScooterModal = this.toggleInsertScooterModal.bind(this);
    this.toggleAssocierContratModal = this.toggleAssocierContratModal.bind(this);
    this.toggleAssocierBoitierModal = this.toggleAssocierBoitierModal.bind(this);
    this.toggleInfoCompletModal = this.toggleInfoCompletModal.bind(this);
    this.toggleAttribuerScooter = this.toggleAttribuerScooter.bind(this);
    this.toggleScooterContratModal = this.toggleScooterContratModal.bind(this);
    this.scootersGestionFormatter = this.scootersGestionFormatter.bind(this);
    this.scootersBoitierFormatter = this.scootersBoitierFormatter.bind(this);
    this.scootersContratFormatter = this.scootersContratFormatter.bind(this);
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
      isInsertScooterModal : !this.state.isInsertScooterModal
    });
  }
  toggleAssocierContratModal(data,type){
    console.log("toggleAssocierContratModal data",data,"type",type);
    this.setState({
      isAssocierContratModal : !this.state.isAssocierContratModal,
      scooterConcerne : data,
      contratModalType : type
    });
  }
  toggleAssocierBoitierModal(data,type){
    console.log("toggleAssocierBoitierModal data",data,"type",type);
    this.setState({
      isAssocierBoitierModal : !this.state.isAssocierBoitierModal,
      scooterConcerne : data,
      boitierModalType : type
    });
  }
  toggleInfoCompletModal(data){
    console.log("toggleInfoCompletModal data",data);
    this.setState({
      isInfoCompletModal : !this.state.isInfoCompletModal,
      scooterConcerne : data
    });
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
        <button type="button" className="btn btn-success btn-sm col-sm-6" onClick={()=>this.toggleInfoCompletModal(row)}>Afficher</button>{' '}
        <button type="button" className="btn btn-info btn-sm col-sm-6" onClick={()=>this.toggleScooterContratModal(row)}>Voir Contrat</button>
      </div>
    );
  }
  scooterStatutFormatter(cell,row){
    return (
      <div>
        <button type="button" className={classnames("btn btn-sm col-sm-12",{ "btn-info" : cell==='1',"btn-success" : cell==='2',"btn-danger" : cell==='3', "btn-warning" : cell==='4'})}>{statut[cell]}</button>
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
                    <option value='1'>{statut['1']}</option>
                    <option value='2'>{statut['2']}</option>
                    <option value='3'>{statut['3']}</option>
                    <option value='4'>{statut['4']}</option>
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
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-sm btn-success" onClick={this.toggleInsertScooterModal}>Submit</button>
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
  render(){
    let cur = this;
    const optionsScooters = {
      insertBtn: cur.scootersInsertButton,
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
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '3' })}
                  onClick={() => { this.toggle('3'); }}>
                  Rapport Mensuel
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
                      data={ data }
                      headerStyle = { { "background-color" : "#63c2de" } }
                      insertRow
                      search>

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

              </TabPane>
              <TabPane tabId="3">

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
                    <input type="text" className="form-control" id="id_boitier" placeholder="Boitier ID" defaultValue = {this.state.boitierModalType===1?"":this.state.scooterConcerne["id_boitier"]} disabled={this.state.boitierModalType!==1}/>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <button type="button" className="btn btn-sm btn-success" onClick={this.toggleAssocierBoitierModal}>Submit</button>
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
                    <input type="text" className="form-control" id="id_contrat" placeholder="Contrat ID" defaultValue = {this.state.contratModalType===1?null:this.state.scooterConcerne["id_contrat"]} disabled={this.state.contratModalType!==1}/>
                  </div>
                  {
                    this.state.contratModalType!==1?
                    <div>
                      <div className="form-group col-sm-12">
                        <label htmlFor="statut">Statut</label>
                        <select className="form-control" id="statut" placeholder="Statut">
                          <option value='1'>{statut['1']}</option>
                          <option value='2'>{statut['2']}</option>
                          <option value='3'>{statut['3']}</option>
                          <option value='4'>{statut['4']}</option>
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
                            <input type="text" className="form-control" id="id_scooter" placeholder="Nouveau Scooter ID"/>
                          </div>:null
                        }
                      </div>
                    </div>:null
                  }
                </div>
              </ModalBody>
              <ModalFooter>
                <button type="button" className="btn btn-sm btn-success" onClick={this.toggleAssocierContratModal}>Submit</button>
                <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleAssocierContratModal}>Cancel</button>
              </ModalFooter>
            </Modal>:null
          }
          {

            this.state.isInfoCompletModal?
            <Modal className='modal-lg modal-info' isOpen={this.state.isInfoCompletModal} toggle={this.toggleInfoCompletModal}>
              <ModalHeader toggle={this.toggleInfoCompletModal}>Information du Scooter</ModalHeader>
              <ModalBody>
                <div className="row">
                  <div className="col-sm-6 col-lg-3">
                    <div className="card">
                      <div className="card-block">
                        <div>{this.state.scooterConcerne["immat"]}</div>
                        <small className="text-muted">No° d&#39;immatriculation</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-lg-3">
                    <div className="card">
                      <div className="card-block">
                        <div>{this.state.scooterConcerne["type_usage"]}</div>
                        <small className="text-muted">Type d&#39;usage</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-lg-3">
                    <div className="card">
                      <div className="card-block">
                        <div>{this.state.scooterConcerne["date_immat"]}</div>
                        <small className="text-muted">Date d&#39;immatriculation</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-lg-3">
                    <div className="card">
                      <div className="card-block">
                        <div>{this.state.scooterConcerne["date_immat"]}</div>
                        <small className="text-muted">Dates de révision</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-group">
                  <div className="card card-inverse card-info">
                    <div className="card-block">
                      <div className="h1 text-muted text-right mb-2">
                        <i className="icon-speedometer"></i>
                      </div>
                      <div className="h4 mb-0">{this.state.scooterConcerne["taux"]?this.state.scooterConcerne["taux"]:"555 E"}</div>
                      <small className="text-muted text-uppercase font-weight-bold">Taux</small>
                    </div>
                  </div>
                  <div className="card card-inverse card-primary">
                    <div className="card-block">
                      <div className="h1 text-muted text-right mb-2">
                        <i className="icon-speedometer"></i>
                      </div>
                      <div className="h4 mb-0">{this.state.scooterConcerne["temp"]?this.state.scooterConcerne["temp"]:"500 h"}</div>
                      <small className="text-muted text-uppercase font-weight-bold">Temp d&#39;usage</small>
                    </div>
                  </div>
                  <div className="card card-inverse card-success">
                    <div className="card-block">
                      <div className="h1 text-muted text-right mb-2">
                        <i className="icon-speedometer"></i>
                      </div>
                      <div className="h4 mb-0">100 KM</div>
                      <small className="text-muted text-uppercase font-weight-bold">Km Total</small>
                    </div>
                  </div>
                  <div className="card card-inverse card-warning">
                    <div className="card-block">
                      <div className="h1 text-muted text-right mb-2">
                        <i className="icon-speedometer"></i>
                      </div>
                      <div className="h4 mb-0">1</div>
                      <small className="text-muted text-uppercase font-weight-bold">Intervention</small>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <div className="card">
                      <div className="card-block p-3 clearfix">
                        <i className="fa fa-laptop bg-info p-3 font-2xl mr-3 float-left"></i>
                        <div className="h5 text-info mb-0 mt-2">50.2 KM</div>
                        <div className="text-muted text-uppercase font-weight-bold font-xs">Km Moyen par Mois</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="card">
                      <div className="card-block p-3 clearfix">
                        <i className="fa fa-moon-o bg-warning p-3 font-2xl mr-3 float-left"></i>
                        <div className="h5 text-warning mb-0 mt-2">20.3 KM</div>
                        <div className="text-muted text-uppercase font-weight-bold font-xs">Km en cour</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="card">
                      <div className="card-block p-3 clearfix">
                        <i className="fa fa-cogs bg-primary p-3 font-2xl mr-3 float-left"></i>
                        <div className="h5 text-primary mb-0 mt-2">80.2 KM</div>
                        <div className="text-muted text-uppercase font-weight-bold font-xs">Km année</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="card">
                      <div className="card-block p-3 clearfix">
                        <i className="fa fa-cogs bg-primary p-3 font-2xl mr-3 float-left"></i>
                        <div className="h5 text-primary mb-0 mt-2">65.2 KM/H</div>
                        <div className="text-muted text-uppercase font-weight-bold font-xs">Vitesse moyenne</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div>Détail des contrats affecté</div>
                  <div>Description des interventions par contrat et par conducteur</div>
                  <div>Position géographique du scooter</div>
                  <div>Nombre d’arrêt sur un période</div>
                  <div>Visualisation des parcours sur une période</div>
                </div>
              </ModalBody>
              <ModalFooter>
                <button type="button" className="btn btn-sm btn-success" onClick={this.toggleInfoCompletModal}>Submit</button>
                <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleInfoCompletModal}>Cancel</button>
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
                <button type="button" className="btn btn-sm btn-success" onClick={this.toggleScooterContratModal}>Submit</button>
                <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleScooterContratModal}>Cancel</button>
              </ModalFooter>
            </Modal>:null
          }
        </div>
      </div>
    );
  }
}
