import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PropertyDetails {
  id: number | string;
  title: string;
  price?: string;
  location?: string;
  type?: string;
}

interface UseLeadCaptureReturn {
  showLeadModal: boolean;
  selectedProperty: PropertyDetails | null;
  openLeadModal: (property: PropertyDetails) => void;
  closeLeadModal: () => void;
  handleLeadSuccess: () => void;
}

export const useLeadCapture = (): UseLeadCaptureReturn => {
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<PropertyDetails | null>(null);
  const router = useRouter();

  const openLeadModal = (property: PropertyDetails) => {
    setSelectedProperty(property);
    setShowLeadModal(true);
  };

  const closeLeadModal = () => {
    setShowLeadModal(false);
    setSelectedProperty(null);
  };

  const handleLeadSuccess = () => {
    // After successful lead submission, redirect to property detail page
    if (selectedProperty) {
      const propertyType = selectedProperty.type?.toLowerCase() || 'property';
      let detailPath = '';
      
      // Map property types to their respective detail pages
      switch(propertyType) {
        case 'sale':
        case 'buy':
          detailPath = `/buy/${selectedProperty.id}`;
          break;
        case 'rent':
          detailPath = `/rent/${selectedProperty.id}`;
          break;
        case 'lease':
          detailPath = `/lease/${selectedProperty.id}`;
          break;
        case 'pg':
        case 'hostel':
          detailPath = `/pg/${selectedProperty.id}`;
          break;
        case 'commercial':
          detailPath = `/commercial/${selectedProperty.id}`;
          break;
        case 'land':
          detailPath = `/land/${selectedProperty.id}`;
          break;
        default:
          // For dynamic properties or unknown types, use a generic detail page
          detailPath = `/property-details/${selectedProperty.id}`;
          break;
      }
      
      router.push(detailPath);
    }
  };

  return {
    showLeadModal,
    selectedProperty,
    openLeadModal,
    closeLeadModal,
    handleLeadSuccess
  };
};