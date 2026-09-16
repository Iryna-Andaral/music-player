import React, { useState } from "react";
import { useMusic, type Playlist, type Song } from "../context/MusicContext";

export const Playlists = (): React.ReactElement => {
    const [newPlaylistName, setNewPlaylistName] = useState<string>("");
    const { playlists, createPlaylist, allSongs, addSongToPlaylist, currentTrackIndex, handlePlaySong, deletePlaylist } = useMusic();
    const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [showDropdown, setShowDropdown] = useState<boolean>(false);
    
    const filteredSongs = allSongs.filter((song) => {
        const matches = song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        song.artist.toLowerCase().includes(searchQuery.toLowerCase())
        
        const isAlreadyInPlaylist = selectedPlaylist?.songs.some((playlistSong)=> playlistSong.id === song.id)
    
        return matches && !isAlreadyInPlaylist
    })


    const handleCreatePlaylist = () => {
        if (newPlaylistName.trim() !== "") {
            createPlaylist(newPlaylistName.trim());
            setNewPlaylistName("");
        }
    }

    const handleAddSong = (song: Song): void => {
        if (!selectedPlaylist) {
            return;
        }

        addSongToPlaylist(selectedPlaylist.id, song);
        setSearchQuery("");
        setShowDropdown(false);
    }

    const deletePlaylistConfirmation = (playlist: Playlist): void => {
        if (window.confirm(`Are you sure you want to delete playlist: "${playlist.name}"`)){
                deletePlaylist(playlist.id)
        }
    }

    return (
        <div>
             <h2 className="text-xl font-bold mt-3">Playlists</h2>


            {/* Create New Playlists */}
            <div className="mt-1 mb-2 rounded-lg border border-gray-700 bg-gray-800 p-4">
                <h3>Create new playlist</h3>
                <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                    <input
                        type="text"
                        placeholder="Playlist Name ..."
                        className="h-10 w-full min-w-0 rounded border border-gray-600 bg-gray-900 p-2 text-white outline-none transition-colors hover:border-gray-400 hover:bg-gray-800 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 sm:flex-1"
                        value={newPlaylistName}
                        onChange={(event) => setNewPlaylistName(event.target.value)}
                    />
                    <button
                        className="h-10 w-full rounded border border-gray-500 bg-gray-600 px-3 text-white transition-colors hover:bg-lime-400 hover:text-gray-900 sm:w-auto"
                        onClick={handleCreatePlaylist}
                    >
                        Create
                    </button>
                </div>
            </div>

            {/* Display Playlists */}
            {playlists.length === 0 ? (
                <p>No playlists created yet.</p>
            ) : (
                <div>
                    {playlists.map((playlist) => (
                        <div
                            key={playlist.id}
                            className="bg-gray-800 p-4 rounded-lg border border-gray-700 mt-2 mb-4"
                        >
                            <div className="flex items-center justify-between gap-1">
                                <div className="w-70">{playlist.name}</div>
                                <button
                                    type="button"
                                    title={`Delete playlist ${playlist.name}`}
                                    aria-label={`Delete ${playlist.name}`}
                                    className="flex h-8 w-10 items-center justify-center gap-1 whitespace-nowrap text-white hover:text-red-500 cursor-pointer"
                                    onClick={() => deletePlaylistConfirmation(playlist)}
                                >
                                    
                                    <span
                                        className="[font-variant-emoji:text]"
                                        >🗑️ ✖</span>
                                </button>
                            </div>
                            {/*Add songs to playlist */}
                            <input
                                type="text"
                                placeholder="Search songs to add ..."
                                className="w-70 mt-3 mb-6 block p-2 border border-gray-600 rounded bg-gray-900 text-white outline-none transition-colors hover:border-gray-400 hover:bg-gray-800 focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
                                value={selectedPlaylist?.id === playlist.id ? searchQuery : ""}
                                onChange={(event) => {
                                    setSearchQuery(event.target.value);
                                    setSelectedPlaylist(playlist)
                                    setShowDropdown(event.target.value.length > 0);
                                }}
                                onFocus={(event) => {
                                    setSelectedPlaylist(playlist)
                                    setShowDropdown(event.target.value.length > 0);
                                }}
                            />
                            {selectedPlaylist?.id === playlist.id && showDropdown && (
                                <div className="mt-8">
                                    {filteredSongs.length === 0 ? (
                                        <div className="text-sm leading-tight pl-2">No songs found</div>
                                    ) : (
                                        filteredSongs.slice(0, 5).map((song) => (
                                            <button
                                                key={song.id}
                                                type="button"
                                                className="block w-full text-left"
                                                onClick={() => handleAddSong(song)}
                                            >
                                                <div className="text-sm leading-tight pl-2">{song.title}</div>
                                                <div className="pb-0.5 pl-2 text-xs leading-tight text-gray-400">{song.artist}</div>
                                            </button>
                                        ))
                                    )}
                                </div>
                            )}
                            <div>
                                {playlist.songs.length === 0 ? (
                                    !(selectedPlaylist?.id === playlist.id && showDropdown) && (
                                        <p className="text-sm leading-tight pl-2">No songs in this playlist</p>
                                    )
                                ) : (
                                    playlist.songs.map((song, key) => (
                                            <div key={key}
                                                className={`${currentTrackIndex === song.id ? "border-lime-500 bg-gray-700 shadow-lg shadow-lime-500/20" : "bg-gray-800"} relative mt-1 cursor-pointer rounded-md border border-gray-700 p-1.5 leading-tight transition-transform duration-200 hover:scale-105 hover:border-lime-500 hover:shadow-lg hover:shadow-lime-500/20`}
                                                onClick={() => handlePlaySong(song, song.id)}
                                            >
                                            <h2 className="text-sm leading-tight pl-2">{song.title}</h2>
                                            <p className="pb-0.5 pl-2 text-xs leading-tight text-gray-400">
                                            {song.artist}
                                            </p>
                                            <span className="pl-2 text-xs text-gray-500">{song.duration}</span>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-lg">
                                            {currentTrackIndex === song.id ? (
                                                <span className="text-2xl text-lime-500">♪</span>
                                            ) : (
                                                "▶︎"
                                            )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    ))}
          
                </div>
            )}
        </div>
    )
}