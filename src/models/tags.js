/* Module for making requests to /tags/ endpoints in Viuteca API */
import {API_URL} from '../config/config'
import axios from "axios"

const PATH = API_URL + '/tags/';

export const getProfileTags = (profileId) => new Promise((resolve, reject) => {
    if (!profileId) {
        reject('Profile id parameter is null');
    }
    const path = PATH + profileId;

    axios.get(path).then(
        (response) => {
            const tags = response.data;
            resolve(tags);
        },
        (error) => {
            console.error('VIUTECA: ', error);
            reject(error);
        }
    );
});
