(()=>{var e={};e.id=247,e.ids=[247],e.modules={47849:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external")},72934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},55403:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external")},54580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},94749:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external")},45869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},20399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},71017:e=>{"use strict";e.exports=require("path")},57310:e=>{"use strict";e.exports=require("url")},87916:(e,t,a)=>{"use strict";a.r(t),a.d(t,{GlobalError:()=>i.a,__next_app__:()=>m,originalPathname:()=>p,pages:()=>d,routeModule:()=>u,tree:()=>c});var o=a(50482),s=a(69108),r=a(62563),i=a.n(r),n=a(68300),l={};for(let e in n)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>n[e]);a.d(t,l);let c=["",{children:["dashboard",{children:["comments",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(a.bind(a,83277)),"D:\\Projects\\Next-Appliation\\blog-application\\app\\dashboard\\comments\\page.jsx"]}]},{layout:[()=>Promise.resolve().then(a.bind(a,61449)),"D:\\Projects\\Next-Appliation\\blog-application\\app\\dashboard\\comments\\layout.tsx"],loading:[()=>Promise.resolve().then(a.bind(a,3158)),"D:\\Projects\\Next-Appliation\\blog-application\\app\\dashboard\\comments\\loading.js"]}]},{layout:[()=>Promise.resolve().then(a.bind(a,96339)),"D:\\Projects\\Next-Appliation\\blog-application\\app\\dashboard\\layout.tsx"],loading:[()=>Promise.resolve().then(a.bind(a,87466)),"D:\\Projects\\Next-Appliation\\blog-application\\app\\dashboard\\loading.js"],metadata:{icon:[async e=>(await Promise.resolve().then(a.bind(a,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}]},{layout:[()=>Promise.resolve().then(a.bind(a,82917)),"D:\\Projects\\Next-Appliation\\blog-application\\app\\layout.tsx"],loading:[()=>Promise.resolve().then(a.bind(a,65016)),"D:\\Projects\\Next-Appliation\\blog-application\\app\\loading.js"],"not-found":[()=>Promise.resolve().then(a.bind(a,1429)),"D:\\Projects\\Next-Appliation\\blog-application\\app\\not-found.tsx"],metadata:{icon:[async e=>(await Promise.resolve().then(a.bind(a,57481))).default(e)],apple:[],openGraph:[],twitter:[],manifest:void 0}}],d=["D:\\Projects\\Next-Appliation\\blog-application\\app\\dashboard\\comments\\page.jsx"],p="/dashboard/comments/page",m={require:a,loadChunk:()=>Promise.resolve()},u=new o.AppPageRouteModule({definition:{kind:s.x.APP_PAGE,page:"/dashboard/comments/page",pathname:"/dashboard/comments",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},90823:(e,t,a)=>{Promise.resolve().then(a.bind(a,69606))},5342:(e,t,a)=>{Promise.resolve().then(a.t.bind(a,25491,23)),Promise.resolve().then(a.bind(a,69697))},69606:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>n});var o=a(95344),s=a(3729),r=a(8014),i=a(8428);let n=()=>{let[e,t]=(0,s.useState)([]),[a,n]=(0,s.useState)(!1),[l,c]=(0,s.useState)(""),d=r.Z.get("cookie-1"),p=(0,i.useRouter)(),m=(0,s.useCallback)(async()=>{try{let e=await fetch("https://communityblog-api.onrender.com/verifyjwt",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:d})});200===e.status?console.log("User loggedin"):(console.log("You are not eligible to access this route ! Please login first"),p.push("/login"))}catch(e){console.error("Server error autologin failed",e)}},[d,p]),u=(0,s.useCallback)(async()=>{try{let e=await fetch("https://communityblog-api.onrender.com/getuser",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({token:d})}),t=(await e.json()).username.email;c(t)}catch(e){console.log("failed to fetch Email",e)}},[d]),x=(0,s.useCallback)(async()=>{n(!0);try{let e=await fetch("https://communityblog-api.onrender.com/getcomments",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({authorEmail:l})});if(!e.ok)throw Error("Failed to fetch comments");let a=await e.json();t(a)}catch(e){console.error("Failed to fetch comments",e)}},[l]);return(0,s.useEffect)(()=>{m(),u(),x()},[m,u,x]),o.jsx("div",{className:"mr-16 ml-80 mt-20",children:o.jsx("ol",{className:"relative border-s border-gray-200 dark:border-gray-700",children:e.length>0?e.map((e,t)=>(0,o.jsxs)("li",{children:[o.jsx("span",{className:" absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900"}),o.jsx("h2",{className:"pb-7 pl-6  cursor-pointer text-yellow-400 hover:text-blue-500",children:e.query[0].query}),o.jsx("ul",{children:e.descriptions.map((e,t)=>o.jsx("li",{className:"mb-8 ms-6",children:(0,o.jsxs)("div",{className:"items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600",children:[o.jsx("time",{className:"mb-1 text-xs font-normal text-lime-500 sm:order-last sm:mb-0",children:e.timestamp}),o.jsx("div",{className:"text-sm font-normal text-gray-500 dark:text-gray-300",children:e.description})]})},t))})]},t)):o.jsx("h1",{className:"font-extrabold text-center",children:"No comments posted"})})})}},61449:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>n});var o=a(25036),s=a(23222);a(97001);var r=a(44725),i=a.n(r);function n({children:e}){return(0,o.jsxs)(o.Fragment,{children:[o.jsx(i(),{}),o.jsx(s.Ix,{}),e]})}},3158:(e,t,a)=>{"use strict";a.r(t),a.d(t,{default:()=>s});var o=a(25036);a(40002);let s=()=>o.jsx("div",{className:"flex items-center justify-center h-screen",children:(0,o.jsxs)("div",{className:"flex items-center justify-center space-x-2",children:[o.jsx("div",{className:"w-4 h-4 rounded-full animate-pulse dark:bg-violet-400"}),o.jsx("div",{className:"w-4 h-4 rounded-full animate-pulse dark:bg-violet-400"}),o.jsx("div",{className:"w-4 h-4 rounded-full animate-pulse dark:bg-violet-400"})]})})},83277:(e,t,a)=>{"use strict";a.r(t),a.d(t,{$$typeof:()=>r,__esModule:()=>s,default:()=>i});let o=(0,a(86843).createProxy)(String.raw`D:\Projects\Next-Appliation\blog-application\app\dashboard\comments\page.jsx`),{__esModule:s,$$typeof:r}=o,i=o.default},97001:()=>{},23222:(e,t,a)=>{"use strict";a.d(t,{Ix:()=>n});var o=a(86843);let s=(0,o.createProxy)(String.raw`D:\Projects\Next-Appliation\blog-application\node_modules\react-toastify\dist\react-toastify.esm.mjs`),{__esModule:r,$$typeof:i}=s;s.default,(0,o.createProxy)(String.raw`D:\Projects\Next-Appliation\blog-application\node_modules\react-toastify\dist\react-toastify.esm.mjs#Bounce`),(0,o.createProxy)(String.raw`D:\Projects\Next-Appliation\blog-application\node_modules\react-toastify\dist\react-toastify.esm.mjs#Flip`),(0,o.createProxy)(String.raw`D:\Projects\Next-Appliation\blog-application\node_modules\react-toastify\dist\react-toastify.esm.mjs#Icons`),(0,o.createProxy)(String.raw`D:\Projects\Next-Appliation\blog-application\node_modules\react-toastify\dist\react-toastify.esm.mjs#Slide`);let n=(0,o.createProxy)(String.raw`D:\Projects\Next-Appliation\blog-application\node_modules\react-toastify\dist\react-toastify.esm.mjs#ToastContainer`);(0,o.createProxy)(String.raw`D:\Projects\Next-Appliation\blog-application\node_modules\react-toastify\dist\react-toastify.esm.mjs#Zoom`),(0,o.createProxy)(String.raw`D:\Projects\Next-Appliation\blog-application\node_modules\react-toastify\dist\react-toastify.esm.mjs#collapseToast`),(0,o.createProxy)(String.raw`D:\Projects\Next-Appliation\blog-application\node_modules\react-toastify\dist\react-toastify.esm.mjs#cssTransition`),(0,o.createProxy)(String.raw`D:\Projects\Next-Appliation\blog-application\node_modules\react-toastify\dist\react-toastify.esm.mjs#toast`),(0,o.createProxy)(String.raw`D:\Projects\Next-Appliation\blog-application\node_modules\react-toastify\dist\react-toastify.esm.mjs#useToast`),(0,o.createProxy)(String.raw`D:\Projects\Next-Appliation\blog-application\node_modules\react-toastify\dist\react-toastify.esm.mjs#useToastContainer`)}};var t=require("../../../webpack-runtime.js");t.C(e);var a=e=>t(t.s=e),o=t.X(0,[638,19,697,808],()=>a(87916));module.exports=o})();