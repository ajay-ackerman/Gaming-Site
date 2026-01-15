import React, { useEffect, useRef, useState } from 'react'
import { TiLocationArrow } from 'react-icons/ti'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'

gsap.registerPlugin(ScrollTrigger);

const BentoTilt = ({ children, className = '' }) => {
    const [transformStyle, setTransformStyle] = useState('')
    const itemRef = useRef()

    const handleMouseMove = (event) => {
        if (!itemRef.current) return;

        const { left, top, width, height } =
            itemRef.current.getBoundingClientRect();

        const relativeX = (event.clientX - left) / width;
        const relativeY = (event.clientY - top) / height;

        const tiltX = (relativeY - 0.5) * 10;
        const tiltY = (relativeX - 0.5) * -10;

        const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
        setTransformStyle(newTransform);
    };

    const handleMouseLeave = () => {
        setTransformStyle("");
    };

    return (
        <div className={className} ref={itemRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
            style={{ transform: transformStyle }}>
            {children}
        </div>
    )

}

const BentoCard = ({ src, title, description, titleColor = 'text-blue-50', descriptionColor = 'text-blue-50' }) => {
    return (
        <div className='relative size-full '>
            <video src={src}
                loop
                muted
                autoPlay
                className='absolute left-0 top-0 size-full object-cover object-center brightness-75' />
            <div className={`relative z-10 flex flex-col size-full justify-between p-5 ${titleColor}`}>
                <div className=''>
                    <h1 className='bento-title special-font'>{title}</h1>
                    {
                        description && (
                            <p className={`mt-3 max-w-64  !text-sm md:text-base descriptiom ${descriptionColor}`}>
                                {description}
                            </p>
                        )
                    }
                </div>
            </div>
            {title}
        </div>
    )
}

const Features = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        // Animation to change background color
        gsap.to(sectionRef.current, {
            backgroundColor: "black", // The target color (Deep KTM Charcoal)
            scrollTrigger: {
                trigger: "#features",
                start: "bottom top", // Starts when bottom of #features hits center of viewport
                end: "+=500",    // Ends when bottom of #features hits top of viewport
                scrub: 1,          // Smooth transition linked to scroll
            },
            ease: 'power1.inOut'
        });
    }, []);
    return (
        <section ref={sectionRef} className=' pb-52 '>
            <div className='container mx-auto px-3 md:px-10'>
                <div id='features' className='px-5 py-32'>
                    <p className=' font-circular-web text-lg text-blue-50'>
                        Into the Flow State
                    </p>

                    <p className='max-w-md font-circular-web text-lg text-blue-50 opacity-50'>
                        Step into a limitless and uncharted territory where rugged expeditions and technical mastery converge into an immersive adventure that redefines your reality.                    </p>
                </div>

                <BentoTilt className='border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]'>
                    <BentoCard src="videos/feature-1.mp4"
                        title={
                            <>Trail<b>H</b>ead</>
                        }
                        description="A multi-terrain adventure engine, turning your efforts across singletracks and mountain passes into a legendary descent."

                    />
                </BentoTilt>
                <div className='grid h-[135vh] grid-cols-2 grid-rows-3 gap-7 '>
                    <BentoTilt className='bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2'>
                        <BentoCard
                            src="videos/feature-2.mp4"

                            title={
                                <>
                                    APE<b>X</b>
                                </>}
                            description="

A rider-driven and terrain-inspired collective — the standard primed for global conquest."
                        />
                    </BentoTilt>
                    <BentoTilt className=' bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0'>
                        <BentoCard
                            titleColor=" text-orange-500 "
                            src="videos/feature-3.mp4"
                            title={
                                <>
                                    ORA<b>N</b>GE W<b>O</b>RLD
                                </>
                            }
                            description="
A hyper-connected rider network, adding a new dimension of adrenaline to the trail for the global KTM collective."
                        />

                    </BentoTilt>
                    <BentoTilt className='bento-tilt_1 me-14 md:col-span-1 md:me-0'>
                        <BentoCard
                            src="videos/feature-4.mp4"
                            title={
                                <>
                                    A<b>M</b>T
                                </>
                            }
                            description="

A revolutionary automated manual transmission — elevating your shifting to be more fluid and purely instinctive."
                        />

                    </BentoTilt>
                    <BentoTilt className=' bento-tilt_2'>
                        <div className='flex size-full flex-col justify-between bg-orange-500 p-5 brightness-95'>
                            <h1 className='bento-title special-font max-w-64 text-black text-8xl'>EX<b>P</b>ERIENCE T<b>H</b>E A<b>D</b>RENALI<b>N</b>E</h1>
                            <TiLocationArrow className='m-5 scale-[5] self-end' />
                        </div>
                    </BentoTilt>
                    <BentoTilt className='bento-tilt_2'>
                        <video src="/videos/feature-5.mp4"
                            loop
                            autoPlay
                            muted
                            className='brightness-90 size-full object-cover  object-center' />
                    </BentoTilt>
                </div>
            </div>
        </section>
    )
}

export default Features