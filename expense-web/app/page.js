"use client"

import { useEffect, useState } from "react";

export default function Home() {
  const [categories, setCategories] = useState([])

  function loadList(){
    fetch("http://localhost:4000/categories/list").then(res => res.json()).then(data => {
      setCategories(data)
    })
  }
  useEffect(() => {
    loadList()
  }, [])
  function createNewCategory(){
    const name = prompt("name...")
    fetch(`http://localhost:4000/categories/create?name=${name}`)
    loadList()
  }
  return (
    <main>

      <div>

        <button onClick={createNewCategory} className="bg-red-500 rounded-2xl w-52">Add New</button>
        {
          categories.map(category => (
            <div className="bg-blue-500" key={category.name}>
              {
                category.name
              }

            </div>
          ))
        }
      </div>

    </main>
  );
}
