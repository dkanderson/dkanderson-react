import React, { Component } from 'react';
import Hammer from 'react-hammerjs';
import $ from 'jquery';
import Loading from './loading-animation';
window.jQuery = window.$ = $;
require('../vendor/featherlight');


var $D = {
    sliderInnerWidth: 0,
    scrollPosition: 0
};



class ArtGallery extends Component{

    constructor(props){
        super(props);
        this.state ={
            data: [],
            scrollPosition: 0,
            valuesSet: false,
            loading: true
        }

        this.slideLeft = this.slideLeft.bind(this);
        this.slideRight = this.slideRight.bind(this);
    }

    componentWillMount(){

            fetch('/api/artwork')
                .then(response => response.json())
                .then((response) => {
                    this.setState({
                        data: response
                    });
                })
                .then(()=>{
                    this.setState({
                        loading: false
                    })
                })
                .catch((error) => {
                    console.error(error);
                })

    }

    setSliderValues(){

        $D.slideWrapper = $( '.slide-wrapper' );
        $D.slideInner = []; 

        $.featherlight.defaults.afterOpen = function () {

            let sexyClass = this.$source[0].classList[1];

            if( sexyClass ) {
                
                this.$instance.children()[0].classList.add( sexyClass );            
            }
            
        };

        $.each ( $D.slideWrapper.children(), function( i, child ) { 

            $D.slideInner.push ( $( child ).outerWidth() ); 
            $D.sliderInnerWidth += $( child ).outerWidth();
           
        }); 

    }
    
    slideLeft() {

        if ( $D.scrollPosition < 0 ) {

            $D.scrollPosition = $D.scrollPosition + 240;
            this.setState({
                scrollPosition: $D.scrollPosition
            });
        }

    }

    slideRight() {

    
        if (!this.state.valuesSet){
            this.setSliderValues();
            this.setState({
                valuesSet: true
            })
        } 

        if ( $D.scrollPosition >= ( ( $D.sliderInnerWidth - 280 ) * -1 ) ) {

            $D.scrollPosition = $D.scrollPosition - 240;
            this.setState({
                scrollPosition: $D.scrollPosition
            });
        }

    }

    populateGallery(data){
        
        let relPath = `${process.env.PUBLIC_URL}/images/uploads`; 

        return data.map((data) => {
            return (
                <article className="art-framed black-white" key={data.infobox_id}>
                    
                            <button data-featherlight={`#${data.infobox_id}`} className="info-button art-details">i</button>
                            
                            <a href={`${relPath}/zoom/${data.painting_lg}`} data-featherlight="image" className="art-work img-view">
                                <div className="">
                                    <div className="art ">
                                        <img src={`${relPath}/${data.painting_sm}`} alt={data.title} />
                                    </div>
                                    
                                    <div id="temp" className="photo">
                                        <img src={`${relPath}/${data.original_img}`} alt={data.title} />
                                    </div>

                                </div>
                            </a>
                            <div id={`${data.infobox_id}`} className="info-box">
                                <ul className="details">
                                    <li><span>Title: </span>{data.title}</li>
                                    <li><span>Status: </span>{data.status}</li>
                                    <li><span>Medium: </span>{data.medium}</li>
                                    <li><span>Subject: </span>{data.subject}</li>
                                    <li><span>Type: </span>{data.type}</li>
                                    <li><span>Size: </span>{data.size}</li>
                                </ul>
                            </div>
                        </article>
            );
        })
    }

    render(){

        return(
            <div>
                {this.state.loading && <Loading heightOverride='100px' widthOverride='100px' />}
                <div className="intro art-gallery">
                    <div className="container">
                        <h1 className="slide-in">Artgallery</h1>
                        <p className="slide-in">A very recent and absolute favorite obsession. Painting.</p>
                    </div>
                </div>
                <section id="gallery-display" className="gallery-display cf">
        
                    <nav className="slide-nav">
                        <button className="slide-left" onClick={this.slideLeft}>
                            <svg id="left_arrow" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 50">
                                <path d="M149.12,163.32,172,140.48a1.63,1.63,0,0,1,2.31,2.31l-21.69,21.68,21.69,21.69a1.63,1.63,0,0,1-2.31,2.31l-22.84-22.84A1.63,1.63,0,0,1,149.12,163.32Z" transform="translate(-113 -139)"/>
                            </svg>

                        </button>
                        <button className="slide-right" onClick={this.slideRight}>
                            <svg id="right_arrow" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 68 50">
                                <path d="M213.43,163.32l-22.84-22.84a1.63,1.63,0,0,0-2.31,2.31L210,164.47l-21.69,21.69a1.63,1.63,0,0,0,2.31,2.31l22.84-22.84A1.63,1.63,0,0,0,213.43,163.32Z" transform="translate(-182 -139)"/>
                            </svg>
                        </button>
                    </nav>

                    <div className="gallery-container">
                        <Hammer onSwipeLeft={this.slideRight} onSwipeRight={this.slideLeft}>
                            <div id="gallery-inner" className="slide-wrapper cf" style={{left: this.state.scrollPosition}} >
                                { this.populateGallery(this.state.data) }
                            </div>
                        </Hammer>
                    </div>
                </section>
            </div>
        );
    }
}



export default ArtGallery;