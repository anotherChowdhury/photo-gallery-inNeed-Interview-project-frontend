import { useContext } from 'react'
import { UserContext } from '../contexts/UserContext'
import Navbar from './Navbar'
import { userId } from './userId'

const Home = () => {
  console.log('In home')
  console.log(userId)

  return <Navbar user="true" />
}

export default Home
