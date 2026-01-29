"use client"
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import apiInstance from "@/utils/apiInstance";

interface Blog {
  keywords?: string;
}

const Tag = () => {
   const { data: blogs = [], isLoading } = useQuery({
      queryKey: ['blogs'],
      queryFn: async () => {
         const response = await apiInstance.get('/blogs');
         return response.data.data || [];
      }
   });

   if (isLoading) return <div className="keyword bg-white bg-wrapper">Loading...</div>;

   const allKeywords = blogs.reduce((acc: string[], blog: Blog) => {
      if (blog.keywords) {
         const tags = blog.keywords.split(',').map(t => t.trim());
         return [...acc, ...tags];
      }
      return acc;
   }, []);

   const uniqueKeywords: string[] = Array.from(new Set(allKeywords));

   return (
      <div className="keyword bg-white bg-wrapper">
         <h5 className="mb-20">Keywords</h5>
         <ul className="style-none d-flex flex-wrap">
            {uniqueKeywords.map((tag, i) => <li key={i}><Link href={`/blog_03/${tag}`}>{tag}</Link></li>)}
            {uniqueKeywords.length === 0 && <li className="text-muted small">No keywords found</li>}
         </ul>
      </div>
   )
}

export default Tag
