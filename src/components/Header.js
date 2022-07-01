import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

const inittialStateHeader = {
  name: '',
  loading: true,
};

class Header extends Component {
    state = inittialStateHeader;

    // Recebendo o nome do usuaário na requisição enquanto carrega, após carregar loading é setado pra false.
    componentDidMount() {
      getUser().then(({ name }) => this.setState(() => ({
        name,
        loading: false,
      })));
    }

    render() {
      const { name, loading } = this.state;
      return (
        <header data-testid="header-component" className="header-content">
          <div className="header-logo">
            <h1>rKs Music</h1>
            {loading && <Loading />}
          </div>
          <div className="user-container">
            <span data-testid="header-user-name">{ name }</span>
          </div>
          <div className="header-links">
            <nav>
              <Link data-testid="link-to-search" to="/search">Pesquisar</Link>
              <Link data-testid="link-to-favorites" to="/favorites">Favoritos</Link>
              <Link data-testid="link-to-profile" to="/profile">Meu Perfil</Link>
            </nav>
          </div>
        </header>
      );
    }
}

export default Header;
