"use client"
import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react';

const MediaItem = ({ item, className, onClick }) => {
    const videoRef = useRef(null);
    const [isInView, setIsInView] = useState(false);
    const [isBuffering, setIsBuffering] = useState(true);

    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '50px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                setIsInView(entry.isIntersecting);
            });
        }, options);

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        };
    }, []);

    useEffect(() => {
        let mounted = true;

        const handleVideoPlay = async () => {
            if (!videoRef.current || !isInView || !mounted) return;

            try {
                if (videoRef.current.readyState >= 3) {
                    setIsBuffering(false);
                    await videoRef.current.play();
                } else {
                    setIsBuffering(true);
                    await new Promise((resolve) => {
                        if (videoRef.current) {
                            videoRef.current.oncanplay = resolve;
                        }
                    });
                    if (mounted) {
                        setIsBuffering(false);
                        await videoRef.current.play();
                    }
                }
            } catch (error) {
                console.warn("Video playback failed:", error);
            }
        };

        if (isInView) {
            handleVideoPlay();
        } else if (videoRef.current) {
            videoRef.current.pause();
        }

        return () => {
            mounted = false;
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.removeAttribute('src');
                videoRef.current.load();
            }
        };
    }, [isInView]);

    if (item.type === 'video') {
        return (
            <div className={`${className} relative overflow-hidden`}>
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    onClick={onClick}
                    playsInline
                    muted
                    loop
                    preload="auto"
                    style={{
                        opacity: isBuffering ? 0.8 : 1,
                        transition: 'opacity 0.2s',
                        transform: 'translateZ(0)',
                        willChange: 'transform',
                    }}
                >
                    <source src={item.url} type="video/mp4" />
                </video>
                {isBuffering && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </div>
                )}
            </div>
        );
    }

    return (
        <img
            src={item.url}
            alt={item.title}
            className={`${className} object-cover cursor-pointer`}
            onClick={onClick}
            loading="lazy"
            decoding="async"
        />
    );
};

const GalleryModal = ({ selectedItem, isOpen, onClose, setSelectedItem, mediaItems, onActionClick }) => {
    const [dockPosition, setDockPosition] = useState({ x: 0, y: 0 });

    if (!isOpen) return null;

    return (
        <>
            {/* Main Modal */}
            <motion.div
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.98, opacity: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 30
                }}
                className="fixed inset-0 w-full min-h-screen sm:h-[90vh] md:h-[600px] backdrop-blur-lg 
                          rounded-none sm:rounded-lg md:rounded-xl overflow-hidden z-50 bg-pure-white/80"
            >
                {/* Main Content */}
                <div className="h-full flex flex-col pt-12 sm:pt-0">
                    <div className="flex-1 p-2 sm:p-3 md:p-4 flex items-center justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedItem.id}
                                className="relative w-full aspect-[16/9] max-w-[95%] sm:max-w-[85%] md:max-w-4xl 
                                         h-auto max-h-[75vh] rounded-2xl overflow-hidden shadow-2xl border border-border-default"
                                initial={{ y: 20, scale: 0.97, opacity: 0 }}
                                animate={{
                                    y: 0,
                                    scale: 1,
                                    opacity: 1,
                                    transition: {
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 30,
                                        mass: 0.5
                                    }
                                }}
                                exit={{
                                    y: 20,
                                    scale: 0.97,
                                    opacity: 0,
                                    transition: { duration: 0.15 }
                                }}
                            >
                                <MediaItem item={selectedItem} className="w-full h-full object-cover bg-off-white" />
                                
                                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 
                                              bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 pointer-events-none">
                                    <div className="pointer-events-auto">
                                        <h3 className="text-white text-xl sm:text-2xl md:text-3xl font-display font-bold text-pure-white mb-2">
                                            {selectedItem.title}
                                        </h3>
                                        <p className="text-pure-white/80 text-sm sm:text-base max-w-lg mb-2">
                                            {selectedItem.desc}
                                        </p>
                                        <p className="text-brand-light font-bold text-lg">
                                            {selectedItem.price}
                                        </p>
                                    </div>
                                    <div className="pointer-events-auto shrink-0">
                                       <button 
                                         onClick={() => onActionClick && onActionClick(selectedItem)}
                                         className="bg-brand-teal text-pure-white px-6 py-3 rounded-xl font-bold font-display hover:bg-brand-dark transition-colors shadow-lg flex items-center gap-2"
                                       >
                                         View Details &rarr;
                                       </button>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Close Button */}
                <motion.button
                    className="absolute top-4 sm:top-6 right-4 sm:right-6 
                              p-3 rounded-full bg-pure-white shadow-md border border-border-default text-text-dark hover:bg-off-white hover:text-brand-teal
                              transition-colors backdrop-blur-sm z-50"
                    onClick={onClose}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <X className='w-5 h-5' />
                </motion.button>
            </motion.div>

            {/* Draggable Dock */}
            <motion.div
                drag
                dragMomentum={false}
                dragElastic={0.1}
                initial={false}
                animate={{ x: dockPosition.x, y: dockPosition.y }}
                onDragEnd={(_, info) => {
                    setDockPosition(prev => ({
                        x: prev.x + info.offset.x,
                        y: prev.y + info.offset.y
                    }));
                }}
                className="fixed z-[60] left-1/2 bottom-8 -translate-x-1/2 touch-none"
            >
                <motion.div
                    className="relative rounded-2xl bg-pure-white/90 backdrop-blur-xl 
                             border border-border-default shadow-2xl p-2
                             cursor-grab active:cursor-grabbing"
                >
                    <div className="flex items-center gap-2 px-2">
                        {mediaItems.map((item, index) => (
                            <motion.div
                                key={item.id}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedItem(item);
                                }}
                                style={{
                                    zIndex: selectedItem.id === item.id ? 30 : mediaItems.length - index,
                                }}
                                className={`
                                    relative group
                                    w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 
                                    rounded-xl overflow-hidden 
                                    cursor-pointer hover:z-20
                                    ${selectedItem.id === item.id
                                        ? 'ring-2 ring-brand-teal shadow-lg'
                                        : 'hover:ring-2 hover:ring-brand-teal/50'}
                                `}
                                initial={{ rotate: index % 2 === 0 ? -5 : 5 }}
                                animate={{
                                    scale: selectedItem.id === item.id ? 1.15 : 1,
                                    rotate: selectedItem.id === item.id ? 0 : index % 2 === 0 ? -5 : 5,
                                    y: selectedItem.id === item.id ? -8 : 0,
                                }}
                                whileHover={{
                                    scale: 1.2,
                                    rotate: 0,
                                    y: -8,
                                    transition: { type: "spring", stiffness: 400, damping: 25 }
                                }}
                            >
                                <MediaItem item={item} className="w-full h-full object-cover" onClick={() => setSelectedItem(item)} />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </motion.div>
        </>
    );
};

