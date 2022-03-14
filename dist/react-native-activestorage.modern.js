import e from"react-native-blob-util";import{btoa as t}from"abab";import a,{createContext as r,useContext as s,useState as o,useCallback as n,useMemo as c}from"react";const i=async({path:a})=>{const r=decodeURI(a),s=(await e.fs.hash(r,"md5")).replace(/\r|\n/g,"").replace(/([\da-fA-F]{2}) ?/g,"0x$1 ").replace(/ +$/,"").split(" ").map(e=>parseInt(e)),o=String.fromCharCode(...s);return t(o)};function l(){return(l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r])}return e}).apply(this,arguments)}var d;!function(e){e.success="success",e.uploading="uploading",e.error="error",e.waiting="waiting",e.canceled="canceled"}(d||(d={}));let u=0;const p=({directUploadsUrl:t,file:a,headers:r,onStatusChange:s})=>{const o=++u;let n,c=!1;const p=()=>{n&&(c=!0,n.cancel())},h=e=>{s(l({},e,{id:o,cancel:p,file:a}))};return h({status:d.waiting}),new Promise(async s=>{try{const o=await(async({directUploadsUrl:e,file:t,headers:a={}})=>{const r=await i({path:t.path});if(!r)throw new Error(`Failed to get file checksum. Path: ${t.path}`);const s={filename:t.name,content_type:t.type||"image/jpeg",byte_size:t.size,checksum:r};return t.metadata&&(s.metadata=t.metadata),(await fetch(e,{method:"POST",body:JSON.stringify({blob:s}),headers:l({"Content-Type":"application/json"},a)})).json()})({directUploadsUrl:t,file:a,headers:r}),u=e.wrap(a.path);n=e.fetch("PUT",o.direct_upload.url,o.direct_upload.headers,u),n.uploadProgress({interval:250},(e,t)=>{h({status:d.uploading,progress:e/t*100,totalBytes:t,uploadedBytes:e})}).then(e=>{const t=e.info().status;h(t>=200&&t<400?{status:d.success,blobData:o}:{status:d.error,error:new Error("Response not success")}),s(o)}).catch(e=>{h(c?{status:d.canceled}:{status:d.error,error:e}),s()})}catch(e){return h({status:d.error,error:e}),s()}})},h=r({host:"http://localhost:3000",mountPath:"/rails/active_storage",headers:{}}),{Provider:g}=h,m=({host:e,mountPath:t,headers:r,children:s})=>a.createElement(g,{value:{host:e,mountPath:t,headers:r}},s),f=({onSuccess:e,onError:t}={})=>{const{directUploadsUrl:a,headers:r}=(()=>{const e=s(h),t=e.mountPath||"/rails/active_storage";return l({},e,{mountPath:t,directUploadsUrl:`${e.host}${t}/direct_uploads`})})(),[i,u]=o([]),g=n(e=>{u(t=>((e,t,a="id")=>{const r=[...e],s=r.findIndex(e=>e[a]===t[a]);return s>=0?r[s]=t:r.push(t),r})(t,e))},[]),m=n(async s=>{const o=(await Promise.all(s.map(e=>p({file:e,directUploadsUrl:a,headers:r,onStatusChange:g}).then(e=>e&&e.signed_id)))).filter(e=>!!e);return o.length>0&&e&&e({signedIds:o}),s.length>o.length&&t&&t(),{signedIds:o}},[g,e,t]),f=c(()=>i.some(e=>e.status===d.uploading),[i]),U=c(()=>i.filter(e=>e.status===d.success),[i]);return{upload:m,uploads:i,isUploading:f,successfulUploads:U,resetUploads:()=>u([]),removeUpload:e=>u(i.filter(t=>t.id!==e))}},U=({children:e,onSuccess:t})=>e(f({onSuccess:t}));export{m as ActiveStorageProvider,U as DirectUpload,d as DirectUploadResultStatus,i as checksum,p as directUpload,f as useDirectUpload};
//# sourceMappingURL=react-native-activestorage.modern.js.map
