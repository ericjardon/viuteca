/* Module for making requests to /tags/ endpoints in Viuteca API */
import {API_URL_DEV} from '../config/config'
import axios from "axios"

const PATH = API_URL_DEV + '/tags/';

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
