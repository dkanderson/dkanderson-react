import React, { Component } from 'react';

class Header extends Component{
    constructor(props){
        super(props);
        this.state = {
            pageName : 'home'
        }
    }

    componentWillMount(){
        this.setState({
            pageName: window.location.pathname.replace(/^\/+|\/+$/g, '')
        })
    }

    render(){
        const pageName = window.location.pathname.replace(/^\/+|\/+$/g, '');

        return (    
            <div>
            { pageName === 'home'  &&
                <div id="welcome">
                    <div class="container">
                        <h1>Designing and coding for an ever expanding web of wonders.</h1>
                        <p>...and loving every second</p>
                        <p>{this.props.location}</p>
                    </div>
                </div>
            }

            {
                pageName === 'bio' && 
                <section id="bio">
                    <div class="mac-bg"><h1>Duane K. Anderson</h1></div>
                
                    <div class="intro">
                        <div class="container">
                            <h1>All you need to know about me.</h1>
                        </div>
                    </div>
                </section>
            }
            </div>
        );
    }
}

export default Header;