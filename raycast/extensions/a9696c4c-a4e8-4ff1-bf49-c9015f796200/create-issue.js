"use strict";var Ai=Object.create;var yt=Object.defineProperty;var Li=Object.getOwnPropertyDescriptor;var Ti=Object.getOwnPropertyNames;var $i=Object.getPrototypeOf,Di=Object.prototype.hasOwnProperty;var Ri=(e,t)=>{for(var s in t)yt(e,s,{get:t[s],enumerable:!0})},cs=(e,t,s,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of Ti(t))!Di.call(e,i)&&i!==s&&yt(e,i,{get:()=>t[i],enumerable:!(r=Li(t,i))||r.enumerable});return e};var at=(e,t,s)=>(s=e!=null?Ai($i(e)):{},cs(t||!e||!e.__esModule?yt(s,"default",{value:e,enumerable:!0}):s,e)),xi=e=>cs(yt({},"__esModule",{value:!0}),e);var or={};Ri(or,{default:()=>Ci});module.exports=xi(or);var a=require("@raycast/api"),ze=require("@raycast/utils"),Le=require("react");var ps=require("fs/promises"),Et=at(require("path"));var ds=require("@linear/sdk"),us=require("@raycast/api"),ms=require("@raycast/utils"),lt=null;async function vi(e,t,s,r,i){let c=JSON.stringify({query:s,variables:r}),l=new Headers(t.headers);new Headers(i).forEach((m,d)=>l.set(d,m)),l.set("Content-Type","application/json");let n=await fetch(e,{...t,method:"POST",headers:Object.fromEntries(l.entries()),body:c}),o=n.headers.get("Content-Type")?.startsWith("application/json")?await n.json():await n.text();if(typeof o!="string"&&n.ok&&!o.errors&&o.data)return{...o,headers:n.headers,status:n.status};throw new Error(typeof o=="string"?o:o.errors?.[0]?.message??`GraphQL Error (${n.status})`)}var Ft=ms.OAuthService.linear({scope:"read write",onAuthorize({token:e}){lt=new ds.LinearClient({accessToken:e,headers:{"public-file-urls-expire-in":"60","linear-raycast-extension-name":us.environment.extensionName}});let t=lt.client;t.rawRequest=((s,r,i)=>vi(t.url,t.options,s,r,i))}});function k(){if(!lt)throw new Error("No linear client initialized");return{linearClient:lt,graphQLClient:lt.client}}var ji="application/octet-stream",Mi={".apng":"image/apng",".avif":"image/avif",".bmp":"image/bmp",".csv":"text/csv",".doc":"application/msword",".docx":"application/vnd.openxmlformats-officedocument.wordprocessingml.document",".gif":"image/gif",".gz":"application/gzip",".heic":"image/heic",".heif":"image/heif",".ico":"image/x-icon",".jpeg":"image/jpeg",".jpg":"image/jpeg",".json":"application/json",".md":"text/markdown",".mov":"video/quicktime",".mp3":"audio/mpeg",".mp4":"video/mp4",".pdf":"application/pdf",".png":"image/png",".ppt":"application/vnd.ms-powerpoint",".pptx":"application/vnd.openxmlformats-officedocument.presentationml.presentation",".svg":"image/svg+xml",".tar":"application/x-tar",".tif":"image/tiff",".tiff":"image/tiff",".txt":"text/plain",".webm":"video/webm",".webp":"image/webp",".xls":"application/vnd.ms-excel",".xlsx":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",".zip":"application/zip"};function Ui(e){return Mi[Et.default.extname(e).toLowerCase()]??ji}async function Fi(e){let{graphQLClient:t}=k(),s=await(0,ps.readFile)(e),r=Ui(e),i=Et.default.basename(e),{data:c}=await t.rawRequest(`
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
    `,{size:s.byteLength,contentType:r,filename:i}),l=c?.fileUpload.uploadFile;if(!c?.fileUpload.success||!l)throw new Error(`Failed to request an upload URL for "${i}"`);let n=new Headers({"Content-Type":r,"Cache-Control":"public, max-age=31536000"});l.headers.forEach(({key:m,value:d})=>n.set(m,d));let o=await fetch(l.uploadUrl,{method:"PUT",headers:n,body:s});if(!o.ok)throw new Error(`Failed to upload "${i}": ${o.status} ${o.statusText}`);return{assetUrl:l.assetUrl,contentType:r,name:i}}async function ht(e){let{linearClient:t}=k(),s=await Fi(e.url),r=await t.createAttachment({issueId:e.issueId,title:s.name,url:s.assetUrl});return{success:r.success,id:r.attachmentId}}async function kt(e){let{linearClient:t}=k(),s=await t.attachmentLinkURL(e.issueId,e.url);return{success:s.success,id:s.attachmentId}}var gs=require("@raycast/api");async function Nt(e,t,s,r,i){let c=r,l=!0,n,o=0;for(;l&&o<i;){let m=await e(n);c=s(c,m),l=t(m)?.hasNextPage,n=t(m)?.endCursor,o++}return c}var Ei=(0,gs.getPreferenceValues)();function fs({inFilterBlock:e,addComma:t,inParentheses:s}={inFilterBlock:!1,inParentheses:!1,addComma:!0}){return Ei.shouldHideRedundantIssues?[...s?["("]:[],...t?[", "]:[],...e?[]:["filter: { "],"completedAt: { null: true }, canceledAt: { null: true }",...e?[]:[" }"],...s?[")"]:[]].join(""):""}var ct=`
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
`;async function He(){let{graphQLClient:e}=k(),{data:t}=await e.rawRequest(`
      query {
        issues(orderBy: createdAt${fs()}) {
          nodes {
            ${ct}
          }
        }
      }
    `);return t?.issues.nodes}async function Is(e){let{graphQLClient:t}=k(),{data:s}=await t.rawRequest(`
      query($issueId: String!) {
        issue(id: $issueId) {
          children${fs({inParentheses:!0})} {
            nodes {
              ${ct}
              sortOrder
            }
          }
        }
      }
    `,{issueId:e});if(!s)throw new Error("Cannot find the Linear issue");return s.issue.children.nodes}async function ys(e){let{graphQLClient:t}=k(),{data:s}=await t.rawRequest(`
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
    `,{issueId:e});if(!s)throw new Error("Cannot find the Linear issue");return s.issue}async function hs(e){let{graphQLClient:t}=k(),{data:s}=await t.rawRequest(`
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
    `,{issueId:e});if(!s)throw new Error("Cannot find the Linear issue");return s.issue.comments.nodes}async function ks(e){let{graphQLClient:t}=k(),{data:s}=await t.rawRequest(`
      query($issueId: String!) {
        issue(id: $issueId) {
          ${ct}
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
    `,{issueId:e});if(!s)throw new Error("Cannot find the Linear issue");return s.issue}async function Ps(e){let{graphQLClient:t}=k(),s=e.title.replace(/"/g,"\\$&"),r=e.description?.replace(/\n/g,"\\n")?.replace(/"/g,"\\$&"),i=`teamId: "${e.teamId}", title: "${s}", description: "${r}", priority: ${e.priority}`;e.stateId&&(i+=`, stateId: "${e.stateId}"`),e.estimate&&(i+=`, estimate: ${e.estimate}`),e.assigneeId&&(i+=`, assigneeId: "${e.assigneeId}"`),e.labelIds&&e.labelIds.length>0&&(i+=`, labelIds: [${e.labelIds.map(l=>`"${l}"`).join(",")}]`),e.dueDate&&(i+=`, dueDate: "${e.dueDate.toISOString()}"`),e.cycleId&&(i+=`, cycleId: "${e.cycleId}"`),e.projectId&&(i+=`, projectId: "${e.projectId}"`),e.projectId&&e.projectMilestoneId&&(i+=`, projectMilestoneId: "${e.projectMilestoneId}"`),e.parentId&&(i+=`, parentId: "${e.parentId}"`);let{data:c}=await t.rawRequest(`
      mutation {
        issueCreate(input: {${i}}) {
          success
          issue {
            ${ct}
          }
        }
      }
    `);return{success:c?.issueCreate.success,issue:c?.issueCreate.issue}}async function bs(e){let{graphQLClient:t}=k(),s=e.title.replace(/"/g,"\\$&"),r=e.description?.replace(/\n/g,"\\n").replace(/"/g,"\\$&"),i=`teamId: "${e.teamId}", title: "${s}", description: "${r}", parentId: "${e.parentId}"`;e.stateId&&(i+=`, stateId: "${e.stateId}"`);let{data:c}=await t.rawRequest(`
      mutation {
        issueCreate(input: {${i}}) {
          success
        }
      }
    `);return{success:c?.issueCreate.success}}var ne=require("date-fns"),Ni=10080*60*1e3;function xe(e){let t=Date.now(),s=Date.now()+Ni,r=new Date(e.startsAt),i=new Date(e.endsAt),c=!e.completedAt&&(0,ne.isBefore)(r,t)&&(0,ne.isAfter)(i,t),l=!e.completedAt&&(0,ne.isBefore)(r,s)&&(0,ne.isAfter)(i,s),n=c?{light:"light/active-cycle.svg",dark:"dark/active-cycle.svg"}:{light:"light/cycle.svg",dark:"dark/cycle.svg"},o=`Cycle ${e.number} (${(0,ne.format)(r,"dd MMM")} - ${(0,ne.format)(i,"dd MMM")})`,m=c?`Active ${o}`:o;return{...e,isActive:c,isNext:l,icon:n,title:m}}function ke(e){return e.filter(t=>(0,ne.isAfter)(new Date(t.endsAt),Date.now())).map(xe)}function V(e){return e instanceof Error?e.message:String(e)}var Ss={exponential:[0,1,2,4,8,16,32,64],fibonacci:[0,1,2,3,5,8,13,21],linear:[0,1,2,3,4,5,6,7],tShirt:[0,1,2,3,5,8,13,21]},Cs={0:"\u2013",1:"XS",2:"S",3:"M",5:"L",8:"XL",13:"XXL",21:"XXXL"};function Pt({estimate:e,issueEstimationType:t}){if(!e)return"Not estimated";if(t==="tShirt"){let s=Cs[e];return s||String(e)}return String(e)}function Ke({issueEstimationType:e,issueEstimationAllowZero:t,issueEstimationExtended:s}){if(e==="notUsed")return null;let r=t?0:1,i=s?Ss[e].length:6,c=Ss[e].slice(r,i);return e==="tShirt"?c.map(l=>({estimate:l,label:Cs[l]})):c.map(l=>({estimate:l,label:l!==1?`${l} points`:`${l} point`}))}function Ot(e={}){return{title:"",description:"",stateId:"",priority:"",assigneeId:"",labelIds:[],estimate:"",dueDate:null,cycleId:"",projectId:"",milestoneId:"",...e}}function Oi(e){if(typeof e=="string")try{let t=JSON.parse(e);return typeof t=="object"&&t!==null?t:{}}catch{return{}}return typeof e=="object"&&e!==null?e:{}}function me(e){return typeof e=="string"?e:void 0}function ws(e){return typeof e=="number"?String(e):me(e)}function As(e){if(!Array.isArray(e))return;let t=e.filter(s=>typeof s=="string");return t.length>0?t:void 0}function Vi(e){if(typeof e!="string")return;let t=new Date(e);return Number.isNaN(t.getTime())?void 0:t}function Ls(e,t={}){let s=Oi(e.templateData),r=Ot(t),i=As(s.labelIds)??As(s.labels);return{title:me(s.title)??r.title,description:me(s.description)??me(e.description)??r.description,stateId:me(s.stateId)??me(s.statusId)??r.stateId,priority:ws(s.priority)??r.priority,assigneeId:me(s.assigneeId)??r.assigneeId,labelIds:i??r.labelIds,estimate:ws(s.estimate)??r.estimate,dueDate:s.dueDate!==void 0?Vi(s.dueDate)??null:r.dueDate,cycleId:me(s.cycleId)??r.cycleId,projectId:me(s.projectId)??r.projectId,milestoneId:r.milestoneId}}function bt(e){let t=e.split(`
`),s=/https?:\/\/\S+/,r=t.map(i=>i.trim()).filter(i=>s.test(i));return Array.from(new Set(r))}var Vt=require("@raycast/api");function Pe(e){return e?{source:"linear-icons/milestone.svg",tintColor:Vt.Color.PrimaryText}:{source:"linear-icons/no-milestone.svg",tintColor:Vt.Color.SecondaryText}}var ae={0:{light:"light/priority-no-priority.svg",dark:"dark/priority-no-priority.svg"},1:{light:"light/priority-urgent.svg",dark:"dark/priority-urgent.svg"},2:{light:"light/priority-high.svg",dark:"dark/priority-high.svg"},3:{light:"light/priority-medium.svg",dark:"dark/priority-medium.svg"},4:{light:"light/priority-low.svg",dark:"dark/priority-low.svg"}};var Ts=at(require("fs")),$s=require("@raycast/api"),Ds=at(require("node-emoji"));function St({icon:e,color:t,fallbackIcon:s}){if(!e)return s;if(/:(.*):/.test(e))return Ds.get(e)??s;let i=`${$s.environment.assetsPath}/linear-icons/${e.toLowerCase()}.svg`;return Ts.default.existsSync(i)?{source:i,...t?{tintColor:{light:t,dark:t,adjustContrast:!0}}:{}}:s}function le(e){return e?St({icon:e.icon??void 0,color:e.color??void 0,fallbackIcon:{source:{light:"light/project.svg",dark:"dark/project.svg"}}}):{source:{light:"light/no-project.svg",dark:"dark/no-project.svg"}}}var Rs=require("lodash");var qi={triage:{light:"light/triage.svg",dark:"dark/triage.svg"},backlog:{light:"light/backlog.svg",dark:"dark/backlog.svg"},unstarted:{light:"light/unstarted.svg",dark:"dark/unstarted.svg"},started:{light:"light/started.svg",dark:"dark/started.svg"},completed:{light:"light/completed.svg",dark:"dark/completed.svg"},canceled:{light:"light/canceled.svg",dark:"dark/canceled.svg"}};function z(e){return{source:qi[e.type],tintColor:{light:e.color,dark:e.color,adjustContrast:!0}}}function Xe(e,t=["triage","backlog","unstarted","started","completed","canceled"]){if(e.length===0)return[];let s=(0,Rs.groupBy)(e,r=>r.type);return t.filter(r=>!!s[r]).map(r=>s[r]).flat()}var xs=require("@raycast/api");function Ct(e,t){let s=t?.logoUrl?encodeURI(t.logoUrl):xs.Icon.TwoPeople;return St({icon:e.icon??void 0,color:e.color??void 0,fallbackIcon:s})}var wt=require("@raycast/api"),vs=require("@raycast/utils");function K(e){return e?{source:e.avatarUrl?encodeURI(e.avatarUrl):(0,vs.getAvatarIcon)(e.displayName.toUpperCase()),mask:wt.Image.Mask.Circle}:wt.Icon.Person}var js=require("@raycast/utils");function ve(e,t){let{linearClient:s}=k(),{data:r,error:i,isLoading:c}=(0,js.useCachedPromise)(async l=>(await s.cycles({filter:{team:{id:{eq:l}}}})).nodes.sort((o,m)=>o.number-m.number),[e],{execute:t?.execute!==!1&&!!e});return{cycles:r,cyclesError:i,isLoadingCycles:!r&&!i||c}}var Fs=require("@raycast/utils");var Ms=`
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
`;function Wi(e,t){let s=e.type.toLowerCase()==="issue",r=!e.team||e.team.id===t;return s&&!e.archivedAt&&r}function Qi(e,t){return(e.sortOrder??0)-(t.sortOrder??0)||e.name.localeCompare(t.name)}async function Us(e){if(!e)return[];let{graphQLClient:t}=k(),{data:s}=await t.rawRequest(`
      query IssueTemplates($teamId: String!, $first: Int) {
        organization {
          templates(first: $first) {
            nodes {
              ${Ms}
            }
          }
        }
        team(id: $teamId) {
          templates(first: $first) {
            nodes {
              ${Ms}
            }
          }
        }
      }
    `,{teamId:e,first:100});return[...s?.organization?.templates?.nodes??[],...s?.team?.templates?.nodes??[]].filter((i,c,l)=>l.findIndex(n=>n.id===i.id)===c).filter(i=>Wi(i,e)).sort(Qi)}function qt(e,t){let{data:s,error:r,isLoading:i}=(0,Fs.useCachedPromise)(Us,[e],{execute:t?.execute!==!1&&!!e});return{issueTemplates:s,issueTemplatesError:r,isLoadingIssueTemplates:!s&&!r||i}}var Es=require("@raycast/utils");function pe(e,t=[],s){let{data:r,error:i,isLoading:c,mutate:l}=(0,Es.useCachedPromise)(e,t,s);return{issues:r,issuesError:i,isLoadingIssues:c,mutateList:l}}var Vs=require("@raycast/utils");var Ns=require("@raycast/api");var Bi=100,zi=100,Gi=(0,Ns.getPreferenceValues)();function _i(){let e=Number(Gi.labelsLimit),t=Number.isFinite(e)&&e>0?e:zi,s=Math.floor(Math.min(Bi,t)),r=Math.ceil(t/s);return{pageSize:s,pageLimit:r}}async function Os(e){if(!e)return[];let{pageSize:t,pageLimit:s}=_i(),{graphQLClient:r}=k();return Nt(async i=>r.rawRequest(`
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
        `,{teamId:e,cursor:i}),i=>i.data?.team?.labels?.pageInfo,(i,c)=>i.concat(c.data?.team?.labels?.nodes??[]),[],s)}function je(e,t){let{data:s,error:r,isLoading:i}=(0,Vs.useCachedPromise)(Os,[e],{execute:t?.execute!==!1&&!!e});return{labels:s,labelsError:r,isLoadingLabels:!s&&!r||i}}var Ws=require("@raycast/utils");var Zi=`
  id
  name
  targetDate
  project {
      id
  }
  sortOrder
  updatedAt
`;async function qs(e){let{graphQLClient:t}=k();if(e){let{data:s}=await t.rawRequest(`
        query($projectId: String!) {
          project(id: $projectId) {
            projectMilestones {
              nodes {
                ${Zi}
              }
            }
          }
        }
      `,{projectId:e});return s?.project.projectMilestones.nodes}return null}function Me(e,t){let{data:s,error:r,isLoading:i,mutate:c}=(0,Ws.useCachedPromise)(qs,[e],{execute:t?.execute!==!1});return{milestones:s,isLoadingMilestones:!s&&!r||i,milestonesError:r,mutateMilestones:c}}var Bs=require("@raycast/utils");var Hi=`
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
`;async function Qs({teamId:e,searchText:t="",after:s=null,first:r=null}){let{graphQLClient:i}=k(),c=`
    projects(first: $first, after: $after, filter: { name: { containsIgnoreCase: $searchText } }) {
      nodes {
        ${Hi}
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
      `,{first:r,after:s,searchText:t}),m=o?.projects;return{data:m?.nodes??[],hasMore:!!m?.pageInfo.hasNextPage,cursor:m?.pageInfo.endCursor||null}}let{data:l}=await i.rawRequest(`
      query($teamId: String!, $first: Int, $after: String, $searchText: String) {
        team(id: $teamId) {
          ${c}
        }
      }
    `,{teamId:e,first:r,after:s,searchText:t}),n=l?.team?.projects;return{data:n?.nodes??[],hasMore:!!n?.pageInfo.hasNextPage,cursor:n?.pageInfo.endCursor||null}}function Ue(e,t){let{data:s,error:r,isLoading:i,mutate:c,pagination:l}=(0,Bs.useCachedPromise)((n,o)=>m=>Qs({teamId:n,searchText:o,after:m.cursor,first:t?.pageSize}),[e,t?.searchText],{execute:t?.execute!==!1,keepPreviousData:!0});return{projects:s,isLoadingProjects:!s&&!r||i,projectsError:r,mutateProjects:c,pagination:l}}var zs=require("@raycast/utils");function ge(e,t){let{linearClient:s}=k(),{data:r,error:i,isLoading:c}=(0,zs.useCachedPromise)(async l=>(await s.workflowStates({filter:{team:{id:{eq:l}}}})).nodes.sort((o,m)=>o.position-m.position),[e],{initialData:[],execute:t?.execute!==!1});return{states:r,isLoadingStates:c,statesError:i}}var Zs=require("@raycast/utils");var Gs=require("lodash");async function _s(e=""){let{graphQLClient:t,linearClient:s}=k(),r=await s.viewer,{data:i}=await t.rawRequest(`
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
    `,{userId:r.id,query:e}),c=(0,Gs.sortBy)(i?.teams.nodes??[],o=>o.membership?.sortOrder??1/0),l=i?.organization,n=!!i?.teams.pageInfo.hasNextPage;return{teams:c,organization:l,hasMoreTeams:n}}function dt(e=""){let{data:t,error:s,isLoading:r}=(0,Zs.useCachedPromise)(_s,[e]);return{teams:t?.teams,org:t?.organization,teamsError:s,isLoadingTeams:!t&&!s||r,supportsTeamTypeahead:e.trim().length>0||t?.hasMoreTeams}}var Hs=require("@raycast/utils");function Fe(e=""){let{linearClient:t}=k(),{data:s,error:r,isLoading:i}=(0,Hs.useCachedPromise)(async c=>{let l=await t.users(c.trim().length>0?{filter:{name:{containsIgnoreCase:c}}}:void 0);return{users:l?.nodes??[],hasMoreUsers:!!l?.pageInfo?.hasNextPage}},[e],{initialData:[]});return{users:s?.users,supportsUserTypeahead:e.trim().length>0||s?.hasMoreUsers,usersError:r,isLoadingUsers:!s&&!r||i}}var M=require("@raycast/api"),bi=require("date-fns");var Je=require("@raycast/api"),At=require("date-fns");function Lt(e){let t=(0,At.differenceInDays)(e,(0,At.startOfToday)()),s=Je.Color.PrimaryText;return t<=7&&(s=Je.Color.Orange),t<=0&&(s=Je.Color.Red),{source:Je.Icon.Calendar,tintColor:s}}var Ks=require("@raycast/utils");function Ee(e){let t=e.id,{data:s,error:r,isLoading:i,mutate:c}=(0,Ks.useCachedPromise)(ks,[t],{initialData:{...e,description:""}});return{issue:s,issueError:r,isLoadingIssue:i,mutateDetail:c}}var g=require("@raycast/api"),os=require("date-fns"),Pi=require("react");var w=require("@raycast/api"),Xs=require("@raycast/utils"),Js=require("nanoid"),Ne=require("react");var J=require("react/jsx-runtime");function Wt({issue:e}){let{pop:t}=(0,w.useNavigation)(),{states:s}=ge(e.team.id),r=(0,Ne.useMemo)(()=>s.filter(A=>A.type==="unstarted")[0],[s]),{issue:i,isLoadingIssue:c}=Ee(e),{data:l,isLoading:n,revalidate:o}=(0,Xs.useAI)(`Act as a product manager for Linear issues. Break down a Linear issue into a list of sub-issues. 
    
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

Break down the Linear issue with this title: "${i.title}"`,{execute:!!i&&!c,creativity:.5}),[m,d]=(0,Ne.useState)(!1),[S,j]=(0,Ne.useState)([]);(0,Ne.useEffect)(()=>{if(!(!l||n)){try{let L=/\[[\s\S]*?\]/,A=l.match(L);if(A&&A[0]){let X=JSON.parse(A[0]);j(X.map(U=>({...U,id:(0,Js.nanoid)(),selected:!0})))}}catch(L){(0,w.showToast)({style:w.Toast.Style.Failure,title:"Failed to parse AI results",message:V(L),primaryAction:{title:"Retry",onAction:o},secondaryAction:{title:"Copy AI Result",onAction:()=>w.Clipboard.copy(l)}})}d(!0)}},[l,n]);async function P(){try{await(0,w.showToast)({style:w.Toast.Style.Animated,title:"Creating sub-issues"});let L=S.filter(A=>A.selected);await Promise.all(L.map(A=>bs({teamId:i.team.id,title:A.title,description:A.description,parentId:i.id,stateId:r?.id}))),await(0,w.showToast)({style:w.Toast.Style.Success,title:"Created sub-issues"}),t()}catch(L){(0,w.showToast)({style:w.Toast.Style.Failure,title:"Failed to create Sub-Issues",message:V(L)})}}return(0,J.jsxs)(w.List,{isLoading:n||!m,children:[S?.map(L=>(0,J.jsx)(w.List.Item,{icon:L.selected?{source:w.Icon.CheckCircle,tintColor:w.Color.Green}:w.Icon.Circle,title:L.title,subtitle:L.description,actions:(0,J.jsxs)(w.ActionPanel,{children:[(0,J.jsx)(w.Action,{title:L.selected?"Unselect Sub-Issue":"Select Sub-Issue",icon:L.selected?w.Icon.Circle:{source:w.Icon.CheckCircle,tintColor:w.Color.Green},onAction:()=>j(S.map(A=>A.id===L.id?{...A,selected:!A.selected}:A))}),(0,J.jsx)(w.Action,{title:"Create Sub-Issues",icon:w.Icon.Plus,onAction:()=>P()}),(0,J.jsx)(w.Action,{title:"Generate New Sub-Issues",icon:w.Icon.ArrowClockwise,onAction:o})]})},L.title)),(0,J.jsx)(w.List.EmptyView,{title:"No sub-issues were generated. Try again.",actions:(0,J.jsx)(w.ActionPanel,{children:(0,J.jsx)(w.Action,{title:"Retry",icon:w.Icon.ArrowClockwise,onAction:o})})})]})}var y=require("@raycast/api"),Oe=require("@raycast/utils"),ut=require("react");async function Ys(e,t){let{graphQLClient:s}=k(),r=[];if(t.teamId&&r.push(`teamId: "${t.teamId}"`),t.title&&r.push(`title: "${t.title.replace(/"/g,"\\$&")}"`),t.description&&r.push(`description: "${t.description.replace(/\n/g,"\\n").replace(/"/g,"\\$&")}"`),t.stateId&&r.push(`stateId: "${t.stateId}"`),typeof t.priority<"u"&&r.push(`priority: ${t.priority}`),typeof t.assigneeId<"u"&&r.push(`assigneeId: ${t.assigneeId?`"${t.assigneeId}"`:null}`),t.labelIds&&r.push(`labelIds: [${t.labelIds.map(c=>`"${c}"`).join(",")}]`),typeof t.estimate<"u"&&r.push(`estimate: ${t.estimate}`),typeof t.dueDate<"u"){let c=t.dueDate?t.dueDate instanceof Date?t.dueDate.toISOString():t.dueDate:null;r.push(`dueDate: ${c?`"${c}"`:null}`)}typeof t.cycleId<"u"&&r.push(`cycleId: ${t.cycleId?`"${t.cycleId}"`:null}`),typeof t.projectId<"u"&&r.push(`projectId: ${t.projectId?`"${t.projectId}"`:null}`),typeof t.projectMilestoneId<"u"&&r.push(`projectMilestoneId: ${t.projectMilestoneId?`"${t.projectMilestoneId}"`:null}`),typeof t.parentId<"u"&&r.push(`parentId: ${t.parentId?`"${t.parentId}"`:null}`);let{data:i}=await s.rawRequest(`
      mutation {
        issueUpdate(id: "${e}", input: {${r.join(", ")}}) {
          success
        }
      }
    `);return{success:i?.issueUpdate.success}}var C=require("react/jsx-runtime");function Qt(e){let{pop:t}=(0,y.useNavigation)(),{issue:s,isLoadingIssue:r,mutateDetail:i}=Ee(e.issue),[c,l]=(0,ut.useState)(""),{teams:n,org:o,supportsTeamTypeahead:m,isLoadingTeams:d}=dt(c),S=n&&n.length>1,[j,P]=(0,ut.useState)(""),{users:L,supportsUserTypeahead:A,isLoadingUsers:X}=Fe(j),{handleSubmit:U,itemProps:$,values:x,setValue:q}=(0,Oe.useForm)({async onSubmit(p){let H=await(0,y.showToast)({style:y.Toast.Style.Animated,title:"Editing issue"});try{let ue={teamId:p.teamId||e.issue.team.id,title:p.title,description:p.description,stateId:p.stateId,labelIds:p.labelIds,dueDate:p.dueDate,...D&&p.estimate?{estimate:parseInt(p.estimate)}:{},...p.assigneeId?{assigneeId:p.assigneeId}:{},...p.cycleId?{cycleId:p.cycleId}:{},...p.projectId?{projectId:p.projectId}:{},...p.milestoneId?{projectMilestoneId:p.milestoneId}:{},...p.parentId?{parentId:p.parentId}:{},priority:parseInt(p.priority)},{success:nt}=await Ys(s.id,ue);nt&&(H.style=y.Toast.Style.Success,H.title=`Edited Issue \u2022 ${s.identifier}`,t(),i(),e.mutateList&&e.mutateList(),e.mutateSubIssues&&e.mutateSubIssues())}catch(ue){H.style=y.Toast.Style.Failure,H.title="Failed to edit issue",H.message=V(ue)}},validation:{teamId:S?Oe.FormValidation.Required:void 0,title:Oe.FormValidation.Required,stateId:Oe.FormValidation.Required,priority:Oe.FormValidation.Required},initialValues:{teamId:e.issue.team.id,title:e.issue.title,description:s.description??void 0,priority:String(e.issue.priority),stateId:e.issue.state.id,estimate:e.issue.estimate?String(e.issue.estimate):void 0,assigneeId:e.issue.assignee?.id,labelIds:e.issue.labels.nodes.map(p=>p.id),dueDate:s.dueDate?new Date(s.dueDate):null,cycleId:e.issue.cycle?.id,projectId:e.issue.project?.id,milestoneId:e.issue.projectMilestone?.id,parentId:e.issue.parent?.id}});(0,ut.useEffect)(()=>{q("description",s.description||""),q("dueDate",s.dueDate?new Date(s.dueDate):null)},[s]);let ce=!!x.teamId&&x.teamId.trim().length>0,{states:Te}=ge(x.teamId,{execute:ce}),{labels:_}=je(x.teamId,{execute:ce}),{cycles:oe}=ve(x.teamId,{execute:ce}),{issues:ye}=pe(He,[],{execute:ce}),{projects:de}=Ue(x.teamId,{execute:ce}),{milestones:I}=Me(x.projectId,{execute:!!x.projectId}),T=n?.find(p=>p.id===x.teamId),D=T?Ke({issueEstimationType:T.issueEstimationType,issueEstimationAllowZero:T.issueEstimationAllowZero,issueEstimationExtended:T.issueEstimationExtended}):null,Z=Xe(Te||[]),$e=Te&&Te.length>0,Ge=e.priorities&&e.priorities.length>0,_e=_&&_.length>0,G=oe&&oe.length>0,E=de&&de.length>0,Q=I&&I.length>0,It=ye&&ye.length>0;return(0,C.jsxs)(y.Form,{actions:(0,C.jsx)(y.ActionPanel,{children:(0,C.jsx)(y.Action.SubmitForm,{onSubmit:U,title:"Edit Issue"})}),isLoading:d||r||X,children:[(m||S)&&(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(y.Form.Dropdown,{title:"Team",...$.teamId,...m&&{onSearchTextChange:l,isLoading:d,throttle:!0},children:n?.map(p=>(0,C.jsx)(y.Form.Dropdown.Item,{title:p.name,value:p.id,icon:Ct(p,o)},p.id))}),(0,C.jsx)(y.Form.Separator,{})]}),(0,C.jsx)(y.Form.TextField,{title:"Title",placeholder:"Issue title",autoFocus:!0,...$.title}),(0,C.jsx)(y.Form.TextArea,{title:"Description",placeholder:"Add some details (supports Markdown, e.g. **bold**)",...$.description}),(0,C.jsx)(y.Form.Dropdown,{title:"Status",...$.stateId,children:$e?Z.map(p=>(0,C.jsx)(y.Form.Dropdown.Item,{title:p.name,value:p.id,icon:z(p)},p.id)):null}),(0,C.jsx)(y.Form.Dropdown,{title:"Priority",...$.priority,children:Ge?e.priorities?.map(({priority:p,label:H})=>(0,C.jsx)(y.Form.Dropdown.Item,{title:H,value:String(p),icon:{source:ae[p]}},p)):null}),(0,C.jsxs)(y.Form.Dropdown,{title:"Assignee",...$.assigneeId,...A&&{onSearchTextChange:P,isLoading:X,throttle:!0},children:[(0,C.jsx)(y.Form.Dropdown.Item,{title:"Unassigned",value:"",icon:y.Icon.Person}),L?.map(p=>(0,C.jsx)(y.Form.Dropdown.Item,{title:p.name,value:p.id,icon:K(p)},p.id))]}),(0,C.jsx)(y.Form.TagPicker,{title:"Labels",...$.labelIds,placeholder:"Add label",children:_e?_.map(({id:p,name:H,color:ue})=>(0,C.jsx)(y.Form.TagPicker.Item,{title:H,value:p,icon:{source:y.Icon.Dot,tintColor:ue}},p)):null}),D?(0,C.jsxs)(y.Form.Dropdown,{title:"Estimate",...$.estimate,children:[(0,C.jsx)(y.Form.Dropdown.Item,{title:"No estimate",value:"",icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}}),D.map(({estimate:p,label:H})=>(0,C.jsx)(y.Form.Dropdown.Item,{title:H,value:String(p),icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}},p))]}):null,(0,C.jsx)(y.Form.DatePicker,{title:"Due Date",type:y.Form.DatePicker.Type.Date,...$.dueDate}),G||E||It?(0,C.jsx)(y.Form.Separator,{}):null,G?(0,C.jsxs)(y.Form.Dropdown,{title:"Cycle",...$.cycleId,children:[(0,C.jsx)(y.Form.Dropdown.Item,{title:"No Cycle",value:"",icon:{source:{light:"light/no-cycle.svg",dark:"dark/no-cycle.svg"}}}),ke(oe).map(p=>(0,C.jsx)(y.Form.Dropdown.Item,{title:p.title,value:p.id,icon:{source:p.icon}},p.id))]}):null,E?(0,C.jsxs)(y.Form.Dropdown,{title:"Project",...$.projectId,children:[(0,C.jsx)(y.Form.Dropdown.Item,{title:"No Project",value:"",icon:{source:{light:"light/no-project.svg",dark:"dark/no-project.svg"}}}),de.map(p=>(0,C.jsx)(y.Form.Dropdown.Item,{title:`${p.name} (${p.status.name})`,value:p.id,icon:le(p)},p.id))]}):null,Q?(0,C.jsxs)(y.Form.Dropdown,{title:"Milestone",storeValue:!0,...$.milestoneId,children:[(0,C.jsx)(y.Form.Dropdown.Item,{title:"No Milestone",value:"",icon:{source:"linear-icons/no-milestone.svg"}}),I.map(p=>(0,C.jsx)(y.Form.Dropdown.Item,{title:`${p.name}  (${p.targetDate||"No Target Date"})`,value:p.id,icon:Pe(p)},p.id))]}):null,It?(0,C.jsxs)(y.Form.Dropdown,{title:"Parent",...$.parentId,children:[(0,C.jsx)(y.Form.Dropdown.Item,{title:"No Issue",value:"",icon:{source:{light:"light/backlog.svg",dark:"dark/backlog.svg"}}}),ye.map(p=>(0,C.jsx)(y.Form.Dropdown.Item,{title:`${p.identifier} - ${p.title}`,value:p.id,icon:z(p.state)},p.id))]}):null]})}var Y=require("@raycast/api"),ti=require("date-fns");var N=require("@raycast/api"),ei=require("@raycast/utils");var be=require("react/jsx-runtime");function Tt({issue:{id:e,title:t,identifier:s}}){let{pop:r}=(0,N.useNavigation)(),{reset:i,itemProps:c,handleSubmit:l}=(0,ei.useForm)({onSubmit:async n=>{let o=await(0,N.showToast)({style:N.Toast.Style.Animated,title:"Attaching links"}),m=bt(n.links);if(m.length===0&&n.attachments.length===0){o.style=N.Toast.Style.Failure,o.title="No links or attachments provided";return}if(m.length>0){let d=m.length===1?"link":"links";try{await Promise.all(m.map(S=>kt({issueId:e,url:S}))),o.style=N.Toast.Style.Success,o.title=`Successfully attached ${d}`}catch(S){o.style=N.Toast.Style.Failure,o.title=`Failed attaching ${d}`,o.message=V(S)}}if(n.attachments.length>0){let d=n.attachments.length===1?"attachment":"attachments";try{o.style=N.Toast.Style.Animated,o.title=`Uploading ${d}\u2026`,await Promise.all(n.attachments.map(S=>ht({issueId:e,url:S}))),o.style=N.Toast.Style.Success,o.title=`Successfully uploaded ${d}`}catch(S){o.style=N.Toast.Style.Failure,o.title=`Failed uploading ${d}`,o.message=V(S)}}i({attachments:[],links:""}),r()},initialValues:{links:""}});return(0,be.jsxs)(N.Form,{actions:(0,be.jsx)(N.ActionPanel,{children:(0,be.jsx)(N.Action.SubmitForm,{onSubmit:l,icon:N.Icon.NewDocument,title:"Attach"})}),navigationTitle:"Add Attachments and Links",children:[(0,be.jsx)(N.Form.Description,{title:"Issue",text:`[${s}] ${t}`}),(0,be.jsx)(N.Form.FilePicker,{title:"Attachment",...c.attachments}),(0,be.jsx)(N.Form.TextArea,{title:"Links",placeholder:`https://a.com
https://b.com
New link(s) on separate line(s)`,...c.links})]})}var Se=require("react/jsx-runtime");function Bt({attachments:e,issue:t}){return(0,Se.jsx)(Y.List,{navigationTitle:`Links for ${t.identifier}`,children:e.map(s=>{let r=new Date(s.updatedAt);return(0,Se.jsx)(Y.List.Item,{icon:s.source?.imageUrl??Y.Icon.Link,title:s.title,subtitle:s.subtitle,accessories:[{date:r,tooltip:`Updated: ${(0,ti.format)(r,"EEEE d MMMM yyyy 'at' HH:mm")}`}],actions:(0,Se.jsxs)(Y.ActionPanel,{children:[(0,Se.jsx)(Y.Action.OpenInBrowser,{url:s.url}),(0,Se.jsx)(Y.Action.Push,{title:"Add Attachments and Links",icon:Y.Icon.NewDocument,target:(0,Se.jsx)(Tt,{issue:t})})]})},s.id)})})}var W=require("@raycast/api"),si=require("react");var mt=require("react/jsx-runtime");function Ve({comment:e,issue:t,mutateComments:s}){let{linearClient:r}=k(),{pop:i}=(0,W.useNavigation)(),[c,l]=(0,si.useState)(e?e.body:"");async function n(){await(0,W.showToast)({style:W.Toast.Style.Animated,title:`${e?"Updating":"Adding"} comment`});try{e?await r.updateComment(e.id,{body:c}):await r.createComment({body:c,issueId:t.id}),await(0,W.showToast)({style:W.Toast.Style.Success,title:`${e?"Updated":"Added"} comment`}),i(),s&&s()}catch(o){(0,W.showToast)({style:W.Toast.Style.Failure,title:`Failed to ${e?"update":"add"} comment`,message:V(o)})}}return(0,mt.jsx)(W.Form,{actions:(0,mt.jsx)(W.ActionPanel,{children:(0,mt.jsx)(W.Action.SubmitForm,{title:e?"Edit Comment":"Add Comment",onSubmit:n,icon:e?W.Icon.Pencil:W.Icon.Plus})}),children:(0,mt.jsx)(W.Form.TextArea,{id:"comment",title:"Comment",placeholder:"Leave a comment",value:c,onChange:l})})}var h=require("@raycast/api"),ai=require("date-fns"),li=at(require("remove-markdown"));var ii=require("@raycast/utils");function zt(e){let{data:t,error:s,isLoading:r,mutate:i}=(0,ii.useCachedPromise)(hs,[e]);return{comments:t,commentsError:s,isLoadingComments:r,mutateComments:i}}var ri=require("@raycast/utils");function qe(){let{linearClient:e}=k(),{data:t,error:s,isLoading:r}=(0,ri.useCachedPromise)(()=>e.viewer);return{me:t,meError:s,isLoadingMe:!t&&!s||r}}var _t=require("@raycast/api");var oi=require("@raycast/api"),Gt=!1;async function ni(){Gt=!!(await(0,oi.getApplications)()).find(s=>s.bundleId==="com.linear")}var Zt=require("react/jsx-runtime");function We({title:e,url:t,...s}){return Gt?(0,Zt.jsx)(_t.Action.Open,{title:`${e||"Open"} in Linear`,icon:"linear-app-icon.png",target:t,application:"Linear",...s}):(0,Zt.jsx)(_t.Action.OpenInBrowser,{url:t,title:`${e||"Open"} in Browser`})}var O=require("react/jsx-runtime");function Ht({issue:e}){let{linearClient:t}=k(),{me:s,isLoadingMe:r}=qe(),{comments:i,isLoadingComments:c,mutateComments:l}=zt(e.id);async function n(o){if(await(0,h.confirmAlert)({title:"Delete Comment",message:"Are you sure you want to delete this comment?",icon:{source:h.Icon.Trash,tintColor:h.Color.Red}}))try{await(0,h.showToast)({style:h.Toast.Style.Animated,title:"Deleting comment"}),await l(t.deleteComment(o),{optimisticUpdate(m){return m&&m?.filter(d=>d.id!==o)}}),await(0,h.showToast)({style:h.Toast.Style.Success,title:"Deleted comment"})}catch(m){(0,h.showToast)({style:h.Toast.Style.Failure,title:"Failed to delete comment",message:V(m)})}}return(0,O.jsxs)(h.List,{isLoading:c||r,navigationTitle:`${e.identifier} \u2022 Comments`,searchBarPlaceholder:"Filter by user or comment content",isShowingDetail:!0,children:[(0,O.jsx)(h.List.EmptyView,{title:"No comments",description:"This issue doesn't have any comments.",actions:(0,O.jsx)(h.ActionPanel,{children:(0,O.jsx)(h.Action.Push,{title:"Add Comment",icon:h.Icon.Plus,target:(0,O.jsx)(Ve,{issue:e,mutateComments:l})})})}),i?.map(o=>{let m=new Date(o.createdAt);return(0,O.jsx)(h.List.Item,{title:o.user.displayName,subtitle:o.body,icon:K(o.user),keywords:(0,li.default)(o.body).replace(/\n/g," ").split(" "),accessories:[{date:m,tooltip:`Created: ${(0,ai.format)(m,"EEEE d MMMM yyyy 'at' HH:mm")}`}],detail:(0,O.jsx)(h.List.Item.Detail,{markdown:o.body}),actions:(0,O.jsxs)(h.ActionPanel,{children:[(0,O.jsx)(We,{title:"Open Comment",url:o.url}),s?.id===o.user.id?(0,O.jsxs)(h.ActionPanel.Section,{children:[(0,O.jsx)(h.Action.Push,{title:"Edit Comment",icon:h.Icon.Pencil,shortcut:h.Keyboard.Shortcut.Common.Edit,target:(0,O.jsx)(Ve,{issue:e,comment:o,mutateComments:l})}),(0,O.jsx)(h.Action,{title:"Delete Comment",icon:h.Icon.Trash,style:h.Action.Style.Destructive,shortcut:h.Keyboard.Shortcut.Common.Remove,onAction:()=>n(o.id)})]}):null,(0,O.jsx)(h.ActionPanel.Section,{children:(0,O.jsx)(h.Action.Push,{title:"Add Comment",icon:h.Icon.Plus,shortcut:{macOS:{modifiers:["cmd","shift"],key:"n"},Windows:{modifiers:["ctrl","shift"],key:"n"}},target:(0,O.jsx)(Ve,{issue:e,mutateComments:l})})}),(0,O.jsxs)(h.ActionPanel.Section,{children:[(0,O.jsx)(h.Action.CopyToClipboard,{icon:h.Icon.Clipboard,content:o.url,title:"Copy Comment URL",shortcut:h.Keyboard.Shortcut.Common.CopyPath}),(0,O.jsx)(h.Action.CopyToClipboard,{icon:h.Icon.Clipboard,content:o.body,title:"Copy Comment",shortcut:{macOS:{modifiers:["cmd","shift"],key:"'"},Windows:{modifiers:["ctrl","shift"],key:"'"}}})]}),(0,O.jsx)(h.ActionPanel.Section,{children:(0,O.jsx)(h.Action,{title:"Refresh",icon:h.Icon.ArrowClockwise,shortcut:h.Keyboard.Shortcut.Common.Refresh,onAction:l})})]})},o.id)})]})}var Qe=require("@raycast/api");var ci=require("@raycast/utils");function pt(){let{linearClient:e}=k(),{data:t,error:s,isLoading:r}=(0,ci.useCachedPromise)(()=>e.issuePriorityValues,[],{initialData:[]});return{priorities:t,prioritiesError:s,isLoadingPriorities:!t&&!s||r}}var ee=require("@raycast/api"),$t=require("date-fns");var Ce=require("react/jsx-runtime");function Kt({issue:e,mutateList:t,mutateSubIssues:s,priorities:r,me:i}){let{primaryAction:c}=(0,ee.getPreferenceValues)(),l=[e.identifier,e.state.name,e.priorityLabel];e.assignee&&l.push(e.assignee.email,e.assignee.displayName);let n=new Date(e.updatedAt),o=e.dueDate?new Date(e.dueDate):null,m=e.estimate?{icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}},text:Pt({estimate:e.estimate,issueEstimationType:e.team.issueEstimationType})}:null,d=e.cycle?xe(e.cycle):null,S=e.project||null,j=e.labels.nodes.length>0,P=[{date:n,tooltip:`Updated: ${(0,$t.format)(n,"EEEE d MMMM yyyy 'at' HH:mm")}`},{icon:o?Lt(o):void 0,text:o?(0,$t.format)(o,"MMM dd"):void 0,tooltip:o?`Due date: ${(0,$t.format)(o,"MM/dd/yyyy")}`:void 0},{icon:j?ee.Icon.Tag:void 0,text:j?String(e.labels.nodes.length):void 0,tooltip:j?e.labels.nodes.map(A=>A.name).join(", "):void 0},{icon:S?le(S):void 0,tooltip:`Project: ${S?S.name:void 0}`},{icon:d?{source:d.icon}:void 0,text:d?String(d.number):void 0,tooltip:d?`Cycle: ${d.title}`:void 0},{icon:m?m.icon:void 0,text:m?m.text:void 0},{icon:z(e.state),tooltip:`Status: ${e.state.name}`},{icon:K(e.assignee),tooltip:e.assignee?`Assignee: ${e.assignee?.displayName} (${e.assignee?.email})`:"Unassigned"}],L=c==="openInLinear";return(0,Ce.jsx)(ee.List.Item,{title:e.title,icon:{value:{source:ae[e.priority]},tooltip:`Priority: ${e.priorityLabel}`},subtitle:e.identifier,keywords:l,accessories:P,actions:(0,Ce.jsxs)(ee.ActionPanel,{title:e.identifier,children:[L?(0,Ce.jsx)(We,{title:"Open Issue",url:e.url}):null,(0,Ce.jsx)(ee.Action.Push,{title:"Show Details",icon:ee.Icon.Sidebar,target:(0,Ce.jsx)(gt,{issue:e,mutateList:t,priorities:r,me:i})}),(0,Ce.jsx)(Ye,{issue:e,mutateList:t,mutateSubIssues:s,priorities:r,me:i,hideOpenInLinear:L})]})},e.id)}var we=require("react/jsx-runtime");function Xt({issue:e,mutateList:t}){let{issues:s,isLoadingIssues:r,mutateList:i}=pe(m=>Is(m),[e.id]),{priorities:c,isLoadingPriorities:l}=pt(),{me:n,isLoadingMe:o}=qe();return(0,we.jsxs)(Qe.List,{isLoading:r||o||l||o,navigationTitle:`${e.identifier} \u2022 Sub-issues`,children:[(0,we.jsx)(Qe.List.EmptyView,{title:"No issues",description:"This issue doesn't have any sub-issues.",actions:(0,we.jsx)(Qe.ActionPanel,{children:(0,we.jsx)(Qe.Action.Push,{title:"Create Sub-Issue",target:(0,we.jsx)(ft,{priorities:c,me:n,parentId:e.id,projectId:e.project?.id,cycleId:e.cycle?.id,teamId:e.team.id})})})}),s?.map(m=>(0,we.jsx)(Kt,{issue:m,mutateList:t,mutateSubIssues:i,priorities:c,me:n},m.id))]})}var v=require("@raycast/api");function ui(e){let t=[`Work on Linear issue ${e.identifier}:`,""],s=Ki(e.branchName);if(s&&t.push(`Suggested branch name: ${s}`,""),t.push(`<issue identifier="${Dt(e.identifier)}">`),t.push(`<title>${e.title}</title>`),t.push(...mi(e.description)),e.team?.name&&t.push(`<team name="${Dt(e.team.name)}"/>`),e.labels?.nodes?.forEach(i=>{t.push(`<label>${i.name}</label>`)}),e.project?.name){let i=Dt(e.project.name);t.push(e.project.description?`<project name="${i}">${e.project.description}</project>`:`<project name="${i}"/>`)}e.parent&&t.push(...di("parent-issue",e.parent));let r=e.children?.nodes??[];return r.length>0&&(t.push("<sub-issues>"),r.forEach(i=>t.push(...di("sub-issue",i))),t.push("</sub-issues>")),t.push("</issue>"),t.join(`
`)}function di(e,t){return[`<${e} identifier="${Dt(t.identifier)}">`,`<id>${t.id}</id>`,`<title>${t.title}</title>`,...mi(t.description),`</${e}>`]}function mi(e){return e?e.includes(`
`)?["<description>",e,"</description>"]:[`<description>${e}</description>`]:[]}function Ki(e){return e&&e.slice(e.lastIndexOf("/")+1)}function Dt(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}var te=require("react/jsx-runtime"),Xi={ISSUE_TITLE:"title",ISSUE_ID:"identifier",ISSUE_URL:"url",ISSUE_BRANCH_NAME:"branchName"};function Ji(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function Yi(e){return e.replace(/\[/g,"\\[").replace(/\]/g,"\\]")}function er(e){return{html:`<a href="${e.url}">${Ji(e.title)}</a>`,text:`[${Yi(e.title)}](${e.url})`}}function Jt({issue:e}){let{issueCustomCopyAction:t}=(0,v.getPreferenceValues)();async function s(){let r=await(0,v.showToast)({style:v.Toast.Style.Animated,title:"Copying prompt"});try{await v.Clipboard.copy(ui(await ys(e.id))),r.style=v.Toast.Style.Success,r.title="Copied prompt to clipboard"}catch(i){r.style=v.Toast.Style.Failure,r.title="Failed copying prompt",r.message=V(i)}}return(0,te.jsxs)(v.ActionPanel.Section,{children:[(0,te.jsx)(v.Action.CopyToClipboard,{content:e.identifier,title:"Copy Issue ID",shortcut:{macOS:{modifiers:["cmd"],key:"."},Windows:{modifiers:["ctrl"],key:"."}}}),(0,te.jsx)(v.Action.CopyToClipboard,{content:{html:`<a href="${e.url}" title="${e.title}">${e.identifier}: ${e.title}</a>`,text:e.url},title:"Copy Formatted Issue URL",shortcut:v.Keyboard.Shortcut.Common.CopyPath}),(0,te.jsx)(v.Action.CopyToClipboard,{content:e.url,title:"Copy Issue URL",shortcut:{macOS:{modifiers:["cmd","shift"],key:"u"},Windows:{modifiers:["ctrl","shift"],key:"u"}}}),(0,te.jsx)(v.Action.CopyToClipboard,{content:e.title,title:"Copy Issue Title",shortcut:{macOS:{modifiers:["cmd","shift"],key:"'"},Windows:{modifiers:["ctrl","shift"],key:"'"}}}),(0,te.jsx)(v.Action.CopyToClipboard,{content:er(e),title:"Copy Title as Link",shortcut:{macOS:{modifiers:["cmd","shift"],key:"t"},Windows:{modifiers:["ctrl","shift"],key:"t"}}}),(0,te.jsx)(v.Action.CopyToClipboard,{content:e.branchName,title:"Copy Git Branch Name",shortcut:v.Keyboard.Shortcut.Common.CopyName}),t&&t!==""?(0,te.jsx)(v.Action.CopyToClipboard,{content:t?.replace(/\{(.*?)\}/g,(r,i)=>{let c=e[Xi[i]];return c||r}),title:"Custom Copy",shortcut:{macOS:{modifiers:["cmd","opt"],key:"."},Windows:{modifiers:["ctrl","alt"],key:"."}}}):null,(0,te.jsx)(v.Action,{icon:v.Icon.Clipboard,title:"Copy as Prompt",onAction:s,shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"p"},Windows:{modifiers:["ctrl","alt","shift"],key:"p"}}})]})}var se=require("@raycast/api"),pi=require("react");var ie=require("react/jsx-runtime");function Yt({issue:e,updateIssue:t}){let{linearClient:s}=k(),[r,i]=(0,pi.useState)(!1),{cycles:c,isLoadingCycles:l}=ve(e.team.id,{execute:r}),n=e.cycle?xe(e.cycle):null,o=n?.isActive||!1,m=n?.isNext||!1;async function d(P){let L=e.cycle;t({animatedTitle:"Moving to cycle",payload:{cycleId:P?.id||null},optimisticUpdate(A){return{...A,cycle:P||void 0}},rollbackUpdate(A){return{...A,cycle:L}},successTitle:P?"Moved to cycle":"Removed from cycle",successMessage:P?.title?P.title:"",errorTitle:"Failed to move to cycle"})}async function S(){let{nodes:P}=await s.cycles({filter:{team:{id:{eq:e.team.id}}}}),L=ke(P||[]),A=L.findIndex($=>$.isActive),U=(A>-1?L[A]:null)?L[A+1]:null;if(U)return d(U)}async function j(){let{nodes:P}=await s.cycles({filter:{team:{id:{eq:e.team.id}}}}),A=ke(P||[]).find(X=>X.isActive);if(A)return d(A)}return(0,ie.jsxs)(ie.Fragment,{children:[(0,ie.jsxs)(se.ActionPanel.Submenu,{title:"Move to Cycle",icon:{source:{light:"light/cycle.svg",dark:"dark/cycle.svg"}},shortcut:se.Keyboard.Shortcut.Common.Copy,onOpen:()=>i(!0),children:[(0,ie.jsx)(se.Action,{title:"No Cycle",icon:{source:{light:"light/no-cycle.svg",dark:"dark/no-cycle.svg"}},onAction:()=>d(null)}),!c&&l?(0,ie.jsx)(se.Action,{title:"Loading\u2026"}):ke(c||[]).map(P=>(0,ie.jsx)(se.Action,{autoFocus:P.id===n?.id,title:P.title,icon:{source:P.icon},onAction:()=>d(P)},P.id))]}),o?null:(0,ie.jsx)(se.Action,{title:"Move to Active Cycle",icon:{source:{light:"light/active-cycle.svg",dark:"dark/active-cycle.svg"}},shortcut:se.Keyboard.Shortcut.Common.Copy,onAction:()=>j()}),m?null:(0,ie.jsx)(se.Action,{title:"Move to Next Cycle",icon:{source:{light:"light/cycle.svg",dark:"dark/cycle.svg"}},shortcut:{macOS:{modifiers:["cmd","shift"],key:"n"},Windows:{modifiers:["ctrl","shift"],key:"n"}},onAction:()=>S()})]})}var re=require("@raycast/api"),gi=require("lodash"),fi=require("react");var fe=require("react/jsx-runtime");function es({issue:e,updateIssue:t}){let[s,r]=(0,fi.useState)(!1),{labels:i}=je(e.team.id,{execute:s}),[,c]=(0,gi.partition)(i||[],o=>e.labels.nodes.map(m=>m.id).includes(o.id));async function l(o){let m=e.labels.nodes.map(d=>d.id);t({animatedTitle:"Adding label",payload:{labelIds:[...m,o.id]},optimisticUpdate(d){return{...d,labels:{...d.labels,nodes:[...d.labels.nodes,o]}}},rollbackUpdate(d){return{...d,labels:{...d.labels,nodes:d.labels.nodes.filter(S=>S.id!==o.id)}}},successTitle:"Added label",successMessage:`Label "${o.name}" added to ${e.identifier}`,errorTitle:"Failed to add label"})}async function n(o){let m=e.labels.nodes.map(d=>d.id);t({animatedTitle:"Remove label",payload:{labelIds:m.filter(d=>d!==o.id)},optimisticUpdate(d){return{...d,labels:{...d.labels,nodes:d.labels.nodes.filter(S=>S.id!==o.id)}}},rollbackUpdate(d){return{...d,labels:{...d.labels,nodes:[...d.labels.nodes,o]}}},successTitle:"Removed label",successMessage:`Label "${o.name}" removed from ${e.identifier}`,errorTitle:"Failed to remove label"})}return(0,fe.jsxs)(fe.Fragment,{children:[(0,fe.jsx)(re.ActionPanel.Submenu,{title:"Add Label",icon:re.Icon.Tag,shortcut:{macOS:{modifiers:["cmd","shift"],key:"l"},Windows:{modifiers:["ctrl","shift"],key:"l"}},onOpen:()=>r(!0),children:c.map(o=>(0,fe.jsx)(re.Action,{title:o.name,icon:{source:re.Icon.Dot,tintColor:o.color},onAction:()=>l(o)},o.id))}),e.labels.nodes.length>0?(0,fe.jsx)(re.ActionPanel.Submenu,{title:"Remove Label",icon:re.Icon.Tag,shortcut:{macOS:{modifiers:["cmd","shift"],key:"l"},Windows:{modifiers:["ctrl","shift"],key:"l"}},children:e.labels.nodes.map(o=>(0,fe.jsx)(re.Action,{title:o.name,icon:{source:re.Icon.Dot,tintColor:o.color},onAction:()=>n(o)},o.id))}):null]})}var Ae=require("@raycast/api"),Ii=require("react");var et=require("react/jsx-runtime");function ts({issue:e,updateIssue:t}){let[s,r]=(0,Ii.useState)(!1),{milestones:i,isLoadingMilestones:c}=Me(e.project?.id,{execute:s});async function l(n){let o=e.projectMilestone;t({animatedTitle:"Setting milestone",payload:{projectMilestoneId:n?n.id:null},optimisticUpdate(m){return{...m,milestone:n||void 0}},rollbackUpdate(m){return{...m,milestone:o}},successTitle:n?"Set milestone":`Removed milestone from ${e.identifier}`,successMessage:n?`"${n.name}" added to ${e.identifier}`:"",errorTitle:"Failed to set milestone"})}return(0,et.jsxs)(Ae.ActionPanel.Submenu,{title:"Set Milestone",icon:{source:"linear-icons/milestone.svg",tintColor:Ae.Color.PrimaryText},shortcut:{modifiers:["ctrl","shift"],key:"m"},onOpen:()=>r(!0),children:[(0,et.jsx)(Ae.Action,{title:"No Milestone",icon:{source:"linear-icons/no-milestone.svg"},onAction:()=>l(null)}),!i&&c?(0,et.jsx)(Ae.Action,{title:"Loading\u2026"}):(i||[]).map(n=>(0,et.jsx)(Ae.Action,{autoFocus:n.id===e.projectMilestone?.id,title:`${n.name}  (${n.targetDate||"No Target Date"})`,icon:Pe(n),onAction:()=>l(n)},n.id))]})}var tt=require("@raycast/api"),yi=require("react");var Ie=require("react/jsx-runtime");function ss({issue:e,updateIssue:t}){let[s,r]=(0,yi.useState)(!1),{issues:i,isLoadingIssues:c}=pe(He,[],{execute:s}),l=e.parent,n=l?.id,o=!!n;async function m(d){t({animatedTitle:"Setting parent issue",payload:{parentId:d?d.id:null},optimisticUpdate(S){return{...S,parent:d||void 0}},rollbackUpdate(S){return{...S,parent:l}},successTitle:"Set parent issue",successMessage:d?`${d.identifier} set as parent issue`:`Removed parent issue from ${e.identifier}`,errorTitle:"Failed to set parent issue"})}return(0,Ie.jsxs)(Ie.Fragment,{children:[(0,Ie.jsx)(tt.ActionPanel.Submenu,{title:o?"Change Parent Issue":"Set Parent Issue",icon:{source:{light:"light/parent-issue.svg",dark:"dark/parent-issue.svg"}},shortcut:{modifiers:["ctrl","shift"],key:"i"},onOpen:()=>r(!0),children:!i&&c?(0,Ie.jsx)(tt.Action,{title:"Loading\u2026"}):(i||[]).map(d=>(0,Ie.jsx)(tt.Action,{autoFocus:d.id===n,title:`${d.identifier} - ${d.title}`,icon:z(d.state),onAction:()=>m(d)},d.id))}),o?(0,Ie.jsx)(tt.Action,{title:"Remove Parent Issue",icon:{source:{light:"light/parent-issue.svg",dark:"dark/parent-issue.svg"}},shortcut:{macOS:{modifiers:["cmd","shift"],key:"k"},Windows:{modifiers:["ctrl","shift"],key:"k"}},onAction:()=>m(null)}):null]})}var st=require("@raycast/api"),hi=require("react");var it=require("react/jsx-runtime");function is({issue:e,updateIssue:t}){let[s,r]=(0,hi.useState)(!1),{projects:i,isLoadingProjects:c}=Ue(e.team.id,{execute:s});async function l(n){let o=e.project;t({animatedTitle:"Setting project",payload:{projectId:n?n.id:null},optimisticUpdate(m){return{...m,project:n||void 0}},rollbackUpdate(m){return{...m,project:o}},successTitle:n?"Set project":`Removed project from ${e.identifier}`,successMessage:n?`"${n.name}" added to ${e.identifier}`:"",errorTitle:"Failed to set project"})}return(0,it.jsxs)(st.ActionPanel.Submenu,{title:"Set Project",icon:{source:{light:"light/project.svg",dark:"dark/project.svg"}},shortcut:{modifiers:["ctrl","shift"],key:"p"},onOpen:()=>r(!0),children:[(0,it.jsx)(st.Action,{title:"No Project",icon:{source:{light:"light/no-project.svg",dark:"dark/no-project.svg"}},onAction:()=>l(null)}),!i&&c?(0,it.jsx)(st.Action,{title:"Loading\u2026"}):(i||[]).map(n=>(0,it.jsx)(st.Action,{autoFocus:n.id===e.project?.id,title:`${n.name} (${n.status.name})`,icon:le(n),onAction:()=>l(n)},n.id))]})}var Be=require("@raycast/api"),ki=require("react");var Rt=require("react/jsx-runtime");function rs({issue:e,updateIssue:t}){let[s,r]=(0,ki.useState)(!1),{states:i,isLoadingStates:c}=ge(e.team.id,{execute:s}),l=Xe(i||[]);async function n(o){let m=e.state;t({animatedTitle:"Setting status",payload:{stateId:o.id},optimisticUpdate(d){return{...d,state:o}},rollbackUpdate(d){return{...d,state:m}},successTitle:"Set status",successMessage:`${e.identifier} set to ${o.name}`,errorTitle:"Failed to set status"})}return(0,Rt.jsx)(Be.ActionPanel.Submenu,{icon:Be.Icon.Circle,title:"Set Status",shortcut:{macOS:{modifiers:["cmd","shift"],key:"s"},Windows:{modifiers:["ctrl","shift"],key:"s"}},onOpen:()=>r(!0),children:l.length===0&&c?(0,Rt.jsx)(Be.Action,{title:"Loading\u2026"}):l.map(o=>(0,Rt.jsx)(Be.Action,{autoFocus:o.id===e.state.id,title:o.name,icon:z(o),onAction:()=>n(o)},o.id))})}var b=require("react/jsx-runtime");function Ye({issue:e,mutateList:t,mutateSubIssues:s,mutateDetail:r,showAttachmentsAction:i,attachments:c,priorities:l,me:n,hideOpenInLinear:o}){let{pop:m}=(0,g.useNavigation)(),{linearClient:d}=k(),S=e.assignee?.id===n?.id,j=Ke({issueEstimationType:e.team.issueEstimationType,issueEstimationAllowZero:e.team.issueEstimationAllowZero,issueEstimationExtended:e.team.issueEstimationExtended});async function P({animatedTitle:I,payload:T,optimisticUpdate:D,rollbackUpdate:Z,successTitle:$e,successMessage:Ge,errorTitle:_e}){try{await(0,g.showToast)({style:g.Toast.Style.Animated,title:I});let G=d.updateIssue(e.id,T);await Promise.all([G,t?t(G,{optimisticUpdate(E){if(E)return E.map(Q=>Q.id===e.id?D(Q):Q)},rollbackOnError(E){if(E)return E.map(Q=>Q.id===e.id?Z(Q):Q)}}):Promise.resolve(),s?s(G,{optimisticUpdate(E){if(E)return E.map(Q=>Q.id===e.id?D(Q):Q)},rollbackOnError(E){if(E)return E.map(Q=>Q.id===e.id?Z(Q):Q)}}):Promise.resolve(),r?r(G,{optimisticUpdate(E){return D(E)},rollbackOnError(E){return Z(E)}}):Promise.resolve()]),await(0,g.showToast)({style:g.Toast.Style.Success,title:$e,message:Ge})}catch(G){await(0,g.showToast)({style:g.Toast.Style.Failure,title:_e,message:V(G)})}}async function L(){if(await(0,g.confirmAlert)({title:"Delete Issue",message:"Are you sure you want to delete the selected issue?",icon:{source:g.Icon.Trash,tintColor:g.Color.Red}}))try{await(0,g.showToast)({style:g.Toast.Style.Animated,title:"Deleting issue"});let I=d.deleteIssue(e.id);r&&m(),await Promise.all([I,t?t(I,{optimisticUpdate(T){if(T)return T.filter(D=>D.id!==e.id)}}):Promise.resolve(),s?s(I,{optimisticUpdate(T){if(T)return T.filter(D=>D.id!==e.id)}}):Promise.resolve()]),await(0,g.showToast)({style:g.Toast.Style.Success,title:"Issue deleted",message:`"${e.title}" is deleted`})}catch(I){await(0,g.showToast)({style:g.Toast.Style.Failure,title:"Failed to delete issue",message:V(I)})}}async function A(I){let T=e.priority;P({animatedTitle:"Setting priority",payload:{priority:I.priority},optimisticUpdate(D){return{...D,priority:I.priority}},rollbackUpdate(D){return{...D,priority:T}},successTitle:"Set priority",successMessage:`${e.identifier} priority set to ${I.label}`,errorTitle:"Failed to set priority"})}async function X(I){let T=e.assignee;P({animatedTitle:"Setting assignee",payload:{assigneeId:I.id},optimisticUpdate(D){return{...D,assignee:I}},rollbackUpdate(D){return{...D,assignee:T}},successTitle:"Set assignee",successMessage:`${e.identifier} assigned to ${I.displayName}`,errorTitle:"Failed to set assignee"})}async function U(I){let T=e.assignee;P({animatedTitle:"Setting assignee",payload:{assigneeId:I?I.id:null},optimisticUpdate(D){return{...D,assignee:I||void 0}},rollbackUpdate(D){return{...D,assignee:T}},successTitle:"Set assignee",successMessage:`${e.identifier} ${I?"assigned to":"un-assigned from"} me`,errorTitle:"Failed to set assignee"})}async function $({estimate:I,label:T}){let D=e.estimate;P({animatedTitle:"Setting estimate",payload:{estimate:I},optimisticUpdate(Z){return{...Z,estimate:I}},rollbackUpdate(Z){return{...Z,estimate:D}},successTitle:"Set estimate",successMessage:`${e.identifier} estimate set to ${T}`,errorTitle:"Failed to set estimate"})}async function x(I){P({animatedTitle:I?"Setting due date":"Removing due date",payload:{dueDate:I},optimisticUpdate(T){return{...T,dueDate:I}},rollbackUpdate(T){return{...T,dueDate:T.dueDate}},successTitle:I?"Set due date":"Removed due date",successMessage:I?`${e.identifier} due date set to ${(0,os.format)(I,"MM/dd/yyyy")}`:"",errorTitle:"Failed to set due date"})}async function q(I){if(!I){await(0,g.showToast)({style:g.Toast.Style.Failure,title:"Failed setting reminder"});return}try{await(0,g.showToast)({style:g.Toast.Style.Animated,title:"Setting reminder"}),await d.issueReminder(e.id,I),r&&m(),await(0,g.showToast)({style:g.Toast.Style.Success,title:"Reminder set",message:`${e.identifier} reminder set to ${(0,os.format)(I,"MM/dd/yyyy")}`})}catch(T){await(0,g.showToast)({style:g.Toast.Style.Failure,title:"Failed to set reminder",message:V(T)})}}function ce(){t&&t(),s&&s(),r&&r()}let[Te,_]=(0,Pi.useState)(""),{users:oe,supportsUserTypeahead:ye,isLoadingUsers:de}=Fe(Te);return(0,b.jsxs)(b.Fragment,{children:[o?null:(0,b.jsx)(We,{title:"Open Issue",url:e.url}),(0,b.jsxs)(g.ActionPanel.Section,{children:[(0,b.jsx)(g.Action.Push,{title:"Edit Issue",icon:g.Icon.Pencil,shortcut:g.Keyboard.Shortcut.Common.Edit,target:(0,b.jsx)(Qt,{priorities:l,me:n,issue:e,mutateList:t,mutateSubIssues:s})}),(0,b.jsx)(rs,{issue:e,updateIssue:P}),l&&l.length>0?(0,b.jsx)(g.ActionPanel.Submenu,{icon:g.Icon.LevelMeter,title:"Set Priority",shortcut:{macOS:{modifiers:["cmd","opt"],key:"p"},Windows:{modifiers:["ctrl","alt"],key:"p"}},children:l.map(I=>(0,b.jsx)(g.Action,{autoFocus:I.priority===e.priority,title:I.label,icon:{source:ae[I.priority]},onAction:()=>A(I)},I.priority))}):null,(0,b.jsx)(g.ActionPanel.Submenu,{icon:g.Icon.AddPerson,title:"Assign to",shortcut:{macOS:{modifiers:["cmd","shift"],key:"a"},Windows:{modifiers:["ctrl","shift"],key:"a"}},...ye&&{onSearchTextChange:_,isLoading:de,throttle:!0},children:oe?.map(I=>(0,b.jsx)(g.Action,{autoFocus:I.id===e.assignee?.id,title:`${I.displayName} (${I.email})`,icon:K(I),onAction:()=>X(I)},I.id))}),n?(0,b.jsx)(g.Action,{title:S?"Un-Assign from Me":"Assign to Me",icon:K(n),shortcut:{macOS:{modifiers:["cmd","shift"],key:"i"},Windows:{modifiers:["ctrl","shift"],key:"i"}},onAction:()=>U(S?null:n)}):null,j?(0,b.jsx)(g.ActionPanel.Submenu,{title:"Set Estimate",icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}},shortcut:{macOS:{modifiers:["cmd","shift"],key:"e"},Windows:{modifiers:["ctrl","shift"],key:"e"}},children:j.map(({estimate:I,label:T})=>(0,b.jsx)(g.Action,{autoFocus:I===e.estimate,title:T,onAction:()=>$({estimate:I,label:T})},I))}):null,(0,b.jsx)(g.Action.PickDate,{title:"Set Due Date",shortcut:{macOS:{modifiers:["opt","shift"],key:"d"},Windows:{modifiers:["alt","shift"],key:"d"}},onChange:x}),(0,b.jsx)(g.Action.PickDate,{title:"Set Reminder",shortcut:{macOS:{modifiers:["cmd","shift"],key:"h"},Windows:{modifiers:["ctrl","shift"],key:"h"}},onChange:q}),(0,b.jsx)(es,{issue:e,updateIssue:P}),(0,b.jsx)(Yt,{issue:e,updateIssue:P}),(0,b.jsx)(is,{issue:e,updateIssue:P}),(0,b.jsx)(ts,{issue:e,updateIssue:P}),(0,b.jsx)(ss,{issue:e,updateIssue:P}),(0,b.jsx)(g.Action,{title:"Delete Issue",shortcut:g.Keyboard.Shortcut.Common.Remove,icon:g.Icon.Trash,style:g.Action.Style.Destructive,onAction:()=>L()})]}),(0,b.jsxs)(g.ActionPanel.Section,{children:[(0,b.jsx)(g.Action.Push,{title:"Show Sub-Issues",icon:g.Icon.List,target:(0,b.jsx)(Xt,{issue:e,mutateList:t}),shortcut:{macOS:{modifiers:["cmd","shift"],key:"m"},Windows:{modifiers:["ctrl","shift"],key:"m"}}}),(0,b.jsx)(g.Action.Push,{title:"Break Issues into Sub-Issues",icon:g.Icon.Stars,target:(0,b.jsx)(Wt,{issue:e}),shortcut:{macOS:{modifiers:["opt","shift"],key:"m"},Windows:{modifiers:["alt","shift"],key:"m"}}}),i?(0,b.jsx)(g.Action.Push,{title:"Show Issue Links",icon:g.Icon.Link,target:(0,b.jsx)(Bt,{attachments:c??[],issue:e}),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"l"},Windows:{modifiers:["ctrl","alt","shift"],key:"l"}}}):null,(0,b.jsx)(g.Action.Push,{title:"Add Attachments and Links",icon:g.Icon.NewDocument,target:(0,b.jsx)(Tt,{issue:e}),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"a"},Windows:{modifiers:["ctrl","alt","shift"],key:"a"}}}),(0,b.jsx)(g.Action.Push,{title:"Add Comment",icon:g.Icon.Plus,target:(0,b.jsx)(Ve,{issue:e}),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"n"},Windows:{modifiers:["ctrl","alt","shift"],key:"n"}}}),(0,b.jsx)(g.Action.Push,{title:"Show Comments",icon:g.Icon.Bubble,target:(0,b.jsx)(Ht,{issue:e}),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"c"},Windows:{modifiers:["ctrl","alt","shift"],key:"c"}}})]}),(0,b.jsx)(Jt,{issue:e}),(0,b.jsx)(g.ActionPanel.Section,{children:(0,b.jsx)(g.Action,{title:"Refresh",icon:g.Icon.ArrowClockwise,shortcut:g.Keyboard.Shortcut.Common.Refresh,onAction:()=>ce()})})]})}var F=require("react/jsx-runtime");function gt({issue:e,mutateList:t,priorities:s,me:r}){let{issue:i,isLoadingIssue:c,mutateDetail:l}=Ee(e),n=`# ${i?.title}`;i?.description&&(n+=`

${i.description}`);let o=i?.cycle?xe(i.cycle):null,m=i.relations?i.relations.nodes.filter(j=>j.type=="related"):null,d=i.relations?i.relations.nodes.filter(j=>j.type=="duplicate"):null,S=i.attachments?.nodes.length??0;return(0,F.jsx)(M.Detail,{markdown:n,isLoading:c,...i?{metadata:(0,F.jsxs)(M.Detail.Metadata,{children:[(0,F.jsx)(M.Detail.Metadata.Label,{title:"Status",text:i.state.name,icon:z(i.state)}),(0,F.jsx)(M.Detail.Metadata.Label,{title:"Priority",text:i.priorityLabel,icon:{source:ae[i.priority]}}),(0,F.jsx)(M.Detail.Metadata.Label,{title:"Assignee",text:i.assignee?i.assignee.displayName:"Unassigned",icon:K(i.assignee)}),i.team.issueEstimationType!=="notUsed"?(0,F.jsx)(M.Detail.Metadata.Label,{title:"Estimate",text:Pt({estimate:i.estimate,issueEstimationType:i.team.issueEstimationType}),icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}}):null,i.labels.nodes.length>0?(0,F.jsx)(M.Detail.Metadata.TagList,{title:"Labels",children:i.labels.nodes.map(({id:j,name:P,color:L})=>(0,F.jsx)(M.Detail.Metadata.TagList.Item,{text:P,color:L},j))}):(0,F.jsx)(M.Detail.Metadata.Label,{title:"Labels",text:"No Labels"}),i.dueDate?(0,F.jsx)(M.Detail.Metadata.Label,{title:"Due Date",text:(0,bi.format)(new Date(i.dueDate),"MM/dd/yyyy"),icon:Lt(new Date(i.dueDate))}):null,S>0?(0,F.jsx)(M.Detail.Metadata.Label,{title:"Links",text:`${S>1?`${S} links`:"1 link"}`,icon:M.Icon.Link}):null,(0,F.jsx)(M.Detail.Metadata.Separator,{}),(0,F.jsx)(M.Detail.Metadata.Label,{title:"Cycle",text:o?o.title:"No Cycle",icon:{source:o?o.icon:{light:"light/no-cycle.svg",dark:"dark/no-cycle.svg"}}}),(0,F.jsx)(M.Detail.Metadata.Label,{title:"Project",text:i.project?i.project.name:"No Project",icon:le(i.project)}),(0,F.jsx)(M.Detail.Metadata.Label,{title:"Milestone",text:i.projectMilestone?i.projectMilestone.name:"No Milestone",icon:Pe(i.projectMilestone)}),(0,F.jsx)(M.Detail.Metadata.Label,{title:"Parent Issue",text:i.parent?i.parent.title:"No Issue",icon:i.parent?z(i.parent.state):{source:{light:"light/backlog.svg",dark:"dark/backlog.svg"}}}),m&&m.length>0?(0,F.jsx)(M.Detail.Metadata.TagList,{title:"Related",children:m.map(({id:j,relatedIssue:P})=>(0,F.jsx)(M.Detail.Metadata.TagList.Item,{text:P.identifier},j))}):null,d&&d.length>0?(0,F.jsx)(M.Detail.Metadata.TagList,{title:"Duplicates",children:d.map(({id:j,relatedIssue:P})=>(0,F.jsx)(M.Detail.Metadata.TagList.Item,{text:P.identifier},j))}):null]}),actions:(0,F.jsx)(M.ActionPanel,{children:(0,F.jsx)(Ye,{issue:i,mutateList:t,mutateDetail:l,priorities:s,showAttachmentsAction:S>0,attachments:i.attachments?.nodes??[],me:r})})}:{}})}var f=require("react/jsx-runtime");function tr(e,t){return e==="url"?{title:"Copy Issue URL",onAction:()=>a.Clipboard.copy(t.url)}:e==="id-as-link"?{title:"Copy Issue ID as Link",onAction:()=>a.Clipboard.copy({text:`[${t.identifier}](${t.url})`,html:`<a href="${t.url}">${t.identifier}</a>`})}:e==="title"?{title:"Copy Issue Title",onAction:()=>a.Clipboard.copy(t.title)}:e==="title-as-link"?{title:"Copy Issue Title as Link",onAction:()=>a.Clipboard.copy({text:`[${t.title}](${t.url})`,html:`<a href="${t.url}">${t.title}</a>`})}:{title:"Copy Issue ID",onAction:()=>a.Clipboard.copy(t.identifier)}}function ft(e){let{push:t}=(0,a.useNavigation)(),{autofocusField:s,copyToastAction:r}=(0,a.getPreferenceValues)(),[i,c]=(0,Le.useState)(""),{teams:l,org:n,supportsTeamTypeahead:o,isLoadingTeams:m}=dt(i),d=l&&l.length>1,[S,j]=(0,Le.useState)(""),{users:P,supportsUserTypeahead:L,isLoadingUsers:A}=Fe(S),{handleSubmit:X,itemProps:U,values:$,setValue:x,focus:q,reset:ce,setValidationError:Te}=(0,ze.useForm)({async onSubmit(u){let R=await(0,a.showToast)({style:a.Toast.Style.Animated,title:"Creating issue"}),he=d?u.teamId:l?.[0]?.id;if(!he)return Te("teamId","The team is required."),!1;try{let B={teamId:he,title:u.title,description:u.description||"",stateId:u.stateId,labelIds:u.labelIds,dueDate:u.dueDate,...E&&u.estimate?{estimate:parseInt(u.estimate)}:{},...u.assigneeId?{assigneeId:u.assigneeId}:{},...u.cycleId?{cycleId:u.cycleId}:{},...u.projectId?{projectId:u.projectId}:{},...u.milestoneId?{projectMilestoneId:u.milestoneId}:{},...u.parentId?{parentId:u.parentId}:{},priority:parseInt(u.priority)},{success:Mt,issue:Ze}=await Ps(B);if(Mt&&Ze){R.style=a.Toast.Style.Success,R.title=`Created Issue \u2022 ${Ze?.identifier}`,R.primaryAction={title:"Open Issue",shortcut:a.Keyboard.Shortcut.Common.OpenWith,onAction:async()=>{t((0,f.jsx)(gt,{issue:Ze,priorities:e.priorities,me:e.me})),await R.hide()}},R.secondaryAction={shortcut:a.Keyboard.Shortcut.Common.Copy,...tr(r,Ze)},ce({templateId:"",title:"",description:"",estimate:"",labelIds:[],dueDate:null,parentId:"",attachments:[],links:""}),q(d&&s?s:"title");let Ut=bt(u.links);if(Ut.length>0){let De=Ut.length===1?"link":"links";try{R.message=`Attaching ${De}\u2026`,await Promise.all(Ut.map(Re=>kt({issueId:Ze.id,url:Re}))),R.message=`Successfully attached ${De}`}catch(Re){R.style=a.Toast.Style.Failure,R.title=`Failed attaching ${De}`,R.message=V(Re)}}if(u.attachments.length>0){let De=u.attachments.length===1?"attachment":"attachments";try{R.message=`Uploading ${De}\u2026`,await Promise.all(u.attachments.map(Re=>ht({issueId:Ze.id,url:Re}))),R.message=`Successfully uploaded ${De}`}catch(Re){R.style=a.Toast.Style.Failure,R.title=`Failed uploading ${De}`,R.message=V(Re)}}}}catch(B){R.style=a.Toast.Style.Failure,R.title="Failed to create issue",R.message=V(B)}x("teamId",he)},validation:{teamId:d?ze.FormValidation.Required:void 0,title:ze.FormValidation.Required,stateId:ze.FormValidation.Required,priority:ze.FormValidation.Required},initialValues:{templateId:e.draftValues?.templateId||"",teamId:e.draftValues?.teamId||e.teamId,title:e.draftValues?.title,description:e.draftValues?.description,priority:e.draftValues?.priority,stateId:e.draftValues?.stateId,estimate:e.draftValues?.estimate,assigneeId:e.draftValues?.assigneeId||e.assigneeId,labelIds:e.draftValues?.labelIds||[],dueDate:e.draftValues?.dueDate,cycleId:e.draftValues?.cycleId||e.cycleId,projectId:e.draftValues?.projectId||e.projectId,milestoneId:e.draftValues?.milestoneId||e.milestoneId,parentId:e.draftValues?.parentId||e.parentId,links:e.draftValues?.links||""}}),_=!!$.teamId&&$.teamId.trim().length>0,{issueTemplates:oe,isLoadingIssueTemplates:ye}=qt($.teamId,{execute:_}),{states:de}=ge($.teamId,{execute:_}),{labels:I}=je($.teamId,{execute:_}),{cycles:T}=ve($.teamId,{execute:_}),{issues:D}=pe(He,[],{execute:_}),{projects:Z}=Ue($.teamId,{execute:_}),{milestones:$e}=Me($.projectId,{execute:!!$.projectId});(0,Le.useEffect)(()=>{l?.length===1&&x("teamId",l[0].id)},[l]);let Ge=(0,Le.useRef)(!1);(0,Le.useEffect)(()=>{if(!Ge.current){Ge.current=!0;return}_e("")},[$.teamId]);function _e(u){x("templateId",u);let R=oe?.find(Mt=>Mt.id===u),he={assigneeId:e.assigneeId||"",cycleId:e.cycleId||"",projectId:e.projectId||"",milestoneId:e.milestoneId||""},B=R?Ls(R,he):Ot(he);x("title",B.title),x("description",B.description),x("stateId",B.stateId),x("priority",B.priority),x("assigneeId",B.assigneeId),x("labelIds",B.labelIds),x("estimate",B.estimate),x("dueDate",B.dueDate),x("cycleId",B.cycleId),x("projectId",B.projectId),x("milestoneId",B.milestoneId??"")}let G=l?.find(u=>u.id===$.teamId),E=G?Ke({issueEstimationType:G.issueEstimationType,issueEstimationAllowZero:G.issueEstimationAllowZero,issueEstimationExtended:G.issueEstimationExtended}):null,Q=Xe(de||[]),It=de&&de.length>0,p=e.priorities&&e.priorities.length>0,H=I&&I.length>0,ue=T&&T.length>0,nt=Z&&Z.length>0,ls=$e&&$e.length>0,jt=D&&D.length>0,wi=oe&&oe.length>0;return(0,f.jsxs)(a.Form,{enableDrafts:e.enableDrafts,actions:(0,f.jsxs)(a.ActionPanel,{children:[(0,f.jsx)(a.Action.SubmitForm,{icon:a.Icon.Plus,onSubmit:X,title:"Create Issue"}),(0,f.jsxs)(a.ActionPanel.Section,{children:[(0,f.jsx)(a.Action,{title:"Focus Title",icon:a.Icon.TextInput,onAction:()=>q("title"),shortcut:a.Keyboard.Shortcut.Common.Edit}),(0,f.jsx)(a.Action,{title:"Focus Description",icon:a.Icon.TextInput,onAction:()=>q("description"),shortcut:{modifiers:["ctrl"],key:"e"}}),(0,f.jsx)(a.Action,{title:"Focus Status",icon:a.Icon.Circle,onAction:()=>q("stateId"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"s"},Windows:{modifiers:["ctrl","shift"],key:"s"}}}),(0,f.jsx)(a.Action,{title:"Focus Priority",icon:a.Icon.LevelMeter,onAction:()=>q("priority"),shortcut:a.Keyboard.Shortcut.Common.Pin}),(0,f.jsx)(a.Action,{title:"Focus Assignee",icon:a.Icon.AddPerson,onAction:()=>q("assigneeId"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"a"},Windows:{modifiers:["ctrl","shift"],key:"a"}}}),E?(0,f.jsx)(a.Action,{title:"Focus Estimate",icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}},onAction:()=>q("estimate"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"e"},Windows:{modifiers:["ctrl","shift"],key:"e"}}}):null,(0,f.jsx)(a.Action,{title:"Focus Due Date",icon:a.Icon.Calendar,onAction:()=>q("dueDate"),shortcut:{macOS:{modifiers:["opt","shift"],key:"d"},Windows:{modifiers:["alt","shift"],key:"d"}}}),(0,f.jsx)(a.Action,{title:"Focus Labels",icon:a.Icon.Tag,onAction:()=>q("labelIds"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"l"},Windows:{modifiers:["ctrl","shift"],key:"l"}}}),ue?(0,f.jsx)(a.Action,{title:"Focus Cycle",icon:{source:{light:"light/cycle.svg",dark:"dark/cycle.svg"}},onAction:()=>q("cycleId"),shortcut:a.Keyboard.Shortcut.Common.Copy}):null,nt?(0,f.jsx)(a.Action,{title:"Focus Project",icon:{source:{light:"light/project.svg",dark:"dark/project.svg"}},onAction:()=>q("projectId"),shortcut:{modifiers:["ctrl","shift"],key:"p"}}):null,ls?(0,f.jsx)(a.Action,{title:"Focus Milestone",icon:{source:{light:"light/milestone.svg",dark:"dark/milestone.svg"}},onAction:()=>q("milestoneId"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"m"},Windows:{modifiers:["ctrl","shift"],key:"m"}}}):null,jt?(0,f.jsx)(a.Action,{title:"Focus Parent Issue",icon:{source:{light:"light/backlog.svg",dark:"dark/backlog.svg"}},onAction:()=>q("parentId"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"i"},Windows:{modifiers:["ctrl","shift"],key:"i"}}}):null,(0,f.jsx)(a.Action,{title:"Focus Attachments",icon:a.Icon.NewDocument,onAction:()=>q("attachments"),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"a"},Windows:{modifiers:["ctrl","alt","shift"],key:"a"}}}),(0,f.jsx)(a.Action,{title:"Focus Links",icon:a.Icon.Link,onAction:()=>q("links"),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"l"},Windows:{modifiers:["ctrl","alt","shift"],key:"l"}}})]})]}),isLoading:m||A||e.isLoading,children:[(o||d)&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(a.Form.Dropdown,{title:"Team",storeValue:!0,...U.teamId,...o&&{onSearchTextChange:c,isLoading:m,throttle:!0},children:l?.map(u=>(0,f.jsx)(a.Form.Dropdown.Item,{title:u.name,value:u.id,icon:Ct(u,n)},u.id))}),(0,f.jsx)(a.Form.Separator,{})]}),_&&(ye||wi)?(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)(a.Form.Dropdown,{id:"templateId",title:"Template",value:$.templateId||"",onChange:_e,isLoading:ye,children:[(0,f.jsx)(a.Form.Dropdown.Item,{title:"No Template",value:"",icon:a.Icon.Document}),oe?.map(u=>(0,f.jsx)(a.Form.Dropdown.Item,{title:u.name,value:u.id,icon:a.Icon.Document},u.id))]}),(0,f.jsx)(a.Form.Separator,{})]}):null,(0,f.jsx)(a.Form.TextField,{title:"Title",placeholder:"Issue title",...s==="title"?{autoFocus:!0}:{},...U.title}),(0,f.jsx)(a.Form.TextArea,{title:"Description",placeholder:"Add some details (supports Markdown, e.g. **bold**)",enableMarkdown:!0,...U.description}),(0,f.jsx)(a.Form.Dropdown,{title:"Status",storeValue:!0,...U.stateId,children:It?Q.map(u=>(0,f.jsx)(a.Form.Dropdown.Item,{title:u.name,value:u.id,icon:z(u)},u.id)):null}),(0,f.jsx)(a.Form.Dropdown,{title:"Priority",storeValue:!0,...U.priority,children:p?e.priorities?.map(({priority:u,label:R})=>(0,f.jsx)(a.Form.Dropdown.Item,{title:R,value:String(u),icon:{source:ae[u]}},u)):null}),(0,f.jsxs)(a.Form.Dropdown,{title:"Assignee",storeValue:!0,...U.assigneeId,...L&&{onSearchTextChange:j,isLoading:A,throttle:!0},children:[(0,f.jsx)(a.Form.Dropdown.Item,{title:"Unassigned",value:"",icon:a.Icon.Person}),P?.map(u=>(0,f.jsx)(a.Form.Dropdown.Item,{title:u.name,value:u.id,icon:K(u)},u.id))]}),(0,f.jsx)(a.Form.TagPicker,{title:"Labels",placeholder:"Add label",...U.labelIds,children:H?I.map(({id:u,name:R,color:he})=>(0,f.jsx)(a.Form.TagPicker.Item,{title:R,value:u,icon:{source:a.Icon.Dot,tintColor:he}},u)):null}),E?(0,f.jsxs)(a.Form.Dropdown,{title:"Estimate",...U.estimate,children:[(0,f.jsx)(a.Form.Dropdown.Item,{title:"No estimate",value:"",icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}}),E.map(({estimate:u,label:R})=>(0,f.jsx)(a.Form.Dropdown.Item,{title:R,value:String(u),icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}},u))]}):null,(0,f.jsx)(a.Form.DatePicker,{title:"Due Date",type:a.Form.DatePicker.Type.Date,...U.dueDate}),ue||nt||jt?(0,f.jsx)(a.Form.Separator,{}):null,ue?(0,f.jsxs)(a.Form.Dropdown,{title:"Cycle",storeValue:!0,...U.cycleId,children:[(0,f.jsx)(a.Form.Dropdown.Item,{title:"No Cycle",value:"",icon:{source:{light:"light/no-cycle.svg",dark:"dark/no-cycle.svg"}}}),ke(T).map(u=>(0,f.jsx)(a.Form.Dropdown.Item,{title:u.title,value:u.id,icon:{source:u.icon}},u.id))]}):null,nt?(0,f.jsxs)(a.Form.Dropdown,{title:"Project",storeValue:!0,...U.projectId,children:[(0,f.jsx)(a.Form.Dropdown.Item,{title:"No Project",value:"",icon:{source:{light:"light/no-project.svg",dark:"dark/no-project.svg"}}}),Z.map(u=>(0,f.jsx)(a.Form.Dropdown.Item,{title:`${u.name} (${u.status.name})`,value:u.id,icon:le(u)},u.id))]}):null,ls?(0,f.jsxs)(a.Form.Dropdown,{title:"Milestone",storeValue:!0,...U.milestoneId,children:[(0,f.jsx)(a.Form.Dropdown.Item,{title:"No Milestone",value:"",icon:{source:"linear-icons/no-milestone.svg"}}),$e.map(u=>(0,f.jsx)(a.Form.Dropdown.Item,{title:`${u.name} (${u.targetDate||"No Target Date"})`,value:u.id,icon:Pe(u)},u.id))]}):null,jt?(0,f.jsxs)(a.Form.Dropdown,{title:"Parent",...U.parentId,children:[(0,f.jsx)(a.Form.Dropdown.Item,{title:"No Issue",value:"",icon:{source:{light:"light/backlog.svg",dark:"dark/backlog.svg"}}}),D.map(u=>(0,f.jsx)(a.Form.Dropdown.Item,{title:`${u.identifier} - ${u.title}`,value:u.id,icon:z(u.state)},u.id))]}):null,(0,f.jsx)(a.Form.Separator,{}),(0,f.jsx)(a.Form.FilePicker,{title:"Attachment",...U.attachments}),(0,f.jsx)(a.Form.TextArea,{title:"Links",placeholder:`https://a.com
https://b.com
New link(s) on separate line(s)`,...U.links})]})}var ot=require("@raycast/api"),Si=require("@raycast/utils"),xt=at(require("react"));var rt=require("react/jsx-runtime");function sr({children:e}){return(0,xt.useEffect)(()=>{ni()},[]),e}var ns=class extends xt.default.Component{constructor(t){super(t),this.state={error:null}}static getDerivedStateFromError(t){return{error:t}}render(){let{error:t}=this.state;if(!t)return this.props.children;if(!(t.message.includes("invalid_grant")||t.message.includes("Error while fetching tokens")||t.message.includes("Could not initialize OAuth")))throw t;return(0,rt.jsx)(ot.Detail,{markdown:`# Sign In Failed

Failed to authenticate with Linear:
\`\`\`
${t.message}
\`\`\`

This can happen when the network is unreliable or the authorization code has expired. Please try signing in again.`,actions:(0,rt.jsx)(ot.ActionPanel,{children:(0,rt.jsx)(ot.Action,{title:"Sign in Again",onAction:async()=>{await Ft.client.removeTokens(),this.setState({error:null})}})})})}},ir=(0,Si.withAccessToken)(Ft)(sr);function as({children:e}){return(0,rt.jsx)(ns,{children:(0,rt.jsx)(ir,{children:e})})}var vt=require("react/jsx-runtime");function rr({draftValues:e}){let{priorities:t,isLoadingPriorities:s}=pt(),{me:r,isLoadingMe:i}=qe();return(0,vt.jsx)(ft,{isLoading:s||i,priorities:t,me:r,enableDrafts:!0,draftValues:e})}function Ci({draftValues:e}){return(0,vt.jsx)(as,{children:(0,vt.jsx)(rr,{draftValues:e})})}
