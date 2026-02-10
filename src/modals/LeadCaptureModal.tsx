"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { leadApi } from "@/utils/leadApi";
import { toast } from "sonner";

// Add CSS for modal animation
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        transform: translateY(-50px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);
}

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: () => void;
  propertyDetails?: {
    id: number | string;
    title: string;
    price?: string;
    location?: string;
    type?: string;
  };
}

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  address: yup.string().required("Address is required"),
  email: yup.string().email("Invalid email format"),
  description: yup.string().required("Please tell us what you're looking for"),
});

type FormData = yup.InferType<typeof schema>;

const LeadCaptureModal = ({
  isOpen,
  onClose,
  onSubmitSuccess,
  propertyDetails,
}: LeadCaptureModalProps) => {
  const [loading, setLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const leadData = {
        name: data.name,
        phone: data.phone,
        address: data.address,
        email: data.email || null,
        description: data.description,
        propertyId: propertyDetails?.id || null,
        propertyTitle: propertyDetails?.title || null,
        propertyPrice: propertyDetails?.price || null,
        propertyLocation: propertyDetails?.location || null,
        propertyType: propertyDetails?.type || null,
      };

      const response = await leadApi.createLead(leadData);
      
      if (response.success) {
        toast.success("Lead submitted successfully!");
        reset();
        onSubmitSuccess();
        onClose();
      } else {
        toast.error(response.message || "Failed to submit lead");
      }
    } catch (error) {
      console.error("Lead submission error:", error);
      toast.error("Failed to submit lead. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="modal fade show d-block" 
      style={{ 
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(5px)',
        zIndex: 9999,
        position: 'fixed',
        inset: 0,
        overflow: 'auto',
        transition: 'all 0.3s ease-in-out'
      }}
      onClick={(e) => {
        // Allow closing on backdrop click
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        className="modal-dialog modal-dialog-centered" 
        style={{ 
          maxWidth: '600px', 
          margin: '50px auto',
          padding: '20px'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div 
          className="modal-content" 
          style={{
            borderRadius: '12px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            border: 'none',
            animation: 'slideIn 0.3s ease-out',
            overflow: 'hidden'
          }}
        >
          <div 
            className="modal-header" 
            style={{
              backgroundColor: '#f8f9fa',
              borderBottom: '1px solid #dee2e6',
              padding: '20px 25px'
            }}
          >
            <h5 
              className="modal-title" 
              style={{
                margin: 0,
                fontWeight: 600,
                color: '#2c3e50'
              }}
            >
            Submit to see Details
            </h5>
            {/* Close button removed - user must submit form to view property */}
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="modal-body" style={{ padding: '25px' }}>
              {/* {propertyDetails && (
                <div className="alert alert-info mb-4">
                  <h6 className="mb-2">You&#39;re interested in :</h6>
                  <p className="mb-1"><strong>{propertyDetails.title}</strong></p>
                  {propertyDetails.price && <p className="mb-1">Price: {propertyDetails.price}</p>}
                  {propertyDetails.location && <p className="mb-1">Location: {propertyDetails.location}</p>}
                  {propertyDetails.type && <p className="mb-0">Type: {propertyDetails.type}</p>}
                </div>
              )} */}
              
              <div className="mb-3">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  placeholder="Enter your full name"
                  {...register("name")}
                  disabled={loading}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name.message}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Phone Number *</label>
                <input
                  type="tel"
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  placeholder="Enter 10-digit phone number"
                  {...register("phone")}
                  disabled={loading}
                />
                {errors.phone && (
                  <div className="invalid-feedback">{errors.phone.message}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Address *</label>
                <textarea
                  className={`form-control ${errors.address ? "is-invalid" : ""}`}
                  placeholder="Enter your full address"
                  rows={3}
                  {...register("address")}
                  disabled={loading}
                />
                {errors.address && (
                  <div className="invalid-feedback">{errors.address.message}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">Email (Optional)</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="Enter your email address"
                  {...register("email")}
                  disabled={loading}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email.message}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">I&#39;m looking for... *</label>
                <textarea
                  className={`form-control ${errors.description ? "is-invalid" : ""}`}
                  placeholder="Please describe what you're looking for in a property..."
                  rows={4}
                  {...register("description")}
                  disabled={loading}
                />
                {errors.description && (
                  <div className="invalid-feedback">{errors.description.message}</div>
                )}
              </div>
            </div>

            <div className="modal-footer" style={{ padding: '20px 25px', borderTop: '1px solid #dee2e6' }}>
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
                style={{
                  padding: '12px 20px',
                  fontSize: '16px',
                  fontWeight: 600,
                  borderRadius: '8px',
                  transition: 'all 0.2s ease',
                  ...(loading ? {} : {
                    boxShadow: '0 4px 15px rgba(0, 123, 255, 0.3)',
                  })
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 123, 255, 0.4)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 123, 255, 0.3)';
                  }
                }}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2"></span>
                    Submitting...
                  </>
                ) : (
                  "Submit Inquiry"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeadCaptureModal;