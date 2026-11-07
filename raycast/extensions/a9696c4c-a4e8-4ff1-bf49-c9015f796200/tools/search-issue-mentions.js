"use strict";var d=Object.defineProperty;var b=Object.getOwnPropertyDescriptor;var k=Object.getOwnPropertyNames;var q=Object.prototype.hasOwnProperty;var A=(s,e)=>{for(var t in e)d(s,t,{get:e[t],enumerable:!0})},v=(s,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of k(e))!q.call(s,r)&&r!==t&&d(s,r,{get:()=>e[r],enumerable:!(n=b(e,r))||n.enumerable});return s};var N=s=>v(d({},"__esModule",{value:!0}),s);var E={};A(E,{default:()=>U});module.exports=N(E);var C=require("@raycast/api");var f=require("@raycast/api");var l=require("@linear/sdk"),p=require("@raycast/api"),m=require("@raycast/utils"),o=null;async function S(s,e,t,n,r){let $=JSON.stringify({query:t,variables:n}),u=new Headers(e.headers);new Headers(r).forEach((L,x)=>u.set(x,L)),u.set("Content-Type","application/json");let i=await fetch(s,{...e,method:"POST",headers:Object.fromEntries(u.entries()),body:$}),a=i.headers.get("Content-Type")?.startsWith("application/json")?await i.json():await i.text();if(typeof a!="string"&&i.ok&&!a.errors&&a.data)return{...a,headers:i.headers,status:i.status};throw new Error(typeof a=="string"?a:a.errors?.[0]?.message??`GraphQL Error (${i.status})`)}var g=m.OAuthService.linear({scope:"read write",onAuthorize({token:s}){o=new l.LinearClient({accessToken:s,headers:{"public-file-urls-expire-in":"60","linear-raycast-extension-name":p.environment.extensionName}});let e=o.client;e.rawRequest=((t,n,r)=>S(e.url,e.options,t,n,r))}});function c(){if(!o)throw new Error("No linear client initialized");return{linearClient:o,graphQLClient:o.client}}var j=(0,f.getPreferenceValues)();function Q({inFilterBlock:s,addComma:e,inParentheses:t}={inFilterBlock:!1,inParentheses:!1,addComma:!0}){return j.shouldHideRedundantIssues?[...t?["("]:[],...e?[", "]:[],...s?[]:["filter: { "],"completedAt: { null: true }, canceledAt: { null: true }",...s?[]:[" }"],...t?[")"]:[]].join(""):""}var I=`
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
`;async function y(s){let{graphQLClient:e}=c(),{data:t}=await e.rawRequest(`
      query($after: String) {
        issues(first: 25, orderBy: updatedAt, after: $after${Q()}) {
          nodes {
            ${I}
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `,{after:s});return{issues:t?.issues.nodes,pageInfo:t?.issues.pageInfo}}async function h(s,e,t=25){let{graphQLClient:n}=c(),{data:r}=await n.rawRequest(`
      query($term: String!, $after: String, $first: Int, $includeArchived: Boolean) {
        searchIssues(first: $first, term: $term, after: $after, includeArchived: $includeArchived) {
          nodes {
            ${I}
          }
          pageInfo {
            endCursor
            hasNextPage
          }
        }
      }
    `,{term:s,after:e,first:t,includeArchived:!1});return{issues:r?.searchIssues.nodes,pageInfo:r?.searchIssues.pageInfo}}function w(s,e){return s.slice(0,50).map(t=>({title:`${t.identifier} \xB7 ${t.title}`,uri:`linear://issues/${t.id}`,description:[t.state.name,t.project?.name,t.assignee?.displayName].filter(Boolean).join(" \xB7 "),icon:e}))}var R=require("@raycast/utils");function P(s){return(0,R.withAccessToken)(g)(s)}var U=P(async({query:s})=>{let e=s.trim(),{issues:t}=e?await h(e,void 0,50):await y();return w(t??[],C.Icon.Document)});
