import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

const inittialStateFavorites = {
  musicsFav: [],
  loading: false,
};

class Favorites extends Component {
  state = inittialStateFavorites;

  componentDidMount() {
    this.getFavoriteMusic();
  }

  getFavoriteMusic = async () => {
    this.setState({ loading: true });
    const results = await getFavoriteSongs();
    this.setState({
      musicsFav: results,
      loading: false,
    });
  }

  updateFavMusics = (id) => {
    const { musicsFav } = this.state;
    const result = musicsFav.filter((music) => music.trackId !== id);
    this.setState({ musicsFav: result });
  }

  removeFavSong = (rmvMusic) => {
    this.setState({ loading: true }, async () => {
      await removeSong(rmvMusic);
      const favs = await getFavoriteSongs();
      this.setState({ loading: false, musicsFav: favs });
    });
  }

  render() {
    const { loading, musicsFav } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <div>
          <p>Músicas Favoritas:</p>
        </div>
        { !loading ? (
          <div>
            {musicsFav.map((music) => (
              <MusicCard
                trackId={ Number(music.trackId) }
                trackName={ music.trackName }
                artistName={ music.artistName }
                previewUrl={ music.previewUrl }
                artworkUrl100={ music.artworkUrl100 }
                key={ music.trackId }
                musicsFav={ musicsFav }
                removeFavSong={ this.removeFavSong }
                updateFavMusics={ this.updateFavMusics }
              />))}
          </div>
        ) : (<Loading />)}
      </div>
    );
  }
}

export default Favorites;
