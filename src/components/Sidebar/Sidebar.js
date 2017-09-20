import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import urls from '../../views/GestionsComponents/configs/serverConfigurations'
const urlUtilisateur = urls.utilisateurs+'/email=';
class Sidebar extends Component {
  constructor(props){
    super(props);
    this.state = {
      access : ""
    };
  }
  componentDidMount() {
    const accessString = this.props.location.search?this.props.location.search.replace(/\?/g,''):'';
    let access = this.getProfile(accessString);
  }
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
  getProfile(email){
    const queryMethod = 'GET';
    let url = urlUtilisateur+email;
    fetch(url,{
      method: queryMethod,
      headers: new Headers({
    		'Content-Type': 'application/json'
    	})
    }).then((response) => response.json())
    .then((responseJson)=>{
      let tt = responseJson.length>0?responseJson[0]["profil"]:"";
      this.setState({
        access : tt
      })
      switch (tt) {
        case 1:
          window.location.href = '#/gestions/utilisateurs';
          break;
        case 2:
          window.location.href = '#/gestions/flottes';
          break;
        case 3:
          window.location.href = '#/gestions/scooters';
          break;
        case 4:
          window.location.href = '#/gestions/scooters';
          break;
        case 5:
          window.location.href = '#/gestions/boitiers';
          break;
        default:
          window.location.href = '#/gestions/scooters';
          break;
      }
    })
    .catch((error) => {
      console.error(error);
    });


  }
  render() {
    return (
      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul className="nav">
            <li className="nav-title">
              Fonctions
            </li>
            <li className={this.activeRoute("/gestions")}>
              <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick.bind(this)}><i className="fa fa-puzzle-piece"></i> Gestions</a>
              <ul className="nav-dropdown-items">
                {this.state.access===1?<li className="nav-item">
                  <NavLink to={'/gestions/utilisateurs?'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Utilisateurs</NavLink>
                </li>:null}
                <li className="nav-item">
                  <NavLink to={'/gestions/scooters?'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Scooters</NavLink>
                </li>
                {this.state.access===1?<li className="nav-item">
                  <NavLink to={'/gestions/droitsdeconduite?'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Droits de Conduite</NavLink>
                </li>:null}
                {this.state.access===1?<li className="nav-item">
                  <NavLink to={'/gestions/conducteurs?'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Conducteurs</NavLink>
                </li>:null}
                {this.state.access===1?<li className="nav-item">
                  <NavLink to={'/gestions/contrats?'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Contrats</NavLink>
                </li>:null}
                {this.state.access===1?<li className="nav-item">
                  <NavLink to={'/gestions/batteries?'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Batteries</NavLink>
                </li>:null}
                {this.state.access===1?<li className="nav-item">
                  <NavLink to={'/gestions/chargeurs?'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Chargeurs</NavLink>
                </li>:null}
                {this.state.access===1?<li className="nav-item">
                  <NavLink to={'/gestions/stocks?'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Stocks</NavLink>
                </li>:null}
                {this.state.access===1?<li className="nav-item">
                  <NavLink to={'/gestions/boitiers?'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Boitiers</NavLink>
                </li>:null}
                {this.state.access===1?<li className="nav-item">
                  <NavLink to={'/gestions/flottes?'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Flottes</NavLink>
                </li>:null}
                {this.state.access===1?<li className="nav-item">
                  <NavLink to={'/gestions/clients?'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Clients</NavLink>
                </li>:null}
                {this.state.access===1?<li className="nav-item">
                  <NavLink to={'/gestions/facturations?'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Facturations</NavLink>
                </li>:null}
                {this.state.access===1?<li className="nav-item">
                  <NavLink to={'/gestions/interventions?'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Interventions</NavLink>
                </li>:null}
                {this.state.access===1?<li className="nav-item">
                  <NavLink to={'/gestions/notifications?'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Notifications</NavLink>
                </li>:null}
                {this.state.access===1?<li className="nav-item">
                  <NavLink to={'/gestions/alertes?'} className="nav-link" activeClassName="active"><i className="fa fa-puzzle-piece"></i> Alertes</NavLink>
                </li>:null}
              </ul>
            </li>

          </ul>
        </nav>
      </div>
    )
  }
}

export default Sidebar;
