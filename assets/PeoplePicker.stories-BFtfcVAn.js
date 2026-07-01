import{a as e,n as t}from"./chunk-DnJy8xQt.js";import{D as n,F as r,I as i,L as a,N as o,O as s,P as c,a as l,c as ee,d as u,f as d,i as f,l as p,m,n as te,o as ne,p as h,r as re,s as ie,t as g,u as ae,xt as _}from"./iframe-B9NkfySm.js";import{f as v,g as y,h as b,i as x,l as oe,n as S,o as C,p as w,r as T,s as E,t as D,u as O}from"./MockProvider-BsblHSd3.js";import{n as se,t as ce}from"./usePeopleList-BgqXh7X2.js";import{i as le,n as ue,r as de,t as k}from"./Person-5lj1wO2O.js";var A,fe,pe,me,he,ge=t((()=>{A=e(_()),C(),w(),T(),fe=`id,displayName,mail,userPrincipalName,jobTitle,department`,pe=[],me=e=>e.trim().replace(/"/g,``).trim(),he=(e,t)=>{let n=E(),r=b(),i=y(),a=t?.minChars??1,o=t?.maxResults??10,s=t?.loadInitialResults??!1,[c,l]=(0,A.useState)([]),[ee,u]=(0,A.useState)(!1),d=me(e),f=s&&e.length===0,p=!f&&(!d||d.length<a);return(0,A.useEffect)(()=>{if(p)return;let e=!1,t=async()=>{u(!0);try{if(x(r)){let t=await r.searchPeople(f?``:d,o);e||l(t)}else if(i===`SignedIn`&&n){let t;t=f?(await n.api(`/users`).select(fe).top(o).get()).value??[]:(await n.api(`/users`).header(`ConsistencyLevel`,`eventual`).search(`"displayName:${d}" OR "mail:${d}" OR "userPrincipalName:${d}"`).select(fe).top(o).get()).value??[],e||l(t)}else e||l([])}catch{e||l([])}finally{e||u(!1)}};if(f)return t(),()=>{e=!0,u(!1)};let a=setTimeout(()=>{t()},300);return()=>{e=!0,clearTimeout(a),u(!1)}},[e,n,r,i,a,o,s,d,f,p]),{results:p?pe:c,loading:p?!1:ee}}})),j,M,N,_e,P,F,ve,I,ye,L,R,be=t((()=>{j=e(_()),g(),s(),ge(),de(),O(),M=e(a()),N=`__no_results__`,_e=50,P=(e,t,n,r)=>e.filter(e=>!t.includes(e.id)&&!n.includes(e.id)).slice(0,r),F=e=>e.displayName||e.mail||e.userPrincipalName||e.id,ve=e=>e.mail??e.userPrincipalName??void 0,I=({person:e,size:t,photoUrl:r})=>(0,M.jsx)(n,{name:e.displayName??void 0,image:r?{src:r}:void 0,initials:r?void 0:oe(e.displayName??void 0),size:t}),ye=({person:e,size:t})=>{let{photoUrl:n}=le({userId:e.id,fetchPhoto:!0});return(0,M.jsx)(I,{person:e,size:t,photoUrl:n})},L=({person:e,size:t})=>e.photoUrl?(0,M.jsx)(I,{person:e,size:t,photoUrl:e.photoUrl}):(0,M.jsx)(ye,{person:e,size:t}),R=({selectedPeople:e,defaultSelectedPeople:t,onSelectionChange:n,placeholder:r=`Search for people...`,maxPeople:i,searchMinChars:a=1,maxSearchResults:s=10,excludeUserIds:c=[],appearance:u,size:d,disabled:m,onUpdated:h})=>{let g=e!==void 0,[_,v]=(0,j.useState)(t??[]),y=g?e:_,[b,x]=(0,j.useState)(``),[oe,S]=(0,j.useState)(!1),C=(0,j.useMemo)(()=>Array.from(new Set(c)),[c]),{results:w,loading:T}=he(b,{minChars:a,maxResults:Math.min(s+C.length,_e),loadInitialResults:oe}),E=(0,j.useMemo)(()=>{let e=new Map;for(let t of y)e.set(t.id,t);for(let t of w)e.set(t.id,t);return e},[y,w]),D=(0,j.useMemo)(()=>y.map(e=>e.id),[y]),O=(0,j.useMemo)(()=>P(w,D,C,s),[w,D,C,s]),se=(0,j.useCallback)((e,t)=>{let r=t.selectedOptions.filter(e=>e!==N).map(e=>E.get(e)).filter(e=>e!==void 0),i=P(w,r.map(e=>e.id),C,s);g||v(r),n?.(r),h?.({trigger:`selectionChanged`,searchQuery:``,selectedPeople:r,searchResults:i,loading:T}),x(``)},[g,s,n,h,E,T,w,C]),ce=(0,j.useCallback)(e=>{x(e.target.value)},[]),le=(0,j.useCallback)(()=>{S(!0)},[]),ue=(0,j.useCallback)(()=>{S(!1)},[]),de=i!==void 0&&y.length>=i,k=(0,j.useRef)(!0);return(0,j.useEffect)(()=>{if(!h||T)return;let e=k.current&&b.length===0&&O.length===0;k.current=!1,!e&&h({trigger:`searchResultsUpdated`,searchQuery:b,selectedPeople:y,searchResults:O,loading:!1})},[y,O,h,T,b]),(0,M.jsxs)(ie,{onOptionSelect:se,selectedOptions:D,appearance:u,size:d,disabled:m,children:[(0,M.jsxs)(f,{expandIcon:(0,M.jsx)(o,{}),children:[(0,M.jsx)(te,{children:y.map(e=>(0,M.jsxs)(ae,{value:e.id,shape:`rounded`,children:[(0,M.jsx)(p,{hasSecondaryAction:!0,media:(0,M.jsx)(L,{person:e,size:16}),children:F(e)}),(0,M.jsx)(ee,{"aria-label":`Remove ${F(e)}`})]},e.id))}),!de&&(0,M.jsx)(ne,{value:b,onChange:ce,onFocus:le,onBlur:ue,placeholder:y.length===0?r:void 0,disabled:m})]}),(0,M.jsxs)(l,{children:[b.length>=a&&!T&&O.length===0&&(0,M.jsx)(re,{value:N,text:`No people found`,style:{pointerEvents:`none`,color:`var(--colorNeutralForegroundDisabled)`},children:`No people found`}),O.map(e=>(0,M.jsx)(re,{value:e.id,media:(0,M.jsx)(L,{person:e,size:32}),secondaryContent:ve(e),children:F(e)},e.id))]})]})},R.__docgenInfo={description:`PeoplePicker — a tag-picker backed by Microsoft Graph people search.

In controlled mode supply \`selectedPeople\` + \`onSelectionChange\`.
In uncontrolled mode supply \`defaultSelectedPeople\` or leave both props unset.

The component automatically uses {@link MockProvider} mock data when no real
Graph provider is available, making it easy to prototype UIs without auth.

@example
\`\`\`tsx
<PeoplePicker
  placeholder="Search for people..."
  onSelectionChange={(people) => console.log(people)}
/>
\`\`\``,methods:[],displayName:`PeoplePicker`,props:{selectedPeople:{required:!1,tsType:{name:`Array`,elements:[{name:`PeopleSearchResult`}],raw:`PeoplePickerPerson[]`},description:`Currently selected people (controlled mode).
When provided, the component operates in controlled mode and does not manage its own selection state.`},defaultSelectedPeople:{required:!1,tsType:{name:`Array`,elements:[{name:`PeopleSearchResult`}],raw:`PeoplePickerPerson[]`},description:`Initial selected people (uncontrolled mode).
Ignored when {@link selectedPeople} is provided.`},onSelectionChange:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(people: PeoplePickerPerson[]) => void`,signature:{arguments:[{type:{name:`Array`,elements:[{name:`PeopleSearchResult`}],raw:`PeoplePickerPerson[]`},name:`people`}],return:{name:`void`}}},description:`Called when the selection changes.
@param people - The new array of selected people`},placeholder:{required:!1,tsType:{name:`string`},description:`Placeholder text shown in the search input when nothing is typed`,defaultValue:{value:`'Search for people...'`,computed:!1}},maxPeople:{required:!1,tsType:{name:`number`},description:`Maximum number of people that can be selected.
When reached the search input is hidden.`},searchMinChars:{required:!1,tsType:{name:`number`},description:`Minimum number of characters required before a search is triggered (default: 1)`,defaultValue:{value:`1`,computed:!1}},maxSearchResults:{required:!1,tsType:{name:`number`},description:`Maximum number of search results to show in the dropdown (default: 10)`,defaultValue:{value:`10`,computed:!1}},excludeUserIds:{required:!1,tsType:{name:`Array`,elements:[{name:`string`}],raw:`string[]`},description:`User IDs to exclude from search results.
When provided, these IDs will be filtered out of the dropdown suggestions.
The search will fetch extra results to compensate so that the dropdown still
shows up to {@link maxSearchResults} items after exclusion.`,defaultValue:{value:`[]`,computed:!1}},onUpdated:{required:!1,tsType:{name:`signature`,type:`function`,raw:`(event: PeoplePickerUpdatedEvent) => void`,signature:{arguments:[{type:{name:`PeoplePickerUpdatedEvent`},name:`event`}],return:{name:`void`}}},description:`Called after the picker updates its search results or selection state.

@param event - Details about the update trigger and the picker state after the update.`}},composes:[`Pick`]}})),xe=t((()=>{be()})),z,B,V,H,Se,Ce,U,W,G,K,q,J,Y,X,Z,Q,$,we;t((()=>{z=e(_()),g(),xe(),k(),w(),S(),ce(),B=e(a()),{fn:V}=__STORYBOOK_MODULE_TEST__,H=new D({autoSignIn:!0}),Se=e=>{let[t,n]=(0,z.useState)([]),r=(0,z.useMemo)(()=>t.map(e=>e.id),[t]),{people:a,loading:o}=se((0,z.useMemo)(()=>r.length>0?{userIds:r,sortBy:`surname`,selectFields:[`givenName`,`surname`]}:{people:[],sortBy:`surname`,selectFields:[`givenName`,`surname`]},[r])),s=t=>{n(t),e.onSelectionChange?.(t)};return(0,B.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16},children:[(0,B.jsx)(R,{...e,selectedPeople:t,onSelectionChange:s}),(0,B.jsxs)(u,{style:{display:`flex`,flexDirection:`column`,gap:8,padding:16,backgroundColor:i.colorNeutralBackground2},children:[(0,B.jsx)(h,{weight:`semibold`,children:`Stored object IDs`}),(0,B.jsx)(d,{children:`This mirrors the common app pattern where the picker drives selection, but persistence only stores Microsoft Entra object IDs.`}),(0,B.jsx)(`code`,{style:{whiteSpace:`pre-wrap`},children:r.length>0?JSON.stringify(r,null,2):`[]`})]}),(0,B.jsxs)(u,{style:{display:`flex`,flexDirection:`column`,gap:12,padding:16},children:[(0,B.jsx)(h,{weight:`semibold`,children:`Selected users sorted by surname`}),(0,B.jsxs)(d,{children:[`The list is resolved with `,(0,B.jsx)(`code`,{children:`usePeopleList`}),` using the stored IDs, then sorted by`,(0,B.jsx)(`code`,{children:`surname`}),`.`]}),r.length===0?(0,B.jsx)(h,{children:`Select a few people to populate the list.`}):o?(0,B.jsx)(m,{label:`Resolving selected users...`,size:`tiny`}):(0,B.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:a.map(e=>(0,B.jsx)(ue,{personDetails:e,view:`threelines`,fetchImage:!1},e.id))})]})]})},Ce={title:`Components/PeoplePicker`,component:R,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:"Search and select one or more people from Microsoft Graph using the Fluent UI TagPicker.\n\nThe `PeoplePicker` supports both **controlled** and **uncontrolled** usage patterns.\n\nSee the **Selected Users List** story for the recommended consumer pattern when your app stores\nonly object IDs from picker selections and later resolves a sorted list with `usePeopleList`.\n\nWhen wrapping with a `MockProvider` (with `autoSignIn: true`), it uses built-in mock data so you can prototype without any auth configuration."}}},decorators:[e=>(0,B.jsx)(c,{theme:r,children:(0,B.jsx)(v,{provider:H,children:(0,B.jsx)(`div`,{style:{width:400},children:(0,B.jsx)(e,{})})})})],args:{onSelectionChange:V(),onUpdated:V()},argTypes:{placeholder:{control:`text`},maxPeople:{control:{type:`number`,min:1}},searchMinChars:{control:{type:`number`,min:1}},maxSearchResults:{control:{type:`number`,min:1}},appearance:{control:`select`,options:[`outline`,`underline`,`filled-darker`,`filled-lighter`]},size:{control:`select`,options:[`medium`,`large`]},disabled:{control:`boolean`}}},U={args:{placeholder:`Search for people...`}},W={name:`With Default Selected`,args:{placeholder:`Search for people...`,defaultSelectedPeople:[{id:`00000000-0000-0000-0000-000000000001`,displayName:`Adele Vance`,mail:`adelev@contoso.com`,userPrincipalName:`adelev@contoso.com`,jobTitle:`Product Manager`}]}},G={name:`Controlled`,render:e=>{let[t,n]=(0,z.useState)([{id:`00000000-0000-0000-0000-000000000010`,displayName:`Megan Bowen`,mail:`meganb@contoso.com`,userPrincipalName:`meganb@contoso.com`,jobTitle:`Marketing Manager`}]),r=t=>{n(t),e.onSelectionChange?.(t)};return(0,B.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,B.jsx)(R,{...e,selectedPeople:t,onSelectionChange:r}),(0,B.jsxs)(h,{size:200,children:[`Selected: `,t.map(e=>e.displayName).join(`, `)||`(none)`]})]})},args:{placeholder:`Search for people...`}},K={name:`Selected Users List`,render:e=>(0,B.jsx)(Se,{...e}),args:{placeholder:`Search and add people...`,maxPeople:5}},q={name:`Max 3 People`,args:{placeholder:`Search for up to 3 people...`,maxPeople:3}},J={name:`Min 2 Characters`,args:{placeholder:`Type 2+ characters to search...`,searchMinChars:2}},Y={name:`Size: Medium`,args:{placeholder:`Search...`,size:`medium`}},X={name:`Size: Large`,args:{placeholder:`Search...`,size:`large`}},Z={args:{placeholder:`Search for people...`,disabled:!0,defaultSelectedPeople:[{id:`00000000-0000-0000-0000-000000000001`,displayName:`Adele Vance`,mail:`adelev@contoso.com`}]}},Q={name:`Appearance: Underline`,args:{placeholder:`Search for people...`,appearance:`underline`}},$={name:`Appearance: Filled Darker`,args:{placeholder:`Search for people...`,appearance:`filled-darker`},decorators:[e=>(0,B.jsx)(c,{theme:r,children:(0,B.jsx)(v,{provider:H,children:(0,B.jsx)(`div`,{style:{width:400,padding:16,background:`var(--colorNeutralBackground1)`},children:(0,B.jsx)(e,{})})})})]},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'Search for people...'
  }
}`,...U.parameters?.docs?.source},description:{story:`Default uncontrolled usage — start typing to search for people.
Try "adele", "megan", or "alex" to see results.`,...U.parameters?.docs?.description}}},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  name: 'With Default Selected',
  args: {
    placeholder: 'Search for people...',
    defaultSelectedPeople: [{
      id: '00000000-0000-0000-0000-000000000001',
      displayName: 'Adele Vance',
      mail: 'adelev@contoso.com',
      userPrincipalName: 'adelev@contoso.com',
      jobTitle: 'Product Manager'
    }]
  }
}`,...W.parameters?.docs?.source},description:{story:`Shows how to pre-select people in uncontrolled mode.`,...W.parameters?.docs?.description}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  name: 'Controlled',
  render: args => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selected, setSelected] = useState<PeoplePickerPerson[]>([{
      id: '00000000-0000-0000-0000-000000000010',
      displayName: 'Megan Bowen',
      mail: 'meganb@contoso.com',
      userPrincipalName: 'meganb@contoso.com',
      jobTitle: 'Marketing Manager'
    }]);
    const handleSelectionChange = (nextSelectedPeople: PeoplePickerPerson[]) => {
      setSelected(nextSelectedPeople);
      args.onSelectionChange?.(nextSelectedPeople);
    };
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }}>
        <PeoplePicker {...args} selectedPeople={selected} onSelectionChange={handleSelectionChange} />
        <Text size={200}>
          Selected: {selected.map(p => p.displayName).join(', ') || '(none)'}
        </Text>
      </div>;
  },
  args: {
    placeholder: 'Search for people...'
  }
}`,...G.parameters?.docs?.source},description:{story:`Controlled PeoplePicker that logs selection changes.`,...G.parameters?.docs?.description}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  name: 'Selected Users List',
  render: args => <SelectedUsersListDemo {...args} />,
  args: {
    placeholder: 'Search and add people...',
    maxPeople: 5
  }
}`,...K.parameters?.docs?.source},description:{story:"Demonstrates the common pattern where the app stores only selected object IDs,\nthen resolves a sorted user list with `usePeopleList`.",...K.parameters?.docs?.description}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  name: 'Max 3 People',
  args: {
    placeholder: 'Search for up to 3 people...',
    maxPeople: 3
  }
}`,...q.parameters?.docs?.source},description:{story:`Limits selection to a maximum of 3 people.
The input field hides once the limit is reached.`,...q.parameters?.docs?.description}}},J.parameters={...J.parameters,docs:{...J.parameters?.docs,source:{originalSource:`{
  name: 'Min 2 Characters',
  args: {
    placeholder: 'Type 2+ characters to search...',
    searchMinChars: 2
  }
}`,...J.parameters?.docs?.source},description:{story:`Requires at least 2 characters before searching.`,...J.parameters?.docs?.description}}},Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  name: 'Size: Medium',
  args: {
    placeholder: 'Search...',
    size: 'medium'
  }
}`,...Y.parameters?.docs?.source},description:{story:`Medium size variant.`,...Y.parameters?.docs?.description}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
  name: 'Size: Large',
  args: {
    placeholder: 'Search...',
    size: 'large'
  }
}`,...X.parameters?.docs?.source},description:{story:`Large size variant.`,...X.parameters?.docs?.description}}},Z.parameters={...Z.parameters,docs:{...Z.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'Search for people...',
    disabled: true,
    defaultSelectedPeople: [{
      id: '00000000-0000-0000-0000-000000000001',
      displayName: 'Adele Vance',
      mail: 'adelev@contoso.com'
    }]
  }
}`,...Z.parameters?.docs?.source},description:{story:`Disabled state — the picker cannot be interacted with.`,...Z.parameters?.docs?.description}}},Q.parameters={...Q.parameters,docs:{...Q.parameters?.docs,source:{originalSource:`{
  name: 'Appearance: Underline',
  args: {
    placeholder: 'Search for people...',
    appearance: 'underline'
  }
}`,...Q.parameters?.docs?.source},description:{story:`Underline appearance variant.`,...Q.parameters?.docs?.description}}},$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  name: 'Appearance: Filled Darker',
  args: {
    placeholder: 'Search for people...',
    appearance: 'filled-darker'
  },
  decorators: [Story => <FluentProvider theme={webLightTheme}>
        <GraphProvider provider={provider}>
          <div style={{
        width: 400,
        padding: 16,
        background: 'var(--colorNeutralBackground1)'
      }}>
            <Story />
          </div>
        </GraphProvider>
      </FluentProvider>]
}`,...$.parameters?.docs?.source},description:{story:`Filled appearance with a darker background.`,...$.parameters?.docs?.description}}},we=[`Default`,`WithDefaultSelected`,`Controlled`,`SelectedUsersList`,`MaxThreePeople`,`MinTwoChars`,`MediumSize`,`LargeSize`,`Disabled`,`UnderlineAppearance`,`FilledDarkerAppearance`]}))();export{G as Controlled,U as Default,Z as Disabled,$ as FilledDarkerAppearance,X as LargeSize,q as MaxThreePeople,Y as MediumSize,J as MinTwoChars,K as SelectedUsersList,Q as UnderlineAppearance,W as WithDefaultSelected,we as __namedExportsOrder,Ce as default};