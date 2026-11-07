"use strict";var Qs=Object.create;var Ht=Object.defineProperty;var Bs=Object.getOwnPropertyDescriptor;var zs=Object.getOwnPropertyNames;var Gs=Object.getPrototypeOf,_s=Object.prototype.hasOwnProperty;var Hs=(e,t)=>{for(var i in t)Ht(e,i,{get:t[i],enumerable:!0})},Ji=(e,t,i,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let o of zs(t))!_s.call(e,o)&&o!==i&&Ht(e,o,{get:()=>t[o],enumerable:!(s=Bs(t,o))||s.enumerable});return e};var yt=(e,t,i)=>(i=e!=null?Qs(Gs(e)):{},Ji(t||!e||!e.__esModule?Ht(i,"default",{value:e,enumerable:!0}):i,e)),Zs=e=>Ji(Ht({},"__esModule",{value:!0}),e);var $r={};Hs($r,{default:()=>qs});module.exports=Zs($r);var pt=require("@raycast/api"),Gt=require("react");var Yi=yt(require("fs")),eo=require("@raycast/api"),to=yt(require("node-emoji"));function Ve({icon:e,color:t,fallbackIcon:i}){if(!e)return i;if(/:(.*):/.test(e))return to.get(e)??i;let o=`${eo.environment.assetsPath}/linear-icons/${e.toLowerCase()}.svg`;return Yi.default.existsSync(o)?{source:o,...t?{tintColor:{light:t,dark:t,adjustContrast:!0}}:{}}:i}function qe(e){return Ve({icon:e.icon??void 0,color:e.color??void 0,fallbackIcon:{source:{light:"light/initiative.svg",dark:"dark/initiative.svg"}}})}var ao=require("@raycast/utils");var ro=require("lodash");var io=require("@linear/sdk"),oo=require("@raycast/api"),so=require("@raycast/utils"),Ut=null;async function Ks(e,t,i,s,o){let c=JSON.stringify({query:i,variables:s}),n=new Headers(t.headers);new Headers(o).forEach((l,d)=>n.set(d,l)),n.set("Content-Type","application/json");let a=await fetch(e,{...t,method:"POST",headers:Object.fromEntries(n.entries()),body:c}),r=a.headers.get("Content-Type")?.startsWith("application/json")?await a.json():await a.text();if(typeof r!="string"&&a.ok&&!r.errors&&r.data)return{...r,headers:a.headers,status:a.status};throw new Error(typeof r=="string"?r:r.errors?.[0]?.message??`GraphQL Error (${a.status})`)}var gi=so.OAuthService.linear({scope:"read write",onAuthorize({token:e}){Ut=new io.LinearClient({accessToken:e,headers:{"public-file-urls-expire-in":"60","linear-raycast-extension-name":oo.environment.extensionName}});let t=Ut.client;t.rawRequest=((i,s,o)=>Ks(t.url,t.options,i,s,o))}});function k(){if(!Ut)throw new Error("No linear client initialized");return{linearClient:Ut,graphQLClient:Ut.client}}var Xs=`
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
`;async function no(){let{graphQLClient:e}=k(),{data:t}=await e.rawRequest(`
      query {
        initiatives(orderBy: updatedAt) {
          nodes {
            ${Xs}
          }
        }
      }
    `);return(0,ro.sortBy)(t?.initiatives.nodes??[],i=>i.sortOrder??1/0)}function Zt(){let{data:e,error:t,isLoading:i,mutate:s}=(0,ao.useCachedPromise)(no,[],{failureToastOptions:{title:"Failed to load initiatives"},keepPreviousData:!0});return{initiatives:e,initiativesError:t,isLoadingInitiatives:!e&&!t||i,mutateInitiatives:s}}var co=require("@raycast/utils");function tt(){let{linearClient:e}=k(),{data:t,error:i,isLoading:s}=(0,co.useCachedPromise)(()=>e.viewer);return{me:t,meError:i,isLoadingMe:!t&&!i||s}}var lo=require("@raycast/utils");function Ft(){let{linearClient:e}=k(),{data:t,error:i,isLoading:s}=(0,lo.useCachedPromise)(()=>e.issuePriorityValues,[],{initialData:[]});return{priorities:t,prioritiesError:i,isLoadingPriorities:!t&&!i||s}}var po=require("@raycast/utils");var Js=`
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
`;async function uo({teamId:e,searchText:t="",after:i=null,first:s=null}){let{graphQLClient:o}=k(),c=`
    projects(first: $first, after: $after, filter: { name: { containsIgnoreCase: $searchText } }) {
      nodes {
        ${Js}
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  `;if(!e){let{data:r}=await o.rawRequest(`
        query($first: Int, $after: String, $searchText: String) {
          ${c}
        }
      `,{first:s,after:i,searchText:t}),l=r?.projects;return{data:l?.nodes??[],hasMore:!!l?.pageInfo.hasNextPage,cursor:l?.pageInfo.endCursor||null}}let{data:n}=await o.rawRequest(`
      query($teamId: String!, $first: Int, $after: String, $searchText: String) {
        team(id: $teamId) {
          ${c}
        }
      }
    `,{teamId:e,first:s,after:i,searchText:t}),a=n?.team?.projects;return{data:a?.nodes??[],hasMore:!!a?.pageInfo.hasNextPage,cursor:a?.pageInfo.endCursor||null}}var Ys=`
  id
  body
  url
  health
  createdAt
  user {
    id
    displayName
    avatarUrl
    email
  }
`;async function mo(e){let{graphQLClient:t}=k(),{data:i}=await t.rawRequest(`
      query($projectId: String!) {
        project(id: $projectId) {
          projectUpdates {
            nodes {
              ${Ys}
            }
          }
        }
      }
    `,{projectId:e});return i?.project.projectUpdates.nodes}function le(e,t){let{data:i,error:s,isLoading:o,mutate:c,pagination:n}=(0,po.useCachedPromise)((a,r)=>l=>uo({teamId:a,searchText:r,after:l.cursor,first:t?.pageSize}),[e,t?.searchText],{execute:t?.execute!==!1,keepPreviousData:!0});return{projects:i,isLoadingProjects:!i&&!s||o,projectsError:s,mutateProjects:c,pagination:n}}var D=require("@raycast/api"),Ns=require("@raycast/utils"),zi=require("date-fns");var ht=require("@raycast/api"),Kt=require("date-fns");function Pt(e){let t=(0,Kt.differenceInDays)(e,(0,Kt.startOfToday)()),i=ht.Color.PrimaryText;return t<=7&&(i=ht.Color.Orange),t<=0&&(i=ht.Color.Red),{source:ht.Icon.Calendar,tintColor:i}}function U(e){return e instanceof Error?e.message:String(e)}var Xt={backlog:{light:"light/project-backlog.svg",dark:"dark/project-backlog.svg"},planned:{light:"light/project-planned.svg",dark:"dark/project-planned.svg"},started:{light:"light/project-started.svg",dark:"dark/project-started.svg"},paused:{light:"light/project-paused.svg",dark:"dark/project-paused.svg"},completed:{light:"light/project-completed.svg",dark:"dark/project-completed.svg"},canceled:{light:"light/project-canceled.svg",dark:"dark/project-canceled.svg"}};function Z(e){return e?Ve({icon:e.icon??void 0,color:e.color??void 0,fallbackIcon:{source:{light:"light/project.svg",dark:"dark/project.svg"}}}):{source:{light:"light/no-project.svg",dark:"dark/no-project.svg"}}}var Jt=require("@raycast/api"),go=require("@raycast/utils");function G(e){return e?{source:e.avatarUrl?encodeURI(e.avatarUrl):(0,go.getAvatarIcon)(e.displayName.toUpperCase()),mask:Jt.Image.Mask.Circle}:Jt.Icon.Person}var _=require("@raycast/api"),Et=require("@raycast/utils");var me=require("react/jsx-runtime");function fi({projectId:e}){let{linearClient:t}=k(),{pop:i}=(0,_.useNavigation)(),{projects:s,isLoadingProjects:o}=le(),{handleSubmit:c,itemProps:n,focus:a,reset:r}=(0,Et.useForm)({async onSubmit(l){let d=await(0,_.showToast)({style:_.Toast.Style.Animated,title:"Creating Milestone"});try{let{success:S}=await t.createProjectMilestone({projectId:l.projectId,name:l.name,description:l.description,...l.targetDate?{targetDate:l.targetDate}:{}});S&&(d.style=_.Toast.Style.Success,d.title="Created Milestone",r({projectId:"",name:"",description:"",targetDate:null}),a("projectId"),i())}catch(S){d.style=_.Toast.Style.Failure,d.title="Failed to create milestone",d.message=U(S)}},validation:{projectId:Et.FormValidation.Required,name:Et.FormValidation.Required},initialValues:{projectId:e,name:"",description:"",targetDate:null}});return(0,me.jsxs)(_.Form,{isLoading:o,actions:(0,me.jsx)(_.ActionPanel,{children:(0,me.jsx)(_.Action.SubmitForm,{title:"Create Milestone",onSubmit:c})}),children:[(0,me.jsx)(_.Form.Dropdown,{title:"Project",storeValue:!0,...n.projectId,children:s?.map(l=>(0,me.jsx)(_.Form.Dropdown.Item,{value:l.id,title:l.name,icon:Z(l)},l.id))}),(0,me.jsx)(_.Form.Separator,{}),(0,me.jsx)(_.Form.TextField,{title:"Name",placeholder:"Milestone name",...n.name}),(0,me.jsx)(_.Form.TextArea,{title:"Description",placeholder:"Add some details (supports Markdown, e.g. **bold**)",...n.description}),(0,me.jsx)(_.Form.Separator,{}),(0,me.jsx)(_.Form.DatePicker,{title:"Target Date",type:_.Form.DatePicker.Type.Date,...n.targetDate})]})}var x=require("@raycast/api"),Ot=require("@raycast/utils"),So=require("react");var fo=require("@raycast/api");function kt(e,t){let i=t?.logoUrl?encodeURI(t.logoUrl):fo.Icon.TwoPeople;return Ve({icon:e.icon??void 0,color:e.color??void 0,fallbackIcon:i})}var Io=require("@raycast/utils");function Ii(){let{linearClient:e}=k(),{data:t,isLoading:i}=(0,Io.useCachedPromise)(async()=>(await e.projectStatuses()).nodes.sort((o,c)=>o.position-c.position));return{states:t,isLoadingStates:i}}var Po=require("@raycast/utils");var yo=require("lodash");async function ho(e=""){let{graphQLClient:t,linearClient:i}=k(),s=await i.viewer,{data:o}=await t.rawRequest(`
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
    `,{userId:s.id,query:e}),c=(0,yo.sortBy)(o?.teams.nodes??[],r=>r.membership?.sortOrder??1/0),n=o?.organization,a=!!o?.teams.pageInfo.hasNextPage;return{teams:c,organization:n,hasMoreTeams:a}}function it(e=""){let{data:t,error:i,isLoading:s}=(0,Po.useCachedPromise)(ho,[e]);return{teams:t?.teams,org:t?.organization,teamsError:i,isLoadingTeams:!t&&!i||s,supportsTeamTypeahead:e.trim().length>0||t?.hasMoreTeams}}var ko=require("@raycast/utils");function De(e=""){let{linearClient:t}=k(),{data:i,error:s,isLoading:o}=(0,ko.useCachedPromise)(async c=>{let n=await t.users(c.trim().length>0?{filter:{name:{containsIgnoreCase:c}}}:void 0);return{users:n?.nodes??[],hasMoreUsers:!!n?.pageInfo?.hasNextPage}},[e],{initialData:[]});return{users:i?.users,supportsUserTypeahead:e.trim().length>0||i?.hasMoreUsers,usersError:s,isLoadingUsers:!i&&!s||o}}var K=require("react/jsx-runtime");function yi({project:e,mutateProjects:t}){let{linearClient:i}=k(),{pop:s}=(0,x.useNavigation)(),{teams:o,org:c,isLoadingTeams:n}=it(),{users:a,isLoadingUsers:r}=De(),{states:l,isLoadingStates:d}=Ii(),[S,$]=(0,So.useState)(""),{users:h,supportsUserTypeahead:m,isLoadingUsers:f}=De(S),{handleSubmit:ee,itemProps:T}=(0,Ot.useForm)({async onSubmit(I){let M=await(0,x.showToast)({style:x.Toast.Style.Animated,title:"Editing project"});try{let{success:N}=await i.updateProject(e.id,{teamIds:I.teamIds,name:I.name,description:I.description,statusId:I.statusId,memberIds:I.memberIds,...I.leadId?{leadId:I.leadId}:{},...I.startDate?{startDate:I.startDate}:{},...I.targetDate?{targetDate:I.targetDate}:{}});N&&(M.style=x.Toast.Style.Success,M.title="Edited Project",s(),t())}catch(N){M.style=x.Toast.Style.Failure,M.title="Failed to edit project",M.message=U(N)}},validation:{teamIds:Ot.FormValidation.Required,name:Ot.FormValidation.Required},initialValues:{teamIds:e.teams.nodes.map(I=>I.id)||[],name:e.name,description:e.description,statusId:e.status.id,leadId:e.lead?.id,memberIds:e.members.nodes.map(I=>I.id)||[],startDate:e.startDate?new Date(e.startDate):null,targetDate:e.targetDate?new Date(e.targetDate):null}});return(0,K.jsxs)(x.Form,{isLoading:n||r||f||d,actions:(0,K.jsx)(x.ActionPanel,{children:(0,K.jsx)(x.Action.SubmitForm,{title:"Edit Project",onSubmit:ee})}),children:[(0,K.jsx)(x.Form.TagPicker,{title:"Team(s)",placeholder:"Add team",...T.teamIds,children:o?.map(I=>(0,K.jsx)(x.Form.TagPicker.Item,{value:I.id,title:I.name,icon:kt(I,c)},I.id))}),(0,K.jsx)(x.Form.Separator,{}),(0,K.jsx)(x.Form.TextField,{title:"Name",placeholder:"Project name",...T.name}),(0,K.jsx)(x.Form.TextArea,{title:"Description",placeholder:"Add some details (supports Markdown, e.g. **bold**)",...T.description}),(0,K.jsx)(x.Form.Separator,{}),(0,K.jsx)(x.Form.Dropdown,{title:"Status",...T.statusId,children:l?.map(I=>(0,K.jsx)(x.Form.Dropdown.Item,{value:I.id,title:I.name,icon:{source:Xt[I.type],tintColor:I.color}},I.id))}),(0,K.jsxs)(x.Form.Dropdown,{title:"Lead",...T.leadId,...m&&{onSearchTextChange:$,isLoading:f,throttle:!0},children:[(0,K.jsx)(x.Form.Dropdown.Item,{title:"Unassigned",value:"",icon:x.Icon.Person}),h?.map(I=>(0,K.jsx)(x.Form.Dropdown.Item,{title:I.name,value:I.id,icon:G(I)},I.id))]}),a&&a.length>0?(0,K.jsx)(x.Form.TagPicker,{title:"Members",placeholder:"Add members",...T.memberIds,children:a?.map(I=>(0,K.jsx)(x.Form.TagPicker.Item,{value:I.id,title:I.name,icon:G(I)},I.id))}):null,(0,K.jsx)(x.Form.DatePicker,{title:"Start Date",type:x.Form.DatePicker.Type.Date,...T.startDate}),(0,K.jsx)(x.Form.DatePicker,{title:"Target Date",type:x.Form.DatePicker.Type.Date,...T.targetDate})]})}var hi=require("@raycast/api");var Co=require("@raycast/api"),Nt=!1;async function wo(){Nt=!!(await(0,Co.getApplications)()).find(i=>i.bundleId==="com.linear")}var Pi=require("react/jsx-runtime");function ie({title:e,url:t,...i}){return Nt?(0,Pi.jsx)(hi.Action.Open,{title:`${e||"Open"} in Linear`,icon:"linear-app-icon.png",target:t,application:"Linear",...i}):(0,Pi.jsx)(hi.Action.OpenInBrowser,{url:t,title:`${e||"Open"} in Browser`})}var Ce=require("@raycast/api"),Ps=require("@raycast/utils"),ks=require("react");var bo=require("@raycast/api");async function ki(e,t,i,s,o){let c=s,n=!0,a,r=0;for(;n&&r<o;){let l=await e(a);c=i(c,l),n=t(l)?.hasNextPage,a=t(l)?.endCursor,r++}return c}var er=(0,bo.getPreferenceValues)();function Si({inFilterBlock:e,addComma:t,inParentheses:i}={inFilterBlock:!1,inParentheses:!1,addComma:!0}){return er.shouldHideRedundantIssues?[...i?["("]:[],...t?[", "]:[],...e?[]:["filter: { "],"completedAt: { null: true }, canceledAt: { null: true }",...e?[]:[" }"],...i?[")"]:[]].join(""):""}var St=`
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
`;async function Ct(){let{graphQLClient:e}=k(),{data:t}=await e.rawRequest(`
      query {
        issues(orderBy: createdAt${Si()}) {
          nodes {
            ${St}
          }
        }
      }
    `);return t?.issues.nodes}async function Do(e){let{graphQLClient:t}=k(),{data:i}=await t.rawRequest(`
      query($projectId: ID) {
        issues(filter: { project: { id: { eq: $projectId } }${Si({inFilterBlock:!0,addComma:!0})} } ) {
          nodes {
            ${St}
          }
        }
      }
    `,{projectId:e});return i?.issues.nodes}async function Ao(e){let{graphQLClient:t}=k(),{data:i}=await t.rawRequest(`
      query($issueId: String!) {
        issue(id: $issueId) {
          children${Si({inParentheses:!0})} {
            nodes {
              ${St}
              sortOrder
            }
          }
        }
      }
    `,{issueId:e});if(!i)throw new Error("Cannot find the Linear issue");return i.issue.children.nodes}async function Lo(e){let{graphQLClient:t}=k(),{data:i}=await t.rawRequest(`
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
    `,{issueId:e});if(!i)throw new Error("Cannot find the Linear issue");return i.issue}async function To(e){let{graphQLClient:t}=k(),{data:i}=await t.rawRequest(`
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
    `,{issueId:e});if(!i)throw new Error("Cannot find the Linear issue");return i.issue.comments.nodes}async function vo(e){let{graphQLClient:t}=k(),{data:i}=await t.rawRequest(`
      query($issueId: String!) {
        issue(id: $issueId) {
          ${St}
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
    `,{issueId:e});if(!i)throw new Error("Cannot find the Linear issue");return i.issue}var Ci=require("@raycast/api");function Ae(e){return e?{source:"linear-icons/milestone.svg",tintColor:Ci.Color.PrimaryText}:{source:"linear-icons/no-milestone.svg",tintColor:Ci.Color.SecondaryText}}var $o=require("@raycast/utils");function ge(e,t=[],i){let{data:s,error:o,isLoading:c,mutate:n}=(0,$o.useCachedPromise)(e,t,i);return{issues:s,issuesError:o,isLoadingIssues:c,mutateList:n}}var jo=require("@raycast/utils");var tr=`
  id
  name
  targetDate
  project {
      id
  }
  sortOrder
  updatedAt
`;async function Ro(e){let{graphQLClient:t}=k();if(e){let{data:i}=await t.rawRequest(`
        query($projectId: String!) {
          project(id: $projectId) {
            projectMilestones {
              nodes {
                ${tr}
              }
            }
          }
        }
      `,{projectId:e});return i?.project.projectMilestones.nodes}return null}function je(e,t){let{data:i,error:s,isLoading:o,mutate:c}=(0,jo.useCachedPromise)(Ro,[e],{execute:t?.execute!==!1});return{milestones:i,isLoadingMilestones:!i&&!s||o,milestonesError:s,mutateMilestones:c}}var u=require("@raycast/api"),mt=require("@raycast/utils"),Ze=require("react");var xo=require("fs/promises"),wi=yt(require("path"));var ir="application/octet-stream",or={".apng":"image/apng",".avif":"image/avif",".bmp":"image/bmp",".csv":"text/csv",".doc":"application/msword",".docx":"application/vnd.openxmlformats-officedocument.wordprocessingml.document",".gif":"image/gif",".gz":"application/gzip",".heic":"image/heic",".heif":"image/heif",".ico":"image/x-icon",".jpeg":"image/jpeg",".jpg":"image/jpeg",".json":"application/json",".md":"text/markdown",".mov":"video/quicktime",".mp3":"audio/mpeg",".mp4":"video/mp4",".pdf":"application/pdf",".png":"image/png",".ppt":"application/vnd.ms-powerpoint",".pptx":"application/vnd.openxmlformats-officedocument.presentationml.presentation",".svg":"image/svg+xml",".tar":"application/x-tar",".tif":"image/tiff",".tiff":"image/tiff",".txt":"text/plain",".webm":"video/webm",".webp":"image/webp",".xls":"application/vnd.ms-excel",".xlsx":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",".zip":"application/zip"};function sr(e){return or[wi.default.extname(e).toLowerCase()]??ir}async function rr(e){let{graphQLClient:t}=k(),i=await(0,xo.readFile)(e),s=sr(e),o=wi.default.basename(e),{data:c}=await t.rawRequest(`
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
    `,{size:i.byteLength,contentType:s,filename:o}),n=c?.fileUpload.uploadFile;if(!c?.fileUpload.success||!n)throw new Error(`Failed to request an upload URL for "${o}"`);let a=new Headers({"Content-Type":s,"Cache-Control":"public, max-age=31536000"});n.headers.forEach(({key:l,value:d})=>a.set(l,d));let r=await fetch(n.uploadUrl,{method:"PUT",headers:a,body:i});if(!r.ok)throw new Error(`Failed to upload "${o}": ${r.status} ${r.statusText}`);return{assetUrl:n.assetUrl,contentType:s,name:o}}async function Yt(e){let{linearClient:t}=k(),i=await rr(e.url),s=await t.createAttachment({issueId:e.issueId,title:i.name,url:i.assetUrl});return{success:s.success,id:s.attachmentId}}async function ei(e){let{linearClient:t}=k(),i=await t.attachmentLinkURL(e.issueId,e.url);return{success:i.success,id:i.attachmentId}}async function Mo(e){let{graphQLClient:t}=k(),i=e.title.replace(/"/g,"\\$&"),s=e.description?.replace(/\n/g,"\\n")?.replace(/"/g,"\\$&"),o=`teamId: "${e.teamId}", title: "${i}", description: "${s}", priority: ${e.priority}`;e.stateId&&(o+=`, stateId: "${e.stateId}"`),e.estimate&&(o+=`, estimate: ${e.estimate}`),e.assigneeId&&(o+=`, assigneeId: "${e.assigneeId}"`),e.labelIds&&e.labelIds.length>0&&(o+=`, labelIds: [${e.labelIds.map(n=>`"${n}"`).join(",")}]`),e.dueDate&&(o+=`, dueDate: "${e.dueDate.toISOString()}"`),e.cycleId&&(o+=`, cycleId: "${e.cycleId}"`),e.projectId&&(o+=`, projectId: "${e.projectId}"`),e.projectId&&e.projectMilestoneId&&(o+=`, projectMilestoneId: "${e.projectMilestoneId}"`),e.parentId&&(o+=`, parentId: "${e.parentId}"`);let{data:c}=await t.rawRequest(`
      mutation {
        issueCreate(input: {${o}}) {
          success
          issue {
            ${St}
          }
        }
      }
    `);return{success:c?.issueCreate.success,issue:c?.issueCreate.issue}}async function Uo(e){let{graphQLClient:t}=k(),i=e.title.replace(/"/g,"\\$&"),s=e.description?.replace(/\n/g,"\\n").replace(/"/g,"\\$&"),o=`teamId: "${e.teamId}", title: "${i}", description: "${s}", parentId: "${e.parentId}"`;e.stateId&&(o+=`, stateId: "${e.stateId}"`);let{data:c}=await t.rawRequest(`
      mutation {
        issueCreate(input: {${o}}) {
          success
        }
      }
    `);return{success:c?.issueCreate.success}}var Le=require("date-fns"),nr=10080*60*1e3;function ot(e){let t=Date.now(),i=Date.now()+nr,s=new Date(e.startsAt),o=new Date(e.endsAt),c=!e.completedAt&&(0,Le.isBefore)(s,t)&&(0,Le.isAfter)(o,t),n=!e.completedAt&&(0,Le.isBefore)(s,i)&&(0,Le.isAfter)(o,i),a=c?{light:"light/active-cycle.svg",dark:"dark/active-cycle.svg"}:{light:"light/cycle.svg",dark:"dark/cycle.svg"},r=`Cycle ${e.number} (${(0,Le.format)(s,"dd MMM")} - ${(0,Le.format)(o,"dd MMM")})`,l=c?`Active ${r}`:r;return{...e,isActive:c,isNext:n,icon:a,title:l}}function We(e){return e.filter(t=>(0,Le.isAfter)(new Date(t.endsAt),Date.now())).map(ot)}var Fo={exponential:[0,1,2,4,8,16,32,64],fibonacci:[0,1,2,3,5,8,13,21],linear:[0,1,2,3,4,5,6,7],tShirt:[0,1,2,3,5,8,13,21]},Eo={0:"\u2013",1:"XS",2:"S",3:"M",5:"L",8:"XL",13:"XXL",21:"XXXL"};function ti({estimate:e,issueEstimationType:t}){if(!e)return"Not estimated";if(t==="tShirt"){let i=Eo[e];return i||String(e)}return String(e)}function wt({issueEstimationType:e,issueEstimationAllowZero:t,issueEstimationExtended:i}){if(e==="notUsed")return null;let s=t?0:1,o=i?Fo[e].length:6,c=Fo[e].slice(s,o);return e==="tShirt"?c.map(n=>({estimate:n,label:Eo[n]})):c.map(n=>({estimate:n,label:n!==1?`${n} points`:`${n} point`}))}function bi(e={}){return{title:"",description:"",stateId:"",priority:"",assigneeId:"",labelIds:[],estimate:"",dueDate:null,cycleId:"",projectId:"",milestoneId:"",...e}}function ar(e){if(typeof e=="string")try{let t=JSON.parse(e);return typeof t=="object"&&t!==null?t:{}}catch{return{}}return typeof e=="object"&&e!==null?e:{}}function xe(e){return typeof e=="string"?e:void 0}function Oo(e){return typeof e=="number"?String(e):xe(e)}function No(e){if(!Array.isArray(e))return;let t=e.filter(i=>typeof i=="string");return t.length>0?t:void 0}function cr(e){if(typeof e!="string")return;let t=new Date(e);return Number.isNaN(t.getTime())?void 0:t}function Vo(e,t={}){let i=ar(e.templateData),s=bi(t),o=No(i.labelIds)??No(i.labels);return{title:xe(i.title)??s.title,description:xe(i.description)??xe(e.description)??s.description,stateId:xe(i.stateId)??xe(i.statusId)??s.stateId,priority:Oo(i.priority)??s.priority,assigneeId:xe(i.assigneeId)??s.assigneeId,labelIds:o??s.labelIds,estimate:Oo(i.estimate)??s.estimate,dueDate:i.dueDate!==void 0?cr(i.dueDate)??null:s.dueDate,cycleId:xe(i.cycleId)??s.cycleId,projectId:xe(i.projectId)??s.projectId,milestoneId:s.milestoneId}}function ii(e){let t=e.split(`
`),i=/https?:\/\/\S+/,s=t.map(o=>o.trim()).filter(o=>i.test(o));return Array.from(new Set(s))}var Te={0:{light:"light/priority-no-priority.svg",dark:"dark/priority-no-priority.svg"},1:{light:"light/priority-urgent.svg",dark:"dark/priority-urgent.svg"},2:{light:"light/priority-high.svg",dark:"dark/priority-high.svg"},3:{light:"light/priority-medium.svg",dark:"dark/priority-medium.svg"},4:{light:"light/priority-low.svg",dark:"dark/priority-low.svg"}};var qo=require("lodash");var lr={triage:{light:"light/triage.svg",dark:"dark/triage.svg"},backlog:{light:"light/backlog.svg",dark:"dark/backlog.svg"},unstarted:{light:"light/unstarted.svg",dark:"dark/unstarted.svg"},started:{light:"light/started.svg",dark:"dark/started.svg"},completed:{light:"light/completed.svg",dark:"dark/completed.svg"},canceled:{light:"light/canceled.svg",dark:"dark/canceled.svg"}};function oe(e){return{source:lr[e.type],tintColor:{light:e.color,dark:e.color,adjustContrast:!0}}}function Qe(e,t=["triage","backlog","unstarted","started","completed","canceled"]){if(e.length===0)return[];let i=(0,qo.groupBy)(e,s=>s.type);return t.filter(s=>!!i[s]).map(s=>i[s]).flat()}var Wo=require("@raycast/utils");function st(e,t){let{linearClient:i}=k(),{data:s,error:o,isLoading:c}=(0,Wo.useCachedPromise)(async n=>(await i.cycles({filter:{team:{id:{eq:n}}}})).nodes.sort((r,l)=>r.number-l.number),[e],{execute:t?.execute!==!1&&!!e});return{cycles:s,cyclesError:o,isLoadingCycles:!s&&!o||c}}var zo=require("@raycast/utils");var Qo=`
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
`;function dr(e,t){let i=e.type.toLowerCase()==="issue",s=!e.team||e.team.id===t;return i&&!e.archivedAt&&s}function ur(e,t){return(e.sortOrder??0)-(t.sortOrder??0)||e.name.localeCompare(t.name)}async function Bo(e){if(!e)return[];let{graphQLClient:t}=k(),{data:i}=await t.rawRequest(`
      query IssueTemplates($teamId: String!, $first: Int) {
        organization {
          templates(first: $first) {
            nodes {
              ${Qo}
            }
          }
        }
        team(id: $teamId) {
          templates(first: $first) {
            nodes {
              ${Qo}
            }
          }
        }
      }
    `,{teamId:e,first:100});return[...i?.organization?.templates?.nodes??[],...i?.team?.templates?.nodes??[]].filter((o,c,n)=>n.findIndex(a=>a.id===o.id)===c).filter(o=>dr(o,e)).sort(ur)}function Di(e,t){let{data:i,error:s,isLoading:o}=(0,zo.useCachedPromise)(Bo,[e],{execute:t?.execute!==!1&&!!e});return{issueTemplates:i,issueTemplatesError:s,isLoadingIssueTemplates:!i&&!s||o}}var Ho=require("@raycast/utils");var Go=require("@raycast/api");var mr=100,pr=100,gr=(0,Go.getPreferenceValues)();function fr(){let e=Number(gr.labelsLimit),t=Number.isFinite(e)&&e>0?e:pr,i=Math.floor(Math.min(mr,t)),s=Math.ceil(t/i);return{pageSize:i,pageLimit:s}}async function _o(e){if(!e)return[];let{pageSize:t,pageLimit:i}=fr(),{graphQLClient:s}=k();return ki(async o=>s.rawRequest(`
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
        `,{teamId:e,cursor:o}),o=>o.data?.team?.labels?.pageInfo,(o,c)=>o.concat(c.data?.team?.labels?.nodes??[]),[],i)}function rt(e,t){let{data:i,error:s,isLoading:o}=(0,Ho.useCachedPromise)(_o,[e],{execute:t?.execute!==!1&&!!e});return{labels:i,labelsError:s,isLoadingLabels:!i&&!s||o}}var Zo=require("@raycast/utils");function Me(e,t){let{linearClient:i}=k(),{data:s,error:o,isLoading:c}=(0,Zo.useCachedPromise)(async n=>(await i.workflowStates({filter:{team:{id:{eq:n}}}})).nodes.sort((r,l)=>r.position-l.position),[e],{initialData:[],execute:t?.execute!==!1});return{states:s,isLoadingStates:c,statesError:o}}var V=require("@raycast/api"),ys=require("date-fns");var Ko=require("@raycast/utils");function nt(e){let t=e.id,{data:i,error:s,isLoading:o,mutate:c}=(0,Ko.useCachedPromise)(vo,[t],{initialData:{...e,description:""}});return{issue:i,issueError:s,isLoadingIssue:o,mutateDetail:c}}var y=require("@raycast/api"),Ni=require("date-fns"),Is=require("react");var R=require("@raycast/api"),Xo=require("@raycast/utils"),Jo=require("nanoid"),at=require("react");var fe=require("react/jsx-runtime");function Ai({issue:e}){let{pop:t}=(0,R.useNavigation)(),{states:i}=Me(e.team.id),s=(0,at.useMemo)(()=>i.filter(f=>f.type==="unstarted")[0],[i]),{issue:o,isLoadingIssue:c}=nt(e),{data:n,isLoading:a,revalidate:r}=(0,Xo.useAI)(`Act as a product manager for Linear issues. Break down a Linear issue into a list of sub-issues. 
    
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

${o.description?`To give you more context and help in creating sub-issues, here's the Linear issue description:
"""
${o.description}
"""
`:""}

Break down the Linear issue with this title: "${o.title}"`,{execute:!!o&&!c,creativity:.5}),[l,d]=(0,at.useState)(!1),[S,$]=(0,at.useState)([]);(0,at.useEffect)(()=>{if(!(!n||a)){try{let m=/\[[\s\S]*?\]/,f=n.match(m);if(f&&f[0]){let ee=JSON.parse(f[0]);$(ee.map(T=>({...T,id:(0,Jo.nanoid)(),selected:!0})))}}catch(m){(0,R.showToast)({style:R.Toast.Style.Failure,title:"Failed to parse AI results",message:U(m),primaryAction:{title:"Retry",onAction:r},secondaryAction:{title:"Copy AI Result",onAction:()=>R.Clipboard.copy(n)}})}d(!0)}},[n,a]);async function h(){try{await(0,R.showToast)({style:R.Toast.Style.Animated,title:"Creating sub-issues"});let m=S.filter(f=>f.selected);await Promise.all(m.map(f=>Uo({teamId:o.team.id,title:f.title,description:f.description,parentId:o.id,stateId:s?.id}))),await(0,R.showToast)({style:R.Toast.Style.Success,title:"Created sub-issues"}),t()}catch(m){(0,R.showToast)({style:R.Toast.Style.Failure,title:"Failed to create Sub-Issues",message:U(m)})}}return(0,fe.jsxs)(R.List,{isLoading:a||!l,children:[S?.map(m=>(0,fe.jsx)(R.List.Item,{icon:m.selected?{source:R.Icon.CheckCircle,tintColor:R.Color.Green}:R.Icon.Circle,title:m.title,subtitle:m.description,actions:(0,fe.jsxs)(R.ActionPanel,{children:[(0,fe.jsx)(R.Action,{title:m.selected?"Unselect Sub-Issue":"Select Sub-Issue",icon:m.selected?R.Icon.Circle:{source:R.Icon.CheckCircle,tintColor:R.Color.Green},onAction:()=>$(S.map(f=>f.id===m.id?{...f,selected:!f.selected}:f))}),(0,fe.jsx)(R.Action,{title:"Create Sub-Issues",icon:R.Icon.Plus,onAction:()=>h()}),(0,fe.jsx)(R.Action,{title:"Generate New Sub-Issues",icon:R.Icon.ArrowClockwise,onAction:r})]})},m.title)),(0,fe.jsx)(R.List.EmptyView,{title:"No sub-issues were generated. Try again.",actions:(0,fe.jsx)(R.ActionPanel,{children:(0,fe.jsx)(R.Action,{title:"Retry",icon:R.Icon.ArrowClockwise,onAction:r})})})]})}var w=require("@raycast/api"),ct=require("@raycast/utils"),Vt=require("react");async function Yo(e,t){let{graphQLClient:i}=k(),s=[];if(t.teamId&&s.push(`teamId: "${t.teamId}"`),t.title&&s.push(`title: "${t.title.replace(/"/g,"\\$&")}"`),t.description&&s.push(`description: "${t.description.replace(/\n/g,"\\n").replace(/"/g,"\\$&")}"`),t.stateId&&s.push(`stateId: "${t.stateId}"`),typeof t.priority<"u"&&s.push(`priority: ${t.priority}`),typeof t.assigneeId<"u"&&s.push(`assigneeId: ${t.assigneeId?`"${t.assigneeId}"`:null}`),t.labelIds&&s.push(`labelIds: [${t.labelIds.map(c=>`"${c}"`).join(",")}]`),typeof t.estimate<"u"&&s.push(`estimate: ${t.estimate}`),typeof t.dueDate<"u"){let c=t.dueDate?t.dueDate instanceof Date?t.dueDate.toISOString():t.dueDate:null;s.push(`dueDate: ${c?`"${c}"`:null}`)}typeof t.cycleId<"u"&&s.push(`cycleId: ${t.cycleId?`"${t.cycleId}"`:null}`),typeof t.projectId<"u"&&s.push(`projectId: ${t.projectId?`"${t.projectId}"`:null}`),typeof t.projectMilestoneId<"u"&&s.push(`projectMilestoneId: ${t.projectMilestoneId?`"${t.projectMilestoneId}"`:null}`),typeof t.parentId<"u"&&s.push(`parentId: ${t.parentId?`"${t.parentId}"`:null}`);let{data:o}=await i.rawRequest(`
      mutation {
        issueUpdate(id: "${e}", input: {${s.join(", ")}}) {
          success
        }
      }
    `);return{success:o?.issueUpdate.success}}var v=require("react/jsx-runtime");function Li(e){let{pop:t}=(0,w.useNavigation)(),{issue:i,isLoadingIssue:s,mutateDetail:o}=nt(e.issue),[c,n]=(0,Vt.useState)(""),{teams:a,org:r,supportsTeamTypeahead:l,isLoadingTeams:d}=it(c),S=a&&a.length>1,[$,h]=(0,Vt.useState)(""),{users:m,supportsUserTypeahead:f,isLoadingUsers:ee}=De($),{handleSubmit:T,itemProps:I,values:M,setValue:N}=(0,ct.useForm)({async onSubmit(g){let ce=await(0,w.showToast)({style:w.Toast.Style.Animated,title:"Editing issue"});try{let Re={teamId:g.teamId||e.issue.team.id,title:g.title,description:g.description,stateId:g.stateId,labelIds:g.labelIds,dueDate:g.dueDate,...F&&g.estimate?{estimate:parseInt(g.estimate)}:{},...g.assigneeId?{assigneeId:g.assigneeId}:{},...g.cycleId?{cycleId:g.cycleId}:{},...g.projectId?{projectId:g.projectId}:{},...g.milestoneId?{projectMilestoneId:g.milestoneId}:{},...g.parentId?{parentId:g.parentId}:{},priority:parseInt(g.priority)},{success:Mt}=await Yo(i.id,Re);Mt&&(ce.style=w.Toast.Style.Success,ce.title=`Edited Issue \u2022 ${i.identifier}`,t(),o(),e.mutateList&&e.mutateList(),e.mutateSubIssues&&e.mutateSubIssues())}catch(Re){ce.style=w.Toast.Style.Failure,ce.title="Failed to edit issue",ce.message=U(Re)}},validation:{teamId:S?ct.FormValidation.Required:void 0,title:ct.FormValidation.Required,stateId:ct.FormValidation.Required,priority:ct.FormValidation.Required},initialValues:{teamId:e.issue.team.id,title:e.issue.title,description:i.description??void 0,priority:String(e.issue.priority),stateId:e.issue.state.id,estimate:e.issue.estimate?String(e.issue.estimate):void 0,assigneeId:e.issue.assignee?.id,labelIds:e.issue.labels.nodes.map(g=>g.id),dueDate:i.dueDate?new Date(i.dueDate):null,cycleId:e.issue.cycle?.id,projectId:e.issue.project?.id,milestoneId:e.issue.projectMilestone?.id,parentId:e.issue.parent?.id}});(0,Vt.useEffect)(()=>{N("description",i.description||""),N("dueDate",i.dueDate?new Date(i.dueDate):null)},[i]);let ve=!!M.teamId&&M.teamId.trim().length>0,{states:Xe}=Me(M.teamId,{execute:ve}),{labels:ne}=rt(M.teamId,{execute:ve}),{cycles:be}=st(M.teamId,{execute:ve}),{issues:Oe}=ge(Ct,[],{execute:ve}),{projects:$e}=le(M.teamId,{execute:ve}),{milestones:C}=je(M.projectId,{execute:!!M.projectId}),j=a?.find(g=>g.id===M.teamId),F=j?wt({issueEstimationType:j.issueEstimationType,issueEstimationAllowZero:j.issueEstimationAllowZero,issueEstimationExtended:j.issueEstimationExtended}):null,ae=Qe(Xe||[]),Je=Xe&&Xe.length>0,gt=e.priorities&&e.priorities.length>0,ft=ne&&ne.length>0,se=be&&be.length>0,Q=$e&&$e.length>0,Y=C&&C.length>0,_t=Oe&&Oe.length>0;return(0,v.jsxs)(w.Form,{actions:(0,v.jsx)(w.ActionPanel,{children:(0,v.jsx)(w.Action.SubmitForm,{onSubmit:T,title:"Edit Issue"})}),isLoading:d||s||ee,children:[(l||S)&&(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(w.Form.Dropdown,{title:"Team",...I.teamId,...l&&{onSearchTextChange:n,isLoading:d,throttle:!0},children:a?.map(g=>(0,v.jsx)(w.Form.Dropdown.Item,{title:g.name,value:g.id,icon:kt(g,r)},g.id))}),(0,v.jsx)(w.Form.Separator,{})]}),(0,v.jsx)(w.Form.TextField,{title:"Title",placeholder:"Issue title",autoFocus:!0,...I.title}),(0,v.jsx)(w.Form.TextArea,{title:"Description",placeholder:"Add some details (supports Markdown, e.g. **bold**)",...I.description}),(0,v.jsx)(w.Form.Dropdown,{title:"Status",...I.stateId,children:Je?ae.map(g=>(0,v.jsx)(w.Form.Dropdown.Item,{title:g.name,value:g.id,icon:oe(g)},g.id)):null}),(0,v.jsx)(w.Form.Dropdown,{title:"Priority",...I.priority,children:gt?e.priorities?.map(({priority:g,label:ce})=>(0,v.jsx)(w.Form.Dropdown.Item,{title:ce,value:String(g),icon:{source:Te[g]}},g)):null}),(0,v.jsxs)(w.Form.Dropdown,{title:"Assignee",...I.assigneeId,...f&&{onSearchTextChange:h,isLoading:ee,throttle:!0},children:[(0,v.jsx)(w.Form.Dropdown.Item,{title:"Unassigned",value:"",icon:w.Icon.Person}),m?.map(g=>(0,v.jsx)(w.Form.Dropdown.Item,{title:g.name,value:g.id,icon:G(g)},g.id))]}),(0,v.jsx)(w.Form.TagPicker,{title:"Labels",...I.labelIds,placeholder:"Add label",children:ft?ne.map(({id:g,name:ce,color:Re})=>(0,v.jsx)(w.Form.TagPicker.Item,{title:ce,value:g,icon:{source:w.Icon.Dot,tintColor:Re}},g)):null}),F?(0,v.jsxs)(w.Form.Dropdown,{title:"Estimate",...I.estimate,children:[(0,v.jsx)(w.Form.Dropdown.Item,{title:"No estimate",value:"",icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}}),F.map(({estimate:g,label:ce})=>(0,v.jsx)(w.Form.Dropdown.Item,{title:ce,value:String(g),icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}},g))]}):null,(0,v.jsx)(w.Form.DatePicker,{title:"Due Date",type:w.Form.DatePicker.Type.Date,...I.dueDate}),se||Q||_t?(0,v.jsx)(w.Form.Separator,{}):null,se?(0,v.jsxs)(w.Form.Dropdown,{title:"Cycle",...I.cycleId,children:[(0,v.jsx)(w.Form.Dropdown.Item,{title:"No Cycle",value:"",icon:{source:{light:"light/no-cycle.svg",dark:"dark/no-cycle.svg"}}}),We(be).map(g=>(0,v.jsx)(w.Form.Dropdown.Item,{title:g.title,value:g.id,icon:{source:g.icon}},g.id))]}):null,Q?(0,v.jsxs)(w.Form.Dropdown,{title:"Project",...I.projectId,children:[(0,v.jsx)(w.Form.Dropdown.Item,{title:"No Project",value:"",icon:{source:{light:"light/no-project.svg",dark:"dark/no-project.svg"}}}),$e.map(g=>(0,v.jsx)(w.Form.Dropdown.Item,{title:`${g.name} (${g.status.name})`,value:g.id,icon:Z(g)},g.id))]}):null,Y?(0,v.jsxs)(w.Form.Dropdown,{title:"Milestone",storeValue:!0,...I.milestoneId,children:[(0,v.jsx)(w.Form.Dropdown.Item,{title:"No Milestone",value:"",icon:{source:"linear-icons/no-milestone.svg"}}),C.map(g=>(0,v.jsx)(w.Form.Dropdown.Item,{title:`${g.name}  (${g.targetDate||"No Target Date"})`,value:g.id,icon:Ae(g)},g.id))]}):null,_t?(0,v.jsxs)(w.Form.Dropdown,{title:"Parent",...I.parentId,children:[(0,v.jsx)(w.Form.Dropdown.Item,{title:"No Issue",value:"",icon:{source:{light:"light/backlog.svg",dark:"dark/backlog.svg"}}}),Oe.map(g=>(0,v.jsx)(w.Form.Dropdown.Item,{title:`${g.identifier} - ${g.title}`,value:g.id,icon:oe(g.state)},g.id))]}):null]})}var Ie=require("@raycast/api"),ts=require("date-fns");var B=require("@raycast/api"),es=require("@raycast/utils");var Be=require("react/jsx-runtime");function oi({issue:{id:e,title:t,identifier:i}}){let{pop:s}=(0,B.useNavigation)(),{reset:o,itemProps:c,handleSubmit:n}=(0,es.useForm)({onSubmit:async a=>{let r=await(0,B.showToast)({style:B.Toast.Style.Animated,title:"Attaching links"}),l=ii(a.links);if(l.length===0&&a.attachments.length===0){r.style=B.Toast.Style.Failure,r.title="No links or attachments provided";return}if(l.length>0){let d=l.length===1?"link":"links";try{await Promise.all(l.map(S=>ei({issueId:e,url:S}))),r.style=B.Toast.Style.Success,r.title=`Successfully attached ${d}`}catch(S){r.style=B.Toast.Style.Failure,r.title=`Failed attaching ${d}`,r.message=U(S)}}if(a.attachments.length>0){let d=a.attachments.length===1?"attachment":"attachments";try{r.style=B.Toast.Style.Animated,r.title=`Uploading ${d}\u2026`,await Promise.all(a.attachments.map(S=>Yt({issueId:e,url:S}))),r.style=B.Toast.Style.Success,r.title=`Successfully uploaded ${d}`}catch(S){r.style=B.Toast.Style.Failure,r.title=`Failed uploading ${d}`,r.message=U(S)}}o({attachments:[],links:""}),s()},initialValues:{links:""}});return(0,Be.jsxs)(B.Form,{actions:(0,Be.jsx)(B.ActionPanel,{children:(0,Be.jsx)(B.Action.SubmitForm,{onSubmit:n,icon:B.Icon.NewDocument,title:"Attach"})}),navigationTitle:"Add Attachments and Links",children:[(0,Be.jsx)(B.Form.Description,{title:"Issue",text:`[${i}] ${t}`}),(0,Be.jsx)(B.Form.FilePicker,{title:"Attachment",...c.attachments}),(0,Be.jsx)(B.Form.TextArea,{title:"Links",placeholder:`https://a.com
https://b.com
New link(s) on separate line(s)`,...c.links})]})}var ze=require("react/jsx-runtime");function Ti({attachments:e,issue:t}){return(0,ze.jsx)(Ie.List,{navigationTitle:`Links for ${t.identifier}`,children:e.map(i=>{let s=new Date(i.updatedAt);return(0,ze.jsx)(Ie.List.Item,{icon:i.source?.imageUrl??Ie.Icon.Link,title:i.title,subtitle:i.subtitle,accessories:[{date:s,tooltip:`Updated: ${(0,ts.format)(s,"EEEE d MMMM yyyy 'at' HH:mm")}`}],actions:(0,ze.jsxs)(Ie.ActionPanel,{children:[(0,ze.jsx)(Ie.Action.OpenInBrowser,{url:i.url}),(0,ze.jsx)(Ie.Action.Push,{title:"Add Attachments and Links",icon:Ie.Icon.NewDocument,target:(0,ze.jsx)(oi,{issue:t})})]})},i.id)})})}var X=require("@raycast/api"),is=require("react");var qt=require("react/jsx-runtime");function lt({comment:e,issue:t,mutateComments:i}){let{linearClient:s}=k(),{pop:o}=(0,X.useNavigation)(),[c,n]=(0,is.useState)(e?e.body:"");async function a(){await(0,X.showToast)({style:X.Toast.Style.Animated,title:`${e?"Updating":"Adding"} comment`});try{e?await s.updateComment(e.id,{body:c}):await s.createComment({body:c,issueId:t.id}),await(0,X.showToast)({style:X.Toast.Style.Success,title:`${e?"Updated":"Added"} comment`}),o(),i&&i()}catch(r){(0,X.showToast)({style:X.Toast.Style.Failure,title:`Failed to ${e?"update":"add"} comment`,message:U(r)})}}return(0,qt.jsx)(X.Form,{actions:(0,qt.jsx)(X.ActionPanel,{children:(0,qt.jsx)(X.Action.SubmitForm,{title:e?"Edit Comment":"Add Comment",onSubmit:a,icon:e?X.Icon.Pencil:X.Icon.Plus})}),children:(0,qt.jsx)(X.Form.TextArea,{id:"comment",title:"Comment",placeholder:"Leave a comment",value:c,onChange:n})})}var b=require("@raycast/api"),ss=require("date-fns"),rs=yt(require("remove-markdown"));var os=require("@raycast/utils");function vi(e){let{data:t,error:i,isLoading:s,mutate:o}=(0,os.useCachedPromise)(To,[e]);return{comments:t,commentsError:i,isLoadingComments:s,mutateComments:o}}var z=require("react/jsx-runtime");function $i({issue:e}){let{linearClient:t}=k(),{me:i,isLoadingMe:s}=tt(),{comments:o,isLoadingComments:c,mutateComments:n}=vi(e.id);async function a(r){if(await(0,b.confirmAlert)({title:"Delete Comment",message:"Are you sure you want to delete this comment?",icon:{source:b.Icon.Trash,tintColor:b.Color.Red}}))try{await(0,b.showToast)({style:b.Toast.Style.Animated,title:"Deleting comment"}),await n(t.deleteComment(r),{optimisticUpdate(l){return l&&l?.filter(d=>d.id!==r)}}),await(0,b.showToast)({style:b.Toast.Style.Success,title:"Deleted comment"})}catch(l){(0,b.showToast)({style:b.Toast.Style.Failure,title:"Failed to delete comment",message:U(l)})}}return(0,z.jsxs)(b.List,{isLoading:c||s,navigationTitle:`${e.identifier} \u2022 Comments`,searchBarPlaceholder:"Filter by user or comment content",isShowingDetail:!0,children:[(0,z.jsx)(b.List.EmptyView,{title:"No comments",description:"This issue doesn't have any comments.",actions:(0,z.jsx)(b.ActionPanel,{children:(0,z.jsx)(b.Action.Push,{title:"Add Comment",icon:b.Icon.Plus,target:(0,z.jsx)(lt,{issue:e,mutateComments:n})})})}),o?.map(r=>{let l=new Date(r.createdAt);return(0,z.jsx)(b.List.Item,{title:r.user.displayName,subtitle:r.body,icon:G(r.user),keywords:(0,rs.default)(r.body).replace(/\n/g," ").split(" "),accessories:[{date:l,tooltip:`Created: ${(0,ss.format)(l,"EEEE d MMMM yyyy 'at' HH:mm")}`}],detail:(0,z.jsx)(b.List.Item.Detail,{markdown:r.body}),actions:(0,z.jsxs)(b.ActionPanel,{children:[(0,z.jsx)(ie,{title:"Open Comment",url:r.url}),i?.id===r.user.id?(0,z.jsxs)(b.ActionPanel.Section,{children:[(0,z.jsx)(b.Action.Push,{title:"Edit Comment",icon:b.Icon.Pencil,shortcut:b.Keyboard.Shortcut.Common.Edit,target:(0,z.jsx)(lt,{issue:e,comment:r,mutateComments:n})}),(0,z.jsx)(b.Action,{title:"Delete Comment",icon:b.Icon.Trash,style:b.Action.Style.Destructive,shortcut:b.Keyboard.Shortcut.Common.Remove,onAction:()=>a(r.id)})]}):null,(0,z.jsx)(b.ActionPanel.Section,{children:(0,z.jsx)(b.Action.Push,{title:"Add Comment",icon:b.Icon.Plus,shortcut:{macOS:{modifiers:["cmd","shift"],key:"n"},Windows:{modifiers:["ctrl","shift"],key:"n"}},target:(0,z.jsx)(lt,{issue:e,mutateComments:n})})}),(0,z.jsxs)(b.ActionPanel.Section,{children:[(0,z.jsx)(b.Action.CopyToClipboard,{icon:b.Icon.Clipboard,content:r.url,title:"Copy Comment URL",shortcut:b.Keyboard.Shortcut.Common.CopyPath}),(0,z.jsx)(b.Action.CopyToClipboard,{icon:b.Icon.Clipboard,content:r.body,title:"Copy Comment",shortcut:{macOS:{modifiers:["cmd","shift"],key:"'"},Windows:{modifiers:["ctrl","shift"],key:"'"}}})]}),(0,z.jsx)(b.ActionPanel.Section,{children:(0,z.jsx)(b.Action,{title:"Refresh",icon:b.Icon.ArrowClockwise,shortcut:b.Keyboard.Shortcut.Common.Refresh,onAction:n})})]})},r.id)})]})}var dt=require("@raycast/api");var ye=require("@raycast/api"),si=require("date-fns");var Ge=require("react/jsx-runtime");function Wt({issue:e,mutateList:t,mutateSubIssues:i,priorities:s,me:o}){let{primaryAction:c}=(0,ye.getPreferenceValues)(),n=[e.identifier,e.state.name,e.priorityLabel];e.assignee&&n.push(e.assignee.email,e.assignee.displayName);let a=new Date(e.updatedAt),r=e.dueDate?new Date(e.dueDate):null,l=e.estimate?{icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}},text:ti({estimate:e.estimate,issueEstimationType:e.team.issueEstimationType})}:null,d=e.cycle?ot(e.cycle):null,S=e.project||null,$=e.labels.nodes.length>0,h=[{date:a,tooltip:`Updated: ${(0,si.format)(a,"EEEE d MMMM yyyy 'at' HH:mm")}`},{icon:r?Pt(r):void 0,text:r?(0,si.format)(r,"MMM dd"):void 0,tooltip:r?`Due date: ${(0,si.format)(r,"MM/dd/yyyy")}`:void 0},{icon:$?ye.Icon.Tag:void 0,text:$?String(e.labels.nodes.length):void 0,tooltip:$?e.labels.nodes.map(f=>f.name).join(", "):void 0},{icon:S?Z(S):void 0,tooltip:`Project: ${S?S.name:void 0}`},{icon:d?{source:d.icon}:void 0,text:d?String(d.number):void 0,tooltip:d?`Cycle: ${d.title}`:void 0},{icon:l?l.icon:void 0,text:l?l.text:void 0},{icon:oe(e.state),tooltip:`Status: ${e.state.name}`},{icon:G(e.assignee),tooltip:e.assignee?`Assignee: ${e.assignee?.displayName} (${e.assignee?.email})`:"Unassigned"}],m=c==="openInLinear";return(0,Ge.jsx)(ye.List.Item,{title:e.title,icon:{value:{source:Te[e.priority]},tooltip:`Priority: ${e.priorityLabel}`},subtitle:e.identifier,keywords:n,accessories:h,actions:(0,Ge.jsxs)(ye.ActionPanel,{title:e.identifier,children:[m?(0,Ge.jsx)(ie,{title:"Open Issue",url:e.url}):null,(0,Ge.jsx)(ye.Action.Push,{title:"Show Details",icon:ye.Icon.Sidebar,target:(0,Ge.jsx)(Qt,{issue:e,mutateList:t,priorities:s,me:o})}),(0,Ge.jsx)(bt,{issue:e,mutateList:t,mutateSubIssues:i,priorities:s,me:o,hideOpenInLinear:m})]})},e.id)}var _e=require("react/jsx-runtime");function Ri({issue:e,mutateList:t}){let{issues:i,isLoadingIssues:s,mutateList:o}=ge(l=>Ao(l),[e.id]),{priorities:c,isLoadingPriorities:n}=Ft(),{me:a,isLoadingMe:r}=tt();return(0,_e.jsxs)(dt.List,{isLoading:s||r||n||r,navigationTitle:`${e.identifier} \u2022 Sub-issues`,children:[(0,_e.jsx)(dt.List.EmptyView,{title:"No issues",description:"This issue doesn't have any sub-issues.",actions:(0,_e.jsx)(dt.ActionPanel,{children:(0,_e.jsx)(dt.Action.Push,{title:"Create Sub-Issue",target:(0,_e.jsx)(Bt,{priorities:c,me:a,parentId:e.id,projectId:e.project?.id,cycleId:e.cycle?.id,teamId:e.team.id})})})}),i?.map(l=>(0,_e.jsx)(Wt,{issue:l,mutateList:t,mutateSubIssues:o,priorities:c,me:a},l.id))]})}var O=require("@raycast/api");function as(e){let t=[`Work on Linear issue ${e.identifier}:`,""],i=yr(e.branchName);if(i&&t.push(`Suggested branch name: ${i}`,""),t.push(`<issue identifier="${ri(e.identifier)}">`),t.push(`<title>${e.title}</title>`),t.push(...cs(e.description)),e.team?.name&&t.push(`<team name="${ri(e.team.name)}"/>`),e.labels?.nodes?.forEach(o=>{t.push(`<label>${o.name}</label>`)}),e.project?.name){let o=ri(e.project.name);t.push(e.project.description?`<project name="${o}">${e.project.description}</project>`:`<project name="${o}"/>`)}e.parent&&t.push(...ns("parent-issue",e.parent));let s=e.children?.nodes??[];return s.length>0&&(t.push("<sub-issues>"),s.forEach(o=>t.push(...ns("sub-issue",o))),t.push("</sub-issues>")),t.push("</issue>"),t.join(`
`)}function ns(e,t){return[`<${e} identifier="${ri(t.identifier)}">`,`<id>${t.id}</id>`,`<title>${t.title}</title>`,...cs(t.description),`</${e}>`]}function cs(e){return e?e.includes(`
`)?["<description>",e,"</description>"]:[`<description>${e}</description>`]:[]}function yr(e){return e&&e.slice(e.lastIndexOf("/")+1)}function ri(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}var he=require("react/jsx-runtime"),hr={ISSUE_TITLE:"title",ISSUE_ID:"identifier",ISSUE_URL:"url",ISSUE_BRANCH_NAME:"branchName"};function Pr(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;")}function kr(e){return e.replace(/\[/g,"\\[").replace(/\]/g,"\\]")}function Sr(e){return{html:`<a href="${e.url}">${Pr(e.title)}</a>`,text:`[${kr(e.title)}](${e.url})`}}function ji({issue:e}){let{issueCustomCopyAction:t}=(0,O.getPreferenceValues)();async function i(){let s=await(0,O.showToast)({style:O.Toast.Style.Animated,title:"Copying prompt"});try{await O.Clipboard.copy(as(await Lo(e.id))),s.style=O.Toast.Style.Success,s.title="Copied prompt to clipboard"}catch(o){s.style=O.Toast.Style.Failure,s.title="Failed copying prompt",s.message=U(o)}}return(0,he.jsxs)(O.ActionPanel.Section,{children:[(0,he.jsx)(O.Action.CopyToClipboard,{content:e.identifier,title:"Copy Issue ID",shortcut:{macOS:{modifiers:["cmd"],key:"."},Windows:{modifiers:["ctrl"],key:"."}}}),(0,he.jsx)(O.Action.CopyToClipboard,{content:{html:`<a href="${e.url}" title="${e.title}">${e.identifier}: ${e.title}</a>`,text:e.url},title:"Copy Formatted Issue URL",shortcut:O.Keyboard.Shortcut.Common.CopyPath}),(0,he.jsx)(O.Action.CopyToClipboard,{content:e.url,title:"Copy Issue URL",shortcut:{macOS:{modifiers:["cmd","shift"],key:"u"},Windows:{modifiers:["ctrl","shift"],key:"u"}}}),(0,he.jsx)(O.Action.CopyToClipboard,{content:e.title,title:"Copy Issue Title",shortcut:{macOS:{modifiers:["cmd","shift"],key:"'"},Windows:{modifiers:["ctrl","shift"],key:"'"}}}),(0,he.jsx)(O.Action.CopyToClipboard,{content:Sr(e),title:"Copy Title as Link",shortcut:{macOS:{modifiers:["cmd","shift"],key:"t"},Windows:{modifiers:["ctrl","shift"],key:"t"}}}),(0,he.jsx)(O.Action.CopyToClipboard,{content:e.branchName,title:"Copy Git Branch Name",shortcut:O.Keyboard.Shortcut.Common.CopyName}),t&&t!==""?(0,he.jsx)(O.Action.CopyToClipboard,{content:t?.replace(/\{(.*?)\}/g,(s,o)=>{let c=e[hr[o]];return c||s}),title:"Custom Copy",shortcut:{macOS:{modifiers:["cmd","opt"],key:"."},Windows:{modifiers:["ctrl","alt"],key:"."}}}):null,(0,he.jsx)(O.Action,{icon:O.Icon.Clipboard,title:"Copy as Prompt",onAction:i,shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"p"},Windows:{modifiers:["ctrl","alt","shift"],key:"p"}}})]})}var Pe=require("@raycast/api"),ls=require("react");var ke=require("react/jsx-runtime");function xi({issue:e,updateIssue:t}){let{linearClient:i}=k(),[s,o]=(0,ls.useState)(!1),{cycles:c,isLoadingCycles:n}=st(e.team.id,{execute:s}),a=e.cycle?ot(e.cycle):null,r=a?.isActive||!1,l=a?.isNext||!1;async function d(h){let m=e.cycle;t({animatedTitle:"Moving to cycle",payload:{cycleId:h?.id||null},optimisticUpdate(f){return{...f,cycle:h||void 0}},rollbackUpdate(f){return{...f,cycle:m}},successTitle:h?"Moved to cycle":"Removed from cycle",successMessage:h?.title?h.title:"",errorTitle:"Failed to move to cycle"})}async function S(){let{nodes:h}=await i.cycles({filter:{team:{id:{eq:e.team.id}}}}),m=We(h||[]),f=m.findIndex(I=>I.isActive),T=(f>-1?m[f]:null)?m[f+1]:null;if(T)return d(T)}async function $(){let{nodes:h}=await i.cycles({filter:{team:{id:{eq:e.team.id}}}}),f=We(h||[]).find(ee=>ee.isActive);if(f)return d(f)}return(0,ke.jsxs)(ke.Fragment,{children:[(0,ke.jsxs)(Pe.ActionPanel.Submenu,{title:"Move to Cycle",icon:{source:{light:"light/cycle.svg",dark:"dark/cycle.svg"}},shortcut:Pe.Keyboard.Shortcut.Common.Copy,onOpen:()=>o(!0),children:[(0,ke.jsx)(Pe.Action,{title:"No Cycle",icon:{source:{light:"light/no-cycle.svg",dark:"dark/no-cycle.svg"}},onAction:()=>d(null)}),!c&&n?(0,ke.jsx)(Pe.Action,{title:"Loading\u2026"}):We(c||[]).map(h=>(0,ke.jsx)(Pe.Action,{autoFocus:h.id===a?.id,title:h.title,icon:{source:h.icon},onAction:()=>d(h)},h.id))]}),r?null:(0,ke.jsx)(Pe.Action,{title:"Move to Active Cycle",icon:{source:{light:"light/active-cycle.svg",dark:"dark/active-cycle.svg"}},shortcut:Pe.Keyboard.Shortcut.Common.Copy,onAction:()=>$()}),l?null:(0,ke.jsx)(Pe.Action,{title:"Move to Next Cycle",icon:{source:{light:"light/cycle.svg",dark:"dark/cycle.svg"}},shortcut:{macOS:{modifiers:["cmd","shift"],key:"n"},Windows:{modifiers:["ctrl","shift"],key:"n"}},onAction:()=>S()})]})}var Se=require("@raycast/api"),ds=require("lodash"),us=require("react");var Ue=require("react/jsx-runtime");function Mi({issue:e,updateIssue:t}){let[i,s]=(0,us.useState)(!1),{labels:o}=rt(e.team.id,{execute:i}),[,c]=(0,ds.partition)(o||[],r=>e.labels.nodes.map(l=>l.id).includes(r.id));async function n(r){let l=e.labels.nodes.map(d=>d.id);t({animatedTitle:"Adding label",payload:{labelIds:[...l,r.id]},optimisticUpdate(d){return{...d,labels:{...d.labels,nodes:[...d.labels.nodes,r]}}},rollbackUpdate(d){return{...d,labels:{...d.labels,nodes:d.labels.nodes.filter(S=>S.id!==r.id)}}},successTitle:"Added label",successMessage:`Label "${r.name}" added to ${e.identifier}`,errorTitle:"Failed to add label"})}async function a(r){let l=e.labels.nodes.map(d=>d.id);t({animatedTitle:"Remove label",payload:{labelIds:l.filter(d=>d!==r.id)},optimisticUpdate(d){return{...d,labels:{...d.labels,nodes:d.labels.nodes.filter(S=>S.id!==r.id)}}},rollbackUpdate(d){return{...d,labels:{...d.labels,nodes:[...d.labels.nodes,r]}}},successTitle:"Removed label",successMessage:`Label "${r.name}" removed from ${e.identifier}`,errorTitle:"Failed to remove label"})}return(0,Ue.jsxs)(Ue.Fragment,{children:[(0,Ue.jsx)(Se.ActionPanel.Submenu,{title:"Add Label",icon:Se.Icon.Tag,shortcut:{macOS:{modifiers:["cmd","shift"],key:"l"},Windows:{modifiers:["ctrl","shift"],key:"l"}},onOpen:()=>s(!0),children:c.map(r=>(0,Ue.jsx)(Se.Action,{title:r.name,icon:{source:Se.Icon.Dot,tintColor:r.color},onAction:()=>n(r)},r.id))}),e.labels.nodes.length>0?(0,Ue.jsx)(Se.ActionPanel.Submenu,{title:"Remove Label",icon:Se.Icon.Tag,shortcut:{macOS:{modifiers:["cmd","shift"],key:"l"},Windows:{modifiers:["ctrl","shift"],key:"l"}},children:e.labels.nodes.map(r=>(0,Ue.jsx)(Se.Action,{title:r.name,icon:{source:Se.Icon.Dot,tintColor:r.color},onAction:()=>a(r)},r.id))}):null]})}var He=require("@raycast/api"),ms=require("react");var Dt=require("react/jsx-runtime");function Ui({issue:e,updateIssue:t}){let[i,s]=(0,ms.useState)(!1),{milestones:o,isLoadingMilestones:c}=je(e.project?.id,{execute:i});async function n(a){let r=e.projectMilestone;t({animatedTitle:"Setting milestone",payload:{projectMilestoneId:a?a.id:null},optimisticUpdate(l){return{...l,milestone:a||void 0}},rollbackUpdate(l){return{...l,milestone:r}},successTitle:a?"Set milestone":`Removed milestone from ${e.identifier}`,successMessage:a?`"${a.name}" added to ${e.identifier}`:"",errorTitle:"Failed to set milestone"})}return(0,Dt.jsxs)(He.ActionPanel.Submenu,{title:"Set Milestone",icon:{source:"linear-icons/milestone.svg",tintColor:He.Color.PrimaryText},shortcut:{modifiers:["ctrl","shift"],key:"m"},onOpen:()=>s(!0),children:[(0,Dt.jsx)(He.Action,{title:"No Milestone",icon:{source:"linear-icons/no-milestone.svg"},onAction:()=>n(null)}),!o&&c?(0,Dt.jsx)(He.Action,{title:"Loading\u2026"}):(o||[]).map(a=>(0,Dt.jsx)(He.Action,{autoFocus:a.id===e.projectMilestone?.id,title:`${a.name}  (${a.targetDate||"No Target Date"})`,icon:Ae(a),onAction:()=>n(a)},a.id))]})}var At=require("@raycast/api"),ps=require("react");var Fe=require("react/jsx-runtime");function Fi({issue:e,updateIssue:t}){let[i,s]=(0,ps.useState)(!1),{issues:o,isLoadingIssues:c}=ge(Ct,[],{execute:i}),n=e.parent,a=n?.id,r=!!a;async function l(d){t({animatedTitle:"Setting parent issue",payload:{parentId:d?d.id:null},optimisticUpdate(S){return{...S,parent:d||void 0}},rollbackUpdate(S){return{...S,parent:n}},successTitle:"Set parent issue",successMessage:d?`${d.identifier} set as parent issue`:`Removed parent issue from ${e.identifier}`,errorTitle:"Failed to set parent issue"})}return(0,Fe.jsxs)(Fe.Fragment,{children:[(0,Fe.jsx)(At.ActionPanel.Submenu,{title:r?"Change Parent Issue":"Set Parent Issue",icon:{source:{light:"light/parent-issue.svg",dark:"dark/parent-issue.svg"}},shortcut:{modifiers:["ctrl","shift"],key:"i"},onOpen:()=>s(!0),children:!o&&c?(0,Fe.jsx)(At.Action,{title:"Loading\u2026"}):(o||[]).map(d=>(0,Fe.jsx)(At.Action,{autoFocus:d.id===a,title:`${d.identifier} - ${d.title}`,icon:oe(d.state),onAction:()=>l(d)},d.id))}),r?(0,Fe.jsx)(At.Action,{title:"Remove Parent Issue",icon:{source:{light:"light/parent-issue.svg",dark:"dark/parent-issue.svg"}},shortcut:{macOS:{modifiers:["cmd","shift"],key:"k"},Windows:{modifiers:["ctrl","shift"],key:"k"}},onAction:()=>l(null)}):null]})}var Lt=require("@raycast/api"),gs=require("react");var Tt=require("react/jsx-runtime");function Ei({issue:e,updateIssue:t}){let[i,s]=(0,gs.useState)(!1),{projects:o,isLoadingProjects:c}=le(e.team.id,{execute:i});async function n(a){let r=e.project;t({animatedTitle:"Setting project",payload:{projectId:a?a.id:null},optimisticUpdate(l){return{...l,project:a||void 0}},rollbackUpdate(l){return{...l,project:r}},successTitle:a?"Set project":`Removed project from ${e.identifier}`,successMessage:a?`"${a.name}" added to ${e.identifier}`:"",errorTitle:"Failed to set project"})}return(0,Tt.jsxs)(Lt.ActionPanel.Submenu,{title:"Set Project",icon:{source:{light:"light/project.svg",dark:"dark/project.svg"}},shortcut:{modifiers:["ctrl","shift"],key:"p"},onOpen:()=>s(!0),children:[(0,Tt.jsx)(Lt.Action,{title:"No Project",icon:{source:{light:"light/no-project.svg",dark:"dark/no-project.svg"}},onAction:()=>n(null)}),!o&&c?(0,Tt.jsx)(Lt.Action,{title:"Loading\u2026"}):(o||[]).map(a=>(0,Tt.jsx)(Lt.Action,{autoFocus:a.id===e.project?.id,title:`${a.name} (${a.status.name})`,icon:Z(a),onAction:()=>n(a)},a.id))]})}var ut=require("@raycast/api"),fs=require("react");var ni=require("react/jsx-runtime");function Oi({issue:e,updateIssue:t}){let[i,s]=(0,fs.useState)(!1),{states:o,isLoadingStates:c}=Me(e.team.id,{execute:i}),n=Qe(o||[]);async function a(r){let l=e.state;t({animatedTitle:"Setting status",payload:{stateId:r.id},optimisticUpdate(d){return{...d,state:r}},rollbackUpdate(d){return{...d,state:l}},successTitle:"Set status",successMessage:`${e.identifier} set to ${r.name}`,errorTitle:"Failed to set status"})}return(0,ni.jsx)(ut.ActionPanel.Submenu,{icon:ut.Icon.Circle,title:"Set Status",shortcut:{macOS:{modifiers:["cmd","shift"],key:"s"},Windows:{modifiers:["ctrl","shift"],key:"s"}},onOpen:()=>s(!0),children:n.length===0&&c?(0,ni.jsx)(ut.Action,{title:"Loading\u2026"}):n.map(r=>(0,ni.jsx)(ut.Action,{autoFocus:r.id===e.state.id,title:r.name,icon:oe(r),onAction:()=>a(r)},r.id))})}var L=require("react/jsx-runtime");function bt({issue:e,mutateList:t,mutateSubIssues:i,mutateDetail:s,showAttachmentsAction:o,attachments:c,priorities:n,me:a,hideOpenInLinear:r}){let{pop:l}=(0,y.useNavigation)(),{linearClient:d}=k(),S=e.assignee?.id===a?.id,$=wt({issueEstimationType:e.team.issueEstimationType,issueEstimationAllowZero:e.team.issueEstimationAllowZero,issueEstimationExtended:e.team.issueEstimationExtended});async function h({animatedTitle:C,payload:j,optimisticUpdate:F,rollbackUpdate:ae,successTitle:Je,successMessage:gt,errorTitle:ft}){try{await(0,y.showToast)({style:y.Toast.Style.Animated,title:C});let se=d.updateIssue(e.id,j);await Promise.all([se,t?t(se,{optimisticUpdate(Q){if(Q)return Q.map(Y=>Y.id===e.id?F(Y):Y)},rollbackOnError(Q){if(Q)return Q.map(Y=>Y.id===e.id?ae(Y):Y)}}):Promise.resolve(),i?i(se,{optimisticUpdate(Q){if(Q)return Q.map(Y=>Y.id===e.id?F(Y):Y)},rollbackOnError(Q){if(Q)return Q.map(Y=>Y.id===e.id?ae(Y):Y)}}):Promise.resolve(),s?s(se,{optimisticUpdate(Q){return F(Q)},rollbackOnError(Q){return ae(Q)}}):Promise.resolve()]),await(0,y.showToast)({style:y.Toast.Style.Success,title:Je,message:gt})}catch(se){await(0,y.showToast)({style:y.Toast.Style.Failure,title:ft,message:U(se)})}}async function m(){if(await(0,y.confirmAlert)({title:"Delete Issue",message:"Are you sure you want to delete the selected issue?",icon:{source:y.Icon.Trash,tintColor:y.Color.Red}}))try{await(0,y.showToast)({style:y.Toast.Style.Animated,title:"Deleting issue"});let C=d.deleteIssue(e.id);s&&l(),await Promise.all([C,t?t(C,{optimisticUpdate(j){if(j)return j.filter(F=>F.id!==e.id)}}):Promise.resolve(),i?i(C,{optimisticUpdate(j){if(j)return j.filter(F=>F.id!==e.id)}}):Promise.resolve()]),await(0,y.showToast)({style:y.Toast.Style.Success,title:"Issue deleted",message:`"${e.title}" is deleted`})}catch(C){await(0,y.showToast)({style:y.Toast.Style.Failure,title:"Failed to delete issue",message:U(C)})}}async function f(C){let j=e.priority;h({animatedTitle:"Setting priority",payload:{priority:C.priority},optimisticUpdate(F){return{...F,priority:C.priority}},rollbackUpdate(F){return{...F,priority:j}},successTitle:"Set priority",successMessage:`${e.identifier} priority set to ${C.label}`,errorTitle:"Failed to set priority"})}async function ee(C){let j=e.assignee;h({animatedTitle:"Setting assignee",payload:{assigneeId:C.id},optimisticUpdate(F){return{...F,assignee:C}},rollbackUpdate(F){return{...F,assignee:j}},successTitle:"Set assignee",successMessage:`${e.identifier} assigned to ${C.displayName}`,errorTitle:"Failed to set assignee"})}async function T(C){let j=e.assignee;h({animatedTitle:"Setting assignee",payload:{assigneeId:C?C.id:null},optimisticUpdate(F){return{...F,assignee:C||void 0}},rollbackUpdate(F){return{...F,assignee:j}},successTitle:"Set assignee",successMessage:`${e.identifier} ${C?"assigned to":"un-assigned from"} me`,errorTitle:"Failed to set assignee"})}async function I({estimate:C,label:j}){let F=e.estimate;h({animatedTitle:"Setting estimate",payload:{estimate:C},optimisticUpdate(ae){return{...ae,estimate:C}},rollbackUpdate(ae){return{...ae,estimate:F}},successTitle:"Set estimate",successMessage:`${e.identifier} estimate set to ${j}`,errorTitle:"Failed to set estimate"})}async function M(C){h({animatedTitle:C?"Setting due date":"Removing due date",payload:{dueDate:C},optimisticUpdate(j){return{...j,dueDate:C}},rollbackUpdate(j){return{...j,dueDate:j.dueDate}},successTitle:C?"Set due date":"Removed due date",successMessage:C?`${e.identifier} due date set to ${(0,Ni.format)(C,"MM/dd/yyyy")}`:"",errorTitle:"Failed to set due date"})}async function N(C){if(!C){await(0,y.showToast)({style:y.Toast.Style.Failure,title:"Failed setting reminder"});return}try{await(0,y.showToast)({style:y.Toast.Style.Animated,title:"Setting reminder"}),await d.issueReminder(e.id,C),s&&l(),await(0,y.showToast)({style:y.Toast.Style.Success,title:"Reminder set",message:`${e.identifier} reminder set to ${(0,Ni.format)(C,"MM/dd/yyyy")}`})}catch(j){await(0,y.showToast)({style:y.Toast.Style.Failure,title:"Failed to set reminder",message:U(j)})}}function ve(){t&&t(),i&&i(),s&&s()}let[Xe,ne]=(0,Is.useState)(""),{users:be,supportsUserTypeahead:Oe,isLoadingUsers:$e}=De(Xe);return(0,L.jsxs)(L.Fragment,{children:[r?null:(0,L.jsx)(ie,{title:"Open Issue",url:e.url}),(0,L.jsxs)(y.ActionPanel.Section,{children:[(0,L.jsx)(y.Action.Push,{title:"Edit Issue",icon:y.Icon.Pencil,shortcut:y.Keyboard.Shortcut.Common.Edit,target:(0,L.jsx)(Li,{priorities:n,me:a,issue:e,mutateList:t,mutateSubIssues:i})}),(0,L.jsx)(Oi,{issue:e,updateIssue:h}),n&&n.length>0?(0,L.jsx)(y.ActionPanel.Submenu,{icon:y.Icon.LevelMeter,title:"Set Priority",shortcut:{macOS:{modifiers:["cmd","opt"],key:"p"},Windows:{modifiers:["ctrl","alt"],key:"p"}},children:n.map(C=>(0,L.jsx)(y.Action,{autoFocus:C.priority===e.priority,title:C.label,icon:{source:Te[C.priority]},onAction:()=>f(C)},C.priority))}):null,(0,L.jsx)(y.ActionPanel.Submenu,{icon:y.Icon.AddPerson,title:"Assign to",shortcut:{macOS:{modifiers:["cmd","shift"],key:"a"},Windows:{modifiers:["ctrl","shift"],key:"a"}},...Oe&&{onSearchTextChange:ne,isLoading:$e,throttle:!0},children:be?.map(C=>(0,L.jsx)(y.Action,{autoFocus:C.id===e.assignee?.id,title:`${C.displayName} (${C.email})`,icon:G(C),onAction:()=>ee(C)},C.id))}),a?(0,L.jsx)(y.Action,{title:S?"Un-Assign from Me":"Assign to Me",icon:G(a),shortcut:{macOS:{modifiers:["cmd","shift"],key:"i"},Windows:{modifiers:["ctrl","shift"],key:"i"}},onAction:()=>T(S?null:a)}):null,$?(0,L.jsx)(y.ActionPanel.Submenu,{title:"Set Estimate",icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}},shortcut:{macOS:{modifiers:["cmd","shift"],key:"e"},Windows:{modifiers:["ctrl","shift"],key:"e"}},children:$.map(({estimate:C,label:j})=>(0,L.jsx)(y.Action,{autoFocus:C===e.estimate,title:j,onAction:()=>I({estimate:C,label:j})},C))}):null,(0,L.jsx)(y.Action.PickDate,{title:"Set Due Date",shortcut:{macOS:{modifiers:["opt","shift"],key:"d"},Windows:{modifiers:["alt","shift"],key:"d"}},onChange:M}),(0,L.jsx)(y.Action.PickDate,{title:"Set Reminder",shortcut:{macOS:{modifiers:["cmd","shift"],key:"h"},Windows:{modifiers:["ctrl","shift"],key:"h"}},onChange:N}),(0,L.jsx)(Mi,{issue:e,updateIssue:h}),(0,L.jsx)(xi,{issue:e,updateIssue:h}),(0,L.jsx)(Ei,{issue:e,updateIssue:h}),(0,L.jsx)(Ui,{issue:e,updateIssue:h}),(0,L.jsx)(Fi,{issue:e,updateIssue:h}),(0,L.jsx)(y.Action,{title:"Delete Issue",shortcut:y.Keyboard.Shortcut.Common.Remove,icon:y.Icon.Trash,style:y.Action.Style.Destructive,onAction:()=>m()})]}),(0,L.jsxs)(y.ActionPanel.Section,{children:[(0,L.jsx)(y.Action.Push,{title:"Show Sub-Issues",icon:y.Icon.List,target:(0,L.jsx)(Ri,{issue:e,mutateList:t}),shortcut:{macOS:{modifiers:["cmd","shift"],key:"m"},Windows:{modifiers:["ctrl","shift"],key:"m"}}}),(0,L.jsx)(y.Action.Push,{title:"Break Issues into Sub-Issues",icon:y.Icon.Stars,target:(0,L.jsx)(Ai,{issue:e}),shortcut:{macOS:{modifiers:["opt","shift"],key:"m"},Windows:{modifiers:["alt","shift"],key:"m"}}}),o?(0,L.jsx)(y.Action.Push,{title:"Show Issue Links",icon:y.Icon.Link,target:(0,L.jsx)(Ti,{attachments:c??[],issue:e}),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"l"},Windows:{modifiers:["ctrl","alt","shift"],key:"l"}}}):null,(0,L.jsx)(y.Action.Push,{title:"Add Attachments and Links",icon:y.Icon.NewDocument,target:(0,L.jsx)(oi,{issue:e}),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"a"},Windows:{modifiers:["ctrl","alt","shift"],key:"a"}}}),(0,L.jsx)(y.Action.Push,{title:"Add Comment",icon:y.Icon.Plus,target:(0,L.jsx)(lt,{issue:e}),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"n"},Windows:{modifiers:["ctrl","alt","shift"],key:"n"}}}),(0,L.jsx)(y.Action.Push,{title:"Show Comments",icon:y.Icon.Bubble,target:(0,L.jsx)($i,{issue:e}),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"c"},Windows:{modifiers:["ctrl","alt","shift"],key:"c"}}})]}),(0,L.jsx)(ji,{issue:e}),(0,L.jsx)(y.ActionPanel.Section,{children:(0,L.jsx)(y.Action,{title:"Refresh",icon:y.Icon.ArrowClockwise,shortcut:y.Keyboard.Shortcut.Common.Refresh,onAction:()=>ve()})})]})}var W=require("react/jsx-runtime");function Qt({issue:e,mutateList:t,priorities:i,me:s}){let{issue:o,isLoadingIssue:c,mutateDetail:n}=nt(e),a=`# ${o?.title}`;o?.description&&(a+=`

${o.description}`);let r=o?.cycle?ot(o.cycle):null,l=o.relations?o.relations.nodes.filter($=>$.type=="related"):null,d=o.relations?o.relations.nodes.filter($=>$.type=="duplicate"):null,S=o.attachments?.nodes.length??0;return(0,W.jsx)(V.Detail,{markdown:a,isLoading:c,...o?{metadata:(0,W.jsxs)(V.Detail.Metadata,{children:[(0,W.jsx)(V.Detail.Metadata.Label,{title:"Status",text:o.state.name,icon:oe(o.state)}),(0,W.jsx)(V.Detail.Metadata.Label,{title:"Priority",text:o.priorityLabel,icon:{source:Te[o.priority]}}),(0,W.jsx)(V.Detail.Metadata.Label,{title:"Assignee",text:o.assignee?o.assignee.displayName:"Unassigned",icon:G(o.assignee)}),o.team.issueEstimationType!=="notUsed"?(0,W.jsx)(V.Detail.Metadata.Label,{title:"Estimate",text:ti({estimate:o.estimate,issueEstimationType:o.team.issueEstimationType}),icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}}):null,o.labels.nodes.length>0?(0,W.jsx)(V.Detail.Metadata.TagList,{title:"Labels",children:o.labels.nodes.map(({id:$,name:h,color:m})=>(0,W.jsx)(V.Detail.Metadata.TagList.Item,{text:h,color:m},$))}):(0,W.jsx)(V.Detail.Metadata.Label,{title:"Labels",text:"No Labels"}),o.dueDate?(0,W.jsx)(V.Detail.Metadata.Label,{title:"Due Date",text:(0,ys.format)(new Date(o.dueDate),"MM/dd/yyyy"),icon:Pt(new Date(o.dueDate))}):null,S>0?(0,W.jsx)(V.Detail.Metadata.Label,{title:"Links",text:`${S>1?`${S} links`:"1 link"}`,icon:V.Icon.Link}):null,(0,W.jsx)(V.Detail.Metadata.Separator,{}),(0,W.jsx)(V.Detail.Metadata.Label,{title:"Cycle",text:r?r.title:"No Cycle",icon:{source:r?r.icon:{light:"light/no-cycle.svg",dark:"dark/no-cycle.svg"}}}),(0,W.jsx)(V.Detail.Metadata.Label,{title:"Project",text:o.project?o.project.name:"No Project",icon:Z(o.project)}),(0,W.jsx)(V.Detail.Metadata.Label,{title:"Milestone",text:o.projectMilestone?o.projectMilestone.name:"No Milestone",icon:Ae(o.projectMilestone)}),(0,W.jsx)(V.Detail.Metadata.Label,{title:"Parent Issue",text:o.parent?o.parent.title:"No Issue",icon:o.parent?oe(o.parent.state):{source:{light:"light/backlog.svg",dark:"dark/backlog.svg"}}}),l&&l.length>0?(0,W.jsx)(V.Detail.Metadata.TagList,{title:"Related",children:l.map(({id:$,relatedIssue:h})=>(0,W.jsx)(V.Detail.Metadata.TagList.Item,{text:h.identifier},$))}):null,d&&d.length>0?(0,W.jsx)(V.Detail.Metadata.TagList,{title:"Duplicates",children:d.map(({id:$,relatedIssue:h})=>(0,W.jsx)(V.Detail.Metadata.TagList.Item,{text:h.identifier},$))}):null]}),actions:(0,W.jsx)(V.ActionPanel,{children:(0,W.jsx)(bt,{issue:o,mutateList:t,mutateDetail:n,priorities:i,showAttachmentsAction:S>0,attachments:o.attachments?.nodes??[],me:s})})}:{}})}var P=require("react/jsx-runtime");function Cr(e,t){return e==="url"?{title:"Copy Issue URL",onAction:()=>u.Clipboard.copy(t.url)}:e==="id-as-link"?{title:"Copy Issue ID as Link",onAction:()=>u.Clipboard.copy({text:`[${t.identifier}](${t.url})`,html:`<a href="${t.url}">${t.identifier}</a>`})}:e==="title"?{title:"Copy Issue Title",onAction:()=>u.Clipboard.copy(t.title)}:e==="title-as-link"?{title:"Copy Issue Title as Link",onAction:()=>u.Clipboard.copy({text:`[${t.title}](${t.url})`,html:`<a href="${t.url}">${t.title}</a>`})}:{title:"Copy Issue ID",onAction:()=>u.Clipboard.copy(t.identifier)}}function Bt(e){let{push:t}=(0,u.useNavigation)(),{autofocusField:i,copyToastAction:s}=(0,u.getPreferenceValues)(),[o,c]=(0,Ze.useState)(""),{teams:n,org:a,supportsTeamTypeahead:r,isLoadingTeams:l}=it(o),d=n&&n.length>1,[S,$]=(0,Ze.useState)(""),{users:h,supportsUserTypeahead:m,isLoadingUsers:f}=De(S),{handleSubmit:ee,itemProps:T,values:I,setValue:M,focus:N,reset:ve,setValidationError:Xe}=(0,mt.useForm)({async onSubmit(p){let E=await(0,u.showToast)({style:u.Toast.Style.Animated,title:"Creating issue"}),Ne=d?p.teamId:n?.[0]?.id;if(!Ne)return Xe("teamId","The team is required."),!1;try{let te={teamId:Ne,title:p.title,description:p.description||"",stateId:p.stateId,labelIds:p.labelIds,dueDate:p.dueDate,...Q&&p.estimate?{estimate:parseInt(p.estimate)}:{},...p.assigneeId?{assigneeId:p.assigneeId}:{},...p.cycleId?{cycleId:p.cycleId}:{},...p.projectId?{projectId:p.projectId}:{},...p.milestoneId?{projectMilestoneId:p.milestoneId}:{},...p.parentId?{parentId:p.parentId}:{},priority:parseInt(p.priority)},{success:mi,issue:It}=await Mo(te);if(mi&&It){E.style=u.Toast.Style.Success,E.title=`Created Issue \u2022 ${It?.identifier}`,E.primaryAction={title:"Open Issue",shortcut:u.Keyboard.Shortcut.Common.OpenWith,onAction:async()=>{t((0,P.jsx)(Qt,{issue:It,priorities:e.priorities,me:e.me})),await E.hide()}},E.secondaryAction={shortcut:u.Keyboard.Shortcut.Common.Copy,...Cr(s,It)},ve({templateId:"",title:"",description:"",estimate:"",labelIds:[],dueDate:null,parentId:"",attachments:[],links:""}),N(d&&i?i:"title");let pi=ii(p.links);if(pi.length>0){let Ye=pi.length===1?"link":"links";try{E.message=`Attaching ${Ye}\u2026`,await Promise.all(pi.map(et=>ei({issueId:It.id,url:et}))),E.message=`Successfully attached ${Ye}`}catch(et){E.style=u.Toast.Style.Failure,E.title=`Failed attaching ${Ye}`,E.message=U(et)}}if(p.attachments.length>0){let Ye=p.attachments.length===1?"attachment":"attachments";try{E.message=`Uploading ${Ye}\u2026`,await Promise.all(p.attachments.map(et=>Yt({issueId:It.id,url:et}))),E.message=`Successfully uploaded ${Ye}`}catch(et){E.style=u.Toast.Style.Failure,E.title=`Failed uploading ${Ye}`,E.message=U(et)}}}}catch(te){E.style=u.Toast.Style.Failure,E.title="Failed to create issue",E.message=U(te)}M("teamId",Ne)},validation:{teamId:d?mt.FormValidation.Required:void 0,title:mt.FormValidation.Required,stateId:mt.FormValidation.Required,priority:mt.FormValidation.Required},initialValues:{templateId:e.draftValues?.templateId||"",teamId:e.draftValues?.teamId||e.teamId,title:e.draftValues?.title,description:e.draftValues?.description,priority:e.draftValues?.priority,stateId:e.draftValues?.stateId,estimate:e.draftValues?.estimate,assigneeId:e.draftValues?.assigneeId||e.assigneeId,labelIds:e.draftValues?.labelIds||[],dueDate:e.draftValues?.dueDate,cycleId:e.draftValues?.cycleId||e.cycleId,projectId:e.draftValues?.projectId||e.projectId,milestoneId:e.draftValues?.milestoneId||e.milestoneId,parentId:e.draftValues?.parentId||e.parentId,links:e.draftValues?.links||""}}),ne=!!I.teamId&&I.teamId.trim().length>0,{issueTemplates:be,isLoadingIssueTemplates:Oe}=Di(I.teamId,{execute:ne}),{states:$e}=Me(I.teamId,{execute:ne}),{labels:C}=rt(I.teamId,{execute:ne}),{cycles:j}=st(I.teamId,{execute:ne}),{issues:F}=ge(Ct,[],{execute:ne}),{projects:ae}=le(I.teamId,{execute:ne}),{milestones:Je}=je(I.projectId,{execute:!!I.projectId});(0,Ze.useEffect)(()=>{n?.length===1&&M("teamId",n[0].id)},[n]);let gt=(0,Ze.useRef)(!1);(0,Ze.useEffect)(()=>{if(!gt.current){gt.current=!0;return}ft("")},[I.teamId]);function ft(p){M("templateId",p);let E=be?.find(mi=>mi.id===p),Ne={assigneeId:e.assigneeId||"",cycleId:e.cycleId||"",projectId:e.projectId||"",milestoneId:e.milestoneId||""},te=E?Vo(E,Ne):bi(Ne);M("title",te.title),M("description",te.description),M("stateId",te.stateId),M("priority",te.priority),M("assigneeId",te.assigneeId),M("labelIds",te.labelIds),M("estimate",te.estimate),M("dueDate",te.dueDate),M("cycleId",te.cycleId),M("projectId",te.projectId),M("milestoneId",te.milestoneId??"")}let se=n?.find(p=>p.id===I.teamId),Q=se?wt({issueEstimationType:se.issueEstimationType,issueEstimationAllowZero:se.issueEstimationAllowZero,issueEstimationExtended:se.issueEstimationExtended}):null,Y=Qe($e||[]),_t=$e&&$e.length>0,g=e.priorities&&e.priorities.length>0,ce=C&&C.length>0,Re=j&&j.length>0,Mt=ae&&ae.length>0,Xi=Je&&Je.length>0,ui=F&&F.length>0,Ws=be&&be.length>0;return(0,P.jsxs)(u.Form,{enableDrafts:e.enableDrafts,actions:(0,P.jsxs)(u.ActionPanel,{children:[(0,P.jsx)(u.Action.SubmitForm,{icon:u.Icon.Plus,onSubmit:ee,title:"Create Issue"}),(0,P.jsxs)(u.ActionPanel.Section,{children:[(0,P.jsx)(u.Action,{title:"Focus Title",icon:u.Icon.TextInput,onAction:()=>N("title"),shortcut:u.Keyboard.Shortcut.Common.Edit}),(0,P.jsx)(u.Action,{title:"Focus Description",icon:u.Icon.TextInput,onAction:()=>N("description"),shortcut:{modifiers:["ctrl"],key:"e"}}),(0,P.jsx)(u.Action,{title:"Focus Status",icon:u.Icon.Circle,onAction:()=>N("stateId"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"s"},Windows:{modifiers:["ctrl","shift"],key:"s"}}}),(0,P.jsx)(u.Action,{title:"Focus Priority",icon:u.Icon.LevelMeter,onAction:()=>N("priority"),shortcut:u.Keyboard.Shortcut.Common.Pin}),(0,P.jsx)(u.Action,{title:"Focus Assignee",icon:u.Icon.AddPerson,onAction:()=>N("assigneeId"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"a"},Windows:{modifiers:["ctrl","shift"],key:"a"}}}),Q?(0,P.jsx)(u.Action,{title:"Focus Estimate",icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}},onAction:()=>N("estimate"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"e"},Windows:{modifiers:["ctrl","shift"],key:"e"}}}):null,(0,P.jsx)(u.Action,{title:"Focus Due Date",icon:u.Icon.Calendar,onAction:()=>N("dueDate"),shortcut:{macOS:{modifiers:["opt","shift"],key:"d"},Windows:{modifiers:["alt","shift"],key:"d"}}}),(0,P.jsx)(u.Action,{title:"Focus Labels",icon:u.Icon.Tag,onAction:()=>N("labelIds"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"l"},Windows:{modifiers:["ctrl","shift"],key:"l"}}}),Re?(0,P.jsx)(u.Action,{title:"Focus Cycle",icon:{source:{light:"light/cycle.svg",dark:"dark/cycle.svg"}},onAction:()=>N("cycleId"),shortcut:u.Keyboard.Shortcut.Common.Copy}):null,Mt?(0,P.jsx)(u.Action,{title:"Focus Project",icon:{source:{light:"light/project.svg",dark:"dark/project.svg"}},onAction:()=>N("projectId"),shortcut:{modifiers:["ctrl","shift"],key:"p"}}):null,Xi?(0,P.jsx)(u.Action,{title:"Focus Milestone",icon:{source:{light:"light/milestone.svg",dark:"dark/milestone.svg"}},onAction:()=>N("milestoneId"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"m"},Windows:{modifiers:["ctrl","shift"],key:"m"}}}):null,ui?(0,P.jsx)(u.Action,{title:"Focus Parent Issue",icon:{source:{light:"light/backlog.svg",dark:"dark/backlog.svg"}},onAction:()=>N("parentId"),shortcut:{macOS:{modifiers:["cmd","shift"],key:"i"},Windows:{modifiers:["ctrl","shift"],key:"i"}}}):null,(0,P.jsx)(u.Action,{title:"Focus Attachments",icon:u.Icon.NewDocument,onAction:()=>N("attachments"),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"a"},Windows:{modifiers:["ctrl","alt","shift"],key:"a"}}}),(0,P.jsx)(u.Action,{title:"Focus Links",icon:u.Icon.Link,onAction:()=>N("links"),shortcut:{macOS:{modifiers:["cmd","opt","shift"],key:"l"},Windows:{modifiers:["ctrl","alt","shift"],key:"l"}}})]})]}),isLoading:l||f||e.isLoading,children:[(r||d)&&(0,P.jsxs)(P.Fragment,{children:[(0,P.jsx)(u.Form.Dropdown,{title:"Team",storeValue:!0,...T.teamId,...r&&{onSearchTextChange:c,isLoading:l,throttle:!0},children:n?.map(p=>(0,P.jsx)(u.Form.Dropdown.Item,{title:p.name,value:p.id,icon:kt(p,a)},p.id))}),(0,P.jsx)(u.Form.Separator,{})]}),ne&&(Oe||Ws)?(0,P.jsxs)(P.Fragment,{children:[(0,P.jsxs)(u.Form.Dropdown,{id:"templateId",title:"Template",value:I.templateId||"",onChange:ft,isLoading:Oe,children:[(0,P.jsx)(u.Form.Dropdown.Item,{title:"No Template",value:"",icon:u.Icon.Document}),be?.map(p=>(0,P.jsx)(u.Form.Dropdown.Item,{title:p.name,value:p.id,icon:u.Icon.Document},p.id))]}),(0,P.jsx)(u.Form.Separator,{})]}):null,(0,P.jsx)(u.Form.TextField,{title:"Title",placeholder:"Issue title",...i==="title"?{autoFocus:!0}:{},...T.title}),(0,P.jsx)(u.Form.TextArea,{title:"Description",placeholder:"Add some details (supports Markdown, e.g. **bold**)",enableMarkdown:!0,...T.description}),(0,P.jsx)(u.Form.Dropdown,{title:"Status",storeValue:!0,...T.stateId,children:_t?Y.map(p=>(0,P.jsx)(u.Form.Dropdown.Item,{title:p.name,value:p.id,icon:oe(p)},p.id)):null}),(0,P.jsx)(u.Form.Dropdown,{title:"Priority",storeValue:!0,...T.priority,children:g?e.priorities?.map(({priority:p,label:E})=>(0,P.jsx)(u.Form.Dropdown.Item,{title:E,value:String(p),icon:{source:Te[p]}},p)):null}),(0,P.jsxs)(u.Form.Dropdown,{title:"Assignee",storeValue:!0,...T.assigneeId,...m&&{onSearchTextChange:$,isLoading:f,throttle:!0},children:[(0,P.jsx)(u.Form.Dropdown.Item,{title:"Unassigned",value:"",icon:u.Icon.Person}),h?.map(p=>(0,P.jsx)(u.Form.Dropdown.Item,{title:p.name,value:p.id,icon:G(p)},p.id))]}),(0,P.jsx)(u.Form.TagPicker,{title:"Labels",placeholder:"Add label",...T.labelIds,children:ce?C.map(({id:p,name:E,color:Ne})=>(0,P.jsx)(u.Form.TagPicker.Item,{title:E,value:p,icon:{source:u.Icon.Dot,tintColor:Ne}},p)):null}),Q?(0,P.jsxs)(u.Form.Dropdown,{title:"Estimate",...T.estimate,children:[(0,P.jsx)(u.Form.Dropdown.Item,{title:"No estimate",value:"",icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}}),Q.map(({estimate:p,label:E})=>(0,P.jsx)(u.Form.Dropdown.Item,{title:E,value:String(p),icon:{source:{light:"light/estimate.svg",dark:"dark/estimate.svg"}}},p))]}):null,(0,P.jsx)(u.Form.DatePicker,{title:"Due Date",type:u.Form.DatePicker.Type.Date,...T.dueDate}),Re||Mt||ui?(0,P.jsx)(u.Form.Separator,{}):null,Re?(0,P.jsxs)(u.Form.Dropdown,{title:"Cycle",storeValue:!0,...T.cycleId,children:[(0,P.jsx)(u.Form.Dropdown.Item,{title:"No Cycle",value:"",icon:{source:{light:"light/no-cycle.svg",dark:"dark/no-cycle.svg"}}}),We(j).map(p=>(0,P.jsx)(u.Form.Dropdown.Item,{title:p.title,value:p.id,icon:{source:p.icon}},p.id))]}):null,Mt?(0,P.jsxs)(u.Form.Dropdown,{title:"Project",storeValue:!0,...T.projectId,children:[(0,P.jsx)(u.Form.Dropdown.Item,{title:"No Project",value:"",icon:{source:{light:"light/no-project.svg",dark:"dark/no-project.svg"}}}),ae.map(p=>(0,P.jsx)(u.Form.Dropdown.Item,{title:`${p.name} (${p.status.name})`,value:p.id,icon:Z(p)},p.id))]}):null,Xi?(0,P.jsxs)(u.Form.Dropdown,{title:"Milestone",storeValue:!0,...T.milestoneId,children:[(0,P.jsx)(u.Form.Dropdown.Item,{title:"No Milestone",value:"",icon:{source:"linear-icons/no-milestone.svg"}}),Je.map(p=>(0,P.jsx)(u.Form.Dropdown.Item,{title:`${p.name} (${p.targetDate||"No Target Date"})`,value:p.id,icon:Ae(p)},p.id))]}):null,ui?(0,P.jsxs)(u.Form.Dropdown,{title:"Parent",...T.parentId,children:[(0,P.jsx)(u.Form.Dropdown.Item,{title:"No Issue",value:"",icon:{source:{light:"light/backlog.svg",dark:"dark/backlog.svg"}}}),F.map(p=>(0,P.jsx)(u.Form.Dropdown.Item,{title:`${p.identifier} - ${p.title}`,value:p.id,icon:oe(p.state)},p.id))]}):null,(0,P.jsx)(u.Form.Separator,{}),(0,P.jsx)(u.Form.FilePicker,{title:"Attachment",...T.attachments}),(0,P.jsx)(u.Form.TextArea,{title:"Links",placeholder:`https://a.com
https://b.com
New link(s) on separate line(s)`,...T.links})]})}var hs=require("@raycast/api"),ai=require("lodash");var vt=require("react/jsx-runtime");function Vi({mutateList:e,issues:t,priorities:i,me:s}){if(!t||t&&t.length===0)return null;let o=(0,ai.uniqBy)(t.map(a=>a.state),a=>a.id),c=Qe(o||[],["triage","started","unstarted","backlog","completed","canceled"]),n=(0,ai.groupBy)(t,a=>a.state.id);return(0,vt.jsx)(vt.Fragment,{children:c.map(a=>{let r=n[a.id]?.length===1?"1 issue":`${n[a.id]?.length} issues`;return(0,vt.jsx)(hs.List.Section,{title:a.name,subtitle:r,children:n[a.id]?.map(l=>(0,vt.jsx)(Wt,{issue:l,mutateList:e,priorities:i,me:s},l.id))},a.id)})})}var pe=require("react/jsx-runtime");function qi({projectId:e,priorities:t,me:i}){let{issues:s,isLoadingIssues:o,mutateList:c}=ge(Do,[e]),[n,a]=(0,Ps.useCachedState)(""),{milestones:r}=je(e),l=(0,ks.useMemo)(()=>{if(!s)return[];if(!n||!r||r.length<1)return s;let d=[];for(let S of s)S.projectMilestone&&S.projectMilestone?.id===n&&d.push(S);return d||[]},[n,s,r]);return(0,pe.jsxs)(Ce.List,{isLoading:o,...r&&r.length>0?{searchBarAccessory:(0,pe.jsxs)(Ce.List.Dropdown,{tooltip:"Change Milestone",onChange:a,value:n,children:[(0,pe.jsx)(Ce.List.Dropdown.Item,{value:"",title:"All Milestones"}),(0,pe.jsx)(Ce.List.Dropdown.Section,{children:r?.map(d=>(0,pe.jsx)(Ce.List.Dropdown.Item,{value:d.id,title:`${d.name}  (${d.targetDate||"No Target Date"})`,icon:Ae(d)},d.id))})]})}:{},filtering:{keepSectionOrder:!0},searchBarPlaceholder:"Filter by ID, title, status, assignee or priority",children:[(0,pe.jsx)(Ce.List.EmptyView,{title:"No issues",description:"There are no issues in the project.",actions:(0,pe.jsx)(Ce.ActionPanel,{children:(0,pe.jsx)(Ce.Action.Push,{title:"Create Issue",target:(0,pe.jsx)(Bt,{projectId:e,priorities:t,me:i})})})}),(0,pe.jsx)(Vi,{issues:l,mutateList:c,priorities:t,me:i})]})}var q=require("@raycast/api"),Cs=require("date-fns"),ws=yt(require("remove-markdown"));var Ss=require("@raycast/utils");function Wi(e){let{data:t,error:i,isLoading:s,mutate:o}=(0,Ss.useCachedPromise)(mo,[e]);return{updates:t,updatesError:i,isLoadingUpdates:s,mutateUpdates:o}}var de=require("react/jsx-runtime"),wr={onTrack:{color:q.Color.Green,title:"On Track"},atRisk:{color:q.Color.Orange,title:"At Risk"},offTrack:{color:q.Color.Red,title:"Off Track"}};function Qi({project:e}){let{updates:t,isLoadingUpdates:i,mutateUpdates:s}=Wi(e.id);return(0,de.jsxs)(q.List,{isLoading:i,navigationTitle:`${e.name} \u2014 Project Updates`,searchBarPlaceholder:"Filter by user",isShowingDetail:!0,children:[(0,de.jsx)(q.List.EmptyView,{title:"No updates",description:"This project doesn't have any updates."}),t?.map(o=>{let c=new Date(o.createdAt),{color:n,title:a}=wr[o.health];return(0,de.jsx)(q.List.Item,{title:o.user.displayName,icon:G(o.user),keywords:(0,ws.default)(o.body).replace(/\n/g," ").split(" "),accessories:[{date:c,tooltip:`Created: ${(0,Cs.format)(c,"EEEE d MMMM yyyy 'at' HH:mm")}`},{icon:q.Icon.Heartbeat,tag:{color:n,value:a}}],detail:(0,de.jsx)(q.List.Item.Detail,{markdown:o.body}),actions:(0,de.jsxs)(q.ActionPanel,{children:[(0,de.jsx)(ie,{title:"Open Update",url:o.url}),(0,de.jsxs)(q.ActionPanel.Section,{children:[(0,de.jsx)(q.Action.CopyToClipboard,{icon:q.Icon.Clipboard,content:o.url,title:"Copy Update URL",shortcut:q.Keyboard.Shortcut.Common.CopyPath}),(0,de.jsx)(q.Action.CopyToClipboard,{icon:q.Icon.Clipboard,content:o.body,title:"Copy Update",shortcut:{macOS:{modifiers:["cmd","shift"],key:"'"},Windows:{modifiers:["ctrl","shift"],key:"'"}}})]}),(0,de.jsx)(q.ActionPanel.Section,{children:(0,de.jsx)(q.Action,{title:"Refresh",icon:q.Icon.ArrowClockwise,shortcut:q.Keyboard.Shortcut.Common.Refresh,onAction:s})})]})},o.id)})]})}var ue=require("@raycast/api"),zt=require("react");var Bi=require("@raycast/utils");var br=`
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
`;async function bs(e){let{graphQLClient:t}=k(),{data:i}=await t.rawRequest(`
      query($documentId: ID!) {
        documents(filter: { id: { eq: $documentId } }) {
          nodes {
            content
            ${br}
          }
        }
      }
    `,{documentId:e});return i?.documents.nodes?.[0]}var Ds=require("lodash");var Dr=`
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
`;async function As(e="",t={projectId:""}){let{graphQLClient:i}=k(),s="projectId"in t&&t.projectId.length>0,o="initiativeId"in t&&t.initiativeId.length>0,c=`nodes { ${Dr} } pageInfo { hasNextPage }`,n=s?`
      query($query: String!, $projectId: ID!) {
        documents(orderBy: updatedAt, filter: { and: [
          { title: { containsIgnoreCase: $query } },
          { project: { id: { eq: $projectId } } }
        ] }) { ${c} } }
    `:o?`
      query($query: String!, $initiativeId: ID!) {
        documents(orderBy: updatedAt, filter: { and: [
          { title: { containsIgnoreCase: $query } },
          { initiative: { id: { eq: $initiativeId } } }
        ] }) { ${c} } }
    `:`
      query($query: String!) { documents(orderBy: updatedAt, filter: { title: { containsIgnoreCase: $query } }) { ${c} } }
    `,a=s||o?{query:e.trim(),...t}:{query:e.trim()},{data:r}=await i.rawRequest(n,a),l=(0,Ds.sortBy)(r?.documents.nodes??[],S=>S.sortOrder??1/0),d=!!r?.documents.pageInfo.hasNextPage;return{docs:l,hasMoreDocs:d}}function Ls(e="",t={projectId:""}){let{data:i,error:s,isLoading:o,mutate:c}=(0,Bi.useCachedPromise)(As,[e,t],{failureToastOptions:{title:"Failed to load documents"},keepPreviousData:!0});return{docs:i?.docs,docsError:s,isLoadingDocs:!i&&!s||o,supportsDocTypeahead:e.trim().length>0||i?.hasMoreDocs,mutateDocs:c}}function Ts(e){let{data:t,error:i,isLoading:s,mutate:o}=(0,Bi.useCachedPromise)(bs,[e],{failureToastOptions:{title:"Failed to load document content"}});return{doc:t,docError:i,isLoadingDoc:!t&&!i||s,mutateDoc:o}}var re=require("@raycast/api"),Fs=require("date-fns");function vs(e){return[e.project?.name??"",e.initiative?.name??"",e.title,e.creator?.displayName??""]}function $s(e){return e?`Creator: ${e.displayName} (${e.email})`:void 0}var ci=require("@raycast/api");function Rs(e){return Ve({icon:e.icon??void 0,color:e.color??void 0,fallbackIcon:{source:ci.Icon.Document,tintColor:e.color??ci.Color.PrimaryText}})}var A=require("@raycast/api");async function js(e){let{graphQLClient:t}=k(),{data:i}=await t.rawRequest(`
      mutation {
        documentDelete(id: "${e}") {
          success
        }
      }
    `);return{success:i?.documentDelete.success}}async function xs(e,t){let{graphQLClient:i}=k(),s=`projectId: ${t.projectId?`"${t.projectId}"`:null}`;s+=`, initiativeId: ${t.initiativeId?`"${t.initiativeId}"`:null}`;let{data:o}=await i.rawRequest(`
      mutation {
        documentUpdate(id: "${e}", input: {${s}}) {
          success
        }
      }
    `);return{success:o?.documentUpdate.success}}var H=require("react/jsx-runtime");function Ar({doc:e,mutateDocs:t,projects:i,initiatives:s,mutateDoc:o}){let c=async n=>{let a="project"in n,r=`to ${a?`Project: ${n.project.name}`:`Initiative: ${n.initiative.name}`}`,l=await(0,A.showToast)(A.Toast.Style.Animated,"Moving document",r),d=a?{projectId:n.project.id}:{initiativeId:n.initiative.id},S=t(xs(e.id,d),{optimisticUpdate:h=>{if(!h)return;let m=a?{project:{...n.project},initiative:void 0}:{initiative:{...n.initiative},project:void 0};return{...h,docs:h.docs?.map(f=>f.id!==e.id?f:{...f,...m,updatedAt:new Date})}}});(o?o(S,{optimisticUpdate:h=>{if(!h)return;let m=a?{project:{...n.project},initiative:void 0}:{initiative:{...n.initiative},project:void 0};return{...h,...m,updatedAt:new Date}}}):S).then(({success:h})=>{h&&(l.style=A.Toast.Style.Success,l.title="Moved document")}).catch(h=>{l.style=A.Toast.Style.Failure,l.title="Failed to move document",l.message=U(h),l.primaryAction={title:"Retry",onAction:()=>c(n),shortcut:A.Keyboard.Shortcut.Common.Refresh}})};return((i??[]).length>0||(s??[]).length>0)&&(0,H.jsxs)(A.ActionPanel.Submenu,{title:"Move Document",icon:A.Icon.Move,shortcut:{macOS:{modifiers:["cmd","shift"],key:"m"},Windows:{modifiers:["ctrl","shift"],key:"m"}},filtering:{keepSectionOrder:!0},children:[(s??[]).length>0&&(0,H.jsx)(A.ActionPanel.Section,{title:"Initiatives",children:s?.filter(n=>n.id!==e.initiative?.id).map(n=>(0,H.jsx)(A.Action,{title:n.name,icon:qe(n),onAction:()=>c({initiative:n})},n.id))}),(i??[]).length>0&&(0,H.jsx)(A.ActionPanel.Section,{title:"Projects",children:i?.filter(n=>n.id!==e.project?.id).map(n=>(0,H.jsx)(A.Action,{title:n.name,icon:Z(n),onAction:()=>c({project:n})},n.id))})]})}function Lr({doc:e,mutateDocs:t,deleteUnsupported:i}){if(i)return(0,H.jsx)(H.Fragment,{});let s=()=>(0,A.confirmAlert)({title:"Delete Document",message:`Are you sure you want to delete '${e.title}'?`,icon:{source:A.Icon.DeleteDocument,tintColor:A.Color.Red},primaryAction:{title:"Delete",style:A.Alert.ActionStyle.Destructive,onAction:o}}),o=async()=>{let c=await(0,A.showToast)(A.Toast.Style.Animated,"Deleting document",e.title);t(js(e.id),{optimisticUpdate:n=>{if(n)return{...n,docs:n.docs?.filter(a=>a.id!==e.id)}}}).then(({success:n})=>{n&&(c.style=A.Toast.Style.Success,c.title="Document deleted")}).catch(n=>{c.style=A.Toast.Style.Failure,c.title="Failed to delete document",c.message=U(n),c.primaryAction={title:"Retry",onAction:o,shortcut:A.Keyboard.Shortcut.Common.Refresh}})};return(0,H.jsx)(A.Action,{title:"Delete Document",icon:{source:A.Icon.DeleteDocument,tintColor:A.Color.Red},onAction:s,style:A.Action.Style.Destructive,shortcut:A.Keyboard.Shortcut.Common.Remove})}function li({doc:e,hideOpenInLinear:t,...i}){return(0,H.jsxs)(H.Fragment,{children:[t?null:(0,H.jsx)(ie,{title:"Open Document",url:e.url}),(0,H.jsxs)(A.ActionPanel.Section,{children:[(0,H.jsx)(Ar,{doc:e,...i}),(0,H.jsx)(Lr,{doc:e,...i})]}),(0,H.jsxs)(A.ActionPanel.Section,{children:[(0,H.jsx)(A.Action.CreateQuicklink,{icon:A.Icon.RaycastLogoPos,title:"Create Quicklink",shortcut:{macOS:{modifiers:["cmd","shift"],key:"s"},Windows:{modifiers:["ctrl","shift"],key:"s"}},quicklink:{link:e.url,name:e.title,application:Nt?"Linear":void 0}}),(0,H.jsx)(A.Action.CopyToClipboard,{icon:A.Icon.Link,content:e.url,title:"Copy Link",shortcut:A.Keyboard.Shortcut.Common.CopyPath}),(0,H.jsx)(A.Action.CopyToClipboard,{icon:A.Icon.Clipboard,content:e.title,title:"Copy Title",shortcut:{macOS:{modifiers:["cmd","shift"],key:"'"},Windows:{modifiers:["ctrl","shift"],key:"'"}}})]})]})}var Rt=require("@raycast/api"),Ms=require("node-emoji");var $t=require("react/jsx-runtime");function Us({doc:e,...t}){let{doc:i,isLoadingDoc:s,mutateDoc:o}=Ts(e.id),c="";return i?.content&&(c=`# ${i.title}

${(0,Ms.emojify)(i.content)}`),(0,$t.jsx)(Rt.Detail,{markdown:c,isLoading:s,navigationTitle:e.title,actions:(0,$t.jsxs)(Rt.ActionPanel,{children:[(0,$t.jsx)(Rt.Action.CopyToClipboard,{title:"Copy Markdown",content:c}),i&&(0,$t.jsx)(li,{doc:i,mutateDoc:o,...t,deleteUnsupported:!0})]})})}var Ke=require("react/jsx-runtime");function Es({doc:e,...t}){let{primaryAction:i}=(0,re.getPreferenceValues)(),s=i==="openInLinear",o=vs(e),c=e.updatedAt?new Date(e.updatedAt):new Date(e.createdAt);return(0,Ke.jsx)(re.List.Item,{title:e.title,keywords:o,icon:Rs(e),accessories:[...e.project?[{tag:{value:e.project.name,color:e.project.color?{light:e.project.color,dark:e.project.color,adjustContrast:!0}:re.Color.SecondaryText},icon:Z(e.project)}]:[],...e.initiative?[{tag:{value:e.initiative.name,color:e.initiative.color?{light:e.initiative.color,dark:e.initiative.color,adjustContrast:!0}:re.Color.SecondaryText},icon:qe(e.initiative)}]:[],{date:c,icon:re.Icon.Clock,tooltip:`Updated: ${(0,Fs.format)(c,"MM/dd/yyyy")}`},{icon:G(e.creator),tooltip:$s(e.creator)}],actions:(0,Ke.jsxs)(re.ActionPanel,{children:[s?(0,Ke.jsx)(ie,{title:"Open Document",url:e.url}):null,(0,Ke.jsx)(re.Action.Push,{title:"Show Content",target:(0,Ke.jsx)(Us,{doc:e,...t}),icon:re.Icon.Eye}),(0,Ke.jsx)(li,{doc:e,hideOpenInLinear:s,...t})]})},e.id)}var we=require("react/jsx-runtime");function Os({project:e}){let[t,i]=(0,zt.useState)(""),[s,o]=(0,zt.useState)({projectId:""}),{projects:c,isLoadingProjects:n}=le(),{initiatives:a,isLoadingInitiatives:r}=Zt(),{docs:l,isLoadingDocs:d,supportsDocTypeahead:S,mutateDocs:$}=Ls(t,s),h=(0,zt.useMemo)(()=>{if(!l)return[];let m=l??[];if("initiativeId"in s&&s.initiativeId.length>0&&(a??[]).length>0)return m.filter(f=>f.initiative&&f.initiative.id===s.initiativeId);if((c??[]).length>0){if(e)return m.filter(f=>f.project&&f.project.id===e.id);if("projectId"in s&&s.projectId.length>0)return m.filter(f=>f.project&&f.project.id===s.projectId)}return m},[e,s,l,c,a]);return(0,we.jsxs)(ue.List,{isLoading:n||d||r,navigationTitle:e?`${e.name} Documents`:void 0,...!e&&((c??[]).length>0||(a??[]).length>0)?{searchBarAccessory:(0,we.jsxs)(ue.List.Dropdown,{tooltip:"Change Entity",onChange:m=>{let f=m.startsWith("initiative:")?{initiativeId:m.replace("initiative:","")}:{projectId:m.replace("project:","")};o(f)},storeValue:!0,children:[(0,we.jsx)(ue.List.Dropdown.Item,{value:"",title:"All Documents"}),(a??[]).length>0&&(0,we.jsx)(ue.List.Dropdown.Section,{title:"Initiatives",children:a?.map(m=>(0,we.jsx)(ue.List.Dropdown.Item,{value:`initiative:${m.id}`,title:m.name,icon:qe(m),keywords:[m.name,m.description??""]},m.id))}),(c??[]).length>0&&(0,we.jsx)(ue.List.Dropdown.Section,{title:"Projects",children:c?.map(m=>(0,we.jsx)(ue.List.Dropdown.Item,{value:`project:${m.id}`,title:m.name,icon:Z(m),keywords:[m.name,m.description]},m.id))})]})}:{},...S?{onSearchTextChange:i,searchBarPlaceholder:"Search by document title",throttle:!0}:{searchBarPlaceholder:"Filter by title, creator, project or initiative name"},children:[h.map(m=>(0,we.jsx)(Es,{doc:m,mutateDocs:$,projects:c,initiatives:a},m.id)),(0,we.jsx)(ue.List.EmptyView,{title:"No documents found",icon:{source:ue.Icon.DeleteDocument,tintColor:ue.Color.Orange}})]})}var J=require("react/jsx-runtime");function Gi({project:e,priorities:t,me:i,mutateProjects:s}){let{linearClient:o}=k(),{primaryAction:c}=(0,D.getPreferenceValues)(),n=(0,J.jsx)(ie,{title:"Open Project",url:e.url}),a=c==="openInLinear",r=`${Math.round(e.progress*100)}%`,l=[e.status.name,...e.teams.nodes.map(m=>m.key)];e.lead&&l.push(e.lead.displayName,e.lead?.email);let d=()=>(0,D.confirmAlert)({title:"Delete Project",message:"Are you sure you want to delete the selected project?",icon:{source:D.Icon.Trash,tintColor:D.Color.Red},primaryAction:{title:"Delete",style:D.Alert.ActionStyle.Destructive,onAction:S}});async function S(){let m=await(0,D.showToast)({style:D.Toast.Style.Animated,title:"Deleting project"});s(o.archiveProject(e.id),{optimisticUpdate(f){return f&&f?.filter(ee=>ee.id!==e.id)}}).then(()=>{m.style=D.Toast.Style.Success,m.title="Project deleted",m.message=`"${e.name}" is deleted`}).catch(f=>{m.style=D.Toast.Style.Failure,m.title="Failed to delete project",m.message=U(f),m.primaryAction={title:"Retry",onAction:S,shortcut:D.Keyboard.Shortcut.Common.Refresh}})}let $=e.teams.nodes,h=e.targetDate?new Date(e.targetDate):null;return(0,J.jsx)(D.List.Item,{title:e.name,subtitle:e.description,keywords:l,icon:Z(e),accessories:[{icon:(0,Ns.getProgressIcon)(e.progress,e.color,{background:"white"}),tooltip:`Progress: ${r}`},{icon:h?Pt(h):void 0,text:h?(0,zi.format)(h,"MMM dd"):void 0,tooltip:h?`Target date: ${(0,zi.format)(h,"MM/dd/yyyy")}`:void 0},{icon:D.Icon.PersonLines,text:$.length>1?`${$.length}`:$[0].key,tooltip:`Teams: ${$.map(m=>m.key).join(", ")}`},{icon:{source:Xt[e.status.type]},tooltip:e.status.name},{icon:G(e.lead),tooltip:e.lead?`Lead: ${e.lead?.displayName} (${e.lead?.email})`:"Unassigned"}],actions:(0,J.jsxs)(D.ActionPanel,{title:e.name,children:[a?n:null,(0,J.jsx)(D.Action.Push,{target:(0,J.jsx)(qi,{projectId:e.id,priorities:t,me:i}),title:"Show Issues",icon:D.Icon.List}),a?null:n,(0,J.jsx)(D.Action.Push,{target:(0,J.jsx)(fi,{projectId:e.id}),title:"Create Milestone",shortcut:{macOS:{modifiers:["cmd","shift"],key:"m"},Windows:{modifiers:["ctrl","shift"],key:"m"}},icon:{source:"linear-icons/milestone.svg",tintColor:D.Color.PrimaryText}}),(0,J.jsxs)(D.ActionPanel.Section,{children:[(0,J.jsx)(D.Action.Push,{title:"Edit Project",icon:D.Icon.Pencil,shortcut:D.Keyboard.Shortcut.Common.Edit,target:(0,J.jsx)(yi,{project:e,mutateProjects:s})}),(0,J.jsx)(D.Action.Push,{title:"See Project Updates",icon:D.Icon.Heartbeat,shortcut:{macOS:{modifiers:["cmd","shift"],key:"u"},Windows:{modifiers:["ctrl","shift"],key:"u"}},target:(0,J.jsx)(Qi,{project:e})}),(0,J.jsx)(D.Action.Push,{title:"See Project Documents",icon:D.Icon.Document,shortcut:{macOS:{modifiers:["cmd","shift"],key:"d"},Windows:{modifiers:["ctrl","shift"],key:"d"}},target:(0,J.jsx)(Os,{project:e})}),(0,J.jsx)(D.Action,{title:"Delete Project",onAction:d,style:D.Action.Style.Destructive,icon:D.Icon.Trash,shortcut:D.Keyboard.Shortcut.Common.Remove})]}),(0,J.jsxs)(D.ActionPanel.Section,{children:[(0,J.jsx)(D.Action.CopyToClipboard,{icon:D.Icon.Clipboard,content:e.url,title:"Copy Project URL",shortcut:D.Keyboard.Shortcut.Common.CopyPath}),(0,J.jsx)(D.Action.CopyToClipboard,{icon:D.Icon.Clipboard,content:e.name,title:"Copy Project Title",shortcut:{macOS:{modifiers:["cmd","shift"],key:"'"},Windows:{modifiers:["ctrl","shift"],key:"'"}}})]})]})},e.id)}var Ee=require("react/jsx-runtime");function _i(){let[e,t]=(0,Gt.useState)(""),[i,s]=(0,Gt.useState)(""),{projects:o,isLoadingProjects:c,mutateProjects:n,pagination:a}=le(void 0,{searchText:i,pageSize:20}),{initiatives:r,isLoadingInitiatives:l}=Zt(),{priorities:d,isLoadingPriorities:S}=Ft(),{me:$,isLoadingMe:h}=tt(),m=(0,Gt.useMemo)(()=>{if(!o)return[];if(!(r??[]).length||!e.length)return o;let f=o.reduce((T,I)=>({...T,[I.id]:I}),{});return(r?.find(T=>T.id===e)?.projects?.nodes??[]).map(T=>f[T.id])},[e,o,r]);return(0,Ee.jsxs)(pt.List,{isLoading:c||l||S||h,...(r??[]).length>0?{searchBarAccessory:(0,Ee.jsxs)(pt.List.Dropdown,{tooltip:"Change Initiative",onChange:t,storeValue:!0,children:[(0,Ee.jsx)(pt.List.Dropdown.Item,{value:"",title:"All Projects"}),(0,Ee.jsx)(pt.List.Dropdown.Section,{title:"Initiatives",children:r?.map(f=>(0,Ee.jsx)(pt.List.Dropdown.Item,{value:f.id,title:f.name,icon:qe(f)},f.id))})]})}:{},filtering:{keepSectionOrder:!0},onSearchTextChange:s,pagination:a,searchBarPlaceholder:"Filter by project title, lead, status, or team keys",searchText:i,throttle:!0,children:[m?.map(f=>f?(0,Ee.jsx)(Gi,{project:f,priorities:d,me:$,mutateProjects:n},f.id):null),(0,Ee.jsx)(pt.List.EmptyView,{title:e?"There are no projects in this initiative.":"There are no projects in this workspace."})]})}var xt=require("@raycast/api"),Vs=require("@raycast/utils"),di=yt(require("react"));var jt=require("react/jsx-runtime");function Tr({children:e}){return(0,di.useEffect)(()=>{wo()},[]),e}var Hi=class extends di.default.Component{constructor(t){super(t),this.state={error:null}}static getDerivedStateFromError(t){return{error:t}}render(){let{error:t}=this.state;if(!t)return this.props.children;if(!(t.message.includes("invalid_grant")||t.message.includes("Error while fetching tokens")||t.message.includes("Could not initialize OAuth")))throw t;return(0,jt.jsx)(xt.Detail,{markdown:`# Sign In Failed

Failed to authenticate with Linear:
\`\`\`
${t.message}
\`\`\`

This can happen when the network is unreliable or the authorization code has expired. Please try signing in again.`,actions:(0,jt.jsx)(xt.ActionPanel,{children:(0,jt.jsx)(xt.Action,{title:"Sign in Again",onAction:async()=>{await gi.client.removeTokens(),this.setState({error:null})}})})})}},vr=(0,Vs.withAccessToken)(gi)(Tr);function Zi({children:e}){return(0,jt.jsx)(Hi,{children:(0,jt.jsx)(vr,{children:e})})}var Ki=require("react/jsx-runtime");function qs(){return(0,Ki.jsx)(Zi,{children:(0,Ki.jsx)(_i,{})})}
