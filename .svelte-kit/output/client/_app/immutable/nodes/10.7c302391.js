import{S as $,i as q,s as w,e as H,b as f,H as P,h as o,I as D,k as v,q as h,a as S,l as y,m as k,r as b,c as Y,n as T,G as d,u as C}from"../chunks/index.4bd8640c.js";import{p as G}from"../chunks/stores.97a00edc.js";function I(u){let s,c,n,e,t,r;return{c(){s=v("h1"),c=h("Access Denied"),n=S(),e=v("p"),t=v("a"),r=h("You must be signed in to view this page"),this.h()},l(i){s=y(i,"H1",{});var l=k(s);c=b(l,"Access Denied"),l.forEach(o),n=Y(i),e=y(i,"P",{});var _=k(e);t=y(_,"A",{href:!0});var m=k(t);r=b(m,"You must be signed in to view this page"),m.forEach(o),_.forEach(o),this.h()},h(){T(t,"href","/auth/signin")},m(i,l){f(i,s,l),d(s,c),f(i,n,l),f(i,e,l),d(e,t),d(t,r)},p:P,d(i){i&&o(s),i&&o(n),i&&o(e)}}}function N(u){var A;let s,c,n,e,t,r,i,l,_=((A=u[0].data.session)==null?void 0:A.expires)+"",m;return{c(){s=v("h1"),c=h("Protected page"),n=S(),e=v("p"),t=h(`This is a protected content. You can access this content because you are
  signed in.`),r=S(),i=v("p"),l=h("Session expiry: "),m=h(_)},l(a){s=y(a,"H1",{});var p=k(s);c=b(p,"Protected page"),p.forEach(o),n=Y(a),e=y(a,"P",{});var x=k(e);t=b(x,`This is a protected content. You can access this content because you are
  signed in.`),x.forEach(o),r=Y(a),i=y(a,"P",{});var E=k(i);l=b(E,"Session expiry: "),m=b(E,_),E.forEach(o)},m(a,p){f(a,s,p),d(s,c),f(a,n,p),f(a,e,p),d(e,t),f(a,r,p),f(a,i,p),d(i,l),d(i,m)},p(a,p){var x;p&1&&_!==(_=((x=a[0].data.session)==null?void 0:x.expires)+"")&&C(m,_)},d(a){a&&o(s),a&&o(n),a&&o(e),a&&o(r),a&&o(i)}}}function j(u){let s;function c(t,r){return t[0].data.session?N:I}let n=c(u),e=n(u);return{c(){e.c(),s=H()},l(t){e.l(t),s=H()},m(t,r){e.m(t,r),f(t,s,r)},p(t,[r]){n===(n=c(t))&&e?e.p(t,r):(e.d(1),e=n(t),e&&(e.c(),e.m(s.parentNode,s)))},i:P,o:P,d(t){e.d(t),t&&o(s)}}}function z(u,s,c){let n;return D(u,G,e=>c(0,n=e)),[n]}class J extends ${constructor(s){super(),q(this,s,z,j,w,{})}}export{J as component};