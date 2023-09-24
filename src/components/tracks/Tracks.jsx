import React from 'react';
import {Consumer} from '../../Context';
import Track from './Track.jsx';
import Spinner from '../layout/Spinner.jsx';

const Tracks = ()=>{


    return(

        <>
                
            <Consumer>
                {(value)=> {
                    const {tracks_list, heading} = value;

                    //check if the track array is empty
                    if(tracks_list === undefined || tracks_list.length === 0){

                        return (
                                <Spinner />  
                        )
                    }else{
                        console.log(tracks_list)
                                
                        return (
                        <>
                            <h2 className='text-xl text-white text-center py-4 '>{heading}</h2>
                            <div className='flex flex-wrap justify-center max-w-100% gap-2'>
                                {tracks_list.map(item=>{
                                    return(
                                        <Track key={item.track.track_id} track={item.track} />
                                    )
                                })}
                            </div>
                        </>
                            )
                    }
                    
                    }}
            </Consumer>
        </>
    )
}

export default Tracks;