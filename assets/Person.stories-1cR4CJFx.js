import{j as w,d as je,o as T,b as ze,m as y,r as Ne,c as qe,k as a}from"./iframe-BVSYJkRB.js";import{u as Be}from"./usePersonData-BoHtceDD.js";import{P as $,A as ee,a as Y,_ as V,j as Ie,G as re,M as ne}from"./MockProvider-Bz32OUis.js";import"./preload-helper-PPVm8Dsz.js";const Ae=e=>{const{presenceOnly:n,textPosition:t}=e,s=n?e.presence&&w(e.presence,{}):e.avatar&&w(e.avatar,{});return je(e.root,{children:[(t==="after"||t==="below")&&s,e.primaryText&&w(e.primaryText,{}),e.secondaryText&&w(e.secondaryText,{}),e.tertiaryText&&w(e.tertiaryText,{}),e.quaternaryText&&w(e.quaternaryText,{}),t==="before"&&s]})},Re=(e,n)=>{const{avatar:t,presenceOnly:s=!1,size:r="medium",textAlignment:u="start",textPosition:d="after",presence:l,...c}=e,p=_e(c,n);return{...p,presenceOnly:s,size:r,textAlignment:u,textPosition:d,components:{...p.components,avatar:ee,presence:$},avatar:s?void 0:T(t,{renderByDefault:!0,defaultProps:{name:e.name,badge:l,size:Ge[r]},elementType:ee}),presence:s?T(l,{defaultProps:{size:Ce[r]},elementType:$}):void 0}},_e=(e,n)=>{const{name:t,primaryText:s,secondaryText:r,tertiaryText:u,quaternaryText:d,...l}=e,c=T(s,{renderByDefault:!0,defaultProps:{children:t},elementType:"span"}),p=T(r,{elementType:"span"}),i=T(u,{elementType:"span"}),x=T(d,{elementType:"span"});return{numTextLines:[c,p,i,x].filter(Boolean).length,components:{root:"div",primaryText:"span",secondaryText:"span",tertiaryText:"span",quaternaryText:"span"},root:ze({ref:n,...l},{elementType:"div"}),primaryText:c,secondaryText:p,tertiaryText:i,quaternaryText:x}},Ce={"extra-small":"tiny",small:"extra-small",medium:"small",large:"medium","extra-large":"large",huge:"large"},Ge={"extra-small":20,small:28,medium:32,large:36,"extra-large":40,huge:56},P={root:"fui-Persona",avatar:"fui-Persona__avatar",presence:"fui-Persona__presence",primaryText:"fui-Persona__primaryText",secondaryText:"fui-Persona__secondaryText",tertiaryText:"fui-Persona__tertiaryText",quaternaryText:"fui-Persona__quaternaryText"},De=Y("rlroi9i",null,[".rlroi9i{display:inline-grid;grid-auto-rows:max-content;grid-auto-flow:column;justify-items:start;grid-template-columns:max-content [middle] auto;}"]),Ee=V({beforeAfterCenter:{wkccdc:"f1iantul"},after:{},before:{B7hvi0a:"f1tll2w5",Budl1dq:"ffvkwdr"},below:{Bxotwcr:"f1nkeedh",B7hvi0a:"f1oiokrs",Budl1dq:"f1emgwh2"},media:{Ijaq50:"f1hek2iy"},mediaBeforeAfterCenter:{Ijaq50:"fa4dipu"},start:{qb2dma:"f9h729m"},center:{qb2dma:"f7nlbp4"},afterAlignToPrimary:{qb2dma:"f7nlbp4",Ijaq50:"f1rnkkuc",Bw0ie65:"f1warjpf"},beforeAlignToPrimary:{qb2dma:"f7nlbp4",Ijaq50:"f1rnkkuc",Br312pm:"fwu52yu"},secondLineSpacing:{B6of3ja:"f1ryq6si"},primary:{Ijaq50:"f1q3ipgb"},secondary:{Ijaq50:"f3drtdk"},tertiary:{Ijaq50:"fa1o6s1"},quaternary:{Ijaq50:"f1tuwaia"}},{d:[".f1iantul{grid-template-rows:1fr [primary] max-content [secondary] max-content [tertiary] max-content [quaternary] max-content 1fr;}",".f1tll2w5{justify-items:end;}",".ffvkwdr{grid-template-columns:auto [middle] max-content;}",".f1nkeedh{grid-auto-flow:unset;}",".f1oiokrs{justify-items:center;}",".f1emgwh2{grid-template-columns:unset;}",".f1hek2iy{grid-row-start:span 5;}",".fa4dipu{grid-row-start:span 6;}",".f9h729m{align-self:start;}",".f7nlbp4{align-self:center;}",".f1rnkkuc{grid-row-start:unset;}",".f1warjpf{grid-column-end:middle;}",".fwu52yu{grid-column-start:middle;}",".f1ryq6si{margin-top:-2px;}",".f1q3ipgb{grid-row-start:primary;}",".f3drtdk{grid-row-start:secondary;}",".fa1o6s1{grid-row-start:tertiary;}",".f1tuwaia{grid-row-start:quaternary;}"]}),Me=V({"extra-small":{Bs1gm4r:"f1e48tse"},small:{Bs1gm4r:"f18q9vkd"},medium:{Bs1gm4r:"f18q9vkd"},large:{Bs1gm4r:"fx34bi6"},"extra-large":{Bs1gm4r:"fx34bi6"},huge:{Bs1gm4r:"f1o96qtm"},after:{t21cq0:["f103ycu4","f1tao51"]},below:{jrapky:"fbo7acy"},before:{Frg6f3:["f1tao51","f103ycu4"]}},{d:[".f1e48tse{--fui-Persona__avatar--spacing:var(--spacingHorizontalSNudge);}",".f18q9vkd{--fui-Persona__avatar--spacing:var(--spacingHorizontalS);}",".fx34bi6{--fui-Persona__avatar--spacing:var(--spacingHorizontalMNudge);}",".f1o96qtm{--fui-Persona__avatar--spacing:var(--spacingHorizontalM);}",".f103ycu4{margin-right:var(--fui-Persona__avatar--spacing);}",".f1tao51{margin-left:var(--fui-Persona__avatar--spacing);}",".fbo7acy{margin-bottom:var(--fui-Persona__avatar--spacing);}"]}),Oe=V({small:{Bs1gm4r:"f1e48tse"}},{d:[".f1e48tse{--fui-Persona__avatar--spacing:var(--spacingHorizontalSNudge);}"]}),Fe=e=>{"use no memo";const{presenceOnly:n,size:t,textAlignment:s,textPosition:r}=e,u=n&&s==="start"&&t!=="extra-large"&&t!=="huge",d=r!=="below"&&s==="center",{primaryTextClassName:l,optionalTextClassName:c}=We(e,u),p=De(),i=Ee(),x=Me(),b={...x,...Oe()};return e.root.className=y(P.root,p,d&&i.beforeAfterCenter,i[r],e.root.className),e.avatar&&(e.avatar.className=y(P.avatar,r!=="below"&&i.media,d&&i.mediaBeforeAfterCenter,i[s],x[t],x[r],e.avatar.className)),e.presence&&(e.presence.className=y(P.presence,r!=="below"&&i.media,d&&i.mediaBeforeAfterCenter,i[s],b[t],b[r],r==="after"&&u&&i.afterAlignToPrimary,r==="before"&&u&&i.beforeAlignToPrimary,e.presence.className)),e.primaryText&&(e.primaryText.className=y(P.primaryText,d&&i.primary,l,e.primaryText.className)),e.secondaryText&&(e.secondaryText.className=y(P.secondaryText,d&&i.secondary,c,i.secondLineSpacing,e.secondaryText.className)),e.tertiaryText&&(e.tertiaryText.className=y(P.tertiaryText,d&&i.tertiary,c,e.tertiaryText.className)),e.quaternaryText&&(e.quaternaryText.className=y(P.quaternaryText,d&&i.quaternary,c,e.quaternaryText.className)),e},Ve=Y("rvj41k9",null,[".rvj41k9{display:block;color:var(--colorNeutralForeground1);font-family:var(--fontFamilyBase);font-size:var(--fontSizeBase300);font-weight:var(--fontWeightRegular);line-height:var(--lineHeightBase300);}"]),Ue=Y("rp1pf9e",null,[".rp1pf9e{display:block;color:var(--colorNeutralForeground2);font-family:var(--fontFamilyBase);font-size:var(--fontSizeBase200);font-weight:var(--fontWeightRegular);line-height:var(--lineHeightBase200);}"]),He=V({beforeAlignToPrimary:{Bw0ie65:"f1warjpf"},afterAlignToPrimary:{Br312pm:"fwu52yu"},body1:{Bahqtrf:"fk6fouc",Be2twd7:"fkhj508",Bhrd7zp:"figsok6",Bg96gwp:"f1i3iumi"},caption1:{Bahqtrf:"fk6fouc",Be2twd7:"fy9rknc",Bhrd7zp:"figsok6",Bg96gwp:"fwrc4pm"},subtitle2:{Bahqtrf:"fk6fouc",Be2twd7:"fod5ikn",Bhrd7zp:"fl43uef",Bg96gwp:"faaz57k"}},{d:[".f1warjpf{grid-column-end:middle;}",".fwu52yu{grid-column-start:middle;}",".fk6fouc{font-family:var(--fontFamilyBase);}",".fkhj508{font-size:var(--fontSizeBase300);}",".figsok6{font-weight:var(--fontWeightRegular);}",".f1i3iumi{line-height:var(--lineHeightBase300);}",".fy9rknc{font-size:var(--fontSizeBase200);}",".fwrc4pm{line-height:var(--lineHeightBase200);}",".fod5ikn{font-size:var(--fontSizeBase400);}",".fl43uef{font-weight:var(--fontWeightSemibold);}",".faaz57k{line-height:var(--lineHeightBase400);}"]}),We=(e,n)=>{const{presenceOnly:t,size:s,textPosition:r}=e,u=Ve(),d=Ue(),l=He();let c,p;return t?(s==="extra-small"?c=e.numTextLines<=1&&l.caption1:(s==="extra-large"||s==="huge")&&(c=l.subtitle2),n&&(r==="before"?p=l.beforeAlignToPrimary:r==="after"&&(p=l.afterAlignToPrimary))):(s==="huge"||s==="extra-large")&&(c=l.subtitle2),{primaryTextClassName:y(u,c,p),optionalTextClassName:y(d,!t&&s==="huge"&&l.body1,p)}},K=Ne.forwardRef((e,n)=>{const t=Re(e,n);return Fe(t),qe("usePersonaStyles_unstable")(t),Ae(t)});K.displayName="Persona";const Je=e=>{switch(e?.toLowerCase()){case"available":case"availableidle":return"available";case"away":case"berightback":return"away";case"busy":case"busyidle":case"donotdisturb":return"busy";default:return"offline"}},Qe={avatar:[void 0,void 0,void 0,void 0],oneline:["displayName",void 0,void 0,void 0],twolines:["displayName","jobTitle",void 0,void 0],threelines:["displayName","jobTitle","department",void 0],fourlines:["displayName","jobTitle","department","officeLocation,mail"]},te=new Set(["presenceActivity","presenceAvailability"]),Xe=new Set(["email",...te]),Z=e=>e?.split(",").map(n=>n.trim()).filter(Boolean)??[],v=e=>{if(e!=null){if(typeof e=="string")return e||void 0;if(typeof e=="number"||typeof e=="boolean")return String(e);if(Array.isArray(e)){const n=e.map(t=>v(t)).filter(t=>!!t);return n.length>0?n.join(", "):void 0}}},Ke=e=>v(e.mail)??v(e.email)??v(e.userPrincipalName),N=(e,n)=>{const t=Z(n);for(const s of t)switch(s){case"mail":case"email":{const r=Ke(e);if(r)return r;break}default:{const r=v(e[s]);if(r)return r}}},Ye=(e,n,t)=>({line:e,person:n,text:t}),k=(e,n,t,s)=>s?s(Ye(e,n,t)):t,q=(e,n,t)=>t??Qe[e][n-1],Ze=e=>{switch(e){case"avatar":return 0;case"oneline":return 1;case"twolines":return 2;case"threelines":return 3;default:return 4}},h=(e,n)=>n<=Ze(e),$e=e=>[...new Set(e.flatMap(n=>Z(n)))].filter(n=>!Xe.has(n)),o=({userId:e,userPrincipalName:n,email:t,personDetails:s,view:r="oneline",showPresence:u=!1,line1Property:d,line2Property:l,line3Property:c,line4Property:p,renderLine1:i,renderLine2:x,renderLine3:b,renderLine4:ae,fetchImage:se=!0,...m})=>{const f=r==="avatar",S=h(r,1)?q(r,1,d):void 0,U=h(r,2)?q(r,2,l):void 0,H=h(r,3)?q(r,3,c):void 0,W=h(r,4)?q(r,4,p):void 0,ie=[S,U,H,W].some(Se=>Z(Se).some(Le=>te.has(Le))),{user:oe,presence:L,photoUrl:J,loading:le}=Be({userId:s?void 0:e||n||t,fetchPresence:u||ie,fetchPhoto:se,selectFields:$e([S,U,H,W])}),Q=s||oe;if(le)return a.jsx(K,{...m,name:f?void 0:m.name??"Loading...",primaryText:f?void 0:m.primaryText,secondaryText:f?void 0:m.secondaryText,tertiaryText:f?void 0:m.tertiaryText,quaternaryText:f?void 0:m.quaternaryText});if(!Q)return null;const j=Q.displayName||"Unknown User",ce=Ie(j),z=Q,g={...z,email:t??v(z.email),presenceActivity:L?.activity??v(z.presenceActivity),presenceAvailability:L?.availability??v(z.presenceAvailability)},X=N(g,S),de=N(g,U),me=N(g,H),pe=N(g,W),ue=h(r,1)?S&&X!==j||i?k(1,g,X,i):m.primaryText:void 0,fe=h(r,2)?k(2,g,de,x):void 0,ge=h(r,3)?k(3,g,me,b):void 0,ye=h(r,4)?k(4,g,pe,ae):void 0,xe=u&&L?{status:Je(L.availability)}:void 0,he=m.presence??xe,ve=m.avatar??{image:J?{src:J}:void 0,initials:J?void 0:ce,name:j},Pe=f?void 0:m.name??j,we=f?void 0:m.primaryText??ue,Te=f?void 0:m.secondaryText??fe,be=f?void 0:m.tertiaryText??ge,ke=f?void 0:m.quaternaryText??ye;return a.jsx(K,{...m,name:Pe,primaryText:we,avatar:ve,presence:he,secondaryText:Te,tertiaryText:be,quaternaryText:ke})};o.__docgenInfo={description:"",methods:[],displayName:"Person",props:{userId:{required:!1,tsType:{name:"string"},description:""},userPrincipalName:{required:!1,tsType:{name:"string"},description:""},email:{required:!1,tsType:{name:"string"},description:""},personDetails:{required:!1,tsType:{name:"PersonDetails"},description:""},view:{required:!1,tsType:{name:"union",raw:"'avatar' | 'oneline' | 'twolines' | 'threelines' | 'fourlines'",elements:[{name:"literal",value:"'avatar'"},{name:"literal",value:"'oneline'"},{name:"literal",value:"'twolines'"},{name:"literal",value:"'threelines'"},{name:"literal",value:"'fourlines'"}]},description:"",defaultValue:{value:"'oneline'",computed:!1}},showPresence:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},line1Property:{required:!1,tsType:{name:"string"},description:`Mapping for the first text line.

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
to be used as fallbacks, in the same way as {@link PersonProps.line1Property}.`},renderLine1:{required:!1,tsType:{name:"signature",type:"function",raw:"(context: PersonLineRenderContext) => ReactElement | string | null",signature:{arguments:[{type:{name:"PersonLineRenderContext"},name:"context"}],return:{name:"union",raw:"ReactElement | string | null",elements:[{name:"ReactElement"},{name:"string"},{name:"null"}]}}},description:"Custom renderer for the first text line.\n\nWhen provided, this overrides the default rendering for line 1 and is called with a\n{@link PersonLineRenderContext}. The `text` property in the context contains the value that\nwould have been shown based on `line1Property`, if any."},renderLine2:{required:!1,tsType:{name:"signature",type:"function",raw:"(context: PersonLineRenderContext) => ReactElement | string | null",signature:{arguments:[{type:{name:"PersonLineRenderContext"},name:"context"}],return:{name:"union",raw:"ReactElement | string | null",elements:[{name:"ReactElement"},{name:"string"},{name:"null"}]}}},description:"Custom renderer for the second text line.\n\nWhen provided, this overrides the default rendering for line 2 and is called with a\n{@link PersonLineRenderContext}. The `text` property in the context contains the value that\nwould have been shown based on `line2Property`, if any."},renderLine3:{required:!1,tsType:{name:"signature",type:"function",raw:"(context: PersonLineRenderContext) => ReactElement | string | null",signature:{arguments:[{type:{name:"PersonLineRenderContext"},name:"context"}],return:{name:"union",raw:"ReactElement | string | null",elements:[{name:"ReactElement"},{name:"string"},{name:"null"}]}}},description:"Custom renderer for the third text line.\n\nWhen provided, this overrides the default rendering for line 3 and is called with a\n{@link PersonLineRenderContext}. The `text` property in the context contains the value that\nwould have been shown based on `line3Property`, if any."},renderLine4:{required:!1,tsType:{name:"signature",type:"function",raw:"(context: PersonLineRenderContext) => ReactElement | string | null",signature:{arguments:[{type:{name:"PersonLineRenderContext"},name:"context"}],return:{name:"union",raw:"ReactElement | string | null",elements:[{name:"ReactElement"},{name:"string"},{name:"null"}]}}},description:"Custom renderer for the fourth text line.\n\nWhen provided, this overrides the default rendering for line 4 and is called with a\n{@link PersonLineRenderContext}. The `text` property in the context contains the value that\nwould have been shown based on `line4Property`, if any."},fetchImage:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}}},composes:["PersonaProps"]};const ar={title:"Components/Person",component:o,parameters:{layout:"centered",docs:{description:{component:`Display a person with avatar, text lines, and presence by composing Fluent UI Persona with Microsoft Graph data.

Story organization follows Fluent Persona docs, while Graph-specific stories focus on:
- identity resolution (userId / userPrincipalName / email)
- direct data mode (personDetails)
- Graph photo fetching and initials fallback
- Graph presence mapping through showPresence
- MGT-style line property mapping and render overrides`}}},tags:["autodocs"],decorators:[e=>{const n=new ne({autoSignIn:!0});return a.jsx(re,{provider:n,children:a.jsx(e,{})})}],argTypes:{view:{control:"select",options:["avatar","oneline","twolines","threelines","fourlines"],description:"Display mode for the person component",table:{defaultValue:{summary:"oneline"}}},size:{control:"select",options:["extra-small","small","medium","large","extra-large","huge"],description:"Fluent UI Persona size token",table:{defaultValue:{summary:"medium"}}},textAlignment:{control:"radio",options:["start","center"],description:"Horizontal alignment of the text",table:{defaultValue:{summary:"start"}}},textPosition:{control:"radio",options:["before","after","below"],description:"Position of text relative to avatar",table:{defaultValue:{summary:"after"}}},showPresence:{control:"boolean",description:"Show presence badge on avatar",table:{defaultValue:{summary:"false"}}},presenceOnly:{control:"boolean",description:"Render PresenceBadge only instead of avatar",table:{defaultValue:{summary:"false"}}},fetchImage:{control:"boolean",description:"Fetch user photo from Microsoft Graph",table:{defaultValue:{summary:"true"}}},userId:{control:"text",description:"User ID to fetch from Microsoft Graph"},userPrincipalName:{control:"text",description:"User Principal Name (UPN) to fetch from Microsoft Graph"},email:{control:"text",description:"Email used as identity fallback to fetch from Microsoft Graph"},personDetails:{control:"object",description:"Provide person details directly. Graph user data may still be fetched when identifiers (id/UPN/email) are present or required."},line1Property:{control:"text",description:"MGT-style property name for line 1. Supports comma-separated fallbacks."},line2Property:{control:"text",description:"MGT-style property name for line 2. Supports comma-separated fallbacks."},line3Property:{control:"text",description:"MGT-style property name for line 3. Supports comma-separated fallbacks."},line4Property:{control:"text",description:"MGT-style property name for line 4. Supports comma-separated fallbacks."},renderLine1:{control:!1,description:"React render callback for line 1."},renderLine2:{control:!1,description:"React render callback for line 2."},renderLine3:{control:!1,description:"React render callback for line 3."},renderLine4:{control:!1,description:"React render callback for line 4."}}},B={name:"Default",args:{userId:"test-user",view:"oneline",showPresence:!1,size:"medium",fetchImage:!0}},I={name:"Avatar Only",args:{personDetails:{displayName:"Adele Vance",jobTitle:"Program Manager",department:"Product"},view:"avatar",size:"large",fetchImage:!1,showPresence:!1}},A={name:"Lines",render:e=>a.jsxs("div",{style:{display:"grid",gap:12},children:[a.jsx(o,{...e,view:"avatar"}),a.jsx(o,{...e,view:"oneline"}),a.jsx(o,{...e,view:"twolines"}),a.jsx(o,{...e,view:"threelines"}),a.jsx(o,{...e,view:"fourlines"})]}),args:{userId:"test-user",size:"medium",showPresence:!1}},R={name:"Size",render:e=>a.jsxs("div",{style:{display:"grid",gap:12},children:[a.jsx(o,{...e,size:"extra-small"}),a.jsx(o,{...e,size:"small"}),a.jsx(o,{...e,size:"medium"}),a.jsx(o,{...e,size:"large"}),a.jsx(o,{...e,size:"extra-large"}),a.jsx(o,{...e,size:"huge"})]}),args:{userId:"test-user",view:"twolines",showPresence:!0,size:"medium"}},_={name:"Text Alignment",render:e=>a.jsxs("div",{style:{display:"grid",gap:12},children:[a.jsx(o,{...e,textAlignment:"start"}),a.jsx(o,{...e,textAlignment:"center"})]}),args:{userId:"test-user",view:"threelines",showPresence:!0,size:"large"}},C={name:"Text Position",render:e=>a.jsxs("div",{style:{display:"grid",gap:12},children:[a.jsx(o,{...e,textPosition:"after"}),a.jsx(o,{...e,textPosition:"before"}),a.jsx(o,{...e,textPosition:"below",textAlignment:"center"})]}),args:{userId:"test-user",view:"twolines",showPresence:!0,size:"medium"}},G={name:"Presence",render:e=>a.jsxs("div",{style:{display:"grid",gap:12},children:[a.jsx(o,{...e,showPresence:!0}),a.jsx(o,{...e,showPresence:!0,presenceOnly:!0})]}),args:{userId:"test-user",view:"twolines",size:"large"}},D={name:"Graph: Direct Data",args:{personDetails:{displayName:"John Doe",jobTitle:"Software Engineer",department:"Engineering",officeLocation:"Redmond",mail:"john.doe@contoso.com"},view:"fourlines",size:"medium",showPresence:!1}},E={name:"Graph: Line Properties",args:{userId:"test-user",view:"threelines",line1Property:"displayName",line2Property:"mail,userPrincipalName",line3Property:"presenceAvailability",size:"medium"}},M={name:"Graph: Rendered Lines",args:{personDetails:{displayName:"Megan Bowen",jobTitle:"CEO",department:"Leadership",officeLocation:"Seattle"},view:"fourlines",renderLine1:({text:e})=>a.jsxs("span",{children:["Name: ",e]}),renderLine2:({text:e})=>a.jsxs("span",{children:["Role: ",e]}),renderLine3:({text:e})=>a.jsxs("span",{children:["Org: ",e]}),renderLine4:({text:e})=>a.jsxs("span",{children:["Location: ",e]}),size:"medium"}},O={name:"Graph: Image Fallback",args:{userId:"test-user",view:"twolines",size:"medium",fetchImage:!1}},F={name:"Graph: Loading State",decorators:[e=>{const n=new ne({autoSignIn:!1});return a.jsx(re,{provider:n,children:a.jsx(e,{})})}],args:{userId:"test-user",view:"twolines",size:"medium"}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
  name: 'Default',
  args: {
    userId: 'test-user',
    view: 'oneline',
    showPresence: false,
    size: 'medium',
    fetchImage: true
  }
}`,...B.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  name: 'Avatar Only',
  args: {
    personDetails: {
      displayName: 'Adele Vance',
      jobTitle: 'Program Manager',
      department: 'Product'
    },
    view: 'avatar',
    size: 'large',
    fetchImage: false,
    showPresence: false
  }
}`,...I.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
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
}`,...A.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
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
}`,...R.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
}`,..._.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}};G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
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
}`,...G.parameters?.docs?.source}}};D.parameters={...D.parameters,docs:{...D.parameters?.docs,source:{originalSource:`{
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
}`,...D.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  name: 'Graph: Line Properties',
  args: {
    userId: 'test-user',
    view: 'threelines',
    line1Property: 'displayName',
    line2Property: 'mail,userPrincipalName',
    line3Property: 'presenceAvailability',
    size: 'medium'
  }
}`,...E.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
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
}`,...M.parameters?.docs?.source}}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
  name: 'Graph: Image Fallback',
  args: {
    userId: 'test-user',
    view: 'twolines',
    size: 'medium',
    fetchImage: false
  }
}`,...O.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
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
}`,...F.parameters?.docs?.source}}};const sr=["Default","AvatarOnly","Lines","Size","TextAlignment","TextPosition","Presence","GraphDirectData","GraphLineProperties","GraphRenderedLines","GraphImageFallback","GraphLoadingState"];export{I as AvatarOnly,B as Default,D as GraphDirectData,O as GraphImageFallback,E as GraphLineProperties,F as GraphLoadingState,M as GraphRenderedLines,A as Lines,G as Presence,R as Size,_ as TextAlignment,C as TextPosition,sr as __namedExportsOrder,ar as default};
