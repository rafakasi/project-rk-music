import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from '../components/Loading';

const inittialStateAlbum = {
  artistName: '',
  collectionName: '',
  musicsData: [],
  musicsFav: [],
  loading: false,
};

class Album extends Component {
  state = inittialStateAlbum

  componentDidMount() {
    this.musicsFound();
    this.recoveryMusicFav();
  }

  // Função para realizar a requisição da API para obter os dados do album
  musicsFound = async () => {
    const { match: { params: { id } } } = this.props;
    const results = await getMusics(id);
    this.setState({
      artistName: results[0].artistName,
      collectionName: results[0].collectionName,
      artworkUrl100: results[0].artworkUrl100,
      musicsData: results,
    });
  }

  // Função para recuperar a lista de músicas favoritas
  recoveryMusicFav = () => {
    this.setState({ loading: true }, async () => {
      const favs = await getFavoriteSongs();
      this.setState({ musicsFav: favs, loading: false });
    });
  }

  // Função para adicionar ao estado da aplicação as favoritas que estão no musicsFav
  addFavSong = (newSong) => {
    this.setState({ loading: true });
    this.setState((prevState) => ({
      musicsFav: [...prevState.musicsFav, newSong],
      loading: false,
    }));
  }

  // Função que remove as marcadas como favoritas do estado da aplicação
  removeFavSong = (newSong) => {
    this.setState({ loading: true });
    const { musicsFav } = this.state;
    this.setState({ musicsFav: musicsFav
      .filter((music) => newSong.trackId !== music.trackId),
    loading: false });
  }

  render() {
    const { musicsData, artistName, collectionName, artworkUrl100,
      musicsFav, loading } = this.state;
    return (
      <div>
        { loading && <Loading /> }
        <div data-testid="page-album">
          <Header />
          <img src={ artworkUrl100 } alt="aa" />
          <h2 data-testid="artist-name">{artistName}</h2>
          <h3 data-testid="album-name">{collectionName}</h3>
          <div>
            <section>
              {musicsData.map((music, index) => {
                if (index === 0) return;
                return (<MusicCard
                  key={ music.trackName }
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                  trackId={ music.trackId }
                  artworkUrl100={ music.artworkUrl100 }
                  artistName={ music.artistName }
                  musicsFav={ musicsFav }
                  musicsData={ musicsData }
                  addFavSong={ this.addFavSong }
                  removeFavSong={ this.removeFavSong }
                />);
              })}
            </section>
          </div>
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
