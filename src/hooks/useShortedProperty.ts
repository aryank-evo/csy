"use client"
import UseProperty from "@/hooks/UseProperty";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectProperties } from "@/redux/features/propertySlice";
import listing_data from "@/data/inner-data/ListingData";
import { getPropertiesByType } from "@/utils/api";

interface DataType {
   itemsPerPage: number;
   page: string;
}

const UseShortedProperty = ({ itemsPerPage, page }: DataType) => {

   const { properties, setProperties } = UseProperty();
   const [all_property, setAllProperty] = useState(listing_data);
   
   useEffect(() => {
      const fetchDynamicProperties = async () => {
         const dynamicPages = ["buy", "rent", "lease", "pg"];
         if (dynamicPages.includes(page)) {
            try {
               const result = await getPropertiesByType(page);
               if (result.success && result.data.length > 0) {
                  // Transform database properties to match DataType
                  const transformed = result.data.map((item: any) => ({
                     id: item.id,
                     page: page,
                     tag: page === 'buy' ? 'FOR SALE' : `FOR ${page.toUpperCase()}`,
                     tag_bg: page === 'buy' ? 'sale' : '',
                     carousel_thumb: item.images && item.images.length > 0 
                        ? item.images.map((img: string, idx: number) => ({ img, active: idx === 0 ? "active" : "" }))
                        : [{ img: "/assets/images/listing/img_01.jpg", active: "active" }], // Placeholder
                     title: item.title,
                     address: item.address || item.location,
                     location: item.location,
                     property_info: { 
                        sqft: item.area || 0, 
                        bed: String(item.bedrooms || 0).padStart(2, '0'), 
                        bath: String(item.bathrooms || 0).padStart(2, '0') 
                     },
                     price: Number(item.price),
                     status: item.propertyStatus || "",
                     type: "Newest",
                     amenities: typeof item.amenities === 'string' ? item.amenities.split(',') : (item.amenities || [])
                  }));
                  setProperties(transformed);
                  setAllProperty(transformed);
               }
            } catch (error) {
               console.error("Error fetching properties:", error);
            }
         }
      };
      fetchDynamicProperties();
   }, [page]);

   const filteredProperties = properties.filter((item) => item.page === page);

   const [itemOffset, setItemOffset] = useState(0);
   const [sortOption, setSortOption] = useState<string>("");
   const [status, setStatus] = useState<string | null>(null);
   const [location, setLocation] = useState<string | null>(null);
   const [selectedBedrooms, setSelectedBedrooms] = useState<string | null>(null);
   const [selectedBathrooms, setSelectedBathrooms] = useState<string | null>(null);
   const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

   // handleSortOptionChange
   const handleTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setSortOption(event.target.value);
      setItemOffset(0);
   };

   // handleStatusChange
   const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setStatus(event.target.value);
      setItemOffset(0);
   };

   // handleLocationChange
   const handleLocationChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setLocation(event.target.value);
      setItemOffset(0);
   };

   // handleBedroomChange
   const handleBedroomChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setSelectedBedrooms(event.target.value);
      setItemOffset(0);
   };

   // handleBathroomChange
   const handleBathroomChange = (event: ChangeEvent<HTMLSelectElement>) => {
      setSelectedBathrooms(event.target.value);
      setItemOffset(0);
   };

   // handleAmenityChange
   const handleAmenityChange = (event: ChangeEvent<HTMLInputElement>) => {
      const amenity = event.target.value;

      setSelectedAmenities((prevSelectedAmenities) => {
         if (prevSelectedAmenities.includes(amenity)) {
            return prevSelectedAmenities.filter((a) => a !== amenity);
         } else {
            return [...prevSelectedAmenities, amenity];
         }
      });
   };

   useEffect(() => {
      // This block will be executed after selectedAmenities has been updated.
      setItemOffset(0);
   }, [selectedAmenities]);

   const getSortedProperties = () => {
      let filtered = filteredProperties;

      // Status filtering
      if (status !== null) {
         filtered = filtered.filter((item) => {
            return item.status.toLowerCase().includes(status.toLowerCase());
         });
      }

      // Location filtering
      if (location !== null) {
         filtered = filtered.filter((item) => {
            return item.location.toLowerCase().includes(location.toLowerCase());
         });
      }

      // Bedrooms filtering
      if (selectedBedrooms !== null) {
         filtered = filtered.filter((item) => {
            return item.property_info.bed.toLowerCase().includes(selectedBedrooms.toLowerCase());
         });
      }

      // Bathrooms filtering
      if (selectedBathrooms !== null) {
         filtered = filtered.filter((item) => {
            return item.property_info.bath.toLowerCase().includes(selectedBathrooms.toLowerCase());
         });
      }

      // Amenities filtering
      if (selectedAmenities.length > 0) {
         filtered = filtered.filter((item) => {
            const propertyAmenities = item.amenities || [];
            return selectedAmenities.every((amenity) => propertyAmenities.includes(amenity));
         });
      }

      // Type filtering
      switch (sortOption) {
         case "newest":
            return filtered.filter((item) => item.type === "newest");
         case "best_seller":
            return filtered.filter((item) => item.type === "Best Seller");
         case "best_match":
            return filtered.filter((item) => item.type === "Best Match");
         case "price_low":
            return filtered.sort((a, b) => a.price - b.price);
         case "price_high":
            return filtered.sort((a, b) => b.price - a.price);
         default:
            return filtered;
      }
   };

   const sortedProperties = getSortedProperties();
   const endOffset = itemOffset + itemsPerPage;
   const currentItems = sortedProperties.slice(itemOffset, endOffset);
   const pageCount = Math.ceil(sortedProperties.length / itemsPerPage);

   // Get unique locations from filtered properties for the current page
   const getUniqueLocations = () => {
      const locations = filteredProperties
         .map(item => item.location || item.address)
         .filter((loc): loc is string => !!loc && loc.trim() !== '');
      
      // Remove duplicates and sort alphabetically
      const uniqueLocations = [...new Set(locations)].sort((a, b) => a.localeCompare(b));
      
      return uniqueLocations.map((loc, index) => ({
         value: loc,
         text: loc
      }));
   };

   const locationOptions = getUniqueLocations();

   const handlePageClick = (event: any) => {
      const newOffset = event.selected * itemsPerPage;
      setItemOffset(newOffset);
   };

   // All products
   const allProperties = useSelector(selectProperties);
   const filteredAllProduct = all_property.filter(item => item.page === page);

   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
      const searchingProducts = filteredAllProduct.filter((p) =>
         p.title.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setProperties(searchingProducts);
   };

   // handle Price
   const calculatedMax = all_property.filter(item => item.page === page).reduce((max, item) => {
      return item.price > max ? item.price : max;
   }, 0);
   const maxPrice = calculatedMax > 0 ? calculatedMax : 100000;
   const [priceValue, setPriceValue] = useState([0, maxPrice]);

   useEffect(() => {
      setPriceValue([0, maxPrice]);
   }, [maxPrice]);

   useEffect(() => {
      let filterPrice = all_property.filter((j) => j.price >= priceValue[0] && j.price <= priceValue[1]);
      setProperties(filterPrice)
   }, [priceValue, all_property]);

   const handlePriceChange = (val: number[]) => {
      setPriceValue(val)
   }


   const priceRanges: {
      [key: string]: number[];
   } = {
      "1": [10000, 200000],
      "2": [20000, 300000],
      "3": [30000, 400000],
   };

   const handlePriceDropChange = (selectedValue: string) => {
      const selectedRange = priceRanges[selectedValue];
      const newPriceValue = selectedRange ? selectedRange : [0, maxPrice];
      setPriceValue(newPriceValue);
   };

   const resetFilters = () => {
      setSortOption("");
      setItemOffset(0);
      setStatus(null);
      setLocation(null);
      setSelectedBedrooms(null);
      setSelectedBathrooms(null);
      setSelectedAmenities([]);
      setPriceValue([0, maxPrice]);
   };

   return {
      handlePriceDropChange,
      itemOffset,
      sortedProperties,
      currentItems,
      handlePageClick,
      handleSearchChange,
      handleBedroomChange,
      handleLocationChange,
      handleTypeChange,
      handleStatusChange,
      handleBathroomChange,
      handlePriceChange,
      maxPrice,
      priceValue,
      resetFilters,
      selectedAmenities,
      handleAmenityChange,
      pageCount,
      locationOptions,
   };
};

export default UseShortedProperty;