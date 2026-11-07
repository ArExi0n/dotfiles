"use strict";var xi=Object.create;var ht=Object.defineProperty;var vi=Object.getOwnPropertyDescriptor;var ji=Object.getOwnPropertyNames;var Mi=Object.getPrototypeOf,Ui=Object.prototype.hasOwnProperty;var Fi=(e,t)=>{for(var s in t)ht(e,s,{get:t[s],enumerable:!0})},ms=(e,t,s,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of ji(t))!Ui.call(e,i)&&i!==s&&ht(e,i,{get:()=>t[i],enumerable:!(r=vi(t,i))||r.enumerable});return e};var ct=(e,t,s)=>(s=e!=null?xi(Mi(e)):{},ms(t||!e||!e.__esModule?ht(s,"default",{value:e,enumerable:!0}):s,e)),Ei=e=>ms(ht({},"__esModule",{value:!0}),e);var dr={};Fi(dr,{default:()=>Di});module.exports=Ei(dr);var us=require("@raycast/api"),$i=require("react");var re=require("@raycast/api"),xt=require("date-fns");var ne=require("date-fns"),Ni=10080*60*1e3;function xe(e){let t=Date.now(),s=Date.now()+Ni,r=new Date(e.startsAt),i=new Date(e.endsAt),c=!e.completedAt&&(0,ne.isBefore)(r,t)&&(0,ne.isAfter)(i,t),a=!e.completedAt&&(0,ne.isBefore)(r,s)&&(0,ne.isAfter)(i,s),n=c?{light:"light/active-cycle.svg",dark:"dark/active-cycle.svg"}:{light:"light/cycle.svg",dark:"dark/cycle.svg"},o=`Cycle ${e.number} (${(0,ne.format)(r,"dd MMM")} - ${(0,ne.format)(i,"dd MMM")})`,d=c?`Active ${o}`:o;return{...e,isActive:c,isNext:a,icon:n,title:d}}function ke(e){return e.filter(t=>(0,ne.isAfter)(new Date(t.endsAt),Date.now())).map(xe)}var Ke=require("@raycast/api"),kt=require("date-fns");function Pt(e){let t=(0,kt.differenceInDays)(e,(0,kt.startOfToday)()),s=Ke.Color.PrimaryText;return t<=7&&(s=Ke.Color.Orange),t<=0&&(s=Ke.Color.Red),{source:Ke.Icon.Calendar,tintColor:s}}var ps={exponential:[0,1,2,4,8,16,32,64],fibonacci:[0,1,2,3,5,8,13,21],linear:[0,1,2,3,4,5,6,7],tShirt:[0,1,2,3,5,8,13,21]},gs={0:"\u2013",1:"XS",2:"S",3:"M",5:"L",8:"XL",13:"XXL",21:"XXXL"};function St({estimate:e,issueEstimationType:t}){if(!e)return"Not estimated";if(t==="tShirt"){let s=gs[e];return s||String(e)}return String(e)}function Xe({issueEstimationType:e,issueEstimationAllowZero:t,issueEstimationExtended:s}){if(e==="notUsed")return null;let r=t?0:1,i=s?ps[e].length:6,c=ps[e].slice(r,i);return e==="tShirt"?c.map(a=>({estimate:a,label:gs[a]})):c.map(a=>({estimate:a,label:a!==1?`${a} points`:`${a} point`}))}var ae={0:{light:"light/priority-no-priority.svg",dark:"dark/priority-no-priority.svg"},1:{light:"light/priority-urgent.svg",dark:"dark/priority-urgent.svg"},2:{light:"light/priority-high.svg",dark:"dark/priority-high.svg"},3:{light:"light/priority-medium.svg",dark:"dark/priority-medium.svg"},4:{light:"light/priority-low.svg",dark:"dark/priority-low.svg"}};var fs=ct(require("fs")),Is=require("@raycast/api"),ys=ct(require("node-emoji"));function bt({icon:e,color:t,fallbackIcon:s}){if(!e)return s;if(/:(.*):/.test(e))return ys.get(e)??s;let i=`${Is.environment.assetsPath}/linear-icons/${e.toLowerCase()}.svg`;return fs.default.existsSync(i)?{source:i,...t?{tintColor:{light:t,dark:t,adjustContrast:!0}}:{}}:s}function le(e){return e?bt({icon:e.icon??void 0,color:e.color??void 0,fallbackIcon:{source:{light:"light/project.svg",dark:"dark/project.svg"}}}):{source:{light:"light/no-project.svg",dark:"dark/no-project.svg"}}}var hs=require("lodash");var Oi={triage:{light:"light/triage.svg",dark:"dark/triage.svg"},backlog:{light:"light/backlog.svg",dark:"dark/backlog.svg"},unstarted:{light:"light/unstarted.svg",dark:"dark/unstarted.svg"},started:{light:"light/started.svg",dark:"dark/started.svg"},completed:{light:"light/completed.svg",dark:"dark/completed.svg"},canceled:{light:"light/canceled.svg",dark:"dark/canceled.svg"}};function z(e){return{source:Oi[e.type],tintColor:{light:e.color,dark:e.color,adjustContrast:!0}}}function Je(e,t=["triage","backlog","unstarted","started","completed","canceled"]){if(e.length===0)return[];let s=(0,hs.groupBy)(e,r=>r.type);return t.filter(r=>!!s[r]).map(r=>s[r]).flat()}var Ct=require("@raycast/api"),ks=require("@raycast/utils");function K(e){return e?{source:e.avatarUrl?encodeURI(e.avatarUrl):(0,ks.getAvatarIcon)(e.displayName.toUpperCase()),mask:Ct.Image.Mask.Circle}:Ct.Icon.Person}var g=require("@raycast/api"),ns=require("date-fns"),Ai=require("react");var Ps=require("@linear/sdk"),Ss=require("@raycast/api"),bs=require("@raycast/utils"),ut=null;async function Vi(e,t,s,r,i){let c=JSON.stringify({query:s,variables:r}),a=new Headers(t.headers);new Headers(i).forEach((d,u)=>a.set(u,d)),a.set("Content-Type","application/json");let n=await fetch(e,{...t,method:"POST",headers:Object.fromEntries(a.entries()),body:c}),o=n.headers.get("Content-Type")?.startsWith("application/json")?await n.json():await n.text();if(typeof o!="string"&&n.ok&&!o.errors&&o.data)return{...o,headers:n.headers,status:n.status};throw new Error(typeof o=="string"?o:o.errors?.[0]?.message??`GraphQL Error (${n.status})`)}var Ft=bs.OAuthService.linear({scope:"read write",onAuthorize({token:e}){ut=new Ps.LinearClient({accessToken:e,headers:{"public-file-urls-expire-in":"60","linear-raycast-extension-name":Ss.environment.extensionName}});let t=ut.client;t.rawRequest=((s,r,i)=>Vi(t.url,t.options,s,r,i))}});function k(){if(!ut)throw new Error("No linear client initialized");return{linearClient:ut,graphQLClient:ut.client}}function V(e){return e instanceof Error?e.message:String(e)}var Cs=require("@raycast/utils");function ve(e=""){let{linearClient:t}=k(),{data:s,error:r,isLoading:i}=(0,Cs.useCachedPromise)(async c=>{let a=await t.users(c.trim().length>0?{filter:{name:{containsIgnoreCase:c}}}:void 0);return{users:a?.nodes??[],hasMoreUsers:!!a?.pageInfo?.hasNextPage}},[e],{initialData:[]});return{users:s?.users,supportsUserTypeahead:e.trim().length>0||s?.hasMoreUsers,usersError:r,isLoadingUsers:!s&&!r||i}}var w=require("@raycast/api"),Us=require("@raycast/utils"),Fs=require("nanoid"),Ue=require("react");var ws=require("@raycast/api");async function Et(e,t,s,r,i){let c=r,a=!0,n,o=0;for(;a&&o<i;){let d=await e(n);c=s(c,d),a=t(d)?.hasNextPage,n=t(d)?.endCursor,o++}return c}var qi=(0,ws.getPreferenceValues)();function Nt({inFilterBlock:e,addComma:t,inParentheses:s}={inFilterBlock:!1,inParentheses:!1,addComma:!0}){return qi.shouldHideRedundantIssues?[...s?["("]:[],...t?[", "]:[],...e?[]:["filter: { "],"completedAt: { null: true }, canceledAt: { null: true }",...e?[]:[" }"],...s?[")"]:[]].join(""):""}var je=`
  id
  identifier
  title
  branchName
  priority
  priorityLabel
  estimate
  dueDate
  updatedAt
  url
  number
  labels {
    nodes {
      id
      name
      color
    }
  }
  state {
    id
    type
    name
    color
  }
  assignee {
    id
    displayName
    email
    avatarUrl
  }
  team {
    id
    issueEstimationType
    issueEstimationAllowZero
    issueEstimationExtended
    activeCycle {
      id
    }
  }
  cycle {
    id
    number
    startsAt
    endsAt
    completedAt
  }
  parent {
    id
    title
    number
    state {
      type
      color
    }
  }
  project {
    id
    name
    icon
    color
  }
  projectMilestone {
    id
    name
  }
`;async function As(e){let{graphQLClient:t}=k(),{data:s}=await t.rawRequest(`
      query($after: String) {
        issues(first: 25, orderBy: updatedAt, after: $after${Nt()}) {
          nodes {
            ${je}
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `,{after:e});return{issues:s?.issues.nodes,pageInfo:s?.issues.pageInfo}}async function Ls(e,t,s=25){let{graphQLClient:r}=k(),{data:i}=await r.rawRequest(`
      query($term: String!, $after: String, $first: Int, $includeArchived: Boolean) {
        searchIssues(first: $first, term: $term, after: $after, includeArchived: $includeArchived) {
          nodes {
            ${je}
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    `,{term:e,after:t,first:s,includeArchived:!1});return{issues:i?.searchIssues.nodes,pageInfo:i?.searchIssues.pageInfo}}async function Ye(){let{graphQLClient:e}=k(),{data:t}=await e.rawRequest(`
      query {
        issues(orderBy: createdAt${Nt()}) {
          nodes {
            ${je}
          }
        }
      }
    `);return t?.issues.nodes}async function Ts(e){let{graphQLClient:t}=k(),{data:s}=await t.rawRequest(`
      query($issueId: String!) {
        issue(id: $issueId) {
          children${Nt({inParentheses:!0})} {
            nodes {
              ${je}
              sortOrder
            }
          }
        }
      }
    `,{issueId:e});if(!s)throw new Error("Cannot find the Linear issue");return s.issue.children.nodes}async function $s(e){let{graphQLClient:t}=k(),{data:s}=await t.rawRequest(`
      query($issueId: String!) {
        issue(id: $issueId) {
          identifier
          title
          branchName
          description
          team {
            name
          }
          labels {
            nodes {
              name
            }
          }
          project {
            name
            description
          }
          parent {
            id
            identifier
            title
            description
          }
          children {
            nodes {
              id
              identifier
              title
              description
            }
          }
        }
      }
    `,{issueId:e});if(!s)throw new Error("Cannot find the Linear issue");return s.issue}async function Ds(e){let{graphQLClient:t}=k(),{data:s}=await t.rawRequest(`
      query($issueId: String!) {
        issue(id: $issueId) {
          comments {
            nodes {
              id
              body
              createdAt
              url
              user {
                id
                displayName
                email
                avatarUrl
              }
            }
          }
        }
      }
    `,{issueId:e});if(!s)throw new Error("Cannot find the Linear issue");return s.issue.comments.nodes}async function Rs(e){let{graphQLClient:t}=k(),{data:s}=await t.rawRequest(`
      query($issueId: String!) {
        issue(id: $issueId) {
          ${je}
          attachments {
            nodes {
              id
              title
              subtitle
              source
              url
              updatedAt
            }
          }
          description
          relations {
            nodes {
              id
              type
              relatedIssue {
                id
                identifier
                title
                state {
                  color
                  type
                }
              }
            }
          }
        }
      }
    `,{issueId:e});if(!s)throw new Error("Cannot find the Linear issue");return s.issue}async function xs(e){let{graphQLClient:t}=k(),s=e.title.replace(/"/g,"\\$&"),r=e.description?.replace(/\n/g,"\\n")?.replace(/"/g,"\\$&"),i=`teamId: "${e.teamId}", title: "${s}", description: "${r}", priority: ${e.priority}`;e.stateId&&(i+=`, stateId: "${e.stateId}"`),e.estimate&&(i+=`, estimate: ${e.estimate}`),e.assigneeId&&(i+=`, assigneeId: "${e.assigneeId}"`),e.labelIds&&e.labelIds.length>0&&(i+=`, labelIds: [${e.labelIds.map(a=>`"${a}"`).join(",")}]`),e.dueDate&&(i+=`, dueDate: "${e.dueDate.toISOString()}"`),e.cycleId&&(i+=`, cycleId: "${e.cycleId}"`),e.projectId&&(i+=`, projectId: "${e.projectId}"`),e.projectId&&e.projectMilestoneId&&(i+=`, projectMilestoneId: "${e.projectMilestoneId}"`),e.parentId&&(i+=`, parentId: "${e.parentId}"`);let{data:c}=await t.rawRequest(`
      mutation {
        issueCreate(input: {${i}}) {
          success
          issue {
            ${je}
          }
        }
      }
    `);return{success:c?.issueCreate.success,issue:c?.issueCreate.issue}}async function vs(e){let{graphQLClient:t}=k(),s=e.title.replace(/"/g,"\\$&"),r=e.description?.replace(/\n/g,"\\n").replace(/"/g,"\\$&"),i=`teamId: "${e.teamId}", title: "${s}", description: "${r}", parentId: "${e.parentId}"`;e.stateId&&(i+=`, stateId: "${e.stateId}"`);let{data:c}=await t.rawRequest(`
      mutation {
        issueCreate(input: {${i}}) {
          success
        }
      }
    `);return{success:c?.issueCreate.success}}var js=require("@raycast/utils");function Me(e){let t=e.id,{data:s,error:r,isLoading:i,mutate:c}=(0,js.useCachedPromise)(Rs,[t],{initialData:{...e,description:""}});return{issue:s,issueError:r,isLoadingIssue:i,mutateDetail:c}}var Ms=require("@raycast/utils");function me(e,t){let{linearClient:s}=k(),{data:r,error:i,isLoading:c}=(0,Ms.useCachedPromise)(async a=>(await s.workflowStates({filter:{team:{id:{eq:a}}}})).nodes.sort((o,d)=>o.position-d.position),[e],{initialData:[],execute:t?.execute!==!1});return{states:r,isLoadingStates:c,statesError:i}}var J=require("react/jsx-runtime");function Ot({issue:e}){let{pop:t}=(0,w.useNavigation)(),{states:s}=me(e.team.id),r=(0,Ue.useMemo)(()=>s.filter(A=>A.type==="unstarted")[0],[s]),{issue:i,isLoadingIssue:c}=Me(e),{data:a,isLoading:n,revalidate:o}=(0,Us.useAI)(`Act as a product manager for Linear issues. Break down a Linear issue into a list of sub-issues. 
    
Follow these instructions:
- The sub-issues should be actionable.
- Every sub-issue should have a title and description
- Don't repeat the issue title in the description.
- Create as many sub-issues as it makes sense. Don't create too many or too few.

Use this JSON format:
[
  {
    "title": "<title of sub-issue>",
    "description": "<description of sub-issue>"
  },
  ...
]

${i.description?`To give you more context and help in creating sub-issues, here's the Linear issue description:
"""
${i.description}
"""
`:""}

Break down the Linear issue with this title: "${i.title}"`,{execute:!!i&&!c,creativity:.5}),[d,u]=(0,Ue.useState)(!1),[P,j]=(0,Ue.useState)([]);(0,Ue.useEffect)(()=>{if(!(!a||n)){try{let L=/\[[\s\S]*?\]/,A=a.match(L);if(A&&A[0]){let X=JSON.parse(A[0]);j(X.map(U=>({...U,id:(0,Fs.nanoid)(),selected:!0})))}}catch(L){(0,w.showToast)({style:w.Toast.Style.Failure,title:"Failed to parse AI results",message:V(L),primaryAction:{title:"Retry",onAction:o},secondaryAction:{title:"Copy AI Result",onAction:()=>w.Clipboard.copy(a)}})}u(!0)}},[a,n]);async function S(){try{await(0,w.showToast)({style:w.Toast.Style.Animated,title:"Creating sub-issues"});let L=P.filter(A=>A.selected);await Promise.all(L.map(A=>vs({teamId:i.team.id,title:A.title,description:A.description,parentId:i.id,stateId:r?.id}))),await(0,w.showToast)({style:w.Toast.Style.Success,title:"Created sub-issues"}),t()}catch(L){(0,w.showToast)({style:w.Toast.Style.Failure,title:"Failed to create Sub-Issues",message:V(L)})}}return(0,J.jsxs)(w.List,{isLoading:n||!d,children:[P?.map(L=>(0,J.jsx)(w.List.Item,{icon:L.selected?{source:w.Icon.CheckCircle,tintColor:w.Color.Green}:w.Icon.Circle,title:L.title,subtitle:L.description,actions:(0,J.jsxs)(w.ActionPanel,{children:[(0,J.jsx)(w.Action,{title:L.selected?"Unselect Sub-Issue":"Select Sub-Issue",icon:L.selected?w.Icon.Circle:{source:w.Icon.CheckCircle,tintColor:w.Color.Green},onAction:()=>j(P.map(A=>A.id===L.id?{...A,selected:!A.selected}:A))}),(0,J.jsx)(w.Action,{title:"Create Sub-Issues",icon:w.Icon.Plus,onAction:()=>S()}),(0,J.jsx)(w.Action,{title:"Generate New Sub-Issues",icon:w.Icon.ArrowClockwise,onAction:o})]})},L.title)),(0,J.jsx)(w.List.EmptyView,{title:"No sub-issues were generated. Try again.",actions:(0,J.jsx)(w.ActionPanel,{children:(0,J.jsx)(w.Action,{title:"Retry",icon:w.Icon.ArrowClockwise,onAction:o})})})]})}var y=require("@raycast/api"),Ve=require("@raycast/utils"),mt=require("react");async function Es(e,t){let{graphQLClient:s}=k(),r=[];if(t.teamId&&r.push(`teamId: "${t.teamId}"`),t.title&&r.push(`title: "${t.title.replace(/"/g,"\\$&")}"`),t.description&&r.push(`description: "${t.description.replace(/\n/g,"\\n").replace(/"/g,"\\$&")}"`),t.stateId&&r.push(`stateId: "${t.stateId}"`),typeof t.priority<"u"&&r.push(`priority: ${t.priority}`),typeof t.assigneeId<"u"&&r.push(`assigneeId: ${t.assigneeId?`"${t.assigneeId}"`:null}`),t.labelIds&&r.push(`labelIds: [${t.labelIds.map(c=>`"${c}"`).join(",")}]`),typeof t.estimate<"u"&&r.push(`estimate: ${t.estimate}`),typeof t.dueDate<"u"){let c=t.dueDate?t.dueDate instanceof Date?t.dueDate.toISOString():t.dueDate:null;r.push(`dueDate: ${c?`"${c}"`:null}`)}typeof t.cycleId<"u"&&r.push(`cycleId: ${t.cycleId?`"${t.cycleId}"`:null}`),typeof t.projectId<"u"&&r.push(`projectId: ${t.projectId?`"${t.projectId}"`:null}`),typeof t.projectMilestoneId<"u"&&r.push(`projectMilestoneId: ${t.projectMilestoneId?`"${t.projectMilestoneId}"`:null}`),typeof t.parentId<"u"&&r.push(`parentId: ${t.parentId?`"${t.parentId}"`:null}`);let{data:i}=await s.rawRequest(`
      mutation {
        issueUpdate(id: "${e}", input: {${r.join(", ")}}) {
          success
        }
      }
    `);return{success:i?.issueUpdate.success}}var Vt=require("@raycast/api");function Pe(e){return e?{source:"linear-icons/milestone.svg",tintColor:Vt.Color.PrimaryText}:{source:"linear-icons/no-milestone.svg",tintColor:Vt.Color.SecondaryText}}var Ns=require("@raycast/api");function wt(e,t){let s=t?.logoUrl?encodeURI(t.logoUrl):Ns.Icon.TwoPeople;return bt({icon:e.icon??void 0,color:e.color??void 0,fallbackIcon:s})}var Os=require("@raycast/utils");function Fe(e,t){let{linearClient:s}=k(),{data:r,error:i,isLoading:c}=(0,Os.useCachedPromise)(async a=>(await s.cycles({filter:{team:{id:{eq:a}}}})).nodes.sort((o,d)=>o.number-d.number),[e],{execute:t?.execute!==!1&&!!e});return{cycles:r,cyclesError:i,isLoadingCycles:!r&&!i||c}}var Vs=require("@raycast/utils");function pe(e,t=[],s){let{data:r,error:i,isLoading:c,mutate:a}=(0,Vs.useCachedPromise)(e,t,s);return{issues:r,issuesError:i,isLoadingIssues:c,mutateList:a}}var Qs=require("@raycast/utils");var qs=require("@raycast/api");var Wi=100,Qi=100,Bi=(0,qs.getPreferenceValues)();function zi(){let e=Number(Bi.labelsLimit),t=Number.isFinite(e)&&e>0?e:Qi,s=Math.floor(Math.min(Wi,t)),r=Math.ceil(t/s);return{pageSize:s,pageLimit:r}}async function Ws(e){if(!e)return[];let{pageSize:t,pageLimit:s}=zi(),{graphQLClient:r}=k();return Et(async i=>r.rawRequest(`
          query($teamId: String!, $cursor: String) {
            team(id: $teamId) {
              labels(first: ${t}, after: $cursor) {
                nodes {
                  id
                  name
                  color
                }
                pageInfo {
                  hasNextPage
                  endCursor
                }
              }
            }
          }
        `,{teamId:e,cursor:i}),i=>i.data?.team?.labels?.pageInfo,(i,c)=>i.concat(c.data?.team?.labels?.nodes??[]),[],s)}function Ee(e,t){let{data:s,error:r,isLoading:i}=(0,Qs.useCachedPromise)(Ws,[e],{execute:t?.execute!==!1&&!!e});return{labels:s,labelsError:r,isLoadingLabels:!s&&!r||i}}var zs=require("@raycast/utils");var Gi=`
  id
  name
  targetDate
  project {
      id
  }
  sortOrder
  updatedAt
`;async function Bs(e){let{graphQLClient:t}=k();if(e){let{data:s}=await t.rawRequest(`
        query($projectId: String!) {
          project(id: $projectId) {
            projectMilestones {
              nodes {
                ${Gi}
              }
            }
          }
        }
      `,{projectId:e});return s?.project.projectMilestones.nodes}return null}function Ne(e,t){let{data:s,error:r,isLoading:i,mutate:c}=(0,zs.useCachedPromise)(Bs,[e],{execute:t?.execute!==!1});return{milestones:s,isLoadingMilestones:!s&&!r||i,milestonesError:r,mutateMilestones:c}}var _s=require("@raycast/utils");var _i=`
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
`;async function Gs({teamId:e,searchText:t="",after:s=null,first:r=null}){let{graphQLClient:i}=k(),c=`
    projects(first: $first, after: $after, filter: { name: { containsIgnoreCase: $searchText } }) {
      nodes {
        ${_i}
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  `;if(!e){let{data:o}=await i.rawRequest(`
        query($first: Int, $after: String, $searchText: String) {
          ${c}
        }
      `,{first:r,after:s,searchText:t}),d=o?.projects;return{data:d?.nodes??[],hasMore:!!d?.pageInfo.hasNextPage,cursor:d?.pageInfo.endCursor||null}}let{data:a}=await i.rawRequest(`
      query($teamId: String!, $first: Int, $after: String, $searchText: String) {
        team(id: $teamId) {
          ${c}
        }
      }
    `,{teamId:e,first:r,after:s,searchText:t}),n=a?.team?.projects;return{data:n?.nodes??[],hasMore:!!n?.pageInfo.hasNextPage,cursor:n?.pageInfo.endCursor||null}}function Oe(e,t){let{data:s,error:r,isLoading:i,mutate:c,pagination:a}=(0,_s.useCachedPromise)((n,o)=>d=>Gs({teamId:n,searchText:o,after:d.cursor,first:t?.pageSize}),[e,t?.searchText],{execute:t?.execute!==!1,keepPreviousData:!0});return{projects:s,isLoadingProjects:!s&&!r||i,projectsError:r,mutateProjects:c,pagination:a}}var Ks=require("@raycast/utils");var Zs=require("lodash");async function Hs(e=""){let{graphQLClient:t,linearClient:s}=k(),r=await s.viewer,{data:i}=await t.rawRequest(`
      query($userId: String!, $query: String!) {
        organization {
          logoUrl
        }
        teams(filter: {name: {containsIgnoreCase: $query}}) {
          nodes {
            id
            name
            icon
            color
            key
            membership(userId: $userId) {
              sortOrder
            }
            issueEstimationType
            issueEstimationAllowZero
            issueEstimationExtended
            activeCycle {
              id
              number
            }
          }
          pageInfo {
            hasNextPage
          }
        }
      }
    `,{userId:r.id,query:e}),c=(0,Zs.sortBy)(i?.teams.nodes??[],o=>o.membership?.sortOrder??1/0),a=i?.organization,n=!!i?.teams.pageInfo.hasNextPage;return{teams:c,organization:a,hasMoreTeams:n}}function dt(e=""){let{data:t,error:s,isLoading:r}=(0,Ks.useCachedPromise)(Hs,[e]);return{teams:t?.teams,org:t?.organization,teamsError:s,isLoadingTeams:!t&&!s||r,supportsTeamTypeahead:e.trim().length>0||t?.hasMoreTeams}}var C=require("react/jsx-runtime");function qt(e){let{pop:t}=(0,y.useNavigation)(),{issue:s,isLoadingIssue:r,mutateDetail:i}=Me(e.issue),[c,a]=(0,mt.useState)(""),{teams:n,org:o,supportsTeamTypeahead:d,isLoadingTeams:u}=dt(c),P=n&&n.length>1,[j,S]=(0,mt.useState)(""),{users:L,supportsUserTypeahead:A,isLoadingUsers:X}=ve(j),{handleSubmit:U,itemProps:$,values:x,setValue:q}=(0,Ve.useForm)({async onSubmit(p){let H=await(0,y.showToast)({style:y.Toast.Style.Animated,title:"Editing issue"});try{let de={teamId:p.teamId||e.issue.team.id,title:p.title,description:p.description,stateId:p.stateId,labelIds:p.labelIds,dueDate:p.dueDate,...D&&p.estimate?{estimate:parseInt(p.estimate)}:{},...p.assigneeId?{assigneeId:p.assigneeId}:{},...p.cycleId?{cycleId:p.cycleId}:{},...p.projectId?{projectId:p.projectId}:{},...p.milestoneId?{projectMilestoneId:p.milestoneId}:{},...p.parentId?{parentId:p.parentId}:{},priority:parseInt(p.priority)},{success:lt}=await Es(s.id,de);lt&&(H.style=y.Toast.Style.Success,H.title=`Edited Issue \u2022 ${s.identifier}`,t(),i(),e.mutateList&&e.mutateList(),e.mutateSubIssues&&e.mutateSubIssues())}catch(de){H.style=y.Toast.Style.Failure,H.title="Failed to edit issue",H.message=V(de)}},validation:{teamId:P?Ve.FormValidation.Required:void 0,title:Ve.FormValidation.Required,stateId:Ve.FormValidation.Required,priority:Ve.FormValidation.Required},initialValues:{teamId:e.issue.team.id,title:e.issue.title,description:s.description??void 0,priority:String(e.issue.priority),stateId:e.issue.state.id,estimate:e.issue.estimate?String(e.issue.estimate):void 0,assigneeId:e.issue.assignee?.id,labelIds:e.issue.labels.nodes.map(p=>p.id),dueDate:s.dueDate?new Date(s.dueDate):null,cycleId:e.issue.cycle?.id,projectId:e.issue.project?.id,milestoneId:e.issue.projectMilestone?.id,parentId:e.issue.parent?.id}});(0,mt.useEffect)(()=>{q("description",s.description||""),q("dueDate",s.dueDate?new Date(s.dueDate):null)},[s]);let ce=!!x.teamId&&x.teamId.trim().length>0,{states:Te}=me(x.teamId,{execute:ce}),{labels:_}=Ee(x.teamId,{execute:ce}),{cycles:oe}=Fe(x.teamId,{execute:ce}),{issues:ye}=pe(Ye,[],{execute:ce}),{projects:ue}=Oe(x.teamId,{execute:ce}),{milestones:I}=Ne(x.projectId,{execute:!!x.projectId}),T=n?.find(p=>p.id===x.teamId),D=T?Xe({issueEstimationType:T.issueEstimationType,issueEstimationAllowZero:T.issueEstimationAllowZero,issueEstimationExtended:T.issueEstimationExtended}):null,Z=Je(Te||[]),$e=Te&&Te.length>0,_e=e.priorities&&e.priorities.length>0,Ze=_&&_.length>0,G=oe&&oe.length>0,E=ue&&ue.length>0,Q=I&&I.length>0,yt=ye&&ye.length>0;return(0,C.jsxs)(y.Form,{actions:(0,C.jsx)(y.ActionPanel,{children:(0,C.jsx)(y.Action.SubmitForm,{onSubmit:U,title:"Edit Issue"})}),isLoading:u||r||X,children:[(d||P)&&(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(y.Form.Dropdown,{title:"Team",...$.teamId,...d&&{onSearchTextChange:a,isLoading:u,throttle:!0},children:n?.map(p=>(0,C.jsx)(y.Form.Dropdown.Item,{title:p.name,value:p.id,icon:wt(p,o)},p.id))}),(0,C.jsx)(y.Form.Separator,{})]}),(0,C.jsx)(y.Form.TextField,{title:"Title",placeholder:"Issue title",autoFocus:!0,...$.title}),(0,C.jsx)(y.Form.TextArea,{title:"Description",placeholder:"Add some details (supports Markdown, e.g. **bold**)",...$.description}),(0,C.jsx)(y.Form.Dropdown,{title:"Status",...$.stateId,children:$e?Z.map(p=>(0,C.jsx)(y.Form.Dropdown.Item,{title:p.name,value:p.id,icon:z(p)},p.id)):null}),(0,C.jsx)(y.Form.Dropdown,{title:"Priority",...$.priority,children:_e?e.priorities?.map(({priority:p,label:H})=>(0,C.jsx)(y.Form.Dropdown.Item,{title:H,value:String(p),icon:{source:ae[p]}},p)):null}),(0,C.jsxs)(y.Form.Dropdown,{title:"Assignee",...$.assigneeId,...A&&{onSearchTextChange:S,isLoading:X,throttle:!0},children:[(0,C.jsx)(y.Form.Dropdown.Item,{title:"Unassigned",value:"",icon:y.Icon.Person}),L?.map(p=>(0,C.jsx)(y.Form.Dropdown.Item,{title:p.name,value:p.id,icon:K(p)},p.id))]}),(0,C.jsx)(y.Form.TagPicker,{title:"Labels",...$.labelIds,placeholder:"Add label",children:Ze?_.map(({id:p,name:H,color:de})=>(0,C.jsx)(y.Form.TagPicker.Item,{title:H,value:p,icon:{source:y.Icon.Dot,tintColor:de}},p)):null}),D?(0,C.jsxs)(y.Form.Dropdown,{title:"Estimate",...$.estimate,children:[(0,C.jsx)(y.Form.Dropdown.Item,{title:"No estimate",value:"",icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}}),D.map(({estimate:p,label:H})=>(0,C.jsx)(y.Form.Dropdown.Item,{title:H,value:String(p),icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}},p))]}):null,(0,C.jsx)(y.Form.DatePicker,{title:"Due Date",type:y.Form.DatePicker.Type.Date,...$.dueDate}),G||E||yt?(0,C.jsx)(y.Form.Separator,{}):null,G?(0,C.jsxs)(y.Form.Dropdown,{title:"Cycle",...$.cycleId,children:[(0,C.jsx)(y.Form.Dropdown.Item,{title:"No Cycle",value:"",icon:{source:{light:"light/no-cycle.svg",dark:"dark/no-cycle.svg"}}}),ke(oe).map(p=>(0,C.jsx)(y.Form.Dropdown.Item,{title:p.title,value:p.id,icon:{source:p.icon}},p.id))]}):null,E?(0,C.jsxs)(y.Form.Dropdown,{title:"Project",...$.projectId,children:[(0,C.jsx)(y.Form.Dropdown.Item,{title:"No Project",value:"",icon:{source:{light:"light/no-project.svg",dark:"dark/no-project.svg"}}}),ue.map(p=>(0,C.jsx)(y.Form.Dropdown.Item,{title:`${p.name} (${p.status.name})`,value:p.id,icon:le(p)},p.id))]}):null,Q?(0,C.jsxs)(y.Form.Dropdown,{title:"Milestone",storeValue:!0,...$.milestoneId,children:[(0,C.jsx)(y.Form.Dropdown.Item,{title:"No Milestone",value:"",icon:{source:"linear-icons/no-milestone.svg"}}),I.map(p=>(0,C.jsx)(y.Form.Dropdown.Item,{title:`${p.name}  (${p.targetDate||"No Target Date"})`,value:p.id,icon:Pe(p)},p.id))]}):null,yt?(0,C.jsxs)(y.Form.Dropdown,{title:"Parent",...$.parentId,children:[(0,C.jsx)(y.Form.Dropdown.Item,{title:"No Issue",value:"",icon:{source:{light:"light/backlog.svg",dark:"dark/backlog.svg"}}}),ye.map(p=>(0,C.jsx)(y.Form.Dropdown.Item,{title:`${p.identifier} - ${p.title}`,value:p.id,icon:z(p.state)},p.id))]}):null]})}var Y=require("@raycast/api"),Ys=require("date-fns");var N=require("@raycast/api"),Js=require("@raycast/utils");var Xs=require("fs/promises"),Wt=ct(require("path"));var Zi="application/octet-stream",Hi={".apng":"image/apng",".avif":"image/avif",".bmp":"image/bmp",".csv":"text/csv",".doc":"application/msword",".docx":"application/vnd.openxmlformats-officedocument.wordprocessingml.document",".gif":"image/gif",".gz":"application/gzip",".heic":"image/heic",".heif":"image/heif",".ico":"image/x-icon",".jpeg":"image/jpeg",".jpg":"image/jpeg",".json":"application/json",".md":"text/markdown",".mov":"video/quicktime",".mp3":"audio/mpeg",".mp4":"video/mp4",".pdf":"application/pdf",".png":"image/png",".ppt":"application/vnd.ms-powerpoint",".pptx":"application/vnd.openxmlformats-officedocument.presentationml.presentation",".svg":"image/svg+xml",".tar":"application/x-tar",".tif":"image/tiff",".tiff":"image/tiff",".txt":"text/plain",".webm":"video/webm",".webp":"image/webp",".xls":"application/vnd.ms-excel",".xlsx":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",".zip":"application/zip"};function Ki(e){return Hi[Wt.default.extname(e).toLowerCase()]??Zi}async function Xi(e){let{graphQLClient:t}=k(),s=await(0,Xs.readFile)(e),r=Ki(e),i=Wt.default.basename(e),{data:c}=await t.rawRequest(`
      mutation FileUpload($size: Int!, $contentType: String!, $filename: String!) {
        fileUpload(size: $size, contentType: $contentType, filename: $filename) {
          success
          uploadFile {
            headers {
              key
              value
            }
            uploadUrl
            assetUrl
          }
        }
      }
    `,{size:s.byteLength,contentType:r,filename:i}),a=c?.fileUpload.uploadFile;if(!c?.fileUpload.success||!a)throw new Error(`Failed to request an upload URL for "${i}"`);let n=new Headers({"Content-Type":r,"Cache-Control":"public, max-age=31536000"});a.headers.forEach(({key:d,value:u})=>n.set(d,u));let o=await fetch(a.uploadUrl,{method:"PUT",headers:n,body:s});if(!o.ok)throw new Error(`Failed to upload "${i}": ${o.status} ${o.statusText}`);return{assetUrl:a.assetUrl,contentType:r,name:i}}async function At(e){let{linearClient:t}=k(),s=await Xi(e.url),r=await t.createAttachment({issueId:e.issueId,title:s.name,url:s.assetUrl});return{success:r.success,id:r.attachmentId}}async function Lt(e){let{linearClient:t}=k(),s=await t.attachmentLinkURL(e.issueId,e.url);return{success:s.success,id:s.attachmentId}}function Tt(e){let t=e.split(`
`),s=/https?:\/\/\S+/,r=t.map(i=>i.trim()).filter(i=>s.test(i));return Array.from(new Set(r))}var Se=require("react/jsx-runtime");function $t({issue:{id:e,title:t,identifier:s}}){let{pop:r}=(0,N.useNavigation)(),{reset:i,itemProps:c,handleSubmit:a}=(0,Js.useForm)({onSubmit:async n=>{let o=await(0,N.showToast)({style:N.Toast.Style.Animated,title:"Attaching links"}),d=Tt(n.links);if(d.length===0&&n.attachments.length===0){o.style=N.Toast.Style.Failure,o.title="No links or attachments provided";return}if(d.length>0){let u=d.length===1?"link":"links";try{await Promise.all(d.map(P=>Lt({issueId:e,url:P}))),o.style=N.Toast.Style.Success,o.title=`Successfully attached ${u}`}catch(P){o.style=N.Toast.Style.Failure,o.title=`Failed attaching ${u}`,o.message=V(P)}}if(n.attachments.length>0){let u=n.attachments.length===1?"attachment":"attachments";try{o.style=N.Toast.Style.Animated,o.title=`Uploading ${u}\u2026`,await Promise.all(n.attachments.map(P=>At({issueId:e,url:P}))),o.style=N.Toast.Style.Success,o.title=`Successfully uploaded ${u}`}catch(P){o.style=N.Toast.Style.Failure,o.title=`Failed uploading ${u}`,o.message=V(P)}}i({attachments:[],links:""}),r()},initialValues:{links:""}});return(0,Se.jsxs)(N.Form,{actions:(0,Se.jsx)(N.ActionPanel,{children:(0,Se.jsx)(N.Action.SubmitForm,{onSubmit:a,icon:N.Icon.NewDocument,title:"Attach"})}),navigationTitle:"Add Attachments and Links",children:[(0,Se.jsx)(N.Form.Description,{title:"Issue",text:`[${s}] ${t}`}),(0,Se.jsx)(N.Form.FilePicker,{title:"Attachment",...c.attachments}),(0,Se.jsx)(N.Form.TextArea,{title:"Links",placeholder:`https://a.com
https://b.com
New link(s) on separate line(s)`,...c.links})]})}var be=require("react/jsx-runtime");function Qt({attachments:e,issue:t}){return(0,be.jsx)(Y.List,{navigationTitle:`Links for ${t.identifier}`,children:e.map(s=>{let r=new Date(s.updatedAt);return(0,be.jsx)(Y.List.Item,{icon:s.source?.imageUrl??Y.Icon.Link,title:s.title,subtitle:s.subtitle,accessories:[{date:r,tooltip:`Updated: ${(0,Ys.format)(r,"EEEE d MMMM yyyy 'at' HH:mm")}`}],actions:(0,be.jsxs)(Y.ActionPanel,{children:[(0,be.jsx)(Y.Action.OpenInBrowser,{url:s.url}),(0,be.jsx)(Y.Action.Push,{title:"Add Attachments and Links",icon:Y.Icon.NewDocument,target:(0,be.jsx)($t,{issue:t})})]})},s.id)})})}var W=require("@raycast/api"),ei=require("react");var pt=require("react/jsx-runtime");function qe({comment:e,issue:t,mutateComments:s}){let{linearClient:r}=k(),{pop:i}=(0,W.useNavigation)(),[c,a]=(0,ei.useState)(e?e.body:"");async function n(){await(0,W.showToast)({style:W.Toast.Style.Animated,title:`${e?"Updating":"Adding"} comment`});try{e?await r.updateComment(e.id,{body:c}):await r.createComment({body:c,issueId:t.id}),await(0,W.showToast)({style:W.Toast.Style.Success,title:`${e?"Updated":"Added"} comment`}),i(),s&&s()}catch(o){(0,W.showToast)({style:W.Toast.Style.Failure,title:`Failed to ${e?"update":"add"} comment`,message:V(o)})}}return(0,pt.jsx)(W.Form,{actions:(0,pt.jsx)(W.ActionPanel,{children:(0,pt.jsx)(W.Action.SubmitForm,{title:e?"Edit Comment":"Add Comment",onSubmit:n,icon:e?W.Icon.Pencil:W.Icon.Plus})}),children:(0,pt.jsx)(W.Form.TextArea,{id:"comment",title:"Comment",placeholder:"Leave a comment",value:c,onChange:a})})}var h=require("@raycast/api"),oi=require("date-fns"),ni=ct(require("remove-markdown"));var ti=require("@raycast/utils");function Bt(e){let{data:t,error:s,isLoading:r,mutate:i}=(0,ti.useCachedPromise)(Ds,[e]);return{comments:t,commentsError:s,isLoadingComments:r,mutateComments:i}}var si=require("@raycast/utils");function We(){let{linearClient:e}=k(),{data:t,error:s,isLoading:r}=(0,si.useCachedPromise)(()=>e.viewer);return{me:t,meError:s,isLoadingMe:!t&&!s||r}}var Gt=require("@raycast/api");var ii=require("@raycast/api"),zt=!1;async function ri(){zt=!!(await(0,ii.getApplications)()).find(s=>s.bundleId==="com.linear")}var _t=require("react/jsx-runtime");function Qe({title:e,url:t,...s}){return zt?(0,_t.jsx)(Gt.Action.Open,{title:`${e||"Open"} in Linear`,icon:"linear-app-icon.png",target:t,application:"Linear",...s}):(0,_t.jsx)(Gt.Action.OpenInBrowser,{url:t,title:`${e||"Open"} in Browser`})}var O=require("react/jsx-runtime");function Zt({issue:e}){let{linearClient:t}=k(),{me:s,isLoadingMe:r}=We(),{comments:i,isLoadingComments:c,mutateComments:a}=Bt(e.id);async function n(o){if(await(0,h.confirmAlert)({title:"Delete Comment",message:"Are you sure you want to delete this comment?",icon:{source:h.Icon.Trash,tintColor:h.Color.Red}}))try{await(0,h.showToast)({style:h.Toast.Style.Animated,title:"Deleting comment"}),await a(t.deleteComment(o),{optimisticUpdate(d){return d&&d?.filter(u=>u.id!==o)}}),await(0,h.showToast)({style:h.Toast.Style.Success,title:"Deleted comment"})}catch(d){(0,h.showToast)({style:h.Toast.Style.Failure,title:"Failed to delete comment",message:V(d)})}}return(0,O.jsxs)(h.List,{isLoading:c||r,navigationTitle:`${e.identifier} \u2022 Comments`,searchBarPlaceholder:"Filter by user or comment content",isShowingDetail:!0,children:[(0,O.jsx)(h.List.EmptyView,{title:"No comments",description:"This issue doesn't have any comments.",actions:(0,O.jsx)(h.ActionPanel,{children:(0,O.jsx)(h.Action.Push,{title:"Add Comment",icon:h.Icon.Plus,target:(0,O.jsx)(qe,{issue:e,mutateComments:a})})})}),i?.map(o=>{let d=new Date(o.createdAt);return(0,O.jsx)(h.List.Item,{title:o.user.displayName,subtitle:o.body,icon:K(o.user),keywords:(0,ni.default)(o.body).replace(/\n/g," ").split(" "),accessories:[{date:d,tooltip:`Created: ${(0,oi.format)(d,"EEEE d MMMM yyyy 'at' HH:mm")}`}],detail:(0,O.jsx)(h.List.Item.Detail,{markdown:o.body}),actions:(0,O.jsxs)(h.ActionPanel,{children:[(0,O.jsx)(Qe,{title:"Open Comment",url:o.url}),s?.id===o.user.id?(0,O.jsxs)(h.ActionPanel.Section,{children:[(0,O.jsx)(h.Action.Push,{title:"Edit Comment",icon:h.Icon.Pencil,shortcut:h.Keyboard.Shortcut.Common.Edit,target:(0,O.jsx)(qe,{issue:e,comment:o,mutateComments:a})}),(0,O.jsx)(h.Action,{title:"Delete Comment",icon:h.Icon.Trash,style:h.Action.Style.Destructive,shortcut:h.Keyboard.Shortcut.Common.Remove,onAction:()=>n(o.id)})]}):null,(0,O.jsx)(h.ActionPanel.Section,{children:(0,O.jsx)(h.Action.Push,{title:"Add Comment",icon:h.Icon.Plus,shortcut:{macOS:{modifiers:["cmd","shift"],key:"n"},Windows:{modifiers:["ctrl","shift"],key:"n"}},target:(0,O.jsx)(qe,{issue:e,mutateComments:a})})}),(0,O.jsxs)(h.ActionPanel.Section,{children:[(0,O.jsx)(h.Action.CopyToClipboard,{icon:h.Icon.Clipboard,content:o.url,title:"Copy Comment URL",shortcut:h.Keyboard.Shortcut.Common.CopyPath}),(0,O.jsx)(h.Action.CopyToClipboard,{icon:h.Icon.Clipboard,content:o.body,title:"Copy Comment",shortcut:{macOS:{modifiers:["cmd","shift"],key:"'"},Windows:{modifiers:["ctrl","shift"],key:"'"}}})]}),(0,O.jsx)(h.ActionPanel.Section,{children:(0,O.jsx)(h.Action,{title:"Refresh",icon:h.Icon.ArrowClockwise,shortcut:h.Keyboard.Shortcut.Common.Refresh,onAction:a})})]})},o.id)})]})}var ze=require("@raycast/api");var ai=require("@raycast/utils");function gt(){let{linearClient:e}=k(),{data:t,error:s,isLoading:r}=(0,ai.useCachedPromise)(()=>e.issuePriorityValues,[],{initialData:[]});return{priorities:t,prioritiesError:s,isLoadingPriorities:!t&&!s||r}}var l=require("@raycast/api"),Be=require("@raycast/utils"),Ce=require("react");function Ht(e={}){return{title:"",description:"",stateId:"",priority:"",assigneeId:"",labelIds:[],estimate:"",dueDate:null,cycleId:"",projectId:"",milestoneId:"",...e}}function Ji(e){if(typeof e=="string")try{let t=JSON.parse(e);return typeof t=="object"&&t!==null?t:{}}catch{return{}}return typeof e=="object"&&e!==null?e:{}}function ge(e){return typeof e=="string"?e:void 0}function li(e){return typeof e=="number"?String(e):ge(e)}function ci(e){if(!Array.isArray(e))return;let t=e.filter(s=>typeof s=="string");return t.length>0?t:void 0}function Yi(e){if(typeof e!="string")return;let t=new Date(e);return Number.isNaN(t.getTime())?void 0:t}function ui(e,t={}){let s=Ji(e.templateData),r=Ht(t),i=ci(s.labelIds)??ci(s.labels);return{title:ge(s.title)??r.title,description:ge(s.description)??ge(e.description)??r.description,stateId:ge(s.stateId)??ge(s.statusId)??r.stateId,priority:li(s.priority)??r.priority,assigneeId:ge(s.assigneeId)??r.assigneeId,labelIds:i??r.labelIds,estimate:li(s.estimate)??r.estimate,dueDate:s.dueDate!==void 0?Yi(s.dueDate)??null:r.dueDate,cycleId:ge(s.cycleId)??r.cycleId,projectId:ge(s.projectId)??r.projectId,milestoneId:r.milestoneId}}var pi=require("@raycast/utils");var di=`
  id
  name
  description
  icon
  color
  sortOrder
  type
  archivedAt
  templateData
  team {
    id
  }
`;function er(e,t){let s=e.type.toLowerCase()==="issue",r=!e.team||e.team.id===t;return s&&!e.archivedAt&&r}function tr(e,t){return(e.sortOrder??0)-(t.sortOrder??0)||e.name.localeCompare(t.name)}async function mi(e){if(!e)return[];let{graphQLClient:t}=k(),{data:s}=await t.rawRequest(`
      query IssueTemplates($teamId: String!, $first: Int) {
        organization {
          templates(first: $first) {
            nodes {
              ${di}
            }
          }
        }
        team(id: $teamId) {
          templates(first: $first) {
            nodes {
              ${di}
            }
          }
        }
      }
    `,{teamId:e,first:100});return[...s?.organization?.templates?.nodes??[],...s?.team?.templates?.nodes??[]].filter((i,c,a)=>a.findIndex(n=>n.id===i.id)===c).filter(i=>er(i,e)).sort(tr)}function Kt(e,t){let{data:s,error:r,isLoading:i}=(0,pi.useCachedPromise)(mi,[e],{execute:t?.execute!==!1&&!!e});return{issueTemplates:s,issueTemplatesError:r,isLoadingIssueTemplates:!s&&!r||i}}var M=require("@raycast/api"),gi=require("date-fns");var F=require("react/jsx-runtime");function ft({issue:e,mutateList:t,priorities:s,me:r}){let{issue:i,isLoadingIssue:c,mutateDetail:a}=Me(e),n=`# ${i?.title}`;i?.description&&(n+=`

${i.description}`);let o=i?.cycle?xe(i.cycle):null,d=i.relations?i.relations.nodes.filter(j=>j.type=="related"):null,u=i.relations?i.relations.nodes.filter(j=>j.type=="duplicate"):null,P=i.attachments?.nodes.length??0;return(0,F.jsx)(M.Detail,{markdown:n,isLoading:c,...i?{metadata:(0,F.jsxs)(M.Detail.Metadata,{children:[(0,F.jsx)(M.Detail.Metadata.Label,{title:"Status",text:i.state.name,icon:z(i.state)}),(0,F.jsx)(M.Detail.Metadata.Label,{title:"Priority",text:i.priorityLabel,icon:{source:ae[i.priority]}}),(0,F.jsx)(M.Detail.Metadata.Label,{title:"Assignee",text:i.assignee?i.assignee.displayName:"Unassigned",icon:K(i.assignee)}),i.team.issueEstimationType!=="notUsed"?(0,F.jsx)(M.Detail.Metadata.Label,{title:"Estimate",text:St({estimate:i.estimate,issueEstimationType:i.team.issueEstimationType}),icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}}):null,i.labels.nodes.length>0?(0,F.jsx)(M.Detail.Metadata.TagList,{title:"Labels",children:i.labels.nodes.map(({id:j,name:S,color:L})=>(0,F.jsx)(M.Detail.Metadata.TagList.Item,{text:S,color:L},j))}):(0,F.jsx)(M.Detail.Metadata.Label,{title:"Labels",text:"No Labels"}),i.dueDate?(0,F.jsx)(M.Detail.Metadata.Label,{title:"Due Date",text:(0,gi.format)(new Date(i.dueDate),"MM/dd/yyyy"),icon:Pt(new Date(i.dueDate))}):null,P>0?(0,F.jsx)(M.Detail.Metadata.Label,{title:"Links",text:`${P>1?`${P} links`:"1 link"}`,icon:M.Icon.Link}):null,(0,F.jsx)(M.Detail.Metadata.Separator,{}),(0,F.jsx)(M.Detail.Metadata.Label,{title:"Cycle",text:o?o.title:"No Cycle",icon:{source:o?o.icon:{light:"light/no-cycle.svg",dark:"dark/no-cycle.svg"}}}),(0,F.jsx)(M.Detail.Metadata.Label,{title:"Project",text:i.project?i.project.name:"No Project",icon:le(i.project)}),(0,F.jsx)(M.Detail.Metadata.Label,{title:"Milestone",text:i.projectMilestone?i.projectMilestone.name:"No Milestone",icon:Pe(i.projectMilestone)}),(0,F.jsx)(M.Detail.Metadata.Label,{title:"Parent Issue",text:i.parent?i.parent.title:"No Issue",icon:i.parent?z(i.parent.state):{source:{light:"light/backlog.svg",dark:"dark/backlog.svg"}}}),d&&d.length>0?(0,F.jsx)(M.Detail.Metadata.TagList,{title:"Related",children:d.map(({id:j,relatedIssue:S})=>(0,F.jsx)(M.Detail.Metadata.TagList.Item,{text:S.identifier},j))}):null,u&&u.length>0?(0,F.jsx)(M.Detail.Metadata.TagList,{title:"Duplicates",children:u.map(({id:j,relatedIssue:S})=>(0,F.jsx)(M.Detail.Metadata.TagList.Item,{text:S.identifier},j))}):null]}),actions:(0,F.jsx)(M.ActionPanel,{children:(0,F.jsx)(et,{issue:i,mutateList:t,mutateDetail:a,priorities:s,showAttachmentsAction:P>0,attachments:i.attachments?.nodes??[],me:r})})}:{}})}var f=require("react/jsx-runtime");function sr(e,t){return e==="url"?{title:"Copy Issue URL",onAction:()=>l.Clipboard.copy(t.url)}:e==="id-as-link"?{title:"Copy Issue ID as Link",onAction:()=>l.Clipboard.copy({text:`[${t.identifier}](${t.url})`,html:`<a href="${t.url}">${t.identifier}</a>`})}:e==="title"?{title:"Copy Issue Title",onAction:()=>l.Clipboard.copy(t.title)}:e==="title-as-link"?{title:"Copy Issue Title as Link",onAction:()=>l.Clipboard.copy({text:`[${t.title}](${t.url})`,html:`<a href="${t.url}">${t.title}</a>`})}:{title:"Copy Issue ID",onAction:()=>l.Clipboard.copy(t.identifier)}}function Xt(e){let{push:t}=(0,l.useNavigation)(),{autofocusField:s,copyToastAction:r}=(0,l.getPreferenceValues)(),[i,c]=(0,Ce.useState)(""),{teams:a,org:n,supportsTeamTypeahead:o,isLoadingTeams:d}=dt(i),u=a&&a.length>1,[P,j]=(0,Ce.useState)(""),{users:S,supportsUserTypeahead:L,isLoadingUsers:A}=ve(P),{handleSubmit:X,itemProps:U,values:$,setValue:x,focus:q,reset:ce,setValidationError:Te}=(0,Be.useForm)({async onSubmit(m){let R=await(0,l.showToast)({style:l.Toast.Style.Animated,title:"Creating issue"}),he=u?m.teamId:a?.[0]?.id;if(!he)return Te("teamId","The team is required."),!1;try{let B={teamId:he,title:m.title,description:m.description||"",stateId:m.stateId,labelIds:m.labelIds,dueDate:m.dueDate,...E&&m.estimate?{estimate:parseInt(m.estimate)}:{},...m.assigneeId?{assigneeId:m.assigneeId}:{},...m.cycleId?{cycleId:m.cycleId}:{},...m.projectId?{projectId:m.projectId}:{},...m.milestoneId?{projectMilestoneId:m.milestoneId}:{},...m.parentId?{parentId:m.parentId}:{},priority:parseInt(m.priority)},{success:Mt,issue:He}=await xs(B);if(Mt&&He){R.style=l.Toast.Style.Success,R.title=`Created Issue \u2022 ${He?.identifier}`,R.primaryAction={title:"Open Issue",shortcut:l.Keyboard.Shortcut.Common.OpenWith,onAction:async()=>{t((0,f.jsx)(ft,{issue:He,priorities:e.priorities,me:e.me})),await R.hide()}},R.secondaryAction={shortcut:l.Keyboard.Shortcut.Common.Copy,...sr(r,He)},ce({templateId:"",title:"",description:"",estimate:"",labelIds:[],dueDate:null,parentId:"",attachments:[],links:""}),q(u&&s?s:"title");let Ut=Tt(m.links);if(Ut.length>0){let De=Ut.length===1?"link":"links";try{R.message=`Attaching ${De}\u2026`,await Promise.all(Ut.map(Re=>Lt({issueId:He.id,url:Re}))),R.message=`Successfully attached ${De}`}catch(Re){R.style=l.Toast.Style.Failure,R.title=`Failed attaching ${De}`,R.message=V(Re)}}if(m.attachments.length>0){let De=m.attachments.length===1?"attachment":"attachments";try{R.message=`Uploading ${De}\u2026`,await Promise.all(m.attachments.map(Re=>At({issueId:He.id,url:Re}))),R.message=`Successfully uploaded ${De}`}catch(Re){R.style=l.Toast.Style.Failure,R.title=`Failed uploading ${De}`,R.message=V(Re)}}}}catch(B){R.style=l.Toast.Style.Failure,R.title="Failed to create issue",R.message=V(B)}x("teamId",he)},validation:{teamId:u?Be.FormValidation.Required:void 0,title:Be.FormValidation.Required,stateId:Be.FormValidation.Required,priority:Be.FormValidation.Required},initialValues:{templateId:e.draftValues?.templateId||"",teamId:e.draftValues?.teamId||e.teamId,title:e.draftValues?.title,description:e.draftValues?.description,priority:e.draftValues?.priority,stateId:e.draftValues?.stateId,estimate:e.draftValues?.estimate,assigneeId:e.draftValues?.assigneeId||e.assigneeId,labelIds:e.draftValues?.labelIds||[],dueDate:e.draftValues?.dueDate,cycleId:e.draftValues?.cycleId||e.cycleId,projectId:e.draftValues?.projectId||e.projectId,milestoneId:e.draftValues?.milestoneId||e.milestoneId,parentId:e.draftValues?.parentId||e.parentId,links:e.draftValues?.links||""}}),_=!!$.teamId&&$.teamId.trim().length>0,{issueTemplates:oe,isLoadingIssueTemplates:ye}=Kt($.teamId,{execute:_}),{states:ue}=me($.teamId,{execute:_}),{labels:I}=Ee($.teamId,{execute:_}),{cycles:T}=Fe($.teamId,{execute:_}),{issues:D}=pe(Ye,[],{execute:_}),{projects:Z}=Oe($.teamId,{execute:_}),{milestones:$e}=Ne($.projectId,{execute:!!$.projectId});(0,Ce.useEffect)(()=>{a?.length===1&&x("teamId",a[0].id)},[a]);let _e=(0,Ce.useRef)(!1);(0,Ce.useEffect)(()=>{if(!_e.current){_e.current=!0;return}Ze("")},[$.teamId]);function Ze(m){x("templateId",m);let R=oe?.find(Mt=>Mt.id===m),he={assigneeId:e.assigneeId||"",cycleId:e.cycleId||"",projectId:e.projectId||"",milestoneId:e.milestoneId||""},B=R?ui(R,he):Ht(he);x("title",B.title),x("description",B.description),x("stateId",B.stateId),x("priority",B.priority),x("assigneeId",B.assigneeId),x("labelIds",B.labelIds),x("estimate",B.estimate),x("dueDate",B.dueDate),x("cycleId",B.cycleId),x("projectId",B.projectId),x("milestoneId",B.milestoneId??"")}let G=a?.find(m=>m.id===$.teamId),E=G?Xe({issueEstimationType:G.issueEstimationType,issueEstimationAllowZero:G.issueEstimationAllowZero,issueEstimationExtended:G.issueEstimationExtended}):null,Q=Je(ue||[]),yt=ue&&ue.length>0,p=e.priorities&&e.priorities.length>0,H=I&&I.length>0,de=T&&T.length>0,lt=Z&&Z.length>0,ds=$e&&$e.length>0,jt=D&&D.length>0,Ri=oe&&oe.length>0;return(0,f.jsxs)(l.Form,{enableDrafts:e.enableDrafts,actions:(0,f.jsxs)(l.ActionPanel,{children:[(0,f.jsx)(l.Action.SubmitForm,{icon:l.Icon.Plus,onSubmit:X,title:"Create Issue"}),(0,f.jsxs)(l.ActionPanel.Section,{children:[(0,f.jsx)(l.Action,{title:"Focus Title",icon:l.Icon.TextInput,onAction:()=>q("title"),shortcut:l.Keyboard.Shortcut.Common.Edit}),(0,f.jsx)(l.Action,{title:"Focus Description",icon:l.Icon.TextInput,onAction:()=>q("description"),shortcut:{modifiers:["ctrl"],key:"e"}}),(0,f.jsx)(l.Action,{title:"Focus Status",icon:l.Icon.Circle,onAction:()=>q("stateId"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"s"},Windows:{modifiers:["ctrl","shift"],key:"s"}}}),(0,f.jsx)(l.Action,{title:"Focus Priority",icon:l.Icon.LevelMeter,onAction:()=>q("priority"),shortcut:l.Keyboard.Shortcut.Common.Pin}),(0,f.jsx)(l.Action,{title:"Focus Assignee",icon:l.Icon.AddPerson,onAction:()=>q("assigneeId"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"a"},Windows:{modifiers:["ctrl","shift"],key:"a"}}}),E?(0,f.jsx)(l.Action,{title:"Focus Estimate",icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}},onAction:()=>q("estimate"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"e"},Windows:{modifiers:["ctrl","shift"],key:"e"}}}):null,(0,f.jsx)(l.Action,{title:"Focus Due Date",icon:l.Icon.Calendar,onAction:()=>q("dueDate"),shortcut:{macOS:{modifiers:["opt","shift"],key:"d"},Windows:{modifiers:["alt","shift"],key:"d"}}}),(0,f.jsx)(l.Action,{title:"Focus Labels",icon:l.Icon.Tag,onAction:()=>q("labelIds"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"l"},Windows:{modifiers:["ctrl","shift"],key:"l"}}}),de?(0,f.jsx)(l.Action,{title:"Focus Cycle",icon:{source:{light:"light/cycle.svg",dark:"dark/cycle.svg"}},onAction:()=>q("cycleId"),shortcut:l.Keyboard.Shortcut.Common.Copy}):null,lt?(0,f.jsx)(l.Action,{title:"Focus Project",icon:{source:{light:"light/project.svg",dark:"dark/project.svg"}},onAction:()=>q("projectId"),shortcut:{modifiers:["ctrl","shift"],key:"p"}}):null,ds?(0,f.jsx)(l.Action,{title:"Focus Milestone",icon:{source:{light:"light/milestone.svg",dark:"dark/milestone.svg"}},onAction:()=>q("milestoneId"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"m"},Windows:{modifiers:["ctrl","shift"],key:"m"}}}):null,jt?(0,f.jsx)(l.Action,{title:"Focus Parent Issue",icon:{source:{light:"light/backlog.svg",dark:"dark/backlog.svg"}},onAction:()=>q("parentId"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"i"},Windows:{modifiers:["ctrl","shift"],key:"i"}}}):null,(0,f.jsx)(l.Action,{title:"Focus Attachments",icon:l.Icon.NewDocument,onAction:()=>q("attachments"),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"a"},Windows:{modifiers:["ctrl","alt","shift"],key:"a"}}}),(0,f.jsx)(l.Action,{title:"Focus Links",icon:l.Icon.Link,onAction:()=>q("links"),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"l"},Windows:{modifiers:["ctrl","alt","shift"],key:"l"}}})]})]}),isLoading:d||A||e.isLoading,children:[(o||u)&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(l.Form.Dropdown,{title:"Team",storeValue:!0,...U.teamId,...o&&{onSearchTextChange:c,isLoading:d,throttle:!0},children:a?.map(m=>(0,f.jsx)(l.Form.Dropdown.Item,{title:m.name,value:m.id,icon:wt(m,n)},m.id))}),(0,f.jsx)(l.Form.Separator,{})]}),_&&(ye||Ri)?(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)(l.Form.Dropdown,{id:"templateId",title:"Template",value:$.templateId||"",onChange:Ze,isLoading:ye,children:[(0,f.jsx)(l.Form.Dropdown.Item,{title:"No Template",value:"",icon:l.Icon.Document}),oe?.map(m=>(0,f.jsx)(l.Form.Dropdown.Item,{title:m.name,value:m.id,icon:l.Icon.Document},m.id))]}),(0,f.jsx)(l.Form.Separator,{})]}):null,(0,f.jsx)(l.Form.TextField,{title:"Title",placeholder:"Issue title",...s==="title"?{autoFocus:!0}:{},...U.title}),(0,f.jsx)(l.Form.TextArea,{title:"Description",placeholder:"Add some details (supports Markdown, e.g. **bold**)",enableMarkdown:!0,...U.description}),(0,f.jsx)(l.Form.Dropdown,{title:"Status",storeValue:!0,...U.stateId,children:yt?Q.map(m=>(0,f.jsx)(l.Form.Dropdown.Item,{title:m.name,value:m.id,icon:z(m)},m.id)):null}),(0,f.jsx)(l.Form.Dropdown,{title:"Priority",storeValue:!0,...U.priority,children:p?e.priorities?.map(({priority:m,label:R})=>(0,f.jsx)(l.Form.Dropdown.Item,{title:R,value:String(m),icon:{source:ae[m]}},m)):null}),(0,f.jsxs)(l.Form.Dropdown,{title:"Assignee",storeValue:!0,...U.assigneeId,...L&&{onSearchTextChange:j,isLoading:A,throttle:!0},children:[(0,f.jsx)(l.Form.Dropdown.Item,{title:"Unassigned",value:"",icon:l.Icon.Person}),S?.map(m=>(0,f.jsx)(l.Form.Dropdown.Item,{title:m.name,value:m.id,icon:K(m)},m.id))]}),(0,f.jsx)(l.Form.TagPicker,{title:"Labels",placeholder:"Add label",...U.labelIds,children:H?I.map(({id:m,name:R,color:he})=>(0,f.jsx)(l.Form.TagPicker.Item,{title:R,value:m,icon:{source:l.Icon.Dot,tintColor:he}},m)):null}),E?(0,f.jsxs)(l.Form.Dropdown,{title:"Estimate",...U.estimate,children:[(0,f.jsx)(l.Form.Dropdown.Item,{title:"No estimate",value:"",icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}}),E.map(({estimate:m,label:R})=>(0,f.jsx)(l.Form.Dropdown.Item,{title:R,value:String(m),icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}},m))]}):null,(0,f.jsx)(l.Form.DatePicker,{title:"Due Date",type:l.Form.DatePicker.Type.Date,...U.dueDate}),de||lt||jt?(0,f.jsx)(l.Form.Separator,{}):null,de?(0,f.jsxs)(l.Form.Dropdown,{title:"Cycle",storeValue:!0,...U.cycleId,children:[(0,f.jsx)(l.Form.Dropdown.Item,{title:"No Cycle",value:"",icon:{source:{light:"light/no-cycle.svg",dark:"dark/no-cycle.svg"}}}),ke(T).map(m=>(0,f.jsx)(l.Form.Dropdown.Item,{title:m.title,value:m.id,icon:{source:m.icon}},m.id))]}):null,lt?(0,f.jsxs)(l.Form.Dropdown,{title:"Project",storeValue:!0,...U.projectId,children:[(0,f.jsx)(l.Form.Dropdown.Item,{title:"No Project",value:"",icon:{source:{light:"light/no-project.svg",dark:"dark/no-project.svg"}}}),Z.map(m=>(0,f.jsx)(l.Form.Dropdown.Item,{title:`${m.name} (${m.status.name})`,value:m.id,icon:le(m)},m.id))]}):null,ds?(0,f.jsxs)(l.Form.Dropdown,{title:"Milestone",storeValue:!0,...U.milestoneId,children:[(0,f.jsx)(l.Form.Dropdown.Item,{title:"No Milestone",value:"",icon:{source:"linear-icons/no-milestone.svg"}}),$e.map(m=>(0,f.jsx)(l.Form.Dropdown.Item,{title:`${m.name} (${m.targetDate||"No Target Date"})`,value:m.id,icon:Pe(m)},m.id))]}):null,jt?(0,f.jsxs)(l.Form.Dropdown,{title:"Parent",...U.parentId,children:[(0,f.jsx)(l.Form.Dropdown.Item,{title:"No Issue",value:"",icon:{source:{light:"light/backlog.svg",dark:"dark/backlog.svg"}}}),D.map(m=>(0,f.jsx)(l.Form.Dropdown.Item,{title:`${m.identifier} - ${m.title}`,value:m.id,icon:z(m.state)},m.id))]}):null,(0,f.jsx)(l.Form.Separator,{}),(0,f.jsx)(l.Form.FilePicker,{title:"Attachment",...U.attachments}),(0,f.jsx)(l.Form.TextArea,{title:"Links",placeholder:`https://a.com
https://b.com
New link(s) on separate line(s)`,...U.links})]})}var we=require("react/jsx-runtime");function Jt({issue:e,mutateList:t}){let{issues:s,isLoadingIssues:r,mutateList:i}=pe(d=>Ts(d),[e.id]),{priorities:c,isLoadingPriorities:a}=gt(),{me:n,isLoadingMe:o}=We();return(0,we.jsxs)(ze.List,{isLoading:r||o||a||o,navigationTitle:`${e.identifier} \u2022 Sub-issues`,children:[(0,we.jsx)(ze.List.EmptyView,{title:"No issues",description:"This issue doesn't have any sub-issues.",actions:(0,we.jsx)(ze.ActionPanel,{children:(0,we.jsx)(ze.Action.Push,{title:"Create Sub-Issue",target:(0,we.jsx)(Xt,{priorities:c,me:n,parentId:e.id,projectId:e.project?.id,cycleId:e.cycle?.id,teamId:e.team.id})})})}),s?.map(d=>(0,we.jsx)(It,{issue:d,mutateList:t,mutateSubIssues:i,priorities:c,me:n},d.id))]})}var v=require("@raycast/api");function Ii(e){let t=[`Work on Linear issue ${e.identifier}:`,""],s=ir(e.branchName);if(s&&t.push(`Suggested branch name: ${s}`,""),t.push(`<issue identifier="${Dt(e.identifier)}">`),t.push(`<title>${e.title}</title>`),t.push(...yi(e.description)),e.team?.name&&t.push(`<team name="${Dt(e.team.name)}"/>`),e.labels?.nodes?.forEach(i=>{t.push(`<label>${i.name}</label>`)}),e.project?.name){let i=Dt(e.project.name);t.push(e.project.description?`<project name="${i}">${e.project.description}</project>`:`<project name="${i}"/>`)}e.parent&&t.push(...fi("parent-issue",e.parent));let r=e.children?.nodes??[];return r.length>0&&(t.push("<sub-issues>"),r.forEach(i=>t.push(...fi("sub-issue",i))),t.push("</sub-issues>")),t.push("</issue>"),t.join(`
`)}function fi(e,t){return[`<${e} identifier="${Dt(t.identifier)}">`,`<id>${t.id}</id>`,`<title>${t.title}</title>`,...yi(t.description),`</${e}>`]}function yi(e){return e?e.includes(`
`)?["<description>",e,"</description>"]:[`<description>${e}</description>`]:[]}function ir(e){return e&&e.slice(e.lastIndexOf("/")+1)}function Dt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}var ee=require("react/jsx-runtime"),rr={ISSUE_TITLE:"title",ISSUE_ID:"identifier",ISSUE_URL:"url",ISSUE_BRANCH_NAME:"branchName"};function or(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function nr(e){return e.replace(/\[/g,"\\[").replace(/\]/g,"\\]")}function ar(e){return{html:`<a href="${e.url}">${or(e.title)}</a>`,text:`[${nr(e.title)}](${e.url})`}}function Yt({issue:e}){let{issueCustomCopyAction:t}=(0,v.getPreferenceValues)();async function s(){let r=await(0,v.showToast)({style:v.Toast.Style.Animated,title:"Copying prompt"});try{await v.Clipboard.copy(Ii(await $s(e.id))),r.style=v.Toast.Style.Success,r.title="Copied prompt to clipboard"}catch(i){r.style=v.Toast.Style.Failure,r.title="Failed copying prompt",r.message=V(i)}}return(0,ee.jsxs)(v.ActionPanel.Section,{children:[(0,ee.jsx)(v.Action.CopyToClipboard,{content:e.identifier,title:"Copy Issue ID",shortcut:{macOS:{modifiers:["cmd"],key:"."},Windows:{modifiers:["ctrl"],key:"."}}}),(0,ee.jsx)(v.Action.CopyToClipboard,{content:{html:`<a href="${e.url}" title="${e.title}">${e.identifier}: ${e.title}</a>`,text:e.url},title:"Copy Formatted Issue URL",shortcut:v.Keyboard.Shortcut.Common.CopyPath}),(0,ee.jsx)(v.Action.CopyToClipboard,{content:e.url,title:"Copy Issue URL",shortcut:{macOS:{modifiers:["cmd","shift"],key:"u"},Windows:{modifiers:["ctrl","shift"],key:"u"}}}),(0,ee.jsx)(v.Action.CopyToClipboard,{content:e.title,title:"Copy Issue Title",shortcut:{macOS:{modifiers:["cmd","shift"],key:"'"},Windows:{modifiers:["ctrl","shift"],key:"'"}}}),(0,ee.jsx)(v.Action.CopyToClipboard,{content:ar(e),title:"Copy Title as Link",shortcut:{macOS:{modifiers:["cmd","shift"],key:"t"},Windows:{modifiers:["ctrl","shift"],key:"t"}}}),(0,ee.jsx)(v.Action.CopyToClipboard,{content:e.branchName,title:"Copy Git Branch Name",shortcut:v.Keyboard.Shortcut.Common.CopyName}),t&&t!==""?(0,ee.jsx)(v.Action.CopyToClipboard,{content:t?.replace(/\{(.*?)\}/g,(r,i)=>{let c=e[rr[i]];return c||r}),title:"Custom Copy",shortcut:{macOS:{modifiers:["cmd","opt"],key:"."},Windows:{modifiers:["ctrl","alt"],key:"."}}}):null,(0,ee.jsx)(v.Action,{icon:v.Icon.Clipboard,title:"Copy as Prompt",onAction:s,shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"p"},Windows:{modifiers:["ctrl","alt","shift"],key:"p"}}})]})}var te=require("@raycast/api"),hi=require("react");var se=require("react/jsx-runtime");function es({issue:e,updateIssue:t}){let{linearClient:s}=k(),[r,i]=(0,hi.useState)(!1),{cycles:c,isLoadingCycles:a}=Fe(e.team.id,{execute:r}),n=e.cycle?xe(e.cycle):null,o=n?.isActive||!1,d=n?.isNext||!1;async function u(S){let L=e.cycle;t({animatedTitle:"Moving to cycle",payload:{cycleId:S?.id||null},optimisticUpdate(A){return{...A,cycle:S||void 0}},rollbackUpdate(A){return{...A,cycle:L}},successTitle:S?"Moved to cycle":"Removed from cycle",successMessage:S?.title?S.title:"",errorTitle:"Failed to move to cycle"})}async function P(){let{nodes:S}=await s.cycles({filter:{team:{id:{eq:e.team.id}}}}),L=ke(S||[]),A=L.findIndex($=>$.isActive),U=(A>-1?L[A]:null)?L[A+1]:null;if(U)return u(U)}async function j(){let{nodes:S}=await s.cycles({filter:{team:{id:{eq:e.team.id}}}}),A=ke(S||[]).find(X=>X.isActive);if(A)return u(A)}return(0,se.jsxs)(se.Fragment,{children:[(0,se.jsxs)(te.ActionPanel.Submenu,{title:"Move to Cycle",icon:{source:{light:"light/cycle.svg",dark:"dark/cycle.svg"}},shortcut:te.Keyboard.Shortcut.Common.Copy,onOpen:()=>i(!0),children:[(0,se.jsx)(te.Action,{title:"No Cycle",icon:{source:{light:"light/no-cycle.svg",dark:"dark/no-cycle.svg"}},onAction:()=>u(null)}),!c&&a?(0,se.jsx)(te.Action,{title:"Loading\u2026"}):ke(c||[]).map(S=>(0,se.jsx)(te.Action,{autoFocus:S.id===n?.id,title:S.title,icon:{source:S.icon},onAction:()=>u(S)},S.id))]}),o?null:(0,se.jsx)(te.Action,{title:"Move to Active Cycle",icon:{source:{light:"light/active-cycle.svg",dark:"dark/active-cycle.svg"}},shortcut:te.Keyboard.Shortcut.Common.Copy,onAction:()=>j()}),d?null:(0,se.jsx)(te.Action,{title:"Move to Next Cycle",icon:{source:{light:"light/cycle.svg",dark:"dark/cycle.svg"}},shortcut:{macOS:{modifiers:["cmd","shift"],key:"n"},Windows:{modifiers:["ctrl","shift"],key:"n"}},onAction:()=>P()})]})}var ie=require("@raycast/api"),ki=require("lodash"),Pi=require("react");var fe=require("react/jsx-runtime");function ts({issue:e,updateIssue:t}){let[s,r]=(0,Pi.useState)(!1),{labels:i}=Ee(e.team.id,{execute:s}),[,c]=(0,ki.partition)(i||[],o=>e.labels.nodes.map(d=>d.id).includes(o.id));async function a(o){let d=e.labels.nodes.map(u=>u.id);t({animatedTitle:"Adding label",payload:{labelIds:[...d,o.id]},optimisticUpdate(u){return{...u,labels:{...u.labels,nodes:[...u.labels.nodes,o]}}},rollbackUpdate(u){return{...u,labels:{...u.labels,nodes:u.labels.nodes.filter(P=>P.id!==o.id)}}},successTitle:"Added label",successMessage:`Label "${o.name}" added to ${e.identifier}`,errorTitle:"Failed to add label"})}async function n(o){let d=e.labels.nodes.map(u=>u.id);t({animatedTitle:"Remove label",payload:{labelIds:d.filter(u=>u!==o.id)},optimisticUpdate(u){return{...u,labels:{...u.labels,nodes:u.labels.nodes.filter(P=>P.id!==o.id)}}},rollbackUpdate(u){return{...u,labels:{...u.labels,nodes:[...u.labels.nodes,o]}}},successTitle:"Removed label",successMessage:`Label "${o.name}" removed from ${e.identifier}`,errorTitle:"Failed to remove label"})}return(0,fe.jsxs)(fe.Fragment,{children:[(0,fe.jsx)(ie.ActionPanel.Submenu,{title:"Add Label",icon:ie.Icon.Tag,shortcut:{macOS:{modifiers:["cmd","shift"],key:"l"},Windows:{modifiers:["ctrl","shift"],key:"l"}},onOpen:()=>r(!0),children:c.map(o=>(0,fe.jsx)(ie.Action,{title:o.name,icon:{source:ie.Icon.Dot,tintColor:o.color},onAction:()=>a(o)},o.id))}),e.labels.nodes.length>0?(0,fe.jsx)(ie.ActionPanel.Submenu,{title:"Remove Label",icon:ie.Icon.Tag,shortcut:{macOS:{modifiers:["cmd","shift"],key:"l"},Windows:{modifiers:["ctrl","shift"],key:"l"}},children:e.labels.nodes.map(o=>(0,fe.jsx)(ie.Action,{title:o.name,icon:{source:ie.Icon.Dot,tintColor:o.color},onAction:()=>n(o)},o.id))}):null]})}var Ae=require("@raycast/api"),Si=require("react");var tt=require("react/jsx-runtime");function ss({issue:e,updateIssue:t}){let[s,r]=(0,Si.useState)(!1),{milestones:i,isLoadingMilestones:c}=Ne(e.project?.id,{execute:s});async function a(n){let o=e.projectMilestone;t({animatedTitle:"Setting milestone",payload:{projectMilestoneId:n?n.id:null},optimisticUpdate(d){return{...d,milestone:n||void 0}},rollbackUpdate(d){return{...d,milestone:o}},successTitle:n?"Set milestone":`Removed milestone from ${e.identifier}`,successMessage:n?`"${n.name}" added to ${e.identifier}`:"",errorTitle:"Failed to set milestone"})}return(0,tt.jsxs)(Ae.ActionPanel.Submenu,{title:"Set Milestone",icon:{source:"linear-icons/milestone.svg",tintColor:Ae.Color.PrimaryText},shortcut:{modifiers:["ctrl","shift"],key:"m"},onOpen:()=>r(!0),children:[(0,tt.jsx)(Ae.Action,{title:"No Milestone",icon:{source:"linear-icons/no-milestone.svg"},onAction:()=>a(null)}),!i&&c?(0,tt.jsx)(Ae.Action,{title:"Loading\u2026"}):(i||[]).map(n=>(0,tt.jsx)(Ae.Action,{autoFocus:n.id===e.projectMilestone?.id,title:`${n.name}  (${n.targetDate||"No Target Date"})`,icon:Pe(n),onAction:()=>a(n)},n.id))]})}var st=require("@raycast/api"),bi=require("react");var Ie=require("react/jsx-runtime");function is({issue:e,updateIssue:t}){let[s,r]=(0,bi.useState)(!1),{issues:i,isLoadingIssues:c}=pe(Ye,[],{execute:s}),a=e.parent,n=a?.id,o=!!n;async function d(u){t({animatedTitle:"Setting parent issue",payload:{parentId:u?u.id:null},optimisticUpdate(P){return{...P,parent:u||void 0}},rollbackUpdate(P){return{...P,parent:a}},successTitle:"Set parent issue",successMessage:u?`${u.identifier} set as parent issue`:`Removed parent issue from ${e.identifier}`,errorTitle:"Failed to set parent issue"})}return(0,Ie.jsxs)(Ie.Fragment,{children:[(0,Ie.jsx)(st.ActionPanel.Submenu,{title:o?"Change Parent Issue":"Set Parent Issue",icon:{source:{light:"light/parent-issue.svg",dark:"dark/parent-issue.svg"}},shortcut:{modifiers:["ctrl","shift"],key:"i"},onOpen:()=>r(!0),children:!i&&c?(0,Ie.jsx)(st.Action,{title:"Loading\u2026"}):(i||[]).map(u=>(0,Ie.jsx)(st.Action,{autoFocus:u.id===n,title:`${u.identifier} - ${u.title}`,icon:z(u.state),onAction:()=>d(u)},u.id))}),o?(0,Ie.jsx)(st.Action,{title:"Remove Parent Issue",icon:{source:{light:"light/parent-issue.svg",dark:"dark/parent-issue.svg"}},shortcut:{macOS:{modifiers:["cmd","shift"],key:"k"},Windows:{modifiers:["ctrl","shift"],key:"k"}},onAction:()=>d(null)}):null]})}var it=require("@raycast/api"),Ci=require("react");var rt=require("react/jsx-runtime");function rs({issue:e,updateIssue:t}){let[s,r]=(0,Ci.useState)(!1),{projects:i,isLoadingProjects:c}=Oe(e.team.id,{execute:s});async function a(n){let o=e.project;t({animatedTitle:"Setting project",payload:{projectId:n?n.id:null},optimisticUpdate(d){return{...d,project:n||void 0}},rollbackUpdate(d){return{...d,project:o}},successTitle:n?"Set project":`Removed project from ${e.identifier}`,successMessage:n?`"${n.name}" added to ${e.identifier}`:"",errorTitle:"Failed to set project"})}return(0,rt.jsxs)(it.ActionPanel.Submenu,{title:"Set Project",icon:{source:{light:"light/project.svg",dark:"dark/project.svg"}},shortcut:{modifiers:["ctrl","shift"],key:"p"},onOpen:()=>r(!0),children:[(0,rt.jsx)(it.Action,{title:"No Project",icon:{source:{light:"light/no-project.svg",dark:"dark/no-project.svg"}},onAction:()=>a(null)}),!i&&c?(0,rt.jsx)(it.Action,{title:"Loading\u2026"}):(i||[]).map(n=>(0,rt.jsx)(it.Action,{autoFocus:n.id===e.project?.id,title:`${n.name} (${n.status.name})`,icon:le(n),onAction:()=>a(n)},n.id))]})}var Ge=require("@raycast/api"),wi=require("react");var Rt=require("react/jsx-runtime");function os({issue:e,updateIssue:t}){let[s,r]=(0,wi.useState)(!1),{states:i,isLoadingStates:c}=me(e.team.id,{execute:s}),a=Je(i||[]);async function n(o){let d=e.state;t({animatedTitle:"Setting status",payload:{stateId:o.id},optimisticUpdate(u){return{...u,state:o}},rollbackUpdate(u){return{...u,state:d}},successTitle:"Set status",successMessage:`${e.identifier} set to ${o.name}`,errorTitle:"Failed to set status"})}return(0,Rt.jsx)(Ge.ActionPanel.Submenu,{icon:Ge.Icon.Circle,title:"Set Status",shortcut:{macOS:{modifiers:["cmd","shift"],key:"s"},Windows:{modifiers:["ctrl","shift"],key:"s"}},onOpen:()=>r(!0),children:a.length===0&&c?(0,Rt.jsx)(Ge.Action,{title:"Loading\u2026"}):a.map(o=>(0,Rt.jsx)(Ge.Action,{autoFocus:o.id===e.state.id,title:o.name,icon:z(o),onAction:()=>n(o)},o.id))})}var b=require("react/jsx-runtime");function et({issue:e,mutateList:t,mutateSubIssues:s,mutateDetail:r,showAttachmentsAction:i,attachments:c,priorities:a,me:n,hideOpenInLinear:o}){let{pop:d}=(0,g.useNavigation)(),{linearClient:u}=k(),P=e.assignee?.id===n?.id,j=Xe({issueEstimationType:e.team.issueEstimationType,issueEstimationAllowZero:e.team.issueEstimationAllowZero,issueEstimationExtended:e.team.issueEstimationExtended});async function S({animatedTitle:I,payload:T,optimisticUpdate:D,rollbackUpdate:Z,successTitle:$e,successMessage:_e,errorTitle:Ze}){try{await(0,g.showToast)({style:g.Toast.Style.Animated,title:I});let G=u.updateIssue(e.id,T);await Promise.all([G,t?t(G,{optimisticUpdate(E){if(E)return E.map(Q=>Q.id===e.id?D(Q):Q)},rollbackOnError(E){if(E)return E.map(Q=>Q.id===e.id?Z(Q):Q)}}):Promise.resolve(),s?s(G,{optimisticUpdate(E){if(E)return E.map(Q=>Q.id===e.id?D(Q):Q)},rollbackOnError(E){if(E)return E.map(Q=>Q.id===e.id?Z(Q):Q)}}):Promise.resolve(),r?r(G,{optimisticUpdate(E){return D(E)},rollbackOnError(E){return Z(E)}}):Promise.resolve()]),await(0,g.showToast)({style:g.Toast.Style.Success,title:$e,message:_e})}catch(G){await(0,g.showToast)({style:g.Toast.Style.Failure,title:Ze,message:V(G)})}}async function L(){if(await(0,g.confirmAlert)({title:"Delete Issue",message:"Are you sure you want to delete the selected issue?",icon:{source:g.Icon.Trash,tintColor:g.Color.Red}}))try{await(0,g.showToast)({style:g.Toast.Style.Animated,title:"Deleting issue"});let I=u.deleteIssue(e.id);r&&d(),await Promise.all([I,t?t(I,{optimisticUpdate(T){if(T)return T.filter(D=>D.id!==e.id)}}):Promise.resolve(),s?s(I,{optimisticUpdate(T){if(T)return T.filter(D=>D.id!==e.id)}}):Promise.resolve()]),await(0,g.showToast)({style:g.Toast.Style.Success,title:"Issue deleted",message:`"${e.title}" is deleted`})}catch(I){await(0,g.showToast)({style:g.Toast.Style.Failure,title:"Failed to delete issue",message:V(I)})}}async function A(I){let T=e.priority;S({animatedTitle:"Setting priority",payload:{priority:I.priority},optimisticUpdate(D){return{...D,priority:I.priority}},rollbackUpdate(D){return{...D,priority:T}},successTitle:"Set priority",successMessage:`${e.identifier} priority set to ${I.label}`,errorTitle:"Failed to set priority"})}async function X(I){let T=e.assignee;S({animatedTitle:"Setting assignee",payload:{assigneeId:I.id},optimisticUpdate(D){return{...D,assignee:I}},rollbackUpdate(D){return{...D,assignee:T}},successTitle:"Set assignee",successMessage:`${e.identifier} assigned to ${I.displayName}`,errorTitle:"Failed to set assignee"})}async function U(I){let T=e.assignee;S({animatedTitle:"Setting assignee",payload:{assigneeId:I?I.id:null},optimisticUpdate(D){return{...D,assignee:I||void 0}},rollbackUpdate(D){return{...D,assignee:T}},successTitle:"Set assignee",successMessage:`${e.identifier} ${I?"assigned to":"un-assigned from"} me`,errorTitle:"Failed to set assignee"})}async function $({estimate:I,label:T}){let D=e.estimate;S({animatedTitle:"Setting estimate",payload:{estimate:I},optimisticUpdate(Z){return{...Z,estimate:I}},rollbackUpdate(Z){return{...Z,estimate:D}},successTitle:"Set estimate",successMessage:`${e.identifier} estimate set to ${T}`,errorTitle:"Failed to set estimate"})}async function x(I){S({animatedTitle:I?"Setting due date":"Removing due date",payload:{dueDate:I},optimisticUpdate(T){return{...T,dueDate:I}},rollbackUpdate(T){return{...T,dueDate:T.dueDate}},successTitle:I?"Set due date":"Removed due date",successMessage:I?`${e.identifier} due date set to ${(0,ns.format)(I,"MM/dd/yyyy")}`:"",errorTitle:"Failed to set due date"})}async function q(I){if(!I){await(0,g.showToast)({style:g.Toast.Style.Failure,title:"Failed setting reminder"});return}try{await(0,g.showToast)({style:g.Toast.Style.Animated,title:"Setting reminder"}),await u.issueReminder(e.id,I),r&&d(),await(0,g.showToast)({style:g.Toast.Style.Success,title:"Reminder set",message:`${e.identifier} reminder set to ${(0,ns.format)(I,"MM/dd/yyyy")}`})}catch(T){await(0,g.showToast)({style:g.Toast.Style.Failure,title:"Failed to set reminder",message:V(T)})}}function ce(){t&&t(),s&&s(),r&&r()}let[Te,_]=(0,Ai.useState)(""),{users:oe,supportsUserTypeahead:ye,isLoadingUsers:ue}=ve(Te);return(0,b.jsxs)(b.Fragment,{children:[o?null:(0,b.jsx)(Qe,{title:"Open Issue",url:e.url}),(0,b.jsxs)(g.ActionPanel.Section,{children:[(0,b.jsx)(g.Action.Push,{title:"Edit Issue",icon:g.Icon.Pencil,shortcut:g.Keyboard.Shortcut.Common.Edit,target:(0,b.jsx)(qt,{priorities:a,me:n,issue:e,mutateList:t,mutateSubIssues:s})}),(0,b.jsx)(os,{issue:e,updateIssue:S}),a&&a.length>0?(0,b.jsx)(g.ActionPanel.Submenu,{icon:g.Icon.LevelMeter,title:"Set Priority",shortcut:{macOS:{modifiers:["cmd","opt"],key:"p"},Windows:{modifiers:["ctrl","alt"],key:"p"}},children:a.map(I=>(0,b.jsx)(g.Action,{autoFocus:I.priority===e.priority,title:I.label,icon:{source:ae[I.priority]},onAction:()=>A(I)},I.priority))}):null,(0,b.jsx)(g.ActionPanel.Submenu,{icon:g.Icon.AddPerson,title:"Assign to",shortcut:{macOS:{modifiers:["cmd","shift"],key:"a"},Windows:{modifiers:["ctrl","shift"],key:"a"}},...ye&&{onSearchTextChange:_,isLoading:ue,throttle:!0},children:oe?.map(I=>(0,b.jsx)(g.Action,{autoFocus:I.id===e.assignee?.id,title:`${I.displayName} (${I.email})`,icon:K(I),onAction:()=>X(I)},I.id))}),n?(0,b.jsx)(g.Action,{title:P?"Un-Assign from Me":"Assign to Me",icon:K(n),shortcut:{macOS:{modifiers:["cmd","shift"],key:"i"},Windows:{modifiers:["ctrl","shift"],key:"i"}},onAction:()=>U(P?null:n)}):null,j?(0,b.jsx)(g.ActionPanel.Submenu,{title:"Set Estimate",icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}},shortcut:{macOS:{modifiers:["cmd","shift"],key:"e"},Windows:{modifiers:["ctrl","shift"],key:"e"}},children:j.map(({estimate:I,label:T})=>(0,b.jsx)(g.Action,{autoFocus:I===e.estimate,title:T,onAction:()=>$({estimate:I,label:T})},I))}):null,(0,b.jsx)(g.Action.PickDate,{title:"Set Due Date",shortcut:{macOS:{modifiers:["opt","shift"],key:"d"},Windows:{modifiers:["alt","shift"],key:"d"}},onChange:x}),(0,b.jsx)(g.Action.PickDate,{title:"Set Reminder",shortcut:{macOS:{modifiers:["cmd","shift"],key:"h"},Windows:{modifiers:["ctrl","shift"],key:"h"}},onChange:q}),(0,b.jsx)(ts,{issue:e,updateIssue:S}),(0,b.jsx)(es,{issue:e,updateIssue:S}),(0,b.jsx)(rs,{issue:e,updateIssue:S}),(0,b.jsx)(ss,{issue:e,updateIssue:S}),(0,b.jsx)(is,{issue:e,updateIssue:S}),(0,b.jsx)(g.Action,{title:"Delete Issue",shortcut:g.Keyboard.Shortcut.Common.Remove,icon:g.Icon.Trash,style:g.Action.Style.Destructive,onAction:()=>L()})]}),(0,b.jsxs)(g.ActionPanel.Section,{children:[(0,b.jsx)(g.Action.Push,{title:"Show Sub-Issues",icon:g.Icon.List,target:(0,b.jsx)(Jt,{issue:e,mutateList:t}),shortcut:{macOS:{modifiers:["cmd","shift"],key:"m"},Windows:{modifiers:["ctrl","shift"],key:"m"}}}),(0,b.jsx)(g.Action.Push,{title:"Break Issues into Sub-Issues",icon:g.Icon.Stars,target:(0,b.jsx)(Ot,{issue:e}),shortcut:{macOS:{modifiers:["opt","shift"],key:"m"},Windows:{modifiers:["alt","shift"],key:"m"}}}),i?(0,b.jsx)(g.Action.Push,{title:"Show Issue Links",icon:g.Icon.Link,target:(0,b.jsx)(Qt,{attachments:c??[],issue:e}),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"l"},Windows:{modifiers:["ctrl","alt","shift"],key:"l"}}}):null,(0,b.jsx)(g.Action.Push,{title:"Add Attachments and Links",icon:g.Icon.NewDocument,target:(0,b.jsx)($t,{issue:e}),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"a"},Windows:{modifiers:["ctrl","alt","shift"],key:"a"}}}),(0,b.jsx)(g.Action.Push,{title:"Add Comment",icon:g.Icon.Plus,target:(0,b.jsx)(qe,{issue:e}),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"n"},Windows:{modifiers:["ctrl","alt","shift"],key:"n"}}}),(0,b.jsx)(g.Action.Push,{title:"Show Comments",icon:g.Icon.Bubble,target:(0,b.jsx)(Zt,{issue:e}),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"c"},Windows:{modifiers:["ctrl","alt","shift"],key:"c"}}})]}),(0,b.jsx)(Yt,{issue:e}),(0,b.jsx)(g.ActionPanel.Section,{children:(0,b.jsx)(g.Action,{title:"Refresh",icon:g.Icon.ArrowClockwise,shortcut:g.Keyboard.Shortcut.Common.Refresh,onAction:()=>ce()})})]})}var Le=require("react/jsx-runtime");function It({issue:e,mutateList:t,mutateSubIssues:s,priorities:r,me:i}){let{primaryAction:c}=(0,re.getPreferenceValues)(),a=[e.identifier,e.state.name,e.priorityLabel];e.assignee&&a.push(e.assignee.email,e.assignee.displayName);let n=new Date(e.updatedAt),o=e.dueDate?new Date(e.dueDate):null,d=e.estimate?{icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}},text:St({estimate:e.estimate,issueEstimationType:e.team.issueEstimationType})}:null,u=e.cycle?xe(e.cycle):null,P=e.project||null,j=e.labels.nodes.length>0,S=[{date:n,tooltip:`Updated: ${(0,xt.format)(n,"EEEE d MMMM yyyy 'at' HH:mm")}`},{icon:o?Pt(o):void 0,text:o?(0,xt.format)(o,"MMM dd"):void 0,tooltip:o?`Due date: ${(0,xt.format)(o,"MM/dd/yyyy")}`:void 0},{icon:j?re.Icon.Tag:void 0,text:j?String(e.labels.nodes.length):void 0,tooltip:j?e.labels.nodes.map(A=>A.name).join(", "):void 0},{icon:P?le(P):void 0,tooltip:`Project: ${P?P.name:void 0}`},{icon:u?{source:u.icon}:void 0,text:u?String(u.number):void 0,tooltip:u?`Cycle: ${u.title}`:void 0},{icon:d?d.icon:void 0,text:d?d.text:void 0},{icon:z(e.state),tooltip:`Status: ${e.state.name}`},{icon:K(e.assignee),tooltip:e.assignee?`Assignee: ${e.assignee?.displayName} (${e.assignee?.email})`:"Unassigned"}],L=c==="openInLinear";return(0,Le.jsx)(re.List.Item,{title:e.title,icon:{value:{source:ae[e.priority]},tooltip:`Priority: ${e.priorityLabel}`},subtitle:e.identifier,keywords:a,accessories:S,actions:(0,Le.jsxs)(re.ActionPanel,{title:e.identifier,children:[L?(0,Le.jsx)(Qe,{title:"Open Issue",url:e.url}):null,(0,Le.jsx)(re.Action.Push,{title:"Show Details",icon:re.Icon.Sidebar,target:(0,Le.jsx)(ft,{issue:e,mutateList:t,priorities:r,me:i})}),(0,Le.jsx)(et,{issue:e,mutateList:t,mutateSubIssues:s,priorities:r,me:i,hideOpenInLinear:L})]})},e.id)}var nt=require("@raycast/api"),Li=require("@raycast/utils"),vt=ct(require("react"));var ot=require("react/jsx-runtime");function lr({children:e}){return(0,vt.useEffect)(()=>{ri()},[]),e}var as=class extends vt.default.Component{constructor(t){super(t),this.state={error:null}}static getDerivedStateFromError(t){return{error:t}}render(){let{error:t}=this.state;if(!t)return this.props.children;if(!(t.message.includes("invalid_grant")||t.message.includes("Error while fetching tokens")||t.message.includes("Could not initialize OAuth")))throw t;return(0,ot.jsx)(nt.Detail,{markdown:`# Sign In Failed

Failed to authenticate with Linear:
\`\`\`
${t.message}
\`\`\`

This can happen when the network is unreliable or the authorization code has expired. Please try signing in again.`,actions:(0,ot.jsx)(nt.ActionPanel,{children:(0,ot.jsx)(nt.Action,{title:"Sign in Again",onAction:async()=>{await Ft.client.removeTokens(),this.setState({error:null})}})})})}},cr=(0,Li.withAccessToken)(Ft)(lr);function ls({children:e}){return(0,ot.jsx)(as,{children:(0,ot.jsx)(cr,{children:e})})}var Ti=require("@raycast/utils");function cs(e){return(0,Ti.useCachedPromise)(t=>async({cursor:s})=>{if(!t){let{issues:c,pageInfo:a}=await As(s);return{data:c??[],hasMore:a?.hasNextPage,cursor:a?.endCursor}}let{issues:r,pageInfo:i}=await Ls(t,s);return{data:r??[],hasMore:i?.hasNextPage,cursor:i?.endCursor}},[e])}var at=require("react/jsx-runtime");function ur(){let[e,t]=(0,$i.useState)(""),{isLoading:s,data:r,mutate:i,pagination:c}=cs(e),{priorities:a,isLoadingPriorities:n}=gt(),{me:o,isLoadingMe:d}=We(),u=r?.length===1?"1 issue":`${r?.length} issues`;return(0,at.jsx)(us.List,{navigationTitle:"Search issues",isLoading:s||n||d,onSearchTextChange:t,throttle:!0,searchBarPlaceholder:"Globally search issues across projects",pagination:c,children:(0,at.jsx)(us.List.Section,{title:"Updated Recently",subtitle:u,children:r?.map(P=>(0,at.jsx)(It,{issue:P,mutateList:i,priorities:a,me:o},P.id))})})}function Di(){return(0,at.jsx)(ls,{children:(0,at.jsx)(ur,{})})}
