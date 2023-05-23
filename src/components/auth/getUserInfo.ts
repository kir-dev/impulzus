import axios from 'axios'
import { Profile } from 'next-auth'

/*export class OAuthUser {
  @IsNotEmpty()
  displayName: string

  @IsNotEmpty()
  givenName: string

  @IsUUID('all')
  internal_id: string

  @IsEmail()
  mail: string

  constructor(partial: Partial<OAuthUser>) {
    Object.assign(this, partial)
  }
}*/

export async function getUserInfo(accessToken: string) {
  return (await axios.get<Profile>('https://auth.sch.bme.hu/api/profile?access_token=' + accessToken)).data
}
