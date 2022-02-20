/* Module for making calls to /profiles/ endpoints in Viuteca API */
import {API_URL} from '../config/config'
import axios from "axios"

const PATH = API_URL + '/profiles/';

export const getProfile = async (profileId) => new Promise((resolve, reject) => {
    if (!profileId) {
        reject('Profile id parameter is null');
    }
    const path = PATH + profileId;
    console.log('getprofile', profileId, '@', path);
    axios.get(path).then(
        (response) => {
            const profile = response.data;
            console.log('result inside getprofile:', profile);
            resolve(profile);
        },
        (error) => {
            console.error('VIUTECA: ', error);
            reject(error);
        }
    );
})



