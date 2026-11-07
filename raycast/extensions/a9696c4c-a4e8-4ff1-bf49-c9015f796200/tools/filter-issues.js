"use strict";var f=Object.defineProperty;var b=Object.getOwnPropertyDescriptor;var C=Object.getOwnPropertyNames;var L=Object.prototype.hasOwnProperty;var $=(t,e)=>{for(var s in e)f(t,s,{get:e[s],enumerable:!0})},R=(t,e,s,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of C(e))!L.call(t,r)&&r!==s&&f(t,r,{get:()=>e[r],enumerable:!(n=b(e,r))||n.enumerable});return t};var k=t=>R(f({},"__esModule",{value:!0}),t);var q={};$(q,{default:()=>E});module.exports=k(q);var P=require("@raycast/utils");var I=require("@raycast/api");var g=require("@linear/sdk"),m=require("@raycast/api"),y=require("@raycast/utils"),l=null;async function v(t,e,s,n,r){let u=JSON.stringify({query:s,variables:n}),a=new Headers(e.headers);new Headers(r).forEach((c,d)=>a.set(d,c)),a.set("Content-Type","application/json");let i=await fetch(t,{...e,method:"POST",headers:Object.fromEntries(a.entries()),body:u}),o=i.headers.get("Content-Type")?.startsWith("application/json")?await i.json():await i.text();if(typeof o!="string"&&i.ok&&!o.errors&&o.data)return{...o,headers:i.headers,status:i.status};throw new Error(typeof o=="string"?o:o.errors?.[0]?.message??`GraphQL Error (${i.status})`)}var w=y.OAuthService.linear({scope:"read write",onAuthorize({token:t}){l=new g.LinearClient({accessToken:t,headers:{"public-file-urls-expire-in":"60","linear-raycast-extension-name":m.environment.extensionName}});let e=l.client;e.rawRequest=((s,n,r)=>v(e.url,e.options,s,n,r))}});function p(){if(!l)throw new Error("No linear client initialized");return{linearClient:l,graphQLClient:l.client}}var T=(0,I.getPreferenceValues)();function A({inFilterBlock:t,addComma:e,inParentheses:s}={inFilterBlock:!1,inParentheses:!1,addComma:!0}){return T.shouldHideRedundantIssues?[...s?["("]:[],...e?[", "]:[],...t?[]:["filter: { "],"completedAt: { null: true }, canceledAt: { null: true }",...t?[]:[" }"],...s?[")"]:[]].join(""):""}var N=`
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
`;async function h(t,e,s=25){let{graphQLClient:n}=p(),{data:r}=await n.rawRequest(`
      query($filter: IssueFilter!, $after: String, $first: Int) {
        issues(first: $first, filter: $filter, after: $after${A()}) {
          nodes {
            ${N}
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    `,{filter:JSON.parse(t),after:e,first:s});return{issues:r?.issues.nodes,pageInfo:r?.issues.pageInfo}}async function x(t,e={}){return j(t,()=>!0,e)}async function j(t,e,s={},n=1/0){let r=Math.min(Math.max(s.limit??50,1),250),u=[],a=s.cursor,i=!1,o=0;for(;u.length<r&&o++<n;){let c=await t({first:Math.min(100,r-u.length),after:a});for(let d of c.nodes)await e(d)&&u.push(d);if(a=c.pageInfo.endCursor??void 0,i=c.pageInfo.hasNextPage,!i||c.nodes.length===0)break}return{nodes:u,nextCursor:i?a:void 0}}var E=(0,P.withAccessToken)(w)(async t=>x(async({first:e,after:s})=>{let n=await h(t.filter,s,e);return{nodes:n.issues??[],pageInfo:n.pageInfo??{hasNextPage:!1}}},t));
