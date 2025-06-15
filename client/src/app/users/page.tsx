'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3001/register')
      .then(res => setUsers(res.data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div>
      {users.map((item,id) => (
        <div key={id} className="p-4 border rounded-lg mb-4">
          <h2 className="text-lg font-bold">{item.firstName} {item.lastName}</h2>
          <p>Email: {item.email}</p>
          <p>User ID: {item._id}</p>
          <p>Created At: {new Date(item.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  )
}

export default Users