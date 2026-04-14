import{a as e,n as t}from"./chunk-BneVvdWh.js";import{E as n,lt as r}from"./iframe-HiCMiQIQ.js";import{f as i,n as a,p as o,t as s}from"./MockProvider-DyX2QG8-.js";import{n as c,t as l}from"./Person-B88DKfd0.js";var u,d,f,p,m,h,g,_,v,y,b,x,S,C,w,T;t((()=>{r(),l(),o(),a(),u=e(n()),{fn:d}=__STORYBOOK_MODULE_TEST__,f={title:`Components/Person`,component:c,parameters:{layout:`centered`,docs:{description:{component:`Display a person with avatar, text lines, and presence by composing Fluent UI Persona with Microsoft Graph data.

Story organization follows Fluent Persona docs, while Graph-specific stories focus on:
- identity resolution (userId / userPrincipalName / email)
- direct data mode (personDetails)
- Graph photo fetching and initials fallback
- Graph presence mapping through showPresence
- MGT-style line property mapping and render overrides`}}},tags:[`autodocs`],decorators:[e=>(0,u.jsx)(i,{provider:new s({autoSignIn:!0}),children:(0,u.jsx)(e,{})})],args:{onUpdated:d()},argTypes:{view:{control:`select`,options:[`avatar`,`oneline`,`twolines`,`threelines`,`fourlines`],description:`Display mode for the person component`,table:{defaultValue:{summary:`oneline`}}},size:{control:`select`,options:[`extra-small`,`small`,`medium`,`large`,`extra-large`,`huge`],description:`Fluent UI Persona size token`,table:{defaultValue:{summary:`medium`}}},textAlignment:{control:`radio`,options:[`start`,`center`],description:`Horizontal alignment of the text`,table:{defaultValue:{summary:`start`}}},textPosition:{control:`radio`,options:[`before`,`after`,`below`],description:`Position of text relative to avatar`,table:{defaultValue:{summary:`after`}}},showPresence:{control:`boolean`,description:`Show presence badge on avatar`,table:{defaultValue:{summary:`false`}}},presenceOnly:{control:`boolean`,description:`Render PresenceBadge only instead of avatar`,table:{defaultValue:{summary:`false`}}},fetchImage:{control:`boolean`,description:`Fetch user photo from Microsoft Graph`,table:{defaultValue:{summary:`true`}}},userId:{control:`text`,description:`User ID to fetch from Microsoft Graph`},userPrincipalName:{control:`text`,description:`User Principal Name (UPN) to fetch from Microsoft Graph`},email:{control:`text`,description:`Email used as identity fallback to fetch from Microsoft Graph`},personDetails:{control:`object`,description:`Provide person details directly. Graph user data may still be fetched when identifiers (id/UPN/email) are present or required.`},line1Property:{control:`text`,description:`MGT-style property name for line 1. Supports comma-separated fallbacks.`},line2Property:{control:`text`,description:`MGT-style property name for line 2. Supports comma-separated fallbacks.`},line3Property:{control:`text`,description:`MGT-style property name for line 3. Supports comma-separated fallbacks.`},line4Property:{control:`text`,description:`MGT-style property name for line 4. Supports comma-separated fallbacks.`},renderLine1:{control:!1,description:`React render callback for line 1.`},renderLine2:{control:!1,description:`React render callback for line 2.`},renderLine3:{control:!1,description:`React render callback for line 3.`},renderLine4:{control:!1,description:`React render callback for line 4.`}}},p={name:`Default`,args:{userId:`test-user`,view:`oneline`,showPresence:!1,size:`medium`,fetchImage:!0}},m={name:`Avatar Only`,args:{personDetails:{displayName:`Adele Vance`,jobTitle:`Program Manager`,department:`Product`},view:`avatar`,size:`large`,fetchImage:!1,showPresence:!1}},h={name:`Lines`,render:e=>(0,u.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,u.jsx)(c,{...e,view:`avatar`}),(0,u.jsx)(c,{...e,view:`oneline`}),(0,u.jsx)(c,{...e,view:`twolines`}),(0,u.jsx)(c,{...e,view:`threelines`}),(0,u.jsx)(c,{...e,view:`fourlines`})]}),args:{userId:`test-user`,size:`medium`,showPresence:!1}},g={name:`Size`,render:e=>(0,u.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,u.jsx)(c,{...e,size:`extra-small`}),(0,u.jsx)(c,{...e,size:`small`}),(0,u.jsx)(c,{...e,size:`medium`}),(0,u.jsx)(c,{...e,size:`large`}),(0,u.jsx)(c,{...e,size:`extra-large`}),(0,u.jsx)(c,{...e,size:`huge`})]}),args:{userId:`test-user`,view:`twolines`,showPresence:!0,size:`medium`}},_={name:`Text Alignment`,render:e=>(0,u.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,u.jsx)(c,{...e,textAlignment:`start`}),(0,u.jsx)(c,{...e,textAlignment:`center`})]}),args:{userId:`test-user`,view:`threelines`,showPresence:!0,size:`large`}},v={name:`Text Position`,render:e=>(0,u.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,u.jsx)(c,{...e,textPosition:`after`}),(0,u.jsx)(c,{...e,textPosition:`before`}),(0,u.jsx)(c,{...e,textPosition:`below`,textAlignment:`center`})]}),args:{userId:`test-user`,view:`twolines`,showPresence:!0,size:`medium`}},y={name:`Presence`,render:e=>(0,u.jsxs)(`div`,{style:{display:`grid`,gap:12},children:[(0,u.jsx)(c,{...e,showPresence:!0}),(0,u.jsx)(c,{...e,showPresence:!0,presenceOnly:!0})]}),args:{userId:`test-user`,view:`twolines`,size:`large`}},b={name:`Graph: Direct Data`,args:{personDetails:{displayName:`John Doe`,jobTitle:`Software Engineer`,department:`Engineering`,officeLocation:`Redmond`,mail:`john.doe@contoso.com`},view:`fourlines`,size:`medium`,showPresence:!1}},x={name:`Graph: Line Properties`,args:{userId:`test-user`,view:`threelines`,line1Property:`displayName`,line2Property:`mail,userPrincipalName`,line3Property:`presenceAvailability`,size:`medium`}},S={name:`Graph: Rendered Lines`,args:{personDetails:{displayName:`Megan Bowen`,jobTitle:`CEO`,department:`Leadership`,officeLocation:`Seattle`},view:`fourlines`,renderLine1:({text:e})=>(0,u.jsxs)(`span`,{children:[`Name: `,e]}),renderLine2:({text:e})=>(0,u.jsxs)(`span`,{children:[`Role: `,e]}),renderLine3:({text:e})=>(0,u.jsxs)(`span`,{children:[`Org: `,e]}),renderLine4:({text:e})=>(0,u.jsxs)(`span`,{children:[`Location: `,e]}),size:`medium`}},C={name:`Graph: Image Fallback`,args:{userId:`test-user`,view:`twolines`,size:`medium`,fetchImage:!1}},w={name:`Graph: Loading State`,decorators:[e=>(0,u.jsx)(i,{provider:new s({autoSignIn:!1}),children:(0,u.jsx)(e,{})})],args:{userId:`test-user`,view:`twolines`,size:`medium`}},p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Default',
  args: {
    userId: 'test-user',
    view: 'oneline',
    showPresence: false,
    size: 'medium',
    fetchImage: true
  }
}`,...p.parameters?.docs?.source}}},m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
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
}`,...m.parameters?.docs?.source}}},h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
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
}`,...h.parameters?.docs?.source}}},g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
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
}`,...g.parameters?.docs?.source}}},_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
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
}`,..._.parameters?.docs?.source}}},v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
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
}`,...v.parameters?.docs?.source}}},y.parameters={...y.parameters,docs:{...y.parameters?.docs,source:{originalSource:`{
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
}`,...y.parameters?.docs?.source}}},b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
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
}`,...b.parameters?.docs?.source}}},x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  name: 'Graph: Line Properties',
  args: {
    userId: 'test-user',
    view: 'threelines',
    line1Property: 'displayName',
    line2Property: 'mail,userPrincipalName',
    line3Property: 'presenceAvailability',
    size: 'medium'
  }
}`,...x.parameters?.docs?.source}}},S.parameters={...S.parameters,docs:{...S.parameters?.docs,source:{originalSource:`{
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
}`,...S.parameters?.docs?.source}}},C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  name: 'Graph: Image Fallback',
  args: {
    userId: 'test-user',
    view: 'twolines',
    size: 'medium',
    fetchImage: false
  }
}`,...C.parameters?.docs?.source}}},w.parameters={...w.parameters,docs:{...w.parameters?.docs,source:{originalSource:`{
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
}`,...w.parameters?.docs?.source}}},T=[`Default`,`AvatarOnly`,`Lines`,`Size`,`TextAlignment`,`TextPosition`,`Presence`,`GraphDirectData`,`GraphLineProperties`,`GraphRenderedLines`,`GraphImageFallback`,`GraphLoadingState`]}))();export{m as AvatarOnly,p as Default,b as GraphDirectData,C as GraphImageFallback,x as GraphLineProperties,w as GraphLoadingState,S as GraphRenderedLines,h as Lines,y as Presence,g as Size,_ as TextAlignment,v as TextPosition,T as __namedExportsOrder,f as default};