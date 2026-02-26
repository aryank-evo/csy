"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

interface Property {
  id: number;
  title?: string;
  description?: string;
  price?: string;
  location?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  propertyType: string;
  propertyStatus?: string;
  approvalStatus: string;
  sold?: boolean | string;
  isVerified?: boolean;
  createdAt?: string;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
  bedrooms?: string;
  bathrooms?: string;
  area?: string;
  amenities?: string;
  images?: string[];
  fieldVisibility?: Record<string, boolean>;
  imageVisibility?: Record<number, boolean>;
  [key: string]: any;
}

interface AdminPropertyEditModalProps {
  property: Property;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updatedProperty: Property) => void;
}

// Fields to exclude from the dynamic form (non-editable or system fields)
const EXCLUDED_FIELDS = [
  "id",
  "propertyType",
  "approvalStatus",
  "sold",
  "createdAt",
  "updatedAt",
  "images",
  "fieldVisibility",
  "imageVisibility",
  "userId",
  "approvedBy",
  "approvedAt",
  "__rawAttributes",
  "dataValues",
  "_previousDataValues",
  "unique",
  "hasPrimaryKeys",
  "hasPrimaryKeys",
  "_changed",
  "_options",
];

// Fields that should use a select dropdown
const SELECT_FIELDS = {
  propertyStatus: [
    { value: "", label: "Select Status" },
    { value: "available", label: "Available" },
    { value: "sold", label: "Sold" },
    { value: "rented", label: "Rented" },
    { value: "under_construction", label: "Under Construction" },
    { value: "ready", label: "Ready" },
  ],
};

