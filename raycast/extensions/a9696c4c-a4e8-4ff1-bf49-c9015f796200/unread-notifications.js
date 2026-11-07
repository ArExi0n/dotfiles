"use strict";var H=Object.create;var R=Object.defineProperty;var _=Object.getOwnPropertyDescriptor;var Z=Object.getOwnPropertyNames;var J=Object.getPrototypeOf,X=Object.prototype.hasOwnProperty;var Y=(e,t)=>{for(var n in t)R(e,n,{get:t[n],enumerable:!0})},$=(e,t,n,l)=>{if(t&&typeof t=="object"||typeof t=="function")for(let u of Z(t))!X.call(e,u)&&u!==n&&R(e,u,{get:()=>t[u],enumerable:!(l=_(t,u))||l.enumerable});return e};var C=(e,t,n)=>(n=e!=null?H(J(e)):{},$(t||!e||!e.__esModule?R(n,"default",{value:e,enumerable:!0}):n,e)),ee=e=>$(R({},"__esModule",{value:!0}),e);var le={};Y(le,{default:()=>K});module.exports=ee(le);var r=require("@raycast/api"),W=C(require("react"));var v=require("@linear/sdk"),U=require("@raycast/api"),E=require("@raycast/utils"),h=null;async function te(e,t,n,l,u){let f=JSON.stringify({query:n,variables:l}),p=new Headers(t.headers);new Headers(u).forEach((i,s)=>p.set(s,i)),p.set("Content-Type","application/json");let d=await fetch(e,{...t,method:"POST",headers:Object.fromEntries(p.entries()),body:f}),c=d.headers.get("Content-Type")?.startsWith("application/json")?await d.json():await d.text();if(typeof c!="string"&&d.ok&&!c.errors&&c.data)return{...c,headers:d.headers,status:d.status};throw new Error(typeof c=="string"?c:c.errors?.[0]?.message??`GraphQL Error (${d.status})`)}var P=E.OAuthService.linear({scope:"read write",onAuthorize({token:e}){h=new v.LinearClient({accessToken:e,headers:{"public-file-urls-expire-in":"60","linear-raycast-extension-name":U.environment.extensionName}});let t=h.client;t.rawRequest=((n,l,u)=>te(t.url,t.options,n,l,u))}});function I(){if(!h)throw new Error("No linear client initialized");return{linearClient:h,graphQLClient:h.client}}async function b(e){let{graphQLClient:t}=I(),{data:n}=await t.rawRequest(`
      mutation {
        notificationUpdate(id: "${e.id}", input: {readAt: ${e.readAt?`"${e.readAt.toISOString()}"`:null}}) {
          success
        }
      }
    `);return{success:n?.notificationUpdate.success}}var g=require("@raycast/api"),T=require("@raycast/utils"),k=C(require("react"));var j=require("@raycast/api"),re=!1;async function q(){re=!!(await(0,j.getApplications)()).find(n=>n.bundleId==="com.linear")}var m=require("react/jsx-runtime");function ie({children:e}){return(0,k.useEffect)(()=>{q()},[]),e}var N=class extends k.default.Component{constructor(t){super(t),this.state={error:null}}static getDerivedStateFromError(t){return{error:t}}render(){let{error:t}=this.state;if(!t)return this.props.children;if(!(t.message.includes("invalid_grant")||t.message.includes("Error while fetching tokens")||t.message.includes("Could not initialize OAuth")))throw t;return(0,m.jsx)(g.Detail,{markdown:`# Sign In Failed

Failed to authenticate with Linear:
\`\`\`
${t.message}
\`\`\`

This can happen when the network is unreliable or the authorization code has expired. Please try signing in again.`,actions:(0,m.jsx)(g.ActionPanel,{children:(0,m.jsx)(g.Action,{title:"Sign in Again",onAction:async()=>{await P.client.removeTokens(),this.setState({error:null})}})})})}},se=(0,T.withAccessToken)(P)(ie);function x({children:e}){return(0,m.jsx)(N,{children:(0,m.jsx)(se,{children:e})})}var oe=require("@raycast/api"),ae=C(require("node-emoji"));var ne=require("lodash");function B(e){return e.length!==0?String(e.length):void 0}function M(e){if(e.url)return e.url;if(e.comment?.url)return e.comment.url;if(e.projectUpdate?.url)return e.projectUpdate.url;if(e.project?.url)return e.project.url;if(e.issue?.url)return e.issue.url}var A=require("@raycast/api"),Q=require("@raycast/utils");function D(e){return e?{source:e.avatarUrl?encodeURI(e.avatarUrl):(0,Q.getAvatarIcon)(e.displayName.toUpperCase()),mask:A.Image.Mask.Circle}:A.Icon.Person}var F=require("@raycast/utils"),G=require("lodash");var z=require("@raycast/api");var ve=(0,z.getPreferenceValues)();var O=`
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
`;async function V(){let{graphQLClient:e}=I(),{data:t}=await e.rawRequest(`
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
                ${O}
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
    `);return{notifications:t?.notifications.nodes,urlKey:t?.organization.urlKey}}function L(){let{data:e,error:t,isLoading:n,mutate:l}=(0,F.useCachedPromise)(V),{notifications:u,urlKey:f}=e||{},p=new Date,[d,c]=(0,G.chain)(u).filter(i=>!i.snoozedUntilAt||i.snoozedUntilAt<p).partition(i=>!!i.readAt).value();return{urlKey:f,readNotifications:d,unreadNotifications:c,notificationsError:t,isLoadingNotifications:!e&&!t||n,mutateNotifications:l}}var o=require("react/jsx-runtime"),ue=(0,r.getPreferenceValues)();function ce(){let{isLoadingNotifications:e,unreadNotifications:t,urlKey:n,mutateNotifications:l}=L();async function u(i){await l(b({id:i.id,readAt:new Date}),{optimisticUpdate(s){return s&&{...s,notifications:s?.notifications?.map(a=>a.id===i.id?{...a,readAt:new Date}:a)}},shouldRevalidateAfter:!0})}async function f(i){let a=(await(0,r.getApplications)()).find(w=>w.bundleId==="com.linear"),y=M(i);y?await(0,r.open)(y,a):await p(),await u(i)}async function p(){let s=(await(0,r.getApplications)()).find(a=>a.bundleId==="com.linear");await(0,r.open)(`https://linear.app/${n}/inbox`,s)}async function d(){if(t.length===0)return;let i=new Date;await l(Promise.all(t.map(s=>b({id:s.id,readAt:i}))),{optimisticUpdate(s){return s&&{...s,notifications:s?.notifications?.map(a=>a.readAt?a:{...a,readAt:i})}},shouldRevalidateAfter:!0})}let c=(i,s)=>{let a=i.length>s?"\u2026":"";return i.substring(0,s).trim()+a};return!ue.alwaysShow&&!e&&t&&t.length===0?null:(0,o.jsxs)(r.MenuBarExtra,{title:B(t),icon:{source:{dark:"dark/linear.svg",light:"light/linear.svg"}},isLoading:e,children:[(0,o.jsxs)(r.MenuBarExtra.Section,{children:[(0,o.jsx)(r.MenuBarExtra.Item,{title:"Open Inbox",icon:"linear-app-icon.png",shortcut:r.Keyboard.Shortcut.Common.Open,onAction:p}),t.length>0?(0,o.jsx)(r.MenuBarExtra.Item,{title:"Mark All as Read",icon:r.Icon.CheckCircle,shortcut:{macOS:{modifiers:["cmd","shift"],key:"u"},Windows:{modifiers:["ctrl","shift"],key:"u"}},onAction:d}):null]}),(0,o.jsxs)(r.MenuBarExtra.Section,{children:[(0,o.jsx)(r.MenuBarExtra.Item,{title:t.length!==0?"Unread Notifications":"No Unread Notifications"}),t.map(i=>{let s=c(i.subtitle,30),a=i.actor?D(i.actor):"linear-app-icon.png",y=c(i.title,20),w=`${i.subtitle}: ${i.title}`;return(0,o.jsx)(r.MenuBarExtra.Item,{icon:a,title:s,subtitle:y,tooltip:w,onAction:()=>f(i),alternate:(0,o.jsx)(r.MenuBarExtra.Item,{icon:a,title:s,subtitle:"Mark as Read",tooltip:w,onAction:()=>u(i)})},i.id)})]}),(0,o.jsxs)(r.MenuBarExtra.Section,{children:[(0,o.jsx)(r.MenuBarExtra.Item,{icon:r.Icon.Eye,title:"View All Notifications",onAction:()=>(0,r.launchCommand)({name:"notifications",type:r.LaunchType.UserInitiated})}),(0,o.jsx)(r.MenuBarExtra.Item,{title:"Configure Command",icon:r.Icon.Gear,shortcut:{macOS:{modifiers:["cmd"],key:","},Windows:{modifiers:["ctrl"],key:","}},onAction:()=>(0,r.openCommandPreferences)(),alternate:(0,o.jsx)(r.MenuBarExtra.Item,{title:"Configure Extension",icon:r.Icon.Gear,onAction:r.openExtensionPreferences})})]})]})}var S=class extends W.default.Component{constructor(t){super(t),this.state={error:null}}static getDerivedStateFromError(t){return{error:t}}render(){let{error:t}=this.state;if(!t)return this.props.children;if(t.message.includes("OAuth request creation is not available when command is launched in background"))return null;throw t}};function K(){return(0,o.jsx)(S,{children:(0,o.jsx)(x,{children:(0,o.jsx)(ce,{})})})}
