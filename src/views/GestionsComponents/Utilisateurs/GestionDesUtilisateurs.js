import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import classnames from 'classnames';
import urls from '../configs/serverConfigurations'
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
const urlUtilisateurs = urls.utilisateurs;
const urlProfils = urls.profils;
export default class GestionDesUtilisateurs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: '1',
      userData : [],
      profilData : [],
      isInsertUtilisateurModal : false,
      isInsertUtilisateurSucess : true,
      isPasswordMatch : true,
      isInsertProfilModal : false,
      isInsertProfilSucess : true,
      isModifierUtilisateurModal : false,
      isModifierUtilisateurSuccess : true,
      isSupprimerProfilModal : false,
      isSupprimerProfilSuccess : true,
      isSupprimerUtilisateurModal : false,
      isSupprimerUtilisateurSuccess : true,
      isModifierProfilModal : false,
      isModifierProfilSuccess : true,
      utilisateurConcerne : null,
      profilConcerne : null
    }
    this.toggle = this.toggle.bind(this);
    this.toggleInsertUtilisateurModal = this.toggleInsertUtilisateurModal.bind(this);
    this.toggleInsertProfilModal = this.toggleInsertProfilModal.bind(this);
    this.toggleModifierUtilisateurModal = this.toggleModifierUtilisateurModal.bind(this);
    this.toggleModifierProfilModal = this.toggleModifierProfilModal.bind(this);
    this.toggleSupprimerProfilModal = this.toggleSupprimerProfilModal.bind(this);
    this.toggleSupprimerUtilisateurModal = this.toggleSupprimerUtilisateurModal.bind(this);
    this.modifyProfilData = this.modifyProfilData.bind(this);
    this.modifyUtilisateurData = this.modifyUtilisateurData.bind(this);
    this.addProfilData= this.addProfilData.bind(this);
    this.addUtilisateurData = this.addUtilisateurData.bind(this);
    this.deleteProfilData = this.deleteProfilData.bind(this);
    this.deleteUtilisateurData = this.deleteUtilisateurData.bind(this);
    this.utilisateursGestionFormatter = this.utilisateursGestionFormatter.bind(this);
    this.profilGestionFormatter = this.profilGestionFormatter.bind(this);
    this.profilsInsertButton = this.profilsInsertButton.bind(this);
  }
  componentDidMount(){
    this.getData();
  }
  getData(){
    fetch(urlUtilisateurs)
    .then((response) => response.json())
    .then((responseJson)=>{
      this.setState({
        userData : responseJson
      })
    })
    .catch((error) => {
      console.error(error);
    });
    fetch(urlProfils)
    .then((response) => response.json())
    .then((responseJson)=>{
      this.setState({
        profilData : responseJson
      })
    })
    .catch((error) => {
      console.error(error);
    });
  }
  //modifyProfilData type 1 =>change profil; type 2=> add new profil; type 3=> delete old profil
  modifyProfilData(){
    const queryMethod = "PUT";
    let data = {};
    data["id_profil"]= this.state.profilConcerne['id_profil'];
    data["lib_profil"]= document.getElementById("lib_profil").value;
    fetch(urlProfils,{
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
            isModifierProfilSuccess : false
          })
        }else{
          fetch(urlProfils)
          .then((response) => response.json())
          .then((responseJson)=>{
            this.setState({
              profilData : responseJson,
              isModifierProfilModal : !this.state.isModifierProfilModal
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
  modifyUtilisateurData(){
    const queryMethod = "PUT";
    let data = {};
    data["id_user"]= this.state.utilisateurConcerne['id_user'];
    data["username"]= document.getElementById("username").value;
    data["nom"]= document.getElementById("nom").value;
    data["prenom"]= document.getElementById("prenom").value;
    data["motdepasse"]= document.getElementById("motdepasse").value;
    data["profil"]= document.getElementById("profil").value;
    data["societe"]= document.getElementById("societe").value;
    data["email"]= document.getElementById("email").value;
    data["tel"]= document.getElementById("tel").value;
    fetch(urlUtilisateurs,{
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
            isModifierUtilisateurSuccess : false
          })
        }else{
          fetch(urlUtilisateurs)
          .then((response) => response.json())
          .then((responseJson)=>{
            this.setState({
              userData : responseJson,
              isModifierUtilisateurModal : !this.state.isModifierUtilisateurModal
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
  addProfilData(){
    const queryMethod = "POST";
    let data = {};
    data["id_profil"]= document.getElementById("id_profil").value;
    data["lib_profil"]= document.getElementById("lib_profil").value;
    fetch(urlProfils,{
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
            isInsertProfilSucess : false
          })
        }else {
          fetch(urlProfils)
          .then((response) => response.json())
          .then((responseJson)=>{
            this.setState({
              profilData : responseJson,
              isInsertProfilModal : !this.state.isInsertProfilModal
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
  deleteProfilData(){
    const queryMethod = "DELETE";
    let data = {};
    data["id_profil"]= this.state.profilConcerne['id_profil'];
    fetch(urlProfils,{
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
            isSupprimerProfilSuccess : false
          })
        }else {
          fetch(urlProfils)
          .then((response) => response.json())
          .then((responseJson)=>{
            this.setState({
              profilData : responseJson,
              isSupprimerProfilModal : !this.state.isSupprimerProfilModal
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
  addUtilisateurData(){
    /*username nom prenom motdepasse confirmermotdepasse profil societe email tel*/
    const queryMethod = "POST";
    let data = {};
    data["username"]= document.getElementById("username").value;
    data["nom"]= document.getElementById("nom").value;
    data["prenom"]= document.getElementById("prenom").value;
    data["motdepasse"]= document.getElementById("motdepasse").value;
    data["confirmermotdepasse"]= document.getElementById("confirmermotdepasse").value;
    data["profil"]= document.getElementById("profil").value;
    data["societe"]= document.getElementById("societe").value;
    data["email"]= document.getElementById("email").value;
    data["tel"]= document.getElementById("tel").value;
    if(data["motdepasse"]===data["confirmermotdepasse"]){
      this.setState({
        isPasswordMatch : true
      })
      fetch(urlUtilisateurs,{
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
              isInsertUtilisateurSucess : false
            })
          }else {
            fetch(urlUtilisateurs)
            .then((response) => response.json())
            .then((responseJson)=>{
              this.setState({
                userData : responseJson,
                isInsertUtilisateurModal : !this.state.isInsertUtilisateurModal
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
    }else {
      this.setState({
        isPasswordMatch : false,
        isInsertUtilisateurSucess : false
      })
    }
  }
  deleteUtilisateurData(){
    const queryMethod = "DELETE";
    let data = {};
    data["id_user"]= this.state.utilisateurConcerne["id_user"];
    fetch(urlUtilisateurs,{
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
            isSupprimerUtilisateurSuccess : false
          })
        }else {
          fetch(urlUtilisateurs)
          .then((response) => response.json())
          .then((responseJson)=>{
            this.setState({
              userData : responseJson,
              isSupprimerUtilisateurModal : !this.state.isSupprimerUtilisateurModal
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
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  toggleModifierUtilisateurModal(data){
    this.setState({
      isModifierUtilisateurModal : !this.state.isModifierUtilisateurModal,
      isModifierUtilisateurSuccess : true,
      utilisateurConcerne : data
    });
  }
  toggleModifierProfilModal(data){
    this.setState({
      isModifierProfilModal : !this.state.isModifierProfilModal,
      isModifierProfilSuccess : true,
      profilConcerne : data
    });
  }
  toggleSupprimerProfilModal(data){
    this.setState({
      isSupprimerProfilModal : !this.state.isSupprimerProfilModal,
      isSupprimerProfilSuccess : true,
      profilConcerne : data
    });
  }
  toggleSupprimerUtilisateurModal(data){
    this.setState({
      isSupprimerUtilisateurModal : !this.state.isSupprimerUtilisateurModal,
      isSupprimerUtilisateurSuccess : true,
      utilisateurConcerne : data
    });
  }
  toggleInsertUtilisateurModal(){
    this.setState({
      isInsertUtilisateurModal : !this.state.isInsertUtilisateurModal,
      isInsertUtilisateurSucess : true,
      isPasswordMatch : true
    });
  }
  toggleInsertProfilModal(){
    this.setState({
      isInsertProfilModal : !this.state.isInsertProfilModal,
      isInsertProfilSucess : true
    });
  }
  utilisateursGestionFormatter(cell,row){
    return (
      <div>
        <button type="button" className="btn btn-success btn-sm col-sm-4" onClick={()=>this.toggleModifierUtilisateurModal(row)}>Afficher/Modifier</button>
        <button type="button" className="btn btn-warning btn-sm col-sm-4">Désactiver</button>
        <button type="button" className="btn btn-danger btn-sm col-sm-4" onClick={()=>this.toggleSupprimerUtilisateurModal(row)}>Supprimer</button>
      </div>
    );
  }
  profilGestionFormatter(cell,row){
    return (
      <div>
        <button type="button" className="btn btn-success btn-sm col-sm-6" onClick={()=>this.toggleModifierProfilModal(row)}>Modifier</button>
        <button type="button" className="btn btn-danger btn-sm col-sm-6" onClick={()=>this.toggleSupprimerProfilModal(row)}>Supprimer</button>
      </div>
    );
  }
  utilisateursInsertButton = () => {
    return (
      <div>
        <button type="button" className="btn btn-info btn-md" onClick = {this.toggleInsertUtilisateurModal}>Ajouter un Nouveau Utilisateur</button>
        <Modal isOpen={this.state.isInsertUtilisateurModal} toggle={this.toggleInsertUtilisateurModal}>
          <ModalHeader toggle={this.toggleInsertUtilisateurModal}>Ajouter un Nouveau Utilisateur</ModalHeader>
          <ModalBody>
            <div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-user"></i></span>
                  <input type="text" id="username" name="username" className="form-control" placeholder="Username"/>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-tag"></i></span>
                  <input type="text" id="nom" name="nom" className="form-control" placeholder="Nom"/>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-tags"></i></span>
                  <input type="text" id="prenom" name="prenom" className="form-control" placeholder="Prenom"/>
                </div>
              </div>
              <div className="form-group">
                <div className= {classnames("input-group", { 'has-danger': !this.state.isPasswordMatch })}>
                  <span className="input-group-addon"><i className="fa fa-asterisk"></i></span>
                  <input type="password" id="motdepasse" name="motdepasse" className="form-control" placeholder="Mot de Passe"/>
                </div>
              </div>
              <div className="form-group">
                <div className= {classnames("input-group", { 'has-danger': !this.state.isPasswordMatch })}>
                  <span className="input-group-addon"><i className="fa fa-gavel"></i></span>
                  <input type="password" id="confirmermotdepasse" name="confirmermotdepasse" className="form-control" placeholder="Confirmer Mot de Passe"/>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-archive"></i></span>
                  <select className="form-control" id="profil" placeholder="Profil">
                  {
                    this.state.profilData.map((instance,index)=>{
                      return <option value={instance['id_profil']}>{instance['lib_profil']}</option>
                    })
                  }
                  </select>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-suitcase"></i></span>
                  <input type="text" id="societe" name="societe" className="form-control" placeholder="Société"/>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
                  <input type="email" id="email" name="email" className="form-control" placeholder="Email"/>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <span className="input-group-addon"><i className="fa fa-phone"></i></span>
                  <input type="tel" id="tel" name="tel" className="form-control" placeholder="Tel"/>
                </div>
              </div>
            </div>
            {!this.state.isInsertUtilisateurSucess?<span className="help-block text-danger">Error </span>:null}
            {!this.state.isPasswordMatch?<span className="help-block text-danger">Mot de Pass Not Matched</span>:null}
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-sm btn-success" onClick={()=>this.addUtilisateurData()}>Submit</button>
            <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleInsertUtilisateurModal}>Cancel</button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  profilsInsertButton = () => {
    return (
      <div>
        <button type="button" className="btn btn-info btn-md" onClick={this.toggleInsertProfilModal}>Ajouter un Nouveau Profil</button>
        <Modal isOpen={this.state.isInsertProfilModal} toggle={this.toggleInsertProfilModal}>
          <ModalHeader toggle={this.toggleInsertProfilModal}>Ajouter un Nouveau Profil</ModalHeader>
          <ModalBody>
            <div>
              <div className="form-group bg-info">
                <div className="input-group bg-info">
                  <span className="input-group-addon bg-info"><i className="fa fa-user"></i></span>
                  <input type="text" id="id_profil" name="id_profil" className="form-control" placeholder="ID Profil"/>
                </div>
              </div>
              <div className="form-group bg-info">
                <div className="input-group bg-info">
                  <span className="input-group-addon bg-info"><i className="fa fa-tag"></i></span>
                  <input type="text" id="lib_profil" name="lib_profil" className="form-control" placeholder="Nom de Profil"/>
                </div>
              </div>
            </div>
            {!this.state.isInsertProfilSucess?<span className="help-block text-danger">Deplicate ou Invalid ID/Nom </span>:null}
          </ModalBody>
          <ModalFooter>
            <button type="button" className="btn btn-sm btn-success" onClick={()=>this.addProfilData()}>Submit</button>
            <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleInsertProfilModal}>Cancel</button>
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
    const optionsUtilisateurs = {
      insertBtn: this.utilisateursInsertButton,
      toolBar: this.createCustomToolBar
    }
    const optionsProfils = {
      insertBtn: this.profilsInsertButton
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
                  Utilisateurs
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === '2' })}
                  onClick={() => { this.toggle('2'); }}>
                  Profil
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
                      options = {optionsUtilisateurs}
                      data={ this.state.userData }
                      headerStyle = { { "backgroundColor" : "#63c2de" } }
                      insertRow>
                      <TableHeaderColumn
                        dataField="id_user"
                        isKey
                        dataSort>
                        ID
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="username"
                        dataSort>
                        User Name
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="nom"
                        dataSort>
                        Nom
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField="prenom"
                        dataSort>
                        Prénom
                      </TableHeaderColumn>
                      <TableHeaderColumn
                        dataField=""
                        dataFormat={ this.utilisateursGestionFormatter }
                        width = "30%">
                        Gestion
                      </TableHeaderColumn>
                    </BootstrapTable>
                  </div>
                </div>
              </TabPane>
              <TabPane tabId="2"><div className="card">
                <div className="card-header">
                  <i className="fa fa-user"></i> Gestion des Profils
                </div>
                <div className="card-block">
                  <BootstrapTable
                    options = {optionsProfils}
                    data = { this.state.profilData }
                    headerStyle = { { "backgroundColor" : "#63c2de" } }
                    insertRow>
                    <TableHeaderColumn
                      dataField="id_profil"
                      isKey
                      dataSort>
                      ID
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField="lib_profil"
                      dataSort>
                      Profil
                    </TableHeaderColumn>
                    <TableHeaderColumn
                      dataField=""
                      dataSort
                      dataFormat={ this.profilGestionFormatter }>
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
          this.state.isModifierUtilisateurModal?
          <Modal isOpen={this.state.isModifierUtilisateurModal} toggle={this.toggleModifierUtilisateurModal}>
            <ModalHeader toggle={this.toggleModifierUtilisateurModal}>Afficher/Modifier un Utilisateur</ModalHeader>
            <ModalBody>
              <div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon col-1"><i className="fa fa-user"></i></span>
                    <span className="input-group-addon col-3">Username</span>
                    <input type="text" id="username" name="username" className="form-control" placeholder="Username" defaultValue={this.state.utilisateurConcerne["username"]}/>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon col-1"><i className="fa fa-tag"></i></span>
                    <span className="input-group-addon col-3">Nom</span>
                    <input type="text" id="nom" name="nom" className="form-control" placeholder="Nom" defaultValue={this.state.utilisateurConcerne["nom"]}/>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon col-1"><i className="fa fa-tags"></i></span>
                    <span className="input-group-addon col-3">Prenom</span>
                    <input type="text" id="prenom" name="prenom" className="form-control" placeholder="Prenom" defaultValue={this.state.utilisateurConcerne["prenom"]}/>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon col-1"><i className="fa fa-asterisk"></i></span>
                    <span className="input-group-addon col-3">Mot de Passe</span>
                    <input type="input" id="motdepasse" name="motdepasse" className="form-control" placeholder="Mot de Passe" defaultValue={this.state.utilisateurConcerne["password"]}/>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon col-1"><i className="fa fa-archive"></i></span>
                    <span className="input-group-addon col-3">Profil</span>
                    <input type="text" id="profil" name="profil" className="form-control" placeholder="Profil" defaultValue={this.state.utilisateurConcerne["profil"]}/>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon col-1"><i className="fa fa-suitcase"></i></span>
                    <span className="input-group-addon col-3">Société</span>
                    <input type="text" id="societe" name="societe" className="form-control" placeholder="Société" defaultValue={this.state.utilisateurConcerne["societe"]}/>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon col-1"><i className="fa fa-envelope"></i></span>
                    <span className="input-group-addon col-3">Email</span>
                    <input type="email" id="email" name="email" className="form-control" placeholder="Email" defaultValue={this.state.utilisateurConcerne["email"]}/>
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon col-1"><i className="fa fa-phone"></i></span>
                    <span className="input-group-addon col-3">Tel</span>
                    <input type="tel" id="tel" name="tel" className="form-control" placeholder="Tel" defaultValue={this.state.utilisateurConcerne["tel"]}/>
                  </div>
                </div>
              </div>
              {!this.state.isModifierUtilisateurSuccess?<span className="help-block text-danger">Error </span>:null}
            </ModalBody>
            <ModalFooter>
              <button type="button" className="btn btn-sm btn-success" onClick={this.modifyUtilisateurData}>Submit</button>
              <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleModifierUtilisateurModal}>Cancel</button>
            </ModalFooter>
          </Modal>:null
        }
        {
          this.state.isModifierProfilModal?
          <Modal isOpen={this.state.isModifierProfilModal} toggle={this.toggleModifierProfilModal}>
            <ModalHeader toggle={this.toggleModifierProfilModal}>Modifier un Profil</ModalHeader>
            <ModalBody>
              <div>
                <div className="form-group bg-info">
                  <div className="input-group">
                    <span className="input-group-addon col-1 bg-info"><i className="fa fa-user"></i></span>
                    <span className="input-group-addon col-3 bg-info">Profil ID</span>
                    <input disabled type="text" id="id_profil" name="id_profil" className="form-control" placeholder="ID Profil" defaultValue={this.state.profilConcerne["id_profil"]}/>
                  </div>
                </div>
                <div className="form-group bg-info">
                  <div className="input-group">
                    <span className="input-group-addon col-1 bg-info"><i className="fa fa-tag"></i></span>
                    <span className="input-group-addon col-3 bg-info">Nom de Profil</span>
                    <input type="text" id="lib_profil" name="lib_profil" className="form-control" placeholder="Nom de Profil" defaultValue={this.state.profilConcerne["lib_profil"]}/>
                  </div>
                </div>
              </div>
              {!this.state.isModifierProfilSuccess?<span className="help-block text-danger">Error </span>:null}
            </ModalBody>
            <ModalFooter>
              <button type="button" className="btn btn-sm btn-success" onClick={()=>{this.modifyProfilData();}}>Submit</button>
              <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleModifierProfilModal}>Cancel</button>
            </ModalFooter>
          </Modal>:null
        }
        {
          this.state.isSupprimerProfilModal?
          <Modal className="modal-danger modal-lg" isOpen={this.state.isSupprimerProfilModal} toggle={this.toggleSupprimerProfilModal}>
            <ModalHeader toggle={this.toggleModifierProfilModal}>Modifier un Profil</ModalHeader>
            <ModalBody>
              <div>
                <div className="form-group col-sm-12">
                  <label className="h3">Vous être sûre de supprimer le profil dessous?</label>
                </div>
                <div className="form-group">
                  <div className="input-group bg-info">
                    <span className="input-group-addon col-1 bg-info"><i className="fa fa-user"></i></span>
                    <span className="input-group-addon col-3 bg-info">Profil ID</span>
                    <input disabled type="text" id="id_profil" name="id_profil" className="form-control" placeholder="ID Profil" defaultValue={this.state.profilConcerne["id_profil"]}/>
                  </div>
                  <div className="input-group bg-info">
                    <span className="input-group-addon col-1 bg-info"><i className="fa fa-tag"></i></span>
                    <span className="input-group-addon col-3 bg-info">Nom de Profil</span>
                    <input disabled type="text" id="lib_profil" name="lib_profil" className="form-control" placeholder="Nom de Profil" defaultValue={this.state.profilConcerne["lib_profil"]}/>
                  </div>
                </div>
              </div>
              {!this.state.isSupprimerProfilSuccess?<span className="help-block text-danger">Error </span>:null}
            </ModalBody>
            <ModalFooter>
              <button type="button" className="btn btn-sm btn-danger" onClick={()=>{this.deleteProfilData();}}>Confirmer</button>
              <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleSupprimerProfilModal}>Cancel</button>
            </ModalFooter>
          </Modal>:null
        }
        {
          this.state.isSupprimerUtilisateurModal?
          <Modal className="modal-danger modal-lg" isOpen={this.state.isSupprimerUtilisateurModal} toggle={this.toggleSupprimerUtilisateurModal}>
            <ModalHeader toggle={this.toggleSupprimerUtilisateurModal}>Modifier un Profil</ModalHeader>
            <ModalBody>
              <div>
                <div className="form-group col-sm-12">
                  <label className="h3">Vous être sûre de supprimer le utilisateur dessous?</label>
                </div>
                <div className="form-group bg-info">
                  <div className="input-group bg-info">
                    <span className="input-group-addon col-1 bg-info"><i className="fa fa-user"></i></span>
                    <span className="input-group-addon col-3 bg-info">Username</span>
                    <input disabled type="text" id="username" name="username" className="form-control" placeholder="Username" defaultValue={this.state.utilisateurConcerne["username"]}/>
                  </div>
                </div>
                <div className="form-group bg-info">
                  <div className="input-group bg-info">
                    <span className="input-group-addon col-1 bg-info"><i className="fa fa-tag"></i></span>
                    <span className="input-group-addon col-3 bg-info">Nom</span>
                    <input disabled type="text" id="nom" name="nom" className="form-control" placeholder="Nom" defaultValue={this.state.utilisateurConcerne["nom"]}/>
                  </div>
                </div>
                <div className="form-group bg-info">
                  <div className="input-group bg-info">
                    <span className="input-group-addon col-1 bg-info"><i className="fa fa-tags"></i></span>
                    <span className="input-group-addon col-3 bg-info">Prenom</span>
                    <input disabled type="text" id="prenom" name="prenom" className="form-control" placeholder="Prenom" defaultValue={this.state.utilisateurConcerne["prenom"]}/>
                  </div>
                </div>
              </div>
              {!this.state.isSupprimerUtilisateurSuccess?<span className="help-block text-danger">Error </span>:null}
            </ModalBody>
            <ModalFooter>
              <button type="button" className="btn btn-sm btn-danger" onClick={()=>{this.deleteUtilisateurData();}}>Confirmer</button>
              <button type="button" className="btn btn-sm btn-secondary" onClick={this.toggleSupprimerUtilisateurModal}>Cancel</button>
            </ModalFooter>
          </Modal>:null
        }
      </div>
    );
  }
}
/*


*/