const InteractiveBentoGallery = ({ mediaItems, title, description, onProductClick }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const [items, setItems] = useState(mediaItems);
    const [isDragging, setIsDragging] = useState(false);

    // If the user wants direct click bypass, we could do it here
    // But keeping the modal intact per requirements and firing onProductClick from the modal's CTA
    const handleItemClick = (item) => {
        if (!isDragging) {
            // The user requested: "clicking on them should take them to product page on exact product they clicked on"
            // We can bypass the modal completely if preferred, or open it. Let's bypass to strictly follow the prompt.
            if (onProductClick) {
                onProductClick(item);
            } else {
                setSelectedItem(item);
            }
        }
    };

    return (
        <div className="w-full">
            <div className="mb-12 text-center">
                <motion.h2
                    className="text-[clamp(2.5rem,5vw,4rem)] font-display font-black bg-clip-text text-transparent bg-gradient-to-br from-brand-teal to-brand-dark leading-[1.1] mb-4 pb-2 drop-shadow-sm"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    {title}
                </motion.h2>
                <motion.p
                    className="text-lg text-text-body max-w-2xl mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                >
                    {description}
                </motion.p>
            </div>
            
            <AnimatePresence mode="wait">
                {selectedItem && !onProductClick ? (
                    <GalleryModal
                        selectedItem={selectedItem}
                        isOpen={true}
                        onClose={() => setSelectedItem(null)}
                        setSelectedItem={setSelectedItem}
                        mediaItems={items}
                        onActionClick={onProductClick}
                    />
                ) : (
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 auto-rows-[250px] md:auto-rows-[300px]"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.1 }
                            }
                        }}
                    >
                        {items.map((item, index) => (
                            <motion.div
                                key={item.id}
                                layoutId={`media-${item.id}`}
                                className={`relative rounded-3xl overflow-hidden cursor-pointer shadow-sm border border-border-default group ${item.span}`}
                                onClick={() => handleItemClick(item)}
                                variants={{
                                    hidden: { y: 50, scale: 0.95, opacity: 0 },
                                    visible: {
                                        y: 0,
                                        scale: 1,
                                        opacity: 1,
                                        transition: {
                                            type: "spring",
                                            stiffness: 350,
                                            damping: 25,
                                        }
                                    }
                                }}
                                whileHover={{ scale: 0.98, transition: { duration: 0.2 } }}
                                drag
                                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                dragElastic={1}
                                onDragStart={() => setIsDragging(true)}
                                onDragEnd={(e, info) => {
                                    setIsDragging(false);
                                    const moveDistance = info.offset.x + info.offset.y;
                                    if (Math.abs(moveDistance) > 50) {
                                        const newItems = [...items];
                                        const draggedItem = newItems[index];
                                        const targetIndex = moveDistance > 0 ?
                                            Math.min(index + 1, items.length - 1) :
                                            Math.max(index - 1, 0);
                                        newItems.splice(index, 1);
                                        newItems.splice(targetIndex, 0, draggedItem);
                                        setItems(newItems);
                                    }
                                }}
                            >
                                <MediaItem
                                    item={item}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    onClick={() => handleItemClick(item)}
                                />
                                <motion.div
                                    className="absolute inset-0 flex flex-col justify-end p-6 pointer-events-none"
                                    initial={{ opacity: 0.8 }}
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                    <div className="relative z-10 flex flex-col justify-end h-full">
                                        <div className="mb-auto self-end bg-pure-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-pure-white/30 text-pure-white text-xs font-bold tracking-wider uppercase">
                                           {item.price}
                                        </div>
                                        <h3 className="text-pure-white text-xl sm:text-2xl font-display font-bold mb-1 drop-shadow-md">
                                            {item.title}
                                        </h3>
                                        <p className="text-pure-white/80 text-sm md:text-base font-medium drop-shadow-sm line-clamp-2">
                                            {item.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default InteractiveBentoGallery;
