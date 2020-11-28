import React, { Component } from 'react';
import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultado';

class App extends Component {

  state = {
    termino: '',
    imagenes: [],
    pagina: ''
  }

  scroll = () => {
    const elemento = document.querySelector('.jumbotron');
    elemento.scrollIntoView('smooth', 'start');
  }

  paginaAnterior = () => {

    let pagina = this.state.pagina;
    
    if(pagina === 1) return null;

    pagina--;

    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });
  }

  paginaSiguiente = () => {
    
    let pagina = this.state.pagina;
    
    pagina++;

    this.setState({
      pagina
    }, () => {
      this.consultarApi();
      this.scroll();
    });
  }

  consultarApi = () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url= `https://pixabay.com/api/?key=19297718-21243cca000feb23ec9cf6cca&q=${termino}&per_page=30&page=${pagina}`;
    
    fetch(url)
      .then( resp => resp.json() )
      .then( resul => this.setState({ imagenes : resul.hits }))
  }

  datosBusqueda = (termino) => {
    this.setState({
      termino: termino,
      pagina: 1
    }, () => {
      this.consultarApi();
    })
  }

  render() {
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de Imagenes</p>
          <Buscador 
            datosBusqueda= {this.datosBusqueda}
          />
        </div>
      <div className="row justify-content-center">
        <Resultado 
            imagenes={this.state.imagenes}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
        />
      </div>
      </div>
    );
  }
}

export default App;