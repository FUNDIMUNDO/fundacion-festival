// src/components/StickyBanner.jsx
import React from 'react';
import { Button } from 'react-bootstrap';
import '../styles/StickyBanner.css';

const StickyBanner = () => (
  <div className="sticky-banner d-flex justify-content-between align-items-center px-4">
    <span className="mb-0">¿Listo para unirte a nuestra misión?</span>
    <Button className="btn-accent btn-sm ripple">
      Únete ahora
    </Button>
  </div>
);

export default StickyBanner;
