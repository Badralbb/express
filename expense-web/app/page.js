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
