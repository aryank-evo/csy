import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { hasRecentLeadSubmission, markLeadSubmissionNow } from '@/utils/leadCaptureStorage';

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

  const buildPropertyDetailPath = (property: PropertyDetails): string => {
    const propertyType = property.type?.toLowerCase() || 'property';

    switch(propertyType) {
      case 'sale':
      case 'buy':
        return `/buy/${property.id}`;
      case 'rent':
        return `/rent/${property.id}`;
      case 'lease':
        return `/lease/${property.id}`;
      case 'pg':
      case 'hostel':
        return `/pg/${property.id}`;
      case 'commercial':
        return `/commercial/${property.id}`;
      case 'land':
        return `/land/${property.id}`;
      default:
        return `/property-details/${property.id}`;
    }
  };

  const openLeadModal = (property: PropertyDetails) => {
    if (hasRecentLeadSubmission()) {
      router.push(buildPropertyDetailPath(property));
      return;
    }

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
      markLeadSubmissionNow();
      router.push(buildPropertyDetailPath(selectedProperty));
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
