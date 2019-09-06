import React, { Component } from 'react';
import $ from 'jquery';

class Bio extends Component {

    componentDidMount(){
        
        $.fn.visible = function ( partial ) {
          
            var $t            = $( this ),
                $w            = $( window ),
                viewTop       = $w.scrollTop(),
                viewBottom    = viewTop + $w.height(),
                _top          = $t.offset().top,
                _bottom       = _top + $t.height(),
                compareTop    = partial === true ? _bottom : _top,
                compareBottom = partial === true ? _top : _bottom;
          
          return ( ( compareBottom <= viewBottom ) && ( compareTop >= viewTop ) );

        };

        $('.progress').each( function( i, el ) {
          
            el = $(el);
            
            if (el.visible(true )) {
              
              el.css( 'width', el.text() );
  
            }
  
          });
  
          $( window ).scroll( function ( event ) {
              
              $( '.progress' ).each( function ( i, el ) {
                
                el = $( el );
                
                if ( el.visible( true ) ) {
                  
                  el.css( 'width', el.text() );
  
                }
  
              });
          });
    }

    render(){

        return(
            <div>
                <section id="bio">
                    <div className="mac-bg"><h1 className="move-up">Duane K. Anderson</h1></div>
                
                    <div className="intro">
                        <div className="container">
                            <h1>All you need to know about me.</h1>
                        </div>
                    </div>
                    <div className="container">
                        <div className="split-columns">
                        <p><strong>Creativity</strong>: the ability to transcend traditional ideas, rules, patterns, relationships, or the like, and to create meaningful new ideas, forms, methods, interpretations, etc.; originality, progressiveness, or imagination. That is how <a href="http://www.dictionary.com/">dictionary.com</a> defines creativity, I love everything about that. Something about taking emptiness and filling it with something meaningful, a spark that may be ephemeral or eternal but if you create for even a second. You change the world as you know it. I am Duane K. Anderson founder and owner of DKAnderson Designs LLC a nerd, adventurer, poet, painter, lover of life and true believer in the immutable power of the human spirit. Thank you for stopping by.</p>
                        </div>
                    </div>
                </section>
                <section id="skillset">
                    <header className="container">
                        <h1>Honest personal evaluation of current skillset</h1>
                    </header>
                    <div className="container">
                        <div id="skill-chart">
                            <h2>Front End</h2>
                            <ul className="skillset">
                                <li className="skill">
                                    <h3>CSS</h3> 
                                    <div className="css progress"><span>95%</span></div>
                                </li>
                                <li className="skill">
                                    <h3>HTML5</h3>
                                    <div className="html5 progress"><span>80%</span></div>
                                </li>
                                <li className="skill">
                                    <h3>jQuery</h3>
                                    <div className="jquery progress"><span>70%</span></div>
                                </li>
                                <li className="skill">
                                    <h3>Javascript</h3>
                                    <div className="javascript progress"><span>60%</span></div>
                                </li>
                            </ul>
                            <h2>Backend</h2>
                            <ul className="skillset">
                                <li className="skill">
                                    <h3>PHP</h3> 
                                    <div className="php progress"><span>50%</span></div>
                                </li>
                                <li className="skill">
                                    <h3>Nodejs</h3>
                                    <div className="node progress"><span>30%</span></div>
                                </li>
                            </ul>
                            <h2>Frameworks</h2>
                            <ul className="skillset">
                                <li className="skill">
                                    <h3>Wordpress</h3> 
                                    <div className="wordpress progress"><span>75%</span></div>
                                </li>
                                <li className="skill">
                                    <h3>Angular</h3>
                                    <div className="joomla progress"><span>80%</span></div>
                                </li>
                                <li className="skill">
                                    <h3>BAckbone</h3>
                                    <div className="drupal progress"><span>60%</span></div>
                                </li>
                            </ul>

                        </div>
                    </div>
                    <footer className="container">
                        <p>Disclaimer: The above values are subject to change based on constant improvement.</p>
                    </footer>
                </section>
            </div>
        );
    }
}

export default Bio;