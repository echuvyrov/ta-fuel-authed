import{S as Ae,i as Se,s as Fe,J as ae,X as H,k as P,a as X,l as q,m as G,h as z,c as Y,n as v,F as R,Y as oe,b as C,G as B,T as fe,P as V,Z as Ke,K as se,L as ne,M as ie,_ as ye,g as E,d as p,U as De,$ as Z,V as Le,o as Xe,j as Ie,a0 as Oe,a1 as T,w as Q,q as Ye,r as Ze,u as Qe,a2 as ce,y as We,z as we,A as xe,a3 as $e,a4 as he,v as le,f as te,B as el,a5 as ll,e as W,N as tl,t as al,a6 as sl,a7 as nl}from"./index.4bd8640c.js";var Ee={exports:{}};(function(e,l){(function(){var t={};e.exports=t,t.simpleFilter=function(u,s){return s.filter(function(n){return t.test(u,n)})},t.test=function(u,s){return t.match(u,s)!==null},t.match=function(u,s,n){n=n||{};var i=0,o=[],r=s.length,A=0,m=0,D=n.pre||"",g=n.post||"",h=n.caseSensitive&&s||s.toLowerCase(),b;u=n.caseSensitive&&u||u.toLowerCase();for(var y=0;y<r;y++)b=s[y],h[y]===u[i]?(b=D+b+g,i+=1,m+=1+m):m=0,A+=m,o[o.length]=b;return i===u.length?(A=h===u?1/0:A,{rendered:o.join(""),score:A}):null},t.filter=function(u,s,n){return!s||s.length===0?[]:typeof u!="string"?s:(n=n||{},s.reduce(function(i,o,r,A){var m=o;n.extract&&(m=n.extract(o));var D=t.match(u,m,n);return D!=null&&(i[i.length]={string:D.rendered,score:D.score,index:r,original:o}),i},[]).sort(function(i,o){var r=o.score-i.score;return r||i.index-o.index}))}})()})(Ee);const il=Ee.exports;const ul=e=>({}),de=e=>({});function rl(e){let l;return{c(){l=Ye(e[2])},l(t){l=Ze(t,e[2])},m(t,u){C(t,l,u)},p(t,u){u&4&&Qe(l,t[2])},d(t){t&&z(l)}}}function ol(e){let l,t,u,s,n,i,o,r,A,m;const D=e[10].label,g=ae(D,e,e[9],de),h=g||rl(e);let b=[{name:"search"},{type:"search"},{placeholder:"Search..."},{autocomplete:"off"},{spellcheck:"false"},e[6],{id:e[4]}],y={};for(let d=0;d<b.length;d+=1)y=H(y,b[d]);return{c(){l=P("form"),t=P("label"),h&&h.c(),s=X(),n=P("input"),this.h()},l(d){l=q(d,"FORM",{"data-svelte-search":!0,role:!0,"aria-labelledby":!0});var S=G(l);t=q(S,"LABEL",{id:!0,for:!0,class:!0});var I=G(t);h&&h.l(I),I.forEach(z),s=Y(S),n=q(S,"INPUT",{name:!0,type:!0,placeholder:!0,autocomplete:!0,spellcheck:!0,id:!0}),S.forEach(z),this.h()},h(){v(t,"id",u=e[4]+"-label"),v(t,"for",e[4]),v(t,"class","svelte-5m0wg6"),R(t,"hide-label",e[3]),oe(n,y),R(n,"svelte-5m0wg6",!0),v(l,"data-svelte-search",""),v(l,"role",i=e[5]?null:"search"),v(l,"aria-labelledby",o=e[5]?null:e[4])},m(d,S){C(d,l,S),B(l,t),h&&h.m(t,null),B(l,s),B(l,n),n.autofocus&&n.focus(),e[17](n),fe(n,e[0]),r=!0,A||(m=[V(n,"input",e[18]),V(n,"input",e[12]),V(n,"change",e[13]),V(n,"focus",e[14]),V(n,"blur",e[15]),V(n,"keydown",e[16]),V(l,"submit",Ke(e[11]))],A=!0)},p(d,[S]){g?g.p&&(!r||S&512)&&se(g,D,d,d[9],r?ie(D,d[9],S,ul):ne(d[9]),de):h&&h.p&&(!r||S&4)&&h.p(d,r?S:-1),(!r||S&16&&u!==(u=d[4]+"-label"))&&v(t,"id",u),(!r||S&16)&&v(t,"for",d[4]),(!r||S&8)&&R(t,"hide-label",d[3]),oe(n,y=ye(b,[{name:"search"},{type:"search"},{placeholder:"Search..."},{autocomplete:"off"},{spellcheck:"false"},S&64&&d[6],(!r||S&16)&&{id:d[4]}])),S&1&&fe(n,d[0]),R(n,"svelte-5m0wg6",!0),(!r||S&32&&i!==(i=d[5]?null:"search"))&&v(l,"role",i),(!r||S&48&&o!==(o=d[5]?null:d[4]))&&v(l,"aria-labelledby",o)},i(d){r||(E(h,d),r=!0)},o(d){p(h,d),r=!1},d(d){d&&z(l),h&&h.d(d),e[17](null),A=!1,De(m)}}}function fl(e,l,t){const u=["value","autofocus","debounce","label","hideLabel","id","ref","removeFormAriaAttributes"];let s=Z(l,u),{$$slots:n={},$$scope:i}=l,{value:o=""}=l,{autofocus:r=!1}=l,{debounce:A=0}=l,{label:m="Label"}=l,{hideLabel:D=!1}=l,{id:g="search"+Math.random().toString(36)}=l,{ref:h=null}=l,{removeFormAriaAttributes:b=!1}=l;const y=Le();let d=o,S,I=!1;function _(c){I||(I=!0,S=setTimeout(()=>{c(),I=!1},A))}Xe(()=>(r&&window.requestAnimationFrame(()=>h.focus()),()=>clearTimeout(S))),Ie(()=>{o.length>0&&o!==d&&(A>0?_(()=>y("type",o)):y("type",o)),o.length===0&&d.length>0&&y("clear"),d=o});function F(c){T.call(this,e,c)}function f(c){T.call(this,e,c)}function k(c){T.call(this,e,c)}function O(c){T.call(this,e,c)}function w(c){T.call(this,e,c)}function N(c){T.call(this,e,c)}function M(c){Q[c?"unshift":"push"](()=>{h=c,t(1,h)})}function U(){o=this.value,t(0,o)}return e.$$set=c=>{l=H(H({},l),Oe(c)),t(6,s=Z(l,u)),"value"in c&&t(0,o=c.value),"autofocus"in c&&t(7,r=c.autofocus),"debounce"in c&&t(8,A=c.debounce),"label"in c&&t(2,m=c.label),"hideLabel"in c&&t(3,D=c.hideLabel),"id"in c&&t(4,g=c.id),"ref"in c&&t(1,h=c.ref),"removeFormAriaAttributes"in c&&t(5,b=c.removeFormAriaAttributes),"$$scope"in c&&t(9,i=c.$$scope)},[o,h,m,D,g,b,s,r,A,i,n,F,f,k,O,w,N,M,U]}class cl extends Ae{constructor(l){super(),Se(this,l,fl,ol,Fe,{value:0,autofocus:7,debounce:8,label:2,hideLabel:3,id:4,ref:1,removeFormAriaAttributes:5})}}const hl=cl;const dl=e=>({value:e[0]&1,result:e[0]&2}),_e=e=>({value:e[0],result:e[47],index:e[49]});function be(e,l,t){const u=e.slice();return u[47]=l[t],u[49]=t,u}const _l=e=>({result:e[0]&2,value:e[0]&1}),me=e=>({result:e[47],index:e[49],value:e[0]});function ge(e){let l,t,u=e[1],s=[];for(let i=0;i<u.length;i+=1)s[i]=ve(be(e,u,i));const n=i=>p(s[i],1,1,()=>{s[i]=null});return{c(){for(let i=0;i<s.length;i+=1)s[i].c();l=W()},l(i){for(let o=0;o<s.length;o+=1)s[o].l(i);l=W()},m(i,o){for(let r=0;r<s.length;r+=1)s[r].m(i,o);C(i,l,o),t=!0},p(i,o){if(o[0]&67111943){u=i[1];let r;for(r=0;r<u.length;r+=1){const A=be(i,u,r);s[r]?(s[r].p(A,o),E(s[r],1)):(s[r]=ve(A),s[r].c(),E(s[r],1),s[r].m(l.parentNode,l))}for(le(),r=u.length;r<s.length;r+=1)n(r);te()}},i(i){if(!t){for(let o=0;o<u.length;o+=1)E(s[o]);t=!0}},o(i){s=s.filter(Boolean);for(let o=0;o<s.length;o+=1)p(s[o]);t=!1},d(i){tl(s,i),i&&z(l)}}}function bl(e){let l,t=e[47].string+"",u;return{c(){l=new sl(!1),u=W(),this.h()},l(s){l=nl(s,!1),u=W(),this.h()},h(){l.a=u},m(s,n){l.m(t,s,n),C(s,u,n)},p(s,n){n[0]&2&&t!==(t=s[47].string+"")&&l.p(t)},d(s){s&&z(u),s&&l.d()}}}function ve(e){let l,t,u,s,n,i,o;const r=e[27].default,A=ae(r,e,e[26],me),m=A||bl(e);function D(){return e[40](e[47],e[49])}function g(){return e[41](e[47],e[49])}return{c(){l=P("li"),m&&m.c(),t=X(),this.h()},l(h){l=q(h,"LI",{role:!0,id:!0,"aria-selected":!0,class:!0});var b=G(l);m&&m.l(b),t=Y(b),b.forEach(z),this.h()},h(){v(l,"role","option"),v(l,"id",u=e[2]+"-result-"+e[49]),v(l,"aria-selected",s=e[10]===e[49]),v(l,"class","svelte-1t4elht"),R(l,"selected",e[10]===e[49]),R(l,"disabled",e[47].disabled)},m(h,b){C(h,l,b),m&&m.m(l,null),B(l,t),n=!0,i||(o=[V(l,"click",D),V(l,"mouseenter",g)],i=!0)},p(h,b){e=h,A?A.p&&(!n||b[0]&67108867)&&se(A,r,e,e[26],n?ie(r,e[26],b,_l):ne(e[26]),me):m&&m.p&&(!n||b[0]&2)&&m.p(e,n?b:[-1,-1]),(!n||b[0]&4&&u!==(u=e[2]+"-result-"+e[49]))&&v(l,"id",u),(!n||b[0]&1024&&s!==(s=e[10]===e[49]))&&v(l,"aria-selected",s),(!n||b[0]&1024)&&R(l,"selected",e[10]===e[49]),(!n||b[0]&2)&&R(l,"disabled",e[47].disabled)},i(h){n||(E(m,h),n=!0)},o(h){p(m,h),n=!1},d(h){h&&z(l),m&&m.d(h),i=!1,De(o)}}}function ke(e){let l,t;const u=e[27]["no-results"],s=ae(u,e,e[26],_e);return{c(){l=P("div"),s&&s.c(),this.h()},l(n){l=q(n,"DIV",{class:!0});var i=G(l);s&&s.l(i),i.forEach(z),this.h()},h(){v(l,"class","svelte-1t4elht"),R(l,"no-results",!0)},m(n,i){C(n,l,i),s&&s.m(l,null),t=!0},p(n,i){s&&s.p&&(!t||i[0]&67108867)&&se(s,u,n,n[26],t?ie(u,n[26],i,dl):ne(n[26]),_e)},i(n){t||(E(s,n),t=!0)},o(n){p(s,n),t=!1},d(n){n&&z(l),s&&s.d(n)}}}function ml(e){let l,t,u,s,n,i,o,r,A,m,D,g,h,b;const y=[{id:e[2]},{removeFormAriaAttributes:!0},e[16],{"aria-autocomplete":"list"},{"aria-controls":e[2]+"-listbox"},{"aria-labelledby":e[2]+"-label"},{"aria-activedescendant":e[10]>=0&&!e[5]&&e[1].length>0?`${e[2]}-result-${e[10]}`:null}];function d(f){e[29](f)}function S(f){e[30](f)}let I={};for(let f=0;f<y.length;f+=1)I=H(I,y[f]);e[9]!==void 0&&(I.ref=e[9]),e[0]!==void 0&&(I.value=e[0]),t=new hl({props:I}),Q.push(()=>ce(t,"ref",d,e[9])),Q.push(()=>ce(t,"value",S,e[0])),t.$on("type",e[31]),t.$on("input",e[32]),t.$on("change",e[33]),t.$on("focus",e[34]),t.$on("focus",e[35]),t.$on("clear",e[36]),t.$on("clear",e[13]),t.$on("blur",e[37]),t.$on("keydown",e[38]),t.$on("keydown",e[39]);let _=e[7]&&ge(e),F=e[15]["no-results"]&&!e[5]&&e[0].length>0&&e[1].length===0&&ke(e);return{c(){l=P("div"),We(t.$$.fragment),n=X(),i=P("ul"),_&&_.c(),o=X(),F&&F.c(),this.h()},l(f){l=q(f,"DIV",{"data-svelte-typeahead":!0,role:!0,"aria-haspopup":!0,"aria-controls":!0,"aria-expanded":!0,id:!0,class:!0});var k=G(l);we(t.$$.fragment,k),n=Y(k),i=q(k,"UL",{role:!0,"aria-labelledby":!0,id:!0,class:!0});var O=G(i);_&&_.l(O),o=Y(O),F&&F.l(O),O.forEach(z),k.forEach(z),this.h()},h(){v(i,"role","listbox"),v(i,"aria-labelledby",r=e[2]+"-label"),v(i,"id",A=e[2]+"-listbox"),v(i,"class","svelte-1t4elht"),R(i,"svelte-typeahead-list",!0),v(l,"data-svelte-typeahead",""),v(l,"role","combobox"),v(l,"aria-haspopup","listbox"),v(l,"aria-controls",m=e[2]+"-listbox"),v(l,"aria-expanded",e[7]),v(l,"id",D=e[2]+"-typeahead"),v(l,"class","svelte-1t4elht"),R(l,"dropdown",e[1].length>0)},m(f,k){C(f,l,k),xe(t,l,null),B(l,n),B(l,i),_&&_.m(i,null),B(i,o),F&&F.m(i,null),e[42](l),g=!0,h||(b=V(window,"click",e[28]),h=!0)},p(f,k){const O=k[0]&66598?ye(y,[k[0]&4&&{id:f[2]},y[1],k[0]&65536&&$e(f[16]),y[3],k[0]&4&&{"aria-controls":f[2]+"-listbox"},k[0]&4&&{"aria-labelledby":f[2]+"-label"},k[0]&1062&&{"aria-activedescendant":f[10]>=0&&!f[5]&&f[1].length>0?`${f[2]}-result-${f[10]}`:null}]):{};!u&&k[0]&512&&(u=!0,O.ref=f[9],he(()=>u=!1)),!s&&k[0]&1&&(s=!0,O.value=f[0],he(()=>s=!1)),t.$set(O),f[7]?_?(_.p(f,k),k[0]&128&&E(_,1)):(_=ge(f),_.c(),E(_,1),_.m(i,o)):_&&(le(),p(_,1,1,()=>{_=null}),te()),f[15]["no-results"]&&!f[5]&&f[0].length>0&&f[1].length===0?F?(F.p(f,k),k[0]&32803&&E(F,1)):(F=ke(f),F.c(),E(F,1),F.m(i,null)):F&&(le(),p(F,1,1,()=>{F=null}),te()),(!g||k[0]&4&&r!==(r=f[2]+"-label"))&&v(i,"aria-labelledby",r),(!g||k[0]&4&&A!==(A=f[2]+"-listbox"))&&v(i,"id",A),(!g||k[0]&4&&m!==(m=f[2]+"-listbox"))&&v(l,"aria-controls",m),(!g||k[0]&128)&&v(l,"aria-expanded",f[7]),(!g||k[0]&4&&D!==(D=f[2]+"-typeahead"))&&v(l,"id",D),(!g||k[0]&2)&&R(l,"dropdown",f[1].length>0)},i(f){g||(E(t.$$.fragment,f),E(_),E(F),g=!0)},o(f){p(t.$$.fragment,f),p(_),p(F),g=!1},d(f){f&&z(l),el(t),_&&_.d(),F&&F.d(),e[42](null),h=!1,b()}}}function gl(e,l,t){let u,s,n;const i=["id","value","data","extract","disable","filter","autoselect","inputAfterSelect","results","focusAfterSelect","showDropdownOnFocus","showAllResultsOnFocus","limit"];let o=Z(l,i),{$$slots:r={},$$scope:A}=l;const m=ll(r);let{id:D="typeahead-"+Math.random().toString(36)}=l,{value:g=""}=l,{data:h=[]}=l,{extract:b=a=>a}=l,{disable:y=a=>!1}=l,{filter:d=a=>!1}=l,{autoselect:S=!0}=l,{inputAfterSelect:I="update"}=l,{results:_=[]}=l,{focusAfterSelect:F=!1}=l,{showDropdownOnFocus:f=!1}=l,{showAllResultsOnFocus:k=!1}=l,{limit:O=1/0}=l;const w=Le();let N=null,M=null,U=!1,c=-1,x="",J=!1;Ie(()=>{x!==s&&S&&t(10,c=Te()),x!==s&&!m["no-results"]&&t(5,U=_.length===0),x=s});async function $(){const a=_[c];if(a.disabled)return;const L=b(a.original),j=g;I=="clear"&&t(0,g=""),I=="update"&&t(0,g=L),w("select",{selectedIndex:c,searched:j,selected:L,original:a.original,originalIndex:a.index}),await al(),F&&M.focus(),K()}function Te(){var j,re;let a=0,L=((j=_[a])==null?void 0:j.disabled)??!1;for(;L;)a===_.length?a=0:a+=1,L=((re=_[a])==null?void 0:re.disabled)??!1;return a}function ee(a){let L=a===1&&c===_.length-1?0:c+a;L<0&&(L=_.length-1);let j=_[L].disabled;for(;j;)L===_.length?L=0:L+=a,j=_[L].disabled;t(10,c=L)}const ue=()=>t(5,U=!1),K=()=>{t(5,U=!0),t(6,J=!1)},ze=({target:a})=>{!U&&!(N!=null&&N.contains(a))&&K()};function Re(a){M=a,t(9,M)}function Ve(a){g=a,t(0,g)}function pe(a){T.call(this,e,a)}function Me(a){T.call(this,e,a)}function Ne(a){T.call(this,e,a)}function Ue(a){T.call(this,e,a)}const je=()=>{ue(),(f||k)&&(t(7,n=!0),t(6,J=!0))};function Pe(a){T.call(this,e,a)}function qe(a){T.call(this,e,a)}function Be(a){T.call(this,e,a)}const Ce=a=>{if(_.length!==0)switch(a.key){case"Enter":$();break;case"ArrowDown":a.preventDefault(),ee(1);break;case"ArrowUp":a.preventDefault(),ee(-1);break;case"Escape":a.preventDefault(),t(0,g=""),M==null||M.focus(),K();break}},He=(a,L)=>{a.disabled||(t(10,c=L),$())},Ge=(a,L)=>{a.disabled||t(10,c=L)};function Je(a){Q[a?"unshift":"push"](()=>{N=a,t(8,N)})}return e.$$set=a=>{l=H(H({},l),Oe(a)),t(16,o=Z(l,i)),"id"in a&&t(2,D=a.id),"value"in a&&t(0,g=a.value),"data"in a&&t(17,h=a.data),"extract"in a&&t(18,b=a.extract),"disable"in a&&t(19,y=a.disable),"filter"in a&&t(20,d=a.filter),"autoselect"in a&&t(21,S=a.autoselect),"inputAfterSelect"in a&&t(22,I=a.inputAfterSelect),"results"in a&&t(1,_=a.results),"focusAfterSelect"in a&&t(23,F=a.focusAfterSelect),"showDropdownOnFocus"in a&&t(3,f=a.showDropdownOnFocus),"showAllResultsOnFocus"in a&&t(4,k=a.showAllResultsOnFocus),"limit"in a&&t(24,O=a.limit),"$$scope"in a&&t(26,A=a.$$scope)},e.$$.update=()=>{e.$$.dirty[0]&262144&&t(25,u={pre:"<mark>",post:"</mark>",extract:b}),e.$$.dirty[0]&52035585&&t(1,_=il.filter(g,h,u).filter(({score:a})=>a>0).slice(0,O).filter(a=>!d(a.original)).map(a=>({...a,disabled:y(a.original)}))),e.$$.dirty[0]&1966161&&J&&k&&g.length===0&&t(1,_=h.filter(a=>!d(a)).map((a,L)=>({disabled:y(a),index:L,original:a,score:0,string:b(a)}))),e.$$.dirty[0]&262146&&(s=_.map(a=>b(a.original)).join("")),e.$$.dirty[0]&34&&t(7,n=!U&&_.length>0),e.$$.dirty[0]&200&&f&&t(7,n=n&&J)},[g,_,D,f,k,U,J,n,N,M,c,$,ee,ue,K,m,o,h,b,y,d,S,I,F,O,u,A,r,ze,Re,Ve,pe,Me,Ne,Ue,je,Pe,qe,Be,Ce,He,Ge,Je]}class kl extends Ae{constructor(l){super(),Se(this,l,gl,ml,Fe,{id:2,value:0,data:17,extract:18,disable:19,filter:20,autoselect:21,inputAfterSelect:22,results:1,focusAfterSelect:23,showDropdownOnFocus:3,showAllResultsOnFocus:4,limit:24},null,[-1,-1])}}export{kl as T};
