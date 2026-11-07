"use strict";var Os=Object.create;var kt=Object.defineProperty;var Vs=Object.getOwnPropertyDescriptor;var qs=Object.getOwnPropertyNames;var Ws=Object.getPrototypeOf,Bs=Object.prototype.hasOwnProperty;var Qs=(e,t)=>{for(var i in t)kt(e,i,{get:t[i],enumerable:!0})},gi=(e,t,i,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let s of qs(t))!Bs.call(e,s)&&s!==i&&kt(e,s,{get:()=>t[s],enumerable:!(r=Vs(t,s))||r.enumerable});return e};var et=(e,t,i)=>(i=e!=null?Os(Ws(e)):{},gi(t||!e||!e.__esModule?kt(i,"default",{value:e,enumerable:!0}):i,e)),zs=e=>gi(kt({},"__esModule",{value:!0}),e);var kr={};Qs(kr,{default:()=>Fs});module.exports=zs(kr);var f=require("@raycast/api"),Es=require("date-fns");var fi=require("@linear/sdk"),Ii=require("@raycast/api"),yi=require("@raycast/utils"),pt=null;async function Gs(e,t,i,r,s){let l=JSON.stringify({query:i,variables:r}),c=new Headers(t.headers);new Headers(s).forEach((u,d)=>c.set(d,u)),c.set("Content-Type","application/json");let n=await fetch(e,{...t,method:"POST",headers:Object.fromEntries(c.entries()),body:l}),o=n.headers.get("Content-Type")?.startsWith("application/json")?await n.json():await n.text();if(typeof o!="string"&&n.ok&&!o.errors&&o.data)return{...o,headers:n.headers,status:n.status};throw new Error(typeof o=="string"?o:o.errors?.[0]?.message??`GraphQL Error (${n.status})`)}var Ot=yi.OAuthService.linear({scope:"read write",onAuthorize({token:e}){pt=new fi.LinearClient({accessToken:e,headers:{"public-file-urls-expire-in":"60","linear-raycast-extension-name":Ii.environment.extensionName}});let t=pt.client;t.rawRequest=((i,r,s)=>Gs(t.url,t.options,i,r,s))}});function b(){if(!pt)throw new Error("No linear client initialized");return{linearClient:pt,graphQLClient:pt.client}}async function hi(e){let{graphQLClient:t}=b(),{data:i}=await t.rawRequest(`
      mutation {
        notificationArchive(id: "${e}") {
          success
        }
      }
    `);return{success:i?.notificationArchive.success}}async function St(e){let{graphQLClient:t}=b(),{data:i}=await t.rawRequest(`
      mutation {
        notificationUpdate(id: "${e.id}", input: {readAt: ${e.readAt?`"${e.readAt.toISOString()}"`:null}}) {
          success
        }
      }
    `);return{success:i?.notificationUpdate.success}}var O=require("@raycast/api"),Ts=require("date-fns");var pe=require("date-fns"),_s=10080*60*1e3;function Ue(e){let t=Date.now(),i=Date.now()+_s,r=new Date(e.startsAt),s=new Date(e.endsAt),l=!e.completedAt&&(0,pe.isBefore)(r,t)&&(0,pe.isAfter)(s,t),c=!e.completedAt&&(0,pe.isBefore)(r,i)&&(0,pe.isAfter)(s,i),n=l?{light:"light/active-cycle.svg",dark:"dark/active-cycle.svg"}:{light:"light/cycle.svg",dark:"dark/cycle.svg"},o=`Cycle ${e.number} (${(0,pe.format)(r,"dd MMM")} - ${(0,pe.format)(s,"dd MMM")})`,u=l?`Active ${o}`:o;return{...e,isActive:l,isNext:c,icon:n,title:u}}function we(e){return e.filter(t=>(0,pe.isAfter)(new Date(t.endsAt),Date.now())).map(Ue)}var tt=require("@raycast/api"),bt=require("date-fns");function Pt(e){let t=(0,bt.differenceInDays)(e,(0,bt.startOfToday)()),i=tt.Color.PrimaryText;return t<=7&&(i=tt.Color.Orange),t<=0&&(i=tt.Color.Red),{source:tt.Icon.Calendar,tintColor:i}}var ki={exponential:[0,1,2,4,8,16,32,64],fibonacci:[0,1,2,3,5,8,13,21],linear:[0,1,2,3,4,5,6,7],tShirt:[0,1,2,3,5,8,13,21]},Si={0:"\u2013",1:"XS",2:"S",3:"M",5:"L",8:"XL",13:"XXL",21:"XXXL"};function Ct({estimate:e,issueEstimationType:t}){if(!e)return"Not estimated";if(t==="tShirt"){let i=Si[e];return i||String(e)}return String(e)}function it({issueEstimationType:e,issueEstimationAllowZero:t,issueEstimationExtended:i}){if(e==="notUsed")return null;let r=t?0:1,s=i?ki[e].length:6,l=ki[e].slice(r,s);return e==="tShirt"?l.map(c=>({estimate:c,label:Si[c]})):l.map(c=>({estimate:c,label:c!==1?`${c} points`:`${c} point`}))}var Vt=require("@raycast/api");function Ae(e){return e?{source:"linear-icons/milestone.svg",tintColor:Vt.Color.PrimaryText}:{source:"linear-icons/no-milestone.svg",tintColor:Vt.Color.SecondaryText}}var ge={0:{light:"light/priority-no-priority.svg",dark:"dark/priority-no-priority.svg"},1:{light:"light/priority-urgent.svg",dark:"dark/priority-urgent.svg"},2:{light:"light/priority-high.svg",dark:"dark/priority-high.svg"},3:{light:"light/priority-medium.svg",dark:"dark/priority-medium.svg"},4:{light:"light/priority-low.svg",dark:"dark/priority-low.svg"}};var bi=et(require("fs")),Pi=require("@raycast/api"),Ci=et(require("node-emoji"));function wt({icon:e,color:t,fallbackIcon:i}){if(!e)return i;if(/:(.*):/.test(e))return Ci.get(e)??i;let s=`${Pi.environment.assetsPath}/linear-icons/${e.toLowerCase()}.svg`;return bi.default.existsSync(s)?{source:s,...t?{tintColor:{light:t,dark:t,adjustContrast:!0}}:{}}:i}function fe(e){return e?wt({icon:e.icon??void 0,color:e.color??void 0,fallbackIcon:{source:{light:"light/project.svg",dark:"dark/project.svg"}}}):{source:{light:"light/no-project.svg",dark:"dark/no-project.svg"}}}var wi=require("lodash");var Hs={triage:{light:"light/triage.svg",dark:"dark/triage.svg"},backlog:{light:"light/backlog.svg",dark:"dark/backlog.svg"},unstarted:{light:"light/unstarted.svg",dark:"dark/unstarted.svg"},started:{light:"light/started.svg",dark:"dark/started.svg"},completed:{light:"light/completed.svg",dark:"dark/completed.svg"},canceled:{light:"light/canceled.svg",dark:"dark/canceled.svg"}};function K(e){return{source:Hs[e.type],tintColor:{light:e.color,dark:e.color,adjustContrast:!0}}}function st(e,t=["triage","backlog","unstarted","started","completed","canceled"]){if(e.length===0)return[];let i=(0,wi.groupBy)(e,r=>r.type);return t.filter(r=>!!i[r]).map(r=>i[r]).flat()}var At=require("@raycast/api"),Ai=require("@raycast/utils");function X(e){return e?{source:e.avatarUrl?encodeURI(e.avatarUrl):(0,Ai.getAvatarIcon)(e.displayName.toUpperCase()),mask:At.Image.Mask.Circle}:At.Icon.Person}var xi=require("@raycast/utils");var Li=require("@raycast/api");async function qt(e,t,i,r,s){let l=r,c=!0,n,o=0;for(;c&&o<s;){let u=await e(n);l=i(l,u),c=t(u)?.hasNextPage,n=t(u)?.endCursor,o++}return l}var Ks=(0,Li.getPreferenceValues)();function Ti({inFilterBlock:e,addComma:t,inParentheses:i}={inFilterBlock:!1,inParentheses:!1,addComma:!0}){return Ks.shouldHideRedundantIssues?[...i?["("]:[],...t?[", "]:[],...e?[]:["filter: { "],"completedAt: { null: true }, canceledAt: { null: true }",...e?[]:[" }"],...i?[")"]:[]].join(""):""}var Ee=`
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
`;async function rt(){let{graphQLClient:e}=b(),{data:t}=await e.rawRequest(`
      query {
        issues(orderBy: createdAt${Ti()}) {
          nodes {
            ${Ee}
          }
        }
      }
    `);return t?.issues.nodes}async function Ri(e){let{graphQLClient:t}=b(),{data:i}=await t.rawRequest(`
      query($issueId: String!) {
        issue(id: $issueId) {
          children${Ti({inParentheses:!0})} {
            nodes {
              ${Ee}
              sortOrder
            }
          }
        }
      }
    `,{issueId:e});if(!i)throw new Error("Cannot find the Linear issue");return i.issue.children.nodes}async function $i(e){let{graphQLClient:t}=b(),{data:i}=await t.rawRequest(`
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
    `,{issueId:e});if(!i)throw new Error("Cannot find the Linear issue");return i.issue}async function Di(e){let{graphQLClient:t}=b(),{data:i}=await t.rawRequest(`
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
    `,{issueId:e});if(!i)throw new Error("Cannot find the Linear issue");return i.issue.comments.nodes}async function vi(e){let{graphQLClient:t}=b(),{data:i}=await t.rawRequest(`
      query($issueId: String!) {
        issue(id: $issueId) {
          ${Ee}
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
    `,{issueId:e});if(!i)throw new Error("Cannot find the Linear issue");return i.issue}function Fe(e){let t=e.id,{data:i,error:r,isLoading:s,mutate:l}=(0,xi.useCachedPromise)(vi,[t],{initialData:{...e,description:""}});return{issue:i,issueError:r,isLoadingIssue:s,mutateDetail:l}}var I=require("@raycast/api"),ci=require("date-fns"),Ls=require("react");function M(e){return e instanceof Error?e.message:String(e)}var ji=require("@raycast/utils");function Ne(e=""){let{linearClient:t}=b(),{data:i,error:r,isLoading:s}=(0,ji.useCachedPromise)(async l=>{let c=await t.users(l.trim().length>0?{filter:{name:{containsIgnoreCase:l}}}:void 0);return{users:c?.nodes??[],hasMoreUsers:!!c?.pageInfo?.hasNextPage}},[e],{initialData:[]});return{users:i?.users,supportsUserTypeahead:e.trim().length>0||i?.hasMoreUsers,usersError:r,isLoadingUsers:!i&&!r||s}}var D=require("@raycast/api"),Fi=require("@raycast/utils"),Ni=require("nanoid"),Oe=require("react");async function Mi(e){let{graphQLClient:t}=b(),i=e.title.replace(/"/g,"\\$&"),r=e.description?.replace(/\n/g,"\\n")?.replace(/"/g,"\\$&"),s=`teamId: "${e.teamId}", title: "${i}", description: "${r}", priority: ${e.priority}`;e.stateId&&(s+=`, stateId: "${e.stateId}"`),e.estimate&&(s+=`, estimate: ${e.estimate}`),e.assigneeId&&(s+=`, assigneeId: "${e.assigneeId}"`),e.labelIds&&e.labelIds.length>0&&(s+=`, labelIds: [${e.labelIds.map(c=>`"${c}"`).join(",")}]`),e.dueDate&&(s+=`, dueDate: "${e.dueDate.toISOString()}"`),e.cycleId&&(s+=`, cycleId: "${e.cycleId}"`),e.projectId&&(s+=`, projectId: "${e.projectId}"`),e.projectId&&e.projectMilestoneId&&(s+=`, projectMilestoneId: "${e.projectMilestoneId}"`),e.parentId&&(s+=`, parentId: "${e.parentId}"`);let{data:l}=await t.rawRequest(`
      mutation {
        issueCreate(input: {${s}}) {
          success
          issue {
            ${Ee}
          }
        }
      }
    `);return{success:l?.issueCreate.success,issue:l?.issueCreate.issue}}async function Ui(e){let{graphQLClient:t}=b(),i=e.title.replace(/"/g,"\\$&"),r=e.description?.replace(/\n/g,"\\n").replace(/"/g,"\\$&"),s=`teamId: "${e.teamId}", title: "${i}", description: "${r}", parentId: "${e.parentId}"`;e.stateId&&(s+=`, stateId: "${e.stateId}"`);let{data:l}=await t.rawRequest(`
      mutation {
        issueCreate(input: {${s}}) {
          success
        }
      }
    `);return{success:l?.issueCreate.success}}var Ei=require("@raycast/utils");function he(e,t){let{linearClient:i}=b(),{data:r,error:s,isLoading:l}=(0,Ei.useCachedPromise)(async c=>(await i.workflowStates({filter:{team:{id:{eq:c}}}})).nodes.sort((o,u)=>o.position-u.position),[e],{initialData:[],execute:t?.execute!==!1});return{states:r,isLoadingStates:l,statesError:s}}var re=require("react/jsx-runtime");function Wt({issue:e}){let{pop:t}=(0,D.useNavigation)(),{states:i}=he(e.team.id),r=(0,Oe.useMemo)(()=>i.filter(R=>R.type==="unstarted")[0],[i]),{issue:s,isLoadingIssue:l}=Fe(e),{data:c,isLoading:n,revalidate:o}=(0,Fi.useAI)(`Act as a product manager for Linear issues. Break down a Linear issue into a list of sub-issues. 
    
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

${s.description?`To give you more context and help in creating sub-issues, here's the Linear issue description:
"""
${s.description}
"""
`:""}

Break down the Linear issue with this title: "${s.title}"`,{execute:!!s&&!l,creativity:.5}),[u,d]=(0,Oe.useState)(!1),[A,U]=(0,Oe.useState)([]);(0,Oe.useEffect)(()=>{if(!(!c||n)){try{let v=/\[[\s\S]*?\]/,R=c.match(v);if(R&&R[0]){let x=JSON.parse(R[0]);U(x.map(p=>({...p,id:(0,Ni.nanoid)(),selected:!0})))}}catch(v){(0,D.showToast)({style:D.Toast.Style.Failure,title:"Failed to parse AI results",message:M(v),primaryAction:{title:"Retry",onAction:o},secondaryAction:{title:"Copy AI Result",onAction:()=>D.Clipboard.copy(c)}})}d(!0)}},[c,n]);async function w(){try{await(0,D.showToast)({style:D.Toast.Style.Animated,title:"Creating sub-issues"});let v=A.filter(R=>R.selected);await Promise.all(v.map(R=>Ui({teamId:s.team.id,title:R.title,description:R.description,parentId:s.id,stateId:r?.id}))),await(0,D.showToast)({style:D.Toast.Style.Success,title:"Created sub-issues"}),t()}catch(v){(0,D.showToast)({style:D.Toast.Style.Failure,title:"Failed to create Sub-Issues",message:M(v)})}}return(0,re.jsxs)(D.List,{isLoading:n||!u,children:[A?.map(v=>(0,re.jsx)(D.List.Item,{icon:v.selected?{source:D.Icon.CheckCircle,tintColor:D.Color.Green}:D.Icon.Circle,title:v.title,subtitle:v.description,actions:(0,re.jsxs)(D.ActionPanel,{children:[(0,re.jsx)(D.Action,{title:v.selected?"Unselect Sub-Issue":"Select Sub-Issue",icon:v.selected?D.Icon.Circle:{source:D.Icon.CheckCircle,tintColor:D.Color.Green},onAction:()=>U(A.map(R=>R.id===v.id?{...R,selected:!R.selected}:R))}),(0,re.jsx)(D.Action,{title:"Create Sub-Issues",icon:D.Icon.Plus,onAction:()=>w()}),(0,re.jsx)(D.Action,{title:"Generate New Sub-Issues",icon:D.Icon.ArrowClockwise,onAction:o})]})},v.title)),(0,re.jsx)(D.List.EmptyView,{title:"No sub-issues were generated. Try again.",actions:(0,re.jsx)(D.ActionPanel,{children:(0,re.jsx)(D.Action,{title:"Retry",icon:D.Icon.ArrowClockwise,onAction:o})})})]})}var P=require("@raycast/api"),Qe=require("@raycast/utils"),ft=require("react");async function Oi(e,t){let{graphQLClient:i}=b(),r=[];if(t.teamId&&r.push(`teamId: "${t.teamId}"`),t.title&&r.push(`title: "${t.title.replace(/"/g,"\\$&")}"`),t.description&&r.push(`description: "${t.description.replace(/\n/g,"\\n").replace(/"/g,"\\$&")}"`),t.stateId&&r.push(`stateId: "${t.stateId}"`),typeof t.priority<"u"&&r.push(`priority: ${t.priority}`),typeof t.assigneeId<"u"&&r.push(`assigneeId: ${t.assigneeId?`"${t.assigneeId}"`:null}`),t.labelIds&&r.push(`labelIds: [${t.labelIds.map(l=>`"${l}"`).join(",")}]`),typeof t.estimate<"u"&&r.push(`estimate: ${t.estimate}`),typeof t.dueDate<"u"){let l=t.dueDate?t.dueDate instanceof Date?t.dueDate.toISOString():t.dueDate:null;r.push(`dueDate: ${l?`"${l}"`:null}`)}typeof t.cycleId<"u"&&r.push(`cycleId: ${t.cycleId?`"${t.cycleId}"`:null}`),typeof t.projectId<"u"&&r.push(`projectId: ${t.projectId?`"${t.projectId}"`:null}`),typeof t.projectMilestoneId<"u"&&r.push(`projectMilestoneId: ${t.projectMilestoneId?`"${t.projectMilestoneId}"`:null}`),typeof t.parentId<"u"&&r.push(`parentId: ${t.parentId?`"${t.parentId}"`:null}`);let{data:s}=await i.rawRequest(`
      mutation {
        issueUpdate(id: "${e}", input: {${r.join(", ")}}) {
          success
        }
      }
    `);return{success:s?.issueUpdate.success}}var Vi=require("@raycast/api");function Lt(e,t){let i=t?.logoUrl?encodeURI(t.logoUrl):Vi.Icon.TwoPeople;return wt({icon:e.icon??void 0,color:e.color??void 0,fallbackIcon:i})}var qi=require("@raycast/utils");function Ve(e,t){let{linearClient:i}=b(),{data:r,error:s,isLoading:l}=(0,qi.useCachedPromise)(async c=>(await i.cycles({filter:{team:{id:{eq:c}}}})).nodes.sort((o,u)=>o.number-u.number),[e],{execute:t?.execute!==!1&&!!e});return{cycles:r,cyclesError:s,isLoadingCycles:!r&&!s||l}}var Wi=require("@raycast/utils");function ke(e,t=[],i){let{data:r,error:s,isLoading:l,mutate:c}=(0,Wi.useCachedPromise)(e,t,i);return{issues:r,issuesError:s,isLoadingIssues:l,mutateList:c}}var zi=require("@raycast/utils");var Bi=require("@raycast/api");var Zs=100,Xs=100,Js=(0,Bi.getPreferenceValues)();function Ys(){let e=Number(Js.labelsLimit),t=Number.isFinite(e)&&e>0?e:Xs,i=Math.floor(Math.min(Zs,t)),r=Math.ceil(t/i);return{pageSize:i,pageLimit:r}}async function Qi(e){if(!e)return[];let{pageSize:t,pageLimit:i}=Ys(),{graphQLClient:r}=b();return qt(async s=>r.rawRequest(`
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
        `,{teamId:e,cursor:s}),s=>s.data?.team?.labels?.pageInfo,(s,l)=>s.concat(l.data?.team?.labels?.nodes??[]),[],i)}function qe(e,t){let{data:i,error:r,isLoading:s}=(0,zi.useCachedPromise)(Qi,[e],{execute:t?.execute!==!1&&!!e});return{labels:i,labelsError:r,isLoadingLabels:!i&&!r||s}}var _i=require("@raycast/utils");var er=`
  id
  name
  targetDate
  project {
      id
  }
  sortOrder
  updatedAt
`;async function Gi(e){let{graphQLClient:t}=b();if(e){let{data:i}=await t.rawRequest(`
        query($projectId: String!) {
          project(id: $projectId) {
            projectMilestones {
              nodes {
                ${er}
              }
            }
          }
        }
      `,{projectId:e});return i?.project.projectMilestones.nodes}return null}function We(e,t){let{data:i,error:r,isLoading:s,mutate:l}=(0,_i.useCachedPromise)(Gi,[e],{execute:t?.execute!==!1});return{milestones:i,isLoadingMilestones:!i&&!r||s,milestonesError:r,mutateMilestones:l}}var Ki=require("@raycast/utils");var tr=`
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
`;async function Hi({teamId:e,searchText:t="",after:i=null,first:r=null}){let{graphQLClient:s}=b(),l=`
    projects(first: $first, after: $after, filter: { name: { containsIgnoreCase: $searchText } }) {
      nodes {
        ${tr}
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  `;if(!e){let{data:o}=await s.rawRequest(`
        query($first: Int, $after: String, $searchText: String) {
          ${l}
        }
      `,{first:r,after:i,searchText:t}),u=o?.projects;return{data:u?.nodes??[],hasMore:!!u?.pageInfo.hasNextPage,cursor:u?.pageInfo.endCursor||null}}let{data:c}=await s.rawRequest(`
      query($teamId: String!, $first: Int, $after: String, $searchText: String) {
        team(id: $teamId) {
          ${l}
        }
      }
    `,{teamId:e,first:r,after:i,searchText:t}),n=c?.team?.projects;return{data:n?.nodes??[],hasMore:!!n?.pageInfo.hasNextPage,cursor:n?.pageInfo.endCursor||null}}function Be(e,t){let{data:i,error:r,isLoading:s,mutate:l,pagination:c}=(0,Ki.useCachedPromise)((n,o)=>u=>Hi({teamId:n,searchText:o,after:u.cursor,first:t?.pageSize}),[e,t?.searchText],{execute:t?.execute!==!1,keepPreviousData:!0});return{projects:i,isLoadingProjects:!i&&!r||s,projectsError:r,mutateProjects:l,pagination:c}}var Ji=require("@raycast/utils");var Zi=require("lodash");async function Xi(e=""){let{graphQLClient:t,linearClient:i}=b(),r=await i.viewer,{data:s}=await t.rawRequest(`
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
    `,{userId:r.id,query:e}),l=(0,Zi.sortBy)(s?.teams.nodes??[],o=>o.membership?.sortOrder??1/0),c=s?.organization,n=!!s?.teams.pageInfo.hasNextPage;return{teams:l,organization:c,hasMoreTeams:n}}function gt(e=""){let{data:t,error:i,isLoading:r}=(0,Ji.useCachedPromise)(Xi,[e]);return{teams:t?.teams,org:t?.organization,teamsError:i,isLoadingTeams:!t&&!i||r,supportsTeamTypeahead:e.trim().length>0||t?.hasMoreTeams}}var T=require("react/jsx-runtime");function Bt(e){let{pop:t}=(0,P.useNavigation)(),{issue:i,isLoadingIssue:r,mutateDetail:s}=Fe(e.issue),[l,c]=(0,ft.useState)(""),{teams:n,org:o,supportsTeamTypeahead:u,isLoadingTeams:d}=gt(l),A=n&&n.length>1,[U,w]=(0,ft.useState)(""),{users:v,supportsUserTypeahead:R,isLoadingUsers:x}=Ne(U),{handleSubmit:p,itemProps:k,values:S,setValue:F}=(0,Qe.useForm)({async onSubmit(g){let te=await(0,P.showToast)({style:P.Toast.Style.Animated,title:"Editing issue"});try{let ye={teamId:g.teamId||e.issue.team.id,title:g.title,description:g.description,stateId:g.stateId,labelIds:g.labelIds,dueDate:g.dueDate,...j&&g.estimate?{estimate:parseInt(g.estimate)}:{},...g.assigneeId?{assigneeId:g.assigneeId}:{},...g.cycleId?{cycleId:g.cycleId}:{},...g.projectId?{projectId:g.projectId}:{},...g.milestoneId?{projectMilestoneId:g.milestoneId}:{},...g.parentId?{parentId:g.parentId}:{},priority:parseInt(g.priority)},{success:mt}=await Oi(i.id,ye);mt&&(te.style=P.Toast.Style.Success,te.title=`Edited Issue \u2022 ${i.identifier}`,t(),s(),e.mutateList&&e.mutateList(),e.mutateSubIssues&&e.mutateSubIssues())}catch(ye){te.style=P.Toast.Style.Failure,te.title="Failed to edit issue",te.message=M(ye)}},validation:{teamId:A?Qe.FormValidation.Required:void 0,title:Qe.FormValidation.Required,stateId:Qe.FormValidation.Required,priority:Qe.FormValidation.Required},initialValues:{teamId:e.issue.team.id,title:e.issue.title,description:i.description??void 0,priority:String(e.issue.priority),stateId:e.issue.state.id,estimate:e.issue.estimate?String(e.issue.estimate):void 0,assigneeId:e.issue.assignee?.id,labelIds:e.issue.labels.nodes.map(g=>g.id),dueDate:i.dueDate?new Date(i.dueDate):null,cycleId:e.issue.cycle?.id,projectId:e.issue.project?.id,milestoneId:e.issue.projectMilestone?.id,parentId:e.issue.parent?.id}});(0,ft.useEffect)(()=>{F("description",i.description||""),F("dueDate",i.dueDate?new Date(i.dueDate):null)},[i]);let de=!!S.teamId&&S.teamId.trim().length>0,{states:ie}=he(S.teamId,{execute:de}),{labels:H}=qe(S.teamId,{execute:de}),{cycles:Y}=Ve(S.teamId,{execute:de}),{issues:me}=ke(rt,[],{execute:de}),{projects:se}=Be(S.teamId,{execute:de}),{milestones:h}=We(S.projectId,{execute:!!S.projectId}),$=n?.find(g=>g.id===S.teamId),j=$?it({issueEstimationType:$.issueEstimationType,issueEstimationAllowZero:$.issueEstimationAllowZero,issueEstimationExtended:$.issueEstimationExtended}):null,ee=st(ie||[]),xe=ie&&ie.length>0,Xe=e.priorities&&e.priorities.length>0,Je=H&&H.length>0,J=Y&&Y.length>0,q=se&&se.length>0,G=h&&h.length>0,ht=me&&me.length>0;return(0,T.jsxs)(P.Form,{actions:(0,T.jsx)(P.ActionPanel,{children:(0,T.jsx)(P.Action.SubmitForm,{onSubmit:p,title:"Edit Issue"})}),isLoading:d||r||x,children:[(u||A)&&(0,T.jsxs)(T.Fragment,{children:[(0,T.jsx)(P.Form.Dropdown,{title:"Team",...k.teamId,...u&&{onSearchTextChange:c,isLoading:d,throttle:!0},children:n?.map(g=>(0,T.jsx)(P.Form.Dropdown.Item,{title:g.name,value:g.id,icon:Lt(g,o)},g.id))}),(0,T.jsx)(P.Form.Separator,{})]}),(0,T.jsx)(P.Form.TextField,{title:"Title",placeholder:"Issue title",autoFocus:!0,...k.title}),(0,T.jsx)(P.Form.TextArea,{title:"Description",placeholder:"Add some details (supports Markdown, e.g. **bold**)",...k.description}),(0,T.jsx)(P.Form.Dropdown,{title:"Status",...k.stateId,children:xe?ee.map(g=>(0,T.jsx)(P.Form.Dropdown.Item,{title:g.name,value:g.id,icon:K(g)},g.id)):null}),(0,T.jsx)(P.Form.Dropdown,{title:"Priority",...k.priority,children:Xe?e.priorities?.map(({priority:g,label:te})=>(0,T.jsx)(P.Form.Dropdown.Item,{title:te,value:String(g),icon:{source:ge[g]}},g)):null}),(0,T.jsxs)(P.Form.Dropdown,{title:"Assignee",...k.assigneeId,...R&&{onSearchTextChange:w,isLoading:x,throttle:!0},children:[(0,T.jsx)(P.Form.Dropdown.Item,{title:"Unassigned",value:"",icon:P.Icon.Person}),v?.map(g=>(0,T.jsx)(P.Form.Dropdown.Item,{title:g.name,value:g.id,icon:X(g)},g.id))]}),(0,T.jsx)(P.Form.TagPicker,{title:"Labels",...k.labelIds,placeholder:"Add label",children:Je?H.map(({id:g,name:te,color:ye})=>(0,T.jsx)(P.Form.TagPicker.Item,{title:te,value:g,icon:{source:P.Icon.Dot,tintColor:ye}},g)):null}),j?(0,T.jsxs)(P.Form.Dropdown,{title:"Estimate",...k.estimate,children:[(0,T.jsx)(P.Form.Dropdown.Item,{title:"No estimate",value:"",icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}}),j.map(({estimate:g,label:te})=>(0,T.jsx)(P.Form.Dropdown.Item,{title:te,value:String(g),icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}},g))]}):null,(0,T.jsx)(P.Form.DatePicker,{title:"Due Date",type:P.Form.DatePicker.Type.Date,...k.dueDate}),J||q||ht?(0,T.jsx)(P.Form.Separator,{}):null,J?(0,T.jsxs)(P.Form.Dropdown,{title:"Cycle",...k.cycleId,children:[(0,T.jsx)(P.Form.Dropdown.Item,{title:"No Cycle",value:"",icon:{source:{light:"light/no-cycle.svg",dark:"dark/no-cycle.svg"}}}),we(Y).map(g=>(0,T.jsx)(P.Form.Dropdown.Item,{title:g.title,value:g.id,icon:{source:g.icon}},g.id))]}):null,q?(0,T.jsxs)(P.Form.Dropdown,{title:"Project",...k.projectId,children:[(0,T.jsx)(P.Form.Dropdown.Item,{title:"No Project",value:"",icon:{source:{light:"light/no-project.svg",dark:"dark/no-project.svg"}}}),se.map(g=>(0,T.jsx)(P.Form.Dropdown.Item,{title:`${g.name} (${g.status.name})`,value:g.id,icon:fe(g)},g.id))]}):null,G?(0,T.jsxs)(P.Form.Dropdown,{title:"Milestone",storeValue:!0,...k.milestoneId,children:[(0,T.jsx)(P.Form.Dropdown.Item,{title:"No Milestone",value:"",icon:{source:"linear-icons/no-milestone.svg"}}),h.map(g=>(0,T.jsx)(P.Form.Dropdown.Item,{title:`${g.name}  (${g.targetDate||"No Target Date"})`,value:g.id,icon:Ae(g)},g.id))]}):null,ht?(0,T.jsxs)(P.Form.Dropdown,{title:"Parent",...k.parentId,children:[(0,T.jsx)(P.Form.Dropdown.Item,{title:"No Issue",value:"",icon:{source:{light:"light/backlog.svg",dark:"dark/backlog.svg"}}}),me.map(g=>(0,T.jsx)(P.Form.Dropdown.Item,{title:`${g.identifier} - ${g.title}`,value:g.id,icon:K(g.state)},g.id))]}):null]})}var oe=require("@raycast/api"),ts=require("date-fns");var W=require("@raycast/api"),es=require("@raycast/utils");var Yi=require("fs/promises"),Qt=et(require("path"));var ir="application/octet-stream",sr={".apng":"image/apng",".avif":"image/avif",".bmp":"image/bmp",".csv":"text/csv",".doc":"application/msword",".docx":"application/vnd.openxmlformats-officedocument.wordprocessingml.document",".gif":"image/gif",".gz":"application/gzip",".heic":"image/heic",".heif":"image/heif",".ico":"image/x-icon",".jpeg":"image/jpeg",".jpg":"image/jpeg",".json":"application/json",".md":"text/markdown",".mov":"video/quicktime",".mp3":"audio/mpeg",".mp4":"video/mp4",".pdf":"application/pdf",".png":"image/png",".ppt":"application/vnd.ms-powerpoint",".pptx":"application/vnd.openxmlformats-officedocument.presentationml.presentation",".svg":"image/svg+xml",".tar":"application/x-tar",".tif":"image/tiff",".tiff":"image/tiff",".txt":"text/plain",".webm":"video/webm",".webp":"image/webp",".xls":"application/vnd.ms-excel",".xlsx":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",".zip":"application/zip"};function rr(e){return sr[Qt.default.extname(e).toLowerCase()]??ir}async function or(e){let{graphQLClient:t}=b(),i=await(0,Yi.readFile)(e),r=rr(e),s=Qt.default.basename(e),{data:l}=await t.rawRequest(`
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
    `,{size:i.byteLength,contentType:r,filename:s}),c=l?.fileUpload.uploadFile;if(!l?.fileUpload.success||!c)throw new Error(`Failed to request an upload URL for "${s}"`);let n=new Headers({"Content-Type":r,"Cache-Control":"public, max-age=31536000"});c.headers.forEach(({key:u,value:d})=>n.set(u,d));let o=await fetch(c.uploadUrl,{method:"PUT",headers:n,body:i});if(!o.ok)throw new Error(`Failed to upload "${s}": ${o.status} ${o.statusText}`);return{assetUrl:c.assetUrl,contentType:r,name:s}}async function Tt(e){let{linearClient:t}=b(),i=await or(e.url),r=await t.createAttachment({issueId:e.issueId,title:i.name,url:i.assetUrl});return{success:r.success,id:r.attachmentId}}async function Rt(e){let{linearClient:t}=b(),i=await t.attachmentLinkURL(e.issueId,e.url);return{success:i.success,id:i.attachmentId}}function $t(e){let t=e.split(`
`),i=/https?:\/\/\S+/,r=t.map(s=>s.trim()).filter(s=>i.test(s));return Array.from(new Set(r))}var Le=require("react/jsx-runtime");function Dt({issue:{id:e,title:t,identifier:i}}){let{pop:r}=(0,W.useNavigation)(),{reset:s,itemProps:l,handleSubmit:c}=(0,es.useForm)({onSubmit:async n=>{let o=await(0,W.showToast)({style:W.Toast.Style.Animated,title:"Attaching links"}),u=$t(n.links);if(u.length===0&&n.attachments.length===0){o.style=W.Toast.Style.Failure,o.title="No links or attachments provided";return}if(u.length>0){let d=u.length===1?"link":"links";try{await Promise.all(u.map(A=>Rt({issueId:e,url:A}))),o.style=W.Toast.Style.Success,o.title=`Successfully attached ${d}`}catch(A){o.style=W.Toast.Style.Failure,o.title=`Failed attaching ${d}`,o.message=M(A)}}if(n.attachments.length>0){let d=n.attachments.length===1?"attachment":"attachments";try{o.style=W.Toast.Style.Animated,o.title=`Uploading ${d}\u2026`,await Promise.all(n.attachments.map(A=>Tt({issueId:e,url:A}))),o.style=W.Toast.Style.Success,o.title=`Successfully uploaded ${d}`}catch(A){o.style=W.Toast.Style.Failure,o.title=`Failed uploading ${d}`,o.message=M(A)}}s({attachments:[],links:""}),r()},initialValues:{links:""}});return(0,Le.jsxs)(W.Form,{actions:(0,Le.jsx)(W.ActionPanel,{children:(0,Le.jsx)(W.Action.SubmitForm,{onSubmit:c,icon:W.Icon.NewDocument,title:"Attach"})}),navigationTitle:"Add Attachments and Links",children:[(0,Le.jsx)(W.Form.Description,{title:"Issue",text:`[${i}] ${t}`}),(0,Le.jsx)(W.Form.FilePicker,{title:"Attachment",...l.attachments}),(0,Le.jsx)(W.Form.TextArea,{title:"Links",placeholder:`https://a.com
https://b.com
New link(s) on separate line(s)`,...l.links})]})}var Te=require("react/jsx-runtime");function zt({attachments:e,issue:t}){return(0,Te.jsx)(oe.List,{navigationTitle:`Links for ${t.identifier}`,children:e.map(i=>{let r=new Date(i.updatedAt);return(0,Te.jsx)(oe.List.Item,{icon:i.source?.imageUrl??oe.Icon.Link,title:i.title,subtitle:i.subtitle,accessories:[{date:r,tooltip:`Updated: ${(0,ts.format)(r,"EEEE d MMMM yyyy 'at' HH:mm")}`}],actions:(0,Te.jsxs)(oe.ActionPanel,{children:[(0,Te.jsx)(oe.Action.OpenInBrowser,{url:i.url}),(0,Te.jsx)(oe.Action.Push,{title:"Add Attachments and Links",icon:oe.Icon.NewDocument,target:(0,Te.jsx)(Dt,{issue:t})})]})},i.id)})})}var z=require("@raycast/api"),is=require("react");var It=require("react/jsx-runtime");function ze({comment:e,issue:t,mutateComments:i}){let{linearClient:r}=b(),{pop:s}=(0,z.useNavigation)(),[l,c]=(0,is.useState)(e?e.body:"");async function n(){await(0,z.showToast)({style:z.Toast.Style.Animated,title:`${e?"Updating":"Adding"} comment`});try{e?await r.updateComment(e.id,{body:l}):await r.createComment({body:l,issueId:t.id}),await(0,z.showToast)({style:z.Toast.Style.Success,title:`${e?"Updated":"Added"} comment`}),s(),i&&i()}catch(o){(0,z.showToast)({style:z.Toast.Style.Failure,title:`Failed to ${e?"update":"add"} comment`,message:M(o)})}}return(0,It.jsx)(z.Form,{actions:(0,It.jsx)(z.ActionPanel,{children:(0,It.jsx)(z.Action.SubmitForm,{title:e?"Edit Comment":"Add Comment",onSubmit:n,icon:e?z.Icon.Pencil:z.Icon.Plus})}),children:(0,It.jsx)(z.Form.TextArea,{id:"comment",title:"Comment",placeholder:"Leave a comment",value:l,onChange:c})})}var C=require("@raycast/api"),as=require("date-fns"),ls=et(require("remove-markdown"));var ss=require("@raycast/utils");function Gt(e){let{data:t,error:i,isLoading:r,mutate:s}=(0,ss.useCachedPromise)(Di,[e]);return{comments:t,commentsError:i,isLoadingComments:r,mutateComments:s}}var rs=require("@raycast/utils");function Ge(){let{linearClient:e}=b(),{data:t,error:i,isLoading:r}=(0,rs.useCachedPromise)(()=>e.viewer);return{me:t,meError:i,isLoadingMe:!t&&!i||r}}var Ht=require("@raycast/api");var os=require("@raycast/api"),_t=!1;async function ns(){_t=!!(await(0,os.getApplications)()).find(i=>i.bundleId==="com.linear")}var Kt=require("react/jsx-runtime");function Ie({title:e,url:t,...i}){return _t?(0,Kt.jsx)(Ht.Action.Open,{title:`${e||"Open"} in Linear`,icon:"linear-app-icon.png",target:t,application:"Linear",...i}):(0,Kt.jsx)(Ht.Action.OpenInBrowser,{url:t,title:`${e||"Open"} in Browser`})}var B=require("react/jsx-runtime");function Zt({issue:e}){let{linearClient:t}=b(),{me:i,isLoadingMe:r}=Ge(),{comments:s,isLoadingComments:l,mutateComments:c}=Gt(e.id);async function n(o){if(await(0,C.confirmAlert)({title:"Delete Comment",message:"Are you sure you want to delete this comment?",icon:{source:C.Icon.Trash,tintColor:C.Color.Red}}))try{await(0,C.showToast)({style:C.Toast.Style.Animated,title:"Deleting comment"}),await c(t.deleteComment(o),{optimisticUpdate(u){return u&&u?.filter(d=>d.id!==o)}}),await(0,C.showToast)({style:C.Toast.Style.Success,title:"Deleted comment"})}catch(u){(0,C.showToast)({style:C.Toast.Style.Failure,title:"Failed to delete comment",message:M(u)})}}return(0,B.jsxs)(C.List,{isLoading:l||r,navigationTitle:`${e.identifier} \u2022 Comments`,searchBarPlaceholder:"Filter by user or comment content",isShowingDetail:!0,children:[(0,B.jsx)(C.List.EmptyView,{title:"No comments",description:"This issue doesn't have any comments.",actions:(0,B.jsx)(C.ActionPanel,{children:(0,B.jsx)(C.Action.Push,{title:"Add Comment",icon:C.Icon.Plus,target:(0,B.jsx)(ze,{issue:e,mutateComments:c})})})}),s?.map(o=>{let u=new Date(o.createdAt);return(0,B.jsx)(C.List.Item,{title:o.user.displayName,subtitle:o.body,icon:X(o.user),keywords:(0,ls.default)(o.body).replace(/\n/g," ").split(" "),accessories:[{date:u,tooltip:`Created: ${(0,as.format)(u,"EEEE d MMMM yyyy 'at' HH:mm")}`}],detail:(0,B.jsx)(C.List.Item.Detail,{markdown:o.body}),actions:(0,B.jsxs)(C.ActionPanel,{children:[(0,B.jsx)(Ie,{title:"Open Comment",url:o.url}),i?.id===o.user.id?(0,B.jsxs)(C.ActionPanel.Section,{children:[(0,B.jsx)(C.Action.Push,{title:"Edit Comment",icon:C.Icon.Pencil,shortcut:C.Keyboard.Shortcut.Common.Edit,target:(0,B.jsx)(ze,{issue:e,comment:o,mutateComments:c})}),(0,B.jsx)(C.Action,{title:"Delete Comment",icon:C.Icon.Trash,style:C.Action.Style.Destructive,shortcut:C.Keyboard.Shortcut.Common.Remove,onAction:()=>n(o.id)})]}):null,(0,B.jsx)(C.ActionPanel.Section,{children:(0,B.jsx)(C.Action.Push,{title:"Add Comment",icon:C.Icon.Plus,shortcut:{macOS:{modifiers:["cmd","shift"],key:"n"},Windows:{modifiers:["ctrl","shift"],key:"n"}},target:(0,B.jsx)(ze,{issue:e,mutateComments:c})})}),(0,B.jsxs)(C.ActionPanel.Section,{children:[(0,B.jsx)(C.Action.CopyToClipboard,{icon:C.Icon.Clipboard,content:o.url,title:"Copy Comment URL",shortcut:C.Keyboard.Shortcut.Common.CopyPath}),(0,B.jsx)(C.Action.CopyToClipboard,{icon:C.Icon.Clipboard,content:o.body,title:"Copy Comment",shortcut:{macOS:{modifiers:["cmd","shift"],key:"'"},Windows:{modifiers:["ctrl","shift"],key:"'"}}})]}),(0,B.jsx)(C.ActionPanel.Section,{children:(0,B.jsx)(C.Action,{title:"Refresh",icon:C.Icon.ArrowClockwise,shortcut:C.Keyboard.Shortcut.Common.Refresh,onAction:c})})]})},o.id)})]})}var Ke=require("@raycast/api");var cs=require("@raycast/utils");function yt(){let{linearClient:e}=b(),{data:t,error:i,isLoading:r}=(0,cs.useCachedPromise)(()=>e.issuePriorityValues,[],{initialData:[]});return{priorities:t,prioritiesError:i,isLoadingPriorities:!t&&!i||r}}var a=require("@raycast/api"),_e=require("@raycast/utils"),Re=require("react");function Xt(e={}){return{title:"",description:"",stateId:"",priority:"",assigneeId:"",labelIds:[],estimate:"",dueDate:null,cycleId:"",projectId:"",milestoneId:"",...e}}function nr(e){if(typeof e=="string")try{let t=JSON.parse(e);return typeof t=="object"&&t!==null?t:{}}catch{return{}}return typeof e=="object"&&e!==null?e:{}}function Se(e){return typeof e=="string"?e:void 0}function us(e){return typeof e=="number"?String(e):Se(e)}function ds(e){if(!Array.isArray(e))return;let t=e.filter(i=>typeof i=="string");return t.length>0?t:void 0}function ar(e){if(typeof e!="string")return;let t=new Date(e);return Number.isNaN(t.getTime())?void 0:t}function ms(e,t={}){let i=nr(e.templateData),r=Xt(t),s=ds(i.labelIds)??ds(i.labels);return{title:Se(i.title)??r.title,description:Se(i.description)??Se(e.description)??r.description,stateId:Se(i.stateId)??Se(i.statusId)??r.stateId,priority:us(i.priority)??r.priority,assigneeId:Se(i.assigneeId)??r.assigneeId,labelIds:s??r.labelIds,estimate:us(i.estimate)??r.estimate,dueDate:i.dueDate!==void 0?ar(i.dueDate)??null:r.dueDate,cycleId:Se(i.cycleId)??r.cycleId,projectId:Se(i.projectId)??r.projectId,milestoneId:r.milestoneId}}var fs=require("@raycast/utils");var ps=`
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
`;function lr(e,t){let i=e.type.toLowerCase()==="issue",r=!e.team||e.team.id===t;return i&&!e.archivedAt&&r}function cr(e,t){return(e.sortOrder??0)-(t.sortOrder??0)||e.name.localeCompare(t.name)}async function gs(e){if(!e)return[];let{graphQLClient:t}=b(),{data:i}=await t.rawRequest(`
      query IssueTemplates($teamId: String!, $first: Int) {
        organization {
          templates(first: $first) {
            nodes {
              ${ps}
            }
          }
        }
        team(id: $teamId) {
          templates(first: $first) {
            nodes {
              ${ps}
            }
          }
        }
      }
    `,{teamId:e,first:100});return[...i?.organization?.templates?.nodes??[],...i?.team?.templates?.nodes??[]].filter((s,l,c)=>c.findIndex(n=>n.id===s.id)===l).filter(s=>lr(s,e)).sort(cr)}function Jt(e,t){let{data:i,error:r,isLoading:s}=(0,fs.useCachedPromise)(gs,[e],{execute:t?.execute!==!1&&!!e});return{issueTemplates:i,issueTemplatesError:r,isLoadingIssueTemplates:!i&&!r||s}}var y=require("react/jsx-runtime");function ur(e,t){return e==="url"?{title:"Copy Issue URL",onAction:()=>a.Clipboard.copy(t.url)}:e==="id-as-link"?{title:"Copy Issue ID as Link",onAction:()=>a.Clipboard.copy({text:`[${t.identifier}](${t.url})`,html:`<a href="${t.url}">${t.identifier}</a>`})}:e==="title"?{title:"Copy Issue Title",onAction:()=>a.Clipboard.copy(t.title)}:e==="title-as-link"?{title:"Copy Issue Title as Link",onAction:()=>a.Clipboard.copy({text:`[${t.title}](${t.url})`,html:`<a href="${t.url}">${t.title}</a>`})}:{title:"Copy Issue ID",onAction:()=>a.Clipboard.copy(t.identifier)}}function Yt(e){let{push:t}=(0,a.useNavigation)(),{autofocusField:i,copyToastAction:r}=(0,a.getPreferenceValues)(),[s,l]=(0,Re.useState)(""),{teams:c,org:n,supportsTeamTypeahead:o,isLoadingTeams:u}=gt(s),d=c&&c.length>1,[A,U]=(0,Re.useState)(""),{users:w,supportsUserTypeahead:v,isLoadingUsers:R}=Ne(A),{handleSubmit:x,itemProps:p,values:k,setValue:S,focus:F,reset:de,setValidationError:ie}=(0,_e.useForm)({async onSubmit(m){let E=await(0,a.showToast)({style:a.Toast.Style.Animated,title:"Creating issue"}),Ce=d?m.teamId:c?.[0]?.id;if(!Ce)return ie("teamId","The team is required."),!1;try{let Z={teamId:Ce,title:m.title,description:m.description||"",stateId:m.stateId,labelIds:m.labelIds,dueDate:m.dueDate,...q&&m.estimate?{estimate:parseInt(m.estimate)}:{},...m.assigneeId?{assigneeId:m.assigneeId}:{},...m.cycleId?{cycleId:m.cycleId}:{},...m.projectId?{projectId:m.projectId}:{},...m.milestoneId?{projectMilestoneId:m.milestoneId}:{},...m.parentId?{parentId:m.parentId}:{},priority:parseInt(m.priority)},{success:Ft,issue:Ye}=await Mi(Z);if(Ft&&Ye){E.style=a.Toast.Style.Success,E.title=`Created Issue \u2022 ${Ye?.identifier}`,E.primaryAction={title:"Open Issue",shortcut:a.Keyboard.Shortcut.Common.OpenWith,onAction:async()=>{t((0,y.jsx)(He,{issue:Ye,priorities:e.priorities,me:e.me})),await E.hide()}},E.secondaryAction={shortcut:a.Keyboard.Shortcut.Common.Copy,...ur(r,Ye)},de({templateId:"",title:"",description:"",estimate:"",labelIds:[],dueDate:null,parentId:"",attachments:[],links:""}),F(d&&i?i:"title");let Nt=$t(m.links);if(Nt.length>0){let je=Nt.length===1?"link":"links";try{E.message=`Attaching ${je}\u2026`,await Promise.all(Nt.map(Me=>Rt({issueId:Ye.id,url:Me}))),E.message=`Successfully attached ${je}`}catch(Me){E.style=a.Toast.Style.Failure,E.title=`Failed attaching ${je}`,E.message=M(Me)}}if(m.attachments.length>0){let je=m.attachments.length===1?"attachment":"attachments";try{E.message=`Uploading ${je}\u2026`,await Promise.all(m.attachments.map(Me=>Tt({issueId:Ye.id,url:Me}))),E.message=`Successfully uploaded ${je}`}catch(Me){E.style=a.Toast.Style.Failure,E.title=`Failed uploading ${je}`,E.message=M(Me)}}}}catch(Z){E.style=a.Toast.Style.Failure,E.title="Failed to create issue",E.message=M(Z)}S("teamId",Ce)},validation:{teamId:d?_e.FormValidation.Required:void 0,title:_e.FormValidation.Required,stateId:_e.FormValidation.Required,priority:_e.FormValidation.Required},initialValues:{templateId:e.draftValues?.templateId||"",teamId:e.draftValues?.teamId||e.teamId,title:e.draftValues?.title,description:e.draftValues?.description,priority:e.draftValues?.priority,stateId:e.draftValues?.stateId,estimate:e.draftValues?.estimate,assigneeId:e.draftValues?.assigneeId||e.assigneeId,labelIds:e.draftValues?.labelIds||[],dueDate:e.draftValues?.dueDate,cycleId:e.draftValues?.cycleId||e.cycleId,projectId:e.draftValues?.projectId||e.projectId,milestoneId:e.draftValues?.milestoneId||e.milestoneId,parentId:e.draftValues?.parentId||e.parentId,links:e.draftValues?.links||""}}),H=!!k.teamId&&k.teamId.trim().length>0,{issueTemplates:Y,isLoadingIssueTemplates:me}=Jt(k.teamId,{execute:H}),{states:se}=he(k.teamId,{execute:H}),{labels:h}=qe(k.teamId,{execute:H}),{cycles:$}=Ve(k.teamId,{execute:H}),{issues:j}=ke(rt,[],{execute:H}),{projects:ee}=Be(k.teamId,{execute:H}),{milestones:xe}=We(k.projectId,{execute:!!k.projectId});(0,Re.useEffect)(()=>{c?.length===1&&S("teamId",c[0].id)},[c]);let Xe=(0,Re.useRef)(!1);(0,Re.useEffect)(()=>{if(!Xe.current){Xe.current=!0;return}Je("")},[k.teamId]);function Je(m){S("templateId",m);let E=Y?.find(Ft=>Ft.id===m),Ce={assigneeId:e.assigneeId||"",cycleId:e.cycleId||"",projectId:e.projectId||"",milestoneId:e.milestoneId||""},Z=E?ms(E,Ce):Xt(Ce);S("title",Z.title),S("description",Z.description),S("stateId",Z.stateId),S("priority",Z.priority),S("assigneeId",Z.assigneeId),S("labelIds",Z.labelIds),S("estimate",Z.estimate),S("dueDate",Z.dueDate),S("cycleId",Z.cycleId),S("projectId",Z.projectId),S("milestoneId",Z.milestoneId??"")}let J=c?.find(m=>m.id===k.teamId),q=J?it({issueEstimationType:J.issueEstimationType,issueEstimationAllowZero:J.issueEstimationAllowZero,issueEstimationExtended:J.issueEstimationExtended}):null,G=st(se||[]),ht=se&&se.length>0,g=e.priorities&&e.priorities.length>0,te=h&&h.length>0,ye=$&&$.length>0,mt=ee&&ee.length>0,pi=xe&&xe.length>0,Et=j&&j.length>0,Ns=Y&&Y.length>0;return(0,y.jsxs)(a.Form,{enableDrafts:e.enableDrafts,actions:(0,y.jsxs)(a.ActionPanel,{children:[(0,y.jsx)(a.Action.SubmitForm,{icon:a.Icon.Plus,onSubmit:x,title:"Create Issue"}),(0,y.jsxs)(a.ActionPanel.Section,{children:[(0,y.jsx)(a.Action,{title:"Focus Title",icon:a.Icon.TextInput,onAction:()=>F("title"),shortcut:a.Keyboard.Shortcut.Common.Edit}),(0,y.jsx)(a.Action,{title:"Focus Description",icon:a.Icon.TextInput,onAction:()=>F("description"),shortcut:{modifiers:["ctrl"],key:"e"}}),(0,y.jsx)(a.Action,{title:"Focus Status",icon:a.Icon.Circle,onAction:()=>F("stateId"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"s"},Windows:{modifiers:["ctrl","shift"],key:"s"}}}),(0,y.jsx)(a.Action,{title:"Focus Priority",icon:a.Icon.LevelMeter,onAction:()=>F("priority"),shortcut:a.Keyboard.Shortcut.Common.Pin}),(0,y.jsx)(a.Action,{title:"Focus Assignee",icon:a.Icon.AddPerson,onAction:()=>F("assigneeId"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"a"},Windows:{modifiers:["ctrl","shift"],key:"a"}}}),q?(0,y.jsx)(a.Action,{title:"Focus Estimate",icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}},onAction:()=>F("estimate"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"e"},Windows:{modifiers:["ctrl","shift"],key:"e"}}}):null,(0,y.jsx)(a.Action,{title:"Focus Due Date",icon:a.Icon.Calendar,onAction:()=>F("dueDate"),shortcut:{macOS:{modifiers:["opt","shift"],key:"d"},Windows:{modifiers:["alt","shift"],key:"d"}}}),(0,y.jsx)(a.Action,{title:"Focus Labels",icon:a.Icon.Tag,onAction:()=>F("labelIds"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"l"},Windows:{modifiers:["ctrl","shift"],key:"l"}}}),ye?(0,y.jsx)(a.Action,{title:"Focus Cycle",icon:{source:{light:"light/cycle.svg",dark:"dark/cycle.svg"}},onAction:()=>F("cycleId"),shortcut:a.Keyboard.Shortcut.Common.Copy}):null,mt?(0,y.jsx)(a.Action,{title:"Focus Project",icon:{source:{light:"light/project.svg",dark:"dark/project.svg"}},onAction:()=>F("projectId"),shortcut:{modifiers:["ctrl","shift"],key:"p"}}):null,pi?(0,y.jsx)(a.Action,{title:"Focus Milestone",icon:{source:{light:"light/milestone.svg",dark:"dark/milestone.svg"}},onAction:()=>F("milestoneId"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"m"},Windows:{modifiers:["ctrl","shift"],key:"m"}}}):null,Et?(0,y.jsx)(a.Action,{title:"Focus Parent Issue",icon:{source:{light:"light/backlog.svg",dark:"dark/backlog.svg"}},onAction:()=>F("parentId"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"i"},Windows:{modifiers:["ctrl","shift"],key:"i"}}}):null,(0,y.jsx)(a.Action,{title:"Focus Attachments",icon:a.Icon.NewDocument,onAction:()=>F("attachments"),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"a"},Windows:{modifiers:["ctrl","alt","shift"],key:"a"}}}),(0,y.jsx)(a.Action,{title:"Focus Links",icon:a.Icon.Link,onAction:()=>F("links"),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"l"},Windows:{modifiers:["ctrl","alt","shift"],key:"l"}}})]})]}),isLoading:u||R||e.isLoading,children:[(o||d)&&(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(a.Form.Dropdown,{title:"Team",storeValue:!0,...p.teamId,...o&&{onSearchTextChange:l,isLoading:u,throttle:!0},children:c?.map(m=>(0,y.jsx)(a.Form.Dropdown.Item,{title:m.name,value:m.id,icon:Lt(m,n)},m.id))}),(0,y.jsx)(a.Form.Separator,{})]}),H&&(me||Ns)?(0,y.jsxs)(y.Fragment,{children:[(0,y.jsxs)(a.Form.Dropdown,{id:"templateId",title:"Template",value:k.templateId||"",onChange:Je,isLoading:me,children:[(0,y.jsx)(a.Form.Dropdown.Item,{title:"No Template",value:"",icon:a.Icon.Document}),Y?.map(m=>(0,y.jsx)(a.Form.Dropdown.Item,{title:m.name,value:m.id,icon:a.Icon.Document},m.id))]}),(0,y.jsx)(a.Form.Separator,{})]}):null,(0,y.jsx)(a.Form.TextField,{title:"Title",placeholder:"Issue title",...i==="title"?{autoFocus:!0}:{},...p.title}),(0,y.jsx)(a.Form.TextArea,{title:"Description",placeholder:"Add some details (supports Markdown, e.g. **bold**)",enableMarkdown:!0,...p.description}),(0,y.jsx)(a.Form.Dropdown,{title:"Status",storeValue:!0,...p.stateId,children:ht?G.map(m=>(0,y.jsx)(a.Form.Dropdown.Item,{title:m.name,value:m.id,icon:K(m)},m.id)):null}),(0,y.jsx)(a.Form.Dropdown,{title:"Priority",storeValue:!0,...p.priority,children:g?e.priorities?.map(({priority:m,label:E})=>(0,y.jsx)(a.Form.Dropdown.Item,{title:E,value:String(m),icon:{source:ge[m]}},m)):null}),(0,y.jsxs)(a.Form.Dropdown,{title:"Assignee",storeValue:!0,...p.assigneeId,...v&&{onSearchTextChange:U,isLoading:R,throttle:!0},children:[(0,y.jsx)(a.Form.Dropdown.Item,{title:"Unassigned",value:"",icon:a.Icon.Person}),w?.map(m=>(0,y.jsx)(a.Form.Dropdown.Item,{title:m.name,value:m.id,icon:X(m)},m.id))]}),(0,y.jsx)(a.Form.TagPicker,{title:"Labels",placeholder:"Add label",...p.labelIds,children:te?h.map(({id:m,name:E,color:Ce})=>(0,y.jsx)(a.Form.TagPicker.Item,{title:E,value:m,icon:{source:a.Icon.Dot,tintColor:Ce}},m)):null}),q?(0,y.jsxs)(a.Form.Dropdown,{title:"Estimate",...p.estimate,children:[(0,y.jsx)(a.Form.Dropdown.Item,{title:"No estimate",value:"",icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}}),q.map(({estimate:m,label:E})=>(0,y.jsx)(a.Form.Dropdown.Item,{title:E,value:String(m),icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}},m))]}):null,(0,y.jsx)(a.Form.DatePicker,{title:"Due Date",type:a.Form.DatePicker.Type.Date,...p.dueDate}),ye||mt||Et?(0,y.jsx)(a.Form.Separator,{}):null,ye?(0,y.jsxs)(a.Form.Dropdown,{title:"Cycle",storeValue:!0,...p.cycleId,children:[(0,y.jsx)(a.Form.Dropdown.Item,{title:"No Cycle",value:"",icon:{source:{light:"light/no-cycle.svg",dark:"dark/no-cycle.svg"}}}),we($).map(m=>(0,y.jsx)(a.Form.Dropdown.Item,{title:m.title,value:m.id,icon:{source:m.icon}},m.id))]}):null,mt?(0,y.jsxs)(a.Form.Dropdown,{title:"Project",storeValue:!0,...p.projectId,children:[(0,y.jsx)(a.Form.Dropdown.Item,{title:"No Project",value:"",icon:{source:{light:"light/no-project.svg",dark:"dark/no-project.svg"}}}),ee.map(m=>(0,y.jsx)(a.Form.Dropdown.Item,{title:`${m.name} (${m.status.name})`,value:m.id,icon:fe(m)},m.id))]}):null,pi?(0,y.jsxs)(a.Form.Dropdown,{title:"Milestone",storeValue:!0,...p.milestoneId,children:[(0,y.jsx)(a.Form.Dropdown.Item,{title:"No Milestone",value:"",icon:{source:"linear-icons/no-milestone.svg"}}),xe.map(m=>(0,y.jsx)(a.Form.Dropdown.Item,{title:`${m.name} (${m.targetDate||"No Target Date"})`,value:m.id,icon:Ae(m)},m.id))]}):null,Et?(0,y.jsxs)(a.Form.Dropdown,{title:"Parent",...p.parentId,children:[(0,y.jsx)(a.Form.Dropdown.Item,{title:"No Issue",value:"",icon:{source:{light:"light/backlog.svg",dark:"dark/backlog.svg"}}}),j.map(m=>(0,y.jsx)(a.Form.Dropdown.Item,{title:`${m.identifier} - ${m.title}`,value:m.id,icon:K(m.state)},m.id))]}):null,(0,y.jsx)(a.Form.Separator,{}),(0,y.jsx)(a.Form.FilePicker,{title:"Attachment",...p.attachments}),(0,y.jsx)(a.Form.TextArea,{title:"Links",placeholder:`https://a.com
https://b.com
New link(s) on separate line(s)`,...p.links})]})}var ne=require("@raycast/api"),vt=require("date-fns");var $e=require("react/jsx-runtime");function ei({issue:e,mutateList:t,mutateSubIssues:i,priorities:r,me:s}){let{primaryAction:l}=(0,ne.getPreferenceValues)(),c=[e.identifier,e.state.name,e.priorityLabel];e.assignee&&c.push(e.assignee.email,e.assignee.displayName);let n=new Date(e.updatedAt),o=e.dueDate?new Date(e.dueDate):null,u=e.estimate?{icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}},text:Ct({estimate:e.estimate,issueEstimationType:e.team.issueEstimationType})}:null,d=e.cycle?Ue(e.cycle):null,A=e.project||null,U=e.labels.nodes.length>0,w=[{date:n,tooltip:`Updated: ${(0,vt.format)(n,"EEEE d MMMM yyyy 'at' HH:mm")}`},{icon:o?Pt(o):void 0,text:o?(0,vt.format)(o,"MMM dd"):void 0,tooltip:o?`Due date: ${(0,vt.format)(o,"MM/dd/yyyy")}`:void 0},{icon:U?ne.Icon.Tag:void 0,text:U?String(e.labels.nodes.length):void 0,tooltip:U?e.labels.nodes.map(R=>R.name).join(", "):void 0},{icon:A?fe(A):void 0,tooltip:`Project: ${A?A.name:void 0}`},{icon:d?{source:d.icon}:void 0,text:d?String(d.number):void 0,tooltip:d?`Cycle: ${d.title}`:void 0},{icon:u?u.icon:void 0,text:u?u.text:void 0},{icon:K(e.state),tooltip:`Status: ${e.state.name}`},{icon:X(e.assignee),tooltip:e.assignee?`Assignee: ${e.assignee?.displayName} (${e.assignee?.email})`:"Unassigned"}],v=l==="openInLinear";return(0,$e.jsx)(ne.List.Item,{title:e.title,icon:{value:{source:ge[e.priority]},tooltip:`Priority: ${e.priorityLabel}`},subtitle:e.identifier,keywords:c,accessories:w,actions:(0,$e.jsxs)(ne.ActionPanel,{title:e.identifier,children:[v?(0,$e.jsx)(Ie,{title:"Open Issue",url:e.url}):null,(0,$e.jsx)(ne.Action.Push,{title:"Show Details",icon:ne.Icon.Sidebar,target:(0,$e.jsx)(He,{issue:e,mutateList:t,priorities:r,me:s})}),(0,$e.jsx)(ot,{issue:e,mutateList:t,mutateSubIssues:i,priorities:r,me:s,hideOpenInLinear:v})]})},e.id)}var De=require("react/jsx-runtime");function ti({issue:e,mutateList:t}){let{issues:i,isLoadingIssues:r,mutateList:s}=ke(u=>Ri(u),[e.id]),{priorities:l,isLoadingPriorities:c}=yt(),{me:n,isLoadingMe:o}=Ge();return(0,De.jsxs)(Ke.List,{isLoading:r||o||c||o,navigationTitle:`${e.identifier} \u2022 Sub-issues`,children:[(0,De.jsx)(Ke.List.EmptyView,{title:"No issues",description:"This issue doesn't have any sub-issues.",actions:(0,De.jsx)(Ke.ActionPanel,{children:(0,De.jsx)(Ke.Action.Push,{title:"Create Sub-Issue",target:(0,De.jsx)(Yt,{priorities:l,me:n,parentId:e.id,projectId:e.project?.id,cycleId:e.cycle?.id,teamId:e.team.id})})})}),i?.map(u=>(0,De.jsx)(ei,{issue:u,mutateList:t,mutateSubIssues:s,priorities:l,me:n},u.id))]})}var N=require("@raycast/api");function ys(e){let t=[`Work on Linear issue ${e.identifier}:`,""],i=dr(e.branchName);if(i&&t.push(`Suggested branch name: ${i}`,""),t.push(`<issue identifier="${xt(e.identifier)}">`),t.push(`<title>${e.title}</title>`),t.push(...hs(e.description)),e.team?.name&&t.push(`<team name="${xt(e.team.name)}"/>`),e.labels?.nodes?.forEach(s=>{t.push(`<label>${s.name}</label>`)}),e.project?.name){let s=xt(e.project.name);t.push(e.project.description?`<project name="${s}">${e.project.description}</project>`:`<project name="${s}"/>`)}e.parent&&t.push(...Is("parent-issue",e.parent));let r=e.children?.nodes??[];return r.length>0&&(t.push("<sub-issues>"),r.forEach(s=>t.push(...Is("sub-issue",s))),t.push("</sub-issues>")),t.push("</issue>"),t.join(`
`)}function Is(e,t){return[`<${e} identifier="${xt(t.identifier)}">`,`<id>${t.id}</id>`,`<title>${t.title}</title>`,...hs(t.description),`</${e}>`]}function hs(e){return e?e.includes(`
`)?["<description>",e,"</description>"]:[`<description>${e}</description>`]:[]}function dr(e){return e&&e.slice(e.lastIndexOf("/")+1)}function xt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}var ae=require("react/jsx-runtime"),mr={ISSUE_TITLE:"title",ISSUE_ID:"identifier",ISSUE_URL:"url",ISSUE_BRANCH_NAME:"branchName"};function pr(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function gr(e){return e.replace(/\[/g,"\\[").replace(/\]/g,"\\]")}function fr(e){return{html:`<a href="${e.url}">${pr(e.title)}</a>`,text:`[${gr(e.title)}](${e.url})`}}function ii({issue:e}){let{issueCustomCopyAction:t}=(0,N.getPreferenceValues)();async function i(){let r=await(0,N.showToast)({style:N.Toast.Style.Animated,title:"Copying prompt"});try{await N.Clipboard.copy(ys(await $i(e.id))),r.style=N.Toast.Style.Success,r.title="Copied prompt to clipboard"}catch(s){r.style=N.Toast.Style.Failure,r.title="Failed copying prompt",r.message=M(s)}}return(0,ae.jsxs)(N.ActionPanel.Section,{children:[(0,ae.jsx)(N.Action.CopyToClipboard,{content:e.identifier,title:"Copy Issue ID",shortcut:{macOS:{modifiers:["cmd"],key:"."},Windows:{modifiers:["ctrl"],key:"."}}}),(0,ae.jsx)(N.Action.CopyToClipboard,{content:{html:`<a href="${e.url}" title="${e.title}">${e.identifier}: ${e.title}</a>`,text:e.url},title:"Copy Formatted Issue URL",shortcut:N.Keyboard.Shortcut.Common.CopyPath}),(0,ae.jsx)(N.Action.CopyToClipboard,{content:e.url,title:"Copy Issue URL",shortcut:{macOS:{modifiers:["cmd","shift"],key:"u"},Windows:{modifiers:["ctrl","shift"],key:"u"}}}),(0,ae.jsx)(N.Action.CopyToClipboard,{content:e.title,title:"Copy Issue Title",shortcut:{macOS:{modifiers:["cmd","shift"],key:"'"},Windows:{modifiers:["ctrl","shift"],key:"'"}}}),(0,ae.jsx)(N.Action.CopyToClipboard,{content:fr(e),title:"Copy Title as Link",shortcut:{macOS:{modifiers:["cmd","shift"],key:"t"},Windows:{modifiers:["ctrl","shift"],key:"t"}}}),(0,ae.jsx)(N.Action.CopyToClipboard,{content:e.branchName,title:"Copy Git Branch Name",shortcut:N.Keyboard.Shortcut.Common.CopyName}),t&&t!==""?(0,ae.jsx)(N.Action.CopyToClipboard,{content:t?.replace(/\{(.*?)\}/g,(r,s)=>{let l=e[mr[s]];return l||r}),title:"Custom Copy",shortcut:{macOS:{modifiers:["cmd","opt"],key:"."},Windows:{modifiers:["ctrl","alt"],key:"."}}}):null,(0,ae.jsx)(N.Action,{icon:N.Icon.Clipboard,title:"Copy as Prompt",onAction:i,shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"p"},Windows:{modifiers:["ctrl","alt","shift"],key:"p"}}})]})}var le=require("@raycast/api"),ks=require("react");var ce=require("react/jsx-runtime");function si({issue:e,updateIssue:t}){let{linearClient:i}=b(),[r,s]=(0,ks.useState)(!1),{cycles:l,isLoadingCycles:c}=Ve(e.team.id,{execute:r}),n=e.cycle?Ue(e.cycle):null,o=n?.isActive||!1,u=n?.isNext||!1;async function d(w){let v=e.cycle;t({animatedTitle:"Moving to cycle",payload:{cycleId:w?.id||null},optimisticUpdate(R){return{...R,cycle:w||void 0}},rollbackUpdate(R){return{...R,cycle:v}},successTitle:w?"Moved to cycle":"Removed from cycle",successMessage:w?.title?w.title:"",errorTitle:"Failed to move to cycle"})}async function A(){let{nodes:w}=await i.cycles({filter:{team:{id:{eq:e.team.id}}}}),v=we(w||[]),R=v.findIndex(k=>k.isActive),p=(R>-1?v[R]:null)?v[R+1]:null;if(p)return d(p)}async function U(){let{nodes:w}=await i.cycles({filter:{team:{id:{eq:e.team.id}}}}),R=we(w||[]).find(x=>x.isActive);if(R)return d(R)}return(0,ce.jsxs)(ce.Fragment,{children:[(0,ce.jsxs)(le.ActionPanel.Submenu,{title:"Move to Cycle",icon:{source:{light:"light/cycle.svg",dark:"dark/cycle.svg"}},shortcut:le.Keyboard.Shortcut.Common.Copy,onOpen:()=>s(!0),children:[(0,ce.jsx)(le.Action,{title:"No Cycle",icon:{source:{light:"light/no-cycle.svg",dark:"dark/no-cycle.svg"}},onAction:()=>d(null)}),!l&&c?(0,ce.jsx)(le.Action,{title:"Loading\u2026"}):we(l||[]).map(w=>(0,ce.jsx)(le.Action,{autoFocus:w.id===n?.id,title:w.title,icon:{source:w.icon},onAction:()=>d(w)},w.id))]}),o?null:(0,ce.jsx)(le.Action,{title:"Move to Active Cycle",icon:{source:{light:"light/active-cycle.svg",dark:"dark/active-cycle.svg"}},shortcut:le.Keyboard.Shortcut.Common.Copy,onAction:()=>U()}),u?null:(0,ce.jsx)(le.Action,{title:"Move to Next Cycle",icon:{source:{light:"light/cycle.svg",dark:"dark/cycle.svg"}},shortcut:{macOS:{modifiers:["cmd","shift"],key:"n"},Windows:{modifiers:["ctrl","shift"],key:"n"}},onAction:()=>A()})]})}var ue=require("@raycast/api"),Ss=require("lodash"),bs=require("react");var be=require("react/jsx-runtime");function ri({issue:e,updateIssue:t}){let[i,r]=(0,bs.useState)(!1),{labels:s}=qe(e.team.id,{execute:i}),[,l]=(0,Ss.partition)(s||[],o=>e.labels.nodes.map(u=>u.id).includes(o.id));async function c(o){let u=e.labels.nodes.map(d=>d.id);t({animatedTitle:"Adding label",payload:{labelIds:[...u,o.id]},optimisticUpdate(d){return{...d,labels:{...d.labels,nodes:[...d.labels.nodes,o]}}},rollbackUpdate(d){return{...d,labels:{...d.labels,nodes:d.labels.nodes.filter(A=>A.id!==o.id)}}},successTitle:"Added label",successMessage:`Label "${o.name}" added to ${e.identifier}`,errorTitle:"Failed to add label"})}async function n(o){let u=e.labels.nodes.map(d=>d.id);t({animatedTitle:"Remove label",payload:{labelIds:u.filter(d=>d!==o.id)},optimisticUpdate(d){return{...d,labels:{...d.labels,nodes:d.labels.nodes.filter(A=>A.id!==o.id)}}},rollbackUpdate(d){return{...d,labels:{...d.labels,nodes:[...d.labels.nodes,o]}}},successTitle:"Removed label",successMessage:`Label "${o.name}" removed from ${e.identifier}`,errorTitle:"Failed to remove label"})}return(0,be.jsxs)(be.Fragment,{children:[(0,be.jsx)(ue.ActionPanel.Submenu,{title:"Add Label",icon:ue.Icon.Tag,shortcut:{macOS:{modifiers:["cmd","shift"],key:"l"},Windows:{modifiers:["ctrl","shift"],key:"l"}},onOpen:()=>r(!0),children:l.map(o=>(0,be.jsx)(ue.Action,{title:o.name,icon:{source:ue.Icon.Dot,tintColor:o.color},onAction:()=>c(o)},o.id))}),e.labels.nodes.length>0?(0,be.jsx)(ue.ActionPanel.Submenu,{title:"Remove Label",icon:ue.Icon.Tag,shortcut:{macOS:{modifiers:["cmd","shift"],key:"l"},Windows:{modifiers:["ctrl","shift"],key:"l"}},children:e.labels.nodes.map(o=>(0,be.jsx)(ue.Action,{title:o.name,icon:{source:ue.Icon.Dot,tintColor:o.color},onAction:()=>n(o)},o.id))}):null]})}var ve=require("@raycast/api"),Ps=require("react");var nt=require("react/jsx-runtime");function oi({issue:e,updateIssue:t}){let[i,r]=(0,Ps.useState)(!1),{milestones:s,isLoadingMilestones:l}=We(e.project?.id,{execute:i});async function c(n){let o=e.projectMilestone;t({animatedTitle:"Setting milestone",payload:{projectMilestoneId:n?n.id:null},optimisticUpdate(u){return{...u,milestone:n||void 0}},rollbackUpdate(u){return{...u,milestone:o}},successTitle:n?"Set milestone":`Removed milestone from ${e.identifier}`,successMessage:n?`"${n.name}" added to ${e.identifier}`:"",errorTitle:"Failed to set milestone"})}return(0,nt.jsxs)(ve.ActionPanel.Submenu,{title:"Set Milestone",icon:{source:"linear-icons/milestone.svg",tintColor:ve.Color.PrimaryText},shortcut:{modifiers:["ctrl","shift"],key:"m"},onOpen:()=>r(!0),children:[(0,nt.jsx)(ve.Action,{title:"No Milestone",icon:{source:"linear-icons/no-milestone.svg"},onAction:()=>c(null)}),!s&&l?(0,nt.jsx)(ve.Action,{title:"Loading\u2026"}):(s||[]).map(n=>(0,nt.jsx)(ve.Action,{autoFocus:n.id===e.projectMilestone?.id,title:`${n.name}  (${n.targetDate||"No Target Date"})`,icon:Ae(n),onAction:()=>c(n)},n.id))]})}var at=require("@raycast/api"),Cs=require("react");var Pe=require("react/jsx-runtime");function ni({issue:e,updateIssue:t}){let[i,r]=(0,Cs.useState)(!1),{issues:s,isLoadingIssues:l}=ke(rt,[],{execute:i}),c=e.parent,n=c?.id,o=!!n;async function u(d){t({animatedTitle:"Setting parent issue",payload:{parentId:d?d.id:null},optimisticUpdate(A){return{...A,parent:d||void 0}},rollbackUpdate(A){return{...A,parent:c}},successTitle:"Set parent issue",successMessage:d?`${d.identifier} set as parent issue`:`Removed parent issue from ${e.identifier}`,errorTitle:"Failed to set parent issue"})}return(0,Pe.jsxs)(Pe.Fragment,{children:[(0,Pe.jsx)(at.ActionPanel.Submenu,{title:o?"Change Parent Issue":"Set Parent Issue",icon:{source:{light:"light/parent-issue.svg",dark:"dark/parent-issue.svg"}},shortcut:{modifiers:["ctrl","shift"],key:"i"},onOpen:()=>r(!0),children:!s&&l?(0,Pe.jsx)(at.Action,{title:"Loading\u2026"}):(s||[]).map(d=>(0,Pe.jsx)(at.Action,{autoFocus:d.id===n,title:`${d.identifier} - ${d.title}`,icon:K(d.state),onAction:()=>u(d)},d.id))}),o?(0,Pe.jsx)(at.Action,{title:"Remove Parent Issue",icon:{source:{light:"light/parent-issue.svg",dark:"dark/parent-issue.svg"}},shortcut:{macOS:{modifiers:["cmd","shift"],key:"k"},Windows:{modifiers:["ctrl","shift"],key:"k"}},onAction:()=>u(null)}):null]})}var lt=require("@raycast/api"),ws=require("react");var ct=require("react/jsx-runtime");function ai({issue:e,updateIssue:t}){let[i,r]=(0,ws.useState)(!1),{projects:s,isLoadingProjects:l}=Be(e.team.id,{execute:i});async function c(n){let o=e.project;t({animatedTitle:"Setting project",payload:{projectId:n?n.id:null},optimisticUpdate(u){return{...u,project:n||void 0}},rollbackUpdate(u){return{...u,project:o}},successTitle:n?"Set project":`Removed project from ${e.identifier}`,successMessage:n?`"${n.name}" added to ${e.identifier}`:"",errorTitle:"Failed to set project"})}return(0,ct.jsxs)(lt.ActionPanel.Submenu,{title:"Set Project",icon:{source:{light:"light/project.svg",dark:"dark/project.svg"}},shortcut:{modifiers:["ctrl","shift"],key:"p"},onOpen:()=>r(!0),children:[(0,ct.jsx)(lt.Action,{title:"No Project",icon:{source:{light:"light/no-project.svg",dark:"dark/no-project.svg"}},onAction:()=>c(null)}),!s&&l?(0,ct.jsx)(lt.Action,{title:"Loading\u2026"}):(s||[]).map(n=>(0,ct.jsx)(lt.Action,{autoFocus:n.id===e.project?.id,title:`${n.name} (${n.status.name})`,icon:fe(n),onAction:()=>c(n)},n.id))]})}var Ze=require("@raycast/api"),As=require("react");var jt=require("react/jsx-runtime");function li({issue:e,updateIssue:t}){let[i,r]=(0,As.useState)(!1),{states:s,isLoadingStates:l}=he(e.team.id,{execute:i}),c=st(s||[]);async function n(o){let u=e.state;t({animatedTitle:"Setting status",payload:{stateId:o.id},optimisticUpdate(d){return{...d,state:o}},rollbackUpdate(d){return{...d,state:u}},successTitle:"Set status",successMessage:`${e.identifier} set to ${o.name}`,errorTitle:"Failed to set status"})}return(0,jt.jsx)(Ze.ActionPanel.Submenu,{icon:Ze.Icon.Circle,title:"Set Status",shortcut:{macOS:{modifiers:["cmd","shift"],key:"s"},Windows:{modifiers:["ctrl","shift"],key:"s"}},onOpen:()=>r(!0),children:c.length===0&&l?(0,jt.jsx)(Ze.Action,{title:"Loading\u2026"}):c.map(o=>(0,jt.jsx)(Ze.Action,{autoFocus:o.id===e.state.id,title:o.name,icon:K(o),onAction:()=>n(o)},o.id))})}var L=require("react/jsx-runtime");function ot({issue:e,mutateList:t,mutateSubIssues:i,mutateDetail:r,showAttachmentsAction:s,attachments:l,priorities:c,me:n,hideOpenInLinear:o}){let{pop:u}=(0,I.useNavigation)(),{linearClient:d}=b(),A=e.assignee?.id===n?.id,U=it({issueEstimationType:e.team.issueEstimationType,issueEstimationAllowZero:e.team.issueEstimationAllowZero,issueEstimationExtended:e.team.issueEstimationExtended});async function w({animatedTitle:h,payload:$,optimisticUpdate:j,rollbackUpdate:ee,successTitle:xe,successMessage:Xe,errorTitle:Je}){try{await(0,I.showToast)({style:I.Toast.Style.Animated,title:h});let J=d.updateIssue(e.id,$);await Promise.all([J,t?t(J,{optimisticUpdate(q){if(q)return q.map(G=>G.id===e.id?j(G):G)},rollbackOnError(q){if(q)return q.map(G=>G.id===e.id?ee(G):G)}}):Promise.resolve(),i?i(J,{optimisticUpdate(q){if(q)return q.map(G=>G.id===e.id?j(G):G)},rollbackOnError(q){if(q)return q.map(G=>G.id===e.id?ee(G):G)}}):Promise.resolve(),r?r(J,{optimisticUpdate(q){return j(q)},rollbackOnError(q){return ee(q)}}):Promise.resolve()]),await(0,I.showToast)({style:I.Toast.Style.Success,title:xe,message:Xe})}catch(J){await(0,I.showToast)({style:I.Toast.Style.Failure,title:Je,message:M(J)})}}async function v(){if(await(0,I.confirmAlert)({title:"Delete Issue",message:"Are you sure you want to delete the selected issue?",icon:{source:I.Icon.Trash,tintColor:I.Color.Red}}))try{await(0,I.showToast)({style:I.Toast.Style.Animated,title:"Deleting issue"});let h=d.deleteIssue(e.id);r&&u(),await Promise.all([h,t?t(h,{optimisticUpdate($){if($)return $.filter(j=>j.id!==e.id)}}):Promise.resolve(),i?i(h,{optimisticUpdate($){if($)return $.filter(j=>j.id!==e.id)}}):Promise.resolve()]),await(0,I.showToast)({style:I.Toast.Style.Success,title:"Issue deleted",message:`"${e.title}" is deleted`})}catch(h){await(0,I.showToast)({style:I.Toast.Style.Failure,title:"Failed to delete issue",message:M(h)})}}async function R(h){let $=e.priority;w({animatedTitle:"Setting priority",payload:{priority:h.priority},optimisticUpdate(j){return{...j,priority:h.priority}},rollbackUpdate(j){return{...j,priority:$}},successTitle:"Set priority",successMessage:`${e.identifier} priority set to ${h.label}`,errorTitle:"Failed to set priority"})}async function x(h){let $=e.assignee;w({animatedTitle:"Setting assignee",payload:{assigneeId:h.id},optimisticUpdate(j){return{...j,assignee:h}},rollbackUpdate(j){return{...j,assignee:$}},successTitle:"Set assignee",successMessage:`${e.identifier} assigned to ${h.displayName}`,errorTitle:"Failed to set assignee"})}async function p(h){let $=e.assignee;w({animatedTitle:"Setting assignee",payload:{assigneeId:h?h.id:null},optimisticUpdate(j){return{...j,assignee:h||void 0}},rollbackUpdate(j){return{...j,assignee:$}},successTitle:"Set assignee",successMessage:`${e.identifier} ${h?"assigned to":"un-assigned from"} me`,errorTitle:"Failed to set assignee"})}async function k({estimate:h,label:$}){let j=e.estimate;w({animatedTitle:"Setting estimate",payload:{estimate:h},optimisticUpdate(ee){return{...ee,estimate:h}},rollbackUpdate(ee){return{...ee,estimate:j}},successTitle:"Set estimate",successMessage:`${e.identifier} estimate set to ${$}`,errorTitle:"Failed to set estimate"})}async function S(h){w({animatedTitle:h?"Setting due date":"Removing due date",payload:{dueDate:h},optimisticUpdate($){return{...$,dueDate:h}},rollbackUpdate($){return{...$,dueDate:$.dueDate}},successTitle:h?"Set due date":"Removed due date",successMessage:h?`${e.identifier} due date set to ${(0,ci.format)(h,"MM/dd/yyyy")}`:"",errorTitle:"Failed to set due date"})}async function F(h){if(!h){await(0,I.showToast)({style:I.Toast.Style.Failure,title:"Failed setting reminder"});return}try{await(0,I.showToast)({style:I.Toast.Style.Animated,title:"Setting reminder"}),await d.issueReminder(e.id,h),r&&u(),await(0,I.showToast)({style:I.Toast.Style.Success,title:"Reminder set",message:`${e.identifier} reminder set to ${(0,ci.format)(h,"MM/dd/yyyy")}`})}catch($){await(0,I.showToast)({style:I.Toast.Style.Failure,title:"Failed to set reminder",message:M($)})}}function de(){t&&t(),i&&i(),r&&r()}let[ie,H]=(0,Ls.useState)(""),{users:Y,supportsUserTypeahead:me,isLoadingUsers:se}=Ne(ie);return(0,L.jsxs)(L.Fragment,{children:[o?null:(0,L.jsx)(Ie,{title:"Open Issue",url:e.url}),(0,L.jsxs)(I.ActionPanel.Section,{children:[(0,L.jsx)(I.Action.Push,{title:"Edit Issue",icon:I.Icon.Pencil,shortcut:I.Keyboard.Shortcut.Common.Edit,target:(0,L.jsx)(Bt,{priorities:c,me:n,issue:e,mutateList:t,mutateSubIssues:i})}),(0,L.jsx)(li,{issue:e,updateIssue:w}),c&&c.length>0?(0,L.jsx)(I.ActionPanel.Submenu,{icon:I.Icon.LevelMeter,title:"Set Priority",shortcut:{macOS:{modifiers:["cmd","opt"],key:"p"},Windows:{modifiers:["ctrl","alt"],key:"p"}},children:c.map(h=>(0,L.jsx)(I.Action,{autoFocus:h.priority===e.priority,title:h.label,icon:{source:ge[h.priority]},onAction:()=>R(h)},h.priority))}):null,(0,L.jsx)(I.ActionPanel.Submenu,{icon:I.Icon.AddPerson,title:"Assign to",shortcut:{macOS:{modifiers:["cmd","shift"],key:"a"},Windows:{modifiers:["ctrl","shift"],key:"a"}},...me&&{onSearchTextChange:H,isLoading:se,throttle:!0},children:Y?.map(h=>(0,L.jsx)(I.Action,{autoFocus:h.id===e.assignee?.id,title:`${h.displayName} (${h.email})`,icon:X(h),onAction:()=>x(h)},h.id))}),n?(0,L.jsx)(I.Action,{title:A?"Un-Assign from Me":"Assign to Me",icon:X(n),shortcut:{macOS:{modifiers:["cmd","shift"],key:"i"},Windows:{modifiers:["ctrl","shift"],key:"i"}},onAction:()=>p(A?null:n)}):null,U?(0,L.jsx)(I.ActionPanel.Submenu,{title:"Set Estimate",icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}},shortcut:{macOS:{modifiers:["cmd","shift"],key:"e"},Windows:{modifiers:["ctrl","shift"],key:"e"}},children:U.map(({estimate:h,label:$})=>(0,L.jsx)(I.Action,{autoFocus:h===e.estimate,title:$,onAction:()=>k({estimate:h,label:$})},h))}):null,(0,L.jsx)(I.Action.PickDate,{title:"Set Due Date",shortcut:{macOS:{modifiers:["opt","shift"],key:"d"},Windows:{modifiers:["alt","shift"],key:"d"}},onChange:S}),(0,L.jsx)(I.Action.PickDate,{title:"Set Reminder",shortcut:{macOS:{modifiers:["cmd","shift"],key:"h"},Windows:{modifiers:["ctrl","shift"],key:"h"}},onChange:F}),(0,L.jsx)(ri,{issue:e,updateIssue:w}),(0,L.jsx)(si,{issue:e,updateIssue:w}),(0,L.jsx)(ai,{issue:e,updateIssue:w}),(0,L.jsx)(oi,{issue:e,updateIssue:w}),(0,L.jsx)(ni,{issue:e,updateIssue:w}),(0,L.jsx)(I.Action,{title:"Delete Issue",shortcut:I.Keyboard.Shortcut.Common.Remove,icon:I.Icon.Trash,style:I.Action.Style.Destructive,onAction:()=>v()})]}),(0,L.jsxs)(I.ActionPanel.Section,{children:[(0,L.jsx)(I.Action.Push,{title:"Show Sub-Issues",icon:I.Icon.List,target:(0,L.jsx)(ti,{issue:e,mutateList:t}),shortcut:{macOS:{modifiers:["cmd","shift"],key:"m"},Windows:{modifiers:["ctrl","shift"],key:"m"}}}),(0,L.jsx)(I.Action.Push,{title:"Break Issues into Sub-Issues",icon:I.Icon.Stars,target:(0,L.jsx)(Wt,{issue:e}),shortcut:{macOS:{modifiers:["opt","shift"],key:"m"},Windows:{modifiers:["alt","shift"],key:"m"}}}),s?(0,L.jsx)(I.Action.Push,{title:"Show Issue Links",icon:I.Icon.Link,target:(0,L.jsx)(zt,{attachments:l??[],issue:e}),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"l"},Windows:{modifiers:["ctrl","alt","shift"],key:"l"}}}):null,(0,L.jsx)(I.Action.Push,{title:"Add Attachments and Links",icon:I.Icon.NewDocument,target:(0,L.jsx)(Dt,{issue:e}),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"a"},Windows:{modifiers:["ctrl","alt","shift"],key:"a"}}}),(0,L.jsx)(I.Action.Push,{title:"Add Comment",icon:I.Icon.Plus,target:(0,L.jsx)(ze,{issue:e}),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"n"},Windows:{modifiers:["ctrl","alt","shift"],key:"n"}}}),(0,L.jsx)(I.Action.Push,{title:"Show Comments",icon:I.Icon.Bubble,target:(0,L.jsx)(Zt,{issue:e}),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"c"},Windows:{modifiers:["ctrl","alt","shift"],key:"c"}}})]}),(0,L.jsx)(ii,{issue:e}),(0,L.jsx)(I.ActionPanel.Section,{children:(0,L.jsx)(I.Action,{title:"Refresh",icon:I.Icon.ArrowClockwise,shortcut:I.Keyboard.Shortcut.Common.Refresh,onAction:()=>de()})})]})}var V=require("react/jsx-runtime");function He({issue:e,mutateList:t,priorities:i,me:r}){let{issue:s,isLoadingIssue:l,mutateDetail:c}=Fe(e),n=`# ${s?.title}`;s?.description&&(n+=`

${s.description}`);let o=s?.cycle?Ue(s.cycle):null,u=s.relations?s.relations.nodes.filter(U=>U.type=="related"):null,d=s.relations?s.relations.nodes.filter(U=>U.type=="duplicate"):null,A=s.attachments?.nodes.length??0;return(0,V.jsx)(O.Detail,{markdown:n,isLoading:l,...s?{metadata:(0,V.jsxs)(O.Detail.Metadata,{children:[(0,V.jsx)(O.Detail.Metadata.Label,{title:"Status",text:s.state.name,icon:K(s.state)}),(0,V.jsx)(O.Detail.Metadata.Label,{title:"Priority",text:s.priorityLabel,icon:{source:ge[s.priority]}}),(0,V.jsx)(O.Detail.Metadata.Label,{title:"Assignee",text:s.assignee?s.assignee.displayName:"Unassigned",icon:X(s.assignee)}),s.team.issueEstimationType!=="notUsed"?(0,V.jsx)(O.Detail.Metadata.Label,{title:"Estimate",text:Ct({estimate:s.estimate,issueEstimationType:s.team.issueEstimationType}),icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}}):null,s.labels.nodes.length>0?(0,V.jsx)(O.Detail.Metadata.TagList,{title:"Labels",children:s.labels.nodes.map(({id:U,name:w,color:v})=>(0,V.jsx)(O.Detail.Metadata.TagList.Item,{text:w,color:v},U))}):(0,V.jsx)(O.Detail.Metadata.Label,{title:"Labels",text:"No Labels"}),s.dueDate?(0,V.jsx)(O.Detail.Metadata.Label,{title:"Due Date",text:(0,Ts.format)(new Date(s.dueDate),"MM/dd/yyyy"),icon:Pt(new Date(s.dueDate))}):null,A>0?(0,V.jsx)(O.Detail.Metadata.Label,{title:"Links",text:`${A>1?`${A} links`:"1 link"}`,icon:O.Icon.Link}):null,(0,V.jsx)(O.Detail.Metadata.Separator,{}),(0,V.jsx)(O.Detail.Metadata.Label,{title:"Cycle",text:o?o.title:"No Cycle",icon:{source:o?o.icon:{light:"light/no-cycle.svg",dark:"dark/no-cycle.svg"}}}),(0,V.jsx)(O.Detail.Metadata.Label,{title:"Project",text:s.project?s.project.name:"No Project",icon:fe(s.project)}),(0,V.jsx)(O.Detail.Metadata.Label,{title:"Milestone",text:s.projectMilestone?s.projectMilestone.name:"No Milestone",icon:Ae(s.projectMilestone)}),(0,V.jsx)(O.Detail.Metadata.Label,{title:"Parent Issue",text:s.parent?s.parent.title:"No Issue",icon:s.parent?K(s.parent.state):{source:{light:"light/backlog.svg",dark:"dark/backlog.svg"}}}),u&&u.length>0?(0,V.jsx)(O.Detail.Metadata.TagList,{title:"Related",children:u.map(({id:U,relatedIssue:w})=>(0,V.jsx)(O.Detail.Metadata.TagList.Item,{text:w.identifier},U))}):null,d&&d.length>0?(0,V.jsx)(O.Detail.Metadata.TagList,{title:"Duplicates",children:d.map(({id:U,relatedIssue:w})=>(0,V.jsx)(O.Detail.Metadata.TagList.Item,{text:w.identifier},U))}):null]}),actions:(0,V.jsx)(O.ActionPanel,{children:(0,V.jsx)(ot,{issue:s,mutateList:t,mutateDetail:c,priorities:i,showAttachmentsAction:A>0,attachments:s.attachments?.nodes??[],me:r})})}:{}})}var dt=require("@raycast/api"),Rs=require("@raycast/utils"),Mt=et(require("react"));var ut=require("react/jsx-runtime");function Ir({children:e}){return(0,Mt.useEffect)(()=>{ns()},[]),e}var ui=class extends Mt.default.Component{constructor(t){super(t),this.state={error:null}}static getDerivedStateFromError(t){return{error:t}}render(){let{error:t}=this.state;if(!t)return this.props.children;if(!(t.message.includes("invalid_grant")||t.message.includes("Error while fetching tokens")||t.message.includes("Could not initialize OAuth")))throw t;return(0,ut.jsx)(dt.Detail,{markdown:`# Sign In Failed

Failed to authenticate with Linear:
\`\`\`
${t.message}
\`\`\`

This can happen when the network is unreliable or the authorization code has expired. Please try signing in again.`,actions:(0,ut.jsx)(dt.ActionPanel,{children:(0,ut.jsx)(dt.Action,{title:"Sign in Again",onAction:async()=>{await Ot.client.removeTokens(),this.setState({error:null})}})})})}},yr=(0,Rs.withAccessToken)(Ot)(Ir);function di({children:e}){return(0,ut.jsx)(ui,{children:(0,ut.jsx)(yr,{children:e})})}var Ut=require("@raycast/api");function $s(e){return e?{source:e.name==="GitHub"?"bots/github.svg":e.name==="GitLab"?"bots/gitlab.svg":"linear-app-icon.png",mask:Ut.Image.Mask.Circle}:Ut.Icon.Person}var _=require("@raycast/api"),Ds=et(require("node-emoji"));function vs(e){let t=e.type;return e.reactionEmoji&&t.includes("Reaction")?Ds.get(e.reactionEmoji)??_.Icon.Emoji:(t==="issueStatusChanged"||t==="issueStatusChangedAll")&&e.issue?K(e.issue.state):t.includes("Mention")?_.Icon.AtSymbol:t.includes("Comment")&&!t.includes("Reaction")?_.Icon.Bubble:t.includes("ThreadResolved")?_.Icon.CheckCircle:t.includes("Reminder")?_.Icon.Clock:t.includes("Assigned")?_.Icon.AddPerson:t.includes("Unassigned")?_.Icon.RemovePerson:t.includes("Created")||t.includes("AddedToView")?_.Icon.Plus:t.includes("Sla")?_.Icon.Warning:{issueAddedToTriage:{source:{light:"light/triage.svg",dark:"dark/triage.svg"}},triageResponsibilityIssueAddedToTriage:{source:{light:"light/triage.svg",dark:"dark/triage.svg"}},issuePriorityUrgent:{source:{light:"light/priority-urgent.svg",dark:"dark/priority-urgent.svg"}},issueBlocking:_.Icon.ExclamationMark,issueUnblocked:_.Icon.Minus,issueMovedToProject:_.Icon.ArrowRight,issueDue:_.Icon.Calendar,issueSubscribed:_.Icon.Bell,oauthClientApprovalCreated:_.Icon.Download,projectUpdatePrompt:_.Icon.Heartbeat,system:_.Icon.SpeechBubble}[t]??_.Icon.Bell}function xs(e){if(e.url)return e.url;if(e.comment?.url)return e.comment.url;if(e.projectUpdate?.url)return e.projectUpdate.url;if(e.project?.url)return e.project.url;if(e.issue?.url)return e.issue.url}var Ms=require("@raycast/utils"),Us=require("lodash");async function js(){let{graphQLClient:e}=b(),{data:t}=await e.rawRequest(`
      query {
        notifications {
          nodes {
            id
            type
            createdAt
            readAt
            snoozedUntilAt
            title
            subtitle
            url
            actor {
              displayName
              avatarUrl
            }
            botActor {
              name
            }
            ... on IssueNotification {
              reactionEmoji
              comment {
                body
                url
              }
              issue {
                ${Ee}
              }
            }
            ... on ProjectNotification {
              project {
                url
                name
              }
              projectUpdate {
                url
              }
            }
          }
        }
        organization {
          urlKey
        }
      }
    `);return{notifications:t?.notifications.nodes,urlKey:t?.organization.urlKey}}function mi(){let{data:e,error:t,isLoading:i,mutate:r}=(0,Ms.useCachedPromise)(js),{notifications:s,urlKey:l}=e||{},c=new Date,[n,o]=(0,Us.chain)(s).filter(u=>!u.snoozedUntilAt||u.snoozedUntilAt<c).partition(u=>!!u.readAt).value();return{urlKey:l,readNotifications:n,unreadNotifications:o,notificationsError:t,isLoadingNotifications:!e&&!t||i,mutateNotifications:r}}var Q=require("react/jsx-runtime");function hr(){let{urlKey:e,readNotifications:t,unreadNotifications:i,notificationsError:r,isLoadingNotifications:s,mutateNotifications:l}=mi(),{priorities:c,isLoadingPriorities:n}=yt(),{me:o,isLoadingMe:u}=Ge(),d=`https://linear.app/${e}/inbox`;r&&(0,f.showToast)({style:f.Toast.Style.Failure,title:"Failed to fetch latest notifications",message:M(r)});let A=[{title:"Unread",notifications:i},{title:"Read",notifications:t}];async function U(x){try{await(0,f.showToast)({style:f.Toast.Style.Animated,title:"Marking as read"}),await l(St({id:x.id,readAt:new Date}),{optimisticUpdate(p){return p&&{...p,notifications:p?.notifications?.map(k=>k.id===x.id?{...k,readAt:new Date}:k)}},rollbackOnError(p){return p&&{...p,notifications:p?.notifications?.map(k=>k.id===x.id?{...k,readAt:x.readAt}:k)}},shouldRevalidateAfter:!0}),await(0,f.showToast)({style:f.Toast.Style.Success,title:"Marked as read"}),await(0,f.launchCommand)({name:"unread-notifications",type:f.LaunchType.Background})}catch(p){(0,f.showToast)({style:f.Toast.Style.Failure,title:"Failed to mark notification as read",message:M(p)})}}async function w(x){try{await(0,f.showToast)({style:f.Toast.Style.Animated,title:"Marking as unread"}),await l(St({id:x.id,readAt:null}),{optimisticUpdate(p){return p&&{...p,notifications:p?.notifications?.map(k=>k.id===x.id?{...k,readAt:void 0}:k)}},rollbackOnError(p){return p&&{...p,notifications:p?.notifications?.map(k=>k.id===x.id?{...k,readAt:x.readAt}:k)}},shouldRevalidateAfter:!0}),await(0,f.showToast)({style:f.Toast.Style.Success,title:"Marked as unread"}),await(0,f.launchCommand)({name:"unread-notifications",type:f.LaunchType.Background})}catch(p){(0,f.showToast)({style:f.Toast.Style.Failure,title:"Failed to mark notification as unread",message:M(p)})}}async function v(x){try{await(0,f.showToast)({style:f.Toast.Style.Animated,title:"Deleting notification"}),await l(hi(x.id),{optimisticUpdate(p){return p&&{...p,notifications:p?.notifications?.filter(k=>k.id!==x.id)}},rollbackOnError(p){return p&&{...p,notifications:p?.notifications?.concat([x])}}}),await(0,f.showToast)({style:f.Toast.Style.Success,title:"Deleted notification"})}catch(p){(0,f.showToast)({style:f.Toast.Style.Failure,title:"Failed to delete notification",message:M(p)})}}async function R(){if(i.length===0){await(0,f.showToast)({style:f.Toast.Style.Success,title:"No unread notifications"});return}try{await(0,f.showToast)({style:f.Toast.Style.Animated,title:`Marking ${i.length} notification${i.length===1?"":"s"} as read`});let x=new Date;await l(Promise.all(i.map(p=>St({id:p.id,readAt:x}))),{optimisticUpdate(p){return p&&{...p,notifications:p?.notifications?.map(k=>k.readAt?k:{...k,readAt:x})}},rollbackOnError(p){return p&&{...p,notifications:p?.notifications?.map(k=>{let S=i.find(F=>F.id===k.id);return S?{...k,readAt:S.readAt}:k})}},shouldRevalidateAfter:!0}),await(0,f.showToast)({style:f.Toast.Style.Success,title:"Marked all as read"}),await(0,f.launchCommand)({name:"unread-notifications",type:f.LaunchType.Background})}catch(x){(0,f.showToast)({style:f.Toast.Style.Failure,title:"Failed to mark all as read",message:M(x)})}}return(0,Q.jsxs)(f.List,{isLoading:s||n||u,children:[(0,Q.jsx)(f.List.EmptyView,{title:"Inbox",description:"You don't have any notifications."}),A.map(({title:x,notifications:p})=>{let k=p.length===1?"1 notification":`${p.length} notifications`;return(0,Q.jsx)(f.List.Section,{title:x,subtitle:k,children:p.map(S=>{let F=new Date(S.createdAt),ie=[(S.actor?S.actor.displayName:S.botActor?S.botActor.name:"Linear")||"Linear"];S.issue&&(ie.push(...S.issue.identifier.split("-")),ie.push(S.issue.title));let H=xs(S),Y=(h,$)=>{let j=h.length>$?"\u2026":"";return h.substring(0,$).trim()+j},me=Y(S.title,60),se=Y(S.subtitle,80);return(0,Q.jsx)(f.List.Item,{title:me,subtitle:se,keywords:ie,icon:S.actor?X(S.actor):S.botActor?$s(S.botActor):"linear-app-icon.png",accessories:[{date:F,tooltip:`${(0,Es.format)(F,"EEEE d MMMM yyyy 'at' HH:mm")}`},{icon:vs(S)}],actions:(0,Q.jsxs)(f.ActionPanel,{children:[S.readAt?(0,Q.jsx)(f.Action,{title:"Mark as Unread",icon:f.Icon.Dot,onAction:()=>w(S),shortcut:{macOS:{modifiers:["cmd"],key:"u"},Windows:{modifiers:["ctrl"],key:"u"}}}):(0,Q.jsx)(f.Action,{title:"Mark as Read",icon:f.Icon.Checkmark,onAction:()=>U(S),shortcut:{macOS:{modifiers:["cmd"],key:"u"},Windows:{modifiers:["ctrl"],key:"u"}}}),i.length>0?(0,Q.jsx)(f.Action,{title:"Mark All as Read",icon:f.Icon.CheckCircle,shortcut:{macOS:{modifiers:["cmd","shift"],key:"u"},Windows:{modifiers:["ctrl","shift"],key:"u"}},onAction:R}):null,H?(0,Q.jsx)(Ie,{url:H}):null,(0,Q.jsxs)(f.ActionPanel.Section,{children:[S.issue?(0,Q.jsx)(f.Action.Push,{title:"Open Issue in Raycast",target:(0,Q.jsx)(He,{issue:S.issue,priorities:c,me:o}),icon:f.Icon.RaycastLogoNeg,shortcut:f.Keyboard.Shortcut.Common.OpenWith}):null,e?(0,Q.jsx)(Ie,{title:"Open Inbox",url:d,shortcut:f.Keyboard.Shortcut.Common.Open}):null,(0,Q.jsx)(f.Action,{title:"Delete Notification",icon:f.Icon.Trash,style:f.Action.Style.Destructive,shortcut:f.Keyboard.Shortcut.Common.Remove,onAction:()=>v(S)})]}),H?(0,Q.jsx)(f.ActionPanel.Section,{children:(0,Q.jsx)(f.Action.CopyToClipboard,{icon:f.Icon.Clipboard,content:H,title:"Copy URL",shortcut:f.Keyboard.Shortcut.Common.CopyPath})}):null,(0,Q.jsx)(f.ActionPanel.Section,{children:(0,Q.jsx)(f.Action,{title:"Refresh",icon:f.Icon.ArrowClockwise,shortcut:f.Keyboard.Shortcut.Common.Refresh,onAction:()=>l()})})]})},S.id)})},x)})]})}function Fs(){return(0,Q.jsx)(di,{children:(0,Q.jsx)(hr,{})})}
