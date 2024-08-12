"use client"

import { useEffect, useState } from "react";

export default function Home() {
  const [articles,setArticles] = useState([])
  useEffect(()=>{
    fetch("http://localhost:4000/articles").then(res => res.json()).then(data=>{
      setArticles(data)
    })
  })
  return (
    <main>

      <div>
        
        {
            articles.map(article => (
              <div className="bg-blue-500" key={article.id}>
                {
                  article.title
                }

              </div>
            ))
        }
      </div>

    </main>
  );
}
