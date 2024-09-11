export function makeId(length = 6) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var txt = ''
    for (var i = 0; i < length; i++) {
      txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
  }

    export const stripTime = (date: Date | string): Date => {
      const d = new Date(date);
      const strippedDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      return strippedDate;
    };
    export const getUrl = (endPoint: string) => {

      const baseUrl = process.env.NODE_ENV === 'development' ? 
      process.env.NEXT_PUBLIC_DEV_URL : process.env.NEXT_PUBLIC_PRUD_URL 

      if(endPoint === "")return baseUrl

      const url = `${baseUrl}/api/${endPoint}`;
      // console.log(`Constructed URL: ${url}`);
      return url;
  };

  export  const getUserByEmail = async (email: String) => {
    const url = getUrl('auth/userExists/')

    const res = await fetch(url, {

      method: 'POST',
      headers: { "Content-type": "appliction/json" },
      body: JSON.stringify({ email })
    })
    const  miniUser = await res.json()
    // console.log(' userExists', miniUser);

    return miniUser
  }