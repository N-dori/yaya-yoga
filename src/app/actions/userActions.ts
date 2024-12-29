import { Tuser } from "../types/types"
import { getUrl } from "../utils/util"

export const createUser = async (user: {name:string, email:string, password?:string,isAdmin:boolean}) => {
    const url = getUrl('auth/registration/')


    const res = await fetch(url, {

        method: 'POST',
        headers: { "Content-type": "appliction/json" },
        body: JSON.stringify(user.password?{ name:user.name, email:user.email, password:user.password, isAdmin:user.isAdmin}
                                    : {name:user.name, email:user.email, isAdmin:user.isAdmin}
        )

      },)
  if (res.ok) {
    return res.json()

  } else {
    throw new Error('faild to create user')

  }
}