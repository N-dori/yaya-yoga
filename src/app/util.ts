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
      process.env.DEV_URL : process.env.PRUD_URL 

      if(endPoint === "")return baseUrl
      
      const url = `${baseUrl}/api/${endPoint}`;
      // console.log(`Constructed URL: ${url}`);
      return url;
  };