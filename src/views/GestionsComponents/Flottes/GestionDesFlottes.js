import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import classnames from 'classnames';
const data = [{
  "id_flotte":"1",
  "nom" : "CruisR",
  "date_ajout":"2017-08-03",
  "raison_sociale" : "123456",
  "address" : "82 rue Denfert Rochereau",
  "referent" : "0001",
  "poste" : "75012",
  "email" : "yuchao.qian@efrei.net",
  "tel" : "0650651584"
}];
export default class GestionDesFlottes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      isInsertFlotteModal : false,
      isModifierFlotteModal : false,
      flotteConcerne : null,
      profilConcerne : null
    }
    this.toggle = this.toggle.bind(this);
    this.toggleInsertFlotteModal = this.toggleInsertFlotteModal.bind(this);
    this.toggleModifierFlotteModal = this.toggleModifierFlotteModal.bind(this);
    this.flottesGestionFormatter = this.flottesGestionFormatter.bind(this);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  toggleModifierFlotteModal(data){
    this.setState({
      isModifierFlotteModal : !this.state.isModifierFlotteModal,
      flotteConcerne : data
    });
  }
  toggleInsertFlotteModal(){
    this.setState({
      isInsertFlotteModal : !this.state.isInsertFlotteModal
    });
  }
  flottesGestionFormatter(cell,row){
    return (
      <div>
        <button type="button" className="btn btn-success btn-sm col-sm-3" onClick={()=>this.toggleModifierFlotteModal(row)}>Afflicher/Modifier</button>
        <button type="button" className="btn btn-info btn-sm col-sm-3">Afflicher Info Globale</button>
        <button type="button" className="btn btn-danger btn-sm col-sm-3">Afflicher Contrats</button>
        <button type="button" className="btn btn-primary btn-sm col-sm-3">Transférer Contrats</button>
      </div>
    );
  }
  flottesInsertButton = () => {
    return (
      <div>
        <button type="button" className="btn btn-info btn-md" onClick = {this.toggleInsertFlotteModal}>Ajouter un Nouveau Flotte</button>
        <Modal isOpen={this.state.isInsertFlotteModal} toggle={this.toggleInsertFlotteModal}>
          <ModalHeader toggle={this.toggleInsertFlotteModal}>Ajouter un Nouveau Flotte</ModalHeader>
          <ModalBody>
            <div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-tag"></i></span>
                  <span className="input-group-addon col-3">Nom</span>
                  <input type="text" id="nom" name="nom" className="form-control" placeholder="Nom"/>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-calendar"></i></span>
                  <span className="input-group-addon col-3">Date de Création</span>
                  <input type="date" id="date_ajout" name="motdepasse" className="form-control" placeholder="Date de Création"/>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-archive"></i></span>
                  <span className="input-group-addon col-3">Raison Sociale</span>
                  <input type="text" id="raison_sociale" name="profil" className="form-control" placeholder="Raison Sociale"/>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-home"></i></span>
                  <span className="input-group-addon col-3">Address</span>
                  <input type="text" id="address" name="societe" className="form-control" placeholder="Address"/>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-search"></i></span>
                  <span className="input-group-addon col-3">Référent</span>
                  <input type="text" id="referent" name="societe" className="form-control" placeholder="Référent"/>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-suitcase"></i></span>
                  <span className="input-group-addon col-3">Poste</span>
                  <input type="text" id="poste" name="societe" className="form-control" placeholder="Poste"/>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
                  <span className="input-group-addon col-3">Email</span>
                  <input type="email" id="email" name="email" className="form-control" placeholder="Email"/>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-phone"></i></span>
                  <span className="input-group-addon col-3">Tel</span>
                  <input type="tel" id="tel" name="tel" className="form-control" placeholder="Tel"/>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-sm btn-success" onClick={this.toggleInsertFlotteModal}>Submit</button>
            <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleInsertFlotteModal}>Cancel</button>
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
    const optionsFlottes = {
      insertBtn: cur.flottesInsertButton,
      toolBar: this.createCustomToolBar
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
                  Flottes
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId="1">
                <div className="card">
                  <div className="card-header">
                    <i className="fa fa-align-justify"></i> Gestion des Flottes
                  </div>
                  <div className="card-block">
                    <BootstrapTable
                      options = {optionsFlottes}
                      data={ data }
                      headerStyle = { { "background-color" : "#63c2de" } }
                      insertRow>
                      <TableHeaderColumn
                        dataField="id_flotte"
                        isKey
                        dataSort
                        width = "15%">
                        ID
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="nom"
                        dataSort
                        width = "15%">
                        Nom
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField=""
                        dataFormat={ this.flottesGestionFormatter }
                        width = "30%">
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
          this.state.isModifierFlotteModal?
          <Modal isOpen={this.state.isModifierFlotteModal} toggle={this.toggleModifierFlotteModal}>
            <ModalHeader toggle={this.toggleModifierFlotteModal}>Afficher/Modifier un Flotte</ModalHeader>
            <ModalBody>
              <div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-tag"></i></span>
                    <span className="input-group-addon col-3">Nom</span>
                    <input type="text" id="nom" name="nom" className="form-control" placeholder="Nom" defaultValue={this.state.flotteConcerne['nom']}/>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-calendar"></i></span>
                    <span className="input-group-addon col-3">Date de Création</span>
                    <input type="date" id="date_ajout" name="motdepasse" className="form-control" placeholder="Date de Création" defaultValue={this.state.flotteConcerne['date_ajout']}/>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-archive"></i></span>
                    <span className="input-group-addon col-3">Raison Sociale</span>
                    <input type="text" id="raison_sociale" name="profil" className="form-control" placeholder="Raison Sociale" defaultValue={this.state.flotteConcerne['raison_sociale']}/>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-home"></i></span>
                    <span className="input-group-addon col-3">Address</span>
                    <input type="text" id="address" name="societe" className="form-control" placeholder="Address" defaultValue={this.state.flotteConcerne['address']}/>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-search"></i></span>
                    <span className="input-group-addon col-3">Référent</span>
                    <input type="text" id="referent" name="societe" className="form-control" placeholder="Référent" defaultValue={this.state.flotteConcerne['referent']}/>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-suitcase"></i></span>
                    <span className="input-group-addon col-3">Poste</span>
                    <input type="text" id="poste" name="societe" className="form-control" placeholder="Poste" defaultValue={this.state.flotteConcerne['poste']}/>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
                    <span className="input-group-addon col-3">Email</span>
                    <input type="email" id="email" name="email" className="form-control" placeholder="Email" defaultValue={this.state.flotteConcerne['email']}/>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-phone"></i></span>
                    <span className="input-group-addon col-3">Tel</span>
                    <input type="tel" id="tel" name="tel" className="form-control" placeholder="Tel" defaultValue={this.state.flotteConcerne['tel']}/>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <button type="button" className="btn btn-sm btn-success" onClick={this.toggleModifierFlotteModal}>Submit</button>
              <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleModifierFlotteModal}>Cancel</button>
            </ModalFooter>
          </Modal>:null
        }

      </div>
    );
  }
}
/*


*/
