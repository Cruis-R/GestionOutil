import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom'
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/'
import Charts from '../../views/Charts/'
import Widgets from '../../views/Widgets/'
import Buttons from '../../views/Components/Buttons/'
import Cards from '../../views/Components/Cards/'
import Forms from '../../views/Components/Forms/'
import Modals from '../../views/Components/Modals/'
import SocialButtons from '../../views/Components/SocialButtons/'
import Switches from '../../views/Components/Switches/'
import Tables from '../../views/Components/Tables/'
import Tabs from '../../views/Components/Tabs/'
import FontAwesome from '../../views/Icons/FontAwesome/'
import SimpleLineIcons from '../../views/Icons/SimpleLineIcons/'

import GestionDesUtilisateurs from '../../views/GestionsComponents/Utilisateurs'
import GestionDesScooters from '../../views/GestionsComponents/Scooters'
import GestionDesDroitsdeConduite from '../../views/GestionsComponents/DroitsdeConduite'
import GestionDesConducteurs from '../../views/GestionsComponents/Conducteurs'
import GestionDesContrats from '../../views/GestionsComponents/Contrats'
import GestionDesBatteries from '../../views/GestionsComponents/Batteries'
import GestionDesChargeurs from '../../views/GestionsComponents/Chargeurs'
import GestionDesStocks from '../../views/GestionsComponents/Stocks'
import GestionDesBoitiers from '../../views/GestionsComponents/Boitiers'
import GestionDesFlottes from '../../views/GestionsComponents/Flottes'
import GestionDesClients from '../../views/GestionsComponents/Clients'
import GestionDesFacturations from '../../views/GestionsComponents/Facturations'
import GestionDesInterventions from '../../views/GestionsComponents/Interventions'
import GestionDesNotifications from '../../views/GestionsComponents/Notifications'
import GestionDesAlertes from '../../views/GestionsComponents/Alertes'

class Full extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb />
            <div className="container-fluid">
              <Switch>
                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                <Route path="/gestions/utilisateurs" name="Utilisateurs" component={GestionDesUtilisateurs}/>
                <Route path="/gestions/scooters" name="Scooters" component={GestionDesScooters}/>
                <Route path="/gestions/droitsdeconduite" name="Droits de Conduite" component={GestionDesDroitsdeConduite}/>
                <Route path="/gestions/conducteurs" name="Conducteurs" component={GestionDesConducteurs}/>
                <Route path="/gestions/contrats" name="Contrats" component={GestionDesContrats}/>
                <Route path="/gestions/batteries" name="Batteries" component={GestionDesBatteries}/>
                <Route path="/gestions/chargeurs" name="Chargeurs" component={GestionDesChargeurs}/>
                <Route path="/gestions/stocks" name="Stocks" component={GestionDesStocks}/>
                <Route path="/gestions/boitiers" name="Scooters" component={GestionDesBoitiers}/>
                <Route path="/gestions/flottes" name="Flottes" component={GestionDesFlottes}/>
                <Route path="/gestions/clients" name="Clients" component={GestionDesClients}/>
                <Route path="/gestions/facturations" name="Facturations" component={GestionDesFacturations}/>
                <Route path="/gestions/interventions" name="Interventions" component={GestionDesInterventions}/>
                <Route path="/gestions/notifications" name="Notifications" component={GestionDesNotifications}/>
                <Route path="/gestions/alertes" name="Alertes" component={GestionDesAlertes}/>
                <Route path="/components/buttons" name="Buttons" component={Buttons}/>
                <Route path="/components/cards" name="Cards" component={Cards}/>
                <Route path="/components/forms" name="Forms" component={Forms}/>
                <Route path="/components/modals" name="Modals" component={Modals}/>
                <Route path="/components/social-buttons" name="Social Buttons" component={SocialButtons}/>
                <Route path="/components/switches" name="Swithces" component={Switches}/>
                <Route path="/components/tables" name="Tables" component={Tables}/>
                <Route path="/components/tabs" name="Tabs" component={Tabs}/>
                <Route path="/icons/font-awesome" name="Font Awesome" component={FontAwesome}/>
                <Route path="/icons/simple-line-icons" name="Simple Line Icons" component={SimpleLineIcons}/>
                <Route path="/widgets" name="Widgets" component={Widgets}/>
                <Route path="/charts" name="Charts" component={Charts}/>
                <Redirect from="/" to="/dashboard"/>
              </Switch>
            </div>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;
