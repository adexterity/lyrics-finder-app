import React, {useState} from 'react';
import axios from 'axios';
import {Consumer} from '../../Context.jsx';

const Search = () => {
    //
    const [trackTitle, setTrackTitle] = useState({title : ""});

    const findTrack= (dispatch, e)=>{
        // e.preventDefault();

        const fetchData = async ()=>{
        try{
            const response = await axios.get(`https://api.musixmatch.com/ws/1.1/track.search?q_track=${trackTitle.title}&page_size=10&page=1&s_track_rating=desc&apikey=dd85c85640d196139fd82e7e22b5064a`);
            dispatch({
                type: 'SEARCH_TRACKS',
                payload: response.data.message.body.track_list,
            })


            /* const data = await response.data.message.body.track_list;
            const dataArray = await data.map(item => item.track.album_name);
            console.log(dataArray); */
            
        }
            catch(err){
                console.log(err)
            }
        }
        fetchData();

       /*  //send request on the click of button
        const fetchLyrics = async ()=>{
            try{
                //request for lyrics in musixmatch
                const request =await axios.get(`https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${id}&apikey=${process.env.REACT_APP_MM_KEY}`);
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
        } */
    }

  return (
    <Consumer>
        {
            value=>{
                
                const {dispatch} = value;
                return(
                    <div className='border border-white flex flex-col items-center'>
                        <h2 className='text-[30px]'><i className="fas fa-music"></i> Search Your Favourite Song</h2>
                        <form className='relative' onSubmit={findTrack}>
                            <input type="search" name='title' className="search inline-block w-[400px] md:w-[600px] outline-0 rounded-lg border border-white p-2 bg-transparent text-center" placeholder="Enter your search term here" value={trackTitle.title} onChange={(e)=>{ setTrackTitle({[e.target.name] : e.target.value})}} />
                            <button className='absolute top-[5px] right-2'> <i className="fas fa-search search-icon text-[30px]"></i></button>
                        </form>
                    </div>
                )
            }
        }
        
    </Consumer>
  )
}

export default Search;
