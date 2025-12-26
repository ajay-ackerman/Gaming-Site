import React, { use, useState } from 'react'
import { useRef } from 'react';

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
        setLoadedVideos((prev) => upcomingVideoIdx)
    }
    const getVideoSource = (index) => `videos/hero-${index}.mp4`;
    return (
        <div className='relative h-dvh w-screen overflow-x-hidden'>
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
                    ></video>
                    <video
                        loop
                        muted
                        autoPlay
                        className='absolute left-0 top-0 size-full object-cover object-center'
                        src={getVideoSource(currentIndex === totalVideos - 1 ? 1 : currentIndex)} ></video>
                </div>
                <h1 className='special-font hero-heading absolute bottom-5 z-40 right-5 text-blue-75'>
                    G<b>a</b>ming
                </h1>
                <div className='absolute left-0 top-0 z-40 size-full'>
                    <div className='mt-24 px-5 sm:px-10'>
                        <h1 className='special-font hero-heading text-blue-100'>
                            redefi<b>n</b><b>e</b>
                        </h1>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero