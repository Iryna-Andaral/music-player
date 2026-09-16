import { createContext, useState, useContext, useEffect } from "react";

export type Song = {
    id: number;
    title: string;
    artist: string;
    url: string;
    duration: string;
};

export type Playlist = {
    id: number;
    name: string;
    songs: Song[];
};

type MusicContextType = {
  allSongs: Song[];
  handlePlaySong: (song: Song, index: number) => void;
  currentTrack: Song;
  currentTrackIndex: number;
  currentTime: number;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  formatTime: (time: number) => string;
  duration: number;
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  nextTreck: () => void;
  prevTrack: () => void;
  play: (song?: Song, index?: number) => void;
  pause: () => void;
  isPlaying: boolean;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
  playlists: Playlist[];
  createPlaylist: (name: string) => void;
  addSongToPlaylist: (playlistId: number, song: Song) => void;
  deletePlaylistConfirmation: (playlist: Playlist) => void;
  deletePlaylist: (playlistId: number) => void;
};

const songs: Song[] = [
    {
        id: 1,
        title: "I'm Good (Blue)",
        artist: "David Guetta, Bebe Rexh",
        url: `https://github.com/Iryna-Andaral/music-player/blob/gh-pages/songs/1691511094_david-guetta-bebe-rexha-im-good-blue.mp3`,
        duration: "2:55"
    },
    {
        id: 2,
        title: "Beautiful Life",
        artist: "Ace Of Base",
        url: `https://github.com/Iryna-Andaral/music-player/blob/gh-pages/songs/Ace Of Base - Beautiful Life.mp3`,
        duration: "3:39"
    },  
    {
        id: 3,
        title: "Wheel Of Fortune",
        artist: "Ace Of Base",
        url: `https://github.com/Iryna-Andaral/music-player/blob/gh-pages/songs/Ace Of Base - Wheel Of Fortune.mp3`,
        duration: "3:53"
    }, 
    {
        id: 4,
        title: "(Everything I Do) I Do It For You",
        artist: "Bryan Adams",
        url: `https://github.com/Iryna-Andaral/music-player/blob/gh-pages/songs/Bryan Adams - (Everything I Do) I Do It For You.mp3`,
        duration: "6:25"
    },  
    {
        id: 5,
        title: "Please Forgive Me",
        artist: "Bryan Adams",
        url: `https://github.com/Iryna-Andaral/music-player/blob/gh-pages/songs/Bryan Adams - Please Forgive Me.mp3`,
        duration: "5:55"
    },
    {
        id: 6,
        title: "Always remember us this way (remix)",
        artist: "Dj Tons / Lady Gaga",
        url: `https://github.com/Iryna-Andaral/music-player/blob/gh-pages/songs/Dj_Tons_Lady_Gaga_-_Always_remember_us_this_way_remix_(mp3.pm).mp3`,
        duration: "3:54"
    }, 
    {
        id: 7,
        title: "Believer",
        artist: "Imagine Dragons",
        url: `https://github.com/Iryna-Andaral/music-player/blob/gh-pages/songs/imagine-dragons-believer-(meloua.com).mp3`,
        duration: "3:24"
    }, 
    {
        id: 8,
        title: "Nothing Else Matters",
        artist: "Metallica",
        url: `https://github.com/Iryna-Andaral/music-player/blob/gh-pages/songs/Metallica - Nothing Else Matters.mp3`,
        duration: "6:29"
    },
    {
        id: 9,
        title: "The Unforgiven",
        artist: "Metallica",
        url: `https://github.com/Iryna-Andaral/music-player/blob/gh-pages/songs/Metallica - The Unforgiven.mp3`,
        duration: "6:29"
    },
    {
        id: 10,
        title: "Englishman In New York",
        artist: "Sting",
        url: `https://github.com/Iryna-Andaral/music-player/blob/gh-pages/songs/Sting - Englishman In New York.mp3`,
        duration: "4:29"
    }, 
    {
        id: 11,
        title: "Shape Of My Heart",
        artist: "Sting",
        url: `https://github.com/Iryna-Andaral/music-player/blob/gh-pages/songs/Sting - Shape Of My Heart.mp3`,
        duration: "4:33"
    }                              
]

export const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider = ({ children }: { children: React.ReactNode }) => {
    const [allSongs] = useState<Song[]>(songs)
    const [currentTrack, setCurrentTrack] = useState<Song>(songs[0])
    const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(1)
    const [currentTime, setCurrentTime] = useState<number>(0)
    const [duration, setDuration] = useState<number>(0)
    const [isPlaying, setIsPlaying] = useState<boolean>(false)
    const [volume, setVolume] = useState<number>(1)
    const [playlists, setPlaylists] = useState<Playlist[]>(() => {
    
        const savedPlaylists = localStorage.getItem("musicPlayerPlaylists");

        if (!savedPlaylists) {
            return [];
        }

        try {
            return JSON.parse(savedPlaylists) as Playlist[];
        } catch {
            return [];
        }
    })

    useEffect(() => {
        localStorage.setItem("musicPlayerPlaylists", JSON.stringify(playlists));
    }, [playlists]);

    const play = (song?: Song, index?: number): void => {
        if (song) {
            setCurrentTrack(song);
        }

        if (index !== undefined) {
            setCurrentTrackIndex(index);
        }

        setIsPlaying(true);
    }
    const pause = (): void => setIsPlaying(false)

    const handlePlaySong = (song: Song, index: number):void => {
        setCurrentTrack(song)
        setCurrentTrackIndex(index)
    }

    const nextTreck = (): void => {
        setCurrentTrackIndex((prev) => {
            const nextIndex = (prev + 1) % allSongs.length;
            setCurrentTrack(allSongs[nextIndex]);
        return nextIndex;
    })}

    const prevTrack = (): void => {
        setCurrentTrackIndex((prev) => {
            const nextIndex = prev=== 0 ? allSongs.length - 1 : prev - 1;
            setCurrentTrack(allSongs[nextIndex]);
           
        return nextIndex;
    })}

    const formatTime = (time: number): string => {
       if(isNaN(time) || time ===undefined) return "0:00";
       const minutes = Math.floor(time / 60);
       const seconds = Math.floor(time % 60);
       return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    const createPlaylist = (name: string): void => {
        const newPlaylist = {
            id: Date.now(),
            name,
            songs: []
        }
        setPlaylists((prevPlaylists) => [...prevPlaylists, newPlaylist]);
    }

    const deletePlaylist = (playlistId: number): void => {
        setPlaylists((prevPlaylists) => prevPlaylists.filter((playlist) => playlist.id !== playlistId));
    };

    const deletePlaylistConfirmation = (playlist: Playlist): void => {
    if (window.confirm(`Are you sure you want to delete playlist: "${playlist.name}"`)) {
        deletePlaylist(playlist.id);
    }
};

    const addSongToPlaylist = (playlistId: number, song: Song): void => {
        setPlaylists((prevPlaylists) => prevPlaylists.map((playlist) => {
            if (playlist.id === playlistId) {
                return { ...playlist, songs: [...playlist.songs, song] };
            }

            return playlist;
        }));
    }

    return <MusicContext.Provider value={{ 
        allSongs,
        handlePlaySong,
        currentTrack,
        currentTrackIndex,
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
        setVolume,
        createPlaylist,
        playlists,
        addSongToPlaylist,
        deletePlaylistConfirmation,
        deletePlaylist
    }}>
        {children}
        </MusicContext.Provider>
}

export const useMusic = () => {
    const contextValue = useContext(MusicContext);
    if (!contextValue) {
    throw new Error("useMusic must be used inside of MusicProvider");
  }

  return contextValue;
};
