import React, { useEffect } from 'react';
import '../../assets/css/footer/footer.css';
import 'particles.js'; 
import logo from '../../assets/images/dashboard/logo3.png'

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container19 flex">
                {/* Mission Section */}
                <div className="footer-column mission">
                    <h3><img  className="logoStyle" src={logo}/>Centre nationale de greffe de moelle osseuse</h3>
                    <p>Sauver des vies grâce à des soins avancés de transplantation de moelle osseuse et à la recherche.</p>
                </div>

                {/* Contact Section */}
                <div className="footer-column contact">
                    <h3>Contacter</h3>
                    <p><i className="fas fa-envelope"></i>Centredegreffe@gmail.com</p>
                    <p><i className="fas fa-phone"></i> Tél/FAX : 71 568 903</p>
                    <p><i className="fas fa-map-marker-alt"></i> 13, rue Djebel Lakhdhar Bab Saadoun-Tunis-1006</p>
                </div>

                {/* Social Media Section */}
                <div className="footer-column social">
                    <h3>Réseaux sociaux</h3>
                    <p>
                        <a href="https://facebook.com/marrowcenter" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook-f"></i> Facebook
                        </a>
                    </p>
                    <p>
                        <a href="https://instagram.com/marrowcenter" target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i> Instagram
                        </a>
                    </p>
                </div>
            </div>
            <div className="footer-bottom">
            <p >&copy; 2025 Centre national de greffe de moelle osseuse,tous droits réservés.</p>
            </div>
        </footer>
    );
};

export default Footer;