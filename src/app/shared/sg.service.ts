import { Injectable } from '@angular/core';

import {Statement} from './statement.model';
import {StatementGraph} from './statement-graph.model';
import {SGEdge} from './sg-edge.model';

@Injectable({
  providedIn: 'root'
})
export class SgService {

  constructor() { }

  getStatementGraph():StatementGraph {
    let statements:Statement[] = [
      new Statement({id: 's1', title: "T -> penguin(kowalski)", type: "fact", label: "INstr"}),
      new Statement({id: 's2', title: 'penguin(kowalski) ⟶ bird(kowalski)', type: 'statement', label: 'INstr'}),
      new Statement({id: 2, title: "bird(kowalski) => fly(kowalski)"})
    ];

    let edges:SGEdge[] = [
    ];

    return new StatementGraph(statements, edges);
  }

  getStatementGraphJson():StatementGraph {
    /*return {
      statements : [
           {
             id: 's1',
             title: 'T ⟶ penguin(kowalski)',
             type: 'fact',
             label: 'INstr'
           }, {
             id: 's2',
             title: 'penguin(kowalski) ⟶ bird(kowalski)',
             type: 'statement',
             label: 'INstr'
           }, {
             id: 's3',
             title: 'bird(kowalski) ⟹ fly(kowalski)',
             type: 'statement',
             label: 'INdef'
           }, {
             id: 's4',
             title: 'penguin(kowalski) ⟶ notFly(kowalski)',
             type: 'statement',
             label: 'INstr'
           }, {
             id: 's5',
             title: 'fly(kowalski)',
             type: 'claim',
             label: 'OUTstr'
           }, {
             id: 's6',
             title: 'notFly(kowalski)',
             type: 'claim',
             label: 'INstr'
           }, {
             id: 's7',
             title: 'T ⟶ bird(tweety)',
             type: 'fact',
             label: ''
           }
         ],
     edges : [
     {
       source: 's1',
       target: 's2',
       label: 'INstr',
       type: 'support'
     }, {
       source: 's1',
       target: 's4',
       label: 'INstr',
       type: 'support'
     }, {
       source: 's2',
       target: 's3',
       label: 'INstr',
       type: 'support'
     }, {
       source: 's3',
       target: 's5',
       label: 'INdef',
       type: 'support'
     }, {
       source: 's4',
       target: 's5',
       label: 'INstr',
       type: 'attack'
     }, {
       source: 's4',
       target: 's6',
       label: 'INstr',
       type: 'support'
     }, {
       source: 's3',
       target: 's6',
       label: 'INdef',
       type: 'attack'
     }
   ]
 }/**/


    return {"edges":[{"source":"1162303582","label":"INstr","type":"support","target":"1566882597"},{"source":"-1136267363","label":"INdef","type":"attack","target":"-1515038541"},{"source":"-1015520792","label":"AMBIG","type":"support","target":"-1515038541"},{"source":"1162303582","label":"INstr","type":"support","target":"1862138746"},{"source":"-1274587735","label":"INstr","type":"support","target":"-1203003389"},{"source":"1566882597","label":"INstr","type":"support","target":"899681450"},{"source":"1795094684","label":"INdef","type":"support","target":"1484878986"},{"source":"1162303582","label":"INstr","type":"support","target":"-150220666"},{"source":"210013654","label":"INstr","type":"support","target":"-138163891"},{"source":"-150220666","label":"INstr","type":"support","target":"1985953936"},{"source":"210013654","label":"INstr","type":"support","target":"-1283355186"},{"source":"1484878986","label":"INdef","type":"attack","target":"-1015520792"},{"source":"136565836","label":"INdef","type":"support","target":"-1015520792"},{"source":"1162303582","label":"INstr","type":"support","target":"210013654"},{"source":"-753927008","label":"INstr","type":"support","target":"-592280287"},{"source":"1162303582","label":"INstr","type":"support","target":"88722268"},{"source":"-1967633836","label":"INstr","type":"support","target":"2043128081"},{"source":"1162303582","label":"INstr","type":"support","target":"-1136267363"},{"source":"-592280287","label":"INdef","type":"support","target":"-1936309750"},{"source":"1162303582","label":"INstr","type":"support","target":"311849163"},{"source":"1162303582","label":"INstr","type":"support","target":"1795094684"},{"source":"1162303582","label":"INstr","type":"support","target":"-1076686220"},{"source":"1162303582","label":"INstr","type":"support","target":"-1967633836"},{"source":"1162303582","label":"INstr","type":"support","target":"-1820986088"},{"source":"1162303582","label":"INstr","type":"support","target":"-1274587735"},{"source":"1162303582","label":"INstr","type":"support","target":"-753927008"},{"source":"311849163","label":"INdef","type":"support","target":"136565836"},{"source":"899681450","label":"INdef","type":"attack","target":"-48336145"},{"source":"2043128081","label":"INdef","type":"attack","target":"-48336145"},{"source":"-1203003389","label":"INdef","type":"support","target":"-48336145"},{"source":"1985953936","label":"INdef","type":"support","target":"-48336145"},{"source":"-753927008","label":"INstr","type":"support","target":"417871834"},{"source":"-753927008","label":"INstr","type":"support","target":"-1019003600"},{"source":"899681450","label":"INdef","type":"attack","target":"-643479663"},{"source":"2043128081","label":"INdef","type":"attack","target":"-643479663"},{"source":"-1203003389","label":"INdef","type":"support","target":"-643479663"},{"source":"1985953936","label":"INdef","type":"support","target":"-643479663"},{"source":"1162303582","label":"INstr","type":"support","target":"-72589548"},{"source":"-643479663","label":"AMBIG","type":"attack","target":"-1625718048"},{"source":"-1076686220","label":"INdef","type":"support","target":"-1625718048"},{"source":"1162303582","label":"INstr","type":"support","target":"369840241"},{"source":"-138163891","label":"INdef","type":"attack","target":"683867645"},{"source":"-1820986088","label":"INstr","type":"support","target":"683867645"},{"source":"899681450","label":"INdef","type":"attack","target":"109712139"},{"source":"2043128081","label":"INdef","type":"attack","target":"109712139"},{"source":"-1203003389","label":"INdef","type":"support","target":"109712139"},{"source":"1985953936","label":"INdef","type":"support","target":"109712139"},{"source":"-1283355186","label":"INstr","type":"attack","target":"-991626459"},{"source":"1862138746","label":"INdef","type":"support","target":"-991626459"},{"source":"-1820986088","label":"INstr","type":"support","target":"-991626459"},{"source":"-1820986088","label":"INstr","type":"support","target":"1599704669"},{"source":"-1136267363","label":"INdef","type":"attack","target":"699230824"},{"source":"-1015520792","label":"AMBIG","type":"support","target":"699230824"},{"source":"369840241","label":"INdef","type":"support","target":"699230824"},{"source":"-1136267363","label":"INdef","type":"attack","target":"-1671612069"},{"source":"-1015520792","label":"AMBIG","type":"support","target":"-1671612069"},{"source":"-753927008","label":"INstr","type":"support","target":"-1671612069"},{"source":"88722268","label":"INdef","type":"support","target":"-1338677613"},{"source":"-72589548","label":"INdef","type":"support","target":"-1338677613"},{"source":"683867645","label":"OUTdef","type":"support","target":"-857797256"},{"source":"-1515038541","label":"AMBIG","type":"support","target":"-1892552798"},{"source":"311849163","label":"INdef","type":"support","target":"185997312"},{"source":"-753927008","label":"INstr","type":"support","target":"1048360714"},{"source":"-753927008","label":"INstr","type":"support","target":"-1986873106"},{"source":"88722268","label":"INdef","type":"support","target":"-1986873106"},{"source":"-1820986088","label":"INstr","type":"support","target":"-1197892668"},{"source":"210013654","label":"INstr","type":"support","target":"-1197892668"},{"source":"-643479663","label":"AMBIG","type":"attack","target":"-1685703080"},{"source":"-1076686220","label":"INdef","type":"support","target":"-1685703080"},{"source":"417871834","label":"INdef","type":"attack","target":"733767331"},{"source":"-1936309750","label":"INdef","type":"support","target":"733767331"}],"statements":[{"id":"1566882597","label":"INstr","title":"⊤(true) -> delivery(phone, slow)","type":"fact"},{"id":"-1515038541","label":"AMBIG","title":"guilty(alice) -> sentenced(alice)","type":"statement"},{"id":"1862138746","label":"INdef","title":"⊤(true) => happy(tweety)","type":"fact"},{"id":"-1203003389","label":"INdef","title":"reviews(phone, good) => buy(phone)","type":"statement"},{"id":"899681450","label":"INdef","title":"delivery(phone, slow) => notBuy(phone)","type":"statement"},{"id":"1484878986","label":"INdef","title":"testimony(hecham, absolving, alice) -> notResponsible(alice)","type":"statement"},{"id":"-150220666","label":"INstr","title":"⊤(true) -> price(phone, cheap)","type":"fact"},{"id":"-138163891","label":"INdef","title":"brokenWings(tweety) ~> notFly(tweety)","type":"statement"},{"id":"1985953936","label":"INdef","title":"price(phone, cheap) => buy(phone)","type":"statement"},{"id":"-1283355186","label":"INstr","title":"brokenWings(tweety) -> sad(tweety)","type":"statement"},{"id":"-1015520792","label":"AMBIG","title":"responsible(alice) -> guilty(alice)","type":"statement"},{"id":"210013654","label":"INstr","title":"⊤(true) -> brokenWings(tweety)","type":"fact"},{"id":"-592280287","label":"INdef","title":"penguin(kowalski) => bird(kowalski)","type":"statement"},{"id":"88722268","label":"INdef","title":"⊤(true) => animal(kowalski)","type":"fact"},{"id":"2043128081","label":"INdef","title":"eco(phone, detrimental) => notBuy(phone)","type":"statement"},{"id":"-1136267363","label":"INdef","title":"⊤(true) => innocent(alice)","type":"fact"},{"id":"-1936309750","label":"INdef","title":"bird(kowalski) => fly(kowalski)","type":"statement"},{"id":"311849163","label":"INdef","title":"⊤(true) => testimony(raouf, incriminating, alice)","type":"fact"},{"id":"1795094684","label":"INdef","title":"⊤(true) => testimony(hecham, absolving, alice)","type":"fact"},{"id":"-1076686220","label":"INdef","title":"⊤(true) => go(vacation)","type":"fact"},{"id":"-1967633836","label":"INstr","title":"⊤(true) -> eco(phone, detrimental)","type":"fact"},{"id":"-1820986088","label":"INstr","title":"⊤(true) -> bird(tweety)","type":"fact"},{"id":"-1274587735","label":"INstr","title":"⊤(true) -> reviews(phone, good)","type":"fact"},{"id":"-753927008","label":"INstr","title":"⊤(true) -> penguin(kowalski)","type":"fact"},{"id":"136565836","label":"INdef","title":"testimony(raouf, incriminating, alice) -> responsible(alice)","type":"statement"},{"id":"-48336145","label":"","title":"buy(phone) => take(loan)","type":"statement"},{"id":"417871834","label":"INdef","title":"penguin(kowalski) => notFly(kowalski)","type":"statement"},{"id":"-1019003600","label":"","title":"penguin(kowalski) -> beautiful(kowalski)","type":"statement"},{"id":"-643479663","label":"AMBIG","title":"buy(phone) => notGo(vacation)","type":"statement"},{"id":"-72589548","label":"INdef","title":"⊤(true) => animal(tweety)","type":"fact"},{"id":"-1625718048","label":"","title":"go(vacation) => take(loan)","type":"statement"},{"id":"369840241","label":"INdef","title":"⊤(true) => female(alice)","type":"fact"},{"id":"683867645","label":"OUTdef","title":"bird(tweety) => fly(tweety)","type":"statement"},{"id":"1162303582","label":"INstr","title":" -> ⊤(true)","type":"statement"},{"id":"109712139","label":"AMBIG","title":"buy(phone)","type":"claim"},{"id":"-991626459","label":"OUTstr","title":"happy(tweety), bird(tweety)","type":"claim"},{"id":"1599704669","label":"UNSUP","title":"something(unknown), bird(tweety)","type":"claim"},{"id":"699230824","label":"AMBIG","title":"guilty(alice), female(alice)","type":"claim"},{"id":"-1671612069","label":"AMBIG","title":"guilty(alice), penguin(kowalski)","type":"claim"},{"id":"-1338677613","label":"INdef","title":"animal(kowalski), animal(tweety)","type":"claim"},{"id":"-857797256","label":"UNSUP","title":"fly(tweety)","type":"claim"},{"id":"-1892552798","label":"AMBIG","title":"sentenced(alice)","type":"claim"},{"id":"185997312","label":"INdef","title":"testimony(raouf, incriminating, alice)","type":"claim"},{"id":"1048360714","label":"INstr","title":"penguin(kowalski)","type":"claim"},{"id":"-1986873106","label":"INdef","title":"penguin(kowalski), animal(kowalski)","type":"claim"},{"id":"-1197892668","label":"INstr","title":"bird(tweety), brokenWings(tweety)","type":"claim"},{"id":"-1685703080","label":"AMBIG","title":"go(vacation)","type":"claim"},{"id":"733767331","label":"OUTdef","title":"fly(kowalski)","type":"claim"}]}

;

  }

}
