import React from 'react';
import {Link} from 'react-router-dom';

const Track = (props) => {
    
    const {track} = props;
    
    
    return (
    
        //music card
        <div className="w-[400px] rounded-[10px] border border-white border-opacity-20 bg-white bg-opacity-5 hover:bg-opacity-25 shadow-lg ring-2 ring-indigo-900 ring-opacity-10 backdrop-blur-[100px]">
            <div className="px-6 py-4">
                <h4 className="font-bold text-xl mb-2 text-white"><i className="fa-solid fa-music"></i> {track.artist_name}</h4>
                <p className="text-white"><i className="fa-regular fa-circle-play"></i> Track: {track.track_name}</p>
                <p className="text-white"><i className="fa-solid fa-circle-stop"></i> Album: {track.album_name}</p>
                
                
                <Link to={`/lyrics/track/${track.track_id}`} className="btn"> <i className="fas fa-arrow-circle-right"></i> Show Lyric</Link>
            </div>
        </div>
       
  )
}

export default Track;
