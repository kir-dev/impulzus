import { useState } from 'react'
import { ReactReader } from 'react-reader'

export default function Book() {
  const [location, setLocation] = useState(null)
  const locationChanged = (epubcifi) => {
    // epubcifi is a internal string used by epubjs to point to a location in an epub. It looks like this: epubcfi(/6/6[titlepage]!/4/2/12[pgepubid00003]/3:0)
    setLocation(epubcifi)
  }
  //https://react-reader.metabits.no/files/alice.epub
  return (
    <div style={{ height: '100vh' }}>
      <ReactReader location={location} locationChanged={locationChanged} url="http://localhost:3000/files/4.epub" />
    </div>
  )
}
