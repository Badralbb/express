"use client"


import { Component } from "@/components/ui/DemoChart";
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

    if (name) {
      const response = await fetch(`http://localhost:4000/categories/create?name=${name}`)
      const data = await response.json()
      loadList()
    }
  }
  const edit = async (oldName,index) =>{
    const newName = prompt("Please enter the new name",oldName)
    if(newName){
      const response = await fetch(`http://localhost:4000/categories/create/edit?edit=${newName}&index=${index}`)
      const data = await response.json()
      loadList()
    }
  }
  async function dlt(index) {

    if (confirm("Are you sure")) {
      const response = await fetch(`http://localhost:4000/categories/delete?dlt=${index}`)
      const data = await response.json()
      loadList()
    }
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
                <button className="bg-red-400" onClick={() => edit(category.name,index)}>edit</button>
                <button className="bg-red-400" onClick={() => dlt(index)}>delete</button>

              </div>
            ))
          }
        </div>
      </div>
      
            <Component/>

    </main>
  );
}
