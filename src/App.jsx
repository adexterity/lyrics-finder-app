import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Index from './components/layout/Index.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Lyrics from './components/tracks/Lyrics.jsx';
import {Provider} from './Context.jsx';


function App() {
  

  return (
    <div className='min-h-[100vh]'>

    <Provider>
    
    <Router>

    <>
     <Navbar />
        <div className="container">
      <Routes>
          <Route exact path='/' element={<Index />}  />
          <Route exact path='/lyrics/track/:id' element={<Lyrics />} />
      </Routes>
        </div>
    </>
    </Router>

    </Provider>
    </div>
  )
}

export default App;
