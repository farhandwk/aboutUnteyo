import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Asumsi file-file ini ada di proyek Anda
import Header from "./Header" 
import Footer from "./Footer"
import "./App.css"

// Di lingkungan lokal Anda, Anda bisa menggunakan impor ini:
import bgWhite from "./assets/DummbyBGwhite.jpg"
import bgBlack from "./assets/DummyBGblack.png"

// === KOMPONEN MODAL ===
const Modal = ({ data, onClose }) => {
    if (!data) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="bg-gray-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 relative"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors text-2xl font-bold">&times;</button>
                    <h2 className="text-3xl font-bold text-white mb-4">{data.title}</h2>
                    <div className="text-gray-300 space-y-4">
                        {data.content}
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};


// PERBAIKAN: Struktur GridBox diubah untuk mendukung transisi filter blur
const GridBox = ({ children, className, onClick, onMouseEnter, onMouseLeave, imageUrl, isExpanded }) => (
    <div 
        className={`flex items-center justify-center rounded-2xl transition-all duration-700 ease-in-out cursor-pointer overflow-hidden relative ${className}`}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        {/* Lapisan Latar Belakang: Di sinilah gambar dan efek blur diterapkan */}
        <div
            className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out ${isExpanded ? 'scale-110 blur-sm' : 'scale-100 blur-0'}`}
            style={{ backgroundImage: `url(${imageUrl})` }}
        />
        {/* Lapisan Konten: Berada di atas latar belakang */}
        <div className="relative z-10 w-full h-full">
            {children}
        </div>
    </div>
);

const DefaultContent = ({ title }) => (
    <div 
        className="relative flex items-center justify-center w-full h-full text-white text-center"
    >
        {/* Overlay ini akan berada di atas background image dari GridBox */}
        <div className="absolute inset-0 bg-black/50"></div>
        <h3 className="relative z-10 text-xl font-bold p-4 lg:text-2xl">{title}</h3>
    </div>
);

const ExpandedContent = ({ title, description, onLearnMore }) => (
    <div className="flex flex-col items-start justify-end w-full h-full p-8 text-white bg-gradient-to-t from-black/60 to-transparent">
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-sm text-white/80 mb-4">{description}</p>
        <button 
            onClick={onLearnMore} 
            className="bg-white text-black font-semibold px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors"
        >
            Learn More
        </button>
    </div>
);

function InteractiveGridLayout({ onOpenModal }) {
    const [activeBox, setActiveBox] = useState(0);
    const [hoveredBox, setHoveredBox] = useState(0);
    
    const handleBoxClick = (boxNumber) => {
        setActiveBox(prev => (prev === boxNumber ? 0 : boxNumber));
    };

    const handleDesktopHover = (boxNumber) => {
        if (window.innerWidth >= 768) {
            setHoveredBox(boxNumber);
        }
    };

    const getBoxClasses = (boxNumber) => {
        const mobileHeight = activeBox === 0 ? 'h-64' : (activeBox === boxNumber ? 'h-128' : 'h-64');
        const desktopWidth = hoveredBox === 0 ? 'md:w-1/3' : (hoveredBox === boxNumber ? 'md:w-full' : 'md:w-1/6');
        return `${mobileHeight} ${desktopWidth} md:h-128`;
    };
    
    // Di komputer Anda, ganti URL ini dengan variabel impor Anda (misal: bgWhite).
    const boxesData = [
        { id: 1, imageUrl: bgWhite, title: "Who We Are", description: "See our journey and milestones.", content: <><p>Ini adalah bagian detail tentang 'Who We Are'. Anda bisa menaruh banyak paragraf di sini.</p><p>Konten ini akan bisa di-scroll jika lebih panjang dari tinggi modal.</p></> },
        { id: 2, imageUrl: bgBlack, title: "How We Do It", description: "Our methods and innovations.", content: <><p>Ini adalah penjelasan mendalam tentang 'How We Do It'.</p><p>Jelaskan proses, teknologi, dan metodologi yang Anda gunakan.</p></> },
        { id: 3, imageUrl: bgWhite, title: "What We Do", description: "Explore our products and services.", content: <><p>Ini adalah deskripsi lengkap tentang 'What We Do'.</p><p>Anda bisa menambahkan daftar layanan, studi kasus, atau galeri produk di sini.</p></> }
    ];

    const isHintVisible = hoveredBox === 0 && activeBox === 0;

    return (
        <div className="w-full p-4 lg:px-6 flex flex-col items-center">
            <div className="h-10 flex items-center md:hidden">
                <AnimatePresence>
                    {isHintVisible && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <span className="text-gray-400 text-sm">Click a card to see the effect</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="w-full flex flex-col md:flex-row gap-4">
                {boxesData.map(box => {
                    // Tentukan apakah kotak ini sedang dalam keadaan diperluas
                    const isExpanded = hoveredBox === box.id || activeBox === box.id;
                    return (
                        <GridBox 
                            key={box.id}
                            onClick={() => handleBoxClick(box.id)}
                            onMouseEnter={() => handleDesktopHover(box.id)}
                            onMouseLeave={() => handleDesktopHover(0)}
                            className={getBoxClasses(box.id)}
                            imageUrl={box.imageUrl}
                            isExpanded={isExpanded} // Kirim state ini ke GridBox
                        >
                            <div className={`absolute inset-0 transition-opacity duration-500 ${isExpanded ? 'opacity-0' : 'opacity-100'}`}>
                                <DefaultContent title={box.title} />
                            </div>
                            <div className={`absolute inset-0 transition-opacity duration-500 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                                <ExpandedContent 
                                    title={box.title} 
                                    description={box.description} 
                                    onLearnMore={() => onOpenModal(box)}
                                />
                            </div>
                        </GridBox>
                    );
                })}
            </div>

            <div className="h-10 hidden md:flex items-center">
                <AnimatePresence>
                    {isHintVisible && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <span className="text-gray-400 text-sm">Hover a card to see the effect</span>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

// Komponen App utama
export default function App() {
    const [modalData, setModalData] = useState(null);

    return (
        <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center font-[helvetica]">
            <Header/>
            <div className="text-center mb-4 text-white pt-36 md:mb-8">
                <h1 className="text-2xl font-bold lg:text-4xl">About Unteyo</h1>
            </div>
            <InteractiveGridLayout onOpenModal={setModalData} />
            <Footer/>
            <Modal data={modalData} onClose={() => setModalData(null)} />
        </div>
    );
}
