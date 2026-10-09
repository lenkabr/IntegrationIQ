import type { Assessment } from './report';
export const sample: Assessment = {
 product:'Slack',useCase:'Import workspace members with name and email, include department and manager, and synchronize profile changes.',researchedAt:'2026-09-14',sample:true,
 report:{feasibility:'Medium',verdict:'Partially feasible',
 summary:{text:'Member import and profile-change events are documented. Department and manager coverage remains unverified, so the complete directory use case is only partially supported by this review.',status:'confirmed',sources:[1,2]},
 availability:{category:'Public API',evidence:{text:'Public Web API documentation is available; using workspace data requires authorization.',status:'confirmed',sources:[1,3]}},
 authentication:{text:'OAuth app installation grants scoped tokens. Reading email requires users:read and users:read.email.',status:'confirmed',sources:[1,3]},
 access:{text:'Each customer must authorize your product to access their Slack workspace.',status:'confirmed',sources:[3]},
 direction:'Product → Your application',
 capabilities:[
 {name:'Member names and email',text:'You can import member names and email addresses with the customer’s permission.',status:'confirmed',sources:[1]},
 {name:'Department',text:'A reliable department field was not verified in the reviewed documentation.',status:'unknown',sources:[]},
 {name:'Manager relationship',text:'A manager relationship was not verified in the reviewed documentation.',status:'unknown',sources:[]},
 {name:'Profile-change notifications',text:'Slack can notify your product when member information changes.',status:'confirmed',sources:[2]},
 ],
 endpoints:[{name:'GET https://slack.com/api/users.list',text:'Lists workspace members, including deactivated accounts. Cursor-based pagination; Tier 2 rate limit (20+ requests per minute).',status:'confirmed',sources:[1]}],
 resources:[],
 webhooks:[{name:'user_change',text:'Events API notification for member changes; requires users:read. Some profile-field changes are not covered.',status:'confirmed',sources:[2]}],
 risks:[{text:'Profile data may be missing or empty.',status:'confirmed',sources:[1]},{text:'Some profile changes, including custom fields, will not trigger a notification to your product.',status:'confirmed',sources:[2]}],
 confidence:'Medium',confidenceExplanation:'Official sources support the basic import. Department, manager coverage, and complete change synchronization need further verification.',nextStep:'Can our product access department and manager information? How can we keep those details up to date?',
 sources:[{id:1,title:'Slack · users.list',url:'https://docs.slack.dev/reference/methods/users.list/',officialReason:'Slack’s official developer documentation.'},{id:2,title:'Slack · user_change event',url:'https://docs.slack.dev/reference/events/user_change/',officialReason:'Slack’s official event reference.'},{id:3,title:'Slack · OAuth installation',url:'https://docs.slack.dev/authentication/installing-with-oauth/',officialReason:'Slack’s official authentication guide.'}]
 }
};
