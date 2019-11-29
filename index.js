var fs = require ('fs');
var config = require ('./Config.json');

//Reading input file info from Config
var inputFilePath = config.inputFilePath;

//Reading data from json file and assigning it to array variable
var promise =  new Promise((resolve,reject)=>
{
   fs.readFile(inputFilePath,'utf8',(err,data)=>
   {
    resolve(data);
    reject(err);
   })
    
} )
.then(value=>{
    var jsonData =[];
    jsonData= JSON.parse(value);
    console.log("[");
    extractJSON(jsonData); //passing data to function
    console.log("]");
})
.catch(err=>{
    console.log(err);
})

//Function to looping through nested array objects
function extractJSON(obj)
{

    for(const i in obj)
    {
        if(Array.isArray(obj[i]) || typeof obj[i]==='object') // only header - no value
        {
                        extractJSON(obj[i]);
        }
        else
        {

           if(i.toLowerCase()==='question')
           console.log(`{module.section.cards.items.[${obj[i]}]}`);
        }
    }
}
