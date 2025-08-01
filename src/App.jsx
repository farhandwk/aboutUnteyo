import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Asumsi file-file ini ada di proyek Anda
import Header from "./Header" 
import Footer from "./Footer"
import "./App.css"

// Di lingkungan lokal Anda, Anda bisa menggunakan impor ini:
import bg1 from "./assets/bg1.png"
import bg2 from "./assets/bg2.png"
import bg3 from "./assets/bg3.png"
import allTeam from "./assets/allTeam.png"

import adithio from "./assets/Team/Adit.png"
import chrisnu from "./assets/Team/Chrisnu.png"
import bagus from "./assets/Team/Bagus.png"
import luthfi from "./assets/Team/Luthfi.png"
import frederika from "./assets/Team/Frederika.png"
import farhan from "./assets/Team/Farhan.png"

const cLevel = [
    {id: 1, img: adithio, name: "Adhitio Indra Kususma B S", title: "Chief Operating Officer"},
    {id: 2, img: chrisnu, name: "Chrisnu Firmansyah", title: "Chief Creative Officer"}
]

const Lead = [
    {id: 1, img: bagus, name: "Tubagus Pambudi", title: "Creative Lead"},
    {id: 2, img: luthfi, name: "Luthfiah Dwi Fitriani", title: "Co-Creative Lead 1"},
    {id: 3, img: frederika, name: "Frederika Angelina", title: "Co-Creative Lead 2"},
    {id: 4, img: farhan, name: "Farhan Dwiki A", title: "Web Developer Lead"}
]

const whatWeDo = [
    {id: 1, title: "Curating Insighful Content", text: "We consistently produce and share high-quality content, from in-depth articles to practical guides. Our topics are curated to cover the full student experience, addressing both academic and non-academic issues  while providing relevant knowledge and actionable resources for self-development."},
    {id: 2, title: "Facilitating Enganging Events", text: "We consistently produce and share high-quality content, from in-depth articles to practical guides. Our topics are curated to cover the full student experience, addressing both academic and non-academic issues  while providing relevant knowledge and actionable resources for self-development."},
    {id: 3, title: "Building an Empowerment Creative Platform", text: "Beyond content and events, we provide a dedicated creative media platform that functions as a creative outlet for students. It’s an ecosystem where our community can access resources, showcase their projects, and engage in a supportive environment focused on turning potential into tangible impact."},
]

const whyChoseeus = [
    {id: 1, title: "Holistic & Purpose-Driven Development", text: "We look beyond academic scores to focus on your complete personal and professional growth. Our platform is intentionally designed to address the full spectrum of the student experience—both academic and non-academic—while instilling the critical thinking and design thinking skills essential for becoming a high-caliber professional in the modern world."},
    {id: 2, title: "An Ecosystem for Creation & Impact", text: "We are more than a media platform; we are a thriving ecosystem for empowerment. We provide a dedicated creative outlet that encourages you to move beyond passive learning. Here, you can access resources, showcase your projects, and collaborate with peers in a supportive environment focused on turning your potential into real-world impact."},
    {id: 3, title: "Actionable Content & Engaging Events", text: "We bridge the gap between theoretical knowledge and real-world application. We consistently produce high-quality content and facilitate interactive events, such as workshops and webinars, that are curated to be both inspiring and practical. These opportunities provide a dynamic space to connect with experts and apply your learning to tangible challenges"},
]

