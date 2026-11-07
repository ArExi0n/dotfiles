"use strict";var Ni=Object.create;var bt=Object.defineProperty;var Oi=Object.getOwnPropertyDescriptor;var Vi=Object.getOwnPropertyNames;var qi=Object.getPrototypeOf,Wi=Object.prototype.hasOwnProperty;var Qi=(e,t)=>{for(var s in t)bt(e,s,{get:t[s],enumerable:!0})},ms=(e,t,s,o)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of Vi(t))!Wi.call(e,i)&&i!==s&&bt(e,i,{get:()=>t[i],enumerable:!(o=Oi(t,i))||o.enumerable});return e};var mt=(e,t,s)=>(s=e!=null?Ni(qi(e)):{},ms(t||!e||!e.__esModule?bt(s,"default",{value:e,enumerable:!0}):s,e)),zi=e=>ms(bt({},"__esModule",{value:!0}),e);var Po={};Qi(Po,{default:()=>Fi});module.exports=zi(Po);var H=require("@raycast/api"),Mi=require("@raycast/utils"),Ui=require("date-fns");var ps=require("@linear/sdk"),gs=require("@raycast/api"),fs=require("@raycast/utils"),pt=null;async function Bi(e,t,s,o,i){let c=JSON.stringify({query:s,variables:o}),l=new Headers(t.headers);new Headers(i).forEach((u,d)=>l.set(d,u)),l.set("Content-Type","application/json");let n=await fetch(e,{...t,method:"POST",headers:Object.fromEntries(l.entries()),body:c}),r=n.headers.get("Content-Type")?.startsWith("application/json")?await n.json():await n.text();if(typeof r!="string"&&n.ok&&!r.errors&&r.data)return{...r,headers:n.headers,status:n.status};throw new Error(typeof r=="string"?r:r.errors?.[0]?.message??`GraphQL Error (${n.status})`)}var qt=fs.OAuthService.linear({scope:"read write",onAuthorize({token:e}){pt=new ps.LinearClient({accessToken:e,headers:{"public-file-urls-expire-in":"60","linear-raycast-extension-name":gs.environment.extensionName}});let t=pt.client;t.rawRequest=((s,o,i)=>Bi(t.url,t.options,s,o,i))}});function P(){if(!pt)throw new Error("No linear client initialized");return{linearClient:pt,graphQLClient:pt.client}}async function Is(){let{graphQLClient:e}=P(),{data:t}=await e.rawRequest(`
      query {
        viewer {
          organization {
            urlKey
          }
        }
        favorites {
          nodes {
            id
            type
            url
            customView {
              id
              color
              icon
              name
            }
            cycle {
              id
              number
              startsAt
              endsAt
              completedAt
              team {
                key
              }
            }
            document {
              id
              color
              slugId
              title
            }
            issue {
              id
              state {
                id
                type
                name
                color
              }
              title
              url
            }
            label {
              id
              color
              name
            }
            project {
              id
              color
              icon
              name
              url
            }
            initiative {
              id
              color
              icon
              name
            }
            user {
              id
              avatarUrl
              displayName
              name
              url
            }
            updatedAt
          }
        }
      }
    `);return{organization:t?.viewer.organization,favorites:t?.favorites.nodes}}var Qt=require("@raycast/api");var ys=require("@raycast/api"),Wt=!1;async function hs(){Wt=!!(await(0,ys.getApplications)()).find(s=>s.bundleId==="com.linear")}var zt=require("react/jsx-runtime");function se({title:e,url:t,...s}){return Wt?(0,zt.jsx)(Qt.Action.Open,{title:`${e||"Open"} in Linear`,icon:"linear-app-icon.png",target:t,application:"Linear",...s}):(0,zt.jsx)(Qt.Action.OpenInBrowser,{url:t,title:`${e||"Open"} in Browser`})}var tt=require("@raycast/api"),Ps=require("@raycast/utils"),St=mt(require("react"));var et=require("react/jsx-runtime");function Gi({children:e}){return(0,St.useEffect)(()=>{hs()},[]),e}var Bt=class extends St.default.Component{constructor(t){super(t),this.state={error:null}}static getDerivedStateFromError(t){return{error:t}}render(){let{error:t}=this.state;if(!t)return this.props.children;if(!(t.message.includes("invalid_grant")||t.message.includes("Error while fetching tokens")||t.message.includes("Could not initialize OAuth")))throw t;return(0,et.jsx)(tt.Detail,{markdown:`# Sign In Failed

Failed to authenticate with Linear:
\`\`\`
${t.message}
\`\`\`

This can happen when the network is unreliable or the authorization code has expired. Please try signing in again.`,actions:(0,et.jsx)(tt.ActionPanel,{children:(0,et.jsx)(tt.Action,{title:"Sign in Again",onAction:async()=>{await qt.client.removeTokens(),this.setState({error:null})}})})})}},_i=(0,Ps.withAccessToken)(qt)(Gi);function Lt({children:e}){return(0,et.jsx)(Bt,{children:(0,et.jsx)(_i,{children:e})})}var pe=require("date-fns"),Ki=10080*60*1e3;function ye(e){let t=Date.now(),s=Date.now()+Ki,o=new Date(e.startsAt),i=new Date(e.endsAt),c=!e.completedAt&&(0,pe.isBefore)(o,t)&&(0,pe.isAfter)(i,t),l=!e.completedAt&&(0,pe.isBefore)(o,s)&&(0,pe.isAfter)(i,s),n=c?{light:"light/active-cycle.svg",dark:"dark/active-cycle.svg"}:{light:"light/cycle.svg",dark:"dark/cycle.svg"},r=`Cycle ${e.number} (${(0,pe.format)(o,"dd MMM")} - ${(0,pe.format)(i,"dd MMM")})`,u=c?`Active ${r}`:r;return{...e,isActive:c,isNext:l,icon:n,title:u}}function Ae(e){return e.filter(t=>(0,pe.isAfter)(new Date(t.endsAt),Date.now())).map(ye)}function ks(e){return e?{title:"Open Label",url:e}:null}var ws=mt(require("fs")),Cs=require("@raycast/api"),bs=mt(require("node-emoji"));function he({icon:e,color:t,fallbackIcon:s}){if(!e)return s;if(/:(.*):/.test(e))return bs.get(e)??s;let i=`${Cs.environment.assetsPath}/linear-icons/${e.toLowerCase()}.svg`;return ws.default.existsSync(i)?{source:i,...t?{tintColor:{light:t,dark:t,adjustContrast:!0}}:{}}:s}function Ss(e){return he({icon:e.icon??void 0,color:e.color??void 0,fallbackIcon:{source:{light:"light/initiative.svg",dark:"dark/initiative.svg"}}})}function ee(e){return e?he({icon:e.icon??void 0,color:e.color??void 0,fallbackIcon:{source:{light:"light/project.svg",dark:"dark/project.svg"}}}):{source:{light:"light/no-project.svg",dark:"dark/no-project.svg"}}}var Ls=require("lodash");var Hi={triage:{light:"light/triage.svg",dark:"dark/triage.svg"},backlog:{light:"light/backlog.svg",dark:"dark/backlog.svg"},unstarted:{light:"light/unstarted.svg",dark:"dark/unstarted.svg"},started:{light:"light/started.svg",dark:"dark/started.svg"},completed:{light:"light/completed.svg",dark:"dark/completed.svg"},canceled:{light:"light/canceled.svg",dark:"dark/canceled.svg"}};function B(e){return{source:Hi[e.type],tintColor:{light:e.color,dark:e.color,adjustContrast:!0}}}function st(e,t=["triage","backlog","unstarted","started","completed","canceled"]){if(e.length===0)return[];let s=(0,Ls.groupBy)(e,o=>o.type);return t.filter(o=>!!s[o]).map(o=>s[o]).flat()}var At=require("@raycast/api"),As=require("@raycast/utils");function K(e){return e?{source:e.avatarUrl?encodeURI(e.avatarUrl):(0,As.getAvatarIcon)(e.displayName.toUpperCase()),mask:At.Image.Mask.Circle}:At.Icon.Person}var ue=require("@raycast/api"),xi=require("react");var ce=require("@raycast/api"),Et=require("date-fns");var it=require("@raycast/api"),Tt=require("date-fns");function $t(e){let t=(0,Tt.differenceInDays)(e,(0,Tt.startOfToday)()),s=it.Color.PrimaryText;return t<=7&&(s=it.Color.Orange),t<=0&&(s=it.Color.Red),{source:it.Icon.Calendar,tintColor:s}}var Ts={exponential:[0,1,2,4,8,16,32,64],fibonacci:[0,1,2,3,5,8,13,21],linear:[0,1,2,3,4,5,6,7],tShirt:[0,1,2,3,5,8,13,21]},$s={0:"\u2013",1:"XS",2:"S",3:"M",5:"L",8:"XL",13:"XXL",21:"XXXL"};function Rt({estimate:e,issueEstimationType:t}){if(!e)return"Not estimated";if(t==="tShirt"){let s=$s[e];return s||String(e)}return String(e)}function ot({issueEstimationType:e,issueEstimationAllowZero:t,issueEstimationExtended:s}){if(e==="notUsed")return null;let o=t?0:1,i=s?Ts[e].length:6,c=Ts[e].slice(o,i);return e==="tShirt"?c.map(l=>({estimate:l,label:$s[l]})):c.map(l=>({estimate:l,label:l!==1?`${l} points`:`${l} point`}))}var ge={0:{light:"light/priority-no-priority.svg",dark:"dark/priority-no-priority.svg"},1:{light:"light/priority-urgent.svg",dark:"dark/priority-urgent.svg"},2:{light:"light/priority-high.svg",dark:"dark/priority-high.svg"},3:{light:"light/priority-medium.svg",dark:"dark/priority-medium.svg"},4:{light:"light/priority-low.svg",dark:"dark/priority-low.svg"}};var g=require("@raycast/api"),us=require("date-fns"),$i=require("react");function q(e){return e instanceof Error?e.message:String(e)}var Rs=require("@raycast/utils");function Ee(e=""){let{linearClient:t}=P(),{data:s,error:o,isLoading:i}=(0,Rs.useCachedPromise)(async c=>{let l=await t.users(c.trim().length>0?{filter:{name:{containsIgnoreCase:c}}}:void 0);return{users:l?.nodes??[],hasMoreUsers:!!l?.pageInfo?.hasNextPage}},[e],{initialData:[]});return{users:s?.users,supportsUserTypeahead:e.trim().length>0||s?.hasMoreUsers,usersError:o,isLoadingUsers:!s&&!o||i}}var T=require("@raycast/api"),Vs=require("@raycast/utils"),qs=require("nanoid"),Ve=require("react");var Ds=require("@raycast/api");async function gt(e,t,s,o,i){let c=o,l=!0,n,r=0;for(;l&&r<i;){let u=await e(n);c=s(c,u),l=t(u)?.hasNextPage,n=t(u)?.endCursor,r++}return c}var Zi=(0,Ds.getPreferenceValues)();function vs({inFilterBlock:e,addComma:t,inParentheses:s}={inFilterBlock:!1,inParentheses:!1,addComma:!0}){return Zi.shouldHideRedundantIssues?[...s?["("]:[],...t?[", "]:[],...e?[]:["filter: { "],"completedAt: { null: true }, canceledAt: { null: true }",...e?[]:[" }"],...s?[")"]:[]].join(""):""}var Ne=`
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
`;async function rt(){let{graphQLClient:e}=P(),{data:t}=await e.rawRequest(`
      query {
        issues(orderBy: createdAt${vs()}) {
          nodes {
            ${Ne}
          }
        }
      }
    `);return t?.issues.nodes}async function xs(e){let{graphQLClient:t}=P(),{data:s}=await t.rawRequest(`
      query($issueId: String!) {
        issue(id: $issueId) {
          children${vs({inParentheses:!0})} {
            nodes {
              ${Ne}
              sortOrder
            }
          }
        }
      }
    `,{issueId:e});if(!s)throw new Error("Cannot find the Linear issue");return s.issue.children.nodes}async function js(e){let{graphQLClient:t}=P(),{data:s}=await t.rawRequest(`
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
    `,{issueId:e});if(!s)throw new Error("Cannot find the Linear issue");return s.issue}async function Ms(e){let{graphQLClient:t}=P(),{data:s}=await t.rawRequest(`
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
    `,{issueId:e});if(!s)throw new Error("Cannot find the Linear issue");return s.issue.comments.nodes}async function Us(e){let{graphQLClient:t}=P(),{data:s}=await t.rawRequest(`
      query($issueId: String!) {
        issue(id: $issueId) {
          ${Ne}
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
    `,{issueId:e});if(!s)throw new Error("Cannot find the Linear issue");return s.issue}async function Fs(e){let{graphQLClient:t}=P(),s=e.title.replace(/"/g,"\\$&"),o=e.description?.replace(/\n/g,"\\n")?.replace(/"/g,"\\$&"),i=`teamId: "${e.teamId}", title: "${s}", description: "${o}", priority: ${e.priority}`;e.stateId&&(i+=`, stateId: "${e.stateId}"`),e.estimate&&(i+=`, estimate: ${e.estimate}`),e.assigneeId&&(i+=`, assigneeId: "${e.assigneeId}"`),e.labelIds&&e.labelIds.length>0&&(i+=`, labelIds: [${e.labelIds.map(l=>`"${l}"`).join(",")}]`),e.dueDate&&(i+=`, dueDate: "${e.dueDate.toISOString()}"`),e.cycleId&&(i+=`, cycleId: "${e.cycleId}"`),e.projectId&&(i+=`, projectId: "${e.projectId}"`),e.projectId&&e.projectMilestoneId&&(i+=`, projectMilestoneId: "${e.projectMilestoneId}"`),e.parentId&&(i+=`, parentId: "${e.parentId}"`);let{data:c}=await t.rawRequest(`
      mutation {
        issueCreate(input: {${i}}) {
          success
          issue {
            ${Ne}
          }
        }
      }
    `);return{success:c?.issueCreate.success,issue:c?.issueCreate.issue}}async function Es(e){let{graphQLClient:t}=P(),s=e.title.replace(/"/g,"\\$&"),o=e.description?.replace(/\n/g,"\\n").replace(/"/g,"\\$&"),i=`teamId: "${e.teamId}", title: "${s}", description: "${o}", parentId: "${e.parentId}"`;e.stateId&&(i+=`, stateId: "${e.stateId}"`);let{data:c}=await t.rawRequest(`
      mutation {
        issueCreate(input: {${i}}) {
          success
        }
      }
    `);return{success:c?.issueCreate.success}}var Ns=require("@raycast/utils");function Oe(e){let t=e.id,{data:s,error:o,isLoading:i,mutate:c}=(0,Ns.useCachedPromise)(Us,[t],{initialData:{...e,description:""}});return{issue:s,issueError:o,isLoadingIssue:i,mutateDetail:c}}var Os=require("@raycast/utils");function Pe(e,t){let{linearClient:s}=P(),{data:o,error:i,isLoading:c}=(0,Os.useCachedPromise)(async l=>(await s.workflowStates({filter:{team:{id:{eq:l}}}})).nodes.sort((r,u)=>r.position-u.position),[e],{initialData:[],execute:t?.execute!==!1});return{states:o,isLoadingStates:c,statesError:i}}var ie=require("react/jsx-runtime");function Gt({issue:e}){let{pop:t}=(0,T.useNavigation)(),{states:s}=Pe(e.team.id),o=(0,Ve.useMemo)(()=>s.filter(S=>S.type==="unstarted")[0],[s]),{issue:i,isLoadingIssue:c}=Oe(e),{data:l,isLoading:n,revalidate:r}=(0,Vs.useAI)(`Act as a product manager for Linear issues. Break down a Linear issue into a list of sub-issues. 
    
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

Break down the Linear issue with this title: "${i.title}"`,{execute:!!i&&!c,creativity:.5}),[u,d]=(0,Ve.useState)(!1),[h,D]=(0,Ve.useState)([]);(0,Ve.useEffect)(()=>{if(!(!l||n)){try{let L=/\[[\s\S]*?\]/,S=l.match(L);if(S&&S[0]){let G=JSON.parse(S[0]);D(G.map(j=>({...j,id:(0,qs.nanoid)(),selected:!0})))}}catch(L){(0,T.showToast)({style:T.Toast.Style.Failure,title:"Failed to parse AI results",message:q(L),primaryAction:{title:"Retry",onAction:r},secondaryAction:{title:"Copy AI Result",onAction:()=>T.Clipboard.copy(l)}})}d(!0)}},[l,n]);async function w(){try{await(0,T.showToast)({style:T.Toast.Style.Animated,title:"Creating sub-issues"});let L=h.filter(S=>S.selected);await Promise.all(L.map(S=>Es({teamId:i.team.id,title:S.title,description:S.description,parentId:i.id,stateId:o?.id}))),await(0,T.showToast)({style:T.Toast.Style.Success,title:"Created sub-issues"}),t()}catch(L){(0,T.showToast)({style:T.Toast.Style.Failure,title:"Failed to create Sub-Issues",message:q(L)})}}return(0,ie.jsxs)(T.List,{isLoading:n||!u,children:[h?.map(L=>(0,ie.jsx)(T.List.Item,{icon:L.selected?{source:T.Icon.CheckCircle,tintColor:T.Color.Green}:T.Icon.Circle,title:L.title,subtitle:L.description,actions:(0,ie.jsxs)(T.ActionPanel,{children:[(0,ie.jsx)(T.Action,{title:L.selected?"Unselect Sub-Issue":"Select Sub-Issue",icon:L.selected?T.Icon.Circle:{source:T.Icon.CheckCircle,tintColor:T.Color.Green},onAction:()=>D(h.map(S=>S.id===L.id?{...S,selected:!S.selected}:S))}),(0,ie.jsx)(T.Action,{title:"Create Sub-Issues",icon:T.Icon.Plus,onAction:()=>w()}),(0,ie.jsx)(T.Action,{title:"Generate New Sub-Issues",icon:T.Icon.ArrowClockwise,onAction:r})]})},L.title)),(0,ie.jsx)(T.List.EmptyView,{title:"No sub-issues were generated. Try again.",actions:(0,ie.jsx)(T.ActionPanel,{children:(0,ie.jsx)(T.Action,{title:"Retry",icon:T.Icon.ArrowClockwise,onAction:r})})})]})}var y=require("@raycast/api"),Be=require("@raycast/utils"),It=require("react");async function Ws(e,t){let{graphQLClient:s}=P(),o=[];if(t.teamId&&o.push(`teamId: "${t.teamId}"`),t.title&&o.push(`title: "${t.title.replace(/"/g,"\\$&")}"`),t.description&&o.push(`description: "${t.description.replace(/\n/g,"\\n").replace(/"/g,"\\$&")}"`),t.stateId&&o.push(`stateId: "${t.stateId}"`),typeof t.priority<"u"&&o.push(`priority: ${t.priority}`),typeof t.assigneeId<"u"&&o.push(`assigneeId: ${t.assigneeId?`"${t.assigneeId}"`:null}`),t.labelIds&&o.push(`labelIds: [${t.labelIds.map(c=>`"${c}"`).join(",")}]`),typeof t.estimate<"u"&&o.push(`estimate: ${t.estimate}`),typeof t.dueDate<"u"){let c=t.dueDate?t.dueDate instanceof Date?t.dueDate.toISOString():t.dueDate:null;o.push(`dueDate: ${c?`"${c}"`:null}`)}typeof t.cycleId<"u"&&o.push(`cycleId: ${t.cycleId?`"${t.cycleId}"`:null}`),typeof t.projectId<"u"&&o.push(`projectId: ${t.projectId?`"${t.projectId}"`:null}`),typeof t.projectMilestoneId<"u"&&o.push(`projectMilestoneId: ${t.projectMilestoneId?`"${t.projectMilestoneId}"`:null}`),typeof t.parentId<"u"&&o.push(`parentId: ${t.parentId?`"${t.parentId}"`:null}`);let{data:i}=await s.rawRequest(`
      mutation {
        issueUpdate(id: "${e}", input: {${o.join(", ")}}) {
          success
        }
      }
    `);return{success:i?.issueUpdate.success}}var _t=require("@raycast/api");function Te(e){return e?{source:"linear-icons/milestone.svg",tintColor:_t.Color.PrimaryText}:{source:"linear-icons/no-milestone.svg",tintColor:_t.Color.SecondaryText}}var Qs=require("@raycast/api");function Dt(e,t){let s=t?.logoUrl?encodeURI(t.logoUrl):Qs.Icon.TwoPeople;return he({icon:e.icon??void 0,color:e.color??void 0,fallbackIcon:s})}var zs=require("@raycast/utils");function qe(e,t){let{linearClient:s}=P(),{data:o,error:i,isLoading:c}=(0,zs.useCachedPromise)(async l=>(await s.cycles({filter:{team:{id:{eq:l}}}})).nodes.sort((r,u)=>r.number-u.number),[e],{execute:t?.execute!==!1&&!!e});return{cycles:o,cyclesError:i,isLoadingCycles:!o&&!i||c}}var Bs=require("@raycast/utils");function ke(e,t=[],s){let{data:o,error:i,isLoading:c,mutate:l}=(0,Bs.useCachedPromise)(e,t,s);return{issues:o,issuesError:i,isLoadingIssues:c,mutateList:l}}var Ks=require("@raycast/utils");var Gs=require("@raycast/api");var Xi=100,Ji=100,Yi=(0,Gs.getPreferenceValues)();function eo(){let e=Number(Yi.labelsLimit),t=Number.isFinite(e)&&e>0?e:Ji,s=Math.floor(Math.min(Xi,t)),o=Math.ceil(t/s);return{pageSize:s,pageLimit:o}}async function _s(e){if(!e)return[];let{pageSize:t,pageLimit:s}=eo(),{graphQLClient:o}=P();return gt(async i=>o.rawRequest(`
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
        `,{teamId:e,cursor:i}),i=>i.data?.team?.labels?.pageInfo,(i,c)=>i.concat(c.data?.team?.labels?.nodes??[]),[],s)}function We(e,t){let{data:s,error:o,isLoading:i}=(0,Ks.useCachedPromise)(_s,[e],{execute:t?.execute!==!1&&!!e});return{labels:s,labelsError:o,isLoadingLabels:!s&&!o||i}}var Zs=require("@raycast/utils");var to=`
  id
  name
  targetDate
  project {
      id
  }
  sortOrder
  updatedAt
`;async function Hs(e){let{graphQLClient:t}=P();if(e){let{data:s}=await t.rawRequest(`
        query($projectId: String!) {
          project(id: $projectId) {
            projectMilestones {
              nodes {
                ${to}
              }
            }
          }
        }
      `,{projectId:e});return s?.project.projectMilestones.nodes}return null}function Qe(e,t){let{data:s,error:o,isLoading:i,mutate:c}=(0,Zs.useCachedPromise)(Hs,[e],{execute:t?.execute!==!1});return{milestones:s,isLoadingMilestones:!s&&!o||i,milestonesError:o,mutateMilestones:c}}var Js=require("@raycast/utils");var so=`
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
`;async function Xs({teamId:e,searchText:t="",after:s=null,first:o=null}){let{graphQLClient:i}=P(),c=`
    projects(first: $first, after: $after, filter: { name: { containsIgnoreCase: $searchText } }) {
      nodes {
        ${so}
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  `;if(!e){let{data:r}=await i.rawRequest(`
        query($first: Int, $after: String, $searchText: String) {
          ${c}
        }
      `,{first:o,after:s,searchText:t}),u=r?.projects;return{data:u?.nodes??[],hasMore:!!u?.pageInfo.hasNextPage,cursor:u?.pageInfo.endCursor||null}}let{data:l}=await i.rawRequest(`
      query($teamId: String!, $first: Int, $after: String, $searchText: String) {
        team(id: $teamId) {
          ${c}
        }
      }
    `,{teamId:e,first:o,after:s,searchText:t}),n=l?.team?.projects;return{data:n?.nodes??[],hasMore:!!n?.pageInfo.hasNextPage,cursor:n?.pageInfo.endCursor||null}}function ze(e,t){let{data:s,error:o,isLoading:i,mutate:c,pagination:l}=(0,Js.useCachedPromise)((n,r)=>u=>Xs({teamId:n,searchText:r,after:u.cursor,first:t?.pageSize}),[e,t?.searchText],{execute:t?.execute!==!1,keepPreviousData:!0});return{projects:s,isLoadingProjects:!s&&!o||i,projectsError:o,mutateProjects:c,pagination:l}}var ti=require("@raycast/utils");var Ys=require("lodash");async function ei(e=""){let{graphQLClient:t,linearClient:s}=P(),o=await s.viewer,{data:i}=await t.rawRequest(`
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
    `,{userId:o.id,query:e}),c=(0,Ys.sortBy)(i?.teams.nodes??[],r=>r.membership?.sortOrder??1/0),l=i?.organization,n=!!i?.teams.pageInfo.hasNextPage;return{teams:c,organization:l,hasMoreTeams:n}}function ft(e=""){let{data:t,error:s,isLoading:o}=(0,ti.useCachedPromise)(ei,[e]);return{teams:t?.teams,org:t?.organization,teamsError:s,isLoadingTeams:!t&&!s||o,supportsTeamTypeahead:e.trim().length>0||t?.hasMoreTeams}}var A=require("react/jsx-runtime");function Kt(e){let{pop:t}=(0,y.useNavigation)(),{issue:s,isLoadingIssue:o,mutateDetail:i}=Oe(e.issue),[c,l]=(0,It.useState)(""),{teams:n,org:r,supportsTeamTypeahead:u,isLoadingTeams:d}=ft(c),h=n&&n.length>1,[D,w]=(0,It.useState)(""),{users:L,supportsUserTypeahead:S,isLoadingUsers:G}=Ee(D),{handleSubmit:j,itemProps:C,values:$,setValue:U}=(0,Be.useForm)({async onSubmit(p){let Y=await(0,y.showToast)({style:y.Toast.Style.Animated,title:"Editing issue"});try{let Ie={teamId:p.teamId||e.issue.team.id,title:p.title,description:p.description,stateId:p.stateId,labelIds:p.labelIds,dueDate:p.dueDate,...v&&p.estimate?{estimate:parseInt(p.estimate)}:{},...p.assigneeId?{assigneeId:p.assigneeId}:{},...p.cycleId?{cycleId:p.cycleId}:{},...p.projectId?{projectId:p.projectId}:{},...p.milestoneId?{projectMilestoneId:p.milestoneId}:{},...p.parentId?{parentId:p.parentId}:{},priority:parseInt(p.priority)},{success:dt}=await Ws(s.id,Ie);dt&&(Y.style=y.Toast.Style.Success,Y.title=`Edited Issue \u2022 ${s.identifier}`,t(),i(),e.mutateList&&e.mutateList(),e.mutateSubIssues&&e.mutateSubIssues())}catch(Ie){Y.style=y.Toast.Style.Failure,Y.title="Failed to edit issue",Y.message=q(Ie)}},validation:{teamId:h?Be.FormValidation.Required:void 0,title:Be.FormValidation.Required,stateId:Be.FormValidation.Required,priority:Be.FormValidation.Required},initialValues:{teamId:e.issue.team.id,title:e.issue.title,description:s.description??void 0,priority:String(e.issue.priority),stateId:e.issue.state.id,estimate:e.issue.estimate?String(e.issue.estimate):void 0,assigneeId:e.issue.assignee?.id,labelIds:e.issue.labels.nodes.map(p=>p.id),dueDate:s.dueDate?new Date(s.dueDate):null,cycleId:e.issue.cycle?.id,projectId:e.issue.project?.id,milestoneId:e.issue.projectMilestone?.id,parentId:e.issue.parent?.id}});(0,It.useEffect)(()=>{U("description",s.description||""),U("dueDate",s.dueDate?new Date(s.dueDate):null)},[s]);let z=!!$.teamId&&$.teamId.trim().length>0,{states:de}=Pe($.teamId,{execute:z}),{labels:X}=We($.teamId,{execute:z}),{cycles:me}=qe($.teamId,{execute:z}),{issues:Se}=ke(rt,[],{execute:z}),{projects:fe}=ze($.teamId,{execute:z}),{milestones:I}=Qe($.projectId,{execute:!!$.projectId}),R=n?.find(p=>p.id===$.teamId),v=R?ot({issueEstimationType:R.issueEstimationType,issueEstimationAllowZero:R.issueEstimationAllowZero,issueEstimationExtended:R.issueEstimationExtended}):null,J=st(de||[]),Me=de&&de.length>0,Xe=e.priorities&&e.priorities.length>0,Je=X&&X.length>0,Z=me&&me.length>0,N=fe&&fe.length>0,Q=I&&I.length>0,Ct=Se&&Se.length>0;return(0,A.jsxs)(y.Form,{actions:(0,A.jsx)(y.ActionPanel,{children:(0,A.jsx)(y.Action.SubmitForm,{onSubmit:j,title:"Edit Issue"})}),isLoading:d||o||G,children:[(u||h)&&(0,A.jsxs)(A.Fragment,{children:[(0,A.jsx)(y.Form.Dropdown,{title:"Team",...C.teamId,...u&&{onSearchTextChange:l,isLoading:d,throttle:!0},children:n?.map(p=>(0,A.jsx)(y.Form.Dropdown.Item,{title:p.name,value:p.id,icon:Dt(p,r)},p.id))}),(0,A.jsx)(y.Form.Separator,{})]}),(0,A.jsx)(y.Form.TextField,{title:"Title",placeholder:"Issue title",autoFocus:!0,...C.title}),(0,A.jsx)(y.Form.TextArea,{title:"Description",placeholder:"Add some details (supports Markdown, e.g. **bold**)",...C.description}),(0,A.jsx)(y.Form.Dropdown,{title:"Status",...C.stateId,children:Me?J.map(p=>(0,A.jsx)(y.Form.Dropdown.Item,{title:p.name,value:p.id,icon:B(p)},p.id)):null}),(0,A.jsx)(y.Form.Dropdown,{title:"Priority",...C.priority,children:Xe?e.priorities?.map(({priority:p,label:Y})=>(0,A.jsx)(y.Form.Dropdown.Item,{title:Y,value:String(p),icon:{source:ge[p]}},p)):null}),(0,A.jsxs)(y.Form.Dropdown,{title:"Assignee",...C.assigneeId,...S&&{onSearchTextChange:w,isLoading:G,throttle:!0},children:[(0,A.jsx)(y.Form.Dropdown.Item,{title:"Unassigned",value:"",icon:y.Icon.Person}),L?.map(p=>(0,A.jsx)(y.Form.Dropdown.Item,{title:p.name,value:p.id,icon:K(p)},p.id))]}),(0,A.jsx)(y.Form.TagPicker,{title:"Labels",...C.labelIds,placeholder:"Add label",children:Je?X.map(({id:p,name:Y,color:Ie})=>(0,A.jsx)(y.Form.TagPicker.Item,{title:Y,value:p,icon:{source:y.Icon.Dot,tintColor:Ie}},p)):null}),v?(0,A.jsxs)(y.Form.Dropdown,{title:"Estimate",...C.estimate,children:[(0,A.jsx)(y.Form.Dropdown.Item,{title:"No estimate",value:"",icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}}),v.map(({estimate:p,label:Y})=>(0,A.jsx)(y.Form.Dropdown.Item,{title:Y,value:String(p),icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}},p))]}):null,(0,A.jsx)(y.Form.DatePicker,{title:"Due Date",type:y.Form.DatePicker.Type.Date,...C.dueDate}),Z||N||Ct?(0,A.jsx)(y.Form.Separator,{}):null,Z?(0,A.jsxs)(y.Form.Dropdown,{title:"Cycle",...C.cycleId,children:[(0,A.jsx)(y.Form.Dropdown.Item,{title:"No Cycle",value:"",icon:{source:{light:"light/no-cycle.svg",dark:"dark/no-cycle.svg"}}}),Ae(me).map(p=>(0,A.jsx)(y.Form.Dropdown.Item,{title:p.title,value:p.id,icon:{source:p.icon}},p.id))]}):null,N?(0,A.jsxs)(y.Form.Dropdown,{title:"Project",...C.projectId,children:[(0,A.jsx)(y.Form.Dropdown.Item,{title:"No Project",value:"",icon:{source:{light:"light/no-project.svg",dark:"dark/no-project.svg"}}}),fe.map(p=>(0,A.jsx)(y.Form.Dropdown.Item,{title:`${p.name} (${p.status.name})`,value:p.id,icon:ee(p)},p.id))]}):null,Q?(0,A.jsxs)(y.Form.Dropdown,{title:"Milestone",storeValue:!0,...C.milestoneId,children:[(0,A.jsx)(y.Form.Dropdown.Item,{title:"No Milestone",value:"",icon:{source:"linear-icons/no-milestone.svg"}}),I.map(p=>(0,A.jsx)(y.Form.Dropdown.Item,{title:`${p.name}  (${p.targetDate||"No Target Date"})`,value:p.id,icon:Te(p)},p.id))]}):null,Ct?(0,A.jsxs)(y.Form.Dropdown,{title:"Parent",...C.parentId,children:[(0,A.jsx)(y.Form.Dropdown.Item,{title:"No Issue",value:"",icon:{source:{light:"light/backlog.svg",dark:"dark/backlog.svg"}}}),Se.map(p=>(0,A.jsx)(y.Form.Dropdown.Item,{title:`${p.identifier} - ${p.title}`,value:p.id,icon:B(p.state)},p.id))]}):null]})}var oe=require("@raycast/api"),oi=require("date-fns");var O=require("@raycast/api"),ii=require("@raycast/utils");var si=require("fs/promises"),Ht=mt(require("path"));var io="application/octet-stream",oo={".apng":"image/apng",".avif":"image/avif",".bmp":"image/bmp",".csv":"text/csv",".doc":"application/msword",".docx":"application/vnd.openxmlformats-officedocument.wordprocessingml.document",".gif":"image/gif",".gz":"application/gzip",".heic":"image/heic",".heif":"image/heif",".ico":"image/x-icon",".jpeg":"image/jpeg",".jpg":"image/jpeg",".json":"application/json",".md":"text/markdown",".mov":"video/quicktime",".mp3":"audio/mpeg",".mp4":"video/mp4",".pdf":"application/pdf",".png":"image/png",".ppt":"application/vnd.ms-powerpoint",".pptx":"application/vnd.openxmlformats-officedocument.presentationml.presentation",".svg":"image/svg+xml",".tar":"application/x-tar",".tif":"image/tiff",".tiff":"image/tiff",".txt":"text/plain",".webm":"video/webm",".webp":"image/webp",".xls":"application/vnd.ms-excel",".xlsx":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",".zip":"application/zip"};function ro(e){return oo[Ht.default.extname(e).toLowerCase()]??io}async function no(e){let{graphQLClient:t}=P(),s=await(0,si.readFile)(e),o=ro(e),i=Ht.default.basename(e),{data:c}=await t.rawRequest(`
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
    `,{size:s.byteLength,contentType:o,filename:i}),l=c?.fileUpload.uploadFile;if(!c?.fileUpload.success||!l)throw new Error(`Failed to request an upload URL for "${i}"`);let n=new Headers({"Content-Type":o,"Cache-Control":"public, max-age=31536000"});l.headers.forEach(({key:u,value:d})=>n.set(u,d));let r=await fetch(l.uploadUrl,{method:"PUT",headers:n,body:s});if(!r.ok)throw new Error(`Failed to upload "${i}": ${r.status} ${r.statusText}`);return{assetUrl:l.assetUrl,contentType:o,name:i}}async function vt(e){let{linearClient:t}=P(),s=await no(e.url),o=await t.createAttachment({issueId:e.issueId,title:s.name,url:s.assetUrl});return{success:o.success,id:o.attachmentId}}async function xt(e){let{linearClient:t}=P(),s=await t.attachmentLinkURL(e.issueId,e.url);return{success:s.success,id:s.attachmentId}}function jt(e){let t=e.split(`
`),s=/https?:\/\/\S+/,o=t.map(i=>i.trim()).filter(i=>s.test(i));return Array.from(new Set(o))}var $e=require("react/jsx-runtime");function Mt({issue:{id:e,title:t,identifier:s}}){let{pop:o}=(0,O.useNavigation)(),{reset:i,itemProps:c,handleSubmit:l}=(0,ii.useForm)({onSubmit:async n=>{let r=await(0,O.showToast)({style:O.Toast.Style.Animated,title:"Attaching links"}),u=jt(n.links);if(u.length===0&&n.attachments.length===0){r.style=O.Toast.Style.Failure,r.title="No links or attachments provided";return}if(u.length>0){let d=u.length===1?"link":"links";try{await Promise.all(u.map(h=>xt({issueId:e,url:h}))),r.style=O.Toast.Style.Success,r.title=`Successfully attached ${d}`}catch(h){r.style=O.Toast.Style.Failure,r.title=`Failed attaching ${d}`,r.message=q(h)}}if(n.attachments.length>0){let d=n.attachments.length===1?"attachment":"attachments";try{r.style=O.Toast.Style.Animated,r.title=`Uploading ${d}\u2026`,await Promise.all(n.attachments.map(h=>vt({issueId:e,url:h}))),r.style=O.Toast.Style.Success,r.title=`Successfully uploaded ${d}`}catch(h){r.style=O.Toast.Style.Failure,r.title=`Failed uploading ${d}`,r.message=q(h)}}i({attachments:[],links:""}),o()},initialValues:{links:""}});return(0,$e.jsxs)(O.Form,{actions:(0,$e.jsx)(O.ActionPanel,{children:(0,$e.jsx)(O.Action.SubmitForm,{onSubmit:l,icon:O.Icon.NewDocument,title:"Attach"})}),navigationTitle:"Add Attachments and Links",children:[(0,$e.jsx)(O.Form.Description,{title:"Issue",text:`[${s}] ${t}`}),(0,$e.jsx)(O.Form.FilePicker,{title:"Attachment",...c.attachments}),(0,$e.jsx)(O.Form.TextArea,{title:"Links",placeholder:`https://a.com
https://b.com
New link(s) on separate line(s)`,...c.links})]})}var Re=require("react/jsx-runtime");function Zt({attachments:e,issue:t}){return(0,Re.jsx)(oe.List,{navigationTitle:`Links for ${t.identifier}`,children:e.map(s=>{let o=new Date(s.updatedAt);return(0,Re.jsx)(oe.List.Item,{icon:s.source?.imageUrl??oe.Icon.Link,title:s.title,subtitle:s.subtitle,accessories:[{date:o,tooltip:`Updated: ${(0,oi.format)(o,"EEEE d MMMM yyyy 'at' HH:mm")}`}],actions:(0,Re.jsxs)(oe.ActionPanel,{children:[(0,Re.jsx)(oe.Action.OpenInBrowser,{url:s.url}),(0,Re.jsx)(oe.Action.Push,{title:"Add Attachments and Links",icon:oe.Icon.NewDocument,target:(0,Re.jsx)(Mt,{issue:t})})]})},s.id)})})}var W=require("@raycast/api"),ri=require("react");var yt=require("react/jsx-runtime");function Ge({comment:e,issue:t,mutateComments:s}){let{linearClient:o}=P(),{pop:i}=(0,W.useNavigation)(),[c,l]=(0,ri.useState)(e?e.body:"");async function n(){await(0,W.showToast)({style:W.Toast.Style.Animated,title:`${e?"Updating":"Adding"} comment`});try{e?await o.updateComment(e.id,{body:c}):await o.createComment({body:c,issueId:t.id}),await(0,W.showToast)({style:W.Toast.Style.Success,title:`${e?"Updated":"Added"} comment`}),i(),s&&s()}catch(r){(0,W.showToast)({style:W.Toast.Style.Failure,title:`Failed to ${e?"update":"add"} comment`,message:q(r)})}}return(0,yt.jsx)(W.Form,{actions:(0,yt.jsx)(W.ActionPanel,{children:(0,yt.jsx)(W.Action.SubmitForm,{title:e?"Edit Comment":"Add Comment",onSubmit:n,icon:e?W.Icon.Pencil:W.Icon.Plus})}),children:(0,yt.jsx)(W.Form.TextArea,{id:"comment",title:"Comment",placeholder:"Leave a comment",value:c,onChange:l})})}var k=require("@raycast/api"),li=require("date-fns"),ci=mt(require("remove-markdown"));var ni=require("@raycast/utils");function Xt(e){let{data:t,error:s,isLoading:o,mutate:i}=(0,ni.useCachedPromise)(Ms,[e]);return{comments:t,commentsError:s,isLoadingComments:o,mutateComments:i}}var ai=require("@raycast/utils");function _e(){let{linearClient:e}=P(),{data:t,error:s,isLoading:o}=(0,ai.useCachedPromise)(()=>e.viewer);return{me:t,meError:s,isLoadingMe:!t&&!s||o}}var V=require("react/jsx-runtime");function Jt({issue:e}){let{linearClient:t}=P(),{me:s,isLoadingMe:o}=_e(),{comments:i,isLoadingComments:c,mutateComments:l}=Xt(e.id);async function n(r){if(await(0,k.confirmAlert)({title:"Delete Comment",message:"Are you sure you want to delete this comment?",icon:{source:k.Icon.Trash,tintColor:k.Color.Red}}))try{await(0,k.showToast)({style:k.Toast.Style.Animated,title:"Deleting comment"}),await l(t.deleteComment(r),{optimisticUpdate(u){return u&&u?.filter(d=>d.id!==r)}}),await(0,k.showToast)({style:k.Toast.Style.Success,title:"Deleted comment"})}catch(u){(0,k.showToast)({style:k.Toast.Style.Failure,title:"Failed to delete comment",message:q(u)})}}return(0,V.jsxs)(k.List,{isLoading:c||o,navigationTitle:`${e.identifier} \u2022 Comments`,searchBarPlaceholder:"Filter by user or comment content",isShowingDetail:!0,children:[(0,V.jsx)(k.List.EmptyView,{title:"No comments",description:"This issue doesn't have any comments.",actions:(0,V.jsx)(k.ActionPanel,{children:(0,V.jsx)(k.Action.Push,{title:"Add Comment",icon:k.Icon.Plus,target:(0,V.jsx)(Ge,{issue:e,mutateComments:l})})})}),i?.map(r=>{let u=new Date(r.createdAt);return(0,V.jsx)(k.List.Item,{title:r.user.displayName,subtitle:r.body,icon:K(r.user),keywords:(0,ci.default)(r.body).replace(/\n/g," ").split(" "),accessories:[{date:u,tooltip:`Created: ${(0,li.format)(u,"EEEE d MMMM yyyy 'at' HH:mm")}`}],detail:(0,V.jsx)(k.List.Item.Detail,{markdown:r.body}),actions:(0,V.jsxs)(k.ActionPanel,{children:[(0,V.jsx)(se,{title:"Open Comment",url:r.url}),s?.id===r.user.id?(0,V.jsxs)(k.ActionPanel.Section,{children:[(0,V.jsx)(k.Action.Push,{title:"Edit Comment",icon:k.Icon.Pencil,shortcut:k.Keyboard.Shortcut.Common.Edit,target:(0,V.jsx)(Ge,{issue:e,comment:r,mutateComments:l})}),(0,V.jsx)(k.Action,{title:"Delete Comment",icon:k.Icon.Trash,style:k.Action.Style.Destructive,shortcut:k.Keyboard.Shortcut.Common.Remove,onAction:()=>n(r.id)})]}):null,(0,V.jsx)(k.ActionPanel.Section,{children:(0,V.jsx)(k.Action.Push,{title:"Add Comment",icon:k.Icon.Plus,shortcut:{macOS:{modifiers:["cmd","shift"],key:"n"},Windows:{modifiers:["ctrl","shift"],key:"n"}},target:(0,V.jsx)(Ge,{issue:e,mutateComments:l})})}),(0,V.jsxs)(k.ActionPanel.Section,{children:[(0,V.jsx)(k.Action.CopyToClipboard,{icon:k.Icon.Clipboard,content:r.url,title:"Copy Comment URL",shortcut:k.Keyboard.Shortcut.Common.CopyPath}),(0,V.jsx)(k.Action.CopyToClipboard,{icon:k.Icon.Clipboard,content:r.body,title:"Copy Comment",shortcut:{macOS:{modifiers:["cmd","shift"],key:"'"},Windows:{modifiers:["ctrl","shift"],key:"'"}}})]}),(0,V.jsx)(k.ActionPanel.Section,{children:(0,V.jsx)(k.Action,{title:"Refresh",icon:k.Icon.ArrowClockwise,shortcut:k.Keyboard.Shortcut.Common.Refresh,onAction:l})})]})},r.id)})]})}var He=require("@raycast/api");var ui=require("@raycast/utils");function ht(){let{linearClient:e}=P(),{data:t,error:s,isLoading:o}=(0,ui.useCachedPromise)(()=>e.issuePriorityValues,[],{initialData:[]});return{priorities:t,prioritiesError:s,isLoadingPriorities:!t&&!s||o}}var a=require("@raycast/api"),Ke=require("@raycast/utils"),De=require("react");function Yt(e={}){return{title:"",description:"",stateId:"",priority:"",assigneeId:"",labelIds:[],estimate:"",dueDate:null,cycleId:"",projectId:"",milestoneId:"",...e}}function ao(e){if(typeof e=="string")try{let t=JSON.parse(e);return typeof t=="object"&&t!==null?t:{}}catch{return{}}return typeof e=="object"&&e!==null?e:{}}function we(e){return typeof e=="string"?e:void 0}function di(e){return typeof e=="number"?String(e):we(e)}function mi(e){if(!Array.isArray(e))return;let t=e.filter(s=>typeof s=="string");return t.length>0?t:void 0}function lo(e){if(typeof e!="string")return;let t=new Date(e);return Number.isNaN(t.getTime())?void 0:t}function pi(e,t={}){let s=ao(e.templateData),o=Yt(t),i=mi(s.labelIds)??mi(s.labels);return{title:we(s.title)??o.title,description:we(s.description)??we(e.description)??o.description,stateId:we(s.stateId)??we(s.statusId)??o.stateId,priority:di(s.priority)??o.priority,assigneeId:we(s.assigneeId)??o.assigneeId,labelIds:i??o.labelIds,estimate:di(s.estimate)??o.estimate,dueDate:s.dueDate!==void 0?lo(s.dueDate)??null:o.dueDate,cycleId:we(s.cycleId)??o.cycleId,projectId:we(s.projectId)??o.projectId,milestoneId:o.milestoneId}}var Ii=require("@raycast/utils");var gi=`
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
`;function co(e,t){let s=e.type.toLowerCase()==="issue",o=!e.team||e.team.id===t;return s&&!e.archivedAt&&o}function uo(e,t){return(e.sortOrder??0)-(t.sortOrder??0)||e.name.localeCompare(t.name)}async function fi(e){if(!e)return[];let{graphQLClient:t}=P(),{data:s}=await t.rawRequest(`
      query IssueTemplates($teamId: String!, $first: Int) {
        organization {
          templates(first: $first) {
            nodes {
              ${gi}
            }
          }
        }
        team(id: $teamId) {
          templates(first: $first) {
            nodes {
              ${gi}
            }
          }
        }
      }
    `,{teamId:e,first:100});return[...s?.organization?.templates?.nodes??[],...s?.team?.templates?.nodes??[]].filter((i,c,l)=>l.findIndex(n=>n.id===i.id)===c).filter(i=>co(i,e)).sort(uo)}function es(e,t){let{data:s,error:o,isLoading:i}=(0,Ii.useCachedPromise)(fi,[e],{execute:t?.execute!==!1&&!!e});return{issueTemplates:s,issueTemplatesError:o,isLoadingIssueTemplates:!s&&!o||i}}var F=require("@raycast/api"),yi=require("date-fns");var E=require("react/jsx-runtime");function Pt({issue:e,mutateList:t,priorities:s,me:o}){let{issue:i,isLoadingIssue:c,mutateDetail:l}=Oe(e),n=`# ${i?.title}`;i?.description&&(n+=`

${i.description}`);let r=i?.cycle?ye(i.cycle):null,u=i.relations?i.relations.nodes.filter(D=>D.type=="related"):null,d=i.relations?i.relations.nodes.filter(D=>D.type=="duplicate"):null,h=i.attachments?.nodes.length??0;return(0,E.jsx)(F.Detail,{markdown:n,isLoading:c,...i?{metadata:(0,E.jsxs)(F.Detail.Metadata,{children:[(0,E.jsx)(F.Detail.Metadata.Label,{title:"Status",text:i.state.name,icon:B(i.state)}),(0,E.jsx)(F.Detail.Metadata.Label,{title:"Priority",text:i.priorityLabel,icon:{source:ge[i.priority]}}),(0,E.jsx)(F.Detail.Metadata.Label,{title:"Assignee",text:i.assignee?i.assignee.displayName:"Unassigned",icon:K(i.assignee)}),i.team.issueEstimationType!=="notUsed"?(0,E.jsx)(F.Detail.Metadata.Label,{title:"Estimate",text:Rt({estimate:i.estimate,issueEstimationType:i.team.issueEstimationType}),icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}}):null,i.labels.nodes.length>0?(0,E.jsx)(F.Detail.Metadata.TagList,{title:"Labels",children:i.labels.nodes.map(({id:D,name:w,color:L})=>(0,E.jsx)(F.Detail.Metadata.TagList.Item,{text:w,color:L},D))}):(0,E.jsx)(F.Detail.Metadata.Label,{title:"Labels",text:"No Labels"}),i.dueDate?(0,E.jsx)(F.Detail.Metadata.Label,{title:"Due Date",text:(0,yi.format)(new Date(i.dueDate),"MM/dd/yyyy"),icon:$t(new Date(i.dueDate))}):null,h>0?(0,E.jsx)(F.Detail.Metadata.Label,{title:"Links",text:`${h>1?`${h} links`:"1 link"}`,icon:F.Icon.Link}):null,(0,E.jsx)(F.Detail.Metadata.Separator,{}),(0,E.jsx)(F.Detail.Metadata.Label,{title:"Cycle",text:r?r.title:"No Cycle",icon:{source:r?r.icon:{light:"light/no-cycle.svg",dark:"dark/no-cycle.svg"}}}),(0,E.jsx)(F.Detail.Metadata.Label,{title:"Project",text:i.project?i.project.name:"No Project",icon:ee(i.project)}),(0,E.jsx)(F.Detail.Metadata.Label,{title:"Milestone",text:i.projectMilestone?i.projectMilestone.name:"No Milestone",icon:Te(i.projectMilestone)}),(0,E.jsx)(F.Detail.Metadata.Label,{title:"Parent Issue",text:i.parent?i.parent.title:"No Issue",icon:i.parent?B(i.parent.state):{source:{light:"light/backlog.svg",dark:"dark/backlog.svg"}}}),u&&u.length>0?(0,E.jsx)(F.Detail.Metadata.TagList,{title:"Related",children:u.map(({id:D,relatedIssue:w})=>(0,E.jsx)(F.Detail.Metadata.TagList.Item,{text:w.identifier},D))}):null,d&&d.length>0?(0,E.jsx)(F.Detail.Metadata.TagList,{title:"Duplicates",children:d.map(({id:D,relatedIssue:w})=>(0,E.jsx)(F.Detail.Metadata.TagList.Item,{text:w.identifier},D))}):null]}),actions:(0,E.jsx)(F.ActionPanel,{children:(0,E.jsx)(nt,{issue:i,mutateList:t,mutateDetail:l,priorities:s,showAttachmentsAction:h>0,attachments:i.attachments?.nodes??[],me:o})})}:{}})}var f=require("react/jsx-runtime");function mo(e,t){return e==="url"?{title:"Copy Issue URL",onAction:()=>a.Clipboard.copy(t.url)}:e==="id-as-link"?{title:"Copy Issue ID as Link",onAction:()=>a.Clipboard.copy({text:`[${t.identifier}](${t.url})`,html:`<a href="${t.url}">${t.identifier}</a>`})}:e==="title"?{title:"Copy Issue Title",onAction:()=>a.Clipboard.copy(t.title)}:e==="title-as-link"?{title:"Copy Issue Title as Link",onAction:()=>a.Clipboard.copy({text:`[${t.title}](${t.url})`,html:`<a href="${t.url}">${t.title}</a>`})}:{title:"Copy Issue ID",onAction:()=>a.Clipboard.copy(t.identifier)}}function ts(e){let{push:t}=(0,a.useNavigation)(),{autofocusField:s,copyToastAction:o}=(0,a.getPreferenceValues)(),[i,c]=(0,De.useState)(""),{teams:l,org:n,supportsTeamTypeahead:r,isLoadingTeams:u}=ft(i),d=l&&l.length>1,[h,D]=(0,De.useState)(""),{users:w,supportsUserTypeahead:L,isLoadingUsers:S}=Ee(h),{handleSubmit:G,itemProps:j,values:C,setValue:$,focus:U,reset:z,setValidationError:de}=(0,Ke.useForm)({async onSubmit(m){let x=await(0,a.showToast)({style:a.Toast.Style.Animated,title:"Creating issue"}),Le=d?m.teamId:l?.[0]?.id;if(!Le)return de("teamId","The team is required."),!1;try{let _={teamId:Le,title:m.title,description:m.description||"",stateId:m.stateId,labelIds:m.labelIds,dueDate:m.dueDate,...N&&m.estimate?{estimate:parseInt(m.estimate)}:{},...m.assigneeId?{assigneeId:m.assigneeId}:{},...m.cycleId?{cycleId:m.cycleId}:{},...m.projectId?{projectId:m.projectId}:{},...m.milestoneId?{projectMilestoneId:m.milestoneId}:{},...m.parentId?{parentId:m.parentId}:{},priority:parseInt(m.priority)},{success:Ot,issue:Ye}=await Fs(_);if(Ot&&Ye){x.style=a.Toast.Style.Success,x.title=`Created Issue \u2022 ${Ye?.identifier}`,x.primaryAction={title:"Open Issue",shortcut:a.Keyboard.Shortcut.Common.OpenWith,onAction:async()=>{t((0,f.jsx)(Pt,{issue:Ye,priorities:e.priorities,me:e.me})),await x.hide()}},x.secondaryAction={shortcut:a.Keyboard.Shortcut.Common.Copy,...mo(o,Ye)},z({templateId:"",title:"",description:"",estimate:"",labelIds:[],dueDate:null,parentId:"",attachments:[],links:""}),U(d&&s?s:"title");let Vt=jt(m.links);if(Vt.length>0){let Ue=Vt.length===1?"link":"links";try{x.message=`Attaching ${Ue}\u2026`,await Promise.all(Vt.map(Fe=>xt({issueId:Ye.id,url:Fe}))),x.message=`Successfully attached ${Ue}`}catch(Fe){x.style=a.Toast.Style.Failure,x.title=`Failed attaching ${Ue}`,x.message=q(Fe)}}if(m.attachments.length>0){let Ue=m.attachments.length===1?"attachment":"attachments";try{x.message=`Uploading ${Ue}\u2026`,await Promise.all(m.attachments.map(Fe=>vt({issueId:Ye.id,url:Fe}))),x.message=`Successfully uploaded ${Ue}`}catch(Fe){x.style=a.Toast.Style.Failure,x.title=`Failed uploading ${Ue}`,x.message=q(Fe)}}}}catch(_){x.style=a.Toast.Style.Failure,x.title="Failed to create issue",x.message=q(_)}$("teamId",Le)},validation:{teamId:d?Ke.FormValidation.Required:void 0,title:Ke.FormValidation.Required,stateId:Ke.FormValidation.Required,priority:Ke.FormValidation.Required},initialValues:{templateId:e.draftValues?.templateId||"",teamId:e.draftValues?.teamId||e.teamId,title:e.draftValues?.title,description:e.draftValues?.description,priority:e.draftValues?.priority,stateId:e.draftValues?.stateId,estimate:e.draftValues?.estimate,assigneeId:e.draftValues?.assigneeId||e.assigneeId,labelIds:e.draftValues?.labelIds||[],dueDate:e.draftValues?.dueDate,cycleId:e.draftValues?.cycleId||e.cycleId,projectId:e.draftValues?.projectId||e.projectId,milestoneId:e.draftValues?.milestoneId||e.milestoneId,parentId:e.draftValues?.parentId||e.parentId,links:e.draftValues?.links||""}}),X=!!C.teamId&&C.teamId.trim().length>0,{issueTemplates:me,isLoadingIssueTemplates:Se}=es(C.teamId,{execute:X}),{states:fe}=Pe(C.teamId,{execute:X}),{labels:I}=We(C.teamId,{execute:X}),{cycles:R}=qe(C.teamId,{execute:X}),{issues:v}=ke(rt,[],{execute:X}),{projects:J}=ze(C.teamId,{execute:X}),{milestones:Me}=Qe(C.projectId,{execute:!!C.projectId});(0,De.useEffect)(()=>{l?.length===1&&$("teamId",l[0].id)},[l]);let Xe=(0,De.useRef)(!1);(0,De.useEffect)(()=>{if(!Xe.current){Xe.current=!0;return}Je("")},[C.teamId]);function Je(m){$("templateId",m);let x=me?.find(Ot=>Ot.id===m),Le={assigneeId:e.assigneeId||"",cycleId:e.cycleId||"",projectId:e.projectId||"",milestoneId:e.milestoneId||""},_=x?pi(x,Le):Yt(Le);$("title",_.title),$("description",_.description),$("stateId",_.stateId),$("priority",_.priority),$("assigneeId",_.assigneeId),$("labelIds",_.labelIds),$("estimate",_.estimate),$("dueDate",_.dueDate),$("cycleId",_.cycleId),$("projectId",_.projectId),$("milestoneId",_.milestoneId??"")}let Z=l?.find(m=>m.id===C.teamId),N=Z?ot({issueEstimationType:Z.issueEstimationType,issueEstimationAllowZero:Z.issueEstimationAllowZero,issueEstimationExtended:Z.issueEstimationExtended}):null,Q=st(fe||[]),Ct=fe&&fe.length>0,p=e.priorities&&e.priorities.length>0,Y=I&&I.length>0,Ie=R&&R.length>0,dt=J&&J.length>0,ds=Me&&Me.length>0,Nt=v&&v.length>0,Ei=me&&me.length>0;return(0,f.jsxs)(a.Form,{enableDrafts:e.enableDrafts,actions:(0,f.jsxs)(a.ActionPanel,{children:[(0,f.jsx)(a.Action.SubmitForm,{icon:a.Icon.Plus,onSubmit:G,title:"Create Issue"}),(0,f.jsxs)(a.ActionPanel.Section,{children:[(0,f.jsx)(a.Action,{title:"Focus Title",icon:a.Icon.TextInput,onAction:()=>U("title"),shortcut:a.Keyboard.Shortcut.Common.Edit}),(0,f.jsx)(a.Action,{title:"Focus Description",icon:a.Icon.TextInput,onAction:()=>U("description"),shortcut:{modifiers:["ctrl"],key:"e"}}),(0,f.jsx)(a.Action,{title:"Focus Status",icon:a.Icon.Circle,onAction:()=>U("stateId"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"s"},Windows:{modifiers:["ctrl","shift"],key:"s"}}}),(0,f.jsx)(a.Action,{title:"Focus Priority",icon:a.Icon.LevelMeter,onAction:()=>U("priority"),shortcut:a.Keyboard.Shortcut.Common.Pin}),(0,f.jsx)(a.Action,{title:"Focus Assignee",icon:a.Icon.AddPerson,onAction:()=>U("assigneeId"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"a"},Windows:{modifiers:["ctrl","shift"],key:"a"}}}),N?(0,f.jsx)(a.Action,{title:"Focus Estimate",icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}},onAction:()=>U("estimate"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"e"},Windows:{modifiers:["ctrl","shift"],key:"e"}}}):null,(0,f.jsx)(a.Action,{title:"Focus Due Date",icon:a.Icon.Calendar,onAction:()=>U("dueDate"),shortcut:{macOS:{modifiers:["opt","shift"],key:"d"},Windows:{modifiers:["alt","shift"],key:"d"}}}),(0,f.jsx)(a.Action,{title:"Focus Labels",icon:a.Icon.Tag,onAction:()=>U("labelIds"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"l"},Windows:{modifiers:["ctrl","shift"],key:"l"}}}),Ie?(0,f.jsx)(a.Action,{title:"Focus Cycle",icon:{source:{light:"light/cycle.svg",dark:"dark/cycle.svg"}},onAction:()=>U("cycleId"),shortcut:a.Keyboard.Shortcut.Common.Copy}):null,dt?(0,f.jsx)(a.Action,{title:"Focus Project",icon:{source:{light:"light/project.svg",dark:"dark/project.svg"}},onAction:()=>U("projectId"),shortcut:{modifiers:["ctrl","shift"],key:"p"}}):null,ds?(0,f.jsx)(a.Action,{title:"Focus Milestone",icon:{source:{light:"light/milestone.svg",dark:"dark/milestone.svg"}},onAction:()=>U("milestoneId"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"m"},Windows:{modifiers:["ctrl","shift"],key:"m"}}}):null,Nt?(0,f.jsx)(a.Action,{title:"Focus Parent Issue",icon:{source:{light:"light/backlog.svg",dark:"dark/backlog.svg"}},onAction:()=>U("parentId"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"i"},Windows:{modifiers:["ctrl","shift"],key:"i"}}}):null,(0,f.jsx)(a.Action,{title:"Focus Attachments",icon:a.Icon.NewDocument,onAction:()=>U("attachments"),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"a"},Windows:{modifiers:["ctrl","alt","shift"],key:"a"}}}),(0,f.jsx)(a.Action,{title:"Focus Links",icon:a.Icon.Link,onAction:()=>U("links"),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"l"},Windows:{modifiers:["ctrl","alt","shift"],key:"l"}}})]})]}),isLoading:u||S||e.isLoading,children:[(r||d)&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(a.Form.Dropdown,{title:"Team",storeValue:!0,...j.teamId,...r&&{onSearchTextChange:c,isLoading:u,throttle:!0},children:l?.map(m=>(0,f.jsx)(a.Form.Dropdown.Item,{title:m.name,value:m.id,icon:Dt(m,n)},m.id))}),(0,f.jsx)(a.Form.Separator,{})]}),X&&(Se||Ei)?(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)(a.Form.Dropdown,{id:"templateId",title:"Template",value:C.templateId||"",onChange:Je,isLoading:Se,children:[(0,f.jsx)(a.Form.Dropdown.Item,{title:"No Template",value:"",icon:a.Icon.Document}),me?.map(m=>(0,f.jsx)(a.Form.Dropdown.Item,{title:m.name,value:m.id,icon:a.Icon.Document},m.id))]}),(0,f.jsx)(a.Form.Separator,{})]}):null,(0,f.jsx)(a.Form.TextField,{title:"Title",placeholder:"Issue title",...s==="title"?{autoFocus:!0}:{},...j.title}),(0,f.jsx)(a.Form.TextArea,{title:"Description",placeholder:"Add some details (supports Markdown, e.g. **bold**)",enableMarkdown:!0,...j.description}),(0,f.jsx)(a.Form.Dropdown,{title:"Status",storeValue:!0,...j.stateId,children:Ct?Q.map(m=>(0,f.jsx)(a.Form.Dropdown.Item,{title:m.name,value:m.id,icon:B(m)},m.id)):null}),(0,f.jsx)(a.Form.Dropdown,{title:"Priority",storeValue:!0,...j.priority,children:p?e.priorities?.map(({priority:m,label:x})=>(0,f.jsx)(a.Form.Dropdown.Item,{title:x,value:String(m),icon:{source:ge[m]}},m)):null}),(0,f.jsxs)(a.Form.Dropdown,{title:"Assignee",storeValue:!0,...j.assigneeId,...L&&{onSearchTextChange:D,isLoading:S,throttle:!0},children:[(0,f.jsx)(a.Form.Dropdown.Item,{title:"Unassigned",value:"",icon:a.Icon.Person}),w?.map(m=>(0,f.jsx)(a.Form.Dropdown.Item,{title:m.name,value:m.id,icon:K(m)},m.id))]}),(0,f.jsx)(a.Form.TagPicker,{title:"Labels",placeholder:"Add label",...j.labelIds,children:Y?I.map(({id:m,name:x,color:Le})=>(0,f.jsx)(a.Form.TagPicker.Item,{title:x,value:m,icon:{source:a.Icon.Dot,tintColor:Le}},m)):null}),N?(0,f.jsxs)(a.Form.Dropdown,{title:"Estimate",...j.estimate,children:[(0,f.jsx)(a.Form.Dropdown.Item,{title:"No estimate",value:"",icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}}),N.map(({estimate:m,label:x})=>(0,f.jsx)(a.Form.Dropdown.Item,{title:x,value:String(m),icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}},m))]}):null,(0,f.jsx)(a.Form.DatePicker,{title:"Due Date",type:a.Form.DatePicker.Type.Date,...j.dueDate}),Ie||dt||Nt?(0,f.jsx)(a.Form.Separator,{}):null,Ie?(0,f.jsxs)(a.Form.Dropdown,{title:"Cycle",storeValue:!0,...j.cycleId,children:[(0,f.jsx)(a.Form.Dropdown.Item,{title:"No Cycle",value:"",icon:{source:{light:"light/no-cycle.svg",dark:"dark/no-cycle.svg"}}}),Ae(R).map(m=>(0,f.jsx)(a.Form.Dropdown.Item,{title:m.title,value:m.id,icon:{source:m.icon}},m.id))]}):null,dt?(0,f.jsxs)(a.Form.Dropdown,{title:"Project",storeValue:!0,...j.projectId,children:[(0,f.jsx)(a.Form.Dropdown.Item,{title:"No Project",value:"",icon:{source:{light:"light/no-project.svg",dark:"dark/no-project.svg"}}}),J.map(m=>(0,f.jsx)(a.Form.Dropdown.Item,{title:`${m.name} (${m.status.name})`,value:m.id,icon:ee(m)},m.id))]}):null,ds?(0,f.jsxs)(a.Form.Dropdown,{title:"Milestone",storeValue:!0,...j.milestoneId,children:[(0,f.jsx)(a.Form.Dropdown.Item,{title:"No Milestone",value:"",icon:{source:"linear-icons/no-milestone.svg"}}),Me.map(m=>(0,f.jsx)(a.Form.Dropdown.Item,{title:`${m.name} (${m.targetDate||"No Target Date"})`,value:m.id,icon:Te(m)},m.id))]}):null,Nt?(0,f.jsxs)(a.Form.Dropdown,{title:"Parent",...j.parentId,children:[(0,f.jsx)(a.Form.Dropdown.Item,{title:"No Issue",value:"",icon:{source:{light:"light/backlog.svg",dark:"dark/backlog.svg"}}}),v.map(m=>(0,f.jsx)(a.Form.Dropdown.Item,{title:`${m.identifier} - ${m.title}`,value:m.id,icon:B(m.state)},m.id))]}):null,(0,f.jsx)(a.Form.Separator,{}),(0,f.jsx)(a.Form.FilePicker,{title:"Attachment",...j.attachments}),(0,f.jsx)(a.Form.TextArea,{title:"Links",placeholder:`https://a.com
https://b.com
New link(s) on separate line(s)`,...j.links})]})}var ve=require("react/jsx-runtime");function ss({issue:e,mutateList:t}){let{issues:s,isLoadingIssues:o,mutateList:i}=ke(u=>xs(u),[e.id]),{priorities:c,isLoadingPriorities:l}=ht(),{me:n,isLoadingMe:r}=_e();return(0,ve.jsxs)(He.List,{isLoading:o||r||l||r,navigationTitle:`${e.identifier} \u2022 Sub-issues`,children:[(0,ve.jsx)(He.List.EmptyView,{title:"No issues",description:"This issue doesn't have any sub-issues.",actions:(0,ve.jsx)(He.ActionPanel,{children:(0,ve.jsx)(He.Action.Push,{title:"Create Sub-Issue",target:(0,ve.jsx)(ts,{priorities:c,me:n,parentId:e.id,projectId:e.project?.id,cycleId:e.cycle?.id,teamId:e.team.id})})})}),s?.map(u=>(0,ve.jsx)(kt,{issue:u,mutateList:t,mutateSubIssues:i,priorities:c,me:n},u.id))]})}var M=require("@raycast/api");function Pi(e){let t=[`Work on Linear issue ${e.identifier}:`,""],s=po(e.branchName);if(s&&t.push(`Suggested branch name: ${s}`,""),t.push(`<issue identifier="${Ut(e.identifier)}">`),t.push(`<title>${e.title}</title>`),t.push(...ki(e.description)),e.team?.name&&t.push(`<team name="${Ut(e.team.name)}"/>`),e.labels?.nodes?.forEach(i=>{t.push(`<label>${i.name}</label>`)}),e.project?.name){let i=Ut(e.project.name);t.push(e.project.description?`<project name="${i}">${e.project.description}</project>`:`<project name="${i}"/>`)}e.parent&&t.push(...hi("parent-issue",e.parent));let o=e.children?.nodes??[];return o.length>0&&(t.push("<sub-issues>"),o.forEach(i=>t.push(...hi("sub-issue",i))),t.push("</sub-issues>")),t.push("</issue>"),t.join(`
`)}function hi(e,t){return[`<${e} identifier="${Ut(t.identifier)}">`,`<id>${t.id}</id>`,`<title>${t.title}</title>`,...ki(t.description),`</${e}>`]}function ki(e){return e?e.includes(`
`)?["<description>",e,"</description>"]:[`<description>${e}</description>`]:[]}function po(e){return e&&e.slice(e.lastIndexOf("/")+1)}function Ut(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}var re=require("react/jsx-runtime"),go={ISSUE_TITLE:"title",ISSUE_ID:"identifier",ISSUE_URL:"url",ISSUE_BRANCH_NAME:"branchName"};function fo(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Io(e){return e.replace(/\[/g,"\\[").replace(/\]/g,"\\]")}function yo(e){return{html:`<a href="${e.url}">${fo(e.title)}</a>`,text:`[${Io(e.title)}](${e.url})`}}function is({issue:e}){let{issueCustomCopyAction:t}=(0,M.getPreferenceValues)();async function s(){let o=await(0,M.showToast)({style:M.Toast.Style.Animated,title:"Copying prompt"});try{await M.Clipboard.copy(Pi(await js(e.id))),o.style=M.Toast.Style.Success,o.title="Copied prompt to clipboard"}catch(i){o.style=M.Toast.Style.Failure,o.title="Failed copying prompt",o.message=q(i)}}return(0,re.jsxs)(M.ActionPanel.Section,{children:[(0,re.jsx)(M.Action.CopyToClipboard,{content:e.identifier,title:"Copy Issue ID",shortcut:{macOS:{modifiers:["cmd"],key:"."},Windows:{modifiers:["ctrl"],key:"."}}}),(0,re.jsx)(M.Action.CopyToClipboard,{content:{html:`<a href="${e.url}" title="${e.title}">${e.identifier}: ${e.title}</a>`,text:e.url},title:"Copy Formatted Issue URL",shortcut:M.Keyboard.Shortcut.Common.CopyPath}),(0,re.jsx)(M.Action.CopyToClipboard,{content:e.url,title:"Copy Issue URL",shortcut:{macOS:{modifiers:["cmd","shift"],key:"u"},Windows:{modifiers:["ctrl","shift"],key:"u"}}}),(0,re.jsx)(M.Action.CopyToClipboard,{content:e.title,title:"Copy Issue Title",shortcut:{macOS:{modifiers:["cmd","shift"],key:"'"},Windows:{modifiers:["ctrl","shift"],key:"'"}}}),(0,re.jsx)(M.Action.CopyToClipboard,{content:yo(e),title:"Copy Title as Link",shortcut:{macOS:{modifiers:["cmd","shift"],key:"t"},Windows:{modifiers:["ctrl","shift"],key:"t"}}}),(0,re.jsx)(M.Action.CopyToClipboard,{content:e.branchName,title:"Copy Git Branch Name",shortcut:M.Keyboard.Shortcut.Common.CopyName}),t&&t!==""?(0,re.jsx)(M.Action.CopyToClipboard,{content:t?.replace(/\{(.*?)\}/g,(o,i)=>{let c=e[go[i]];return c||o}),title:"Custom Copy",shortcut:{macOS:{modifiers:["cmd","opt"],key:"."},Windows:{modifiers:["ctrl","alt"],key:"."}}}):null,(0,re.jsx)(M.Action,{icon:M.Icon.Clipboard,title:"Copy as Prompt",onAction:s,shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"p"},Windows:{modifiers:["ctrl","alt","shift"],key:"p"}}})]})}var ne=require("@raycast/api"),wi=require("react");var ae=require("react/jsx-runtime");function os({issue:e,updateIssue:t}){let{linearClient:s}=P(),[o,i]=(0,wi.useState)(!1),{cycles:c,isLoadingCycles:l}=qe(e.team.id,{execute:o}),n=e.cycle?ye(e.cycle):null,r=n?.isActive||!1,u=n?.isNext||!1;async function d(w){let L=e.cycle;t({animatedTitle:"Moving to cycle",payload:{cycleId:w?.id||null},optimisticUpdate(S){return{...S,cycle:w||void 0}},rollbackUpdate(S){return{...S,cycle:L}},successTitle:w?"Moved to cycle":"Removed from cycle",successMessage:w?.title?w.title:"",errorTitle:"Failed to move to cycle"})}async function h(){let{nodes:w}=await s.cycles({filter:{team:{id:{eq:e.team.id}}}}),L=Ae(w||[]),S=L.findIndex(C=>C.isActive),j=(S>-1?L[S]:null)?L[S+1]:null;if(j)return d(j)}async function D(){let{nodes:w}=await s.cycles({filter:{team:{id:{eq:e.team.id}}}}),S=Ae(w||[]).find(G=>G.isActive);if(S)return d(S)}return(0,ae.jsxs)(ae.Fragment,{children:[(0,ae.jsxs)(ne.ActionPanel.Submenu,{title:"Move to Cycle",icon:{source:{light:"light/cycle.svg",dark:"dark/cycle.svg"}},shortcut:ne.Keyboard.Shortcut.Common.Copy,onOpen:()=>i(!0),children:[(0,ae.jsx)(ne.Action,{title:"No Cycle",icon:{source:{light:"light/no-cycle.svg",dark:"dark/no-cycle.svg"}},onAction:()=>d(null)}),!c&&l?(0,ae.jsx)(ne.Action,{title:"Loading\u2026"}):Ae(c||[]).map(w=>(0,ae.jsx)(ne.Action,{autoFocus:w.id===n?.id,title:w.title,icon:{source:w.icon},onAction:()=>d(w)},w.id))]}),r?null:(0,ae.jsx)(ne.Action,{title:"Move to Active Cycle",icon:{source:{light:"light/active-cycle.svg",dark:"dark/active-cycle.svg"}},shortcut:ne.Keyboard.Shortcut.Common.Copy,onAction:()=>D()}),u?null:(0,ae.jsx)(ne.Action,{title:"Move to Next Cycle",icon:{source:{light:"light/cycle.svg",dark:"dark/cycle.svg"}},shortcut:{macOS:{modifiers:["cmd","shift"],key:"n"},Windows:{modifiers:["ctrl","shift"],key:"n"}},onAction:()=>h()})]})}var le=require("@raycast/api"),Ci=require("lodash"),bi=require("react");var Ce=require("react/jsx-runtime");function rs({issue:e,updateIssue:t}){let[s,o]=(0,bi.useState)(!1),{labels:i}=We(e.team.id,{execute:s}),[,c]=(0,Ci.partition)(i||[],r=>e.labels.nodes.map(u=>u.id).includes(r.id));async function l(r){let u=e.labels.nodes.map(d=>d.id);t({animatedTitle:"Adding label",payload:{labelIds:[...u,r.id]},optimisticUpdate(d){return{...d,labels:{...d.labels,nodes:[...d.labels.nodes,r]}}},rollbackUpdate(d){return{...d,labels:{...d.labels,nodes:d.labels.nodes.filter(h=>h.id!==r.id)}}},successTitle:"Added label",successMessage:`Label "${r.name}" added to ${e.identifier}`,errorTitle:"Failed to add label"})}async function n(r){let u=e.labels.nodes.map(d=>d.id);t({animatedTitle:"Remove label",payload:{labelIds:u.filter(d=>d!==r.id)},optimisticUpdate(d){return{...d,labels:{...d.labels,nodes:d.labels.nodes.filter(h=>h.id!==r.id)}}},rollbackUpdate(d){return{...d,labels:{...d.labels,nodes:[...d.labels.nodes,r]}}},successTitle:"Removed label",successMessage:`Label "${r.name}" removed from ${e.identifier}`,errorTitle:"Failed to remove label"})}return(0,Ce.jsxs)(Ce.Fragment,{children:[(0,Ce.jsx)(le.ActionPanel.Submenu,{title:"Add Label",icon:le.Icon.Tag,shortcut:{macOS:{modifiers:["cmd","shift"],key:"l"},Windows:{modifiers:["ctrl","shift"],key:"l"}},onOpen:()=>o(!0),children:c.map(r=>(0,Ce.jsx)(le.Action,{title:r.name,icon:{source:le.Icon.Dot,tintColor:r.color},onAction:()=>l(r)},r.id))}),e.labels.nodes.length>0?(0,Ce.jsx)(le.ActionPanel.Submenu,{title:"Remove Label",icon:le.Icon.Tag,shortcut:{macOS:{modifiers:["cmd","shift"],key:"l"},Windows:{modifiers:["ctrl","shift"],key:"l"}},children:e.labels.nodes.map(r=>(0,Ce.jsx)(le.Action,{title:r.name,icon:{source:le.Icon.Dot,tintColor:r.color},onAction:()=>n(r)},r.id))}):null]})}var xe=require("@raycast/api"),Si=require("react");var at=require("react/jsx-runtime");function ns({issue:e,updateIssue:t}){let[s,o]=(0,Si.useState)(!1),{milestones:i,isLoadingMilestones:c}=Qe(e.project?.id,{execute:s});async function l(n){let r=e.projectMilestone;t({animatedTitle:"Setting milestone",payload:{projectMilestoneId:n?n.id:null},optimisticUpdate(u){return{...u,milestone:n||void 0}},rollbackUpdate(u){return{...u,milestone:r}},successTitle:n?"Set milestone":`Removed milestone from ${e.identifier}`,successMessage:n?`"${n.name}" added to ${e.identifier}`:"",errorTitle:"Failed to set milestone"})}return(0,at.jsxs)(xe.ActionPanel.Submenu,{title:"Set Milestone",icon:{source:"linear-icons/milestone.svg",tintColor:xe.Color.PrimaryText},shortcut:{modifiers:["ctrl","shift"],key:"m"},onOpen:()=>o(!0),children:[(0,at.jsx)(xe.Action,{title:"No Milestone",icon:{source:"linear-icons/no-milestone.svg"},onAction:()=>l(null)}),!i&&c?(0,at.jsx)(xe.Action,{title:"Loading\u2026"}):(i||[]).map(n=>(0,at.jsx)(xe.Action,{autoFocus:n.id===e.projectMilestone?.id,title:`${n.name}  (${n.targetDate||"No Target Date"})`,icon:Te(n),onAction:()=>l(n)},n.id))]})}var lt=require("@raycast/api"),Li=require("react");var be=require("react/jsx-runtime");function as({issue:e,updateIssue:t}){let[s,o]=(0,Li.useState)(!1),{issues:i,isLoadingIssues:c}=ke(rt,[],{execute:s}),l=e.parent,n=l?.id,r=!!n;async function u(d){t({animatedTitle:"Setting parent issue",payload:{parentId:d?d.id:null},optimisticUpdate(h){return{...h,parent:d||void 0}},rollbackUpdate(h){return{...h,parent:l}},successTitle:"Set parent issue",successMessage:d?`${d.identifier} set as parent issue`:`Removed parent issue from ${e.identifier}`,errorTitle:"Failed to set parent issue"})}return(0,be.jsxs)(be.Fragment,{children:[(0,be.jsx)(lt.ActionPanel.Submenu,{title:r?"Change Parent Issue":"Set Parent Issue",icon:{source:{light:"light/parent-issue.svg",dark:"dark/parent-issue.svg"}},shortcut:{modifiers:["ctrl","shift"],key:"i"},onOpen:()=>o(!0),children:!i&&c?(0,be.jsx)(lt.Action,{title:"Loading\u2026"}):(i||[]).map(d=>(0,be.jsx)(lt.Action,{autoFocus:d.id===n,title:`${d.identifier} - ${d.title}`,icon:B(d.state),onAction:()=>u(d)},d.id))}),r?(0,be.jsx)(lt.Action,{title:"Remove Parent Issue",icon:{source:{light:"light/parent-issue.svg",dark:"dark/parent-issue.svg"}},shortcut:{macOS:{modifiers:["cmd","shift"],key:"k"},Windows:{modifiers:["ctrl","shift"],key:"k"}},onAction:()=>u(null)}):null]})}var ct=require("@raycast/api"),Ai=require("react");var ut=require("react/jsx-runtime");function ls({issue:e,updateIssue:t}){let[s,o]=(0,Ai.useState)(!1),{projects:i,isLoadingProjects:c}=ze(e.team.id,{execute:s});async function l(n){let r=e.project;t({animatedTitle:"Setting project",payload:{projectId:n?n.id:null},optimisticUpdate(u){return{...u,project:n||void 0}},rollbackUpdate(u){return{...u,project:r}},successTitle:n?"Set project":`Removed project from ${e.identifier}`,successMessage:n?`"${n.name}" added to ${e.identifier}`:"",errorTitle:"Failed to set project"})}return(0,ut.jsxs)(ct.ActionPanel.Submenu,{title:"Set Project",icon:{source:{light:"light/project.svg",dark:"dark/project.svg"}},shortcut:{modifiers:["ctrl","shift"],key:"p"},onOpen:()=>o(!0),children:[(0,ut.jsx)(ct.Action,{title:"No Project",icon:{source:{light:"light/no-project.svg",dark:"dark/no-project.svg"}},onAction:()=>l(null)}),!i&&c?(0,ut.jsx)(ct.Action,{title:"Loading\u2026"}):(i||[]).map(n=>(0,ut.jsx)(ct.Action,{autoFocus:n.id===e.project?.id,title:`${n.name} (${n.status.name})`,icon:ee(n),onAction:()=>l(n)},n.id))]})}var Ze=require("@raycast/api"),Ti=require("react");var Ft=require("react/jsx-runtime");function cs({issue:e,updateIssue:t}){let[s,o]=(0,Ti.useState)(!1),{states:i,isLoadingStates:c}=Pe(e.team.id,{execute:s}),l=st(i||[]);async function n(r){let u=e.state;t({animatedTitle:"Setting status",payload:{stateId:r.id},optimisticUpdate(d){return{...d,state:r}},rollbackUpdate(d){return{...d,state:u}},successTitle:"Set status",successMessage:`${e.identifier} set to ${r.name}`,errorTitle:"Failed to set status"})}return(0,Ft.jsx)(Ze.ActionPanel.Submenu,{icon:Ze.Icon.Circle,title:"Set Status",shortcut:{macOS:{modifiers:["cmd","shift"],key:"s"},Windows:{modifiers:["ctrl","shift"],key:"s"}},onOpen:()=>o(!0),children:l.length===0&&c?(0,Ft.jsx)(Ze.Action,{title:"Loading\u2026"}):l.map(r=>(0,Ft.jsx)(Ze.Action,{autoFocus:r.id===e.state.id,title:r.name,icon:B(r),onAction:()=>n(r)},r.id))})}var b=require("react/jsx-runtime");function nt({issue:e,mutateList:t,mutateSubIssues:s,mutateDetail:o,showAttachmentsAction:i,attachments:c,priorities:l,me:n,hideOpenInLinear:r}){let{pop:u}=(0,g.useNavigation)(),{linearClient:d}=P(),h=e.assignee?.id===n?.id,D=ot({issueEstimationType:e.team.issueEstimationType,issueEstimationAllowZero:e.team.issueEstimationAllowZero,issueEstimationExtended:e.team.issueEstimationExtended});async function w({animatedTitle:I,payload:R,optimisticUpdate:v,rollbackUpdate:J,successTitle:Me,successMessage:Xe,errorTitle:Je}){try{await(0,g.showToast)({style:g.Toast.Style.Animated,title:I});let Z=d.updateIssue(e.id,R);await Promise.all([Z,t?t(Z,{optimisticUpdate(N){if(N)return N.map(Q=>Q.id===e.id?v(Q):Q)},rollbackOnError(N){if(N)return N.map(Q=>Q.id===e.id?J(Q):Q)}}):Promise.resolve(),s?s(Z,{optimisticUpdate(N){if(N)return N.map(Q=>Q.id===e.id?v(Q):Q)},rollbackOnError(N){if(N)return N.map(Q=>Q.id===e.id?J(Q):Q)}}):Promise.resolve(),o?o(Z,{optimisticUpdate(N){return v(N)},rollbackOnError(N){return J(N)}}):Promise.resolve()]),await(0,g.showToast)({style:g.Toast.Style.Success,title:Me,message:Xe})}catch(Z){await(0,g.showToast)({style:g.Toast.Style.Failure,title:Je,message:q(Z)})}}async function L(){if(await(0,g.confirmAlert)({title:"Delete Issue",message:"Are you sure you want to delete the selected issue?",icon:{source:g.Icon.Trash,tintColor:g.Color.Red}}))try{await(0,g.showToast)({style:g.Toast.Style.Animated,title:"Deleting issue"});let I=d.deleteIssue(e.id);o&&u(),await Promise.all([I,t?t(I,{optimisticUpdate(R){if(R)return R.filter(v=>v.id!==e.id)}}):Promise.resolve(),s?s(I,{optimisticUpdate(R){if(R)return R.filter(v=>v.id!==e.id)}}):Promise.resolve()]),await(0,g.showToast)({style:g.Toast.Style.Success,title:"Issue deleted",message:`"${e.title}" is deleted`})}catch(I){await(0,g.showToast)({style:g.Toast.Style.Failure,title:"Failed to delete issue",message:q(I)})}}async function S(I){let R=e.priority;w({animatedTitle:"Setting priority",payload:{priority:I.priority},optimisticUpdate(v){return{...v,priority:I.priority}},rollbackUpdate(v){return{...v,priority:R}},successTitle:"Set priority",successMessage:`${e.identifier} priority set to ${I.label}`,errorTitle:"Failed to set priority"})}async function G(I){let R=e.assignee;w({animatedTitle:"Setting assignee",payload:{assigneeId:I.id},optimisticUpdate(v){return{...v,assignee:I}},rollbackUpdate(v){return{...v,assignee:R}},successTitle:"Set assignee",successMessage:`${e.identifier} assigned to ${I.displayName}`,errorTitle:"Failed to set assignee"})}async function j(I){let R=e.assignee;w({animatedTitle:"Setting assignee",payload:{assigneeId:I?I.id:null},optimisticUpdate(v){return{...v,assignee:I||void 0}},rollbackUpdate(v){return{...v,assignee:R}},successTitle:"Set assignee",successMessage:`${e.identifier} ${I?"assigned to":"un-assigned from"} me`,errorTitle:"Failed to set assignee"})}async function C({estimate:I,label:R}){let v=e.estimate;w({animatedTitle:"Setting estimate",payload:{estimate:I},optimisticUpdate(J){return{...J,estimate:I}},rollbackUpdate(J){return{...J,estimate:v}},successTitle:"Set estimate",successMessage:`${e.identifier} estimate set to ${R}`,errorTitle:"Failed to set estimate"})}async function $(I){w({animatedTitle:I?"Setting due date":"Removing due date",payload:{dueDate:I},optimisticUpdate(R){return{...R,dueDate:I}},rollbackUpdate(R){return{...R,dueDate:R.dueDate}},successTitle:I?"Set due date":"Removed due date",successMessage:I?`${e.identifier} due date set to ${(0,us.format)(I,"MM/dd/yyyy")}`:"",errorTitle:"Failed to set due date"})}async function U(I){if(!I){await(0,g.showToast)({style:g.Toast.Style.Failure,title:"Failed setting reminder"});return}try{await(0,g.showToast)({style:g.Toast.Style.Animated,title:"Setting reminder"}),await d.issueReminder(e.id,I),o&&u(),await(0,g.showToast)({style:g.Toast.Style.Success,title:"Reminder set",message:`${e.identifier} reminder set to ${(0,us.format)(I,"MM/dd/yyyy")}`})}catch(R){await(0,g.showToast)({style:g.Toast.Style.Failure,title:"Failed to set reminder",message:q(R)})}}function z(){t&&t(),s&&s(),o&&o()}let[de,X]=(0,$i.useState)(""),{users:me,supportsUserTypeahead:Se,isLoadingUsers:fe}=Ee(de);return(0,b.jsxs)(b.Fragment,{children:[r?null:(0,b.jsx)(se,{title:"Open Issue",url:e.url}),(0,b.jsxs)(g.ActionPanel.Section,{children:[(0,b.jsx)(g.Action.Push,{title:"Edit Issue",icon:g.Icon.Pencil,shortcut:g.Keyboard.Shortcut.Common.Edit,target:(0,b.jsx)(Kt,{priorities:l,me:n,issue:e,mutateList:t,mutateSubIssues:s})}),(0,b.jsx)(cs,{issue:e,updateIssue:w}),l&&l.length>0?(0,b.jsx)(g.ActionPanel.Submenu,{icon:g.Icon.LevelMeter,title:"Set Priority",shortcut:{macOS:{modifiers:["cmd","opt"],key:"p"},Windows:{modifiers:["ctrl","alt"],key:"p"}},children:l.map(I=>(0,b.jsx)(g.Action,{autoFocus:I.priority===e.priority,title:I.label,icon:{source:ge[I.priority]},onAction:()=>S(I)},I.priority))}):null,(0,b.jsx)(g.ActionPanel.Submenu,{icon:g.Icon.AddPerson,title:"Assign to",shortcut:{macOS:{modifiers:["cmd","shift"],key:"a"},Windows:{modifiers:["ctrl","shift"],key:"a"}},...Se&&{onSearchTextChange:X,isLoading:fe,throttle:!0},children:me?.map(I=>(0,b.jsx)(g.Action,{autoFocus:I.id===e.assignee?.id,title:`${I.displayName} (${I.email})`,icon:K(I),onAction:()=>G(I)},I.id))}),n?(0,b.jsx)(g.Action,{title:h?"Un-Assign from Me":"Assign to Me",icon:K(n),shortcut:{macOS:{modifiers:["cmd","shift"],key:"i"},Windows:{modifiers:["ctrl","shift"],key:"i"}},onAction:()=>j(h?null:n)}):null,D?(0,b.jsx)(g.ActionPanel.Submenu,{title:"Set Estimate",icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}},shortcut:{macOS:{modifiers:["cmd","shift"],key:"e"},Windows:{modifiers:["ctrl","shift"],key:"e"}},children:D.map(({estimate:I,label:R})=>(0,b.jsx)(g.Action,{autoFocus:I===e.estimate,title:R,onAction:()=>C({estimate:I,label:R})},I))}):null,(0,b.jsx)(g.Action.PickDate,{title:"Set Due Date",shortcut:{macOS:{modifiers:["opt","shift"],key:"d"},Windows:{modifiers:["alt","shift"],key:"d"}},onChange:$}),(0,b.jsx)(g.Action.PickDate,{title:"Set Reminder",shortcut:{macOS:{modifiers:["cmd","shift"],key:"h"},Windows:{modifiers:["ctrl","shift"],key:"h"}},onChange:U}),(0,b.jsx)(rs,{issue:e,updateIssue:w}),(0,b.jsx)(os,{issue:e,updateIssue:w}),(0,b.jsx)(ls,{issue:e,updateIssue:w}),(0,b.jsx)(ns,{issue:e,updateIssue:w}),(0,b.jsx)(as,{issue:e,updateIssue:w}),(0,b.jsx)(g.Action,{title:"Delete Issue",shortcut:g.Keyboard.Shortcut.Common.Remove,icon:g.Icon.Trash,style:g.Action.Style.Destructive,onAction:()=>L()})]}),(0,b.jsxs)(g.ActionPanel.Section,{children:[(0,b.jsx)(g.Action.Push,{title:"Show Sub-Issues",icon:g.Icon.List,target:(0,b.jsx)(ss,{issue:e,mutateList:t}),shortcut:{macOS:{modifiers:["cmd","shift"],key:"m"},Windows:{modifiers:["ctrl","shift"],key:"m"}}}),(0,b.jsx)(g.Action.Push,{title:"Break Issues into Sub-Issues",icon:g.Icon.Stars,target:(0,b.jsx)(Gt,{issue:e}),shortcut:{macOS:{modifiers:["opt","shift"],key:"m"},Windows:{modifiers:["alt","shift"],key:"m"}}}),i?(0,b.jsx)(g.Action.Push,{title:"Show Issue Links",icon:g.Icon.Link,target:(0,b.jsx)(Zt,{attachments:c??[],issue:e}),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"l"},Windows:{modifiers:["ctrl","alt","shift"],key:"l"}}}):null,(0,b.jsx)(g.Action.Push,{title:"Add Attachments and Links",icon:g.Icon.NewDocument,target:(0,b.jsx)(Mt,{issue:e}),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"a"},Windows:{modifiers:["ctrl","alt","shift"],key:"a"}}}),(0,b.jsx)(g.Action.Push,{title:"Add Comment",icon:g.Icon.Plus,target:(0,b.jsx)(Ge,{issue:e}),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"n"},Windows:{modifiers:["ctrl","alt","shift"],key:"n"}}}),(0,b.jsx)(g.Action.Push,{title:"Show Comments",icon:g.Icon.Bubble,target:(0,b.jsx)(Jt,{issue:e}),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"c"},Windows:{modifiers:["ctrl","alt","shift"],key:"c"}}})]}),(0,b.jsx)(is,{issue:e}),(0,b.jsx)(g.ActionPanel.Section,{children:(0,b.jsx)(g.Action,{title:"Refresh",icon:g.Icon.ArrowClockwise,shortcut:g.Keyboard.Shortcut.Common.Refresh,onAction:()=>z()})})]})}var je=require("react/jsx-runtime");function kt({issue:e,mutateList:t,mutateSubIssues:s,priorities:o,me:i}){let{primaryAction:c}=(0,ce.getPreferenceValues)(),l=[e.identifier,e.state.name,e.priorityLabel];e.assignee&&l.push(e.assignee.email,e.assignee.displayName);let n=new Date(e.updatedAt),r=e.dueDate?new Date(e.dueDate):null,u=e.estimate?{icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}},text:Rt({estimate:e.estimate,issueEstimationType:e.team.issueEstimationType})}:null,d=e.cycle?ye(e.cycle):null,h=e.project||null,D=e.labels.nodes.length>0,w=[{date:n,tooltip:`Updated: ${(0,Et.format)(n,"EEEE d MMMM yyyy 'at' HH:mm")}`},{icon:r?$t(r):void 0,text:r?(0,Et.format)(r,"MMM dd"):void 0,tooltip:r?`Due date: ${(0,Et.format)(r,"MM/dd/yyyy")}`:void 0},{icon:D?ce.Icon.Tag:void 0,text:D?String(e.labels.nodes.length):void 0,tooltip:D?e.labels.nodes.map(S=>S.name).join(", "):void 0},{icon:h?ee(h):void 0,tooltip:`Project: ${h?h.name:void 0}`},{icon:d?{source:d.icon}:void 0,text:d?String(d.number):void 0,tooltip:d?`Cycle: ${d.title}`:void 0},{icon:u?u.icon:void 0,text:u?u.text:void 0},{icon:B(e.state),tooltip:`Status: ${e.state.name}`},{icon:K(e.assignee),tooltip:e.assignee?`Assignee: ${e.assignee?.displayName} (${e.assignee?.email})`:"Unassigned"}],L=c==="openInLinear";return(0,je.jsx)(ce.List.Item,{title:e.title,icon:{value:{source:ge[e.priority]},tooltip:`Priority: ${e.priorityLabel}`},subtitle:e.identifier,keywords:l,accessories:w,actions:(0,je.jsxs)(ce.ActionPanel,{title:e.identifier,children:[L?(0,je.jsx)(se,{title:"Open Issue",url:e.url}):null,(0,je.jsx)(ce.Action.Push,{title:"Show Details",icon:ce.Icon.Sidebar,target:(0,je.jsx)(Pt,{issue:e,mutateList:t,priorities:o,me:i})}),(0,je.jsx)(nt,{issue:e,mutateList:t,mutateSubIssues:s,priorities:o,me:i,hideOpenInLinear:L})]})},e.id)}var Di=require("@raycast/utils");async function Ri(e){let{graphQLClient:t}=P();return gt(async s=>t.rawRequest(`
          query($viewId: String!, $cursor: String) {
            customView(id: $viewId) {
              issues(first: 50, after: $cursor) {
                nodes {
                  ${Ne}
                }
                pageInfo {
                  hasNextPage
                  endCursor
                }
              }
            }
          }
        `,{viewId:e,cursor:s}),s=>s.data?.customView?.issues?.pageInfo??void 0,(s,o)=>s.concat(o.data?.customView?.issues?.nodes??[]),[],5)}function vi(e){let{data:t,error:s,isLoading:o,mutate:i}=(0,Di.useCachedPromise)(Ri,[e],{execute:!!e});return{issues:t,issuesError:s,isLoadingIssues:o,mutateList:i}}var wt=require("react/jsx-runtime");function ji({viewId:e,viewName:t}){let{issues:s,issuesError:o,isLoadingIssues:i,mutateList:c}=vi(e),{priorities:l,isLoadingPriorities:n}=ht(),{me:r,isLoadingMe:u}=_e();(0,xi.useEffect)(()=>{o&&(0,ue.showToast)({style:ue.Toast.Style.Failure,title:"Failed to load issues",message:o.message})},[o]);let d=s?.length===1?"1 issue":`${s?.length??0} issues`;return(0,wt.jsx)(ue.List,{navigationTitle:t,isLoading:i||n||u,searchBarPlaceholder:"Filter issues",children:(0,wt.jsx)(ue.List.Section,{title:t,subtitle:d,children:s?.map(h=>(0,wt.jsx)(kt,{issue:h,mutateList:c,priorities:l,me:r},h.id))})})}var te=require("react/jsx-runtime");function ho(){let{data:e,isLoading:t}=(0,Mi.useCachedPromise)(Is),{primaryAction:s}=(0,H.getPreferenceValues)(),o=e?.favorites??[],c=`https://linear.app/${e?.organization?.urlKey}`;return(0,te.jsx)(H.List,{isLoading:t,children:o.map(({id:l,type:n,url:r,customView:u,cycle:d,document:h,issue:D,label:w,project:L,initiative:S,user:G,updatedAt:j})=>{let C=null,$=null,U=null;if(n==="customView"&&u){C={icon:he({icon:u.icon??void 0,color:u.color??void 0,fallbackIcon:H.Icon.Layers}),title:u.name};let z=(0,te.jsx)(se,{title:"Open View",url:c+`/view/${u.id}`});U=(0,te.jsxs)(H.ActionPanel,{children:[s==="openInLinear"?z:null,(0,te.jsx)(H.Action.Push,{title:"Show Issues",icon:H.Icon.List,target:(0,te.jsx)(ji,{viewId:u.id,viewName:u.name})}),s==="openInLinear"?null:z]})}if(n==="cycle"&&d){let z=ye(d);C={icon:{source:z.icon},title:z.title},$={title:"Open Cycle",url:c+`/team/${d.team.key}/cycle/${d.number}`}}if(n==="document"&&h&&(C={icon:{source:H.Icon.Document,tintColor:h.color},title:h.title},$={title:"Open Document",url:c+`/document/${h.id}`}),n==="issue"&&D&&(C={icon:B(D.state),title:D.title},$={title:"Open Issue",url:D.url}),n==="label"&&w&&(C={icon:{source:H.Icon.Dot,tintColor:w.color},title:w.name},$=ks(r)),n==="project"&&L&&(C={icon:ee(L),title:L.name},$={title:"Open Project",url:L.url}),n==="initiative"&&S&&(C={icon:Ss(S),title:S.name},$={title:"Open Initiative",url:c+`/initiative/${S.id}`}),n==="user"&&G&&(C={icon:K(G),title:G.name},$={title:"Open User",url:G.url}),C){let z=new Date(j),de=U||($?(0,te.jsx)(H.ActionPanel,{children:(0,te.jsx)(se,{...$})}):void 0);return(0,te.jsx)(H.List.Item,{...C,...de?{actions:de}:{},accessories:[{date:z,tooltip:`Updated: ${(0,Ui.format)(z,"EEEE d MMMM yyyy 'at' HH:mm")}`}]},l)}})})}function Fi(){return(0,te.jsx)(Lt,{children:(0,te.jsx)(ho,{})})}
