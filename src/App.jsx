import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import BookList from './pages/BookList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
          <BookList/>
        </div>
    </>
  )
}

export default App
