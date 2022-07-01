import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

const inittialStateMusicCard = {
  checkedFav: false,
  loading: false,
};

class MusicCard extends React.Component {
  state = inittialStateMusicCard;

  // Função para adicionar uma música a lista de favoritas utilizando a função addSong da API. Feita com aúxilio.
  favoriteSong = ({ target: { checked } }) => {
    this.setState({ loading: true }, async () => {
      const { trackId, trackName, artistName, addFavSong, removeFavSong,
        previewUrl, artworkUrl100 } = this.props;
      // const { checkedFav } = this.state;
      if (checked) {
        addFavSong({ trackId, trackName, artistName, previewUrl, artworkUrl100 });
        await addSong({ trackId, trackName, artistName, previewUrl, artworkUrl100 });
        this.setState({ loading: false });
      } else {
        removeFavSong({ trackId, trackName, artistName, previewUrl, artworkUrl100 });
        await removeSong({ trackId, trackName, artistName, previewUrl, artworkUrl100 });
        this.setState({ loading: false });
      }
    });
  }

  // Função que verifica se a música é favorita
  // verifyChekedFav = () => {
  //   const { musicsFav, trackId } = this.props;
  //   if (musicsFav.some((music) => music.trackId === trackId)) {
  //     this.setState({ checkedFav: true });
  //   }
  // }

  render() {
    const { loading } = this.state;
    const { previewUrl, trackName, trackId, musicsFav, artworkUrl100 } = this.props;
    return (
      <div className="music-card-content">
        { !loading
        && (
          <div className="music-card">
            <div className="track-name">
              <p>{trackName}</p>
              <img src={ artworkUrl100 } alt="aa" />
            </div>
            <div className="player-and-checked">
              <audio data-testid="audio-component" src={ previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                <code>audio</code>
                .
              </audio>
              <label htmlFor={ trackName }>
                Favorita
                <input
                  id={ trackName }
                  data-testid={ `checkbox-music-${trackId}` }
                  checked={ musicsFav.some((music) => music.trackId === trackId) }
                  onChange={ this.favoriteSong }
                  type="checkbox"
                />
              </label>
            </div>
          </div>)}
        {loading && <Loading />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  addFavSong: PropTypes.func,
  removeFavSong: PropTypes.func.isRequired,
  trackName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
  musicsFav: PropTypes.arrayOf(PropTypes.object).isRequired,
};

MusicCard.defaultProps = {
  previewUrl: '',
  addFavSong: () => {},
};

export default MusicCard;
