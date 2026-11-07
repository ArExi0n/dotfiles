"use strict";var ji=Object.create;var St=Object.defineProperty;var Ui=Object.getOwnPropertyDescriptor;var Fi=Object.getOwnPropertyNames;var Ei=Object.getPrototypeOf,Ni=Object.prototype.hasOwnProperty;var Oi=(e,t)=>{for(var s in t)St(e,s,{get:t[s],enumerable:!0})},Is=(e,t,s,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of Fi(t))!Ni.call(e,i)&&i!==s&&St(e,i,{get:()=>t[i],enumerable:!(r=Ui(t,i))||r.enumerable});return e};var ut=(e,t,s)=>(s=e!=null?ji(Ei(e)):{},Is(t||!e||!e.__esModule?St(s,"default",{value:e,enumerable:!0}):s,e)),Vi=e=>Is(St({},"__esModule",{value:!0}),e);var Pr={};Oi(Pr,{default:()=>vi});module.exports=Vi(Pr);var X=require("@raycast/api"),xi=require("react");var Ps=require("@raycast/api");var ys=require("@linear/sdk"),hs=require("@raycast/api"),ks=require("@raycast/utils"),mt=null;async function qi(e,t,s,r,i){let c=JSON.stringify({query:s,variables:r}),a=new Headers(t.headers);new Headers(i).forEach((u,d)=>a.set(d,u)),a.set("Content-Type","application/json");let n=await fetch(e,{...t,method:"POST",headers:Object.fromEntries(a.entries()),body:c}),o=n.headers.get("Content-Type")?.startsWith("application/json")?await n.json():await n.text();if(typeof o!="string"&&n.ok&&!o.errors&&o.data)return{...o,headers:n.headers,status:n.status};throw new Error(typeof o=="string"?o:o.errors?.[0]?.message??`GraphQL Error (${n.status})`)}var Wt=ks.OAuthService.linear({scope:"read write",onAuthorize({token:e}){mt=new ys.LinearClient({accessToken:e,headers:{"public-file-urls-expire-in":"60","linear-raycast-extension-name":hs.environment.extensionName}});let t=mt.client;t.rawRequest=((s,r,i)=>qi(t.url,t.options,s,r,i))}});function k(){if(!mt)throw new Error("No linear client initialized");return{linearClient:mt,graphQLClient:mt.client}}async function Ct(e,t,s,r,i){let c=r,a=!0,n,o=0;for(;a&&o<i;){let u=await e(n);c=s(c,u),a=t(u)?.hasNextPage,n=t(u)?.endCursor,o++}return c}var Wi=50,Qi=50,Qt=(0,Ps.getPreferenceValues)();function Bi(){let e=Qt.limit?+Qt.limit:Qi,t=Math.min(Wi,e),s=Math.floor(e/t);return{pageSize:t,pageLimit:s}}function pt({inFilterBlock:e,addComma:t,inParentheses:s}={inFilterBlock:!1,inParentheses:!1,addComma:!0}){return Qt.shouldHideRedundantIssues?[...s?["("]:[],...t?[", "]:[],...e?[]:["filter: { "],"completedAt: { null: true }, canceledAt: { null: true }",...e?[]:[" }"],...s?[")"]:[]].join(""):""}var be=`
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
`;async function Ye(){let{graphQLClient:e}=k(),{data:t}=await e.rawRequest(`
      query {
        issues(orderBy: createdAt${pt()}) {
          nodes {
            ${be}
          }
        }
      }
    `);return t?.issues.nodes}async function zi(){let{graphQLClient:e}=k(),{data:t}=await e.rawRequest(`
      query {
        viewer {
          assignedIssues(orderBy: updatedAt${pt()}) {
            nodes {
              ${be}
            }
          }
        }
      }
    `);return t?.viewer.assignedIssues.nodes}async function Gi(){let{graphQLClient:e}=k(),{data:t}=await e.rawRequest(`
      query {
        viewer {
          createdIssues(orderBy: updatedAt${pt()}) {
            nodes {
              ${be}
            }
          }
        }
      }
    `);return t?.viewer.createdIssues.nodes}async function _i(){let{graphQLClient:e}=k(),{pageSize:t,pageLimit:s}=Bi();return Ct(async r=>e.rawRequest(`
          query($cursor: String) {
            issues(first: ${t}, after: $cursor, orderBy: updatedAt, filter: { subscribers: { some: { isMe: { eq: true } } }${pt({inFilterBlock:!0,addComma:!0})} }) {
              nodes {
                ${be}
              }
              pageInfo {
                hasNextPage
                endCursor
              }
            }
          }
        `,{cursor:r}),r=>r.data?.issues.pageInfo,(r,i)=>r.concat(i.data?.issues.nodes||[]),[],s)}function bs(e){switch(e){case"assigned":return zi();case"created":return Gi();case"subscribed":return _i()}}async function Ss(e){let{graphQLClient:t}=k(),{data:s}=await t.rawRequest(`
      query($issueId: String!) {
        issue(id: $issueId) {
          children${pt({inParentheses:!0})} {
            nodes {
              ${be}
              sortOrder
            }
          }
        }
      }
    `,{issueId:e});if(!s)throw new Error("Cannot find the Linear issue");return s.issue.children.nodes}async function Cs(e){let{graphQLClient:t}=k(),{data:s}=await t.rawRequest(`
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
    `,{issueId:e});if(!s)throw new Error("Cannot find the Linear issue");return s.issue}async function ws(e){let{graphQLClient:t}=k(),{data:s}=await t.rawRequest(`
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
    `,{issueId:e});if(!s)throw new Error("Cannot find the Linear issue");return s.issue.comments.nodes}async function As(e){let{graphQLClient:t}=k(),{data:s}=await t.rawRequest(`
      query($issueId: String!) {
        issue(id: $issueId) {
          ${be}
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
    `,{issueId:e});if(!s)throw new Error("Cannot find the Linear issue");return s.issue}var l=require("@raycast/api"),He=require("@raycast/utils"),Re=require("react");var Ls=require("fs/promises"),Bt=ut(require("path"));var Zi="application/octet-stream",Hi={".apng":"image/apng",".avif":"image/avif",".bmp":"image/bmp",".csv":"text/csv",".doc":"application/msword",".docx":"application/vnd.openxmlformats-officedocument.wordprocessingml.document",".gif":"image/gif",".gz":"application/gzip",".heic":"image/heic",".heif":"image/heif",".ico":"image/x-icon",".jpeg":"image/jpeg",".jpg":"image/jpeg",".json":"application/json",".md":"text/markdown",".mov":"video/quicktime",".mp3":"audio/mpeg",".mp4":"video/mp4",".pdf":"application/pdf",".png":"image/png",".ppt":"application/vnd.ms-powerpoint",".pptx":"application/vnd.openxmlformats-officedocument.presentationml.presentation",".svg":"image/svg+xml",".tar":"application/x-tar",".tif":"image/tiff",".tiff":"image/tiff",".txt":"text/plain",".webm":"video/webm",".webp":"image/webp",".xls":"application/vnd.ms-excel",".xlsx":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",".zip":"application/zip"};function Ki(e){return Hi[Bt.default.extname(e).toLowerCase()]??Zi}async function Xi(e){let{graphQLClient:t}=k(),s=await(0,Ls.readFile)(e),r=Ki(e),i=Bt.default.basename(e),{data:c}=await t.rawRequest(`
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
    `,{size:s.byteLength,contentType:r,filename:i}),a=c?.fileUpload.uploadFile;if(!c?.fileUpload.success||!a)throw new Error(`Failed to request an upload URL for "${i}"`);let n=new Headers({"Content-Type":r,"Cache-Control":"public, max-age=31536000"});a.headers.forEach(({key:u,value:d})=>n.set(u,d));let o=await fetch(a.uploadUrl,{method:"PUT",headers:n,body:s});if(!o.ok)throw new Error(`Failed to upload "${i}": ${o.status} ${o.statusText}`);return{assetUrl:a.assetUrl,contentType:r,name:i}}async function wt(e){let{linearClient:t}=k(),s=await Xi(e.url),r=await t.createAttachment({issueId:e.issueId,title:s.name,url:s.assetUrl});return{success:r.success,id:r.attachmentId}}async function At(e){let{linearClient:t}=k(),s=await t.attachmentLinkURL(e.issueId,e.url);return{success:s.success,id:s.attachmentId}}async function Ts(e){let{graphQLClient:t}=k(),s=e.title.replace(/"/g,"\\$&"),r=e.description?.replace(/\n/g,"\\n")?.replace(/"/g,"\\$&"),i=`teamId: "${e.teamId}", title: "${s}", description: "${r}", priority: ${e.priority}`;e.stateId&&(i+=`, stateId: "${e.stateId}"`),e.estimate&&(i+=`, estimate: ${e.estimate}`),e.assigneeId&&(i+=`, assigneeId: "${e.assigneeId}"`),e.labelIds&&e.labelIds.length>0&&(i+=`, labelIds: [${e.labelIds.map(a=>`"${a}"`).join(",")}]`),e.dueDate&&(i+=`, dueDate: "${e.dueDate.toISOString()}"`),e.cycleId&&(i+=`, cycleId: "${e.cycleId}"`),e.projectId&&(i+=`, projectId: "${e.projectId}"`),e.projectId&&e.projectMilestoneId&&(i+=`, projectMilestoneId: "${e.projectMilestoneId}"`),e.parentId&&(i+=`, parentId: "${e.parentId}"`);let{data:c}=await t.rawRequest(`
      mutation {
        issueCreate(input: {${i}}) {
          success
          issue {
            ${be}
          }
        }
      }
    `);return{success:c?.issueCreate.success,issue:c?.issueCreate.issue}}async function $s(e){let{graphQLClient:t}=k(),s=e.title.replace(/"/g,"\\$&"),r=e.description?.replace(/\n/g,"\\n").replace(/"/g,"\\$&"),i=`teamId: "${e.teamId}", title: "${s}", description: "${r}", parentId: "${e.parentId}"`;e.stateId&&(i+=`, stateId: "${e.stateId}"`);let{data:c}=await t.rawRequest(`
      mutation {
        issueCreate(input: {${i}}) {
          success
        }
      }
    `);return{success:c?.issueCreate.success}}var ce=require("date-fns"),Ji=10080*60*1e3;function Ue(e){let t=Date.now(),s=Date.now()+Ji,r=new Date(e.startsAt),i=new Date(e.endsAt),c=!e.completedAt&&(0,ce.isBefore)(r,t)&&(0,ce.isAfter)(i,t),a=!e.completedAt&&(0,ce.isBefore)(r,s)&&(0,ce.isAfter)(i,s),n=c?{light:"light/active-cycle.svg",dark:"dark/active-cycle.svg"}:{light:"light/cycle.svg",dark:"dark/cycle.svg"},o=`Cycle ${e.number} (${(0,ce.format)(r,"dd MMM")} - ${(0,ce.format)(i,"dd MMM")})`,u=c?`Active ${o}`:o;return{...e,isActive:c,isNext:a,icon:n,title:u}}function Se(e){return e.filter(t=>(0,ce.isAfter)(new Date(t.endsAt),Date.now())).map(Ue)}function V(e){return e instanceof Error?e.message:String(e)}var Ds={exponential:[0,1,2,4,8,16,32,64],fibonacci:[0,1,2,3,5,8,13,21],linear:[0,1,2,3,4,5,6,7],tShirt:[0,1,2,3,5,8,13,21]},Rs={0:"\u2013",1:"XS",2:"S",3:"M",5:"L",8:"XL",13:"XXL",21:"XXXL"};function Lt({estimate:e,issueEstimationType:t}){if(!e)return"Not estimated";if(t==="tShirt"){let s=Rs[e];return s||String(e)}return String(e)}function et({issueEstimationType:e,issueEstimationAllowZero:t,issueEstimationExtended:s}){if(e==="notUsed")return null;let r=t?0:1,i=s?Ds[e].length:6,c=Ds[e].slice(r,i);return e==="tShirt"?c.map(a=>({estimate:a,label:Rs[a]})):c.map(a=>({estimate:a,label:a!==1?`${a} points`:`${a} point`}))}function zt(e={}){return{title:"",description:"",stateId:"",priority:"",assigneeId:"",labelIds:[],estimate:"",dueDate:null,cycleId:"",projectId:"",milestoneId:"",...e}}function Yi(e){if(typeof e=="string")try{let t=JSON.parse(e);return typeof t=="object"&&t!==null?t:{}}catch{return{}}return typeof e=="object"&&e!==null?e:{}}function fe(e){return typeof e=="string"?e:void 0}function xs(e){return typeof e=="number"?String(e):fe(e)}function vs(e){if(!Array.isArray(e))return;let t=e.filter(s=>typeof s=="string");return t.length>0?t:void 0}function er(e){if(typeof e!="string")return;let t=new Date(e);return Number.isNaN(t.getTime())?void 0:t}function Ms(e,t={}){let s=Yi(e.templateData),r=zt(t),i=vs(s.labelIds)??vs(s.labels);return{title:fe(s.title)??r.title,description:fe(s.description)??fe(e.description)??r.description,stateId:fe(s.stateId)??fe(s.statusId)??r.stateId,priority:xs(s.priority)??r.priority,assigneeId:fe(s.assigneeId)??r.assigneeId,labelIds:i??r.labelIds,estimate:xs(s.estimate)??r.estimate,dueDate:s.dueDate!==void 0?er(s.dueDate)??null:r.dueDate,cycleId:fe(s.cycleId)??r.cycleId,projectId:fe(s.projectId)??r.projectId,milestoneId:r.milestoneId}}function Tt(e){let t=e.split(`
`),s=/https?:\/\/\S+/,r=t.map(i=>i.trim()).filter(i=>s.test(i));return Array.from(new Set(r))}var Gt=require("@raycast/api");function Ce(e){return e?{source:"linear-icons/milestone.svg",tintColor:Gt.Color.PrimaryText}:{source:"linear-icons/no-milestone.svg",tintColor:Gt.Color.SecondaryText}}var de={0:{light:"light/priority-no-priority.svg",dark:"dark/priority-no-priority.svg"},1:{light:"light/priority-urgent.svg",dark:"dark/priority-urgent.svg"},2:{light:"light/priority-high.svg",dark:"dark/priority-high.svg"},3:{light:"light/priority-medium.svg",dark:"dark/priority-medium.svg"},4:{light:"light/priority-low.svg",dark:"dark/priority-low.svg"}};var js=ut(require("fs")),Us=require("@raycast/api"),Fs=ut(require("node-emoji"));function $t({icon:e,color:t,fallbackIcon:s}){if(!e)return s;if(/:(.*):/.test(e))return Fs.get(e)??s;let i=`${Us.environment.assetsPath}/linear-icons/${e.toLowerCase()}.svg`;return js.default.existsSync(i)?{source:i,...t?{tintColor:{light:t,dark:t,adjustContrast:!0}}:{}}:s}function ue(e){return e?$t({icon:e.icon??void 0,color:e.color??void 0,fallbackIcon:{source:{light:"light/project.svg",dark:"dark/project.svg"}}}):{source:{light:"light/no-project.svg",dark:"dark/no-project.svg"}}}var Es=require("lodash");var tr={triage:{light:"light/triage.svg",dark:"dark/triage.svg"},backlog:{light:"light/backlog.svg",dark:"dark/backlog.svg"},unstarted:{light:"light/unstarted.svg",dark:"dark/unstarted.svg"},started:{light:"light/started.svg",dark:"dark/started.svg"},completed:{light:"light/completed.svg",dark:"dark/completed.svg"},canceled:{light:"light/canceled.svg",dark:"dark/canceled.svg"}};function z(e){return{source:tr[e.type],tintColor:{light:e.color,dark:e.color,adjustContrast:!0}}}function we(e,t=["triage","backlog","unstarted","started","completed","canceled"]){if(e.length===0)return[];let s=(0,Es.groupBy)(e,r=>r.type);return t.filter(r=>!!s[r]).map(r=>s[r]).flat()}var Ns=require("@raycast/api");function Dt(e,t){let s=t?.logoUrl?encodeURI(t.logoUrl):Ns.Icon.TwoPeople;return $t({icon:e.icon??void 0,color:e.color??void 0,fallbackIcon:s})}var Rt=require("@raycast/api"),Os=require("@raycast/utils");function K(e){return e?{source:e.avatarUrl?encodeURI(e.avatarUrl):(0,Os.getAvatarIcon)(e.displayName.toUpperCase()),mask:Rt.Image.Mask.Circle}:Rt.Icon.Person}var Vs=require("@raycast/utils");function Fe(e,t){let{linearClient:s}=k(),{data:r,error:i,isLoading:c}=(0,Vs.useCachedPromise)(async a=>(await s.cycles({filter:{team:{id:{eq:a}}}})).nodes.sort((o,u)=>o.number-u.number),[e],{execute:t?.execute!==!1&&!!e});return{cycles:r,cyclesError:i,isLoadingCycles:!r&&!i||c}}var Qs=require("@raycast/utils");var qs=`
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
`;function sr(e,t){let s=e.type.toLowerCase()==="issue",r=!e.team||e.team.id===t;return s&&!e.archivedAt&&r}function ir(e,t){return(e.sortOrder??0)-(t.sortOrder??0)||e.name.localeCompare(t.name)}async function Ws(e){if(!e)return[];let{graphQLClient:t}=k(),{data:s}=await t.rawRequest(`
      query IssueTemplates($teamId: String!, $first: Int) {
        organization {
          templates(first: $first) {
            nodes {
              ${qs}
            }
          }
        }
        team(id: $teamId) {
          templates(first: $first) {
            nodes {
              ${qs}
            }
          }
        }
      }
    `,{teamId:e,first:100});return[...s?.organization?.templates?.nodes??[],...s?.team?.templates?.nodes??[]].filter((i,c,a)=>a.findIndex(n=>n.id===i.id)===c).filter(i=>sr(i,e)).sort(ir)}function _t(e,t){let{data:s,error:r,isLoading:i}=(0,Qs.useCachedPromise)(Ws,[e],{execute:t?.execute!==!1&&!!e});return{issueTemplates:s,issueTemplatesError:r,isLoadingIssueTemplates:!s&&!r||i}}var Bs=require("@raycast/utils");function ee(e,t=[],s){let{data:r,error:i,isLoading:c,mutate:a}=(0,Bs.useCachedPromise)(e,t,s);return{issues:r,issuesError:i,isLoadingIssues:c,mutateList:a}}var _s=require("@raycast/utils");var zs=require("@raycast/api");var rr=100,or=100,nr=(0,zs.getPreferenceValues)();function ar(){let e=Number(nr.labelsLimit),t=Number.isFinite(e)&&e>0?e:or,s=Math.floor(Math.min(rr,t)),r=Math.ceil(t/s);return{pageSize:s,pageLimit:r}}async function Gs(e){if(!e)return[];let{pageSize:t,pageLimit:s}=ar(),{graphQLClient:r}=k();return Ct(async i=>r.rawRequest(`
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
        `,{teamId:e,cursor:i}),i=>i.data?.team?.labels?.pageInfo,(i,c)=>i.concat(c.data?.team?.labels?.nodes??[]),[],s)}function Ee(e,t){let{data:s,error:r,isLoading:i}=(0,_s.useCachedPromise)(Gs,[e],{execute:t?.execute!==!1&&!!e});return{labels:s,labelsError:r,isLoadingLabels:!s&&!r||i}}var Hs=require("@raycast/utils");var lr=`
  id
  name
  targetDate
  project {
      id
  }
  sortOrder
  updatedAt
`;async function Zs(e){let{graphQLClient:t}=k();if(e){let{data:s}=await t.rawRequest(`
        query($projectId: String!) {
          project(id: $projectId) {
            projectMilestones {
              nodes {
                ${lr}
              }
            }
          }
        }
      `,{projectId:e});return s?.project.projectMilestones.nodes}return null}function Ne(e,t){let{data:s,error:r,isLoading:i,mutate:c}=(0,Hs.useCachedPromise)(Zs,[e],{execute:t?.execute!==!1});return{milestones:s,isLoadingMilestones:!s&&!r||i,milestonesError:r,mutateMilestones:c}}var Xs=require("@raycast/utils");var cr=`
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
`;async function Ks({teamId:e,searchText:t="",after:s=null,first:r=null}){let{graphQLClient:i}=k(),c=`
    projects(first: $first, after: $after, filter: { name: { containsIgnoreCase: $searchText } }) {
      nodes {
        ${cr}
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
      `,{first:r,after:s,searchText:t}),u=o?.projects;return{data:u?.nodes??[],hasMore:!!u?.pageInfo.hasNextPage,cursor:u?.pageInfo.endCursor||null}}let{data:a}=await i.rawRequest(`
      query($teamId: String!, $first: Int, $after: String, $searchText: String) {
        team(id: $teamId) {
          ${c}
        }
      }
    `,{teamId:e,first:r,after:s,searchText:t}),n=a?.team?.projects;return{data:n?.nodes??[],hasMore:!!n?.pageInfo.hasNextPage,cursor:n?.pageInfo.endCursor||null}}function Oe(e,t){let{data:s,error:r,isLoading:i,mutate:c,pagination:a}=(0,Xs.useCachedPromise)((n,o)=>u=>Ks({teamId:n,searchText:o,after:u.cursor,first:t?.pageSize}),[e,t?.searchText],{execute:t?.execute!==!1,keepPreviousData:!0});return{projects:s,isLoadingProjects:!s&&!r||i,projectsError:r,mutateProjects:c,pagination:a}}var Js=require("@raycast/utils");function Ie(e,t){let{linearClient:s}=k(),{data:r,error:i,isLoading:c}=(0,Js.useCachedPromise)(async a=>(await s.workflowStates({filter:{team:{id:{eq:a}}}})).nodes.sort((o,u)=>o.position-u.position),[e],{initialData:[],execute:t?.execute!==!1});return{states:r,isLoadingStates:c,statesError:i}}var ti=require("@raycast/utils");var Ys=require("lodash");async function ei(e=""){let{graphQLClient:t,linearClient:s}=k(),r=await s.viewer,{data:i}=await t.rawRequest(`
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
    `,{userId:r.id,query:e}),c=(0,Ys.sortBy)(i?.teams.nodes??[],o=>o.membership?.sortOrder??1/0),a=i?.organization,n=!!i?.teams.pageInfo.hasNextPage;return{teams:c,organization:a,hasMoreTeams:n}}function gt(e=""){let{data:t,error:s,isLoading:r}=(0,ti.useCachedPromise)(ei,[e]);return{teams:t?.teams,org:t?.organization,teamsError:s,isLoadingTeams:!t&&!s||r,supportsTeamTypeahead:e.trim().length>0||t?.hasMoreTeams}}var si=require("@raycast/utils");function Ve(e=""){let{linearClient:t}=k(),{data:s,error:r,isLoading:i}=(0,si.useCachedPromise)(async c=>{let a=await t.users(c.trim().length>0?{filter:{name:{containsIgnoreCase:c}}}:void 0);return{users:a?.nodes??[],hasMoreUsers:!!a?.pageInfo?.hasNextPage}},[e],{initialData:[]});return{users:s?.users,supportsUserTypeahead:e.trim().length>0||s?.hasMoreUsers,usersError:r,isLoadingUsers:!s&&!r||i}}var j=require("@raycast/api"),$i=require("date-fns");var tt=require("@raycast/api"),xt=require("date-fns");function vt(e){let t=(0,xt.differenceInDays)(e,(0,xt.startOfToday)()),s=tt.Color.PrimaryText;return t<=7&&(s=tt.Color.Orange),t<=0&&(s=tt.Color.Red),{source:tt.Icon.Calendar,tintColor:s}}var ii=require("@raycast/utils");function qe(e){let t=e.id,{data:s,error:r,isLoading:i,mutate:c}=(0,ii.useCachedPromise)(As,[t],{initialData:{...e,description:""}});return{issue:s,issueError:r,isLoadingIssue:i,mutateDetail:c}}var g=require("@raycast/api"),ds=require("date-fns"),Ti=require("react");var w=require("@raycast/api"),ri=require("@raycast/utils"),oi=require("nanoid"),We=require("react");var te=require("react/jsx-runtime");function Zt({issue:e}){let{pop:t}=(0,w.useNavigation)(),{states:s}=Ie(e.team.id),r=(0,We.useMemo)(()=>s.filter(A=>A.type==="unstarted")[0],[s]),{issue:i,isLoadingIssue:c}=qe(e),{data:a,isLoading:n,revalidate:o}=(0,ri.useAI)(`Act as a product manager for Linear issues. Break down a Linear issue into a list of sub-issues. 
    
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

Break down the Linear issue with this title: "${i.title}"`,{execute:!!i&&!c,creativity:.5}),[u,d]=(0,We.useState)(!1),[P,R]=(0,We.useState)([]);(0,We.useEffect)(()=>{if(!(!a||n)){try{let L=/\[[\s\S]*?\]/,A=a.match(L);if(A&&A[0]){let Y=JSON.parse(A[0]);R(Y.map(U=>({...U,id:(0,oi.nanoid)(),selected:!0})))}}catch(L){(0,w.showToast)({style:w.Toast.Style.Failure,title:"Failed to parse AI results",message:V(L),primaryAction:{title:"Retry",onAction:o},secondaryAction:{title:"Copy AI Result",onAction:()=>w.Clipboard.copy(a)}})}d(!0)}},[a,n]);async function b(){try{await(0,w.showToast)({style:w.Toast.Style.Animated,title:"Creating sub-issues"});let L=P.filter(A=>A.selected);await Promise.all(L.map(A=>$s({teamId:i.team.id,title:A.title,description:A.description,parentId:i.id,stateId:r?.id}))),await(0,w.showToast)({style:w.Toast.Style.Success,title:"Created sub-issues"}),t()}catch(L){(0,w.showToast)({style:w.Toast.Style.Failure,title:"Failed to create Sub-Issues",message:V(L)})}}return(0,te.jsxs)(w.List,{isLoading:n||!u,children:[P?.map(L=>(0,te.jsx)(w.List.Item,{icon:L.selected?{source:w.Icon.CheckCircle,tintColor:w.Color.Green}:w.Icon.Circle,title:L.title,subtitle:L.description,actions:(0,te.jsxs)(w.ActionPanel,{children:[(0,te.jsx)(w.Action,{title:L.selected?"Unselect Sub-Issue":"Select Sub-Issue",icon:L.selected?w.Icon.Circle:{source:w.Icon.CheckCircle,tintColor:w.Color.Green},onAction:()=>R(P.map(A=>A.id===L.id?{...A,selected:!A.selected}:A))}),(0,te.jsx)(w.Action,{title:"Create Sub-Issues",icon:w.Icon.Plus,onAction:()=>b()}),(0,te.jsx)(w.Action,{title:"Generate New Sub-Issues",icon:w.Icon.ArrowClockwise,onAction:o})]})},L.title)),(0,te.jsx)(w.List.EmptyView,{title:"No sub-issues were generated. Try again.",actions:(0,te.jsx)(w.ActionPanel,{children:(0,te.jsx)(w.Action,{title:"Retry",icon:w.Icon.ArrowClockwise,onAction:o})})})]})}var y=require("@raycast/api"),Qe=require("@raycast/utils"),ft=require("react");async function ni(e,t){let{graphQLClient:s}=k(),r=[];if(t.teamId&&r.push(`teamId: "${t.teamId}"`),t.title&&r.push(`title: "${t.title.replace(/"/g,"\\$&")}"`),t.description&&r.push(`description: "${t.description.replace(/\n/g,"\\n").replace(/"/g,"\\$&")}"`),t.stateId&&r.push(`stateId: "${t.stateId}"`),typeof t.priority<"u"&&r.push(`priority: ${t.priority}`),typeof t.assigneeId<"u"&&r.push(`assigneeId: ${t.assigneeId?`"${t.assigneeId}"`:null}`),t.labelIds&&r.push(`labelIds: [${t.labelIds.map(c=>`"${c}"`).join(",")}]`),typeof t.estimate<"u"&&r.push(`estimate: ${t.estimate}`),typeof t.dueDate<"u"){let c=t.dueDate?t.dueDate instanceof Date?t.dueDate.toISOString():t.dueDate:null;r.push(`dueDate: ${c?`"${c}"`:null}`)}typeof t.cycleId<"u"&&r.push(`cycleId: ${t.cycleId?`"${t.cycleId}"`:null}`),typeof t.projectId<"u"&&r.push(`projectId: ${t.projectId?`"${t.projectId}"`:null}`),typeof t.projectMilestoneId<"u"&&r.push(`projectMilestoneId: ${t.projectMilestoneId?`"${t.projectMilestoneId}"`:null}`),typeof t.parentId<"u"&&r.push(`parentId: ${t.parentId?`"${t.parentId}"`:null}`);let{data:i}=await s.rawRequest(`
      mutation {
        issueUpdate(id: "${e}", input: {${r.join(", ")}}) {
          success
        }
      }
    `);return{success:i?.issueUpdate.success}}var C=require("react/jsx-runtime");function Ht(e){let{pop:t}=(0,y.useNavigation)(),{issue:s,isLoadingIssue:r,mutateDetail:i}=qe(e.issue),[c,a]=(0,ft.useState)(""),{teams:n,org:o,supportsTeamTypeahead:u,isLoadingTeams:d}=gt(c),P=n&&n.length>1,[R,b]=(0,ft.useState)(""),{users:L,supportsUserTypeahead:A,isLoadingUsers:Y}=Ve(R),{handleSubmit:U,itemProps:$,values:v,setValue:q}=(0,Qe.useForm)({async onSubmit(p){let H=await(0,y.showToast)({style:y.Toast.Style.Animated,title:"Editing issue"});try{let ge={teamId:p.teamId||e.issue.team.id,title:p.title,description:p.description,stateId:p.stateId,labelIds:p.labelIds,dueDate:p.dueDate,...D&&p.estimate?{estimate:parseInt(p.estimate)}:{},...p.assigneeId?{assigneeId:p.assigneeId}:{},...p.cycleId?{cycleId:p.cycleId}:{},...p.projectId?{projectId:p.projectId}:{},...p.milestoneId?{projectMilestoneId:p.milestoneId}:{},...p.parentId?{parentId:p.parentId}:{},priority:parseInt(p.priority)},{success:dt}=await ni(s.id,ge);dt&&(H.style=y.Toast.Style.Success,H.title=`Edited Issue \u2022 ${s.identifier}`,t(),i(),e.mutateList&&e.mutateList(),e.mutateSubIssues&&e.mutateSubIssues())}catch(ge){H.style=y.Toast.Style.Failure,H.title="Failed to edit issue",H.message=V(ge)}},validation:{teamId:P?Qe.FormValidation.Required:void 0,title:Qe.FormValidation.Required,stateId:Qe.FormValidation.Required,priority:Qe.FormValidation.Required},initialValues:{teamId:e.issue.team.id,title:e.issue.title,description:s.description??void 0,priority:String(e.issue.priority),stateId:e.issue.state.id,estimate:e.issue.estimate?String(e.issue.estimate):void 0,assigneeId:e.issue.assignee?.id,labelIds:e.issue.labels.nodes.map(p=>p.id),dueDate:s.dueDate?new Date(s.dueDate):null,cycleId:e.issue.cycle?.id,projectId:e.issue.project?.id,milestoneId:e.issue.projectMilestone?.id,parentId:e.issue.parent?.id}});(0,ft.useEffect)(()=>{q("description",s.description||""),q("dueDate",s.dueDate?new Date(s.dueDate):null)},[s]);let me=!!v.teamId&&v.teamId.trim().length>0,{states:xe}=Ie(v.teamId,{execute:me}),{labels:_}=Ee(v.teamId,{execute:me}),{cycles:le}=Fe(v.teamId,{execute:me}),{issues:ke}=ee(Ye,[],{execute:me}),{projects:pe}=Oe(v.teamId,{execute:me}),{milestones:I}=Ne(v.projectId,{execute:!!v.projectId}),T=n?.find(p=>p.id===v.teamId),D=T?et({issueEstimationType:T.issueEstimationType,issueEstimationAllowZero:T.issueEstimationAllowZero,issueEstimationExtended:T.issueEstimationExtended}):null,Z=we(xe||[]),ve=xe&&xe.length>0,Ke=e.priorities&&e.priorities.length>0,Xe=_&&_.length>0,G=le&&le.length>0,E=pe&&pe.length>0,Q=I&&I.length>0,bt=ke&&ke.length>0;return(0,C.jsxs)(y.Form,{actions:(0,C.jsx)(y.ActionPanel,{children:(0,C.jsx)(y.Action.SubmitForm,{onSubmit:U,title:"Edit Issue"})}),isLoading:d||r||Y,children:[(u||P)&&(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(y.Form.Dropdown,{title:"Team",...$.teamId,...u&&{onSearchTextChange:a,isLoading:d,throttle:!0},children:n?.map(p=>(0,C.jsx)(y.Form.Dropdown.Item,{title:p.name,value:p.id,icon:Dt(p,o)},p.id))}),(0,C.jsx)(y.Form.Separator,{})]}),(0,C.jsx)(y.Form.TextField,{title:"Title",placeholder:"Issue title",autoFocus:!0,...$.title}),(0,C.jsx)(y.Form.TextArea,{title:"Description",placeholder:"Add some details (supports Markdown, e.g. **bold**)",...$.description}),(0,C.jsx)(y.Form.Dropdown,{title:"Status",...$.stateId,children:ve?Z.map(p=>(0,C.jsx)(y.Form.Dropdown.Item,{title:p.name,value:p.id,icon:z(p)},p.id)):null}),(0,C.jsx)(y.Form.Dropdown,{title:"Priority",...$.priority,children:Ke?e.priorities?.map(({priority:p,label:H})=>(0,C.jsx)(y.Form.Dropdown.Item,{title:H,value:String(p),icon:{source:de[p]}},p)):null}),(0,C.jsxs)(y.Form.Dropdown,{title:"Assignee",...$.assigneeId,...A&&{onSearchTextChange:b,isLoading:Y,throttle:!0},children:[(0,C.jsx)(y.Form.Dropdown.Item,{title:"Unassigned",value:"",icon:y.Icon.Person}),L?.map(p=>(0,C.jsx)(y.Form.Dropdown.Item,{title:p.name,value:p.id,icon:K(p)},p.id))]}),(0,C.jsx)(y.Form.TagPicker,{title:"Labels",...$.labelIds,placeholder:"Add label",children:Xe?_.map(({id:p,name:H,color:ge})=>(0,C.jsx)(y.Form.TagPicker.Item,{title:H,value:p,icon:{source:y.Icon.Dot,tintColor:ge}},p)):null}),D?(0,C.jsxs)(y.Form.Dropdown,{title:"Estimate",...$.estimate,children:[(0,C.jsx)(y.Form.Dropdown.Item,{title:"No estimate",value:"",icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}}),D.map(({estimate:p,label:H})=>(0,C.jsx)(y.Form.Dropdown.Item,{title:H,value:String(p),icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}},p))]}):null,(0,C.jsx)(y.Form.DatePicker,{title:"Due Date",type:y.Form.DatePicker.Type.Date,...$.dueDate}),G||E||bt?(0,C.jsx)(y.Form.Separator,{}):null,G?(0,C.jsxs)(y.Form.Dropdown,{title:"Cycle",...$.cycleId,children:[(0,C.jsx)(y.Form.Dropdown.Item,{title:"No Cycle",value:"",icon:{source:{light:"light/no-cycle.svg",dark:"dark/no-cycle.svg"}}}),Se(le).map(p=>(0,C.jsx)(y.Form.Dropdown.Item,{title:p.title,value:p.id,icon:{source:p.icon}},p.id))]}):null,E?(0,C.jsxs)(y.Form.Dropdown,{title:"Project",...$.projectId,children:[(0,C.jsx)(y.Form.Dropdown.Item,{title:"No Project",value:"",icon:{source:{light:"light/no-project.svg",dark:"dark/no-project.svg"}}}),pe.map(p=>(0,C.jsx)(y.Form.Dropdown.Item,{title:`${p.name} (${p.status.name})`,value:p.id,icon:ue(p)},p.id))]}):null,Q?(0,C.jsxs)(y.Form.Dropdown,{title:"Milestone",storeValue:!0,...$.milestoneId,children:[(0,C.jsx)(y.Form.Dropdown.Item,{title:"No Milestone",value:"",icon:{source:"linear-icons/no-milestone.svg"}}),I.map(p=>(0,C.jsx)(y.Form.Dropdown.Item,{title:`${p.name}  (${p.targetDate||"No Target Date"})`,value:p.id,icon:Ce(p)},p.id))]}):null,bt?(0,C.jsxs)(y.Form.Dropdown,{title:"Parent",...$.parentId,children:[(0,C.jsx)(y.Form.Dropdown.Item,{title:"No Issue",value:"",icon:{source:{light:"light/backlog.svg",dark:"dark/backlog.svg"}}}),ke.map(p=>(0,C.jsx)(y.Form.Dropdown.Item,{title:`${p.identifier} - ${p.title}`,value:p.id,icon:z(p.state)},p.id))]}):null]})}var se=require("@raycast/api"),li=require("date-fns");var N=require("@raycast/api"),ai=require("@raycast/utils");var Ae=require("react/jsx-runtime");function Mt({issue:{id:e,title:t,identifier:s}}){let{pop:r}=(0,N.useNavigation)(),{reset:i,itemProps:c,handleSubmit:a}=(0,ai.useForm)({onSubmit:async n=>{let o=await(0,N.showToast)({style:N.Toast.Style.Animated,title:"Attaching links"}),u=Tt(n.links);if(u.length===0&&n.attachments.length===0){o.style=N.Toast.Style.Failure,o.title="No links or attachments provided";return}if(u.length>0){let d=u.length===1?"link":"links";try{await Promise.all(u.map(P=>At({issueId:e,url:P}))),o.style=N.Toast.Style.Success,o.title=`Successfully attached ${d}`}catch(P){o.style=N.Toast.Style.Failure,o.title=`Failed attaching ${d}`,o.message=V(P)}}if(n.attachments.length>0){let d=n.attachments.length===1?"attachment":"attachments";try{o.style=N.Toast.Style.Animated,o.title=`Uploading ${d}\u2026`,await Promise.all(n.attachments.map(P=>wt({issueId:e,url:P}))),o.style=N.Toast.Style.Success,o.title=`Successfully uploaded ${d}`}catch(P){o.style=N.Toast.Style.Failure,o.title=`Failed uploading ${d}`,o.message=V(P)}}i({attachments:[],links:""}),r()},initialValues:{links:""}});return(0,Ae.jsxs)(N.Form,{actions:(0,Ae.jsx)(N.ActionPanel,{children:(0,Ae.jsx)(N.Action.SubmitForm,{onSubmit:a,icon:N.Icon.NewDocument,title:"Attach"})}),navigationTitle:"Add Attachments and Links",children:[(0,Ae.jsx)(N.Form.Description,{title:"Issue",text:`[${s}] ${t}`}),(0,Ae.jsx)(N.Form.FilePicker,{title:"Attachment",...c.attachments}),(0,Ae.jsx)(N.Form.TextArea,{title:"Links",placeholder:`https://a.com
https://b.com
New link(s) on separate line(s)`,...c.links})]})}var Le=require("react/jsx-runtime");function Kt({attachments:e,issue:t}){return(0,Le.jsx)(se.List,{navigationTitle:`Links for ${t.identifier}`,children:e.map(s=>{let r=new Date(s.updatedAt);return(0,Le.jsx)(se.List.Item,{icon:s.source?.imageUrl??se.Icon.Link,title:s.title,subtitle:s.subtitle,accessories:[{date:r,tooltip:`Updated: ${(0,li.format)(r,"EEEE d MMMM yyyy 'at' HH:mm")}`}],actions:(0,Le.jsxs)(se.ActionPanel,{children:[(0,Le.jsx)(se.Action.OpenInBrowser,{url:s.url}),(0,Le.jsx)(se.Action.Push,{title:"Add Attachments and Links",icon:se.Icon.NewDocument,target:(0,Le.jsx)(Mt,{issue:t})})]})},s.id)})})}var W=require("@raycast/api"),ci=require("react");var It=require("react/jsx-runtime");function Be({comment:e,issue:t,mutateComments:s}){let{linearClient:r}=k(),{pop:i}=(0,W.useNavigation)(),[c,a]=(0,ci.useState)(e?e.body:"");async function n(){await(0,W.showToast)({style:W.Toast.Style.Animated,title:`${e?"Updating":"Adding"} comment`});try{e?await r.updateComment(e.id,{body:c}):await r.createComment({body:c,issueId:t.id}),await(0,W.showToast)({style:W.Toast.Style.Success,title:`${e?"Updated":"Added"} comment`}),i(),s&&s()}catch(o){(0,W.showToast)({style:W.Toast.Style.Failure,title:`Failed to ${e?"update":"add"} comment`,message:V(o)})}}return(0,It.jsx)(W.Form,{actions:(0,It.jsx)(W.ActionPanel,{children:(0,It.jsx)(W.Action.SubmitForm,{title:e?"Edit Comment":"Add Comment",onSubmit:n,icon:e?W.Icon.Pencil:W.Icon.Plus})}),children:(0,It.jsx)(W.Form.TextArea,{id:"comment",title:"Comment",placeholder:"Leave a comment",value:c,onChange:a})})}var h=require("@raycast/api"),gi=require("date-fns"),fi=ut(require("remove-markdown"));var di=require("@raycast/utils");function Xt(e){let{data:t,error:s,isLoading:r,mutate:i}=(0,di.useCachedPromise)(ws,[e]);return{comments:t,commentsError:s,isLoadingComments:r,mutateComments:i}}var ui=require("@raycast/utils");function ze(){let{linearClient:e}=k(),{data:t,error:s,isLoading:r}=(0,ui.useCachedPromise)(()=>e.viewer);return{me:t,meError:s,isLoadingMe:!t&&!s||r}}var Yt=require("@raycast/api");var mi=require("@raycast/api"),Jt=!1;async function pi(){Jt=!!(await(0,mi.getApplications)()).find(s=>s.bundleId==="com.linear")}var es=require("react/jsx-runtime");function Ge({title:e,url:t,...s}){return Jt?(0,es.jsx)(Yt.Action.Open,{title:`${e||"Open"} in Linear`,icon:"linear-app-icon.png",target:t,application:"Linear",...s}):(0,es.jsx)(Yt.Action.OpenInBrowser,{url:t,title:`${e||"Open"} in Browser`})}var O=require("react/jsx-runtime");function ts({issue:e}){let{linearClient:t}=k(),{me:s,isLoadingMe:r}=ze(),{comments:i,isLoadingComments:c,mutateComments:a}=Xt(e.id);async function n(o){if(await(0,h.confirmAlert)({title:"Delete Comment",message:"Are you sure you want to delete this comment?",icon:{source:h.Icon.Trash,tintColor:h.Color.Red}}))try{await(0,h.showToast)({style:h.Toast.Style.Animated,title:"Deleting comment"}),await a(t.deleteComment(o),{optimisticUpdate(u){return u&&u?.filter(d=>d.id!==o)}}),await(0,h.showToast)({style:h.Toast.Style.Success,title:"Deleted comment"})}catch(u){(0,h.showToast)({style:h.Toast.Style.Failure,title:"Failed to delete comment",message:V(u)})}}return(0,O.jsxs)(h.List,{isLoading:c||r,navigationTitle:`${e.identifier} \u2022 Comments`,searchBarPlaceholder:"Filter by user or comment content",isShowingDetail:!0,children:[(0,O.jsx)(h.List.EmptyView,{title:"No comments",description:"This issue doesn't have any comments.",actions:(0,O.jsx)(h.ActionPanel,{children:(0,O.jsx)(h.Action.Push,{title:"Add Comment",icon:h.Icon.Plus,target:(0,O.jsx)(Be,{issue:e,mutateComments:a})})})}),i?.map(o=>{let u=new Date(o.createdAt);return(0,O.jsx)(h.List.Item,{title:o.user.displayName,subtitle:o.body,icon:K(o.user),keywords:(0,fi.default)(o.body).replace(/\n/g," ").split(" "),accessories:[{date:u,tooltip:`Created: ${(0,gi.format)(u,"EEEE d MMMM yyyy 'at' HH:mm")}`}],detail:(0,O.jsx)(h.List.Item.Detail,{markdown:o.body}),actions:(0,O.jsxs)(h.ActionPanel,{children:[(0,O.jsx)(Ge,{title:"Open Comment",url:o.url}),s?.id===o.user.id?(0,O.jsxs)(h.ActionPanel.Section,{children:[(0,O.jsx)(h.Action.Push,{title:"Edit Comment",icon:h.Icon.Pencil,shortcut:h.Keyboard.Shortcut.Common.Edit,target:(0,O.jsx)(Be,{issue:e,comment:o,mutateComments:a})}),(0,O.jsx)(h.Action,{title:"Delete Comment",icon:h.Icon.Trash,style:h.Action.Style.Destructive,shortcut:h.Keyboard.Shortcut.Common.Remove,onAction:()=>n(o.id)})]}):null,(0,O.jsx)(h.ActionPanel.Section,{children:(0,O.jsx)(h.Action.Push,{title:"Add Comment",icon:h.Icon.Plus,shortcut:{macOS:{modifiers:["cmd","shift"],key:"n"},Windows:{modifiers:["ctrl","shift"],key:"n"}},target:(0,O.jsx)(Be,{issue:e,mutateComments:a})})}),(0,O.jsxs)(h.ActionPanel.Section,{children:[(0,O.jsx)(h.Action.CopyToClipboard,{icon:h.Icon.Clipboard,content:o.url,title:"Copy Comment URL",shortcut:h.Keyboard.Shortcut.Common.CopyPath}),(0,O.jsx)(h.Action.CopyToClipboard,{icon:h.Icon.Clipboard,content:o.body,title:"Copy Comment",shortcut:{macOS:{modifiers:["cmd","shift"],key:"'"},Windows:{modifiers:["ctrl","shift"],key:"'"}}})]}),(0,O.jsx)(h.ActionPanel.Section,{children:(0,O.jsx)(h.Action,{title:"Refresh",icon:h.Icon.ArrowClockwise,shortcut:h.Keyboard.Shortcut.Common.Refresh,onAction:a})})]})},o.id)})]})}var _e=require("@raycast/api");var Ii=require("@raycast/utils");function yt(){let{linearClient:e}=k(),{data:t,error:s,isLoading:r}=(0,Ii.useCachedPromise)(()=>e.issuePriorityValues,[],{initialData:[]});return{priorities:t,prioritiesError:s,isLoadingPriorities:!t&&!s||r}}var ie=require("@raycast/api"),jt=require("date-fns");var Te=require("react/jsx-runtime");function ht({issue:e,mutateList:t,mutateSubIssues:s,priorities:r,me:i}){let{primaryAction:c}=(0,ie.getPreferenceValues)(),a=[e.identifier,e.state.name,e.priorityLabel];e.assignee&&a.push(e.assignee.email,e.assignee.displayName);let n=new Date(e.updatedAt),o=e.dueDate?new Date(e.dueDate):null,u=e.estimate?{icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}},text:Lt({estimate:e.estimate,issueEstimationType:e.team.issueEstimationType})}:null,d=e.cycle?Ue(e.cycle):null,P=e.project||null,R=e.labels.nodes.length>0,b=[{date:n,tooltip:`Updated: ${(0,jt.format)(n,"EEEE d MMMM yyyy 'at' HH:mm")}`},{icon:o?vt(o):void 0,text:o?(0,jt.format)(o,"MMM dd"):void 0,tooltip:o?`Due date: ${(0,jt.format)(o,"MM/dd/yyyy")}`:void 0},{icon:R?ie.Icon.Tag:void 0,text:R?String(e.labels.nodes.length):void 0,tooltip:R?e.labels.nodes.map(A=>A.name).join(", "):void 0},{icon:P?ue(P):void 0,tooltip:`Project: ${P?P.name:void 0}`},{icon:d?{source:d.icon}:void 0,text:d?String(d.number):void 0,tooltip:d?`Cycle: ${d.title}`:void 0},{icon:u?u.icon:void 0,text:u?u.text:void 0},{icon:z(e.state),tooltip:`Status: ${e.state.name}`},{icon:K(e.assignee),tooltip:e.assignee?`Assignee: ${e.assignee?.displayName} (${e.assignee?.email})`:"Unassigned"}],L=c==="openInLinear";return(0,Te.jsx)(ie.List.Item,{title:e.title,icon:{value:{source:de[e.priority]},tooltip:`Priority: ${e.priorityLabel}`},subtitle:e.identifier,keywords:a,accessories:b,actions:(0,Te.jsxs)(ie.ActionPanel,{title:e.identifier,children:[L?(0,Te.jsx)(Ge,{title:"Open Issue",url:e.url}):null,(0,Te.jsx)(ie.Action.Push,{title:"Show Details",icon:ie.Icon.Sidebar,target:(0,Te.jsx)(kt,{issue:e,mutateList:t,priorities:r,me:i})}),(0,Te.jsx)(st,{issue:e,mutateList:t,mutateSubIssues:s,priorities:r,me:i,hideOpenInLinear:L})]})},e.id)}var $e=require("react/jsx-runtime");function ss({issue:e,mutateList:t}){let{issues:s,isLoadingIssues:r,mutateList:i}=ee(u=>Ss(u),[e.id]),{priorities:c,isLoadingPriorities:a}=yt(),{me:n,isLoadingMe:o}=ze();return(0,$e.jsxs)(_e.List,{isLoading:r||o||a||o,navigationTitle:`${e.identifier} \u2022 Sub-issues`,children:[(0,$e.jsx)(_e.List.EmptyView,{title:"No issues",description:"This issue doesn't have any sub-issues.",actions:(0,$e.jsx)(_e.ActionPanel,{children:(0,$e.jsx)(_e.Action.Push,{title:"Create Sub-Issue",target:(0,$e.jsx)(Pt,{priorities:c,me:n,parentId:e.id,projectId:e.project?.id,cycleId:e.cycle?.id,teamId:e.team.id})})})}),s?.map(u=>(0,$e.jsx)(ht,{issue:u,mutateList:t,mutateSubIssues:i,priorities:c,me:n},u.id))]})}var M=require("@raycast/api");function hi(e){let t=[`Work on Linear issue ${e.identifier}:`,""],s=ur(e.branchName);if(s&&t.push(`Suggested branch name: ${s}`,""),t.push(`<issue identifier="${Ut(e.identifier)}">`),t.push(`<title>${e.title}</title>`),t.push(...ki(e.description)),e.team?.name&&t.push(`<team name="${Ut(e.team.name)}"/>`),e.labels?.nodes?.forEach(i=>{t.push(`<label>${i.name}</label>`)}),e.project?.name){let i=Ut(e.project.name);t.push(e.project.description?`<project name="${i}">${e.project.description}</project>`:`<project name="${i}"/>`)}e.parent&&t.push(...yi("parent-issue",e.parent));let r=e.children?.nodes??[];return r.length>0&&(t.push("<sub-issues>"),r.forEach(i=>t.push(...yi("sub-issue",i))),t.push("</sub-issues>")),t.push("</issue>"),t.join(`
`)}function yi(e,t){return[`<${e} identifier="${Ut(t.identifier)}">`,`<id>${t.id}</id>`,`<title>${t.title}</title>`,...ki(t.description),`</${e}>`]}function ki(e){return e?e.includes(`
`)?["<description>",e,"</description>"]:[`<description>${e}</description>`]:[]}function ur(e){return e&&e.slice(e.lastIndexOf("/")+1)}function Ut(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}var re=require("react/jsx-runtime"),mr={ISSUE_TITLE:"title",ISSUE_ID:"identifier",ISSUE_URL:"url",ISSUE_BRANCH_NAME:"branchName"};function pr(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function gr(e){return e.replace(/\[/g,"\\[").replace(/\]/g,"\\]")}function fr(e){return{html:`<a href="${e.url}">${pr(e.title)}</a>`,text:`[${gr(e.title)}](${e.url})`}}function is({issue:e}){let{issueCustomCopyAction:t}=(0,M.getPreferenceValues)();async function s(){let r=await(0,M.showToast)({style:M.Toast.Style.Animated,title:"Copying prompt"});try{await M.Clipboard.copy(hi(await Cs(e.id))),r.style=M.Toast.Style.Success,r.title="Copied prompt to clipboard"}catch(i){r.style=M.Toast.Style.Failure,r.title="Failed copying prompt",r.message=V(i)}}return(0,re.jsxs)(M.ActionPanel.Section,{children:[(0,re.jsx)(M.Action.CopyToClipboard,{content:e.identifier,title:"Copy Issue ID",shortcut:{macOS:{modifiers:["cmd"],key:"."},Windows:{modifiers:["ctrl"],key:"."}}}),(0,re.jsx)(M.Action.CopyToClipboard,{content:{html:`<a href="${e.url}" title="${e.title}">${e.identifier}: ${e.title}</a>`,text:e.url},title:"Copy Formatted Issue URL",shortcut:M.Keyboard.Shortcut.Common.CopyPath}),(0,re.jsx)(M.Action.CopyToClipboard,{content:e.url,title:"Copy Issue URL",shortcut:{macOS:{modifiers:["cmd","shift"],key:"u"},Windows:{modifiers:["ctrl","shift"],key:"u"}}}),(0,re.jsx)(M.Action.CopyToClipboard,{content:e.title,title:"Copy Issue Title",shortcut:{macOS:{modifiers:["cmd","shift"],key:"'"},Windows:{modifiers:["ctrl","shift"],key:"'"}}}),(0,re.jsx)(M.Action.CopyToClipboard,{content:fr(e),title:"Copy Title as Link",shortcut:{macOS:{modifiers:["cmd","shift"],key:"t"},Windows:{modifiers:["ctrl","shift"],key:"t"}}}),(0,re.jsx)(M.Action.CopyToClipboard,{content:e.branchName,title:"Copy Git Branch Name",shortcut:M.Keyboard.Shortcut.Common.CopyName}),t&&t!==""?(0,re.jsx)(M.Action.CopyToClipboard,{content:t?.replace(/\{(.*?)\}/g,(r,i)=>{let c=e[mr[i]];return c||r}),title:"Custom Copy",shortcut:{macOS:{modifiers:["cmd","opt"],key:"."},Windows:{modifiers:["ctrl","alt"],key:"."}}}):null,(0,re.jsx)(M.Action,{icon:M.Icon.Clipboard,title:"Copy as Prompt",onAction:s,shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"p"},Windows:{modifiers:["ctrl","alt","shift"],key:"p"}}})]})}var oe=require("@raycast/api"),Pi=require("react");var ne=require("react/jsx-runtime");function rs({issue:e,updateIssue:t}){let{linearClient:s}=k(),[r,i]=(0,Pi.useState)(!1),{cycles:c,isLoadingCycles:a}=Fe(e.team.id,{execute:r}),n=e.cycle?Ue(e.cycle):null,o=n?.isActive||!1,u=n?.isNext||!1;async function d(b){let L=e.cycle;t({animatedTitle:"Moving to cycle",payload:{cycleId:b?.id||null},optimisticUpdate(A){return{...A,cycle:b||void 0}},rollbackUpdate(A){return{...A,cycle:L}},successTitle:b?"Moved to cycle":"Removed from cycle",successMessage:b?.title?b.title:"",errorTitle:"Failed to move to cycle"})}async function P(){let{nodes:b}=await s.cycles({filter:{team:{id:{eq:e.team.id}}}}),L=Se(b||[]),A=L.findIndex($=>$.isActive),U=(A>-1?L[A]:null)?L[A+1]:null;if(U)return d(U)}async function R(){let{nodes:b}=await s.cycles({filter:{team:{id:{eq:e.team.id}}}}),A=Se(b||[]).find(Y=>Y.isActive);if(A)return d(A)}return(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsxs)(oe.ActionPanel.Submenu,{title:"Move to Cycle",icon:{source:{light:"light/cycle.svg",dark:"dark/cycle.svg"}},shortcut:oe.Keyboard.Shortcut.Common.Copy,onOpen:()=>i(!0),children:[(0,ne.jsx)(oe.Action,{title:"No Cycle",icon:{source:{light:"light/no-cycle.svg",dark:"dark/no-cycle.svg"}},onAction:()=>d(null)}),!c&&a?(0,ne.jsx)(oe.Action,{title:"Loading\u2026"}):Se(c||[]).map(b=>(0,ne.jsx)(oe.Action,{autoFocus:b.id===n?.id,title:b.title,icon:{source:b.icon},onAction:()=>d(b)},b.id))]}),o?null:(0,ne.jsx)(oe.Action,{title:"Move to Active Cycle",icon:{source:{light:"light/active-cycle.svg",dark:"dark/active-cycle.svg"}},shortcut:oe.Keyboard.Shortcut.Common.Copy,onAction:()=>R()}),u?null:(0,ne.jsx)(oe.Action,{title:"Move to Next Cycle",icon:{source:{light:"light/cycle.svg",dark:"dark/cycle.svg"}},shortcut:{macOS:{modifiers:["cmd","shift"],key:"n"},Windows:{modifiers:["ctrl","shift"],key:"n"}},onAction:()=>P()})]})}var ae=require("@raycast/api"),bi=require("lodash"),Si=require("react");var ye=require("react/jsx-runtime");function os({issue:e,updateIssue:t}){let[s,r]=(0,Si.useState)(!1),{labels:i}=Ee(e.team.id,{execute:s}),[,c]=(0,bi.partition)(i||[],o=>e.labels.nodes.map(u=>u.id).includes(o.id));async function a(o){let u=e.labels.nodes.map(d=>d.id);t({animatedTitle:"Adding label",payload:{labelIds:[...u,o.id]},optimisticUpdate(d){return{...d,labels:{...d.labels,nodes:[...d.labels.nodes,o]}}},rollbackUpdate(d){return{...d,labels:{...d.labels,nodes:d.labels.nodes.filter(P=>P.id!==o.id)}}},successTitle:"Added label",successMessage:`Label "${o.name}" added to ${e.identifier}`,errorTitle:"Failed to add label"})}async function n(o){let u=e.labels.nodes.map(d=>d.id);t({animatedTitle:"Remove label",payload:{labelIds:u.filter(d=>d!==o.id)},optimisticUpdate(d){return{...d,labels:{...d.labels,nodes:d.labels.nodes.filter(P=>P.id!==o.id)}}},rollbackUpdate(d){return{...d,labels:{...d.labels,nodes:[...d.labels.nodes,o]}}},successTitle:"Removed label",successMessage:`Label "${o.name}" removed from ${e.identifier}`,errorTitle:"Failed to remove label"})}return(0,ye.jsxs)(ye.Fragment,{children:[(0,ye.jsx)(ae.ActionPanel.Submenu,{title:"Add Label",icon:ae.Icon.Tag,shortcut:{macOS:{modifiers:["cmd","shift"],key:"l"},Windows:{modifiers:["ctrl","shift"],key:"l"}},onOpen:()=>r(!0),children:c.map(o=>(0,ye.jsx)(ae.Action,{title:o.name,icon:{source:ae.Icon.Dot,tintColor:o.color},onAction:()=>a(o)},o.id))}),e.labels.nodes.length>0?(0,ye.jsx)(ae.ActionPanel.Submenu,{title:"Remove Label",icon:ae.Icon.Tag,shortcut:{macOS:{modifiers:["cmd","shift"],key:"l"},Windows:{modifiers:["ctrl","shift"],key:"l"}},children:e.labels.nodes.map(o=>(0,ye.jsx)(ae.Action,{title:o.name,icon:{source:ae.Icon.Dot,tintColor:o.color},onAction:()=>n(o)},o.id))}):null]})}var De=require("@raycast/api"),Ci=require("react");var it=require("react/jsx-runtime");function ns({issue:e,updateIssue:t}){let[s,r]=(0,Ci.useState)(!1),{milestones:i,isLoadingMilestones:c}=Ne(e.project?.id,{execute:s});async function a(n){let o=e.projectMilestone;t({animatedTitle:"Setting milestone",payload:{projectMilestoneId:n?n.id:null},optimisticUpdate(u){return{...u,milestone:n||void 0}},rollbackUpdate(u){return{...u,milestone:o}},successTitle:n?"Set milestone":`Removed milestone from ${e.identifier}`,successMessage:n?`"${n.name}" added to ${e.identifier}`:"",errorTitle:"Failed to set milestone"})}return(0,it.jsxs)(De.ActionPanel.Submenu,{title:"Set Milestone",icon:{source:"linear-icons/milestone.svg",tintColor:De.Color.PrimaryText},shortcut:{modifiers:["ctrl","shift"],key:"m"},onOpen:()=>r(!0),children:[(0,it.jsx)(De.Action,{title:"No Milestone",icon:{source:"linear-icons/no-milestone.svg"},onAction:()=>a(null)}),!i&&c?(0,it.jsx)(De.Action,{title:"Loading\u2026"}):(i||[]).map(n=>(0,it.jsx)(De.Action,{autoFocus:n.id===e.projectMilestone?.id,title:`${n.name}  (${n.targetDate||"No Target Date"})`,icon:Ce(n),onAction:()=>a(n)},n.id))]})}var rt=require("@raycast/api"),wi=require("react");var he=require("react/jsx-runtime");function as({issue:e,updateIssue:t}){let[s,r]=(0,wi.useState)(!1),{issues:i,isLoadingIssues:c}=ee(Ye,[],{execute:s}),a=e.parent,n=a?.id,o=!!n;async function u(d){t({animatedTitle:"Setting parent issue",payload:{parentId:d?d.id:null},optimisticUpdate(P){return{...P,parent:d||void 0}},rollbackUpdate(P){return{...P,parent:a}},successTitle:"Set parent issue",successMessage:d?`${d.identifier} set as parent issue`:`Removed parent issue from ${e.identifier}`,errorTitle:"Failed to set parent issue"})}return(0,he.jsxs)(he.Fragment,{children:[(0,he.jsx)(rt.ActionPanel.Submenu,{title:o?"Change Parent Issue":"Set Parent Issue",icon:{source:{light:"light/parent-issue.svg",dark:"dark/parent-issue.svg"}},shortcut:{modifiers:["ctrl","shift"],key:"i"},onOpen:()=>r(!0),children:!i&&c?(0,he.jsx)(rt.Action,{title:"Loading\u2026"}):(i||[]).map(d=>(0,he.jsx)(rt.Action,{autoFocus:d.id===n,title:`${d.identifier} - ${d.title}`,icon:z(d.state),onAction:()=>u(d)},d.id))}),o?(0,he.jsx)(rt.Action,{title:"Remove Parent Issue",icon:{source:{light:"light/parent-issue.svg",dark:"dark/parent-issue.svg"}},shortcut:{macOS:{modifiers:["cmd","shift"],key:"k"},Windows:{modifiers:["ctrl","shift"],key:"k"}},onAction:()=>u(null)}):null]})}var ot=require("@raycast/api"),Ai=require("react");var nt=require("react/jsx-runtime");function ls({issue:e,updateIssue:t}){let[s,r]=(0,Ai.useState)(!1),{projects:i,isLoadingProjects:c}=Oe(e.team.id,{execute:s});async function a(n){let o=e.project;t({animatedTitle:"Setting project",payload:{projectId:n?n.id:null},optimisticUpdate(u){return{...u,project:n||void 0}},rollbackUpdate(u){return{...u,project:o}},successTitle:n?"Set project":`Removed project from ${e.identifier}`,successMessage:n?`"${n.name}" added to ${e.identifier}`:"",errorTitle:"Failed to set project"})}return(0,nt.jsxs)(ot.ActionPanel.Submenu,{title:"Set Project",icon:{source:{light:"light/project.svg",dark:"dark/project.svg"}},shortcut:{modifiers:["ctrl","shift"],key:"p"},onOpen:()=>r(!0),children:[(0,nt.jsx)(ot.Action,{title:"No Project",icon:{source:{light:"light/no-project.svg",dark:"dark/no-project.svg"}},onAction:()=>a(null)}),!i&&c?(0,nt.jsx)(ot.Action,{title:"Loading\u2026"}):(i||[]).map(n=>(0,nt.jsx)(ot.Action,{autoFocus:n.id===e.project?.id,title:`${n.name} (${n.status.name})`,icon:ue(n),onAction:()=>a(n)},n.id))]})}var Ze=require("@raycast/api"),Li=require("react");var Ft=require("react/jsx-runtime");function cs({issue:e,updateIssue:t}){let[s,r]=(0,Li.useState)(!1),{states:i,isLoadingStates:c}=Ie(e.team.id,{execute:s}),a=we(i||[]);async function n(o){let u=e.state;t({animatedTitle:"Setting status",payload:{stateId:o.id},optimisticUpdate(d){return{...d,state:o}},rollbackUpdate(d){return{...d,state:u}},successTitle:"Set status",successMessage:`${e.identifier} set to ${o.name}`,errorTitle:"Failed to set status"})}return(0,Ft.jsx)(Ze.ActionPanel.Submenu,{icon:Ze.Icon.Circle,title:"Set Status",shortcut:{macOS:{modifiers:["cmd","shift"],key:"s"},Windows:{modifiers:["ctrl","shift"],key:"s"}},onOpen:()=>r(!0),children:a.length===0&&c?(0,Ft.jsx)(Ze.Action,{title:"Loading\u2026"}):a.map(o=>(0,Ft.jsx)(Ze.Action,{autoFocus:o.id===e.state.id,title:o.name,icon:z(o),onAction:()=>n(o)},o.id))})}var S=require("react/jsx-runtime");function st({issue:e,mutateList:t,mutateSubIssues:s,mutateDetail:r,showAttachmentsAction:i,attachments:c,priorities:a,me:n,hideOpenInLinear:o}){let{pop:u}=(0,g.useNavigation)(),{linearClient:d}=k(),P=e.assignee?.id===n?.id,R=et({issueEstimationType:e.team.issueEstimationType,issueEstimationAllowZero:e.team.issueEstimationAllowZero,issueEstimationExtended:e.team.issueEstimationExtended});async function b({animatedTitle:I,payload:T,optimisticUpdate:D,rollbackUpdate:Z,successTitle:ve,successMessage:Ke,errorTitle:Xe}){try{await(0,g.showToast)({style:g.Toast.Style.Animated,title:I});let G=d.updateIssue(e.id,T);await Promise.all([G,t?t(G,{optimisticUpdate(E){if(E)return E.map(Q=>Q.id===e.id?D(Q):Q)},rollbackOnError(E){if(E)return E.map(Q=>Q.id===e.id?Z(Q):Q)}}):Promise.resolve(),s?s(G,{optimisticUpdate(E){if(E)return E.map(Q=>Q.id===e.id?D(Q):Q)},rollbackOnError(E){if(E)return E.map(Q=>Q.id===e.id?Z(Q):Q)}}):Promise.resolve(),r?r(G,{optimisticUpdate(E){return D(E)},rollbackOnError(E){return Z(E)}}):Promise.resolve()]),await(0,g.showToast)({style:g.Toast.Style.Success,title:ve,message:Ke})}catch(G){await(0,g.showToast)({style:g.Toast.Style.Failure,title:Xe,message:V(G)})}}async function L(){if(await(0,g.confirmAlert)({title:"Delete Issue",message:"Are you sure you want to delete the selected issue?",icon:{source:g.Icon.Trash,tintColor:g.Color.Red}}))try{await(0,g.showToast)({style:g.Toast.Style.Animated,title:"Deleting issue"});let I=d.deleteIssue(e.id);r&&u(),await Promise.all([I,t?t(I,{optimisticUpdate(T){if(T)return T.filter(D=>D.id!==e.id)}}):Promise.resolve(),s?s(I,{optimisticUpdate(T){if(T)return T.filter(D=>D.id!==e.id)}}):Promise.resolve()]),await(0,g.showToast)({style:g.Toast.Style.Success,title:"Issue deleted",message:`"${e.title}" is deleted`})}catch(I){await(0,g.showToast)({style:g.Toast.Style.Failure,title:"Failed to delete issue",message:V(I)})}}async function A(I){let T=e.priority;b({animatedTitle:"Setting priority",payload:{priority:I.priority},optimisticUpdate(D){return{...D,priority:I.priority}},rollbackUpdate(D){return{...D,priority:T}},successTitle:"Set priority",successMessage:`${e.identifier} priority set to ${I.label}`,errorTitle:"Failed to set priority"})}async function Y(I){let T=e.assignee;b({animatedTitle:"Setting assignee",payload:{assigneeId:I.id},optimisticUpdate(D){return{...D,assignee:I}},rollbackUpdate(D){return{...D,assignee:T}},successTitle:"Set assignee",successMessage:`${e.identifier} assigned to ${I.displayName}`,errorTitle:"Failed to set assignee"})}async function U(I){let T=e.assignee;b({animatedTitle:"Setting assignee",payload:{assigneeId:I?I.id:null},optimisticUpdate(D){return{...D,assignee:I||void 0}},rollbackUpdate(D){return{...D,assignee:T}},successTitle:"Set assignee",successMessage:`${e.identifier} ${I?"assigned to":"un-assigned from"} me`,errorTitle:"Failed to set assignee"})}async function $({estimate:I,label:T}){let D=e.estimate;b({animatedTitle:"Setting estimate",payload:{estimate:I},optimisticUpdate(Z){return{...Z,estimate:I}},rollbackUpdate(Z){return{...Z,estimate:D}},successTitle:"Set estimate",successMessage:`${e.identifier} estimate set to ${T}`,errorTitle:"Failed to set estimate"})}async function v(I){b({animatedTitle:I?"Setting due date":"Removing due date",payload:{dueDate:I},optimisticUpdate(T){return{...T,dueDate:I}},rollbackUpdate(T){return{...T,dueDate:T.dueDate}},successTitle:I?"Set due date":"Removed due date",successMessage:I?`${e.identifier} due date set to ${(0,ds.format)(I,"MM/dd/yyyy")}`:"",errorTitle:"Failed to set due date"})}async function q(I){if(!I){await(0,g.showToast)({style:g.Toast.Style.Failure,title:"Failed setting reminder"});return}try{await(0,g.showToast)({style:g.Toast.Style.Animated,title:"Setting reminder"}),await d.issueReminder(e.id,I),r&&u(),await(0,g.showToast)({style:g.Toast.Style.Success,title:"Reminder set",message:`${e.identifier} reminder set to ${(0,ds.format)(I,"MM/dd/yyyy")}`})}catch(T){await(0,g.showToast)({style:g.Toast.Style.Failure,title:"Failed to set reminder",message:V(T)})}}function me(){t&&t(),s&&s(),r&&r()}let[xe,_]=(0,Ti.useState)(""),{users:le,supportsUserTypeahead:ke,isLoadingUsers:pe}=Ve(xe);return(0,S.jsxs)(S.Fragment,{children:[o?null:(0,S.jsx)(Ge,{title:"Open Issue",url:e.url}),(0,S.jsxs)(g.ActionPanel.Section,{children:[(0,S.jsx)(g.Action.Push,{title:"Edit Issue",icon:g.Icon.Pencil,shortcut:g.Keyboard.Shortcut.Common.Edit,target:(0,S.jsx)(Ht,{priorities:a,me:n,issue:e,mutateList:t,mutateSubIssues:s})}),(0,S.jsx)(cs,{issue:e,updateIssue:b}),a&&a.length>0?(0,S.jsx)(g.ActionPanel.Submenu,{icon:g.Icon.LevelMeter,title:"Set Priority",shortcut:{macOS:{modifiers:["cmd","opt"],key:"p"},Windows:{modifiers:["ctrl","alt"],key:"p"}},children:a.map(I=>(0,S.jsx)(g.Action,{autoFocus:I.priority===e.priority,title:I.label,icon:{source:de[I.priority]},onAction:()=>A(I)},I.priority))}):null,(0,S.jsx)(g.ActionPanel.Submenu,{icon:g.Icon.AddPerson,title:"Assign to",shortcut:{macOS:{modifiers:["cmd","shift"],key:"a"},Windows:{modifiers:["ctrl","shift"],key:"a"}},...ke&&{onSearchTextChange:_,isLoading:pe,throttle:!0},children:le?.map(I=>(0,S.jsx)(g.Action,{autoFocus:I.id===e.assignee?.id,title:`${I.displayName} (${I.email})`,icon:K(I),onAction:()=>Y(I)},I.id))}),n?(0,S.jsx)(g.Action,{title:P?"Un-Assign from Me":"Assign to Me",icon:K(n),shortcut:{macOS:{modifiers:["cmd","shift"],key:"i"},Windows:{modifiers:["ctrl","shift"],key:"i"}},onAction:()=>U(P?null:n)}):null,R?(0,S.jsx)(g.ActionPanel.Submenu,{title:"Set Estimate",icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}},shortcut:{macOS:{modifiers:["cmd","shift"],key:"e"},Windows:{modifiers:["ctrl","shift"],key:"e"}},children:R.map(({estimate:I,label:T})=>(0,S.jsx)(g.Action,{autoFocus:I===e.estimate,title:T,onAction:()=>$({estimate:I,label:T})},I))}):null,(0,S.jsx)(g.Action.PickDate,{title:"Set Due Date",shortcut:{macOS:{modifiers:["opt","shift"],key:"d"},Windows:{modifiers:["alt","shift"],key:"d"}},onChange:v}),(0,S.jsx)(g.Action.PickDate,{title:"Set Reminder",shortcut:{macOS:{modifiers:["cmd","shift"],key:"h"},Windows:{modifiers:["ctrl","shift"],key:"h"}},onChange:q}),(0,S.jsx)(os,{issue:e,updateIssue:b}),(0,S.jsx)(rs,{issue:e,updateIssue:b}),(0,S.jsx)(ls,{issue:e,updateIssue:b}),(0,S.jsx)(ns,{issue:e,updateIssue:b}),(0,S.jsx)(as,{issue:e,updateIssue:b}),(0,S.jsx)(g.Action,{title:"Delete Issue",shortcut:g.Keyboard.Shortcut.Common.Remove,icon:g.Icon.Trash,style:g.Action.Style.Destructive,onAction:()=>L()})]}),(0,S.jsxs)(g.ActionPanel.Section,{children:[(0,S.jsx)(g.Action.Push,{title:"Show Sub-Issues",icon:g.Icon.List,target:(0,S.jsx)(ss,{issue:e,mutateList:t}),shortcut:{macOS:{modifiers:["cmd","shift"],key:"m"},Windows:{modifiers:["ctrl","shift"],key:"m"}}}),(0,S.jsx)(g.Action.Push,{title:"Break Issues into Sub-Issues",icon:g.Icon.Stars,target:(0,S.jsx)(Zt,{issue:e}),shortcut:{macOS:{modifiers:["opt","shift"],key:"m"},Windows:{modifiers:["alt","shift"],key:"m"}}}),i?(0,S.jsx)(g.Action.Push,{title:"Show Issue Links",icon:g.Icon.Link,target:(0,S.jsx)(Kt,{attachments:c??[],issue:e}),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"l"},Windows:{modifiers:["ctrl","alt","shift"],key:"l"}}}):null,(0,S.jsx)(g.Action.Push,{title:"Add Attachments and Links",icon:g.Icon.NewDocument,target:(0,S.jsx)(Mt,{issue:e}),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"a"},Windows:{modifiers:["ctrl","alt","shift"],key:"a"}}}),(0,S.jsx)(g.Action.Push,{title:"Add Comment",icon:g.Icon.Plus,target:(0,S.jsx)(Be,{issue:e}),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"n"},Windows:{modifiers:["ctrl","alt","shift"],key:"n"}}}),(0,S.jsx)(g.Action.Push,{title:"Show Comments",icon:g.Icon.Bubble,target:(0,S.jsx)(ts,{issue:e}),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"c"},Windows:{modifiers:["ctrl","alt","shift"],key:"c"}}})]}),(0,S.jsx)(is,{issue:e}),(0,S.jsx)(g.ActionPanel.Section,{children:(0,S.jsx)(g.Action,{title:"Refresh",icon:g.Icon.ArrowClockwise,shortcut:g.Keyboard.Shortcut.Common.Refresh,onAction:()=>me()})})]})}var F=require("react/jsx-runtime");function kt({issue:e,mutateList:t,priorities:s,me:r}){let{issue:i,isLoadingIssue:c,mutateDetail:a}=qe(e),n=`# ${i?.title}`;i?.description&&(n+=`

${i.description}`);let o=i?.cycle?Ue(i.cycle):null,u=i.relations?i.relations.nodes.filter(R=>R.type=="related"):null,d=i.relations?i.relations.nodes.filter(R=>R.type=="duplicate"):null,P=i.attachments?.nodes.length??0;return(0,F.jsx)(j.Detail,{markdown:n,isLoading:c,...i?{metadata:(0,F.jsxs)(j.Detail.Metadata,{children:[(0,F.jsx)(j.Detail.Metadata.Label,{title:"Status",text:i.state.name,icon:z(i.state)}),(0,F.jsx)(j.Detail.Metadata.Label,{title:"Priority",text:i.priorityLabel,icon:{source:de[i.priority]}}),(0,F.jsx)(j.Detail.Metadata.Label,{title:"Assignee",text:i.assignee?i.assignee.displayName:"Unassigned",icon:K(i.assignee)}),i.team.issueEstimationType!=="notUsed"?(0,F.jsx)(j.Detail.Metadata.Label,{title:"Estimate",text:Lt({estimate:i.estimate,issueEstimationType:i.team.issueEstimationType}),icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}}):null,i.labels.nodes.length>0?(0,F.jsx)(j.Detail.Metadata.TagList,{title:"Labels",children:i.labels.nodes.map(({id:R,name:b,color:L})=>(0,F.jsx)(j.Detail.Metadata.TagList.Item,{text:b,color:L},R))}):(0,F.jsx)(j.Detail.Metadata.Label,{title:"Labels",text:"No Labels"}),i.dueDate?(0,F.jsx)(j.Detail.Metadata.Label,{title:"Due Date",text:(0,$i.format)(new Date(i.dueDate),"MM/dd/yyyy"),icon:vt(new Date(i.dueDate))}):null,P>0?(0,F.jsx)(j.Detail.Metadata.Label,{title:"Links",text:`${P>1?`${P} links`:"1 link"}`,icon:j.Icon.Link}):null,(0,F.jsx)(j.Detail.Metadata.Separator,{}),(0,F.jsx)(j.Detail.Metadata.Label,{title:"Cycle",text:o?o.title:"No Cycle",icon:{source:o?o.icon:{light:"light/no-cycle.svg",dark:"dark/no-cycle.svg"}}}),(0,F.jsx)(j.Detail.Metadata.Label,{title:"Project",text:i.project?i.project.name:"No Project",icon:ue(i.project)}),(0,F.jsx)(j.Detail.Metadata.Label,{title:"Milestone",text:i.projectMilestone?i.projectMilestone.name:"No Milestone",icon:Ce(i.projectMilestone)}),(0,F.jsx)(j.Detail.Metadata.Label,{title:"Parent Issue",text:i.parent?i.parent.title:"No Issue",icon:i.parent?z(i.parent.state):{source:{light:"light/backlog.svg",dark:"dark/backlog.svg"}}}),u&&u.length>0?(0,F.jsx)(j.Detail.Metadata.TagList,{title:"Related",children:u.map(({id:R,relatedIssue:b})=>(0,F.jsx)(j.Detail.Metadata.TagList.Item,{text:b.identifier},R))}):null,d&&d.length>0?(0,F.jsx)(j.Detail.Metadata.TagList,{title:"Duplicates",children:d.map(({id:R,relatedIssue:b})=>(0,F.jsx)(j.Detail.Metadata.TagList.Item,{text:b.identifier},R))}):null]}),actions:(0,F.jsx)(j.ActionPanel,{children:(0,F.jsx)(st,{issue:i,mutateList:t,mutateDetail:a,priorities:s,showAttachmentsAction:P>0,attachments:i.attachments?.nodes??[],me:r})})}:{}})}var f=require("react/jsx-runtime");function Ir(e,t){return e==="url"?{title:"Copy Issue URL",onAction:()=>l.Clipboard.copy(t.url)}:e==="id-as-link"?{title:"Copy Issue ID as Link",onAction:()=>l.Clipboard.copy({text:`[${t.identifier}](${t.url})`,html:`<a href="${t.url}">${t.identifier}</a>`})}:e==="title"?{title:"Copy Issue Title",onAction:()=>l.Clipboard.copy(t.title)}:e==="title-as-link"?{title:"Copy Issue Title as Link",onAction:()=>l.Clipboard.copy({text:`[${t.title}](${t.url})`,html:`<a href="${t.url}">${t.title}</a>`})}:{title:"Copy Issue ID",onAction:()=>l.Clipboard.copy(t.identifier)}}function Pt(e){let{push:t}=(0,l.useNavigation)(),{autofocusField:s,copyToastAction:r}=(0,l.getPreferenceValues)(),[i,c]=(0,Re.useState)(""),{teams:a,org:n,supportsTeamTypeahead:o,isLoadingTeams:u}=gt(i),d=a&&a.length>1,[P,R]=(0,Re.useState)(""),{users:b,supportsUserTypeahead:L,isLoadingUsers:A}=Ve(P),{handleSubmit:Y,itemProps:U,values:$,setValue:v,focus:q,reset:me,setValidationError:xe}=(0,He.useForm)({async onSubmit(m){let x=await(0,l.showToast)({style:l.Toast.Style.Animated,title:"Creating issue"}),Pe=d?m.teamId:a?.[0]?.id;if(!Pe)return xe("teamId","The team is required."),!1;try{let B={teamId:Pe,title:m.title,description:m.description||"",stateId:m.stateId,labelIds:m.labelIds,dueDate:m.dueDate,...E&&m.estimate?{estimate:parseInt(m.estimate)}:{},...m.assigneeId?{assigneeId:m.assigneeId}:{},...m.cycleId?{cycleId:m.cycleId}:{},...m.projectId?{projectId:m.projectId}:{},...m.milestoneId?{projectMilestoneId:m.milestoneId}:{},...m.parentId?{parentId:m.parentId}:{},priority:parseInt(m.priority)},{success:Vt,issue:Je}=await Ts(B);if(Vt&&Je){x.style=l.Toast.Style.Success,x.title=`Created Issue \u2022 ${Je?.identifier}`,x.primaryAction={title:"Open Issue",shortcut:l.Keyboard.Shortcut.Common.OpenWith,onAction:async()=>{t((0,f.jsx)(kt,{issue:Je,priorities:e.priorities,me:e.me})),await x.hide()}},x.secondaryAction={shortcut:l.Keyboard.Shortcut.Common.Copy,...Ir(r,Je)},me({templateId:"",title:"",description:"",estimate:"",labelIds:[],dueDate:null,parentId:"",attachments:[],links:""}),q(d&&s?s:"title");let qt=Tt(m.links);if(qt.length>0){let Me=qt.length===1?"link":"links";try{x.message=`Attaching ${Me}\u2026`,await Promise.all(qt.map(je=>At({issueId:Je.id,url:je}))),x.message=`Successfully attached ${Me}`}catch(je){x.style=l.Toast.Style.Failure,x.title=`Failed attaching ${Me}`,x.message=V(je)}}if(m.attachments.length>0){let Me=m.attachments.length===1?"attachment":"attachments";try{x.message=`Uploading ${Me}\u2026`,await Promise.all(m.attachments.map(je=>wt({issueId:Je.id,url:je}))),x.message=`Successfully uploaded ${Me}`}catch(je){x.style=l.Toast.Style.Failure,x.title=`Failed uploading ${Me}`,x.message=V(je)}}}}catch(B){x.style=l.Toast.Style.Failure,x.title="Failed to create issue",x.message=V(B)}v("teamId",Pe)},validation:{teamId:d?He.FormValidation.Required:void 0,title:He.FormValidation.Required,stateId:He.FormValidation.Required,priority:He.FormValidation.Required},initialValues:{templateId:e.draftValues?.templateId||"",teamId:e.draftValues?.teamId||e.teamId,title:e.draftValues?.title,description:e.draftValues?.description,priority:e.draftValues?.priority,stateId:e.draftValues?.stateId,estimate:e.draftValues?.estimate,assigneeId:e.draftValues?.assigneeId||e.assigneeId,labelIds:e.draftValues?.labelIds||[],dueDate:e.draftValues?.dueDate,cycleId:e.draftValues?.cycleId||e.cycleId,projectId:e.draftValues?.projectId||e.projectId,milestoneId:e.draftValues?.milestoneId||e.milestoneId,parentId:e.draftValues?.parentId||e.parentId,links:e.draftValues?.links||""}}),_=!!$.teamId&&$.teamId.trim().length>0,{issueTemplates:le,isLoadingIssueTemplates:ke}=_t($.teamId,{execute:_}),{states:pe}=Ie($.teamId,{execute:_}),{labels:I}=Ee($.teamId,{execute:_}),{cycles:T}=Fe($.teamId,{execute:_}),{issues:D}=ee(Ye,[],{execute:_}),{projects:Z}=Oe($.teamId,{execute:_}),{milestones:ve}=Ne($.projectId,{execute:!!$.projectId});(0,Re.useEffect)(()=>{a?.length===1&&v("teamId",a[0].id)},[a]);let Ke=(0,Re.useRef)(!1);(0,Re.useEffect)(()=>{if(!Ke.current){Ke.current=!0;return}Xe("")},[$.teamId]);function Xe(m){v("templateId",m);let x=le?.find(Vt=>Vt.id===m),Pe={assigneeId:e.assigneeId||"",cycleId:e.cycleId||"",projectId:e.projectId||"",milestoneId:e.milestoneId||""},B=x?Ms(x,Pe):zt(Pe);v("title",B.title),v("description",B.description),v("stateId",B.stateId),v("priority",B.priority),v("assigneeId",B.assigneeId),v("labelIds",B.labelIds),v("estimate",B.estimate),v("dueDate",B.dueDate),v("cycleId",B.cycleId),v("projectId",B.projectId),v("milestoneId",B.milestoneId??"")}let G=a?.find(m=>m.id===$.teamId),E=G?et({issueEstimationType:G.issueEstimationType,issueEstimationAllowZero:G.issueEstimationAllowZero,issueEstimationExtended:G.issueEstimationExtended}):null,Q=we(pe||[]),bt=pe&&pe.length>0,p=e.priorities&&e.priorities.length>0,H=I&&I.length>0,ge=T&&T.length>0,dt=Z&&Z.length>0,fs=ve&&ve.length>0,Ot=D&&D.length>0,Mi=le&&le.length>0;return(0,f.jsxs)(l.Form,{enableDrafts:e.enableDrafts,actions:(0,f.jsxs)(l.ActionPanel,{children:[(0,f.jsx)(l.Action.SubmitForm,{icon:l.Icon.Plus,onSubmit:Y,title:"Create Issue"}),(0,f.jsxs)(l.ActionPanel.Section,{children:[(0,f.jsx)(l.Action,{title:"Focus Title",icon:l.Icon.TextInput,onAction:()=>q("title"),shortcut:l.Keyboard.Shortcut.Common.Edit}),(0,f.jsx)(l.Action,{title:"Focus Description",icon:l.Icon.TextInput,onAction:()=>q("description"),shortcut:{modifiers:["ctrl"],key:"e"}}),(0,f.jsx)(l.Action,{title:"Focus Status",icon:l.Icon.Circle,onAction:()=>q("stateId"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"s"},Windows:{modifiers:["ctrl","shift"],key:"s"}}}),(0,f.jsx)(l.Action,{title:"Focus Priority",icon:l.Icon.LevelMeter,onAction:()=>q("priority"),shortcut:l.Keyboard.Shortcut.Common.Pin}),(0,f.jsx)(l.Action,{title:"Focus Assignee",icon:l.Icon.AddPerson,onAction:()=>q("assigneeId"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"a"},Windows:{modifiers:["ctrl","shift"],key:"a"}}}),E?(0,f.jsx)(l.Action,{title:"Focus Estimate",icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}},onAction:()=>q("estimate"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"e"},Windows:{modifiers:["ctrl","shift"],key:"e"}}}):null,(0,f.jsx)(l.Action,{title:"Focus Due Date",icon:l.Icon.Calendar,onAction:()=>q("dueDate"),shortcut:{macOS:{modifiers:["opt","shift"],key:"d"},Windows:{modifiers:["alt","shift"],key:"d"}}}),(0,f.jsx)(l.Action,{title:"Focus Labels",icon:l.Icon.Tag,onAction:()=>q("labelIds"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"l"},Windows:{modifiers:["ctrl","shift"],key:"l"}}}),ge?(0,f.jsx)(l.Action,{title:"Focus Cycle",icon:{source:{light:"light/cycle.svg",dark:"dark/cycle.svg"}},onAction:()=>q("cycleId"),shortcut:l.Keyboard.Shortcut.Common.Copy}):null,dt?(0,f.jsx)(l.Action,{title:"Focus Project",icon:{source:{light:"light/project.svg",dark:"dark/project.svg"}},onAction:()=>q("projectId"),shortcut:{modifiers:["ctrl","shift"],key:"p"}}):null,fs?(0,f.jsx)(l.Action,{title:"Focus Milestone",icon:{source:{light:"light/milestone.svg",dark:"dark/milestone.svg"}},onAction:()=>q("milestoneId"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"m"},Windows:{modifiers:["ctrl","shift"],key:"m"}}}):null,Ot?(0,f.jsx)(l.Action,{title:"Focus Parent Issue",icon:{source:{light:"light/backlog.svg",dark:"dark/backlog.svg"}},onAction:()=>q("parentId"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"i"},Windows:{modifiers:["ctrl","shift"],key:"i"}}}):null,(0,f.jsx)(l.Action,{title:"Focus Attachments",icon:l.Icon.NewDocument,onAction:()=>q("attachments"),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"a"},Windows:{modifiers:["ctrl","alt","shift"],key:"a"}}}),(0,f.jsx)(l.Action,{title:"Focus Links",icon:l.Icon.Link,onAction:()=>q("links"),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"l"},Windows:{modifiers:["ctrl","alt","shift"],key:"l"}}})]})]}),isLoading:u||A||e.isLoading,children:[(o||d)&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(l.Form.Dropdown,{title:"Team",storeValue:!0,...U.teamId,...o&&{onSearchTextChange:c,isLoading:u,throttle:!0},children:a?.map(m=>(0,f.jsx)(l.Form.Dropdown.Item,{title:m.name,value:m.id,icon:Dt(m,n)},m.id))}),(0,f.jsx)(l.Form.Separator,{})]}),_&&(ke||Mi)?(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)(l.Form.Dropdown,{id:"templateId",title:"Template",value:$.templateId||"",onChange:Xe,isLoading:ke,children:[(0,f.jsx)(l.Form.Dropdown.Item,{title:"No Template",value:"",icon:l.Icon.Document}),le?.map(m=>(0,f.jsx)(l.Form.Dropdown.Item,{title:m.name,value:m.id,icon:l.Icon.Document},m.id))]}),(0,f.jsx)(l.Form.Separator,{})]}):null,(0,f.jsx)(l.Form.TextField,{title:"Title",placeholder:"Issue title",...s==="title"?{autoFocus:!0}:{},...U.title}),(0,f.jsx)(l.Form.TextArea,{title:"Description",placeholder:"Add some details (supports Markdown, e.g. **bold**)",enableMarkdown:!0,...U.description}),(0,f.jsx)(l.Form.Dropdown,{title:"Status",storeValue:!0,...U.stateId,children:bt?Q.map(m=>(0,f.jsx)(l.Form.Dropdown.Item,{title:m.name,value:m.id,icon:z(m)},m.id)):null}),(0,f.jsx)(l.Form.Dropdown,{title:"Priority",storeValue:!0,...U.priority,children:p?e.priorities?.map(({priority:m,label:x})=>(0,f.jsx)(l.Form.Dropdown.Item,{title:x,value:String(m),icon:{source:de[m]}},m)):null}),(0,f.jsxs)(l.Form.Dropdown,{title:"Assignee",storeValue:!0,...U.assigneeId,...L&&{onSearchTextChange:R,isLoading:A,throttle:!0},children:[(0,f.jsx)(l.Form.Dropdown.Item,{title:"Unassigned",value:"",icon:l.Icon.Person}),b?.map(m=>(0,f.jsx)(l.Form.Dropdown.Item,{title:m.name,value:m.id,icon:K(m)},m.id))]}),(0,f.jsx)(l.Form.TagPicker,{title:"Labels",placeholder:"Add label",...U.labelIds,children:H?I.map(({id:m,name:x,color:Pe})=>(0,f.jsx)(l.Form.TagPicker.Item,{title:x,value:m,icon:{source:l.Icon.Dot,tintColor:Pe}},m)):null}),E?(0,f.jsxs)(l.Form.Dropdown,{title:"Estimate",...U.estimate,children:[(0,f.jsx)(l.Form.Dropdown.Item,{title:"No estimate",value:"",icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}}),E.map(({estimate:m,label:x})=>(0,f.jsx)(l.Form.Dropdown.Item,{title:x,value:String(m),icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}},m))]}):null,(0,f.jsx)(l.Form.DatePicker,{title:"Due Date",type:l.Form.DatePicker.Type.Date,...U.dueDate}),ge||dt||Ot?(0,f.jsx)(l.Form.Separator,{}):null,ge?(0,f.jsxs)(l.Form.Dropdown,{title:"Cycle",storeValue:!0,...U.cycleId,children:[(0,f.jsx)(l.Form.Dropdown.Item,{title:"No Cycle",value:"",icon:{source:{light:"light/no-cycle.svg",dark:"dark/no-cycle.svg"}}}),Se(T).map(m=>(0,f.jsx)(l.Form.Dropdown.Item,{title:m.title,value:m.id,icon:{source:m.icon}},m.id))]}):null,dt?(0,f.jsxs)(l.Form.Dropdown,{title:"Project",storeValue:!0,...U.projectId,children:[(0,f.jsx)(l.Form.Dropdown.Item,{title:"No Project",value:"",icon:{source:{light:"light/no-project.svg",dark:"dark/no-project.svg"}}}),Z.map(m=>(0,f.jsx)(l.Form.Dropdown.Item,{title:`${m.name} (${m.status.name})`,value:m.id,icon:ue(m)},m.id))]}):null,fs?(0,f.jsxs)(l.Form.Dropdown,{title:"Milestone",storeValue:!0,...U.milestoneId,children:[(0,f.jsx)(l.Form.Dropdown.Item,{title:"No Milestone",value:"",icon:{source:"linear-icons/no-milestone.svg"}}),ve.map(m=>(0,f.jsx)(l.Form.Dropdown.Item,{title:`${m.name} (${m.targetDate||"No Target Date"})`,value:m.id,icon:Ce(m)},m.id))]}):null,Ot?(0,f.jsxs)(l.Form.Dropdown,{title:"Parent",...U.parentId,children:[(0,f.jsx)(l.Form.Dropdown.Item,{title:"No Issue",value:"",icon:{source:{light:"light/backlog.svg",dark:"dark/backlog.svg"}}}),D.map(m=>(0,f.jsx)(l.Form.Dropdown.Item,{title:`${m.identifier} - ${m.title}`,value:m.id,icon:z(m.state)},m.id))]}):null,(0,f.jsx)(l.Form.Separator,{}),(0,f.jsx)(l.Form.FilePicker,{title:"Attachment",...U.attachments}),(0,f.jsx)(l.Form.TextArea,{title:"Links",placeholder:`https://a.com
https://b.com
New link(s) on separate line(s)`,...U.links})]})}var Di=require("@raycast/api"),Et=require("lodash");var at=require("react/jsx-runtime");function us({mutateList:e,issues:t,priorities:s,me:r}){if(!t||t&&t.length===0)return null;let i=(0,Et.uniqBy)(t.map(n=>n.state),n=>n.id),c=we(i||[],["triage","started","unstarted","backlog","completed","canceled"]),a=(0,Et.groupBy)(t,n=>n.state.id);return(0,at.jsx)(at.Fragment,{children:c.map(n=>{let o=a[n.id]?.length===1?"1 issue":`${a[n.id]?.length} issues`;return(0,at.jsx)(Di.List.Section,{title:n.name,subtitle:o,children:a[n.id]?.map(u=>(0,at.jsx)(ht,{issue:u,mutateList:e,priorities:s,me:r},u.id))},n.id)})})}var ct=require("@raycast/api"),Ri=require("@raycast/utils"),Nt=ut(require("react"));var lt=require("react/jsx-runtime");function yr({children:e}){return(0,Nt.useEffect)(()=>{pi()},[]),e}var ms=class extends Nt.default.Component{constructor(t){super(t),this.state={error:null}}static getDerivedStateFromError(t){return{error:t}}render(){let{error:t}=this.state;if(!t)return this.props.children;if(!(t.message.includes("invalid_grant")||t.message.includes("Error while fetching tokens")||t.message.includes("Could not initialize OAuth")))throw t;return(0,lt.jsx)(ct.Detail,{markdown:`# Sign In Failed

Failed to authenticate with Linear:
\`\`\`
${t.message}
\`\`\`

This can happen when the network is unreliable or the authorization code has expired. Please try signing in again.`,actions:(0,lt.jsx)(ct.ActionPanel,{children:(0,lt.jsx)(ct.Action,{title:"Sign in Again",onAction:async()=>{await Wt.client.removeTokens(),this.setState({error:null})}})})})}},hr=(0,Ri.withAccessToken)(Wt)(yr);function ps({children:e}){return(0,lt.jsx)(ms,{children:(0,lt.jsx)(hr,{children:e})})}var J=require("react/jsx-runtime"),gs=[{id:"assigned",title:"Assigned",icon:X.Icon.Person,emptyDescription:"There are no issues assigned to you."},{id:"created",title:"Created",icon:X.Icon.PlusCircle,emptyDescription:"There are no issues created by you."},{id:"subscribed",title:"Subscribed",icon:X.Icon.Bell,emptyDescription:"There are no issues you are subscribed to."}];function kr(){let[e,t]=(0,xi.useState)("assigned"),{issues:s,isLoadingIssues:r,mutateList:i}=ee(bs,[e]),{priorities:c,isLoadingPriorities:a}=yt(),{me:n,isLoadingMe:o}=ze(),u=gs.find(({id:d})=>d===e)??gs[0];return(0,J.jsxs)(X.List,{isLoading:r||a||o,searchBarPlaceholder:"Filter by ID, title, status, assignee or priority",filtering:{keepSectionOrder:!0},searchBarAccessory:(0,J.jsx)(X.List.Dropdown,{tooltip:"Change View",value:e,onChange:d=>t(d),children:gs.map(({id:d,title:P,icon:R})=>(0,J.jsx)(X.List.Dropdown.Item,{value:d,title:P,icon:R},d))}),children:[(0,J.jsx)(X.List.EmptyView,{title:"No issues",description:u.emptyDescription,actions:(0,J.jsx)(X.ActionPanel,{children:(0,J.jsx)(X.Action.Push,{title:"Create Issue",target:(0,J.jsx)(Pt,{assigneeId:e==="assigned"?n?.id:void 0,priorities:c,me:n})})})}),(0,J.jsx)(us,{mutateList:i,issues:s,priorities:c,me:n})]})}function vi(){return(0,J.jsx)(ps,{children:(0,J.jsx)(kr,{})})}
