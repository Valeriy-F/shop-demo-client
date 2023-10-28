import Navigation from './ui/navigation';
import { Container } from '@mui/material';
import { ReactNode } from 'react';

type TLayout = {
    children: ReactNode
}

const Layout = ({children}:TLayout) => {
  const stylesContainer = {
    padding: '2rem'
  }

    return (<>
      <Navigation />
      <Container maxWidth='lg' sx={stylesContainer}>
        {children}
      </Container>
    </>);
}

export default Layout
