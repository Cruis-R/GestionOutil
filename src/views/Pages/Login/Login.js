import React, { Component } from 'react';
const urlServer = "http://vps92599.ovh.net:8082/api/session";
class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoginSuccess: true
    };
    this.loginServerTraccar = this.loginServerTraccar.bind(this);
    this.restoreSession = this.restoreSession.bind(this);
  }
  componentDidMount(){
    this.restoreSession();
  }
  restoreSession(){
    fetch(urlServer,{
      credentials: 'include'})
    .then((response)=>response.json())
    .then((res)=>{
      console.log(res);
      this.setState({
        isLoginSuccess:true
      });
      let accessString = res["email"];
      window.location.href = '#/gestions/welcome?'+accessString;
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  loginServerTraccar(){
    const queryMethod = "POST";
    let email = document.getElementById('username').value;
    let password = document.getElementById('password').value;
    let formData="email="+email+"&password="+password;
    fetch(urlServer,{
      credentials: 'include',
      method: queryMethod,
      body: formData,
      headers: new Headers({
    		'Content-Type': 'application/x-www-form-urlencoded'
    	})
    })
    .then((response)=>response.json())
    .then((res)=>{
      console.log(res);
      this.setState({
        isLoginSuccess:true
      });
      let accessString = res["email"];
      window.location.href = '#/gestions/utilisateurs?'+accessString;
    })
    .catch((err)=>{
      this.setState({
        isLoginSuccess:false
      });
      console.log(err);
    })
  }
  render() {
    return (
      <div className="app flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card-group mb-0">
                <div className="card p-4">
                  <div id="login-form" className="card-block">
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <div className="input-group mb-3">
                      <span className="input-group-addon"><i className="fa fa-user" style={{width : 30 + "px"}}></i></span>
                      <input type="text" id="username" className="form-control" placeholder="Username"/>
                    </div>
                    <div className="input-group mb-4">
                      <span className="input-group-addon"><i className="fa fa-lock" style={{width : 30 + "px"}}></i></span>
                      <input type="password" id="password" className="form-control" placeholder="Password"/>
                    </div>
                    <div className="row">
                      <div className="col-6">
                        <button type="button" className="btn btn-primary px-4" onClick={this.loginServerTraccar}>Login</button>
                      </div>
                      <div className="col-6 text-right">
                        <button type="button" className="btn btn-link px-0">Forgot password?</button>
                      </div>
                    </div>
                    {!this.state.isLoginSuccess?<span className="help-block text-danger">Account Non Trouvé ou Mot de Passe Incorrecte</span>:null}
                  </div>
                </div>
                <div className="card card-inverse card-primary py-5 d-md-down-none" style={{ width: 44 + '%' }}>
                  <div className="card-block text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>CRUIS'R distribue et loue de nombreuses marques de véhicules électriques.</p>
                      <button type="button" className="btn btn-primary active mt-3">Register Now!</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
