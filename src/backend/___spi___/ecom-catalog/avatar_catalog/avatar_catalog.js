import wixData from 'wix-data';

function parseImageUrl(originalUrl) {
	const afterV1 =  originalUrl.split('v1/')[1].split('/')
	const id = afterV1[0]
	const fileName = afterV1[1].split('#')[0]
	const width = originalUrl.split('originWidth=')[1].split('&')[0]
	const height = originalUrl.split('originHeight=')[1]
    return {    
                id,
                width,
                height, 
                fileName
            }
}

async function createCatalogItem(itemInformation) {
   const dbResults = await wixData.query('@dali254/avatars-catalog/avatars_catalog')
   .eq('email', itemInformation.options.options.email)
   .find()
    console.log(`found dbResults: ${JSON.stringify(dbResults)}`)
   const currentData = dbResults.items[0]
   const media =  parseImageUrl(currentData.image);

    const item =  {
        catalogReference: {
            appId: '43a876b9-bc53-4a45-84b6-0d09a8a98cc8',
            catalogItemId: itemInformation.catalogItemId,
            options: itemInformation.options
        },
        data: {
            productName: {
                original: "custom Image r",
                translated: "custom Image"
            },
            itemType: {
                preset: 'DIGITAL'
            },
            media: currentData.image,
            price: `0`,
            paymentOption: 'FULL_PAYMENT_ONLINE',
            quantityAvailable: 1,
            digitalFile: {
                _id: media.id,
                fileName: media.fileName,
                fileType: "SECURE_PICTURE"
            }

        }
    };
    return item;
}

export const getCatalogItems = async (options) => {
    console.log(`getCatalog called with options: ${JSON.stringify(options)}`)

    const { catalogReferences } = options;
    const itemsInformation = catalogReferences.map(({ catalogReference }) => {
        const { catalogItemId, options } = catalogReference;
        return { catalogItemId, options };
    });
    const catalogItem = await createCatalogItem(itemsInformation[0])
    console.log(`returning catalog item: ${JSON.stringify(catalogItem)}`)
    const response = {
        catalogItems: [catalogItem]
    };
    return response;
}

/** Retrieves specified item data from a specified catalog. */
export const queryCatalogItems = async (options) => {};