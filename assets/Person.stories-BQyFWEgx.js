import{l as A,s as je,q as I,j as ze,m as j,r as re,o as Be,t as s}from"./iframe-DU_4wmCK.js";import{P as se,e as ie,a as ne,_ as Y,u as Ce,b as Ne,d as qe,f as Ae,h as Ie,j as _e,r as Re,k as ee,w as De,g as Ee,G as le,M as ce}from"./MockProvider-p4Y7SaZ6.js";import"./preload-helper-PPVm8Dsz.js";const Ge=e=>{const{presenceOnly:t,textPosition:n}=e,a=t?e.presence&&A(e.presence,{}):e.avatar&&A(e.avatar,{});return je(e.root,{children:[(n==="after"||n==="below")&&a,e.primaryText&&A(e.primaryText,{}),e.secondaryText&&A(e.secondaryText,{}),e.tertiaryText&&A(e.tertiaryText,{}),e.quaternaryText&&A(e.quaternaryText,{}),n==="before"&&a]})},Fe=(e,t)=>{const{avatar:n,presenceOnly:a=!1,size:r="medium",textAlignment:g="start",textPosition:u="after",presence:o,...l}=e,f=Ue(l,t);return{...f,presenceOnly:a,size:r,textAlignment:g,textPosition:u,components:{...f.components,avatar:ie,presence:se},avatar:a?void 0:I(n,{renderByDefault:!0,defaultProps:{name:e.name,badge:o,size:Oe[r]},elementType:ie}),presence:a?I(o,{defaultProps:{size:Me[r]},elementType:se}):void 0}},Ue=(e,t)=>{const{name:n,primaryText:a,secondaryText:r,tertiaryText:g,quaternaryText:u,...o}=e,l=I(a,{renderByDefault:!0,defaultProps:{children:n},elementType:"span"}),f=I(r,{elementType:"span"}),i=I(g,{elementType:"span"}),T=I(u,{elementType:"span"});return{numTextLines:[l,f,i,T].filter(Boolean).length,components:{root:"div",primaryText:"span",secondaryText:"span",tertiaryText:"span",quaternaryText:"span"},root:ze({ref:t,...o},{elementType:"div"}),primaryText:l,secondaryText:f,tertiaryText:i,quaternaryText:T}},Me={"extra-small":"tiny",small:"extra-small",medium:"small",large:"medium","extra-large":"large",huge:"large"},Oe={"extra-small":20,small:28,medium:32,large:36,"extra-large":40,huge:56},C={root:"fui-Persona",avatar:"fui-Persona__avatar",presence:"fui-Persona__presence",primaryText:"fui-Persona__primaryText",secondaryText:"fui-Persona__secondaryText",tertiaryText:"fui-Persona__tertiaryText",quaternaryText:"fui-Persona__quaternaryText"},He=ne("rlroi9i",null,[".rlroi9i{display:inline-grid;grid-auto-rows:max-content;grid-auto-flow:column;justify-items:start;grid-template-columns:max-content [middle] auto;}"]),Ve=Y({beforeAfterCenter:{wkccdc:"f1iantul"},after:{},before:{B7hvi0a:"f1tll2w5",Budl1dq:"ffvkwdr"},below:{Bxotwcr:"f1nkeedh",B7hvi0a:"f1oiokrs",Budl1dq:"f1emgwh2"},media:{Ijaq50:"f1hek2iy"},mediaBeforeAfterCenter:{Ijaq50:"fa4dipu"},start:{qb2dma:"f9h729m"},center:{qb2dma:"f7nlbp4"},afterAlignToPrimary:{qb2dma:"f7nlbp4",Ijaq50:"f1rnkkuc",Bw0ie65:"f1warjpf"},beforeAlignToPrimary:{qb2dma:"f7nlbp4",Ijaq50:"f1rnkkuc",Br312pm:"fwu52yu"},secondLineSpacing:{B6of3ja:"f1ryq6si"},primary:{Ijaq50:"f1q3ipgb"},secondary:{Ijaq50:"f3drtdk"},tertiary:{Ijaq50:"fa1o6s1"},quaternary:{Ijaq50:"f1tuwaia"}},{d:[".f1iantul{grid-template-rows:1fr [primary] max-content [secondary] max-content [tertiary] max-content [quaternary] max-content 1fr;}",".f1tll2w5{justify-items:end;}",".ffvkwdr{grid-template-columns:auto [middle] max-content;}",".f1nkeedh{grid-auto-flow:unset;}",".f1oiokrs{justify-items:center;}",".f1emgwh2{grid-template-columns:unset;}",".f1hek2iy{grid-row-start:span 5;}",".fa4dipu{grid-row-start:span 6;}",".f9h729m{align-self:start;}",".f7nlbp4{align-self:center;}",".f1rnkkuc{grid-row-start:unset;}",".f1warjpf{grid-column-end:middle;}",".fwu52yu{grid-column-start:middle;}",".f1ryq6si{margin-top:-2px;}",".f1q3ipgb{grid-row-start:primary;}",".f3drtdk{grid-row-start:secondary;}",".fa1o6s1{grid-row-start:tertiary;}",".f1tuwaia{grid-row-start:quaternary;}"]}),We=Y({"extra-small":{Bs1gm4r:"f1e48tse"},small:{Bs1gm4r:"f18q9vkd"},medium:{Bs1gm4r:"f18q9vkd"},large:{Bs1gm4r:"fx34bi6"},"extra-large":{Bs1gm4r:"fx34bi6"},huge:{Bs1gm4r:"f1o96qtm"},after:{t21cq0:["f103ycu4","f1tao51"]},below:{jrapky:"fbo7acy"},before:{Frg6f3:["f1tao51","f103ycu4"]}},{d:[".f1e48tse{--fui-Persona__avatar--spacing:var(--spacingHorizontalSNudge);}",".f18q9vkd{--fui-Persona__avatar--spacing:var(--spacingHorizontalS);}",".fx34bi6{--fui-Persona__avatar--spacing:var(--spacingHorizontalMNudge);}",".f1o96qtm{--fui-Persona__avatar--spacing:var(--spacingHorizontalM);}",".f103ycu4{margin-right:var(--fui-Persona__avatar--spacing);}",".f1tao51{margin-left:var(--fui-Persona__avatar--spacing);}",".fbo7acy{margin-bottom:var(--fui-Persona__avatar--spacing);}"]}),$e=Y({small:{Bs1gm4r:"f1e48tse"}},{d:[".f1e48tse{--fui-Persona__avatar--spacing:var(--spacingHorizontalSNudge);}"]}),Qe=e=>{"use no memo";const{presenceOnly:t,size:n,textAlignment:a,textPosition:r}=e,g=t&&a==="start"&&n!=="extra-large"&&n!=="huge",u=r!=="below"&&a==="center",{primaryTextClassName:o,optionalTextClassName:l}=Ze(e,g),f=He(),i=Ve(),T=We(),y={...T,...$e()};return e.root.className=j(C.root,f,u&&i.beforeAfterCenter,i[r],e.root.className),e.avatar&&(e.avatar.className=j(C.avatar,r!=="below"&&i.media,u&&i.mediaBeforeAfterCenter,i[a],T[n],T[r],e.avatar.className)),e.presence&&(e.presence.className=j(C.presence,r!=="below"&&i.media,u&&i.mediaBeforeAfterCenter,i[a],y[n],y[r],r==="after"&&g&&i.afterAlignToPrimary,r==="before"&&g&&i.beforeAlignToPrimary,e.presence.className)),e.primaryText&&(e.primaryText.className=j(C.primaryText,u&&i.primary,o,e.primaryText.className)),e.secondaryText&&(e.secondaryText.className=j(C.secondaryText,u&&i.secondary,l,i.secondLineSpacing,e.secondaryText.className)),e.tertiaryText&&(e.tertiaryText.className=j(C.tertiaryText,u&&i.tertiary,l,e.tertiaryText.className)),e.quaternaryText&&(e.quaternaryText.className=j(C.quaternaryText,u&&i.quaternary,l,e.quaternaryText.className)),e},Je=ne("rvj41k9",null,[".rvj41k9{display:block;color:var(--colorNeutralForeground1);font-family:var(--fontFamilyBase);font-size:var(--fontSizeBase300);font-weight:var(--fontWeightRegular);line-height:var(--lineHeightBase300);}"]),Ke=ne("rp1pf9e",null,[".rp1pf9e{display:block;color:var(--colorNeutralForeground2);font-family:var(--fontFamilyBase);font-size:var(--fontSizeBase200);font-weight:var(--fontWeightRegular);line-height:var(--lineHeightBase200);}"]),Xe=Y({beforeAlignToPrimary:{Bw0ie65:"f1warjpf"},afterAlignToPrimary:{Br312pm:"fwu52yu"},body1:{Bahqtrf:"fk6fouc",Be2twd7:"fkhj508",Bhrd7zp:"figsok6",Bg96gwp:"f1i3iumi"},caption1:{Bahqtrf:"fk6fouc",Be2twd7:"fy9rknc",Bhrd7zp:"figsok6",Bg96gwp:"fwrc4pm"},subtitle2:{Bahqtrf:"fk6fouc",Be2twd7:"fod5ikn",Bhrd7zp:"fl43uef",Bg96gwp:"faaz57k"}},{d:[".f1warjpf{grid-column-end:middle;}",".fwu52yu{grid-column-start:middle;}",".fk6fouc{font-family:var(--fontFamilyBase);}",".fkhj508{font-size:var(--fontSizeBase300);}",".figsok6{font-weight:var(--fontWeightRegular);}",".f1i3iumi{line-height:var(--lineHeightBase300);}",".fy9rknc{font-size:var(--fontSizeBase200);}",".fwrc4pm{line-height:var(--lineHeightBase200);}",".fod5ikn{font-size:var(--fontSizeBase400);}",".fl43uef{font-weight:var(--fontWeightSemibold);}",".faaz57k{line-height:var(--lineHeightBase400);}"]}),Ze=(e,t)=>{const{presenceOnly:n,size:a,textPosition:r}=e,g=Je(),u=Ke(),o=Xe();let l,f;return n?(a==="extra-small"?l=e.numTextLines<=1&&o.caption1:(a==="extra-large"||a==="huge")&&(l=o.subtitle2),t&&(r==="before"?f=o.beforeAlignToPrimary:r==="after"&&(f=o.afterAlignToPrimary))):(a==="huge"||a==="extra-large")&&(l=o.subtitle2),{primaryTextClassName:j(g,l,f),optionalTextClassName:j(u,!n&&a==="huge"&&o.body1,f)}},te=re.forwardRef((e,t)=>{const n=Fe(e,t);return Qe(n),Be("usePersonaStyles_unstable")(n),Ge(n)});te.displayName="Persona";const oe=["id","displayName","jobTitle","mail","department","officeLocation","userPrincipalName"],Ye=async e=>{if(!e)return null;if(typeof e=="string")return e;const t=e instanceof Blob?e:e instanceof ArrayBuffer?new Blob([e]):null;return t?new Promise((n,a)=>{const r=new FileReader;r.onloadend=()=>n(typeof r.result=="string"?r.result:null),r.onerror=()=>a(r.error),r.readAsDataURL(t)}):null},er=e=>{const t=Ce(),n=Ne(),a=qe(),r=Ae(),{userId:g,userPrincipalName:u,fetchPresence:o=!1,fetchPhoto:l=!0,selectFields:f}=e,i=[...new Set([...oe,...(f??[]).map(p=>p.trim()).filter(p=>p.length>0&&/^[a-zA-Z0-9_./]+$/.test(p))])].join(","),[T,y]=re.useState({user:null,presence:null,photoUrl:null,loading:!0,error:null});return re.useEffect(()=>{let p=!1;const G=i.split(",").filter(v=>!oe.includes(v));return(async()=>{const v=g||u;if(Ie(n)){try{const m=await n.getPersonData({identifier:v,fetchPresence:o,fetchPhoto:l,selectFields:G.length>0?G:void 0});p||y({user:m.user,presence:m.presence,photoUrl:m.photoUrl,loading:!1,error:null})}catch(m){p||y({user:null,presence:null,photoUrl:null,loading:!1,error:m})}return}if(a!=="SignedIn"){p||y({user:null,presence:null,photoUrl:null,loading:!1,error:a==="SignedOut"?null:new Error("Provider not signed in")});return}if(!t){p||y(m=>({...m,loading:!0}));return}if(!v){p||y({user:null,presence:null,photoUrl:null,loading:!1,error:null});return}const N=_e(v),c=r.enabled?await Re(N):null,q=!!(c?.user&&ee(c.userCachedAt,r.userTtlMs)),_=!!(c?.presenceCachedAt&&ee(c.presenceCachedAt,r.presenceTtlMs)),R=!!(c?.photoCachedAt&&ee(c.photoCachedAt,r.photoTtlMs));if(q&&(!o||_)&&(!l||R)){p||y({user:c?.user??null,presence:o?c?.presence??null:null,photoUrl:l?c?.photoUrl??null:null,loading:!1,error:null});return}try{y(k=>({...k,loading:!0,error:null}));const m=v.toLowerCase()==="me",B=Date.now();let D=!1,b=!1,S=!1,w=q?c?.user??null:null;if(w||(w=await t.api(m?"/me":`/users/${v}`).select(i).get(),D=!0),p)return;let L=null,h=null;if(o){if(_)L=c?.presence??null;else if(w?.id){try{L=await t.api(m?"/me/presence":`/users/${w.id}/presence`).get()}catch(k){console.warn("Failed to fetch presence:",k)}b=!0}}if(l){if(R)h=c?.photoUrl??null;else if(w?.id){try{const k=await t.api(m?"/me/photo/$value":`/users/${w.id}/photo/$value`).get();h=await Ye(k)}catch(k){console.warn("Failed to fetch photo:",k)}S=!0}}const P={...c??{}};D&&w&&(P.user=w,P.userCachedAt=B),o&&(b||_)&&(P.presence=b?L:c?.presence,P.presenceCachedAt=b?B:c?.presenceCachedAt),l&&(S||R)&&(P.photoUrl=S?h:c?.photoUrl,P.photoCachedAt=S?B:c?.photoCachedAt),r.enabled&&(D||b||S)&&P.user&&await De(N,P),p||y({user:w,presence:L,photoUrl:h,loading:!1,error:null})}catch(m){p||y({user:null,presence:null,photoUrl:null,loading:!1,error:m})}})(),()=>{p=!0}},[t,n,a,g,u,o,l,r,i]),T},rr=e=>{switch(e?.toLowerCase()){case"available":case"availableidle":return"available";case"away":case"berightback":return"away";case"busy":case"busyidle":case"donotdisturb":return"busy";default:return"offline"}},tr={avatar:[void 0,void 0,void 0,void 0],oneline:["displayName",void 0,void 0,void 0],twolines:["displayName","jobTitle",void 0,void 0],threelines:["displayName","jobTitle","department",void 0],fourlines:["displayName","jobTitle","department","officeLocation,mail"]},de=new Set(["presenceActivity","presenceAvailability"]),nr=new Set(["email",...de]),ae=e=>e?.split(",").map(t=>t.trim()).filter(Boolean)??[],z=e=>{if(e!=null){if(typeof e=="string")return e||void 0;if(typeof e=="number"||typeof e=="boolean")return String(e);if(Array.isArray(e)){const t=e.map(n=>z(n)).filter(n=>!!n);return t.length>0?t.join(", "):void 0}}},ar=e=>z(e.mail)??z(e.email)??z(e.userPrincipalName),F=(e,t)=>{const n=ae(t);for(const a of n)switch(a){case"mail":case"email":{const r=ar(e);if(r)return r;break}default:{const r=z(e[a]);if(r)return r}}},sr=(e,t,n)=>({line:e,person:t,text:n}),E=(e,t,n,a)=>a?a(sr(e,t,n)):n,U=(e,t,n)=>n??tr[e][t-1],ir=e=>[...new Set(e.flatMap(t=>ae(t)))].filter(t=>!nr.has(t)),d=({userId:e,userPrincipalName:t,email:n,personDetails:a,view:r="oneline",showPresence:g=!1,line1Property:u,line2Property:o,line3Property:l,line4Property:f,renderLine1:i,renderLine2:T,renderLine3:y,renderLine4:p,fetchImage:G=!0,...x})=>{const v=r==="avatar"?void 0:U(r,1,u),N=r==="avatar"?void 0:U(r,2,o),c=r==="threelines"||r==="fourlines"?U(r,3,l):void 0,q=r==="fourlines"?U(r,4,f):void 0,_=[v,N,c,q].some(Le=>ae(Le).some(ke=>de.has(ke))),{user:R,presence:m,photoUrl:B,loading:D}=er({userId:a?void 0:e||t||n,fetchPresence:g||_,fetchPhoto:G,selectFields:ir([v,N,c,q])}),b=a||R;if(D)return s.jsx(te,{...x,name:x.name??"Loading..."});if(!b)return null;const S=b.displayName||"Unknown User",w=Ee(S),L=b,h={...L,email:n??z(L.email),presenceActivity:m?.activity??z(L.presenceActivity),presenceAvailability:m?.availability??z(L.presenceAvailability)},P=F(h,v),k=F(h,N),ue=F(h,c),me=F(h,q),pe=v&&P!==S||i?E(1,h,P,i):x.primaryText,fe=E(2,h,k,T),ge=E(3,h,ue,y),ye=E(4,h,me,p),he=g&&m?{status:rr(m.availability)}:void 0,xe=x.presence??he,ve=x.avatar??{image:B?{src:B}:void 0,initials:B?void 0:w},Pe=x.name??S,we=x.primaryText??pe,Te=x.secondaryText??fe,be=x.tertiaryText??ge,Se=x.quaternaryText??ye;return s.jsx(te,{...x,name:Pe,primaryText:we,avatar:ve,presence:xe,secondaryText:Te,tertiaryText:be,quaternaryText:Se})};d.__docgenInfo={description:"",methods:[],displayName:"Person",props:{userId:{required:!1,tsType:{name:"string"},description:""},userPrincipalName:{required:!1,tsType:{name:"string"},description:""},email:{required:!1,tsType:{name:"string"},description:""},personDetails:{required:!1,tsType:{name:"PersonDetails"},description:""},view:{required:!1,tsType:{name:"union",raw:"'avatar' | 'oneline' | 'twolines' | 'threelines' | 'fourlines'",elements:[{name:"literal",value:"'avatar'"},{name:"literal",value:"'oneline'"},{name:"literal",value:"'twolines'"},{name:"literal",value:"'threelines'"},{name:"literal",value:"'fourlines'"}]},description:"",defaultValue:{value:"'oneline'",computed:!1}},showPresence:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},line1Property:{required:!1,tsType:{name:"string"},description:`Mapping for the first text line.

This is the name of a field on {@link PersonDetails} (for example, \`"displayName"\`), or a
comma-separated list of field names to use as fallbacks in order (for example,
\`"displayName,mail,email"\`).

Implementations may also support pseudo-fields for derived values such as presence in
addition to literal \`PersonDetails\` keys.`},line2Property:{required:!1,tsType:{name:"string"},description:`Mapping for the second text line.

Accepts a single {@link PersonDetails} field name or a comma-separated list of field names
to be used as fallbacks, in the same way as {@link PersonProps.line1Property}.`},line3Property:{required:!1,tsType:{name:"string"},description:`Mapping for the third text line.

Accepts a single {@link PersonDetails} field name or a comma-separated list of field names
to be used as fallbacks, in the same way as {@link PersonProps.line1Property}.`},line4Property:{required:!1,tsType:{name:"string"},description:`Mapping for the fourth text line.

Accepts a single {@link PersonDetails} field name or a comma-separated list of field names
to be used as fallbacks, in the same way as {@link PersonProps.line1Property}.`},renderLine1:{required:!1,tsType:{name:"signature",type:"function",raw:"(context: PersonLineRenderContext) => ReactElement | string | null",signature:{arguments:[{type:{name:"PersonLineRenderContext"},name:"context"}],return:{name:"union",raw:"ReactElement | string | null",elements:[{name:"ReactElement"},{name:"string"},{name:"null"}]}}},description:"Custom renderer for the first text line.\n\nWhen provided, this overrides the default rendering for line 1 and is called with a\n{@link PersonLineRenderContext}. The `text` property in the context contains the value that\nwould have been shown based on `line1Property`, if any."},renderLine2:{required:!1,tsType:{name:"signature",type:"function",raw:"(context: PersonLineRenderContext) => ReactElement | string | null",signature:{arguments:[{type:{name:"PersonLineRenderContext"},name:"context"}],return:{name:"union",raw:"ReactElement | string | null",elements:[{name:"ReactElement"},{name:"string"},{name:"null"}]}}},description:"Custom renderer for the second text line.\n\nWhen provided, this overrides the default rendering for line 2 and is called with a\n{@link PersonLineRenderContext}. The `text` property in the context contains the value that\nwould have been shown based on `line2Property`, if any."},renderLine3:{required:!1,tsType:{name:"signature",type:"function",raw:"(context: PersonLineRenderContext) => ReactElement | string | null",signature:{arguments:[{type:{name:"PersonLineRenderContext"},name:"context"}],return:{name:"union",raw:"ReactElement | string | null",elements:[{name:"ReactElement"},{name:"string"},{name:"null"}]}}},description:"Custom renderer for the third text line.\n\nWhen provided, this overrides the default rendering for line 3 and is called with a\n{@link PersonLineRenderContext}. The `text` property in the context contains the value that\nwould have been shown based on `line3Property`, if any."},renderLine4:{required:!1,tsType:{name:"signature",type:"function",raw:"(context: PersonLineRenderContext) => ReactElement | string | null",signature:{arguments:[{type:{name:"PersonLineRenderContext"},name:"context"}],return:{name:"union",raw:"ReactElement | string | null",elements:[{name:"ReactElement"},{name:"string"},{name:"null"}]}}},description:"Custom renderer for the fourth text line.\n\nWhen provided, this overrides the default rendering for line 4 and is called with a\n{@link PersonLineRenderContext}. The `text` property in the context contains the value that\nwould have been shown based on `line4Property`, if any."},fetchImage:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}}},composes:["PersonaProps"]};const dr={title:"Components/Person",component:d,parameters:{layout:"centered",docs:{description:{component:`Display a person with avatar, text lines, and presence by composing Fluent UI Persona with Microsoft Graph data.

Story organization follows Fluent Persona docs, while Graph-specific stories focus on:
- identity resolution (userId / userPrincipalName / email)
- direct data mode (personDetails)
- Graph photo fetching and initials fallback
- Graph presence mapping through showPresence
- MGT-style line property mapping and render overrides`}}},tags:["autodocs"],decorators:[e=>{const t=new ce({autoSignIn:!0});return s.jsx(le,{provider:t,children:s.jsx(e,{})})}],argTypes:{view:{control:"select",options:["avatar","oneline","twolines","threelines","fourlines"],description:"Display mode for the person component",table:{defaultValue:{summary:"oneline"}}},size:{control:"select",options:["extra-small","small","medium","large","extra-large","huge"],description:"Fluent UI Persona size token",table:{defaultValue:{summary:"medium"}}},textAlignment:{control:"radio",options:["start","center"],description:"Horizontal alignment of the text",table:{defaultValue:{summary:"start"}}},textPosition:{control:"radio",options:["before","after","below"],description:"Position of text relative to avatar",table:{defaultValue:{summary:"after"}}},showPresence:{control:"boolean",description:"Show presence badge on avatar",table:{defaultValue:{summary:"false"}}},presenceOnly:{control:"boolean",description:"Render PresenceBadge only instead of avatar",table:{defaultValue:{summary:"false"}}},fetchImage:{control:"boolean",description:"Fetch user photo from Microsoft Graph",table:{defaultValue:{summary:"true"}}},userId:{control:"text",description:"User ID to fetch from Microsoft Graph"},userPrincipalName:{control:"text",description:"User Principal Name (UPN) to fetch from Microsoft Graph"},email:{control:"text",description:"Email used as identity fallback to fetch from Microsoft Graph"},personDetails:{control:"object",description:"Provide person details directly. Graph user data may still be fetched when identifiers (id/UPN/email) are present or required."},line1Property:{control:"text",description:"MGT-style property name for line 1. Supports comma-separated fallbacks."},line2Property:{control:"text",description:"MGT-style property name for line 2. Supports comma-separated fallbacks."},line3Property:{control:"text",description:"MGT-style property name for line 3. Supports comma-separated fallbacks."},line4Property:{control:"text",description:"MGT-style property name for line 4. Supports comma-separated fallbacks."},renderLine1:{control:!1,description:"React render callback for line 1."},renderLine2:{control:!1,description:"React render callback for line 2."},renderLine3:{control:!1,description:"React render callback for line 3."},renderLine4:{control:!1,description:"React render callback for line 4."}}},M={name:"Default",args:{userId:"test-user",view:"oneline",showPresence:!1,size:"medium",fetchImage:!0}},O={name:"Lines",render:e=>s.jsxs("div",{style:{display:"grid",gap:12},children:[s.jsx(d,{...e,view:"avatar"}),s.jsx(d,{...e,view:"oneline"}),s.jsx(d,{...e,view:"twolines"}),s.jsx(d,{...e,view:"threelines"}),s.jsx(d,{...e,view:"fourlines"})]}),args:{userId:"test-user",size:"medium",showPresence:!1}},H={name:"Size",render:e=>s.jsxs("div",{style:{display:"grid",gap:12},children:[s.jsx(d,{...e,size:"extra-small"}),s.jsx(d,{...e,size:"small"}),s.jsx(d,{...e,size:"medium"}),s.jsx(d,{...e,size:"large"}),s.jsx(d,{...e,size:"extra-large"}),s.jsx(d,{...e,size:"huge"})]}),args:{userId:"test-user",view:"twolines",showPresence:!0,size:"medium"}},V={name:"Text Alignment",render:e=>s.jsxs("div",{style:{display:"grid",gap:12},children:[s.jsx(d,{...e,textAlignment:"start"}),s.jsx(d,{...e,textAlignment:"center"})]}),args:{userId:"test-user",view:"threelines",showPresence:!0,size:"large"}},W={name:"Text Position",render:e=>s.jsxs("div",{style:{display:"grid",gap:12},children:[s.jsx(d,{...e,textPosition:"after"}),s.jsx(d,{...e,textPosition:"before"}),s.jsx(d,{...e,textPosition:"below",textAlignment:"center"})]}),args:{userId:"test-user",view:"twolines",showPresence:!0,size:"medium"}},$={name:"Presence",render:e=>s.jsxs("div",{style:{display:"grid",gap:12},children:[s.jsx(d,{...e,showPresence:!0}),s.jsx(d,{...e,showPresence:!0,presenceOnly:!0})]}),args:{userId:"test-user",view:"twolines",size:"large"}},Q={name:"Graph: Direct Data",args:{personDetails:{displayName:"John Doe",jobTitle:"Software Engineer",department:"Engineering",officeLocation:"Redmond",mail:"john.doe@contoso.com"},view:"fourlines",size:"medium",showPresence:!1}},J={name:"Graph: Line Properties",args:{userId:"test-user",view:"threelines",line1Property:"displayName",line2Property:"mail,userPrincipalName",line3Property:"presenceAvailability",size:"medium"}},K={name:"Graph: Rendered Lines",args:{personDetails:{displayName:"Megan Bowen",jobTitle:"CEO",department:"Leadership",officeLocation:"Seattle"},view:"fourlines",renderLine1:({text:e})=>s.jsxs("span",{children:["Name: ",e]}),renderLine2:({text:e})=>s.jsxs("span",{children:["Role: ",e]}),renderLine3:({text:e})=>s.jsxs("span",{children:["Org: ",e]}),renderLine4:({text:e})=>s.jsxs("span",{children:["Location: ",e]}),size:"medium"}},X={name:"Graph: Image Fallback",args:{userId:"test-user",view:"twolines",size:"medium",fetchImage:!1}},Z={name:"Graph: Loading State",decorators:[e=>{const t=new ce({autoSignIn:!1});return s.jsx(le,{provider:t,children:s.jsx(e,{})})}],args:{userId:"test-user",view:"twolines",size:"medium"}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  name: 'Default',
  args: {
    userId: 'test-user',
    view: 'oneline',
    showPresence: false,
    size: 'medium',
    fetchImage: true
  }
}`,...M.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  name: 'Lines',
  render: args => <div style={{
    display: 'grid',
    gap: 12
  }}>
      <Person {...args} view="avatar" />
      <Person {...args} view="oneline" />
      <Person {...args} view="twolines" />
      <Person {...args} view="threelines" />
      <Person {...args} view="fourlines" />
    </div>,
  args: {
    userId: 'test-user',
    size: 'medium',
    showPresence: false
  }
}`,...O.parameters?.docs?.source}}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  name: 'Size',
  render: args => <div style={{
    display: 'grid',
    gap: 12
  }}>
      <Person {...args} size="extra-small" />
      <Person {...args} size="small" />
      <Person {...args} size="medium" />
      <Person {...args} size="large" />
      <Person {...args} size="extra-large" />
      <Person {...args} size="huge" />
    </div>,
  args: {
    userId: 'test-user',
    view: 'twolines',
    showPresence: true,
    size: 'medium'
  }
}`,...H.parameters?.docs?.source}}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  name: 'Text Alignment',
  render: args => <div style={{
    display: 'grid',
    gap: 12
  }}>
      <Person {...args} textAlignment="start" />
      <Person {...args} textAlignment="center" />
    </div>,
  args: {
    userId: 'test-user',
    view: 'threelines',
    showPresence: true,
    size: 'large'
  }
}`,...V.parameters?.docs?.source}}};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  name: 'Text Position',
  render: args => <div style={{
    display: 'grid',
    gap: 12
  }}>
      <Person {...args} textPosition="after" />
      <Person {...args} textPosition="before" />
      <Person {...args} textPosition="below" textAlignment="center" />
    </div>,
  args: {
    userId: 'test-user',
    view: 'twolines',
    showPresence: true,
    size: 'medium'
  }
}`,...W.parameters?.docs?.source}}};$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  name: 'Presence',
  render: args => <div style={{
    display: 'grid',
    gap: 12
  }}>
      <Person {...args} showPresence />
      <Person {...args} showPresence presenceOnly />
    </div>,
  args: {
    userId: 'test-user',
    view: 'twolines',
    size: 'large'
  }
}`,...$.parameters?.docs?.source}}};Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  name: 'Graph: Direct Data',
  args: {
    personDetails: {
      displayName: 'John Doe',
      jobTitle: 'Software Engineer',
      department: 'Engineering',
      officeLocation: 'Redmond',
      mail: 'john.doe@contoso.com'
    },
    view: 'fourlines',
    size: 'medium',
    showPresence: false
  }
}`,...Q.parameters?.docs?.source}}};J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  name: 'Graph: Line Properties',
  args: {
    userId: 'test-user',
    view: 'threelines',
    line1Property: 'displayName',
    line2Property: 'mail,userPrincipalName',
    line3Property: 'presenceAvailability',
    size: 'medium'
  }
}`,...J.parameters?.docs?.source}}};K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  name: 'Graph: Rendered Lines',
  args: {
    personDetails: {
      displayName: 'Megan Bowen',
      jobTitle: 'CEO',
      department: 'Leadership',
      officeLocation: 'Seattle'
    },
    view: 'fourlines',
    renderLine1: ({
      text
    }) => <span>Name: {text}</span>,
    renderLine2: ({
      text
    }) => <span>Role: {text}</span>,
    renderLine3: ({
      text
    }) => <span>Org: {text}</span>,
    renderLine4: ({
      text
    }) => <span>Location: {text}</span>,
    size: 'medium'
  }
}`,...K.parameters?.docs?.source}}};X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  name: 'Graph: Image Fallback',
  args: {
    userId: 'test-user',
    view: 'twolines',
    size: 'medium',
    fetchImage: false
  }
}`,...X.parameters?.docs?.source}}};Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  name: 'Graph: Loading State',
  decorators: [Story => {
    // Use a provider that's not signed in to show loading
    const loadingProvider = new MockProvider({
      autoSignIn: false
    });
    return <GraphProvider provider={loadingProvider}>
          <Story />
        </GraphProvider>;
  }],
  args: {
    userId: 'test-user',
    view: 'twolines',
    size: 'medium'
  }
}`,...Z.parameters?.docs?.source}}};const ur=["Default","Lines","Size","TextAlignment","TextPosition","Presence","GraphDirectData","GraphLineProperties","GraphRenderedLines","GraphImageFallback","GraphLoadingState"];export{M as Default,Q as GraphDirectData,X as GraphImageFallback,J as GraphLineProperties,Z as GraphLoadingState,K as GraphRenderedLines,O as Lines,$ as Presence,H as Size,V as TextAlignment,W as TextPosition,ur as __namedExportsOrder,dr as default};
