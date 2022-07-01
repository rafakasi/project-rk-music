import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../components/Loading';
import { createUser } from '../services/userAPI';

const inittialState = {
  userName: '',
  loading: false,
  loggedIn: false,
};

class Login extends Component {
  state = inittialState;

  // Guardando informações do input no setState, onChange
  loginInfo = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  // O botão para entrar só deve ser habilitado caso o nome digitado tenha 3 ou mais caracteres, disabled
  buttonRequisite = () => {
    const { userName } = this.state;
    const minimumCharacters = 3;
    if (userName.length >= minimumCharacters) return false;
    return true;
  }

  // Ao clicar no botão Entrar, utilize a função createUser da userAPI para salvar o nome digitado. A função createUser espera receber como argumento um objeto com as informações da pessoa, onClick
  buttonLogin = () => {
    const { userName } = this.state;
    this.setState({ loading: true }, async () => {
      await createUser({ name: userName });
      this.setState({
        loading: false,
        loggedIn: true });
    });
  }

  // Crie um formulário para identificação
  render() {
    const { loggedIn, loading } = this.state;
    return (
      <>
        <div className="frase-content">
          <p className="frase-login">Sem música a vida seria um erro</p>
        </div>
        <div className="sub-frase-content">
          <p className="sub-frase-text">Escute agora suas músicas favoritas</p>
        </div>
        <div data-testid="page-login" className="login-page">
          <div className="login-content">
            <input
              data-testid="login-name-input"
              className="login-input"
              id="username"
              name="userName"
              type="text"
              placeholder="Nome"
              onChange={ this.loginInfo }
            />
            <button
              data-testid="login-submit-button"
              className="login-button"
              type="submit"
              name="submitButton"
              onClick={ this.buttonLogin }
              disabled={ this.buttonRequisite() }
            >
              Entrar
            </button>
            {loading && <Loading />}
            {loggedIn && <Redirect to="/search" />}
          </div>
        </div>
      </>
    );
  }
}

export default Login;
