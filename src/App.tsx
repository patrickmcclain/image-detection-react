import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import styles from './App.module.scss';
import { Footer } from './components/footer/Footer';
import { TopNav } from './components/topNav/TopNav';
import { Results } from './pages/Results/Results';
import { theme } from './assets/themes/themes';
import { ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useImageSearch } from './services/images/ImageService';
axios.defaults.baseURL = 'http://localhost:3000';


function App() {
  const [labels, images] = useImageSearch();

  return (
    <div className={styles.App}>
      <ThemeProvider theme={theme}>
        <TopNav onSearch={labels} />
        <Results images={images}/>
        <Footer />
      </ThemeProvider>
    </div>
  );
}

export default App;
