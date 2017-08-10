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
      isInfoGlobaleModal : false,
      isTransfererContratsModal : false,
      isAfficherContratsModal : false,
      flotteConcerne : null,
      profilConcerne : null
    }
    this.toggle = this.toggle.bind(this);
    this.toggleInsertFlotteModal = this.toggleInsertFlotteModal.bind(this);
    this.toggleModifierFlotteModal = this.toggleModifierFlotteModal.bind(this);
    this.toggleInfoGlobaleModal = this.toggleInfoGlobaleModal.bind(this);
    this.toggleAfficherContratsModal = this.toggleAfficherContratsModal.bind(this);
    this.toggleTransfererContratsModal = this.toggleTransfererContratsModal.bind(this);
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
  toggleInfoGlobaleModal(data){
    this.setState({
      isInfoGlobaleModal : !this.state.isInfoGlobaleModal,
      flotteConcerne : data
    });
  }
  toggleAfficherContratsModal(data){
    this.setState({
      isAfficherContratsModal : !this.state.isAfficherContratsModal,
      flotteConcerne : data
    });
  }
  toggleTransfererContratsModal(data){
    this.setState({
      isTransfererContratsModal : !this.state.isTransfererContratsModal,
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
        <button type="button" data-toggle="tooltip" data-placement="top" title="Afflicher/Modifier" className="btn btn-success btn-sm col-lg-3" onClick={()=>this.toggleModifierFlotteModal(row)}>
        Afflicher/Modifier
        </button>
        <button type="button" data-toggle="tooltip" data-placement="top" title="Afflicher Info Globale" className="btn btn-info btn-sm col-lg-3" onClick={()=>this.toggleInfoGlobaleModal(row)}>
        Afflicher Info Globale
        </button>
        <button type="button" data-toggle="tooltip" data-placement="top" title="Afflicher Contrats" className="btn btn-primary btn-sm col-lg-3" onClick={()=>this.toggleAfficherContratsModal(row)}>
        Afflicher Contrats
        </button>
        <button type="button" data-toggle="tooltip" data-placement="top" title="Transférer Contrats" className="btn btn-danger btn-sm col-lg-3" onClick={()=>this.toggleTransfererContratsModal(row)}>
        Transférer Contrats
        </button>
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
                  <span className="input-group-addon col-1"><i className="fa fa-tag"></i></span>
                  <span className="input-group-addon col-3">Nom</span>
                  <input type="text" id="nom" name="nom" className="form-control" placeholder="Nom"/>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon col-1"><i className="fa fa-calendar"></i></span>
                  <span className="input-group-addon col-3">Date de Création</span>
                  <input type="date" id="date_ajout" name="motdepasse" className="form-control" placeholder="Date de Création"/>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon col-1"><i className="fa fa-archive"></i></span>
                  <span className="input-group-addon col-3">Raison Sociale</span>
                  <input type="text" id="raison_sociale" name="profil" className="form-control" placeholder="Raison Sociale"/>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon col-1"><i className="fa fa-home"></i></span>
                  <span className="input-group-addon col-3">Address</span>
                  <input type="text" id="address" name="societe" className="form-control" placeholder="Address"/>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon col-1"><i className="fa fa-search"></i></span>
                  <span className="input-group-addon col-3">Référent</span>
                  <input type="text" id="referent" name="societe" className="form-control" placeholder="Référent"/>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon col-1"><i className="fa fa-suitcase"></i></span>
                  <span className="input-group-addon col-3">Poste</span>
                  <input type="text" id="poste" name="societe" className="form-control" placeholder="Poste"/>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon col-1"><i className="fa fa-envelope"></i></span>
                  <span className="input-group-addon col-3">Email</span>
                  <input type="email" id="email" name="email" className="form-control" placeholder="Email"/>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon col-1"><i className="fa fa-phone"></i></span>
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
          <Modal className='modal-lg modal-success' isOpen={this.state.isModifierFlotteModal} toggle={this.toggleModifierFlotteModal}>
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
                    <input type="date" id="date_ajout" name="date_ajout" className="form-control" placeholder="Date de Création" defaultValue={this.state.flotteConcerne['date_ajout']}/>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-archive"></i></span>
                    <span className="input-group-addon col-3">Raison Sociale</span>
                    <input type="text" id="raison_sociale" name="raison_sociale" className="form-control" placeholder="Raison Sociale" defaultValue={this.state.flotteConcerne['raison_sociale']}/>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-home"></i></span>
                    <span className="input-group-addon col-3">Address</span>
                    <input type="text" id="address" name="address" className="form-control" placeholder="Address" defaultValue={this.state.flotteConcerne['address']}/>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-search"></i></span>
                    <span className="input-group-addon col-3">Référent</span>
                    <input type="text" id="referent" name="referent" className="form-control" placeholder="Référent" defaultValue={this.state.flotteConcerne['referent']}/>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon"><i className="fa fa-suitcase"></i></span>
                    <span className="input-group-addon col-3">Poste</span>
                    <input type="text" id="poste" name="poste" className="form-control" placeholder="Poste" defaultValue={this.state.flotteConcerne['poste']}/>
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
        {
          this.state.isInfoGlobaleModal?
          <Modal className='modal-lg modal-info' isOpen={this.state.isInfoGlobaleModal} toggle={this.toggleInfoGlobaleModal}>
            <ModalHeader toggle={this.toggleInfoGlobaleModal}>Information Globale de Flotte</ModalHeader>
            <ModalBody>
              <div className="row">
                <div className="col-sm-6 col-lg-3">
                  <div className="card">
                    <div className="card-block">
                      <div>{this.state.flotteConcerne["nom"]}</div>
                      <small className="text-muted">Nom</small>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                  <div className="card">
                    <div className="card-block">
                      <div>{this.state.flotteConcerne["raison_sociale"]}</div>
                      <small className="text-muted">Raison Sociale</small>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                  <div className="card">
                    <div className="card-block">
                      <div>{this.state.flotteConcerne["referent"]}</div>
                      <small className="text-muted">Référent</small>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-3">
                  <div className="card">
                    <div className="card-block">
                      <div>{this.state.flotteConcerne["date_ajout"]}</div>
                      <small className="text-muted">Date de Création</small>
                    </div>
                  </div>
                </div>
                <div className="card-group col-lg-12">
                  <div className="card card-inverse card-success">
                    <div className="card-block">
                      <div className="h1 text-muted text-right mb-2">
                        <i className="icon-speedometer"></i>
                      </div>
                      <div className="h4 mb-0">{this.state.flotteConcerne["contrats_actifs"]?this.state.flotteConcerne["contrats_actifs"]:"4"}</div>
                      <small className="text-muted text-uppercase font-weight-bold">nombre de contrats actifs</small>
                    </div>
                  </div>
                  <div className="card card-inverse card-warning">
                    <div className="card-block">
                      <div className="h1 text-muted text-right mb-2">
                        <i className="icon-speedometer"></i>
                      </div>
                      <div className="h4 mb-0">{this.state.flotteConcerne["nb_intervention"]?this.state.flotteConcerne["nb_intervention"]:"4"}</div>
                      <small className="text-muted text-uppercase font-weight-bold">nombre d’intervention</small>
                    </div>
                  </div>
                  <div className="card card-inverse card-danger">
                    <div className="card-block">
                      <div className="h1 text-muted text-right mb-2">
                        <i className="icon-speedometer"></i>
                      </div>
                      <div className="h4 mb-0">{this.state.flotteConcerne["nb_accident"]?this.state.flotteConcerne["nb_accident"]:"2"}</div>
                      <small className="text-muted text-uppercase font-weight-bold">nombre d’accident</small>
                    </div>
                  </div>
                </div>
                <div className="card-group col-lg-12">
                  <div className="card card-inverse card-success">
                    <div className="card-block">
                      <div className="h1 text-muted text-right mb-2">
                        <i className="icon-speedometer"></i>
                      </div>
                      <div className="h4 mb-0">{this.state.flotteConcerne["nb_scooters"]?this.state.flotteConcerne["nb_scooters"]:"2"}</div>
                      <small className="text-muted text-uppercase font-weight-bold">nombre de scooters en location</small>
                    </div>
                  </div>
                  <div className="card card-inverse card-primary">
                    <div className="card-block">
                      <div className="h1 text-muted text-right mb-2">
                        <i className="icon-speedometer"></i>
                      </div>
                      <div className="h4 mb-0">{this.state.flotteConcerne["nb_km"]?this.state.flotteConcerne["nb_km"]:"200"}</div>
                      <small className="text-muted text-uppercase font-weight-bold">nombre de Kilomètre total</small>
                    </div>
                  </div>
                  <div className="card card-inverse card-info">
                    <div className="card-block">
                      <div className="h1 text-muted text-right mb-2">
                        <i className="icon-speedometer"></i>
                      </div>
                      <div className="h4 mb-0">{this.state.flotteConcerne["nb_km_moyenne"]?this.state.flotteConcerne["nb_km_moyenne"]:"2"}</div>
                      <small className="text-muted text-uppercase font-weight-bold">moyenne de kilomètre par mois </small>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card">
                    <div className="card-block p-3 clearfix">
                      <i className="fa fa-laptop bg-primary p-3 font-2xl mr-3 float-left"></i>
                      <div className="h5 text-info mb-0 mt-2">{this.state.flotteConcerne["address"]}</div>
                      <div className="text-muted text-uppercase font-weight-bold font-xs">Address</div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card">
                    <div className="card-block p-3 clearfix">
                      <i className="fa fa-laptop bg-primary p-3 font-2xl mr-3 float-left"></i>
                      <div className="h5 text-info mb-0 mt-2">{this.state.flotteConcerne["poste"]}</div>
                      <div className="text-muted text-uppercase font-weight-bold font-xs">Poste</div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card">
                    <div className="card-block p-3 clearfix">
                      <i className="fa fa-laptop bg-primary p-3 font-2xl mr-3 float-left"></i>
                      <div className="h5 text-info mb-0 mt-2">{this.state.flotteConcerne["tel"]}</div>
                      <div className="text-muted text-uppercase font-weight-bold font-xs">Tel</div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card">
                    <div className="card-block p-3 clearfix">
                      <i className="fa fa-laptop bg-primary p-3 font-2xl mr-3 float-left"></i>
                      <div className="h5 text-info mb-0 mt-2">{this.state.flotteConcerne["email"]}</div>
                      <div className="text-muted text-uppercase font-weight-bold font-xs">Email</div>
                    </div>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <button type="button" className="btn btn-sm btn-primary" onClick={this.toggleInfoGlobaleModal}>Close</button>
            </ModalFooter>
          </Modal>:null
        }
        {
          this.state.isAfficherContratsModal?
          <Modal className='modal-lg modal-info' isOpen={this.state.isAfficherContratsModal} toggle={this.toggleAfficherContratsModal}>
            <ModalHeader toggle={this.toggleAfficherContratsModal}>Afficher l&#39;ensemble des Contrats</ModalHeader>
            <ModalBody>
              <div className="col-12">
                <div className="card">
                  <div className="card-block p-3 clearfix">
                    <div className="btn-group float-right ">
                      <button type="button" className="btn btn-lg btn-link"><i className="icon-settings"></i></button>
                    </div>
                    <i className="fa fa-laptop bg-primary p-3 font-2xl mr-3 float-left"></i>
                    <div className="h5 text-info mb-0 mt-2">Contrat 1</div>
                    <div className="text-muted text-uppercase font-weight-bold font-xs">Contrat</div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="card">
                  <div className="card-block p-3 clearfix">
                    <div className="btn-group float-right ">
                      <button type="button" className="btn btn-lg btn-link"><i className="icon-settings"></i></button>
                    </div>
                    <i className="fa fa-laptop bg-primary p-3 font-2xl mr-3 float-left"></i>
                    <div className="h5 text-info mb-0 mt-2">Contrat 2</div>
                    <div className="text-muted text-uppercase font-weight-bold font-xs">Contrat</div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div className="card">
                  <div className="card-block p-3 clearfix">
                    <div className="btn-group float-right ">
                      <button type="button" className="btn btn-lg btn-link"><i className="icon-settings"></i></button>
                    </div>
                    <i className="fa fa-laptop bg-primary p-3 font-2xl mr-3 float-left"></i>
                    <div className="h5 text-info mb-0 mt-2">Contrat 3</div>
                    <div className="text-muted text-uppercase font-weight-bold font-xs">Contrat</div>
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <button type="button" className="btn btn-sm btn-primary" onClick={this.toggleAfficherContratsModal}>Close</button>
            </ModalFooter>
          </Modal>:null
        }
        {
          this.state.isTransfererContratsModal?
          <Modal className='modal-lg modal-danger' isOpen={this.state.isTransfererContratsModal} toggle={this.toggleTransfererContratsModal}>
            <ModalHeader toggle={this.toggleTransfererContratsModal}>Transferer Contrats</ModalHeader>
            <ModalBody>
              <div className="row">
                <div className="form-group col-12">
                  <label htmlFor="id_flotte">Flotte Origine</label>
                  <input type="input" className="form-control" id="id_flotte" placeholder="Flotte Origine" defaultValue={this.state.flotteConcerne["id_flotte"]} disabled/>
                </div>
                <div className="form-group col-12">
                  <label htmlFor="id_flotte">Flotte Destination</label>
                  <input type="input" className="form-control" id="id_flotte" placeholder="Flotte Destination"/>
                </div>
                <div className="form-group col-12">
                  <label htmlFor="selectContrats">Selectionner les Contrats</label>
                  <select multiple className="form-control" id="selectContrats" size="5">
                    <option>Contrat 1</option>
                    <option>Contrat 2</option>
                    <option>Contrat 3</option>
                    <option>Contrat 4</option>
                    <option>Contrat 5</option>
                  </select>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <button type="button" className="btn btn-sm btn-success" onClick={this.toggleTransfererContratsModal}>Submit</button>
              <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleTransfererContratsModal}>Cancel</button>
            </ModalFooter>
          </Modal>:null
        }
      </div>
    );
  }
}
/*


*/
