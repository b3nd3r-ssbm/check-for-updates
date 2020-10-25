const https = require('https');
const fs = require('fs');

let i=0;
const package=JSON.parse(fs.readFileSync('package.json'));
let author=package.author;
let name=package.name;

const options={
  headers: {
    'User-Agent': 'check-for-updates'
  }
}
exports.check = function() {
  return check;
}

let check = new Promise((resolve,reject) => {
  let url="https://api.github.com/repos/"+author+"/"+name+"/releases/latest";
  https.get(url, options,(res) => {
    let body = "";
    res.on("data", (chunk) => {
      body += chunk;
    });
    res.on("end", () => {
      let returnVal = checkLogic(JSON.parse(body));
      resolve(returnVal);
    });
    }).on("error", (error) => {
      console.error(error.message);
  });
});

function checkLogic(json) {
  let newTag = tagInt(json["tag_name"]);
  let oldTag = tagInt("v"+package.version);
  let retJson={};
  if(newTag[0] > oldTag[0]) {
    retJson.isNew = true;
  }
  else if(newTag[0] == oldTag[0]){
    if(newTag[1] > oldTag[1]) {
      retJson.isNew = true;
	}
	else if(newTag[1] == oldTag[1]) {
      if(newTag[2] > oldTag[2]) {
        retJson.isNew = true;
	  }
	  else {
        retJson.isNew = false;
      }
	}
    else {
      retJson.isNew = false;
    }
  }
  else {
    retJson.isNew = false;
  }
  if(retJson.isNew) {
    if(json.draft || json.prerelease) {
      retJson.isNew = false;
	}
  }
  retJson.url = json["html_url"];
  return retJson;
}

function tagInt(tagName) {
  let majorStr = tagName.substring(tagName.indexOf("v")+1,tagName.indexOf("."));
  major = parseInt(majorStr);
  tagName = tagName.substring(tagName.indexOf("v"+majorStr)+majorStr.length+2);
  let minorStr=tagName.substring(tagName.indexOf("."));
  let minor = parseInt(minorStr);
  tagName = tagName.substring(tagName.indexOf("."));
  let patchStr = tagName.substring(0,tagName.indexOf("."));
  let patch = parseInt(patchStr);
  return [major,minor,patch];
}