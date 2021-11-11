import t from"rn-fetch-blob";import{btoa as e}from"abab";import r,{createContext as s,useContext as a,useState as o,useCallback as n,useMemo as c}from"react";const i=async({path:r})=>{const s=(await t.fs.hash(r,"md5")).replace(/\r|\n/g,"").replace(/([\da-fA-F]{2}) ?/g,"0x$1 ").replace(/ +$/,"").split(" ").map(t=>parseInt(t)),a=String.fromCharCode(...s);return e(a)};function l(){return(l=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var s in r)Object.prototype.hasOwnProperty.call(r,s)&&(t[s]=r[s])}return t}).apply(this,arguments)}let d=0;const h=({directUploadsUrl:e,file:r,headers:s,onStatusChange:a})=>{const o=++d;let n,c=!1;const h=()=>{n&&(c=!0,n.cancel())},p=t=>{a(l({},t,{id:o,cancel:h,file:r}))};return p({status:"waiting"}),new Promise(async a=>{try{const o=await(async({directUploadsUrl:t,file:e,headers:r={}})=>{const s=await i({path:e.path});if(!s)throw new Error(`Failed to get file checksum. Path: ${e.path}`);const a={filename:e.name,content_type:e.type||"image/jpeg",byte_size:e.size,checksum:s};return e.metadata&&(a.metadata=e.metadata),(await fetch(t,{method:"POST",body:JSON.stringify({blob:a}),headers:l({"Content-Type":"application/json"},r)})).json()})({directUploadsUrl:e,file:r,headers:s}),{url:d,headers:h}=o.direct_upload,u=t.wrap(r.path);n=t.fetch("PUT",d,h,u),n.uploadProgress({interval:250},(t,e)=>{p({status:"uploading",progress:t/e*100,totalBytes:e,uploadedBytes:t})}).then(t=>{const e=t.info().status;p(e>=200&&e<400?{status:"success",signed_id:o.signed_id}:{status:"error",error:new Error("Response not success")}),a(o.signed_id)}).catch(t=>{p(c?{status:"canceled"}:{status:"error",error:t}),a()})}catch(t){return p({status:"error",error:t}),a()}})},p=s({host:"http://localhost:3000",mountPath:"/rails/active_storage",headers:{}}),{Provider:u}=p,m=({host:t,mountPath:e,headers:s,children:a})=>r.createElement(u,{value:{host:t,mountPath:e,headers:s}},a),f=({onSuccess:t,onError:e}={})=>{const{directUploadsUrl:r,headers:s}=(()=>{const t=a(p),e=t.mountPath||"/rails/active_storage";return l({},t,{mountPath:e,directUploadsUrl:`${t.host}${e}/direct_uploads`})})(),[i,d]=o([]),u=n(t=>{d(e=>((t,e,r="id")=>{const s=[...t],a=s.findIndex(t=>t[r]===e[r]);return a>=0?s[a]=e:s.push(e),s})(e,t))},[]),m=n(async a=>{const o=(await Promise.all(a.map(t=>h({file:t,directUploadsUrl:r,headers:s,onStatusChange:u})))).filter(t=>!!t);return o.length>0&&t&&t({signedIds:o}),a.length>o.length&&e&&e(),{signedIds:o}},[u,t,e]),f=c(()=>i.some(t=>"uploading"===t.status),[i]),g=c(()=>i.filter(t=>"success"===t.status),[i]);return{upload:m,uploads:i,isUploading:f,successfulUploads:g,resetUploads:()=>d([]),removeUpload:t=>d(i.filter(e=>e.id!==t))}},g=({children:t,onSuccess:e})=>t(f({onSuccess:e}));export{m as ActiveStorageProvider,g as DirectUpload,i as checksum,h as directUpload,f as useDirectUpload};
//# sourceMappingURL=react-native-activestorage.modern.js.map