// Generate label from camelCase or snake_case key
const generateLabel = (key: string): string => {
  // Handle snake_case
  if (key.includes("_")) {
    return key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }
  // Handle camelCase - insert space before uppercase letters and capitalize each word
  return key
    .replace(/([A-Z])/g, " $1")
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

// Determine input type based on field name and value
const getFieldConfig = (
  key: string,
  value: any,
): {
  type: string;
  label: string;
  options?: { value: string; label: string }[];
} => {
  const label = generateLabel(key);

  // Check if it's a select field
  if (SELECT_FIELDS[key as keyof typeof SELECT_FIELDS]) {
    return {
      type: "select",
      label,
      options: SELECT_FIELDS[key as keyof typeof SELECT_FIELDS],
    };
  }

  // Determine type based on field name patterns
  const lowerKey = key.toLowerCase();

  if (lowerKey.includes("email")) {
    return { type: "email", label };
  }
  if (lowerKey.includes("phone") || lowerKey.includes("mobile")) {
    return { type: "tel", label };
  }
  if (
    lowerKey.includes("price") ||
    lowerKey.includes("amount") ||
    lowerKey.includes("deposit") ||
    lowerKey.includes("rent")
  ) {
    return { type: "number", label };
  }
  if (
    lowerKey.includes("description") ||
    lowerKey.includes("terms") ||
    lowerKey.includes("content")
  ) {
    return { type: "textarea", label };
  }
  if (
    lowerKey.includes("area") ||
    lowerKey.includes("sqft") ||
    lowerKey.includes("size")
  ) {
    return { type: "number", label };
  }

  // Check if value looks like it should be a number
  if (
    typeof value === "number" ||
    (typeof value === "string" &&
      !isNaN(parseFloat(value)) &&
      /^-?\d*\.?\d+$/.test(value))
  ) {
    return { type: "number", label };
  }

  return { type: "text", label };
};

const AdminPropertyEditModal = ({
  property,
  isOpen,
  onClose,
  onUpdate,
}: AdminPropertyEditModalProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [fieldVisibility, setFieldVisibility] = useState<
    Record<string, boolean>
  >({});
  const [imageVisibility, setImageVisibility] = useState<
    Record<number, boolean>
  >({});
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"fields" | "images">("fields");
  const [dynamicFields, setDynamicFields] = useState<
    Array<{
      key: string;
      type: string;
      label: string;
      options?: { value: string; label: string }[];
    }>
  >([]);
  const [isVerified, setIsVerified] = useState(false);
  const [isSold, setIsSold] = useState(false);

  useEffect(() => {
    if (property) {
      // Dynamically generate field configurations from property data
      const fields: Array<{
        key: string;
        type: string;
        label: string;
        options?: { value: string; label: string }[];
      }> = [];

      Object.keys(property).forEach((key) => {
        // Skip excluded fields
        if (EXCLUDED_FIELDS.includes(key)) return;

        // Skip if value is null/undefined or if it's an array/object (except images handled separately)
        const value = property[key];
        if (value === null || value === undefined) return;
        if (Array.isArray(value)) return;
        if (typeof value === "object") return;

        const config = getFieldConfig(key, value);
        fields.push({ key, ...config });
      });

      setDynamicFields(fields);

      // Initialize form data with all property fields
      const data: Record<string, any> = {};
      fields.forEach((field) => {
        data[field.key] = property[field.key] ?? "";
      });
      data.approvalStatus = property.approvalStatus || "pending";
      setFormData(data);

      // Initialize field visibility (default all to true if not set)
      const visibility: Record<string, boolean> = {};
      fields.forEach((field) => {
        visibility[field.key] = property.fieldVisibility?.[field.key] !== false;
      });
      setFieldVisibility(visibility);

      // Initialize image visibility
      const imgVisibility: Record<number, boolean> = {};
      const images = property.images || [];
      images.forEach((_, index) => {
        imgVisibility[index] = property.imageVisibility?.[index] !== false;
      });
      setImageVisibility(imgVisibility);

      // Initialize isVerified state
      setIsVerified(property.isVerified || false);
      setIsSold(property.sold === true || property.sold === "true");
    }
  }, [property]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const toggleFieldVisibility = (fieldKey: string) => {
    setFieldVisibility((prev) => ({
      ...prev,
      [fieldKey]: !prev[fieldKey],
    }));
  };

  const toggleImageVisibility = (index: number) => {
    setImageVisibility((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updateData = {
        ...formData,
        fieldVisibility,
        imageVisibility,
        sold: isSold,
        isVerified,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"}/api/properties/${property.id}?type=${property.propertyType}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        },
      );

      if (response.ok) {
        const result = await response.json();
        toast.success("Property updated successfully!");
        onUpdate({
          ...property,
          ...formData,
          fieldVisibility,
          imageVisibility,
          sold: isSold,
          isVerified,
        });
        onClose();
      } else {
        toast.error("Failed to update property");
      }
    } catch (error) {
      console.error("Error updating property:", error);
      toast.error("Error updating property");
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (status: "approved" | "rejected") => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"}/api/properties/${property.id}/status?type=${property.propertyType}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            approvalStatus: status,
            fieldVisibility,
            imageVisibility,
            sold: isSold,
            isVerified,
          }),
        },
      );

      if (response.ok) {
        const result = await response.json();
        toast.success(`Property ${status} successfully!`);
        onUpdate({
          ...property,
          approvalStatus: status,
          fieldVisibility,
          imageVisibility,
          sold: isSold,
          isVerified,
        });
        onClose();
      } else {
        toast.error(`Failed to ${status} property`);
      }
    } catch (error) {
      console.error(
        `Error ${status === "approved" ? "approving" : "rejecting"} property:`,
        error,
      );
      toast.error(
        `Error ${status === "approved" ? "approving" : "rejecting"} property`,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppShare = () => {
    let message = `*Property Details*\n`;

    dynamicFields.forEach((field) => {
      const value = formData[field.key];
      if (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        field.key !== "latitude" &&
        field.key !== "longitude" &&
        field.key !== "verifiedAt" &&
        field.key !== "possessionStatus" &&
        field.key !== "approvedAt" &&
        field.key !== "userType"
      ) {
        message += `- *${field.label}:* ${value}\n`;
      }
    });

    // Add Google Maps link if coordinates are available
    if (property.latitude && property.longitude) {
      message += `*Location:* https://www.google.com/maps/search/?api=1&query=${property.latitude},${property.longitude}\n\n`;
    } else {
      message += `\n`;
    }
    // Add first image if available
    if (property.images && property.images.length > 0) {
      message += `\n*View Image:* ${property.images[0]}\n`;
    }

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/?text=${encodedMessage}`, "_blank");
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Property Approval & Edit</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
            ></button>
          </div>

          <div className="modal-body px-4">
            {/* Header Info */}
            {/* Header */}
            <div className="row mb-3">
              <div className="col-12">
                <div className="p-3 rounded bg-success-subtle border border-success-subtle">
                  <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
                    <div>
                      <h6 className="mb-0 fw-semibold">
                        Property ID: {property.id}
                      </h6>
                      <small className="text-muted">
                        Type: {property.propertyType}
                      </small>
                    </div>

                    <span
                      className={`badge px-3 py-2 ${
                        property.approvalStatus === "approved"
                          ? "bg-success"
                          : property.approvalStatus === "pending"
                            ? "bg-warning text-dark"
                            : "bg-danger"
                      }`}
                    >
                      {property.approvalStatus.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Controls Row */}
            <div className="row mb-3">
              <div className="col-12">
                <div className="d-flex flex-wrap align-items-center gap-5">                 
                  {/* Sold Toggle */}
                  <div className="d-flex align-items-center gap-2">
                    <div className="form-check form-switch m-0">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="soldToggle"
                        checked={isSold}
                        onChange={(e) => setIsSold(e.target.checked)}
                      />
                    </div>

                    <label htmlFor="soldToggle" className="mb-0">
                      <span className="text-muted me-1">Status:</span>
                      <span
                        className={
                          isSold
                            ? "text-danger fw-semibold"
                            : "text-success fw-semibold"
                        }
                      >
                        {isSold ? "Sold" : "Available"}
                      </span>
                    </label>
                  </div>

                  {/* Verified Toggle */}
                  <div className="d-flex align-items-center gap-2">
                    <div className="form-check form-switch m-0">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="verifiedToggle"
                        checked={isVerified}
                        onChange={(e) => setIsVerified(e.target.checked)}
                      />
                    </div>

                    <label htmlFor="verifiedToggle" className="mb-0">
                      <span
                        className={
                          isVerified
                            ? "text-primary fw-semibold"
                            : "text-secondary"
                        }
                      >
                        {isVerified ? "Verified" : "Not Verified"}
                      </span>
                    </label>
                  </div>

                   {/* WhatsApp */}
                  <button
                    type="button"
                    className="btn btn-outline-success btn-sm d-flex align-items-center gap-2"
                    onClick={handleWhatsAppShare}
                  >
                    <i className="fa-brands fa-whatsapp"></i>
                    Share
                  </button>

                </div>
              </div>
            </div>

            {/* Tabs */}
            <ul className="nav nav-tabs mb-3">
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "fields" ? "active" : ""}`}
                  onClick={() => setActiveTab("fields")}
                >
                  All Fields
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${activeTab === "images" ? "active" : ""}`}
                  onClick={() => setActiveTab("images")}
                >
                  Images ({property.images?.length || 0})
                </button>
              </li>
            </ul>

            <form onSubmit={handleSubmit}>
              {activeTab === "fields" && (
                <div className="row g-4">
                  {dynamicFields.map((field) => (
                    <div className="col-md-6" key={field.key}>
                      <div className="d-flex align-items-center gap-2">
                        <div className="flex-grow-1">
                          <label className="form-label mb-1">
                            {field.label}
                          </label>
                          {field.type === "textarea" ? (
                            <textarea
                              className="form-control"
                              name={field.key}
                              value={formData[field.key] ?? ""}
                              onChange={handleChange}
                              rows={3}
                            ></textarea>
                          ) : field.type === "select" ? (
                            <select
                              className="form-select"
                              name={field.key}
                              value={formData[field.key] ?? ""}
                              onChange={handleChange}
                            >
                              {field.options?.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                  {opt.label}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type={field.type}
                              className="form-control"
                              name={field.key}
                              value={formData[field.key] ?? ""}
                              onChange={handleChange}
                            />
                          )}
                        </div>
                        <div className="form-check form-switch mt-4">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            checked={fieldVisibility[field.key] ?? true}
                            onChange={() => toggleFieldVisibility(field.key)}
                            title="Toggle visibility on detail page"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "images" && (
                <div className="row g-4">
                  <div className="col-12">
                    <p className="text-muted mb-0">
                      Toggle visibility for each image on the detail page
                    </p>
                  </div>
                  {property.images && property.images.length > 0 ? (
                    property.images.map((image: string, index: number) => (
                      <div className="col-md-3" key={index}>
                        <div className="card h-100">
                          <img
                            src={image}
                            alt={`Property image ${index + 1}`}
                            className="card-img-top"
                            style={{ height: "150px", objectFit: "cover" }}
                          />
                          <div className="card-body p-2">
                            <div className="d-flex align-items-center justify-content-between">
                              <span className="small">Image {index + 1}</span>
                              <div className="form-check form-switch m-0">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={imageVisibility[index] ?? true}
                                  onChange={() => toggleImageVisibility(index)}
                                  title="Toggle visibility on detail page"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12">
                      <p className="text-muted text-center mb-0">
                        No images uploaded for this property
                      </p>
                    </div>
                  )}
                </div>
              )}

              <div className="d-flex justify-content-between mt-4 pt-3 border-top">
                <div>
                  <button
                    type="button"
                    className="btn btn-success me-2"
                    onClick={() => handleApproval("approved")}
                    disabled={loading || property.approvalStatus === "approved"}
                  >
                    {loading ? "Processing..." : "Approve Property"}
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleApproval("rejected")}
                    disabled={loading || property.approvalStatus === "rejected"}
                  >
                    {loading ? "Processing..." : "Reject Property"}
                  </button>
                </div>

                <div>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </button>

                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={onClose}
                    disabled={loading}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPropertyEditModal;
