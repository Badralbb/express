"use client"

import { useEffect, useState } from "react";

export default function Home() {
  const [categories, setCategories] = useState([])

  const loadList = async () => {
    const response = await fetch("http://localhost:4000/categories/list")
    const data = await response.json();
    setCategories(data)
  }

  useEffect(() => {
    loadList()
  }, [])
  const createNewCategory = async () => {
    const name = prompt("name...")
    const response = await fetch(`http://localhost:4000/categories/create?name=${name}`)
    const data = await response.json()
    loadList()

  }
  function dlt(){
    
  }
  function edit(){
    
  }
  return (
    <main>

      <div>

        <button onClick={createNewCategory} className="bg-red-500 rounded-2xl w-52">Add New</button>
        <div className="flex flex-col gap-5">

          {
            categories.map(category => (
              <div className="flex gap-6">



                <div>
                  {
                      category.name
                  }
                </div>
                <button className="bg-red-400" onClick={edit}>edit</button>
                <button className="bg-red-400" onClick={dlt}>delete</button>

              </div>
            ))
          }
        </div>
      </div>

    </main>
  );
}
