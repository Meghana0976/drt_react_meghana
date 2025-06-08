export interface Satellite {
  noradCatId: string;
  intlDes: string;
  name: string;
  launchDate: string;
  decayDate: string | null;
  objectType: string;
  launchSiteCode: string;
  countryCode: string;
  orbitCode: string;
}
