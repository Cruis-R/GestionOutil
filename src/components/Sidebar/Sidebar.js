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
                <li className="nav-item">
                  <NavLink to={'/gestions/utilisateurs'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Utilisateurs</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/gestions/scooters'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Scooters</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/gestions/droitsdeconduite'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Droits de Conduite</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/gestions/conducteurs'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Conducteurs</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/gestions/contrats'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Contrats</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/gestions/batteries'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Batteries</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/gestions/chargeurs'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Chargeurs</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/gestions/stocks'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Stocks</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/gestions/boitiers'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Boitiers</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/gestions/flottes'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Flottes</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/gestions/clients'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Clients</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/gestions/facturations'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Facturations</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/gestions/interventions'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Interventions</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/gestions/notifications'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Notifications</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/gestions/alertes'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Alertes</NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-title">
              UI Elements
            </li>
            <li className={this.activeRoute("/components")}>
              <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick.bind(this)}><i className="fa fa-puzzle-piece"></i> Components</a>
              <ul className="nav-dropdown-items">
                <li className="nav-item">
                  <NavLink to={'/components/buttons'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Buttons</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/components/social-buttons'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Social Buttons</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/components/cards'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Cards</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/components/forms'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Forms</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/components/modals'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Modals</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/components/switches'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Switches</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/components/tables'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Tables</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to={'/components/tabs'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Tabs</NavLink>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink to={'/widgets'} className="nav-link" activeClassName="active"><i className="icon-calculator"></i> Widgets <span className="badge badge-info">NEW</span></NavLink>
            </li>
            <li className="divider"></li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default Sidebar;
