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
                  headerStyle = { { "background-color" : "rgb(142, 194, 231)" } }>
                  <TableHeaderColumn
                    dataField="name"
                    isKey
                    dataSort
                    width="70px"
                    >
                    Name
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="status"
                    dataSort
                    width="70px">
                    Status
                  </TableHeaderColumn>
                  <TableHeaderColumn
                    dataField="updateTime"
                    dataSort
                    width="120px">
                    UpdateTime
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
