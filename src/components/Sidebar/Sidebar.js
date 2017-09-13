import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'

class Sidebar extends Component {

  handleClick(e) {
    e.preventDefault();
    e.target.parentElement.classList.toggle('open');
  }

  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
  }

  // secondLevelActive(routeName) {
  //   return this.props.location.pathname.indexOf(routeName) > -1 ? "nav nav-second-level collapse in" : "nav nav-second-level collapse";
  // }

  render() {
    const access = this.props.location.search?this.props.location.search.replace(/\?/g,''):'';
    console.log(access);
    return (
      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul className="nav">
            <li className="nav-item">
              <NavLink to={'/dashboard'} className="nav-link" activeClassName="active"><i className="icon-speedometer"></i> Dashboard <span className="badge badge-info">NEW</span></NavLink>
            </li>
            <li className="nav-title">
              Fonctions
            </li>
            <li className={this.activeRoute("/gestions")}>
              <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick.bind(this)}><i className="fa fa-puzzle-piece"></i> Gestions</a>
              <ul className="nav-dropdown-items">
                {access==="1"?<li className="nav-item">
                  <NavLink to={'/gestions/utilisateurs?'+access} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Utilisateurs</NavLink>
                </li>:null}
                <li className="nav-item">
                  <NavLink to={'/gestions/scooters?'+access} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Scooters</NavLink>
                </li>
                {access==="1"?<li className="nav-item">
                  <NavLink to={'/gestions/droitsdeconduite?'+access} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Droits de Conduite</NavLink>
                </li>:null}
                {access==="1"?<li className="nav-item">
                  <NavLink to={'/gestions/conducteurs?'+access} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Conducteurs</NavLink>
                </li>:null}
                {access==="1"?<li className="nav-item">
                  <NavLink to={'/gestions/contrats?'+access} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Contrats</NavLink>
                </li>:null}
                {access==="1"?<li className="nav-item">
                  <NavLink to={'/gestions/batteries?'+access} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Batteries</NavLink>
                </li>:null}
                {access==="1"?<li className="nav-item">
                  <NavLink to={'/gestions/chargeurs?'+access} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Chargeurs</NavLink>
                </li>:null}
                {access==="1"?<li className="nav-item">
                  <NavLink to={'/gestions/stocks?'+access} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Stocks</NavLink>
                </li>:null}
                {access==="1"?<li className="nav-item">
                  <NavLink to={'/gestions/boitiers?'+access} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Boitiers</NavLink>
                </li>:null}
                {access==="1"?<li className="nav-item">
                  <NavLink to={'/gestions/flottes?'+access} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Flottes</NavLink>
                </li>:null}
                {access==="1"?<li className="nav-item">
                  <NavLink to={'/gestions/clients?'+access} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Clients</NavLink>
                </li>:null}
                {access==="1"?<li className="nav-item">
                  <NavLink to={'/gestions/facturations?'+access} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Facturations</NavLink>
                </li>:null}
                {access==="1"?<li className="nav-item">
                  <NavLink to={'/gestions/interventions?'+access} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Interventions</NavLink>
                </li>:null}
                {access==="1"?<li className="nav-item">
                  <NavLink to={'/gestions/notifications?'+access} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Notifications</NavLink>
                </li>:null}
                <li className="nav-item">
                  <NavLink to={'/gestions/alertes?'+access} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Alertes</NavLink>
                </li>
              </ul>
            </li>

          </ul>
        </nav>
      </div>
    )
  }
}

export default Sidebar;
