import React from 'react';
// import Container from '@mui/material/Container';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
import { useAuth0 } from '@auth0/auth0-react';
import LandingPageAppBar from './LandingPageAppBar';
import LoginButton from './LoginButton';
import backgroundImage from '../assets/shared-images/landingpage-background.jpg';

// const navigate = useNavigate();

const LandingPage = () => {
  const { isAuthenticated } = useAuth0(); // isAuthenticated
  return (
    !isAuthenticated && (
    <div style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      backgroundPosition: 'center',
      height: '500',
    }}
    >
      <LandingPageAppBar />
      {/* <Container maxWidth="lg"> */}
      <div>
        Landing Page
        <LoginButton />
      </div>
      {/* </Container> */}
    </div>
    )
  );
};

export default LandingPage;

// import * as React from 'react';
// // import Box from '@mui/material/Box';
// import CardMedia from '@mui/material/CardMedia';
// // import Image from 'material-ui-image';

// export default function LandingPage() {
//   return (
//   // <Box
//   //   sx={{
//   //     height: 1024,
//   //     width: 1050,
//   //     // maxHeight: { xs: 233, md: 167 },
//   //     // maxWidth: { xs: 350, md: 250 },
//   //   }}
//   // >
//     <CardMedia
//       component="img"
//       height="194"
//       style={{ height: 0, paddingTop: '50%' }}
//       image="https://cdn.pixabay.com/photo/2017/06/06/22/46/mediterranean-cuisine-2378758_1280.jpg"
//       alt="Paella dish"
//     />
//     );
//   }

// </Box>
// <Box
//   sx={{
//     display: 'flex',
//     flexDirection: { xs: 'column', md: 'row' },
//     alignItems: 'center',
//     bgcolor: 'background.paper',
//     overflow: 'hidden',
//     borderRadius: '12px',
//     boxShadow: 1,
//     fontWeight: 'bold',
//   }}
// >
//   <Box
//     component="img"
//     sx={{
//       height: 233,
//       width: 350,
//       maxHeight: { xs: 233, md: 167 },
//       maxWidth: { xs: 350, md: 250 },
//     }}
//     alt="The house from the offer."
//     // src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
//     src="../assets/shared-images/landingpage-background.jpg"
//   />
//   <Box
//     sx={{
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: { xs: 'center', md: 'flex-start' },
//       m: 3,
//       minWidth: { md: 350 },
//     }}
//   />
// </Box>
