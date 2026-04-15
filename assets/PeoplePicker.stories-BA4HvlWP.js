import{a as e,n as t}from"./chunk-BneVvdWh.js";import{C as n,D as r,E as i,O as a,S as o,T as s,a as c,c as l,d as u,dt as d,f,i as ee,l as te,m as p,n as ne,o as re,p as m,r as ie,s as ae,t as h,u as oe,w as se}from"./iframe-uuoL4p0U.js";import{f as g,g as _,h as v,i as y,l as ce,n as b,o as x,p as S,r as C,s as w,t as T,u as E}from"./MockProvider-CZStx3lE.js";import{n as le,t as ue}from"./usePeopleList-P4Ta6fSf.js";import{i as de,n as fe,r as pe,t as D}from"./Person-D1oXH9lc.js";var O,k,A,me,he=t((()=>{O=e(d()),x(),S(),C(),k=`id,displayName,mail,userPrincipalName,jobTitle,department`,A=e=>e.trim().replace(/"/g,``).trim(),me=(e,t)=>{let n=w(),r=v(),i=_(),a=t?.minChars??1,o=t?.maxResults??10,s=t?.loadInitialResults??!1,[c,l]=(0,O.useState)([]),[u,d]=(0,O.useState)(!1);return(0,O.useEffect)(()=>{let t=A(e),c=s&&e.length===0;if(!c&&(!t||t.length<a)){l([]),d(!1);return}let u=!1,f=async()=>{d(!0);try{if(y(r)){let e=await r.searchPeople(c?``:t,o);u||l(e)}else if(i===`SignedIn`&&n){let e;e=c?(await n.api(`/users`).select(k).top(o).get()).value??[]:(await n.api(`/users`).header(`ConsistencyLevel`,`eventual`).search(`"displayName:${t}" OR "mail:${t}" OR "userPrincipalName:${t}"`).select(k).top(o).get()).value??[],u||l(e)}else u||l([])}catch{u||l([])}finally{u||d(!1)}};if(c)return f(),()=>{u=!0};let ee=setTimeout(()=>{f()},300);return()=>{u=!0,clearTimeout(ee)}},[e,n,r,i,a,o,s]),{results:c,loading:u}}})),j,M,N,ge,P,F,_e,I,ve,L,R,ye=t((()=>{j=e(d()),h(),n(),he(),pe(),E(),M=e(a()),N=`__no_results__`,ge=50,P=(e,t,n,r)=>e.filter(e=>!t.includes(e.id)&&!n.includes(e.id)).slice(0,r),F=e=>e.displayName||e.mail||e.userPrincipalName||e.id,_e=e=>e.mail??e.userPrincipalName??void 0,I=({person:e,size:t,photoUrl:n})=>(0,M.jsx)(o,{name:e.displayName??void 0,image:n?{src:n}:void 0,initials:n?void 0:ce(e.displayName??void 0),size:t}),ve=({person:e,size:t})=>{let{photoUrl:n}=de({userId:e.id,fetchPhoto:!0});return(0,M.jsx)(I,{person:e,size:t,photoUrl:n})},L=({person:e,size:t})=>e.photoUrl?(0,M.jsx)(I,{person:e,size:t,photoUrl:e.photoUrl}):(0,M.jsx)(ve,{person:e,size:t}),R=({selectedPeople:e,defaultSelectedPeople:t,onSelectionChange:n,placeholder:r=`Search for people...`,maxPeople:i,searchMinChars:a=1,maxSearchResults:o=10,excludeUserIds:s=[],appearance:u,size:d,disabled:f,onUpdated:p})=>{let m=e!==void 0,[h,g]=(0,j.useState)(t??[]),_=m?e:h,[v,y]=(0,j.useState)(``),[ce,b]=(0,j.useState)(!1),x=(0,j.useMemo)(()=>Array.from(new Set(s)),[s]),{results:S,loading:C}=me(v,{minChars:a,maxResults:Math.min(o+x.length,ge),loadInitialResults:ce}),w=(0,j.useMemo)(()=>{let e=new Map;for(let t of _)e.set(t.id,t);for(let t of S)e.set(t.id,t);return e},[_,S]),T=(0,j.useMemo)(()=>_.map(e=>e.id),[_]),E=(0,j.useMemo)(()=>P(S,T,x,o),[S,T,x,o]),le=(0,j.useCallback)((e,t)=>{let r=t.selectedOptions.filter(e=>e!==N).map(e=>w.get(e)).filter(e=>e!==void 0),i=P(S,r.map(e=>e.id),x,o);m||g(r),n?.(r),p?.({trigger:`selectionChanged`,searchQuery:``,selectedPeople:r,searchResults:i,loading:C}),y(``)},[m,o,n,p,w,C,S,x]),ue=(0,j.useCallback)(e=>{y(e.target.value)},[]),de=(0,j.useCallback)(()=>{b(!0)},[]),fe=(0,j.useCallback)(()=>{b(!1)},[]),pe=i!==void 0&&_.length>=i,D=(0,j.useRef)(!0);return(0,j.useEffect)(()=>{if(!p||C)return;let e=D.current&&v.length===0&&E.length===0;D.current=!1,!e&&p({trigger:`searchResultsUpdated`,searchQuery:v,selectedPeople:_,searchResults:E,loading:!1})},[_,E,p,C,v]),(0,M.jsxs)(ae,{onOptionSelect:le,selectedOptions:T,appearance:u,size:d,disabled:f,children:[(0,M.jsxs)(ee,{expandIcon:(0,M.jsx)(se,{}),children:[(0,M.jsx)(ne,{children:_.map(e=>(0,M.jsxs)(oe,{value:e.id,shape:`rounded`,children:[(0,M.jsx)(te,{hasSecondaryAction:!0,media:(0,M.jsx)(L,{person:e,size:16}),children:F(e)}),(0,M.jsx)(l,{"aria-label":`Remove ${F(e)}`})]},e.id))}),!pe&&(0,M.jsx)(re,{value:v,onChange:ue,onFocus:de,onBlur:fe,placeholder:_.length===0?r:void 0,disabled:f})]}),(0,M.jsxs)(c,{children:[v.length>=a&&!C&&E.length===0&&(0,M.jsx)(ie,{value:N,text:`No people found`,style:{pointerEvents:`none`,color:`var(--colorNeutralForegroundDisabled)`},children:`No people found`}),E.map(e=>(0,M.jsx)(ie,{value:e.id,media:(0,M.jsx)(L,{person:e,size:32}),secondaryContent:_e(e),children:F(e)},e.id))]})]})},R.__docgenInfo={description:`PeoplePicker — a tag-picker backed by Microsoft Graph people search.

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

@param event - Details about the update trigger and the picker state after the update.`}},composes:[`Pick`]}})),be=t((()=>{ye()})),z,B,V,H,xe,Se,U,W,G,K,q,J,Y,X,Z,Q,$,Ce;t((()=>{z=e(d()),h(),be(),D(),S(),b(),ue(),B=e(a()),{fn:V}=__STORYBOOK_MODULE_TEST__,H=new T({autoSignIn:!0}),xe=e=>{let[t,n]=(0,z.useState)([]),i=(0,z.useMemo)(()=>t.map(e=>e.id),[t]),{people:a,loading:o}=le((0,z.useMemo)(()=>i.length>0?{userIds:i,sortBy:`surname`,selectFields:[`givenName`,`surname`]}:{people:[],sortBy:`surname`,selectFields:[`givenName`,`surname`]},[i])),s=t=>{n(t),e.onSelectionChange?.(t)};return(0,B.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:16},children:[(0,B.jsx)(R,{...e,selectedPeople:t,onSelectionChange:s}),(0,B.jsxs)(u,{style:{display:`flex`,flexDirection:`column`,gap:8,padding:16,backgroundColor:r.colorNeutralBackground2},children:[(0,B.jsx)(m,{weight:`semibold`,children:`Stored object IDs`}),(0,B.jsx)(f,{children:`This mirrors the common app pattern where the picker drives selection, but persistence only stores Microsoft Entra object IDs.`}),(0,B.jsx)(`code`,{style:{whiteSpace:`pre-wrap`},children:i.length>0?JSON.stringify(i,null,2):`[]`})]}),(0,B.jsxs)(u,{style:{display:`flex`,flexDirection:`column`,gap:12,padding:16},children:[(0,B.jsx)(m,{weight:`semibold`,children:`Selected users sorted by surname`}),(0,B.jsxs)(f,{children:[`The list is resolved with `,(0,B.jsx)(`code`,{children:`usePeopleList`}),` using the stored IDs, then sorted by`,(0,B.jsx)(`code`,{children:`surname`}),`.`]}),i.length===0?(0,B.jsx)(m,{children:`Select a few people to populate the list.`}):o?(0,B.jsx)(p,{label:`Resolving selected users...`,size:`tiny`}):(0,B.jsx)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:a.map(e=>(0,B.jsx)(fe,{personDetails:e,view:`threelines`,fetchImage:!1},e.id))})]})]})},Se={title:`Components/PeoplePicker`,component:R,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:"Search and select one or more people from Microsoft Graph using the Fluent UI TagPicker.\n\nThe `PeoplePicker` supports both **controlled** and **uncontrolled** usage patterns.\n\nSee the **Selected Users List** story for the recommended consumer pattern when your app stores\nonly object IDs from picker selections and later resolves a sorted list with `usePeopleList`.\n\nWhen wrapping with a `MockProvider` (with `autoSignIn: true`), it uses built-in mock data so you can prototype without any auth configuration."}}},decorators:[e=>(0,B.jsx)(s,{theme:i,children:(0,B.jsx)(g,{provider:H,children:(0,B.jsx)(`div`,{style:{width:400},children:(0,B.jsx)(e,{})})})})],args:{onSelectionChange:V(),onUpdated:V()},argTypes:{placeholder:{control:`text`},maxPeople:{control:{type:`number`,min:1}},searchMinChars:{control:{type:`number`,min:1}},maxSearchResults:{control:{type:`number`,min:1}},appearance:{control:`select`,options:[`outline`,`underline`,`filled-darker`,`filled-lighter`]},size:{control:`select`,options:[`medium`,`large`]},disabled:{control:`boolean`}}},U={args:{placeholder:`Search for people...`}},W={name:`With Default Selected`,args:{placeholder:`Search for people...`,defaultSelectedPeople:[{id:`00000000-0000-0000-0000-000000000001`,displayName:`Adele Vance`,mail:`adelev@contoso.com`,userPrincipalName:`adelev@contoso.com`,jobTitle:`Product Manager`}]}},G={name:`Controlled`,render:e=>{let[t,n]=(0,z.useState)([{id:`00000000-0000-0000-0000-000000000010`,displayName:`Megan Bowen`,mail:`meganb@contoso.com`,userPrincipalName:`meganb@contoso.com`,jobTitle:`Marketing Manager`}]),r=t=>{n(t),e.onSelectionChange?.(t)};return(0,B.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,B.jsx)(R,{...e,selectedPeople:t,onSelectionChange:r}),(0,B.jsxs)(m,{size:200,children:[`Selected: `,t.map(e=>e.displayName).join(`, `)||`(none)`]})]})},args:{placeholder:`Search for people...`}},K={name:`Selected Users List`,render:e=>(0,B.jsx)(xe,{...e}),args:{placeholder:`Search and add people...`,maxPeople:5}},q={name:`Max 3 People`,args:{placeholder:`Search for up to 3 people...`,maxPeople:3}},J={name:`Min 2 Characters`,args:{placeholder:`Type 2+ characters to search...`,searchMinChars:2}},Y={name:`Size: Medium`,args:{placeholder:`Search...`,size:`medium`}},X={name:`Size: Large`,args:{placeholder:`Search...`,size:`large`}},Z={args:{placeholder:`Search for people...`,disabled:!0,defaultSelectedPeople:[{id:`00000000-0000-0000-0000-000000000001`,displayName:`Adele Vance`,mail:`adelev@contoso.com`}]}},Q={name:`Appearance: Underline`,args:{placeholder:`Search for people...`,appearance:`underline`}},$={name:`Appearance: Filled Darker`,args:{placeholder:`Search for people...`,appearance:`filled-darker`},decorators:[e=>(0,B.jsx)(s,{theme:i,children:(0,B.jsx)(g,{provider:H,children:(0,B.jsx)(`div`,{style:{width:400,padding:16,background:`var(--colorNeutralBackground1)`},children:(0,B.jsx)(e,{})})})})]},U.parameters={...U.parameters,docs:{...U.parameters?.docs,source:{originalSource:`{
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