(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[346],{71:function(e,t,n){Promise.resolve().then(n.bind(n,2174)),Promise.resolve().then(n.bind(n,5227)),Promise.resolve().then(n.bind(n,5016))},5227:function(e,t,n){"use strict";n.d(t,{default:function(){return s}});var r=n(7437),i=n(9233),c=n(6463),o=n(2265),a=n(3889),u=n(7138),l=n(3101);function s(e){var t,n,s,d,f;let{subscription:m}=e,v=(0,c.useRouter)(),b=(0,c.usePathname)(),[p,h]=(0,o.useState)(!1),_=m&&new Intl.NumberFormat("en-US",{style:"currency",currency:null==m?void 0:null===(t=m.prices)||void 0===t?void 0:t.currency,minimumFractionDigits:0}).format(((null==m?void 0:null===(n=m.prices)||void 0===n?void 0:n.unit_amount)||0)/100),x=async()=>{h(!0);let e=await (0,a.p)(b);return h(!1),v.push(e)};return(0,r.jsx)(l.Z,{title:"Your Plan",description:m?"You are currently on the ".concat(null==m?void 0:null===(d=m.prices)||void 0===d?void 0:null===(s=d.products)||void 0===s?void 0:s.name," plan."):"You are not currently subscribed to any plan.",footer:(0,r.jsxs)("div",{className:"flex flex-col items-start justify-between sm:flex-row sm:items-center",children:[(0,r.jsx)("p",{className:"pb-4 sm:pb-0",children:"Manage your subscription on Stripe."}),(0,r.jsx)(i.Z,{variant:"slim",onClick:x,loading:p,children:"Open customer portal"})]}),children:(0,r.jsx)("div",{className:"mt-8 mb-4 text-xl font-semibold",children:m?"".concat(_,"/").concat(null==m?void 0:null===(f=m.prices)||void 0===f?void 0:f.interval):(0,r.jsx)(u.default,{href:"/",children:"Choose your plan"})})})}},5016:function(e,t,n){"use strict";n.d(t,{default:function(){return s}});var r=n(7437),i=n(9233),c=n(3101),o=n(8205),a=n(7425),u=n(6463),l=n(2265);function s(e){let{userEmail:t}=e,n=(0,u.useRouter)(),[s,d]=(0,l.useState)(!1),f=async e=>{if(d(!0),e.currentTarget.newEmail.value===t){e.preventDefault(),d(!1);return}(0,a.X)(e,o.s,n),d(!1)};return(0,r.jsx)(c.Z,{title:"Your Email",description:"Please enter the email address you want to use to login.",footer:(0,r.jsxs)("div",{className:"flex flex-col items-start justify-between sm:flex-row sm:items-center",children:[(0,r.jsx)("p",{className:"pb-4 sm:pb-0",children:"We will email you to verify the change."}),(0,r.jsx)(i.Z,{variant:"slim",type:"submit",form:"emailForm",loading:s,children:"Update Email"})]}),children:(0,r.jsx)("div",{className:"mt-8 mb-4 text-xl font-semibold",children:(0,r.jsx)("form",{id:"emailForm",onSubmit:e=>f(e),children:(0,r.jsx)("input",{type:"text",name:"newEmail",className:"w-1/2 p-3 rounded-md bg-zinc-800",defaultValue:null!=t?t:"",placeholder:"Your email",maxLength:64})})})})}},7425:function(e,t,n){"use strict";n.d(t,{O:function(){return a},X:function(){return o}});var r=n(41),i=n(2287),c=n(8205);async function o(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;e.preventDefault();let r=new FormData(e.currentTarget),i=await t(r);return n?n.push(i):await (0,c.m3)(i)}async function a(e){e.preventDefault();let t=String(new FormData(e.currentTarget).get("provider")).trim(),n=(0,r.e)(),c=(0,i.Ax)("/auth/callback");await n.auth.signInWithOAuth({provider:t,options:{redirectTo:c}})}},8205:function(e,t,n){"use strict";n.d(t,{Ry:function(){return o},br:function(){return a},gQ:function(){return s},lv:function(){return c},m3:function(){return i},s:function(){return d},y1:function(){return l},yP:function(){return u}}),n(4590);var r=n(8064);(0,r.$)("cfe4e11143bdac7172dc96eb5c7ad771f2043c6b");var i=(0,r.$)("c8b94a55ee783ffb92b5d3be3b06325dcda2c28c"),c=(0,r.$)("3fde3a24a853a7b9918376c70d599131c9bd7620"),o=(0,r.$)("fc8368f5a5e69e85b8d88aa28ee67f2e0586a538"),a=(0,r.$)("dacf673069e2898a02eda2fdaee2592c5168ddaf"),u=(0,r.$)("f77e5f91ca87ae2c63f003f932760741033feea7"),l=(0,r.$)("f4b209b662c5670856e161770ddff41c161316c9"),s=(0,r.$)("a65f755ac9dca40b577223cfa4b7ed4d0778de79"),d=(0,r.$)("c8fb0cb6630a631d4484f2603849ab0025787db1")},2287:function(e,t,n){"use strict";n.d(t,{Ax:function(){return i},EM:function(){return a}});var r=n(357);let i=function(){var e,t;let n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",i=(null==r?void 0:null===(e=r.env)||void 0===e?void 0:e.NEXT_PUBLIC_SITE_URL)&&""!==r.env.NEXT_PUBLIC_SITE_URL.trim()?r.env.NEXT_PUBLIC_SITE_URL:(null==r?void 0:null===(t=r.env)||void 0===t?void 0:t.NEXT_PUBLIC_VERCEL_URL)&&""!==r.env.NEXT_PUBLIC_VERCEL_URL.trim()?r.env.NEXT_PUBLIC_VERCEL_URL:"http://localhost:3000/";return i=(i=i.replace(/\/+$/,"")).includes("http")?i:"https://".concat(i),(n=n.replace(/^\/+/,""))?"".concat(i,"/").concat(n):i},c={status:["status","status_description"],error:["error","error_description"]},o=function(e,t,n){let r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"",i=arguments.length>4&&void 0!==arguments[4]&&arguments[4],o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"",[a,u]=c[t],l="".concat(e,"?").concat(a,"=").concat(encodeURIComponent(n));return r&&(l+="&".concat(u,"=").concat(encodeURIComponent(r))),i&&(l+="&disable_button=true"),o&&(l+="&".concat(o)),l},a=function(e,t){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",r=arguments.length>3&&void 0!==arguments[3]&&arguments[3],i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"";return o(e,"error",t,n,r,i)}},3889:function(e,t,n){"use strict";n.d(t,{p:function(){return i},v:function(){return c}}),n(4590);var r=n(8064),i=(0,r.$)("9d80f7b7bec96c223665e959afd89f228bdfc6d4"),c=(0,r.$)("23bf5c0cf8f59322990bf558628baf2cfce62fc9")}},function(e){e.O(0,[217,756,373,174,971,23,744],function(){return e(e.s=71)}),_N_E=e.O()}]);