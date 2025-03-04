import React from 'react'
import './App.css'
import Header from './components/Header/Header'
import Note from './components/Note/Note'
import Footer from './components/Footer/Footer'
import notes from './notes.js'

function App() {
  return (
    <>
      <Header/>
      {notes.map(note => 
        <Note
          key={note.key}
          title={note.title}
          content={note.content}
        />   
      )}
      <Footer/>
    </>
  )
}

export default App
