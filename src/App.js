import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container, Button, Typography, Box } from '@mui/material';
import TemplateSelector from './components/TemplateSelector';
import ImageThemeInput from './components/ImageThemeInput';
import LoadingIndicator from './components/LoadingIndicator';
import PdfViewer from './components/PdfViewer';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
  palette: {
    background: {
      default: '#f5f5f5',
    },
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      marginBottom: '1rem',
      fontWeight: 500,
    },
  },
});

function App() {
  const [template, setTemplate] = useState('');
  const [imageTheme, setImageTheme] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pdfBlob, setPdfBlob] = useState();

  // TODO: move to config file
  const DOMAIN = 'https://endlessly-dear-lionfish.ngrok-free.app/teacher-ai';

  const handleGeneratePdf = async () => {
    if (!template || !imageTheme) {
      toast.error('Please select a template and enter a theme.');
      return;
    }
    
    try {
      // Generate the PDF
      console.log('Generating PDF...');

      const generateResponse = await axios.post(`${DOMAIN}/generate-word-bubbles`, null, {
        params: { theme: imageTheme },
        headers: { 'ngrok-skip-browser-warning': true }
      });
      
      const taskId = generateResponse.data.taskId;

      console.log('Polling status for task... ' + taskId);
      const finalStatus = await poll_generation_status(taskId);

      if (finalStatus === 'Failed') {
        toast.error('Failed to generate PDF.');
        return;
      }

      // Fetch the generated PDF
      console.log('Retrieving generated PDF...');

      const response = await axios.get(`${DOMAIN}/worksheet`, {
        params: { taskId: taskId },
        headers: { 'ngrok-skip-browser-warning': true },
        responseType: 'blob'
      });

      // Create a blob URL for the PDF
      const fileURL = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      setPdfBlob(fileURL);

      toast.success('PDF generated successfully!');
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message || 'Failed to generate PDF.');
    }
  }

  // Helper function to pause execution for a given number of milliseconds
  const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const poll_generation_status = async (taskId) => {
    setIsLoading(true);

    // Poll the status endpoint until the generation is complete or failed
    let status = 'Running';
    while (status !== 'Failed' && status !== 'Complete') {
      const response = await axios.get(`${DOMAIN}/status`, {
        params: { taskId: taskId },
        headers: { 'ngrok-skip-browser-warning': true }
      });
      console.log('Response: ' + JSON.stringify(response));

      status = response.data.status;
      console.log('Current status... ' + status);
      if (status !== 'Failed' && status !== 'Complete') {
        // wait here for 10 seconds before polling again
        await sleep(10000);
      }
    }

    setIsLoading(false);
    return status;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" style={{ padding: '2rem', backgroundColor: '#fff', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px' }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Worksheet PDF Generator
        </Typography>
        <TemplateSelector onSelect={setTemplate} />
        <ImageThemeInput onChange={setImageTheme} />
        <Box display="flex" justifyContent="center" mt={2}>
          <Button variant="contained" color="primary" onClick={handleGeneratePdf} disabled={isLoading}>
            Generate PDF
          </Button>
        </Box>
        {isLoading && <LoadingIndicator />}
        {pdfBlob && <PdfViewer pdfUrl={pdfBlob} />}
        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover draggable />
      </Container>
    </ThemeProvider>
  );
}

export default App;