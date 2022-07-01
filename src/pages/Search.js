import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const inittialStateSearch = {
  search: '',
  searchArtists: '',
  albunsInfo: [],
  loading: false,
};

class Search extends Component {
  state = inittialStateSearch

  // Guardando informações do input no setState, onChange
  artistInfo = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  // Buscando os albuns do artista/banda pesquisado
   searchBands = async (bands) => {
     this.setState({ loading: true,
       searchArtists: '' });
     const resultsAlbum = await searchAlbumsAPI(bands);
     this.setState({
       loading: false,
       searchArtists: bands,
       albunsInfo: resultsAlbum,
     });
   }

   // Listagem do album retornado após a pesquisa do usuário com o link de redirecionamento para o collectionId.
   albumGenerated(artists) {
     return artists.map((album) => (
       <div key={ album.collectionId } className="album-card">
         <Link
           data-testid={ `link-to-album-${album.collectionId}` }
           to={ `/album/${album.collectionId}` }
         >
           <button className="album-button" type="submit">Ir para o álbum</button>
         </Link>
         <img
           src={ album.artworkUrl100 }
           alt={ `Capa do Álbum ${album.collectionName}` }
         />
         <p className="album-collection-name">{`Álbum ${album.collectionName}`}</p>
         <p>{`Artista ${album.artistName}`}</p>
       </div>
     ));
   }

   // ¨O botão só deve estar habilitado caso o nome do artista tenha 2 ou mais caracteres.¨ Nesse component optei por fazer a função de Disabled do botão no próprio elemento. Vi o Herdina fazendo e achei mais prático.

   render() {
     const { search, loading, searchArtists, albunsInfo } = this.state;
     const minimumCharactersArtist = 2;

     return (
       <div data-testid="page-search">
         <Header />
         { !loading ? (
           <div>
             <div className="search-input-content">
               <input
                 data-testid="search-artist-input"
                 className="input-area"
                 placeholder="Nome do artista"
                 id="search"
                 name="search"
                 type="text"
                 onChange={ this.artistInfo }
               />
               <button
                 data-testid="search-artist-button"
                 className="search-button"
                 type="submit"
                 onClick={ () => this.searchBands(search) }
                 disabled={ search.length < minimumCharactersArtist }
               >
                 Pesquisar
               </button>
             </div>
             {searchArtists
              && (
                <div className="album-card-content">
                  <h2>{`Resultado de álbuns de: ${searchArtists}`}</h2>
                  {albunsInfo.length === 0 ? (
                    <h2>Nenhum álbum foi encontrado</h2>
                  ) : (
                    this.albumGenerated(albunsInfo))}
                </div>)}
           </div>) : (<Loading />)}
       </div>
     );
   }
}

export default Search;
