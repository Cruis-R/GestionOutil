import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import classnames from 'classnames';
const data = [{
  "id_user":"1",
  "username":"CruisR",
  "nom" : "QIAN",
  "prenom" : "Yuchao",
  "email" : "yuchao.qian@efrei.net",
  "tel" : "0650651584",
  "password" : "123456",
  "profil" : "1",
  "societe" : "mobion"
}];
const profil_data=[{
  "id_profil" : 1,
  "lib_profil": "Administrateur"
}]
export default class GestionDesScooters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isInsertScooterModal : false
    }
    this.toggle = this.toggle.bind(this);
    this.toggleInsertScooterModal = this.toggleInsertScooterModal.bind(this);
    this.state = {
      activeTab: '1'
    };
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
  scootersGestionFormatter(cell,row){
    return (
      <div>
        <button type="button" className="btn btn-success btn-sm col-sm-4">Afficher Info</button>
        <button type="button" className="btn btn-info btn-sm col-sm-4">Voir Contrat</button>
      </div>
    );
  }
  scootersBoitierFormatter(cell,row){
    if(!cell){
      return (
        <button type="button" className="btn btn-success btn-sm">Associer</button>
      );
    }else {
      return (
        <button type="button" className="btn btn-danger btn-sm">Dissocier</button>
      );
    }

  }
  scootersContratFormatter(cell,row){
    if(!cell){
      return (
        <button type="button" className="btn btn-success btn-sm">Associer</button>
      );
    }else {
      return (
        <button type="button" className="btn btn-danger btn-sm">Dissocier</button>
      );
    }
  }
  ProfilGestionFormatter(cell,row){
    return (
      <div>
        <button type="button" className="btn btn-success btn-sm col-sm-6">Modifier</button>
        <button type="button" className="btn btn-danger btn-sm col-sm-6">Supprimer</button>
      </div>
    );
  }
  scootersInsertButton = () => {
    return (
      <div>
        <button type="button" className="btn btn-primary btn-md" onClick = {this.toggleInsertScooterModal}>Ajouter un Nouveau Scooter</button>
        <Modal isOpen={this.state.isInsertScooterModal} toggle={this.toggleInsertScooterModal}>
          <ModalHeader toggle={this.toggleInsertScooterModal}>Ajouter un Nouveau Scooter</ModalHeader>
          <ModalBody>
            <div>
              <div className="row">
                <div className="form-group col-sm-6">
                  <label htmlFor="numero">Numéro CRUIS RENT</label>
                  <input type="text" className="form-control" id="numero" placeholder="Numéro CRUIS RENT"/>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="immat">Numéro d'immatriculation</label>
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
                <label htmlFor="date_immat">Date d'immatriculation</label>
                <input type="text" className="form-control" id="date_immat" placeholder="Date d'immatriculation"/>
              </div>
              <div className="form-group">
                <label htmlFor="composants">Détail des Composants consommables</label>
                <input type="text" className="form-control" id="composants" placeholder="Detail des composants"/>
              </div>
              <div className="row">
                <div className="form-group col-sm-6">
                  <label htmlFor="type_usage">Type d'usage</label>
                  <input type="text" className="form-control" id="type_usage" placeholder="Type d'usage"/>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="statut">Statut</label>
                  <input type="text" className="form-control" id="statut" placeholder="Statut"/>
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
                  <label htmlFor="num_contratassurance">Numéro de contrat d'assurance</label>
                  <input type="text" className="form-control" id="num_contratassurance" placeholder="Numéro de contrat d'assurance"/>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="debut_assurance">Date de début d'assurance</label>
                  <input type="text" className="form-control" id="debut_assurance" placeholder="Date de début d'assurance"/>
                </div>
                <div className="form-group col-sm-6">
                  <label htmlFor="duree_assurance">Durée de l'assurance</label>
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
  profilsInsertButton = () => {
    return (
      <div>
        <button type="button" className="btn btn-info btn-md">Ajouter un Nouveau Profil</button>
        <Modal isOpen={this.state.isInsertProfilModal} toggle={this.toggleInsertProfilModal}>
          <ModalHeader toggle={this.toggleInsertProfilModal}>Ajouter un Nouveau Utilisateur</ModalHeader>
          <ModalBody>
            <div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-user"></i></span>
                  <input type="text" id="id_profil" name="id_profil" className="form-control" placeholder="ID Profil"/>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-tag"></i></span>
                  <input type="text" id="lib_profil" name="lib_profil" className="form-control" placeholder="Nom de Profil"/>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-sm btn-success" onClick={this.toggleInsertProfilModal}>Submit</button>
            <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleInsertProfilModal}>Cancel</button>
          </ModalFooter>
        </Modal>
      </div>

    );
  }
  render(){
    let cur = this;
    const optionsScooters = {
      insertBtn: cur.scootersInsertButton
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
                    <i className="fa fa-align-justify"></i> Gestion des Utilisateurs
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
                        dataSort
                        width = "5%">
                        ID
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="num_cruisrent"
                        dataSort
                        width = "7%">
                        Numéro CruisRent
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="statut"
                        dataSort
                        width = "7%">
                        Statut
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="actif"
                        dataSort
                        width = "7%">
                        Active
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="boitier"
                        dataSort
                        dataFormat={ this.scootersBoitierFormatter }
                        tdStyle = {{"textAlign" : "center"}}
                        width = "10%">
                        Boitier
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="contrat"
                        dataSort
                        dataFormat={ this.scootersContratFormatter }
                        tdStyle = {{"textAlign" : "center"}}
                        width = "10%">
                        Contrat
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField=""
                        dataFormat={ this.scootersGestionFormatter }
                        tdStyle = {{"textAlign" : "center"}}>
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
        </div>
      </div>
    );
  }
}
/*


*/
