import React, { Component } from 'react';
import profilePhoto from '../img/profile_bw.jpg';
import isVisible from '../helpers/isVisible';

class Footer extends Component{
    
    componentDidMount(){
        let ppl = document.getElementById('paypalLink');

        window.onscroll = function(){
            if(isVisible(true, ppl)){
                ppl.classList.add('animate-in');
            }
        };
    }
    
    render(){
        return(
            <section id="footer" className="footer">
                
                <footer className="container">
                    <div className="one-third column">
                        <h3>Quick About.</h3>
                        <a title="Learn more about Duane Anderson" href="/bio" className="img-wrapper"><img src={profilePhoto} alt="DK Anderson" /></a>
                        <p>That's me. On a good day. The rest of the time I am wearing jeans and a t-shirt, coding, designing or hanging with my son. <a href="/bio" title="more about Duane">more here</a></p>
                    </div>
                    <div className="one-third column">
                        <h3>Contact Me</h3>
                        <p>I am always interested in opinions that help me improve, so if you have ideas or just want to connect about a potential project, reach out. The best way to contact me is via <a href="mailto:duane@dkanderson.net" title="Send me an email">email</a>.</p>

                        <p className="paypal-intro">Like what you see? Help me keep it goig.</p>
                        <a href="http://paypal.me/dkandersondesigns" title="paypal support" id="paypalLink" className="paypal-link">Paypal</a>
                    </div>
                    <div className="one-third column">
                        <h3>Social</h3>
                        <p>I try my best at social networking when I can but I should warn you I am not very good at it. My feable attempt are summed up below: </p>
                        <nav className="social-icons">
                            <a href="http://twitter.com/dkanderson"><svg className="icon icon-twitter" viewBox="0 0 32 32"><use xlinkHref="#icon-twitter"></use></svg></a>
                            <a href="http://instagram.com/duane677"><svg className="icon icon-instagram" viewBox="0 0 32 32"><use xlinkHref="#icon-instagram"></use></svg></a>
                            <a href="http://www.linkedin.com/in/dkanderson"><svg className="icon icon-linkedin" viewBox="0 0 32 32"><use xlinkHref="#icon-linkedin"></use></svg></a>
                            <a href="http://github.com/dkanderson"><svg className="icon icon-github" viewBox="0 0 32 32"><use xlinkHref="#icon-github"></use></svg></a>
                        </nav>
                    </div>
                </footer>
                <div id="copy-wrap">
                    <div className="container">
                        <span className="copy">&copy; Copyright 2019. DKAnderson Designs LL</span> 
                    </div>
                </div>
            </section>
        );
    }
    
}
export default Footer;