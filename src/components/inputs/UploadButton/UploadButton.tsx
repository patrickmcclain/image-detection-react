import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from './UploadButton.module.scss';
import UploadModal from '../../modals/UploadModal';

export default function UploadButton(props: any) {
  const [open, setOpen] = React.useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return (
    <div className={styles.UploadButton}>
      <Button variant="outlined" onClick={openModal} sx={{
        color: 'common.white', borderColor: 'common.white', borderRadius: 1.5
      }}>
        Upload
      </Button>
      <UploadModal open={open} close={closeModal} onUpload={props.onUpload} />
    </div>
  );
}