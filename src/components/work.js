import React, { Component } from 'react';
import Loading from './loading-animation';

class Work extends Component{

    constructor(props){
        super(props);
        this.state = {
            data: [],
            currentProject: [],
            loading: true
        }

        this.displayWork = this.displayWork.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    }

    componentWillMount(){

        fetch('/api/work')
            .then(response => response.json())
            .then((response) => {
                this.setState({
                    data: response
                })
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

    handleMouseOver(e){

            e.currentTarget.children[0].children[1].classList.add('animate');
            e.currentTarget.children[1].classList.add('animate');
    }

    handleMouseOut(e){
        
            e.currentTarget.children[0].children[1].classList.remove('animate');
            e.currentTarget.children[1].classList.remove('animate');
        
    }

    displayWork(data){
        return data.map((work, index) => {
                let url = `${process.env.PUBLIC_URL}/images/${work.project_bg}`;
                let slug = work.title.toLowerCase().replace(/ /g,"_");

                return (
                    <article className="project" key={work.client_banner_class}>
                        <a href = {`${slug}?i=${index}`} title={work.title} style={{backgroundImage: `url(${url})`}} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
                            <div className="description">
                                <span>{work.title.charAt(0)}</span>
                                <h1>{work.title}</h1>
                            </div>
                            <div className="tech">
                                <ul>
                                    {
                                        work.tech.map((tech) => {
                                           return(
                                            <li key={tech}>{tech}</li>
                                           );
                                        })
                                    }
                                </ul>
                            </div>
                        </a>
                    </article>
                )
            })
        
    }

    render(){

        return (
            <div>
            <div className="intro">
                <div className="container">
                    <h1 className="move-up">Recent Projects</h1>
                </div>
                </div>
                <section id="folio" className="cf">
                    {this.state.loading && <Loading widthOverride='100px' heightOverride='100px' />}
                    {this.displayWork(this.state.data)}
                
                </section>
            </div>
        );
    }
}

export default Work;