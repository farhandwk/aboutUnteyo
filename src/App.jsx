import React, { useState } from 'react';
import Header from "./Header"
import Footer from "./Footer"
import "./App.css"

// Komponen Kotak Individual
// PERUBAHAN: Menambahkan onMouseEnter dan onMouseLeave untuk menangani hover
const GridBox = ({ number, className, onClick, onMouseEnter, onMouseLeave }) => (
    <div 
        className={`
            flex items-center justify-center 
            bg-white/10 rounded-2xl text-white text-5xl font-bold
            transition-all duration-700 ease-in-out
            cursor-pointer
            ${className}
        `}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        {number}
    </div>
);

// Komponen Utama Grid Interaktif
function InteractiveGridLayout() {
    // State untuk klik (berlaku di semua perangkat)
    const [activeBox, setActiveBox] = useState(0);
    // State untuk hover (hanya untuk desktop)
    const [hoveredBox, setHoveredBox] = useState(0);

    const handleBoxClick = (boxNumber) => {
        setActiveBox(prev => (prev === boxNumber ? 0 : boxNumber));
    };

    // Fungsi untuk menangani hover, hanya berjalan di desktop
    const handleDesktopHover = (boxNumber) => {
        if (window.innerWidth >= 768) {
            setHoveredBox(boxNumber);
        }
    };

    // Fungsi untuk mendapatkan kelas ukuran dinamis
    const getBoxClasses = (boxNumber) => {
        // Logika untuk Mobile (berdasarkan klik)
        const mobileHeight = activeBox === 0 ? 'h-64' : (activeBox === boxNumber ? 'h-128' : 'h-64');

        // Logika untuk Desktop (berdasarkan hover)
        const desktopWidth = hoveredBox === 0 ? 'md:w-1/3' : (hoveredBox === boxNumber ? 'md:w-full' : 'md:w-1/6');
        
        // Gabungkan kelas mobile dan desktop
        return `${mobileHeight} ${desktopWidth} md:h-128`;
    };
    
    return (
        <div className="w-full p-4 lg:px-6">
            <div className="w-full flex flex-col md:flex-row gap-4">
                {/* === KOTAK 1 === */}
                <GridBox 
                    number={1}
                    onClick={() => handleBoxClick(1)}
                    onMouseEnter={() => handleDesktopHover(1)}
                    onMouseLeave={() => handleDesktopHover(0)}
                    className={getBoxClasses(1)}
                />

                {/* === KOTAK 2 === */}
                <GridBox 
                    number={2}
                    onClick={() => handleBoxClick(2)}
                    onMouseEnter={() => handleDesktopHover(2)}
                    onMouseLeave={() => handleDesktopHover(0)}
                    className={getBoxClasses(2)}
                />

                {/* === KOTAK 3 === */}
                <GridBox 
                    number={3}
                    onClick={() => handleBoxClick(3)}
                    onMouseEnter={() => handleDesktopHover(3)}
                    onMouseLeave={() => handleDesktopHover(0)}
                    className={getBoxClasses(3)}
                />
            </div>
        </div>
    );
}


// Komponen App untuk menampilkan grid
export default function App() {
  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center font-sans">
      <Header/>
        <div className="text-center mb-8 text-white pt-36">
            <h1 className="text-3xl font-bold">About Unteyo</h1>
        </div>
        <InteractiveGridLayout />
        <Footer/>
    </div>
  );
}
