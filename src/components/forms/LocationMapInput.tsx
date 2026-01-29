'use client';

import React, { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';

interface LocationMapInputProps {
  onLocationChange?: (latitude: number, longitude: number, address?: string) => void;
  initialLat?: number;
  initialLng?: number;
}

// Dynamically import the map components to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

// Component to handle map clicks
const MapClickHandler: React.FC<{ onMapClick: (lat: number, lng: number) => void }> = ({ onMapClick }) => {
  const [Component, setComponent] = useState<any>(null);

  useEffect(() => {
    // Load useMapEvents dynamically
    import('react-leaflet').then((mod) => {
      const MapEventsComponent = () => {
        mod.useMapEvents({
          click: (e) => {
            onMapClick(e.latlng.lat, e.latlng.lng);
          },
        });
        return null;
      };
      setComponent(() => MapEventsComponent);
    });
  }, [onMapClick]);

  return Component ? <Component /> : null;
};

const LocationMapInput: React.FC<LocationMapInputProps> = ({
  onLocationChange,
  initialLat = 28.6139, // Default to New Delhi
  initialLng = 77.2090,
}) => {
  const [position, setPosition] = useState<[number, number] | null>(
    initialLat && initialLng ? [initialLat, initialLng] : null
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [markerIcon, setMarkerIcon] = useState<any>(null);

  // Fix for default marker icon in Next.js
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('leaflet').then((L) => {
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
          iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
          shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
        });
        setMarkerIcon(L.Icon.Default.prototype);
      });
    }
  }, []);

  // Handle map click
  const handleMapClick = (lat: number, lng: number) => {
    setPosition([lat, lng]);
    if (onLocationChange) {
      onLocationChange(lat, lng);
    }
  };

  // Handle search
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      // Using Nominatim (OpenStreetMap) for geocoding
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lng = parseFloat(data[0].lon);
        setPosition([lat, lng]);
        if (onLocationChange) {
          onLocationChange(lat, lng, data[0].display_name);
        }
      } else {
        alert('Location not found. Please try a different search term.');
      }
    } catch (error) {
      console.error('Error searching location:', error);
      alert('Failed to search location. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  // Handle Enter key in search input
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  // Get current location
  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          setPosition([lat, lng]);
          if (onLocationChange) {
            onLocationChange(lat, lng);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Failed to get your current location. Please allow location access or search manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  const center: LatLngExpression = position || [initialLat, initialLng];

  return (
    <div className="location-map-input">
      <label className="form-label">
        Property Location on Map <span className="text-muted">(Optional)</span>
      </label>
      
      {/* Search Bar */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search for a location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={handleSearch}
          disabled={isSearching}
        >
          {isSearching ? (
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
          ) : (
            '🔍 Search'
          )}
        </button>
        <button
          type="button"
          className="btn btn-outline-primary"
          onClick={handleGetCurrentLocation}
          title="Use my current location"
        >
          📍 Current Location
        </button>
      </div>

      {/* Position Display */}
      {position && (
        <div className="alert alert-info mb-3 d-flex justify-content-between align-items-center">
          <small>
            <strong>Selected Location:</strong> Lat: {position[0].toFixed(6)}, Lng: {position[1].toFixed(6)}
          </small>
          <button
            type="button"
            className="btn btn-sm btn-link text-decoration-none"
            onClick={() => setIsMapExpanded(!isMapExpanded)}
          >
            {isMapExpanded ? '▲ Collapse Map' : '▼ Expand Map'}
          </button>
        </div>
      )}

      {/* Map Container */}
      {typeof window !== 'undefined' && (
        <div
          style={{
            height: isMapExpanded ? '500px' : '300px',
            width: '100%',
            position: 'relative',
            borderRadius: '8px',
            overflow: 'hidden',
            border: '1px solid #dee2e6',
            transition: 'height 0.3s ease',
          }}
        >
          <MapContainer
            center={center}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
            key={`${center[0]}-${center[1]}`}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapClickHandler onMapClick={handleMapClick} />
            {position && markerIcon && (
              <Marker position={position}>
                <Popup>
                  Selected Location
                  <br />
                  Lat: {position[0].toFixed(6)}
                  <br />
                  Lng: {position[1].toFixed(6)}
                </Popup>
              </Marker>
            )}
          </MapContainer>
        </div>
      )}

      <small className="form-text text-muted mt-2 d-block">
        Click on the map to select a location, search for an address, or use your current location.
      </small>
    </div>
  );
};

export default LocationMapInput;
