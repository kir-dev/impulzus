import axios from 'axios'
import { Profile } from 'next-auth'

export async function getUserInfo(accessToken: string) {
  return (await axios.get<Profile>('https://auth.sch.bme.hu/api/profile?access_token=' + accessToken)).data
}
