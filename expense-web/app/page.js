"use client"


import { Component } from "@/components/ui/DemoChart";
import { useEffect, useState } from "react";

export default function Home() {
  const [categories, setCategories] = useState([])

  const loadList = async () => {
    const response = await fetch("http://localhost:4000/categories")
    const data = await response.json();
    setCategories(data)
  }

  useEffect(() => {
    loadList()
  }, [])
  const createNewCategory = async () => {
    const name = prompt("name...")

    if (name) {
      const response = await fetch(`http://localhost:4000/categories`, {

        method: "POST",
        body: JSON.stringify({
          name: name,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
      }
      )
      const data = await response.json()
      loadList()
    }
  }
  /**
   * promise1.th 1
   * promise2    3
   * code        5
   * code        8
   * code
   *
   */


  const edit = async (oldName, id) => {
    const newName = prompt("Please enter the new name", oldName)
    if (newName) {



      await fetch(`http://localhost:4000/categories/${id}`, {
        method: "PUT",
        body: JSON.stringify({ id: id, updatedName: newName }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
      })



      loadList()
    }
  }
  async function dlt(id) {

    await fetch(`http://localhost:4000/categories/${id}`, {
      method: "DELETE",
      body: JSON.stringify({ id: id }),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })


    loadList()
  }

  

  return (
    <main>

      <div>

        <button onClick={createNewCategory} className="bg-red-500 rounded-2xl w-52">Add New</button>

        <div className="flex flex-col gap-5">

          {
            categories.map((category) => (

              <div key={category.id} className="flex gap-6">

                <div>
                  {
                    category.name
                  }
                </div>

                <button className="bg-red-400" onClick={() => edit(category.name, category.id)}>edit</button>

                <button className="bg-red-400" onClick={() => dlt(category.id)}>delete</button>

              </div>
            ))
          }
        </div>
      </div>

  

    </main>
  );
}
