import React, { useState } from 'react';
import TemplateSelector from './components/TemplateSelector';
import PromptInput from './components/PromptInput';
import LoadingIndicator from './components/LoadingIndicator';
import PdfViewer from './components/PdfViewer';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Button, Typography } from '@mui/material';

function App() {
  const [template, setTemplate] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleGeneratePdf = async () => {
    if (!template || !prompt) {
      toast.error('Please select a template and enter a prompt.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post('/api/generate-pdf', { template, prompt }); // Replace with your actual backend API endpoint
      // Assume response.data contains the PDF URL
      setPdfUrl(response.data.pdfUrl);
      toast.success('PDF generated successfully!');
    } catch (error) {
      toast.error('Failed to generate PDF.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        AI Image PDF Generator
      </Typography>
      <TemplateSelector onSelect={setTemplate} />
      <PromptInput onChange={setPrompt} />
      <Button variant="contained" color="primary" onClick={handleGeneratePdf} disabled={isLoading}>
        Generate PDF
      </Button>
      {isLoading && <LoadingIndicator />}
      {pdfUrl && <PdfViewer pdfUrl={pdfUrl} />}
      <ToastContainer />
    </Container>
  );
}

export default App;