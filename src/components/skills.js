import React, { Component } from 'react';
import { ReactComponent as AppDevSVG } from '../img/svg/icon-appdev.svg';
import { ReactComponent as WebSVG } from '../img/svg/icon-web.svg';
import { ReactComponent as WpDevSVG } from '../img/svg/icon-wpdev.svg';
import { ReactComponent as IdeasSVG } from '../img/svg/icon-ideas.svg';

class Skills extends Component{

    render(){
        return (
            <div>
                <div id="welcome">
                    <div className="container">
                        <h1>Designing and coding for an ever expanding web of wonders.</h1>
                        <p>...and loving every second</p>
                    </div>
                </div>
                <section id="skills">
                    <div className="container sixteen columns">
                        
                        <div className="skill four columns">
                            <div className="icon-wrap"><AppDevSVG /></div>
                            <h2>Application Development</h2>
                            <p>In an increasingly dynamic and interactive world, web and mobile applications can greatly increase your company's agility. Lets talk about how I can help.</p>
                        </div>
                        <div className="skill four columns">
                            <div className="icon-wrap"><WebSVG /></div>
                            <h2>Web Design</h2>
                            <p>Your presence online says a lot about who you are as a company or person. DKAnderson Designs has years of experience designing beautiful web experiences.</p>
                        </div>
                        <div className="skill four columns">
                            <div className="icon-wrap"><WpDevSVG /></div>
                            <h2>WordPress Development</h2>
                            <p>Wordpress is a powerful content management framework that can provide a familiar interface for updating application content by users at all levels.</p>
                        </div>
                        <div className="skill four columns">
                            <div className="icon-wrap"><IdeasSVG /></div>
                            <h2>Creative Ideas</h2>
                            <p>Design, art, poetry and everything in between. I love to create, please be sure to stop by the<br /> <a href="/artgallery">art gallery</a> and <a href="/blog">blog</a>.</p>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default Skills;