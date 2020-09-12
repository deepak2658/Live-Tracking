const jsZip = require('jszip')
const fs = require('fs')
const zip = new jsZip()
var FormData = require('form-data')
const { join } = require('path')
const axios = require('axios').default


exports.receivingGeofence = (shape)=>{
    // console.log(shape)
    const fileData = "NAME"+"\t"+"wkt"+"\n"+"userfence"+"\t"+shape;
    
    zip.generateAsync({type: "nodebuffer"}).then(content=>{
        var formdata = new FormData()
        formdata.append('zipfile', content);
        console.log(formdata)
        axios.post("https://fleet.ls.hereapi.com/2/layers/upload.json",content,{
            headers : {
                "content-type": "multipart/form-data"
            },
            params:{
                "layer_id": "2312",
                "apiKey": "T3yTioLVefx-_WWQIRBpnIdDjvd0fGTNfxTO64nmBee"
            }
        }).then(result=>{
            //console.log(result)
        }).catch(err=>console.log(err))
    }).catch(err=>{console.log(err)})    
}

// curl
//         --request
//         -i -X POST -H "Content-Type: multipart/form-data"-F "zipfile=@C:\temp\layer_4711_shapes.zip" "https://fleet.ls.hereapi.com /2/layers/upload.json ?layer_id=4711 &apiKey=HpRr_ULw6rTc1ebsmyUSHxy7oEQApEQTMeK1tN6OiW8"

// zip.file("data.wkt",fileData)
    // console.log(fileData)
    // zip.generateAsync({type:'nodebuffer',streamFiles:true}).then(res=>console.log(res))
    // zip.generateNodeStream({type:'nodebuffer',streamFiles:true})
    // .pipe(fs.createWriteStream('out.zip')).once('close',res=>{
    //     console.log(res)
    // }).on('ready',()=> {
    // // JSZip generates a readable stream with a "end" event,
    // // but is piped here in a writable stream which emits a "finish" event.
    //     console.log("out.zip written.")
    // });
    // zip.generateNodeStream({type:"nodebuffer",streamFiles:true}).then