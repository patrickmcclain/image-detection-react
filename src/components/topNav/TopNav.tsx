import styles from './TopNav.module.scss';
import logo from '../../assets/images/logo.svg';
import { Box } from '@mui/system';
import UploadButton from '../inputs/UploadButton/UploadButton';
import Search from '../inputs/Search/Search';
import { useState } from 'react';

export function TopNav(props: any) {
  const [labels, setLabels] = useState([]);

  function onSearch(newLabels: any){
    props.onSearch(newLabels);
    setLabels(newLabels);
  }

  return (
    <Box className={styles.TopNav} sx={{
      bgcolor: 'primary.main'
    }}>
      <div className={styles.TopNavInnerWrapper}>
        <div className={styles.logoAndSearchWrapper}>
          <img src={logo} className={styles.img} alt="HEB Logo" />
          <Search onSearch={onSearch} labels={labels}/>
        </div>
        <UploadButton onUpload={onSearch}/>
      </div>
    </Box>
  );
}