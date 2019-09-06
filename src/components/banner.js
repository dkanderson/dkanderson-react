import React, { Component } from 'react';
import WorkData from '../workData.json';
import '../css/banner.css';


class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            pageName : this.props.location
        }
    }

    render(){
        
        let isProject = false,
            index = window.location.search.slice(3),
            project = [],
            prevProject = {},
            nextProject = {},
            banner_url = '',
            prevIndex = 0,
            nextIndex = 0,
            isBlog = this.props.location === 'blog' || window.location.pathname.slice(1, 5) === 'blog' ;
            
        if(index){
            isProject = true;
            project = WorkData[index];
            banner_url = `${process.env.PUBLIC_URL}/images/banners/${project.banner}`;
            prevProject = WorkData[parseInt(index) - 1] ? WorkData[parseInt(index) - 1] : WorkData[WorkData.length - 1 ];
            nextProject = (parseInt(index) <= WorkData.length - 2) ? WorkData[parseInt(index) + 1] : WorkData[0];

            prevIndex = index >= 1 ? index - 1 : WorkData.length - 1;
            nextIndex = index <= WorkData.length - 2 ? parseInt(index) + 1 : 0;

        }

        return (    
            <div>
            { (this.props.location === 'home' || this.props.location === '')  &&
                <div id="welcome">
                    <div className="container">
                        <h1>Designing and coding for an ever expanding web of wonders.</h1>
                        <p>...and loving every second</p>
                    </div>
                </div>
            }
            {
                this.props.location === 'bio' && 
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
            }
            {
                this.props.location === 'work' && 

                <div className="intro">
                    <div className="container">
                        <h1 className="move-up">Recent Projects</h1>
                    </div>
                </div>
            }
            {
                this.props.location === 'artgallery' && 

                <div className="intro art-gallery">
                    <div className="container">
                        <h1 className="slide-in">Artgallery</h1>
                        <p className="slide-in">A very recent and absolute favorite obsession. Painting.</p>
                    </div>
                </div>
            }
            {
                isBlog && 

                <div className="intro blog">
                    <div className="container">
                        <h1>Creative Ideas <em className="fancy">&amp;</em> Introspection</h1>
                    </div>
                </div>

            }

            {
                isProject && 

                <section id="client-banner" style={{ backgroundImage: `url(${banner_url})` }}>
                    <a className="project-link" href={project.project_url}><span>{project.title.charAt(0)}</span></a>
                    <div className="project-nav">
                        <a title={prevProject.title} className="prev-project arrow" href={`${prevProject.title.toLowerCase().replace(/ /g,"_")}?i=${prevIndex}`}>
                            <span className="project-nav-label">{prevProject.title}</span>
                            <svg id="left_arrow" className="icon icon-arrow-left" viewBox="0 0 32 32"><use xlinkHref="#icon-arrow-left"></use></svg>
                        </a>
                        <a title={nextProject.title} className="next-project arrow" href={`${nextProject.title.toLowerCase().replace(/ /g,"_")}?i=${nextIndex}`}>
                            <span className="project-nav-label">{nextProject.title}</span>
                            <svg id="right_arrow" className="icon icon-arrow-left2" viewBox="0 0 32 32"><use xlinkHref="#icon-arrow-left2"></use></svg>
                        </a>
                    </div>
                </section>
            }

            
            
            </div>
        );
    }
}

export default Header;