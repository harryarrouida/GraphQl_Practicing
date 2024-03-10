import React from 'react'
import GetData from '../components/GetData'
import CreateAuthors from '../components/CreateAuthors'
import CreateBooks from '../components/CreateBooks'

export default function Home() {
  return (
    <div>
        <GetData/>
        <CreateAuthors/>
        <CreateBooks/>
    </div>
  )
}
