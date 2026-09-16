import { useMusic } from "../context/MusicContext";

export const AllSongs = (): React.ReactElement => {
  const { allSongs, handlePlaySong, currentTrackIndex  } = useMusic();

  return (
    <div>
      <h2 className="mt-3 text-xl font-bold">
        AllSongs <span className="text-sm font-normal">({allSongs.length})</span>
      </h2>

        <div>
    {allSongs.map((song) => (
      <div
        key={song.id}
        onClick={() => handlePlaySong(song, song.id)}
        className={`${currentTrackIndex === song.id ? "border-lime-500 bg-gray-700 shadow-lg shadow-lime-500/20" : "bg-gray-800"} relative mt-1 cursor-pointer rounded-md border border-gray-700 p-1.5 leading-tight transition-transform duration-200 hover:scale-105 hover:border-lime-500 hover:shadow-lg hover:shadow-lime-500/20`}
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
    ))}
  </div>
</div>
  );
};