// === PERUBAHAN UTAMA ADA DI SINI ===
// Komponen Modal sekarang menampilkan konten unik berdasarkan ID
const Modal = ({ activeModalId, onClose }) => {
    if (!activeModalId) return null;

    // Fungsi untuk merender konten modal yang spesifik
    const renderModalContent = () => {
        switch (activeModalId) {
            case 1:
                return {
                    title: "Who We Are",
                    content: (
                        <div className="space-y-4 text-white flex flex-col items-center gap-12 w-full">
                            <section className='flex flex-col gap-2 text-md text-justify'>
                                <img src={allTeam}></img>
                                <p>
                                    Part of the Hubung Group, it is a student empowerment media platform, providing information, resources, and creative outlets that encourage critical thinking, design thinking, and self-development.
                                </p>
                                <p>
                                    Addresses academic and non-academic issues affecting students, with a focus on problem solving and creating real impact.
                                </p>
                            </section>
                            <section className='flex flex-col items-center gap-2 text-justify'>
                                <h4 className='font-bold text-3xl pb-2'>Story</h4>
                                <p>Born from student-led concerns about personal and professional growth, Unteyo Journey was created to fill the gap in developing future-ready mindsets. We aim to transform students from passive content consumers into active creators and collaborators—contributing to a thriving ecosystem that supports Indonesia’s vision for 2045.</p>
                            </section>
                            <section className='flex flex-col items-center gap-6 w-full'>
                                <h4 className='font-bold text-3xl'>Our Team</h4>
                                <div className='flex flex-col md:flex-row w-full items-center justify-around gap-4 flex-wrap'>
                                    {cLevel.map((item) => (
                                        <div key={item.id} className='flex flex-col items-center md:w-1/3'>
                                            <img src={item.img} className='w-2/3 rounded-full md:w-3/4'></img>
                                            <span className='font-semibold text-lg'>{item.name}</span>
                                            <span className='text-md'>{item.title}</span>
                                        </div>
                                    ))}
                                </div>
                                <div className='w-full h-0.25 bg-gray-100'></div>
                                <div className='flex flex-col md:flex-row w-full items-center justify-around gap-4 flex-wrap pb-12'>
                                    {Lead.map((item) => (
                                        <div key={item.id} className='flex flex-col items-center md:w-1/3'>
                                            <img src={item.img} className='w-2/3 rounded-full md:w-3/4'></img>
                                            <span className='font-semibold text-lg'>{item.name}</span>
                                            <span className='text-md'>{item.title}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    )
                };
            case 2:
                return {
                    title: "What We Do",
                    content: (
                        <section className="space-y-4 text-white flex flex-col items-center gap-4 text-justify pb-12">
                            {whatWeDo.map((item) => (
                                <div key={item.id} className='flex flex-col items-center gap-2'>
                                    <h4 className='font-semibold text-lg text-center'>{item.title}</h4>
                                    <span className='text-md'>{item.text}</span>
                                </div>
                            ))}
                        </section>
                    )
                };
            case 3:
                return {
                    title: "Why Choose Us",
                    content: (
                        <section className="space-y-4 text-white flex flex-col items-center gap-4 text-justify pb-12">
                            {whyChoseeus.map((item) => (
                                <div key={item.id} className='flex flex-col items-center gap-2'>
                                    <h4 className='font-semibold text-lg text-center'>{item.title}</h4>
                                    <span className='text-md'>{item.text}</span>
                                </div>
                            ))}
                        </section>
                    )
                };
            default:
                return { title: "", content: null };
        }
    };

    const { title, content } = renderModalContent();

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6 pt-36"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    className="bg-gray-900 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 relative flex flex-col items-center md:max-w-4xl"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors text-2xl font-bold">&times;</button>
                    <h2 className="text-3xl font-bold text-white ">{title}</h2>
                    <div className="text-gray-300">
                        {content}
                    </div>
                    <div className="flex mb-8 justify-center">
                        <button 
                            onClick={onClose}
                            className="bg-white/10 border border-white/20 text-white font-semibold px-6 py-2 rounded-full hover:bg-white/20 transition-colors duration-300"
                        >
                            Close
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};


const GridBox = ({ children, className, onClick, onMouseEnter, onMouseLeave, imageUrl, isExpanded }) => (
    <div 
        className={`flex items-center justify-center rounded-2xl transition-all duration-700 ease-in-out cursor-pointer overflow-hidden relative ${className}`}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
    >
        <div
            className={`absolute inset-0 bg-cover transition-all duration-700 ease-in-out ${isExpanded ? 'bg-start scale-110 blur-sm' : 'bg-center scale-100 blur-0'}`}
            style={{ backgroundImage: `url(${imageUrl})`}}
        />
         <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 w-full h-full">
            {children}
        </div>
    </div>
);

const DefaultContent = ({ title }) => (
    <div 
        className="relative flex items-center justify-center w-full h-full text-white text-center"
    >
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
        if (window.innerWidth >= 1024) {
            setHoveredBox(boxNumber);
        }
    };

    const getBoxClasses = (boxNumber) => {
        const mobileHeight = activeBox === 0 ? 'h-64' : (activeBox === boxNumber ? 'h-128' : 'h-64');
        const desktopWidth = hoveredBox === 0 ? 'md:w-1/3' : (hoveredBox === boxNumber ? 'md:w-full' : 'md:w-1/6');
        return `${mobileHeight} ${desktopWidth} md:h-128`;
    };
    
    // PERUBAHAN: Kunci 'content' dihapus dari data
    const boxesData = [
        { id: 1, imageUrl: bg1, title: "Who We Are", description: "See our journey and meet our teams." },
        { id: 2, imageUrl: bg2, title: "What We Do", description: "Check our enganging activites." },
        { id: 3, imageUrl: bg3, title: "Why Choose Us", description: "Reason you here." }
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

            <div className="w-full flex flex-col md:flex-row gap-6">
                {boxesData.map(box => {
                    const isExpanded = hoveredBox === box.id || activeBox === box.id;
                    return (
                        <GridBox 
                            key={box.id}
                            onClick={() => handleBoxClick(box.id)}
                            onMouseEnter={() => handleDesktopHover(box.id)}
                            onMouseLeave={() => handleDesktopHover(0)}
                            className={getBoxClasses(box.id)}
                            imageUrl={box.imageUrl}
                            isExpanded={isExpanded}
                        >
                            <div className={`absolute inset-0 transition-opacity duration-500 ${isExpanded ? 'opacity-0' : 'opacity-100'}`}>
                                <DefaultContent title={box.title} />
                            </div>
                            <div className={`absolute inset-0 transition-opacity duration-500 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                                <ExpandedContent 
                                    title={box.title} 
                                    description={box.description} 
                                    onLearnMore={() => onOpenModal(box.id)}
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
    // PERUBAHAN: State sekarang menyimpan ID, bukan seluruh objek
    const [activeModalId, setActiveModalId] = useState(null);

    return (
        <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center font-[helvetica]">
            <Header/>
            <div className="text-center mb-4 text-white pt-36 md:mb-8">
                <h1 className="text-2xl font-bold lg:text-4xl">About Unteyo</h1>
            </div>
            <InteractiveGridLayout onOpenModal={setActiveModalId} />
            <Footer/>
            <Modal activeModalId={activeModalId} onClose={() => setActiveModalId(null)} />
        </div>
    );
}
