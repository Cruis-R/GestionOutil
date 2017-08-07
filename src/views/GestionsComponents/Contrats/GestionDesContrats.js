import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import classnames from 'classnames';
const type_data = [{
  "id_type_contrat":"1",
  "nom":"Contrat_1",
  "description" : "Template_1",
  "niveau_service" : "Yuchao",
  "durée" : 12,
  "tarifmensuel" : 500,
  "assurance_rc" : "Allianz"
}];
const contrat_data=[{
  "id_contrat" : 1,
  "niveau_assurance": 1,
  "address" : "Denfert Rochereau",
  "datedebut" : "2017-08-03",
  "annexe_batterie" : "1",
  "annexe_chargeur" : "1",
  "annexe_accessoires" : "1",
  "annexe_scooter" : "1",
  "actif" : true
}]
export default class GestionDesContrats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      isInsertContratModal : false,
      isInsertTypeContratModal : false,
      isModifierContratModal : false,
      contratConcerne : null,
      isModifierTypeContratModal : false,
      isAssocierContratModal : false,
      typeAssocierContratModal : 1,
      typeContratConcerne : null
    }
    this.toggle = this.toggle.bind(this);
    this.toggleInsertContratModal = this.toggleInsertContratModal.bind(this);
    this.toggleInsertTypeContratModal = this.toggleInsertTypeContratModal.bind(this);
    this.toggleModifierContratModal = this.toggleModifierContratModal.bind(this);
    this.toggleModifierTypeContratModal = this.toggleModifierTypeContratModal.bind(this);
    this.toggleAssocierContratModal = this.toggleAssocierContratModal.bind(this);
    this.contratsGestionFormatter = this.contratsGestionFormatter.bind(this);
    this.contratsAssocierFormatter = this.contratsAssocierFormatter.bind(this);
    this.typeContratGestionFormatter = this.typeContratGestionFormatter.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  toggleModifierContratModal(data){
    this.setState({
      isModifierContratModal : !this.state.isModifierContratModal,
      contratConcerne : data
    });
  }
  toggleModifierTypeContratModal(data){
    this.setState({
      isModifierTypeContratModal : !this.state.isModifierTypeContratModal,
      typeContratConcerne : data
    });
  }
  toggleInsertContratModal(){
    this.setState({
      isInsertContratModal : !this.state.isInsertContratModal
    });
  }
  toggleInsertTypeContratModal(){
    this.setState({
      isInsertTypeContratModal : !this.state.isInsertTypeContratModal
    });
  }
  toggleAssocierContratModal(type,data){
    this.setState({
      isAssocierContratModal : !this.state.isAssocierContratModal,
      typeAssocierContratModal : type,
      contratConcerne : data
    });
  }
  contratsGestionFormatter(cell,row){
    return (
      <div>
        <button type="button" className="btn btn-success btn-sm col-sm-4" onClick={()=>this.toggleModifierContratModal(row)}>Afficher/Modifier</button>
        <button type="button" className="btn btn-info btn-sm col-sm-4" disabled>Scooters</button>
        <button type="button" className="btn btn-danger btn-sm col-sm-4" disabled>Clore</button>
      </div>
    );
  }
  contratsAssocierFormatter(cell,row){
    if(cell){
      return(<button type="button" className="btn btn-danger btn-sm col" onClick = {()=>this.toggleAssocierContratModal(2,row)}>Dissocier</button>)
    }else {
      return(<button type="button" className="btn btn-success btn-sm col"onClick = {()=>this.toggleAssocierContratModal(1,row)}>Associer</button>)
    }
  }
  typeContratGestionFormatter(cell,row){
    return (
      <div>
        <button type="button" className="btn btn-success btn-sm col-sm-6" onClick={()=>this.toggleModifierTypeContratModal(row)}>Modifier</button>
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
  contratsInsertButton = () => {
    return (
      <div>
        <button type="button" className="btn btn-info btn-md" onClick = {this.toggleInsertContratModal}>Ajouter un Nouveau Contrat</button>
        <Modal className="modal-info modal-lg" isOpen={this.state.isInsertContratModal} toggle={this.toggleInsertContratModal}>
          <ModalHeader toggle={this.toggleInsertContratModal}>Ajouter un Nouveau Contrat</ModalHeader>
          <ModalBody>
            <div>
              <div className="row">
                <div className="form-group col-sm-6">
                  <label htmlFor="id_contrat">Contrat ID</label>
                  <input type="text" className="form-control" id="id_contrat" placeholder="Contrat ID"/>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="niveau_assurance">Niveau Assurance</label>
                  <input type="text" className="form-control" id="niveau_assurance" placeholder="Niveau Assurance"/>
                </div>
              </div>
              <div className="row">
                <div className="form-group col-sm-12">
                  <label htmlFor="datedebut">Date Début</label>
                  <input type="date" className="form-control" id="datedebut" placeholder="Date Début"/>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="annexe_scooter">Annexe Scooter</label>
                <input type="text" className="form-control" id="annexe_scooter" placeholder="Annexe Scooter"/>
              </div>
              <div className="row">
                <div className="form-group col-sm-4">
                  <label htmlFor="annexe_accessoires">Annexe Accessoires</label>
                  <input type="text" className="form-control" id="annexe_accessoires" placeholder="Annexe Accessoires"/>
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="annexe_batterie">Annexe Batterie</label>
                  <input type="text" className="form-control" id="annexe_batterie" placeholder="Annexe Batterie"/>
                </div>
                <div className="form-group col-sm-4">
                  <label htmlFor="annexe_chargeur">Annexe Chargeur</label>
                  <input type="text" className="form-control" id="annexe_chargeur" placeholder="Annexe Chargeur"/>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-sm btn-success" onClick={this.toggleInsertContratModal}>Submit</button>
            <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleInsertContratModal}>Cancel</button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  typeContratsInsertButton = () => {
    return (
      <div>
        <button type="button" className="btn btn-info btn-md" onClick={this.toggleInsertTypeContratModal}>Ajouter un Nouveau TypeContrat</button>
        <Modal isOpen={this.state.isInsertTypeContratModal} toggle={this.toggleInsertTypeContratModal}>
          <ModalHeader toggle={this.toggleInsertTypeContratModal}>Ajouter un Nouveau TypeContrat</ModalHeader>
          <ModalBody>
            <div>
              <div className="row">
                <div className="form-group col-sm-6">
                  <label htmlFor="id_type_contrat">Contrat ID</label>
                  <input type="text" className="form-control" id="id_type_contrat" placeholder="Contrat Type ID"/>
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
            <button type="button" className="btn btn-sm btn-success" onClick={this.toggleInsertTypeContratModal}>Submit</button>
            <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleInsertTypeContratModal}>Cancel</button>
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
    const optionsContrats = {
      insertBtn: cur.contratsInsertButton,
      toolBar: this.createCustomToolBar
    }
    const optionsTypeContrats = {
      insertBtn: cur.typeContratsInsertButton
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
                  Contrats
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}>
                  TypeContrat
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <div className="card">
                  <div className="card-header">
                    <i className="fa fa-align-justify"></i> Gestion des Contrats
                  </div>
                  <div className="card-block">
                    <BootstrapTable
                      options = {optionsContrats}
                      data={ contrat_data }
                      headerStyle = { { "background-color" : "#63c2de" } }
                      insertRow>
                      <TableHeaderColumn
                        dataField="id_contrat"
                        isKey
                        dataSort>
                        ID
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="datedebut"
                        dataSort>
                        Date Début
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="address"
                        dataSort
                        width = "20%">
                        Address
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="flotte"
                        dataSort
                        dataFormat = {this.contratsAssocierFormatter}
                        tdStyle={{textAlign : "center"}}>
                        Flotte
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="actif"
                        dataSort
                        dataFormat = {this.actifFormatter}
                        tdStyle={{textAlign : "center"}}>
                        Actif
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField=""
                        dataFormat={ this.contratsGestionFormatter }
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
                  <i className="fa fa-user"></i> Gestion des TypeContrats
                </div>
                <div className="card-block">
                  <BootstrapTable
                    options = {optionsTypeContrats}
                    data = { type_data }
                    headerStyle = { { "background-color" : "#63c2de" } }
                    insertRow>
                    <TableHeaderColumn
                      dataField="id_type_contrat"
                      isKey
                      dataSort>
                      ID
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="nom"
                      dataSort>
                      Nom
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="description"
                      dataSort>
                      Description
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="niveau_service"
                      dataSort>
                      Niveau Service
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="tarifmensuel"
                      dataSort>
                      Mensualité
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="assurance_rc"
                      dataSort>
                      Assurance
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="durée"
                      dataSort>
                      Durée
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField=""
                      dataSort
                      dataFormat={ this.typeContratGestionFormatter }>
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
          this.state.isModifierContratModal?
          <Modal isOpen={this.state.isModifierContratModal} toggle={this.toggleModifierContratModal}>
            <ModalHeader toggle={this.toggleModifierContratModal}>Modifier un Contrat</ModalHeader>
            <ModalBody>
              <div>
                <div className="row">
                  <div className="form-group col-sm-6">
                    <label htmlFor="id_contrat">Contrat ID</label>
                    <input type="text" className="form-control" id="id_contrat" placeholder="Contrat ID" defaultValue={this.state.contratConcerne["id_contrat"]}/>
                  </div>
                  <div className="form-group col-sm-6">
                    <label htmlFor="niveau_assurance">Niveau Assurance</label>
                    <input type="text" className="form-control" id="niveau_assurance" placeholder="Niveau Assurance" defaultValue={this.state.contratConcerne["niveau_assurance"]}/>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-sm-12">
                    <label htmlFor="datedebut">Date Début</label>
                    <input type="date" className="form-control" id="datedebut" placeholder="Date Début" defaultValue={this.state.contratConcerne["datedebut"]}/>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="annexe_scooter">Annexe Scooter</label>
                  <input type="text" className="form-control" id="annexe_scooter" placeholder="Annexe Scooter" defaultValue={this.state.contratConcerne["annexe_scooter"]}/>
                </div>
                <div className="row">
                  <div className="form-group col-sm-4">
                    <label htmlFor="annexe_accessoires">Annexe Accessoires</label>
                    <input type="text" className="form-control" id="annexe_accessoires" placeholder="Annexe Accessoires" defaultValue={this.state.contratConcerne["annexe_accessoires"]}/>
                  </div>
                  <div className="form-group col-sm-4">
                    <label htmlFor="annexe_batterie">Annexe Batterie</label>
                    <input type="text" className="form-control" id="annexe_batterie" placeholder="Annexe Batterie" defaultValue={this.state.contratConcerne["annexe_batterie"]}/>
                  </div>
                  <div className="form-group col-sm-4">
                    <label htmlFor="annexe_chargeur">Annexe Chargeur</label>
                    <input type="text" className="form-control" id="annexe_chargeur" placeholder="Annexe Chargeur" defaultValue={this.state.contratConcerne["annexe_chargeur"]}/>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <button type="button" className="btn btn-sm btn-success" onClick={this.toggleModifierContratModal}>Submit</button>
              <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleModifierContratModal}>Cancel</button>
            </ModalFooter>
          </Modal>:null
        }
        {
          this.state.isModifierTypeContratModal?
          <Modal isOpen={this.state.isModifierTypeContratModal} toggle={this.toggleModifierTypeContratModal}>
            <ModalHeader toggle={this.toggleModifierTypeContratModal}>Modifier un TypeContrat</ModalHeader>
            <ModalBody>
              <div>
                <div className="row">
                  <div className="form-group col-sm-6">
                    <label htmlFor="id_type_contrat">Contrat ID</label>
                    <input type="text" className="form-control" id="id_type_contrat" placeholder="Contrat Type ID" defaultValue={this.state.typeContratConcerne["id_type_contrat"]}/>
                  </div>
                  <div className="form-group col-sm-6">
                    <label htmlFor="nom">Nom</label>
                    <input type="text" className="form-control" id="nom" placeholder="Nom" defaultValue={this.state.typeContratConcerne["nom"]}/>
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-sm-12">
                    <label htmlFor="description">Description</label>
                    <input type="text" className="form-control" id="description" placeholder="Description" defaultValue={this.state.typeContratConcerne["description"]}/>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="niveau_service">Niveau Service</label>
                  <input type="text" className="form-control" id="niveau_service" placeholder="Niveau Service" defaultValue={this.state.typeContratConcerne["niveau_service"]}/>
                </div>
                <div className="row">
                  <div className="form-group col-sm-4">
                    <label htmlFor="durée">Durée</label>
                    <input type="text" className="form-control" id="durée" placeholder="Durée" defaultValue={this.state.typeContratConcerne["durée"]}/>
                  </div>
                  <div className="form-group col-sm-4">
                    <label htmlFor="tarifmensuel">Mensualité</label>
                    <input type="text" className="form-control" id="tarifmensuel" placeholder="Mensualité" defaultValue={this.state.typeContratConcerne["tarifmensuel"]}/>
                  </div>
                  <div className="form-group col-sm-4">
                    <label htmlFor="assurance_rc">Assurance</label>
                    <input type="text" className="form-control" id="assurance_rc" placeholder="Assurance" defaultValue={this.state.typeContratConcerne["assurance_rc"]}/>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <button type="button" className="btn btn-sm btn-success" onClick={this.toggleModifierTypeContratModal}>Submit</button>
              <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleModifierTypeContratModal}>Cancel</button>
            </ModalFooter>
          </Modal>:null
        }
        {
          this.state.isAssocierContratModal?<Modal isOpen={this.state.isAssocierContratModal} toggle={this.toggleAssocierContratModal}>
            <ModalHeader toggle={this.toggleAssocierContratModal}>{this.state.typeAssocierContratModal===1?"Associer un Contrat":"Dissocier un Contrat"}</ModalHeader>
            <ModalBody>
              {this.state.typeAssocierContratModal===1?
                <div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="id_contrat">Contrat ID</label>
                    <input type="input" className="form-control" id="id_contrat" placeholder="Contrat ID" defaultValue={this.state.contratConcerne["id_contrat"]} disabled/>
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
                    <label htmlFor="id_contrat">Contrat ID</label>
                    <input type="input" className="form-control" id="id_contrat" placeholder="Contrat ID" defaultValue={this.state.contratConcerne["id_contrat"]} disabled/>
                  </div>
                  <div className="form-group col-sm-12">
                    <label htmlFor="id_flotte">Flotte ID</label>
                    <input type="input" className="form-control" id="id_flotte" placeholder="Flotte ID" defaultValue={this.state.contratConcerne["id_flotte"]} disabled/>
                  </div>
                  <div className="form-group col-sm-4">
                    <label htmlFor="mention">Mention</label>
                    <input type="text" className="form-control" id="mention" placeholder="Mention"/>
                  </div>
                </div>
              }
            </ModalBody>
            <ModalFooter>
              <button type="button" className="btn btn-sm btn-success" onClick={this.toggleAssocierContratModal}>Submit</button>
              <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleAssocierContratModal}>Cancel</button>
            </ModalFooter>
          </Modal>:null
        }
      </div>
    );
  }
}
/*


*/
