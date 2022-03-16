import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from './UploadModal.module.scss';
import { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';


export default function UploadModal(props: any) {
  const [url, setUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [label, setLabel] = useState("");
  const [analyze, setAnalyze] = useState(true);
  const fileInput = useRef(null);

  function resetState() {
    setUrl("");
    setSelectedFile(null);
    setLabel("");
    setAnalyze(true);
  }

  const handleFileInput = (e: any) => {
    console.log(e.target.files[0])
    const file = e.target.files[0];
    setSelectedFile(file);
  }

  const submitForm = async () => {
    const formData = new FormData();
    formData.append("url", url);
    formData.append("file", selectedFile as any);
    formData.append("label", label as any);
    formData.append("analyze", analyze as any);

    try {
      let res: any = await axios.post('/images', formData);

      if (res.data.objects_identified.length > 0) {
        props.onUpload(res.data.objects_identified.map((item: any) => item.label));
      }

      resetState();
      props.close();
    } catch (err) {
      alert("File Upload Error");
    }
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2.5,
    boxShadow: 24,
    p: 4,
    outline: 0
  };

  return (
    <div className={styles.UploadModal}>
      <Modal
        open={props.open}
        onClose={props.close}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2" sx={{
            textAlign: 'center',
            color: 'primary.main',
            fontWeight: 'bold'
          }}>
            Process Image
          </Typography>

          <Box sx={{ marginTop: '2rem'}}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <TextField label="Url" value={url} onChange={event => setUrl(event.target.value)} variant="outlined" size="small" sx={{
              }}/>

              <div>or</div>

              <Button onClick={() => fileInput.current && (fileInput.current as any).click()} variant="contained" component="label">
                Upload File
                <input type="file" onChange={handleFileInput} hidden/>
              </Button>
            </Box>
            <TextField label="Label" value={label} onChange={event => setLabel(event.target.value)} variant="outlined" size="small" sx={{
              marginTop: '1rem'
            }}/>
            <Box sx={{ marginTop: '0.7rem', display: 'flex', alignItems: 'center' }}>
              <Typography id="modal-modal-title" variant="body1" component="p">
              Analyze
            </Typography>
              <Checkbox checked={analyze} onChange={event => setAnalyze(event.target.checked)} />
            </Box>
            { selectedFile && <Box sx={{marginTop: '1rem', textAlign: 'center'}}>File: {selectedFile.name}</Box> }
          </Box>
          
          
          <Button onClick={submitForm} variant="contained" sx={{
            width: '100%',
            height: '2.8rem',
            marginTop: '2rem',
            borderRadius: 1.5
          }}>
            Submit
          </Button>
        </Box>
      </Modal>
    </div>
  );
}