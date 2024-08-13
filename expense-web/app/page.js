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


  return (
    <main>

      <div>

        <button onClick={createNewCategory} className="bg-red-500 rounded-2xl w-52">Add New</button>
        <div className="flex flex-col gap-5">

          {
            categories.map((category, index) => (
              <div id={index} key={category.name} className="flex gap-6">



                <div>
                  {
                    category.name
                  }
                </div>
                <button className="bg-red-400">edit</button>
                <button className="bg-red-400">delete</button>

              </div>
            ))
          }
        </div>
      </div>

    </main>
  );
}
