import { fetch } from 'wix-fetch';
import { Buffer } from 'buffer'
import { getSecret } from 'wix-secrets-backend'


export async function svg2png(svgUrl, fileName) {
const secret = await getSecret("convertApi2");
// const token = '373293219' 
const token = '915171789'
// let convertapi = "https://v2.convertapi.com/convert/svg/to/png?Secret="+secret+"&Token="+token+"&ImageResolution=800&ScaleImage=true&ImageHeight=500&ImageWidth=500&ImageInterpolation=true&ImageQuality=100"
let convertapi = `https://v2.convertapi.com/convert/svg/to/png?Secret=${secret}&Token=${token}&FileName=Avatar&ImageResolution=800&ImageInterpolation=true&ImageQuality=100`
    let pngParams = {

        "Parameters": [{
                "Name": "File",
                "FileValue": {
                    "Url": svgUrl
                }
            },
            {
                "Name": "FileName",
                "Value": fileName
            },
            {
                "Name": "ImageResolution",
                "Value": "800"
            },
            {
                "Name": "ImageInterpolation",
                "Value": true
            },
            {
                "Name": "ImageQuality",
                "Value": "100"
            }
        ]

    }
    const response = await
    fetch(convertapi, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pngParams)
    })
    let r = await response.json()
    let fileData = await r.Files[0].FileData
    let png = Buffer.from(fileData, "base64")
    return png
}