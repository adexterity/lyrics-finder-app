/* import React, {Component} from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer=(state, action)=>{
   switch(action.type){
    case "SEARCH_TRACKS" :
    return {
        ...state,
        track_list: action.payload,
        heading: 'Search Results'
    };
    default:
        return state;
   } 
};

export class Provider extends Component{

    state={
        tracks_list:[],
        heading: 'Top 10 Featured Songs',
        dispatch: action => this.setState(state=> reducer(state, action))
    }

    // async function that get music data from musixMatch api
    fetchData = async ()=>{
        try{const response = await axios.get('https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=dd85c85640d196139fd82e7e22b5064a');

        const data = await response.data.message.body.track_list;
        this.setState({tracks_list: data});
        
    }
        catch(err){
            console.log(err);
        }
    }

    
    // musixMatch api key: dd85c85640d196139fd82e7e22b5064a

    componentDidMount(){
        // sending request with then handler
        //  axios.get(`https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=dd85c85640d196139fd82e7e22b5064a`)
        // .then(res=> console.log(res.data))
        // .catch(err=> console.log(err.message))
    
       this.fetchData();
       
    }
    
    
    render(){
    return(
        <Context.Provider value={this.state}>
            {this.props.children};
        </Context.Provider>
    )
}
}

export const Consumer = Context.Consumer;
 */



import React, { useEffect, useReducer } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'SEARCH_TRACKS':
      return {
        ...state,
        track_list: action.payload,
        heading: 'Search Results'
      };
    default:
      return state;
  }
};

const initialState = {
  track_list: [],
  heading: 'Top 10 Featured Songs'
};

const Provider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        'https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=dd85c85640d196139fd82e7e22b5064a'
      );

      const data = await response.data.message.body.track_list;
      dispatch({ type: 'SEARCH_TRACKS', payload: data });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Context.Provider value={{ ...state, dispatch }}>
      {props.children}
    </Context.Provider>
  );
};

const Consumer = Context.Consumer;

export { Provider, Consumer };
