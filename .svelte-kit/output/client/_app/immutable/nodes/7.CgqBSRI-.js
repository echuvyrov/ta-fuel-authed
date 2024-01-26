import{s as re,e as m,a as T,t as X,c as h,g as O,b as w,f as d,d as Y,l as ne,q as o,u as F,i as I,h as _,n as Z,v as $,m as L,w as W}from"../chunks/scheduler.D5qmQzhB.js";import{e as C}from"../chunks/each.-oqiv04n.js";import{S as fe,i as ce}from"../chunks/index.eUYc991i.js";function x(i,l,t){const e=i.slice();return e[7]=l[t],e[9]=t,e}function ee(i,l,t){const e=i.slice();return e[10]=l[t],e[9]=t,e}function te(i){let l,t,e,r,b,n,u,v,E,y,S;return{c(){l=m("form"),t=m("div"),e=m("input"),b=T(),n=m("button"),u=m("img"),S=T(),this.h()},l(f){l=h(f,"FORM",{action:!0,method:!0});var c=w(l);t=h(c,"DIV",{class:!0});var g=w(t);e=h(g,"INPUT",{type:!0,name:!0,class:!0}),b=O(g),n=h(g,"BUTTON",{title:!0,class:!0});var D=w(n);u=h(D,"IMG",{src:!0,title:!0,class:!0}),D.forEach(d),g.forEach(d),S=O(c),c.forEach(d),this.h()},h(){o(e,"type","hidden"),e.value=r=JSON.stringify(se(i[10].foodReference)),o(e,"name","food"),o(e,"class","svelte-13ewkjp"),W(u.src,v="data:image/png;base64, "+i[10].foodReference.imageBase64)||o(u,"src",v),o(u,"title",E=i[10].foodReference.food_name),o(u,"class","food_image svelte-13ewkjp"),o(n,"title",y=i[10].foodReference.food_name),o(n,"class","svelte-13ewkjp"),o(t,"class","grid-item"),o(l,"action","?/addfood"),o(l,"method","POST")},m(f,c){I(f,l,c),_(l,t),_(t,e),_(t,b),_(t,n),_(n,u),_(l,S)},p(f,c){c&1&&r!==(r=JSON.stringify(se(f[10].foodReference)))&&(e.value=r),c&1&&!W(u.src,v="data:image/png;base64, "+f[10].foodReference.imageBase64)&&o(u,"src",v),c&1&&E!==(E=f[10].foodReference.food_name)&&o(u,"title",E),c&1&&y!==(y=f[10].foodReference.food_name)&&o(n,"title",y)},d(f){f&&d(l)}}}function le(i){let l,t=i[10].foodReference!=null&&te(i);return{c(){t&&t.c(),l=L()},l(e){t&&t.l(e),l=L()},m(e,r){t&&t.m(e,r),I(e,l,r)},p(e,r){e[10].foodReference!=null?t?t.p(e,r):(t=te(e),t.c(),t.m(l.parentNode,l)):t&&(t.d(1),t=null)},d(e){e&&d(l),t&&t.d(e)}}}function ae(i){let l,t,e,r,b,n,u,v,E,y,S;return{c(){l=m("form"),t=m("div"),e=m("input"),b=T(),n=m("button"),u=m("img"),S=T(),this.h()},l(f){l=h(f,"FORM",{action:!0,method:!0});var c=w(l);t=h(c,"DIV",{class:!0});var g=w(t);e=h(g,"INPUT",{type:!0,name:!0,class:!0}),b=O(g),n=h(g,"BUTTON",{title:!0,class:!0});var D=w(n);u=h(D,"IMG",{src:!0,alt:!0,class:!0}),D.forEach(d),g.forEach(d),S=O(c),c.forEach(d),this.h()},h(){o(e,"type","hidden"),e.value=r=JSON.stringify(ie(i[7].foodReference)),o(e,"name","food"),o(e,"class","svelte-13ewkjp"),W(u.src,v="data:image/png;base64, "+i[7].foodReference.imageBase64)||o(u,"src",v),o(u,"alt",E=i[7].foodReference.food_name+" (used "+i[7].count+" times)"),o(u,"class","food_image svelte-13ewkjp"),o(n,"title",y=i[7].foodReference.food_name+" (used "+i[7].count+" times)"),o(n,"class","svelte-13ewkjp"),o(t,"class","grid-item"),o(l,"action","?/addfood"),o(l,"method","POST")},m(f,c){I(f,l,c),_(l,t),_(t,e),_(t,b),_(t,n),_(n,u),_(l,S)},p(f,c){c&1&&r!==(r=JSON.stringify(ie(f[7].foodReference)))&&(e.value=r),c&1&&!W(u.src,v="data:image/png;base64, "+f[7].foodReference.imageBase64)&&o(u,"src",v),c&1&&E!==(E=f[7].foodReference.food_name+" (used "+f[7].count+" times)")&&o(u,"alt",E),c&1&&y!==(y=f[7].foodReference.food_name+" (used "+f[7].count+" times)")&&o(n,"title",y)},d(f){f&&d(l)}}}function oe(i){let l,t=i[7].foodReference!=null&&ae(i);return{c(){t&&t.c(),l=L()},l(e){t&&t.l(e),l=L()},m(e,r){t&&t.m(e,r),I(e,l,r)},p(e,r){e[7].foodReference!=null?t?t.p(e,r):(t=ae(e),t.c(),t.m(l.parentNode,l)):t&&(t.d(1),t=null)},d(e){e&&d(l),t&&t.d(e)}}}function de(i){let l,t,e,r,b,n,u,v,E,y,S,f,c,g,D,N,J,V,A='<div class="experienceheader">What you eat most frequently (simply click to add to today&#39;s log)</div>',U,j,P=C(i[0].todaysFoods),k=[];for(let a=0;a<P.length;a+=1)k[a]=le(ee(i,P,a));let q=C(i[0].foodReferences),R=[];for(let a=0;a<q.length;a+=1)R[a]=oe(x(i,q,a));return{c(){l=m("link"),t=T(),e=m("div"),r=m("div"),b=m("a"),n=m("i"),u=T(),v=m("div"),E=X("What you ate on "),y=X(i[1]),S=T(),f=m("div"),c=m("a"),g=m("i"),D=T(),N=m("div");for(let a=0;a<k.length;a+=1)k[a].c();J=T(),V=m("center"),V.innerHTML=A,U=T(),j=m("div");for(let a=0;a<R.length;a+=1)R[a].c();this.h()},l(a){l=h(a,"LINK",{rel:!0,href:!0}),t=O(a),e=h(a,"DIV",{class:!0});var p=w(e);r=h(p,"DIV",{class:!0});var s=w(r);b=h(s,"A",{"data-sveltekit-reload":!0,href:!0});var B=w(b);n=h(B,"I",{class:!0,style:!0}),w(n).forEach(d),B.forEach(d),s.forEach(d),u=O(p),v=h(p,"DIV",{class:!0});var z=w(v);E=Y(z,"What you ate on "),y=Y(z,i[1]),z.forEach(d),S=O(p),f=h(p,"DIV",{class:!0});var G=w(f);c=h(G,"A",{"data-sveltekit-reload":!0,href:!0});var H=w(c);g=h(H,"I",{class:!0,style:!0}),w(g).forEach(d),H.forEach(d),G.forEach(d),p.forEach(d),D=O(a),N=h(a,"DIV",{class:!0});var K=w(N);for(let M=0;M<k.length;M+=1)k[M].l(K);K.forEach(d),J=O(a),V=h(a,"CENTER",{"data-svelte-h":!0}),ne(V)!=="svelte-1btd812"&&(V.innerHTML=A),U=O(a),j=h(a,"DIV",{class:!0});var Q=w(j);for(let M=0;M<R.length;M+=1)R[M].l(Q);Q.forEach(d),this.h()},h(){o(l,"rel","stylesheet"),o(l,"href","https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"),o(n,"class","fa fa-arrow-circle-left"),F(n,"font-size","36px"),F(n,"color","blue"),F(n,"padding","10px"),o(b,"data-sveltekit-reload",""),o(b,"href","/experience/"+i[3]),o(r,"class","left-image"),o(v,"class","foodheader"),o(g,"class","fa fa-arrow-circle-right"),F(g,"font-size","36px"),F(g,"color","blue"),F(g,"padding","10px"),o(c,"data-sveltekit-reload",""),o(c,"href","/experience/"+i[2]),o(f,"class","right-image"),o(e,"class","container"),o(N,"class","grid svelte-13ewkjp"),o(j,"class","grid svelte-13ewkjp")},m(a,p){I(a,l,p),I(a,t,p),I(a,e,p),_(e,r),_(r,b),_(b,n),_(e,u),_(e,v),_(v,E),_(v,y),_(e,S),_(e,f),_(f,c),_(c,g),I(a,D,p),I(a,N,p);for(let s=0;s<k.length;s+=1)k[s]&&k[s].m(N,null);I(a,J,p),I(a,V,p),I(a,U,p),I(a,j,p);for(let s=0;s<R.length;s+=1)R[s]&&R[s].m(j,null)},p(a,[p]){if(p&1){P=C(a[0].todaysFoods);let s;for(s=0;s<P.length;s+=1){const B=ee(a,P,s);k[s]?k[s].p(B,p):(k[s]=le(B),k[s].c(),k[s].m(N,null))}for(;s<k.length;s+=1)k[s].d(1);k.length=P.length}if(p&1){q=C(a[0].foodReferences);let s;for(s=0;s<q.length;s+=1){const B=x(a,q,s);R[s]?R[s].p(B,p):(R[s]=oe(B),R[s].c(),R[s].m(j,null))}for(;s<R.length;s+=1)R[s].d(1);R.length=q.length}},i:Z,o:Z,d(a){a&&(d(l),d(t),d(e),d(D),d(N),d(J),d(V),d(U),d(j)),$(k,a),$(R,a)}}}const se=({imageBase64:i,...l})=>l,ie=({imageBase64:i,...l})=>l;function ue(i,l,t){let{data:e}=l;const r=e.today,b=new Date(r).toISOString().split("T")[0];var n=new Date(r);n.setDate(n.getDate()+1);const u=n.toISOString().split("T")[0];var v=new Date(r);v.setDate(v.getDate()-1);const E=v.toISOString().split("T")[0];return i.$$set=y=>{"data"in y&&t(0,e=y.data)},[e,b,u,E]}class ve extends fe{constructor(l){super(),ce(this,l,ue,de,re,{data:0})}}export{ve as component};
