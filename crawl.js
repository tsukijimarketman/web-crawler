function normalizeURL(urlString){
    const url = new URL(urlString);
    let urlObj = url.hostname + url.pathname;

    if(urlObj.length > 0 && urlObj.endsWith('/')){
        urlObj = urlObj.slice(0, -1);
    }

    return urlObj;
}

module.exports = {
  normalizeURL
}