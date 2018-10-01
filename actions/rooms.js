import firebase from '../firebase';
// import reverseGeocode from 'latlng-to-zip'; 
// import qs from 'qs';

import{
    SET_ROOMS
} from './types';

// const ROOM_QUERY_PARAMS = {
//     format : 'json',
//     v: '2',
//     radius: 10,
//     latlong: 1,
//     q: 'javascript'
// }

// const buildRoomsUrl = zip => {
//     const query = qs.stringify ({...ROOM_QUERY_PARAMS, l:zip});
//     return `${JOB_ROOT_URL}${query}`;
// }


// export const fetchRooms = (region) => async(dispatch) =>  {
//     try {
//     let zip = await reverseGeocode(region);
//     const url = buildRoomsUrl(zip);
//     let { data } = await axios.get(url);
//     dispatch({ type: FETCH_JOBS, payload: data });

//     }
//     catch(e) {
//         console.error(e);
//     }

// };

export const fetchRooms = () => async(dispatch) => {
        fetch("https://gharbeti-4f308.firebaseio.com/rooms.json")
        .catch(err => {
            alert("Something went wrong, sorry :/");
            console.log(err);
        })
        .then(res => res.json())
        .then(parsedRes => {
            const data = [];
            for (let key in parsedRes) {
                data.push({ 
                    ...parsedRes[key],
                    image: {
                        uri: parsedRes[key].image
                    },
                    key: key
                });
            }
            // console.log(data);
            dispatch(setRooms(data));
        });
    };


    export const setRooms = rooms =>{
        return {
            type: SET_ROOMS,
            payload: rooms
        }
    }