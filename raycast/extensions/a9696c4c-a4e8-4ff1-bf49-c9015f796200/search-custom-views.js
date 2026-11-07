"use strict";var ji=Object.create;var wt=Object.defineProperty;var Mi=Object.getOwnPropertyDescriptor;var Ui=Object.getOwnPropertyNames;var Fi=Object.getPrototypeOf,Ei=Object.prototype.hasOwnProperty;var Ni=(e,t)=>{for(var s in t)wt(e,s,{get:t[s],enumerable:!0})},ms=(e,t,s,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of Ui(t))!Ei.call(e,i)&&i!==s&&wt(e,i,{get:()=>t[i],enumerable:!(o=Mi(t,i))||o.enumerable});return e};var mt=(e,t,s)=>(s=e!=null?ji(Fi(e)):{},ms(t||!e||!e.__esModule?wt(s,"default",{value:e,enumerable:!0}):s,e)),Vi=e=>ms(wt({},"__esModule",{value:!0}),e);var go={};Ni(go,{CustomViewIssues:()=>Di,default:()=>xi});module.exports=Vi(go);var W=require("@raycast/api"),us=require("react");var ne=require("@raycast/api"),jt=require("date-fns");var le=require("date-fns"),Oi=10080*60*1e3;function Me(e){let t=Date.now(),s=Date.now()+Oi,o=new Date(e.startsAt),i=new Date(e.endsAt),l=!e.completedAt&&(0,le.isBefore)(o,t)&&(0,le.isAfter)(i,t),c=!e.completedAt&&(0,le.isBefore)(o,s)&&(0,le.isAfter)(i,s),n=l?{light:"light/active-cycle.svg",dark:"dark/active-cycle.svg"}:{light:"light/cycle.svg",dark:"dark/cycle.svg"},r=`Cycle ${e.number} (${(0,le.format)(o,"dd MMM")} - ${(0,le.format)(i,"dd MMM")})`,d=l?`Active ${r}`:r;return{...e,isActive:l,isNext:c,icon:n,title:d}}function Ce(e){return e.filter(t=>(0,le.isAfter)(new Date(t.endsAt),Date.now())).map(Me)}var Je=require("@raycast/api"),Ct=require("date-fns");function St(e){let t=(0,Ct.differenceInDays)(e,(0,Ct.startOfToday)()),s=Je.Color.PrimaryText;return t<=7&&(s=Je.Color.Orange),t<=0&&(s=Je.Color.Red),{source:Je.Icon.Calendar,tintColor:s}}var ps={exponential:[0,1,2,4,8,16,32,64],fibonacci:[0,1,2,3,5,8,13,21],linear:[0,1,2,3,4,5,6,7],tShirt:[0,1,2,3,5,8,13,21]},gs={0:"\u2013",1:"XS",2:"S",3:"M",5:"L",8:"XL",13:"XXL",21:"XXXL"};function bt({estimate:e,issueEstimationType:t}){if(!e)return"Not estimated";if(t==="tShirt"){let s=gs[e];return s||String(e)}return String(e)}function Ye({issueEstimationType:e,issueEstimationAllowZero:t,issueEstimationExtended:s}){if(e==="notUsed")return null;let o=t?0:1,i=s?ps[e].length:6,l=ps[e].slice(o,i);return e==="tShirt"?l.map(c=>({estimate:c,label:gs[c]})):l.map(c=>({estimate:c,label:c!==1?`${c} points`:`${c} point`}))}var ce={0:{light:"light/priority-no-priority.svg",dark:"dark/priority-no-priority.svg"},1:{light:"light/priority-urgent.svg",dark:"dark/priority-urgent.svg"},2:{light:"light/priority-high.svg",dark:"dark/priority-high.svg"},3:{light:"light/priority-medium.svg",dark:"dark/priority-medium.svg"},4:{light:"light/priority-low.svg",dark:"dark/priority-low.svg"}};var fs=mt(require("fs")),Is=require("@raycast/api"),ys=mt(require("node-emoji"));function et({icon:e,color:t,fallbackIcon:s}){if(!e)return s;if(/:(.*):/.test(e))return ys.get(e)??s;let i=`${Is.environment.assetsPath}/linear-icons/${e.toLowerCase()}.svg`;return fs.default.existsSync(i)?{source:i,...t?{tintColor:{light:t,dark:t,adjustContrast:!0}}:{}}:s}function ue(e){return e?et({icon:e.icon??void 0,color:e.color??void 0,fallbackIcon:{source:{light:"light/project.svg",dark:"dark/project.svg"}}}):{source:{light:"light/no-project.svg",dark:"dark/no-project.svg"}}}var hs=require("lodash");var qi={triage:{light:"light/triage.svg",dark:"dark/triage.svg"},backlog:{light:"light/backlog.svg",dark:"dark/backlog.svg"},unstarted:{light:"light/unstarted.svg",dark:"dark/unstarted.svg"},started:{light:"light/started.svg",dark:"dark/started.svg"},completed:{light:"light/completed.svg",dark:"dark/completed.svg"},canceled:{light:"light/canceled.svg",dark:"dark/canceled.svg"}};function G(e){return{source:qi[e.type],tintColor:{light:e.color,dark:e.color,adjustContrast:!0}}}function tt(e,t=["triage","backlog","unstarted","started","completed","canceled"]){if(e.length===0)return[];let s=(0,hs.groupBy)(e,o=>o.type);return t.filter(o=>!!s[o]).map(o=>s[o]).flat()}var At=require("@raycast/api"),ks=require("@raycast/utils");function J(e){return e?{source:e.avatarUrl?encodeURI(e.avatarUrl):(0,ks.getAvatarIcon)(e.displayName.toUpperCase()),mask:At.Image.Mask.Circle}:At.Icon.Person}var g=require("@raycast/api"),ns=require("date-fns"),bi=require("react");var Ps=require("@linear/sdk"),ws=require("@raycast/api"),Cs=require("@raycast/utils"),pt=null;async function Wi(e,t,s,o,i){let l=JSON.stringify({query:s,variables:o}),c=new Headers(t.headers);new Headers(i).forEach((d,u)=>c.set(u,d)),c.set("Content-Type","application/json");let n=await fetch(e,{...t,method:"POST",headers:Object.fromEntries(c.entries()),body:l}),r=n.headers.get("Content-Type")?.startsWith("application/json")?await n.json():await n.text();if(typeof r!="string"&&n.ok&&!r.errors&&r.data)return{...r,headers:n.headers,status:n.status};throw new Error(typeof r=="string"?r:r.errors?.[0]?.message??`GraphQL Error (${n.status})`)}var Nt=Cs.OAuthService.linear({scope:"read write",onAuthorize({token:e}){pt=new Ps.LinearClient({accessToken:e,headers:{"public-file-urls-expire-in":"60","linear-raycast-extension-name":ws.environment.extensionName}});let t=pt.client;t.rawRequest=((s,o,i)=>Wi(t.url,t.options,s,o,i))}});function k(){if(!pt)throw new Error("No linear client initialized");return{linearClient:pt,graphQLClient:pt.client}}function O(e){return e instanceof Error?e.message:String(e)}var Ss=require("@raycast/utils");function Ue(e=""){let{linearClient:t}=k(),{data:s,error:o,isLoading:i}=(0,Ss.useCachedPromise)(async l=>{let c=await t.users(l.trim().length>0?{filter:{name:{containsIgnoreCase:l}}}:void 0);return{users:c?.nodes??[],hasMoreUsers:!!c?.pageInfo?.hasNextPage}},[e],{initialData:[]});return{users:s?.users,supportsUserTypeahead:e.trim().length>0||s?.hasMoreUsers,usersError:o,isLoadingUsers:!s&&!o||i}}var b=require("@raycast/api"),Ms=require("@raycast/utils"),Us=require("nanoid"),Ne=require("react");var bs=require("@raycast/api");async function st(e,t,s,o,i){let l=o,c=!0,n,r=0;for(;c&&r<i;){let d=await e(n);l=s(l,d),c=t(d)?.hasNextPage,n=t(d)?.endCursor,r++}return l}var Qi=(0,bs.getPreferenceValues)();function As({inFilterBlock:e,addComma:t,inParentheses:s}={inFilterBlock:!1,inParentheses:!1,addComma:!0}){return Qi.shouldHideRedundantIssues?[...s?["("]:[],...t?[", "]:[],...e?[]:["filter: { "],"completedAt: { null: true }, canceledAt: { null: true }",...e?[]:[" }"],...s?[")"]:[]].join(""):""}var Fe=`
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
`;async function it(){let{graphQLClient:e}=k(),{data:t}=await e.rawRequest(`
      query {
        issues(orderBy: createdAt${As()}) {
          nodes {
            ${Fe}
          }
        }
      }
    `);return t?.issues.nodes}async function Ls(e){let{graphQLClient:t}=k(),{data:s}=await t.rawRequest(`
      query($issueId: String!) {
        issue(id: $issueId) {
          children${As({inParentheses:!0})} {
            nodes {
              ${Fe}
              sortOrder
            }
          }
        }
      }
    `,{issueId:e});if(!s)throw new Error("Cannot find the Linear issue");return s.issue.children.nodes}async function Ts(e){let{graphQLClient:t}=k(),{data:s}=await t.rawRequest(`
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
    `,{issueId:e});if(!s)throw new Error("Cannot find the Linear issue");return s.issue}async function $s(e){let{graphQLClient:t}=k(),{data:s}=await t.rawRequest(`
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
          ${Fe}
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
    `,{issueId:e});if(!s)throw new Error("Cannot find the Linear issue");return s.issue}async function Ds(e){let{graphQLClient:t}=k(),s=e.title.replace(/"/g,"\\$&"),o=e.description?.replace(/\n/g,"\\n")?.replace(/"/g,"\\$&"),i=`teamId: "${e.teamId}", title: "${s}", description: "${o}", priority: ${e.priority}`;e.stateId&&(i+=`, stateId: "${e.stateId}"`),e.estimate&&(i+=`, estimate: ${e.estimate}`),e.assigneeId&&(i+=`, assigneeId: "${e.assigneeId}"`),e.labelIds&&e.labelIds.length>0&&(i+=`, labelIds: [${e.labelIds.map(c=>`"${c}"`).join(",")}]`),e.dueDate&&(i+=`, dueDate: "${e.dueDate.toISOString()}"`),e.cycleId&&(i+=`, cycleId: "${e.cycleId}"`),e.projectId&&(i+=`, projectId: "${e.projectId}"`),e.projectId&&e.projectMilestoneId&&(i+=`, projectMilestoneId: "${e.projectMilestoneId}"`),e.parentId&&(i+=`, parentId: "${e.parentId}"`);let{data:l}=await t.rawRequest(`
      mutation {
        issueCreate(input: {${i}}) {
          success
          issue {
            ${Fe}
          }
        }
      }
    `);return{success:l?.issueCreate.success,issue:l?.issueCreate.issue}}async function xs(e){let{graphQLClient:t}=k(),s=e.title.replace(/"/g,"\\$&"),o=e.description?.replace(/\n/g,"\\n").replace(/"/g,"\\$&"),i=`teamId: "${e.teamId}", title: "${s}", description: "${o}", parentId: "${e.parentId}"`;e.stateId&&(i+=`, stateId: "${e.stateId}"`);let{data:l}=await t.rawRequest(`
      mutation {
        issueCreate(input: {${i}}) {
          success
        }
      }
    `);return{success:l?.issueCreate.success}}var vs=require("@raycast/utils");function Ee(e){let t=e.id,{data:s,error:o,isLoading:i,mutate:l}=(0,vs.useCachedPromise)(Rs,[t],{initialData:{...e,description:""}});return{issue:s,issueError:o,isLoadingIssue:i,mutateDetail:l}}var js=require("@raycast/utils");function fe(e,t){let{linearClient:s}=k(),{data:o,error:i,isLoading:l}=(0,js.useCachedPromise)(async c=>(await s.workflowStates({filter:{team:{id:{eq:c}}}})).nodes.sort((r,d)=>r.position-d.position),[e],{initialData:[],execute:t?.execute!==!1});return{states:o,isLoadingStates:l,statesError:i}}var ee=require("react/jsx-runtime");function Vt({issue:e}){let{pop:t}=(0,b.useNavigation)(),{states:s}=fe(e.team.id),o=(0,Ne.useMemo)(()=>s.filter(A=>A.type==="unstarted")[0],[s]),{issue:i,isLoadingIssue:l}=Ee(e),{data:c,isLoading:n,revalidate:r}=(0,Ms.useAI)(`Act as a product manager for Linear issues. Break down a Linear issue into a list of sub-issues. 
    
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

Break down the Linear issue with this title: "${i.title}"`,{execute:!!i&&!l,creativity:.5}),[d,u]=(0,Ne.useState)(!1),[P,j]=(0,Ne.useState)([]);(0,Ne.useEffect)(()=>{if(!(!c||n)){try{let L=/\[[\s\S]*?\]/,A=c.match(L);if(A&&A[0]){let Y=JSON.parse(A[0]);j(Y.map(U=>({...U,id:(0,Us.nanoid)(),selected:!0})))}}catch(L){(0,b.showToast)({style:b.Toast.Style.Failure,title:"Failed to parse AI results",message:O(L),primaryAction:{title:"Retry",onAction:r},secondaryAction:{title:"Copy AI Result",onAction:()=>b.Clipboard.copy(c)}})}u(!0)}},[c,n]);async function w(){try{await(0,b.showToast)({style:b.Toast.Style.Animated,title:"Creating sub-issues"});let L=P.filter(A=>A.selected);await Promise.all(L.map(A=>xs({teamId:i.team.id,title:A.title,description:A.description,parentId:i.id,stateId:o?.id}))),await(0,b.showToast)({style:b.Toast.Style.Success,title:"Created sub-issues"}),t()}catch(L){(0,b.showToast)({style:b.Toast.Style.Failure,title:"Failed to create Sub-Issues",message:O(L)})}}return(0,ee.jsxs)(b.List,{isLoading:n||!d,children:[P?.map(L=>(0,ee.jsx)(b.List.Item,{icon:L.selected?{source:b.Icon.CheckCircle,tintColor:b.Color.Green}:b.Icon.Circle,title:L.title,subtitle:L.description,actions:(0,ee.jsxs)(b.ActionPanel,{children:[(0,ee.jsx)(b.Action,{title:L.selected?"Unselect Sub-Issue":"Select Sub-Issue",icon:L.selected?b.Icon.Circle:{source:b.Icon.CheckCircle,tintColor:b.Color.Green},onAction:()=>j(P.map(A=>A.id===L.id?{...A,selected:!A.selected}:A))}),(0,ee.jsx)(b.Action,{title:"Create Sub-Issues",icon:b.Icon.Plus,onAction:()=>w()}),(0,ee.jsx)(b.Action,{title:"Generate New Sub-Issues",icon:b.Icon.ArrowClockwise,onAction:r})]})},L.title)),(0,ee.jsx)(b.List.EmptyView,{title:"No sub-issues were generated. Try again.",actions:(0,ee.jsx)(b.ActionPanel,{children:(0,ee.jsx)(b.Action,{title:"Retry",icon:b.Icon.ArrowClockwise,onAction:r})})})]})}var y=require("@raycast/api"),Qe=require("@raycast/utils"),ft=require("react");async function Fs(e,t){let{graphQLClient:s}=k(),o=[];if(t.teamId&&o.push(`teamId: "${t.teamId}"`),t.title&&o.push(`title: "${t.title.replace(/"/g,"\\$&")}"`),t.description&&o.push(`description: "${t.description.replace(/\n/g,"\\n").replace(/"/g,"\\$&")}"`),t.stateId&&o.push(`stateId: "${t.stateId}"`),typeof t.priority<"u"&&o.push(`priority: ${t.priority}`),typeof t.assigneeId<"u"&&o.push(`assigneeId: ${t.assigneeId?`"${t.assigneeId}"`:null}`),t.labelIds&&o.push(`labelIds: [${t.labelIds.map(l=>`"${l}"`).join(",")}]`),typeof t.estimate<"u"&&o.push(`estimate: ${t.estimate}`),typeof t.dueDate<"u"){let l=t.dueDate?t.dueDate instanceof Date?t.dueDate.toISOString():t.dueDate:null;o.push(`dueDate: ${l?`"${l}"`:null}`)}typeof t.cycleId<"u"&&o.push(`cycleId: ${t.cycleId?`"${t.cycleId}"`:null}`),typeof t.projectId<"u"&&o.push(`projectId: ${t.projectId?`"${t.projectId}"`:null}`),typeof t.projectMilestoneId<"u"&&o.push(`projectMilestoneId: ${t.projectMilestoneId?`"${t.projectMilestoneId}"`:null}`),typeof t.parentId<"u"&&o.push(`parentId: ${t.parentId?`"${t.parentId}"`:null}`);let{data:i}=await s.rawRequest(`
      mutation {
        issueUpdate(id: "${e}", input: {${o.join(", ")}}) {
          success
        }
      }
    `);return{success:i?.issueUpdate.success}}var Ot=require("@raycast/api");function Se(e){return e?{source:"linear-icons/milestone.svg",tintColor:Ot.Color.PrimaryText}:{source:"linear-icons/no-milestone.svg",tintColor:Ot.Color.SecondaryText}}var Es=require("@raycast/api");function Lt(e,t){let s=t?.logoUrl?encodeURI(t.logoUrl):Es.Icon.TwoPeople;return et({icon:e.icon??void 0,color:e.color??void 0,fallbackIcon:s})}var Ns=require("@raycast/utils");function Ve(e,t){let{linearClient:s}=k(),{data:o,error:i,isLoading:l}=(0,Ns.useCachedPromise)(async c=>(await s.cycles({filter:{team:{id:{eq:c}}}})).nodes.sort((r,d)=>r.number-d.number),[e],{execute:t?.execute!==!1&&!!e});return{cycles:o,cyclesError:i,isLoadingCycles:!o&&!i||l}}var Vs=require("@raycast/utils");function Ie(e,t=[],s){let{data:o,error:i,isLoading:l,mutate:c}=(0,Vs.useCachedPromise)(e,t,s);return{issues:o,issuesError:i,isLoadingIssues:l,mutateList:c}}var Ws=require("@raycast/utils");var Os=require("@raycast/api");var Bi=100,zi=100,Gi=(0,Os.getPreferenceValues)();function _i(){let e=Number(Gi.labelsLimit),t=Number.isFinite(e)&&e>0?e:zi,s=Math.floor(Math.min(Bi,t)),o=Math.ceil(t/s);return{pageSize:s,pageLimit:o}}async function qs(e){if(!e)return[];let{pageSize:t,pageLimit:s}=_i(),{graphQLClient:o}=k();return st(async i=>o.rawRequest(`
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
        `,{teamId:e,cursor:i}),i=>i.data?.team?.labels?.pageInfo,(i,l)=>i.concat(l.data?.team?.labels?.nodes??[]),[],s)}function Oe(e,t){let{data:s,error:o,isLoading:i}=(0,Ws.useCachedPromise)(qs,[e],{execute:t?.execute!==!1&&!!e});return{labels:s,labelsError:o,isLoadingLabels:!s&&!o||i}}var Bs=require("@raycast/utils");var Zi=`
  id
  name
  targetDate
  project {
      id
  }
  sortOrder
  updatedAt
`;async function Qs(e){let{graphQLClient:t}=k();if(e){let{data:s}=await t.rawRequest(`
        query($projectId: String!) {
          project(id: $projectId) {
            projectMilestones {
              nodes {
                ${Zi}
              }
            }
          }
        }
      `,{projectId:e});return s?.project.projectMilestones.nodes}return null}function qe(e,t){let{data:s,error:o,isLoading:i,mutate:l}=(0,Bs.useCachedPromise)(Qs,[e],{execute:t?.execute!==!1});return{milestones:s,isLoadingMilestones:!s&&!o||i,milestonesError:o,mutateMilestones:l}}var Gs=require("@raycast/utils");var Hi=`
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
`;async function zs({teamId:e,searchText:t="",after:s=null,first:o=null}){let{graphQLClient:i}=k(),l=`
    projects(first: $first, after: $after, filter: { name: { containsIgnoreCase: $searchText } }) {
      nodes {
        ${Hi}
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  `;if(!e){let{data:r}=await i.rawRequest(`
        query($first: Int, $after: String, $searchText: String) {
          ${l}
        }
      `,{first:o,after:s,searchText:t}),d=r?.projects;return{data:d?.nodes??[],hasMore:!!d?.pageInfo.hasNextPage,cursor:d?.pageInfo.endCursor||null}}let{data:c}=await i.rawRequest(`
      query($teamId: String!, $first: Int, $after: String, $searchText: String) {
        team(id: $teamId) {
          ${l}
        }
      }
    `,{teamId:e,first:o,after:s,searchText:t}),n=c?.team?.projects;return{data:n?.nodes??[],hasMore:!!n?.pageInfo.hasNextPage,cursor:n?.pageInfo.endCursor||null}}function We(e,t){let{data:s,error:o,isLoading:i,mutate:l,pagination:c}=(0,Gs.useCachedPromise)((n,r)=>d=>zs({teamId:n,searchText:r,after:d.cursor,first:t?.pageSize}),[e,t?.searchText],{execute:t?.execute!==!1,keepPreviousData:!0});return{projects:s,isLoadingProjects:!s&&!o||i,projectsError:o,mutateProjects:l,pagination:c}}var Hs=require("@raycast/utils");var _s=require("lodash");async function Zs(e=""){let{graphQLClient:t,linearClient:s}=k(),o=await s.viewer,{data:i}=await t.rawRequest(`
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
    `,{userId:o.id,query:e}),l=(0,_s.sortBy)(i?.teams.nodes??[],r=>r.membership?.sortOrder??1/0),c=i?.organization,n=!!i?.teams.pageInfo.hasNextPage;return{teams:l,organization:c,hasMoreTeams:n}}function gt(e=""){let{data:t,error:s,isLoading:o}=(0,Hs.useCachedPromise)(Zs,[e]);return{teams:t?.teams,org:t?.organization,teamsError:s,isLoadingTeams:!t&&!s||o,supportsTeamTypeahead:e.trim().length>0||t?.hasMoreTeams}}var S=require("react/jsx-runtime");function qt(e){let{pop:t}=(0,y.useNavigation)(),{issue:s,isLoadingIssue:o,mutateDetail:i}=Ee(e.issue),[l,c]=(0,ft.useState)(""),{teams:n,org:r,supportsTeamTypeahead:d,isLoadingTeams:u}=gt(l),P=n&&n.length>1,[j,w]=(0,ft.useState)(""),{users:L,supportsUserTypeahead:A,isLoadingUsers:Y}=Ue(j),{handleSubmit:U,itemProps:$,values:x,setValue:q}=(0,Qe.useForm)({async onSubmit(p){let X=await(0,y.showToast)({style:y.Toast.Style.Animated,title:"Editing issue"});try{let ge={teamId:p.teamId||e.issue.team.id,title:p.title,description:p.description,stateId:p.stateId,labelIds:p.labelIds,dueDate:p.dueDate,...R&&p.estimate?{estimate:parseInt(p.estimate)}:{},...p.assigneeId?{assigneeId:p.assigneeId}:{},...p.cycleId?{cycleId:p.cycleId}:{},...p.projectId?{projectId:p.projectId}:{},...p.milestoneId?{projectMilestoneId:p.milestoneId}:{},...p.parentId?{parentId:p.parentId}:{},priority:parseInt(p.priority)},{success:dt}=await Fs(s.id,ge);dt&&(X.style=y.Toast.Style.Success,X.title=`Edited Issue \u2022 ${s.identifier}`,t(),i(),e.mutateList&&e.mutateList(),e.mutateSubIssues&&e.mutateSubIssues())}catch(ge){X.style=y.Toast.Style.Failure,X.title="Failed to edit issue",X.message=O(ge)}},validation:{teamId:P?Qe.FormValidation.Required:void 0,title:Qe.FormValidation.Required,stateId:Qe.FormValidation.Required,priority:Qe.FormValidation.Required},initialValues:{teamId:e.issue.team.id,title:e.issue.title,description:s.description??void 0,priority:String(e.issue.priority),stateId:e.issue.state.id,estimate:e.issue.estimate?String(e.issue.estimate):void 0,assigneeId:e.issue.assignee?.id,labelIds:e.issue.labels.nodes.map(p=>p.id),dueDate:s.dueDate?new Date(s.dueDate):null,cycleId:e.issue.cycle?.id,projectId:e.issue.project?.id,milestoneId:e.issue.projectMilestone?.id,parentId:e.issue.parent?.id}});(0,ft.useEffect)(()=>{q("description",s.description||""),q("dueDate",s.dueDate?new Date(s.dueDate):null)},[s]);let me=!!x.teamId&&x.teamId.trim().length>0,{states:De}=fe(x.teamId,{execute:me}),{labels:H}=Oe(x.teamId,{execute:me}),{cycles:ae}=Ve(x.teamId,{execute:me}),{issues:Pe}=Ie(it,[],{execute:me}),{projects:pe}=We(x.teamId,{execute:me}),{milestones:I}=qe(x.projectId,{execute:!!x.projectId}),T=n?.find(p=>p.id===x.teamId),R=T?Ye({issueEstimationType:T.issueEstimationType,issueEstimationAllowZero:T.issueEstimationAllowZero,issueEstimationExtended:T.issueEstimationExtended}):null,K=tt(De||[]),xe=De&&De.length>0,He=e.priorities&&e.priorities.length>0,Ke=H&&H.length>0,_=ae&&ae.length>0,E=pe&&pe.length>0,B=I&&I.length>0,Pt=Pe&&Pe.length>0;return(0,S.jsxs)(y.Form,{actions:(0,S.jsx)(y.ActionPanel,{children:(0,S.jsx)(y.Action.SubmitForm,{onSubmit:U,title:"Edit Issue"})}),isLoading:u||o||Y,children:[(d||P)&&(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(y.Form.Dropdown,{title:"Team",...$.teamId,...d&&{onSearchTextChange:c,isLoading:u,throttle:!0},children:n?.map(p=>(0,S.jsx)(y.Form.Dropdown.Item,{title:p.name,value:p.id,icon:Lt(p,r)},p.id))}),(0,S.jsx)(y.Form.Separator,{})]}),(0,S.jsx)(y.Form.TextField,{title:"Title",placeholder:"Issue title",autoFocus:!0,...$.title}),(0,S.jsx)(y.Form.TextArea,{title:"Description",placeholder:"Add some details (supports Markdown, e.g. **bold**)",...$.description}),(0,S.jsx)(y.Form.Dropdown,{title:"Status",...$.stateId,children:xe?K.map(p=>(0,S.jsx)(y.Form.Dropdown.Item,{title:p.name,value:p.id,icon:G(p)},p.id)):null}),(0,S.jsx)(y.Form.Dropdown,{title:"Priority",...$.priority,children:He?e.priorities?.map(({priority:p,label:X})=>(0,S.jsx)(y.Form.Dropdown.Item,{title:X,value:String(p),icon:{source:ce[p]}},p)):null}),(0,S.jsxs)(y.Form.Dropdown,{title:"Assignee",...$.assigneeId,...A&&{onSearchTextChange:w,isLoading:Y,throttle:!0},children:[(0,S.jsx)(y.Form.Dropdown.Item,{title:"Unassigned",value:"",icon:y.Icon.Person}),L?.map(p=>(0,S.jsx)(y.Form.Dropdown.Item,{title:p.name,value:p.id,icon:J(p)},p.id))]}),(0,S.jsx)(y.Form.TagPicker,{title:"Labels",...$.labelIds,placeholder:"Add label",children:Ke?H.map(({id:p,name:X,color:ge})=>(0,S.jsx)(y.Form.TagPicker.Item,{title:X,value:p,icon:{source:y.Icon.Dot,tintColor:ge}},p)):null}),R?(0,S.jsxs)(y.Form.Dropdown,{title:"Estimate",...$.estimate,children:[(0,S.jsx)(y.Form.Dropdown.Item,{title:"No estimate",value:"",icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}}),R.map(({estimate:p,label:X})=>(0,S.jsx)(y.Form.Dropdown.Item,{title:X,value:String(p),icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}},p))]}):null,(0,S.jsx)(y.Form.DatePicker,{title:"Due Date",type:y.Form.DatePicker.Type.Date,...$.dueDate}),_||E||Pt?(0,S.jsx)(y.Form.Separator,{}):null,_?(0,S.jsxs)(y.Form.Dropdown,{title:"Cycle",...$.cycleId,children:[(0,S.jsx)(y.Form.Dropdown.Item,{title:"No Cycle",value:"",icon:{source:{light:"light/no-cycle.svg",dark:"dark/no-cycle.svg"}}}),Ce(ae).map(p=>(0,S.jsx)(y.Form.Dropdown.Item,{title:p.title,value:p.id,icon:{source:p.icon}},p.id))]}):null,E?(0,S.jsxs)(y.Form.Dropdown,{title:"Project",...$.projectId,children:[(0,S.jsx)(y.Form.Dropdown.Item,{title:"No Project",value:"",icon:{source:{light:"light/no-project.svg",dark:"dark/no-project.svg"}}}),pe.map(p=>(0,S.jsx)(y.Form.Dropdown.Item,{title:`${p.name} (${p.status.name})`,value:p.id,icon:ue(p)},p.id))]}):null,B?(0,S.jsxs)(y.Form.Dropdown,{title:"Milestone",storeValue:!0,...$.milestoneId,children:[(0,S.jsx)(y.Form.Dropdown.Item,{title:"No Milestone",value:"",icon:{source:"linear-icons/no-milestone.svg"}}),I.map(p=>(0,S.jsx)(y.Form.Dropdown.Item,{title:`${p.name}  (${p.targetDate||"No Target Date"})`,value:p.id,icon:Se(p)},p.id))]}):null,Pt?(0,S.jsxs)(y.Form.Dropdown,{title:"Parent",...$.parentId,children:[(0,S.jsx)(y.Form.Dropdown.Item,{title:"No Issue",value:"",icon:{source:{light:"light/backlog.svg",dark:"dark/backlog.svg"}}}),Pe.map(p=>(0,S.jsx)(y.Form.Dropdown.Item,{title:`${p.identifier} - ${p.title}`,value:p.id,icon:G(p.state)},p.id))]}):null]})}var te=require("@raycast/api"),Js=require("date-fns");var N=require("@raycast/api"),Xs=require("@raycast/utils");var Ks=require("fs/promises"),Wt=mt(require("path"));var Ki="application/octet-stream",Xi={".apng":"image/apng",".avif":"image/avif",".bmp":"image/bmp",".csv":"text/csv",".doc":"application/msword",".docx":"application/vnd.openxmlformats-officedocument.wordprocessingml.document",".gif":"image/gif",".gz":"application/gzip",".heic":"image/heic",".heif":"image/heif",".ico":"image/x-icon",".jpeg":"image/jpeg",".jpg":"image/jpeg",".json":"application/json",".md":"text/markdown",".mov":"video/quicktime",".mp3":"audio/mpeg",".mp4":"video/mp4",".pdf":"application/pdf",".png":"image/png",".ppt":"application/vnd.ms-powerpoint",".pptx":"application/vnd.openxmlformats-officedocument.presentationml.presentation",".svg":"image/svg+xml",".tar":"application/x-tar",".tif":"image/tiff",".tiff":"image/tiff",".txt":"text/plain",".webm":"video/webm",".webp":"image/webp",".xls":"application/vnd.ms-excel",".xlsx":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",".zip":"application/zip"};function Ji(e){return Xi[Wt.default.extname(e).toLowerCase()]??Ki}async function Yi(e){let{graphQLClient:t}=k(),s=await(0,Ks.readFile)(e),o=Ji(e),i=Wt.default.basename(e),{data:l}=await t.rawRequest(`
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
    `,{size:s.byteLength,contentType:o,filename:i}),c=l?.fileUpload.uploadFile;if(!l?.fileUpload.success||!c)throw new Error(`Failed to request an upload URL for "${i}"`);let n=new Headers({"Content-Type":o,"Cache-Control":"public, max-age=31536000"});c.headers.forEach(({key:d,value:u})=>n.set(d,u));let r=await fetch(c.uploadUrl,{method:"PUT",headers:n,body:s});if(!r.ok)throw new Error(`Failed to upload "${i}": ${r.status} ${r.statusText}`);return{assetUrl:c.assetUrl,contentType:o,name:i}}async function Tt(e){let{linearClient:t}=k(),s=await Yi(e.url),o=await t.createAttachment({issueId:e.issueId,title:s.name,url:s.assetUrl});return{success:o.success,id:o.attachmentId}}async function $t(e){let{linearClient:t}=k(),s=await t.attachmentLinkURL(e.issueId,e.url);return{success:s.success,id:s.attachmentId}}function Rt(e){let t=e.split(`
`),s=/https?:\/\/\S+/,o=t.map(i=>i.trim()).filter(i=>s.test(i));return Array.from(new Set(o))}var be=require("react/jsx-runtime");function Dt({issue:{id:e,title:t,identifier:s}}){let{pop:o}=(0,N.useNavigation)(),{reset:i,itemProps:l,handleSubmit:c}=(0,Xs.useForm)({onSubmit:async n=>{let r=await(0,N.showToast)({style:N.Toast.Style.Animated,title:"Attaching links"}),d=Rt(n.links);if(d.length===0&&n.attachments.length===0){r.style=N.Toast.Style.Failure,r.title="No links or attachments provided";return}if(d.length>0){let u=d.length===1?"link":"links";try{await Promise.all(d.map(P=>$t({issueId:e,url:P}))),r.style=N.Toast.Style.Success,r.title=`Successfully attached ${u}`}catch(P){r.style=N.Toast.Style.Failure,r.title=`Failed attaching ${u}`,r.message=O(P)}}if(n.attachments.length>0){let u=n.attachments.length===1?"attachment":"attachments";try{r.style=N.Toast.Style.Animated,r.title=`Uploading ${u}\u2026`,await Promise.all(n.attachments.map(P=>Tt({issueId:e,url:P}))),r.style=N.Toast.Style.Success,r.title=`Successfully uploaded ${u}`}catch(P){r.style=N.Toast.Style.Failure,r.title=`Failed uploading ${u}`,r.message=O(P)}}i({attachments:[],links:""}),o()},initialValues:{links:""}});return(0,be.jsxs)(N.Form,{actions:(0,be.jsx)(N.ActionPanel,{children:(0,be.jsx)(N.Action.SubmitForm,{onSubmit:c,icon:N.Icon.NewDocument,title:"Attach"})}),navigationTitle:"Add Attachments and Links",children:[(0,be.jsx)(N.Form.Description,{title:"Issue",text:`[${s}] ${t}`}),(0,be.jsx)(N.Form.FilePicker,{title:"Attachment",...l.attachments}),(0,be.jsx)(N.Form.TextArea,{title:"Links",placeholder:`https://a.com
https://b.com
New link(s) on separate line(s)`,...l.links})]})}var Ae=require("react/jsx-runtime");function Qt({attachments:e,issue:t}){return(0,Ae.jsx)(te.List,{navigationTitle:`Links for ${t.identifier}`,children:e.map(s=>{let o=new Date(s.updatedAt);return(0,Ae.jsx)(te.List.Item,{icon:s.source?.imageUrl??te.Icon.Link,title:s.title,subtitle:s.subtitle,accessories:[{date:o,tooltip:`Updated: ${(0,Js.format)(o,"EEEE d MMMM yyyy 'at' HH:mm")}`}],actions:(0,Ae.jsxs)(te.ActionPanel,{children:[(0,Ae.jsx)(te.Action.OpenInBrowser,{url:s.url}),(0,Ae.jsx)(te.Action.Push,{title:"Add Attachments and Links",icon:te.Icon.NewDocument,target:(0,Ae.jsx)(Dt,{issue:t})})]})},s.id)})})}var Q=require("@raycast/api"),Ys=require("react");var It=require("react/jsx-runtime");function Be({comment:e,issue:t,mutateComments:s}){let{linearClient:o}=k(),{pop:i}=(0,Q.useNavigation)(),[l,c]=(0,Ys.useState)(e?e.body:"");async function n(){await(0,Q.showToast)({style:Q.Toast.Style.Animated,title:`${e?"Updating":"Adding"} comment`});try{e?await o.updateComment(e.id,{body:l}):await o.createComment({body:l,issueId:t.id}),await(0,Q.showToast)({style:Q.Toast.Style.Success,title:`${e?"Updated":"Added"} comment`}),i(),s&&s()}catch(r){(0,Q.showToast)({style:Q.Toast.Style.Failure,title:`Failed to ${e?"update":"add"} comment`,message:O(r)})}}return(0,It.jsx)(Q.Form,{actions:(0,It.jsx)(Q.ActionPanel,{children:(0,It.jsx)(Q.Action.SubmitForm,{title:e?"Edit Comment":"Add Comment",onSubmit:n,icon:e?Q.Icon.Pencil:Q.Icon.Plus})}),children:(0,It.jsx)(Q.Form.TextArea,{id:"comment",title:"Comment",placeholder:"Leave a comment",value:l,onChange:c})})}var h=require("@raycast/api"),oi=require("date-fns"),ri=mt(require("remove-markdown"));var ei=require("@raycast/utils");function Bt(e){let{data:t,error:s,isLoading:o,mutate:i}=(0,ei.useCachedPromise)($s,[e]);return{comments:t,commentsError:s,isLoadingComments:o,mutateComments:i}}var ti=require("@raycast/utils");function ze(){let{linearClient:e}=k(),{data:t,error:s,isLoading:o}=(0,ti.useCachedPromise)(()=>e.viewer);return{me:t,meError:s,isLoadingMe:!t&&!s||o}}var Gt=require("@raycast/api");var si=require("@raycast/api"),zt=!1;async function ii(){zt=!!(await(0,si.getApplications)()).find(s=>s.bundleId==="com.linear")}var _t=require("react/jsx-runtime");function de({title:e,url:t,...s}){return zt?(0,_t.jsx)(Gt.Action.Open,{title:`${e||"Open"} in Linear`,icon:"linear-app-icon.png",target:t,application:"Linear",...s}):(0,_t.jsx)(Gt.Action.OpenInBrowser,{url:t,title:`${e||"Open"} in Browser`})}var V=require("react/jsx-runtime");function Zt({issue:e}){let{linearClient:t}=k(),{me:s,isLoadingMe:o}=ze(),{comments:i,isLoadingComments:l,mutateComments:c}=Bt(e.id);async function n(r){if(await(0,h.confirmAlert)({title:"Delete Comment",message:"Are you sure you want to delete this comment?",icon:{source:h.Icon.Trash,tintColor:h.Color.Red}}))try{await(0,h.showToast)({style:h.Toast.Style.Animated,title:"Deleting comment"}),await c(t.deleteComment(r),{optimisticUpdate(d){return d&&d?.filter(u=>u.id!==r)}}),await(0,h.showToast)({style:h.Toast.Style.Success,title:"Deleted comment"})}catch(d){(0,h.showToast)({style:h.Toast.Style.Failure,title:"Failed to delete comment",message:O(d)})}}return(0,V.jsxs)(h.List,{isLoading:l||o,navigationTitle:`${e.identifier} \u2022 Comments`,searchBarPlaceholder:"Filter by user or comment content",isShowingDetail:!0,children:[(0,V.jsx)(h.List.EmptyView,{title:"No comments",description:"This issue doesn't have any comments.",actions:(0,V.jsx)(h.ActionPanel,{children:(0,V.jsx)(h.Action.Push,{title:"Add Comment",icon:h.Icon.Plus,target:(0,V.jsx)(Be,{issue:e,mutateComments:c})})})}),i?.map(r=>{let d=new Date(r.createdAt);return(0,V.jsx)(h.List.Item,{title:r.user.displayName,subtitle:r.body,icon:J(r.user),keywords:(0,ri.default)(r.body).replace(/\n/g," ").split(" "),accessories:[{date:d,tooltip:`Created: ${(0,oi.format)(d,"EEEE d MMMM yyyy 'at' HH:mm")}`}],detail:(0,V.jsx)(h.List.Item.Detail,{markdown:r.body}),actions:(0,V.jsxs)(h.ActionPanel,{children:[(0,V.jsx)(de,{title:"Open Comment",url:r.url}),s?.id===r.user.id?(0,V.jsxs)(h.ActionPanel.Section,{children:[(0,V.jsx)(h.Action.Push,{title:"Edit Comment",icon:h.Icon.Pencil,shortcut:h.Keyboard.Shortcut.Common.Edit,target:(0,V.jsx)(Be,{issue:e,comment:r,mutateComments:c})}),(0,V.jsx)(h.Action,{title:"Delete Comment",icon:h.Icon.Trash,style:h.Action.Style.Destructive,shortcut:h.Keyboard.Shortcut.Common.Remove,onAction:()=>n(r.id)})]}):null,(0,V.jsx)(h.ActionPanel.Section,{children:(0,V.jsx)(h.Action.Push,{title:"Add Comment",icon:h.Icon.Plus,shortcut:{macOS:{modifiers:["cmd","shift"],key:"n"},Windows:{modifiers:["ctrl","shift"],key:"n"}},target:(0,V.jsx)(Be,{issue:e,mutateComments:c})})}),(0,V.jsxs)(h.ActionPanel.Section,{children:[(0,V.jsx)(h.Action.CopyToClipboard,{icon:h.Icon.Clipboard,content:r.url,title:"Copy Comment URL",shortcut:h.Keyboard.Shortcut.Common.CopyPath}),(0,V.jsx)(h.Action.CopyToClipboard,{icon:h.Icon.Clipboard,content:r.body,title:"Copy Comment",shortcut:{macOS:{modifiers:["cmd","shift"],key:"'"},Windows:{modifiers:["ctrl","shift"],key:"'"}}})]}),(0,V.jsx)(h.ActionPanel.Section,{children:(0,V.jsx)(h.Action,{title:"Refresh",icon:h.Icon.ArrowClockwise,shortcut:h.Keyboard.Shortcut.Common.Refresh,onAction:c})})]})},r.id)})]})}var _e=require("@raycast/api");var ni=require("@raycast/utils");function yt(){let{linearClient:e}=k(),{data:t,error:s,isLoading:o}=(0,ni.useCachedPromise)(()=>e.issuePriorityValues,[],{initialData:[]});return{priorities:t,prioritiesError:s,isLoadingPriorities:!t&&!s||o}}var a=require("@raycast/api"),Ge=require("@raycast/utils"),Le=require("react");function Ht(e={}){return{title:"",description:"",stateId:"",priority:"",assigneeId:"",labelIds:[],estimate:"",dueDate:null,cycleId:"",projectId:"",milestoneId:"",...e}}function eo(e){if(typeof e=="string")try{let t=JSON.parse(e);return typeof t=="object"&&t!==null?t:{}}catch{return{}}return typeof e=="object"&&e!==null?e:{}}function ye(e){return typeof e=="string"?e:void 0}function ai(e){return typeof e=="number"?String(e):ye(e)}function li(e){if(!Array.isArray(e))return;let t=e.filter(s=>typeof s=="string");return t.length>0?t:void 0}function to(e){if(typeof e!="string")return;let t=new Date(e);return Number.isNaN(t.getTime())?void 0:t}function ci(e,t={}){let s=eo(e.templateData),o=Ht(t),i=li(s.labelIds)??li(s.labels);return{title:ye(s.title)??o.title,description:ye(s.description)??ye(e.description)??o.description,stateId:ye(s.stateId)??ye(s.statusId)??o.stateId,priority:ai(s.priority)??o.priority,assigneeId:ye(s.assigneeId)??o.assigneeId,labelIds:i??o.labelIds,estimate:ai(s.estimate)??o.estimate,dueDate:s.dueDate!==void 0?to(s.dueDate)??null:o.dueDate,cycleId:ye(s.cycleId)??o.cycleId,projectId:ye(s.projectId)??o.projectId,milestoneId:o.milestoneId}}var mi=require("@raycast/utils");var ui=`
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
`;function so(e,t){let s=e.type.toLowerCase()==="issue",o=!e.team||e.team.id===t;return s&&!e.archivedAt&&o}function io(e,t){return(e.sortOrder??0)-(t.sortOrder??0)||e.name.localeCompare(t.name)}async function di(e){if(!e)return[];let{graphQLClient:t}=k(),{data:s}=await t.rawRequest(`
      query IssueTemplates($teamId: String!, $first: Int) {
        organization {
          templates(first: $first) {
            nodes {
              ${ui}
            }
          }
        }
        team(id: $teamId) {
          templates(first: $first) {
            nodes {
              ${ui}
            }
          }
        }
      }
    `,{teamId:e,first:100});return[...s?.organization?.templates?.nodes??[],...s?.team?.templates?.nodes??[]].filter((i,l,c)=>c.findIndex(n=>n.id===i.id)===l).filter(i=>so(i,e)).sort(io)}function Kt(e,t){let{data:s,error:o,isLoading:i}=(0,mi.useCachedPromise)(di,[e],{execute:t?.execute!==!1&&!!e});return{issueTemplates:s,issueTemplatesError:o,isLoadingIssueTemplates:!s&&!o||i}}var M=require("@raycast/api"),pi=require("date-fns");var F=require("react/jsx-runtime");function ht({issue:e,mutateList:t,priorities:s,me:o}){let{issue:i,isLoadingIssue:l,mutateDetail:c}=Ee(e),n=`# ${i?.title}`;i?.description&&(n+=`

${i.description}`);let r=i?.cycle?Me(i.cycle):null,d=i.relations?i.relations.nodes.filter(j=>j.type=="related"):null,u=i.relations?i.relations.nodes.filter(j=>j.type=="duplicate"):null,P=i.attachments?.nodes.length??0;return(0,F.jsx)(M.Detail,{markdown:n,isLoading:l,...i?{metadata:(0,F.jsxs)(M.Detail.Metadata,{children:[(0,F.jsx)(M.Detail.Metadata.Label,{title:"Status",text:i.state.name,icon:G(i.state)}),(0,F.jsx)(M.Detail.Metadata.Label,{title:"Priority",text:i.priorityLabel,icon:{source:ce[i.priority]}}),(0,F.jsx)(M.Detail.Metadata.Label,{title:"Assignee",text:i.assignee?i.assignee.displayName:"Unassigned",icon:J(i.assignee)}),i.team.issueEstimationType!=="notUsed"?(0,F.jsx)(M.Detail.Metadata.Label,{title:"Estimate",text:bt({estimate:i.estimate,issueEstimationType:i.team.issueEstimationType}),icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}}):null,i.labels.nodes.length>0?(0,F.jsx)(M.Detail.Metadata.TagList,{title:"Labels",children:i.labels.nodes.map(({id:j,name:w,color:L})=>(0,F.jsx)(M.Detail.Metadata.TagList.Item,{text:w,color:L},j))}):(0,F.jsx)(M.Detail.Metadata.Label,{title:"Labels",text:"No Labels"}),i.dueDate?(0,F.jsx)(M.Detail.Metadata.Label,{title:"Due Date",text:(0,pi.format)(new Date(i.dueDate),"MM/dd/yyyy"),icon:St(new Date(i.dueDate))}):null,P>0?(0,F.jsx)(M.Detail.Metadata.Label,{title:"Links",text:`${P>1?`${P} links`:"1 link"}`,icon:M.Icon.Link}):null,(0,F.jsx)(M.Detail.Metadata.Separator,{}),(0,F.jsx)(M.Detail.Metadata.Label,{title:"Cycle",text:r?r.title:"No Cycle",icon:{source:r?r.icon:{light:"light/no-cycle.svg",dark:"dark/no-cycle.svg"}}}),(0,F.jsx)(M.Detail.Metadata.Label,{title:"Project",text:i.project?i.project.name:"No Project",icon:ue(i.project)}),(0,F.jsx)(M.Detail.Metadata.Label,{title:"Milestone",text:i.projectMilestone?i.projectMilestone.name:"No Milestone",icon:Se(i.projectMilestone)}),(0,F.jsx)(M.Detail.Metadata.Label,{title:"Parent Issue",text:i.parent?i.parent.title:"No Issue",icon:i.parent?G(i.parent.state):{source:{light:"light/backlog.svg",dark:"dark/backlog.svg"}}}),d&&d.length>0?(0,F.jsx)(M.Detail.Metadata.TagList,{title:"Related",children:d.map(({id:j,relatedIssue:w})=>(0,F.jsx)(M.Detail.Metadata.TagList.Item,{text:w.identifier},j))}):null,u&&u.length>0?(0,F.jsx)(M.Detail.Metadata.TagList,{title:"Duplicates",children:u.map(({id:j,relatedIssue:w})=>(0,F.jsx)(M.Detail.Metadata.TagList.Item,{text:w.identifier},j))}):null]}),actions:(0,F.jsx)(M.ActionPanel,{children:(0,F.jsx)(ot,{issue:i,mutateList:t,mutateDetail:c,priorities:s,showAttachmentsAction:P>0,attachments:i.attachments?.nodes??[],me:o})})}:{}})}var f=require("react/jsx-runtime");function oo(e,t){return e==="url"?{title:"Copy Issue URL",onAction:()=>a.Clipboard.copy(t.url)}:e==="id-as-link"?{title:"Copy Issue ID as Link",onAction:()=>a.Clipboard.copy({text:`[${t.identifier}](${t.url})`,html:`<a href="${t.url}">${t.identifier}</a>`})}:e==="title"?{title:"Copy Issue Title",onAction:()=>a.Clipboard.copy(t.title)}:e==="title-as-link"?{title:"Copy Issue Title as Link",onAction:()=>a.Clipboard.copy({text:`[${t.title}](${t.url})`,html:`<a href="${t.url}">${t.title}</a>`})}:{title:"Copy Issue ID",onAction:()=>a.Clipboard.copy(t.identifier)}}function Xt(e){let{push:t}=(0,a.useNavigation)(),{autofocusField:s,copyToastAction:o}=(0,a.getPreferenceValues)(),[i,l]=(0,Le.useState)(""),{teams:c,org:n,supportsTeamTypeahead:r,isLoadingTeams:d}=gt(i),u=c&&c.length>1,[P,j]=(0,Le.useState)(""),{users:w,supportsUserTypeahead:L,isLoadingUsers:A}=Ue(P),{handleSubmit:Y,itemProps:U,values:$,setValue:x,focus:q,reset:me,setValidationError:De}=(0,Ge.useForm)({async onSubmit(m){let D=await(0,a.showToast)({style:a.Toast.Style.Animated,title:"Creating issue"}),we=u?m.teamId:c?.[0]?.id;if(!we)return De("teamId","The team is required."),!1;try{let z={teamId:we,title:m.title,description:m.description||"",stateId:m.stateId,labelIds:m.labelIds,dueDate:m.dueDate,...E&&m.estimate?{estimate:parseInt(m.estimate)}:{},...m.assigneeId?{assigneeId:m.assigneeId}:{},...m.cycleId?{cycleId:m.cycleId}:{},...m.projectId?{projectId:m.projectId}:{},...m.milestoneId?{projectMilestoneId:m.milestoneId}:{},...m.parentId?{parentId:m.parentId}:{},priority:parseInt(m.priority)},{success:Ft,issue:Xe}=await Ds(z);if(Ft&&Xe){D.style=a.Toast.Style.Success,D.title=`Created Issue \u2022 ${Xe?.identifier}`,D.primaryAction={title:"Open Issue",shortcut:a.Keyboard.Shortcut.Common.OpenWith,onAction:async()=>{t((0,f.jsx)(ht,{issue:Xe,priorities:e.priorities,me:e.me})),await D.hide()}},D.secondaryAction={shortcut:a.Keyboard.Shortcut.Common.Copy,...oo(o,Xe)},me({templateId:"",title:"",description:"",estimate:"",labelIds:[],dueDate:null,parentId:"",attachments:[],links:""}),q(u&&s?s:"title");let Et=Rt(m.links);if(Et.length>0){let ve=Et.length===1?"link":"links";try{D.message=`Attaching ${ve}\u2026`,await Promise.all(Et.map(je=>$t({issueId:Xe.id,url:je}))),D.message=`Successfully attached ${ve}`}catch(je){D.style=a.Toast.Style.Failure,D.title=`Failed attaching ${ve}`,D.message=O(je)}}if(m.attachments.length>0){let ve=m.attachments.length===1?"attachment":"attachments";try{D.message=`Uploading ${ve}\u2026`,await Promise.all(m.attachments.map(je=>Tt({issueId:Xe.id,url:je}))),D.message=`Successfully uploaded ${ve}`}catch(je){D.style=a.Toast.Style.Failure,D.title=`Failed uploading ${ve}`,D.message=O(je)}}}}catch(z){D.style=a.Toast.Style.Failure,D.title="Failed to create issue",D.message=O(z)}x("teamId",we)},validation:{teamId:u?Ge.FormValidation.Required:void 0,title:Ge.FormValidation.Required,stateId:Ge.FormValidation.Required,priority:Ge.FormValidation.Required},initialValues:{templateId:e.draftValues?.templateId||"",teamId:e.draftValues?.teamId||e.teamId,title:e.draftValues?.title,description:e.draftValues?.description,priority:e.draftValues?.priority,stateId:e.draftValues?.stateId,estimate:e.draftValues?.estimate,assigneeId:e.draftValues?.assigneeId||e.assigneeId,labelIds:e.draftValues?.labelIds||[],dueDate:e.draftValues?.dueDate,cycleId:e.draftValues?.cycleId||e.cycleId,projectId:e.draftValues?.projectId||e.projectId,milestoneId:e.draftValues?.milestoneId||e.milestoneId,parentId:e.draftValues?.parentId||e.parentId,links:e.draftValues?.links||""}}),H=!!$.teamId&&$.teamId.trim().length>0,{issueTemplates:ae,isLoadingIssueTemplates:Pe}=Kt($.teamId,{execute:H}),{states:pe}=fe($.teamId,{execute:H}),{labels:I}=Oe($.teamId,{execute:H}),{cycles:T}=Ve($.teamId,{execute:H}),{issues:R}=Ie(it,[],{execute:H}),{projects:K}=We($.teamId,{execute:H}),{milestones:xe}=qe($.projectId,{execute:!!$.projectId});(0,Le.useEffect)(()=>{c?.length===1&&x("teamId",c[0].id)},[c]);let He=(0,Le.useRef)(!1);(0,Le.useEffect)(()=>{if(!He.current){He.current=!0;return}Ke("")},[$.teamId]);function Ke(m){x("templateId",m);let D=ae?.find(Ft=>Ft.id===m),we={assigneeId:e.assigneeId||"",cycleId:e.cycleId||"",projectId:e.projectId||"",milestoneId:e.milestoneId||""},z=D?ci(D,we):Ht(we);x("title",z.title),x("description",z.description),x("stateId",z.stateId),x("priority",z.priority),x("assigneeId",z.assigneeId),x("labelIds",z.labelIds),x("estimate",z.estimate),x("dueDate",z.dueDate),x("cycleId",z.cycleId),x("projectId",z.projectId),x("milestoneId",z.milestoneId??"")}let _=c?.find(m=>m.id===$.teamId),E=_?Ye({issueEstimationType:_.issueEstimationType,issueEstimationAllowZero:_.issueEstimationAllowZero,issueEstimationExtended:_.issueEstimationExtended}):null,B=tt(pe||[]),Pt=pe&&pe.length>0,p=e.priorities&&e.priorities.length>0,X=I&&I.length>0,ge=T&&T.length>0,dt=K&&K.length>0,ds=xe&&xe.length>0,Ut=R&&R.length>0,vi=ae&&ae.length>0;return(0,f.jsxs)(a.Form,{enableDrafts:e.enableDrafts,actions:(0,f.jsxs)(a.ActionPanel,{children:[(0,f.jsx)(a.Action.SubmitForm,{icon:a.Icon.Plus,onSubmit:Y,title:"Create Issue"}),(0,f.jsxs)(a.ActionPanel.Section,{children:[(0,f.jsx)(a.Action,{title:"Focus Title",icon:a.Icon.TextInput,onAction:()=>q("title"),shortcut:a.Keyboard.Shortcut.Common.Edit}),(0,f.jsx)(a.Action,{title:"Focus Description",icon:a.Icon.TextInput,onAction:()=>q("description"),shortcut:{modifiers:["ctrl"],key:"e"}}),(0,f.jsx)(a.Action,{title:"Focus Status",icon:a.Icon.Circle,onAction:()=>q("stateId"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"s"},Windows:{modifiers:["ctrl","shift"],key:"s"}}}),(0,f.jsx)(a.Action,{title:"Focus Priority",icon:a.Icon.LevelMeter,onAction:()=>q("priority"),shortcut:a.Keyboard.Shortcut.Common.Pin}),(0,f.jsx)(a.Action,{title:"Focus Assignee",icon:a.Icon.AddPerson,onAction:()=>q("assigneeId"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"a"},Windows:{modifiers:["ctrl","shift"],key:"a"}}}),E?(0,f.jsx)(a.Action,{title:"Focus Estimate",icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}},onAction:()=>q("estimate"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"e"},Windows:{modifiers:["ctrl","shift"],key:"e"}}}):null,(0,f.jsx)(a.Action,{title:"Focus Due Date",icon:a.Icon.Calendar,onAction:()=>q("dueDate"),shortcut:{macOS:{modifiers:["opt","shift"],key:"d"},Windows:{modifiers:["alt","shift"],key:"d"}}}),(0,f.jsx)(a.Action,{title:"Focus Labels",icon:a.Icon.Tag,onAction:()=>q("labelIds"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"l"},Windows:{modifiers:["ctrl","shift"],key:"l"}}}),ge?(0,f.jsx)(a.Action,{title:"Focus Cycle",icon:{source:{light:"light/cycle.svg",dark:"dark/cycle.svg"}},onAction:()=>q("cycleId"),shortcut:a.Keyboard.Shortcut.Common.Copy}):null,dt?(0,f.jsx)(a.Action,{title:"Focus Project",icon:{source:{light:"light/project.svg",dark:"dark/project.svg"}},onAction:()=>q("projectId"),shortcut:{modifiers:["ctrl","shift"],key:"p"}}):null,ds?(0,f.jsx)(a.Action,{title:"Focus Milestone",icon:{source:{light:"light/milestone.svg",dark:"dark/milestone.svg"}},onAction:()=>q("milestoneId"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"m"},Windows:{modifiers:["ctrl","shift"],key:"m"}}}):null,Ut?(0,f.jsx)(a.Action,{title:"Focus Parent Issue",icon:{source:{light:"light/backlog.svg",dark:"dark/backlog.svg"}},onAction:()=>q("parentId"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"i"},Windows:{modifiers:["ctrl","shift"],key:"i"}}}):null,(0,f.jsx)(a.Action,{title:"Focus Attachments",icon:a.Icon.NewDocument,onAction:()=>q("attachments"),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"a"},Windows:{modifiers:["ctrl","alt","shift"],key:"a"}}}),(0,f.jsx)(a.Action,{title:"Focus Links",icon:a.Icon.Link,onAction:()=>q("links"),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"l"},Windows:{modifiers:["ctrl","alt","shift"],key:"l"}}})]})]}),isLoading:d||A||e.isLoading,children:[(r||u)&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(a.Form.Dropdown,{title:"Team",storeValue:!0,...U.teamId,...r&&{onSearchTextChange:l,isLoading:d,throttle:!0},children:c?.map(m=>(0,f.jsx)(a.Form.Dropdown.Item,{title:m.name,value:m.id,icon:Lt(m,n)},m.id))}),(0,f.jsx)(a.Form.Separator,{})]}),H&&(Pe||vi)?(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)(a.Form.Dropdown,{id:"templateId",title:"Template",value:$.templateId||"",onChange:Ke,isLoading:Pe,children:[(0,f.jsx)(a.Form.Dropdown.Item,{title:"No Template",value:"",icon:a.Icon.Document}),ae?.map(m=>(0,f.jsx)(a.Form.Dropdown.Item,{title:m.name,value:m.id,icon:a.Icon.Document},m.id))]}),(0,f.jsx)(a.Form.Separator,{})]}):null,(0,f.jsx)(a.Form.TextField,{title:"Title",placeholder:"Issue title",...s==="title"?{autoFocus:!0}:{},...U.title}),(0,f.jsx)(a.Form.TextArea,{title:"Description",placeholder:"Add some details (supports Markdown, e.g. **bold**)",enableMarkdown:!0,...U.description}),(0,f.jsx)(a.Form.Dropdown,{title:"Status",storeValue:!0,...U.stateId,children:Pt?B.map(m=>(0,f.jsx)(a.Form.Dropdown.Item,{title:m.name,value:m.id,icon:G(m)},m.id)):null}),(0,f.jsx)(a.Form.Dropdown,{title:"Priority",storeValue:!0,...U.priority,children:p?e.priorities?.map(({priority:m,label:D})=>(0,f.jsx)(a.Form.Dropdown.Item,{title:D,value:String(m),icon:{source:ce[m]}},m)):null}),(0,f.jsxs)(a.Form.Dropdown,{title:"Assignee",storeValue:!0,...U.assigneeId,...L&&{onSearchTextChange:j,isLoading:A,throttle:!0},children:[(0,f.jsx)(a.Form.Dropdown.Item,{title:"Unassigned",value:"",icon:a.Icon.Person}),w?.map(m=>(0,f.jsx)(a.Form.Dropdown.Item,{title:m.name,value:m.id,icon:J(m)},m.id))]}),(0,f.jsx)(a.Form.TagPicker,{title:"Labels",placeholder:"Add label",...U.labelIds,children:X?I.map(({id:m,name:D,color:we})=>(0,f.jsx)(a.Form.TagPicker.Item,{title:D,value:m,icon:{source:a.Icon.Dot,tintColor:we}},m)):null}),E?(0,f.jsxs)(a.Form.Dropdown,{title:"Estimate",...U.estimate,children:[(0,f.jsx)(a.Form.Dropdown.Item,{title:"No estimate",value:"",icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}}),E.map(({estimate:m,label:D})=>(0,f.jsx)(a.Form.Dropdown.Item,{title:D,value:String(m),icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}},m))]}):null,(0,f.jsx)(a.Form.DatePicker,{title:"Due Date",type:a.Form.DatePicker.Type.Date,...U.dueDate}),ge||dt||Ut?(0,f.jsx)(a.Form.Separator,{}):null,ge?(0,f.jsxs)(a.Form.Dropdown,{title:"Cycle",storeValue:!0,...U.cycleId,children:[(0,f.jsx)(a.Form.Dropdown.Item,{title:"No Cycle",value:"",icon:{source:{light:"light/no-cycle.svg",dark:"dark/no-cycle.svg"}}}),Ce(T).map(m=>(0,f.jsx)(a.Form.Dropdown.Item,{title:m.title,value:m.id,icon:{source:m.icon}},m.id))]}):null,dt?(0,f.jsxs)(a.Form.Dropdown,{title:"Project",storeValue:!0,...U.projectId,children:[(0,f.jsx)(a.Form.Dropdown.Item,{title:"No Project",value:"",icon:{source:{light:"light/no-project.svg",dark:"dark/no-project.svg"}}}),K.map(m=>(0,f.jsx)(a.Form.Dropdown.Item,{title:`${m.name} (${m.status.name})`,value:m.id,icon:ue(m)},m.id))]}):null,ds?(0,f.jsxs)(a.Form.Dropdown,{title:"Milestone",storeValue:!0,...U.milestoneId,children:[(0,f.jsx)(a.Form.Dropdown.Item,{title:"No Milestone",value:"",icon:{source:"linear-icons/no-milestone.svg"}}),xe.map(m=>(0,f.jsx)(a.Form.Dropdown.Item,{title:`${m.name} (${m.targetDate||"No Target Date"})`,value:m.id,icon:Se(m)},m.id))]}):null,Ut?(0,f.jsxs)(a.Form.Dropdown,{title:"Parent",...U.parentId,children:[(0,f.jsx)(a.Form.Dropdown.Item,{title:"No Issue",value:"",icon:{source:{light:"light/backlog.svg",dark:"dark/backlog.svg"}}}),R.map(m=>(0,f.jsx)(a.Form.Dropdown.Item,{title:`${m.identifier} - ${m.title}`,value:m.id,icon:G(m.state)},m.id))]}):null,(0,f.jsx)(a.Form.Separator,{}),(0,f.jsx)(a.Form.FilePicker,{title:"Attachment",...U.attachments}),(0,f.jsx)(a.Form.TextArea,{title:"Links",placeholder:`https://a.com
https://b.com
New link(s) on separate line(s)`,...U.links})]})}var Te=require("react/jsx-runtime");function Jt({issue:e,mutateList:t}){let{issues:s,isLoadingIssues:o,mutateList:i}=Ie(d=>Ls(d),[e.id]),{priorities:l,isLoadingPriorities:c}=yt(),{me:n,isLoadingMe:r}=ze();return(0,Te.jsxs)(_e.List,{isLoading:o||r||c||r,navigationTitle:`${e.identifier} \u2022 Sub-issues`,children:[(0,Te.jsx)(_e.List.EmptyView,{title:"No issues",description:"This issue doesn't have any sub-issues.",actions:(0,Te.jsx)(_e.ActionPanel,{children:(0,Te.jsx)(_e.Action.Push,{title:"Create Sub-Issue",target:(0,Te.jsx)(Xt,{priorities:l,me:n,parentId:e.id,projectId:e.project?.id,cycleId:e.cycle?.id,teamId:e.team.id})})})}),s?.map(d=>(0,Te.jsx)(kt,{issue:d,mutateList:t,mutateSubIssues:i,priorities:l,me:n},d.id))]})}var v=require("@raycast/api");function fi(e){let t=[`Work on Linear issue ${e.identifier}:`,""],s=ro(e.branchName);if(s&&t.push(`Suggested branch name: ${s}`,""),t.push(`<issue identifier="${xt(e.identifier)}">`),t.push(`<title>${e.title}</title>`),t.push(...Ii(e.description)),e.team?.name&&t.push(`<team name="${xt(e.team.name)}"/>`),e.labels?.nodes?.forEach(i=>{t.push(`<label>${i.name}</label>`)}),e.project?.name){let i=xt(e.project.name);t.push(e.project.description?`<project name="${i}">${e.project.description}</project>`:`<project name="${i}"/>`)}e.parent&&t.push(...gi("parent-issue",e.parent));let o=e.children?.nodes??[];return o.length>0&&(t.push("<sub-issues>"),o.forEach(i=>t.push(...gi("sub-issue",i))),t.push("</sub-issues>")),t.push("</issue>"),t.join(`
`)}function gi(e,t){return[`<${e} identifier="${xt(t.identifier)}">`,`<id>${t.id}</id>`,`<title>${t.title}</title>`,...Ii(t.description),`</${e}>`]}function Ii(e){return e?e.includes(`
`)?["<description>",e,"</description>"]:[`<description>${e}</description>`]:[]}function ro(e){return e&&e.slice(e.lastIndexOf("/")+1)}function xt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}var se=require("react/jsx-runtime"),no={ISSUE_TITLE:"title",ISSUE_ID:"identifier",ISSUE_URL:"url",ISSUE_BRANCH_NAME:"branchName"};function ao(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function lo(e){return e.replace(/\[/g,"\\[").replace(/\]/g,"\\]")}function co(e){return{html:`<a href="${e.url}">${ao(e.title)}</a>`,text:`[${lo(e.title)}](${e.url})`}}function Yt({issue:e}){let{issueCustomCopyAction:t}=(0,v.getPreferenceValues)();async function s(){let o=await(0,v.showToast)({style:v.Toast.Style.Animated,title:"Copying prompt"});try{await v.Clipboard.copy(fi(await Ts(e.id))),o.style=v.Toast.Style.Success,o.title="Copied prompt to clipboard"}catch(i){o.style=v.Toast.Style.Failure,o.title="Failed copying prompt",o.message=O(i)}}return(0,se.jsxs)(v.ActionPanel.Section,{children:[(0,se.jsx)(v.Action.CopyToClipboard,{content:e.identifier,title:"Copy Issue ID",shortcut:{macOS:{modifiers:["cmd"],key:"."},Windows:{modifiers:["ctrl"],key:"."}}}),(0,se.jsx)(v.Action.CopyToClipboard,{content:{html:`<a href="${e.url}" title="${e.title}">${e.identifier}: ${e.title}</a>`,text:e.url},title:"Copy Formatted Issue URL",shortcut:v.Keyboard.Shortcut.Common.CopyPath}),(0,se.jsx)(v.Action.CopyToClipboard,{content:e.url,title:"Copy Issue URL",shortcut:{macOS:{modifiers:["cmd","shift"],key:"u"},Windows:{modifiers:["ctrl","shift"],key:"u"}}}),(0,se.jsx)(v.Action.CopyToClipboard,{content:e.title,title:"Copy Issue Title",shortcut:{macOS:{modifiers:["cmd","shift"],key:"'"},Windows:{modifiers:["ctrl","shift"],key:"'"}}}),(0,se.jsx)(v.Action.CopyToClipboard,{content:co(e),title:"Copy Title as Link",shortcut:{macOS:{modifiers:["cmd","shift"],key:"t"},Windows:{modifiers:["ctrl","shift"],key:"t"}}}),(0,se.jsx)(v.Action.CopyToClipboard,{content:e.branchName,title:"Copy Git Branch Name",shortcut:v.Keyboard.Shortcut.Common.CopyName}),t&&t!==""?(0,se.jsx)(v.Action.CopyToClipboard,{content:t?.replace(/\{(.*?)\}/g,(o,i)=>{let l=e[no[i]];return l||o}),title:"Custom Copy",shortcut:{macOS:{modifiers:["cmd","opt"],key:"."},Windows:{modifiers:["ctrl","alt"],key:"."}}}):null,(0,se.jsx)(v.Action,{icon:v.Icon.Clipboard,title:"Copy as Prompt",onAction:s,shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"p"},Windows:{modifiers:["ctrl","alt","shift"],key:"p"}}})]})}var ie=require("@raycast/api"),yi=require("react");var oe=require("react/jsx-runtime");function es({issue:e,updateIssue:t}){let{linearClient:s}=k(),[o,i]=(0,yi.useState)(!1),{cycles:l,isLoadingCycles:c}=Ve(e.team.id,{execute:o}),n=e.cycle?Me(e.cycle):null,r=n?.isActive||!1,d=n?.isNext||!1;async function u(w){let L=e.cycle;t({animatedTitle:"Moving to cycle",payload:{cycleId:w?.id||null},optimisticUpdate(A){return{...A,cycle:w||void 0}},rollbackUpdate(A){return{...A,cycle:L}},successTitle:w?"Moved to cycle":"Removed from cycle",successMessage:w?.title?w.title:"",errorTitle:"Failed to move to cycle"})}async function P(){let{nodes:w}=await s.cycles({filter:{team:{id:{eq:e.team.id}}}}),L=Ce(w||[]),A=L.findIndex($=>$.isActive),U=(A>-1?L[A]:null)?L[A+1]:null;if(U)return u(U)}async function j(){let{nodes:w}=await s.cycles({filter:{team:{id:{eq:e.team.id}}}}),A=Ce(w||[]).find(Y=>Y.isActive);if(A)return u(A)}return(0,oe.jsxs)(oe.Fragment,{children:[(0,oe.jsxs)(ie.ActionPanel.Submenu,{title:"Move to Cycle",icon:{source:{light:"light/cycle.svg",dark:"dark/cycle.svg"}},shortcut:ie.Keyboard.Shortcut.Common.Copy,onOpen:()=>i(!0),children:[(0,oe.jsx)(ie.Action,{title:"No Cycle",icon:{source:{light:"light/no-cycle.svg",dark:"dark/no-cycle.svg"}},onAction:()=>u(null)}),!l&&c?(0,oe.jsx)(ie.Action,{title:"Loading\u2026"}):Ce(l||[]).map(w=>(0,oe.jsx)(ie.Action,{autoFocus:w.id===n?.id,title:w.title,icon:{source:w.icon},onAction:()=>u(w)},w.id))]}),r?null:(0,oe.jsx)(ie.Action,{title:"Move to Active Cycle",icon:{source:{light:"light/active-cycle.svg",dark:"dark/active-cycle.svg"}},shortcut:ie.Keyboard.Shortcut.Common.Copy,onAction:()=>j()}),d?null:(0,oe.jsx)(ie.Action,{title:"Move to Next Cycle",icon:{source:{light:"light/cycle.svg",dark:"dark/cycle.svg"}},shortcut:{macOS:{modifiers:["cmd","shift"],key:"n"},Windows:{modifiers:["ctrl","shift"],key:"n"}},onAction:()=>P()})]})}var re=require("@raycast/api"),hi=require("lodash"),ki=require("react");var he=require("react/jsx-runtime");function ts({issue:e,updateIssue:t}){let[s,o]=(0,ki.useState)(!1),{labels:i}=Oe(e.team.id,{execute:s}),[,l]=(0,hi.partition)(i||[],r=>e.labels.nodes.map(d=>d.id).includes(r.id));async function c(r){let d=e.labels.nodes.map(u=>u.id);t({animatedTitle:"Adding label",payload:{labelIds:[...d,r.id]},optimisticUpdate(u){return{...u,labels:{...u.labels,nodes:[...u.labels.nodes,r]}}},rollbackUpdate(u){return{...u,labels:{...u.labels,nodes:u.labels.nodes.filter(P=>P.id!==r.id)}}},successTitle:"Added label",successMessage:`Label "${r.name}" added to ${e.identifier}`,errorTitle:"Failed to add label"})}async function n(r){let d=e.labels.nodes.map(u=>u.id);t({animatedTitle:"Remove label",payload:{labelIds:d.filter(u=>u!==r.id)},optimisticUpdate(u){return{...u,labels:{...u.labels,nodes:u.labels.nodes.filter(P=>P.id!==r.id)}}},rollbackUpdate(u){return{...u,labels:{...u.labels,nodes:[...u.labels.nodes,r]}}},successTitle:"Removed label",successMessage:`Label "${r.name}" removed from ${e.identifier}`,errorTitle:"Failed to remove label"})}return(0,he.jsxs)(he.Fragment,{children:[(0,he.jsx)(re.ActionPanel.Submenu,{title:"Add Label",icon:re.Icon.Tag,shortcut:{macOS:{modifiers:["cmd","shift"],key:"l"},Windows:{modifiers:["ctrl","shift"],key:"l"}},onOpen:()=>o(!0),children:l.map(r=>(0,he.jsx)(re.Action,{title:r.name,icon:{source:re.Icon.Dot,tintColor:r.color},onAction:()=>c(r)},r.id))}),e.labels.nodes.length>0?(0,he.jsx)(re.ActionPanel.Submenu,{title:"Remove Label",icon:re.Icon.Tag,shortcut:{macOS:{modifiers:["cmd","shift"],key:"l"},Windows:{modifiers:["ctrl","shift"],key:"l"}},children:e.labels.nodes.map(r=>(0,he.jsx)(re.Action,{title:r.name,icon:{source:re.Icon.Dot,tintColor:r.color},onAction:()=>n(r)},r.id))}):null]})}var $e=require("@raycast/api"),Pi=require("react");var rt=require("react/jsx-runtime");function ss({issue:e,updateIssue:t}){let[s,o]=(0,Pi.useState)(!1),{milestones:i,isLoadingMilestones:l}=qe(e.project?.id,{execute:s});async function c(n){let r=e.projectMilestone;t({animatedTitle:"Setting milestone",payload:{projectMilestoneId:n?n.id:null},optimisticUpdate(d){return{...d,milestone:n||void 0}},rollbackUpdate(d){return{...d,milestone:r}},successTitle:n?"Set milestone":`Removed milestone from ${e.identifier}`,successMessage:n?`"${n.name}" added to ${e.identifier}`:"",errorTitle:"Failed to set milestone"})}return(0,rt.jsxs)($e.ActionPanel.Submenu,{title:"Set Milestone",icon:{source:"linear-icons/milestone.svg",tintColor:$e.Color.PrimaryText},shortcut:{modifiers:["ctrl","shift"],key:"m"},onOpen:()=>o(!0),children:[(0,rt.jsx)($e.Action,{title:"No Milestone",icon:{source:"linear-icons/no-milestone.svg"},onAction:()=>c(null)}),!i&&l?(0,rt.jsx)($e.Action,{title:"Loading\u2026"}):(i||[]).map(n=>(0,rt.jsx)($e.Action,{autoFocus:n.id===e.projectMilestone?.id,title:`${n.name}  (${n.targetDate||"No Target Date"})`,icon:Se(n),onAction:()=>c(n)},n.id))]})}var nt=require("@raycast/api"),wi=require("react");var ke=require("react/jsx-runtime");function is({issue:e,updateIssue:t}){let[s,o]=(0,wi.useState)(!1),{issues:i,isLoadingIssues:l}=Ie(it,[],{execute:s}),c=e.parent,n=c?.id,r=!!n;async function d(u){t({animatedTitle:"Setting parent issue",payload:{parentId:u?u.id:null},optimisticUpdate(P){return{...P,parent:u||void 0}},rollbackUpdate(P){return{...P,parent:c}},successTitle:"Set parent issue",successMessage:u?`${u.identifier} set as parent issue`:`Removed parent issue from ${e.identifier}`,errorTitle:"Failed to set parent issue"})}return(0,ke.jsxs)(ke.Fragment,{children:[(0,ke.jsx)(nt.ActionPanel.Submenu,{title:r?"Change Parent Issue":"Set Parent Issue",icon:{source:{light:"light/parent-issue.svg",dark:"dark/parent-issue.svg"}},shortcut:{modifiers:["ctrl","shift"],key:"i"},onOpen:()=>o(!0),children:!i&&l?(0,ke.jsx)(nt.Action,{title:"Loading\u2026"}):(i||[]).map(u=>(0,ke.jsx)(nt.Action,{autoFocus:u.id===n,title:`${u.identifier} - ${u.title}`,icon:G(u.state),onAction:()=>d(u)},u.id))}),r?(0,ke.jsx)(nt.Action,{title:"Remove Parent Issue",icon:{source:{light:"light/parent-issue.svg",dark:"dark/parent-issue.svg"}},shortcut:{macOS:{modifiers:["cmd","shift"],key:"k"},Windows:{modifiers:["ctrl","shift"],key:"k"}},onAction:()=>d(null)}):null]})}var at=require("@raycast/api"),Ci=require("react");var lt=require("react/jsx-runtime");function os({issue:e,updateIssue:t}){let[s,o]=(0,Ci.useState)(!1),{projects:i,isLoadingProjects:l}=We(e.team.id,{execute:s});async function c(n){let r=e.project;t({animatedTitle:"Setting project",payload:{projectId:n?n.id:null},optimisticUpdate(d){return{...d,project:n||void 0}},rollbackUpdate(d){return{...d,project:r}},successTitle:n?"Set project":`Removed project from ${e.identifier}`,successMessage:n?`"${n.name}" added to ${e.identifier}`:"",errorTitle:"Failed to set project"})}return(0,lt.jsxs)(at.ActionPanel.Submenu,{title:"Set Project",icon:{source:{light:"light/project.svg",dark:"dark/project.svg"}},shortcut:{modifiers:["ctrl","shift"],key:"p"},onOpen:()=>o(!0),children:[(0,lt.jsx)(at.Action,{title:"No Project",icon:{source:{light:"light/no-project.svg",dark:"dark/no-project.svg"}},onAction:()=>c(null)}),!i&&l?(0,lt.jsx)(at.Action,{title:"Loading\u2026"}):(i||[]).map(n=>(0,lt.jsx)(at.Action,{autoFocus:n.id===e.project?.id,title:`${n.name} (${n.status.name})`,icon:ue(n),onAction:()=>c(n)},n.id))]})}var Ze=require("@raycast/api"),Si=require("react");var vt=require("react/jsx-runtime");function rs({issue:e,updateIssue:t}){let[s,o]=(0,Si.useState)(!1),{states:i,isLoadingStates:l}=fe(e.team.id,{execute:s}),c=tt(i||[]);async function n(r){let d=e.state;t({animatedTitle:"Setting status",payload:{stateId:r.id},optimisticUpdate(u){return{...u,state:r}},rollbackUpdate(u){return{...u,state:d}},successTitle:"Set status",successMessage:`${e.identifier} set to ${r.name}`,errorTitle:"Failed to set status"})}return(0,vt.jsx)(Ze.ActionPanel.Submenu,{icon:Ze.Icon.Circle,title:"Set Status",shortcut:{macOS:{modifiers:["cmd","shift"],key:"s"},Windows:{modifiers:["ctrl","shift"],key:"s"}},onOpen:()=>o(!0),children:c.length===0&&l?(0,vt.jsx)(Ze.Action,{title:"Loading\u2026"}):c.map(r=>(0,vt.jsx)(Ze.Action,{autoFocus:r.id===e.state.id,title:r.name,icon:G(r),onAction:()=>n(r)},r.id))})}var C=require("react/jsx-runtime");function ot({issue:e,mutateList:t,mutateSubIssues:s,mutateDetail:o,showAttachmentsAction:i,attachments:l,priorities:c,me:n,hideOpenInLinear:r}){let{pop:d}=(0,g.useNavigation)(),{linearClient:u}=k(),P=e.assignee?.id===n?.id,j=Ye({issueEstimationType:e.team.issueEstimationType,issueEstimationAllowZero:e.team.issueEstimationAllowZero,issueEstimationExtended:e.team.issueEstimationExtended});async function w({animatedTitle:I,payload:T,optimisticUpdate:R,rollbackUpdate:K,successTitle:xe,successMessage:He,errorTitle:Ke}){try{await(0,g.showToast)({style:g.Toast.Style.Animated,title:I});let _=u.updateIssue(e.id,T);await Promise.all([_,t?t(_,{optimisticUpdate(E){if(E)return E.map(B=>B.id===e.id?R(B):B)},rollbackOnError(E){if(E)return E.map(B=>B.id===e.id?K(B):B)}}):Promise.resolve(),s?s(_,{optimisticUpdate(E){if(E)return E.map(B=>B.id===e.id?R(B):B)},rollbackOnError(E){if(E)return E.map(B=>B.id===e.id?K(B):B)}}):Promise.resolve(),o?o(_,{optimisticUpdate(E){return R(E)},rollbackOnError(E){return K(E)}}):Promise.resolve()]),await(0,g.showToast)({style:g.Toast.Style.Success,title:xe,message:He})}catch(_){await(0,g.showToast)({style:g.Toast.Style.Failure,title:Ke,message:O(_)})}}async function L(){if(await(0,g.confirmAlert)({title:"Delete Issue",message:"Are you sure you want to delete the selected issue?",icon:{source:g.Icon.Trash,tintColor:g.Color.Red}}))try{await(0,g.showToast)({style:g.Toast.Style.Animated,title:"Deleting issue"});let I=u.deleteIssue(e.id);o&&d(),await Promise.all([I,t?t(I,{optimisticUpdate(T){if(T)return T.filter(R=>R.id!==e.id)}}):Promise.resolve(),s?s(I,{optimisticUpdate(T){if(T)return T.filter(R=>R.id!==e.id)}}):Promise.resolve()]),await(0,g.showToast)({style:g.Toast.Style.Success,title:"Issue deleted",message:`"${e.title}" is deleted`})}catch(I){await(0,g.showToast)({style:g.Toast.Style.Failure,title:"Failed to delete issue",message:O(I)})}}async function A(I){let T=e.priority;w({animatedTitle:"Setting priority",payload:{priority:I.priority},optimisticUpdate(R){return{...R,priority:I.priority}},rollbackUpdate(R){return{...R,priority:T}},successTitle:"Set priority",successMessage:`${e.identifier} priority set to ${I.label}`,errorTitle:"Failed to set priority"})}async function Y(I){let T=e.assignee;w({animatedTitle:"Setting assignee",payload:{assigneeId:I.id},optimisticUpdate(R){return{...R,assignee:I}},rollbackUpdate(R){return{...R,assignee:T}},successTitle:"Set assignee",successMessage:`${e.identifier} assigned to ${I.displayName}`,errorTitle:"Failed to set assignee"})}async function U(I){let T=e.assignee;w({animatedTitle:"Setting assignee",payload:{assigneeId:I?I.id:null},optimisticUpdate(R){return{...R,assignee:I||void 0}},rollbackUpdate(R){return{...R,assignee:T}},successTitle:"Set assignee",successMessage:`${e.identifier} ${I?"assigned to":"un-assigned from"} me`,errorTitle:"Failed to set assignee"})}async function $({estimate:I,label:T}){let R=e.estimate;w({animatedTitle:"Setting estimate",payload:{estimate:I},optimisticUpdate(K){return{...K,estimate:I}},rollbackUpdate(K){return{...K,estimate:R}},successTitle:"Set estimate",successMessage:`${e.identifier} estimate set to ${T}`,errorTitle:"Failed to set estimate"})}async function x(I){w({animatedTitle:I?"Setting due date":"Removing due date",payload:{dueDate:I},optimisticUpdate(T){return{...T,dueDate:I}},rollbackUpdate(T){return{...T,dueDate:T.dueDate}},successTitle:I?"Set due date":"Removed due date",successMessage:I?`${e.identifier} due date set to ${(0,ns.format)(I,"MM/dd/yyyy")}`:"",errorTitle:"Failed to set due date"})}async function q(I){if(!I){await(0,g.showToast)({style:g.Toast.Style.Failure,title:"Failed setting reminder"});return}try{await(0,g.showToast)({style:g.Toast.Style.Animated,title:"Setting reminder"}),await u.issueReminder(e.id,I),o&&d(),await(0,g.showToast)({style:g.Toast.Style.Success,title:"Reminder set",message:`${e.identifier} reminder set to ${(0,ns.format)(I,"MM/dd/yyyy")}`})}catch(T){await(0,g.showToast)({style:g.Toast.Style.Failure,title:"Failed to set reminder",message:O(T)})}}function me(){t&&t(),s&&s(),o&&o()}let[De,H]=(0,bi.useState)(""),{users:ae,supportsUserTypeahead:Pe,isLoadingUsers:pe}=Ue(De);return(0,C.jsxs)(C.Fragment,{children:[r?null:(0,C.jsx)(de,{title:"Open Issue",url:e.url}),(0,C.jsxs)(g.ActionPanel.Section,{children:[(0,C.jsx)(g.Action.Push,{title:"Edit Issue",icon:g.Icon.Pencil,shortcut:g.Keyboard.Shortcut.Common.Edit,target:(0,C.jsx)(qt,{priorities:c,me:n,issue:e,mutateList:t,mutateSubIssues:s})}),(0,C.jsx)(rs,{issue:e,updateIssue:w}),c&&c.length>0?(0,C.jsx)(g.ActionPanel.Submenu,{icon:g.Icon.LevelMeter,title:"Set Priority",shortcut:{macOS:{modifiers:["cmd","opt"],key:"p"},Windows:{modifiers:["ctrl","alt"],key:"p"}},children:c.map(I=>(0,C.jsx)(g.Action,{autoFocus:I.priority===e.priority,title:I.label,icon:{source:ce[I.priority]},onAction:()=>A(I)},I.priority))}):null,(0,C.jsx)(g.ActionPanel.Submenu,{icon:g.Icon.AddPerson,title:"Assign to",shortcut:{macOS:{modifiers:["cmd","shift"],key:"a"},Windows:{modifiers:["ctrl","shift"],key:"a"}},...Pe&&{onSearchTextChange:H,isLoading:pe,throttle:!0},children:ae?.map(I=>(0,C.jsx)(g.Action,{autoFocus:I.id===e.assignee?.id,title:`${I.displayName} (${I.email})`,icon:J(I),onAction:()=>Y(I)},I.id))}),n?(0,C.jsx)(g.Action,{title:P?"Un-Assign from Me":"Assign to Me",icon:J(n),shortcut:{macOS:{modifiers:["cmd","shift"],key:"i"},Windows:{modifiers:["ctrl","shift"],key:"i"}},onAction:()=>U(P?null:n)}):null,j?(0,C.jsx)(g.ActionPanel.Submenu,{title:"Set Estimate",icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}},shortcut:{macOS:{modifiers:["cmd","shift"],key:"e"},Windows:{modifiers:["ctrl","shift"],key:"e"}},children:j.map(({estimate:I,label:T})=>(0,C.jsx)(g.Action,{autoFocus:I===e.estimate,title:T,onAction:()=>$({estimate:I,label:T})},I))}):null,(0,C.jsx)(g.Action.PickDate,{title:"Set Due Date",shortcut:{macOS:{modifiers:["opt","shift"],key:"d"},Windows:{modifiers:["alt","shift"],key:"d"}},onChange:x}),(0,C.jsx)(g.Action.PickDate,{title:"Set Reminder",shortcut:{macOS:{modifiers:["cmd","shift"],key:"h"},Windows:{modifiers:["ctrl","shift"],key:"h"}},onChange:q}),(0,C.jsx)(ts,{issue:e,updateIssue:w}),(0,C.jsx)(es,{issue:e,updateIssue:w}),(0,C.jsx)(os,{issue:e,updateIssue:w}),(0,C.jsx)(ss,{issue:e,updateIssue:w}),(0,C.jsx)(is,{issue:e,updateIssue:w}),(0,C.jsx)(g.Action,{title:"Delete Issue",shortcut:g.Keyboard.Shortcut.Common.Remove,icon:g.Icon.Trash,style:g.Action.Style.Destructive,onAction:()=>L()})]}),(0,C.jsxs)(g.ActionPanel.Section,{children:[(0,C.jsx)(g.Action.Push,{title:"Show Sub-Issues",icon:g.Icon.List,target:(0,C.jsx)(Jt,{issue:e,mutateList:t}),shortcut:{macOS:{modifiers:["cmd","shift"],key:"m"},Windows:{modifiers:["ctrl","shift"],key:"m"}}}),(0,C.jsx)(g.Action.Push,{title:"Break Issues into Sub-Issues",icon:g.Icon.Stars,target:(0,C.jsx)(Vt,{issue:e}),shortcut:{macOS:{modifiers:["opt","shift"],key:"m"},Windows:{modifiers:["alt","shift"],key:"m"}}}),i?(0,C.jsx)(g.Action.Push,{title:"Show Issue Links",icon:g.Icon.Link,target:(0,C.jsx)(Qt,{attachments:l??[],issue:e}),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"l"},Windows:{modifiers:["ctrl","alt","shift"],key:"l"}}}):null,(0,C.jsx)(g.Action.Push,{title:"Add Attachments and Links",icon:g.Icon.NewDocument,target:(0,C.jsx)(Dt,{issue:e}),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"a"},Windows:{modifiers:["ctrl","alt","shift"],key:"a"}}}),(0,C.jsx)(g.Action.Push,{title:"Add Comment",icon:g.Icon.Plus,target:(0,C.jsx)(Be,{issue:e}),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"n"},Windows:{modifiers:["ctrl","alt","shift"],key:"n"}}}),(0,C.jsx)(g.Action.Push,{title:"Show Comments",icon:g.Icon.Bubble,target:(0,C.jsx)(Zt,{issue:e}),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"c"},Windows:{modifiers:["ctrl","alt","shift"],key:"c"}}})]}),(0,C.jsx)(Yt,{issue:e}),(0,C.jsx)(g.ActionPanel.Section,{children:(0,C.jsx)(g.Action,{title:"Refresh",icon:g.Icon.ArrowClockwise,shortcut:g.Keyboard.Shortcut.Common.Refresh,onAction:()=>me()})})]})}var Re=require("react/jsx-runtime");function kt({issue:e,mutateList:t,mutateSubIssues:s,priorities:o,me:i}){let{primaryAction:l}=(0,ne.getPreferenceValues)(),c=[e.identifier,e.state.name,e.priorityLabel];e.assignee&&c.push(e.assignee.email,e.assignee.displayName);let n=new Date(e.updatedAt),r=e.dueDate?new Date(e.dueDate):null,d=e.estimate?{icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}},text:bt({estimate:e.estimate,issueEstimationType:e.team.issueEstimationType})}:null,u=e.cycle?Me(e.cycle):null,P=e.project||null,j=e.labels.nodes.length>0,w=[{date:n,tooltip:`Updated: ${(0,jt.format)(n,"EEEE d MMMM yyyy 'at' HH:mm")}`},{icon:r?St(r):void 0,text:r?(0,jt.format)(r,"MMM dd"):void 0,tooltip:r?`Due date: ${(0,jt.format)(r,"MM/dd/yyyy")}`:void 0},{icon:j?ne.Icon.Tag:void 0,text:j?String(e.labels.nodes.length):void 0,tooltip:j?e.labels.nodes.map(A=>A.name).join(", "):void 0},{icon:P?ue(P):void 0,tooltip:`Project: ${P?P.name:void 0}`},{icon:u?{source:u.icon}:void 0,text:u?String(u.number):void 0,tooltip:u?`Cycle: ${u.title}`:void 0},{icon:d?d.icon:void 0,text:d?d.text:void 0},{icon:G(e.state),tooltip:`Status: ${e.state.name}`},{icon:J(e.assignee),tooltip:e.assignee?`Assignee: ${e.assignee?.displayName} (${e.assignee?.email})`:"Unassigned"}],L=l==="openInLinear";return(0,Re.jsx)(ne.List.Item,{title:e.title,icon:{value:{source:ce[e.priority]},tooltip:`Priority: ${e.priorityLabel}`},subtitle:e.identifier,keywords:c,accessories:w,actions:(0,Re.jsxs)(ne.ActionPanel,{title:e.identifier,children:[L?(0,Re.jsx)(de,{title:"Open Issue",url:e.url}):null,(0,Re.jsx)(ne.Action.Push,{title:"Show Details",icon:ne.Icon.Sidebar,target:(0,Re.jsx)(ht,{issue:e,mutateList:t,priorities:o,me:i})}),(0,Re.jsx)(ot,{issue:e,mutateList:t,mutateSubIssues:s,priorities:o,me:i,hideOpenInLinear:L})]})},e.id)}var ut=require("@raycast/api"),Ai=require("@raycast/utils"),Mt=mt(require("react"));var ct=require("react/jsx-runtime");function uo({children:e}){return(0,Mt.useEffect)(()=>{ii()},[]),e}var as=class extends Mt.default.Component{constructor(t){super(t),this.state={error:null}}static getDerivedStateFromError(t){return{error:t}}render(){let{error:t}=this.state;if(!t)return this.props.children;if(!(t.message.includes("invalid_grant")||t.message.includes("Error while fetching tokens")||t.message.includes("Could not initialize OAuth")))throw t;return(0,ct.jsx)(ut.Detail,{markdown:`# Sign In Failed

Failed to authenticate with Linear:
\`\`\`
${t.message}
\`\`\`

This can happen when the network is unreliable or the authorization code has expired. Please try signing in again.`,actions:(0,ct.jsx)(ut.ActionPanel,{children:(0,ct.jsx)(ut.Action,{title:"Sign in Again",onAction:async()=>{await Nt.client.removeTokens(),this.setState({error:null})}})})})}},mo=(0,Ai.withAccessToken)(Nt)(uo);function ls({children:e}){return(0,ct.jsx)(as,{children:(0,ct.jsx)(mo,{children:e})})}var cs=require("@raycast/utils");async function Li(){let{graphQLClient:e}=k(),t=await st(async o=>e.rawRequest(`
          query($cursor: String) {
            customViews(first: 50, after: $cursor) {
              nodes {
                id
                name
                icon
                color
                shared
                modelName
                team {
                  id
                  name
                  key
                }
              }
              pageInfo {
                hasNextPage
                endCursor
              }
            }
          }
        `,{cursor:o}),o=>o.data?.customViews?.pageInfo,(o,i)=>o.concat(i.data?.customViews?.nodes??[]),[],5),{data:s}=await e.rawRequest(`
      query {
        organization {
          urlKey
        }
      }
    `);return t.filter(o=>o.modelName==="Issue").map(o=>({...o,url:`https://linear.app/${s?.organization.urlKey}/view/${o.id}`}))}async function Ti(e){let{graphQLClient:t}=k();return st(async s=>t.rawRequest(`
          query($viewId: String!, $cursor: String) {
            customView(id: $viewId) {
              issues(first: 50, after: $cursor) {
                nodes {
                  ${Fe}
                }
                pageInfo {
                  hasNextPage
                  endCursor
                }
              }
            }
          }
        `,{viewId:e,cursor:s}),s=>s.data?.customView?.issues?.pageInfo??void 0,(s,o)=>s.concat(o.data?.customView?.issues?.nodes??[]),[],5)}function $i(){let{data:e,error:t,isLoading:s}=(0,cs.useCachedPromise)(Li);return{customViews:e,customViewsError:t,isLoadingCustomViews:s}}function Ri(e){let{data:t,error:s,isLoading:o,mutate:i}=(0,cs.useCachedPromise)(Ti,[e],{execute:!!e});return{issues:t,issuesError:s,isLoadingIssues:o,mutateList:i}}var Z=require("react/jsx-runtime");function Di({viewId:e,viewName:t}){let{issues:s,issuesError:o,isLoadingIssues:i,mutateList:l}=Ri(e),{priorities:c,isLoadingPriorities:n}=yt(),{me:r,isLoadingMe:d}=ze();(0,us.useEffect)(()=>{o&&(0,W.showToast)({style:W.Toast.Style.Failure,title:"Failed to load issues",message:o.message})},[o]);let u=s?.length===1?"1 issue":`${s?.length??0} issues`;return(0,Z.jsx)(W.List,{navigationTitle:t,isLoading:i||n||d,searchBarPlaceholder:"Filter issues",children:(0,Z.jsx)(W.List.Section,{title:t,subtitle:u,children:s?.map(P=>(0,Z.jsx)(kt,{issue:P,mutateList:l,priorities:c,me:r},P.id))})})}function po(){let{customViews:e,customViewsError:t,isLoadingCustomViews:s}=$i(),{primaryAction:o}=(0,W.getPreferenceValues)();return(0,us.useEffect)(()=>{t&&(0,W.showToast)({style:W.Toast.Style.Failure,title:"Failed to load custom views",message:t.message})},[t]),(0,Z.jsx)(W.List,{isLoading:s,searchBarPlaceholder:"Search custom views",children:e?.map(i=>{let l=[];return i.team&&l.push({tag:i.team.name,tooltip:`Team: ${i.team.name}`}),i.shared&&l.push({icon:W.Icon.TwoPeople,tooltip:"Shared view"}),(0,Z.jsx)(W.List.Item,{icon:et({icon:i.icon??void 0,color:i.color??void 0,fallbackIcon:W.Icon.Layers}),title:i.name,accessories:l,actions:(0,Z.jsxs)(W.ActionPanel,{children:[o==="openInLinear"?(0,Z.jsx)(de,{title:"Open View",url:i.url}):null,(0,Z.jsx)(W.Action.Push,{title:"Show Issues",icon:W.Icon.List,target:(0,Z.jsx)(Di,{viewId:i.id,viewName:i.name})}),o==="openInLinear"?null:(0,Z.jsx)(de,{title:"Open View",url:i.url})]})},i.id)})})}function xi(){return(0,Z.jsx)(ls,{children:(0,Z.jsx)(po,{})})}0&&(module.exports={CustomViewIssues});
