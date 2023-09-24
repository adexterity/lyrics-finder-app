import React,{useEffect, useState}  from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Spinner from '../layout/Spinner';
// import Moment from 'react-moment';

const Lyrics = () => {

    const[track, setTrack] = useState({});
    const[lyrics, setLyrics] = useState("");
    const {id} = useParams();

useEffect(()=>{
    
    const fetchLyrics = async ()=>{
        try{
            //request for lyrics in musixmatch
            const request =await axios.get(`https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${id}&apikey=dd85c85640d196139fd82e7e22b5064a`);
            const data = await request.data.message.body.lyrics.lyrics_body;
            // console.log(request.data.message.body.lyrics.lyrics_body);
            setLyrics(data);

            //request for track details in musixmatch
            const request2 = await axios.get(`https://api.musixmatch.com/ws/1.1/track.get?track_id=${id}&apikey=dd85c85640d196139fd82e7e22b5064a`);
            const data2 = await request2.data.message.body.track;
            setTrack(data2);
            
        }
        catch(err){
            console.log(err)
        }
    }
    fetchLyrics();
 }, [id]);

useEffect(()=>{
console.log(track);
console.log(lyrics);

},[lyrics, track]);

const data = ()=>{
    if(track === undefined || lyrics === "" || Object.keys(track).length === 0){
        return <Spi nner />
    }else{
        return (
            <>
                <div className='p-2 mb-4 bg-[#fff] bg-opacity-20'>
                    <h2><span className='text-xl font-bold'>{track.track_name}</span> by <span className='text-xl font-bold'>{track.artist_name}</span></h2>
                </div>
                <p className='card-body'>{lyrics}</p>
                <ul className='my-6'>
                    <li><span className='font-bold'>Rating : </span>{track.track_rating}</li>
                    <li><span className='font-bold'>Album ID : </span>{track.album_id}</li>
                    <li><span className='font-bold'>Explicit Content : </span>{track.explicit === 0 ? 'No' : 'Yes'}</li>
                    <li><span className='font-bold'>Genre : </span>{track.primary_genres.music_genre_list.length !== 0 ? track.primary_genres.music_genre_list[0].music_genre.music_genre_name : "uncategorize" }</li>
                    {/* <li><span className='font-bold'>Updated Time : </span> <Moment format='DD-MM-YYYY'>{track.updated_time}</Moment></li> */}
                </ul>
                <Link to='/' className='btn'><i className="fas fa-arrow-left"></i> Back
                </Link>
            </>
        )
    }
}


  return (
    <div className='px-[10px]'>
        {data()}
        
    </div>
  )
}

export default Lyrics;
