import { useEffect, useRef } from "react"
import { useMusic } from "../context/MusicContext";

export const MusicPlayer = (): React.ReactElement => {
    const {
        currentTrack,
        currentTime,
        setCurrentTime,
        formatTime,
        duration,
        setDuration,
        nextTreck,
        prevTrack,
        play,
        pause,
        isPlaying,
        volume,
        setVolume
    } = useMusic();
  
    const audioRef = useRef<HTMLAudioElement>(null);
    
    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const audio = audioRef.current;
        if (!audio) return;
        const newTime = parseFloat(e.target.value);
        audio.currentTime = newTime;
        setCurrentTime(newTime);
    }
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
    }
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        audio.volume=volume;
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        if (isPlaying && audio){
            audio.play().catch((err) => console.error(err));
        } else if (!isPlaying && audio) {
            audio.pause();
    }}, [isPlaying, nextTreck, prevTrack, currentTrack]);


    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;
        
        audio.load()
        setCurrentTime(0);
        setDuration(0);
    },[currentTrack, setCurrentTime, setDuration]);



    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleLoadMetadata = () => {
            setDuration(audio.duration);
    }

    const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
    }

    const handleEnded = () => {
        nextTreck();
    }

    audio.addEventListener("loadedmetadata", handleLoadMetadata);
    audio.addEventListener("canplay", handleTimeUpdate);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadMetadata);
      audio.removeEventListener("canplay", handleTimeUpdate);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [setDuration, setCurrentTime, currentTrack, nextTreck]);
   
    const progressPersentage = duration > 0 ? currentTime / duration *100 : 0;
    const progressVolume = volume >0 ? volume * 100 : 0;

    return (
        <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 mt-11">
            <audio ref={audioRef} src={currentTrack.url} preload="metadata" crossOrigin="anonymous" />

            <div>
                <h3>{currentTrack.title || "Select a song to play"}</h3>
                <p className="text-gray-400">{currentTrack.artist || "No artist available"}</p>
            </div>
            <div className="flex w-full items-center gap-2">
            <span className="text-sm text-gray-300">{formatTime(currentTime)}</span>
            
            <input  className="inline-block align-middle
                    h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-600
                    accent-lime-500
                    [&::-webkit-slider-thumb]:h-4
                    [&::-webkit-slider-thumb]:w-4
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-lime-500
                    [&::-moz-range-thumb]:h-4
                    [&::-moz-range-thumb]:w-4
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:border-0
                    [&::-moz-range-thumb]:bg-lime-500
                    "
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime || 0}
                step="0.1"
                onChange={handleTimeChange}
                style={{
                    background: `linear-gradient(
                        to right,
                        #84cc16 0%,
                        #84cc16 ${progressPersentage}%,
                        #4b5563 ${progressPersentage}%,
                        #4b5563 100%
                    
                    )`,
                }}
            />
            <span className="text-sm text-gray-300">{formatTime(duration)}</span>
            </div>
            <div className="my-10 flex items-center justify-center gap-4 sm:gap-2">
                <button className="h-11 w-11 cursor-pointer rounded-full bg-gray-600 font-sans text-white [font-variant-emoji:text] sm:h-12 sm:w-12" onClick={prevTrack}>⏮</button>
                               
                <button className="h-14 w-14 cursor-pointer rounded-full bg-lime-500 text-white sm:h-15 sm:w-15 sm:mx-3"
                 onClick={() => (isPlaying ? pause() : play())}>
                    {isPlaying ? "❚❚" : "▶︎"}
                </button>
                <button className="h-11 w-11 cursor-pointer rounded-full bg-gray-600 text-white [font-variant-emoji:text] sm:h-12 sm:w-12" onClick={nextTreck}>⏭</button>
            </div>
            <div className="my-10 flex items-center justify-center gap-2">
                <span>🔊</span>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    onChange={handleVolumeChange}
                    value={volume}
                    className="appearance-none bg-gray-600  accent-lime-500 h-1"
                    style={{
                    background: `linear-gradient(
                        to right,
                            #84cc16 0%,
                            #84cc16 ${progressVolume}%,
                            #4b5563 ${progressVolume}%,
                            #4b5563 100%           
                        )`,
                    }}
                    
                />
            </div>
        </div>

    )
}