import{S as I,b as V,s as q,e as m,d as _,f as g,h as c,q as f,K as d,u as h,k as C,l as A,n as z,x as F}from"./index-6c37bd0f.js";/* empty css                                              */const y=/[a-zA-Z]/,b=(i,e=0)=>[...Array(i).keys()].map(t=>t+e);function k(i,e,t){const l=i.slice();return l[7]=e[t],l}function E(i){let e;return{c(){e=m("div"),this.h()},l(t){e=_(t,"DIV",{class:!0,style:!0}),g(e).forEach(c),this.h()},h(){f(e,"class","dot svelte-1uhddr4"),f(e,"style","animation-delay: "+(i[7]===1?`${+i[6]/2}${i[5]}`:"0s")+"; "+(i[7]===1?"bottom: 0;":"")+" "+(i[7]===1?"top: auto;":"")),d(e,"pause-animation",i[4])},m(t,l){C(t,e,l)},p(t,l){l&16&&d(e,"pause-animation",t[4])},d(t){t&&c(e)}}}function S(i){let e,t,l=b(2,0),s=[];for(let n=0;n<l.length;n+=1)s[n]=E(k(i,l,n));return{c(){e=m("div"),t=m("div");for(let n=0;n<s.length;n+=1)s[n].c();this.h()},l(n){e=_(n,"DIV",{class:!0,style:!0});var o=g(e);t=_(o,"DIV",{class:!0});var a=g(t);for(let u=0;u<s.length;u+=1)s[u].l(a);a.forEach(c),o.forEach(c),this.h()},h(){f(t,"class","spinner svelte-1uhddr4"),d(t,"pause-animation",i[4]),f(e,"class","wrapper svelte-1uhddr4"),h(e,"--size",i[3]+i[1]),h(e,"--color",i[0]),h(e,"--duration",i[2])},m(n,o){C(n,e,o),A(e,t);for(let a=0;a<s.length;a+=1)s[a]&&s[a].m(t,null)},p(n,[o]){if(o&112){l=b(2,0);let a;for(a=0;a<l.length;a+=1){const u=k(n,l,a);s[a]?s[a].p(u,o):(s[a]=E(u),s[a].c(),s[a].m(t,null))}for(;a<s.length;a+=1)s[a].d(1);s.length=l.length}o&16&&d(t,"pause-animation",n[4]),o&10&&h(e,"--size",n[3]+n[1]),o&1&&h(e,"--color",n[0]),o&4&&h(e,"--duration",n[2])},i:z,o:z,d(n){n&&c(e),F(s,n)}}}function U(i,e,t){var v;let{color:l="#FF3E00"}=e,{unit:s="px"}=e,{duration:n="2s"}=e,{size:o="60"}=e,{pause:a=!1}=e,u=((v=n.match(y))==null?void 0:v[0])??"s",D=n.replace(y,"");return i.$$set=r=>{"color"in r&&t(0,l=r.color),"unit"in r&&t(1,s=r.unit),"duration"in r&&t(2,n=r.duration),"size"in r&&t(3,o=r.size),"pause"in r&&t(4,a=r.pause)},[l,s,n,o,a,u,D]}class N extends I{constructor(e){super(),V(this,e,U,S,q,{color:0,unit:1,duration:2,size:3,pause:4})}}export{N as C};
