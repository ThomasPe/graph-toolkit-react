import{a as e,n as t}from"./chunk-BneVvdWh.js";import{C as n,ot as r,p as i,t as a}from"./iframe-B_Hr2g1Q.js";import{f as o,l as s,n as c,p as l,t as u,u as d}from"./MockProvider-9UjmAtpQ.js";import{n as f,t as p}from"./usePersonData-I-pxTSJs.js";var m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A=t((()=>{r(),a(),p(),d(),m=e(n()),h=e=>{switch(e?.toLowerCase()){case`available`:case`availableidle`:return`available`;case`away`:case`berightback`:return`away`;case`busy`:case`busyidle`:case`donotdisturb`:return`busy`;default:return`offline`}},g={avatar:[void 0,void 0,void 0,void 0],oneline:[`displayName`,void 0,void 0,void 0],twolines:[`displayName`,`jobTitle`,void 0,void 0],threelines:[`displayName`,`jobTitle`,`department`,void 0],fourlines:[`displayName`,`jobTitle`,`department`,`officeLocation,mail`]},_=new Set([`presenceActivity`,`presenceAvailability`]),v=new Set([`email`,..._]),y=e=>e?.split(`,`).map(e=>e.trim()).filter(Boolean)??[],b=e=>{if(e!=null){if(typeof e==`string`)return e||void 0;if(typeof e==`number`||typeof e==`boolean`)return String(e);if(Array.isArray(e)){let t=e.map(e=>b(e)).filter(e=>!!e);return t.length>0?t.join(`, `):void 0}}},x=e=>b(e.mail)??b(e.email)??b(e.userPrincipalName),S=(e,t)=>{let n=y(t);for(let t of n)switch(t){case`mail`:case`email`:{let t=x(e);if(t)return t;break}default:{let n=b(e[t]);if(n)return n}}},C=(e,t,n)=>({line:e,person:t,text:n}),w=(e,t,n,r)=>r?r(C(e,t,n)):n,T=(e,t,n)=>n??g[e][t-1],E=e=>{switch(e){case`avatar`:return 0;case`oneline`:return 1;case`twolines`:return 2;case`threelines`:return 3;default:return 4}},D=(e,t)=>t<=E(e),O=e=>[...new Set(e.flatMap(e=>y(e)))].filter(e=>!v.has(e)),k=({userId:e,userPrincipalName:t,email:n,personDetails:r,view:a=`oneline`,showPresence:o=!1,line1Property:c,line2Property:l,line3Property:u,line4Property:d,renderLine1:p,renderLine2:g,renderLine3:v,renderLine4:x,fetchImage:C=!0,...E})=>{let k=a===`avatar`,A=D(a,1)?T(a,1,c):void 0,j=D(a,2)?T(a,2,l):void 0,M=D(a,3)?T(a,3,u):void 0,N=D(a,4)?T(a,4,d):void 0,P=[A,j,M,N].some(e=>y(e).some(e=>_.has(e))),{user:F,presence:I,photoUrl:L,loading:R}=f({userId:r?void 0:e||t||n,fetchPresence:o||P,fetchPhoto:C,selectFields:O([A,j,M,N])}),z=r||F;if(R)return(0,m.jsx)(i,{...E,name:k?void 0:E.name??`Loading...`,primaryText:k?void 0:E.primaryText,secondaryText:k?void 0:E.secondaryText,tertiaryText:k?void 0:E.tertiaryText,quaternaryText:k?void 0:E.quaternaryText});if(!z)return null;let B=z.displayName||`Unknown User`,V=s(B),H=z,U={...H,email:n??b(H.email),presenceActivity:I?.activity??b(H.presenceActivity),presenceAvailability:I?.availability??b(H.presenceAvailability)},W=S(U,A),G=S(U,j),K=S(U,M),q=S(U,N),J=D(a,1)?A&&W!==B||p?w(1,U,W,p):E.primaryText:void 0,Y=D(a,2)?w(2,U,G,g):void 0,X=D(a,3)?w(3,U,K,v):void 0,Z=D(a,4)?w(4,U,q,x):void 0,Q=o&&I?{status:h(I.availability)}:void 0,$=E.presence??Q,ee=E.avatar??{image:L?{src:L}:void 0,initials:L?void 0:V,name:B},te=k?void 0:E.name??B,ne=k?void 0:E.primaryText??J,re=k?void 0:E.secondaryText??Y,ie=k?void 0:E.tertiaryText??X,ae=k?void 0:E.quaternaryText??Z;return(0,m.jsx)(i,{...E,name:te,primaryText:ne,avatar:ee,presence:$,secondaryText:re,tertiaryText:ie,quaternaryText:ae})},k.__docgenInfo={description:``,methods:[],displayName:`Person`,props:{userId:{required:!1,tsType:{name:`string`},description:``},userPrincipalName:{required:!1,tsType:{name:`string`},description:``},email:{required:!1,tsType:{name:`string`},description:``},personDetails:{required:!1,tsType:{name:`PersonDetails`},description:``},view:{required:!1,tsType:{name:`union`,raw:`'avatar' | 'oneline' | 'twolines' | 'threelines' | 'fourlines'`,elements:[{name:`literal`,value:`'avatar'`},{name:`literal`,value:`'oneline'`},{name:`literal`,value:`'twolines'`},{name:`literal`,value:`'threelines'`},{name:`literal`,value:`'fourlines'`}]},description:``,defaultValue:{value:`'oneline'`,computed:!1}},showPresence:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},line1Property:{required:!1,tsType:{name:`string`},description:`Mapping for the first text line.

This is the name of a field on {@link PersonDetails} (for example, \`"displayName"\`), or a
comma-separated list of field names to use as fallbacks in order (for example,
\`"displayName,mail,email"\`).

Implementations may also support pseudo-fields for derived values such as presence in
addition to literal \`PersonDetails\` keys.`},line2Property:{required:!1,tsType:{name:`string`},description:`Mapping for the second text line.

Accepts a single {@link PersonDetails} field name or a comma-separated list of field names
to be used as fallbacks, in the same way as {@link PersonProps.line1Property}.`},line3Property:{required:!1,tsType:{name:`string`},description:`Mapping for the third text line.

Accepts a single {@link PersonDetails} field name or a comma-separated list of field names
to be used as fallbacks, in the same way as {@link PersonProps.line1Property}.`},line4Property:{required:!1,tsType:{name:`string`},description:`Mapping for the fourth text line.

Accepts a single {@link PersonDetails} field name or a comma-separated list of field names
to be used as fallbacks, in the same way as {@link PersonProps.line1Property}.`},renderLine1:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(context: PersonLineRenderContext) => ReactElement | string | null`,signature:{arguments:[{type:{name:`PersonLineRenderContext`},name:`context`}],return:{name:`union`,raw:`ReactElement | string | null`,elements:[{name:`ReactElement`},{name:`string`},{name:`null`}]}}},description:`Custom renderer for the first text line.

When provided, this overrides the default rendering for line 1 and is called with a
{@link PersonLineRenderContext}. The \`text\` property in the context contains the value that
would have been shown based on \`line1Property\`, if any.`},renderLine2:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(context: PersonLineRenderContext) => ReactElement | string | null`,signature:{arguments:[{type:{name:`PersonLineRenderContext`},name:`context`}],return:{name:`union`,raw:`ReactElement | string | null`,elements:[{name:`ReactElement`},{name:`string`},{name:`null`}]}}},description:`Custom renderer for the second text line.

When provided, this overrides the default rendering for line 2 and is called with a
{@link PersonLineRenderContext}. The \`text\` property in the context contains the value that
would have been shown based on \`line2Property\`, if any.`},renderLine3:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(context: PersonLineRenderContext) => ReactElement | string | null`,signature:{arguments:[{type:{name:`PersonLineRenderContext`},name:`context`}],return:{name:`union`,raw:`ReactElement | string | null`,elements:[{name:`ReactElement`},{name:`string`},{name:`null`}]}}},description:`Custom renderer for the third text line.

When provided, this overrides the default rendering for line 3 and is called with a
{@link PersonLineRenderContext}. The \`text\` property in the context contains the value that
would have been shown based on \`line3Property\`, if any.`},renderLine4:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(context: PersonLineRenderContext) => ReactElement | string | null`,signature:{arguments:[{type:{name:`PersonLineRenderContext`},name:`context`}],return:{name:`union`,raw:`ReactElement | string | null`,elements:[{name:`ReactElement`},{name:`string`},{name:`null`}]}}},description:`Custom renderer for the fourth text line.

When provided, this overrides the default rendering for line 4 and is called with a
{@link PersonLineRenderContext}. The \`text\` property in the context contains the value that
would have been shown based on \`line4Property\`, if any.`},fetchImage:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}}},composes:[`PersonaProps`]}})),j=t((()=>{A()})),M,N,P,F,I,L,R,z,B,V,H,U,W,G,K;t((()=>{r(),j(),l(),c(),M=e(n()),N={title:`Components/Person`,component:k,parameters:{layout:`centered`,docs:{description:{component:`Display a person with avatar, text lines, and presence by composing Fluent UI Persona with Microsoft Graph data.

Story organization follows Fluent Persona docs, while Graph-specific stories focus on:
- identity resolution (userId / userPrincipalName / email)
- direct data mode (personDetails)
- Graph photo fetching and initials fallback
- Graph presence mapping through showPresence
- MGT-style line property mapping and render overrides`}}},tags:[`autodocs`],decorators:[e=>(0,M.jsx)(o,{provider:new u({autoSignIn:!0}),children:(0,M.jsx)(e,{})})],argTypes:{view:{control:`select`,options:[`avatar`,`oneline`,`twolines`,`threelines`,`fourlines`],description:`Display mode for the person component`,table:{defaultValue:{summary:`oneline`}}},size:{control:`select`,options:[`extra-small`,`small`,`medium`,`large`,`extra-large`,`huge`],description:`Fluent UI Persona size token`,table:{defaultValue:{summary:`medium`}}},textAlignment:{control:`radio`,options:[`start`,`center`],description:`Horizontal alignment of the text`,table:{defaultValue:{summary:`start`}}},textPosition:{control:`radio`,options:[`before`,`after`,`below`],description:`Position of text relative to avatar`,table:{defaultValue:{summary:`after`}}},showPresence:{control:`boolean`,description:`Show presence badge on avatar`,table:{defaultValue:{summary:`false`}}},presenceOnly:{control:`boolean`,description:`Render PresenceBadge only instead of avatar`,table:{defaultValue:{summary:`false`}}},fetchImage:{control:`boolean`,description:`Fetch user photo from Microsoft Graph`,table:{defaultValue:{summary:`true`}}},userId:{control:`text`,description:`User ID to fetch from Microsoft Graph`},userPrincipalName:{control:`text`,description:`User Principal Name (UPN) to fetch from Microsoft Graph`},email:{control:`text`,description:`Email used as identity fallback to fetch from Microsoft Graph`},personDetails:{control:`object`,description:`Provide person details directly. Graph user data may still be fetched when identifiers (id/UPN/email) are present or required.`},line1Property:{control:`text`,description:`MGT-style property name for line 1. Supports comma-separated fallbacks.`},line2Property:{control:`text`,description:`MGT-style property name for line 2. Supports comma-separated fallbacks.`},line3Property:{control:`text`,description:`MGT-style property name for line 3. Supports comma-separated fallbacks.`},line4Property:{control:`text`,description:`MGT-style property name for line 4. Supports comma-separated fallbacks.`},renderLine1:{control:!1,description:`React render callback for line 1.`},renderLine2:{control:!1,description:`React render callback for line 2.`},renderLine3:{control:!1,description:`React render callback for line 3.`},renderLine4:{control:!1,description:`React render callback for line 4.`}}},P={name:`Default`,args:{userId:`test-user`,view:`oneline`,showPresence:!1,size:`medium`,fetchImage:!0}},F={name:`Avatar Only`,args:{personDetails:{displayName:`Adele Vance`,jobTitle:`Program Manager`,department:`Product`},view:`avatar`,size:`large`,fetchImage:!1,showPresence:!1}},I={name:`Lines`,render:e=>(0,M.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,M.jsx)(k,{...e,view:`avatar`}),(0,M.jsx)(k,{...e,view:`oneline`}),(0,M.jsx)(k,{...e,view:`twolines`}),(0,M.jsx)(k,{...e,view:`threelines`}),(0,M.jsx)(k,{...e,view:`fourlines`})]}),args:{userId:`test-user`,size:`medium`,showPresence:!1}},L={name:`Size`,render:e=>(0,M.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,M.jsx)(k,{...e,size:`extra-small`}),(0,M.jsx)(k,{...e,size:`small`}),(0,M.jsx)(k,{...e,size:`medium`}),(0,M.jsx)(k,{...e,size:`large`}),(0,M.jsx)(k,{...e,size:`extra-large`}),(0,M.jsx)(k,{...e,size:`huge`})]}),args:{userId:`test-user`,view:`twolines`,showPresence:!0,size:`medium`}},R={name:`Text Alignment`,render:e=>(0,M.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,M.jsx)(k,{...e,textAlignment:`start`}),(0,M.jsx)(k,{...e,textAlignment:`center`})]}),args:{userId:`test-user`,view:`threelines`,showPresence:!0,size:`large`}},z={name:`Text Position`,render:e=>(0,M.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,M.jsx)(k,{...e,textPosition:`after`}),(0,M.jsx)(k,{...e,textPosition:`before`}),(0,M.jsx)(k,{...e,textPosition:`below`,textAlignment:`center`})]}),args:{userId:`test-user`,view:`twolines`,showPresence:!0,size:`medium`}},B={name:`Presence`,render:e=>(0,M.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,M.jsx)(k,{...e,showPresence:!0}),(0,M.jsx)(k,{...e,showPresence:!0,presenceOnly:!0})]}),args:{userId:`test-user`,view:`twolines`,size:`large`}},V={name:`Graph: Direct Data`,args:{personDetails:{displayName:`John Doe`,jobTitle:`Software Engineer`,department:`Engineering`,officeLocation:`Redmond`,mail:`john.doe@contoso.com`},view:`fourlines`,size:`medium`,showPresence:!1}},H={name:`Graph: Line Properties`,args:{userId:`test-user`,view:`threelines`,line1Property:`displayName`,line2Property:`mail,userPrincipalName`,line3Property:`presenceAvailability`,size:`medium`}},U={name:`Graph: Rendered Lines`,args:{personDetails:{displayName:`Megan Bowen`,jobTitle:`CEO`,department:`Leadership`,officeLocation:`Seattle`},view:`fourlines`,renderLine1:({text:e})=>(0,M.jsxs)(`span`,{children:[`Name: `,e]}),renderLine2:({text:e})=>(0,M.jsxs)(`span`,{children:[`Role: `,e]}),renderLine3:({text:e})=>(0,M.jsxs)(`span`,{children:[`Org: `,e]}),renderLine4:({text:e})=>(0,M.jsxs)(`span`,{children:[`Location: `,e]}),size:`medium`}},W={name:`Graph: Image Fallback`,args:{userId:`test-user`,view:`twolines`,size:`medium`,fetchImage:!1}},G={name:`Graph: Loading State`,decorators:[e=>(0,M.jsx)(o,{provider:new u({autoSignIn:!1}),children:(0,M.jsx)(e,{})})],args:{userId:`test-user`,view:`twolines`,size:`medium`}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  name: 'Default',
  args: {
    userId: 'test-user',
    view: 'oneline',
    showPresence: false,
    size: 'medium',
    fetchImage: true
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
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
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
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
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
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
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
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
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
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
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
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
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
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
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  name: 'Graph: Line Properties',
  args: {
    userId: 'test-user',
    view: 'threelines',
    line1Property: 'displayName',
    line2Property: 'mail,userPrincipalName',
    line3Property: 'presenceAvailability',
    size: 'medium'
  }
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
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
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  name: 'Graph: Image Fallback',
  args: {
    userId: 'test-user',
    view: 'twolines',
    size: 'medium',
    fetchImage: false
  }
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
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
}`,...G.parameters?.docs?.source}}},K=[`Default`,`AvatarOnly`,`Lines`,`Size`,`TextAlignment`,`TextPosition`,`Presence`,`GraphDirectData`,`GraphLineProperties`,`GraphRenderedLines`,`GraphImageFallback`,`GraphLoadingState`]}))();export{F as AvatarOnly,P as Default,V as GraphDirectData,W as GraphImageFallback,H as GraphLineProperties,G as GraphLoadingState,U as GraphRenderedLines,I as Lines,B as Presence,L as Size,R as TextAlignment,z as TextPosition,K as __namedExportsOrder,N as default};