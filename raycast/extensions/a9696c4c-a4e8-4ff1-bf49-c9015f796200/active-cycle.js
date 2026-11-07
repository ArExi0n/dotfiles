"use strict";var ji=Object.create;var Ct=Object.defineProperty;var Mi=Object.getOwnPropertyDescriptor;var Ui=Object.getOwnPropertyNames;var Fi=Object.getPrototypeOf,Ei=Object.prototype.hasOwnProperty;var Ni=(e,t)=>{for(var s in t)Ct(e,s,{get:t[s],enumerable:!0})},Is=(e,t,s,r)=>{if(t&&typeof t=="object"||typeof t=="function")for(let i of Ui(t))!Ei.call(e,i)&&i!==s&&Ct(e,i,{get:()=>t[i],enumerable:!(r=Mi(t,i))||r.enumerable});return e};var pt=(e,t,s)=>(s=e!=null?ji(Fi(e)):{},Is(t||!e||!e.__esModule?Ct(s,"default",{value:e,enumerable:!0}):s,e)),Oi=e=>Is(Ct({},"__esModule",{value:!0}),e);var Ir={};Ni(Ir,{default:()=>vi});module.exports=Oi(Ir);var Y=require("@raycast/api"),St=require("react");var Ps=require("@raycast/api");var ys=require("@linear/sdk"),hs=require("@raycast/api"),ks=require("@raycast/utils"),gt=null;async function Vi(e,t,s,r,i){let l=JSON.stringify({query:s,variables:r}),a=new Headers(t.headers);new Headers(i).forEach((d,u)=>a.set(u,d)),a.set("Content-Type","application/json");let n=await fetch(e,{...t,method:"POST",headers:Object.fromEntries(a.entries()),body:l}),o=n.headers.get("Content-Type")?.startsWith("application/json")?await n.json():await n.text();if(typeof o!="string"&&n.ok&&!o.errors&&o.data)return{...o,headers:n.headers,status:n.status};throw new Error(typeof o=="string"?o:o.errors?.[0]?.message??`GraphQL Error (${n.status})`)}var Wt=ks.OAuthService.linear({scope:"read write",onAuthorize({token:e}){gt=new ys.LinearClient({accessToken:e,headers:{"public-file-urls-expire-in":"60","linear-raycast-extension-name":hs.environment.extensionName}});let t=gt.client;t.rawRequest=((s,r,i)=>Vi(t.url,t.options,s,r,i))}});function k(){if(!gt)throw new Error("No linear client initialized");return{linearClient:gt,graphQLClient:gt.client}}async function wt(e,t,s,r,i){let l=r,a=!0,n,o=0;for(;a&&o<i;){let d=await e(n);l=s(l,d),a=t(d)?.hasNextPage,n=t(d)?.endCursor,o++}return l}var qi=50,Wi=50,Qt=(0,Ps.getPreferenceValues)();function Qi(){let e=Qt.limit?+Qt.limit:Wi,t=Math.min(qi,e),s=Math.floor(e/t);return{pageSize:t,pageLimit:s}}function Bt({inFilterBlock:e,addComma:t,inParentheses:s}={inFilterBlock:!1,inParentheses:!1,addComma:!0}){return Qt.shouldHideRedundantIssues?[...s?["("]:[],...t?[", "]:[],...e?[]:["filter: { "],"completedAt: { null: true }, canceledAt: { null: true }",...e?[]:[" }"],...s?[")"]:[]].join(""):""}var Ye=`
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
`;async function et(){let{graphQLClient:e}=k(),{data:t}=await e.rawRequest(`
      query {
        issues(orderBy: createdAt${Bt()}) {
          nodes {
            ${Ye}
          }
        }
      }
    `);return t?.issues.nodes}async function Ss(e){if(!e)return[];let{graphQLClient:t}=k(),{pageSize:s,pageLimit:r}=Qi();return wt(async l=>t.rawRequest(`
          query($cycleId: String!, $cursor: String) {
            cycle(id: $cycleId) {
              issues(first: ${s}, after: $cursor${Bt()}) {
                nodes {
                  ${Ye}
                }
                pageInfo {
                  hasNextPage
                  endCursor
                }
              }
            }
          }
        `,{cycleId:e,cursor:l}),l=>l.data?.cycle.issues.pageInfo,(l,a)=>l.concat(a.data?.cycle.issues.nodes||[]),[],r)}async function bs(e){let{graphQLClient:t}=k(),{data:s}=await t.rawRequest(`
      query($issueId: String!) {
        issue(id: $issueId) {
          children${Bt({inParentheses:!0})} {
            nodes {
              ${Ye}
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
          ${Ye}
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
    `,{issueId:e});if(!s)throw new Error("Cannot find the Linear issue");return s.issue}var c=require("@raycast/api"),He=require("@raycast/utils"),De=require("react");var Ls=require("fs/promises"),zt=pt(require("path"));var Bi="application/octet-stream",zi={".apng":"image/apng",".avif":"image/avif",".bmp":"image/bmp",".csv":"text/csv",".doc":"application/msword",".docx":"application/vnd.openxmlformats-officedocument.wordprocessingml.document",".gif":"image/gif",".gz":"application/gzip",".heic":"image/heic",".heif":"image/heif",".ico":"image/x-icon",".jpeg":"image/jpeg",".jpg":"image/jpeg",".json":"application/json",".md":"text/markdown",".mov":"video/quicktime",".mp3":"audio/mpeg",".mp4":"video/mp4",".pdf":"application/pdf",".png":"image/png",".ppt":"application/vnd.ms-powerpoint",".pptx":"application/vnd.openxmlformats-officedocument.presentationml.presentation",".svg":"image/svg+xml",".tar":"application/x-tar",".tif":"image/tiff",".tiff":"image/tiff",".txt":"text/plain",".webm":"video/webm",".webp":"image/webp",".xls":"application/vnd.ms-excel",".xlsx":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",".zip":"application/zip"};function Gi(e){return zi[zt.default.extname(e).toLowerCase()]??Bi}async function _i(e){let{graphQLClient:t}=k(),s=await(0,Ls.readFile)(e),r=Gi(e),i=zt.default.basename(e),{data:l}=await t.rawRequest(`
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
    `,{size:s.byteLength,contentType:r,filename:i}),a=l?.fileUpload.uploadFile;if(!l?.fileUpload.success||!a)throw new Error(`Failed to request an upload URL for "${i}"`);let n=new Headers({"Content-Type":r,"Cache-Control":"public, max-age=31536000"});a.headers.forEach(({key:d,value:u})=>n.set(d,u));let o=await fetch(a.uploadUrl,{method:"PUT",headers:n,body:s});if(!o.ok)throw new Error(`Failed to upload "${i}": ${o.status} ${o.statusText}`);return{assetUrl:a.assetUrl,contentType:r,name:i}}async function At(e){let{linearClient:t}=k(),s=await _i(e.url),r=await t.createAttachment({issueId:e.issueId,title:s.name,url:s.assetUrl});return{success:r.success,id:r.attachmentId}}async function Lt(e){let{linearClient:t}=k(),s=await t.attachmentLinkURL(e.issueId,e.url);return{success:s.success,id:s.attachmentId}}async function Ts(e){let{graphQLClient:t}=k(),s=e.title.replace(/"/g,"\\$&"),r=e.description?.replace(/\n/g,"\\n")?.replace(/"/g,"\\$&"),i=`teamId: "${e.teamId}", title: "${s}", description: "${r}", priority: ${e.priority}`;e.stateId&&(i+=`, stateId: "${e.stateId}"`),e.estimate&&(i+=`, estimate: ${e.estimate}`),e.assigneeId&&(i+=`, assigneeId: "${e.assigneeId}"`),e.labelIds&&e.labelIds.length>0&&(i+=`, labelIds: [${e.labelIds.map(a=>`"${a}"`).join(",")}]`),e.dueDate&&(i+=`, dueDate: "${e.dueDate.toISOString()}"`),e.cycleId&&(i+=`, cycleId: "${e.cycleId}"`),e.projectId&&(i+=`, projectId: "${e.projectId}"`),e.projectId&&e.projectMilestoneId&&(i+=`, projectMilestoneId: "${e.projectMilestoneId}"`),e.parentId&&(i+=`, parentId: "${e.parentId}"`);let{data:l}=await t.rawRequest(`
      mutation {
        issueCreate(input: {${i}}) {
          success
          issue {
            ${Ye}
          }
        }
      }
    `);return{success:l?.issueCreate.success,issue:l?.issueCreate.issue}}async function $s(e){let{graphQLClient:t}=k(),s=e.title.replace(/"/g,"\\$&"),r=e.description?.replace(/\n/g,"\\n").replace(/"/g,"\\$&"),i=`teamId: "${e.teamId}", title: "${s}", description: "${r}", parentId: "${e.parentId}"`;e.stateId&&(i+=`, stateId: "${e.stateId}"`);let{data:l}=await t.rawRequest(`
      mutation {
        issueCreate(input: {${i}}) {
          success
        }
      }
    `);return{success:l?.issueCreate.success}}var ce=require("date-fns"),Zi=10080*60*1e3;function Me(e){let t=Date.now(),s=Date.now()+Zi,r=new Date(e.startsAt),i=new Date(e.endsAt),l=!e.completedAt&&(0,ce.isBefore)(r,t)&&(0,ce.isAfter)(i,t),a=!e.completedAt&&(0,ce.isBefore)(r,s)&&(0,ce.isAfter)(i,s),n=l?{light:"light/active-cycle.svg",dark:"dark/active-cycle.svg"}:{light:"light/cycle.svg",dark:"dark/cycle.svg"},o=`Cycle ${e.number} (${(0,ce.format)(r,"dd MMM")} - ${(0,ce.format)(i,"dd MMM")})`,d=l?`Active ${o}`:o;return{...e,isActive:l,isNext:a,icon:n,title:d}}function Se(e){return e.filter(t=>(0,ce.isAfter)(new Date(t.endsAt),Date.now())).map(Me)}function V(e){return e instanceof Error?e.message:String(e)}var Ds={exponential:[0,1,2,4,8,16,32,64],fibonacci:[0,1,2,3,5,8,13,21],linear:[0,1,2,3,4,5,6,7],tShirt:[0,1,2,3,5,8,13,21]},Rs={0:"\u2013",1:"XS",2:"S",3:"M",5:"L",8:"XL",13:"XXL",21:"XXXL"};function Tt({estimate:e,issueEstimationType:t}){if(!e)return"Not estimated";if(t==="tShirt"){let s=Rs[e];return s||String(e)}return String(e)}function tt({issueEstimationType:e,issueEstimationAllowZero:t,issueEstimationExtended:s}){if(e==="notUsed")return null;let r=t?0:1,i=s?Ds[e].length:6,l=Ds[e].slice(r,i);return e==="tShirt"?l.map(a=>({estimate:a,label:Rs[a]})):l.map(a=>({estimate:a,label:a!==1?`${a} points`:`${a} point`}))}function Gt(e={}){return{title:"",description:"",stateId:"",priority:"",assigneeId:"",labelIds:[],estimate:"",dueDate:null,cycleId:"",projectId:"",milestoneId:"",...e}}function Hi(e){if(typeof e=="string")try{let t=JSON.parse(e);return typeof t=="object"&&t!==null?t:{}}catch{return{}}return typeof e=="object"&&e!==null?e:{}}function fe(e){return typeof e=="string"?e:void 0}function vs(e){return typeof e=="number"?String(e):fe(e)}function xs(e){if(!Array.isArray(e))return;let t=e.filter(s=>typeof s=="string");return t.length>0?t:void 0}function Ki(e){if(typeof e!="string")return;let t=new Date(e);return Number.isNaN(t.getTime())?void 0:t}function js(e,t={}){let s=Hi(e.templateData),r=Gt(t),i=xs(s.labelIds)??xs(s.labels);return{title:fe(s.title)??r.title,description:fe(s.description)??fe(e.description)??r.description,stateId:fe(s.stateId)??fe(s.statusId)??r.stateId,priority:vs(s.priority)??r.priority,assigneeId:fe(s.assigneeId)??r.assigneeId,labelIds:i??r.labelIds,estimate:vs(s.estimate)??r.estimate,dueDate:s.dueDate!==void 0?Ki(s.dueDate)??null:r.dueDate,cycleId:fe(s.cycleId)??r.cycleId,projectId:fe(s.projectId)??r.projectId,milestoneId:r.milestoneId}}function $t(e){let t=e.split(`
`),s=/https?:\/\/\S+/,r=t.map(i=>i.trim()).filter(i=>s.test(i));return Array.from(new Set(r))}var _t=require("@raycast/api");function be(e){return e?{source:"linear-icons/milestone.svg",tintColor:_t.Color.PrimaryText}:{source:"linear-icons/no-milestone.svg",tintColor:_t.Color.SecondaryText}}var de={0:{light:"light/priority-no-priority.svg",dark:"dark/priority-no-priority.svg"},1:{light:"light/priority-urgent.svg",dark:"dark/priority-urgent.svg"},2:{light:"light/priority-high.svg",dark:"dark/priority-high.svg"},3:{light:"light/priority-medium.svg",dark:"dark/priority-medium.svg"},4:{light:"light/priority-low.svg",dark:"dark/priority-low.svg"}};var Ms=pt(require("fs")),Us=require("@raycast/api"),Fs=pt(require("node-emoji"));function Dt({icon:e,color:t,fallbackIcon:s}){if(!e)return s;if(/:(.*):/.test(e))return Fs.get(e)??s;let i=`${Us.environment.assetsPath}/linear-icons/${e.toLowerCase()}.svg`;return Ms.default.existsSync(i)?{source:i,...t?{tintColor:{light:t,dark:t,adjustContrast:!0}}:{}}:s}function ue(e){return e?Dt({icon:e.icon??void 0,color:e.color??void 0,fallbackIcon:{source:{light:"light/project.svg",dark:"dark/project.svg"}}}):{source:{light:"light/no-project.svg",dark:"dark/no-project.svg"}}}var Es=require("lodash");var Xi={triage:{light:"light/triage.svg",dark:"dark/triage.svg"},backlog:{light:"light/backlog.svg",dark:"dark/backlog.svg"},unstarted:{light:"light/unstarted.svg",dark:"dark/unstarted.svg"},started:{light:"light/started.svg",dark:"dark/started.svg"},completed:{light:"light/completed.svg",dark:"dark/completed.svg"},canceled:{light:"light/canceled.svg",dark:"dark/canceled.svg"}};function G(e){return{source:Xi[e.type],tintColor:{light:e.color,dark:e.color,adjustContrast:!0}}}function Ce(e,t=["triage","backlog","unstarted","started","completed","canceled"]){if(e.length===0)return[];let s=(0,Es.groupBy)(e,r=>r.type);return t.filter(r=>!!s[r]).map(r=>s[r]).flat()}var Ns=require("@raycast/api");function st(e,t){let s=t?.logoUrl?encodeURI(t.logoUrl):Ns.Icon.TwoPeople;return Dt({icon:e.icon??void 0,color:e.color??void 0,fallbackIcon:s})}var Rt=require("@raycast/api"),Os=require("@raycast/utils");function X(e){return e?{source:e.avatarUrl?encodeURI(e.avatarUrl):(0,Os.getAvatarIcon)(e.displayName.toUpperCase()),mask:Rt.Image.Mask.Circle}:Rt.Icon.Person}var Vs=require("@raycast/utils");function Ue(e,t){let{linearClient:s}=k(),{data:r,error:i,isLoading:l}=(0,Vs.useCachedPromise)(async a=>(await s.cycles({filter:{team:{id:{eq:a}}}})).nodes.sort((o,d)=>o.number-d.number),[e],{execute:t?.execute!==!1&&!!e});return{cycles:r,cyclesError:i,isLoadingCycles:!r&&!i||l}}var Qs=require("@raycast/utils");var qs=`
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
`;function Ji(e,t){let s=e.type.toLowerCase()==="issue",r=!e.team||e.team.id===t;return s&&!e.archivedAt&&r}function Yi(e,t){return(e.sortOrder??0)-(t.sortOrder??0)||e.name.localeCompare(t.name)}async function Ws(e){if(!e)return[];let{graphQLClient:t}=k(),{data:s}=await t.rawRequest(`
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
    `,{teamId:e,first:100});return[...s?.organization?.templates?.nodes??[],...s?.team?.templates?.nodes??[]].filter((i,l,a)=>a.findIndex(n=>n.id===i.id)===l).filter(i=>Ji(i,e)).sort(Yi)}function Zt(e,t){let{data:s,error:r,isLoading:i}=(0,Qs.useCachedPromise)(Ws,[e],{execute:t?.execute!==!1&&!!e});return{issueTemplates:s,issueTemplatesError:r,isLoadingIssueTemplates:!s&&!r||i}}var Bs=require("@raycast/utils");function ee(e,t=[],s){let{data:r,error:i,isLoading:l,mutate:a}=(0,Bs.useCachedPromise)(e,t,s);return{issues:r,issuesError:i,isLoadingIssues:l,mutateList:a}}var _s=require("@raycast/utils");var zs=require("@raycast/api");var er=100,tr=100,sr=(0,zs.getPreferenceValues)();function ir(){let e=Number(sr.labelsLimit),t=Number.isFinite(e)&&e>0?e:tr,s=Math.floor(Math.min(er,t)),r=Math.ceil(t/s);return{pageSize:s,pageLimit:r}}async function Gs(e){if(!e)return[];let{pageSize:t,pageLimit:s}=ir(),{graphQLClient:r}=k();return wt(async i=>r.rawRequest(`
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
        `,{teamId:e,cursor:i}),i=>i.data?.team?.labels?.pageInfo,(i,l)=>i.concat(l.data?.team?.labels?.nodes??[]),[],s)}function Fe(e,t){let{data:s,error:r,isLoading:i}=(0,_s.useCachedPromise)(Gs,[e],{execute:t?.execute!==!1&&!!e});return{labels:s,labelsError:r,isLoadingLabels:!s&&!r||i}}var Hs=require("@raycast/utils");var rr=`
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
                ${rr}
              }
            }
          }
        }
      `,{projectId:e});return s?.project.projectMilestones.nodes}return null}function Ee(e,t){let{data:s,error:r,isLoading:i,mutate:l}=(0,Hs.useCachedPromise)(Zs,[e],{execute:t?.execute!==!1});return{milestones:s,isLoadingMilestones:!s&&!r||i,milestonesError:r,mutateMilestones:l}}var Xs=require("@raycast/utils");var or=`
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
`;async function Ks({teamId:e,searchText:t="",after:s=null,first:r=null}){let{graphQLClient:i}=k(),l=`
    projects(first: $first, after: $after, filter: { name: { containsIgnoreCase: $searchText } }) {
      nodes {
        ${or}
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  `;if(!e){let{data:o}=await i.rawRequest(`
        query($first: Int, $after: String, $searchText: String) {
          ${l}
        }
      `,{first:r,after:s,searchText:t}),d=o?.projects;return{data:d?.nodes??[],hasMore:!!d?.pageInfo.hasNextPage,cursor:d?.pageInfo.endCursor||null}}let{data:a}=await i.rawRequest(`
      query($teamId: String!, $first: Int, $after: String, $searchText: String) {
        team(id: $teamId) {
          ${l}
        }
      }
    `,{teamId:e,first:r,after:s,searchText:t}),n=a?.team?.projects;return{data:n?.nodes??[],hasMore:!!n?.pageInfo.hasNextPage,cursor:n?.pageInfo.endCursor||null}}function Ne(e,t){let{data:s,error:r,isLoading:i,mutate:l,pagination:a}=(0,Xs.useCachedPromise)((n,o)=>d=>Ks({teamId:n,searchText:o,after:d.cursor,first:t?.pageSize}),[e,t?.searchText],{execute:t?.execute!==!1,keepPreviousData:!0});return{projects:s,isLoadingProjects:!s&&!r||i,projectsError:r,mutateProjects:l,pagination:a}}var Js=require("@raycast/utils");function Ie(e,t){let{linearClient:s}=k(),{data:r,error:i,isLoading:l}=(0,Js.useCachedPromise)(async a=>(await s.workflowStates({filter:{team:{id:{eq:a}}}})).nodes.sort((o,d)=>o.position-d.position),[e],{initialData:[],execute:t?.execute!==!1});return{states:r,isLoadingStates:l,statesError:i}}var ti=require("@raycast/utils");var Ys=require("lodash");async function ei(e=""){let{graphQLClient:t,linearClient:s}=k(),r=await s.viewer,{data:i}=await t.rawRequest(`
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
    `,{userId:r.id,query:e}),l=(0,Ys.sortBy)(i?.teams.nodes??[],o=>o.membership?.sortOrder??1/0),a=i?.organization,n=!!i?.teams.pageInfo.hasNextPage;return{teams:l,organization:a,hasMoreTeams:n}}function Oe(e=""){let{data:t,error:s,isLoading:r}=(0,ti.useCachedPromise)(ei,[e]);return{teams:t?.teams,org:t?.organization,teamsError:s,isLoadingTeams:!t&&!s||r,supportsTeamTypeahead:e.trim().length>0||t?.hasMoreTeams}}var si=require("@raycast/utils");function Ve(e=""){let{linearClient:t}=k(),{data:s,error:r,isLoading:i}=(0,si.useCachedPromise)(async l=>{let a=await t.users(l.trim().length>0?{filter:{name:{containsIgnoreCase:l}}}:void 0);return{users:a?.nodes??[],hasMoreUsers:!!a?.pageInfo?.hasNextPage}},[e],{initialData:[]});return{users:s?.users,supportsUserTypeahead:e.trim().length>0||s?.hasMoreUsers,usersError:r,isLoadingUsers:!s&&!r||i}}var M=require("@raycast/api"),$i=require("date-fns");var it=require("@raycast/api"),vt=require("date-fns");function xt(e){let t=(0,vt.differenceInDays)(e,(0,vt.startOfToday)()),s=it.Color.PrimaryText;return t<=7&&(s=it.Color.Orange),t<=0&&(s=it.Color.Red),{source:it.Icon.Calendar,tintColor:s}}var ii=require("@raycast/utils");function qe(e){let t=e.id,{data:s,error:r,isLoading:i,mutate:l}=(0,ii.useCachedPromise)(As,[t],{initialData:{...e,description:""}});return{issue:s,issueError:r,isLoadingIssue:i,mutateDetail:l}}var g=require("@raycast/api"),us=require("date-fns"),Ti=require("react");var A=require("@raycast/api"),ri=require("@raycast/utils"),oi=require("nanoid"),We=require("react");var te=require("react/jsx-runtime");function Ht({issue:e}){let{pop:t}=(0,A.useNavigation)(),{states:s}=Ie(e.team.id),r=(0,We.useMemo)(()=>s.filter(w=>w.type==="unstarted")[0],[s]),{issue:i,isLoadingIssue:l}=qe(e),{data:a,isLoading:n,revalidate:o}=(0,ri.useAI)(`Act as a product manager for Linear issues. Break down a Linear issue into a list of sub-issues. 
    
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

Break down the Linear issue with this title: "${i.title}"`,{execute:!!i&&!l,creativity:.5}),[d,u]=(0,We.useState)(!1),[S,$]=(0,We.useState)([]);(0,We.useEffect)(()=>{if(!(!a||n)){try{let L=/\[[\s\S]*?\]/,w=a.match(L);if(w&&w[0]){let B=JSON.parse(w[0]);$(B.map(U=>({...U,id:(0,oi.nanoid)(),selected:!0})))}}catch(L){(0,A.showToast)({style:A.Toast.Style.Failure,title:"Failed to parse AI results",message:V(L),primaryAction:{title:"Retry",onAction:o},secondaryAction:{title:"Copy AI Result",onAction:()=>A.Clipboard.copy(a)}})}u(!0)}},[a,n]);async function P(){try{await(0,A.showToast)({style:A.Toast.Style.Animated,title:"Creating sub-issues"});let L=S.filter(w=>w.selected);await Promise.all(L.map(w=>$s({teamId:i.team.id,title:w.title,description:w.description,parentId:i.id,stateId:r?.id}))),await(0,A.showToast)({style:A.Toast.Style.Success,title:"Created sub-issues"}),t()}catch(L){(0,A.showToast)({style:A.Toast.Style.Failure,title:"Failed to create Sub-Issues",message:V(L)})}}return(0,te.jsxs)(A.List,{isLoading:n||!d,children:[S?.map(L=>(0,te.jsx)(A.List.Item,{icon:L.selected?{source:A.Icon.CheckCircle,tintColor:A.Color.Green}:A.Icon.Circle,title:L.title,subtitle:L.description,actions:(0,te.jsxs)(A.ActionPanel,{children:[(0,te.jsx)(A.Action,{title:L.selected?"Unselect Sub-Issue":"Select Sub-Issue",icon:L.selected?A.Icon.Circle:{source:A.Icon.CheckCircle,tintColor:A.Color.Green},onAction:()=>$(S.map(w=>w.id===L.id?{...w,selected:!w.selected}:w))}),(0,te.jsx)(A.Action,{title:"Create Sub-Issues",icon:A.Icon.Plus,onAction:()=>P()}),(0,te.jsx)(A.Action,{title:"Generate New Sub-Issues",icon:A.Icon.ArrowClockwise,onAction:o})]})},L.title)),(0,te.jsx)(A.List.EmptyView,{title:"No sub-issues were generated. Try again.",actions:(0,te.jsx)(A.ActionPanel,{children:(0,te.jsx)(A.Action,{title:"Retry",icon:A.Icon.ArrowClockwise,onAction:o})})})]})}var y=require("@raycast/api"),Qe=require("@raycast/utils"),ft=require("react");async function ni(e,t){let{graphQLClient:s}=k(),r=[];if(t.teamId&&r.push(`teamId: "${t.teamId}"`),t.title&&r.push(`title: "${t.title.replace(/"/g,"\\$&")}"`),t.description&&r.push(`description: "${t.description.replace(/\n/g,"\\n").replace(/"/g,"\\$&")}"`),t.stateId&&r.push(`stateId: "${t.stateId}"`),typeof t.priority<"u"&&r.push(`priority: ${t.priority}`),typeof t.assigneeId<"u"&&r.push(`assigneeId: ${t.assigneeId?`"${t.assigneeId}"`:null}`),t.labelIds&&r.push(`labelIds: [${t.labelIds.map(l=>`"${l}"`).join(",")}]`),typeof t.estimate<"u"&&r.push(`estimate: ${t.estimate}`),typeof t.dueDate<"u"){let l=t.dueDate?t.dueDate instanceof Date?t.dueDate.toISOString():t.dueDate:null;r.push(`dueDate: ${l?`"${l}"`:null}`)}typeof t.cycleId<"u"&&r.push(`cycleId: ${t.cycleId?`"${t.cycleId}"`:null}`),typeof t.projectId<"u"&&r.push(`projectId: ${t.projectId?`"${t.projectId}"`:null}`),typeof t.projectMilestoneId<"u"&&r.push(`projectMilestoneId: ${t.projectMilestoneId?`"${t.projectMilestoneId}"`:null}`),typeof t.parentId<"u"&&r.push(`parentId: ${t.parentId?`"${t.parentId}"`:null}`);let{data:i}=await s.rawRequest(`
      mutation {
        issueUpdate(id: "${e}", input: {${r.join(", ")}}) {
          success
        }
      }
    `);return{success:i?.issueUpdate.success}}var C=require("react/jsx-runtime");function Kt(e){let{pop:t}=(0,y.useNavigation)(),{issue:s,isLoadingIssue:r,mutateDetail:i}=qe(e.issue),[l,a]=(0,ft.useState)(""),{teams:n,org:o,supportsTeamTypeahead:d,isLoadingTeams:u}=Oe(l),S=n&&n.length>1,[$,P]=(0,ft.useState)(""),{users:L,supportsUserTypeahead:w,isLoadingUsers:B}=Ve($),{handleSubmit:U,itemProps:D,values:x,setValue:q}=(0,Qe.useForm)({async onSubmit(p){let K=await(0,y.showToast)({style:y.Toast.Style.Animated,title:"Editing issue"});try{let ge={teamId:p.teamId||e.issue.team.id,title:p.title,description:p.description,stateId:p.stateId,labelIds:p.labelIds,dueDate:p.dueDate,...R&&p.estimate?{estimate:parseInt(p.estimate)}:{},...p.assigneeId?{assigneeId:p.assigneeId}:{},...p.cycleId?{cycleId:p.cycleId}:{},...p.projectId?{projectId:p.projectId}:{},...p.milestoneId?{projectMilestoneId:p.milestoneId}:{},...p.parentId?{parentId:p.parentId}:{},priority:parseInt(p.priority)},{success:mt}=await ni(s.id,ge);mt&&(K.style=y.Toast.Style.Success,K.title=`Edited Issue \u2022 ${s.identifier}`,t(),i(),e.mutateList&&e.mutateList(),e.mutateSubIssues&&e.mutateSubIssues())}catch(ge){K.style=y.Toast.Style.Failure,K.title="Failed to edit issue",K.message=V(ge)}},validation:{teamId:S?Qe.FormValidation.Required:void 0,title:Qe.FormValidation.Required,stateId:Qe.FormValidation.Required,priority:Qe.FormValidation.Required},initialValues:{teamId:e.issue.team.id,title:e.issue.title,description:s.description??void 0,priority:String(e.issue.priority),stateId:e.issue.state.id,estimate:e.issue.estimate?String(e.issue.estimate):void 0,assigneeId:e.issue.assignee?.id,labelIds:e.issue.labels.nodes.map(p=>p.id),dueDate:s.dueDate?new Date(s.dueDate):null,cycleId:e.issue.cycle?.id,projectId:e.issue.project?.id,milestoneId:e.issue.projectMilestone?.id,parentId:e.issue.parent?.id}});(0,ft.useEffect)(()=>{q("description",s.description||""),q("dueDate",s.dueDate?new Date(s.dueDate):null)},[s]);let me=!!x.teamId&&x.teamId.trim().length>0,{states:Re}=Ie(x.teamId,{execute:me}),{labels:Z}=Fe(x.teamId,{execute:me}),{cycles:le}=Ue(x.teamId,{execute:me}),{issues:ke}=ee(et,[],{execute:me}),{projects:pe}=Ne(x.teamId,{execute:me}),{milestones:I}=Ee(x.projectId,{execute:!!x.projectId}),T=n?.find(p=>p.id===x.teamId),R=T?tt({issueEstimationType:T.issueEstimationType,issueEstimationAllowZero:T.issueEstimationAllowZero,issueEstimationExtended:T.issueEstimationExtended}):null,H=Ce(Re||[]),ve=Re&&Re.length>0,Ke=e.priorities&&e.priorities.length>0,Xe=Z&&Z.length>0,_=le&&le.length>0,E=pe&&pe.length>0,Q=I&&I.length>0,bt=ke&&ke.length>0;return(0,C.jsxs)(y.Form,{actions:(0,C.jsx)(y.ActionPanel,{children:(0,C.jsx)(y.Action.SubmitForm,{onSubmit:U,title:"Edit Issue"})}),isLoading:u||r||B,children:[(d||S)&&(0,C.jsxs)(C.Fragment,{children:[(0,C.jsx)(y.Form.Dropdown,{title:"Team",...D.teamId,...d&&{onSearchTextChange:a,isLoading:u,throttle:!0},children:n?.map(p=>(0,C.jsx)(y.Form.Dropdown.Item,{title:p.name,value:p.id,icon:st(p,o)},p.id))}),(0,C.jsx)(y.Form.Separator,{})]}),(0,C.jsx)(y.Form.TextField,{title:"Title",placeholder:"Issue title",autoFocus:!0,...D.title}),(0,C.jsx)(y.Form.TextArea,{title:"Description",placeholder:"Add some details (supports Markdown, e.g. **bold**)",...D.description}),(0,C.jsx)(y.Form.Dropdown,{title:"Status",...D.stateId,children:ve?H.map(p=>(0,C.jsx)(y.Form.Dropdown.Item,{title:p.name,value:p.id,icon:G(p)},p.id)):null}),(0,C.jsx)(y.Form.Dropdown,{title:"Priority",...D.priority,children:Ke?e.priorities?.map(({priority:p,label:K})=>(0,C.jsx)(y.Form.Dropdown.Item,{title:K,value:String(p),icon:{source:de[p]}},p)):null}),(0,C.jsxs)(y.Form.Dropdown,{title:"Assignee",...D.assigneeId,...w&&{onSearchTextChange:P,isLoading:B,throttle:!0},children:[(0,C.jsx)(y.Form.Dropdown.Item,{title:"Unassigned",value:"",icon:y.Icon.Person}),L?.map(p=>(0,C.jsx)(y.Form.Dropdown.Item,{title:p.name,value:p.id,icon:X(p)},p.id))]}),(0,C.jsx)(y.Form.TagPicker,{title:"Labels",...D.labelIds,placeholder:"Add label",children:Xe?Z.map(({id:p,name:K,color:ge})=>(0,C.jsx)(y.Form.TagPicker.Item,{title:K,value:p,icon:{source:y.Icon.Dot,tintColor:ge}},p)):null}),R?(0,C.jsxs)(y.Form.Dropdown,{title:"Estimate",...D.estimate,children:[(0,C.jsx)(y.Form.Dropdown.Item,{title:"No estimate",value:"",icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}}),R.map(({estimate:p,label:K})=>(0,C.jsx)(y.Form.Dropdown.Item,{title:K,value:String(p),icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}},p))]}):null,(0,C.jsx)(y.Form.DatePicker,{title:"Due Date",type:y.Form.DatePicker.Type.Date,...D.dueDate}),_||E||bt?(0,C.jsx)(y.Form.Separator,{}):null,_?(0,C.jsxs)(y.Form.Dropdown,{title:"Cycle",...D.cycleId,children:[(0,C.jsx)(y.Form.Dropdown.Item,{title:"No Cycle",value:"",icon:{source:{light:"light/no-cycle.svg",dark:"dark/no-cycle.svg"}}}),Se(le).map(p=>(0,C.jsx)(y.Form.Dropdown.Item,{title:p.title,value:p.id,icon:{source:p.icon}},p.id))]}):null,E?(0,C.jsxs)(y.Form.Dropdown,{title:"Project",...D.projectId,children:[(0,C.jsx)(y.Form.Dropdown.Item,{title:"No Project",value:"",icon:{source:{light:"light/no-project.svg",dark:"dark/no-project.svg"}}}),pe.map(p=>(0,C.jsx)(y.Form.Dropdown.Item,{title:`${p.name} (${p.status.name})`,value:p.id,icon:ue(p)},p.id))]}):null,Q?(0,C.jsxs)(y.Form.Dropdown,{title:"Milestone",storeValue:!0,...D.milestoneId,children:[(0,C.jsx)(y.Form.Dropdown.Item,{title:"No Milestone",value:"",icon:{source:"linear-icons/no-milestone.svg"}}),I.map(p=>(0,C.jsx)(y.Form.Dropdown.Item,{title:`${p.name}  (${p.targetDate||"No Target Date"})`,value:p.id,icon:be(p)},p.id))]}):null,bt?(0,C.jsxs)(y.Form.Dropdown,{title:"Parent",...D.parentId,children:[(0,C.jsx)(y.Form.Dropdown.Item,{title:"No Issue",value:"",icon:{source:{light:"light/backlog.svg",dark:"dark/backlog.svg"}}}),ke.map(p=>(0,C.jsx)(y.Form.Dropdown.Item,{title:`${p.identifier} - ${p.title}`,value:p.id,icon:G(p.state)},p.id))]}):null]})}var se=require("@raycast/api"),li=require("date-fns");var N=require("@raycast/api"),ai=require("@raycast/utils");var we=require("react/jsx-runtime");function jt({issue:{id:e,title:t,identifier:s}}){let{pop:r}=(0,N.useNavigation)(),{reset:i,itemProps:l,handleSubmit:a}=(0,ai.useForm)({onSubmit:async n=>{let o=await(0,N.showToast)({style:N.Toast.Style.Animated,title:"Attaching links"}),d=$t(n.links);if(d.length===0&&n.attachments.length===0){o.style=N.Toast.Style.Failure,o.title="No links or attachments provided";return}if(d.length>0){let u=d.length===1?"link":"links";try{await Promise.all(d.map(S=>Lt({issueId:e,url:S}))),o.style=N.Toast.Style.Success,o.title=`Successfully attached ${u}`}catch(S){o.style=N.Toast.Style.Failure,o.title=`Failed attaching ${u}`,o.message=V(S)}}if(n.attachments.length>0){let u=n.attachments.length===1?"attachment":"attachments";try{o.style=N.Toast.Style.Animated,o.title=`Uploading ${u}\u2026`,await Promise.all(n.attachments.map(S=>At({issueId:e,url:S}))),o.style=N.Toast.Style.Success,o.title=`Successfully uploaded ${u}`}catch(S){o.style=N.Toast.Style.Failure,o.title=`Failed uploading ${u}`,o.message=V(S)}}i({attachments:[],links:""}),r()},initialValues:{links:""}});return(0,we.jsxs)(N.Form,{actions:(0,we.jsx)(N.ActionPanel,{children:(0,we.jsx)(N.Action.SubmitForm,{onSubmit:a,icon:N.Icon.NewDocument,title:"Attach"})}),navigationTitle:"Add Attachments and Links",children:[(0,we.jsx)(N.Form.Description,{title:"Issue",text:`[${s}] ${t}`}),(0,we.jsx)(N.Form.FilePicker,{title:"Attachment",...l.attachments}),(0,we.jsx)(N.Form.TextArea,{title:"Links",placeholder:`https://a.com
https://b.com
New link(s) on separate line(s)`,...l.links})]})}var Ae=require("react/jsx-runtime");function Xt({attachments:e,issue:t}){return(0,Ae.jsx)(se.List,{navigationTitle:`Links for ${t.identifier}`,children:e.map(s=>{let r=new Date(s.updatedAt);return(0,Ae.jsx)(se.List.Item,{icon:s.source?.imageUrl??se.Icon.Link,title:s.title,subtitle:s.subtitle,accessories:[{date:r,tooltip:`Updated: ${(0,li.format)(r,"EEEE d MMMM yyyy 'at' HH:mm")}`}],actions:(0,Ae.jsxs)(se.ActionPanel,{children:[(0,Ae.jsx)(se.Action.OpenInBrowser,{url:s.url}),(0,Ae.jsx)(se.Action.Push,{title:"Add Attachments and Links",icon:se.Icon.NewDocument,target:(0,Ae.jsx)(jt,{issue:t})})]})},s.id)})})}var W=require("@raycast/api"),ci=require("react");var It=require("react/jsx-runtime");function Be({comment:e,issue:t,mutateComments:s}){let{linearClient:r}=k(),{pop:i}=(0,W.useNavigation)(),[l,a]=(0,ci.useState)(e?e.body:"");async function n(){await(0,W.showToast)({style:W.Toast.Style.Animated,title:`${e?"Updating":"Adding"} comment`});try{e?await r.updateComment(e.id,{body:l}):await r.createComment({body:l,issueId:t.id}),await(0,W.showToast)({style:W.Toast.Style.Success,title:`${e?"Updated":"Added"} comment`}),i(),s&&s()}catch(o){(0,W.showToast)({style:W.Toast.Style.Failure,title:`Failed to ${e?"update":"add"} comment`,message:V(o)})}}return(0,It.jsx)(W.Form,{actions:(0,It.jsx)(W.ActionPanel,{children:(0,It.jsx)(W.Action.SubmitForm,{title:e?"Edit Comment":"Add Comment",onSubmit:n,icon:e?W.Icon.Pencil:W.Icon.Plus})}),children:(0,It.jsx)(W.Form.TextArea,{id:"comment",title:"Comment",placeholder:"Leave a comment",value:l,onChange:a})})}var h=require("@raycast/api"),gi=require("date-fns"),fi=pt(require("remove-markdown"));var di=require("@raycast/utils");function Jt(e){let{data:t,error:s,isLoading:r,mutate:i}=(0,di.useCachedPromise)(ws,[e]);return{comments:t,commentsError:s,isLoadingComments:r,mutateComments:i}}var ui=require("@raycast/utils");function ze(){let{linearClient:e}=k(),{data:t,error:s,isLoading:r}=(0,ui.useCachedPromise)(()=>e.viewer);return{me:t,meError:s,isLoadingMe:!t&&!s||r}}var es=require("@raycast/api");var mi=require("@raycast/api"),Yt=!1;async function pi(){Yt=!!(await(0,mi.getApplications)()).find(s=>s.bundleId==="com.linear")}var ts=require("react/jsx-runtime");function Ge({title:e,url:t,...s}){return Yt?(0,ts.jsx)(es.Action.Open,{title:`${e||"Open"} in Linear`,icon:"linear-app-icon.png",target:t,application:"Linear",...s}):(0,ts.jsx)(es.Action.OpenInBrowser,{url:t,title:`${e||"Open"} in Browser`})}var O=require("react/jsx-runtime");function ss({issue:e}){let{linearClient:t}=k(),{me:s,isLoadingMe:r}=ze(),{comments:i,isLoadingComments:l,mutateComments:a}=Jt(e.id);async function n(o){if(await(0,h.confirmAlert)({title:"Delete Comment",message:"Are you sure you want to delete this comment?",icon:{source:h.Icon.Trash,tintColor:h.Color.Red}}))try{await(0,h.showToast)({style:h.Toast.Style.Animated,title:"Deleting comment"}),await a(t.deleteComment(o),{optimisticUpdate(d){return d&&d?.filter(u=>u.id!==o)}}),await(0,h.showToast)({style:h.Toast.Style.Success,title:"Deleted comment"})}catch(d){(0,h.showToast)({style:h.Toast.Style.Failure,title:"Failed to delete comment",message:V(d)})}}return(0,O.jsxs)(h.List,{isLoading:l||r,navigationTitle:`${e.identifier} \u2022 Comments`,searchBarPlaceholder:"Filter by user or comment content",isShowingDetail:!0,children:[(0,O.jsx)(h.List.EmptyView,{title:"No comments",description:"This issue doesn't have any comments.",actions:(0,O.jsx)(h.ActionPanel,{children:(0,O.jsx)(h.Action.Push,{title:"Add Comment",icon:h.Icon.Plus,target:(0,O.jsx)(Be,{issue:e,mutateComments:a})})})}),i?.map(o=>{let d=new Date(o.createdAt);return(0,O.jsx)(h.List.Item,{title:o.user.displayName,subtitle:o.body,icon:X(o.user),keywords:(0,fi.default)(o.body).replace(/\n/g," ").split(" "),accessories:[{date:d,tooltip:`Created: ${(0,gi.format)(d,"EEEE d MMMM yyyy 'at' HH:mm")}`}],detail:(0,O.jsx)(h.List.Item.Detail,{markdown:o.body}),actions:(0,O.jsxs)(h.ActionPanel,{children:[(0,O.jsx)(Ge,{title:"Open Comment",url:o.url}),s?.id===o.user.id?(0,O.jsxs)(h.ActionPanel.Section,{children:[(0,O.jsx)(h.Action.Push,{title:"Edit Comment",icon:h.Icon.Pencil,shortcut:h.Keyboard.Shortcut.Common.Edit,target:(0,O.jsx)(Be,{issue:e,comment:o,mutateComments:a})}),(0,O.jsx)(h.Action,{title:"Delete Comment",icon:h.Icon.Trash,style:h.Action.Style.Destructive,shortcut:h.Keyboard.Shortcut.Common.Remove,onAction:()=>n(o.id)})]}):null,(0,O.jsx)(h.ActionPanel.Section,{children:(0,O.jsx)(h.Action.Push,{title:"Add Comment",icon:h.Icon.Plus,shortcut:{macOS:{modifiers:["cmd","shift"],key:"n"},Windows:{modifiers:["ctrl","shift"],key:"n"}},target:(0,O.jsx)(Be,{issue:e,mutateComments:a})})}),(0,O.jsxs)(h.ActionPanel.Section,{children:[(0,O.jsx)(h.Action.CopyToClipboard,{icon:h.Icon.Clipboard,content:o.url,title:"Copy Comment URL",shortcut:h.Keyboard.Shortcut.Common.CopyPath}),(0,O.jsx)(h.Action.CopyToClipboard,{icon:h.Icon.Clipboard,content:o.body,title:"Copy Comment",shortcut:{macOS:{modifiers:["cmd","shift"],key:"'"},Windows:{modifiers:["ctrl","shift"],key:"'"}}})]}),(0,O.jsx)(h.ActionPanel.Section,{children:(0,O.jsx)(h.Action,{title:"Refresh",icon:h.Icon.ArrowClockwise,shortcut:h.Keyboard.Shortcut.Common.Refresh,onAction:a})})]})},o.id)})]})}var _e=require("@raycast/api");var Ii=require("@raycast/utils");function yt(){let{linearClient:e}=k(),{data:t,error:s,isLoading:r}=(0,Ii.useCachedPromise)(()=>e.issuePriorityValues,[],{initialData:[]});return{priorities:t,prioritiesError:s,isLoadingPriorities:!t&&!s||r}}var ie=require("@raycast/api"),Mt=require("date-fns");var Le=require("react/jsx-runtime");function ht({issue:e,mutateList:t,mutateSubIssues:s,priorities:r,me:i}){let{primaryAction:l}=(0,ie.getPreferenceValues)(),a=[e.identifier,e.state.name,e.priorityLabel];e.assignee&&a.push(e.assignee.email,e.assignee.displayName);let n=new Date(e.updatedAt),o=e.dueDate?new Date(e.dueDate):null,d=e.estimate?{icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}},text:Tt({estimate:e.estimate,issueEstimationType:e.team.issueEstimationType})}:null,u=e.cycle?Me(e.cycle):null,S=e.project||null,$=e.labels.nodes.length>0,P=[{date:n,tooltip:`Updated: ${(0,Mt.format)(n,"EEEE d MMMM yyyy 'at' HH:mm")}`},{icon:o?xt(o):void 0,text:o?(0,Mt.format)(o,"MMM dd"):void 0,tooltip:o?`Due date: ${(0,Mt.format)(o,"MM/dd/yyyy")}`:void 0},{icon:$?ie.Icon.Tag:void 0,text:$?String(e.labels.nodes.length):void 0,tooltip:$?e.labels.nodes.map(w=>w.name).join(", "):void 0},{icon:S?ue(S):void 0,tooltip:`Project: ${S?S.name:void 0}`},{icon:u?{source:u.icon}:void 0,text:u?String(u.number):void 0,tooltip:u?`Cycle: ${u.title}`:void 0},{icon:d?d.icon:void 0,text:d?d.text:void 0},{icon:G(e.state),tooltip:`Status: ${e.state.name}`},{icon:X(e.assignee),tooltip:e.assignee?`Assignee: ${e.assignee?.displayName} (${e.assignee?.email})`:"Unassigned"}],L=l==="openInLinear";return(0,Le.jsx)(ie.List.Item,{title:e.title,icon:{value:{source:de[e.priority]},tooltip:`Priority: ${e.priorityLabel}`},subtitle:e.identifier,keywords:a,accessories:P,actions:(0,Le.jsxs)(ie.ActionPanel,{title:e.identifier,children:[L?(0,Le.jsx)(Ge,{title:"Open Issue",url:e.url}):null,(0,Le.jsx)(ie.Action.Push,{title:"Show Details",icon:ie.Icon.Sidebar,target:(0,Le.jsx)(kt,{issue:e,mutateList:t,priorities:r,me:i})}),(0,Le.jsx)(rt,{issue:e,mutateList:t,mutateSubIssues:s,priorities:r,me:i,hideOpenInLinear:L})]})},e.id)}var Te=require("react/jsx-runtime");function is({issue:e,mutateList:t}){let{issues:s,isLoadingIssues:r,mutateList:i}=ee(d=>bs(d),[e.id]),{priorities:l,isLoadingPriorities:a}=yt(),{me:n,isLoadingMe:o}=ze();return(0,Te.jsxs)(_e.List,{isLoading:r||o||a||o,navigationTitle:`${e.identifier} \u2022 Sub-issues`,children:[(0,Te.jsx)(_e.List.EmptyView,{title:"No issues",description:"This issue doesn't have any sub-issues.",actions:(0,Te.jsx)(_e.ActionPanel,{children:(0,Te.jsx)(_e.Action.Push,{title:"Create Sub-Issue",target:(0,Te.jsx)(Pt,{priorities:l,me:n,parentId:e.id,projectId:e.project?.id,cycleId:e.cycle?.id,teamId:e.team.id})})})}),s?.map(d=>(0,Te.jsx)(ht,{issue:d,mutateList:t,mutateSubIssues:i,priorities:l,me:n},d.id))]})}var j=require("@raycast/api");function hi(e){let t=[`Work on Linear issue ${e.identifier}:`,""],s=ar(e.branchName);if(s&&t.push(`Suggested branch name: ${s}`,""),t.push(`<issue identifier="${Ut(e.identifier)}">`),t.push(`<title>${e.title}</title>`),t.push(...ki(e.description)),e.team?.name&&t.push(`<team name="${Ut(e.team.name)}"/>`),e.labels?.nodes?.forEach(i=>{t.push(`<label>${i.name}</label>`)}),e.project?.name){let i=Ut(e.project.name);t.push(e.project.description?`<project name="${i}">${e.project.description}</project>`:`<project name="${i}"/>`)}e.parent&&t.push(...yi("parent-issue",e.parent));let r=e.children?.nodes??[];return r.length>0&&(t.push("<sub-issues>"),r.forEach(i=>t.push(...yi("sub-issue",i))),t.push("</sub-issues>")),t.push("</issue>"),t.join(`
`)}function yi(e,t){return[`<${e} identifier="${Ut(t.identifier)}">`,`<id>${t.id}</id>`,`<title>${t.title}</title>`,...ki(t.description),`</${e}>`]}function ki(e){return e?e.includes(`
`)?["<description>",e,"</description>"]:[`<description>${e}</description>`]:[]}function ar(e){return e&&e.slice(e.lastIndexOf("/")+1)}function Ut(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}var re=require("react/jsx-runtime"),lr={ISSUE_TITLE:"title",ISSUE_ID:"identifier",ISSUE_URL:"url",ISSUE_BRANCH_NAME:"branchName"};function cr(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function dr(e){return e.replace(/\[/g,"\\[").replace(/\]/g,"\\]")}function ur(e){return{html:`<a href="${e.url}">${cr(e.title)}</a>`,text:`[${dr(e.title)}](${e.url})`}}function rs({issue:e}){let{issueCustomCopyAction:t}=(0,j.getPreferenceValues)();async function s(){let r=await(0,j.showToast)({style:j.Toast.Style.Animated,title:"Copying prompt"});try{await j.Clipboard.copy(hi(await Cs(e.id))),r.style=j.Toast.Style.Success,r.title="Copied prompt to clipboard"}catch(i){r.style=j.Toast.Style.Failure,r.title="Failed copying prompt",r.message=V(i)}}return(0,re.jsxs)(j.ActionPanel.Section,{children:[(0,re.jsx)(j.Action.CopyToClipboard,{content:e.identifier,title:"Copy Issue ID",shortcut:{macOS:{modifiers:["cmd"],key:"."},Windows:{modifiers:["ctrl"],key:"."}}}),(0,re.jsx)(j.Action.CopyToClipboard,{content:{html:`<a href="${e.url}" title="${e.title}">${e.identifier}: ${e.title}</a>`,text:e.url},title:"Copy Formatted Issue URL",shortcut:j.Keyboard.Shortcut.Common.CopyPath}),(0,re.jsx)(j.Action.CopyToClipboard,{content:e.url,title:"Copy Issue URL",shortcut:{macOS:{modifiers:["cmd","shift"],key:"u"},Windows:{modifiers:["ctrl","shift"],key:"u"}}}),(0,re.jsx)(j.Action.CopyToClipboard,{content:e.title,title:"Copy Issue Title",shortcut:{macOS:{modifiers:["cmd","shift"],key:"'"},Windows:{modifiers:["ctrl","shift"],key:"'"}}}),(0,re.jsx)(j.Action.CopyToClipboard,{content:ur(e),title:"Copy Title as Link",shortcut:{macOS:{modifiers:["cmd","shift"],key:"t"},Windows:{modifiers:["ctrl","shift"],key:"t"}}}),(0,re.jsx)(j.Action.CopyToClipboard,{content:e.branchName,title:"Copy Git Branch Name",shortcut:j.Keyboard.Shortcut.Common.CopyName}),t&&t!==""?(0,re.jsx)(j.Action.CopyToClipboard,{content:t?.replace(/\{(.*?)\}/g,(r,i)=>{let l=e[lr[i]];return l||r}),title:"Custom Copy",shortcut:{macOS:{modifiers:["cmd","opt"],key:"."},Windows:{modifiers:["ctrl","alt"],key:"."}}}):null,(0,re.jsx)(j.Action,{icon:j.Icon.Clipboard,title:"Copy as Prompt",onAction:s,shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"p"},Windows:{modifiers:["ctrl","alt","shift"],key:"p"}}})]})}var oe=require("@raycast/api"),Pi=require("react");var ne=require("react/jsx-runtime");function os({issue:e,updateIssue:t}){let{linearClient:s}=k(),[r,i]=(0,Pi.useState)(!1),{cycles:l,isLoadingCycles:a}=Ue(e.team.id,{execute:r}),n=e.cycle?Me(e.cycle):null,o=n?.isActive||!1,d=n?.isNext||!1;async function u(P){let L=e.cycle;t({animatedTitle:"Moving to cycle",payload:{cycleId:P?.id||null},optimisticUpdate(w){return{...w,cycle:P||void 0}},rollbackUpdate(w){return{...w,cycle:L}},successTitle:P?"Moved to cycle":"Removed from cycle",successMessage:P?.title?P.title:"",errorTitle:"Failed to move to cycle"})}async function S(){let{nodes:P}=await s.cycles({filter:{team:{id:{eq:e.team.id}}}}),L=Se(P||[]),w=L.findIndex(D=>D.isActive),U=(w>-1?L[w]:null)?L[w+1]:null;if(U)return u(U)}async function $(){let{nodes:P}=await s.cycles({filter:{team:{id:{eq:e.team.id}}}}),w=Se(P||[]).find(B=>B.isActive);if(w)return u(w)}return(0,ne.jsxs)(ne.Fragment,{children:[(0,ne.jsxs)(oe.ActionPanel.Submenu,{title:"Move to Cycle",icon:{source:{light:"light/cycle.svg",dark:"dark/cycle.svg"}},shortcut:oe.Keyboard.Shortcut.Common.Copy,onOpen:()=>i(!0),children:[(0,ne.jsx)(oe.Action,{title:"No Cycle",icon:{source:{light:"light/no-cycle.svg",dark:"dark/no-cycle.svg"}},onAction:()=>u(null)}),!l&&a?(0,ne.jsx)(oe.Action,{title:"Loading\u2026"}):Se(l||[]).map(P=>(0,ne.jsx)(oe.Action,{autoFocus:P.id===n?.id,title:P.title,icon:{source:P.icon},onAction:()=>u(P)},P.id))]}),o?null:(0,ne.jsx)(oe.Action,{title:"Move to Active Cycle",icon:{source:{light:"light/active-cycle.svg",dark:"dark/active-cycle.svg"}},shortcut:oe.Keyboard.Shortcut.Common.Copy,onAction:()=>$()}),d?null:(0,ne.jsx)(oe.Action,{title:"Move to Next Cycle",icon:{source:{light:"light/cycle.svg",dark:"dark/cycle.svg"}},shortcut:{macOS:{modifiers:["cmd","shift"],key:"n"},Windows:{modifiers:["ctrl","shift"],key:"n"}},onAction:()=>S()})]})}var ae=require("@raycast/api"),Si=require("lodash"),bi=require("react");var ye=require("react/jsx-runtime");function ns({issue:e,updateIssue:t}){let[s,r]=(0,bi.useState)(!1),{labels:i}=Fe(e.team.id,{execute:s}),[,l]=(0,Si.partition)(i||[],o=>e.labels.nodes.map(d=>d.id).includes(o.id));async function a(o){let d=e.labels.nodes.map(u=>u.id);t({animatedTitle:"Adding label",payload:{labelIds:[...d,o.id]},optimisticUpdate(u){return{...u,labels:{...u.labels,nodes:[...u.labels.nodes,o]}}},rollbackUpdate(u){return{...u,labels:{...u.labels,nodes:u.labels.nodes.filter(S=>S.id!==o.id)}}},successTitle:"Added label",successMessage:`Label "${o.name}" added to ${e.identifier}`,errorTitle:"Failed to add label"})}async function n(o){let d=e.labels.nodes.map(u=>u.id);t({animatedTitle:"Remove label",payload:{labelIds:d.filter(u=>u!==o.id)},optimisticUpdate(u){return{...u,labels:{...u.labels,nodes:u.labels.nodes.filter(S=>S.id!==o.id)}}},rollbackUpdate(u){return{...u,labels:{...u.labels,nodes:[...u.labels.nodes,o]}}},successTitle:"Removed label",successMessage:`Label "${o.name}" removed from ${e.identifier}`,errorTitle:"Failed to remove label"})}return(0,ye.jsxs)(ye.Fragment,{children:[(0,ye.jsx)(ae.ActionPanel.Submenu,{title:"Add Label",icon:ae.Icon.Tag,shortcut:{macOS:{modifiers:["cmd","shift"],key:"l"},Windows:{modifiers:["ctrl","shift"],key:"l"}},onOpen:()=>r(!0),children:l.map(o=>(0,ye.jsx)(ae.Action,{title:o.name,icon:{source:ae.Icon.Dot,tintColor:o.color},onAction:()=>a(o)},o.id))}),e.labels.nodes.length>0?(0,ye.jsx)(ae.ActionPanel.Submenu,{title:"Remove Label",icon:ae.Icon.Tag,shortcut:{macOS:{modifiers:["cmd","shift"],key:"l"},Windows:{modifiers:["ctrl","shift"],key:"l"}},children:e.labels.nodes.map(o=>(0,ye.jsx)(ae.Action,{title:o.name,icon:{source:ae.Icon.Dot,tintColor:o.color},onAction:()=>n(o)},o.id))}):null]})}var $e=require("@raycast/api"),Ci=require("react");var ot=require("react/jsx-runtime");function as({issue:e,updateIssue:t}){let[s,r]=(0,Ci.useState)(!1),{milestones:i,isLoadingMilestones:l}=Ee(e.project?.id,{execute:s});async function a(n){let o=e.projectMilestone;t({animatedTitle:"Setting milestone",payload:{projectMilestoneId:n?n.id:null},optimisticUpdate(d){return{...d,milestone:n||void 0}},rollbackUpdate(d){return{...d,milestone:o}},successTitle:n?"Set milestone":`Removed milestone from ${e.identifier}`,successMessage:n?`"${n.name}" added to ${e.identifier}`:"",errorTitle:"Failed to set milestone"})}return(0,ot.jsxs)($e.ActionPanel.Submenu,{title:"Set Milestone",icon:{source:"linear-icons/milestone.svg",tintColor:$e.Color.PrimaryText},shortcut:{modifiers:["ctrl","shift"],key:"m"},onOpen:()=>r(!0),children:[(0,ot.jsx)($e.Action,{title:"No Milestone",icon:{source:"linear-icons/no-milestone.svg"},onAction:()=>a(null)}),!i&&l?(0,ot.jsx)($e.Action,{title:"Loading\u2026"}):(i||[]).map(n=>(0,ot.jsx)($e.Action,{autoFocus:n.id===e.projectMilestone?.id,title:`${n.name}  (${n.targetDate||"No Target Date"})`,icon:be(n),onAction:()=>a(n)},n.id))]})}var nt=require("@raycast/api"),wi=require("react");var he=require("react/jsx-runtime");function ls({issue:e,updateIssue:t}){let[s,r]=(0,wi.useState)(!1),{issues:i,isLoadingIssues:l}=ee(et,[],{execute:s}),a=e.parent,n=a?.id,o=!!n;async function d(u){t({animatedTitle:"Setting parent issue",payload:{parentId:u?u.id:null},optimisticUpdate(S){return{...S,parent:u||void 0}},rollbackUpdate(S){return{...S,parent:a}},successTitle:"Set parent issue",successMessage:u?`${u.identifier} set as parent issue`:`Removed parent issue from ${e.identifier}`,errorTitle:"Failed to set parent issue"})}return(0,he.jsxs)(he.Fragment,{children:[(0,he.jsx)(nt.ActionPanel.Submenu,{title:o?"Change Parent Issue":"Set Parent Issue",icon:{source:{light:"light/parent-issue.svg",dark:"dark/parent-issue.svg"}},shortcut:{modifiers:["ctrl","shift"],key:"i"},onOpen:()=>r(!0),children:!i&&l?(0,he.jsx)(nt.Action,{title:"Loading\u2026"}):(i||[]).map(u=>(0,he.jsx)(nt.Action,{autoFocus:u.id===n,title:`${u.identifier} - ${u.title}`,icon:G(u.state),onAction:()=>d(u)},u.id))}),o?(0,he.jsx)(nt.Action,{title:"Remove Parent Issue",icon:{source:{light:"light/parent-issue.svg",dark:"dark/parent-issue.svg"}},shortcut:{macOS:{modifiers:["cmd","shift"],key:"k"},Windows:{modifiers:["ctrl","shift"],key:"k"}},onAction:()=>d(null)}):null]})}var at=require("@raycast/api"),Ai=require("react");var lt=require("react/jsx-runtime");function cs({issue:e,updateIssue:t}){let[s,r]=(0,Ai.useState)(!1),{projects:i,isLoadingProjects:l}=Ne(e.team.id,{execute:s});async function a(n){let o=e.project;t({animatedTitle:"Setting project",payload:{projectId:n?n.id:null},optimisticUpdate(d){return{...d,project:n||void 0}},rollbackUpdate(d){return{...d,project:o}},successTitle:n?"Set project":`Removed project from ${e.identifier}`,successMessage:n?`"${n.name}" added to ${e.identifier}`:"",errorTitle:"Failed to set project"})}return(0,lt.jsxs)(at.ActionPanel.Submenu,{title:"Set Project",icon:{source:{light:"light/project.svg",dark:"dark/project.svg"}},shortcut:{modifiers:["ctrl","shift"],key:"p"},onOpen:()=>r(!0),children:[(0,lt.jsx)(at.Action,{title:"No Project",icon:{source:{light:"light/no-project.svg",dark:"dark/no-project.svg"}},onAction:()=>a(null)}),!i&&l?(0,lt.jsx)(at.Action,{title:"Loading\u2026"}):(i||[]).map(n=>(0,lt.jsx)(at.Action,{autoFocus:n.id===e.project?.id,title:`${n.name} (${n.status.name})`,icon:ue(n),onAction:()=>a(n)},n.id))]})}var Ze=require("@raycast/api"),Li=require("react");var Ft=require("react/jsx-runtime");function ds({issue:e,updateIssue:t}){let[s,r]=(0,Li.useState)(!1),{states:i,isLoadingStates:l}=Ie(e.team.id,{execute:s}),a=Ce(i||[]);async function n(o){let d=e.state;t({animatedTitle:"Setting status",payload:{stateId:o.id},optimisticUpdate(u){return{...u,state:o}},rollbackUpdate(u){return{...u,state:d}},successTitle:"Set status",successMessage:`${e.identifier} set to ${o.name}`,errorTitle:"Failed to set status"})}return(0,Ft.jsx)(Ze.ActionPanel.Submenu,{icon:Ze.Icon.Circle,title:"Set Status",shortcut:{macOS:{modifiers:["cmd","shift"],key:"s"},Windows:{modifiers:["ctrl","shift"],key:"s"}},onOpen:()=>r(!0),children:a.length===0&&l?(0,Ft.jsx)(Ze.Action,{title:"Loading\u2026"}):a.map(o=>(0,Ft.jsx)(Ze.Action,{autoFocus:o.id===e.state.id,title:o.name,icon:G(o),onAction:()=>n(o)},o.id))})}var b=require("react/jsx-runtime");function rt({issue:e,mutateList:t,mutateSubIssues:s,mutateDetail:r,showAttachmentsAction:i,attachments:l,priorities:a,me:n,hideOpenInLinear:o}){let{pop:d}=(0,g.useNavigation)(),{linearClient:u}=k(),S=e.assignee?.id===n?.id,$=tt({issueEstimationType:e.team.issueEstimationType,issueEstimationAllowZero:e.team.issueEstimationAllowZero,issueEstimationExtended:e.team.issueEstimationExtended});async function P({animatedTitle:I,payload:T,optimisticUpdate:R,rollbackUpdate:H,successTitle:ve,successMessage:Ke,errorTitle:Xe}){try{await(0,g.showToast)({style:g.Toast.Style.Animated,title:I});let _=u.updateIssue(e.id,T);await Promise.all([_,t?t(_,{optimisticUpdate(E){if(E)return E.map(Q=>Q.id===e.id?R(Q):Q)},rollbackOnError(E){if(E)return E.map(Q=>Q.id===e.id?H(Q):Q)}}):Promise.resolve(),s?s(_,{optimisticUpdate(E){if(E)return E.map(Q=>Q.id===e.id?R(Q):Q)},rollbackOnError(E){if(E)return E.map(Q=>Q.id===e.id?H(Q):Q)}}):Promise.resolve(),r?r(_,{optimisticUpdate(E){return R(E)},rollbackOnError(E){return H(E)}}):Promise.resolve()]),await(0,g.showToast)({style:g.Toast.Style.Success,title:ve,message:Ke})}catch(_){await(0,g.showToast)({style:g.Toast.Style.Failure,title:Xe,message:V(_)})}}async function L(){if(await(0,g.confirmAlert)({title:"Delete Issue",message:"Are you sure you want to delete the selected issue?",icon:{source:g.Icon.Trash,tintColor:g.Color.Red}}))try{await(0,g.showToast)({style:g.Toast.Style.Animated,title:"Deleting issue"});let I=u.deleteIssue(e.id);r&&d(),await Promise.all([I,t?t(I,{optimisticUpdate(T){if(T)return T.filter(R=>R.id!==e.id)}}):Promise.resolve(),s?s(I,{optimisticUpdate(T){if(T)return T.filter(R=>R.id!==e.id)}}):Promise.resolve()]),await(0,g.showToast)({style:g.Toast.Style.Success,title:"Issue deleted",message:`"${e.title}" is deleted`})}catch(I){await(0,g.showToast)({style:g.Toast.Style.Failure,title:"Failed to delete issue",message:V(I)})}}async function w(I){let T=e.priority;P({animatedTitle:"Setting priority",payload:{priority:I.priority},optimisticUpdate(R){return{...R,priority:I.priority}},rollbackUpdate(R){return{...R,priority:T}},successTitle:"Set priority",successMessage:`${e.identifier} priority set to ${I.label}`,errorTitle:"Failed to set priority"})}async function B(I){let T=e.assignee;P({animatedTitle:"Setting assignee",payload:{assigneeId:I.id},optimisticUpdate(R){return{...R,assignee:I}},rollbackUpdate(R){return{...R,assignee:T}},successTitle:"Set assignee",successMessage:`${e.identifier} assigned to ${I.displayName}`,errorTitle:"Failed to set assignee"})}async function U(I){let T=e.assignee;P({animatedTitle:"Setting assignee",payload:{assigneeId:I?I.id:null},optimisticUpdate(R){return{...R,assignee:I||void 0}},rollbackUpdate(R){return{...R,assignee:T}},successTitle:"Set assignee",successMessage:`${e.identifier} ${I?"assigned to":"un-assigned from"} me`,errorTitle:"Failed to set assignee"})}async function D({estimate:I,label:T}){let R=e.estimate;P({animatedTitle:"Setting estimate",payload:{estimate:I},optimisticUpdate(H){return{...H,estimate:I}},rollbackUpdate(H){return{...H,estimate:R}},successTitle:"Set estimate",successMessage:`${e.identifier} estimate set to ${T}`,errorTitle:"Failed to set estimate"})}async function x(I){P({animatedTitle:I?"Setting due date":"Removing due date",payload:{dueDate:I},optimisticUpdate(T){return{...T,dueDate:I}},rollbackUpdate(T){return{...T,dueDate:T.dueDate}},successTitle:I?"Set due date":"Removed due date",successMessage:I?`${e.identifier} due date set to ${(0,us.format)(I,"MM/dd/yyyy")}`:"",errorTitle:"Failed to set due date"})}async function q(I){if(!I){await(0,g.showToast)({style:g.Toast.Style.Failure,title:"Failed setting reminder"});return}try{await(0,g.showToast)({style:g.Toast.Style.Animated,title:"Setting reminder"}),await u.issueReminder(e.id,I),r&&d(),await(0,g.showToast)({style:g.Toast.Style.Success,title:"Reminder set",message:`${e.identifier} reminder set to ${(0,us.format)(I,"MM/dd/yyyy")}`})}catch(T){await(0,g.showToast)({style:g.Toast.Style.Failure,title:"Failed to set reminder",message:V(T)})}}function me(){t&&t(),s&&s(),r&&r()}let[Re,Z]=(0,Ti.useState)(""),{users:le,supportsUserTypeahead:ke,isLoadingUsers:pe}=Ve(Re);return(0,b.jsxs)(b.Fragment,{children:[o?null:(0,b.jsx)(Ge,{title:"Open Issue",url:e.url}),(0,b.jsxs)(g.ActionPanel.Section,{children:[(0,b.jsx)(g.Action.Push,{title:"Edit Issue",icon:g.Icon.Pencil,shortcut:g.Keyboard.Shortcut.Common.Edit,target:(0,b.jsx)(Kt,{priorities:a,me:n,issue:e,mutateList:t,mutateSubIssues:s})}),(0,b.jsx)(ds,{issue:e,updateIssue:P}),a&&a.length>0?(0,b.jsx)(g.ActionPanel.Submenu,{icon:g.Icon.LevelMeter,title:"Set Priority",shortcut:{macOS:{modifiers:["cmd","opt"],key:"p"},Windows:{modifiers:["ctrl","alt"],key:"p"}},children:a.map(I=>(0,b.jsx)(g.Action,{autoFocus:I.priority===e.priority,title:I.label,icon:{source:de[I.priority]},onAction:()=>w(I)},I.priority))}):null,(0,b.jsx)(g.ActionPanel.Submenu,{icon:g.Icon.AddPerson,title:"Assign to",shortcut:{macOS:{modifiers:["cmd","shift"],key:"a"},Windows:{modifiers:["ctrl","shift"],key:"a"}},...ke&&{onSearchTextChange:Z,isLoading:pe,throttle:!0},children:le?.map(I=>(0,b.jsx)(g.Action,{autoFocus:I.id===e.assignee?.id,title:`${I.displayName} (${I.email})`,icon:X(I),onAction:()=>B(I)},I.id))}),n?(0,b.jsx)(g.Action,{title:S?"Un-Assign from Me":"Assign to Me",icon:X(n),shortcut:{macOS:{modifiers:["cmd","shift"],key:"i"},Windows:{modifiers:["ctrl","shift"],key:"i"}},onAction:()=>U(S?null:n)}):null,$?(0,b.jsx)(g.ActionPanel.Submenu,{title:"Set Estimate",icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}},shortcut:{macOS:{modifiers:["cmd","shift"],key:"e"},Windows:{modifiers:["ctrl","shift"],key:"e"}},children:$.map(({estimate:I,label:T})=>(0,b.jsx)(g.Action,{autoFocus:I===e.estimate,title:T,onAction:()=>D({estimate:I,label:T})},I))}):null,(0,b.jsx)(g.Action.PickDate,{title:"Set Due Date",shortcut:{macOS:{modifiers:["opt","shift"],key:"d"},Windows:{modifiers:["alt","shift"],key:"d"}},onChange:x}),(0,b.jsx)(g.Action.PickDate,{title:"Set Reminder",shortcut:{macOS:{modifiers:["cmd","shift"],key:"h"},Windows:{modifiers:["ctrl","shift"],key:"h"}},onChange:q}),(0,b.jsx)(ns,{issue:e,updateIssue:P}),(0,b.jsx)(os,{issue:e,updateIssue:P}),(0,b.jsx)(cs,{issue:e,updateIssue:P}),(0,b.jsx)(as,{issue:e,updateIssue:P}),(0,b.jsx)(ls,{issue:e,updateIssue:P}),(0,b.jsx)(g.Action,{title:"Delete Issue",shortcut:g.Keyboard.Shortcut.Common.Remove,icon:g.Icon.Trash,style:g.Action.Style.Destructive,onAction:()=>L()})]}),(0,b.jsxs)(g.ActionPanel.Section,{children:[(0,b.jsx)(g.Action.Push,{title:"Show Sub-Issues",icon:g.Icon.List,target:(0,b.jsx)(is,{issue:e,mutateList:t}),shortcut:{macOS:{modifiers:["cmd","shift"],key:"m"},Windows:{modifiers:["ctrl","shift"],key:"m"}}}),(0,b.jsx)(g.Action.Push,{title:"Break Issues into Sub-Issues",icon:g.Icon.Stars,target:(0,b.jsx)(Ht,{issue:e}),shortcut:{macOS:{modifiers:["opt","shift"],key:"m"},Windows:{modifiers:["alt","shift"],key:"m"}}}),i?(0,b.jsx)(g.Action.Push,{title:"Show Issue Links",icon:g.Icon.Link,target:(0,b.jsx)(Xt,{attachments:l??[],issue:e}),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"l"},Windows:{modifiers:["ctrl","alt","shift"],key:"l"}}}):null,(0,b.jsx)(g.Action.Push,{title:"Add Attachments and Links",icon:g.Icon.NewDocument,target:(0,b.jsx)(jt,{issue:e}),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"a"},Windows:{modifiers:["ctrl","alt","shift"],key:"a"}}}),(0,b.jsx)(g.Action.Push,{title:"Add Comment",icon:g.Icon.Plus,target:(0,b.jsx)(Be,{issue:e}),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"n"},Windows:{modifiers:["ctrl","alt","shift"],key:"n"}}}),(0,b.jsx)(g.Action.Push,{title:"Show Comments",icon:g.Icon.Bubble,target:(0,b.jsx)(ss,{issue:e}),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"c"},Windows:{modifiers:["ctrl","alt","shift"],key:"c"}}})]}),(0,b.jsx)(rs,{issue:e}),(0,b.jsx)(g.ActionPanel.Section,{children:(0,b.jsx)(g.Action,{title:"Refresh",icon:g.Icon.ArrowClockwise,shortcut:g.Keyboard.Shortcut.Common.Refresh,onAction:()=>me()})})]})}var F=require("react/jsx-runtime");function kt({issue:e,mutateList:t,priorities:s,me:r}){let{issue:i,isLoadingIssue:l,mutateDetail:a}=qe(e),n=`# ${i?.title}`;i?.description&&(n+=`

${i.description}`);let o=i?.cycle?Me(i.cycle):null,d=i.relations?i.relations.nodes.filter($=>$.type=="related"):null,u=i.relations?i.relations.nodes.filter($=>$.type=="duplicate"):null,S=i.attachments?.nodes.length??0;return(0,F.jsx)(M.Detail,{markdown:n,isLoading:l,...i?{metadata:(0,F.jsxs)(M.Detail.Metadata,{children:[(0,F.jsx)(M.Detail.Metadata.Label,{title:"Status",text:i.state.name,icon:G(i.state)}),(0,F.jsx)(M.Detail.Metadata.Label,{title:"Priority",text:i.priorityLabel,icon:{source:de[i.priority]}}),(0,F.jsx)(M.Detail.Metadata.Label,{title:"Assignee",text:i.assignee?i.assignee.displayName:"Unassigned",icon:X(i.assignee)}),i.team.issueEstimationType!=="notUsed"?(0,F.jsx)(M.Detail.Metadata.Label,{title:"Estimate",text:Tt({estimate:i.estimate,issueEstimationType:i.team.issueEstimationType}),icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}}):null,i.labels.nodes.length>0?(0,F.jsx)(M.Detail.Metadata.TagList,{title:"Labels",children:i.labels.nodes.map(({id:$,name:P,color:L})=>(0,F.jsx)(M.Detail.Metadata.TagList.Item,{text:P,color:L},$))}):(0,F.jsx)(M.Detail.Metadata.Label,{title:"Labels",text:"No Labels"}),i.dueDate?(0,F.jsx)(M.Detail.Metadata.Label,{title:"Due Date",text:(0,$i.format)(new Date(i.dueDate),"MM/dd/yyyy"),icon:xt(new Date(i.dueDate))}):null,S>0?(0,F.jsx)(M.Detail.Metadata.Label,{title:"Links",text:`${S>1?`${S} links`:"1 link"}`,icon:M.Icon.Link}):null,(0,F.jsx)(M.Detail.Metadata.Separator,{}),(0,F.jsx)(M.Detail.Metadata.Label,{title:"Cycle",text:o?o.title:"No Cycle",icon:{source:o?o.icon:{light:"light/no-cycle.svg",dark:"dark/no-cycle.svg"}}}),(0,F.jsx)(M.Detail.Metadata.Label,{title:"Project",text:i.project?i.project.name:"No Project",icon:ue(i.project)}),(0,F.jsx)(M.Detail.Metadata.Label,{title:"Milestone",text:i.projectMilestone?i.projectMilestone.name:"No Milestone",icon:be(i.projectMilestone)}),(0,F.jsx)(M.Detail.Metadata.Label,{title:"Parent Issue",text:i.parent?i.parent.title:"No Issue",icon:i.parent?G(i.parent.state):{source:{light:"light/backlog.svg",dark:"dark/backlog.svg"}}}),d&&d.length>0?(0,F.jsx)(M.Detail.Metadata.TagList,{title:"Related",children:d.map(({id:$,relatedIssue:P})=>(0,F.jsx)(M.Detail.Metadata.TagList.Item,{text:P.identifier},$))}):null,u&&u.length>0?(0,F.jsx)(M.Detail.Metadata.TagList,{title:"Duplicates",children:u.map(({id:$,relatedIssue:P})=>(0,F.jsx)(M.Detail.Metadata.TagList.Item,{text:P.identifier},$))}):null]}),actions:(0,F.jsx)(M.ActionPanel,{children:(0,F.jsx)(rt,{issue:i,mutateList:t,mutateDetail:a,priorities:s,showAttachmentsAction:S>0,attachments:i.attachments?.nodes??[],me:r})})}:{}})}var f=require("react/jsx-runtime");function mr(e,t){return e==="url"?{title:"Copy Issue URL",onAction:()=>c.Clipboard.copy(t.url)}:e==="id-as-link"?{title:"Copy Issue ID as Link",onAction:()=>c.Clipboard.copy({text:`[${t.identifier}](${t.url})`,html:`<a href="${t.url}">${t.identifier}</a>`})}:e==="title"?{title:"Copy Issue Title",onAction:()=>c.Clipboard.copy(t.title)}:e==="title-as-link"?{title:"Copy Issue Title as Link",onAction:()=>c.Clipboard.copy({text:`[${t.title}](${t.url})`,html:`<a href="${t.url}">${t.title}</a>`})}:{title:"Copy Issue ID",onAction:()=>c.Clipboard.copy(t.identifier)}}function Pt(e){let{push:t}=(0,c.useNavigation)(),{autofocusField:s,copyToastAction:r}=(0,c.getPreferenceValues)(),[i,l]=(0,De.useState)(""),{teams:a,org:n,supportsTeamTypeahead:o,isLoadingTeams:d}=Oe(i),u=a&&a.length>1,[S,$]=(0,De.useState)(""),{users:P,supportsUserTypeahead:L,isLoadingUsers:w}=Ve(S),{handleSubmit:B,itemProps:U,values:D,setValue:x,focus:q,reset:me,setValidationError:Re}=(0,He.useForm)({async onSubmit(m){let v=await(0,c.showToast)({style:c.Toast.Style.Animated,title:"Creating issue"}),Pe=u?m.teamId:a?.[0]?.id;if(!Pe)return Re("teamId","The team is required."),!1;try{let z={teamId:Pe,title:m.title,description:m.description||"",stateId:m.stateId,labelIds:m.labelIds,dueDate:m.dueDate,...E&&m.estimate?{estimate:parseInt(m.estimate)}:{},...m.assigneeId?{assigneeId:m.assigneeId}:{},...m.cycleId?{cycleId:m.cycleId}:{},...m.projectId?{projectId:m.projectId}:{},...m.milestoneId?{projectMilestoneId:m.milestoneId}:{},...m.parentId?{parentId:m.parentId}:{},priority:parseInt(m.priority)},{success:Vt,issue:Je}=await Ts(z);if(Vt&&Je){v.style=c.Toast.Style.Success,v.title=`Created Issue \u2022 ${Je?.identifier}`,v.primaryAction={title:"Open Issue",shortcut:c.Keyboard.Shortcut.Common.OpenWith,onAction:async()=>{t((0,f.jsx)(kt,{issue:Je,priorities:e.priorities,me:e.me})),await v.hide()}},v.secondaryAction={shortcut:c.Keyboard.Shortcut.Common.Copy,...mr(r,Je)},me({templateId:"",title:"",description:"",estimate:"",labelIds:[],dueDate:null,parentId:"",attachments:[],links:""}),q(u&&s?s:"title");let qt=$t(m.links);if(qt.length>0){let xe=qt.length===1?"link":"links";try{v.message=`Attaching ${xe}\u2026`,await Promise.all(qt.map(je=>Lt({issueId:Je.id,url:je}))),v.message=`Successfully attached ${xe}`}catch(je){v.style=c.Toast.Style.Failure,v.title=`Failed attaching ${xe}`,v.message=V(je)}}if(m.attachments.length>0){let xe=m.attachments.length===1?"attachment":"attachments";try{v.message=`Uploading ${xe}\u2026`,await Promise.all(m.attachments.map(je=>At({issueId:Je.id,url:je}))),v.message=`Successfully uploaded ${xe}`}catch(je){v.style=c.Toast.Style.Failure,v.title=`Failed uploading ${xe}`,v.message=V(je)}}}}catch(z){v.style=c.Toast.Style.Failure,v.title="Failed to create issue",v.message=V(z)}x("teamId",Pe)},validation:{teamId:u?He.FormValidation.Required:void 0,title:He.FormValidation.Required,stateId:He.FormValidation.Required,priority:He.FormValidation.Required},initialValues:{templateId:e.draftValues?.templateId||"",teamId:e.draftValues?.teamId||e.teamId,title:e.draftValues?.title,description:e.draftValues?.description,priority:e.draftValues?.priority,stateId:e.draftValues?.stateId,estimate:e.draftValues?.estimate,assigneeId:e.draftValues?.assigneeId||e.assigneeId,labelIds:e.draftValues?.labelIds||[],dueDate:e.draftValues?.dueDate,cycleId:e.draftValues?.cycleId||e.cycleId,projectId:e.draftValues?.projectId||e.projectId,milestoneId:e.draftValues?.milestoneId||e.milestoneId,parentId:e.draftValues?.parentId||e.parentId,links:e.draftValues?.links||""}}),Z=!!D.teamId&&D.teamId.trim().length>0,{issueTemplates:le,isLoadingIssueTemplates:ke}=Zt(D.teamId,{execute:Z}),{states:pe}=Ie(D.teamId,{execute:Z}),{labels:I}=Fe(D.teamId,{execute:Z}),{cycles:T}=Ue(D.teamId,{execute:Z}),{issues:R}=ee(et,[],{execute:Z}),{projects:H}=Ne(D.teamId,{execute:Z}),{milestones:ve}=Ee(D.projectId,{execute:!!D.projectId});(0,De.useEffect)(()=>{a?.length===1&&x("teamId",a[0].id)},[a]);let Ke=(0,De.useRef)(!1);(0,De.useEffect)(()=>{if(!Ke.current){Ke.current=!0;return}Xe("")},[D.teamId]);function Xe(m){x("templateId",m);let v=le?.find(Vt=>Vt.id===m),Pe={assigneeId:e.assigneeId||"",cycleId:e.cycleId||"",projectId:e.projectId||"",milestoneId:e.milestoneId||""},z=v?js(v,Pe):Gt(Pe);x("title",z.title),x("description",z.description),x("stateId",z.stateId),x("priority",z.priority),x("assigneeId",z.assigneeId),x("labelIds",z.labelIds),x("estimate",z.estimate),x("dueDate",z.dueDate),x("cycleId",z.cycleId),x("projectId",z.projectId),x("milestoneId",z.milestoneId??"")}let _=a?.find(m=>m.id===D.teamId),E=_?tt({issueEstimationType:_.issueEstimationType,issueEstimationAllowZero:_.issueEstimationAllowZero,issueEstimationExtended:_.issueEstimationExtended}):null,Q=Ce(pe||[]),bt=pe&&pe.length>0,p=e.priorities&&e.priorities.length>0,K=I&&I.length>0,ge=T&&T.length>0,mt=H&&H.length>0,fs=ve&&ve.length>0,Ot=R&&R.length>0,xi=le&&le.length>0;return(0,f.jsxs)(c.Form,{enableDrafts:e.enableDrafts,actions:(0,f.jsxs)(c.ActionPanel,{children:[(0,f.jsx)(c.Action.SubmitForm,{icon:c.Icon.Plus,onSubmit:B,title:"Create Issue"}),(0,f.jsxs)(c.ActionPanel.Section,{children:[(0,f.jsx)(c.Action,{title:"Focus Title",icon:c.Icon.TextInput,onAction:()=>q("title"),shortcut:c.Keyboard.Shortcut.Common.Edit}),(0,f.jsx)(c.Action,{title:"Focus Description",icon:c.Icon.TextInput,onAction:()=>q("description"),shortcut:{modifiers:["ctrl"],key:"e"}}),(0,f.jsx)(c.Action,{title:"Focus Status",icon:c.Icon.Circle,onAction:()=>q("stateId"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"s"},Windows:{modifiers:["ctrl","shift"],key:"s"}}}),(0,f.jsx)(c.Action,{title:"Focus Priority",icon:c.Icon.LevelMeter,onAction:()=>q("priority"),shortcut:c.Keyboard.Shortcut.Common.Pin}),(0,f.jsx)(c.Action,{title:"Focus Assignee",icon:c.Icon.AddPerson,onAction:()=>q("assigneeId"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"a"},Windows:{modifiers:["ctrl","shift"],key:"a"}}}),E?(0,f.jsx)(c.Action,{title:"Focus Estimate",icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}},onAction:()=>q("estimate"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"e"},Windows:{modifiers:["ctrl","shift"],key:"e"}}}):null,(0,f.jsx)(c.Action,{title:"Focus Due Date",icon:c.Icon.Calendar,onAction:()=>q("dueDate"),shortcut:{macOS:{modifiers:["opt","shift"],key:"d"},Windows:{modifiers:["alt","shift"],key:"d"}}}),(0,f.jsx)(c.Action,{title:"Focus Labels",icon:c.Icon.Tag,onAction:()=>q("labelIds"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"l"},Windows:{modifiers:["ctrl","shift"],key:"l"}}}),ge?(0,f.jsx)(c.Action,{title:"Focus Cycle",icon:{source:{light:"light/cycle.svg",dark:"dark/cycle.svg"}},onAction:()=>q("cycleId"),shortcut:c.Keyboard.Shortcut.Common.Copy}):null,mt?(0,f.jsx)(c.Action,{title:"Focus Project",icon:{source:{light:"light/project.svg",dark:"dark/project.svg"}},onAction:()=>q("projectId"),shortcut:{modifiers:["ctrl","shift"],key:"p"}}):null,fs?(0,f.jsx)(c.Action,{title:"Focus Milestone",icon:{source:{light:"light/milestone.svg",dark:"dark/milestone.svg"}},onAction:()=>q("milestoneId"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"m"},Windows:{modifiers:["ctrl","shift"],key:"m"}}}):null,Ot?(0,f.jsx)(c.Action,{title:"Focus Parent Issue",icon:{source:{light:"light/backlog.svg",dark:"dark/backlog.svg"}},onAction:()=>q("parentId"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"i"},Windows:{modifiers:["ctrl","shift"],key:"i"}}}):null,(0,f.jsx)(c.Action,{title:"Focus Attachments",icon:c.Icon.NewDocument,onAction:()=>q("attachments"),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"a"},Windows:{modifiers:["ctrl","alt","shift"],key:"a"}}}),(0,f.jsx)(c.Action,{title:"Focus Links",icon:c.Icon.Link,onAction:()=>q("links"),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"l"},Windows:{modifiers:["ctrl","alt","shift"],key:"l"}}})]})]}),isLoading:d||w||e.isLoading,children:[(o||u)&&(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(c.Form.Dropdown,{title:"Team",storeValue:!0,...U.teamId,...o&&{onSearchTextChange:l,isLoading:d,throttle:!0},children:a?.map(m=>(0,f.jsx)(c.Form.Dropdown.Item,{title:m.name,value:m.id,icon:st(m,n)},m.id))}),(0,f.jsx)(c.Form.Separator,{})]}),Z&&(ke||xi)?(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)(c.Form.Dropdown,{id:"templateId",title:"Template",value:D.templateId||"",onChange:Xe,isLoading:ke,children:[(0,f.jsx)(c.Form.Dropdown.Item,{title:"No Template",value:"",icon:c.Icon.Document}),le?.map(m=>(0,f.jsx)(c.Form.Dropdown.Item,{title:m.name,value:m.id,icon:c.Icon.Document},m.id))]}),(0,f.jsx)(c.Form.Separator,{})]}):null,(0,f.jsx)(c.Form.TextField,{title:"Title",placeholder:"Issue title",...s==="title"?{autoFocus:!0}:{},...U.title}),(0,f.jsx)(c.Form.TextArea,{title:"Description",placeholder:"Add some details (supports Markdown, e.g. **bold**)",enableMarkdown:!0,...U.description}),(0,f.jsx)(c.Form.Dropdown,{title:"Status",storeValue:!0,...U.stateId,children:bt?Q.map(m=>(0,f.jsx)(c.Form.Dropdown.Item,{title:m.name,value:m.id,icon:G(m)},m.id)):null}),(0,f.jsx)(c.Form.Dropdown,{title:"Priority",storeValue:!0,...U.priority,children:p?e.priorities?.map(({priority:m,label:v})=>(0,f.jsx)(c.Form.Dropdown.Item,{title:v,value:String(m),icon:{source:de[m]}},m)):null}),(0,f.jsxs)(c.Form.Dropdown,{title:"Assignee",storeValue:!0,...U.assigneeId,...L&&{onSearchTextChange:$,isLoading:w,throttle:!0},children:[(0,f.jsx)(c.Form.Dropdown.Item,{title:"Unassigned",value:"",icon:c.Icon.Person}),P?.map(m=>(0,f.jsx)(c.Form.Dropdown.Item,{title:m.name,value:m.id,icon:X(m)},m.id))]}),(0,f.jsx)(c.Form.TagPicker,{title:"Labels",placeholder:"Add label",...U.labelIds,children:K?I.map(({id:m,name:v,color:Pe})=>(0,f.jsx)(c.Form.TagPicker.Item,{title:v,value:m,icon:{source:c.Icon.Dot,tintColor:Pe}},m)):null}),E?(0,f.jsxs)(c.Form.Dropdown,{title:"Estimate",...U.estimate,children:[(0,f.jsx)(c.Form.Dropdown.Item,{title:"No estimate",value:"",icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}}),E.map(({estimate:m,label:v})=>(0,f.jsx)(c.Form.Dropdown.Item,{title:v,value:String(m),icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}},m))]}):null,(0,f.jsx)(c.Form.DatePicker,{title:"Due Date",type:c.Form.DatePicker.Type.Date,...U.dueDate}),ge||mt||Ot?(0,f.jsx)(c.Form.Separator,{}):null,ge?(0,f.jsxs)(c.Form.Dropdown,{title:"Cycle",storeValue:!0,...U.cycleId,children:[(0,f.jsx)(c.Form.Dropdown.Item,{title:"No Cycle",value:"",icon:{source:{light:"light/no-cycle.svg",dark:"dark/no-cycle.svg"}}}),Se(T).map(m=>(0,f.jsx)(c.Form.Dropdown.Item,{title:m.title,value:m.id,icon:{source:m.icon}},m.id))]}):null,mt?(0,f.jsxs)(c.Form.Dropdown,{title:"Project",storeValue:!0,...U.projectId,children:[(0,f.jsx)(c.Form.Dropdown.Item,{title:"No Project",value:"",icon:{source:{light:"light/no-project.svg",dark:"dark/no-project.svg"}}}),H.map(m=>(0,f.jsx)(c.Form.Dropdown.Item,{title:`${m.name} (${m.status.name})`,value:m.id,icon:ue(m)},m.id))]}):null,fs?(0,f.jsxs)(c.Form.Dropdown,{title:"Milestone",storeValue:!0,...U.milestoneId,children:[(0,f.jsx)(c.Form.Dropdown.Item,{title:"No Milestone",value:"",icon:{source:"linear-icons/no-milestone.svg"}}),ve.map(m=>(0,f.jsx)(c.Form.Dropdown.Item,{title:`${m.name} (${m.targetDate||"No Target Date"})`,value:m.id,icon:be(m)},m.id))]}):null,Ot?(0,f.jsxs)(c.Form.Dropdown,{title:"Parent",...U.parentId,children:[(0,f.jsx)(c.Form.Dropdown.Item,{title:"No Issue",value:"",icon:{source:{light:"light/backlog.svg",dark:"dark/backlog.svg"}}}),R.map(m=>(0,f.jsx)(c.Form.Dropdown.Item,{title:`${m.identifier} - ${m.title}`,value:m.id,icon:G(m.state)},m.id))]}):null,(0,f.jsx)(c.Form.Separator,{}),(0,f.jsx)(c.Form.FilePicker,{title:"Attachment",...U.attachments}),(0,f.jsx)(c.Form.TextArea,{title:"Links",placeholder:`https://a.com
https://b.com
New link(s) on separate line(s)`,...U.links})]})}var Di=require("@raycast/api"),Et=require("lodash");var ct=require("react/jsx-runtime");function ms({mutateList:e,issues:t,priorities:s,me:r}){if(!t||t&&t.length===0)return null;let i=(0,Et.uniqBy)(t.map(n=>n.state),n=>n.id),l=Ce(i||[],["triage","started","unstarted","backlog","completed","canceled"]),a=(0,Et.groupBy)(t,n=>n.state.id);return(0,ct.jsx)(ct.Fragment,{children:l.map(n=>{let o=a[n.id]?.length===1?"1 issue":`${a[n.id]?.length} issues`;return(0,ct.jsx)(Di.List.Section,{title:n.name,subtitle:o,children:a[n.id]?.map(d=>(0,ct.jsx)(ht,{issue:d,mutateList:e,priorities:s,me:r},d.id))},n.id)})})}var ut=require("@raycast/api"),Ri=require("@raycast/utils"),Nt=pt(require("react"));var dt=require("react/jsx-runtime");function pr({children:e}){return(0,Nt.useEffect)(()=>{pi()},[]),e}var ps=class extends Nt.default.Component{constructor(t){super(t),this.state={error:null}}static getDerivedStateFromError(t){return{error:t}}render(){let{error:t}=this.state;if(!t)return this.props.children;if(!(t.message.includes("invalid_grant")||t.message.includes("Error while fetching tokens")||t.message.includes("Could not initialize OAuth")))throw t;return(0,dt.jsx)(ut.Detail,{markdown:`# Sign In Failed

Failed to authenticate with Linear:
\`\`\`
${t.message}
\`\`\`

This can happen when the network is unreliable or the authorization code has expired. Please try signing in again.`,actions:(0,dt.jsx)(ut.ActionPanel,{children:(0,dt.jsx)(ut.Action,{title:"Sign in Again",onAction:async()=>{await Wt.client.removeTokens(),this.setState({error:null})}})})})}},gr=(0,Ri.withAccessToken)(Wt)(pr);function gs({children:e}){return(0,dt.jsx)(ps,{children:(0,dt.jsx)(gr,{children:e})})}var J=require("react/jsx-runtime");function fr(){let[e,t]=(0,St.useState)(""),{teams:s,org:r,supportsTeamTypeahead:i,isLoadingTeams:l}=Oe(e),[a,n]=(0,St.useState)(""),{priorities:o,isLoadingPriorities:d}=yt(),{me:u,isLoadingMe:S}=ze(),$=(0,St.useMemo)(()=>s?.find(B=>B.id===a)?.activeCycle?.id,[a]),{issues:P,isLoadingIssues:L,mutateList:w}=ee(Ss,[$],{execute:!!$&&$.trim().length>0});return(0,J.jsxs)(Y.List,{searchBarAccessory:(0,J.jsxs)(Y.List.Dropdown,{tooltip:"Change Team",onChange:n,storeValue:!0,...i&&{throttle:!0,onSearchTextChange:t,isLoading:l},children:[(!s||s.length===0)&&(0,J.jsx)(Y.List.Dropdown.Item,{title:"No team",value:"-",icon:Y.Icon.TwoPeople},"-"),s?.map(B=>(0,J.jsx)(Y.List.Dropdown.Item,{value:B.id,title:B.name,icon:st(B,r)},B.id))]}),isLoading:L||l||d||S,searchBarPlaceholder:"Filter by ID, title, status, assignee or priority",filtering:{keepSectionOrder:!0},children:[(0,J.jsx)(Y.List.EmptyView,{title:$?"No issues":"No active cycles",description:$?"There are no issues in the active cycle.":"This team does not have active cycles.",...$&&{actions:(0,J.jsx)(Y.ActionPanel,{children:(0,J.jsx)(Y.Action.Push,{title:"Create Issue",target:(0,J.jsx)(Pt,{cycleId:$,teamId:a,priorities:o,me:u})})})}||{}}),(0,J.jsx)(ms,{issues:P,mutateList:w,priorities:o,me:u})]})}function vi(){return(0,J.jsx)(gs,{children:(0,J.jsx)(fr,{})})}
