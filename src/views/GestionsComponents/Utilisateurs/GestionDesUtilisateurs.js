import React, { Component } from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

export default class GestionDesUtilisateurs extends Component {
  render(){
    const data = [];
    return(
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header">
                <i className="fa fa-align-justify"></i> Gestion des Utilisateurs
              </div>
              <div className="card-block">
                <BootstrapTable
                  data={ data }
                  headerStyle = { { "background-color" : "#63c2de" } }>
                  <TableHeaderColumn
                    dataField="id_user"
                    isKey
                    dataSort
                    width="70px">
                    ID
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="nom"
                    dataSort
                    width="70px">
                    Nom
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="prenom"
                    dataSort
                    width="70px">
                    Prénom
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="email"
                    dataSort
                    width="150px">
                    Mél
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="tel"
                    dataSort
                    width="70px"
                    >
                    Tel
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="societe"
                    dataSort
                    width="70px">
                    Société
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="profil"
                    dataSort
                    width="120px">
                    Droit
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="password"
                    dataSort
                    width="70px"
                    >
                    Mot de passe
                  </TableHeaderColumn>
                </BootstrapTable>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
