const { JSDOM } = require('jsdom')

function getURLsFromHTML(htmlBody, baseUrl){
  const urls = [];
  const dom = new JSDOM(htmlBody);

  const linkElements = dom.window.document.querySelectorAll("a");
  for(const link of linkElements){
    if (link.href.length > 0 ) {
      let URLobj;
      try{
        if(link.href.startsWith('http') || link.href.startsWith('https')) URLobj = new URL(link.href);
        else URLobj = new URL(link.href, baseUrl);
      } catch (err) {
        console.log(`error: ${err.message}`);
      }
      URLobj = URLobj.hostname + URLobj.pathname;
      if(URLobj.length > 0 && URLobj.endsWith('/')){
        URLobj = URLobj.slice(0, -1);
      }
      if(URLobj.startsWith('/')){
        const baseURLobj = new URL(baseUrl);
        URLobj = baseURLobj.hostname + URLobj;
      }
      urls.push(URLobj);
    }

  }

  console.log("urls: ", urls);
  return urls;
}

function normalizeURL(urlString){
    const url = new URL(urlString);
    let urlObj = url.hostname + url.pathname;

    if(urlObj.length > 0 && urlObj.endsWith('/')){
        urlObj = urlObj.slice(0, -1);
    }

    return urlObj;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML
}