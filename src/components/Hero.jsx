import React, { use, useEffect, useState } from 'react'
import { useRef } from 'react';
import Button from './Button';
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger)
const Hero = () => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [hasClicked, setHasClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadedVideos, setLoadedVideos] = useState(0);

    const totalVideos = 4;
    const nextVideoRef = useRef(null);
    const upcomingVideoIdx = (currentIndex % totalVideos) + 1;

    const handleMiniVideoClick = () => {
        setHasClicked(true);
        setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
    }
    const handleVideoLoad = () => {
        console.log("loaded 1:", loadedVideos)
        setLoadedVideos((prev) => prev + 1)
    }

    useEffect(() => {
        if (loadedVideos === totalVideos - 1) {
            setIsLoading(false)
        }
    }, [loadedVideos])

    useGSAP(() => {
        gsap.set('#next-video', { visibility: 'visible' });

        gsap.to('#next-video', {
            transformOrigin: 'center center',
            scale: 1,
            width: '100%',
            height: '100%',
            duration: 1,
            ease: 'power1.inOut',
            onStart: () => nextVideoRef.current.play()
        })

        gsap.from('#current-video', {
            transformOrigin: 'center center',
            scale: 0,
            duration: 1.5,
            ease: 'power1.inOut'
        })

    }, { dependencies: [currentIndex], revertOnUpdate: true })

    useGSAP(() => {
        gsap.set("#video-frame", {
            clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
            borderRadius: "0% 0% 40% 10%",
        });
        gsap.from("#video-frame", {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            borderRadius: "0% 0% 0% 0%",
            ease: "power1.inOut",
            scrollTrigger: {
                trigger: "#video-frame",
                start: "center center",
                end: "bottom center",
                scrub: true,
            },
        });
    });

    const getVideoSource = (index) => `videos/hero-${index}.mp4`;
    return (
        <div className='relative h-dvh w-screen overflow-x-hidden'>
            {isLoading &&
                (<div className='flex-center absolute z-100 h-dvh w-screen overflow-hidden bg-violet-50'>
                    <div className='three-body'>
                        <div className='three-body__dot'></div>
                        <div className='three-body__dot'></div>
                        <div className='three-body__dot'></div>
                    </div>
                </div>)}
            <div id='video-frame' className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'>
                <div>
                    <div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg' >
                        <div onClick={handleMiniVideoClick} className='origin-center scale-50 transition-all opacity-0 duration-500  hover:scale-100 ease-in hover:opacity-100'>
                            <video ref={nextVideoRef} src={getVideoSource(upcomingVideoIdx)}
                                loop
                                muted
                                id="currrent-video"
                                className='size-64 origin-center scale-150 object-cover object-center rounded-2xl'
                                onLoadedData={handleVideoLoad}
                            ></video>
                        </div>
                    </div>
                    <video
                        ref={nextVideoRef}
                        src={getVideoSource(currentIndex)}
                        loop
                        id='next-video'
                        className='absolute absolute-center invisible z-20 size-64 object-center object-cover'
                        onLoadedData={handleVideoLoad}
                    ></video>
                    <video
                        loop
                        muted
                        autoPlay
                        className='absolute left-0 top-0 size-full object-cover object-center'
                        src={getVideoSource(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
                        onLoadedData={handleVideoLoad} ></video>
                </div>
                <h1 className='special-font hero-heading absolute bottom-5 z-40 right-5 text-blue-75'>
                    G<b>a</b>ming
                </h1>
                <div className='absolute left-0 top-0 z-40 size-full'>
                    <div className='mt-24 px-5 sm:px-10'>
                        <h1 className='special-font hero-heading text-blue-100'>
                            redefi<b>n</b><b>e</b>
                        </h1>
                        <p className='mb-5 max-w-64 font-robert-regular text-blue-100 '>
                            Enter the Metagame Layer <br /> Unleash the Play Economy
                        </p>
                        <Button id="watch-trailer" title="Watch Trailer" leftIcon={<TiLocationArrow />} containerClass={'bg-yellow-300'} />
                    </div>
                </div>
            </div>
            <h1 className='special-font hero-heading absolute bottom-5 right-5 text-black'>
                G<b>a</b>ming
            </h1>
        </div>
    )
}

export default Hero