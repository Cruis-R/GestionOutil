import React, { Component } from 'react';
import { Dropdown, DropdownMenu, DropdownItem } from 'reactstrap';

const urlServer = "http://vps92599.ovh.net:8082/api/session";
class Header extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      dropdownOpen: false,
      isLogoutSuccess : true
    };
    this.logoutServerTraccar = this.logoutServerTraccar.bind(this)
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  sidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-hidden');
  }

  sidebarMinimize(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-minimized');
  }

  mobileSidebarToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('sidebar-mobile-show');
  }

  asideToggle(e) {
    e.preventDefault();
    document.body.classList.toggle('aside-menu-hidden');
  }

  logoutServerTraccar(){
    const queryMethod = "DELETE";
    fetch(urlServer,{
      credentials: 'include',
      method: queryMethod,
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    })
    .then((response)=>{
      if(response.status===204){
        this.setState({
          isLogoutSuccess:true
        });
        window.location.href = '#/';
      }else {
        this.setState({
          isLogoutSuccess:false
        });
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  render() {
    return (
      <header className="app-header navbar">
        <button className="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" onClick={this.mobileSidebarToggle}>&#9776;</button>
        <a className="navbar-brand" href="#"></a>
        <ul className="nav navbar-nav d-md-down-none">
          <li className="nav-item">
            <button className="nav-link navbar-toggler sidebar-toggler" type="button" onClick={this.sidebarToggle}>&#9776;</button>
          </li>
        </ul>
        <ul className="nav navbar-nav ml-auto">
          <li className="nav-item">
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
              <button onClick={this.toggle} className="nav-link dropdown-toggle" data-toggle="dropdown" type="button" aria-haspopup="true" aria-expanded={this.state.dropdownOpen}>
                <span className="d-md-down-none">Account</span>
              </button>

              <DropdownMenu className="dropdown-menu-right">
                <DropdownItem onClick={this.logoutServerTraccar}><i className="fa fa-lock"></i> Logout{!this.state.isLogoutSuccess?<span className="badge badge-danger">Error </span>:null}</DropdownItem>

              </DropdownMenu>
            </Dropdown>
          </li>
          <li className="nav-item d-md-down-none">
            <button className="nav-link navbar-toggler aside-menu-toggler" type="button" onClick={this.asideToggle}>&#9776;</button>
          </li>
        </ul>
      </header>
    )
  }
}

export default Header;
