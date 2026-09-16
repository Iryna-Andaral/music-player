import { BrowserRouter, Routes, Route } from 'react-router'
import { MusicPlayer } from './components/MusicPlayer'
import { AllSongs } from './components/AllSongs'
import {Playlists} from './components/Playlists' 
import { Navbar } from './components/Navbar'


import './App.css'
import { MusicProvider } from './context/MusicContext'

function App() {


  return (
    <BrowserRouter>
    <MusicProvider>
      <div  className="bg-gray-900 text-white min-h-screen max-w-screen">
       <Navbar />
        <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 p-4 md:flex-row">
          <section className="min-w-0 flex-1">
            <MusicPlayer />
          </section>

          <section className="min-w-0 flex-1">
            <Routes>
              <Route path="/" element={<AllSongs />} />
              <Route path="/playlists" element={<Playlists />} />
            </Routes>
          </section>
        </main>
      </div>
      </MusicProvider>
    </BrowserRouter>
    
  )
}

export default App
