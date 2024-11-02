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
    style={{ marginTop: 20 }}
  >
    View PDF
  </Button>
);

export default PdfViewer;