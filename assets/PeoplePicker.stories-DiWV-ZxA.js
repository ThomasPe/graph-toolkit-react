import{a as e,n as t}from"./chunk-BneVvdWh.js";import{C as n,E as r,S as i,T as a,a as o,b as s,c,d as l,f as u,i as d,l as f,lt as p,m as ee,n as te,o as ne,p as m,r as re,s as ie,t as h,u as ae,w as g,x as oe}from"./iframe-HiCMiQIQ.js";import{f as _,g as v,h as y,i as b,l as se,n as x,o as S,p as C,r as w,s as T,t as E,u as D}from"./MockProvider-DyX2QG8-.js";import{n as ce,t as le}from"./usePeopleList-Bacet1_e.js";import{i as ue,n as de,r as fe,t as O}from"./Person-B88DKfd0.js";var k,A,pe,me,he=t((()=>{k=e(p()),S(),C(),w(),A=`id,displayName,mail,userPrincipalName,jobTitle,department`,pe=e=>e.trim().replace(/"/g,``).trim(),me=(e,t)=>{let n=T(),r=y(),i=v(),a=t?.minChars??1,o=t?.maxResults??10,s=t?.loadInitialResults??!1,[c,l]=(0,k.useState)([]),[u,d]=(0,k.useState)(!1);return(0,k.useEffect)(()=>{let t=pe(e),c=s&&e.length===0;if(!c&&(!t||t.length<a)){l([]),d(!1);return}let u=!1,f=async()=>{d(!0);try{if(b(r)){let e=await r.searchPeople(c?``:t,o);u||l(e)}else if(i===`SignedIn`&&n){let e;e=c?(await n.api(`/users`).select(A).top(o).get()).value??[]:(await n.api(`/users`).header(`ConsistencyLevel`,`eventual`).search(`"displayName:${t}" OR "mail:${t}" OR "userPrincipalName:${t}"`).select(A).top(o).get()).value??[],u||l(e)}else u||l([])}catch{u||l([])}finally{u||d(!1)}};if(c)return f(),()=>{u=!0};let p=setTimeout(()=>{f()},300);return()=>{u=!0,clearTimeout(p)}},[e,n,r,i,a,o,s]),{results:c,loading:u}}})),j,M,N,ge,P,F,_e,I,ve,L,R,ye=t((()=>{j=e(p()),h(),oe(),he(),fe(),D(),M=e(r()),N=`__no_results__`,ge=50,P=(e,t,n,r)=>e.filter(e=>!t.includes(e.id)&&!n.includes(e.id)).slice(0,r),F=e=>e.displayName||e.mail||e.userPrincipalName||e.id,_e=e=>e.mail??e.userPrincipalName??void 0,I=({person:e,size:t,photoUrl:n})=>(0,M.jsx)(s,{name:e.displayName??void 0,image:n?{src:n}:void 0,initials:n?void 0:se(e.displayName??void 0),size:t}),ve=({person:e,size:t})=>{let{photoUrl:n}=ue({userId:e.id,fetchPhoto:!0});return(0,M.jsx)(I,{person:e,size:t,photoUrl:n})},L=({person:e,size:t})=>e.photoUrl?(0,M.jsx)(I,{person:e,size:t,photoUrl:e.photoUrl}):(0,M.jsx)(ve,{person:e,size:t}),R=({selectedPeople:e,defaultSelectedPeople:t,onSelectionChange:n,placeholder:r=`Search for people...`,maxPeople:a,searchMinChars:s=1,maxSearchResults:l=10,excludeUserIds:u=[],appearance:p,size:ee,disabled:m,onUpdated:h})=>{let g=e!==void 0,[oe,_]=(0,j.useState)(t??[]),v=g?e:oe,[y,b]=(0,j.useState)(``),[se,x]=(0,j.useState)(!1),S=(0,j.useMemo)(()=>Array.from(new Set(u)),[u]),{results:C,loading:w}=me(y,{minChars:s,maxResults:Math.min(l+S.length,ge),loadInitialResults:se}),T=(0,j.useMemo)(()=>{let e=new Map;for(let t of v)e.set(t.id,t);for(let t of C)e.set(t.id,t);return e},[v,C]),E=(0,j.useMemo)(()=>v.map(e=>e.id),[v]),D=(0,j.useMemo)(()=>P(C,E,S,l),[C,E,S,l]),ce=(0,j.useCallback)((e,t)=>{let r=t.selectedOptions.filter(e=>e!==N).map(e=>T.get(e)).filter(e=>e!==void 0),i=P(C,r.map(e=>e.id),S,l);g||_(r),n?.(r),h?.({trigger:`selectionChanged`,searchQuery:``,selectedPeople:r,searchResults:i,loading:w}),b(``)},[g,l,n,h,T,w,C,S]),le=(0,j.useCallback)(e=>{b(e.target.value)},[]),ue=(0,j.useCallback)(()=>{x(!0)},[]),de=(0,j.useCallback)(()=>{x(!1)},[]),fe=a!==void 0&&v.length>=a,O=(0,j.useRef)(!0);return(0,j.useEffect)(()=>{if(!h||w)return;let e=O.current&&y.length===0&&D.length===0;O.current=!1,!e&&h({trigger:`searchResultsUpdated`,searchQuery:y,selectedPeople:v,searchResults:D,loading:!1})},[v,D,h,w,y]),(0,M.jsxs)(ie,{onOptionSelect:ce,selectedOptions:E,appearance:p,size:ee,disabled:m,children:[(0,M.jsxs)(d,{expandIcon:(0,M.jsx)(i,{}),children:[(0,M.jsx)(te,{children:v.map(e=>(0,M.jsxs)(ae,{value:e.id,shape:`rounded`,children:[(0,M.jsx)(f,{hasSecondaryAction:!0,media:(0,M.jsx)(L,{person:e,size:16}),children:F(e)}),(0,M.jsx)(c,{"aria-label":`Remove ${F(e)}`})]},e.id))}),!fe&&(0,M.jsx)(ne,{value:y,onChange:le,onFocus:ue,onBlur:de,placeholder:v.length===0?r:void 0,disabled:m})]}),(0,M.jsxs)(o,{children:[y.length>=s&&!w&&D.length===0&&(0,M.jsx)(re,{value:N,text:`No people found`,style:{pointerEvents:`none`,color:`var(--colorNeutralForegroundDisabled)`},children:`No people found`}),D.map(e=>(0,M.jsx)(re,{value:e.id,media:(0,M.jsx)(L,{person:e,size:32}),secondaryContent:_e(e),children:F(e)},e.id))]})]})},R.__docgenInfo={description:`PeoplePicker — a tag-picker backed by Microsoft Graph people search.

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

@param event - Details about the update trigger and the picker state after the update.`}},composes:[`Pick`]}})),be=t((()=>{ye()})),z,B,V,H,xe,Se,U,W,G,K,q,J,Y,X,Z,Q,$,Ce;t((()=>{z=e(p()),h(),be(),O(),C(),x(),le(),B=e(r()),{fn:V}=__STORYBOOK_MODULE_TEST__,H=new E({autoSignIn:!0}),xe=e=>{let[t,n]=(0,z.useState)([]),r=(0,z.useMemo)(()=>t.map(e=>e.id),[t]),{people:i,loading:o}=ce((0,z.useMemo)(()=>r.length>0?{userIds:r,sortBy:`surname`,selectFields:[`givenName`,`surname`]}:{people:[],sortBy:`surname`,selectFields:[`givenName`,`surname`]},[r])),s=t=>{n(t),e.onSelectionChange?.(t)};return(0,B.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16},children:[(0,B.jsx)(R,{...e,selectedPeople:t,onSelectionChange:s}),(0,B.jsxs)(l,{style:{display:`flex`,flexDirection:`column`,gap:8,padding:16,backgroundColor:a.colorNeutralBackground2},children:[(0,B.jsx)(m,{weight:`semibold`,children:`Stored object IDs`}),(0,B.jsx)(u,{children:`This mirrors the common app pattern where the picker drives selection, but persistence only stores Microsoft Entra object IDs.`}),(0,B.jsx)(`code`,{style:{whiteSpace:`pre-wrap`},children:r.length>0?JSON.stringify(r,null,2):`[]`})]}),(0,B.jsxs)(l,{style:{display:`flex`,flexDirection:`column`,gap:12,padding:16},children:[(0,B.jsx)(m,{weight:`semibold`,children:`Selected users sorted by surname`}),(0,B.jsxs)(u,{children:[`The list is resolved with `,(0,B.jsx)(`code`,{children:`usePeopleList`}),` using the stored IDs, then sorted by`,(0,B.jsx)(`code`,{children:`surname`}),`.`]}),r.length===0?(0,B.jsx)(m,{children:`Select a few people to populate the list.`}):o?(0,B.jsx)(ee,{label:`Resolving selected users...`,size:`tiny`}):(0,B.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:i.map(e=>(0,B.jsx)(de,{personDetails:e,view:`threelines`,fetchImage:!1},e.id))})]})]})},Se={title:`Components/PeoplePicker`,component:R,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:"Search and select one or more people from Microsoft Graph using the Fluent UI TagPicker.\n\nThe `PeoplePicker` supports both **controlled** and **uncontrolled** usage patterns.\n\nSee the **Selected Users List** story for the recommended consumer pattern when your app stores\nonly object IDs from picker selections and later resolves a sorted list with `usePeopleList`.\n\nWhen wrapping with a `MockProvider` (with `autoSignIn: true`), it uses built-in mock data so you can prototype without any auth configuration."}}},decorators:[e=>(0,B.jsx)(n,{theme:g,children:(0,B.jsx)(_,{provider:H,children:(0,B.jsx)(`div`,{style:{width:400},children:(0,B.jsx)(e,{})})})})],args:{onSelectionChange:V(),onUpdated:V()},argTypes:{placeholder:{control:`text`},maxPeople:{control:{type:`number`,min:1}},searchMinChars:{control:{type:`number`,min:1}},maxSearchResults:{control:{type:`number`,min:1}},appearance:{control:`select`,options:[`outline`,`underline`,`filled-darker`,`filled-lighter`]},size:{control:`select`,options:[`medium`,`large`]},disabled:{control:`boolean`}}},U={args:{placeholder:`Search for people...`}},W={name:`With Default Selected`,args:{placeholder:`Search for people...`,defaultSelectedPeople:[{id:`00000000-0000-0000-0000-000000000001`,displayName:`Adele Vance`,mail:`adelev@contoso.com`,userPrincipalName:`adelev@contoso.com`,jobTitle:`Product Manager`}]}},G={name:`Controlled`,render:e=>{let[t,n]=(0,z.useState)([{id:`00000000-0000-0000-0000-000000000010`,displayName:`Megan Bowen`,mail:`meganb@contoso.com`,userPrincipalName:`meganb@contoso.com`,jobTitle:`Marketing Manager`}]),r=t=>{n(t),e.onSelectionChange?.(t)};return(0,B.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,B.jsx)(R,{...e,selectedPeople:t,onSelectionChange:r}),(0,B.jsxs)(m,{size:200,children:[`Selected: `,t.map(e=>e.displayName).join(`, `)||`(none)`]})]})},args:{placeholder:`Search for people...`}},K={name:`Selected Users List`,render:e=>(0,B.jsx)(xe,{...e}),args:{placeholder:`Search and add people...`,maxPeople:5}},q={name:`Max 3 People`,args:{placeholder:`Search for up to 3 people...`,maxPeople:3}},J={name:`Min 2 Characters`,args:{placeholder:`Type 2+ characters to search...`,searchMinChars:2}},Y={name:`Size: Medium`,args:{placeholder:`Search...`,size:`medium`}},X={name:`Size: Large`,args:{placeholder:`Search...`,size:`large`}},Z={args:{placeholder:`Search for people...`,disabled:!0,defaultSelectedPeople:[{id:`00000000-0000-0000-0000-000000000001`,displayName:`Adele Vance`,mail:`adelev@contoso.com`}]}},Q={name:`Appearance: Underline`,args:{placeholder:`Search for people...`,appearance:`underline`}},$={name:`Appearance: Filled Darker`,args:{placeholder:`Search for people...`,appearance:`filled-darker`},decorators:[e=>(0,B.jsx)(n,{theme:g,children:(0,B.jsx)(_,{provider:H,children:(0,B.jsx)(`div`,{style:{width:400,padding:16,background:`var(--colorNeutralBackground1)`},children:(0,B.jsx)(e,{})})})})]},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
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
}`,...$.parameters?.docs?.source},description:{story:`Filled appearance with a darker background.`,...$.parameters?.docs?.description}}},Ce=[`Default`,`WithDefaultSelected`,`Controlled`,`SelectedUsersList`,`MaxThreePeople`,`MinTwoChars`,`MediumSize`,`LargeSize`,`Disabled`,`UnderlineAppearance`,`FilledDarkerAppearance`]}))();export{G as Controlled,U as Default,Z as Disabled,$ as FilledDarkerAppearance,X as LargeSize,q as MaxThreePeople,Y as MediumSize,J as MinTwoChars,K as SelectedUsersList,Q as UnderlineAppearance,W as WithDefaultSelected,Ce as __namedExportsOrder,Se as default};