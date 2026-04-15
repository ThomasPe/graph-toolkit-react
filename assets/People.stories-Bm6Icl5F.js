import{a as e,n as t}from"./chunk-BneVvdWh.js";import{E as n,O as r,T as i,b as a,dt as o,m as s,p as c,t as l,v as u,x as d}from"./iframe-uuoL4p0U.js";import{f,n as p,p as m,t as h}from"./MockProvider-CZStx3lE.js";import{n as g,t as _}from"./usePeopleList-P4Ta6fSf.js";var v,y,b,x,S,C,w,T,E=t((()=>{v=e(o()),l(),_(),y=e(r()),b=3,x=10,S=e=>{switch(e?.toLowerCase()){case`available`:case`availableidle`:return`available`;case`away`:case`berightback`:return`away`;case`busy`:case`busyidle`:case`donotdisturb`:return`busy`;case`offline`:case`presenceunknown`:return`offline`;default:return}},C=e=>e.displayName??e.mail??e.userPrincipalName??e.id,w=e=>{let t=C(e),n=S(e.presenceAvailability);return(0,y.jsx)(a,{name:t,avatar:{name:t,image:e.photoUrl?{src:e.photoUrl}:void 0,badge:n?{status:n}:void 0,color:`colorful`}},e.id)},T=({people:e,userIds:t,selectFields:n,sortBy:r,sortDirection:i,groupId:a,showMax:o=b,showPresence:c=!1,layout:l=`stack`,size:f=32,onUpdated:p,...m})=>{let{people:h,loading:_,error:S}=g({people:e,userIds:t,selectFields:n,sortBy:r,sortDirection:i,groupId:a,maxPeople:Math.max(x,o+5),showPresence:c});if((0,v.useEffect)(()=>{if(!p||_)return;let t=`peopleLoaded`;S?t=`peopleLoadFailed`:e&&(t=`peopleChanged`),p({trigger:t,people:h,loading:!1,error:S})},[S,_,p,e,h]),_)return(0,y.jsx)(s,{size:`tiny`});if(h.length===0)return null;let C=Math.max(0,o),T=h.slice(0,C),E=h.slice(C);return(0,y.jsxs)(d,{layout:l,size:f,...m,children:[T.map(w),E.length>0&&(0,y.jsx)(u,{count:E.length,children:E.map(w)})]})},T.__docgenInfo={description:"`People` renders a compact avatar strip similar to the MGT `mgt-people` control.\n\nThe component can render a supplied list of people, resolve a list of `userIds`, load\ngroup members, or default to tenant directory users from `/users`.\n\n@param props - Avatar group configuration and people-loading options\n@returns A compact avatar group, a loading spinner, or `null` when no people are available",methods:[],displayName:`People`,props:{people:{required:!1,tsType:{name:`Array`,elements:[{name:`intersection`,raw:`PersonDetails & PeopleSearchResult`,elements:[{name:`PersonDetails`},{name:`PeopleSearchResult`}]}],raw:`PeoplePerson[]`},description:`A pre-resolved list of people to render.

When provided, the component skips list discovery and renders these people directly.`},userIds:{required:!1,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:`A list of user identifiers to resolve and render.

Values can be Microsoft Graph user IDs, UPNs, email addresses, or \`"me"\`.`},selectFields:{required:!1,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:`Additional Graph user fields to request when the component resolves people.`},sortBy:{required:!1,tsType:{name:`union`,raw:`'displayName' | 'givenName' | 'surname'`,elements:[{name:`literal`,value:`'displayName'`},{name:`literal`,value:`'givenName'`},{name:`literal`,value:`'surname'`}]},description:`Field used to sort the resolved people collection.`},sortDirection:{required:!1,tsType:{name:`union`,raw:`'asc' | 'desc'`,elements:[{name:`literal`,value:`'asc'`},{name:`literal`,value:`'desc'`}]},description:`Direction used when {@link PeopleProps.sortBy} is provided.

Defaults to \`asc\`.`},groupId:{required:!1,tsType:{name:`string`},description:`The ID of a Microsoft Entra ID group whose direct user members should be rendered.`},showMax:{required:!1,tsType:{name:`number`},description:"Maximum number of visible avatars before the remaining people are shown in overflow.\n\nDefaults to `3`, matching the MGT `mgt-people` control.",defaultValue:{value:`3`,computed:!1}},showPresence:{required:!1,tsType:{name:`boolean`},description:`Whether presence badges should be shown on each avatar.

Presence is loaded when the active provider and granted scopes support it.`,defaultValue:{value:`false`,computed:!1}},onUpdated:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(event: PeopleUpdatedEvent) => void`,signature:{arguments:[{type:{name:`PeopleUpdatedEvent`},name:`event`}],return:{name:`void`}}},description:`Called after the component updates its resolved people collection.

Use this to react to direct \`people\` changes, successful list loads, or failed loads.

@param event - Details about the update trigger and the current resolved people state.`},layout:{defaultValue:{value:`'stack'`,computed:!1},required:!1},size:{defaultValue:{value:`32`,computed:!1},required:!1}},composes:[`Omit`]}})),D=t((()=>{E()})),O,k,A,j,M,N,P,F,I;t((()=>{o(),l(),D(),m(),p(),O=e(r()),{fn:k}=__STORYBOOK_MODULE_TEST__,A=new h({autoSignIn:!0}),j={title:`Components/People`,component:T,parameters:{layout:`centered`,docs:{description:{component:"Display a compact avatar strip similar to MGT `mgt-people` using Fluent UI `AvatarGroup`.\n\nThe component can render a supplied list of people, resolve specific `userIds`, load a group's direct members, or default to the current user's people suggestions."}}},tags:[`autodocs`],decorators:[e=>(0,O.jsx)(i,{theme:n,children:(0,O.jsx)(f,{provider:A,children:(0,O.jsx)(`div`,{style:{display:`grid`,gap:16},children:(0,O.jsx)(e,{})})})})],args:{onUpdated:k()},argTypes:{showMax:{control:{type:`number`,min:0,max:10},description:`Maximum number of visible avatars before overflow is shown.`},showPresence:{control:`boolean`,description:`Show presence badges on each avatar when available.`},layout:{control:`radio`,options:[`spread`,`stack`,`pie`],description:`Fluent UI AvatarGroup layout.`},size:{control:`select`,options:[16,20,24,28,32,36,40,48,56,64,72,96,120,128],description:`Avatar size in pixels.`}}},M={args:{showMax:3,layout:`stack`,size:32}},N={args:{showMax:4,layout:`stack`,size:40,showPresence:!0}},P={args:{userIds:[`00000000-0000-0000-0000-000000000001`,`00000000-0000-0000-0000-000000000002`,`00000000-0000-0000-0000-000000000003`,`00000000-0000-0000-0000-000000000010`],showMax:3,layout:`stack`,size:32}},F={render:e=>(0,O.jsxs)(O.Fragment,{children:[(0,O.jsx)(T,{...e,people:[{id:`adele`,displayName:`Adele Vance`,mail:`adelev@contoso.com`,jobTitle:`Product Manager`},{id:`alex`,displayName:`Alex Wilber`,mail:`alexw@contoso.com`,jobTitle:`Marketing Assistant`},{id:`megan`,displayName:`Megan Bowen`,mail:`meganb@contoso.com`,jobTitle:`Marketing Manager`},{id:`lee`,displayName:`Lee Gu`,mail:`leeg@contoso.com`,jobTitle:`Director`}]}),(0,O.jsx)(c,{size:200,children:`Rendering supplied people skips list discovery and still uses overflow.`})]}),args:{showMax:2,layout:`stack`,size:32}},M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    showMax: 3,
    layout: 'stack',
    size: 32
  }
}`,...M.parameters?.docs?.source}}},N.parameters={...N.parameters,docs:{...N.parameters?.docs,source:{originalSource:`{
  args: {
    showMax: 4,
    layout: 'stack',
    size: 40,
    showPresence: true
  }
}`,...N.parameters?.docs?.source}}},P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    userIds: ['00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000010'],
    showMax: 3,
    layout: 'stack',
    size: 32
  }
}`,...P.parameters?.docs?.source}}},F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
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
}`,...F.parameters?.docs?.source}}},I=[`Default`,`WithPresence`,`FromUserIds`,`DirectPeople`]}))();export{M as Default,F as DirectPeople,P as FromUserIds,N as WithPresence,I as __namedExportsOrder,j as default};