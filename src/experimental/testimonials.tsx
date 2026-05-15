"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { AnimatedSection } from "../components/AnimatedSection";

const testimonials = [
    {
        quote: "Grafiki, które otrzymaliśmy, całkowicie odmieniły naszą konwersję. Klienci spędzają o 40% więcej czasu na stronach produktowych.",
        author: "Karolina Nowak",
        role: "CMO, Natural Cosmetics",
        img: "/images/placeholder.jpg"
    },
    {
        quote: "To nie są zwykłe packshoty. To dzieła sztuki, które pozycjonują naszą markę w segmencie premium bez słów.",
        author: "Michał Wiśniewski",
        role: "Founder, Minimalist Home",
        img: "/images/placeholder.jpg"
    },
    {
        quote: "Współpraca była perfekcyjna. Otrzymaliśmy materiały na Amazon, które natychmiast wybiły nasze listingi na pierwszą stronę wyników.",
        author: "Anna Kowalska",
        role: "E-commerce Director",
        img: "/images/placeholder.jpg"
    }
];

export const Testimonials = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-advance
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % testimonials.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    return (
        <AnimatedSection className="py-20 md:py-32 px-6 md:px-12 bg-[var(--card)]">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 md:gap-16 items-center">
                <div className="w-full md:w-1/3">
                    <span className="text-[var(--primary)] text-xs font-bold tracking-widest uppercase mb-4 block">DOŚWIADCZENIE KLIENTÓW</span>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[var(--foreground)] mb-4 md:mb-6">Słowa, które ważą więcej.</h2>
                    <p className="text-[var(--muted-foreground)] mb-8">Zaufali nam liderzy e-commerce, którzy nie godzą się na kompromisy wizualne.</p>

                    <div className="flex items-center gap-6">
                        {/* Desktop Navigation Buttons */}
                        <div className="hidden md:flex gap-2">
                            <button
                                onClick={handlePrev}
                                className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-colors"
                                aria-label="Previous testimonial"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                            </button>
                            <button
                                onClick={handleNext}
                                className="w-10 h-10 rounded-full border border-[var(--border)] flex items-center justify-center text-[var(--foreground)] hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)] transition-colors"
                                aria-label="Next testimonial"
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                            </button>
                        </div>

                        {/* Dots */}
                        <div className="flex gap-4">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentIndex(i)}
                                    className={`h-1 transition-all duration-500 rounded-full ${i === currentIndex ? "w-10 bg-[var(--primary)]" : "w-4 bg-[var(--border)]"}`}
                                    aria-label={`Go to slide ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-2/3 relative min-h-[380px] md:min-h-0 md:h-[400px]">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{
                                opacity: i === currentIndex ? 1 : 0,
                                x: i === currentIndex ? 0 : 20,
                                pointerEvents: i === currentIndex ? "auto" : "none"
                            }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute inset-0 flex flex-col justify-center"
                        >
                            <svg className="w-10 h-10 md:w-12 md:h-12 text-[var(--muted)] mb-4 md:mb-6" fill="currentColor" viewBox="0 0 32 32" aria-hidden="true">
                                <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                            </svg>
                            <p className="text-xl sm:text-2xl md:text-3xl font-serif leading-relaxed text-[var(--foreground)] mb-6 md:mb-8">
                                &ldquo;{t.quote}&rdquo;
                            </p>
                            <div className="flex items-center gap-4">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden bg-[var(--muted)]">
                                    <Image src={t.img} alt={t.author} fill className="object-cover" />
                                </div>
                                <div>
                                    <div className="font-bold text-[var(--foreground)]">{t.author}</div>
                                    <div className="text-sm text-[var(--muted-foreground)]">{t.role}</div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
};
