"use client"
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import apiInstance from "@/utils/apiInstance";
import BlogSidebar from "../common-blog/BlogSidebar";

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

const propertyUrl =
   typeof window !== "undefined"
      ? encodeURIComponent(window.location.href)
      : "";

const shareText = encodeURIComponent("Check out this property:");

const shareLinks = [
   {
      icon: "fa-brands fa-whatsapp",
      url: `https://api.whatsapp.com/send?text=${shareText}%20${propertyUrl}`,
   }   
];

const BlogDetailsArea = () => {
   const searchParams = useSearchParams();
   const blogId = searchParams.get('id');

   const { data: blog, isLoading } = useQuery({
      queryKey: ['blog', blogId],
      queryFn: async () => {
         if (!blogId) return null;
         const response = await apiInstance.get(`/blogs/${blogId}`);
         return response.data.data;
      },
      enabled: !!blogId
   });

   if (isLoading) return <div className="text-center py-5">Loading blog details...</div>;
   if (!blog) return <div className="text-center py-5">Blog not found.</div>;

   const keywords = blog.keywords ? blog.keywords.split(',').map((k: string) => k.trim()) : [];

   return (
      <div className="blog-details border-top mt-130 xl-mt-100 pt-100 xl-pt-80 mb-150 xl-mb-100">
         <div className="container">
            <div className="row gx-xl-5">
               <div className="col-lg-8">
                  <div className="blog-post-meta mb-40 lg-mb-40">
                     <div className="post-info"><Link href="#">{blog.author_name || 'Admin'} .</Link> {new Date(blog.createdAt).toLocaleDateString()}</div>
                     <h3 className="blog-title h4">{blog.title}</h3>
                  </div>
               </div>
            </div>
            <div className="row gx-xl-5">
               <div className="col-lg-8">
                  <article className="blog-post-meta">
                     {blog.primary_image && (
                        <figure className="post-img position-relative m0"
                           style={{ backgroundImage: `url(${blog.primary_image})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '500px' }}>
                           <div className="fw-500 date d-inline-block">{new Date(blog.createdAt).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}</div>
                        </figure>
                     )}
                     <div className="post-data pt-30 md-pt-30">
                        <div className="content-wrapper">
                           <div dangerouslySetInnerHTML={{ __html: blog.content }} className="blog-rich-content" />
                        </div>

                        {blog.secondary_image && (
                           <div className="img-meta mt-20 mb-20">
                              <img src={blog.secondary_image} alt="image" className="lazy-img w-100 rounded shadow-sm" />
                           </div>
                        )}
                     </div>
                     <div className="bottom-widget d-sm-flex align-items-center justify-content-between">
                        <ul className="d-flex align-items-center tags style-none pt-10">
                           <li>Tag:</li>
                           {keywords.map((tag: string, i: number) => (
                              <li key={i}>
                               <small>   <Link href="#">
                                {tag}{i < keywords.length - 1 ? ',' : ''}
                                 </Link></small>
                                 </li>
                           ))}
                        </ul>
                        <ul className="d-flex share-icon align-items-center style-none pt-20">
                           <li>Share:</li>
                           {shareLinks.map((item, index) => (
                              <li key={index}>
                                 <a
                                    href={item.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                 >
                                    <i className={item.icon}></i>
                                 </a>
                              </li>
                           ))}
                        </ul>
                     </div>
                  </article>
               </div>
               <BlogSidebar style={true} />
            </div>
         </div>
      </div>
   )
}

export default BlogDetailsArea;
