import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';

const inittialStateProfile = {
  infoUser: {},
  loading: false,
};

class Profile extends Component {
  state = inittialStateProfile;

  componentDidMount() {
    this.getUserProfile();
  }

  getUserProfile = async () => {
    this.setState({ loading: true }, async () => {
      const infoUser = await getUser();
      this.setState({ loading: false, infoUser });
    });
  }

  render() {
    const { infoUser, loading } = this.state;
    const { description, email, image, name } = infoUser;
    console.log(this.state);
    return (
      <div>
        <div data-testid="page-profile">
          <Header />
          {loading && <Loading />}
          <div className="profileUser">
            <p>{ name }</p>
            <img src={ image } data-testid="profile-image" alt="User Logged" />
            <p>{ email }</p>
            <p>{ description }</p>
          </div>
          <nav>
            <Link to="/profile/edit">Editar perfil</Link>
          </nav>
        </div>
      </div>
    );
  }
}

export default Profile;
