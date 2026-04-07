import{a as e,n as t}from"./chunk-BneVvdWh.js";import{C as n,S as r,a as i,b as a,c as o,d as s,i as c,l,n as u,o as d,ot as f,r as p,s as ee,t as m,u as te,v as h,x as g,y as ne}from"./iframe-BpVdGDQQ.js";import{f as _,g as v,h as y,i as re,l as ie,n as b,o as x,p as S,r as ae,s as C,t as w,u as T}from"./MockProvider-Z5JMKjlZ.js";import{n as E,t as D}from"./usePersonData-CN-XxAiK.js";var O,k,A,oe,se=t((()=>{O=e(f()),x(),S(),ae(),k=`id,displayName,mail,userPrincipalName,jobTitle,department`,A=e=>e.trim().replace(/"/g,``).trim(),oe=(e,t)=>{let n=C(),r=y(),i=v(),a=t?.minChars??1,o=t?.maxResults??10,s=t?.loadInitialResults??!1,[c,l]=(0,O.useState)([]),[u,d]=(0,O.useState)(!1);return(0,O.useEffect)(()=>{let t=A(e),c=s&&e.length===0;if(!c&&(!t||t.length<a)){l([]),d(!1);return}let u=!1,f=async()=>{d(!0);try{if(re(r)){let e=await r.searchPeople(c?``:t,o);u||l(e)}else if(i===`SignedIn`&&n){let e;e=c?(await n.api(`/users`).select(k).top(o).get()).value??[]:(await n.api(`/users`).header(`ConsistencyLevel`,`eventual`).search(`"displayName:${t}" OR "mail:${t}" OR "userPrincipalName:${t}"`).select(k).top(o).get()).value??[],u||l(e)}else u||l([])}catch{u||l([])}finally{u||d(!1)}};if(c)return f(),()=>{u=!0};let p=setTimeout(()=>{f()},300);return()=>{u=!0,clearTimeout(p)}},[e,n,r,i,a,o,s]),{results:c,loading:u}}})),j,M,N,P,F,I,ce,L,R,z,B,V=t((()=>{j=e(f()),m(),ne(),se(),D(),T(),M=e(n()),N=`__no_results__`,P=50,F=(e,t,n,r)=>e.filter(e=>!t.includes(e.id)&&!n.includes(e.id)).slice(0,r),I=e=>e.displayName||e.mail||e.userPrincipalName||e.id,ce=e=>e.mail??e.userPrincipalName??void 0,L=({person:e,size:t,photoUrl:n})=>(0,M.jsx)(h,{name:e.displayName??void 0,image:n?{src:n}:void 0,initials:n?void 0:ie(e.displayName??void 0),size:t}),R=({person:e,size:t})=>{let{photoUrl:n}=E({userId:e.id,fetchPhoto:!0});return(0,M.jsx)(L,{person:e,size:t,photoUrl:n})},z=({person:e,size:t})=>e.photoUrl?(0,M.jsx)(L,{person:e,size:t,photoUrl:e.photoUrl}):(0,M.jsx)(R,{person:e,size:t}),B=({selectedPeople:e,defaultSelectedPeople:t,onSelectionChange:n,placeholder:r=`Search for people...`,maxPeople:s,searchMinChars:f=1,maxSearchResults:m=10,excludeUserIds:h=[],appearance:g,size:ne,disabled:_,onUpdated:v})=>{let y=e!==void 0,[re,ie]=(0,j.useState)(t??[]),b=y?e:re,[x,S]=(0,j.useState)(``),[ae,C]=(0,j.useState)(!1),w=(0,j.useMemo)(()=>Array.from(new Set(h)),[h]),{results:T,loading:E}=oe(x,{minChars:f,maxResults:Math.min(m+w.length,P),loadInitialResults:ae}),D=(0,j.useMemo)(()=>{let e=new Map;for(let t of b)e.set(t.id,t);for(let t of T)e.set(t.id,t);return e},[b,T]),O=(0,j.useMemo)(()=>b.map(e=>e.id),[b]),k=(0,j.useMemo)(()=>F(T,O,w,m),[T,O,w,m]),A=(0,j.useCallback)((e,t)=>{let r=t.selectedOptions.filter(e=>e!==N).map(e=>D.get(e)).filter(e=>e!==void 0),i=F(T,r.map(e=>e.id),w,m);y||ie(r),n?.(r),v?.({trigger:`selectionChanged`,searchQuery:``,selectedPeople:r,searchResults:i,loading:E}),S(``)},[y,m,n,v,D,E,T,w]),se=(0,j.useCallback)(e=>{S(e.target.value)},[]),L=(0,j.useCallback)(()=>{C(!0)},[]),R=(0,j.useCallback)(()=>{C(!1)},[]),B=s!==void 0&&b.length>=s,V=(0,j.useRef)(!0);return(0,j.useEffect)(()=>{if(!v||E)return;let e=V.current&&x.length===0&&k.length===0;V.current=!1,!e&&v({trigger:`searchResultsUpdated`,searchQuery:x,selectedPeople:b,searchResults:k,loading:!1})},[b,k,v,E,x]),(0,M.jsxs)(ee,{onOptionSelect:A,selectedOptions:O,appearance:g,size:ne,disabled:_,children:[(0,M.jsxs)(c,{expandIcon:(0,M.jsx)(a,{}),children:[(0,M.jsx)(u,{children:b.map(e=>(0,M.jsxs)(te,{value:e.id,shape:`rounded`,children:[(0,M.jsx)(l,{hasSecondaryAction:!0,media:(0,M.jsx)(z,{person:e,size:16}),children:I(e)}),(0,M.jsx)(o,{"aria-label":`Remove ${I(e)}`})]},e.id))}),!B&&(0,M.jsx)(d,{value:x,onChange:se,onFocus:L,onBlur:R,placeholder:b.length===0?r:void 0,disabled:_})]}),(0,M.jsxs)(i,{children:[x.length>=f&&!E&&k.length===0&&(0,M.jsx)(p,{value:N,text:`No people found`,style:{pointerEvents:`none`,color:`var(--colorNeutralForegroundDisabled)`},children:`No people found`}),k.map(e=>(0,M.jsx)(p,{value:e.id,media:(0,M.jsx)(z,{person:e,size:32}),secondaryContent:ce(e),children:I(e)},e.id))]})]})},B.__docgenInfo={description:`PeoplePicker — a tag-picker backed by Microsoft Graph people search.

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

@param event - Details about the update trigger and the picker state after the update.`}},composes:[`Pick`]}})),le=t((()=>{V()})),ue,H,U,de,W,G,K,q,J,Y,X,Z,Q,$,fe;t((()=>{ue=e(f()),m(),le(),S(),b(),H=e(n()),U=new w({autoSignIn:!0}),de={title:`Components/PeoplePicker`,component:B,tags:[`autodocs`],parameters:{layout:`padded`,docs:{description:{component:"Search and select one or more people from Microsoft Graph using the Fluent UI TagPicker.\n\nThe `PeoplePicker` supports both **controlled** and **uncontrolled** usage patterns.\n\nWhen wrapping with a `MockProvider` (with `autoSignIn: true`), it uses built-in mock data so you can prototype without any auth configuration."}}},decorators:[e=>(0,H.jsx)(g,{theme:r,children:(0,H.jsx)(_,{provider:U,children:(0,H.jsx)(`div`,{style:{width:400},children:(0,H.jsx)(e,{})})})})],argTypes:{placeholder:{control:`text`},maxPeople:{control:{type:`number`,min:1}},searchMinChars:{control:{type:`number`,min:1}},maxSearchResults:{control:{type:`number`,min:1}},appearance:{control:`select`,options:[`outline`,`underline`,`filled-darker`,`filled-lighter`]},size:{control:`select`,options:[`small`,`medium`,`large`]},disabled:{control:`boolean`}}},W={args:{placeholder:`Search for people...`}},G={name:`With Default Selected`,args:{placeholder:`Search for people...`,defaultSelectedPeople:[{id:`00000000-0000-0000-0000-000000000001`,displayName:`Adele Vance`,mail:`adelev@contoso.com`,userPrincipalName:`adelev@contoso.com`,jobTitle:`Product Manager`}]}},K={name:`Controlled`,render:e=>{let[t,n]=(0,ue.useState)([{id:`00000000-0000-0000-0000-000000000010`,displayName:`Megan Bowen`,mail:`meganb@contoso.com`,userPrincipalName:`meganb@contoso.com`,jobTitle:`Marketing Manager`}]);return(0,H.jsxs)(`div`,{style:{display:`flex`,flexDirection:`column`,gap:12},children:[(0,H.jsx)(B,{...e,selectedPeople:t,onSelectionChange:n}),(0,H.jsxs)(s,{size:200,children:[`Selected: `,t.map(e=>e.displayName).join(`, `)||`(none)`]})]})},args:{placeholder:`Search for people...`}},q={name:`Max 3 People`,args:{placeholder:`Search for up to 3 people...`,maxPeople:3}},J={name:`Min 2 Characters`,args:{placeholder:`Type 2+ characters to search...`,searchMinChars:2}},Y={name:`Size: Small`,args:{placeholder:`Search...`,size:`small`}},X={name:`Size: Large`,args:{placeholder:`Search...`,size:`large`}},Z={args:{placeholder:`Search for people...`,disabled:!0,defaultSelectedPeople:[{id:`00000000-0000-0000-0000-000000000001`,displayName:`Adele Vance`,mail:`adelev@contoso.com`}]}},Q={name:`Appearance: Underline`,args:{placeholder:`Search for people...`,appearance:`underline`}},$={name:`Appearance: Filled Darker`,args:{placeholder:`Search for people...`,appearance:`filled-darker`},decorators:[e=>(0,H.jsx)(g,{theme:r,children:(0,H.jsx)(_,{provider:U,children:(0,H.jsx)(`div`,{style:{width:400,padding:16,background:`var(--colorNeutralBackground1)`},children:(0,H.jsx)(e,{})})})})]},W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'Search for people...'
  }
}`,...W.parameters?.docs?.source},description:{story:`Default uncontrolled usage — start typing to search for people.
Try "adele", "megan", or "alex" to see results.`,...W.parameters?.docs?.description}}},G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
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
}`,...G.parameters?.docs?.source},description:{story:`Shows how to pre-select people in uncontrolled mode.`,...G.parameters?.docs?.description}}},K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
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
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }}>
        <PeoplePicker {...args} selectedPeople={selected} onSelectionChange={setSelected} />
        <Text size={200}>
          Selected: {selected.map(p => p.displayName).join(', ') || '(none)'}
        </Text>
      </div>;
  },
  args: {
    placeholder: 'Search for people...'
  }
}`,...K.parameters?.docs?.source},description:{story:`Controlled PeoplePicker that logs selection changes.`,...K.parameters?.docs?.description}}},q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
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
  name: 'Size: Small',
  args: {
    placeholder: 'Search...',
    size: 'small'
  }
}`,...Y.parameters?.docs?.source},description:{story:`Compact small size variant.`,...Y.parameters?.docs?.description}}},X.parameters={...X.parameters,docs:{...X.parameters?.docs,source:{originalSource:`{
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
}`,...$.parameters?.docs?.source},description:{story:`Filled appearance with a darker background.`,...$.parameters?.docs?.description}}},fe=[`Default`,`WithDefaultSelected`,`Controlled`,`MaxThreePeople`,`MinTwoChars`,`SmallSize`,`LargeSize`,`Disabled`,`UnderlineAppearance`,`FilledDarkerAppearance`]}))();export{K as Controlled,W as Default,Z as Disabled,$ as FilledDarkerAppearance,X as LargeSize,q as MaxThreePeople,J as MinTwoChars,Y as SmallSize,Q as UnderlineAppearance,G as WithDefaultSelected,fe as __namedExportsOrder,de as default};