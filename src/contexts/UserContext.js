import React, { createContext, useState, useEffect } from 'react'

export const UserContext = createContext()

const UserContextProvider = (props) => {
  const [userId, setId] = useState(0)

  // const print = () => {
  //   console.log(userId)
  // }
  // useEffect(() => {
  //   print()
  // }, [userId])

  const updateId = (id) => {
    console.log('In context update id ', id)
    setId(id)
  }

  const getId = () => {
    console.log('In context get id', userId)
    return userId
  }
  const value = { getUserId: getId, setUserId: updateId }

  return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
}

export default UserContextProvider
