/* Module for making calls to /tags/ endpoints in Viuteca API */
import {API_URL} from '../config/config'
import axios from "axios"

const PATH = API_URL + '/tags/';

export const getProfileTags = (profileId) => {
    if (!profileId) {
        throw 'Profile id parameter is null';
    }

    const path = PATH + profileId;

    axios.get(path).then(
        (response) => {
            const tags = response.data;
            console.log(tags);
            return tags;
        },
        (error) => {
            console.error('VIUTECA: ', error);
            return null; 
        }
    );
    return null;
}
