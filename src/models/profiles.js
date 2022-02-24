/* Module for making requests to /profiles/ endpoints in Viuteca API */
import {API_URL} from '../config/config'
import axios from "axios"

const PATH = API_URL + '/profiles/';

export const getProfile = async (profileId) => new Promise((resolve, reject) => {
    if (!profileId) {
        reject('Profile id parameter is null');
    }
    const path = PATH + profileId;

    axios.get(path).then(
        (response) => {
            const profile = response.data;
            resolve(profile);
        },
        (error) => {
            console.error('VIUTECA: ', error);
            reject("El perfil especificado no existe :(");
        }
    );
})


export const updateProfile = async (profileData) => new Promise((resolve, reject) => {
    const {id, name, description, ig, fb, tags} = profileData;
    
    if (!id) {
        reject('Profile id parameter is null');
    }


    let newData = {
        name: name.trim(),
        description: description?.trim() || null,
        fb: fb?.trim() || null,
        ig: ig?.trim() || null,
    }

    console.log("sending new data to firebase", newData);

    const path = PATH + id;

    axios.put(path, newData).then(
        (response) => {
            console.log('update API returned', response)
            resolve('Se actualizó el perfil exitosamente');
        },
        (error) => {
            console.error('VIUTECA: ', error);
            reject(`Error actualizando perfil: ${id} :(`);
        }
    );

    // TODO: UPDATE TAGS
})



