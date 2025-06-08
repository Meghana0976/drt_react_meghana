import axios from 'axios';
import { Satellite } from '../types/Satellite';

const API_URL = 'https://backend.digantara.dev/v1/satellites';

export const fetchSatellites = async (): Promise<Satellite[]> => {
  const response = await axios.get(API_URL, {
    params: {
      objectTypes: 'ROCKET BODY,DEBRIS',
      attributes:
        'noradCatId,intlDes,name,launchDate,decayDate,objectType,launchSiteCode,countryCode,orbitCode'
    },
    headers: {
      Accept: 'application/json'
    }
  });

  return response.data.data;
}