import React, { Component } from 'react';

class ProjectDisplay extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }

    componentWillMount(){
        fetch('/api/work')
        .then(response => response.json())
        .then((response) => {
            this.setUpPage(response);
        })
        .catch((error) => {
            console.error(error);
        })
    }

    setUpPage(data){
        let relPath = `${process.env.PUBLIC_URL}/images/banners`;

            let index = window.location.search.slice(3),
            project = [],
            prevProject = {},
            nextProject = {},
            banner_url = '',
            prevIndex = 0,
            nextIndex = 0;
            
            project = data[index];
            banner_url = `${relPath}/${project.banner}`;
            prevProject = data[parseInt(index) - 1] ? data[parseInt(index) - 1] : data[data.length - 1 ];
            nextProject = (parseInt(index) <= data.length - 2) ? data[parseInt(index) + 1] : data[0];

            prevIndex = index >= 1 ? index - 1 : data.length - 1;
            nextIndex = index <= data.length - 2 ? parseInt(index) + 1 : 0;

            this.setState({
                data,
                prevProject,
                nextProject,
                banner_url,
                prevIndex,
                nextIndex,
                project
            })

    }

    render(){    

        let relPath = `${process.env.PUBLIC_URL}/images`;
        

        return(
            <div>
            { ( this.state.project ) &&
                <div>
                    <section id="client-banner" style={{ backgroundImage: `url(${this.state.banner_url})` }}>
                        <a className="project-link" href={this.state.project.project_url}><span>{this.state.project ? this.state.project.title.charAt(0): ''}</span></a>
                        <div className="project-nav">
                            <a title={this.state.prevProject.title} className="prev-project arrow" href={`${this.state.prevProject.title.toLowerCase().replace(/ /g,"_")}?i=${this.state.prevIndex}`}>
                                <span className="project-nav-label">{this.state.prevProject.title}</span>
                                <svg id="left_arrow" className="icon icon-arrow-left" viewBox="0 0 32 32"><use xlinkHref="#icon-arrow-left"></use></svg>
                            </a>
                            <a title={this.state.nextProject.title} className="next-project arrow" href={`${this.state.nextProject.title.toLowerCase().replace(/ /g,"_")}?i=${this.state.nextIndex}`}>
                                <span className="project-nav-label">{this.state.nextProject.title}</span>
                                <svg id="right_arrow" className="icon icon-arrow-left2" viewBox="0 0 32 32"><use xlinkHref="#icon-arrow-left2"></use></svg>
                            </a>
                        </div>
                    </section>
                    <section id="soleil_laurent">
                        <div className="container sixteen columns clearfix">
                            <div className="container eight columns">
                                <div className="fold"><img src={`${relPath}/uploads/${this.state.project.screenshot_a}`} alt={`${this.state.project.title} Screenshot"`} /></div>
                            </div>
                            <div className="container eight columns">
                                <div className="client-meta">
                                    <h1>{this.state.project.title}</h1>
                                    <dl>
                                        <dt>url</dt>
                                            <dd><a title={this.state.project.title} href={this.state.project.project_url === 'Site is Offline' ? '#' : this.state.project.project_url}>{this.state.project.project_url}</a></dd>
                                        <dt>tech</dt>
                                            <dd>
                                                {
                                                    this.state.project.tech.map((techItem) => {
                                                        return(
                                                            <span key={techItem}>{techItem}, </span>
                                                        );
                                                    })
                                                }
                                            </dd>
                                        <dt>description</dt>	
                                            <dd>{this.state.project.content}</dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </section>
                                            
                </div>
                   
            }
            </div>
        );
    }
}

export default ProjectDisplay;

