import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Typography } from '@mui/material';
import LoginButton from './Authentication/LoginButton';
import backgroundImage from '../assets/shared-images/landingpage-background.jpg';
import './LandingPage.css';

const LandingPage = () => {
  const { isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
    <>
      <div className="main">
        <div className="left">
          <Typography variant="h2" id="hero-text">Big Bite Recipe Manager makes saving your recipes easier. Free for personal use.</Typography>
          <div className="subtitle">
            <LoginButton />
          </div>
        </div>
        <div className="right">
          <img src={backgroundImage} alt="background" width="800" className="hero-image" />
        </div>
      </div>
      <footer id="about">
        <div className="credits">
          <div className="credits-left">
            <Typography component="span" variant="body1">
              Made by:
              {' '}
              <a href="https://github.com/mlwalters" className="credits-links" target="_blank" rel="noreferrer">Maricar Lusuegro Walters</a>
            </Typography>
          </div>
          <div className="credits-right">
            <Typography component="span" variant="body2">
              Illustrations are from
              {' '}
              <a href="https://canva.com/" className="credits-links" target="_blank" rel="noreferrer">canva.com</a>
              {' '}
              and
              {' '}
              <a href="https://www.freepik.com/" className="credits-links" target="_blank" rel="noreferrer">freepik.com</a>
            </Typography>
            <Typography component="span" variant="body2">
              SVG waves from
              {' '}
              <a href="https://getwaves.io/" className="credits-links" target="_blank" rel="noreferrer">getwaves.io</a>
            </Typography>
          </div>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#F3F4F5" fillOpacity="0.75" d="M0,128L48,149.3C96,171,192,213,288,229.3C384,245,480,235,576,218.7C672,203,768,181,864,165.3C960,149,1056,139,1152,160C1248,181,1344,235,1392,261.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" /></svg>
      </footer>
    </>
    )
  );
};

export default LandingPage;
