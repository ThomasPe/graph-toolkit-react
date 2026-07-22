import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{E as n,F as r,L as i,P as a,T as o,b as s,m as c,p as l,t as u,xt as d}from"./iframe-C_5lxIV-.js";import{f,l as p,n as m,p as h,t as g,u as _}from"./MockProvider-C0tTYOd1.js";import{n as v,t as y}from"./usePeopleList-CJ5YdYgB.js";var b,x,S,C,w,T,E,D,O=t((()=>{b=e(d()),u(),y(),_(),x=e(i()),S=3,C=10,w=e=>{switch(e?.toLowerCase()){case`available`:case`availableidle`:return`available`;case`away`:case`berightback`:return`away`;case`busy`:case`busyidle`:case`donotdisturb`:return`busy`;case`offline`:case`presenceunknown`:return`offline`;default:return}},T=e=>e.displayName??e.mail??e.userPrincipalName??e.id,E=e=>{let t=T(e),n=w(e.presenceAvailability);return(0,x.jsx)(o,{name:t,avatar:{name:t,image:e.photoUrl?{src:e.photoUrl}:void 0,initials:e.photoUrl?void 0:p({...e,displayName:t})||void 0,badge:n?{status:n}:void 0,color:`colorful`}},e.id)},D=({people:e,userIds:t,selectFields:r,sortBy:i,sortDirection:a,groupId:o,showMax:l=S,showPresence:u=!1,layout:d=`stack`,size:f=32,onUpdated:p,...m})=>{let{people:h,loading:g,error:_}=v({people:e,userIds:t,selectFields:r,sortBy:i,sortDirection:a,groupId:o,maxPeople:Math.max(C,l+5),showPresence:u});if((0,b.useEffect)(()=>{if(!p||g)return;let t=`peopleLoaded`;_?t=`peopleLoadFailed`:e&&(t=`peopleChanged`),p({trigger:t,people:h,loading:!1,error:_})},[_,g,p,e,h]),g)return(0,x.jsx)(c,{size:`tiny`});if(h.length===0)return null;let y=Math.max(0,l),w=h.slice(0,y),T=h.slice(y);return(0,x.jsxs)(n,{layout:d,size:f,...m,children:[w.map(E),T.length>0&&(0,x.jsx)(s,{count:T.length,children:T.map(E)})]})},D.__docgenInfo={description:"`People` renders a compact avatar strip similar to the MGT `mgt-people` control.\n\nThe component can render a supplied list of people, resolve a list of `userIds`, load\ngroup members, or default to tenant directory users from `/users`.\n\n@param props - Avatar group configuration and people-loading options\n@returns A compact avatar group, a loading spinner, or `null` when no people are available",methods:[],displayName:`People`,props:{people:{required:!1,tsType:{name:`Array`,elements:[{name:`intersection`,raw:`PersonDetails & PeopleSearchResult`,elements:[{name:`PersonDetails`},{name:`PeopleSearchResult`}]}],raw:`PeoplePerson[]`},description:`A pre-resolved list of people to render.

When provided, the component skips list discovery and renders these people directly.`},userIds:{required:!1,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:`A list of user identifiers to resolve and render.

Values can be Microsoft Graph user IDs, UPNs, email addresses, or \`"me"\`.`},selectFields:{required:!1,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:`Additional Graph user fields to request when the component resolves people.`},sortBy:{required:!1,tsType:{name:`union`,raw:`'displayName' | 'givenName' | 'surname'`,elements:[{name:`literal`,value:`'displayName'`},{name:`literal`,value:`'givenName'`},{name:`literal`,value:`'surname'`}]},description:`Field used to sort the resolved people collection.`},sortDirection:{required:!1,tsType:{name:`union`,raw:`'asc' | 'desc'`,elements:[{name:`literal`,value:`'asc'`},{name:`literal`,value:`'desc'`}]},description:`Direction used when {@link PeopleProps.sortBy} is provided.

Defaults to \`asc\`.`},groupId:{required:!1,tsType:{name:`string`},description:`The ID of a Microsoft Entra ID group whose direct user members should be rendered.`},showMax:{required:!1,tsType:{name:`number`},description:"Maximum number of visible avatars before the remaining people are shown in overflow.\n\nDefaults to `3`, matching the MGT `mgt-people` control.",defaultValue:{value:`3`,computed:!1}},showPresence:{required:!1,tsType:{name:`boolean`},description:`Whether presence badges should be shown on each avatar.

Presence is loaded when the active provider and granted scopes support it.`,defaultValue:{value:`false`,computed:!1}},onUpdated:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(event: PeopleUpdatedEvent) => void`,signature:{arguments:[{type:{name:`PeopleUpdatedEvent`},name:`event`}],return:{name:`void`}}},description:`Called after the component updates its resolved people collection.

Use this to react to direct \`people\` changes, successful list loads, or failed loads.

@param event - Details about the update trigger and the current resolved people state.`},layout:{defaultValue:{value:`'stack'`,computed:!1},required:!1},size:{defaultValue:{value:`32`,computed:!1},required:!1}},composes:[`Omit`]}})),k=t((()=>{O()})),A,j,M,N,P,F,I,L,R;t((()=>{d(),u(),k(),h(),m(),A=e(i()),{fn:j}=__STORYBOOK_MODULE_TEST__,M=new g({autoSignIn:!0}),N={title:`Components/People`,component:D,parameters:{layout:`centered`,docs:{description:{component:"Display a compact avatar strip similar to MGT `mgt-people` using Fluent UI `AvatarGroup`.\n\nThe component can render a supplied list of people, resolve specific `userIds`, load a group's direct members, or default to the current user's people suggestions."}}},tags:[`autodocs`],decorators:[e=>(0,A.jsx)(a,{theme:r,children:(0,A.jsx)(f,{provider:M,children:(0,A.jsx)(`div`,{style:{display:`grid`,gap:16},children:(0,A.jsx)(e,{})})})})],args:{onUpdated:j()},argTypes:{showMax:{control:{type:`number`,min:0,max:10},description:`Maximum number of visible avatars before overflow is shown.`},showPresence:{control:`boolean`,description:`Show presence badges on each avatar when available.`},layout:{control:`radio`,options:[`spread`,`stack`,`pie`],description:`Fluent UI AvatarGroup layout.`},size:{control:`select`,options:[16,20,24,28,32,36,40,48,56,64,72,96,120,128],description:`Avatar size in pixels.`}}},P={args:{showMax:3,layout:`stack`,size:32}},F={args:{showMax:4,layout:`stack`,size:40,showPresence:!0}},I={args:{userIds:[`00000000-0000-0000-0000-000000000001`,`00000000-0000-0000-0000-000000000002`,`00000000-0000-0000-0000-000000000003`,`00000000-0000-0000-0000-000000000010`],showMax:3,layout:`stack`,size:32}},L={render:e=>(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(D,{...e,people:[{id:`adele`,displayName:`Adele Vance`,mail:`adelev@contoso.com`,jobTitle:`Product Manager`},{id:`alex`,displayName:`Alex Wilber`,mail:`alexw@contoso.com`,jobTitle:`Marketing Assistant`},{id:`megan`,displayName:`Megan Bowen`,mail:`meganb@contoso.com`,jobTitle:`Marketing Manager`},{id:`lee`,displayName:`Lee Gu`,mail:`leeg@contoso.com`,jobTitle:`Director`}]}),(0,A.jsx)(l,{size:200,children:`Rendering supplied people skips list discovery and still uses overflow.`})]}),args:{showMax:2,layout:`stack`,size:32}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    showMax: 3,
    layout: 'stack',
    size: 32
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    showMax: 4,
    layout: 'stack',
    size: 40,
    showPresence: true
  }
}`,...F.parameters?.docs?.source}}},I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    userIds: ['00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000010'],
    showMax: 3,
    layout: 'stack',
    size: 32
  }
}`,...I.parameters?.docs?.source}}},L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  render: args => <>
      <People {...args} people={[{
      id: 'adele',
      displayName: 'Adele Vance',
      mail: 'adelev@contoso.com',
      jobTitle: 'Product Manager'
    }, {
      id: 'alex',
      displayName: 'Alex Wilber',
      mail: 'alexw@contoso.com',
      jobTitle: 'Marketing Assistant'
    }, {
      id: 'megan',
      displayName: 'Megan Bowen',
      mail: 'meganb@contoso.com',
      jobTitle: 'Marketing Manager'
    }, {
      id: 'lee',
      displayName: 'Lee Gu',
      mail: 'leeg@contoso.com',
      jobTitle: 'Director'
    }]} />
      <Text size={200}>Rendering supplied people skips list discovery and still uses overflow.</Text>
    </>,
  args: {
    showMax: 2,
    layout: 'stack',
    size: 32
  }
}`,...L.parameters?.docs?.source}}},R=[`Default`,`WithPresence`,`FromUserIds`,`DirectPeople`]}))();export{P as Default,L as DirectPeople,I as FromUserIds,F as WithPresence,R as __namedExportsOrder,N as default};