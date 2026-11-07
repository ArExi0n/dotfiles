"use strict";var St=Object.create;var O=Object.defineProperty;var xt=Object.getOwnPropertyDescriptor;var $t=Object.getOwnPropertyNames;var Ut=Object.getPrototypeOf,Ot=Object.prototype.hasOwnProperty;var bt=(t,e)=>{for(var o in e)O(t,o,{get:e[o],enumerable:!0})},J=(t,e,o,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of $t(e))!Ot.call(t,a)&&a!==o&&O(t,a,{get:()=>e[a],enumerable:!(n=xt(e,a))||n.enumerable});return t};var N=(t,e,o)=>(o=t!=null?St(Ut(t)):{},J(e||!t||!t.__esModule?O(o,"default",{value:t,enumerable:!0}):o,t)),qt=t=>J(O({},"__esModule",{value:!0}),t);var Vt={};bt(Vt,{default:()=>Rt});module.exports=qt(Vt);var k=require("@raycast/api"),et=require("@raycast/utils"),b=N(require("react"));var _=require("@linear/sdk"),X=require("@raycast/api"),Y=require("@raycast/utils"),S=null;async function Tt(t,e,o,n,a){let s=JSON.stringify({query:o,variables:n}),i=new Headers(e.headers);new Headers(a).forEach((m,P)=>i.set(P,m)),i.set("Content-Type","application/json");let c=await fetch(t,{...e,method:"POST",headers:Object.fromEntries(i.entries()),body:s}),d=c.headers.get("Content-Type")?.startsWith("application/json")?await c.json():await c.text();if(typeof d!="string"&&c.ok&&!d.errors&&d.data)return{...d,headers:c.headers,status:c.status};throw new Error(typeof d=="string"?d:d.errors?.[0]?.message??`GraphQL Error (${c.status})`)}var Q=Y.OAuthService.linear({scope:"read write",onAuthorize({token:t}){S=new _.LinearClient({accessToken:t,headers:{"public-file-urls-expire-in":"60","linear-raycast-extension-name":X.environment.extensionName}});let e=S.client;e.rawRequest=((o,n,a)=>Tt(e.url,e.options,o,n,a))}});function y(){if(!S)throw new Error("No linear client initialized");return{linearClient:S,graphQLClient:S.client}}var Z=require("@raycast/api"),x=!1;async function tt(){x=!!(await(0,Z.getApplications)()).find(o=>o.bundleId==="com.linear")}var v=require("react/jsx-runtime");function Et({children:t}){return(0,b.useEffect)(()=>{tt()},[]),t}var M=class extends b.default.Component{constructor(e){super(e),this.state={error:null}}static getDerivedStateFromError(e){return{error:e}}render(){let{error:e}=this.state;if(!e)return this.props.children;if(!(e.message.includes("invalid_grant")||e.message.includes("Error while fetching tokens")||e.message.includes("Could not initialize OAuth")))throw e;return(0,v.jsx)(k.Detail,{markdown:`# Sign In Failed

Failed to authenticate with Linear:
\`\`\`
${e.message}
\`\`\`

This can happen when the network is unreliable or the authorization code has expired. Please try signing in again.`,actions:(0,v.jsx)(k.ActionPanel,{children:(0,v.jsx)(k.Action,{title:"Sign in Again",onAction:async()=>{await Q.client.removeTokens(),this.setState({error:null})}})})})}},Nt=(0,et.withAccessToken)(Q)(Et);function F({children:t}){return(0,v.jsx)(M,{children:(0,v.jsx)(Nt,{children:t})})}var f=require("@raycast/api"),U=require("react");var ot=N(require("fs")),nt=require("@raycast/api"),it=N(require("node-emoji"));function C({icon:t,color:e,fallbackIcon:o}){if(!t)return o;if(/:(.*):/.test(t))return it.get(t)??o;let a=`${nt.environment.assetsPath}/linear-icons/${t.toLowerCase()}.svg`;return ot.default.existsSync(a)?{source:a,...e?{tintColor:{light:e,dark:e,adjustContrast:!0}}:{}}:o}function A(t){return C({icon:t.icon??void 0,color:t.color??void 0,fallbackIcon:{source:{light:"light/initiative.svg",dark:"dark/initiative.svg"}}})}function w(t){return t?C({icon:t.icon??void 0,color:t.color??void 0,fallbackIcon:{source:{light:"light/project.svg",dark:"dark/project.svg"}}}):{source:{light:"light/no-project.svg",dark:"dark/no-project.svg"}}}var G=require("@raycast/utils");var Qt=`
  id
  url
  icon
  color
  createdAt
  sortOrder
  title
  updatedAt
  project {
    id
    name
    icon
    color
  }
  initiative {
    id
    name
    color
    icon
  }
  creator {
    displayName
    avatarUrl
    email
  }
`;async function rt(t){let{graphQLClient:e}=y(),{data:o}=await e.rawRequest(`
      query($documentId: ID!) {
        documents(filter: { id: { eq: $documentId } }) {
          nodes {
            content
            ${Qt}
          }
        }
      }
    `,{documentId:t});return o?.documents.nodes?.[0]}var at=require("lodash");var Mt=`
  id
  url
  icon
  color
  createdAt
  sortOrder
  title
  updatedAt
  project {
    id
    name
    icon
    color
  }
  initiative {
    id
    name
    color
    icon
  }
  creator {
    displayName
    avatarUrl
    email
  }
`;async function st(t="",e={projectId:""}){let{graphQLClient:o}=y(),n="projectId"in e&&e.projectId.length>0,a="initiativeId"in e&&e.initiativeId.length>0,s=`nodes { ${Mt} } pageInfo { hasNextPage }`,i=n?`
      query($query: String!, $projectId: ID!) {
        documents(orderBy: updatedAt, filter: { and: [
          { title: { containsIgnoreCase: $query } },
          { project: { id: { eq: $projectId } } }
        ] }) { ${s} } }
    `:a?`
      query($query: String!, $initiativeId: ID!) {
        documents(orderBy: updatedAt, filter: { and: [
          { title: { containsIgnoreCase: $query } },
          { initiative: { id: { eq: $initiativeId } } }
        ] }) { ${s} } }
    `:`
      query($query: String!) { documents(orderBy: updatedAt, filter: { title: { containsIgnoreCase: $query } }) { ${s} } }
    `,c=n||a?{query:t.trim(),...e}:{query:t.trim()},{data:d}=await o.rawRequest(i,c),m=(0,at.sortBy)(d?.documents.nodes??[],j=>j.sortOrder??1/0),P=!!d?.documents.pageInfo.hasNextPage;return{docs:m,hasMoreDocs:P}}function ct(t="",e={projectId:""}){let{data:o,error:n,isLoading:a,mutate:s}=(0,G.useCachedPromise)(st,[t,e],{failureToastOptions:{title:"Failed to load documents"},keepPreviousData:!0});return{docs:o?.docs,docsError:n,isLoadingDocs:!o&&!n||a,supportsDocTypeahead:t.trim().length>0||o?.hasMoreDocs,mutateDocs:s}}function ut(t){let{data:e,error:o,isLoading:n,mutate:a}=(0,G.useCachedPromise)(rt,[t],{failureToastOptions:{title:"Failed to load document content"}});return{doc:e,docError:o,isLoadingDoc:!e&&!o||n,mutateDoc:a}}var dt=require("@raycast/utils");var lt=require("lodash");var Ft=`
  id
  name
  color
  icon
  description
  sortOrder
  projects {
    nodes {
      id
    }
  }
`;async function mt(){let{graphQLClient:t}=y(),{data:e}=await t.rawRequest(`
      query {
        initiatives(orderBy: updatedAt) {
          nodes {
            ${Ft}
          }
        }
      }
    `);return(0,lt.sortBy)(e?.initiatives.nodes??[],o=>o.sortOrder??1/0)}function pt(){let{data:t,error:e,isLoading:o,mutate:n}=(0,dt.useCachedPromise)(mt,[],{failureToastOptions:{title:"Failed to load initiatives"},keepPreviousData:!0});return{initiatives:t,initiativesError:e,isLoadingInitiatives:!t&&!e||o,mutateInitiatives:n}}var ft=require("@raycast/utils");var Gt=`
  id
  name
  description
  icon
  color
  progress
  url
  status {
    id
    name
    type
    color
  }
  lead {
    id
    displayName
    avatarUrl
    email
  }
  startDate
  targetDate
  members {
    nodes {
      id
    }
  }
  teams {
    nodes {
      key
      id
    }
  }
`;async function gt({teamId:t,searchText:e="",after:o=null,first:n=null}){let{graphQLClient:a}=y(),s=`
    projects(first: $first, after: $after, filter: { name: { containsIgnoreCase: $searchText } }) {
      nodes {
        ${Gt}
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  `;if(!t){let{data:d}=await a.rawRequest(`
        query($first: Int, $after: String, $searchText: String) {
          ${s}
        }
      `,{first:n,after:o,searchText:e}),m=d?.projects;return{data:m?.nodes??[],hasMore:!!m?.pageInfo.hasNextPage,cursor:m?.pageInfo.endCursor||null}}let{data:i}=await a.rawRequest(`
      query($teamId: String!, $first: Int, $after: String, $searchText: String) {
        team(id: $teamId) {
          ${s}
        }
      }
    `,{teamId:t,first:n,after:o,searchText:e}),c=i?.team?.projects;return{data:c?.nodes??[],hasMore:!!c?.pageInfo.hasNextPage,cursor:c?.pageInfo.endCursor||null}}function B(t,e){let{data:o,error:n,isLoading:a,mutate:s,pagination:i}=(0,ft.useCachedPromise)((c,d)=>m=>gt({teamId:c,searchText:d,after:m.cursor,first:e?.pageSize}),[t,e?.searchText],{execute:e?.execute!==!1,keepPreviousData:!0});return{projects:o,isLoadingProjects:!o&&!n||a,projectsError:n,mutateProjects:s,pagination:i}}var g=require("@raycast/api"),At=require("date-fns");function ht(t){return[t.project?.name??"",t.initiative?.name??"",t.title,t.creator?.displayName??""]}function yt(t){return t?`Creator: ${t.displayName} (${t.email})`:void 0}var q=require("@raycast/api");function Dt(t){return C({icon:t.icon??void 0,color:t.color??void 0,fallbackIcon:{source:q.Icon.Document,tintColor:t.color??q.Color.PrimaryText}})}var T=require("@raycast/api"),It=require("@raycast/utils");function Pt(t){return t?{source:t.avatarUrl?encodeURI(t.avatarUrl):(0,It.getAvatarIcon)(t.displayName.toUpperCase()),mask:T.Image.Mask.Circle}:T.Icon.Person}var W=require("@raycast/api");var V=require("react/jsx-runtime");function $({title:t,url:e,...o}){return x?(0,V.jsx)(W.Action.Open,{title:`${t||"Open"} in Linear`,icon:"linear-app-icon.png",target:e,application:"Linear",...o}):(0,V.jsx)(W.Action.OpenInBrowser,{url:e,title:`${t||"Open"} in Browser`})}var r=require("@raycast/api");async function jt(t){let{graphQLClient:e}=y(),{data:o}=await e.rawRequest(`
      mutation {
        documentDelete(id: "${t}") {
          success
        }
      }
    `);return{success:o?.documentDelete.success}}async function vt(t,e){let{graphQLClient:o}=y(),n=`projectId: ${e.projectId?`"${e.projectId}"`:null}`;n+=`, initiativeId: ${e.initiativeId?`"${e.initiativeId}"`:null}`;let{data:a}=await o.rawRequest(`
      mutation {
        documentUpdate(id: "${t}", input: {${n}}) {
          success
        }
      }
    `);return{success:a?.documentUpdate.success}}function z(t){return t instanceof Error?t.message:String(t)}var l=require("react/jsx-runtime");function Bt({doc:t,mutateDocs:e,projects:o,initiatives:n,mutateDoc:a}){let s=async i=>{let c="project"in i,d=`to ${c?`Project: ${i.project.name}`:`Initiative: ${i.initiative.name}`}`,m=await(0,r.showToast)(r.Toast.Style.Animated,"Moving document",d),P=c?{projectId:i.project.id}:{initiativeId:i.initiative.id},j=e(vt(t.id,P),{optimisticUpdate:h=>{if(!h)return;let u=c?{project:{...i.project},initiative:void 0}:{initiative:{...i.initiative},project:void 0};return{...h,docs:h.docs?.map(p=>p.id!==t.id?p:{...p,...u,updatedAt:new Date})}}});(a?a(j,{optimisticUpdate:h=>{if(!h)return;let u=c?{project:{...i.project},initiative:void 0}:{initiative:{...i.initiative},project:void 0};return{...h,...u,updatedAt:new Date}}}):j).then(({success:h})=>{h&&(m.style=r.Toast.Style.Success,m.title="Moved document")}).catch(h=>{m.style=r.Toast.Style.Failure,m.title="Failed to move document",m.message=z(h),m.primaryAction={title:"Retry",onAction:()=>s(i),shortcut:r.Keyboard.Shortcut.Common.Refresh}})};return((o??[]).length>0||(n??[]).length>0)&&(0,l.jsxs)(r.ActionPanel.Submenu,{title:"Move Document",icon:r.Icon.Move,shortcut:{macOS:{modifiers:["cmd","shift"],key:"m"},Windows:{modifiers:["ctrl","shift"],key:"m"}},filtering:{keepSectionOrder:!0},children:[(n??[]).length>0&&(0,l.jsx)(r.ActionPanel.Section,{title:"Initiatives",children:n?.filter(i=>i.id!==t.initiative?.id).map(i=>(0,l.jsx)(r.Action,{title:i.name,icon:A(i),onAction:()=>s({initiative:i})},i.id))}),(o??[]).length>0&&(0,l.jsx)(r.ActionPanel.Section,{title:"Projects",children:o?.filter(i=>i.id!==t.project?.id).map(i=>(0,l.jsx)(r.Action,{title:i.name,icon:w(i),onAction:()=>s({project:i})},i.id))})]})}function Wt({doc:t,mutateDocs:e,deleteUnsupported:o}){if(o)return(0,l.jsx)(l.Fragment,{});let n=()=>(0,r.confirmAlert)({title:"Delete Document",message:`Are you sure you want to delete '${t.title}'?`,icon:{source:r.Icon.DeleteDocument,tintColor:r.Color.Red},primaryAction:{title:"Delete",style:r.Alert.ActionStyle.Destructive,onAction:a}}),a=async()=>{let s=await(0,r.showToast)(r.Toast.Style.Animated,"Deleting document",t.title);e(jt(t.id),{optimisticUpdate:i=>{if(i)return{...i,docs:i.docs?.filter(c=>c.id!==t.id)}}}).then(({success:i})=>{i&&(s.style=r.Toast.Style.Success,s.title="Document deleted")}).catch(i=>{s.style=r.Toast.Style.Failure,s.title="Failed to delete document",s.message=z(i),s.primaryAction={title:"Retry",onAction:a,shortcut:r.Keyboard.Shortcut.Common.Refresh}})};return(0,l.jsx)(r.Action,{title:"Delete Document",icon:{source:r.Icon.DeleteDocument,tintColor:r.Color.Red},onAction:n,style:r.Action.Style.Destructive,shortcut:r.Keyboard.Shortcut.Common.Remove})}function E({doc:t,hideOpenInLinear:e,...o}){return(0,l.jsxs)(l.Fragment,{children:[e?null:(0,l.jsx)($,{title:"Open Document",url:t.url}),(0,l.jsxs)(r.ActionPanel.Section,{children:[(0,l.jsx)(Bt,{doc:t,...o}),(0,l.jsx)(Wt,{doc:t,...o})]}),(0,l.jsxs)(r.ActionPanel.Section,{children:[(0,l.jsx)(r.Action.CreateQuicklink,{icon:r.Icon.RaycastLogoPos,title:"Create Quicklink",shortcut:{macOS:{modifiers:["cmd","shift"],key:"s"},Windows:{modifiers:["ctrl","shift"],key:"s"}},quicklink:{link:t.url,name:t.title,application:x?"Linear":void 0}}),(0,l.jsx)(r.Action.CopyToClipboard,{icon:r.Icon.Link,content:t.url,title:"Copy Link",shortcut:r.Keyboard.Shortcut.Common.CopyPath}),(0,l.jsx)(r.Action.CopyToClipboard,{icon:r.Icon.Clipboard,content:t.title,title:"Copy Title",shortcut:{macOS:{modifiers:["cmd","shift"],key:"'"},Windows:{modifiers:["ctrl","shift"],key:"'"}}})]})]})}var R=require("@raycast/api"),kt=require("node-emoji");var L=require("react/jsx-runtime");function Ct({doc:t,...e}){let{doc:o,isLoadingDoc:n,mutateDoc:a}=ut(t.id),s="";return o?.content&&(s=`# ${o.title}

${(0,kt.emojify)(o.content)}`),(0,L.jsx)(R.Detail,{markdown:s,isLoading:n,navigationTitle:t.title,actions:(0,L.jsxs)(R.ActionPanel,{children:[(0,L.jsx)(R.Action.CopyToClipboard,{title:"Copy Markdown",content:s}),o&&(0,L.jsx)(E,{doc:o,mutateDoc:a,...e,deleteUnsupported:!0})]})})}var I=require("react/jsx-runtime");function wt({doc:t,...e}){let{primaryAction:o}=(0,g.getPreferenceValues)(),n=o==="openInLinear",a=ht(t),s=t.updatedAt?new Date(t.updatedAt):new Date(t.createdAt);return(0,I.jsx)(g.List.Item,{title:t.title,keywords:a,icon:Dt(t),accessories:[...t.project?[{tag:{value:t.project.name,color:t.project.color?{light:t.project.color,dark:t.project.color,adjustContrast:!0}:g.Color.SecondaryText},icon:w(t.project)}]:[],...t.initiative?[{tag:{value:t.initiative.name,color:t.initiative.color?{light:t.initiative.color,dark:t.initiative.color,adjustContrast:!0}:g.Color.SecondaryText},icon:A(t.initiative)}]:[],{date:s,icon:g.Icon.Clock,tooltip:`Updated: ${(0,At.format)(s,"MM/dd/yyyy")}`},{icon:Pt(t.creator),tooltip:yt(t.creator)}],actions:(0,I.jsxs)(g.ActionPanel,{children:[n?(0,I.jsx)($,{title:"Open Document",url:t.url}):null,(0,I.jsx)(g.Action.Push,{title:"Show Content",target:(0,I.jsx)(Ct,{doc:t,...e}),icon:g.Icon.Eye}),(0,I.jsx)(E,{doc:t,hideOpenInLinear:n,...e})]})},t.id)}var D=require("react/jsx-runtime");function Lt({project:t}){let[e,o]=(0,U.useState)(""),[n,a]=(0,U.useState)({projectId:""}),{projects:s,isLoadingProjects:i}=B(),{initiatives:c,isLoadingInitiatives:d}=pt(),{docs:m,isLoadingDocs:P,supportsDocTypeahead:j,mutateDocs:H}=ct(e,n),h=(0,U.useMemo)(()=>{if(!m)return[];let u=m??[];if("initiativeId"in n&&n.initiativeId.length>0&&(c??[]).length>0)return u.filter(p=>p.initiative&&p.initiative.id===n.initiativeId);if((s??[]).length>0){if(t)return u.filter(p=>p.project&&p.project.id===t.id);if("projectId"in n&&n.projectId.length>0)return u.filter(p=>p.project&&p.project.id===n.projectId)}return u},[t,n,m,s,c]);return(0,D.jsxs)(f.List,{isLoading:i||P||d,navigationTitle:t?`${t.name} Documents`:void 0,...!t&&((s??[]).length>0||(c??[]).length>0)?{searchBarAccessory:(0,D.jsxs)(f.List.Dropdown,{tooltip:"Change Entity",onChange:u=>{let p=u.startsWith("initiative:")?{initiativeId:u.replace("initiative:","")}:{projectId:u.replace("project:","")};a(p)},storeValue:!0,children:[(0,D.jsx)(f.List.Dropdown.Item,{value:"",title:"All Documents"}),(c??[]).length>0&&(0,D.jsx)(f.List.Dropdown.Section,{title:"Initiatives",children:c?.map(u=>(0,D.jsx)(f.List.Dropdown.Item,{value:`initiative:${u.id}`,title:u.name,icon:A(u),keywords:[u.name,u.description??""]},u.id))}),(s??[]).length>0&&(0,D.jsx)(f.List.Dropdown.Section,{title:"Projects",children:s?.map(u=>(0,D.jsx)(f.List.Dropdown.Item,{value:`project:${u.id}`,title:u.name,icon:w(u),keywords:[u.name,u.description]},u.id))})]})}:{},...j?{onSearchTextChange:o,searchBarPlaceholder:"Search by document title",throttle:!0}:{searchBarPlaceholder:"Filter by title, creator, project or initiative name"},children:[h.map(u=>(0,D.jsx)(wt,{doc:u,mutateDocs:H,projects:s,initiatives:c},u.id)),(0,D.jsx)(f.List.EmptyView,{title:"No documents found",icon:{source:f.Icon.DeleteDocument,tintColor:f.Color.Orange}})]})}var K=require("react/jsx-runtime");function Rt(){return(0,K.jsx)(F,{children:(0,K.jsx)(Lt,{})})}
