"use client"
import { useState } from "react"
import { toast } from "react-toastify"

interface Property {
  id: number
  title: string
  description: string
  price: string
  location: string
  propertyType: string
  propertyStatus: string
  approvalStatus: string
  createdAt?: string
  contactName?: string
  contactEmail?: string
  contactPhone?: string
  [key: string]: any
}

interface AdminPropertyEditModalProps {
  property: Property
  isOpen: boolean
  onClose: () => void
  onUpdate: (updatedProperty: Property) => void
}

const AdminPropertyEditModal = ({ property, isOpen, onClose, onUpdate }: AdminPropertyEditModalProps) => {
  const [formData, setFormData] = useState({
    title: property.title || "",
    description: property.description || "",
    price: property.price || "",
    location: property.location || "",
    propertyStatus: property.propertyStatus || "",
    approvalStatus: property.approvalStatus || "pending",
    contactName: property.contactName || "",
    contactEmail: property.contactEmail || "",
    contactPhone: property.contactPhone || ""
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Update property details
      const response = await fetch(`http://localhost:8080/api/properties/${property.id}?type=${property.propertyType}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const result = await response.json()
        toast.success("Property updated successfully!")
        onUpdate({ ...property, ...formData })
        onClose()
      } else {
        toast.error("Failed to update property")
      }
    } catch (error) {
      console.error("Error updating property:", error)
      toast.error("Error updating property")
    } finally {
      setLoading(false)
    }
  }

  const handleApproval = async (status: "approved" | "rejected") => {
    setLoading(true)
    try {
      const response = await fetch(`http://localhost:8080/api/properties/${property.id}/status?type=${property.propertyType}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ approvalStatus: status })
      })

      if (response.ok) {
        const result = await response.json()
        toast.success(`Property ${status} successfully!`)
        onUpdate({ ...property, approvalStatus: status })
        onClose()
      } else {
        toast.error(`Failed to ${status} property`)
      }
    } catch (error) {
      console.error(`Error ${status === "approved" ? "approving" : "rejecting"} property:`, error)
      toast.error(`Error ${status === "approved" ? "approving" : "rejecting"} property`)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="modal fade show d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Property Details</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          
          <div className="modal-body">
            <div className="row mb-3">
              <div className="col-12">
                <div className="d-flex justify-content-between align-items-center">
                  <h6 className="mb-0">Property ID: {property.id}</h6>
                  <span className={`badge ${
                    property.approvalStatus === "approved" ? "bg-success" : 
                    property.approvalStatus === "pending" ? "bg-warning" : "bg-danger"
                  }`}>
                    {property.approvalStatus.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label className="form-label">Price (₹)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label className="form-label">Location</label>
                  <input
                    type="text"
                    className="form-control"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="col-md-6 mb-3">
                  <label className="form-label">Property Status</label>
                  <select
                    className="form-select"
                    name="propertyStatus"
                    value={formData.propertyStatus}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="available">Available</option>
                    <option value="sold">Sold</option>
                    <option value="rented">Rented</option>
                    <option value="under_construction">Under Construction</option>
                    <option value="ready">Ready</option>
                  </select>
                </div>
                
                <div className="col-12 mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    required
                  ></textarea>
                </div>
                
                <div className="col-md-4 mb-3">
                  <label className="form-label">Contact Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="col-md-4 mb-3">
                  <label className="form-label">Contact Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="col-md-4 mb-3">
                  <label className="form-label">Contact Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="d-flex justify-content-between mt-4">
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
  )
}

export default AdminPropertyEditModal