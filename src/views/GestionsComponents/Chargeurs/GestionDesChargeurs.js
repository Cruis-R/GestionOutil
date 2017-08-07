import ReactDOM from 'react-dom'
import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter, Button, Progress } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import classnames from 'classnames';
const data = [{
  "id_chargeur" : 1,
  "num_cruisrent" : "34",
  "statut" : '1',
  "date_production" : "2017-08-03" ,
  "date_acquisition" : "2017-08-03",
  "date_ajout" : "2017-08-03",
  "identifiant" : "001"
},{
  "id_chargeur" : 1,
  "num_cruisrent" : "34",
  "statut" : '2',
  "date_production" : "2017-08-03" ,
  "date_acquisition" : "2017-08-03",
  "date_ajout" : "2017-08-03",
  "identifiant" : "002"
},{
  "id_chargeur" : 1,
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
export default class GestionDesChargeurs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      isInsertChargeurModal : false,
      isAssocierLocataireModal : false,
      isInfoCompletModal : false,
      isChangerStatutModal : false,
      locataireModalType : 1,
      chargeurConcerne : {}
    }
    this.toggle = this.toggle.bind(this);
    this.toggleInsertChargeurModal = this.toggleInsertChargeurModal.bind(this);
    this.toggleAssocierLocataireModal = this.toggleAssocierLocataireModal.bind(this);
    this.toggleInfoCompletModal = this.toggleInfoCompletModal.bind(this);
    this.toggleChangerStatutModal = this.toggleChangerStatutModal.bind(this);
    this.chargeursGestionFormatter = this.chargeursGestionFormatter.bind(this);
    this.chargeursLocataireFormatter = this.chargeursLocataireFormatter.bind(this);
    this.chargeursStatutFormatter = this.chargeursStatutFormatter.bind(this);
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
      isInsertChargeurModal : !this.state.isInsertChargeurModal
    });
  }
  toggleAssocierLocataireModal(data,type){
    console.log("toggleAssocierLocataireModal data",data,"type",type);
    this.setState({
      isAssocierLocataireModal : !this.state.isAssocierLocataireModal,
      chargeurConcerne : data,
      locataireModalType : type
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
      chargeurConcerne : data
    });
  }
  chargeursGestionFormatter(cell,row){
    return (
      <div>
        <button type="button" className="btn btn-success btn-sm col-sm-12" onClick={()=>this.toggleInfoCompletModal(row)}>Afficher les Informations</button>
      </div>
    );
  }
  chargeursStatutFormatter(cell,row){
    return (
      <div>
        <button type="button" className={classnames("btn btn-sm col-sm-12",{ "btn-success" : cell==='1',"btn-info" : cell==='2',"btn-warning" : cell==='3'})} onClick={()=>this.toggleChangerStatutModal(row)}>{statut[cell]}</button>
      </div>
    );
  }
  chargeursLocataireFormatter(cell,row){
    if(!cell){
      return (
        <button type="button" className="btn btn-success btn-sm col-sm-12" onClick={()=>this.toggleAssocierLocataireModal(row,1)}>Associer</button>
      );
    }else {
      return (
        <button type="button" className="btn btn-danger btn-sm col-sm-12" onClick={()=>this.toggleAssocierLocataireModal(row,2)}>Dissocier</button>
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
                  <label htmlFor="date_acquisition">Date d'acquisition</label>
                  <input type="date" className="form-control" id="date_acquisition" placeholder="Date d'acquisition"/>
                </div>
                <div className="form-group col-sm-12">
                  <label htmlFor="date_ajout">Date d'ajout</label>
                  <input type="date" className="form-control" id="date_ajout" placeholder="Date d'ajout"/>
                </div>
                <div className="form-group col-sm-12">
                  <label htmlFor="identifiant">Identifiant</label>
                  <input type="text" className="form-control" id="identifiant" placeholder="Identifiant"/>
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
            <button type="button" className="btn btn-sm btn-success" onClick={this.toggleInsertChargeurModal}>Submit</button>
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
                      data={ data }
                      headerStyle = { { "background-color" : "#63c2de" } }
                      insertRow
                      search>
                      <TableHeaderColumn
                        dataField="id_chargeur"
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
                        dataFormat = {this.chargeursStatutFormatter}>
                        Statut
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="locataire"
                        dataSort
                        dataFormat={ this.chargeursLocataireFormatter }
                        tdStyle = {{"textAlign" : "center"}}>
                        Locataire
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField=""
                        dataFormat={ this.chargeursGestionFormatter }
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
            this.state.isAssocierLocataireModal?
            <Modal className='modal-lg modal-info' isOpen={this.state.isAssocierLocataireModal} toggle={this.toggleAssocierLocataireModal}>
              <ModalHeader toggle={this.toggleAssocierLocataireModal}>{this.state.locataireModalType===1?"Associer un Locataire":"Dissocier un Locataire"}</ModalHeader>
              <ModalBody>
                <div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="id_chargeur">Chargeur ID</label>
                    <input type="text" className="form-control" id="id_chargeur" placeholder="Chargeur ID" defaultValue = {this.state.chargeurConcerne["id_chargeur"]} disabled/>
                  </div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="id_contrat">Locataire ID</label>
                    <input type="text" className="form-control" id="id_contrat" placeholder="Locataire ID"/>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <button type="button" className="btn btn-sm btn-success" onClick={this.toggleAssocierLocataireModal}>Submit</button>
                <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleAssocierLocataireModal}>Cancel</button>
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
                        <small className="text-muted">Date d'Acquisition</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6 col-lg-3">
                    <div className="card">
                      <div className="card-block">
                        <div>{this.state.chargeurConcerne["date_ajout"]}</div>
                        <small className="text-muted">Date d'Ajout</small>
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
                  <div>Historique locataire</div>
                  <div>Historique des Batterie ayant été rechargé</div>
                </div>
              </ModalBody>
              <ModalFooter>
                <button type="button" className="btn btn-sm btn-success" onClick={this.toggleInfoCompletModal}>Submit</button>
                <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleInfoCompletModal}>Cancel</button>
              </ModalFooter>
            </Modal>:null
          }

        </div>
      </div>
    );
  }
}
