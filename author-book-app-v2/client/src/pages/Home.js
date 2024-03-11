import React from 'react'
import GetData from '../components/GetData'
import CreateAuthors from '../components/CreateAuthor'
import CreateBooks from '../components/CreateBook'

export default function Home() {
  return (
    <div>
        <GetData/>
        <CreateAuthors/>
        <CreateBooks/>
    </div>
  )
}
