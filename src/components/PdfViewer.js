import React from 'react';
import { Button } from '@mui/material';
import { PictureAsPdf } from '@mui/icons-material';

const PdfViewer = ({ pdfUrl }) => (
  <Button
    variant="outlined"
    color="secondary"
    startIcon={<PictureAsPdf />}
    href={pdfUrl}
    target="_blank"
    rel="noopener noreferrer"
    fullWidth
    style={{ marginTop: '20px' }}
  >
    View PDF
  </Button>
);

export default PdfViewer;