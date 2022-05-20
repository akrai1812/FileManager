let folderPath = process.argv[2];  //taking input
// console.log(folderPath);
let fs = require("fs");
let path = require("path");
//asumptions:
//1.no folder inside the folder to be organised  //to organise folders inside a folder we wiil need recursion
//now we need to read the folder
//if folderpath is correct we will read the folder , if the path is incorrect , 
//we will console "please give correct path"
let folderExists = fs.existsSync(folderPath);
let extensions = {
    Audio:[".mp3"],
    Video:[".mp4",".mkv"],
    Document:[".doc",".xlsx",".pdf",".txt"],
    Image:[".jpeg",".jpg",".png",".gif"],
    Software:[".exe"]
}

if(folderExists){
    //path is valid
    let files = fs.readdirSync(folderPath);
    //now we want extension of each file
    for(let i=0;i<files.length;i++){
        let ext = path.extname(files[i]);
        let nameOfFolder = giveFolderName(ext);
        // console.log("Ext--",ext,"Folder--",nameOfFolder);
        let pathOfFolder = path.join(folderPath,nameOfFolder); //here we create path of folder to keep files after reconising its type
        let exists = fs.existsSync(pathOfFolder);  //we check if that folder already exists
        if(exists){  //if it exists already
            moveFile(folderPath,pathOfFolder,files[i]);  //we directly move the file into that folder using movefile function
        }else{  //if does not exists , we will create a folder
            fs.mkdirSync(pathOfFolder);
            moveFile(folderPath,pathOfFolder,files[i]); //then we move file
        }
    }
    console.log(files);
}else{
    //path is invalid
    console.log("Please Enter a Valid Path");
}
//Now we want to differentiate file based on its extension name
//We can do this by making object 
//we have made an object named extensions above
//we will make a function which will give us a function name when we give extension name to that function
function giveFolderName(ext){
    for(let key in extensions){  //for loop to iterate over all the keys in the object extensions
        let extArr = extensions[key];  
        for(let i=0;i<extArr.length;i++){   //for loop to iterate over the array infront of eacg key 
            if(extArr[i]==ext){   //if any element of array is equale to the ext then it will enter this if statement
                return key; //and return the key that is the name of folder that is audio video document etc etc
            }
        }
    }
    return 'others';  //if some other ext we get other than the ones in extensions
}
//the folder name our function returned 

function moveFile(folderPath,pathOfFolder,fileName){
    let sourcePath = path.join(folderPath,fileName);  //creating source path
    let destPath = path.join(pathOfFolder,fileName); //creating destination path
    fs.copyFileSync(sourcePath,destPath);  //copying the file 
    fs.unlinkSync(sourcePath);  //deleting file from source
}