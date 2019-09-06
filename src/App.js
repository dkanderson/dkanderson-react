import React, { Component } from 'react';
import Navigation from './components/navigation';
import Footer from './components/footer';
import './css/main.min.css';
import { ReactComponent as SvgSprite } from './img/svg/sprites.svg';

class  App extends Component{

  render(){
    
    return (
      <div>
        <SvgSprite />
        <Navigation />
        <Footer />
      </div>
      );
  }
  
}

export default App;
