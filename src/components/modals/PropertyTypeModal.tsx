'use client';

import React, { useState, useEffect } from 'react';
import FormModal from './FormModal';
import SellPropertyForm from '../forms/listings/SellPropertyForm';
import RentPropertyForm from '../forms/listings/RentPropertyForm';
import PgPropertyForm from '../forms/listings/PgPropertyForm';
import LeasePropertyForm from '../forms/listings/LeasePropertyForm';
import CommercialPropertyForm from '../forms/listings/CommercialPropertyForm';
import LandPropertyForm from '../forms/listings/LandPropertyForm';

interface PropertyTypeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const PropertyTypeModal: React.FC<PropertyTypeModalProps> = ({ isOpen, onClose }) => {
    const [selectedForm, setSelectedForm] = useState<string | null>(null);

    const listingTypes = [
        { id: 'sell', label: 'Sell', icon: '🏠' },
        { id: 'rent', label: 'Rent', icon: '🏢' },
        { id: 'lease', label: 'Lease', icon: '🏢' },
        { id: 'pg', label: 'PG (Pay Guest)', icon: '🛏️' },
        { id: 'commercial', label: 'Commercial', icon: '🏢' },
    ];

    const handleTypeSelect = (type: string) => {
        setSelectedForm(type);
    };

    const closeFormModal = () => {
        setSelectedForm(null);
    };

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

    const renderForm = () => {
        switch (selectedForm) {
            case 'sell':
                return <SellPropertyForm />;
            case 'rent':
                return <RentPropertyForm />;
            case 'pg':
                return <PgPropertyForm />;
            case 'lease':
                return <LeasePropertyForm />;
            case 'commercial':
                return <CommercialPropertyForm />;
            case 'land':
                return <LandPropertyForm />;
            default:
                return null;
        }
    };

    if (!isOpen && !selectedForm) return null;

    return (
        <>
            {/* Property Type Selection Modal */}
            {isOpen && !selectedForm && (
                <div className="fixed inset-0 z-50 d-flex align-items-center justify-content-center" style={{ position: 'fixed', top: '80px', left: 0, width: '100%', height: 'calc(100% - 80px)', overflow: 'auto', zIndex: 9998 }}>
                    {/* Backdrop */}
                    <div
                        className="fixed-top fixed-bottom bg-dark bg-opacity-50"
                        onClick={onClose}
                        style={{ width: '100vw', height: '100vh', position: 'fixed', top: 0, left: 0 }}
                    />

                    {/* Modal Content */}
                    <div className="position-relative bg-white rounded shadow" style={{ maxWidth: '600px', width: '100%', margin: '0 1rem', maxHeight: '85vh', zIndex: 9999, overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
                        <div className="p-4">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <p className="h5 fw-bold text-dark mb-0">Choose Property Type</p>
                                <button
                                    onClick={onClose}
                                    className="btn-close"
                                    style={{ fontSize: '1.25rem', lineHeight: 1 }}
                                >
                                    ×
                                </button>
                            </div>

                            <p className="text-muted mb-4 text-center">
                                Select the type of property listing you want to create
                            </p>
                            
                            <div className="row row-cols-1 row-cols-sm-2 g-3">
                                {listingTypes.map((type) => (
                                    <div className="col" key={type.id}>
                                        <button
                                            onClick={() => handleTypeSelect(type.id)}
                                            className="w-100 d-flex flex-column align-items-center p-3 border rounded hover-border-primary bg-light hover-bg-light"
                                            style={{ minHeight: '100px', border: '2px solid #dee2e6', cursor: 'pointer' }}
                                        >
                                            <div className="fs-1 mb-2">{type.icon}</div>
                                            <p className="mb-0 fw-semibold text-dark">{type.label}</p>
                                        </button>
                                    </div>
                                ))}
                            </div>
                            
                            <div className="mt-4 d-flex justify-content-center">
                                <button
                                    onClick={onClose}
                                    className="btn btn-outline-secondary btn-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Form Modal */}
            {selectedForm && (
                <FormModal
                    isOpen={!!selectedForm}
                    onClose={closeFormModal}
                    title={`${selectedForm.charAt(0).toUpperCase() + selectedForm.slice(1)} Property Form`}
                >
                    {renderForm()}
                </FormModal>
            )}
        </>
    );
};

export default PropertyTypeModal;