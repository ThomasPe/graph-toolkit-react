import{j as v,d as ke,o as P,b as Se,m as g,r as Le,c as ze,k as a}from"./iframe-DL9-gpCr.js";import{u as je}from"./usePersonData-Dv69zXXY.js";import{P as K,A as Y,a as Q,_ as D,h as Ne,G as Z,M as $}from"./MockProvider-nWrhGfdZ.js";import"./preload-helper-PPVm8Dsz.js";const qe=e=>{const{presenceOnly:n,textPosition:r}=e,s=n?e.presence&&v(e.presence,{}):e.avatar&&v(e.avatar,{});return ke(e.root,{children:[(r==="after"||r==="below")&&s,e.primaryText&&v(e.primaryText,{}),e.secondaryText&&v(e.secondaryText,{}),e.tertiaryText&&v(e.tertiaryText,{}),e.quaternaryText&&v(e.quaternaryText,{}),r==="before"&&s]})},Be=(e,n)=>{const{avatar:r,presenceOnly:s=!1,size:t="medium",textAlignment:p="start",textPosition:d="after",presence:l,...c}=e,m=Ie(c,n);return{...m,presenceOnly:s,size:t,textAlignment:p,textPosition:d,components:{...m.components,avatar:Y,presence:K},avatar:s?void 0:P(r,{renderByDefault:!0,defaultProps:{name:e.name,badge:l,size:_e[t]},elementType:Y}),presence:s?P(l,{defaultProps:{size:Re[t]},elementType:K}):void 0}},Ie=(e,n)=>{const{name:r,primaryText:s,secondaryText:t,tertiaryText:p,quaternaryText:d,...l}=e,c=P(s,{renderByDefault:!0,defaultProps:{children:r},elementType:"span"}),m=P(t,{elementType:"span"}),i=P(p,{elementType:"span"}),y=P(d,{elementType:"span"});return{numTextLines:[c,m,i,y].filter(Boolean).length,components:{root:"div",primaryText:"span",secondaryText:"span",tertiaryText:"span",quaternaryText:"span"},root:Se({ref:n,...l},{elementType:"div"}),primaryText:c,secondaryText:m,tertiaryText:i,quaternaryText:y}},Re={"extra-small":"tiny",small:"extra-small",medium:"small",large:"medium","extra-large":"large",huge:"large"},_e={"extra-small":20,small:28,medium:32,large:36,"extra-large":40,huge:56},h={root:"fui-Persona",avatar:"fui-Persona__avatar",presence:"fui-Persona__presence",primaryText:"fui-Persona__primaryText",secondaryText:"fui-Persona__secondaryText",tertiaryText:"fui-Persona__tertiaryText",quaternaryText:"fui-Persona__quaternaryText"},Ae=Q("rlroi9i",null,[".rlroi9i{display:inline-grid;grid-auto-rows:max-content;grid-auto-flow:column;justify-items:start;grid-template-columns:max-content [middle] auto;}"]),Ce=D({beforeAfterCenter:{wkccdc:"f1iantul"},after:{},before:{B7hvi0a:"f1tll2w5",Budl1dq:"ffvkwdr"},below:{Bxotwcr:"f1nkeedh",B7hvi0a:"f1oiokrs",Budl1dq:"f1emgwh2"},media:{Ijaq50:"f1hek2iy"},mediaBeforeAfterCenter:{Ijaq50:"fa4dipu"},start:{qb2dma:"f9h729m"},center:{qb2dma:"f7nlbp4"},afterAlignToPrimary:{qb2dma:"f7nlbp4",Ijaq50:"f1rnkkuc",Bw0ie65:"f1warjpf"},beforeAlignToPrimary:{qb2dma:"f7nlbp4",Ijaq50:"f1rnkkuc",Br312pm:"fwu52yu"},secondLineSpacing:{B6of3ja:"f1ryq6si"},primary:{Ijaq50:"f1q3ipgb"},secondary:{Ijaq50:"f3drtdk"},tertiary:{Ijaq50:"fa1o6s1"},quaternary:{Ijaq50:"f1tuwaia"}},{d:[".f1iantul{grid-template-rows:1fr [primary] max-content [secondary] max-content [tertiary] max-content [quaternary] max-content 1fr;}",".f1tll2w5{justify-items:end;}",".ffvkwdr{grid-template-columns:auto [middle] max-content;}",".f1nkeedh{grid-auto-flow:unset;}",".f1oiokrs{justify-items:center;}",".f1emgwh2{grid-template-columns:unset;}",".f1hek2iy{grid-row-start:span 5;}",".fa4dipu{grid-row-start:span 6;}",".f9h729m{align-self:start;}",".f7nlbp4{align-self:center;}",".f1rnkkuc{grid-row-start:unset;}",".f1warjpf{grid-column-end:middle;}",".fwu52yu{grid-column-start:middle;}",".f1ryq6si{margin-top:-2px;}",".f1q3ipgb{grid-row-start:primary;}",".f3drtdk{grid-row-start:secondary;}",".fa1o6s1{grid-row-start:tertiary;}",".f1tuwaia{grid-row-start:quaternary;}"]}),Ge=D({"extra-small":{Bs1gm4r:"f1e48tse"},small:{Bs1gm4r:"f18q9vkd"},medium:{Bs1gm4r:"f18q9vkd"},large:{Bs1gm4r:"fx34bi6"},"extra-large":{Bs1gm4r:"fx34bi6"},huge:{Bs1gm4r:"f1o96qtm"},after:{t21cq0:["f103ycu4","f1tao51"]},below:{jrapky:"fbo7acy"},before:{Frg6f3:["f1tao51","f103ycu4"]}},{d:[".f1e48tse{--fui-Persona__avatar--spacing:var(--spacingHorizontalSNudge);}",".f18q9vkd{--fui-Persona__avatar--spacing:var(--spacingHorizontalS);}",".fx34bi6{--fui-Persona__avatar--spacing:var(--spacingHorizontalMNudge);}",".f1o96qtm{--fui-Persona__avatar--spacing:var(--spacingHorizontalM);}",".f103ycu4{margin-right:var(--fui-Persona__avatar--spacing);}",".f1tao51{margin-left:var(--fui-Persona__avatar--spacing);}",".fbo7acy{margin-bottom:var(--fui-Persona__avatar--spacing);}"]}),Ee=D({small:{Bs1gm4r:"f1e48tse"}},{d:[".f1e48tse{--fui-Persona__avatar--spacing:var(--spacingHorizontalSNudge);}"]}),De=e=>{"use no memo";const{presenceOnly:n,size:r,textAlignment:s,textPosition:t}=e,p=n&&s==="start"&&r!=="extra-large"&&r!=="huge",d=t!=="below"&&s==="center",{primaryTextClassName:l,optionalTextClassName:c}=Ue(e,p),m=Ae(),i=Ce(),y=Ge(),w={...y,...Ee()};return e.root.className=g(h.root,m,d&&i.beforeAfterCenter,i[t],e.root.className),e.avatar&&(e.avatar.className=g(h.avatar,t!=="below"&&i.media,d&&i.mediaBeforeAfterCenter,i[s],y[r],y[t],e.avatar.className)),e.presence&&(e.presence.className=g(h.presence,t!=="below"&&i.media,d&&i.mediaBeforeAfterCenter,i[s],w[r],w[t],t==="after"&&p&&i.afterAlignToPrimary,t==="before"&&p&&i.beforeAlignToPrimary,e.presence.className)),e.primaryText&&(e.primaryText.className=g(h.primaryText,d&&i.primary,l,e.primaryText.className)),e.secondaryText&&(e.secondaryText.className=g(h.secondaryText,d&&i.secondary,c,i.secondLineSpacing,e.secondaryText.className)),e.tertiaryText&&(e.tertiaryText.className=g(h.tertiaryText,d&&i.tertiary,c,e.tertiaryText.className)),e.quaternaryText&&(e.quaternaryText.className=g(h.quaternaryText,d&&i.quaternary,c,e.quaternaryText.className)),e},Me=Q("rvj41k9",null,[".rvj41k9{display:block;color:var(--colorNeutralForeground1);font-family:var(--fontFamilyBase);font-size:var(--fontSizeBase300);font-weight:var(--fontWeightRegular);line-height:var(--lineHeightBase300);}"]),Fe=Q("rp1pf9e",null,[".rp1pf9e{display:block;color:var(--colorNeutralForeground2);font-family:var(--fontFamilyBase);font-size:var(--fontSizeBase200);font-weight:var(--fontWeightRegular);line-height:var(--lineHeightBase200);}"]),Oe=D({beforeAlignToPrimary:{Bw0ie65:"f1warjpf"},afterAlignToPrimary:{Br312pm:"fwu52yu"},body1:{Bahqtrf:"fk6fouc",Be2twd7:"fkhj508",Bhrd7zp:"figsok6",Bg96gwp:"f1i3iumi"},caption1:{Bahqtrf:"fk6fouc",Be2twd7:"fy9rknc",Bhrd7zp:"figsok6",Bg96gwp:"fwrc4pm"},subtitle2:{Bahqtrf:"fk6fouc",Be2twd7:"fod5ikn",Bhrd7zp:"fl43uef",Bg96gwp:"faaz57k"}},{d:[".f1warjpf{grid-column-end:middle;}",".fwu52yu{grid-column-start:middle;}",".fk6fouc{font-family:var(--fontFamilyBase);}",".fkhj508{font-size:var(--fontSizeBase300);}",".figsok6{font-weight:var(--fontWeightRegular);}",".f1i3iumi{line-height:var(--lineHeightBase300);}",".fy9rknc{font-size:var(--fontSizeBase200);}",".fwrc4pm{line-height:var(--lineHeightBase200);}",".fod5ikn{font-size:var(--fontSizeBase400);}",".fl43uef{font-weight:var(--fontWeightSemibold);}",".faaz57k{line-height:var(--lineHeightBase400);}"]}),Ue=(e,n)=>{const{presenceOnly:r,size:s,textPosition:t}=e,p=Me(),d=Fe(),l=Oe();let c,m;return r?(s==="extra-small"?c=e.numTextLines<=1&&l.caption1:(s==="extra-large"||s==="huge")&&(c=l.subtitle2),n&&(t==="before"?m=l.beforeAlignToPrimary:t==="after"&&(m=l.afterAlignToPrimary))):(s==="huge"||s==="extra-large")&&(c=l.subtitle2),{primaryTextClassName:g(p,c,m),optionalTextClassName:g(d,!r&&s==="huge"&&l.body1,m)}},J=Le.forwardRef((e,n)=>{const r=Be(e,n);return De(r),ze("usePersonaStyles_unstable")(r),qe(r)});J.displayName="Persona";const He=e=>{switch(e?.toLowerCase()){case"available":case"availableidle":return"available";case"away":case"berightback":return"away";case"busy":case"busyidle":case"donotdisturb":return"busy";default:return"offline"}},Ve={avatar:[void 0,void 0,void 0,void 0],oneline:["displayName",void 0,void 0,void 0],twolines:["displayName","jobTitle",void 0,void 0],threelines:["displayName","jobTitle","department",void 0],fourlines:["displayName","jobTitle","department","officeLocation,mail"]},ee=new Set(["presenceActivity","presenceAvailability"]),We=new Set(["email",...ee]),X=e=>e?.split(",").map(n=>n.trim()).filter(Boolean)??[],x=e=>{if(e!=null){if(typeof e=="string")return e||void 0;if(typeof e=="number"||typeof e=="boolean")return String(e);if(Array.isArray(e)){const n=e.map(r=>x(r)).filter(r=>!!r);return n.length>0?n.join(", "):void 0}}},Je=e=>x(e.mail)??x(e.email)??x(e.userPrincipalName),L=(e,n)=>{const r=X(n);for(const s of r)switch(s){case"mail":case"email":{const t=Je(e);if(t)return t;break}default:{const t=x(e[s]);if(t)return t}}},Qe=(e,n,r)=>({line:e,person:n,text:r}),T=(e,n,r,s)=>s?s(Qe(e,n,r)):r,z=(e,n,r)=>r??Ve[e][n-1],Xe=e=>[...new Set(e.flatMap(n=>X(n)))].filter(n=>!We.has(n)),o=({userId:e,userPrincipalName:n,email:r,personDetails:s,view:t="oneline",showPresence:p=!1,line1Property:d,line2Property:l,line3Property:c,line4Property:m,renderLine1:i,renderLine2:y,renderLine3:w,renderLine4:re,fetchImage:ne=!0,...u})=>{const b=t==="avatar"?void 0:z(t,1,d),M=t==="avatar"?void 0:z(t,2,l),F=t==="threelines"||t==="fourlines"?z(t,3,c):void 0,O=t==="fourlines"?z(t,4,m):void 0,te=[b,M,F,O].some(Te=>X(Te).some(be=>ee.has(be))),{user:ae,presence:k,photoUrl:U,loading:se}=je({userId:s?void 0:e||n||r,fetchPresence:p||te,fetchPhoto:ne,selectFields:Xe([b,M,F,O])}),H=s||ae;if(se)return a.jsx(J,{...u,name:u.name??"Loading..."});if(!H)return null;const V=H.displayName||"Unknown User",ie=Ne(V),S=H,f={...S,email:r??x(S.email),presenceActivity:k?.activity??x(S.presenceActivity),presenceAvailability:k?.availability??x(S.presenceAvailability)},W=L(f,b),oe=L(f,M),le=L(f,F),ce=L(f,O),de=b&&W!==V||i?T(1,f,W,i):u.primaryText,me=T(2,f,oe,y),pe=T(3,f,le,w),ue=T(4,f,ce,re),fe=p&&k?{status:He(k.availability)}:void 0,ge=u.presence??fe,ye=u.avatar??{image:U?{src:U}:void 0,initials:U?void 0:ie},xe=u.name??V,he=u.primaryText??de,ve=u.secondaryText??me,Pe=u.tertiaryText??pe,we=u.quaternaryText??ue;return a.jsx(J,{...u,name:xe,primaryText:he,avatar:ye,presence:ge,secondaryText:ve,tertiaryText:Pe,quaternaryText:we})};o.__docgenInfo={description:"",methods:[],displayName:"Person",props:{userId:{required:!1,tsType:{name:"string"},description:""},userPrincipalName:{required:!1,tsType:{name:"string"},description:""},email:{required:!1,tsType:{name:"string"},description:""},personDetails:{required:!1,tsType:{name:"PersonDetails"},description:""},view:{required:!1,tsType:{name:"union",raw:"'avatar' | 'oneline' | 'twolines' | 'threelines' | 'fourlines'",elements:[{name:"literal",value:"'avatar'"},{name:"literal",value:"'oneline'"},{name:"literal",value:"'twolines'"},{name:"literal",value:"'threelines'"},{name:"literal",value:"'fourlines'"}]},description:"",defaultValue:{value:"'oneline'",computed:!1}},showPresence:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},line1Property:{required:!1,tsType:{name:"string"},description:`Mapping for the first text line.

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
to be used as fallbacks, in the same way as {@link PersonProps.line1Property}.`},renderLine1:{required:!1,tsType:{name:"signature",type:"function",raw:"(context: PersonLineRenderContext) => ReactElement | string | null",signature:{arguments:[{type:{name:"PersonLineRenderContext"},name:"context"}],return:{name:"union",raw:"ReactElement | string | null",elements:[{name:"ReactElement"},{name:"string"},{name:"null"}]}}},description:"Custom renderer for the first text line.\n\nWhen provided, this overrides the default rendering for line 1 and is called with a\n{@link PersonLineRenderContext}. The `text` property in the context contains the value that\nwould have been shown based on `line1Property`, if any."},renderLine2:{required:!1,tsType:{name:"signature",type:"function",raw:"(context: PersonLineRenderContext) => ReactElement | string | null",signature:{arguments:[{type:{name:"PersonLineRenderContext"},name:"context"}],return:{name:"union",raw:"ReactElement | string | null",elements:[{name:"ReactElement"},{name:"string"},{name:"null"}]}}},description:"Custom renderer for the second text line.\n\nWhen provided, this overrides the default rendering for line 2 and is called with a\n{@link PersonLineRenderContext}. The `text` property in the context contains the value that\nwould have been shown based on `line2Property`, if any."},renderLine3:{required:!1,tsType:{name:"signature",type:"function",raw:"(context: PersonLineRenderContext) => ReactElement | string | null",signature:{arguments:[{type:{name:"PersonLineRenderContext"},name:"context"}],return:{name:"union",raw:"ReactElement | string | null",elements:[{name:"ReactElement"},{name:"string"},{name:"null"}]}}},description:"Custom renderer for the third text line.\n\nWhen provided, this overrides the default rendering for line 3 and is called with a\n{@link PersonLineRenderContext}. The `text` property in the context contains the value that\nwould have been shown based on `line3Property`, if any."},renderLine4:{required:!1,tsType:{name:"signature",type:"function",raw:"(context: PersonLineRenderContext) => ReactElement | string | null",signature:{arguments:[{type:{name:"PersonLineRenderContext"},name:"context"}],return:{name:"union",raw:"ReactElement | string | null",elements:[{name:"ReactElement"},{name:"string"},{name:"null"}]}}},description:"Custom renderer for the fourth text line.\n\nWhen provided, this overrides the default rendering for line 4 and is called with a\n{@link PersonLineRenderContext}. The `text` property in the context contains the value that\nwould have been shown based on `line4Property`, if any."},fetchImage:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}}},composes:["PersonaProps"]};const er={title:"Components/Person",component:o,parameters:{layout:"centered",docs:{description:{component:`Display a person with avatar, text lines, and presence by composing Fluent UI Persona with Microsoft Graph data.

Story organization follows Fluent Persona docs, while Graph-specific stories focus on:
- identity resolution (userId / userPrincipalName / email)
- direct data mode (personDetails)
- Graph photo fetching and initials fallback
- Graph presence mapping through showPresence
- MGT-style line property mapping and render overrides`}}},tags:["autodocs"],decorators:[e=>{const n=new $({autoSignIn:!0});return a.jsx(Z,{provider:n,children:a.jsx(e,{})})}],argTypes:{view:{control:"select",options:["avatar","oneline","twolines","threelines","fourlines"],description:"Display mode for the person component",table:{defaultValue:{summary:"oneline"}}},size:{control:"select",options:["extra-small","small","medium","large","extra-large","huge"],description:"Fluent UI Persona size token",table:{defaultValue:{summary:"medium"}}},textAlignment:{control:"radio",options:["start","center"],description:"Horizontal alignment of the text",table:{defaultValue:{summary:"start"}}},textPosition:{control:"radio",options:["before","after","below"],description:"Position of text relative to avatar",table:{defaultValue:{summary:"after"}}},showPresence:{control:"boolean",description:"Show presence badge on avatar",table:{defaultValue:{summary:"false"}}},presenceOnly:{control:"boolean",description:"Render PresenceBadge only instead of avatar",table:{defaultValue:{summary:"false"}}},fetchImage:{control:"boolean",description:"Fetch user photo from Microsoft Graph",table:{defaultValue:{summary:"true"}}},userId:{control:"text",description:"User ID to fetch from Microsoft Graph"},userPrincipalName:{control:"text",description:"User Principal Name (UPN) to fetch from Microsoft Graph"},email:{control:"text",description:"Email used as identity fallback to fetch from Microsoft Graph"},personDetails:{control:"object",description:"Provide person details directly. Graph user data may still be fetched when identifiers (id/UPN/email) are present or required."},line1Property:{control:"text",description:"MGT-style property name for line 1. Supports comma-separated fallbacks."},line2Property:{control:"text",description:"MGT-style property name for line 2. Supports comma-separated fallbacks."},line3Property:{control:"text",description:"MGT-style property name for line 3. Supports comma-separated fallbacks."},line4Property:{control:"text",description:"MGT-style property name for line 4. Supports comma-separated fallbacks."},renderLine1:{control:!1,description:"React render callback for line 1."},renderLine2:{control:!1,description:"React render callback for line 2."},renderLine3:{control:!1,description:"React render callback for line 3."},renderLine4:{control:!1,description:"React render callback for line 4."}}},j={name:"Default",args:{userId:"test-user",view:"oneline",showPresence:!1,size:"medium",fetchImage:!0}},N={name:"Lines",render:e=>a.jsxs("div",{style:{display:"grid",gap:12},children:[a.jsx(o,{...e,view:"avatar"}),a.jsx(o,{...e,view:"oneline"}),a.jsx(o,{...e,view:"twolines"}),a.jsx(o,{...e,view:"threelines"}),a.jsx(o,{...e,view:"fourlines"})]}),args:{userId:"test-user",size:"medium",showPresence:!1}},q={name:"Size",render:e=>a.jsxs("div",{style:{display:"grid",gap:12},children:[a.jsx(o,{...e,size:"extra-small"}),a.jsx(o,{...e,size:"small"}),a.jsx(o,{...e,size:"medium"}),a.jsx(o,{...e,size:"large"}),a.jsx(o,{...e,size:"extra-large"}),a.jsx(o,{...e,size:"huge"})]}),args:{userId:"test-user",view:"twolines",showPresence:!0,size:"medium"}},B={name:"Text Alignment",render:e=>a.jsxs("div",{style:{display:"grid",gap:12},children:[a.jsx(o,{...e,textAlignment:"start"}),a.jsx(o,{...e,textAlignment:"center"})]}),args:{userId:"test-user",view:"threelines",showPresence:!0,size:"large"}},I={name:"Text Position",render:e=>a.jsxs("div",{style:{display:"grid",gap:12},children:[a.jsx(o,{...e,textPosition:"after"}),a.jsx(o,{...e,textPosition:"before"}),a.jsx(o,{...e,textPosition:"below",textAlignment:"center"})]}),args:{userId:"test-user",view:"twolines",showPresence:!0,size:"medium"}},R={name:"Presence",render:e=>a.jsxs("div",{style:{display:"grid",gap:12},children:[a.jsx(o,{...e,showPresence:!0}),a.jsx(o,{...e,showPresence:!0,presenceOnly:!0})]}),args:{userId:"test-user",view:"twolines",size:"large"}},_={name:"Graph: Direct Data",args:{personDetails:{displayName:"John Doe",jobTitle:"Software Engineer",department:"Engineering",officeLocation:"Redmond",mail:"john.doe@contoso.com"},view:"fourlines",size:"medium",showPresence:!1}},A={name:"Graph: Line Properties",args:{userId:"test-user",view:"threelines",line1Property:"displayName",line2Property:"mail,userPrincipalName",line3Property:"presenceAvailability",size:"medium"}},C={name:"Graph: Rendered Lines",args:{personDetails:{displayName:"Megan Bowen",jobTitle:"CEO",department:"Leadership",officeLocation:"Seattle"},view:"fourlines",renderLine1:({text:e})=>a.jsxs("span",{children:["Name: ",e]}),renderLine2:({text:e})=>a.jsxs("span",{children:["Role: ",e]}),renderLine3:({text:e})=>a.jsxs("span",{children:["Org: ",e]}),renderLine4:({text:e})=>a.jsxs("span",{children:["Location: ",e]}),size:"medium"}},G={name:"Graph: Image Fallback",args:{userId:"test-user",view:"twolines",size:"medium",fetchImage:!1}},E={name:"Graph: Loading State",decorators:[e=>{const n=new $({autoSignIn:!1});return a.jsx(Z,{provider:n,children:a.jsx(e,{})})}],args:{userId:"test-user",view:"twolines",size:"medium"}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  name: 'Default',
  args: {
    userId: 'test-user',
    view: 'oneline',
    showPresence: false,
    size: 'medium',
    fetchImage: true
  }
}`,...j.parameters?.docs?.source}}};N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
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
}`,...N.parameters?.docs?.source}}};q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
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
}`,...q.parameters?.docs?.source}}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
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
}`,...B.parameters?.docs?.source}}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
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
}`,...I.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
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
}`,...R.parameters?.docs?.source}}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
}`,..._.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  name: 'Graph: Line Properties',
  args: {
    userId: 'test-user',
    view: 'threelines',
    line1Property: 'displayName',
    line2Property: 'mail,userPrincipalName',
    line3Property: 'presenceAvailability',
    size: 'medium'
  }
}`,...A.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}};G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  name: 'Graph: Image Fallback',
  args: {
    userId: 'test-user',
    view: 'twolines',
    size: 'medium',
    fetchImage: false
  }
}`,...G.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
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
}`,...E.parameters?.docs?.source}}};const rr=["Default","Lines","Size","TextAlignment","TextPosition","Presence","GraphDirectData","GraphLineProperties","GraphRenderedLines","GraphImageFallback","GraphLoadingState"];export{j as Default,_ as GraphDirectData,G as GraphImageFallback,A as GraphLineProperties,E as GraphLoadingState,C as GraphRenderedLines,N as Lines,R as Presence,q as Size,B as TextAlignment,I as TextPosition,rr as __namedExportsOrder,er as default};
