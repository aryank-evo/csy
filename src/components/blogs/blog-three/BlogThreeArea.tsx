"use client"
import Link from "next/link"
import { useState, useEffect } from "react";
import ReactPaginate from 'react-paginate';
import { useQuery } from '@tanstack/react-query';
import apiInstance from '@/utils/apiInstance';

interface Blog {
  id: number;
  title: string;
  content: string;
  primary_image?: string;
  secondary_image?: string;
  author_name?: string;
  category?: string;
  keywords?: string;
  createdAt: string;
}

const BlogThreeArea = () => {
   const [selectedCategory, setSelectedCategory] = useState("all");
   const [categories, setCategories] = useState<string[]>(["all"]);

   const { data: blogs = [], isLoading } = useQuery({
      queryKey: ['blogs'],
      queryFn: async () => {
         const response = await apiInstance.get('/blogs');
         return response.data.data || [];
      }
   });

   useEffect(() => {
      if (blogs.length > 0) {
         const cats = Array.from(new Set(blogs.map((b: Blog) => b.category?.toLowerCase() || 'unlisted')));
         setCategories(["all", ...cats.filter(Boolean) as string[]]);
      }
   }, [blogs]);

   const itemsPerPage = 6;
   const [itemOffset, setItemOffset] = useState(0);
   const endOffset = itemOffset + itemsPerPage;
   const filteredBlog = selectedCategory === "all" ? blogs : blogs.filter((item: Blog) => (item.category?.toLowerCase() || 'unlisted') === selectedCategory);
   const currentItems = filteredBlog.slice(itemOffset, endOffset);
   const pageCount = Math.ceil(filteredBlog.length / itemsPerPage);

   const handlePageClick = (event: any) => {
      const newOffset = (event.selected * itemsPerPage) % filteredBlog.length;
      setItemOffset(newOffset);
   };

   const handleCategoryClick = (category: string) => {
      setSelectedCategory(category);
      setItemOffset(0);
   };

   if (isLoading) return <div className="text-center py-5">Loading blogs...</div>;

   return (
      <div className="blog-section-three mt-130 xl-mt-100 mb-150 xl-mb-100">
         <div className="container">
            <div className="blog-filter-nav">
               <ul className="style-none d-flex justify-content-center flex-wrap isotop-menu-wrapper">
                  {categories.map((category) => (
                     <li
                        key={category}
                        className={selectedCategory === category ? "is-checked" : ""}
                        onClick={() => handleCategoryClick(category)}
                     >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                     </li>
                  ))}
               </ul>
            </div>

            <div className=" row isotop-gallery-2-wrapper pt-60 lg-pt-40">
               {currentItems.map((item: Blog) => (
                  <div key={item.id} className="col-lg-6">
                     <div className="isotop-item villa sale">
                        <article className="blog-meta-one mb-70 lg-mb-40">
                           <figure className={`post-img border-25 position-relative m0`} style={{ backgroundImage: `url(${item.primary_image})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '400px' }}>
                              <Link href={`/blog_details?id=${item.id}`} className="stretched-link date tran3s">{new Date(item.createdAt).toLocaleDateString()}</Link>
                           </figure>
                           <div className="post-data">
                              <div className="post-info">
                                 <Link href={`/blog_details?id=${item.id}`}>{item.author_name || 'Admin'}</Link>
                                 <span className="ms-2">{item.category}</span>
                              </div>
                              <div className="d-flex justify-content-between align-items-sm-center flex-wrap">
                                 <Link href={`/blog_details?id=${item.id}`} className="blog-title">
                                    <h4>{item.title}</h4>
                                 </Link>
                                 <Link href={`/blog_details?id=${item.id}`} className="read-btn rounded-circle d-flex align-items-center justify-content-center tran3s">
                                    <i className="bi bi-arrow-up-right"></i>
                                 </Link>
                              </div>
                           </div>
                        </article>
                     </div>
                  </div>
               ))}
            </div>

            {pageCount > 1 && (
               <div className="pt-20 text-center">
                  <ReactPaginate
                     breakLabel="..."
                     nextLabel={<i className="fa-regular fa-chevron-right"></i>}
                     onPageChange={handlePageClick}
                     pageRangeDisplayed={5}
                     pageCount={pageCount}
                     previousLabel={<i className="fa-regular fa-chevron-left"></i>}
                     renderOnZeroPageCount={null}
                     className="pagination-two d-inline-flex align-items-center justify-content-center style-none"
                  />
               </div>
            )}
         </div>
      </div>
   )
}

export default BlogThreeArea
