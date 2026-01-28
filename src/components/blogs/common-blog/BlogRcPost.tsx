"use client"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query";
import apiInstance from "@/utils/apiInstance";

interface Blog {
  id: number;
  title: string;
  primary_image?: string;
  createdAt: string;
}

const BlogRcPost = () => {
   const { data: recentBlogs = [], isLoading } = useQuery({
      queryKey: ['recent-blogs'],
      queryFn: async () => {
         const response = await apiInstance.get('/blogs/recent');
         return response.data.data || [];
      }
   });

   if (isLoading) return <div className="recent-news bg-white bg-wrapper mb-30">Loading...</div>;

   return (
      <div className="recent-news bg-white bg-wrapper mb-30">
         <h5 className="mb-20">Recent News</h5>
         {recentBlogs.map((item: Blog) => (
            <div key={item.id} className="news-block d-flex align-items-center pb-25">
               {item.primary_image && (
                  <div style={{ width: '80px', height: '80px', flexShrink: 0 }}>
                     <img src={item.primary_image} alt="" className="w-100 h-100 object-fit-cover rounded" />
                  </div>
               )}
               <div className="post ps-4">
                  <h4 className="mb-5">
                     <Link href={`/blog_details?id=${item.id}`} className="title tran3s">{item.title}</Link>
                  </h4>
                  <div className="date">{new Date(item.createdAt).toLocaleDateString()}</div>
               </div>
            </div>
         ))}
      </div>
   )
}

export default BlogRcPost
