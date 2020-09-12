            //Must study categories attribute in discover feature of geocoding and searching 


const geocoderSearch = ()=>{
    let geocodeParam = {
        //qq : 'street:pintopark;city:Gwalior;country:India'
        q :'pinto park',
        in : 'countryCode:IND',
        limit : 5
    }

    geocoder.geocode(geocodeParam,onResult=>{
        console.log(onResult)
    },alert)
}

//Discover geocoding and search
let geocodeParam = {
    //qq : 'street:pintopark;city:Gwalior;country:India'
    q :'hospital',
    //at : ''+myPosition.lat+','+myPosition.lng  //for finding markets or anythings near given coordinates
    in : 'circle:'+myPosition.lat+','+myPosition.lng+';r=104349' // for finding markets inside a corcle of radius 5km around my coordinates
}

geocoder.discover(geocodeParam,results=>{
    console.log(results)
    results.items.forEach(items => {
        ui.addBubble(new H.ui.InfoBubble(items.position,{
            content : 'distance:'+items.distance+' meters'
        }))
    }) 
},alert)

//Autosuggest geocoding
let geocodeParam = {
    //qq : 'street:pintopark;city:Gwalior;country:India'
    q :'super',
    at : ''+myPosition.lat+','+myPosition.lng  //for finding markets or anythings near given coordinates
    //in : 'circle:'+myPosition.lat+','+myPosition.lng+';r=104349' // for finding markets inside a corcle of radius 5km around my coordinates
}

geocoder.autosuggest(geocodeParam,results=>{console.log(results)},alert)

