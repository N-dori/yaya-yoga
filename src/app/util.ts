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
