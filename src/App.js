import './App.css';
import Header from './components/Header/Header'
import Body from './components/Body/Body'
import Footer from './components/Footer/Footer'
import { Helmet, HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <div> 
    <HelmetProvider>
      <Helmet>
        <title>Siva's ToDo List</title>
      </Helmet>
      <Header />
      <Body />
      <Footer />
    </HelmetProvider>
    </div>
  );
}

export default App;