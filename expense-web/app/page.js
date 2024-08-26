"use client"


import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
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

    const response =  await fetch(`http://localhost:4000/categories/${id}`, {
        method: "PUT",
        body: JSON.stringify({ id: id, updatedName: newName }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
      })
        if(response.status === 400){
          alert("bad requist")
        }

      loadList()
    
  }
  async function dlt(id) {
    console.log(id)
    const response = await fetch(`http://localhost:4000/categories/${id}`, {
      method: "DELETE",
    })
    if (response.status === 404) {
      alert("Category not found")
    }

    loadList()
  }




  return (
    <main>

      <div>

        <Button onClick={createNewCategory} className="bg-red-500 rounded-2xl w-52">Add New</Button>

        <div className="flex flex-col gap-5">

          {
            categories.map((category) => (

              <div key={category.id} className="flex gap-6">

                <div>
                  {
                    category.name
                  }
                </div>

                <Button className="bg-red-400" onClick={() => edit(category.name, category.id)}>edit</Button>

                <Button className="bg-red-400" onClick={() => dlt(category.id)}>delete</Button>

              </div>
            ))
          }
        </div>
      </div>

      <div className="flex gap-5 mt-3">
        <div>wrong id</div>
        <button className="bg-red-400" onClick={() => dlt("wrong id")}>delete</button>
          <Alert>
          <AlertTitle>Hello World!</AlertTitle>
          <AlertDescription>This is AlertDescription</AlertDescription>
          </Alert>
      </div>

    </main>
  );
}
