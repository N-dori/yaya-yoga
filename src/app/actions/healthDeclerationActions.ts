import { getUrl } from "../utils/util"

export const S3Upload = async (formData:FormData ) => {
    const url = getUrl('s3/uploadPdf')
                const res = await fetch(url, {
                    method: 'POST',
                    body: formData
                })
                if (!res.ok) {
                    return false
                }
                return true
}

export const updateUserHealthDeclaration = async (userId:string) => {

    const url = getUrl('user/updateHealthDeclration')
    let healthDeclaration = `https://yayayoga.s3.eu-north-1.amazonaws.com/Health_Declerations/${userId}.pdf`
    const res = await fetch(url, {
        method: 'PUT',
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ _id: userId, healthDeclaration })
    })
    if (!res.ok) {
        return false
    }
    return true
}