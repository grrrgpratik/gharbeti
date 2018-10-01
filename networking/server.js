import uuid from 'uuid';
import firebase from '../firebase';
import PickImage from '../components/PickImage';


async function addNewRoom( params ) {
   
    try {
        let response = await fetch("https://gharbeti-4f308.firebaseio.com/rooms", {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            body: JSON.stringify(params)
        });
        let responseJson = await response.json();
        return responseJson.result; 
    } catch (error) {
        console.error(`Error is : ${error}`);
    }
}

export { addNewRoom };
