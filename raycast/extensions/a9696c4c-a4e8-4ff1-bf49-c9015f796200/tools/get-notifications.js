"use strict";var f=Object.defineProperty;var P=Object.getOwnPropertyDescriptor;var C=Object.getOwnPropertyNames;var L=Object.prototype.hasOwnProperty;var N=(e,t)=>{for(var r in t)f(e,r,{get:t[r],enumerable:!0})},I=(e,t,r,s)=>{if(t&&typeof t=="object"||typeof t=="function")for(let n of C(t))!L.call(e,n)&&n!==r&&f(e,n,{get:()=>t[n],enumerable:!(s=P(t,n))||s.enumerable});return e};var T=e=>I(f({},"__esModule",{value:!0}),e);var O={};N(O,{default:()=>j});module.exports=T(O);var g=require("@linear/sdk"),m=require("@raycast/api"),y=require("@raycast/utils"),c=null;async function A(e,t,r,s,n){let o=JSON.stringify({query:r,variables:s}),l=new Headers(t.headers);new Headers(n).forEach((u,d)=>l.set(d,u)),l.set("Content-Type","application/json");let i=await fetch(e,{...t,method:"POST",headers:Object.fromEntries(l.entries()),body:o}),a=i.headers.get("Content-Type")?.startsWith("application/json")?await i.json():await i.text();if(typeof a!="string"&&i.ok&&!a.errors&&a.data)return{...a,headers:i.headers,status:i.status};throw new Error(typeof a=="string"?a:a.errors?.[0]?.message??`GraphQL Error (${i.status})`)}var w=y.OAuthService.linear({scope:"read write",onAuthorize({token:e}){c=new g.LinearClient({accessToken:e,headers:{"public-file-urls-expire-in":"60","linear-raycast-extension-name":m.environment.extensionName}});let t=c.client;t.rawRequest=((r,s,n)=>A(t.url,t.options,r,s,n))}});function p(){if(!c)throw new Error("No linear client initialized");return{linearClient:c,graphQLClient:c.client}}async function x(e,t,r={},s=1/0){let n=Math.min(Math.max(r.limit??50,1),250),o=[],l=r.cursor,i=!1,a=0;for(;o.length<n&&a++<s;){let u=await e({first:Math.min(100,n-o.length),after:l});for(let d of u.nodes)await t(d)&&o.push(d);if(l=u.pageInfo.endCursor??void 0,i=u.pageInfo.hasNextPage,!i||u.nodes.length===0)break}return{nodes:o,nextCursor:i?l:void 0}}var h=require("@raycast/utils");function b(e){return(0,h.withAccessToken)(w)(e)}var j=b(async e=>{let{graphQLClient:t}=p(),r=await x(async({first:s,after:n})=>{let{data:o}=await t.rawRequest($,{first:s,after:n});if(!o)throw new Error("Failed to load notifications.");return o.notifications},s=>!e.unreadOnly||!s.readAt,e,e.unreadOnly?R:void 0);return{nodes:r.nodes.map(v),nextCursor:r.nextCursor}});function v(e){return{id:e.id,type:e.type,title:e.title,subtitle:e.subtitle,url:e.url,createdAt:e.createdAt,readAt:e.readAt??void 0,snoozedUntilAt:e.snoozedUntilAt??void 0,actor:e.actor?.displayName??e.botActor?.name??void 0,issue:e.issue?{identifier:e.issue.identifier,title:e.issue.title,url:e.issue.url,status:e.issue.state?.name}:void 0,comment:e.comment?E(e.comment.body,_):void 0,project:e.project?{name:e.project.name,url:e.project.url}:void 0}}function E(e,t){return e.length>t?`${e.slice(0,t)}\u2026`:e}var _=500,R=3,$=`
  query ($first: Int, $after: String) {
    notifications(first: $first, after: $after) {
      nodes {
        id
        type
        title
        subtitle
        url
        createdAt
        readAt
        snoozedUntilAt
        actor { displayName }
        botActor { name }
        ... on IssueNotification {
          comment { body }
          issue { identifier title url state { name } }
        }
        ... on ProjectNotification {
          project { name url }
        }
      }
      pageInfo { hasNextPage endCursor }
    }
  }
`;
