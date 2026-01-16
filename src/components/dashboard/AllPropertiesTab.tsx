"use client"
import { useState, useEffect } from "react"
import AdminPropertyEditModal from "./AdminPropertyEditModal"

interface Property {
  id: number
  title: string
  description: string
  price: string
  location: string
  propertyType: string
  propertyStatus: string
  approvalStatus: string
  createdAt: string
}

const AllPropertiesTab = () => {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchAllProperties = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/properties/all-combined")
        const data = await response.json()
        
        if (data.success) {
          setProperties(data.data)
        }
      } catch (error) {
        console.error("Error fetching all properties:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAllProperties()
  }, [])

  const filteredProperties = activeFilter === "all" 
    ? properties 
    : properties.filter(prop => prop.propertyType === activeFilter)

  const getPropertyTypes = () => {
    const types = [...new Set(properties.map(p => p.propertyType))]
    return types.sort()
  }

  const handlePropertyClick = (property: Property) => {
    setSelectedProperty(property)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedProperty(null)
  }

  const handlePropertyUpdate = (updatedProperty: Property) => {
    setProperties(prev => 
      prev.map(p => p.id === updatedProperty.id && p.propertyType === updatedProperty.propertyType ? updatedProperty : p)
    )
  }

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border-20 p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="dash-title-two mb-0">All Property Listings</h5>
        <div className="fs-14 text-muted">
          Total: {filteredProperties.length} properties
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="d-flex flex-wrap gap-2 mb-4">
        <button 
          className={`btn btn-sm ${activeFilter === "all" ? "btn-primary" : "btn-outline-secondary"}`}
          onClick={() => setActiveFilter("all")}
        >
          All ({properties.length})
        </button>
        {getPropertyTypes().map(type => (
          <button
            key={type}
            className={`btn btn-sm ${activeFilter === type ? "btn-primary" : "btn-outline-secondary"}`}
            onClick={() => setActiveFilter(type)}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} (
            {properties.filter(p => p.propertyType === type).length})
          </button>
        ))}
      </div>

      {/* Properties Grid */}
      {filteredProperties.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">No properties found</p>
        </div>
      ) : (
        <div className="row g-4">
          {filteredProperties.map(property => (
            <div key={`${property.propertyType}-${property.id}`} className="col-lg-4 col-md-6">
              <div 
                className="border rounded-3 p-3 h-100"
                onClick={() => handlePropertyClick(property)}
                style={{ cursor: "pointer" }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)"}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
              >
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h6 className="fw-500 mb-0 text-truncate" title={property.title}>
                    {property.title}
                  </h6>
                  <span className={`badge ${
                    property.approvalStatus === "approved" ? "bg-success" : 
                    property.approvalStatus === "pending" ? "bg-warning" : "bg-danger"
                  }`}>
                    {property.approvalStatus}
                  </span>
                </div>
                
                <div className="small text-muted mb-2">
                  <i className="bi bi-geo-alt"></i> {property.location}
                </div>
                
                <div className="d-flex justify-content-between small mb-2">
                  <span className="badge bg-light text-dark">
                    {property.propertyType}
                  </span>
                  <span className="text-muted">
                    {property.propertyStatus}
                  </span>
                </div>
                
                {property.price && (
                  <div className="fw-bold text-success mb-2">
                    ₹{parseInt(property.price).toLocaleString()}
                  </div>
                )}
                
                <div className="small text-muted">
                  Added: {new Date(property.createdAt).toLocaleDateString()}
                </div>
                
                <div className="mt-3">
                  <button className="btn btn-sm btn-outline-primary w-100">
                    <i className="bi bi-pencil-square me-1"></i>Edit Property
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {selectedProperty && (
        <AdminPropertyEditModal
          property={selectedProperty}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onUpdate={handlePropertyUpdate}
        />
      )}
    </div>
  )
}

export default AllPropertiesTab