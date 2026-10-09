import type { Assessment } from './report';
export const sample: Assessment = {
 product:'Slack',useCase:'Import workspace members with name and email, include department and manager, and synchronize profile changes.',researchedAt:'2026-09-14',sample:true,
 report:{feasibility:'Medium',verdict:'Partially feasible',
 summary:{text:'Your product can import members and receive some profile updates. We still need to confirm access to department and manager information.',status:'confirmed',sources:[1,2]},
 availability:{category:'Public API',evidence:{text:'The API documentation is public, but each customer must give permission to access their workspace.',status:'confirmed',sources:[1,3]}},
 authentication:{text:'Customers connect their workspace through OAuth, a permission-based sign-in process. Access to email addresses needs an extra permission.',status:'confirmed',sources:[1,3]},
 access:{text:'Each customer must authorize your product to access their Slack workspace.',status:'confirmed',sources:[3]},
 direction:'Product → Your application',
 capabilities:[
 {name:'Member names and email',text:'You can import member names and email addresses with the customer’s permission.',status:'confirmed',sources:[1]},
 {name:'Department',text:'We couldn’t confirm that your product can read a member’s department.',status:'unknown',sources:[]},
 {name:'Manager relationship',text:'We couldn’t confirm that your product can identify each member’s manager.',status:'unknown',sources:[]},
 {name:'Profile-change notifications',text:'Slack can notify your product when member information changes.',status:'confirmed',sources:[2]},
 ],
 endpoints:[{name:'GET https://slack.com/api/users.list',text:'Read the workspace member list, including people whose accounts have been deactivated.',status:'confirmed',sources:[1]}],
 partnerAccess:{developer_access:{text:'Developer signup requirements were not checked in this older sample.',status:'unknown',sources:[]},fees:{text:'Developer or partner fees were not checked in this sample.',status:'unknown',sources:[]},partner_program:{text:'Partner application and selection requirements were not checked.',status:'unknown',sources:[]},marketplace:{text:'Marketplace availability was not checked in this sample.',status:'unknown',sources:[]},listing_requirements:{text:'Requirements to publish an integration were not checked.',status:'unknown',sources:[]}},
 resources:[],
 webhooks:[{name:'user_change',text:'Receive notifications when member details change. Permission to read members is required; some changes are not included.',status:'confirmed',sources:[2]}],
 risks:[{text:'Profile data may be missing or empty.',status:'confirmed',sources:[1]},{text:'Some profile changes, including custom fields, will not trigger a notification to your product.',status:'confirmed',sources:[2]}],
 confidence:'Medium',confidenceExplanation:'Official sources support the basic import. Department, manager coverage, and complete change synchronization need further verification.',nextStep:'Can our product access department and manager information? How can we keep those details up to date?',
 sources:[{id:1,title:'Slack · users.list',url:'https://docs.slack.dev/reference/methods/users.list/',officialReason:'Slack’s official developer documentation.'},{id:2,title:'Slack · user_change event',url:'https://docs.slack.dev/reference/events/user_change/',officialReason:'Slack’s official event reference.'},{id:3,title:'Slack · OAuth installation',url:'https://docs.slack.dev/authentication/installing-with-oauth/',officialReason:'Slack’s official authentication guide.'}]
 }
};
