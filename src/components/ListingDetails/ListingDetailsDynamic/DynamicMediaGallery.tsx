import Image from "next/image";
import Fancybox from "@/components/common/Fancybox";

interface DynamicMediaGalleryProps {
  images: string[];
  imageVisibility?: Record<number, boolean>;
}

const DynamicMediaGallery = ({ images, imageVisibility }: DynamicMediaGalleryProps) => {
  // Filter images based on visibility settings
  const displayImages = images && images.length > 0 
    ? images.filter((_, index) => {
        // If no visibility settings, show all images
        if (!imageVisibility) return true;
        // Show image if visibility is not explicitly set to false
        return imageVisibility[index] !== false;
      })
    : ["/assets/images/listing/img_01.jpg"]; // Placeholder

  return (
    <div className="media-gallery mt-100 xl-mt-80 lg-mt-60">
      <div id="media_slider" className="carousel slide row">
        <div className="col-lg-10">
          <div className="bg-white border-20 md-mb-20 shadow4 p-30">
            <div className="position-relative z-1 overflow-hidden border-20">
              <div className="img-fancy-btn border-10 fw-500 fs-16 color-dark">
                See all {displayImages.length} Photos
                <Fancybox
                  options={{
                    Carousel: {
                      infinite: true,
                    },
                  }}
                >
                  {displayImages.map((img, index) => (
                    <a key={index} className="d-block" data-fancybox="img2" href={img}></a>
                  ))}
                </Fancybox>
              </div>

              <div className="carousel-inner">
                {displayImages.map((img, index) => (
                  <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                    <Image 
                      src={img} 
                      alt="" 
                      width={1200} 
                      height={800} 
                      className="w-100 border-20" 
                      style={{ objectFit: 'cover', maxHeight: '600px' }}
                    />
                  </div>
                ))}
              </div>
              
              {displayImages.length > 1 && (
                <>
                  <button className="carousel-control-prev" type="button" data-bs-target="#media_slider"
                    data-bs-slide="prev">
                    <i className="bi bi-chevron-left"></i>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#media_slider"
                    data-bs-slide="next">
                    <i className="bi bi-chevron-right"></i>
                    <span className="visually-hidden">Next</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="col-lg-2">
          <div className="carousel-indicators position-relative p-15 w-100 h-100 border-15 bg-white shadow4">
            {displayImages.map((img, i) => (
              <button 
                key={i} 
                type="button" 
                data-bs-target="#media_slider" 
                data-bs-slide-to={`${i}`} 
                className={i === 0 ? 'active' : ''}
                aria-current={i === 0 ? "true" : "false"} 
                aria-label={`Slide ${i + 1}`}
              >
                <Image 
                   src={img} 
                   alt="" 
                   width={150} 
                   height={100} 
                   className="w-100 border-10" 
                   style={{ objectFit: 'cover', height: '80px' }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DynamicMediaGallery
