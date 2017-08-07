import ReactDOM from 'react-dom'
import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter, Button, Progress } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import classnames from 'classnames';
const data = [{
  "id_boitier" : 1,
  "code_puk" : "34",
  "code_pin" : "34",
  "forfait" : "34",
  "statut" : '1',
  "num_tel" : "0650651584",
  "password" : "123456",
  "imei" : "837741364846543",
  "date_reception" : "2017-08-03" ,
  "data_acuisition" : "2017-08-03",
  "date_activation" : "2017-08-03",
  "date_ajout" : "2017-08-03",
  "identifiant" : "001",
  "locataire" : "CruisR"
},{
  "id_boitier" : 2,
  "code_puk" : "34",
  "code_pin" : "34",
  "forfait" : "34",
  "statut" : '2',
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
  "statut" : '3',
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
export default class GestionDesBoitiers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      isInsertBoitierModal : false,
      isAssocierScooterModal : false,
      isAfficherBoitierModal : false,
      isChangerStatutModal : false,
      scooterModalType : 1,
      boitierConcerne : {}
    }
    this.toggle = this.toggle.bind(this);
    this.toggleInsertBoitierModal = this.toggleInsertBoitierModal.bind(this);
    this.toggleAssocierScooterModal = this.toggleAssocierScooterModal.bind(this);
    this.toggleAfficherBoitierModal = this.toggleAfficherBoitierModal.bind(this);
    this.toggleChangerStatutModal = this.toggleChangerStatutModal.bind(this);
    this.boitiersGestionFormatter = this.boitiersGestionFormatter.bind(this);
    this.boitiersScooterFormatter = this.boitiersScooterFormatter.bind(this);
    this.boitiersStatutFormatter = this.boitiersStatutFormatter.bind(this);
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
      isInsertBoitierModal : !this.state.isInsertBoitierModal
    });
  }
  toggleAssocierScooterModal(data,type){
    console.log("toggleAssocierScooterModal data",data,"type",type);
    this.setState({
      isAssocierScooterModal : !this.state.isAssocierScooterModal,
      boitierConcerne : data,
      scooterModalType : type
    });
  }
  toggleAfficherBoitierModal(data){
    console.log("toggleAfficherBoitierModal data",data);
    this.setState({
      isAfficherBoitierModal : !this.state.isAfficherBoitierModal,
      boitierConcerne : data
    });
  }
  toggleChangerStatutModal(data){
    this.setState({
      isChangerStatutModal : !this.state.isChangerStatutModal,
      boitierConcerne : data
    });
  }
  boitiersGestionFormatter(cell,row){
    return (
      <div>
        <button type="button" className="btn btn-success btn-sm col-sm-12" onClick={()=>this.toggleAfficherBoitierModal(row)}>Afficher les Informations</button>
      </div>
    );
  }
  boitiersStatutFormatter(cell,row){
    return (
      <div>
        <button type="button" className={classnames("btn btn-sm col-sm-12",{ "btn-success" : cell==='1',"btn-info" : cell==='2',"btn-warning" : cell==='3'})} onClick={()=>this.toggleChangerStatutModal(row)}>{statut[cell]}</button>
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
        <button type="button" className="btn btn-danger btn-sm col-sm-12" onClick={()=>this.toggleAssocierScooterModal(row,2)}>Dissocier</button>
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
                  <label htmlFor="date_acquisition">Date d'acquisition</label>
                  <input type="date" className="form-control" id="date_acquisition" placeholder="Date d'acquisition"/>
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="date_activation">Date d'activation</label>
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
                    <option value='1'>{statut['1']}</option>
                    <option value='2'>{statut['2']}</option>
                    <option value='3'>{statut['3']}</option>
                  </select>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-sm btn-success" onClick={this.toggleInsertBoitierModal}>Submit</button>
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
                      data={ data }
                      headerStyle = { { "background-color" : "#63c2de" } }
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
                        dataField="scooter"
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
                    <label htmlFor="id_contrat">Scooter ID</label>
                    <input type="text" className="form-control" id="id_contrat" placeholder="Scooter ID"/>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <button type="button" className="btn btn-sm btn-success" onClick={this.toggleAssocierScooterModal}>Submit</button>
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
                      <option value='1'>{statut['1']}</option>
                      <option value='2'>{statut['2']}</option>
                      <option value='3'>{statut['3']}</option>
                    </select>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <button type="button" className="btn btn-sm btn-success" onClick={this.toggleChangerStatutModal}>Submit</button>
                <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleChangerStatutModal}>Cancel</button>
              </ModalFooter>
            </Modal>:null
          }
          {
            this.state.isAfficherBoitierModal?
            <Modal className='modal-lg modal-info' isOpen={this.state.isAfficherBoitierModal} toggle={this.toggleAfficherBoitierModal}>
              <ModalHeader toggle={this.toggleAfficherBoitierModal}>Afficher/Modifier un Boitier</ModalHeader>
              <ModalBody>
                <div className="row">
                  <div className="form-group col-sm-4">
                    <label htmlFor="date_reception">Date de Reception</label>
                    <input type="date" className="form-control" id="date_reception" placeholder="Date de Reception" defaultValue={this.state.boitierConcerne["date_reception"]}/>
                  </div>
                  <div className="form-group col-sm-4">
                    <label htmlFor="date_acquisition">Date d'acquisition</label>
                    <input type="date" className="form-control" id="date_acquisition" placeholder="Date d'acquisition" defaultValue={this.state.boitierConcerne["date_acquisition"]}/>
                  </div>
                  <div className="form-group col-sm-4">
                    <label htmlFor="date_activation">Date d'activation</label>
                    <input type="date" className="form-control" id="date_activation" placeholder="Date d'activation" defaultValue={this.state.boitierConcerne["date_activation"]}/>
                  </div>
                  <div className="form-group col-sm-6">
                    <label htmlFor="identifiant">Identifiant</label>
                    <input type="text" className="form-control" id="identifiant" placeholder="Identifiant" defaultValue={this.state.boitierConcerne["identifiant"]}/>
                  </div>
                  <div className="form-group col-sm-6">
                    <label htmlFor="imei">IMEI</label>
                    <input type="text" className="form-control" id="imei" placeholder="IMEI" defaultValue={this.state.boitierConcerne["imei"]}/>
                  </div>
                  <div className="form-group col-sm-6">
                    <label htmlFor="num_tel">Numéro de Téléphone</label>
                    <input type="text" className="form-control" id="num_tel" placeholder="Numéro de Téléphone" defaultValue={this.state.boitierConcerne["num_tel"]}/>
                  </div>
                  <div className="form-group col-sm-6">
                    <label htmlFor="forfait">Type de Forfait</label>
                    <input type="text" className="form-control" id="forfait" placeholder="Type de Forfait"defaultValue={this.state.boitierConcerne["forfait"]}/>
                  </div>
                  <div className="form-group col-sm-6">
                    <label htmlFor="code_puk">Code PUK</label>
                    <input type="text" className="form-control" id="code_puk" placeholder="Code PUK" defaultValue={this.state.boitierConcerne["code_puk"]}/>
                  </div>
                  <div className="form-group col-sm-6">
                    <label htmlFor="code_pin">Code PIN</label>
                    <input type="text" className="form-control" id="code_pin" placeholder="Code PIN" defaultValue={this.state.boitierConcerne["code_pin"]}/>
                  </div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="password">Mot de Passe</label>
                    <input type="text" className="form-control" id="password" placeholder="Mot de Passe" defaultValue={this.state.boitierConcerne["password"]}/>
                  </div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="statut">Statut</label>
                    <select className="form-control" id="statut" placeholder="Statut" defaultValue={this.state.boitierConcerne["statut"]}>
                      <option value='1'>{statut['1']}</option>
                      <option value='2'>{statut['2']}</option>
                      <option value='3'>{statut['3']}</option>
                    </select>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <button type="button" className="btn btn-sm btn-success" onClick={this.toggleAfficherBoitierModal}>Submit</button>
                <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleAfficherBoitierModal}>Cancel</button>
              </ModalFooter>
            </Modal>:null
          }

        </div>
      </div>
    );
  }
}
