import{a as e,n as t}from"./chunk-BneVvdWh.js";import{C as n,ot as r,p as i,t as a}from"./iframe-BpVdGDQQ.js";import{f as o,l as s,n as c,p as l,t as u,u as d}from"./MockProvider-Z5JMKjlZ.js";import{n as f,t as p}from"./usePersonData-CN-XxAiK.js";var m,h,g,_,v,y,b,x,S,C,w,T,E,D,O,k,A,j=t((()=>{m=e(r()),a(),p(),d(),h=e(n()),g=e=>{switch(e?.toLowerCase()){case`available`:case`availableidle`:return`available`;case`away`:case`berightback`:return`away`;case`busy`:case`busyidle`:case`donotdisturb`:return`busy`;default:return`offline`}},_={avatar:[void 0,void 0,void 0,void 0],oneline:[`displayName`,void 0,void 0,void 0],twolines:[`displayName`,`jobTitle`,void 0,void 0],threelines:[`displayName`,`jobTitle`,`department`,void 0],fourlines:[`displayName`,`jobTitle`,`department`,`officeLocation,mail`]},v=new Set([`presenceActivity`,`presenceAvailability`]),y=new Set([`email`,...v]),b=e=>e?.split(`,`).map(e=>e.trim()).filter(Boolean)??[],x=e=>{if(e!=null){if(typeof e==`string`)return e||void 0;if(typeof e==`number`||typeof e==`boolean`)return String(e);if(Array.isArray(e)){let t=e.map(e=>x(e)).filter(e=>!!e);return t.length>0?t.join(`, `):void 0}}},S=e=>x(e.mail)??x(e.email)??x(e.userPrincipalName),C=(e,t)=>{let n=b(t);for(let t of n)switch(t){case`mail`:case`email`:{let t=S(e);if(t)return t;break}default:{let n=x(e[t]);if(n)return n}}},w=(e,t,n)=>({line:e,person:t,text:n}),T=(e,t,n,r)=>r?r(w(e,t,n)):n,E=(e,t,n)=>n??_[e][t-1],D=e=>{switch(e){case`avatar`:return 0;case`oneline`:return 1;case`twolines`:return 2;case`threelines`:return 3;default:return 4}},O=(e,t)=>t<=D(e),k=e=>[...new Set(e.flatMap(e=>b(e)))].filter(e=>!y.has(e)),A=({userId:e,userPrincipalName:t,email:n,personDetails:r,view:a=`oneline`,showPresence:o=!1,line1Property:c,line2Property:l,line3Property:u,line4Property:d,renderLine1:p,renderLine2:_,renderLine3:y,renderLine4:S,fetchImage:w=!0,onUpdated:D,...A})=>{let j=a===`avatar`,M=O(a,1)?E(a,1,c):void 0,N=O(a,2)?E(a,2,l):void 0,P=O(a,3)?E(a,3,u):void 0,F=O(a,4)?E(a,4,d):void 0,I=[M,N,P,F].some(e=>b(e).some(e=>v.has(e))),{user:L,presence:R,photoUrl:z,loading:B,error:V}=f({userId:r?void 0:e||t||n,fetchPresence:o||I,fetchPhoto:w,selectFields:k([M,N,P,F])}),H=r||L,U=H||null,W=(0,m.useMemo)(()=>U?{...U,email:n??x(U.email),presenceActivity:R?.activity??x(U.presenceActivity),presenceAvailability:R?.availability??x(U.presenceAvailability)}:null,[n,R?.activity,R?.availability,U]);if((0,m.useEffect)(()=>{if(!(!D||B)){if(r&&W){D({trigger:`personDetailsChanged`,person:W,loading:!1,error:V});return}if(V){D({trigger:`personLoadFailed`,person:null,loading:!1,error:V});return}W&&D({trigger:`personLoaded`,person:W,loading:!1,error:null})}},[V,B,D,r,W]),B)return(0,h.jsx)(i,{...A,name:j?void 0:A.name??`Loading...`,primaryText:j?void 0:A.primaryText,secondaryText:j?void 0:A.secondaryText,tertiaryText:j?void 0:A.tertiaryText,quaternaryText:j?void 0:A.quaternaryText});if(!H)return null;let G=W??U,K=H.displayName||`Unknown User`,q=s(K),J=C(G,M),Y=C(G,N),X=C(G,P),Z=C(G,F),Q=O(a,1)?M&&J!==K||p?T(1,G,J,p):A.primaryText:void 0,$=O(a,2)?T(2,G,Y,_):void 0,ee=O(a,3)?T(3,G,X,y):void 0,te=O(a,4)?T(4,G,Z,S):void 0,ne=o&&R?{status:g(R.availability)}:void 0,re=A.presence??ne,ie=A.avatar??{image:z?{src:z}:void 0,initials:z?void 0:q,name:K},ae=j?void 0:A.name??K,oe=j?void 0:A.primaryText??Q,se=j?void 0:A.secondaryText??$,ce=j?void 0:A.tertiaryText??ee,le=j?void 0:A.quaternaryText??te;return(0,h.jsx)(i,{...A,name:ae,primaryText:oe,avatar:ie,presence:re,secondaryText:se,tertiaryText:ce,quaternaryText:le})},A.__docgenInfo={description:``,methods:[],displayName:`Person`,props:{userId:{required:!1,tsType:{name:`string`},description:``},userPrincipalName:{required:!1,tsType:{name:`string`},description:``},email:{required:!1,tsType:{name:`string`},description:``},personDetails:{required:!1,tsType:{name:`PersonDetails`},description:``},view:{required:!1,tsType:{name:`union`,raw:`'avatar' | 'oneline' | 'twolines' | 'threelines' | 'fourlines'`,elements:[{name:`literal`,value:`'avatar'`},{name:`literal`,value:`'oneline'`},{name:`literal`,value:`'twolines'`},{name:`literal`,value:`'threelines'`},{name:`literal`,value:`'fourlines'`}]},description:``,defaultValue:{value:`'oneline'`,computed:!1}},showPresence:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`false`,computed:!1}},line1Property:{required:!1,tsType:{name:`string`},description:`Mapping for the first text line.

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
would have been shown based on \`line4Property\`, if any.`},onUpdated:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(event: PersonUpdatedEvent) => void`,signature:{arguments:[{type:{name:`PersonUpdatedEvent`},name:`event`}],return:{name:`void`}}},description:`Called after the component updates its resolved person state.

Use this to react to direct \`personDetails\` changes, successful data loads, or failed loads.

@param event - Details about the update trigger and the current resolved person state.`},fetchImage:{required:!1,tsType:{name:`boolean`},description:``,defaultValue:{value:`true`,computed:!1}}},composes:[`PersonaProps`]}})),M=t((()=>{j()})),N,P,F,I,L,R,z,B,V,H,U,W,G,K,q;t((()=>{r(),M(),l(),c(),N=e(n()),P={title:`Components/Person`,component:A,parameters:{layout:`centered`,docs:{description:{component:`Display a person with avatar, text lines, and presence by composing Fluent UI Persona with Microsoft Graph data.

Story organization follows Fluent Persona docs, while Graph-specific stories focus on:
- identity resolution (userId / userPrincipalName / email)
- direct data mode (personDetails)
- Graph photo fetching and initials fallback
- Graph presence mapping through showPresence
- MGT-style line property mapping and render overrides`}}},tags:[`autodocs`],decorators:[e=>(0,N.jsx)(o,{provider:new u({autoSignIn:!0}),children:(0,N.jsx)(e,{})})],argTypes:{view:{control:`select`,options:[`avatar`,`oneline`,`twolines`,`threelines`,`fourlines`],description:`Display mode for the person component`,table:{defaultValue:{summary:`oneline`}}},size:{control:`select`,options:[`extra-small`,`small`,`medium`,`large`,`extra-large`,`huge`],description:`Fluent UI Persona size token`,table:{defaultValue:{summary:`medium`}}},textAlignment:{control:`radio`,options:[`start`,`center`],description:`Horizontal alignment of the text`,table:{defaultValue:{summary:`start`}}},textPosition:{control:`radio`,options:[`before`,`after`,`below`],description:`Position of text relative to avatar`,table:{defaultValue:{summary:`after`}}},showPresence:{control:`boolean`,description:`Show presence badge on avatar`,table:{defaultValue:{summary:`false`}}},presenceOnly:{control:`boolean`,description:`Render PresenceBadge only instead of avatar`,table:{defaultValue:{summary:`false`}}},fetchImage:{control:`boolean`,description:`Fetch user photo from Microsoft Graph`,table:{defaultValue:{summary:`true`}}},userId:{control:`text`,description:`User ID to fetch from Microsoft Graph`},userPrincipalName:{control:`text`,description:`User Principal Name (UPN) to fetch from Microsoft Graph`},email:{control:`text`,description:`Email used as identity fallback to fetch from Microsoft Graph`},personDetails:{control:`object`,description:`Provide person details directly. Graph user data may still be fetched when identifiers (id/UPN/email) are present or required.`},line1Property:{control:`text`,description:`MGT-style property name for line 1. Supports comma-separated fallbacks.`},line2Property:{control:`text`,description:`MGT-style property name for line 2. Supports comma-separated fallbacks.`},line3Property:{control:`text`,description:`MGT-style property name for line 3. Supports comma-separated fallbacks.`},line4Property:{control:`text`,description:`MGT-style property name for line 4. Supports comma-separated fallbacks.`},renderLine1:{control:!1,description:`React render callback for line 1.`},renderLine2:{control:!1,description:`React render callback for line 2.`},renderLine3:{control:!1,description:`React render callback for line 3.`},renderLine4:{control:!1,description:`React render callback for line 4.`}}},F={name:`Default`,args:{userId:`test-user`,view:`oneline`,showPresence:!1,size:`medium`,fetchImage:!0}},I={name:`Avatar Only`,args:{personDetails:{displayName:`Adele Vance`,jobTitle:`Program Manager`,department:`Product`},view:`avatar`,size:`large`,fetchImage:!1,showPresence:!1}},L={name:`Lines`,render:e=>(0,N.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,N.jsx)(A,{...e,view:`avatar`}),(0,N.jsx)(A,{...e,view:`oneline`}),(0,N.jsx)(A,{...e,view:`twolines`}),(0,N.jsx)(A,{...e,view:`threelines`}),(0,N.jsx)(A,{...e,view:`fourlines`})]}),args:{userId:`test-user`,size:`medium`,showPresence:!1}},R={name:`Size`,render:e=>(0,N.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,N.jsx)(A,{...e,size:`extra-small`}),(0,N.jsx)(A,{...e,size:`small`}),(0,N.jsx)(A,{...e,size:`medium`}),(0,N.jsx)(A,{...e,size:`large`}),(0,N.jsx)(A,{...e,size:`extra-large`}),(0,N.jsx)(A,{...e,size:`huge`})]}),args:{userId:`test-user`,view:`twolines`,showPresence:!0,size:`medium`}},z={name:`Text Alignment`,render:e=>(0,N.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,N.jsx)(A,{...e,textAlignment:`start`}),(0,N.jsx)(A,{...e,textAlignment:`center`})]}),args:{userId:`test-user`,view:`threelines`,showPresence:!0,size:`large`}},B={name:`Text Position`,render:e=>(0,N.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,N.jsx)(A,{...e,textPosition:`after`}),(0,N.jsx)(A,{...e,textPosition:`before`}),(0,N.jsx)(A,{...e,textPosition:`below`,textAlignment:`center`})]}),args:{userId:`test-user`,view:`twolines`,showPresence:!0,size:`medium`}},V={name:`Presence`,render:e=>(0,N.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,N.jsx)(A,{...e,showPresence:!0}),(0,N.jsx)(A,{...e,showPresence:!0,presenceOnly:!0})]}),args:{userId:`test-user`,view:`twolines`,size:`large`}},H={name:`Graph: Direct Data`,args:{personDetails:{displayName:`John Doe`,jobTitle:`Software Engineer`,department:`Engineering`,officeLocation:`Redmond`,mail:`john.doe@contoso.com`},view:`fourlines`,size:`medium`,showPresence:!1}},U={name:`Graph: Line Properties`,args:{userId:`test-user`,view:`threelines`,line1Property:`displayName`,line2Property:`mail,userPrincipalName`,line3Property:`presenceAvailability`,size:`medium`}},W={name:`Graph: Rendered Lines`,args:{personDetails:{displayName:`Megan Bowen`,jobTitle:`CEO`,department:`Leadership`,officeLocation:`Seattle`},view:`fourlines`,renderLine1:({text:e})=>(0,N.jsxs)(`span`,{children:[`Name: `,e]}),renderLine2:({text:e})=>(0,N.jsxs)(`span`,{children:[`Role: `,e]}),renderLine3:({text:e})=>(0,N.jsxs)(`span`,{children:[`Org: `,e]}),renderLine4:({text:e})=>(0,N.jsxs)(`span`,{children:[`Location: `,e]}),size:`medium`}},G={name:`Graph: Image Fallback`,args:{userId:`test-user`,view:`twolines`,size:`medium`,fetchImage:!1}},K={name:`Graph: Loading State`,decorators:[e=>(0,N.jsx)(o,{provider:new u({autoSignIn:!1}),children:(0,N.jsx)(e,{})})],args:{userId:`test-user`,view:`twolines`,size:`medium`}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  name: 'Default',
  args: {
    userId: 'test-user',
    view: 'oneline',
    showPresence: false,
    size: 'medium',
    fetchImage: true
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
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
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
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
}`,...L.parameters?.docs?.source}}},R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
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
}`,...R.parameters?.docs?.source}}},z.parameters={...z.parameters,docs:{...z.parameters?.docs,source:{originalSource:`{
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
}`,...z.parameters?.docs?.source}}},B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
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
}`,...B.parameters?.docs?.source}}},V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
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
}`,...V.parameters?.docs?.source}}},H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
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
}`,...H.parameters?.docs?.source}}},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  name: 'Graph: Line Properties',
  args: {
    userId: 'test-user',
    view: 'threelines',
    line1Property: 'displayName',
    line2Property: 'mail,userPrincipalName',
    line3Property: 'presenceAvailability',
    size: 'medium'
  }
}`,...U.parameters?.docs?.source}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
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
}`,...W.parameters?.docs?.source}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  name: 'Graph: Image Fallback',
  args: {
    userId: 'test-user',
    view: 'twolines',
    size: 'medium',
    fetchImage: false
  }
}`,...G.parameters?.docs?.source}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
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
}`,...K.parameters?.docs?.source}}},q=[`Default`,`AvatarOnly`,`Lines`,`Size`,`TextAlignment`,`TextPosition`,`Presence`,`GraphDirectData`,`GraphLineProperties`,`GraphRenderedLines`,`GraphImageFallback`,`GraphLoadingState`]}))();export{I as AvatarOnly,F as Default,H as GraphDirectData,G as GraphImageFallback,U as GraphLineProperties,K as GraphLoadingState,W as GraphRenderedLines,L as Lines,V as Presence,R as Size,z as TextAlignment,B as TextPosition,q as __namedExportsOrder,P as default};