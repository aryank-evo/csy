"use client"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query";
import apiInstance from "@/utils/apiInstance";

interface Blog {
  category?: string;
}

const Category = () => {
   const { data: blogs = [], isLoading } = useQuery({
      queryKey: ['blogs'],
      queryFn: async () => {
         const response = await apiInstance.get('/blogs');
         return response.data.data || [];
      }
   });

   if (isLoading) return <div className="categories bg-white bg-wrapper mb-30">Loading...</div>;

   const categoriesWithCounts = blogs.reduce((acc: { [key: string]: number }, blog: Blog) => {
      const cat = blog.category || 'Uncategorized';
      acc[cat] = (acc[cat] || 0) + 1;
      return acc;
   }, {});

   return (
      <div className="categories bg-white bg-wrapper mb-30">
         <h5 className="mb-20">Category</h5>
         <ul className="style-none">
            {Object.entries(categoriesWithCounts).map(([category, count], i) => (
               <li key={i}><Link href={`/blog_03`}>{category} ({count})</Link></li>
            ))}
         </ul>
      </div>
   )
}

export default Category
