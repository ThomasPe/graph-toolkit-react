import{a as e,n as t}from"./chunk-BneVvdWh.js";import{C as n,S as r,_ as i,d as a,f as o,g as s,m as c,ot as l,t as u,x as d}from"./iframe-BpVdGDQQ.js";import{a as f,c as p,d as m,f as h,g,h as _,i as v,n as y,o as b,p as x,r as S,s as C,t as w,u as ee}from"./MockProvider-Z5JMKjlZ.js";var T,E,D,O,k,A,j,M,N,P,F=t((()=>{T=e(l()),b(),x(),S(),ee(),E=`id,displayName,mail,userPrincipalName,jobTitle,department`,D=`id,displayName,mail,userPrincipalName,jobTitle,department`,O=10,k=e=>({id:e.id??e.userPrincipalName??e.mail??`unknown-user`,displayName:e.displayName??null,mail:e.mail??null,userPrincipalName:e.userPrincipalName??null,jobTitle:e.jobTitle??null,department:e.department??null}),A=(e,t)=>({...e,presenceActivity:t?.activity??null,presenceAvailability:t?.availability??null}),j=e=>e.id??e.userPrincipalName??e.mail??void 0,M=e=>e.userPrincipalName??e.mail??e.id??void 0,N=e=>Array.from(new Set((e??[]).map(e=>e.trim()).filter(Boolean))),P=e=>{let t=C(),n=_(),r=g(),i=JSON.stringify(e?.people??null),a=(0,T.useMemo)(()=>{if(i!==`null`)return JSON.parse(i)},[i]),o=(0,T.useMemo)(()=>N(e?.userIds),[e?.userIds]),s=(0,T.useMemo)(()=>e?.groupId?.trim(),[e?.groupId]),c=e?.maxPeople??O,l=e?.showPresence??!1,[u,d]=(0,T.useState)({people:[],loading:!0,error:null});return(0,T.useEffect)(()=>{let e=!1,i=async e=>{if(f(n)){let t=await n.getPersonData({identifier:e,fetchPresence:l,fetchPhoto:!0});return t.user?{...k(t.user),photoUrl:t.photoUrl,presenceActivity:t.presence?.activity??null,presenceAvailability:t.presence?.availability??null}:null}if(r!==`SignedIn`||!t)return null;let i=e.toLowerCase()===`me`,a=await t.api(i?`/me`:`/users/${p(e)}`).select(E).get(),o=null,s=null;if(l&&a.id)try{o=await t.api(i?`/me/presence`:`/users/${p(a.id)}/presence`).get()}catch{o=null}if(a.id)try{s=await m(await t.api(i?`/me/photo/$value`:`/users/${p(a.id)}/photo/$value`).get())}catch{s=null}return{...k(a),photoUrl:s,presenceActivity:o?.activity??null,presenceAvailability:o?.availability??null}},u=async(e,t=j)=>(await Promise.all(e.map(async e=>{let n=t(e);if(!n)return l?A(e,null):e;let r=l&&!e.presenceAvailability&&!e.presenceActivity,a=!e.photoUrl;if(!r&&!a)return e;try{let t=await i(n);return t?{...e,photoUrl:e.photoUrl??t.photoUrl,presenceActivity:e.presenceActivity??t.presenceActivity,presenceAvailability:e.presenceAvailability??t.presenceAvailability}:e}catch{return e}}))).filter(e=>!!e.id);return(async()=>{if(e||d(e=>({...e,loading:!0,error:null})),a){let t=l||a.some(e=>!e.photoUrl)?await u(a,M):a;e||d({people:t,loading:!1,error:null});return}if(o.length>0){let t=(await Promise.allSettled(o.map(e=>i(e)))).flatMap(e=>e.status===`fulfilled`&&e.value?[e.value]:[]);e||d({people:t,loading:!1,error:null});return}if(!v(n)&&r!==`SignedIn`){e||d({people:[],loading:!1,error:null});return}try{let i=[];s?t&&r===`SignedIn`&&(i=((await t.api(`/groups/${p(s)}/members/microsoft.graph.user`).select(D).top(c).get()).value??[]).map(k)):v(n)?i=(await n.searchPeople(``,c)).map(e=>({...e,presenceActivity:null,presenceAvailability:null})):t&&r===`SignedIn`&&(i=((await t.api(`/users`).select(E).top(c).get()).value??[]).map(k)),(l||i.some(e=>!e.photoUrl))&&(i=await u(i)),e||d({people:i,loading:!1,error:null})}catch(t){e||d({people:[],loading:!1,error:t})}})(),()=>{e=!0}},[a,i,t,s,c,n,r,l,o]),u}})),I,L,R,z,B,V,H,U,W=t((()=>{I=e(l()),u(),F(),L=e(n()),R=3,z=10,B=e=>{switch(e?.toLowerCase()){case`available`:case`availableidle`:return`available`;case`away`:case`berightback`:return`away`;case`busy`:case`busyidle`:case`donotdisturb`:return`busy`;case`offline`:case`presenceunknown`:return`offline`;default:return}},V=e=>e.displayName??e.mail??e.userPrincipalName??e.id,H=e=>{let t=V(e),n=B(e.presenceAvailability);return(0,L.jsx)(s,{avatar:{name:t,image:e.photoUrl?{src:e.photoUrl}:void 0,badge:n?{status:n}:void 0,color:`colorful`}},e.id)},U=({people:e,userIds:t,groupId:n,showMax:r=R,showPresence:a=!1,layout:s=`stack`,size:l=32,onUpdated:u,...d})=>{let{people:f,loading:p,error:m}=P({people:e,userIds:t,groupId:n,maxPeople:Math.max(z,r+5),showPresence:a});if((0,I.useEffect)(()=>{if(!u||p)return;let t=`peopleLoaded`;m?t=`peopleLoadFailed`:e&&(t=`peopleChanged`),u({trigger:t,people:f,loading:!1,error:m})},[m,p,u,e,f]),p)return(0,L.jsx)(o,{size:`tiny`});if(f.length===0)return null;let h=Math.max(0,r),g=f.slice(0,h),_=f.slice(h);return(0,L.jsxs)(i,{layout:s,size:l,...d,children:[g.map(H),_.length>0&&(0,L.jsx)(c,{count:_.length,children:_.map(H)})]})},U.__docgenInfo={description:"`People` renders a compact avatar strip similar to the MGT `mgt-people` control.\n\nThe component can render a supplied list of people, resolve a list of `userIds`, load\ngroup members, or default to tenant directory users from `/users`.\n\n@param props - Avatar group configuration and people-loading options\n@returns A compact avatar group, a loading spinner, or `null` when no people are available",methods:[],displayName:`People`,props:{people:{required:!1,tsType:{name:`Array`,elements:[{name:`PeoplePerson`}],raw:`PeoplePerson[]`},description:`A pre-resolved list of people to render.

When provided, the component skips list discovery and renders these people directly.`},userIds:{required:!1,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:`A list of user identifiers to resolve and render.

Values can be Microsoft Graph user IDs, UPNs, email addresses, or \`"me"\`.`},groupId:{required:!1,tsType:{name:`string`},description:`The ID of a Microsoft Entra ID group whose direct user members should be rendered.`},showMax:{required:!1,tsType:{name:`number`},description:"Maximum number of visible avatars before the remaining people are shown in overflow.\n\nDefaults to `3`, matching the MGT `mgt-people` control.",defaultValue:{value:`3`,computed:!1}},showPresence:{required:!1,tsType:{name:`boolean`},description:`Whether presence badges should be shown on each avatar.

Presence is loaded when the active provider and granted scopes support it.`,defaultValue:{value:`false`,computed:!1}},onUpdated:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(event: PeopleUpdatedEvent) => void`,signature:{arguments:[{type:{name:`PeopleUpdatedEvent`},name:`event`}],return:{name:`void`}}},description:`Called after the component updates its resolved people collection.

Use this to react to direct \`people\` changes, successful list loads, or failed loads.

@param event - Details about the update trigger and the current resolved people state.`},layout:{defaultValue:{value:`'stack'`,computed:!1},required:!1},size:{defaultValue:{value:`32`,computed:!1},required:!1}},composes:[`Omit`]}})),G=t((()=>{W()})),K,q,J,Y,X,Z,Q,$;t((()=>{l(),u(),G(),x(),y(),K=e(n()),q=new w({autoSignIn:!0}),J={title:`Components/People`,component:U,parameters:{layout:`centered`,docs:{description:{component:"Display a compact avatar strip similar to MGT `mgt-people` using Fluent UI `AvatarGroup`.\n\nThe component can render a supplied list of people, resolve specific `userIds`, load a group's direct members, or default to the current user's people suggestions."}}},tags:[`autodocs`],decorators:[e=>(0,K.jsx)(d,{theme:r,children:(0,K.jsx)(h,{provider:q,children:(0,K.jsx)(`div`,{style:{display:`grid`,gap:16},children:(0,K.jsx)(e,{})})})})],argTypes:{showMax:{control:{type:`number`,min:0,max:10},description:`Maximum number of visible avatars before overflow is shown.`},showPresence:{control:`boolean`,description:`Show presence badges on each avatar when available.`},layout:{control:`radio`,options:[`spread`,`stack`,`pie`],description:`Fluent UI AvatarGroup layout.`},size:{control:`select`,options:[16,20,24,28,32,36,40,48,56,64,72,96,120,128],description:`Avatar size in pixels.`}}},Y={args:{showMax:3,layout:`stack`,size:32}},X={args:{showMax:4,layout:`stack`,size:40,showPresence:!0}},Z={args:{userIds:[`00000000-0000-0000-0000-000000000001`,`00000000-0000-0000-0000-000000000002`,`00000000-0000-0000-0000-000000000003`,`00000000-0000-0000-0000-000000000010`],showMax:3,layout:`stack`,size:32}},Q={render:e=>(0,K.jsxs)(K.Fragment,{children:[(0,K.jsx)(U,{...e,people:[{id:`adele`,displayName:`Adele Vance`,mail:`adelev@contoso.com`,jobTitle:`Product Manager`},{id:`alex`,displayName:`Alex Wilber`,mail:`alexw@contoso.com`,jobTitle:`Marketing Assistant`},{id:`megan`,displayName:`Megan Bowen`,mail:`meganb@contoso.com`,jobTitle:`Marketing Manager`},{id:`lee`,displayName:`Lee Gu`,mail:`leeg@contoso.com`,jobTitle:`Director`}]}),(0,K.jsx)(a,{size:200,children:`Rendering supplied people skips list discovery and still uses overflow.`})]}),args:{showMax:2,layout:`stack`,size:32}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  args: {
    showMax: 3,
    layout: 'stack',
    size: 32
  }
}`,...Y.parameters?.docs?.source}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  args: {
    showMax: 4,
    layout: 'stack',
    size: 40,
    showPresence: true
  }
}`,...X.parameters?.docs?.source}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  args: {
    userIds: ['00000000-0000-0000-0000-000000000001', '00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000003', '00000000-0000-0000-0000-000000000010'],
    showMax: 3,
    layout: 'stack',
    size: 32
  }
}`,...Z.parameters?.docs?.source}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
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
}`,...Q.parameters?.docs?.source}}},$=[`Default`,`WithPresence`,`FromUserIds`,`DirectPeople`]}))();export{Y as Default,Q as DirectPeople,Z as FromUserIds,X as WithPresence,$ as __namedExportsOrder,J as default};