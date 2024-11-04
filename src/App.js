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

  const handleGeneratePdf = async () => {
    if (!template || !imageTheme) {
      toast.error('Please select a template and enter a theme.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('https://endlessly-dear-lionfish.ngrok-free.app/generate-word-bubbles', { theme: imageTheme }, { responseType: 'blob' });

      // Create a blob URL for the PDF
      const fileURL = URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      setPdfBlob(fileURL);

      toast.success('PDF generated successfully!');
    } catch (error) {
      toast.error('Failed to generate PDF.');
    } finally {
      setIsLoading(false);
    }
  };

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