'use client';

import React, { useEffect } from 'react';

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const FormModal: React.FC<FormModalProps> = ({ isOpen, onClose, children, title }) => {
  // Close modal when pressing Escape key
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 d-flex align-items-center justify-content-center" style={{ position: 'fixed', top: '80px', left: 0, width: '100%', height: 'calc(100% - 80px)', overflow: 'auto', zIndex: 9998 }}>
      {/* Backdrop */}
      <div 
        className="fixed-top fixed-bottom bg-dark bg-opacity-50"
        onClick={onClose}
        style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0 }}
      />
      
      {/* Modal Content */}
      <div className="position-relative bg-white rounded shadow" style={{ maxWidth: '800px', width: '100%', margin: '0 1rem', maxHeight: '85vh', zIndex: 9999, overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
        <div className="p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <p className="h5 fw-bold text-dark mb-0">{title}</p>
            <button 
              onClick={onClose}
              className="btn-close"
              style={{ fontSize: '1.25rem', lineHeight: 1 }}
            >
              ×
            </button>
          </div>
          
          <div className="modal-body pt-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormModal;