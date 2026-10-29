var n0=Object.defineProperty;var i0=(s,t,e)=>t in s?n0(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var Qh=(s,t,e)=>i0(s,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Zc="174",s0=0,tu=1,r0=2,Kf=1,Qf=2,ii=3,di=0,Ye=1,Un=2,Di=0,rs=1,ua=2,eu=3,nu=4,o0=5,Qi=100,a0=101,l0=102,c0=103,h0=104,u0=200,f0=201,d0=202,p0=203,Vl=204,Gl=205,m0=206,g0=207,_0=208,v0=209,x0=210,y0=211,M0=212,S0=213,b0=214,Wl=0,Xl=1,ql=2,Qs=3,Yl=4,$l=5,Zl=6,Jl=7,td=0,w0=1,T0=2,Li=0,E0=1,A0=2,R0=3,C0=4,P0=5,D0=6,ed=7,nd=300,tr=301,er=302,jl=303,Kl=304,Aa=306,nr=1e3,ns=1001,Ql=1002,kn=1003,L0=1004,_o=1005,On=1006,Wa=1007,is=1008,pi=1009,id=1010,sd=1011,Wr=1012,Jc=1013,us=1014,ci=1015,lo=1016,jc=1017,Kc=1018,ir=1020,rd=35902,od=1021,ad=1022,Fn=1023,ld=1024,cd=1025,$s=1026,sr=1027,hd=1028,Qc=1029,ud=1030,th=1031,eh=1033,Qo=33776,ta=33777,ea=33778,na=33779,tc=35840,ec=35841,nc=35842,ic=35843,sc=36196,rc=37492,oc=37496,ac=37808,lc=37809,cc=37810,hc=37811,uc=37812,fc=37813,dc=37814,pc=37815,mc=37816,gc=37817,_c=37818,vc=37819,xc=37820,yc=37821,ia=36492,Mc=36494,Sc=36495,fd=36283,bc=36284,wc=36285,Tc=36286,I0=3200,U0=3201,dd=0,N0=1,Ai="",Pe="srgb",rr="srgb-linear",fa="linear",ue="srgb",ys=7680,iu=519,O0=512,F0=513,k0=514,pd=515,z0=516,B0=517,H0=518,V0=519,Ec=35044,su="300 es",hi=2e3,da=2001;class dr{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const i=n[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,t);t.target=null}}}const We=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ru=1234567;const Nr=Math.PI/180,Xr=180/Math.PI;function Xn(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(We[s&255]+We[s>>8&255]+We[s>>16&255]+We[s>>24&255]+"-"+We[t&255]+We[t>>8&255]+"-"+We[t>>16&15|64]+We[t>>24&255]+"-"+We[e&63|128]+We[e>>8&255]+"-"+We[e>>16&255]+We[e>>24&255]+We[n&255]+We[n>>8&255]+We[n>>16&255]+We[n>>24&255]).toLowerCase()}function Yt(s,t,e){return Math.max(t,Math.min(e,s))}function nh(s,t){return(s%t+t)%t}function G0(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function W0(s,t,e){return s!==t?(e-s)/(t-s):0}function Or(s,t,e){return(1-e)*s+e*t}function X0(s,t,e,n){return Or(s,t,1-Math.exp(-e*n))}function q0(s,t=1){return t-Math.abs(nh(s,t*2)-t)}function Y0(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function $0(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function Z0(s,t){return s+Math.floor(Math.random()*(t-s+1))}function J0(s,t){return s+Math.random()*(t-s)}function j0(s){return s*(.5-Math.random())}function K0(s){s!==void 0&&(ru=s);let t=ru+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Q0(s){return s*Nr}function tm(s){return s*Xr}function em(s){return(s&s-1)===0&&s!==0}function nm(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function im(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function sm(s,t,e,n,i){const r=Math.cos,o=Math.sin,a=r(e/2),l=o(e/2),c=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),d=o((t-n)/2),f=r((n-t)/2),g=o((n-t)/2);switch(i){case"XYX":s.set(a*h,l*u,l*d,a*c);break;case"YZY":s.set(l*d,a*h,l*u,a*c);break;case"ZXZ":s.set(l*u,l*d,a*h,a*c);break;case"XZX":s.set(a*h,l*g,l*f,a*c);break;case"YXY":s.set(l*f,a*h,l*g,a*c);break;case"ZYZ":s.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Nn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function ce(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const rm={DEG2RAD:Nr,RAD2DEG:Xr,generateUUID:Xn,clamp:Yt,euclideanModulo:nh,mapLinear:G0,inverseLerp:W0,lerp:Or,damp:X0,pingpong:q0,smoothstep:Y0,smootherstep:$0,randInt:Z0,randFloat:J0,randFloatSpread:j0,seededRandom:K0,degToRad:Q0,radToDeg:tm,isPowerOfTwo:em,ceilPowerOfTwo:nm,floorPowerOfTwo:im,setQuaternionFromProperEuler:sm,normalize:ce,denormalize:Nn};class st{constructor(t=0,e=0){st.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Yt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Yt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*i+t.x,this.y=r*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Wt{constructor(t,e,n,i,r,o,a,l,c){Wt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c)}set(t,e,n,i,r,o,a,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=i[0],p=i[3],m=i[6],y=i[1],x=i[4],v=i[7],E=i[2],R=i[5],T=i[8];return r[0]=o*_+a*y+l*E,r[3]=o*p+a*x+l*R,r[6]=o*m+a*v+l*T,r[1]=c*_+h*y+u*E,r[4]=c*p+h*x+u*R,r[7]=c*m+h*v+u*T,r[2]=d*_+f*y+g*E,r[5]=d*p+f*x+g*R,r[8]=d*m+f*v+g*T,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*o*h-e*a*c-n*r*h+n*a*l+i*r*c-i*o*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=h*o-a*c,d=a*l-h*r,f=c*r-o*l,g=e*u+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(i*c-h*n)*_,t[2]=(a*n-i*o)*_,t[3]=d*_,t[4]=(h*e-i*l)*_,t[5]=(i*r-a*e)*_,t[6]=f*_,t[7]=(n*l-c*e)*_,t[8]=(o*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+t,-i*c,i*l,-i*(-c*o+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Xa.makeScale(t,e)),this}rotate(t){return this.premultiply(Xa.makeRotation(-t)),this}translate(t,e){return this.premultiply(Xa.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Xa=new Wt;function md(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function qr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function om(){const s=qr("canvas");return s.style.display="block",s}const ou={};function Ji(s){s in ou||(ou[s]=!0,console.warn(s))}function am(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}function lm(s){const t=s.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function cm(s){const t=s.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const au=new Wt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),lu=new Wt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function hm(){const s={enabled:!0,workingColorSpace:rr,spaces:{},convert:function(i,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===ue&&(i.r=ui(i.r),i.g=ui(i.g),i.b=ui(i.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ue&&(i.r=Zs(i.r),i.g=Zs(i.g),i.b=Zs(i.b))),i},fromWorkingColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},toWorkingColorSpace:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Ai?fa:this.spaces[i].transfer},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,o){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[rr]:{primaries:t,whitePoint:n,transfer:fa,toXYZ:au,fromXYZ:lu,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Pe},outputColorSpaceConfig:{drawingBufferColorSpace:Pe}},[Pe]:{primaries:t,whitePoint:n,transfer:ue,toXYZ:au,fromXYZ:lu,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Pe}}}),s}const se=hm();function ui(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Zs(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Ms;class um{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ms===void 0&&(Ms=qr("canvas")),Ms.width=t.width,Ms.height=t.height;const n=Ms.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ms}return e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=qr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=ui(r[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ui(e[n]/255)*255):e[n]=ui(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let fm=0;class ih{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:fm++}),this.uuid=Xn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(qa(i[o].image)):r.push(qa(i[o]))}else r=qa(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function qa(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?um.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let dm=0;class $e extends dr{constructor(t=$e.DEFAULT_IMAGE,e=$e.DEFAULT_MAPPING,n=ns,i=ns,r=On,o=is,a=Fn,l=pi,c=$e.DEFAULT_ANISOTROPY,h=Ai){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:dm++}),this.uuid=Xn(),this.name="",this.source=new ih(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new st(0,0),this.repeat=new st(1,1),this.center=new st(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Wt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==nd)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case nr:t.x=t.x-Math.floor(t.x);break;case ns:t.x=t.x<0?0:1;break;case Ql:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case nr:t.y=t.y-Math.floor(t.y);break;case ns:t.y=t.y<0?0:1;break;case Ql:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}$e.DEFAULT_IMAGE=null;$e.DEFAULT_MAPPING=nd;$e.DEFAULT_ANISOTROPY=1;class fe{constructor(t=0,e=0,n=0,i=1){fe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const l=t.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],_=l[2],p=l[6],m=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(c+1)/2,v=(f+1)/2,E=(m+1)/2,R=(h+d)/4,T=(u+_)/4,C=(g+p)/4;return x>v&&x>E?x<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(x),i=R/n,r=T/n):v>E?v<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(v),n=R/i,r=C/i):E<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(E),n=T/r,i=C/r),this.set(n,i,r,e),this}let y=Math.sqrt((p-g)*(p-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(p-g)/y,this.y=(u-_)/y,this.z=(d-h)/y,this.w=Math.acos((c+f+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this.z=Yt(this.z,t.z,e.z),this.w=Yt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this.z=Yt(this.z,t,e),this.w=Yt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Yt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class pm extends dr{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new fe(0,0,t,e),this.scissorTest=!1,this.viewport=new fe(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:On,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new $e(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),t!==null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const i=Object.assign({},t.textures[e].image);this.textures[e].source=new ih(i)}return this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class fs extends pm{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class gd extends $e{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=kn,this.minFilter=kn,this.wrapR=ns,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class mm extends $e{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=kn,this.minFilter=kn,this.wrapR=ns,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Yn{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,o,a){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3];const d=r[o+0],f=r[o+1],g=r[o+2],_=r[o+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=_;return}if(u!==_||l!==d||c!==f||h!==g){let p=1-a;const m=l*d+c*f+h*g+u*_,y=m>=0?1:-1,x=1-m*m;if(x>Number.EPSILON){const E=Math.sqrt(x),R=Math.atan2(E,m*y);p=Math.sin(p*R)/E,a=Math.sin(a*R)/E}const v=a*y;if(l=l*p+d*v,c=c*p+f*v,h=h*p+g*v,u=u*p+_*v,p===1-a){const E=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=E,c*=E,h*=E,u*=E}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,r,o){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=r[o],d=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+h*u+l*f-c*d,t[e+1]=l*g+h*d+c*u-a*f,t[e+2]=c*g+h*f+a*d-l*u,t[e+3]=h*g-a*u-l*d-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,o=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),u=a(r/2),d=l(n/2),f=l(i/2),g=l(r/2);switch(o){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],o=e[1],a=e[5],l=e[9],c=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(r-c)*f,this._z=(o-i)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+c)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(r-c)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(r+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Yt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,o=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+o*a+i*c-r*l,this._y=i*h+o*l+r*a-n*c,this._z=r*h+o*c+n*l-i*a,this._w=o*h-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-e)*h)/c,d=Math.sin(e*h)/c;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class A{constructor(t=0,e=0,n=0){A.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(cu.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(cu.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z,l=t.w,c=2*(o*i-a*n),h=2*(a*e-r*i),u=2*(r*n-o*e);return this.x=e+l*c+o*u-a*h,this.y=n+l*h+a*c-r*u,this.z=i+l*u+r*h-o*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this.z=Yt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this.z=Yt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Yt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,o=e.x,a=e.y,l=e.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ya.copy(this).projectOnVector(t),this.sub(Ya)}reflect(t){return this.sub(Ya.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Yt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ya=new A,cu=new Yn;class co{constructor(t=new A(1/0,1/0,1/0),e=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Dn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Dn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Dn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,Dn):Dn.fromBufferAttribute(r,o),Dn.applyMatrix4(t.matrixWorld),this.expandByPoint(Dn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),vo.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),vo.copy(n.boundingBox)),vo.applyMatrix4(t.matrixWorld),this.union(vo)}const i=t.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Dn),Dn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(gr),xo.subVectors(this.max,gr),Ss.subVectors(t.a,gr),bs.subVectors(t.b,gr),ws.subVectors(t.c,gr),_i.subVectors(bs,Ss),vi.subVectors(ws,bs),Vi.subVectors(Ss,ws);let e=[0,-_i.z,_i.y,0,-vi.z,vi.y,0,-Vi.z,Vi.y,_i.z,0,-_i.x,vi.z,0,-vi.x,Vi.z,0,-Vi.x,-_i.y,_i.x,0,-vi.y,vi.x,0,-Vi.y,Vi.x,0];return!$a(e,Ss,bs,ws,xo)||(e=[1,0,0,0,1,0,0,0,1],!$a(e,Ss,bs,ws,xo))?!1:(yo.crossVectors(_i,vi),e=[yo.x,yo.y,yo.z],$a(e,Ss,bs,ws,xo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Dn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Dn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Kn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Kn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Kn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Kn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Kn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Kn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Kn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Kn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Kn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Kn=[new A,new A,new A,new A,new A,new A,new A,new A],Dn=new A,vo=new co,Ss=new A,bs=new A,ws=new A,_i=new A,vi=new A,Vi=new A,gr=new A,xo=new A,yo=new A,Gi=new A;function $a(s,t,e,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){Gi.fromArray(s,r);const a=i.x*Math.abs(Gi.x)+i.y*Math.abs(Gi.y)+i.z*Math.abs(Gi.z),l=t.dot(Gi),c=e.dot(Gi),h=n.dot(Gi);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const gm=new co,_r=new A,Za=new A;class Ra{constructor(t=new A,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):gm.setFromPoints(t).getCenter(n);let i=0;for(let r=0,o=t.length;r<o;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;_r.subVectors(t,this.center);const e=_r.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(_r,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Za.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(_r.copy(t.center).add(Za)),this.expandByPoint(_r.copy(t.center).sub(Za))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Qn=new A,Ja=new A,Mo=new A,xi=new A,ja=new A,So=new A,Ka=new A;class sh{constructor(t=new A,e=new A(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Qn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Qn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Qn.copy(this.origin).addScaledVector(this.direction,e),Qn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Ja.copy(t).add(e).multiplyScalar(.5),Mo.copy(e).sub(t).normalize(),xi.copy(this.origin).sub(Ja);const r=t.distanceTo(e)*.5,o=-this.direction.dot(Mo),a=xi.dot(this.direction),l=-xi.dot(Mo),c=xi.lengthSq(),h=Math.abs(1-o*o);let u,d,f,g;if(h>0)if(u=o*l-a,d=o*a-l,g=r*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-l),r),f=-u*u+d*(d+2*l)+c);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Ja).addScaledVector(Mo,d),f}intersectSphere(t,e){Qn.subVectors(t.center,this.origin);const n=Qn.dot(this.direction),i=Qn.dot(Qn)-n*n,r=t.radius*t.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,o,a,l;const c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(t.min.x-d.x)*c,i=(t.max.x-d.x)*c):(n=(t.max.x-d.x)*c,i=(t.min.x-d.x)*c),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(t.min.z-d.z)*u,l=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,l=(t.min.z-d.z)*u),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Qn)!==null}intersectTriangle(t,e,n,i,r){ja.subVectors(e,t),So.subVectors(n,t),Ka.crossVectors(ja,So);let o=this.direction.dot(Ka),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;xi.subVectors(this.origin,t);const l=a*this.direction.dot(So.crossVectors(xi,So));if(l<0)return null;const c=a*this.direction.dot(ja.cross(xi));if(c<0||l+c>o)return null;const h=-a*xi.dot(Ka);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class me{constructor(t,e,n,i,r,o,a,l,c,h,u,d,f,g,_,p){me.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,l,c,h,u,d,f,g,_,p)}set(t,e,n,i,r,o,a,l,c,h,u,d,f,g,_,p){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=i,m[1]=r,m[5]=o,m[9]=a,m[13]=l,m[2]=c,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=g,m[11]=_,m[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new me().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Ts.setFromMatrixColumn(t,0).length(),r=1/Ts.setFromMatrixColumn(t,1).length(),o=1/Ts.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=o*h,f=o*u,g=a*h,_=a*u;e[0]=l*h,e[4]=-l*u,e[8]=c,e[1]=f+g*c,e[5]=d-_*c,e[9]=-a*l,e[2]=_-d*c,e[6]=g+f*c,e[10]=o*l}else if(t.order==="YXZ"){const d=l*h,f=l*u,g=c*h,_=c*u;e[0]=d+_*a,e[4]=g*a-f,e[8]=o*c,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-g,e[6]=_+d*a,e[10]=o*l}else if(t.order==="ZXY"){const d=l*h,f=l*u,g=c*h,_=c*u;e[0]=d-_*a,e[4]=-o*u,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*h,e[9]=_-d*a,e[2]=-o*c,e[6]=a,e[10]=o*l}else if(t.order==="ZYX"){const d=o*h,f=o*u,g=a*h,_=a*u;e[0]=l*h,e[4]=g*c-f,e[8]=d*c+_,e[1]=l*u,e[5]=_*c+d,e[9]=f*c-g,e[2]=-c,e[6]=a*l,e[10]=o*l}else if(t.order==="YZX"){const d=o*l,f=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=_-d*u,e[8]=g*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*u+g,e[10]=d-_*u}else if(t.order==="XZY"){const d=o*l,f=o*c,g=a*l,_=a*c;e[0]=l*h,e[4]=-u,e[8]=c*h,e[1]=d*u+_,e[5]=o*h,e[9]=f*u-g,e[2]=g*u-f,e[6]=a*h,e[10]=_*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(_m,t,vm)}lookAt(t,e,n){const i=this.elements;return un.subVectors(t,e),un.lengthSq()===0&&(un.z=1),un.normalize(),yi.crossVectors(n,un),yi.lengthSq()===0&&(Math.abs(n.z)===1?un.x+=1e-4:un.z+=1e-4,un.normalize(),yi.crossVectors(n,un)),yi.normalize(),bo.crossVectors(un,yi),i[0]=yi.x,i[4]=bo.x,i[8]=un.x,i[1]=yi.y,i[5]=bo.y,i[9]=un.y,i[2]=yi.z,i[6]=bo.z,i[10]=un.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],p=n[10],m=n[14],y=n[3],x=n[7],v=n[11],E=n[15],R=i[0],T=i[4],C=i[8],M=i[12],S=i[1],L=i[5],F=i[9],O=i[13],z=i[2],W=i[6],H=i[10],Y=i[14],G=i[3],ht=i[7],pt=i[11],Mt=i[15];return r[0]=o*R+a*S+l*z+c*G,r[4]=o*T+a*L+l*W+c*ht,r[8]=o*C+a*F+l*H+c*pt,r[12]=o*M+a*O+l*Y+c*Mt,r[1]=h*R+u*S+d*z+f*G,r[5]=h*T+u*L+d*W+f*ht,r[9]=h*C+u*F+d*H+f*pt,r[13]=h*M+u*O+d*Y+f*Mt,r[2]=g*R+_*S+p*z+m*G,r[6]=g*T+_*L+p*W+m*ht,r[10]=g*C+_*F+p*H+m*pt,r[14]=g*M+_*O+p*Y+m*Mt,r[3]=y*R+x*S+v*z+E*G,r[7]=y*T+x*L+v*W+E*ht,r[11]=y*C+x*F+v*H+E*pt,r[15]=y*M+x*O+v*Y+E*Mt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],o=t[1],a=t[5],l=t[9],c=t[13],h=t[2],u=t[6],d=t[10],f=t[14],g=t[3],_=t[7],p=t[11],m=t[15];return g*(+r*l*u-i*c*u-r*a*d+n*c*d+i*a*f-n*l*f)+_*(+e*l*f-e*c*d+r*o*d-i*o*f+i*c*h-r*l*h)+p*(+e*c*u-e*a*f-r*o*u+n*o*f+r*a*h-n*c*h)+m*(-i*a*h-e*l*u+e*a*d+i*o*u-n*o*d+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],l=t[6],c=t[7],h=t[8],u=t[9],d=t[10],f=t[11],g=t[12],_=t[13],p=t[14],m=t[15],y=u*p*c-_*d*c+_*l*f-a*p*f-u*l*m+a*d*m,x=g*d*c-h*p*c-g*l*f+o*p*f+h*l*m-o*d*m,v=h*_*c-g*u*c+g*a*f-o*_*f-h*a*m+o*u*m,E=g*u*l-h*_*l-g*a*d+o*_*d+h*a*p-o*u*p,R=e*y+n*x+i*v+r*E;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const T=1/R;return t[0]=y*T,t[1]=(_*d*r-u*p*r-_*i*f+n*p*f+u*i*m-n*d*m)*T,t[2]=(a*p*r-_*l*r+_*i*c-n*p*c-a*i*m+n*l*m)*T,t[3]=(u*l*r-a*d*r-u*i*c+n*d*c+a*i*f-n*l*f)*T,t[4]=x*T,t[5]=(h*p*r-g*d*r+g*i*f-e*p*f-h*i*m+e*d*m)*T,t[6]=(g*l*r-o*p*r-g*i*c+e*p*c+o*i*m-e*l*m)*T,t[7]=(o*d*r-h*l*r+h*i*c-e*d*c-o*i*f+e*l*f)*T,t[8]=v*T,t[9]=(g*u*r-h*_*r-g*n*f+e*_*f+h*n*m-e*u*m)*T,t[10]=(o*_*r-g*a*r+g*n*c-e*_*c-o*n*m+e*a*m)*T,t[11]=(h*a*r-o*u*r-h*n*c+e*u*c+o*n*f-e*a*f)*T,t[12]=E*T,t[13]=(h*_*i-g*u*i+g*n*d-e*_*d-h*n*p+e*u*p)*T,t[14]=(g*a*i-o*_*i-g*n*l+e*_*l+o*n*p-e*a*p)*T,t[15]=(o*u*i-h*a*i+h*n*l-e*u*l-o*n*d+e*a*d)*T,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,o=t.x,a=t.y,l=t.z,c=r*o,h=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*o,0,c*l-i*a,h*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,o){return this.set(1,n,r,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,o=e._y,a=e._z,l=e._w,c=r+r,h=o+o,u=a+a,d=r*c,f=r*h,g=r*u,_=o*h,p=o*u,m=a*u,y=l*c,x=l*h,v=l*u,E=n.x,R=n.y,T=n.z;return i[0]=(1-(_+m))*E,i[1]=(f+v)*E,i[2]=(g-x)*E,i[3]=0,i[4]=(f-v)*R,i[5]=(1-(d+m))*R,i[6]=(p+y)*R,i[7]=0,i[8]=(g+x)*T,i[9]=(p-y)*T,i[10]=(1-(d+_))*T,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=Ts.set(i[0],i[1],i[2]).length();const o=Ts.set(i[4],i[5],i[6]).length(),a=Ts.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],Ln.copy(this);const c=1/r,h=1/o,u=1/a;return Ln.elements[0]*=c,Ln.elements[1]*=c,Ln.elements[2]*=c,Ln.elements[4]*=h,Ln.elements[5]*=h,Ln.elements[6]*=h,Ln.elements[8]*=u,Ln.elements[9]*=u,Ln.elements[10]*=u,e.setFromRotationMatrix(Ln),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,i,r,o,a=hi){const l=this.elements,c=2*r/(e-t),h=2*r/(n-i),u=(e+t)/(e-t),d=(n+i)/(n-i);let f,g;if(a===hi)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===da)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,r,o,a=hi){const l=this.elements,c=1/(e-t),h=1/(n-i),u=1/(o-r),d=(e+t)*c,f=(n+i)*h;let g,_;if(a===hi)g=(o+r)*u,_=-2*u;else if(a===da)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ts=new A,Ln=new me,_m=new A(0,0,0),vm=new A(1,1,1),yi=new A,bo=new A,un=new A,hu=new me,uu=new Yn;class zn{constructor(t=0,e=0,n=0,i=zn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(Yt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Yt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Yt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Yt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Yt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Yt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return hu.makeRotationFromQuaternion(t),this.setFromRotationMatrix(hu,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return uu.setFromEuler(this),this.setFromQuaternion(uu,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}zn.DEFAULT_ORDER="XYZ";class rh{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let xm=0;const fu=new A,Es=new Yn,ti=new me,wo=new A,vr=new A,ym=new A,Mm=new Yn,du=new A(1,0,0),pu=new A(0,1,0),mu=new A(0,0,1),gu={type:"added"},Sm={type:"removed"},As={type:"childadded",child:null},Qa={type:"childremoved",child:null};class ye extends dr{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:xm++}),this.uuid=Xn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ye.DEFAULT_UP.clone();const t=new A,e=new zn,n=new Yn,i=new A(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new me},normalMatrix:{value:new Wt}}),this.matrix=new me,this.matrixWorld=new me,this.matrixAutoUpdate=ye.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ye.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new rh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Es.setFromAxisAngle(t,e),this.quaternion.multiply(Es),this}rotateOnWorldAxis(t,e){return Es.setFromAxisAngle(t,e),this.quaternion.premultiply(Es),this}rotateX(t){return this.rotateOnAxis(du,t)}rotateY(t){return this.rotateOnAxis(pu,t)}rotateZ(t){return this.rotateOnAxis(mu,t)}translateOnAxis(t,e){return fu.copy(t).applyQuaternion(this.quaternion),this.position.add(fu.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(du,t)}translateY(t){return this.translateOnAxis(pu,t)}translateZ(t){return this.translateOnAxis(mu,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(ti.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?wo.copy(t):wo.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),vr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ti.lookAt(vr,wo,this.up):ti.lookAt(wo,vr,this.up),this.quaternion.setFromRotationMatrix(ti),i&&(ti.extractRotation(i.matrixWorld),Es.setFromRotationMatrix(ti),this.quaternion.premultiply(Es.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(gu),As.child=t,this.dispatchEvent(As),As.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Sm),Qa.child=t,this.dispatchEvent(Qa),Qa.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),ti.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),ti.multiply(t.parent.matrixWorld)),t.applyMatrix4(ti),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(gu),As.child=t,this.dispatchEvent(As),As.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vr,t,ym),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vr,Mm,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const u=l[c];r(t.shapes,u)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(t.materials,this.material[l]));i.material=a}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(r(t.animations,l))}}if(e){const a=o(t.geometries),l=o(t.materials),c=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}ye.DEFAULT_UP=new A(0,1,0);ye.DEFAULT_MATRIX_AUTO_UPDATE=!0;ye.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const In=new A,ei=new A,tl=new A,ni=new A,Rs=new A,Cs=new A,_u=new A,el=new A,nl=new A,il=new A,sl=new fe,rl=new fe,ol=new fe;class En{constructor(t=new A,e=new A,n=new A){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),In.subVectors(t,e),i.cross(In);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){In.subVectors(i,e),ei.subVectors(n,e),tl.subVectors(t,e);const o=In.dot(In),a=In.dot(ei),l=In.dot(tl),c=ei.dot(ei),h=ei.dot(tl),u=o*c-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(c*l-a*h)*d,g=(o*h-a*l)*d;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,ni)===null?!1:ni.x>=0&&ni.y>=0&&ni.x+ni.y<=1}static getInterpolation(t,e,n,i,r,o,a,l){return this.getBarycoord(t,e,n,i,ni)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ni.x),l.addScaledVector(o,ni.y),l.addScaledVector(a,ni.z),l)}static getInterpolatedAttribute(t,e,n,i,r,o){return sl.setScalar(0),rl.setScalar(0),ol.setScalar(0),sl.fromBufferAttribute(t,e),rl.fromBufferAttribute(t,n),ol.fromBufferAttribute(t,i),o.setScalar(0),o.addScaledVector(sl,r.x),o.addScaledVector(rl,r.y),o.addScaledVector(ol,r.z),o}static isFrontFacing(t,e,n,i){return In.subVectors(n,e),ei.subVectors(t,e),In.cross(ei).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return In.subVectors(this.c,this.b),ei.subVectors(this.a,this.b),In.cross(ei).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return En.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return En.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return En.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return En.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return En.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let o,a;Rs.subVectors(i,n),Cs.subVectors(r,n),el.subVectors(t,n);const l=Rs.dot(el),c=Cs.dot(el);if(l<=0&&c<=0)return e.copy(n);nl.subVectors(t,i);const h=Rs.dot(nl),u=Cs.dot(nl);if(h>=0&&u<=h)return e.copy(i);const d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),e.copy(n).addScaledVector(Rs,o);il.subVectors(t,r);const f=Rs.dot(il),g=Cs.dot(il);if(g>=0&&f<=g)return e.copy(r);const _=f*c-l*g;if(_<=0&&c>=0&&g<=0)return a=c/(c-g),e.copy(n).addScaledVector(Cs,a);const p=h*g-f*u;if(p<=0&&u-h>=0&&f-g>=0)return _u.subVectors(r,i),a=(u-h)/(u-h+(f-g)),e.copy(i).addScaledVector(_u,a);const m=1/(p+_+d);return o=_*m,a=d*m,e.copy(n).addScaledVector(Rs,o).addScaledVector(Cs,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const _d={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Mi={h:0,s:0,l:0},To={h:0,s:0,l:0};function al(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class Vt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Pe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,se.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=se.workingColorSpace){return this.r=t,this.g=e,this.b=n,se.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=se.workingColorSpace){if(t=nh(t,1),e=Yt(e,0,1),n=Yt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=al(o,r,t+1/3),this.g=al(o,r,t),this.b=al(o,r,t-1/3)}return se.toWorkingColorSpace(this,i),this}setStyle(t,e=Pe){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Pe){const n=_d[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ui(t.r),this.g=ui(t.g),this.b=ui(t.b),this}copyLinearToSRGB(t){return this.r=Zs(t.r),this.g=Zs(t.g),this.b=Zs(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Pe){return se.fromWorkingColorSpace(Xe.copy(this),t),Math.round(Yt(Xe.r*255,0,255))*65536+Math.round(Yt(Xe.g*255,0,255))*256+Math.round(Yt(Xe.b*255,0,255))}getHexString(t=Pe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=se.workingColorSpace){se.fromWorkingColorSpace(Xe.copy(this),e);const n=Xe.r,i=Xe.g,r=Xe.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let l,c;const h=(a+o)/2;if(a===o)l=0,c=0;else{const u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case n:l=(i-r)/u+(i<r?6:0);break;case i:l=(r-n)/u+2;break;case r:l=(n-i)/u+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=se.workingColorSpace){return se.fromWorkingColorSpace(Xe.copy(this),e),t.r=Xe.r,t.g=Xe.g,t.b=Xe.b,t}getStyle(t=Pe){se.fromWorkingColorSpace(Xe.copy(this),t);const e=Xe.r,n=Xe.g,i=Xe.b;return t!==Pe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Mi),this.setHSL(Mi.h+t,Mi.s+e,Mi.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Mi),t.getHSL(To);const n=Or(Mi.h,To.h,e),i=Or(Mi.s,To.s,e),r=Or(Mi.l,To.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Xe=new Vt;Vt.NAMES=_d;let bm=0;class ms extends dr{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:bm++}),this.uuid=Xn(),this.name="",this.type="Material",this.blending=rs,this.side=di,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Vl,this.blendDst=Gl,this.blendEquation=Qi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Vt(0,0,0),this.blendAlpha=0,this.depthFunc=Qs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=iu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ys,this.stencilZFail=ys,this.stencilZPass=ys,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==rs&&(n.blending=this.blending),this.side!==di&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Vl&&(n.blendSrc=this.blendSrc),this.blendDst!==Gl&&(n.blendDst=this.blendDst),this.blendEquation!==Qi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Qs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==iu&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ys&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ys&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ys&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(e){const r=i(t.textures),o=i(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class or extends ms{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Vt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zn,this.combine=td,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Ie=new A,Eo=new st;let wm=0;class He{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:wm++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ec,this.updateRanges=[],this.gpuType=ci,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Eo.fromBufferAttribute(this,e),Eo.applyMatrix3(t),this.setXY(e,Eo.x,Eo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.applyMatrix3(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.applyMatrix4(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.applyNormalMatrix(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ie.fromBufferAttribute(this,e),Ie.transformDirection(t),this.setXYZ(e,Ie.x,Ie.y,Ie.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Nn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ce(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Nn(e,this.array)),e}setX(t,e){return this.normalized&&(e=ce(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Nn(e,this.array)),e}setY(t,e){return this.normalized&&(e=ce(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Nn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=ce(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Nn(e,this.array)),e}setW(t,e){return this.normalized&&(e=ce(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=ce(e,this.array),n=ce(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=ce(e,this.array),n=ce(n,this.array),i=ce(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=ce(e,this.array),n=ce(n,this.array),i=ce(i,this.array),r=ce(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ec&&(t.usage=this.usage),t}}class vd extends He{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class xd extends He{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ne extends He{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Tm=0;const bn=new me,ll=new ye,Ps=new A,fn=new co,xr=new co,Fe=new A;class De extends dr{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Tm++}),this.uuid=Xn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(md(t)?xd:vd)(t,1):this.index=t,this}setIndirect(t){return this.indirect=t,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Wt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return bn.makeRotationFromQuaternion(t),this.applyMatrix4(bn),this}rotateX(t){return bn.makeRotationX(t),this.applyMatrix4(bn),this}rotateY(t){return bn.makeRotationY(t),this.applyMatrix4(bn),this}rotateZ(t){return bn.makeRotationZ(t),this.applyMatrix4(bn),this}translate(t,e,n){return bn.makeTranslation(t,e,n),this.applyMatrix4(bn),this}scale(t,e,n){return bn.makeScale(t,e,n),this.applyMatrix4(bn),this}lookAt(t){return ll.lookAt(t),ll.updateMatrix(),this.applyMatrix4(ll.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ps).negate(),this.translate(Ps.x,Ps.y,Ps.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,r=t.length;i<r;i++){const o=t[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new ne(n,3))}else{const n=Math.min(t.length,e.count);for(let i=0;i<n;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new co);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];fn.setFromBufferAttribute(r),this.morphTargetsRelative?(Fe.addVectors(this.boundingBox.min,fn.min),this.boundingBox.expandByPoint(Fe),Fe.addVectors(this.boundingBox.max,fn.max),this.boundingBox.expandByPoint(Fe)):(this.boundingBox.expandByPoint(fn.min),this.boundingBox.expandByPoint(fn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ra);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new A,1/0);return}if(t){const n=this.boundingSphere.center;if(fn.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];xr.setFromBufferAttribute(a),this.morphTargetsRelative?(Fe.addVectors(fn.min,xr.min),fn.expandByPoint(Fe),Fe.addVectors(fn.max,xr.max),fn.expandByPoint(Fe)):(fn.expandByPoint(xr.min),fn.expandByPoint(xr.max))}fn.getCenter(n);let i=0;for(let r=0,o=t.count;r<o;r++)Fe.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Fe));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Fe.fromBufferAttribute(a,c),l&&(Ps.fromBufferAttribute(t,c),Fe.add(Ps)),i=Math.max(i,n.distanceToSquared(Fe))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new He(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let C=0;C<n.count;C++)a[C]=new A,l[C]=new A;const c=new A,h=new A,u=new A,d=new st,f=new st,g=new st,_=new A,p=new A;function m(C,M,S){c.fromBufferAttribute(n,C),h.fromBufferAttribute(n,M),u.fromBufferAttribute(n,S),d.fromBufferAttribute(r,C),f.fromBufferAttribute(r,M),g.fromBufferAttribute(r,S),h.sub(c),u.sub(c),f.sub(d),g.sub(d);const L=1/(f.x*g.y-g.x*f.y);isFinite(L)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(L),p.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(L),a[C].add(_),a[M].add(_),a[S].add(_),l[C].add(p),l[M].add(p),l[S].add(p))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let C=0,M=y.length;C<M;++C){const S=y[C],L=S.start,F=S.count;for(let O=L,z=L+F;O<z;O+=3)m(t.getX(O+0),t.getX(O+1),t.getX(O+2))}const x=new A,v=new A,E=new A,R=new A;function T(C){E.fromBufferAttribute(i,C),R.copy(E);const M=a[C];x.copy(M),x.sub(E.multiplyScalar(E.dot(M))).normalize(),v.crossVectors(R,M);const L=v.dot(l[C])<0?-1:1;o.setXYZW(C,x.x,x.y,x.z,L)}for(let C=0,M=y.length;C<M;++C){const S=y[C],L=S.start,F=S.count;for(let O=L,z=L+F;O<z;O+=3)T(t.getX(O+0)),T(t.getX(O+1)),T(t.getX(O+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new He(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new A,r=new A,o=new A,a=new A,l=new A,c=new A,h=new A,u=new A;if(t)for(let d=0,f=t.count;d<f;d+=3){const g=t.getX(d+0),_=t.getX(d+1),p=t.getX(d+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),o.fromBufferAttribute(e,p),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),a.add(h),l.add(h),c.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,f=e.count;d<f;d+=3)i.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Fe.fromBufferAttribute(t,e),Fe.normalize(),t.setXYZ(e,Fe.x,Fe.y,Fe.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h);let f=0,g=0;for(let _=0,p=l.length;_<p;_++){a.isInterleavedBufferAttribute?f=l[_]*a.data.stride+a.offset:f=l[_]*h;for(let m=0;m<h;m++)d[g++]=c[f++]}return new He(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new De,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=t(l,n);e.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let h=0,u=c.length;h<u;h++){const d=c[h],f=t(d,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){const f=c[u];h.push(f.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],u=r[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let c=0,h=o.length;c<h;c++){const u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const vu=new me,Wi=new sh,Ao=new Ra,xu=new A,Ro=new A,Co=new A,Po=new A,cl=new A,Do=new A,yu=new A,Lo=new A;class Zt extends ye{constructor(t=new De,e=new or){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(r&&a){Do.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=a[l],u=r[l];h!==0&&(cl.fromBufferAttribute(u,t),o?Do.addScaledVector(cl,h):Do.addScaledVector(cl.sub(e),h))}e.add(Do)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ao.copy(n.boundingSphere),Ao.applyMatrix4(r),Wi.copy(t.ray).recast(t.near),!(Ao.containsPoint(Wi.origin)===!1&&(Wi.intersectSphere(Ao,xu)===null||Wi.origin.distanceToSquared(xu)>(t.far-t.near)**2))&&(vu.copy(r).invert(),Wi.copy(t.ray).applyMatrix4(vu),!(n.boundingBox!==null&&Wi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Wi)))}_computeIntersections(t,e,n){let i;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const p=d[g],m=o[p.materialIndex],y=Math.max(p.start,f.start),x=Math.min(a.count,Math.min(p.start+p.count,f.start+f.count));for(let v=y,E=x;v<E;v+=3){const R=a.getX(v),T=a.getX(v+1),C=a.getX(v+2);i=Io(this,m,t,n,c,h,u,R,T,C),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){const y=a.getX(p),x=a.getX(p+1),v=a.getX(p+2);i=Io(this,o,t,n,c,h,u,y,x,v),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,_=d.length;g<_;g++){const p=d[g],m=o[p.materialIndex],y=Math.max(p.start,f.start),x=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let v=y,E=x;v<E;v+=3){const R=v,T=v+1,C=v+2;i=Io(this,m,t,n,c,h,u,R,T,C),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=p.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(l.count,f.start+f.count);for(let p=g,m=_;p<m;p+=3){const y=p,x=p+1,v=p+2;i=Io(this,o,t,n,c,h,u,y,x,v),i&&(i.faceIndex=Math.floor(p/3),e.push(i))}}}}function Em(s,t,e,n,i,r,o,a){let l;if(t.side===Ye?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,t.side===di,a),l===null)return null;Lo.copy(a),Lo.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(Lo);return c<e.near||c>e.far?null:{distance:c,point:Lo.clone(),object:s}}function Io(s,t,e,n,i,r,o,a,l,c){s.getVertexPosition(a,Ro),s.getVertexPosition(l,Co),s.getVertexPosition(c,Po);const h=Em(s,t,e,n,Ro,Co,Po,yu);if(h){const u=new A;En.getBarycoord(yu,Ro,Co,Po,u),i&&(h.uv=En.getInterpolatedAttribute(i,a,l,c,u,new st)),r&&(h.uv1=En.getInterpolatedAttribute(r,a,l,c,u,new st)),o&&(h.normal=En.getInterpolatedAttribute(o,a,l,c,u,new A),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new A,materialIndex:0};En.getNormal(Ro,Co,Po,d.normal),h.face=d,h.barycoord=u}return h}class gs extends De{constructor(t=1,e=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new ne(c,3)),this.setAttribute("normal",new ne(h,3)),this.setAttribute("uv",new ne(u,2));function g(_,p,m,y,x,v,E,R,T,C,M){const S=v/T,L=E/C,F=v/2,O=E/2,z=R/2,W=T+1,H=C+1;let Y=0,G=0;const ht=new A;for(let pt=0;pt<H;pt++){const Mt=pt*L-O;for(let Ot=0;Ot<W;Ot++){const Qt=Ot*S-F;ht[_]=Qt*y,ht[p]=Mt*x,ht[m]=z,c.push(ht.x,ht.y,ht.z),ht[_]=0,ht[p]=0,ht[m]=R>0?1:-1,h.push(ht.x,ht.y,ht.z),u.push(Ot/T),u.push(1-pt/C),Y+=1}}for(let pt=0;pt<C;pt++)for(let Mt=0;Mt<T;Mt++){const Ot=d+Mt+W*pt,Qt=d+Mt+W*(pt+1),$=d+(Mt+1)+W*(pt+1),lt=d+(Mt+1)+W*pt;l.push(Ot,Qt,lt),l.push(Qt,$,lt),G+=6}a.addGroup(f,G,M),f+=G,d+=Y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new gs(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function ar(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function tn(s){const t={};for(let e=0;e<s.length;e++){const n=ar(s[e]);for(const i in n)t[i]=n[i]}return t}function Am(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function yd(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:se.workingColorSpace}const Rm={clone:ar,merge:tn};var Cm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Pm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class $n extends ms{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Cm,this.fragmentShader=Pm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ar(t.uniforms),this.uniformsGroups=Am(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Md extends ye{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new me,this.projectionMatrix=new me,this.projectionMatrixInverse=new me,this.coordinateSystem=hi}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Si=new A,Mu=new st,Su=new st;class pn extends Md{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Xr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Nr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Xr*2*Math.atan(Math.tan(Nr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Si.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Si.x,Si.y).multiplyScalar(-t/Si.z),Si.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Si.x,Si.y).multiplyScalar(-t/Si.z)}getViewSize(t,e){return this.getViewBounds(t,Mu,Su),e.subVectors(Su,Mu)}setViewOffset(t,e,n,i,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Nr*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,e-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ds=-90,Ls=1;class Dm extends ye{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new pn(Ds,Ls,t,e);i.layers=this.layers,this.add(i);const r=new pn(Ds,Ls,t,e);r.layers=this.layers,this.add(r);const o=new pn(Ds,Ls,t,e);o.layers=this.layers,this.add(o);const a=new pn(Ds,Ls,t,e);a.layers=this.layers,this.add(a);const l=new pn(Ds,Ls,t,e);l.layers=this.layers,this.add(l);const c=new pn(Ds,Ls,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,o,a,l]=e;for(const c of e)this.remove(c);if(t===hi)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===da)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Sd extends $e{constructor(t,e,n,i,r,o,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:tr,super(t,e,n,i,r,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Lm extends fs{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Sd(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:On}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new gs(5,5,5),r=new $n({name:"CubemapFromEquirect",uniforms:ar(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ye,blending:Di});r.uniforms.tEquirect.value=e;const o=new Zt(i,r),a=e.minFilter;return e.minFilter===is&&(e.minFilter=On),new Dm(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(r)}}class Lt extends ye{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Im={type:"move"};class hl{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Lt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Lt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Lt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){o=!0;for(const _ of t.hand.values()){const p=e.getJointPose(_,n),m=this._getHandJoint(c,_);p!==null&&(m.matrix.fromArray(p.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=p.radius),m.visible=p!==null}const h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Im)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new Lt;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class oh{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Vt(t),this.near=e,this.far=n}clone(){return new oh(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Um extends ye{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new zn,this.environmentIntensity=1,this.environmentRotation=new zn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class Nm{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Ec,this.updateRanges=[],this.version=0,this.uuid=Xn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Xn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Xn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const je=new A;class pa{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)je.fromBufferAttribute(this,e),je.applyMatrix4(t),this.setXYZ(e,je.x,je.y,je.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)je.fromBufferAttribute(this,e),je.applyNormalMatrix(t),this.setXYZ(e,je.x,je.y,je.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)je.fromBufferAttribute(this,e),je.transformDirection(t),this.setXYZ(e,je.x,je.y,je.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=Nn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=ce(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=ce(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=ce(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=ce(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=ce(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Nn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Nn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Nn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Nn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=ce(e,this.array),n=ce(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=ce(e,this.array),n=ce(n,this.array),i=ce(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=ce(e,this.array),n=ce(n,this.array),i=ce(i,this.array),r=ce(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new He(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new pa(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class ah extends ms{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Vt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Is;const yr=new A,Us=new A,Ns=new A,Os=new st,Mr=new st,bd=new me,Uo=new A,Sr=new A,No=new A,bu=new st,ul=new st,wu=new st;class wd extends ye{constructor(t=new ah){if(super(),this.isSprite=!0,this.type="Sprite",Is===void 0){Is=new De;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Nm(e,5);Is.setIndex([0,1,2,0,2,3]),Is.setAttribute("position",new pa(n,3,0,!1)),Is.setAttribute("uv",new pa(n,2,3,!1))}this.geometry=Is,this.material=t,this.center=new st(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Us.setFromMatrixScale(this.matrixWorld),bd.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Ns.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Us.multiplyScalar(-Ns.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const o=this.center;Oo(Uo.set(-.5,-.5,0),Ns,o,Us,i,r),Oo(Sr.set(.5,-.5,0),Ns,o,Us,i,r),Oo(No.set(.5,.5,0),Ns,o,Us,i,r),bu.set(0,0),ul.set(1,0),wu.set(1,1);let a=t.ray.intersectTriangle(Uo,Sr,No,!1,yr);if(a===null&&(Oo(Sr.set(-.5,.5,0),Ns,o,Us,i,r),ul.set(0,1),a=t.ray.intersectTriangle(Uo,No,Sr,!1,yr),a===null))return;const l=t.ray.origin.distanceTo(yr);l<t.near||l>t.far||e.push({distance:l,point:yr.clone(),uv:En.getInterpolation(yr,Uo,Sr,No,bu,ul,wu,new st),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function Oo(s,t,e,n,i,r){Os.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(Mr.x=r*Os.x-i*Os.y,Mr.y=i*Os.x+r*Os.y):Mr.copy(Os),s.copy(t),s.x+=Mr.x,s.y+=Mr.y,s.applyMatrix4(bd)}const fl=new A,Om=new A,Fm=new Wt;class oi{constructor(t=new A(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=fl.subVectors(n,e).cross(Om.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(fl),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||Fm.getNormalMatrix(t),i=this.coplanarPoint(fl).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Xi=new Ra,Fo=new A;class lh{constructor(t=new oi,e=new oi,n=new oi,i=new oi,r=new oi,o=new oi){this.planes=[t,e,n,i,r,o]}set(t,e,n,i,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=hi){const n=this.planes,i=t.elements,r=i[0],o=i[1],a=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],f=i[8],g=i[9],_=i[10],p=i[11],m=i[12],y=i[13],x=i[14],v=i[15];if(n[0].setComponents(l-r,d-c,p-f,v-m).normalize(),n[1].setComponents(l+r,d+c,p+f,v+m).normalize(),n[2].setComponents(l+o,d+h,p+g,v+y).normalize(),n[3].setComponents(l-o,d-h,p-g,v-y).normalize(),n[4].setComponents(l-a,d-u,p-_,v-x).normalize(),e===hi)n[5].setComponents(l+a,d+u,p+_,v+x).normalize();else if(e===da)n[5].setComponents(a,u,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Xi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Xi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Xi)}intersectsSprite(t){return Xi.center.set(0,0,0),Xi.radius=.7071067811865476,Xi.applyMatrix4(t.matrixWorld),this.intersectsSphere(Xi)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Fo.x=i.normal.x>0?t.max.x:t.min.x,Fo.y=i.normal.y>0?t.max.y:t.min.y,Fo.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Fo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class km extends ms{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Vt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const Tu=new me,Ac=new sh,ko=new Ra,zo=new A;class zm extends ye{constructor(t=new De,e=new km){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ko.copy(n.boundingSphere),ko.applyMatrix4(i),ko.radius+=r,t.ray.intersectsSphere(ko)===!1)return;Tu.copy(i).invert(),Ac.copy(t.ray).applyMatrix4(Tu);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,u=n.attributes.position;if(c!==null){const d=Math.max(0,o.start),f=Math.min(c.count,o.start+o.count);for(let g=d,_=f;g<_;g++){const p=c.getX(g);zo.fromBufferAttribute(u,p),Eu(zo,p,l,i,t,e,this)}}else{const d=Math.max(0,o.start),f=Math.min(u.count,o.start+o.count);for(let g=d,_=f;g<_;g++)zo.fromBufferAttribute(u,g),Eu(zo,g,l,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Eu(s,t,e,n,i,r,o){const a=Ac.distanceSqToPoint(s);if(a<e){const l=new A;Ac.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:o})}}class _s extends $e{constructor(t,e,n,i,r,o,a,l,c){super(t,e,n,i,r,o,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Td extends $e{constructor(t,e,n,i,r,o,a,l,c,h=$s){if(h!==$s&&h!==sr)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===$s&&(n=us),n===void 0&&h===sr&&(n=ir),super(null,i,r,o,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:kn,this.minFilter=l!==void 0?l:kn,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new ih(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}class Jn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let i=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,l=r-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-o,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===o)return i/(r-1);const h=n[i],d=n[i+1]-h,f=(o-h)/d;return(i+f)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const o=this.getPoint(i),a=this.getPoint(r),l=e||(o.isVector2?new st:new A);return l.copy(a).sub(o).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new A,i=[],r=[],o=[],a=new A,l=new me;for(let f=0;f<=t;f++){const g=f/t;i[f]=this.getTangentAt(g,new A)}r[0]=new A,o[0]=new A;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Yt(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(i[f],r[f])}if(e===!0){let f=Math.acos(Yt(r[0].dot(r[t]),-1,1));f/=t,i[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(i[g],f*g)),o[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class ch extends Jn{constructor(t=0,e=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(t,e=new st){const n=e,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);const a=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Bm extends ch{constructor(t,e,n,i,r,o){super(t,e,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function hh(){let s=0,t=0,e=0,n=0;function i(r,o,a,l){s=r,t=a,e=-3*r+3*o-2*a-l,n=2*r-2*o+a+l}return{initCatmullRom:function(r,o,a,l,c){i(o,a,c*(a-r),c*(l-o))},initNonuniformCatmullRom:function(r,o,a,l,c,h,u){let d=(o-r)/c-(a-r)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,i(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return s+t*r+e*o+n*a}}}const Bo=new A,dl=new hh,pl=new hh,ml=new hh;class Hm extends Jn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new A){const n=e,i=this.points,r=i.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:l===0&&a===r-1&&(a=r-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%r]:(Bo.subVectors(i[0],i[1]).add(i[0]),c=Bo);const u=i[a%r],d=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(Bo.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=Bo),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),p=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),p<1e-4&&(p=_),dl.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,_,p),pl.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,_,p),ml.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,_,p)}else this.curveType==="catmullrom"&&(dl.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),pl.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),ml.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return n.set(dl.calc(l),pl.calc(l),ml.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new A().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Au(s,t,e,n,i){const r=(n-t)*.5,o=(i-e)*.5,a=s*s,l=s*a;return(2*e-2*n+r+o)*l+(-3*e+3*n-2*r-o)*a+r*s+e}function Vm(s,t){const e=1-s;return e*e*t}function Gm(s,t){return 2*(1-s)*s*t}function Wm(s,t){return s*s*t}function Fr(s,t,e,n){return Vm(s,t)+Gm(s,e)+Wm(s,n)}function Xm(s,t){const e=1-s;return e*e*e*t}function qm(s,t){const e=1-s;return 3*e*e*s*t}function Ym(s,t){return 3*(1-s)*s*s*t}function $m(s,t){return s*s*s*t}function kr(s,t,e,n,i){return Xm(s,t)+qm(s,e)+Ym(s,n)+$m(s,i)}class Ed extends Jn{constructor(t=new st,e=new st,n=new st,i=new st){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new st){const n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(kr(t,i.x,r.x,o.x,a.x),kr(t,i.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Zm extends Jn{constructor(t=new A,e=new A,n=new A,i=new A){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new A){const n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(kr(t,i.x,r.x,o.x,a.x),kr(t,i.y,r.y,o.y,a.y),kr(t,i.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Ad extends Jn{constructor(t=new st,e=new st){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new st){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new st){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Jm extends Jn{constructor(t=new A,e=new A){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new A){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new A){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Rd extends Jn{constructor(t=new st,e=new st,n=new st){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new st){const n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(Fr(t,i.x,r.x,o.x),Fr(t,i.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class uh extends Jn{constructor(t=new A,e=new A,n=new A){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new A){const n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(Fr(t,i.x,r.x,o.x),Fr(t,i.y,r.y,o.y),Fr(t,i.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Cd extends Jn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new st){const n=e,i=this.points,r=(i.length-1)*t,o=Math.floor(r),a=r-o,l=i[o===0?o:o-1],c=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(Au(a,l.x,c.x,h.x,u.x),Au(a,l.y,c.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new st().fromArray(i))}return this}}var ma=Object.freeze({__proto__:null,ArcCurve:Bm,CatmullRomCurve3:Hm,CubicBezierCurve:Ed,CubicBezierCurve3:Zm,EllipseCurve:ch,LineCurve:Ad,LineCurve3:Jm,QuadraticBezierCurve:Rd,QuadraticBezierCurve3:uh,SplineCurve:Cd});class jm extends Jn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ma[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const o=i[r]-n,a=this.curves[r],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const o=r[i],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,l=o.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new ma[i.type]().fromJSON(i))}return this}}class Rc extends jm{constructor(t){super(),this.type="Path",this.currentPoint=new st,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Ad(this.currentPoint.clone(),new st(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const r=new Rd(this.currentPoint.clone(),new st(t,e),new st(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,o){const a=new Ed(this.currentPoint.clone(),new st(t,e),new st(n,i),new st(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new Cd(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,o){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,i,r,o),this}absarc(t,e,n,i,r,o){return this.absellipse(t,e,n,n,i,r,o),this}ellipse(t,e,n,i,r,o,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,r,o,a,l),this}absellipse(t,e,n,i,r,o,a,l){const c=new ch(t,e,n,i,r,o,a,l);if(this.curves.length>0){const u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class fh extends De{constructor(t=[new st(0,-.5),new st(.5,0),new st(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=Yt(i,0,Math.PI*2);const r=[],o=[],a=[],l=[],c=[],h=1/e,u=new A,d=new st,f=new A,g=new A,_=new A;let p=0,m=0;for(let y=0;y<=t.length-1;y++)switch(y){case 0:p=t[y+1].x-t[y].x,m=t[y+1].y-t[y].y,f.x=m*1,f.y=-p,f.z=m*0,_.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case t.length-1:l.push(_.x,_.y,_.z);break;default:p=t[y+1].x-t[y].x,m=t[y+1].y-t[y].y,f.x=m*1,f.y=-p,f.z=m*0,g.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),l.push(f.x,f.y,f.z),_.copy(g)}for(let y=0;y<=e;y++){const x=n+y*h*i,v=Math.sin(x),E=Math.cos(x);for(let R=0;R<=t.length-1;R++){u.x=t[R].x*v,u.y=t[R].y,u.z=t[R].x*E,o.push(u.x,u.y,u.z),d.x=y/e,d.y=R/(t.length-1),a.push(d.x,d.y);const T=l[3*R+0]*v,C=l[3*R+1],M=l[3*R+0]*E;c.push(T,C,M)}}for(let y=0;y<e;y++)for(let x=0;x<t.length-1;x++){const v=x+y*t.length,E=v,R=v+t.length,T=v+t.length+1,C=v+1;r.push(E,R,C),r.push(T,C,R)}this.setIndex(r),this.setAttribute("position",new ne(o,3)),this.setAttribute("uv",new ne(a,2)),this.setAttribute("normal",new ne(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fh(t.points,t.segments,t.phiStart,t.phiLength)}}class dh extends fh{constructor(t=1,e=1,n=4,i=8){const r=new Rc;r.absarc(0,-e/2,t,Math.PI*1.5,0),r.absarc(0,e/2,t,0,Math.PI*.5),super(r.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:i}}static fromJSON(t){return new dh(t.radius,t.length,t.capSegments,t.radialSegments)}}class Ca extends De{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],o=[],a=[],l=[],c=new A,h=new st;o.push(0,0,0),a.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*i;c.x=t*Math.cos(f),c.y=t*Math.sin(f),o.push(c.x,c.y,c.z),a.push(0,0,1),h.x=(o[d]/t+1)/2,h.y=(o[d+1]/t+1)/2,l.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new ne(o,3)),this.setAttribute("normal",new ne(a,3)),this.setAttribute("uv",new ne(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ca(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class ho extends De{constructor(t=1,e=1,n=1,i=32,r=1,o=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],u=[],d=[],f=[];let g=0;const _=[],p=n/2;let m=0;y(),o===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new ne(u,3)),this.setAttribute("normal",new ne(d,3)),this.setAttribute("uv",new ne(f,2));function y(){const v=new A,E=new A;let R=0;const T=(e-t)/n;for(let C=0;C<=r;C++){const M=[],S=C/r,L=S*(e-t)+t;for(let F=0;F<=i;F++){const O=F/i,z=O*l+a,W=Math.sin(z),H=Math.cos(z);E.x=L*W,E.y=-S*n+p,E.z=L*H,u.push(E.x,E.y,E.z),v.set(W,T,H).normalize(),d.push(v.x,v.y,v.z),f.push(O,1-S),M.push(g++)}_.push(M)}for(let C=0;C<i;C++)for(let M=0;M<r;M++){const S=_[M][C],L=_[M+1][C],F=_[M+1][C+1],O=_[M][C+1];(t>0||M!==0)&&(h.push(S,L,O),R+=3),(e>0||M!==r-1)&&(h.push(L,F,O),R+=3)}c.addGroup(m,R,0),m+=R}function x(v){const E=g,R=new st,T=new A;let C=0;const M=v===!0?t:e,S=v===!0?1:-1;for(let F=1;F<=i;F++)u.push(0,p*S,0),d.push(0,S,0),f.push(.5,.5),g++;const L=g;for(let F=0;F<=i;F++){const z=F/i*l+a,W=Math.cos(z),H=Math.sin(z);T.x=M*H,T.y=p*S,T.z=M*W,u.push(T.x,T.y,T.z),d.push(0,S,0),R.x=W*.5+.5,R.y=H*.5*S+.5,f.push(R.x,R.y),g++}for(let F=0;F<i;F++){const O=E+F,z=L+F;v===!0?h.push(z,z+1,O):h.push(z+1,z,O),C+=3}c.addGroup(m,C,v===!0?1:2),m+=C}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ho(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Yr extends ho{constructor(t=1,e=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new Yr(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Pa extends De{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const r=[],o=[];a(i),c(n),h(),this.setAttribute("position",new ne(r,3)),this.setAttribute("normal",new ne(r.slice(),3)),this.setAttribute("uv",new ne(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(y){const x=new A,v=new A,E=new A;for(let R=0;R<e.length;R+=3)f(e[R+0],x),f(e[R+1],v),f(e[R+2],E),l(x,v,E,y)}function l(y,x,v,E){const R=E+1,T=[];for(let C=0;C<=R;C++){T[C]=[];const M=y.clone().lerp(v,C/R),S=x.clone().lerp(v,C/R),L=R-C;for(let F=0;F<=L;F++)F===0&&C===R?T[C][F]=M:T[C][F]=M.clone().lerp(S,F/L)}for(let C=0;C<R;C++)for(let M=0;M<2*(R-C)-1;M++){const S=Math.floor(M/2);M%2===0?(d(T[C][S+1]),d(T[C+1][S]),d(T[C][S])):(d(T[C][S+1]),d(T[C+1][S+1]),d(T[C+1][S]))}}function c(y){const x=new A;for(let v=0;v<r.length;v+=3)x.x=r[v+0],x.y=r[v+1],x.z=r[v+2],x.normalize().multiplyScalar(y),r[v+0]=x.x,r[v+1]=x.y,r[v+2]=x.z}function h(){const y=new A;for(let x=0;x<r.length;x+=3){y.x=r[x+0],y.y=r[x+1],y.z=r[x+2];const v=p(y)/2/Math.PI+.5,E=m(y)/Math.PI+.5;o.push(v,1-E)}g(),u()}function u(){for(let y=0;y<o.length;y+=6){const x=o[y+0],v=o[y+2],E=o[y+4],R=Math.max(x,v,E),T=Math.min(x,v,E);R>.9&&T<.1&&(x<.2&&(o[y+0]+=1),v<.2&&(o[y+2]+=1),E<.2&&(o[y+4]+=1))}}function d(y){r.push(y.x,y.y,y.z)}function f(y,x){const v=y*3;x.x=t[v+0],x.y=t[v+1],x.z=t[v+2]}function g(){const y=new A,x=new A,v=new A,E=new A,R=new st,T=new st,C=new st;for(let M=0,S=0;M<r.length;M+=9,S+=6){y.set(r[M+0],r[M+1],r[M+2]),x.set(r[M+3],r[M+4],r[M+5]),v.set(r[M+6],r[M+7],r[M+8]),R.set(o[S+0],o[S+1]),T.set(o[S+2],o[S+3]),C.set(o[S+4],o[S+5]),E.copy(y).add(x).add(v).divideScalar(3);const L=p(E);_(R,S+0,y,L),_(T,S+2,x,L),_(C,S+4,v,L)}}function _(y,x,v,E){E<0&&y.x===1&&(o[x]=y.x-1),v.x===0&&v.z===0&&(o[x]=E/2/Math.PI+.5)}function p(y){return Math.atan2(y.z,-y.x)}function m(y){return Math.atan2(-y.y,Math.sqrt(y.x*y.x+y.z*y.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Pa(t.vertices,t.indices,t.radius,t.details)}}class zr extends Rc{constructor(t){super(t),this.uuid=Xn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new Rc().fromJSON(i))}return this}}class Km{static triangulate(t,e,n=2){const i=e&&e.length,r=i?e[0]*n:t.length;let o=Pd(t,0,r,n,!0);const a=[];if(!o||o.next===o.prev)return a;let l,c,h,u,d,f,g;if(i&&(o=ig(t,e,o,n)),t.length>80*n){l=h=t[0],c=u=t[1];for(let _=n;_<r;_+=n)d=t[_],f=t[_+1],d<l&&(l=d),f<c&&(c=f),d>h&&(h=d),f>u&&(u=f);g=Math.max(h-l,u-c),g=g!==0?32767/g:0}return $r(o,a,n,l,c,g,0),a}}function Pd(s,t,e,n,i){let r,o;if(i===pg(s,t,e,n)>0)for(r=t;r<e;r+=n)o=Ru(r,s[r],s[r+1],o);else for(r=e-n;r>=t;r-=n)o=Ru(r,s[r],s[r+1],o);return o&&Da(o,o.next)&&(Jr(o),o=o.next),o}function ds(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(Da(e,e.next)||be(e.prev,e,e.next)===0)){if(Jr(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function $r(s,t,e,n,i,r,o){if(!s)return;!o&&r&&lg(s,n,i,r);let a=s,l,c;for(;s.prev!==s.next;){if(l=s.prev,c=s.next,r?tg(s,n,i,r):Qm(s)){t.push(l.i/e|0),t.push(s.i/e|0),t.push(c.i/e|0),Jr(s),s=c.next,a=c.next;continue}if(s=c,s===a){o?o===1?(s=eg(ds(s),t,e),$r(s,t,e,n,i,r,2)):o===2&&ng(s,t,e,n,i,r):$r(ds(s),t,e,n,i,r,1);break}}}function Qm(s){const t=s.prev,e=s,n=s.next;if(be(t,e,n)>=0)return!1;const i=t.x,r=e.x,o=n.x,a=t.y,l=e.y,c=n.y,h=i<r?i<o?i:o:r<o?r:o,u=a<l?a<c?a:c:l<c?l:c,d=i>r?i>o?i:o:r>o?r:o,f=a>l?a>c?a:c:l>c?l:c;let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&Ws(i,a,r,l,o,c,g.x,g.y)&&be(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function tg(s,t,e,n){const i=s.prev,r=s,o=s.next;if(be(i,r,o)>=0)return!1;const a=i.x,l=r.x,c=o.x,h=i.y,u=r.y,d=o.y,f=a<l?a<c?a:c:l<c?l:c,g=h<u?h<d?h:d:u<d?u:d,_=a>l?a>c?a:c:l>c?l:c,p=h>u?h>d?h:d:u>d?u:d,m=Cc(f,g,t,e,n),y=Cc(_,p,t,e,n);let x=s.prevZ,v=s.nextZ;for(;x&&x.z>=m&&v&&v.z<=y;){if(x.x>=f&&x.x<=_&&x.y>=g&&x.y<=p&&x!==i&&x!==o&&Ws(a,h,l,u,c,d,x.x,x.y)&&be(x.prev,x,x.next)>=0||(x=x.prevZ,v.x>=f&&v.x<=_&&v.y>=g&&v.y<=p&&v!==i&&v!==o&&Ws(a,h,l,u,c,d,v.x,v.y)&&be(v.prev,v,v.next)>=0))return!1;v=v.nextZ}for(;x&&x.z>=m;){if(x.x>=f&&x.x<=_&&x.y>=g&&x.y<=p&&x!==i&&x!==o&&Ws(a,h,l,u,c,d,x.x,x.y)&&be(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;v&&v.z<=y;){if(v.x>=f&&v.x<=_&&v.y>=g&&v.y<=p&&v!==i&&v!==o&&Ws(a,h,l,u,c,d,v.x,v.y)&&be(v.prev,v,v.next)>=0)return!1;v=v.nextZ}return!0}function eg(s,t,e){let n=s;do{const i=n.prev,r=n.next.next;!Da(i,r)&&Dd(i,n,n.next,r)&&Zr(i,r)&&Zr(r,i)&&(t.push(i.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),Jr(n),Jr(n.next),n=s=r),n=n.next}while(n!==s);return ds(n)}function ng(s,t,e,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&ug(o,a)){let l=Ld(o,a);o=ds(o,o.next),l=ds(l,l.next),$r(o,t,e,n,i,r,0),$r(l,t,e,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function ig(s,t,e,n){const i=[];let r,o,a,l,c;for(r=0,o=t.length;r<o;r++)a=t[r]*n,l=r<o-1?t[r+1]*n:s.length,c=Pd(s,a,l,n,!1),c===c.next&&(c.steiner=!0),i.push(hg(c));for(i.sort(sg),r=0;r<i.length;r++)e=rg(i[r],e);return e}function sg(s,t){return s.x-t.x}function rg(s,t){const e=og(s,t);if(!e)return t;const n=Ld(e,s);return ds(n,n.next),ds(e,e.next)}function og(s,t){let e=t,n=-1/0,i;const r=s.x,o=s.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const d=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=r&&d>n&&(n=d,i=e.x<e.next.x?e:e.next,d===r))return i}e=e.next}while(e!==t);if(!i)return null;const a=i,l=i.x,c=i.y;let h=1/0,u;e=i;do r>=e.x&&e.x>=l&&r!==e.x&&Ws(o<c?r:n,o,l,c,o<c?n:r,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(r-e.x),Zr(e,s)&&(u<h||u===h&&(e.x>i.x||e.x===i.x&&ag(i,e)))&&(i=e,h=u)),e=e.next;while(e!==a);return i}function ag(s,t){return be(s.prev,s,t.prev)<0&&be(t.next,s,s.next)<0}function lg(s,t,e,n){let i=s;do i.z===0&&(i.z=Cc(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,cg(i)}function cg(s){let t,e,n,i,r,o,a,l,c=1;do{for(e=s,s=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<c&&(a++,n=n.nextZ,!!n);t++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,a--):(i=n,n=n.nextZ,l--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;e=n}r.nextZ=null,c*=2}while(o>1);return s}function Cc(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function hg(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function Ws(s,t,e,n,i,r,o,a){return(i-o)*(t-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(i-o)*(n-a)}function ug(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!fg(s,t)&&(Zr(s,t)&&Zr(t,s)&&dg(s,t)&&(be(s.prev,s,t.prev)||be(s,t.prev,t))||Da(s,t)&&be(s.prev,s,s.next)>0&&be(t.prev,t,t.next)>0)}function be(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function Da(s,t){return s.x===t.x&&s.y===t.y}function Dd(s,t,e,n){const i=Vo(be(s,t,e)),r=Vo(be(s,t,n)),o=Vo(be(e,n,s)),a=Vo(be(e,n,t));return!!(i!==r&&o!==a||i===0&&Ho(s,e,t)||r===0&&Ho(s,n,t)||o===0&&Ho(e,s,n)||a===0&&Ho(e,t,n))}function Ho(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function Vo(s){return s>0?1:s<0?-1:0}function fg(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&Dd(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function Zr(s,t){return be(s.prev,s,s.next)<0?be(s,t,s.next)>=0&&be(s,s.prev,t)>=0:be(s,t,s.prev)<0||be(s,s.next,t)<0}function dg(s,t){let e=s,n=!1;const i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function Ld(s,t){const e=new Pc(s.i,s.x,s.y),n=new Pc(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Ru(s,t,e,n){const i=new Pc(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Jr(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Pc(s,t,e){this.i=s,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function pg(s,t,e,n){let i=0;for(let r=t,o=e-n;r<e;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}class Br{static area(t){const e=t.length;let n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return Br.area(t)<0}static triangulateShape(t,e){const n=[],i=[],r=[];Cu(t),Pu(n,t);let o=t.length;e.forEach(Cu);for(let l=0;l<e.length;l++)i.push(o),o+=e[l].length,Pu(n,e[l]);const a=Km.triangulate(n,i);for(let l=0;l<a.length;l+=3)r.push(a.slice(l,l+3));return r}}function Cu(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function Pu(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class jr extends De{constructor(t=new zr([new st(.5,.5),new st(-.5,.5),new st(-.5,-.5),new st(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],r=[];for(let a=0,l=t.length;a<l;a++){const c=t[a];o(c)}this.setAttribute("position",new ne(i,3)),this.setAttribute("uv",new ne(r,2)),this.computeVertexNormals();function o(a){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:f-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,p=e.bevelSegments!==void 0?e.bevelSegments:3;const m=e.extrudePath,y=e.UVGenerator!==void 0?e.UVGenerator:mg;let x,v=!1,E,R,T,C;m&&(x=m.getSpacedPoints(h),v=!0,d=!1,E=m.computeFrenetFrames(h,!1),R=new A,T=new A,C=new A),d||(p=0,f=0,g=0,_=0);const M=a.extractPoints(c);let S=M.shape;const L=M.holes;if(!Br.isClockWise(S)){S=S.reverse();for(let rt=0,et=L.length;rt<et;rt++){const D=L[rt];Br.isClockWise(D)&&(L[rt]=D.reverse())}}const O=Br.triangulateShape(S,L),z=S;for(let rt=0,et=L.length;rt<et;rt++){const D=L[rt];S=S.concat(D)}function W(rt,et,D){return et||console.error("THREE.ExtrudeGeometry: vec does not exist"),rt.clone().addScaledVector(et,D)}const H=S.length,Y=O.length;function G(rt,et,D){let Pt,ot,bt;const ut=rt.x-et.x,Ft=rt.y-et.y,vt=D.x-rt.x,P=D.y-rt.y,b=ut*ut+Ft*Ft,k=ut*P-Ft*vt;if(Math.abs(k)>Number.EPSILON){const Z=Math.sqrt(b),tt=Math.sqrt(vt*vt+P*P),J=et.x-Ft/Z,Ct=et.y+ut/Z,mt=D.x-P/tt,St=D.y+vt/tt,Jt=((mt-J)*P-(St-Ct)*vt)/(ut*P-Ft*vt);Pt=J+ut*Jt-rt.x,ot=Ct+Ft*Jt-rt.y;const ct=Pt*Pt+ot*ot;if(ct<=2)return new st(Pt,ot);bt=Math.sqrt(ct/2)}else{let Z=!1;ut>Number.EPSILON?vt>Number.EPSILON&&(Z=!0):ut<-Number.EPSILON?vt<-Number.EPSILON&&(Z=!0):Math.sign(Ft)===Math.sign(P)&&(Z=!0),Z?(Pt=-Ft,ot=ut,bt=Math.sqrt(b)):(Pt=ut,ot=Ft,bt=Math.sqrt(b/2))}return new st(Pt/bt,ot/bt)}const ht=[];for(let rt=0,et=z.length,D=et-1,Pt=rt+1;rt<et;rt++,D++,Pt++)D===et&&(D=0),Pt===et&&(Pt=0),ht[rt]=G(z[rt],z[D],z[Pt]);const pt=[];let Mt,Ot=ht.concat();for(let rt=0,et=L.length;rt<et;rt++){const D=L[rt];Mt=[];for(let Pt=0,ot=D.length,bt=ot-1,ut=Pt+1;Pt<ot;Pt++,bt++,ut++)bt===ot&&(bt=0),ut===ot&&(ut=0),Mt[Pt]=G(D[Pt],D[bt],D[ut]);pt.push(Mt),Ot=Ot.concat(Mt)}for(let rt=0;rt<p;rt++){const et=rt/p,D=f*Math.cos(et*Math.PI/2),Pt=g*Math.sin(et*Math.PI/2)+_;for(let ot=0,bt=z.length;ot<bt;ot++){const ut=W(z[ot],ht[ot],Pt);ft(ut.x,ut.y,-D)}for(let ot=0,bt=L.length;ot<bt;ot++){const ut=L[ot];Mt=pt[ot];for(let Ft=0,vt=ut.length;Ft<vt;Ft++){const P=W(ut[Ft],Mt[Ft],Pt);ft(P.x,P.y,-D)}}}const Qt=g+_;for(let rt=0;rt<H;rt++){const et=d?W(S[rt],Ot[rt],Qt):S[rt];v?(T.copy(E.normals[0]).multiplyScalar(et.x),R.copy(E.binormals[0]).multiplyScalar(et.y),C.copy(x[0]).add(T).add(R),ft(C.x,C.y,C.z)):ft(et.x,et.y,0)}for(let rt=1;rt<=h;rt++)for(let et=0;et<H;et++){const D=d?W(S[et],Ot[et],Qt):S[et];v?(T.copy(E.normals[rt]).multiplyScalar(D.x),R.copy(E.binormals[rt]).multiplyScalar(D.y),C.copy(x[rt]).add(T).add(R),ft(C.x,C.y,C.z)):ft(D.x,D.y,u/h*rt)}for(let rt=p-1;rt>=0;rt--){const et=rt/p,D=f*Math.cos(et*Math.PI/2),Pt=g*Math.sin(et*Math.PI/2)+_;for(let ot=0,bt=z.length;ot<bt;ot++){const ut=W(z[ot],ht[ot],Pt);ft(ut.x,ut.y,u+D)}for(let ot=0,bt=L.length;ot<bt;ot++){const ut=L[ot];Mt=pt[ot];for(let Ft=0,vt=ut.length;Ft<vt;Ft++){const P=W(ut[Ft],Mt[Ft],Pt);v?ft(P.x,P.y+x[h-1].y,x[h-1].x+D):ft(P.x,P.y,u+D)}}}$(),lt();function $(){const rt=i.length/3;if(d){let et=0,D=H*et;for(let Pt=0;Pt<Y;Pt++){const ot=O[Pt];It(ot[2]+D,ot[1]+D,ot[0]+D)}et=h+p*2,D=H*et;for(let Pt=0;Pt<Y;Pt++){const ot=O[Pt];It(ot[0]+D,ot[1]+D,ot[2]+D)}}else{for(let et=0;et<Y;et++){const D=O[et];It(D[2],D[1],D[0])}for(let et=0;et<Y;et++){const D=O[et];It(D[0]+H*h,D[1]+H*h,D[2]+H*h)}}n.addGroup(rt,i.length/3-rt,0)}function lt(){const rt=i.length/3;let et=0;Rt(z,et),et+=z.length;for(let D=0,Pt=L.length;D<Pt;D++){const ot=L[D];Rt(ot,et),et+=ot.length}n.addGroup(rt,i.length/3-rt,1)}function Rt(rt,et){let D=rt.length;for(;--D>=0;){const Pt=D;let ot=D-1;ot<0&&(ot=rt.length-1);for(let bt=0,ut=h+p*2;bt<ut;bt++){const Ft=H*bt,vt=H*(bt+1),P=et+Pt+Ft,b=et+ot+Ft,k=et+ot+vt,Z=et+Pt+vt;te(P,b,k,Z)}}}function ft(rt,et,D){l.push(rt),l.push(et),l.push(D)}function It(rt,et,D){Dt(rt),Dt(et),Dt(D);const Pt=i.length/3,ot=y.generateTopUV(n,i,Pt-3,Pt-2,Pt-1);re(ot[0]),re(ot[1]),re(ot[2])}function te(rt,et,D,Pt){Dt(rt),Dt(et),Dt(Pt),Dt(et),Dt(D),Dt(Pt);const ot=i.length/3,bt=y.generateSideWallUV(n,i,ot-6,ot-3,ot-2,ot-1);re(bt[0]),re(bt[1]),re(bt[3]),re(bt[1]),re(bt[2]),re(bt[3])}function Dt(rt){i.push(l[rt*3+0]),i.push(l[rt*3+1]),i.push(l[rt*3+2])}function re(rt){r.push(rt.x),r.push(rt.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return gg(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,o=t.shapes.length;r<o;r++){const a=e[t.shapes[r]];n.push(a)}const i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new ma[i.type]().fromJSON(i)),new jr(n,t.options)}}const mg={generateTopUV:function(s,t,e,n,i){const r=t[e*3],o=t[e*3+1],a=t[n*3],l=t[n*3+1],c=t[i*3],h=t[i*3+1];return[new st(r,o),new st(a,l),new st(c,h)]},generateSideWallUV:function(s,t,e,n,i,r){const o=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[i*3],f=t[i*3+1],g=t[i*3+2],_=t[r*3],p=t[r*3+1],m=t[r*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new st(o,1-l),new st(c,1-u),new st(d,1-g),new st(_,1-m)]:[new st(a,1-l),new st(h,1-u),new st(f,1-g),new st(p,1-m)]}};function gg(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const r=s[n];e.shapes.push(r.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class La extends Pa{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new La(t.radius,t.detail)}}class uo extends De{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,o=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,u=t/a,d=e/l,f=[],g=[],_=[],p=[];for(let m=0;m<h;m++){const y=m*d-o;for(let x=0;x<c;x++){const v=x*u-r;g.push(v,-y,0),_.push(0,0,1),p.push(x/a),p.push(1-m/l)}}for(let m=0;m<l;m++)for(let y=0;y<a;y++){const x=y+c*m,v=y+c*(m+1),E=y+1+c*(m+1),R=y+1+c*m;f.push(x,v,R),f.push(v,E,R)}this.setIndex(f),this.setAttribute("position",new ne(g,3)),this.setAttribute("normal",new ne(_,3)),this.setAttribute("uv",new ne(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new uo(t.width,t.height,t.widthSegments,t.heightSegments)}}class ph extends De{constructor(t=.5,e=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],l=[],c=[],h=[];let u=t;const d=(e-t)/i,f=new A,g=new st;for(let _=0;_<=i;_++){for(let p=0;p<=n;p++){const m=r+p/n*o;f.x=u*Math.cos(m),f.y=u*Math.sin(m),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}u+=d}for(let _=0;_<i;_++){const p=_*(n+1);for(let m=0;m<n;m++){const y=m+p,x=y,v=y+n+1,E=y+n+2,R=y+1;a.push(x,v,R),a.push(v,E,R)}}this.setIndex(a),this.setAttribute("position",new ne(l,3)),this.setAttribute("normal",new ne(c,3)),this.setAttribute("uv",new ne(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ph(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class ps extends De{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(o+a,Math.PI);let c=0;const h=[],u=new A,d=new A,f=[],g=[],_=[],p=[];for(let m=0;m<=n;m++){const y=[],x=m/n;let v=0;m===0&&o===0?v=.5/e:m===n&&l===Math.PI&&(v=-.5/e);for(let E=0;E<=e;E++){const R=E/e;u.x=-t*Math.cos(i+R*r)*Math.sin(o+x*a),u.y=t*Math.cos(o+x*a),u.z=t*Math.sin(i+R*r)*Math.sin(o+x*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),p.push(R+v,1-x),y.push(c++)}h.push(y)}for(let m=0;m<n;m++)for(let y=0;y<e;y++){const x=h[m][y+1],v=h[m][y],E=h[m+1][y],R=h[m+1][y+1];(m!==0||o>0)&&f.push(x,v,R),(m!==n-1||l<Math.PI)&&f.push(v,E,R)}this.setIndex(f),this.setAttribute("position",new ne(g,3)),this.setAttribute("normal",new ne(_,3)),this.setAttribute("uv",new ne(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ps(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class mh extends Pa{constructor(t=1,e=0){const n=[1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],i=[2,1,0,0,3,2,1,3,0,2,3,1];super(n,i,t,e),this.type="TetrahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new mh(t.radius,t.detail)}}class gh extends De{constructor(t=1,e=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],l=[],c=[],h=new A,u=new A,d=new A;for(let f=0;f<=n;f++)for(let g=0;g<=i;g++){const _=g/i*r,p=f/n*Math.PI*2;u.x=(t+e*Math.cos(p))*Math.cos(_),u.y=(t+e*Math.cos(p))*Math.sin(_),u.z=e*Math.sin(p),a.push(u.x,u.y,u.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(g/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=i;g++){const _=(i+1)*f+g-1,p=(i+1)*(f-1)+g-1,m=(i+1)*(f-1)+g,y=(i+1)*f+g;o.push(_,p,y),o.push(p,m,y)}this.setIndex(o),this.setAttribute("position",new ne(a,3)),this.setAttribute("normal",new ne(l,3)),this.setAttribute("uv",new ne(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new gh(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class _h extends De{constructor(t=new uh(new A(-1,-1,0),new A(-1,1,0),new A(1,1,0)),e=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:i,closed:r};const o=t.computeFrenetFrames(e,r);this.tangents=o.tangents,this.normals=o.normals,this.binormals=o.binormals;const a=new A,l=new A,c=new st;let h=new A;const u=[],d=[],f=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new ne(u,3)),this.setAttribute("normal",new ne(d,3)),this.setAttribute("uv",new ne(f,2));function _(){for(let x=0;x<e;x++)p(x);p(r===!1?e:0),y(),m()}function p(x){h=t.getPointAt(x/e,h);const v=o.normals[x],E=o.binormals[x];for(let R=0;R<=i;R++){const T=R/i*Math.PI*2,C=Math.sin(T),M=-Math.cos(T);l.x=M*v.x+C*E.x,l.y=M*v.y+C*E.y,l.z=M*v.z+C*E.z,l.normalize(),d.push(l.x,l.y,l.z),a.x=h.x+n*l.x,a.y=h.y+n*l.y,a.z=h.z+n*l.z,u.push(a.x,a.y,a.z)}}function m(){for(let x=1;x<=e;x++)for(let v=1;v<=i;v++){const E=(i+1)*(x-1)+(v-1),R=(i+1)*x+(v-1),T=(i+1)*x+v,C=(i+1)*(x-1)+v;g.push(E,R,C),g.push(R,T,C)}}function y(){for(let x=0;x<=e;x++)for(let v=0;v<=i;v++)c.x=x/e,c.y=v/i,f.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new _h(new ma[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class he extends ms{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Vt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Vt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=dd,this.normalScale=new st(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new zn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class _g extends ms{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=I0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class vg extends ms{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Du={enabled:!1,files:{},add:function(s,t){this.enabled!==!1&&(this.files[s]=t)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class xg{constructor(t,e,n){const i=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=t,this.onProgress=e,this.onError=n,this.itemStart=function(h){a++,r===!1&&i.onStart!==void 0&&i.onStart(h,o,a),r=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){const u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){const f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}}const yg=new xg;class vh{constructor(t){this.manager=t!==void 0?t:yg,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(t,e){const n=this;return new Promise(function(i,r){n.load(t,i,e,r)})}parse(){}setCrossOrigin(t){return this.crossOrigin=t,this}setWithCredentials(t){return this.withCredentials=t,this}setPath(t){return this.path=t,this}setResourcePath(t){return this.resourcePath=t,this}setRequestHeader(t){return this.requestHeader=t,this}}vh.DEFAULT_MATERIAL_NAME="__DEFAULT";class Mg extends vh{constructor(t){super(t)}load(t,e,n,i){this.path!==void 0&&(t=this.path+t),t=this.manager.resolveURL(t);const r=this,o=Du.get(t);if(o!==void 0)return r.manager.itemStart(t),setTimeout(function(){e&&e(o),r.manager.itemEnd(t)},0),o;const a=qr("img");function l(){h(),Du.add(t,this),e&&e(this),r.manager.itemEnd(t)}function c(u){h(),i&&i(u),r.manager.itemError(t),r.manager.itemEnd(t)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),t.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),r.manager.itemStart(t),a.src=t,a}}class Sg extends vh{constructor(t){super(t)}load(t,e,n,i){const r=new $e,o=new Mg(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(t,function(a){r.image=a,r.needsUpdate=!0,e!==void 0&&e(r)},n,i),r}}class xh extends ye{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Vt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class bg extends xh{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ye.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Vt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const gl=new me,Lu=new A,Iu=new A;class Id{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new st(512,512),this.map=null,this.mapPass=null,this.matrix=new me,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new lh,this._frameExtents=new st(1,1),this._viewportCount=1,this._viewports=[new fe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Lu.setFromMatrixPosition(t.matrixWorld),e.position.copy(Lu),Iu.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Iu),e.updateMatrixWorld(),gl.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(gl),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(gl)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Uu=new me,br=new A,_l=new A;class wg extends Id{constructor(){super(new pn(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new st(4,2),this._viewportCount=6,this._viewports=[new fe(2,1,1,1),new fe(0,1,1,1),new fe(3,1,1,1),new fe(1,1,1,1),new fe(3,0,1,1),new fe(1,0,1,1)],this._cubeDirections=[new A(1,0,0),new A(-1,0,0),new A(0,0,1),new A(0,0,-1),new A(0,1,0),new A(0,-1,0)],this._cubeUps=[new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,0,1),new A(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,r=t.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),br.setFromMatrixPosition(t.matrixWorld),n.position.copy(br),_l.copy(n.position),_l.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(_l),n.updateMatrixWorld(),i.makeTranslation(-br.x,-br.y,-br.z),Uu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Uu)}}class Tg extends xh{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new wg}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class Ud extends Md{constructor(t=-1,e=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Eg extends Id{constructor(){super(new Ud(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Nu extends xh{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ye.DEFAULT_UP),this.updateMatrix(),this.target=new ye,this.shadow=new Eg}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Ag extends pn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t,this.index=0}}const Ou=new me;class Nd{constructor(t,e,n=0,i=1/0){this.ray=new sh(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new rh,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return Ou.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Ou),this}intersectObject(t,e=!0,n=[]){return Dc(t,this,n,e),n.sort(Fu),n}intersectObjects(t,e=!0,n=[]){for(let i=0,r=t.length;i<r;i++)Dc(t[i],this,n,e);return n.sort(Fu),n}}function Fu(s,t){return s.distance-t.distance}function Dc(s,t,e,n){let i=!0;if(s.layers.test(t.layers)&&s.raycast(t,e)===!1&&(i=!1),i===!0&&n===!0){const r=s.children;for(let o=0,a=r.length;o<a;o++)Dc(r[o],t,e,!0)}}function ku(s,t,e,n){const i=Rg(n);switch(e){case od:return s*t;case ld:return s*t;case cd:return s*t*2;case hd:return s*t/i.components*i.byteLength;case Qc:return s*t/i.components*i.byteLength;case ud:return s*t*2/i.components*i.byteLength;case th:return s*t*2/i.components*i.byteLength;case ad:return s*t*3/i.components*i.byteLength;case Fn:return s*t*4/i.components*i.byteLength;case eh:return s*t*4/i.components*i.byteLength;case Qo:case ta:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case ea:case na:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case ec:case ic:return Math.max(s,16)*Math.max(t,8)/4;case tc:case nc:return Math.max(s,8)*Math.max(t,8)/2;case sc:case rc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case oc:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case ac:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case lc:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case cc:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case hc:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case uc:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case fc:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case dc:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case pc:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case mc:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case gc:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case _c:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case vc:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case xc:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case yc:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case ia:case Mc:case Sc:return Math.ceil(s/4)*Math.ceil(t/4)*16;case fd:case bc:return Math.ceil(s/4)*Math.ceil(t/4)*8;case wc:case Tc:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Rg(s){switch(s){case pi:case id:return{byteLength:1,components:1};case Wr:case sd:case lo:return{byteLength:2,components:1};case jc:case Kc:return{byteLength:2,components:4};case us:case Jc:case ci:return{byteLength:4,components:1};case rd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Zc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Zc);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function Od(){let s=null,t=!1,e=null,n=null;function i(r,o){e(r,o),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function Cg(s){const t=new WeakMap;function e(a,l){const c=a.array,h=a.usage,u=c.byteLength,d=s.createBuffer();s.bindBuffer(l,d),s.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,l,c){const h=l.array,u=l.updateRanges;if(s.bindBuffer(c,a),u.length===0)s.bufferSubData(c,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){const g=u[d],_=u[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){const _=u[f];s.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);l&&(s.deleteBuffer(l.buffer),t.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=t.get(a);if(c===void 0)t.set(a,e(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}var Pg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Dg=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Lg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ig=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Ug=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Ng=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Og=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Fg=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,kg=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,zg=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Bg=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Hg=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Vg=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Gg=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Wg=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Xg=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,qg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Yg=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,$g=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Zg=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Jg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,jg=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Kg=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Qg=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,t_=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,e_=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,n_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,i_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,s_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,r_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,o_="gl_FragColor = linearToOutputTexel( gl_FragColor );",a_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,l_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,c_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,h_=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,u_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,f_=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,d_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,p_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,m_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,g_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,__=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,v_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,x_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,y_=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,M_=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,S_=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,b_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,w_=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,T_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,E_=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,A_=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,R_=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,C_=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,P_=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,D_=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,L_=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,I_=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,U_=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,N_=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,O_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,F_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,k_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,z_=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,B_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,H_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,V_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,G_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,W_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,X_=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,q_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Y_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,$_=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Z_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,J_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,j_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,K_=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Q_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,tv=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ev=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,nv=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,iv=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,sv=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,rv=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,ov=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,av=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,lv=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,cv=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,hv=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,uv=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,fv=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,dv=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,pv=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,mv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,gv=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,_v=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,vv=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,xv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,yv=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Mv=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Sv=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,bv=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,wv=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Tv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Ev=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Av=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Rv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Cv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Pv=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Dv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Lv=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Iv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Uv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Nv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Ov=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Fv=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,kv=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,zv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Bv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Hv=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Vv=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Gv=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Wv=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Xv=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,qv=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yv=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,$v=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Zv=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Jv=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,jv=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Kv=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qv=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,tx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ex=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,nx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ix=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,sx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,rx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ox=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,ax=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,lx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,qt={alphahash_fragment:Pg,alphahash_pars_fragment:Dg,alphamap_fragment:Lg,alphamap_pars_fragment:Ig,alphatest_fragment:Ug,alphatest_pars_fragment:Ng,aomap_fragment:Og,aomap_pars_fragment:Fg,batching_pars_vertex:kg,batching_vertex:zg,begin_vertex:Bg,beginnormal_vertex:Hg,bsdfs:Vg,iridescence_fragment:Gg,bumpmap_pars_fragment:Wg,clipping_planes_fragment:Xg,clipping_planes_pars_fragment:qg,clipping_planes_pars_vertex:Yg,clipping_planes_vertex:$g,color_fragment:Zg,color_pars_fragment:Jg,color_pars_vertex:jg,color_vertex:Kg,common:Qg,cube_uv_reflection_fragment:t_,defaultnormal_vertex:e_,displacementmap_pars_vertex:n_,displacementmap_vertex:i_,emissivemap_fragment:s_,emissivemap_pars_fragment:r_,colorspace_fragment:o_,colorspace_pars_fragment:a_,envmap_fragment:l_,envmap_common_pars_fragment:c_,envmap_pars_fragment:h_,envmap_pars_vertex:u_,envmap_physical_pars_fragment:S_,envmap_vertex:f_,fog_vertex:d_,fog_pars_vertex:p_,fog_fragment:m_,fog_pars_fragment:g_,gradientmap_pars_fragment:__,lightmap_pars_fragment:v_,lights_lambert_fragment:x_,lights_lambert_pars_fragment:y_,lights_pars_begin:M_,lights_toon_fragment:b_,lights_toon_pars_fragment:w_,lights_phong_fragment:T_,lights_phong_pars_fragment:E_,lights_physical_fragment:A_,lights_physical_pars_fragment:R_,lights_fragment_begin:C_,lights_fragment_maps:P_,lights_fragment_end:D_,logdepthbuf_fragment:L_,logdepthbuf_pars_fragment:I_,logdepthbuf_pars_vertex:U_,logdepthbuf_vertex:N_,map_fragment:O_,map_pars_fragment:F_,map_particle_fragment:k_,map_particle_pars_fragment:z_,metalnessmap_fragment:B_,metalnessmap_pars_fragment:H_,morphinstance_vertex:V_,morphcolor_vertex:G_,morphnormal_vertex:W_,morphtarget_pars_vertex:X_,morphtarget_vertex:q_,normal_fragment_begin:Y_,normal_fragment_maps:$_,normal_pars_fragment:Z_,normal_pars_vertex:J_,normal_vertex:j_,normalmap_pars_fragment:K_,clearcoat_normal_fragment_begin:Q_,clearcoat_normal_fragment_maps:tv,clearcoat_pars_fragment:ev,iridescence_pars_fragment:nv,opaque_fragment:iv,packing:sv,premultiplied_alpha_fragment:rv,project_vertex:ov,dithering_fragment:av,dithering_pars_fragment:lv,roughnessmap_fragment:cv,roughnessmap_pars_fragment:hv,shadowmap_pars_fragment:uv,shadowmap_pars_vertex:fv,shadowmap_vertex:dv,shadowmask_pars_fragment:pv,skinbase_vertex:mv,skinning_pars_vertex:gv,skinning_vertex:_v,skinnormal_vertex:vv,specularmap_fragment:xv,specularmap_pars_fragment:yv,tonemapping_fragment:Mv,tonemapping_pars_fragment:Sv,transmission_fragment:bv,transmission_pars_fragment:wv,uv_pars_fragment:Tv,uv_pars_vertex:Ev,uv_vertex:Av,worldpos_vertex:Rv,background_vert:Cv,background_frag:Pv,backgroundCube_vert:Dv,backgroundCube_frag:Lv,cube_vert:Iv,cube_frag:Uv,depth_vert:Nv,depth_frag:Ov,distanceRGBA_vert:Fv,distanceRGBA_frag:kv,equirect_vert:zv,equirect_frag:Bv,linedashed_vert:Hv,linedashed_frag:Vv,meshbasic_vert:Gv,meshbasic_frag:Wv,meshlambert_vert:Xv,meshlambert_frag:qv,meshmatcap_vert:Yv,meshmatcap_frag:$v,meshnormal_vert:Zv,meshnormal_frag:Jv,meshphong_vert:jv,meshphong_frag:Kv,meshphysical_vert:Qv,meshphysical_frag:tx,meshtoon_vert:ex,meshtoon_frag:nx,points_vert:ix,points_frag:sx,shadow_vert:rx,shadow_frag:ox,sprite_vert:ax,sprite_frag:lx},dt={common:{diffuse:{value:new Vt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Wt}},envmap:{envMap:{value:null},envMapRotation:{value:new Wt},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Wt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Wt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Wt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Wt},normalScale:{value:new st(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Wt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Wt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Wt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Wt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Vt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Vt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0},uvTransform:{value:new Wt}},sprite:{diffuse:{value:new Vt(16777215)},opacity:{value:1},center:{value:new st(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Wt},alphaMap:{value:null},alphaMapTransform:{value:new Wt},alphaTest:{value:0}}},Vn={basic:{uniforms:tn([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.fog]),vertexShader:qt.meshbasic_vert,fragmentShader:qt.meshbasic_frag},lambert:{uniforms:tn([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Vt(0)}}]),vertexShader:qt.meshlambert_vert,fragmentShader:qt.meshlambert_frag},phong:{uniforms:tn([dt.common,dt.specularmap,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,dt.lights,{emissive:{value:new Vt(0)},specular:{value:new Vt(1118481)},shininess:{value:30}}]),vertexShader:qt.meshphong_vert,fragmentShader:qt.meshphong_frag},standard:{uniforms:tn([dt.common,dt.envmap,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.roughnessmap,dt.metalnessmap,dt.fog,dt.lights,{emissive:{value:new Vt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag},toon:{uniforms:tn([dt.common,dt.aomap,dt.lightmap,dt.emissivemap,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.gradientmap,dt.fog,dt.lights,{emissive:{value:new Vt(0)}}]),vertexShader:qt.meshtoon_vert,fragmentShader:qt.meshtoon_frag},matcap:{uniforms:tn([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,dt.fog,{matcap:{value:null}}]),vertexShader:qt.meshmatcap_vert,fragmentShader:qt.meshmatcap_frag},points:{uniforms:tn([dt.points,dt.fog]),vertexShader:qt.points_vert,fragmentShader:qt.points_frag},dashed:{uniforms:tn([dt.common,dt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:qt.linedashed_vert,fragmentShader:qt.linedashed_frag},depth:{uniforms:tn([dt.common,dt.displacementmap]),vertexShader:qt.depth_vert,fragmentShader:qt.depth_frag},normal:{uniforms:tn([dt.common,dt.bumpmap,dt.normalmap,dt.displacementmap,{opacity:{value:1}}]),vertexShader:qt.meshnormal_vert,fragmentShader:qt.meshnormal_frag},sprite:{uniforms:tn([dt.sprite,dt.fog]),vertexShader:qt.sprite_vert,fragmentShader:qt.sprite_frag},background:{uniforms:{uvTransform:{value:new Wt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:qt.background_vert,fragmentShader:qt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Wt}},vertexShader:qt.backgroundCube_vert,fragmentShader:qt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:qt.cube_vert,fragmentShader:qt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:qt.equirect_vert,fragmentShader:qt.equirect_frag},distanceRGBA:{uniforms:tn([dt.common,dt.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:qt.distanceRGBA_vert,fragmentShader:qt.distanceRGBA_frag},shadow:{uniforms:tn([dt.lights,dt.fog,{color:{value:new Vt(0)},opacity:{value:1}}]),vertexShader:qt.shadow_vert,fragmentShader:qt.shadow_frag}};Vn.physical={uniforms:tn([Vn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Wt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Wt},clearcoatNormalScale:{value:new st(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Wt},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Wt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Wt},sheen:{value:0},sheenColor:{value:new Vt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Wt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Wt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Wt},transmissionSamplerSize:{value:new st},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Wt},attenuationDistance:{value:0},attenuationColor:{value:new Vt(0)},specularColor:{value:new Vt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Wt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Wt},anisotropyVector:{value:new st},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Wt}}]),vertexShader:qt.meshphysical_vert,fragmentShader:qt.meshphysical_frag};const Go={r:0,b:0,g:0},qi=new zn,cx=new me;function hx(s,t,e,n,i,r,o){const a=new Vt(0);let l=r===!0?0:1,c,h,u=null,d=0,f=null;function g(x){let v=x.isScene===!0?x.background:null;return v&&v.isTexture&&(v=(x.backgroundBlurriness>0?e:t).get(v)),v}function _(x){let v=!1;const E=g(x);E===null?m(a,l):E&&E.isColor&&(m(E,1),v=!0);const R=s.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,o):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||v)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function p(x,v){const E=g(v);E&&(E.isCubeTexture||E.mapping===Aa)?(h===void 0&&(h=new Zt(new gs(1,1,1),new $n({name:"BackgroundCubeMaterial",uniforms:ar(Vn.backgroundCube.uniforms),vertexShader:Vn.backgroundCube.vertexShader,fragmentShader:Vn.backgroundCube.fragmentShader,side:Ye,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,T,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),qi.copy(v.backgroundRotation),qi.x*=-1,qi.y*=-1,qi.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(qi.y*=-1,qi.z*=-1),h.material.uniforms.envMap.value=E,h.material.uniforms.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=v.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(cx.makeRotationFromEuler(qi)),h.material.toneMapped=se.getTransfer(E.colorSpace)!==ue,(u!==E||d!==E.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=E,d=E.version,f=s.toneMapping),h.layers.enableAll(),x.unshift(h,h.geometry,h.material,0,0,null)):E&&E.isTexture&&(c===void 0&&(c=new Zt(new uo(2,2),new $n({name:"BackgroundMaterial",uniforms:ar(Vn.background.uniforms),vertexShader:Vn.background.vertexShader,fragmentShader:Vn.background.fragmentShader,side:di,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=E,c.material.uniforms.backgroundIntensity.value=v.backgroundIntensity,c.material.toneMapped=se.getTransfer(E.colorSpace)!==ue,E.matrixAutoUpdate===!0&&E.updateMatrix(),c.material.uniforms.uvTransform.value.copy(E.matrix),(u!==E||d!==E.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,u=E,d=E.version,f=s.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null))}function m(x,v){x.getRGB(Go,yd(s)),n.buffers.color.setClear(Go.r,Go.g,Go.b,v,o)}function y(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,v=1){a.set(x),l=v,m(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(x){l=x,m(a,l)},render:_,addToRenderList:p,dispose:y}}function ux(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let r=i,o=!1;function a(S,L,F,O,z){let W=!1;const H=u(O,F,L);r!==H&&(r=H,c(r.object)),W=f(S,O,F,z),W&&g(S,O,F,z),z!==null&&t.update(z,s.ELEMENT_ARRAY_BUFFER),(W||o)&&(o=!1,v(S,L,F,O),z!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function l(){return s.createVertexArray()}function c(S){return s.bindVertexArray(S)}function h(S){return s.deleteVertexArray(S)}function u(S,L,F){const O=F.wireframe===!0;let z=n[S.id];z===void 0&&(z={},n[S.id]=z);let W=z[L.id];W===void 0&&(W={},z[L.id]=W);let H=W[O];return H===void 0&&(H=d(l()),W[O]=H),H}function d(S){const L=[],F=[],O=[];for(let z=0;z<e;z++)L[z]=0,F[z]=0,O[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:F,attributeDivisors:O,object:S,attributes:{},index:null}}function f(S,L,F,O){const z=r.attributes,W=L.attributes;let H=0;const Y=F.getAttributes();for(const G in Y)if(Y[G].location>=0){const pt=z[G];let Mt=W[G];if(Mt===void 0&&(G==="instanceMatrix"&&S.instanceMatrix&&(Mt=S.instanceMatrix),G==="instanceColor"&&S.instanceColor&&(Mt=S.instanceColor)),pt===void 0||pt.attribute!==Mt||Mt&&pt.data!==Mt.data)return!0;H++}return r.attributesNum!==H||r.index!==O}function g(S,L,F,O){const z={},W=L.attributes;let H=0;const Y=F.getAttributes();for(const G in Y)if(Y[G].location>=0){let pt=W[G];pt===void 0&&(G==="instanceMatrix"&&S.instanceMatrix&&(pt=S.instanceMatrix),G==="instanceColor"&&S.instanceColor&&(pt=S.instanceColor));const Mt={};Mt.attribute=pt,pt&&pt.data&&(Mt.data=pt.data),z[G]=Mt,H++}r.attributes=z,r.attributesNum=H,r.index=O}function _(){const S=r.newAttributes;for(let L=0,F=S.length;L<F;L++)S[L]=0}function p(S){m(S,0)}function m(S,L){const F=r.newAttributes,O=r.enabledAttributes,z=r.attributeDivisors;F[S]=1,O[S]===0&&(s.enableVertexAttribArray(S),O[S]=1),z[S]!==L&&(s.vertexAttribDivisor(S,L),z[S]=L)}function y(){const S=r.newAttributes,L=r.enabledAttributes;for(let F=0,O=L.length;F<O;F++)L[F]!==S[F]&&(s.disableVertexAttribArray(F),L[F]=0)}function x(S,L,F,O,z,W,H){H===!0?s.vertexAttribIPointer(S,L,F,z,W):s.vertexAttribPointer(S,L,F,O,z,W)}function v(S,L,F,O){_();const z=O.attributes,W=F.getAttributes(),H=L.defaultAttributeValues;for(const Y in W){const G=W[Y];if(G.location>=0){let ht=z[Y];if(ht===void 0&&(Y==="instanceMatrix"&&S.instanceMatrix&&(ht=S.instanceMatrix),Y==="instanceColor"&&S.instanceColor&&(ht=S.instanceColor)),ht!==void 0){const pt=ht.normalized,Mt=ht.itemSize,Ot=t.get(ht);if(Ot===void 0)continue;const Qt=Ot.buffer,$=Ot.type,lt=Ot.bytesPerElement,Rt=$===s.INT||$===s.UNSIGNED_INT||ht.gpuType===Jc;if(ht.isInterleavedBufferAttribute){const ft=ht.data,It=ft.stride,te=ht.offset;if(ft.isInstancedInterleavedBuffer){for(let Dt=0;Dt<G.locationSize;Dt++)m(G.location+Dt,ft.meshPerAttribute);S.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ft.meshPerAttribute*ft.count)}else for(let Dt=0;Dt<G.locationSize;Dt++)p(G.location+Dt);s.bindBuffer(s.ARRAY_BUFFER,Qt);for(let Dt=0;Dt<G.locationSize;Dt++)x(G.location+Dt,Mt/G.locationSize,$,pt,It*lt,(te+Mt/G.locationSize*Dt)*lt,Rt)}else{if(ht.isInstancedBufferAttribute){for(let ft=0;ft<G.locationSize;ft++)m(G.location+ft,ht.meshPerAttribute);S.isInstancedMesh!==!0&&O._maxInstanceCount===void 0&&(O._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let ft=0;ft<G.locationSize;ft++)p(G.location+ft);s.bindBuffer(s.ARRAY_BUFFER,Qt);for(let ft=0;ft<G.locationSize;ft++)x(G.location+ft,Mt/G.locationSize,$,pt,Mt*lt,Mt/G.locationSize*ft*lt,Rt)}}else if(H!==void 0){const pt=H[Y];if(pt!==void 0)switch(pt.length){case 2:s.vertexAttrib2fv(G.location,pt);break;case 3:s.vertexAttrib3fv(G.location,pt);break;case 4:s.vertexAttrib4fv(G.location,pt);break;default:s.vertexAttrib1fv(G.location,pt)}}}}y()}function E(){C();for(const S in n){const L=n[S];for(const F in L){const O=L[F];for(const z in O)h(O[z].object),delete O[z];delete L[F]}delete n[S]}}function R(S){if(n[S.id]===void 0)return;const L=n[S.id];for(const F in L){const O=L[F];for(const z in O)h(O[z].object),delete O[z];delete L[F]}delete n[S.id]}function T(S){for(const L in n){const F=n[L];if(F[S.id]===void 0)continue;const O=F[S.id];for(const z in O)h(O[z].object),delete O[z];delete F[S.id]}}function C(){M(),o=!0,r!==i&&(r=i,c(r.object))}function M(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:C,resetDefaultState:M,dispose:E,releaseStatesOfGeometry:R,releaseStatesOfProgram:T,initAttributes:_,enableAttribute:p,disableUnusedAttributes:y}}function fx(s,t,e){let n;function i(c){n=c}function r(c,h){s.drawArrays(n,c,h),e.update(h,n,1)}function o(c,h,u){u!==0&&(s.drawArraysInstanced(n,c,h,u),e.update(h,n,u))}function a(c,h,u){if(u===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];e.update(f,n,1)}function l(c,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,c,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_]*d[_];e.update(g,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function dx(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const T=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(T.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(T){return!(T!==Fn&&n.convert(T)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(T){const C=T===lo&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(T!==pi&&n.convert(T)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&T!==ci&&!C)}function l(T){if(T==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";T="mediump"}return T==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const u=e.logarithmicDepthBuffer===!0,d=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control"),f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_TEXTURE_SIZE),p=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),y=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),x=s.getParameter(s.MAX_VARYING_VECTORS),v=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),E=g>0,R=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:p,maxAttributes:m,maxVertexUniforms:y,maxVaryings:x,maxFragmentUniforms:v,vertexTextures:E,maxSamples:R}}function px(s){const t=this;let e=null,n=0,i=!1,r=!1;const o=new oi,a=new Wt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,p=u.clipShadows,m=s.get(u);if(!i||g===null||g.length===0||r&&!p)r?h(null):c();else{const y=r?0:n,x=y*4;let v=m.clippingState||null;l.value=v,v=h(g,d,x,f);for(let E=0;E!==x;++E)v[E]=e[E];m.clippingState=v,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,g){const _=u!==null?u.length:0;let p=null;if(_!==0){if(p=l.value,g!==!0||p===null){const m=f+_*4,y=d.matrixWorldInverse;a.getNormalMatrix(y),(p===null||p.length<m)&&(p=new Float32Array(m));for(let x=0,v=f;x!==_;++x,v+=4)o.copy(u[x]).applyMatrix4(y,a),o.normal.toArray(p,v),p[v+3]=o.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}function mx(s){let t=new WeakMap;function e(o,a){return a===jl?o.mapping=tr:a===Kl&&(o.mapping=er),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===jl||a===Kl)if(t.has(o)){const l=t.get(o).texture;return e(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new Lm(l.height);return c.fromEquirectangularTexture(s,o),t.set(o,c),o.addEventListener("dispose",i),e(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}const Xs=4,zu=[.125,.215,.35,.446,.526,.582],ts=20,vl=new Ud,Bu=new Vt;let xl=null,yl=0,Ml=0,Sl=!1;const ji=(1+Math.sqrt(5))/2,Fs=1/ji,Hu=[new A(-ji,Fs,0),new A(ji,Fs,0),new A(-Fs,0,ji),new A(Fs,0,ji),new A(0,ji,-Fs),new A(0,ji,Fs),new A(-1,1,-1),new A(1,1,-1),new A(-1,1,1),new A(1,1,1)],gx=new A;class Vu{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100,r={}){const{size:o=256,position:a=gx}=r;xl=this._renderer.getRenderTarget(),yl=this._renderer.getActiveCubeFace(),Ml=this._renderer.getActiveMipmapLevel(),Sl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(t,n,i,l,a),e>0&&this._blur(l,0,0,e),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Xu(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wu(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(xl,yl,Ml),this._renderer.xr.enabled=Sl,t.scissorTest=!1,Wo(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===tr||t.mapping===er?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),xl=this._renderer.getRenderTarget(),yl=this._renderer.getActiveCubeFace(),Ml=this._renderer.getActiveMipmapLevel(),Sl=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:On,minFilter:On,generateMipmaps:!1,type:lo,format:Fn,colorSpace:rr,depthBuffer:!1},i=Gu(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Gu(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=_x(r)),this._blurMaterial=vx(r,t,e)}return i}_compileMaterial(t){const e=new Zt(this._lodPlanes[0],t);this._renderer.compile(e,vl)}_sceneToCubeUV(t,e,n,i,r){const l=new pn(90,1,e,n),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Bu),u.toneMapping=Li,u.autoClear=!1;const g=new or({name:"PMREM.Background",side:Ye,depthWrite:!1,depthTest:!1}),_=new Zt(new gs,g);let p=!1;const m=t.background;m?m.isColor&&(g.color.copy(m),t.background=null,p=!0):(g.color.copy(Bu),p=!0);for(let y=0;y<6;y++){const x=y%3;x===0?(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+h[y],r.y,r.z)):x===1?(l.up.set(0,0,c[y]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+h[y],r.z)):(l.up.set(0,c[y],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+h[y]));const v=this._cubeSize;Wo(i,x*v,y>2?v:0,v,v),u.setRenderTarget(i),p&&u.render(_,l),u.render(t,l)}_.geometry.dispose(),_.material.dispose(),u.toneMapping=f,u.autoClear=d,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===tr||t.mapping===er;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Xu()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wu());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new Zt(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const l=this._cubeSize;Wo(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(o,vl)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Hu[(i-r-1)%Hu.length];this._blur(t,r-1,r,o,a)}e.autoClear=n}_blur(t,e,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",r),this._halfBlur(o,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new Zt(this._lodPlanes[i],c),d=c.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*ts-1),_=r/g,p=isFinite(r)?1+Math.floor(h*_):ts;p>ts&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${ts}`);const m=[];let y=0;for(let T=0;T<ts;++T){const C=T/_,M=Math.exp(-C*C/2);m.push(M),T===0?y+=M:T<p&&(y+=2*M)}for(let T=0;T<m.length;T++)m[T]=m[T]/y;d.envMap.value=t.texture,d.samples.value=p,d.weights.value=m,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:x}=this;d.dTheta.value=g,d.mipInt.value=x-n;const v=this._sizeLods[i],E=3*v*(i>x-Xs?i-x+Xs:0),R=4*(this._cubeSize-v);Wo(e,E,R,3*v,2*v),l.setRenderTarget(e),l.render(u,vl)}}function _x(s){const t=[],e=[],n=[];let i=s;const r=s-Xs+1+zu.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);e.push(a);let l=1/a;o>s-Xs?l=zu[o-s+Xs-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,p=2,m=1,y=new Float32Array(_*g*f),x=new Float32Array(p*g*f),v=new Float32Array(m*g*f);for(let R=0;R<f;R++){const T=R%3*2/3-1,C=R>2?0:-1,M=[T,C,0,T+2/3,C,0,T+2/3,C+1,0,T,C,0,T+2/3,C+1,0,T,C+1,0];y.set(M,_*g*R),x.set(d,p*g*R);const S=[R,R,R,R,R,R];v.set(S,m*g*R)}const E=new De;E.setAttribute("position",new He(y,_)),E.setAttribute("uv",new He(x,p)),E.setAttribute("faceIndex",new He(v,m)),t.push(E),i>Xs&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Gu(s,t,e){const n=new fs(s,t,e);return n.texture.mapping=Aa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Wo(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function vx(s,t,e){const n=new Float32Array(ts),i=new A(0,1,0);return new $n({name:"SphericalGaussianBlur",defines:{n:ts,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:yh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Di,depthTest:!1,depthWrite:!1})}function Wu(){return new $n({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:yh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Di,depthTest:!1,depthWrite:!1})}function Xu(){return new $n({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:yh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Di,depthTest:!1,depthWrite:!1})}function yh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function xx(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===jl||l===Kl,h=l===tr||l===er;if(c||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new Vu(s)),u=c?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return c&&f&&f.height>0||h&&f&&i(f)?(e===null&&(e=new Vu(s)),u=c?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",r),u.texture):null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function yx(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&Ji("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Mx(s,t,e,n){const i={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete i[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,e.memory.geometries++),d}function l(u){const d=u.attributes;for(const f in d)t.update(d[f],s.ARRAY_BUFFER)}function c(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const y=f.array;_=f.version;for(let x=0,v=y.length;x<v;x+=3){const E=y[x+0],R=y[x+1],T=y[x+2];d.push(E,R,R,T,T,E)}}else if(g!==void 0){const y=g.array;_=g.version;for(let x=0,v=y.length/3-1;x<v;x+=3){const E=x+0,R=x+1,T=x+2;d.push(E,R,R,T,T,E)}}else return;const p=new(md(d)?xd:vd)(d,1);p.version=_;const m=r.get(u);m&&t.remove(m),r.set(u,p)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return r.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function Sx(s,t,e){let n;function i(d){n=d}let r,o;function a(d){r=d.type,o=d.bytesPerElement}function l(d,f){s.drawElements(n,f,r,d*o),e.update(f,n,1)}function c(d,f,g){g!==0&&(s.drawElementsInstanced(n,f,r,d*o,g),e.update(f,n,g))}function h(d,f,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let p=0;for(let m=0;m<g;m++)p+=f[m];e.update(p,n,1)}function u(d,f,g,_){if(g===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let m=0;m<d.length;m++)c(d[m]/o,f[m],_[m]);else{p.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,g);let m=0;for(let y=0;y<g;y++)m+=f[y]*_[y];e.update(m,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function bx(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function wx(s,t,e){const n=new WeakMap,i=new fe;function r(o,a,l){const c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let S=function(){C.dispose(),n.delete(a),a.removeEventListener("dispose",S)};var f=S;d!==void 0&&d.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,p=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],y=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let v=0;g===!0&&(v=1),_===!0&&(v=2),p===!0&&(v=3);let E=a.attributes.position.count*v,R=1;E>t.maxTextureSize&&(R=Math.ceil(E/t.maxTextureSize),E=t.maxTextureSize);const T=new Float32Array(E*R*4*u),C=new gd(T,E,R,u);C.type=ci,C.needsUpdate=!0;const M=v*4;for(let L=0;L<u;L++){const F=m[L],O=y[L],z=x[L],W=E*R*4*L;for(let H=0;H<F.count;H++){const Y=H*M;g===!0&&(i.fromBufferAttribute(F,H),T[W+Y+0]=i.x,T[W+Y+1]=i.y,T[W+Y+2]=i.z,T[W+Y+3]=0),_===!0&&(i.fromBufferAttribute(O,H),T[W+Y+4]=i.x,T[W+Y+5]=i.y,T[W+Y+6]=i.z,T[W+Y+7]=0),p===!0&&(i.fromBufferAttribute(z,H),T[W+Y+8]=i.x,T[W+Y+9]=i.y,T[W+Y+10]=i.z,T[W+Y+11]=z.itemSize===4?i.w:1)}}d={count:u,texture:C,size:new st(E,R)},n.set(a,d),a.addEventListener("dispose",S)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,e);else{let g=0;for(let p=0;p<c.length;p++)g+=c[p];const _=a.morphTargetsRelative?1:1-g;l.getUniforms().setValue(s,"morphTargetBaseInfluence",_),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",d.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:r}}function Tx(s,t,e,n){let i=new WeakMap;function r(l){const c=n.render.frame,h=l.geometry,u=t.get(l,h);if(i.get(u)!==c&&(t.update(u),i.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const d=l.skeleton;i.get(d)!==c&&(d.update(),i.set(d,c))}return u}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:r,dispose:o}}const Fd=new $e,qu=new Td(1,1),kd=new gd,zd=new mm,Bd=new Sd,Yu=[],$u=[],Zu=new Float32Array(16),Ju=new Float32Array(9),ju=new Float32Array(4);function pr(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=Yu[i];if(r===void 0&&(r=new Float32Array(i),Yu[i]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function Ne(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Oe(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function Ia(s,t){let e=$u[t];e===void 0&&(e=new Int32Array(t),$u[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function Ex(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Ax(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ne(e,t))return;s.uniform2fv(this.addr,t),Oe(e,t)}}function Rx(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ne(e,t))return;s.uniform3fv(this.addr,t),Oe(e,t)}}function Cx(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ne(e,t))return;s.uniform4fv(this.addr,t),Oe(e,t)}}function Px(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ne(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Oe(e,t)}else{if(Ne(e,n))return;ju.set(n),s.uniformMatrix2fv(this.addr,!1,ju),Oe(e,n)}}function Dx(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ne(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Oe(e,t)}else{if(Ne(e,n))return;Ju.set(n),s.uniformMatrix3fv(this.addr,!1,Ju),Oe(e,n)}}function Lx(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ne(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Oe(e,t)}else{if(Ne(e,n))return;Zu.set(n),s.uniformMatrix4fv(this.addr,!1,Zu),Oe(e,n)}}function Ix(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function Ux(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ne(e,t))return;s.uniform2iv(this.addr,t),Oe(e,t)}}function Nx(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ne(e,t))return;s.uniform3iv(this.addr,t),Oe(e,t)}}function Ox(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ne(e,t))return;s.uniform4iv(this.addr,t),Oe(e,t)}}function Fx(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function kx(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ne(e,t))return;s.uniform2uiv(this.addr,t),Oe(e,t)}}function zx(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ne(e,t))return;s.uniform3uiv(this.addr,t),Oe(e,t)}}function Bx(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ne(e,t))return;s.uniform4uiv(this.addr,t),Oe(e,t)}}function Hx(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(qu.compareFunction=pd,r=qu):r=Fd,e.setTexture2D(t||r,i)}function Vx(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||zd,i)}function Gx(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Bd,i)}function Wx(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||kd,i)}function Xx(s){switch(s){case 5126:return Ex;case 35664:return Ax;case 35665:return Rx;case 35666:return Cx;case 35674:return Px;case 35675:return Dx;case 35676:return Lx;case 5124:case 35670:return Ix;case 35667:case 35671:return Ux;case 35668:case 35672:return Nx;case 35669:case 35673:return Ox;case 5125:return Fx;case 36294:return kx;case 36295:return zx;case 36296:return Bx;case 35678:case 36198:case 36298:case 36306:case 35682:return Hx;case 35679:case 36299:case 36307:return Vx;case 35680:case 36300:case 36308:case 36293:return Gx;case 36289:case 36303:case 36311:case 36292:return Wx}}function qx(s,t){s.uniform1fv(this.addr,t)}function Yx(s,t){const e=pr(t,this.size,2);s.uniform2fv(this.addr,e)}function $x(s,t){const e=pr(t,this.size,3);s.uniform3fv(this.addr,e)}function Zx(s,t){const e=pr(t,this.size,4);s.uniform4fv(this.addr,e)}function Jx(s,t){const e=pr(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function jx(s,t){const e=pr(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function Kx(s,t){const e=pr(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function Qx(s,t){s.uniform1iv(this.addr,t)}function ty(s,t){s.uniform2iv(this.addr,t)}function ey(s,t){s.uniform3iv(this.addr,t)}function ny(s,t){s.uniform4iv(this.addr,t)}function iy(s,t){s.uniform1uiv(this.addr,t)}function sy(s,t){s.uniform2uiv(this.addr,t)}function ry(s,t){s.uniform3uiv(this.addr,t)}function oy(s,t){s.uniform4uiv(this.addr,t)}function ay(s,t,e){const n=this.cache,i=t.length,r=Ia(e,i);Ne(n,r)||(s.uniform1iv(this.addr,r),Oe(n,r));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||Fd,r[o])}function ly(s,t,e){const n=this.cache,i=t.length,r=Ia(e,i);Ne(n,r)||(s.uniform1iv(this.addr,r),Oe(n,r));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||zd,r[o])}function cy(s,t,e){const n=this.cache,i=t.length,r=Ia(e,i);Ne(n,r)||(s.uniform1iv(this.addr,r),Oe(n,r));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||Bd,r[o])}function hy(s,t,e){const n=this.cache,i=t.length,r=Ia(e,i);Ne(n,r)||(s.uniform1iv(this.addr,r),Oe(n,r));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||kd,r[o])}function uy(s){switch(s){case 5126:return qx;case 35664:return Yx;case 35665:return $x;case 35666:return Zx;case 35674:return Jx;case 35675:return jx;case 35676:return Kx;case 5124:case 35670:return Qx;case 35667:case 35671:return ty;case 35668:case 35672:return ey;case 35669:case 35673:return ny;case 5125:return iy;case 36294:return sy;case 36295:return ry;case 36296:return oy;case 35678:case 36198:case 36298:case 36306:case 35682:return ay;case 35679:case 36299:case 36307:return ly;case 35680:case 36300:case 36308:case 36293:return cy;case 36289:case 36303:case 36311:case 36292:return hy}}class fy{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Xx(e.type)}}class dy{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=uy(e.type)}}class py{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(t,e[a.id],n)}}}const bl=/(\w+)(\])?(\[|\.)?/g;function Ku(s,t){s.seq.push(t),s.map[t.id]=t}function my(s,t,e){const n=s.name,i=n.length;for(bl.lastIndex=0;;){const r=bl.exec(n),o=bl.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Ku(e,c===void 0?new fy(a,s,t):new dy(a,s,t));break}else{let u=e.map[a];u===void 0&&(u=new py(a),Ku(e,u)),e=u}}}class sa{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),o=t.getUniformLocation(e,r.name);my(r,o,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,o=e.length;r!==o;++r){const a=e[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function Qu(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const gy=37297;let _y=0;function vy(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}const tf=new Wt;function xy(s){se._getMatrix(tf,se.workingColorSpace,s);const t=`mat3( ${tf.elements.map(e=>e.toFixed(4))} )`;switch(se.getTransfer(s)){case fa:return[t,"LinearTransferOETF"];case ue:return[t,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function ef(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+vy(s.getShaderSource(t),o)}else return i}function yy(s,t){const e=xy(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( value.rgb * ${e[0]}, value.a ) );`,"}"].join(`
`)}function My(s,t){let e;switch(t){case E0:e="Linear";break;case A0:e="Reinhard";break;case R0:e="Cineon";break;case C0:e="ACESFilmic";break;case D0:e="AgX";break;case ed:e="Neutral";break;case P0:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Xo=new A;function Sy(){se.getLuminanceCoefficients(Xo);const s=Xo.x.toFixed(4),t=Xo.y.toFixed(4),e=Xo.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function by(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Lr).join(`
`)}function wy(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Ty(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function Lr(s){return s!==""}function nf(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function sf(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Ey=/^[ \t]*#include +<([\w\d./]+)>/gm;function Lc(s){return s.replace(Ey,Ry)}const Ay=new Map;function Ry(s,t){let e=qt[t];if(e===void 0){const n=Ay.get(t);if(n!==void 0)e=qt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Lc(e)}const Cy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function rf(s){return s.replace(Cy,Py)}function Py(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function of(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Dy(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Kf?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===Qf?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===ii&&(t="SHADOWMAP_TYPE_VSM"),t}function Ly(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case tr:case er:t="ENVMAP_TYPE_CUBE";break;case Aa:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Iy(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case er:t="ENVMAP_MODE_REFRACTION";break}return t}function Uy(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case td:t="ENVMAP_BLENDING_MULTIPLY";break;case w0:t="ENVMAP_BLENDING_MIX";break;case T0:t="ENVMAP_BLENDING_ADD";break}return t}function Ny(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),112)),texelHeight:n,maxMip:e}}function Oy(s,t,e,n){const i=s.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const l=Dy(e),c=Ly(e),h=Iy(e),u=Uy(e),d=Ny(e),f=by(e),g=wy(r),_=i.createProgram();let p,m,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Lr).join(`
`),p.length>0&&(p+=`
`),m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(Lr).join(`
`),m.length>0&&(m+=`
`)):(p=[of(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Lr).join(`
`),m=[of(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Li?"#define TONE_MAPPING":"",e.toneMapping!==Li?qt.tonemapping_pars_fragment:"",e.toneMapping!==Li?My("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",qt.colorspace_pars_fragment,yy("linearToOutputTexel",e.outputColorSpace),Sy(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Lr).join(`
`)),o=Lc(o),o=nf(o,e),o=sf(o,e),a=Lc(a),a=nf(a,e),a=sf(a,e),o=rf(o),a=rf(a),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,m=["#define varying in",e.glslVersion===su?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===su?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const x=y+p+o,v=y+m+a,E=Qu(i,i.VERTEX_SHADER,x),R=Qu(i,i.FRAGMENT_SHADER,v);i.attachShader(_,E),i.attachShader(_,R),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function T(L){if(s.debug.checkShaderErrors){const F=i.getProgramInfoLog(_).trim(),O=i.getShaderInfoLog(E).trim(),z=i.getShaderInfoLog(R).trim();let W=!0,H=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(W=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,E,R);else{const Y=ef(i,E,"vertex"),G=ef(i,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+L.name+`
Material Type: `+L.type+`

Program Info Log: `+F+`
`+Y+`
`+G)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(O===""||z==="")&&(H=!1);H&&(L.diagnostics={runnable:W,programLog:F,vertexShader:{log:O,prefix:p},fragmentShader:{log:z,prefix:m}})}i.deleteShader(E),i.deleteShader(R),C=new sa(i,_),M=Ty(i,_)}let C;this.getUniforms=function(){return C===void 0&&T(this),C};let M;this.getAttributes=function(){return M===void 0&&T(this),M};let S=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=i.getProgramParameter(_,gy)),S},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=_y++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=E,this.fragmentShader=R,this}let Fy=0;class ky{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new zy(t),e.set(t,n)),n}}class zy{constructor(t){this.id=Fy++,this.code=t,this.usedTimes=0}}function By(s,t,e,n,i,r,o){const a=new rh,l=new ky,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(M){return c.add(M),M===0?"uv":`uv${M}`}function p(M,S,L,F,O){const z=F.fog,W=O.geometry,H=M.isMeshStandardMaterial?F.environment:null,Y=(M.isMeshStandardMaterial?e:t).get(M.envMap||H),G=Y&&Y.mapping===Aa?Y.image.height:null,ht=g[M.type];M.precision!==null&&(f=i.getMaxPrecision(M.precision),f!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",f,"instead."));const pt=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,Mt=pt!==void 0?pt.length:0;let Ot=0;W.morphAttributes.position!==void 0&&(Ot=1),W.morphAttributes.normal!==void 0&&(Ot=2),W.morphAttributes.color!==void 0&&(Ot=3);let Qt,$,lt,Rt;if(ht){const le=Vn[ht];Qt=le.vertexShader,$=le.fragmentShader}else Qt=M.vertexShader,$=M.fragmentShader,l.update(M),lt=l.getVertexShaderID(M),Rt=l.getFragmentShaderID(M);const ft=s.getRenderTarget(),It=s.state.buffers.depth.getReversed(),te=O.isInstancedMesh===!0,Dt=O.isBatchedMesh===!0,re=!!M.map,rt=!!M.matcap,et=!!Y,D=!!M.aoMap,Pt=!!M.lightMap,ot=!!M.bumpMap,bt=!!M.normalMap,ut=!!M.displacementMap,Ft=!!M.emissiveMap,vt=!!M.metalnessMap,P=!!M.roughnessMap,b=M.anisotropy>0,k=M.clearcoat>0,Z=M.dispersion>0,tt=M.iridescence>0,J=M.sheen>0,Ct=M.transmission>0,mt=b&&!!M.anisotropyMap,St=k&&!!M.clearcoatMap,Jt=k&&!!M.clearcoatNormalMap,ct=k&&!!M.clearcoatRoughnessMap,Tt=tt&&!!M.iridescenceMap,kt=tt&&!!M.iridescenceThicknessMap,zt=J&&!!M.sheenColorMap,Et=J&&!!M.sheenRoughnessMap,Kt=!!M.specularMap,Xt=!!M.specularColorMap,ge=!!M.specularIntensityMap,I=Ct&&!!M.transmissionMap,gt=Ct&&!!M.thicknessMap,q=!!M.gradientMap,K=!!M.alphaMap,yt=M.alphaTest>0,xt=!!M.alphaHash,Gt=!!M.extensions;let Te=Li;M.toneMapped&&(ft===null||ft.isXRRenderTarget===!0)&&(Te=s.toneMapping);const Ge={shaderID:ht,shaderType:M.type,shaderName:M.name,vertexShader:Qt,fragmentShader:$,defines:M.defines,customVertexShaderID:lt,customFragmentShaderID:Rt,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:f,batching:Dt,batchingColor:Dt&&O._colorsTexture!==null,instancing:te,instancingColor:te&&O.instanceColor!==null,instancingMorph:te&&O.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ft===null?s.outputColorSpace:ft.isXRRenderTarget===!0?ft.texture.colorSpace:rr,alphaToCoverage:!!M.alphaToCoverage,map:re,matcap:rt,envMap:et,envMapMode:et&&Y.mapping,envMapCubeUVHeight:G,aoMap:D,lightMap:Pt,bumpMap:ot,normalMap:bt,displacementMap:d&&ut,emissiveMap:Ft,normalMapObjectSpace:bt&&M.normalMapType===N0,normalMapTangentSpace:bt&&M.normalMapType===dd,metalnessMap:vt,roughnessMap:P,anisotropy:b,anisotropyMap:mt,clearcoat:k,clearcoatMap:St,clearcoatNormalMap:Jt,clearcoatRoughnessMap:ct,dispersion:Z,iridescence:tt,iridescenceMap:Tt,iridescenceThicknessMap:kt,sheen:J,sheenColorMap:zt,sheenRoughnessMap:Et,specularMap:Kt,specularColorMap:Xt,specularIntensityMap:ge,transmission:Ct,transmissionMap:I,thicknessMap:gt,gradientMap:q,opaque:M.transparent===!1&&M.blending===rs&&M.alphaToCoverage===!1,alphaMap:K,alphaTest:yt,alphaHash:xt,combine:M.combine,mapUv:re&&_(M.map.channel),aoMapUv:D&&_(M.aoMap.channel),lightMapUv:Pt&&_(M.lightMap.channel),bumpMapUv:ot&&_(M.bumpMap.channel),normalMapUv:bt&&_(M.normalMap.channel),displacementMapUv:ut&&_(M.displacementMap.channel),emissiveMapUv:Ft&&_(M.emissiveMap.channel),metalnessMapUv:vt&&_(M.metalnessMap.channel),roughnessMapUv:P&&_(M.roughnessMap.channel),anisotropyMapUv:mt&&_(M.anisotropyMap.channel),clearcoatMapUv:St&&_(M.clearcoatMap.channel),clearcoatNormalMapUv:Jt&&_(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ct&&_(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Tt&&_(M.iridescenceMap.channel),iridescenceThicknessMapUv:kt&&_(M.iridescenceThicknessMap.channel),sheenColorMapUv:zt&&_(M.sheenColorMap.channel),sheenRoughnessMapUv:Et&&_(M.sheenRoughnessMap.channel),specularMapUv:Kt&&_(M.specularMap.channel),specularColorMapUv:Xt&&_(M.specularColorMap.channel),specularIntensityMapUv:ge&&_(M.specularIntensityMap.channel),transmissionMapUv:I&&_(M.transmissionMap.channel),thicknessMapUv:gt&&_(M.thicknessMap.channel),alphaMapUv:K&&_(M.alphaMap.channel),vertexTangents:!!W.attributes.tangent&&(bt||b),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!W.attributes.uv&&(re||K),fog:!!z,useFog:M.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:M.flatShading===!0,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:It,skinning:O.isSkinnedMesh===!0,morphTargets:W.morphAttributes.position!==void 0,morphNormals:W.morphAttributes.normal!==void 0,morphColors:W.morphAttributes.color!==void 0,morphTargetsCount:Mt,morphTextureStride:Ot,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:s.shadowMap.enabled&&L.length>0,shadowMapType:s.shadowMap.type,toneMapping:Te,decodeVideoTexture:re&&M.map.isVideoTexture===!0&&se.getTransfer(M.map.colorSpace)===ue,decodeVideoTextureEmissive:Ft&&M.emissiveMap.isVideoTexture===!0&&se.getTransfer(M.emissiveMap.colorSpace)===ue,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===Un,flipSided:M.side===Ye,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Gt&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Gt&&M.extensions.multiDraw===!0||Dt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return Ge.vertexUv1s=c.has(1),Ge.vertexUv2s=c.has(2),Ge.vertexUv3s=c.has(3),c.clear(),Ge}function m(M){const S=[];if(M.shaderID?S.push(M.shaderID):(S.push(M.customVertexShaderID),S.push(M.customFragmentShaderID)),M.defines!==void 0)for(const L in M.defines)S.push(L),S.push(M.defines[L]);return M.isRawShaderMaterial===!1&&(y(S,M),x(S,M),S.push(s.outputColorSpace)),S.push(M.customProgramCacheKey),S.join()}function y(M,S){M.push(S.precision),M.push(S.outputColorSpace),M.push(S.envMapMode),M.push(S.envMapCubeUVHeight),M.push(S.mapUv),M.push(S.alphaMapUv),M.push(S.lightMapUv),M.push(S.aoMapUv),M.push(S.bumpMapUv),M.push(S.normalMapUv),M.push(S.displacementMapUv),M.push(S.emissiveMapUv),M.push(S.metalnessMapUv),M.push(S.roughnessMapUv),M.push(S.anisotropyMapUv),M.push(S.clearcoatMapUv),M.push(S.clearcoatNormalMapUv),M.push(S.clearcoatRoughnessMapUv),M.push(S.iridescenceMapUv),M.push(S.iridescenceThicknessMapUv),M.push(S.sheenColorMapUv),M.push(S.sheenRoughnessMapUv),M.push(S.specularMapUv),M.push(S.specularColorMapUv),M.push(S.specularIntensityMapUv),M.push(S.transmissionMapUv),M.push(S.thicknessMapUv),M.push(S.combine),M.push(S.fogExp2),M.push(S.sizeAttenuation),M.push(S.morphTargetsCount),M.push(S.morphAttributeCount),M.push(S.numDirLights),M.push(S.numPointLights),M.push(S.numSpotLights),M.push(S.numSpotLightMaps),M.push(S.numHemiLights),M.push(S.numRectAreaLights),M.push(S.numDirLightShadows),M.push(S.numPointLightShadows),M.push(S.numSpotLightShadows),M.push(S.numSpotLightShadowsWithMaps),M.push(S.numLightProbes),M.push(S.shadowMapType),M.push(S.toneMapping),M.push(S.numClippingPlanes),M.push(S.numClipIntersection),M.push(S.depthPacking)}function x(M,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),M.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reverseDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),M.push(a.mask)}function v(M){const S=g[M.type];let L;if(S){const F=Vn[S];L=Rm.clone(F.uniforms)}else L=M.uniforms;return L}function E(M,S){let L;for(let F=0,O=h.length;F<O;F++){const z=h[F];if(z.cacheKey===S){L=z,++L.usedTimes;break}}return L===void 0&&(L=new Oy(s,S,M,r),h.push(L)),L}function R(M){if(--M.usedTimes===0){const S=h.indexOf(M);h[S]=h[h.length-1],h.pop(),M.destroy()}}function T(M){l.remove(M)}function C(){l.dispose()}return{getParameters:p,getProgramCacheKey:m,getUniforms:v,acquireProgram:E,releaseProgram:R,releaseShaderCache:T,programs:h,dispose:C}}function Hy(){let s=new WeakMap;function t(o){return s.has(o)}function e(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function Vy(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function af(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function lf(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function o(u,d,f,g,_,p){let m=s[t];return m===void 0?(m={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:p},s[t]=m):(m.id=u.id,m.object=u,m.geometry=d,m.material=f,m.groupOrder=g,m.renderOrder=u.renderOrder,m.z=_,m.group=p),t++,m}function a(u,d,f,g,_,p){const m=o(u,d,f,g,_,p);f.transmission>0?n.push(m):f.transparent===!0?i.push(m):e.push(m)}function l(u,d,f,g,_,p){const m=o(u,d,f,g,_,p);f.transmission>0?n.unshift(m):f.transparent===!0?i.unshift(m):e.unshift(m)}function c(u,d){e.length>1&&e.sort(u||Vy),n.length>1&&n.sort(d||af),i.length>1&&i.sort(d||af)}function h(){for(let u=t,d=s.length;u<d;u++){const f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:h,sort:c}}function Gy(){let s=new WeakMap;function t(n,i){const r=s.get(n);let o;return r===void 0?(o=new lf,s.set(n,[o])):i>=r.length?(o=new lf,r.push(o)):o=r[i],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function Wy(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new A,color:new Vt};break;case"SpotLight":e={position:new A,direction:new A,color:new Vt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new A,color:new Vt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new A,skyColor:new Vt,groundColor:new Vt};break;case"RectAreaLight":e={color:new Vt,position:new A,halfWidth:new A,halfHeight:new A};break}return s[t.id]=e,e}}}function Xy(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new st,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let qy=0;function Yy(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function $y(s){const t=new Wy,e=Xy(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new A);const i=new A,r=new me,o=new me;function a(c){let h=0,u=0,d=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let f=0,g=0,_=0,p=0,m=0,y=0,x=0,v=0,E=0,R=0,T=0;c.sort(Yy);for(let M=0,S=c.length;M<S;M++){const L=c[M],F=L.color,O=L.intensity,z=L.distance,W=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)h+=F.r*O,u+=F.g*O,d+=F.b*O;else if(L.isLightProbe){for(let H=0;H<9;H++)n.probe[H].addScaledVector(L.sh.coefficients[H],O);T++}else if(L.isDirectionalLight){const H=t.get(L);if(H.color.copy(L.color).multiplyScalar(L.intensity),L.castShadow){const Y=L.shadow,G=e.get(L);G.shadowIntensity=Y.intensity,G.shadowBias=Y.bias,G.shadowNormalBias=Y.normalBias,G.shadowRadius=Y.radius,G.shadowMapSize=Y.mapSize,n.directionalShadow[f]=G,n.directionalShadowMap[f]=W,n.directionalShadowMatrix[f]=L.shadow.matrix,y++}n.directional[f]=H,f++}else if(L.isSpotLight){const H=t.get(L);H.position.setFromMatrixPosition(L.matrixWorld),H.color.copy(F).multiplyScalar(O),H.distance=z,H.coneCos=Math.cos(L.angle),H.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),H.decay=L.decay,n.spot[_]=H;const Y=L.shadow;if(L.map&&(n.spotLightMap[E]=L.map,E++,Y.updateMatrices(L),L.castShadow&&R++),n.spotLightMatrix[_]=Y.matrix,L.castShadow){const G=e.get(L);G.shadowIntensity=Y.intensity,G.shadowBias=Y.bias,G.shadowNormalBias=Y.normalBias,G.shadowRadius=Y.radius,G.shadowMapSize=Y.mapSize,n.spotShadow[_]=G,n.spotShadowMap[_]=W,v++}_++}else if(L.isRectAreaLight){const H=t.get(L);H.color.copy(F).multiplyScalar(O),H.halfWidth.set(L.width*.5,0,0),H.halfHeight.set(0,L.height*.5,0),n.rectArea[p]=H,p++}else if(L.isPointLight){const H=t.get(L);if(H.color.copy(L.color).multiplyScalar(L.intensity),H.distance=L.distance,H.decay=L.decay,L.castShadow){const Y=L.shadow,G=e.get(L);G.shadowIntensity=Y.intensity,G.shadowBias=Y.bias,G.shadowNormalBias=Y.normalBias,G.shadowRadius=Y.radius,G.shadowMapSize=Y.mapSize,G.shadowCameraNear=Y.camera.near,G.shadowCameraFar=Y.camera.far,n.pointShadow[g]=G,n.pointShadowMap[g]=W,n.pointShadowMatrix[g]=L.shadow.matrix,x++}n.point[g]=H,g++}else if(L.isHemisphereLight){const H=t.get(L);H.skyColor.copy(L.color).multiplyScalar(O),H.groundColor.copy(L.groundColor).multiplyScalar(O),n.hemi[m]=H,m++}}p>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=dt.LTC_FLOAT_1,n.rectAreaLTC2=dt.LTC_FLOAT_2):(n.rectAreaLTC1=dt.LTC_HALF_1,n.rectAreaLTC2=dt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const C=n.hash;(C.directionalLength!==f||C.pointLength!==g||C.spotLength!==_||C.rectAreaLength!==p||C.hemiLength!==m||C.numDirectionalShadows!==y||C.numPointShadows!==x||C.numSpotShadows!==v||C.numSpotMaps!==E||C.numLightProbes!==T)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=p,n.point.length=g,n.hemi.length=m,n.directionalShadow.length=y,n.directionalShadowMap.length=y,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=y,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=v+E-R,n.spotLightMap.length=E,n.numSpotLightShadowsWithMaps=R,n.numLightProbes=T,C.directionalLength=f,C.pointLength=g,C.spotLength=_,C.rectAreaLength=p,C.hemiLength=m,C.numDirectionalShadows=y,C.numPointShadows=x,C.numSpotShadows=v,C.numSpotMaps=E,C.numLightProbes=T,n.version=qy++)}function l(c,h){let u=0,d=0,f=0,g=0,_=0;const p=h.matrixWorldInverse;for(let m=0,y=c.length;m<y;m++){const x=c[m];if(x.isDirectionalLight){const v=n.directional[u];v.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(p),u++}else if(x.isSpotLight){const v=n.spot[f];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(p),v.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),v.direction.sub(i),v.direction.transformDirection(p),f++}else if(x.isRectAreaLight){const v=n.rectArea[g];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(p),o.identity(),r.copy(x.matrixWorld),r.premultiply(p),o.extractRotation(r),v.halfWidth.set(x.width*.5,0,0),v.halfHeight.set(0,x.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),g++}else if(x.isPointLight){const v=n.point[d];v.position.setFromMatrixPosition(x.matrixWorld),v.position.applyMatrix4(p),d++}else if(x.isHemisphereLight){const v=n.hemi[_];v.direction.setFromMatrixPosition(x.matrixWorld),v.direction.transformDirection(p),_++}}}return{setup:a,setupView:l,state:n}}function cf(s){const t=new $y(s),e=[],n=[];function i(h){c.camera=h,e.length=0,n.length=0}function r(h){e.push(h)}function o(h){n.push(h)}function a(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Zy(s){let t=new WeakMap;function e(i,r=0){const o=t.get(i);let a;return o===void 0?(a=new cf(s),t.set(i,[a])):r>=o.length?(a=new cf(s),o.push(a)):a=o[r],a}function n(){t=new WeakMap}return{get:e,dispose:n}}const Jy=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,jy=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Ky(s,t,e){let n=new lh;const i=new st,r=new st,o=new fe,a=new _g({depthPacking:U0}),l=new vg,c={},h=e.maxTextureSize,u={[di]:Ye,[Ye]:di,[Un]:Un},d=new $n({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new st},radius:{value:4}},vertexShader:Jy,fragmentShader:jy}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new De;g.setAttribute("position",new He(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Zt(g,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Kf;let m=this.type;this.render=function(R,T,C){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||R.length===0)return;const M=s.getRenderTarget(),S=s.getActiveCubeFace(),L=s.getActiveMipmapLevel(),F=s.state;F.setBlending(Di),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const O=m!==ii&&this.type===ii,z=m===ii&&this.type!==ii;for(let W=0,H=R.length;W<H;W++){const Y=R[W],G=Y.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;i.copy(G.mapSize);const ht=G.getFrameExtents();if(i.multiply(ht),r.copy(G.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/ht.x),i.x=r.x*ht.x,G.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/ht.y),i.y=r.y*ht.y,G.mapSize.y=r.y)),G.map===null||O===!0||z===!0){const Mt=this.type!==ii?{minFilter:kn,magFilter:kn}:{};G.map!==null&&G.map.dispose(),G.map=new fs(i.x,i.y,Mt),G.map.texture.name=Y.name+".shadowMap",G.camera.updateProjectionMatrix()}s.setRenderTarget(G.map),s.clear();const pt=G.getViewportCount();for(let Mt=0;Mt<pt;Mt++){const Ot=G.getViewport(Mt);o.set(r.x*Ot.x,r.y*Ot.y,r.x*Ot.z,r.y*Ot.w),F.viewport(o),G.updateMatrices(Y,Mt),n=G.getFrustum(),v(T,C,G.camera,Y,this.type)}G.isPointLightShadow!==!0&&this.type===ii&&y(G,C),G.needsUpdate=!1}m=this.type,p.needsUpdate=!1,s.setRenderTarget(M,S,L)};function y(R,T){const C=t.update(_);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,f.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new fs(i.x,i.y)),d.uniforms.shadow_pass.value=R.map.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,s.setRenderTarget(R.mapPass),s.clear(),s.renderBufferDirect(T,null,C,d,_,null),f.uniforms.shadow_pass.value=R.mapPass.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,s.setRenderTarget(R.map),s.clear(),s.renderBufferDirect(T,null,C,f,_,null)}function x(R,T,C,M){let S=null;const L=C.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(L!==void 0)S=L;else if(S=C.isPointLight===!0?l:a,s.localClippingEnabled&&T.clipShadows===!0&&Array.isArray(T.clippingPlanes)&&T.clippingPlanes.length!==0||T.displacementMap&&T.displacementScale!==0||T.alphaMap&&T.alphaTest>0||T.map&&T.alphaTest>0){const F=S.uuid,O=T.uuid;let z=c[F];z===void 0&&(z={},c[F]=z);let W=z[O];W===void 0&&(W=S.clone(),z[O]=W,T.addEventListener("dispose",E)),S=W}if(S.visible=T.visible,S.wireframe=T.wireframe,M===ii?S.side=T.shadowSide!==null?T.shadowSide:T.side:S.side=T.shadowSide!==null?T.shadowSide:u[T.side],S.alphaMap=T.alphaMap,S.alphaTest=T.alphaTest,S.map=T.map,S.clipShadows=T.clipShadows,S.clippingPlanes=T.clippingPlanes,S.clipIntersection=T.clipIntersection,S.displacementMap=T.displacementMap,S.displacementScale=T.displacementScale,S.displacementBias=T.displacementBias,S.wireframeLinewidth=T.wireframeLinewidth,S.linewidth=T.linewidth,C.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const F=s.properties.get(S);F.light=C}return S}function v(R,T,C,M,S){if(R.visible===!1)return;if(R.layers.test(T.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&S===ii)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(C.matrixWorldInverse,R.matrixWorld);const O=t.update(R),z=R.material;if(Array.isArray(z)){const W=O.groups;for(let H=0,Y=W.length;H<Y;H++){const G=W[H],ht=z[G.materialIndex];if(ht&&ht.visible){const pt=x(R,ht,M,S);R.onBeforeShadow(s,R,T,C,O,pt,G),s.renderBufferDirect(C,null,O,pt,R,G),R.onAfterShadow(s,R,T,C,O,pt,G)}}}else if(z.visible){const W=x(R,z,M,S);R.onBeforeShadow(s,R,T,C,O,W,null),s.renderBufferDirect(C,null,O,W,R,null),R.onAfterShadow(s,R,T,C,O,W,null)}}const F=R.children;for(let O=0,z=F.length;O<z;O++)v(F[O],T,C,M,S)}function E(R){R.target.removeEventListener("dispose",E);for(const C in c){const M=c[C],S=R.target.uuid;S in M&&(M[S].dispose(),delete M[S])}}}const Qy={[Wl]:Xl,[ql]:Zl,[Yl]:Jl,[Qs]:$l,[Xl]:Wl,[Zl]:ql,[Jl]:Yl,[$l]:Qs};function t1(s,t){function e(){let I=!1;const gt=new fe;let q=null;const K=new fe(0,0,0,0);return{setMask:function(yt){q!==yt&&!I&&(s.colorMask(yt,yt,yt,yt),q=yt)},setLocked:function(yt){I=yt},setClear:function(yt,xt,Gt,Te,Ge){Ge===!0&&(yt*=Te,xt*=Te,Gt*=Te),gt.set(yt,xt,Gt,Te),K.equals(gt)===!1&&(s.clearColor(yt,xt,Gt,Te),K.copy(gt))},reset:function(){I=!1,q=null,K.set(-1,0,0,0)}}}function n(){let I=!1,gt=!1,q=null,K=null,yt=null;return{setReversed:function(xt){if(gt!==xt){const Gt=t.get("EXT_clip_control");gt?Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.ZERO_TO_ONE_EXT):Gt.clipControlEXT(Gt.LOWER_LEFT_EXT,Gt.NEGATIVE_ONE_TO_ONE_EXT);const Te=yt;yt=null,this.setClear(Te)}gt=xt},getReversed:function(){return gt},setTest:function(xt){xt?ft(s.DEPTH_TEST):It(s.DEPTH_TEST)},setMask:function(xt){q!==xt&&!I&&(s.depthMask(xt),q=xt)},setFunc:function(xt){if(gt&&(xt=Qy[xt]),K!==xt){switch(xt){case Wl:s.depthFunc(s.NEVER);break;case Xl:s.depthFunc(s.ALWAYS);break;case ql:s.depthFunc(s.LESS);break;case Qs:s.depthFunc(s.LEQUAL);break;case Yl:s.depthFunc(s.EQUAL);break;case $l:s.depthFunc(s.GEQUAL);break;case Zl:s.depthFunc(s.GREATER);break;case Jl:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}K=xt}},setLocked:function(xt){I=xt},setClear:function(xt){yt!==xt&&(gt&&(xt=1-xt),s.clearDepth(xt),yt=xt)},reset:function(){I=!1,q=null,K=null,yt=null,gt=!1}}}function i(){let I=!1,gt=null,q=null,K=null,yt=null,xt=null,Gt=null,Te=null,Ge=null;return{setTest:function(le){I||(le?ft(s.STENCIL_TEST):It(s.STENCIL_TEST))},setMask:function(le){gt!==le&&!I&&(s.stencilMask(le),gt=le)},setFunc:function(le,Cn,jn){(q!==le||K!==Cn||yt!==jn)&&(s.stencilFunc(le,Cn,jn),q=le,K=Cn,yt=jn)},setOp:function(le,Cn,jn){(xt!==le||Gt!==Cn||Te!==jn)&&(s.stencilOp(le,Cn,jn),xt=le,Gt=Cn,Te=jn)},setLocked:function(le){I=le},setClear:function(le){Ge!==le&&(s.clearStencil(le),Ge=le)},reset:function(){I=!1,gt=null,q=null,K=null,yt=null,xt=null,Gt=null,Te=null,Ge=null}}}const r=new e,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let h={},u={},d=new WeakMap,f=[],g=null,_=!1,p=null,m=null,y=null,x=null,v=null,E=null,R=null,T=new Vt(0,0,0),C=0,M=!1,S=null,L=null,F=null,O=null,z=null;const W=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,Y=0;const G=s.getParameter(s.VERSION);G.indexOf("WebGL")!==-1?(Y=parseFloat(/^WebGL (\d)/.exec(G)[1]),H=Y>=1):G.indexOf("OpenGL ES")!==-1&&(Y=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),H=Y>=2);let ht=null,pt={};const Mt=s.getParameter(s.SCISSOR_BOX),Ot=s.getParameter(s.VIEWPORT),Qt=new fe().fromArray(Mt),$=new fe().fromArray(Ot);function lt(I,gt,q,K){const yt=new Uint8Array(4),xt=s.createTexture();s.bindTexture(I,xt),s.texParameteri(I,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(I,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Gt=0;Gt<q;Gt++)I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY?s.texImage3D(gt,0,s.RGBA,1,1,K,0,s.RGBA,s.UNSIGNED_BYTE,yt):s.texImage2D(gt+Gt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,yt);return xt}const Rt={};Rt[s.TEXTURE_2D]=lt(s.TEXTURE_2D,s.TEXTURE_2D,1),Rt[s.TEXTURE_CUBE_MAP]=lt(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Rt[s.TEXTURE_2D_ARRAY]=lt(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Rt[s.TEXTURE_3D]=lt(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ft(s.DEPTH_TEST),o.setFunc(Qs),ot(!1),bt(tu),ft(s.CULL_FACE),D(Di);function ft(I){h[I]!==!0&&(s.enable(I),h[I]=!0)}function It(I){h[I]!==!1&&(s.disable(I),h[I]=!1)}function te(I,gt){return u[I]!==gt?(s.bindFramebuffer(I,gt),u[I]=gt,I===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=gt),I===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=gt),!0):!1}function Dt(I,gt){let q=f,K=!1;if(I){q=d.get(gt),q===void 0&&(q=[],d.set(gt,q));const yt=I.textures;if(q.length!==yt.length||q[0]!==s.COLOR_ATTACHMENT0){for(let xt=0,Gt=yt.length;xt<Gt;xt++)q[xt]=s.COLOR_ATTACHMENT0+xt;q.length=yt.length,K=!0}}else q[0]!==s.BACK&&(q[0]=s.BACK,K=!0);K&&s.drawBuffers(q)}function re(I){return g!==I?(s.useProgram(I),g=I,!0):!1}const rt={[Qi]:s.FUNC_ADD,[a0]:s.FUNC_SUBTRACT,[l0]:s.FUNC_REVERSE_SUBTRACT};rt[c0]=s.MIN,rt[h0]=s.MAX;const et={[u0]:s.ZERO,[f0]:s.ONE,[d0]:s.SRC_COLOR,[Vl]:s.SRC_ALPHA,[x0]:s.SRC_ALPHA_SATURATE,[_0]:s.DST_COLOR,[m0]:s.DST_ALPHA,[p0]:s.ONE_MINUS_SRC_COLOR,[Gl]:s.ONE_MINUS_SRC_ALPHA,[v0]:s.ONE_MINUS_DST_COLOR,[g0]:s.ONE_MINUS_DST_ALPHA,[y0]:s.CONSTANT_COLOR,[M0]:s.ONE_MINUS_CONSTANT_COLOR,[S0]:s.CONSTANT_ALPHA,[b0]:s.ONE_MINUS_CONSTANT_ALPHA};function D(I,gt,q,K,yt,xt,Gt,Te,Ge,le){if(I===Di){_===!0&&(It(s.BLEND),_=!1);return}if(_===!1&&(ft(s.BLEND),_=!0),I!==o0){if(I!==p||le!==M){if((m!==Qi||v!==Qi)&&(s.blendEquation(s.FUNC_ADD),m=Qi,v=Qi),le)switch(I){case rs:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ua:s.blendFunc(s.ONE,s.ONE);break;case eu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case nu:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}else switch(I){case rs:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case ua:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case eu:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case nu:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",I);break}y=null,x=null,E=null,R=null,T.set(0,0,0),C=0,p=I,M=le}return}yt=yt||gt,xt=xt||q,Gt=Gt||K,(gt!==m||yt!==v)&&(s.blendEquationSeparate(rt[gt],rt[yt]),m=gt,v=yt),(q!==y||K!==x||xt!==E||Gt!==R)&&(s.blendFuncSeparate(et[q],et[K],et[xt],et[Gt]),y=q,x=K,E=xt,R=Gt),(Te.equals(T)===!1||Ge!==C)&&(s.blendColor(Te.r,Te.g,Te.b,Ge),T.copy(Te),C=Ge),p=I,M=!1}function Pt(I,gt){I.side===Un?It(s.CULL_FACE):ft(s.CULL_FACE);let q=I.side===Ye;gt&&(q=!q),ot(q),I.blending===rs&&I.transparent===!1?D(Di):D(I.blending,I.blendEquation,I.blendSrc,I.blendDst,I.blendEquationAlpha,I.blendSrcAlpha,I.blendDstAlpha,I.blendColor,I.blendAlpha,I.premultipliedAlpha),o.setFunc(I.depthFunc),o.setTest(I.depthTest),o.setMask(I.depthWrite),r.setMask(I.colorWrite);const K=I.stencilWrite;a.setTest(K),K&&(a.setMask(I.stencilWriteMask),a.setFunc(I.stencilFunc,I.stencilRef,I.stencilFuncMask),a.setOp(I.stencilFail,I.stencilZFail,I.stencilZPass)),Ft(I.polygonOffset,I.polygonOffsetFactor,I.polygonOffsetUnits),I.alphaToCoverage===!0?ft(s.SAMPLE_ALPHA_TO_COVERAGE):It(s.SAMPLE_ALPHA_TO_COVERAGE)}function ot(I){S!==I&&(I?s.frontFace(s.CW):s.frontFace(s.CCW),S=I)}function bt(I){I!==s0?(ft(s.CULL_FACE),I!==L&&(I===tu?s.cullFace(s.BACK):I===r0?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):It(s.CULL_FACE),L=I}function ut(I){I!==F&&(H&&s.lineWidth(I),F=I)}function Ft(I,gt,q){I?(ft(s.POLYGON_OFFSET_FILL),(O!==gt||z!==q)&&(s.polygonOffset(gt,q),O=gt,z=q)):It(s.POLYGON_OFFSET_FILL)}function vt(I){I?ft(s.SCISSOR_TEST):It(s.SCISSOR_TEST)}function P(I){I===void 0&&(I=s.TEXTURE0+W-1),ht!==I&&(s.activeTexture(I),ht=I)}function b(I,gt,q){q===void 0&&(ht===null?q=s.TEXTURE0+W-1:q=ht);let K=pt[q];K===void 0&&(K={type:void 0,texture:void 0},pt[q]=K),(K.type!==I||K.texture!==gt)&&(ht!==q&&(s.activeTexture(q),ht=q),s.bindTexture(I,gt||Rt[I]),K.type=I,K.texture=gt)}function k(){const I=pt[ht];I!==void 0&&I.type!==void 0&&(s.bindTexture(I.type,null),I.type=void 0,I.texture=void 0)}function Z(){try{s.compressedTexImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function tt(){try{s.compressedTexImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function J(){try{s.texSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Ct(){try{s.texSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function mt(){try{s.compressedTexSubImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function St(){try{s.compressedTexSubImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Jt(){try{s.texStorage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function ct(){try{s.texStorage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function Tt(){try{s.texImage2D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function kt(){try{s.texImage3D(...arguments)}catch(I){console.error("THREE.WebGLState:",I)}}function zt(I){Qt.equals(I)===!1&&(s.scissor(I.x,I.y,I.z,I.w),Qt.copy(I))}function Et(I){$.equals(I)===!1&&(s.viewport(I.x,I.y,I.z,I.w),$.copy(I))}function Kt(I,gt){let q=c.get(gt);q===void 0&&(q=new WeakMap,c.set(gt,q));let K=q.get(I);K===void 0&&(K=s.getUniformBlockIndex(gt,I.name),q.set(I,K))}function Xt(I,gt){const K=c.get(gt).get(I);l.get(gt)!==K&&(s.uniformBlockBinding(gt,K,I.__bindingPointIndex),l.set(gt,K))}function ge(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),h={},ht=null,pt={},u={},d=new WeakMap,f=[],g=null,_=!1,p=null,m=null,y=null,x=null,v=null,E=null,R=null,T=new Vt(0,0,0),C=0,M=!1,S=null,L=null,F=null,O=null,z=null,Qt.set(0,0,s.canvas.width,s.canvas.height),$.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ft,disable:It,bindFramebuffer:te,drawBuffers:Dt,useProgram:re,setBlending:D,setMaterial:Pt,setFlipSided:ot,setCullFace:bt,setLineWidth:ut,setPolygonOffset:Ft,setScissorTest:vt,activeTexture:P,bindTexture:b,unbindTexture:k,compressedTexImage2D:Z,compressedTexImage3D:tt,texImage2D:Tt,texImage3D:kt,updateUBOMapping:Kt,uniformBlockBinding:Xt,texStorage2D:Jt,texStorage3D:ct,texSubImage2D:J,texSubImage3D:Ct,compressedTexSubImage2D:mt,compressedTexSubImage3D:St,scissor:zt,viewport:Et,reset:ge}}function e1(s,t,e,n,i,r,o){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new st,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(P,b){return f?new OffscreenCanvas(P,b):qr("canvas")}function _(P,b,k){let Z=1;const tt=vt(P);if((tt.width>k||tt.height>k)&&(Z=k/Math.max(tt.width,tt.height)),Z<1)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){const J=Math.floor(Z*tt.width),Ct=Math.floor(Z*tt.height);u===void 0&&(u=g(J,Ct));const mt=b?g(J,Ct):u;return mt.width=J,mt.height=Ct,mt.getContext("2d").drawImage(P,0,0,J,Ct),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+tt.width+"x"+tt.height+") to ("+J+"x"+Ct+")."),mt}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+tt.width+"x"+tt.height+")."),P;return P}function p(P){return P.generateMipmaps}function m(P){s.generateMipmap(P)}function y(P){return P.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?s.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function x(P,b,k,Z,tt=!1){if(P!==null){if(s[P]!==void 0)return s[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let J=b;if(b===s.RED&&(k===s.FLOAT&&(J=s.R32F),k===s.HALF_FLOAT&&(J=s.R16F),k===s.UNSIGNED_BYTE&&(J=s.R8)),b===s.RED_INTEGER&&(k===s.UNSIGNED_BYTE&&(J=s.R8UI),k===s.UNSIGNED_SHORT&&(J=s.R16UI),k===s.UNSIGNED_INT&&(J=s.R32UI),k===s.BYTE&&(J=s.R8I),k===s.SHORT&&(J=s.R16I),k===s.INT&&(J=s.R32I)),b===s.RG&&(k===s.FLOAT&&(J=s.RG32F),k===s.HALF_FLOAT&&(J=s.RG16F),k===s.UNSIGNED_BYTE&&(J=s.RG8)),b===s.RG_INTEGER&&(k===s.UNSIGNED_BYTE&&(J=s.RG8UI),k===s.UNSIGNED_SHORT&&(J=s.RG16UI),k===s.UNSIGNED_INT&&(J=s.RG32UI),k===s.BYTE&&(J=s.RG8I),k===s.SHORT&&(J=s.RG16I),k===s.INT&&(J=s.RG32I)),b===s.RGB_INTEGER&&(k===s.UNSIGNED_BYTE&&(J=s.RGB8UI),k===s.UNSIGNED_SHORT&&(J=s.RGB16UI),k===s.UNSIGNED_INT&&(J=s.RGB32UI),k===s.BYTE&&(J=s.RGB8I),k===s.SHORT&&(J=s.RGB16I),k===s.INT&&(J=s.RGB32I)),b===s.RGBA_INTEGER&&(k===s.UNSIGNED_BYTE&&(J=s.RGBA8UI),k===s.UNSIGNED_SHORT&&(J=s.RGBA16UI),k===s.UNSIGNED_INT&&(J=s.RGBA32UI),k===s.BYTE&&(J=s.RGBA8I),k===s.SHORT&&(J=s.RGBA16I),k===s.INT&&(J=s.RGBA32I)),b===s.RGB&&k===s.UNSIGNED_INT_5_9_9_9_REV&&(J=s.RGB9_E5),b===s.RGBA){const Ct=tt?fa:se.getTransfer(Z);k===s.FLOAT&&(J=s.RGBA32F),k===s.HALF_FLOAT&&(J=s.RGBA16F),k===s.UNSIGNED_BYTE&&(J=Ct===ue?s.SRGB8_ALPHA8:s.RGBA8),k===s.UNSIGNED_SHORT_4_4_4_4&&(J=s.RGBA4),k===s.UNSIGNED_SHORT_5_5_5_1&&(J=s.RGB5_A1)}return(J===s.R16F||J===s.R32F||J===s.RG16F||J===s.RG32F||J===s.RGBA16F||J===s.RGBA32F)&&t.get("EXT_color_buffer_float"),J}function v(P,b){let k;return P?b===null||b===us||b===ir?k=s.DEPTH24_STENCIL8:b===ci?k=s.DEPTH32F_STENCIL8:b===Wr&&(k=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):b===null||b===us||b===ir?k=s.DEPTH_COMPONENT24:b===ci?k=s.DEPTH_COMPONENT32F:b===Wr&&(k=s.DEPTH_COMPONENT16),k}function E(P,b){return p(P)===!0||P.isFramebufferTexture&&P.minFilter!==kn&&P.minFilter!==On?Math.log2(Math.max(b.width,b.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?b.mipmaps.length:1}function R(P){const b=P.target;b.removeEventListener("dispose",R),C(b),b.isVideoTexture&&h.delete(b)}function T(P){const b=P.target;b.removeEventListener("dispose",T),S(b)}function C(P){const b=n.get(P);if(b.__webglInit===void 0)return;const k=P.source,Z=d.get(k);if(Z){const tt=Z[b.__cacheKey];tt.usedTimes--,tt.usedTimes===0&&M(P),Object.keys(Z).length===0&&d.delete(k)}n.remove(P)}function M(P){const b=n.get(P);s.deleteTexture(b.__webglTexture);const k=P.source,Z=d.get(k);delete Z[b.__cacheKey],o.memory.textures--}function S(P){const b=n.get(P);if(P.depthTexture&&(P.depthTexture.dispose(),n.remove(P.depthTexture)),P.isWebGLCubeRenderTarget)for(let Z=0;Z<6;Z++){if(Array.isArray(b.__webglFramebuffer[Z]))for(let tt=0;tt<b.__webglFramebuffer[Z].length;tt++)s.deleteFramebuffer(b.__webglFramebuffer[Z][tt]);else s.deleteFramebuffer(b.__webglFramebuffer[Z]);b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer[Z])}else{if(Array.isArray(b.__webglFramebuffer))for(let Z=0;Z<b.__webglFramebuffer.length;Z++)s.deleteFramebuffer(b.__webglFramebuffer[Z]);else s.deleteFramebuffer(b.__webglFramebuffer);if(b.__webglDepthbuffer&&s.deleteRenderbuffer(b.__webglDepthbuffer),b.__webglMultisampledFramebuffer&&s.deleteFramebuffer(b.__webglMultisampledFramebuffer),b.__webglColorRenderbuffer)for(let Z=0;Z<b.__webglColorRenderbuffer.length;Z++)b.__webglColorRenderbuffer[Z]&&s.deleteRenderbuffer(b.__webglColorRenderbuffer[Z]);b.__webglDepthRenderbuffer&&s.deleteRenderbuffer(b.__webglDepthRenderbuffer)}const k=P.textures;for(let Z=0,tt=k.length;Z<tt;Z++){const J=n.get(k[Z]);J.__webglTexture&&(s.deleteTexture(J.__webglTexture),o.memory.textures--),n.remove(k[Z])}n.remove(P)}let L=0;function F(){L=0}function O(){const P=L;return P>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+i.maxTextures),L+=1,P}function z(P){const b=[];return b.push(P.wrapS),b.push(P.wrapT),b.push(P.wrapR||0),b.push(P.magFilter),b.push(P.minFilter),b.push(P.anisotropy),b.push(P.internalFormat),b.push(P.format),b.push(P.type),b.push(P.generateMipmaps),b.push(P.premultiplyAlpha),b.push(P.flipY),b.push(P.unpackAlignment),b.push(P.colorSpace),b.join()}function W(P,b){const k=n.get(P);if(P.isVideoTexture&&ut(P),P.isRenderTargetTexture===!1&&P.version>0&&k.__version!==P.version){const Z=P.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Z.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{$(k,P,b);return}}e.bindTexture(s.TEXTURE_2D,k.__webglTexture,s.TEXTURE0+b)}function H(P,b){const k=n.get(P);if(P.version>0&&k.__version!==P.version){$(k,P,b);return}e.bindTexture(s.TEXTURE_2D_ARRAY,k.__webglTexture,s.TEXTURE0+b)}function Y(P,b){const k=n.get(P);if(P.version>0&&k.__version!==P.version){$(k,P,b);return}e.bindTexture(s.TEXTURE_3D,k.__webglTexture,s.TEXTURE0+b)}function G(P,b){const k=n.get(P);if(P.version>0&&k.__version!==P.version){lt(k,P,b);return}e.bindTexture(s.TEXTURE_CUBE_MAP,k.__webglTexture,s.TEXTURE0+b)}const ht={[nr]:s.REPEAT,[ns]:s.CLAMP_TO_EDGE,[Ql]:s.MIRRORED_REPEAT},pt={[kn]:s.NEAREST,[L0]:s.NEAREST_MIPMAP_NEAREST,[_o]:s.NEAREST_MIPMAP_LINEAR,[On]:s.LINEAR,[Wa]:s.LINEAR_MIPMAP_NEAREST,[is]:s.LINEAR_MIPMAP_LINEAR},Mt={[O0]:s.NEVER,[V0]:s.ALWAYS,[F0]:s.LESS,[pd]:s.LEQUAL,[k0]:s.EQUAL,[H0]:s.GEQUAL,[z0]:s.GREATER,[B0]:s.NOTEQUAL};function Ot(P,b){if(b.type===ci&&t.has("OES_texture_float_linear")===!1&&(b.magFilter===On||b.magFilter===Wa||b.magFilter===_o||b.magFilter===is||b.minFilter===On||b.minFilter===Wa||b.minFilter===_o||b.minFilter===is)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(P,s.TEXTURE_WRAP_S,ht[b.wrapS]),s.texParameteri(P,s.TEXTURE_WRAP_T,ht[b.wrapT]),(P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY)&&s.texParameteri(P,s.TEXTURE_WRAP_R,ht[b.wrapR]),s.texParameteri(P,s.TEXTURE_MAG_FILTER,pt[b.magFilter]),s.texParameteri(P,s.TEXTURE_MIN_FILTER,pt[b.minFilter]),b.compareFunction&&(s.texParameteri(P,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(P,s.TEXTURE_COMPARE_FUNC,Mt[b.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(b.magFilter===kn||b.minFilter!==_o&&b.minFilter!==is||b.type===ci&&t.has("OES_texture_float_linear")===!1)return;if(b.anisotropy>1||n.get(b).__currentAnisotropy){const k=t.get("EXT_texture_filter_anisotropic");s.texParameterf(P,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(b.anisotropy,i.getMaxAnisotropy())),n.get(b).__currentAnisotropy=b.anisotropy}}}function Qt(P,b){let k=!1;P.__webglInit===void 0&&(P.__webglInit=!0,b.addEventListener("dispose",R));const Z=b.source;let tt=d.get(Z);tt===void 0&&(tt={},d.set(Z,tt));const J=z(b);if(J!==P.__cacheKey){tt[J]===void 0&&(tt[J]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,k=!0),tt[J].usedTimes++;const Ct=tt[P.__cacheKey];Ct!==void 0&&(tt[P.__cacheKey].usedTimes--,Ct.usedTimes===0&&M(b)),P.__cacheKey=J,P.__webglTexture=tt[J].texture}return k}function $(P,b,k){let Z=s.TEXTURE_2D;(b.isDataArrayTexture||b.isCompressedArrayTexture)&&(Z=s.TEXTURE_2D_ARRAY),b.isData3DTexture&&(Z=s.TEXTURE_3D);const tt=Qt(P,b),J=b.source;e.bindTexture(Z,P.__webglTexture,s.TEXTURE0+k);const Ct=n.get(J);if(J.version!==Ct.__version||tt===!0){e.activeTexture(s.TEXTURE0+k);const mt=se.getPrimaries(se.workingColorSpace),St=b.colorSpace===Ai?null:se.getPrimaries(b.colorSpace),Jt=b.colorSpace===Ai||mt===St?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Jt);let ct=_(b.image,!1,i.maxTextureSize);ct=Ft(b,ct);const Tt=r.convert(b.format,b.colorSpace),kt=r.convert(b.type);let zt=x(b.internalFormat,Tt,kt,b.colorSpace,b.isVideoTexture);Ot(Z,b);let Et;const Kt=b.mipmaps,Xt=b.isVideoTexture!==!0,ge=Ct.__version===void 0||tt===!0,I=J.dataReady,gt=E(b,ct);if(b.isDepthTexture)zt=v(b.format===sr,b.type),ge&&(Xt?e.texStorage2D(s.TEXTURE_2D,1,zt,ct.width,ct.height):e.texImage2D(s.TEXTURE_2D,0,zt,ct.width,ct.height,0,Tt,kt,null));else if(b.isDataTexture)if(Kt.length>0){Xt&&ge&&e.texStorage2D(s.TEXTURE_2D,gt,zt,Kt[0].width,Kt[0].height);for(let q=0,K=Kt.length;q<K;q++)Et=Kt[q],Xt?I&&e.texSubImage2D(s.TEXTURE_2D,q,0,0,Et.width,Et.height,Tt,kt,Et.data):e.texImage2D(s.TEXTURE_2D,q,zt,Et.width,Et.height,0,Tt,kt,Et.data);b.generateMipmaps=!1}else Xt?(ge&&e.texStorage2D(s.TEXTURE_2D,gt,zt,ct.width,ct.height),I&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,ct.width,ct.height,Tt,kt,ct.data)):e.texImage2D(s.TEXTURE_2D,0,zt,ct.width,ct.height,0,Tt,kt,ct.data);else if(b.isCompressedTexture)if(b.isCompressedArrayTexture){Xt&&ge&&e.texStorage3D(s.TEXTURE_2D_ARRAY,gt,zt,Kt[0].width,Kt[0].height,ct.depth);for(let q=0,K=Kt.length;q<K;q++)if(Et=Kt[q],b.format!==Fn)if(Tt!==null)if(Xt){if(I)if(b.layerUpdates.size>0){const yt=ku(Et.width,Et.height,b.format,b.type);for(const xt of b.layerUpdates){const Gt=Et.data.subarray(xt*yt/Et.data.BYTES_PER_ELEMENT,(xt+1)*yt/Et.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,q,0,0,xt,Et.width,Et.height,1,Tt,Gt)}b.clearLayerUpdates()}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,q,0,0,0,Et.width,Et.height,ct.depth,Tt,Et.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,q,zt,Et.width,Et.height,ct.depth,0,Et.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Xt?I&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,q,0,0,0,Et.width,Et.height,ct.depth,Tt,kt,Et.data):e.texImage3D(s.TEXTURE_2D_ARRAY,q,zt,Et.width,Et.height,ct.depth,0,Tt,kt,Et.data)}else{Xt&&ge&&e.texStorage2D(s.TEXTURE_2D,gt,zt,Kt[0].width,Kt[0].height);for(let q=0,K=Kt.length;q<K;q++)Et=Kt[q],b.format!==Fn?Tt!==null?Xt?I&&e.compressedTexSubImage2D(s.TEXTURE_2D,q,0,0,Et.width,Et.height,Tt,Et.data):e.compressedTexImage2D(s.TEXTURE_2D,q,zt,Et.width,Et.height,0,Et.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xt?I&&e.texSubImage2D(s.TEXTURE_2D,q,0,0,Et.width,Et.height,Tt,kt,Et.data):e.texImage2D(s.TEXTURE_2D,q,zt,Et.width,Et.height,0,Tt,kt,Et.data)}else if(b.isDataArrayTexture)if(Xt){if(ge&&e.texStorage3D(s.TEXTURE_2D_ARRAY,gt,zt,ct.width,ct.height,ct.depth),I)if(b.layerUpdates.size>0){const q=ku(ct.width,ct.height,b.format,b.type);for(const K of b.layerUpdates){const yt=ct.data.subarray(K*q/ct.data.BYTES_PER_ELEMENT,(K+1)*q/ct.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,K,ct.width,ct.height,1,Tt,kt,yt)}b.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ct.width,ct.height,ct.depth,Tt,kt,ct.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,zt,ct.width,ct.height,ct.depth,0,Tt,kt,ct.data);else if(b.isData3DTexture)Xt?(ge&&e.texStorage3D(s.TEXTURE_3D,gt,zt,ct.width,ct.height,ct.depth),I&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ct.width,ct.height,ct.depth,Tt,kt,ct.data)):e.texImage3D(s.TEXTURE_3D,0,zt,ct.width,ct.height,ct.depth,0,Tt,kt,ct.data);else if(b.isFramebufferTexture){if(ge)if(Xt)e.texStorage2D(s.TEXTURE_2D,gt,zt,ct.width,ct.height);else{let q=ct.width,K=ct.height;for(let yt=0;yt<gt;yt++)e.texImage2D(s.TEXTURE_2D,yt,zt,q,K,0,Tt,kt,null),q>>=1,K>>=1}}else if(Kt.length>0){if(Xt&&ge){const q=vt(Kt[0]);e.texStorage2D(s.TEXTURE_2D,gt,zt,q.width,q.height)}for(let q=0,K=Kt.length;q<K;q++)Et=Kt[q],Xt?I&&e.texSubImage2D(s.TEXTURE_2D,q,0,0,Tt,kt,Et):e.texImage2D(s.TEXTURE_2D,q,zt,Tt,kt,Et);b.generateMipmaps=!1}else if(Xt){if(ge){const q=vt(ct);e.texStorage2D(s.TEXTURE_2D,gt,zt,q.width,q.height)}I&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,Tt,kt,ct)}else e.texImage2D(s.TEXTURE_2D,0,zt,Tt,kt,ct);p(b)&&m(Z),Ct.__version=J.version,b.onUpdate&&b.onUpdate(b)}P.__version=b.version}function lt(P,b,k){if(b.image.length!==6)return;const Z=Qt(P,b),tt=b.source;e.bindTexture(s.TEXTURE_CUBE_MAP,P.__webglTexture,s.TEXTURE0+k);const J=n.get(tt);if(tt.version!==J.__version||Z===!0){e.activeTexture(s.TEXTURE0+k);const Ct=se.getPrimaries(se.workingColorSpace),mt=b.colorSpace===Ai?null:se.getPrimaries(b.colorSpace),St=b.colorSpace===Ai||Ct===mt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,b.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,b.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,b.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,St);const Jt=b.isCompressedTexture||b.image[0].isCompressedTexture,ct=b.image[0]&&b.image[0].isDataTexture,Tt=[];for(let K=0;K<6;K++)!Jt&&!ct?Tt[K]=_(b.image[K],!0,i.maxCubemapSize):Tt[K]=ct?b.image[K].image:b.image[K],Tt[K]=Ft(b,Tt[K]);const kt=Tt[0],zt=r.convert(b.format,b.colorSpace),Et=r.convert(b.type),Kt=x(b.internalFormat,zt,Et,b.colorSpace),Xt=b.isVideoTexture!==!0,ge=J.__version===void 0||Z===!0,I=tt.dataReady;let gt=E(b,kt);Ot(s.TEXTURE_CUBE_MAP,b);let q;if(Jt){Xt&&ge&&e.texStorage2D(s.TEXTURE_CUBE_MAP,gt,Kt,kt.width,kt.height);for(let K=0;K<6;K++){q=Tt[K].mipmaps;for(let yt=0;yt<q.length;yt++){const xt=q[yt];b.format!==Fn?zt!==null?Xt?I&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt,0,0,xt.width,xt.height,zt,xt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt,Kt,xt.width,xt.height,0,xt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Xt?I&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt,0,0,xt.width,xt.height,zt,Et,xt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt,Kt,xt.width,xt.height,0,zt,Et,xt.data)}}}else{if(q=b.mipmaps,Xt&&ge){q.length>0&&gt++;const K=vt(Tt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,gt,Kt,K.width,K.height)}for(let K=0;K<6;K++)if(ct){Xt?I&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,Tt[K].width,Tt[K].height,zt,Et,Tt[K].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Kt,Tt[K].width,Tt[K].height,0,zt,Et,Tt[K].data);for(let yt=0;yt<q.length;yt++){const Gt=q[yt].image[K].image;Xt?I&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt+1,0,0,Gt.width,Gt.height,zt,Et,Gt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt+1,Kt,Gt.width,Gt.height,0,zt,Et,Gt.data)}}else{Xt?I&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,0,0,zt,Et,Tt[K]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,0,Kt,zt,Et,Tt[K]);for(let yt=0;yt<q.length;yt++){const xt=q[yt];Xt?I&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt+1,0,0,zt,Et,xt.image[K]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+K,yt+1,Kt,zt,Et,xt.image[K])}}}p(b)&&m(s.TEXTURE_CUBE_MAP),J.__version=tt.version,b.onUpdate&&b.onUpdate(b)}P.__version=b.version}function Rt(P,b,k,Z,tt,J){const Ct=r.convert(k.format,k.colorSpace),mt=r.convert(k.type),St=x(k.internalFormat,Ct,mt,k.colorSpace),Jt=n.get(b),ct=n.get(k);if(ct.__renderTarget=b,!Jt.__hasExternalTextures){const Tt=Math.max(1,b.width>>J),kt=Math.max(1,b.height>>J);tt===s.TEXTURE_3D||tt===s.TEXTURE_2D_ARRAY?e.texImage3D(tt,J,St,Tt,kt,b.depth,0,Ct,mt,null):e.texImage2D(tt,J,St,Tt,kt,0,Ct,mt,null)}e.bindFramebuffer(s.FRAMEBUFFER,P),bt(b)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Z,tt,ct.__webglTexture,0,ot(b)):(tt===s.TEXTURE_2D||tt>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&tt<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,Z,tt,ct.__webglTexture,J),e.bindFramebuffer(s.FRAMEBUFFER,null)}function ft(P,b,k){if(s.bindRenderbuffer(s.RENDERBUFFER,P),b.depthBuffer){const Z=b.depthTexture,tt=Z&&Z.isDepthTexture?Z.type:null,J=v(b.stencilBuffer,tt),Ct=b.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,mt=ot(b);bt(b)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,mt,J,b.width,b.height):k?s.renderbufferStorageMultisample(s.RENDERBUFFER,mt,J,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,J,b.width,b.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Ct,s.RENDERBUFFER,P)}else{const Z=b.textures;for(let tt=0;tt<Z.length;tt++){const J=Z[tt],Ct=r.convert(J.format,J.colorSpace),mt=r.convert(J.type),St=x(J.internalFormat,Ct,mt,J.colorSpace),Jt=ot(b);k&&bt(b)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Jt,St,b.width,b.height):bt(b)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Jt,St,b.width,b.height):s.renderbufferStorage(s.RENDERBUFFER,St,b.width,b.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function It(P,b){if(b&&b.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,P),!(b.depthTexture&&b.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const Z=n.get(b.depthTexture);Z.__renderTarget=b,(!Z.__webglTexture||b.depthTexture.image.width!==b.width||b.depthTexture.image.height!==b.height)&&(b.depthTexture.image.width=b.width,b.depthTexture.image.height=b.height,b.depthTexture.needsUpdate=!0),W(b.depthTexture,0);const tt=Z.__webglTexture,J=ot(b);if(b.depthTexture.format===$s)bt(b)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,tt,0,J):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,tt,0);else if(b.depthTexture.format===sr)bt(b)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,tt,0,J):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,tt,0);else throw new Error("Unknown depthTexture format")}function te(P){const b=n.get(P),k=P.isWebGLCubeRenderTarget===!0;if(b.__boundDepthTexture!==P.depthTexture){const Z=P.depthTexture;if(b.__depthDisposeCallback&&b.__depthDisposeCallback(),Z){const tt=()=>{delete b.__boundDepthTexture,delete b.__depthDisposeCallback,Z.removeEventListener("dispose",tt)};Z.addEventListener("dispose",tt),b.__depthDisposeCallback=tt}b.__boundDepthTexture=Z}if(P.depthTexture&&!b.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");It(b.__webglFramebuffer,P)}else if(k){b.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(e.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer[Z]),b.__webglDepthbuffer[Z]===void 0)b.__webglDepthbuffer[Z]=s.createRenderbuffer(),ft(b.__webglDepthbuffer[Z],P,!1);else{const tt=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,J=b.__webglDepthbuffer[Z];s.bindRenderbuffer(s.RENDERBUFFER,J),s.framebufferRenderbuffer(s.FRAMEBUFFER,tt,s.RENDERBUFFER,J)}}else if(e.bindFramebuffer(s.FRAMEBUFFER,b.__webglFramebuffer),b.__webglDepthbuffer===void 0)b.__webglDepthbuffer=s.createRenderbuffer(),ft(b.__webglDepthbuffer,P,!1);else{const Z=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,tt=b.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,tt),s.framebufferRenderbuffer(s.FRAMEBUFFER,Z,s.RENDERBUFFER,tt)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Dt(P,b,k){const Z=n.get(P);b!==void 0&&Rt(Z.__webglFramebuffer,P,P.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),k!==void 0&&te(P)}function re(P){const b=P.texture,k=n.get(P),Z=n.get(b);P.addEventListener("dispose",T);const tt=P.textures,J=P.isWebGLCubeRenderTarget===!0,Ct=tt.length>1;if(Ct||(Z.__webglTexture===void 0&&(Z.__webglTexture=s.createTexture()),Z.__version=b.version,o.memory.textures++),J){k.__webglFramebuffer=[];for(let mt=0;mt<6;mt++)if(b.mipmaps&&b.mipmaps.length>0){k.__webglFramebuffer[mt]=[];for(let St=0;St<b.mipmaps.length;St++)k.__webglFramebuffer[mt][St]=s.createFramebuffer()}else k.__webglFramebuffer[mt]=s.createFramebuffer()}else{if(b.mipmaps&&b.mipmaps.length>0){k.__webglFramebuffer=[];for(let mt=0;mt<b.mipmaps.length;mt++)k.__webglFramebuffer[mt]=s.createFramebuffer()}else k.__webglFramebuffer=s.createFramebuffer();if(Ct)for(let mt=0,St=tt.length;mt<St;mt++){const Jt=n.get(tt[mt]);Jt.__webglTexture===void 0&&(Jt.__webglTexture=s.createTexture(),o.memory.textures++)}if(P.samples>0&&bt(P)===!1){k.__webglMultisampledFramebuffer=s.createFramebuffer(),k.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let mt=0;mt<tt.length;mt++){const St=tt[mt];k.__webglColorRenderbuffer[mt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,k.__webglColorRenderbuffer[mt]);const Jt=r.convert(St.format,St.colorSpace),ct=r.convert(St.type),Tt=x(St.internalFormat,Jt,ct,St.colorSpace,P.isXRRenderTarget===!0),kt=ot(P);s.renderbufferStorageMultisample(s.RENDERBUFFER,kt,Tt,P.width,P.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+mt,s.RENDERBUFFER,k.__webglColorRenderbuffer[mt])}s.bindRenderbuffer(s.RENDERBUFFER,null),P.depthBuffer&&(k.__webglDepthRenderbuffer=s.createRenderbuffer(),ft(k.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(J){e.bindTexture(s.TEXTURE_CUBE_MAP,Z.__webglTexture),Ot(s.TEXTURE_CUBE_MAP,b);for(let mt=0;mt<6;mt++)if(b.mipmaps&&b.mipmaps.length>0)for(let St=0;St<b.mipmaps.length;St++)Rt(k.__webglFramebuffer[mt][St],P,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+mt,St);else Rt(k.__webglFramebuffer[mt],P,b,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0);p(b)&&m(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(Ct){for(let mt=0,St=tt.length;mt<St;mt++){const Jt=tt[mt],ct=n.get(Jt);e.bindTexture(s.TEXTURE_2D,ct.__webglTexture),Ot(s.TEXTURE_2D,Jt),Rt(k.__webglFramebuffer,P,Jt,s.COLOR_ATTACHMENT0+mt,s.TEXTURE_2D,0),p(Jt)&&m(s.TEXTURE_2D)}e.unbindTexture()}else{let mt=s.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(mt=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(mt,Z.__webglTexture),Ot(mt,b),b.mipmaps&&b.mipmaps.length>0)for(let St=0;St<b.mipmaps.length;St++)Rt(k.__webglFramebuffer[St],P,b,s.COLOR_ATTACHMENT0,mt,St);else Rt(k.__webglFramebuffer,P,b,s.COLOR_ATTACHMENT0,mt,0);p(b)&&m(mt),e.unbindTexture()}P.depthBuffer&&te(P)}function rt(P){const b=P.textures;for(let k=0,Z=b.length;k<Z;k++){const tt=b[k];if(p(tt)){const J=y(P),Ct=n.get(tt).__webglTexture;e.bindTexture(J,Ct),m(J),e.unbindTexture()}}}const et=[],D=[];function Pt(P){if(P.samples>0){if(bt(P)===!1){const b=P.textures,k=P.width,Z=P.height;let tt=s.COLOR_BUFFER_BIT;const J=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ct=n.get(P),mt=b.length>1;if(mt)for(let St=0;St<b.length;St++)e.bindFramebuffer(s.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+St,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,Ct.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+St,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ct.__webglFramebuffer);for(let St=0;St<b.length;St++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(tt|=s.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(tt|=s.STENCIL_BUFFER_BIT)),mt){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ct.__webglColorRenderbuffer[St]);const Jt=n.get(b[St]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Jt,0)}s.blitFramebuffer(0,0,k,Z,0,0,k,Z,tt,s.NEAREST),l===!0&&(et.length=0,D.length=0,et.push(s.COLOR_ATTACHMENT0+St),P.depthBuffer&&P.resolveDepthBuffer===!1&&(et.push(J),D.push(J),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,D)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,et))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),mt)for(let St=0;St<b.length;St++){e.bindFramebuffer(s.FRAMEBUFFER,Ct.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+St,s.RENDERBUFFER,Ct.__webglColorRenderbuffer[St]);const Jt=n.get(b[St]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,Ct.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+St,s.TEXTURE_2D,Jt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ct.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){const b=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[b])}}}function ot(P){return Math.min(i.maxSamples,P.samples)}function bt(P){const b=n.get(P);return P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&b.__useRenderToTexture!==!1}function ut(P){const b=o.render.frame;h.get(P)!==b&&(h.set(P,b),P.update())}function Ft(P,b){const k=P.colorSpace,Z=P.format,tt=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||k!==rr&&k!==Ai&&(se.getTransfer(k)===ue?(Z!==Fn||tt!==pi)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),b}function vt(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=O,this.resetTextureUnits=F,this.setTexture2D=W,this.setTexture2DArray=H,this.setTexture3D=Y,this.setTextureCube=G,this.rebindTextures=Dt,this.setupRenderTarget=re,this.updateRenderTargetMipmap=rt,this.updateMultisampleRenderTarget=Pt,this.setupDepthRenderbuffer=te,this.setupFrameBufferTexture=Rt,this.useMultisampledRTT=bt}function n1(s,t){function e(n,i=Ai){let r;const o=se.getTransfer(i);if(n===pi)return s.UNSIGNED_BYTE;if(n===jc)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Kc)return s.UNSIGNED_SHORT_5_5_5_1;if(n===rd)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===id)return s.BYTE;if(n===sd)return s.SHORT;if(n===Wr)return s.UNSIGNED_SHORT;if(n===Jc)return s.INT;if(n===us)return s.UNSIGNED_INT;if(n===ci)return s.FLOAT;if(n===lo)return s.HALF_FLOAT;if(n===od)return s.ALPHA;if(n===ad)return s.RGB;if(n===Fn)return s.RGBA;if(n===ld)return s.LUMINANCE;if(n===cd)return s.LUMINANCE_ALPHA;if(n===$s)return s.DEPTH_COMPONENT;if(n===sr)return s.DEPTH_STENCIL;if(n===hd)return s.RED;if(n===Qc)return s.RED_INTEGER;if(n===ud)return s.RG;if(n===th)return s.RG_INTEGER;if(n===eh)return s.RGBA_INTEGER;if(n===Qo||n===ta||n===ea||n===na)if(o===ue)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Qo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ta)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===ea)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===na)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Qo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ta)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===ea)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===na)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===tc||n===ec||n===nc||n===ic)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===tc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===ec)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===nc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ic)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===sc||n===rc||n===oc)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===sc||n===rc)return o===ue?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===oc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===ac||n===lc||n===cc||n===hc||n===uc||n===fc||n===dc||n===pc||n===mc||n===gc||n===_c||n===vc||n===xc||n===yc)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===ac)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===lc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===cc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===hc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===uc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===fc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===dc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===pc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===mc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===gc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===_c)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===vc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===xc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===yc)return o===ue?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===ia||n===Mc||n===Sc)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===ia)return o===ue?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Mc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Sc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===fd||n===bc||n===wc||n===Tc)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===ia)return r.COMPRESSED_RED_RGTC1_EXT;if(n===bc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===wc)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Tc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ir?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}const i1=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,s1=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class r1{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new $e,r=t.properties.get(i);r.__webglTexture=e.texture,(e.depthNear!==n.depthNear||e.depthFar!==n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new $n({vertexShader:i1,fragmentShader:s1,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Zt(new uo(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class o1 extends dr{constructor(t,e){super();const n=this;let i=null,r=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null;const _=new r1,p=e.getContextAttributes();let m=null,y=null;const x=[],v=[],E=new st;let R=null;const T=new pn;T.viewport=new fe;const C=new pn;C.viewport=new fe;const M=[T,C],S=new Ag;let L=null,F=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let lt=x[$];return lt===void 0&&(lt=new hl,x[$]=lt),lt.getTargetRaySpace()},this.getControllerGrip=function($){let lt=x[$];return lt===void 0&&(lt=new hl,x[$]=lt),lt.getGripSpace()},this.getHand=function($){let lt=x[$];return lt===void 0&&(lt=new hl,x[$]=lt),lt.getHandSpace()};function O($){const lt=v.indexOf($.inputSource);if(lt===-1)return;const Rt=x[lt];Rt!==void 0&&(Rt.update($.inputSource,$.frame,c||o),Rt.dispatchEvent({type:$.type,data:$.inputSource}))}function z(){i.removeEventListener("select",O),i.removeEventListener("selectstart",O),i.removeEventListener("selectend",O),i.removeEventListener("squeeze",O),i.removeEventListener("squeezestart",O),i.removeEventListener("squeezeend",O),i.removeEventListener("end",z),i.removeEventListener("inputsourceschange",W);for(let $=0;$<x.length;$++){const lt=v[$];lt!==null&&(v[$]=null,x[$].disconnect(lt))}L=null,F=null,_.reset(),t.setRenderTarget(m),f=null,d=null,u=null,i=null,y=null,Qt.stop(),n.isPresenting=!1,t.setPixelRatio(R),t.setSize(E.width,E.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){a=$,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function($){if(i=$,i!==null){if(m=t.getRenderTarget(),i.addEventListener("select",O),i.addEventListener("selectstart",O),i.addEventListener("selectend",O),i.addEventListener("squeeze",O),i.addEventListener("squeezestart",O),i.addEventListener("squeezeend",O),i.addEventListener("end",z),i.addEventListener("inputsourceschange",W),p.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(E),typeof XRWebGLBinding<"u"&&"createProjectionLayer"in XRWebGLBinding.prototype){let Rt=null,ft=null,It=null;p.depth&&(It=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Rt=p.stencil?sr:$s,ft=p.stencil?ir:us);const te={colorFormat:e.RGBA8,depthFormat:It,scaleFactor:r};u=new XRWebGLBinding(i,e),d=u.createProjectionLayer(te),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),y=new fs(d.textureWidth,d.textureHeight,{format:Fn,type:pi,depthTexture:new Td(d.textureWidth,d.textureHeight,ft,void 0,void 0,void 0,void 0,void 0,void 0,Rt),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{const Rt={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,e,Rt),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new fs(f.framebufferWidth,f.framebufferHeight,{format:Fn,type:pi,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),Qt.setContext(i),Qt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function W($){for(let lt=0;lt<$.removed.length;lt++){const Rt=$.removed[lt],ft=v.indexOf(Rt);ft>=0&&(v[ft]=null,x[ft].disconnect(Rt))}for(let lt=0;lt<$.added.length;lt++){const Rt=$.added[lt];let ft=v.indexOf(Rt);if(ft===-1){for(let te=0;te<x.length;te++)if(te>=v.length){v.push(Rt),ft=te;break}else if(v[te]===null){v[te]=Rt,ft=te;break}if(ft===-1)break}const It=x[ft];It&&It.connect(Rt)}}const H=new A,Y=new A;function G($,lt,Rt){H.setFromMatrixPosition(lt.matrixWorld),Y.setFromMatrixPosition(Rt.matrixWorld);const ft=H.distanceTo(Y),It=lt.projectionMatrix.elements,te=Rt.projectionMatrix.elements,Dt=It[14]/(It[10]-1),re=It[14]/(It[10]+1),rt=(It[9]+1)/It[5],et=(It[9]-1)/It[5],D=(It[8]-1)/It[0],Pt=(te[8]+1)/te[0],ot=Dt*D,bt=Dt*Pt,ut=ft/(-D+Pt),Ft=ut*-D;if(lt.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Ft),$.translateZ(ut),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),It[10]===-1)$.projectionMatrix.copy(lt.projectionMatrix),$.projectionMatrixInverse.copy(lt.projectionMatrixInverse);else{const vt=Dt+ut,P=re+ut,b=ot-Ft,k=bt+(ft-Ft),Z=rt*re/P*vt,tt=et*re/P*vt;$.projectionMatrix.makePerspective(b,k,Z,tt,vt,P),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function ht($,lt){lt===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(lt.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(i===null)return;let lt=$.near,Rt=$.far;_.texture!==null&&(_.depthNear>0&&(lt=_.depthNear),_.depthFar>0&&(Rt=_.depthFar)),S.near=C.near=T.near=lt,S.far=C.far=T.far=Rt,(L!==S.near||F!==S.far)&&(i.updateRenderState({depthNear:S.near,depthFar:S.far}),L=S.near,F=S.far),T.layers.mask=$.layers.mask|2,C.layers.mask=$.layers.mask|4,S.layers.mask=T.layers.mask|C.layers.mask;const ft=$.parent,It=S.cameras;ht(S,ft);for(let te=0;te<It.length;te++)ht(It[te],ft);It.length===2?G(S,T,C):S.projectionMatrix.copy(T.projectionMatrix),pt($,S,ft)};function pt($,lt,Rt){Rt===null?$.matrix.copy(lt.matrixWorld):($.matrix.copy(Rt.matrixWorld),$.matrix.invert(),$.matrix.multiply(lt.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(lt.projectionMatrix),$.projectionMatrixInverse.copy(lt.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=Xr*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return S},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function($){l=$,d!==null&&(d.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(S)};let Mt=null;function Ot($,lt){if(h=lt.getViewerPose(c||o),g=lt,h!==null){const Rt=h.views;f!==null&&(t.setRenderTargetFramebuffer(y,f.framebuffer),t.setRenderTarget(y));let ft=!1;Rt.length!==S.cameras.length&&(S.cameras.length=0,ft=!0);for(let Dt=0;Dt<Rt.length;Dt++){const re=Rt[Dt];let rt=null;if(f!==null)rt=f.getViewport(re);else{const D=u.getViewSubImage(d,re);rt=D.viewport,Dt===0&&(t.setRenderTargetTextures(y,D.colorTexture,d.ignoreDepthValues?void 0:D.depthStencilTexture),t.setRenderTarget(y))}let et=M[Dt];et===void 0&&(et=new pn,et.layers.enable(Dt),et.viewport=new fe,M[Dt]=et),et.matrix.fromArray(re.transform.matrix),et.matrix.decompose(et.position,et.quaternion,et.scale),et.projectionMatrix.fromArray(re.projectionMatrix),et.projectionMatrixInverse.copy(et.projectionMatrix).invert(),et.viewport.set(rt.x,rt.y,rt.width,rt.height),Dt===0&&(S.matrix.copy(et.matrix),S.matrix.decompose(S.position,S.quaternion,S.scale)),ft===!0&&S.cameras.push(et)}const It=i.enabledFeatures;if(It&&It.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&u){const Dt=u.getDepthInformation(Rt[0]);Dt&&Dt.isValid&&Dt.texture&&_.init(t,Dt,i.renderState)}}for(let Rt=0;Rt<x.length;Rt++){const ft=v[Rt],It=x[Rt];ft!==null&&It!==void 0&&It.update(ft,lt,c||o)}Mt&&Mt($,lt),lt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:lt}),g=null}const Qt=new Od;Qt.setAnimationLoop(Ot),this.setAnimationLoop=function($){Mt=$},this.dispose=function(){}}}const Yi=new zn,a1=new me;function l1(s,t){function e(p,m){p.matrixAutoUpdate===!0&&p.updateMatrix(),m.value.copy(p.matrix)}function n(p,m){m.color.getRGB(p.fogColor.value,yd(s)),m.isFog?(p.fogNear.value=m.near,p.fogFar.value=m.far):m.isFogExp2&&(p.fogDensity.value=m.density)}function i(p,m,y,x,v){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(p,m):m.isMeshToonMaterial?(r(p,m),u(p,m)):m.isMeshPhongMaterial?(r(p,m),h(p,m)):m.isMeshStandardMaterial?(r(p,m),d(p,m),m.isMeshPhysicalMaterial&&f(p,m,v)):m.isMeshMatcapMaterial?(r(p,m),g(p,m)):m.isMeshDepthMaterial?r(p,m):m.isMeshDistanceMaterial?(r(p,m),_(p,m)):m.isMeshNormalMaterial?r(p,m):m.isLineBasicMaterial?(o(p,m),m.isLineDashedMaterial&&a(p,m)):m.isPointsMaterial?l(p,m,y,x):m.isSpriteMaterial?c(p,m):m.isShadowMaterial?(p.color.value.copy(m.color),p.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(p,m){p.opacity.value=m.opacity,m.color&&p.diffuse.value.copy(m.color),m.emissive&&p.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.bumpMap&&(p.bumpMap.value=m.bumpMap,e(m.bumpMap,p.bumpMapTransform),p.bumpScale.value=m.bumpScale,m.side===Ye&&(p.bumpScale.value*=-1)),m.normalMap&&(p.normalMap.value=m.normalMap,e(m.normalMap,p.normalMapTransform),p.normalScale.value.copy(m.normalScale),m.side===Ye&&p.normalScale.value.negate()),m.displacementMap&&(p.displacementMap.value=m.displacementMap,e(m.displacementMap,p.displacementMapTransform),p.displacementScale.value=m.displacementScale,p.displacementBias.value=m.displacementBias),m.emissiveMap&&(p.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,p.emissiveMapTransform)),m.specularMap&&(p.specularMap.value=m.specularMap,e(m.specularMap,p.specularMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest);const y=t.get(m),x=y.envMap,v=y.envMapRotation;x&&(p.envMap.value=x,Yi.copy(v),Yi.x*=-1,Yi.y*=-1,Yi.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Yi.y*=-1,Yi.z*=-1),p.envMapRotation.value.setFromMatrix4(a1.makeRotationFromEuler(Yi)),p.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=m.reflectivity,p.ior.value=m.ior,p.refractionRatio.value=m.refractionRatio),m.lightMap&&(p.lightMap.value=m.lightMap,p.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,p.lightMapTransform)),m.aoMap&&(p.aoMap.value=m.aoMap,p.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,p.aoMapTransform))}function o(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform))}function a(p,m){p.dashSize.value=m.dashSize,p.totalSize.value=m.dashSize+m.gapSize,p.scale.value=m.scale}function l(p,m,y,x){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.size.value=m.size*y,p.scale.value=x*.5,m.map&&(p.map.value=m.map,e(m.map,p.uvTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function c(p,m){p.diffuse.value.copy(m.color),p.opacity.value=m.opacity,p.rotation.value=m.rotation,m.map&&(p.map.value=m.map,e(m.map,p.mapTransform)),m.alphaMap&&(p.alphaMap.value=m.alphaMap,e(m.alphaMap,p.alphaMapTransform)),m.alphaTest>0&&(p.alphaTest.value=m.alphaTest)}function h(p,m){p.specular.value.copy(m.specular),p.shininess.value=Math.max(m.shininess,1e-4)}function u(p,m){m.gradientMap&&(p.gradientMap.value=m.gradientMap)}function d(p,m){p.metalness.value=m.metalness,m.metalnessMap&&(p.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,p.metalnessMapTransform)),p.roughness.value=m.roughness,m.roughnessMap&&(p.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,p.roughnessMapTransform)),m.envMap&&(p.envMapIntensity.value=m.envMapIntensity)}function f(p,m,y){p.ior.value=m.ior,m.sheen>0&&(p.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),p.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(p.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,p.sheenColorMapTransform)),m.sheenRoughnessMap&&(p.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,p.sheenRoughnessMapTransform))),m.clearcoat>0&&(p.clearcoat.value=m.clearcoat,p.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(p.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,p.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(p.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Ye&&p.clearcoatNormalScale.value.negate())),m.dispersion>0&&(p.dispersion.value=m.dispersion),m.iridescence>0&&(p.iridescence.value=m.iridescence,p.iridescenceIOR.value=m.iridescenceIOR,p.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(p.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,p.iridescenceMapTransform)),m.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),m.transmission>0&&(p.transmission.value=m.transmission,p.transmissionSamplerMap.value=y.texture,p.transmissionSamplerSize.value.set(y.width,y.height),m.transmissionMap&&(p.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,p.transmissionMapTransform)),p.thickness.value=m.thickness,m.thicknessMap&&(p.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=m.attenuationDistance,p.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(p.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(p.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=m.specularIntensity,p.specularColor.value.copy(m.specularColor),m.specularColorMap&&(p.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,p.specularColorMapTransform)),m.specularIntensityMap&&(p.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,m){m.matcap&&(p.matcap.value=m.matcap)}function _(p,m){const y=t.get(m).light;p.referencePosition.value.setFromMatrixPosition(y.matrixWorld),p.nearDistance.value=y.shadow.camera.near,p.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function c1(s,t,e,n){let i={},r={},o=[];const a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,x){const v=x.program;n.uniformBlockBinding(y,v)}function c(y,x){let v=i[y.id];v===void 0&&(g(y),v=h(y),i[y.id]=v,y.addEventListener("dispose",p));const E=x.program;n.updateUBOMapping(y,E);const R=t.render.frame;r[y.id]!==R&&(d(y),r[y.id]=R)}function h(y){const x=u();y.__bindingPointIndex=x;const v=s.createBuffer(),E=y.__size,R=y.usage;return s.bindBuffer(s.UNIFORM_BUFFER,v),s.bufferData(s.UNIFORM_BUFFER,E,R),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,x,v),v}function u(){for(let y=0;y<a;y++)if(o.indexOf(y)===-1)return o.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const x=i[y.id],v=y.uniforms,E=y.__cache;s.bindBuffer(s.UNIFORM_BUFFER,x);for(let R=0,T=v.length;R<T;R++){const C=Array.isArray(v[R])?v[R]:[v[R]];for(let M=0,S=C.length;M<S;M++){const L=C[M];if(f(L,R,M,E)===!0){const F=L.__offset,O=Array.isArray(L.value)?L.value:[L.value];let z=0;for(let W=0;W<O.length;W++){const H=O[W],Y=_(H);typeof H=="number"||typeof H=="boolean"?(L.__data[0]=H,s.bufferSubData(s.UNIFORM_BUFFER,F+z,L.__data)):H.isMatrix3?(L.__data[0]=H.elements[0],L.__data[1]=H.elements[1],L.__data[2]=H.elements[2],L.__data[3]=0,L.__data[4]=H.elements[3],L.__data[5]=H.elements[4],L.__data[6]=H.elements[5],L.__data[7]=0,L.__data[8]=H.elements[6],L.__data[9]=H.elements[7],L.__data[10]=H.elements[8],L.__data[11]=0):(H.toArray(L.__data,z),z+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,F,L.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(y,x,v,E){const R=y.value,T=x+"_"+v;if(E[T]===void 0)return typeof R=="number"||typeof R=="boolean"?E[T]=R:E[T]=R.clone(),!0;{const C=E[T];if(typeof R=="number"||typeof R=="boolean"){if(C!==R)return E[T]=R,!0}else if(C.equals(R)===!1)return C.copy(R),!0}return!1}function g(y){const x=y.uniforms;let v=0;const E=16;for(let T=0,C=x.length;T<C;T++){const M=Array.isArray(x[T])?x[T]:[x[T]];for(let S=0,L=M.length;S<L;S++){const F=M[S],O=Array.isArray(F.value)?F.value:[F.value];for(let z=0,W=O.length;z<W;z++){const H=O[z],Y=_(H),G=v%E,ht=G%Y.boundary,pt=G+ht;v+=ht,pt!==0&&E-pt<Y.storage&&(v+=E-pt),F.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=v,v+=Y.storage}}}const R=v%E;return R>0&&(v+=E-R),y.__size=v,y.__cache={},this}function _(y){const x={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(x.boundary=4,x.storage=4):y.isVector2?(x.boundary=8,x.storage=8):y.isVector3||y.isColor?(x.boundary=16,x.storage=12):y.isVector4?(x.boundary=16,x.storage=16):y.isMatrix3?(x.boundary=48,x.storage=48):y.isMatrix4?(x.boundary=64,x.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),x}function p(y){const x=y.target;x.removeEventListener("dispose",p);const v=o.indexOf(x.__bindingPointIndex);o.splice(v,1),s.deleteBuffer(i[x.id]),delete i[x.id],delete r[x.id]}function m(){for(const y in i)s.deleteBuffer(i[y]);o=[],i={},r={}}return{bind:l,update:c,dispose:m}}class h1{constructor(t={}){const{canvas:e=om(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=t;this.isWebGLRenderer=!0;let f;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=n.getContextAttributes().alpha}else f=o;const g=new Uint32Array(4),_=new Int32Array(4);let p=null,m=null;const y=[],x=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Pe,this.toneMapping=Li,this.toneMappingExposure=1;const v=this;let E=!1,R=0,T=0,C=null,M=-1,S=null;const L=new fe,F=new fe;let O=null;const z=new Vt(0);let W=0,H=e.width,Y=e.height,G=1,ht=null,pt=null;const Mt=new fe(0,0,H,Y),Ot=new fe(0,0,H,Y);let Qt=!1;const $=new lh;let lt=!1,Rt=!1;this.transmissionResolutionScale=1;const ft=new me,It=new me,te=new A,Dt=new fe,re={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let rt=!1;function et(){return C===null?G:1}let D=n;function Pt(w,U){return e.getContext(w,U)}try{const w={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Zc}`),e.addEventListener("webglcontextlost",K,!1),e.addEventListener("webglcontextrestored",yt,!1),e.addEventListener("webglcontextcreationerror",xt,!1),D===null){const U="webgl2";if(D=Pt(U,w),D===null)throw Pt(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let ot,bt,ut,Ft,vt,P,b,k,Z,tt,J,Ct,mt,St,Jt,ct,Tt,kt,zt,Et,Kt,Xt,ge,I;function gt(){ot=new yx(D),ot.init(),Xt=new n1(D,ot),bt=new dx(D,ot,t,Xt),ut=new t1(D,ot),bt.reverseDepthBuffer&&d&&ut.buffers.depth.setReversed(!0),Ft=new bx(D),vt=new Hy,P=new e1(D,ot,ut,vt,bt,Xt,Ft),b=new mx(v),k=new xx(v),Z=new Cg(D),ge=new ux(D,Z),tt=new Mx(D,Z,Ft,ge),J=new Tx(D,tt,Z,Ft),zt=new wx(D,bt,P),ct=new px(vt),Ct=new By(v,b,k,ot,bt,ge,ct),mt=new l1(v,vt),St=new Gy,Jt=new Zy(ot),kt=new hx(v,b,k,ut,J,f,l),Tt=new Ky(v,J,bt),I=new c1(D,Ft,bt,ut),Et=new fx(D,ot,Ft),Kt=new Sx(D,ot,Ft),Ft.programs=Ct.programs,v.capabilities=bt,v.extensions=ot,v.properties=vt,v.renderLists=St,v.shadowMap=Tt,v.state=ut,v.info=Ft}gt();const q=new o1(v,D);this.xr=q,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const w=ot.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=ot.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return G},this.setPixelRatio=function(w){w!==void 0&&(G=w,this.setSize(H,Y,!1))},this.getSize=function(w){return w.set(H,Y)},this.setSize=function(w,U,B=!0){if(q.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}H=w,Y=U,e.width=Math.floor(w*G),e.height=Math.floor(U*G),B===!0&&(e.style.width=w+"px",e.style.height=U+"px"),this.setViewport(0,0,w,U)},this.getDrawingBufferSize=function(w){return w.set(H*G,Y*G).floor()},this.setDrawingBufferSize=function(w,U,B){H=w,Y=U,G=B,e.width=Math.floor(w*B),e.height=Math.floor(U*B),this.setViewport(0,0,w,U)},this.getCurrentViewport=function(w){return w.copy(L)},this.getViewport=function(w){return w.copy(Mt)},this.setViewport=function(w,U,B,V){w.isVector4?Mt.set(w.x,w.y,w.z,w.w):Mt.set(w,U,B,V),ut.viewport(L.copy(Mt).multiplyScalar(G).round())},this.getScissor=function(w){return w.copy(Ot)},this.setScissor=function(w,U,B,V){w.isVector4?Ot.set(w.x,w.y,w.z,w.w):Ot.set(w,U,B,V),ut.scissor(F.copy(Ot).multiplyScalar(G).round())},this.getScissorTest=function(){return Qt},this.setScissorTest=function(w){ut.setScissorTest(Qt=w)},this.setOpaqueSort=function(w){ht=w},this.setTransparentSort=function(w){pt=w},this.getClearColor=function(w){return w.copy(kt.getClearColor())},this.setClearColor=function(){kt.setClearColor(...arguments)},this.getClearAlpha=function(){return kt.getClearAlpha()},this.setClearAlpha=function(){kt.setClearAlpha(...arguments)},this.clear=function(w=!0,U=!0,B=!0){let V=0;if(w){let N=!1;if(C!==null){const at=C.texture.format;N=at===eh||at===th||at===Qc}if(N){const at=C.texture.type,_t=at===pi||at===us||at===Wr||at===ir||at===jc||at===Kc,wt=kt.getClearColor(),At=kt.getClearAlpha(),Bt=wt.r,Ht=wt.g,Ut=wt.b;_t?(g[0]=Bt,g[1]=Ht,g[2]=Ut,g[3]=At,D.clearBufferuiv(D.COLOR,0,g)):(_[0]=Bt,_[1]=Ht,_[2]=Ut,_[3]=At,D.clearBufferiv(D.COLOR,0,_))}else V|=D.COLOR_BUFFER_BIT}U&&(V|=D.DEPTH_BUFFER_BIT),B&&(V|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",K,!1),e.removeEventListener("webglcontextrestored",yt,!1),e.removeEventListener("webglcontextcreationerror",xt,!1),kt.dispose(),St.dispose(),Jt.dispose(),vt.dispose(),b.dispose(),k.dispose(),J.dispose(),ge.dispose(),I.dispose(),Ct.dispose(),q.dispose(),q.removeEventListener("sessionstart",qh),q.removeEventListener("sessionend",Yh),Bi.stop()};function K(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),E=!0}function yt(){console.log("THREE.WebGLRenderer: Context Restored."),E=!1;const w=Ft.autoReset,U=Tt.enabled,B=Tt.autoUpdate,V=Tt.needsUpdate,N=Tt.type;gt(),Ft.autoReset=w,Tt.enabled=U,Tt.autoUpdate=B,Tt.needsUpdate=V,Tt.type=N}function xt(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Gt(w){const U=w.target;U.removeEventListener("dispose",Gt),Te(U)}function Te(w){Ge(w),vt.remove(w)}function Ge(w){const U=vt.get(w).programs;U!==void 0&&(U.forEach(function(B){Ct.releaseProgram(B)}),w.isShaderMaterial&&Ct.releaseShaderCache(w))}this.renderBufferDirect=function(w,U,B,V,N,at){U===null&&(U=re);const _t=N.isMesh&&N.matrixWorld.determinant()<0,wt=Jp(w,U,B,V,N);ut.setMaterial(V,_t);let At=B.index,Bt=1;if(V.wireframe===!0){if(At=tt.getWireframeAttribute(B),At===void 0)return;Bt=2}const Ht=B.drawRange,Ut=B.attributes.position;let ee=Ht.start*Bt,oe=(Ht.start+Ht.count)*Bt;at!==null&&(ee=Math.max(ee,at.start*Bt),oe=Math.min(oe,(at.start+at.count)*Bt)),At!==null?(ee=Math.max(ee,0),oe=Math.min(oe,At.count)):Ut!=null&&(ee=Math.max(ee,0),oe=Math.min(oe,Ut.count));const Le=oe-ee;if(Le<0||Le===1/0)return;ge.setup(N,V,wt,B,At);let Ee,ie=Et;if(At!==null&&(Ee=Z.get(At),ie=Kt,ie.setIndex(Ee)),N.isMesh)V.wireframe===!0?(ut.setLineWidth(V.wireframeLinewidth*et()),ie.setMode(D.LINES)):ie.setMode(D.TRIANGLES);else if(N.isLine){let Nt=V.linewidth;Nt===void 0&&(Nt=1),ut.setLineWidth(Nt*et()),N.isLineSegments?ie.setMode(D.LINES):N.isLineLoop?ie.setMode(D.LINE_LOOP):ie.setMode(D.LINE_STRIP)}else N.isPoints?ie.setMode(D.POINTS):N.isSprite&&ie.setMode(D.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)Ji("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),ie.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(ot.get("WEBGL_multi_draw"))ie.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const Nt=N._multiDrawStarts,ze=N._multiDrawCounts,ae=N._multiDrawCount,Pn=At?Z.get(At).bytesPerElement:1,xs=vt.get(V).currentProgram.getUniforms();for(let hn=0;hn<ae;hn++)xs.setValue(D,"_gl_DrawID",hn),ie.render(Nt[hn]/Pn,ze[hn])}else if(N.isInstancedMesh)ie.renderInstances(ee,Le,N.count);else if(B.isInstancedBufferGeometry){const Nt=B._maxInstanceCount!==void 0?B._maxInstanceCount:1/0,ze=Math.min(B.instanceCount,Nt);ie.renderInstances(ee,Le,ze)}else ie.render(ee,Le)};function le(w,U,B){w.transparent===!0&&w.side===Un&&w.forceSinglePass===!1?(w.side=Ye,w.needsUpdate=!0,go(w,U,B),w.side=di,w.needsUpdate=!0,go(w,U,B),w.side=Un):go(w,U,B)}this.compile=function(w,U,B=null){B===null&&(B=w),m=Jt.get(B),m.init(U),x.push(m),B.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(m.pushLight(N),N.castShadow&&m.pushShadow(N))}),w!==B&&w.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(m.pushLight(N),N.castShadow&&m.pushShadow(N))}),m.setupLights();const V=new Set;return w.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const at=N.material;if(at)if(Array.isArray(at))for(let _t=0;_t<at.length;_t++){const wt=at[_t];le(wt,B,N),V.add(wt)}else le(at,B,N),V.add(at)}),m=x.pop(),V},this.compileAsync=function(w,U,B=null){const V=this.compile(w,U,B);return new Promise(N=>{function at(){if(V.forEach(function(_t){vt.get(_t).currentProgram.isReady()&&V.delete(_t)}),V.size===0){N(w);return}setTimeout(at,10)}ot.get("KHR_parallel_shader_compile")!==null?at():setTimeout(at,10)})};let Cn=null;function jn(w){Cn&&Cn(w)}function qh(){Bi.stop()}function Yh(){Bi.start()}const Bi=new Od;Bi.setAnimationLoop(jn),typeof self<"u"&&Bi.setContext(self),this.setAnimationLoop=function(w){Cn=w,q.setAnimationLoop(w),w===null?Bi.stop():Bi.start()},q.addEventListener("sessionstart",qh),q.addEventListener("sessionend",Yh),this.render=function(w,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(E===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),q.enabled===!0&&q.isPresenting===!0&&(q.cameraAutoUpdate===!0&&q.updateCamera(U),U=q.getCamera()),w.isScene===!0&&w.onBeforeRender(v,w,U,C),m=Jt.get(w,x.length),m.init(U),x.push(m),It.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),$.setFromProjectionMatrix(It),Rt=this.localClippingEnabled,lt=ct.init(this.clippingPlanes,Rt),p=St.get(w,y.length),p.init(),y.push(p),q.enabled===!0&&q.isPresenting===!0){const at=v.xr.getDepthSensingMesh();at!==null&&Va(at,U,-1/0,v.sortObjects)}Va(w,U,0,v.sortObjects),p.finish(),v.sortObjects===!0&&p.sort(ht,pt),rt=q.enabled===!1||q.isPresenting===!1||q.hasDepthSensing()===!1,rt&&kt.addToRenderList(p,w),this.info.render.frame++,lt===!0&&ct.beginShadows();const B=m.state.shadowsArray;Tt.render(B,w,U),lt===!0&&ct.endShadows(),this.info.autoReset===!0&&this.info.reset();const V=p.opaque,N=p.transmissive;if(m.setupLights(),U.isArrayCamera){const at=U.cameras;if(N.length>0)for(let _t=0,wt=at.length;_t<wt;_t++){const At=at[_t];Zh(V,N,w,At)}rt&&kt.render(w);for(let _t=0,wt=at.length;_t<wt;_t++){const At=at[_t];$h(p,w,At,At.viewport)}}else N.length>0&&Zh(V,N,w,U),rt&&kt.render(w),$h(p,w,U);C!==null&&T===0&&(P.updateMultisampleRenderTarget(C),P.updateRenderTargetMipmap(C)),w.isScene===!0&&w.onAfterRender(v,w,U),ge.resetDefaultState(),M=-1,S=null,x.pop(),x.length>0?(m=x[x.length-1],lt===!0&&ct.setGlobalState(v.clippingPlanes,m.state.camera)):m=null,y.pop(),y.length>0?p=y[y.length-1]:p=null};function Va(w,U,B,V){if(w.visible===!1)return;if(w.layers.test(U.layers)){if(w.isGroup)B=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(U);else if(w.isLight)m.pushLight(w),w.castShadow&&m.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||$.intersectsSprite(w)){V&&Dt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(It);const _t=J.update(w),wt=w.material;wt.visible&&p.push(w,_t,wt,B,Dt.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||$.intersectsObject(w))){const _t=J.update(w),wt=w.material;if(V&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),Dt.copy(w.boundingSphere.center)):(_t.boundingSphere===null&&_t.computeBoundingSphere(),Dt.copy(_t.boundingSphere.center)),Dt.applyMatrix4(w.matrixWorld).applyMatrix4(It)),Array.isArray(wt)){const At=_t.groups;for(let Bt=0,Ht=At.length;Bt<Ht;Bt++){const Ut=At[Bt],ee=wt[Ut.materialIndex];ee&&ee.visible&&p.push(w,_t,ee,B,Dt.z,Ut)}}else wt.visible&&p.push(w,_t,wt,B,Dt.z,null)}}const at=w.children;for(let _t=0,wt=at.length;_t<wt;_t++)Va(at[_t],U,B,V)}function $h(w,U,B,V){const N=w.opaque,at=w.transmissive,_t=w.transparent;m.setupLightsView(B),lt===!0&&ct.setGlobalState(v.clippingPlanes,B),V&&ut.viewport(L.copy(V)),N.length>0&&mo(N,U,B),at.length>0&&mo(at,U,B),_t.length>0&&mo(_t,U,B),ut.buffers.depth.setTest(!0),ut.buffers.depth.setMask(!0),ut.buffers.color.setMask(!0),ut.setPolygonOffset(!1)}function Zh(w,U,B,V){if((B.isScene===!0?B.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[V.id]===void 0&&(m.state.transmissionRenderTarget[V.id]=new fs(1,1,{generateMipmaps:!0,type:ot.has("EXT_color_buffer_half_float")||ot.has("EXT_color_buffer_float")?lo:pi,minFilter:is,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:se.workingColorSpace}));const at=m.state.transmissionRenderTarget[V.id],_t=V.viewport||L;at.setSize(_t.z*v.transmissionResolutionScale,_t.w*v.transmissionResolutionScale);const wt=v.getRenderTarget();v.setRenderTarget(at),v.getClearColor(z),W=v.getClearAlpha(),W<1&&v.setClearColor(16777215,.5),v.clear(),rt&&kt.render(B);const At=v.toneMapping;v.toneMapping=Li;const Bt=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),m.setupLightsView(V),lt===!0&&ct.setGlobalState(v.clippingPlanes,V),mo(w,B,V),P.updateMultisampleRenderTarget(at),P.updateRenderTargetMipmap(at),ot.has("WEBGL_multisampled_render_to_texture")===!1){let Ht=!1;for(let Ut=0,ee=U.length;Ut<ee;Ut++){const oe=U[Ut],Le=oe.object,Ee=oe.geometry,ie=oe.material,Nt=oe.group;if(ie.side===Un&&Le.layers.test(V.layers)){const ze=ie.side;ie.side=Ye,ie.needsUpdate=!0,Jh(Le,B,V,Ee,ie,Nt),ie.side=ze,ie.needsUpdate=!0,Ht=!0}}Ht===!0&&(P.updateMultisampleRenderTarget(at),P.updateRenderTargetMipmap(at))}v.setRenderTarget(wt),v.setClearColor(z,W),Bt!==void 0&&(V.viewport=Bt),v.toneMapping=At}function mo(w,U,B){const V=U.isScene===!0?U.overrideMaterial:null;for(let N=0,at=w.length;N<at;N++){const _t=w[N],wt=_t.object,At=_t.geometry,Bt=V===null?_t.material:V,Ht=_t.group;wt.layers.test(B.layers)&&Jh(wt,U,B,At,Bt,Ht)}}function Jh(w,U,B,V,N,at){w.onBeforeRender(v,U,B,V,N,at),w.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),N.onBeforeRender(v,U,B,V,w,at),N.transparent===!0&&N.side===Un&&N.forceSinglePass===!1?(N.side=Ye,N.needsUpdate=!0,v.renderBufferDirect(B,U,V,N,w,at),N.side=di,N.needsUpdate=!0,v.renderBufferDirect(B,U,V,N,w,at),N.side=Un):v.renderBufferDirect(B,U,V,N,w,at),w.onAfterRender(v,U,B,V,N,at)}function go(w,U,B){U.isScene!==!0&&(U=re);const V=vt.get(w),N=m.state.lights,at=m.state.shadowsArray,_t=N.state.version,wt=Ct.getParameters(w,N.state,at,U,B),At=Ct.getProgramCacheKey(wt);let Bt=V.programs;V.environment=w.isMeshStandardMaterial?U.environment:null,V.fog=U.fog,V.envMap=(w.isMeshStandardMaterial?k:b).get(w.envMap||V.environment),V.envMapRotation=V.environment!==null&&w.envMap===null?U.environmentRotation:w.envMapRotation,Bt===void 0&&(w.addEventListener("dispose",Gt),Bt=new Map,V.programs=Bt);let Ht=Bt.get(At);if(Ht!==void 0){if(V.currentProgram===Ht&&V.lightsStateVersion===_t)return Kh(w,wt),Ht}else wt.uniforms=Ct.getUniforms(w),w.onBeforeCompile(wt,v),Ht=Ct.acquireProgram(wt,At),Bt.set(At,Ht),V.uniforms=wt.uniforms;const Ut=V.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Ut.clippingPlanes=ct.uniform),Kh(w,wt),V.needsLights=Kp(w),V.lightsStateVersion=_t,V.needsLights&&(Ut.ambientLightColor.value=N.state.ambient,Ut.lightProbe.value=N.state.probe,Ut.directionalLights.value=N.state.directional,Ut.directionalLightShadows.value=N.state.directionalShadow,Ut.spotLights.value=N.state.spot,Ut.spotLightShadows.value=N.state.spotShadow,Ut.rectAreaLights.value=N.state.rectArea,Ut.ltc_1.value=N.state.rectAreaLTC1,Ut.ltc_2.value=N.state.rectAreaLTC2,Ut.pointLights.value=N.state.point,Ut.pointLightShadows.value=N.state.pointShadow,Ut.hemisphereLights.value=N.state.hemi,Ut.directionalShadowMap.value=N.state.directionalShadowMap,Ut.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Ut.spotShadowMap.value=N.state.spotShadowMap,Ut.spotLightMatrix.value=N.state.spotLightMatrix,Ut.spotLightMap.value=N.state.spotLightMap,Ut.pointShadowMap.value=N.state.pointShadowMap,Ut.pointShadowMatrix.value=N.state.pointShadowMatrix),V.currentProgram=Ht,V.uniformsList=null,Ht}function jh(w){if(w.uniformsList===null){const U=w.currentProgram.getUniforms();w.uniformsList=sa.seqWithValue(U.seq,w.uniforms)}return w.uniformsList}function Kh(w,U){const B=vt.get(w);B.outputColorSpace=U.outputColorSpace,B.batching=U.batching,B.batchingColor=U.batchingColor,B.instancing=U.instancing,B.instancingColor=U.instancingColor,B.instancingMorph=U.instancingMorph,B.skinning=U.skinning,B.morphTargets=U.morphTargets,B.morphNormals=U.morphNormals,B.morphColors=U.morphColors,B.morphTargetsCount=U.morphTargetsCount,B.numClippingPlanes=U.numClippingPlanes,B.numIntersection=U.numClipIntersection,B.vertexAlphas=U.vertexAlphas,B.vertexTangents=U.vertexTangents,B.toneMapping=U.toneMapping}function Jp(w,U,B,V,N){U.isScene!==!0&&(U=re),P.resetTextureUnits();const at=U.fog,_t=V.isMeshStandardMaterial?U.environment:null,wt=C===null?v.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:rr,At=(V.isMeshStandardMaterial?k:b).get(V.envMap||_t),Bt=V.vertexColors===!0&&!!B.attributes.color&&B.attributes.color.itemSize===4,Ht=!!B.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Ut=!!B.morphAttributes.position,ee=!!B.morphAttributes.normal,oe=!!B.morphAttributes.color;let Le=Li;V.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(Le=v.toneMapping);const Ee=B.morphAttributes.position||B.morphAttributes.normal||B.morphAttributes.color,ie=Ee!==void 0?Ee.length:0,Nt=vt.get(V),ze=m.state.lights;if(lt===!0&&(Rt===!0||w!==S)){const Je=w===S&&V.id===M;ct.setState(V,w,Je)}let ae=!1;V.version===Nt.__version?(Nt.needsLights&&Nt.lightsStateVersion!==ze.state.version||Nt.outputColorSpace!==wt||N.isBatchedMesh&&Nt.batching===!1||!N.isBatchedMesh&&Nt.batching===!0||N.isBatchedMesh&&Nt.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Nt.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Nt.instancing===!1||!N.isInstancedMesh&&Nt.instancing===!0||N.isSkinnedMesh&&Nt.skinning===!1||!N.isSkinnedMesh&&Nt.skinning===!0||N.isInstancedMesh&&Nt.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Nt.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Nt.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Nt.instancingMorph===!1&&N.morphTexture!==null||Nt.envMap!==At||V.fog===!0&&Nt.fog!==at||Nt.numClippingPlanes!==void 0&&(Nt.numClippingPlanes!==ct.numPlanes||Nt.numIntersection!==ct.numIntersection)||Nt.vertexAlphas!==Bt||Nt.vertexTangents!==Ht||Nt.morphTargets!==Ut||Nt.morphNormals!==ee||Nt.morphColors!==oe||Nt.toneMapping!==Le||Nt.morphTargetsCount!==ie)&&(ae=!0):(ae=!0,Nt.__version=V.version);let Pn=Nt.currentProgram;ae===!0&&(Pn=go(V,U,N));let xs=!1,hn=!1,mr=!1;const ve=Pn.getUniforms(),Mn=Nt.uniforms;if(ut.useProgram(Pn.program)&&(xs=!0,hn=!0,mr=!0),V.id!==M&&(M=V.id,hn=!0),xs||S!==w){ut.buffers.depth.getReversed()?(ft.copy(w.projectionMatrix),lm(ft),cm(ft),ve.setValue(D,"projectionMatrix",ft)):ve.setValue(D,"projectionMatrix",w.projectionMatrix),ve.setValue(D,"viewMatrix",w.matrixWorldInverse);const en=ve.map.cameraPosition;en!==void 0&&en.setValue(D,te.setFromMatrixPosition(w.matrixWorld)),bt.logarithmicDepthBuffer&&ve.setValue(D,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&ve.setValue(D,"isOrthographic",w.isOrthographicCamera===!0),S!==w&&(S=w,hn=!0,mr=!0)}if(N.isSkinnedMesh){ve.setOptional(D,N,"bindMatrix"),ve.setOptional(D,N,"bindMatrixInverse");const Je=N.skeleton;Je&&(Je.boneTexture===null&&Je.computeBoneTexture(),ve.setValue(D,"boneTexture",Je.boneTexture,P))}N.isBatchedMesh&&(ve.setOptional(D,N,"batchingTexture"),ve.setValue(D,"batchingTexture",N._matricesTexture,P),ve.setOptional(D,N,"batchingIdTexture"),ve.setValue(D,"batchingIdTexture",N._indirectTexture,P),ve.setOptional(D,N,"batchingColorTexture"),N._colorsTexture!==null&&ve.setValue(D,"batchingColorTexture",N._colorsTexture,P));const Sn=B.morphAttributes;if((Sn.position!==void 0||Sn.normal!==void 0||Sn.color!==void 0)&&zt.update(N,B,Pn),(hn||Nt.receiveShadow!==N.receiveShadow)&&(Nt.receiveShadow=N.receiveShadow,ve.setValue(D,"receiveShadow",N.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(Mn.envMap.value=At,Mn.flipEnvMap.value=At.isCubeTexture&&At.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&U.environment!==null&&(Mn.envMapIntensity.value=U.environmentIntensity),hn&&(ve.setValue(D,"toneMappingExposure",v.toneMappingExposure),Nt.needsLights&&jp(Mn,mr),at&&V.fog===!0&&mt.refreshFogUniforms(Mn,at),mt.refreshMaterialUniforms(Mn,V,G,Y,m.state.transmissionRenderTarget[w.id]),sa.upload(D,jh(Nt),Mn,P)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(sa.upload(D,jh(Nt),Mn,P),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&ve.setValue(D,"center",N.center),ve.setValue(D,"modelViewMatrix",N.modelViewMatrix),ve.setValue(D,"normalMatrix",N.normalMatrix),ve.setValue(D,"modelMatrix",N.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const Je=V.uniformsGroups;for(let en=0,Ga=Je.length;en<Ga;en++){const Hi=Je[en];I.update(Hi,Pn),I.bind(Hi,Pn)}}return Pn}function jp(w,U){w.ambientLightColor.needsUpdate=U,w.lightProbe.needsUpdate=U,w.directionalLights.needsUpdate=U,w.directionalLightShadows.needsUpdate=U,w.pointLights.needsUpdate=U,w.pointLightShadows.needsUpdate=U,w.spotLights.needsUpdate=U,w.spotLightShadows.needsUpdate=U,w.rectAreaLights.needsUpdate=U,w.hemisphereLights.needsUpdate=U}function Kp(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return T},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(w,U,B){vt.get(w.texture).__webglTexture=U,vt.get(w.depthTexture).__webglTexture=B;const V=vt.get(w);V.__hasExternalTextures=!0,V.__autoAllocateDepthBuffer=B===void 0,V.__autoAllocateDepthBuffer||ot.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,U){const B=vt.get(w);B.__webglFramebuffer=U,B.__useDefaultFramebuffer=U===void 0};const Qp=D.createFramebuffer();this.setRenderTarget=function(w,U=0,B=0){C=w,R=U,T=B;let V=!0,N=null,at=!1,_t=!1;if(w){const At=vt.get(w);if(At.__useDefaultFramebuffer!==void 0)ut.bindFramebuffer(D.FRAMEBUFFER,null),V=!1;else if(At.__webglFramebuffer===void 0)P.setupRenderTarget(w);else if(At.__hasExternalTextures)P.rebindTextures(w,vt.get(w.texture).__webglTexture,vt.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const Ut=w.depthTexture;if(At.__boundDepthTexture!==Ut){if(Ut!==null&&vt.has(Ut)&&(w.width!==Ut.image.width||w.height!==Ut.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");P.setupDepthRenderbuffer(w)}}const Bt=w.texture;(Bt.isData3DTexture||Bt.isDataArrayTexture||Bt.isCompressedArrayTexture)&&(_t=!0);const Ht=vt.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Ht[U])?N=Ht[U][B]:N=Ht[U],at=!0):w.samples>0&&P.useMultisampledRTT(w)===!1?N=vt.get(w).__webglMultisampledFramebuffer:Array.isArray(Ht)?N=Ht[B]:N=Ht,L.copy(w.viewport),F.copy(w.scissor),O=w.scissorTest}else L.copy(Mt).multiplyScalar(G).floor(),F.copy(Ot).multiplyScalar(G).floor(),O=Qt;if(B!==0&&(N=Qp),ut.bindFramebuffer(D.FRAMEBUFFER,N)&&V&&ut.drawBuffers(w,N),ut.viewport(L),ut.scissor(F),ut.setScissorTest(O),at){const At=vt.get(w.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+U,At.__webglTexture,B)}else if(_t){const At=vt.get(w.texture),Bt=U;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,At.__webglTexture,B,Bt)}else if(w!==null&&B!==0){const At=vt.get(w.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,At.__webglTexture,B)}M=-1},this.readRenderTargetPixels=function(w,U,B,V,N,at,_t){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let wt=vt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&_t!==void 0&&(wt=wt[_t]),wt){ut.bindFramebuffer(D.FRAMEBUFFER,wt);try{const At=w.texture,Bt=At.format,Ht=At.type;if(!bt.textureFormatReadable(Bt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!bt.textureTypeReadable(Ht)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=w.width-V&&B>=0&&B<=w.height-N&&D.readPixels(U,B,V,N,Xt.convert(Bt),Xt.convert(Ht),at)}finally{const At=C!==null?vt.get(C).__webglFramebuffer:null;ut.bindFramebuffer(D.FRAMEBUFFER,At)}}},this.readRenderTargetPixelsAsync=async function(w,U,B,V,N,at,_t){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let wt=vt.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&_t!==void 0&&(wt=wt[_t]),wt){const At=w.texture,Bt=At.format,Ht=At.type;if(!bt.textureFormatReadable(Bt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!bt.textureTypeReadable(Ht))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(U>=0&&U<=w.width-V&&B>=0&&B<=w.height-N){ut.bindFramebuffer(D.FRAMEBUFFER,wt);const Ut=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Ut),D.bufferData(D.PIXEL_PACK_BUFFER,at.byteLength,D.STREAM_READ),D.readPixels(U,B,V,N,Xt.convert(Bt),Xt.convert(Ht),0);const ee=C!==null?vt.get(C).__webglFramebuffer:null;ut.bindFramebuffer(D.FRAMEBUFFER,ee);const oe=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await am(D,oe,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Ut),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,at),D.deleteBuffer(Ut),D.deleteSync(oe),at}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,U=null,B=0){w.isTexture!==!0&&(Ji("WebGLRenderer: copyFramebufferToTexture function signature has changed."),U=arguments[0]||null,w=arguments[1]);const V=Math.pow(2,-B),N=Math.floor(w.image.width*V),at=Math.floor(w.image.height*V),_t=U!==null?U.x:0,wt=U!==null?U.y:0;P.setTexture2D(w,0),D.copyTexSubImage2D(D.TEXTURE_2D,B,0,0,_t,wt,N,at),ut.unbindTexture()};const t0=D.createFramebuffer(),e0=D.createFramebuffer();this.copyTextureToTexture=function(w,U,B=null,V=null,N=0,at=null){w.isTexture!==!0&&(Ji("WebGLRenderer: copyTextureToTexture function signature has changed."),V=arguments[0]||null,w=arguments[1],U=arguments[2],at=arguments[3]||0,B=null),at===null&&(N!==0?(Ji("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),at=N,N=0):at=0);let _t,wt,At,Bt,Ht,Ut,ee,oe,Le;const Ee=w.isCompressedTexture?w.mipmaps[at]:w.image;if(B!==null)_t=B.max.x-B.min.x,wt=B.max.y-B.min.y,At=B.isBox3?B.max.z-B.min.z:1,Bt=B.min.x,Ht=B.min.y,Ut=B.isBox3?B.min.z:0;else{const Sn=Math.pow(2,-N);_t=Math.floor(Ee.width*Sn),wt=Math.floor(Ee.height*Sn),w.isDataArrayTexture?At=Ee.depth:w.isData3DTexture?At=Math.floor(Ee.depth*Sn):At=1,Bt=0,Ht=0,Ut=0}V!==null?(ee=V.x,oe=V.y,Le=V.z):(ee=0,oe=0,Le=0);const ie=Xt.convert(U.format),Nt=Xt.convert(U.type);let ze;U.isData3DTexture?(P.setTexture3D(U,0),ze=D.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(P.setTexture2DArray(U,0),ze=D.TEXTURE_2D_ARRAY):(P.setTexture2D(U,0),ze=D.TEXTURE_2D),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,U.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,U.unpackAlignment);const ae=D.getParameter(D.UNPACK_ROW_LENGTH),Pn=D.getParameter(D.UNPACK_IMAGE_HEIGHT),xs=D.getParameter(D.UNPACK_SKIP_PIXELS),hn=D.getParameter(D.UNPACK_SKIP_ROWS),mr=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,Ee.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Ee.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Bt),D.pixelStorei(D.UNPACK_SKIP_ROWS,Ht),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Ut);const ve=w.isDataArrayTexture||w.isData3DTexture,Mn=U.isDataArrayTexture||U.isData3DTexture;if(w.isDepthTexture){const Sn=vt.get(w),Je=vt.get(U),en=vt.get(Sn.__renderTarget),Ga=vt.get(Je.__renderTarget);ut.bindFramebuffer(D.READ_FRAMEBUFFER,en.__webglFramebuffer),ut.bindFramebuffer(D.DRAW_FRAMEBUFFER,Ga.__webglFramebuffer);for(let Hi=0;Hi<At;Hi++)ve&&(D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,vt.get(w).__webglTexture,N,Ut+Hi),D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,vt.get(U).__webglTexture,at,Le+Hi)),D.blitFramebuffer(Bt,Ht,_t,wt,ee,oe,_t,wt,D.DEPTH_BUFFER_BIT,D.NEAREST);ut.bindFramebuffer(D.READ_FRAMEBUFFER,null),ut.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else if(N!==0||w.isRenderTargetTexture||vt.has(w)){const Sn=vt.get(w),Je=vt.get(U);ut.bindFramebuffer(D.READ_FRAMEBUFFER,t0),ut.bindFramebuffer(D.DRAW_FRAMEBUFFER,e0);for(let en=0;en<At;en++)ve?D.framebufferTextureLayer(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Sn.__webglTexture,N,Ut+en):D.framebufferTexture2D(D.READ_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Sn.__webglTexture,N),Mn?D.framebufferTextureLayer(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,Je.__webglTexture,at,Le+en):D.framebufferTexture2D(D.DRAW_FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_2D,Je.__webglTexture,at),N!==0?D.blitFramebuffer(Bt,Ht,_t,wt,ee,oe,_t,wt,D.COLOR_BUFFER_BIT,D.NEAREST):Mn?D.copyTexSubImage3D(ze,at,ee,oe,Le+en,Bt,Ht,_t,wt):D.copyTexSubImage2D(ze,at,ee,oe,Bt,Ht,_t,wt);ut.bindFramebuffer(D.READ_FRAMEBUFFER,null),ut.bindFramebuffer(D.DRAW_FRAMEBUFFER,null)}else Mn?w.isDataTexture||w.isData3DTexture?D.texSubImage3D(ze,at,ee,oe,Le,_t,wt,At,ie,Nt,Ee.data):U.isCompressedArrayTexture?D.compressedTexSubImage3D(ze,at,ee,oe,Le,_t,wt,At,ie,Ee.data):D.texSubImage3D(ze,at,ee,oe,Le,_t,wt,At,ie,Nt,Ee):w.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,at,ee,oe,_t,wt,ie,Nt,Ee.data):w.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,at,ee,oe,Ee.width,Ee.height,ie,Ee.data):D.texSubImage2D(D.TEXTURE_2D,at,ee,oe,_t,wt,ie,Nt,Ee);D.pixelStorei(D.UNPACK_ROW_LENGTH,ae),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Pn),D.pixelStorei(D.UNPACK_SKIP_PIXELS,xs),D.pixelStorei(D.UNPACK_SKIP_ROWS,hn),D.pixelStorei(D.UNPACK_SKIP_IMAGES,mr),at===0&&U.generateMipmaps&&D.generateMipmap(ze),ut.unbindTexture()},this.copyTextureToTexture3D=function(w,U,B=null,V=null,N=0){return w.isTexture!==!0&&(Ji("WebGLRenderer: copyTextureToTexture3D function signature has changed."),B=arguments[0]||null,V=arguments[1]||null,w=arguments[2],U=arguments[3],N=arguments[4]||0),Ji('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(w,U,B,V,N)},this.initRenderTarget=function(w){vt.get(w).__webglFramebuffer===void 0&&P.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?P.setTextureCube(w,0):w.isData3DTexture?P.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?P.setTexture2DArray(w,0):P.setTexture2D(w,0),ut.unbindTexture()},this.resetState=function(){R=0,T=0,C=null,ut.reset(),ge.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return hi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorspace=se._getDrawingBufferColorSpace(t),e.unpackColorSpace=se._getUnpackColorSpace()}}function ri(s){if(s===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return s}function Hd(s,t){s.prototype=Object.create(t.prototype),s.prototype.constructor=s,s.__proto__=t}/*!
 * GSAP 3.15.0
 * https://gsap.com
 *
 * @license Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var vn={autoSleep:120,force3D:"auto",nullTargetWarn:1,units:{lineHeight:""}},Kr={duration:.5,overwrite:!1,delay:0},Mh,Ve,xe,An=1e8,pe=1/An,Ic=Math.PI*2,u1=Ic/4,f1=0,Vd=Math.sqrt,d1=Math.cos,p1=Math.sin,ke=function(t){return typeof t=="string"},Re=function(t){return typeof t=="function"},mi=function(t){return typeof t=="number"},Sh=function(t){return typeof t>"u"},Zn=function(t){return typeof t=="object"},rn=function(t){return t!==!1},bh=function(){return typeof window<"u"},qo=function(t){return Re(t)||ke(t)},Gd=typeof ArrayBuffer=="function"&&ArrayBuffer.isView||function(){},Ze=Array.isArray,m1=/random\([^)]+\)/g,g1=/,\s*/g,hf=/(?:-?\.?\d|\.)+/gi,Wd=/[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g,qs=/[-+=.]*\d+[.e-]*\d*[a-z%]*/g,wl=/[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi,Xd=/[+-]=-?[.\d]+/,_1=/[^,'"\[\]\s]+/gi,v1=/^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i,Se,Hn,Uc,wh,xn={},ga={},qd,Yd=function(t){return(ga=lr(t,xn))&&cn},Th=function(t,e){return console.warn("Invalid property",t,"set to",e,"Missing plugin? gsap.registerPlugin()")},Qr=function(t,e){return!e&&console.warn(t)},$d=function(t,e){return t&&(xn[t]=e)&&ga&&(ga[t]=e)||xn},to=function(){return 0},x1={suppressEvents:!0,isStart:!0,kill:!1},ra={suppressEvents:!0,kill:!1},y1={suppressEvents:!0},Eh={},Ii=[],Nc={},Zd,dn={},Tl={},uf=30,oa=[],Ah="",Rh=function(t){var e=t[0],n,i;if(Zn(e)||Re(e)||(t=[t]),!(n=(e._gsap||{}).harness)){for(i=oa.length;i--&&!oa[i].targetTest(e););n=oa[i]}for(i=t.length;i--;)t[i]&&(t[i]._gsap||(t[i]._gsap=new _p(t[i],n)))||t.splice(i,1);return t},os=function(t){return t._gsap||Rh(Rn(t))[0]._gsap},Jd=function(t,e,n){return(n=t[e])&&Re(n)?t[e]():Sh(n)&&t.getAttribute&&t.getAttribute(e)||n},on=function(t,e){return(t=t.split(",")).forEach(e)||t},Ce=function(t){return Math.round(t*1e5)/1e5||0},Me=function(t){return Math.round(t*1e7)/1e7||0},Js=function(t,e){var n=e.charAt(0),i=parseFloat(e.substr(2));return t=parseFloat(t),n==="+"?t+i:n==="-"?t-i:n==="*"?t*i:t/i},M1=function(t,e){for(var n=e.length,i=0;t.indexOf(e[i])<0&&++i<n;);return i<n},_a=function(){var t=Ii.length,e=Ii.slice(0),n,i;for(Nc={},Ii.length=0,n=0;n<t;n++)i=e[n],i&&i._lazy&&(i.render(i._lazy[0],i._lazy[1],!0)._lazy=0)},Ch=function(t){return!!(t._initted||t._startAt||t.add)},jd=function(t,e,n,i){Ii.length&&!Ve&&_a(),t.render(e,n,!!(Ve&&e<0&&Ch(t))),Ii.length&&!Ve&&_a()},Kd=function(t){var e=parseFloat(t);return(e||e===0)&&(t+"").match(_1).length<2?e:ke(t)?t.trim():t},Qd=function(t){return t},yn=function(t,e){for(var n in e)n in t||(t[n]=e[n]);return t},S1=function(t){return function(e,n){for(var i in n)i in e||i==="duration"&&t||i==="ease"||(e[i]=n[i])}},lr=function(t,e){for(var n in e)t[n]=e[n];return t},ff=function s(t,e){for(var n in e)n!=="__proto__"&&n!=="constructor"&&n!=="prototype"&&(t[n]=Zn(e[n])?s(t[n]||(t[n]={}),e[n]):e[n]);return t},va=function(t,e){var n={},i;for(i in t)i in e||(n[i]=t[i]);return n},Hr=function(t){var e=t.parent||Se,n=t.keyframes?S1(Ze(t.keyframes)):yn;if(rn(t.inherit))for(;e;)n(t,e.vars.defaults),e=e.parent||e._dp;return t},b1=function(t,e){for(var n=t.length,i=n===e.length;i&&n--&&t[n]===e[n];);return n<0},tp=function(t,e,n,i,r){var o=t[i],a;if(r)for(a=e[r];o&&o[r]>a;)o=o._prev;return o?(e._next=o._next,o._next=e):(e._next=t[n],t[n]=e),e._next?e._next._prev=e:t[i]=e,e._prev=o,e.parent=e._dp=t,e},Ua=function(t,e,n,i){n===void 0&&(n="_first"),i===void 0&&(i="_last");var r=e._prev,o=e._next;r?r._next=o:t[n]===e&&(t[n]=o),o?o._prev=r:t[i]===e&&(t[i]=r),e._next=e._prev=e.parent=null},Ni=function(t,e){t.parent&&(!e||t.parent.autoRemoveChildren)&&t.parent.remove&&t.parent.remove(t),t._act=0},as=function(t,e){if(t&&(!e||e._end>t._dur||e._start<0))for(var n=t;n;)n._dirty=1,n=n.parent;return t},w1=function(t){for(var e=t.parent;e&&e.parent;)e._dirty=1,e.totalDuration(),e=e.parent;return t},Oc=function(t,e,n,i){return t._startAt&&(Ve?t._startAt.revert(ra):t.vars.immediateRender&&!t.vars.autoRevert||t._startAt.render(e,!0,i))},T1=function s(t){return!t||t._ts&&s(t.parent)},df=function(t){return t._repeat?cr(t._tTime,t=t.duration()+t._rDelay)*t:0},cr=function(t,e){var n=Math.floor(t=Me(t/e));return t&&n===t?n-1:n},xa=function(t,e){return(t-e._start)*e._ts+(e._ts>=0?0:e._dirty?e.totalDuration():e._tDur)},Na=function(t){return t._end=Me(t._start+(t._tDur/Math.abs(t._ts||t._rts||pe)||0))},Oa=function(t,e){var n=t._dp;return n&&n.smoothChildTiming&&t._ts&&(t._start=Me(n._time-(t._ts>0?e/t._ts:((t._dirty?t.totalDuration():t._tDur)-e)/-t._ts)),Na(t),n._dirty||as(n,t)),t},ep=function(t,e){var n;if((e._time||!e._dur&&e._initted||e._start<t._time&&(e._dur||!e.add))&&(n=xa(t.rawTime(),e),(!e._dur||fo(0,e.totalDuration(),n)-e._tTime>pe)&&e.render(n,!0)),as(t,e)._dp&&t._initted&&t._time>=t._dur&&t._ts){if(t._dur<t.duration())for(n=t;n._dp;)n.rawTime()>=0&&n.totalTime(n._tTime),n=n._dp;t._zTime=-pe}},Gn=function(t,e,n,i){return e.parent&&Ni(e),e._start=Me((mi(n)?n:n||t!==Se?Tn(t,n,e):t._time)+e._delay),e._end=Me(e._start+(e.totalDuration()/Math.abs(e.timeScale())||0)),tp(t,e,"_first","_last",t._sort?"_start":0),Fc(e)||(t._recent=e),i||ep(t,e),t._ts<0&&Oa(t,t._tTime),t},np=function(t,e){return(xn.ScrollTrigger||Th("scrollTrigger",e))&&xn.ScrollTrigger.create(e,t)},ip=function(t,e,n,i,r){if(Dh(t,e,r),!t._initted)return 1;if(!n&&t._pt&&!Ve&&(t._dur&&t.vars.lazy!==!1||!t._dur&&t.vars.lazy)&&Zd!==mn.frame)return Ii.push(t),t._lazy=[r,i],1},E1=function s(t){var e=t.parent;return e&&e._ts&&e._initted&&!e._lock&&(e.rawTime()<0||s(e))},Fc=function(t){var e=t.data;return e==="isFromStart"||e==="isStart"},A1=function(t,e,n,i){var r=t.ratio,o=e<0||!e&&(!t._start&&E1(t)&&!(!t._initted&&Fc(t))||(t._ts<0||t._dp._ts<0)&&!Fc(t))?0:1,a=t._rDelay,l=0,c,h,u;if(a&&t._repeat&&(l=fo(0,t._tDur,e),h=cr(l,a),t._yoyo&&h&1&&(o=1-o),h!==cr(t._tTime,a)&&(r=1-o,t.vars.repeatRefresh&&t._initted&&t.invalidate())),o!==r||Ve||i||t._zTime===pe||!e&&t._zTime){if(!t._initted&&ip(t,e,i,n,l))return;for(u=t._zTime,t._zTime=e||(n?pe:0),n||(n=e&&!u),t.ratio=o,t._from&&(o=1-o),t._time=0,t._tTime=l,c=t._pt;c;)c.r(o,c.d),c=c._next;e<0&&Oc(t,e,n,!0),t._onUpdate&&!n&&gn(t,"onUpdate"),l&&t._repeat&&!n&&t.parent&&gn(t,"onRepeat"),(e>=t._tDur||e<0)&&t.ratio===o&&(o&&Ni(t,1),!n&&!Ve&&(gn(t,o?"onComplete":"onReverseComplete",!0),t._prom&&t._prom()))}else t._zTime||(t._zTime=e)},R1=function(t,e,n){var i;if(n>e)for(i=t._first;i&&i._start<=n;){if(i.data==="isPause"&&i._start>e)return i;i=i._next}else for(i=t._last;i&&i._start>=n;){if(i.data==="isPause"&&i._start<e)return i;i=i._prev}},hr=function(t,e,n,i){var r=t._repeat,o=Me(e)||0,a=t._tTime/t._tDur;return a&&!i&&(t._time*=o/t._dur),t._dur=o,t._tDur=r?r<0?1e10:Me(o*(r+1)+t._rDelay*r):o,a>0&&!i&&Oa(t,t._tTime=t._tDur*a),t.parent&&Na(t),n||as(t.parent,t),t},pf=function(t){return t instanceof sn?as(t):hr(t,t._dur)},C1={_start:0,endTime:to,totalDuration:to},Tn=function s(t,e,n){var i=t.labels,r=t._recent||C1,o=t.duration()>=An?r.endTime(!1):t._dur,a,l,c;return ke(e)&&(isNaN(e)||e in i)?(l=e.charAt(0),c=e.substr(-1)==="%",a=e.indexOf("="),l==="<"||l===">"?(a>=0&&(e=e.replace(/=/,"")),(l==="<"?r._start:r.endTime(r._repeat>=0))+(parseFloat(e.substr(1))||0)*(c?(a<0?r:n).totalDuration()/100:1)):a<0?(e in i||(i[e]=o),i[e]):(l=parseFloat(e.charAt(a-1)+e.substr(a+1)),c&&n&&(l=l/100*(Ze(n)?n[0]:n).totalDuration()),a>1?s(t,e.substr(0,a-1),n)+l:o+l)):e==null?o:+e},Vr=function(t,e,n){var i=mi(e[1]),r=(i?2:1)+(t<2?0:1),o=e[r],a,l;if(i&&(o.duration=e[1]),o.parent=n,t){for(a=o,l=n;l&&!("immediateRender"in a);)a=l.vars.defaults||{},l=rn(l.vars.inherit)&&l.parent;o.immediateRender=rn(a.immediateRender),t<2?o.runBackwards=1:o.startAt=e[r-1]}return new Ue(e[0],o,e[r+1])},zi=function(t,e){return t||t===0?e(t):e},fo=function(t,e,n){return n<t?t:n>e?e:n},qe=function(t,e){return!ke(t)||!(e=v1.exec(t))?"":e[1]},P1=function(t,e,n){return zi(n,function(i){return fo(t,e,i)})},kc=[].slice,sp=function(t,e){return t&&Zn(t)&&"length"in t&&(!e&&!t.length||t.length-1 in t&&Zn(t[0]))&&!t.nodeType&&t!==Hn},D1=function(t,e,n){return n===void 0&&(n=[]),t.forEach(function(i){var r;return ke(i)&&!e||sp(i,1)?(r=n).push.apply(r,Rn(i)):n.push(i)})||n},Rn=function(t,e,n){return xe&&!e&&xe.selector?xe.selector(t):ke(t)&&!n&&(Uc||!ur())?kc.call((e||wh).querySelectorAll(t),0):Ze(t)?D1(t,n):sp(t)?kc.call(t,0):t?[t]:[]},zc=function(t){return t=Rn(t)[0]||Qr("Invalid scope")||{},function(e){var n=t.current||t.nativeElement||t;return Rn(e,n.querySelectorAll?n:n===t?Qr("Invalid scope")||wh.createElement("div"):t)}},rp=function(t){return t.sort(function(){return .5-Math.random()})},op=function(t){if(Re(t))return t;var e=Zn(t)?t:{each:t},n=ls(e.ease),i=e.from||0,r=parseFloat(e.base)||0,o={},a=i>0&&i<1,l=isNaN(i)||a,c=e.axis,h=i,u=i;return ke(i)?h=u={center:.5,edges:.5,end:1}[i]||0:!a&&l&&(h=i[0],u=i[1]),function(d,f,g){var _=(g||e).length,p=o[_],m,y,x,v,E,R,T,C,M;if(!p){if(M=e.grid==="auto"?0:(e.grid||[1,An])[1],!M){for(T=-An;T<(T=g[M++].getBoundingClientRect().left)&&M<_;);M<_&&M--}for(p=o[_]=[],m=l?Math.min(M,_)*h-.5:i%M,y=M===An?0:l?_*u/M-.5:i/M|0,T=0,C=An,R=0;R<_;R++)x=R%M-m,v=y-(R/M|0),p[R]=E=c?Math.abs(c==="y"?v:x):Vd(x*x+v*v),E>T&&(T=E),E<C&&(C=E);i==="random"&&rp(p),p.max=T-C,p.min=C,p.v=_=(parseFloat(e.amount)||parseFloat(e.each)*(M>_?_-1:c?c==="y"?_/M:M:Math.max(M,_/M))||0)*(i==="edges"?-1:1),p.b=_<0?r-_:r,p.u=qe(e.amount||e.each)||0,n=n&&_<0?W1(n):n}return _=(p[d]-p.min)/p.max||0,Me(p.b+(n?n(_):_)*p.v)+p.u}},Bc=function(t){var e=Math.pow(10,((t+"").split(".")[1]||"").length);return function(n){var i=Me(Math.round(parseFloat(n)/t)*t*e);return(i-i%1)/e+(mi(n)?0:qe(n))}},ap=function(t,e){var n=Ze(t),i,r;return!n&&Zn(t)&&(i=n=t.radius||An,t.values?(t=Rn(t.values),(r=!mi(t[0]))&&(i*=i)):t=Bc(t.increment)),zi(e,n?Re(t)?function(o){return r=t(o),Math.abs(r-o)<=i?r:o}:function(o){for(var a=parseFloat(r?o.x:o),l=parseFloat(r?o.y:0),c=An,h=0,u=t.length,d,f;u--;)r?(d=t[u].x-a,f=t[u].y-l,d=d*d+f*f):d=Math.abs(t[u]-a),d<c&&(c=d,h=u);return h=!i||c<=i?t[h]:o,r||h===o||mi(o)?h:h+qe(o)}:Bc(t))},lp=function(t,e,n,i){return zi(Ze(t)?!e:n===!0?!!(n=0):!i,function(){return Ze(t)?t[~~(Math.random()*t.length)]:(n=n||1e-5)&&(i=n<1?Math.pow(10,(n+"").length-2):1)&&Math.floor(Math.round((t-n/2+Math.random()*(e-t+n*.99))/n)*n*i)/i})},L1=function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return function(i){return e.reduce(function(r,o){return o(r)},i)}},I1=function(t,e){return function(n){return t(parseFloat(n))+(e||qe(n))}},U1=function(t,e,n){return hp(t,e,0,1,n)},cp=function(t,e,n){return zi(n,function(i){return t[~~e(i)]})},N1=function s(t,e,n){var i=e-t;return Ze(t)?cp(t,s(0,t.length),e):zi(n,function(r){return(i+(r-t)%i)%i+t})},O1=function s(t,e,n){var i=e-t,r=i*2;return Ze(t)?cp(t,s(0,t.length-1),e):zi(n,function(o){return o=(r+(o-t)%r)%r||0,t+(o>i?r-o:o)})},eo=function(t){return t.replace(m1,function(e){var n=e.indexOf("[")+1,i=e.substring(n||7,n?e.indexOf("]"):e.length-1).split(g1);return lp(n?i:+i[0],n?0:+i[1],+i[2]||1e-5)})},hp=function(t,e,n,i,r){var o=e-t,a=i-n;return zi(r,function(l){return n+((l-t)/o*a||0)})},F1=function s(t,e,n,i){var r=isNaN(t+e)?0:function(f){return(1-f)*t+f*e};if(!r){var o=ke(t),a={},l,c,h,u,d;if(n===!0&&(i=1)&&(n=null),o)t={p:t},e={p:e};else if(Ze(t)&&!Ze(e)){for(h=[],u=t.length,d=u-2,c=1;c<u;c++)h.push(s(t[c-1],t[c]));u--,r=function(g){g*=u;var _=Math.min(d,~~g);return h[_](g-_)},n=e}else i||(t=lr(Ze(t)?[]:{},t));if(!h){for(l in e)Ph.call(a,t,l,"get",e[l]);r=function(g){return Uh(g,a)||(o?t.p:t)}}}return zi(n,r)},mf=function(t,e,n){var i=t.labels,r=An,o,a,l;for(o in i)a=i[o]-e,a<0==!!n&&a&&r>(a=Math.abs(a))&&(l=o,r=a);return l},gn=function(t,e,n){var i=t.vars,r=i[e],o=xe,a=t._ctx,l,c,h;if(r)return l=i[e+"Params"],c=i.callbackScope||t,n&&Ii.length&&_a(),a&&(xe=a),h=l?r.apply(c,l):r.call(c),xe=o,h},Ir=function(t){return Ni(t),t.scrollTrigger&&t.scrollTrigger.kill(!!Ve),t.progress()<1&&gn(t,"onInterrupt"),t},Ys,up=[],fp=function(t){if(t)if(t=!t.name&&t.default||t,bh()||t.headless){var e=t.name,n=Re(t),i=e&&!n&&t.init?function(){this._props=[]}:t,r={init:to,render:Uh,add:Ph,kill:tM,modifier:Q1,rawVars:0},o={targetTest:0,get:0,getSetter:Ih,aliases:{},register:0};if(ur(),t!==i){if(dn[e])return;yn(i,yn(va(t,r),o)),lr(i.prototype,lr(r,va(t,o))),dn[i.prop=e]=i,t.targetTest&&(oa.push(i),Eh[e]=1),e=(e==="css"?"CSS":e.charAt(0).toUpperCase()+e.substr(1))+"Plugin"}$d(e,i),t.register&&t.register(cn,i,an)}else up.push(t)},de=255,Ur={aqua:[0,de,de],lime:[0,de,0],silver:[192,192,192],black:[0,0,0],maroon:[128,0,0],teal:[0,128,128],blue:[0,0,de],navy:[0,0,128],white:[de,de,de],olive:[128,128,0],yellow:[de,de,0],orange:[de,165,0],gray:[128,128,128],purple:[128,0,128],green:[0,128,0],red:[de,0,0],pink:[de,192,203],cyan:[0,de,de],transparent:[de,de,de,0]},El=function(t,e,n){return t+=t<0?1:t>1?-1:0,(t*6<1?e+(n-e)*t*6:t<.5?n:t*3<2?e+(n-e)*(2/3-t)*6:e)*de+.5|0},dp=function(t,e,n){var i=t?mi(t)?[t>>16,t>>8&de,t&de]:0:Ur.black,r,o,a,l,c,h,u,d,f,g;if(!i){if(t.substr(-1)===","&&(t=t.substr(0,t.length-1)),Ur[t])i=Ur[t];else if(t.charAt(0)==="#"){if(t.length<6&&(r=t.charAt(1),o=t.charAt(2),a=t.charAt(3),t="#"+r+r+o+o+a+a+(t.length===5?t.charAt(4)+t.charAt(4):"")),t.length===9)return i=parseInt(t.substr(1,6),16),[i>>16,i>>8&de,i&de,parseInt(t.substr(7),16)/255];t=parseInt(t.substr(1),16),i=[t>>16,t>>8&de,t&de]}else if(t.substr(0,3)==="hsl"){if(i=g=t.match(hf),!e)l=+i[0]%360/360,c=+i[1]/100,h=+i[2]/100,o=h<=.5?h*(c+1):h+c-h*c,r=h*2-o,i.length>3&&(i[3]*=1),i[0]=El(l+1/3,r,o),i[1]=El(l,r,o),i[2]=El(l-1/3,r,o);else if(~t.indexOf("="))return i=t.match(Wd),n&&i.length<4&&(i[3]=1),i}else i=t.match(hf)||Ur.transparent;i=i.map(Number)}return e&&!g&&(r=i[0]/de,o=i[1]/de,a=i[2]/de,u=Math.max(r,o,a),d=Math.min(r,o,a),h=(u+d)/2,u===d?l=c=0:(f=u-d,c=h>.5?f/(2-u-d):f/(u+d),l=u===r?(o-a)/f+(o<a?6:0):u===o?(a-r)/f+2:(r-o)/f+4,l*=60),i[0]=~~(l+.5),i[1]=~~(c*100+.5),i[2]=~~(h*100+.5)),n&&i.length<4&&(i[3]=1),i},pp=function(t){var e=[],n=[],i=-1;return t.split(Ui).forEach(function(r){var o=r.match(qs)||[];e.push.apply(e,o),n.push(i+=o.length+1)}),e.c=n,e},gf=function(t,e,n){var i="",r=(t+i).match(Ui),o=e?"hsla(":"rgba(",a=0,l,c,h,u;if(!r)return t;if(r=r.map(function(d){return(d=dp(d,e,1))&&o+(e?d[0]+","+d[1]+"%,"+d[2]+"%,"+d[3]:d.join(","))+")"}),n&&(h=pp(t),l=n.c,l.join(i)!==h.c.join(i)))for(c=t.replace(Ui,"1").split(qs),u=c.length-1;a<u;a++)i+=c[a]+(~l.indexOf(a)?r.shift()||o+"0,0,0,0)":(h.length?h:r.length?r:n).shift());if(!c)for(c=t.split(Ui),u=c.length-1;a<u;a++)i+=c[a]+r[a];return i+c[u]},Ui=(function(){var s="(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b",t;for(t in Ur)s+="|"+t+"\\b";return new RegExp(s+")","gi")})(),k1=/hsl[a]?\(/,mp=function(t){var e=t.join(" "),n;if(Ui.lastIndex=0,Ui.test(e))return n=k1.test(e),t[1]=gf(t[1],n),t[0]=gf(t[0],n,pp(t[1])),!0},no,mn=(function(){var s=Date.now,t=500,e=33,n=s(),i=n,r=1e3/240,o=r,a=[],l,c,h,u,d,f,g=function _(p){var m=s()-i,y=p===!0,x,v,E,R;if((m>t||m<0)&&(n+=m-e),i+=m,E=i-n,x=E-o,(x>0||y)&&(R=++u.frame,d=E-u.time*1e3,u.time=E=E/1e3,o+=x+(x>=r?4:r-x),v=1),y||(l=c(_)),v)for(f=0;f<a.length;f++)a[f](E,d,R,p)};return u={time:0,frame:0,tick:function(){g(!0)},deltaRatio:function(p){return d/(1e3/(p||60))},wake:function(){qd&&(!Uc&&bh()&&(Hn=Uc=window,wh=Hn.document||{},xn.gsap=cn,(Hn.gsapVersions||(Hn.gsapVersions=[])).push(cn.version),Yd(ga||Hn.GreenSockGlobals||!Hn.gsap&&Hn||{}),up.forEach(fp)),h=typeof requestAnimationFrame<"u"&&requestAnimationFrame,l&&u.sleep(),c=h||function(p){return setTimeout(p,o-u.time*1e3+1|0)},no=1,g(2))},sleep:function(){(h?cancelAnimationFrame:clearTimeout)(l),no=0,c=to},lagSmoothing:function(p,m){t=p||1/0,e=Math.min(m||33,t)},fps:function(p){r=1e3/(p||240),o=u.time*1e3+r},add:function(p,m,y){var x=m?function(v,E,R,T){p(v,E,R,T),u.remove(x)}:p;return u.remove(p),a[y?"unshift":"push"](x),ur(),x},remove:function(p,m){~(m=a.indexOf(p))&&a.splice(m,1)&&f>=m&&f--},_listeners:a},u})(),ur=function(){return!no&&mn.wake()},jt={},z1=/^[\d.\-M][\d.\-,\s]/,B1=/["']/g,H1=function(t){for(var e={},n=t.substr(1,t.length-3).split(":"),i=n[0],r=1,o=n.length,a,l,c;r<o;r++)l=n[r],a=r!==o-1?l.lastIndexOf(","):l.length,c=l.substr(0,a),e[i]=isNaN(c)?c.replace(B1,"").trim():+c,i=l.substr(a+1).trim();return e},V1=function(t){var e=t.indexOf("(")+1,n=t.indexOf(")"),i=t.indexOf("(",e);return t.substring(e,~i&&i<n?t.indexOf(")",n+1):n)},G1=function(t){var e=(t+"").split("("),n=jt[e[0]];return n&&e.length>1&&n.config?n.config.apply(null,~t.indexOf("{")?[H1(e[1])]:V1(t).split(",").map(Kd)):jt._CE&&z1.test(t)?jt._CE("",t):n},W1=function(t){return function(e){return 1-t(1-e)}},ls=function(t,e){return t&&(Re(t)?t:jt[t]||G1(t))||e},vs=function(t,e,n,i){n===void 0&&(n=function(l){return 1-e(1-l)}),i===void 0&&(i=function(l){return l<.5?e(l*2)/2:1-e((1-l)*2)/2});var r={easeIn:e,easeOut:n,easeInOut:i},o;return on(t,function(a){jt[a]=xn[a]=r,jt[o=a.toLowerCase()]=n;for(var l in r)jt[o+(l==="easeIn"?".in":l==="easeOut"?".out":".inOut")]=jt[a+"."+l]=r[l]}),r},gp=function(t){return function(e){return e<.5?(1-t(1-e*2))/2:.5+t((e-.5)*2)/2}},Al=function s(t,e,n){var i=e>=1?e:1,r=(n||(t?.3:.45))/(e<1?e:1),o=r/Ic*(Math.asin(1/i)||0),a=function(h){return h===1?1:i*Math.pow(2,-10*h)*p1((h-o)*r)+1},l=t==="out"?a:t==="in"?function(c){return 1-a(1-c)}:gp(a);return r=Ic/r,l.config=function(c,h){return s(t,c,h)},l},Rl=function s(t,e){e===void 0&&(e=1.70158);var n=function(o){return o?--o*o*((e+1)*o+e)+1:0},i=t==="out"?n:t==="in"?function(r){return 1-n(1-r)}:gp(n);return i.config=function(r){return s(t,r)},i};on("Linear,Quad,Cubic,Quart,Quint,Strong",function(s,t){var e=t<5?t+1:t;vs(s+",Power"+(e-1),t?function(n){return Math.pow(n,e)}:function(n){return n},function(n){return 1-Math.pow(1-n,e)},function(n){return n<.5?Math.pow(n*2,e)/2:1-Math.pow((1-n)*2,e)/2})});jt.Linear.easeNone=jt.none=jt.Linear.easeIn;vs("Elastic",Al("in"),Al("out"),Al());(function(s,t){var e=1/t,n=2*e,i=2.5*e,r=function(a){return a<e?s*a*a:a<n?s*Math.pow(a-1.5/t,2)+.75:a<i?s*(a-=2.25/t)*a+.9375:s*Math.pow(a-2.625/t,2)+.984375};vs("Bounce",function(o){return 1-r(1-o)},r)})(7.5625,2.75);vs("Expo",function(s){return Math.pow(2,10*(s-1))*s+s*s*s*s*s*s*(1-s)});vs("Circ",function(s){return-(Vd(1-s*s)-1)});vs("Sine",function(s){return s===1?1:-d1(s*u1)+1});vs("Back",Rl("in"),Rl("out"),Rl());jt.SteppedEase=jt.steps=xn.SteppedEase={config:function(t,e){t===void 0&&(t=1);var n=1/t,i=t+(e?0:1),r=e?1:0,o=1-pe;return function(a){return((i*fo(0,o,a)|0)+r)*n}}};Kr.ease=jt["quad.out"];on("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt",function(s){return Ah+=s+","+s+"Params,"});var _p=function(t,e){this.id=f1++,t._gsap=this,this.target=t,this.harness=e,this.get=e?e.get:Jd,this.set=e?e.getSetter:Ih},io=(function(){function s(e){this.vars=e,this._delay=+e.delay||0,(this._repeat=e.repeat===1/0?-2:e.repeat||0)&&(this._rDelay=e.repeatDelay||0,this._yoyo=!!e.yoyo||!!e.yoyoEase),this._ts=1,hr(this,+e.duration,1,1),this.data=e.data,xe&&(this._ctx=xe,xe.data.push(this)),no||mn.wake()}var t=s.prototype;return t.delay=function(n){return n||n===0?(this.parent&&this.parent.smoothChildTiming&&this.startTime(this._start+n-this._delay),this._delay=n,this):this._delay},t.duration=function(n){return arguments.length?this.totalDuration(this._repeat>0?n+(n+this._rDelay)*this._repeat:n):this.totalDuration()&&this._dur},t.totalDuration=function(n){return arguments.length?(this._dirty=0,hr(this,this._repeat<0?n:(n-this._repeat*this._rDelay)/(this._repeat+1))):this._tDur},t.totalTime=function(n,i){if(ur(),!arguments.length)return this._tTime;var r=this._dp;if(r&&r.smoothChildTiming&&this._ts){for(Oa(this,n),!r._dp||r.parent||ep(r,this);r&&r.parent;)r.parent._time!==r._start+(r._ts>=0?r._tTime/r._ts:(r.totalDuration()-r._tTime)/-r._ts)&&r.totalTime(r._tTime,!0),r=r.parent;!this.parent&&this._dp.autoRemoveChildren&&(this._ts>0&&n<this._tDur||this._ts<0&&n>0||!this._tDur&&!n)&&Gn(this._dp,this,this._start-this._delay)}return(this._tTime!==n||!this._dur&&!i||this._initted&&Math.abs(this._zTime)===pe||!this._initted&&this._dur&&n||!n&&!this._initted&&(this.add||this._ptLookup))&&(this._ts||(this._pTime=n),jd(this,n,i)),this},t.time=function(n,i){return arguments.length?this.totalTime(Math.min(this.totalDuration(),n+df(this))%(this._dur+this._rDelay)||(n?this._dur:0),i):this._time},t.totalProgress=function(n,i){return arguments.length?this.totalTime(this.totalDuration()*n,i):this.totalDuration()?Math.min(1,this._tTime/this._tDur):this.rawTime()>=0&&this._initted?1:0},t.progress=function(n,i){return arguments.length?this.totalTime(this.duration()*(this._yoyo&&!(this.iteration()&1)?1-n:n)+df(this),i):this.duration()?Math.min(1,this._time/this._dur):this.rawTime()>0?1:0},t.iteration=function(n,i){var r=this.duration()+this._rDelay;return arguments.length?this.totalTime(this._time+(n-1)*r,i):this._repeat?cr(this._tTime,r)+1:1},t.timeScale=function(n,i){if(!arguments.length)return this._rts===-pe?0:this._rts;if(this._rts===n)return this;var r=this.parent&&this._ts?xa(this.parent._time,this):this._tTime;return this._rts=+n||0,this._ts=this._ps||n===-pe?0:this._rts,this.totalTime(fo(-Math.abs(this._delay),this.totalDuration(),r),i!==!1),Na(this),w1(this)},t.paused=function(n){return arguments.length?(this._ps!==n&&(this._ps=n,n?(this._pTime=this._tTime||Math.max(-this._delay,this.rawTime()),this._ts=this._act=0):(ur(),this._ts=this._rts,this.totalTime(this.parent&&!this.parent.smoothChildTiming?this.rawTime():this._tTime||this._pTime,this.progress()===1&&Math.abs(this._zTime)!==pe&&(this._tTime-=pe)))),this):this._ps},t.startTime=function(n){if(arguments.length){this._start=Me(n);var i=this.parent||this._dp;return i&&(i._sort||!this.parent)&&Gn(i,this,this._start-this._delay),this}return this._start},t.endTime=function(n){return this._start+(rn(n)?this.totalDuration():this.duration())/Math.abs(this._ts||1)},t.rawTime=function(n){var i=this.parent||this._dp;return i?n&&(!this._ts||this._repeat&&this._time&&this.totalProgress()<1)?this._tTime%(this._dur+this._rDelay):this._ts?xa(i.rawTime(n),this):this._tTime:this._tTime},t.revert=function(n){n===void 0&&(n=y1);var i=Ve;return Ve=n,Ch(this)&&(this.timeline&&this.timeline.revert(n),this.totalTime(-.01,n.suppressEvents)),this.data!=="nested"&&n.kill!==!1&&this.kill(),Ve=i,this},t.globalTime=function(n){for(var i=this,r=arguments.length?n:i.rawTime();i;)r=i._start+r/(Math.abs(i._ts)||1),i=i._dp;return!this.parent&&this._sat?this._sat.globalTime(n):r},t.repeat=function(n){return arguments.length?(this._repeat=n===1/0?-2:n,pf(this)):this._repeat===-2?1/0:this._repeat},t.repeatDelay=function(n){if(arguments.length){var i=this._time;return this._rDelay=n,pf(this),i?this.time(i):this}return this._rDelay},t.yoyo=function(n){return arguments.length?(this._yoyo=n,this):this._yoyo},t.seek=function(n,i){return this.totalTime(Tn(this,n),rn(i))},t.restart=function(n,i){return this.play().totalTime(n?-this._delay:0,rn(i)),this._dur||(this._zTime=-pe),this},t.play=function(n,i){return n!=null&&this.seek(n,i),this.reversed(!1).paused(!1)},t.reverse=function(n,i){return n!=null&&this.seek(n||this.totalDuration(),i),this.reversed(!0).paused(!1)},t.pause=function(n,i){return n!=null&&this.seek(n,i),this.paused(!0)},t.resume=function(){return this.paused(!1)},t.reversed=function(n){return arguments.length?(!!n!==this.reversed()&&this.timeScale(-this._rts||(n?-pe:0)),this):this._rts<0},t.invalidate=function(){return this._initted=this._act=0,this._zTime=-pe,this},t.isActive=function(){var n=this.parent||this._dp,i=this._start,r;return!!(!n||this._ts&&this._initted&&n.isActive()&&(r=n.rawTime(!0))>=i&&r<this.endTime(!0)-pe)},t.eventCallback=function(n,i,r){var o=this.vars;return arguments.length>1?(i?(o[n]=i,r&&(o[n+"Params"]=r),n==="onUpdate"&&(this._onUpdate=i)):delete o[n],this):o[n]},t.then=function(n){var i=this,r=i._prom;return new Promise(function(o){var a=Re(n)?n:Qd,l=function(){var h=i.then;i.then=null,r&&r(),Re(a)&&(a=a(i))&&(a.then||a===i)&&(i.then=h),o(a),i.then=h};i._initted&&i.totalProgress()===1&&i._ts>=0||!i._tTime&&i._ts<0?l():i._prom=l})},t.kill=function(){Ir(this)},s})();yn(io.prototype,{_time:0,_start:0,_end:0,_tTime:0,_tDur:0,_dirty:0,_repeat:0,_yoyo:!1,parent:null,_initted:!1,_rDelay:0,_ts:1,_dp:0,ratio:0,_zTime:-pe,_prom:0,_ps:!1,_rts:1});var sn=(function(s){Hd(t,s);function t(n,i){var r;return n===void 0&&(n={}),r=s.call(this,n)||this,r.labels={},r.smoothChildTiming=!!n.smoothChildTiming,r.autoRemoveChildren=!!n.autoRemoveChildren,r._sort=rn(n.sortChildren),Se&&Gn(n.parent||Se,ri(r),i),n.reversed&&r.reverse(),n.paused&&r.paused(!0),n.scrollTrigger&&np(ri(r),n.scrollTrigger),r}var e=t.prototype;return e.to=function(i,r,o){return Vr(0,arguments,this),this},e.from=function(i,r,o){return Vr(1,arguments,this),this},e.fromTo=function(i,r,o,a){return Vr(2,arguments,this),this},e.set=function(i,r,o){return r.duration=0,r.parent=this,Hr(r).repeatDelay||(r.repeat=0),r.immediateRender=!!r.immediateRender,new Ue(i,r,Tn(this,o),1),this},e.call=function(i,r,o){return Gn(this,Ue.delayedCall(0,i,r),o)},e.staggerTo=function(i,r,o,a,l,c,h){return o.duration=r,o.stagger=o.stagger||a,o.onComplete=c,o.onCompleteParams=h,o.parent=this,new Ue(i,o,Tn(this,l)),this},e.staggerFrom=function(i,r,o,a,l,c,h){return o.runBackwards=1,Hr(o).immediateRender=rn(o.immediateRender),this.staggerTo(i,r,o,a,l,c,h)},e.staggerFromTo=function(i,r,o,a,l,c,h,u){return a.startAt=o,Hr(a).immediateRender=rn(a.immediateRender),this.staggerTo(i,r,a,l,c,h,u)},e.render=function(i,r,o){var a=this._time,l=this._dirty?this.totalDuration():this._tDur,c=this._dur,h=i<=0?0:Me(i),u=this._zTime<0!=i<0&&(this._initted||!c),d,f,g,_,p,m,y,x,v,E,R,T;if(this!==Se&&h>l&&i>=0&&(h=l),h!==this._tTime||o||u){if(a!==this._time&&c&&(h+=this._time-a,i+=this._time-a),d=h,v=this._start,x=this._ts,m=!x,u&&(c||(a=this._zTime),(i||!r)&&(this._zTime=i)),this._repeat){if(R=this._yoyo,p=c+this._rDelay,this._repeat<-1&&i<0)return this.totalTime(p*100+i,r,o);if(d=Me(h%p),h===l?(_=this._repeat,d=c):(E=Me(h/p),_=~~E,_&&_===E&&(d=c,_--),d>c&&(d=c)),E=cr(this._tTime,p),!a&&this._tTime&&E!==_&&this._tTime-E*p-this._dur<=0&&(E=_),R&&_&1&&(d=c-d,T=1),_!==E&&!this._lock){var C=R&&E&1,M=C===(R&&_&1);if(_<E&&(C=!C),a=C?0:h%c?c:h,this._lock=1,this.render(a||(T?0:Me(_*p)),r,!c)._lock=0,this._tTime=h,!r&&this.parent&&gn(this,"onRepeat"),this.vars.repeatRefresh&&!T&&(this.invalidate()._lock=1,E=_),a&&a!==this._time||m!==!this._ts||this.vars.onRepeat&&!this.parent&&!this._act)return this;if(c=this._dur,l=this._tDur,M&&(this._lock=2,a=C?c:-1e-4,this.render(a,!0),this.vars.repeatRefresh&&!T&&this.invalidate()),this._lock=0,!this._ts&&!m)return this}}if(this._hasPause&&!this._forcing&&this._lock<2&&(y=R1(this,Me(a),Me(d)),y&&(h-=d-(d=y._start))),this._tTime=h,this._time=d,this._act=!!x,this._initted||(this._onUpdate=this.vars.onUpdate,this._initted=1,this._zTime=i,a=0),!a&&h&&c&&!r&&!E&&(gn(this,"onStart"),this._tTime!==h))return this;if(d>=a&&i>=0)for(f=this._first;f;){if(g=f._next,(f._act||d>=f._start)&&f._ts&&y!==f){if(f.parent!==this)return this.render(i,r,o);if(f.render(f._ts>0?(d-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(d-f._start)*f._ts,r,o),d!==this._time||!this._ts&&!m){y=0,g&&(h+=this._zTime=-pe);break}}f=g}else{f=this._last;for(var S=i<0?i:d;f;){if(g=f._prev,(f._act||S<=f._end)&&f._ts&&y!==f){if(f.parent!==this)return this.render(i,r,o);if(f.render(f._ts>0?(S-f._start)*f._ts:(f._dirty?f.totalDuration():f._tDur)+(S-f._start)*f._ts,r,o||Ve&&Ch(f)),d!==this._time||!this._ts&&!m){y=0,g&&(h+=this._zTime=S?-pe:pe);break}}f=g}}if(y&&!r&&(this.pause(),y.render(d>=a?0:-pe)._zTime=d>=a?1:-1,this._ts))return this._start=v,Na(this),this.render(i,r,o);this._onUpdate&&!r&&gn(this,"onUpdate",!0),(h===l&&this._tTime>=this.totalDuration()||!h&&a)&&(v===this._start||Math.abs(x)!==Math.abs(this._ts))&&(this._lock||((i||!c)&&(h===l&&this._ts>0||!h&&this._ts<0)&&Ni(this,1),!r&&!(i<0&&!a)&&(h||a||!l)&&(gn(this,h===l&&i>=0?"onComplete":"onReverseComplete",!0),this._prom&&!(h<l&&this.timeScale()>0)&&this._prom())))}return this},e.add=function(i,r){var o=this;if(mi(r)||(r=Tn(this,r,i)),!(i instanceof io)){if(Ze(i))return i.forEach(function(a){return o.add(a,r)}),this;if(ke(i))return this.addLabel(i,r);if(Re(i))i=Ue.delayedCall(0,i);else return this}return this!==i?Gn(this,i,r):this},e.getChildren=function(i,r,o,a){i===void 0&&(i=!0),r===void 0&&(r=!0),o===void 0&&(o=!0),a===void 0&&(a=-An);for(var l=[],c=this._first;c;)c._start>=a&&(c instanceof Ue?r&&l.push(c):(o&&l.push(c),i&&l.push.apply(l,c.getChildren(!0,r,o)))),c=c._next;return l},e.getById=function(i){for(var r=this.getChildren(1,1,1),o=r.length;o--;)if(r[o].vars.id===i)return r[o]},e.remove=function(i){return ke(i)?this.removeLabel(i):Re(i)?this.killTweensOf(i):(i.parent===this&&Ua(this,i),i===this._recent&&(this._recent=this._last),as(this))},e.totalTime=function(i,r){return arguments.length?(this._forcing=1,!this._dp&&this._ts&&(this._start=Me(mn.time-(this._ts>0?i/this._ts:(this.totalDuration()-i)/-this._ts))),s.prototype.totalTime.call(this,i,r),this._forcing=0,this):this._tTime},e.addLabel=function(i,r){return this.labels[i]=Tn(this,r),this},e.removeLabel=function(i){return delete this.labels[i],this},e.addPause=function(i,r,o){var a=Ue.delayedCall(0,r||to,o);return a.data="isPause",this._hasPause=1,Gn(this,a,Tn(this,i))},e.removePause=function(i){var r=this._first;for(i=Tn(this,i);r;)r._start===i&&r.data==="isPause"&&Ni(r),r=r._next},e.killTweensOf=function(i,r,o){for(var a=this.getTweensOf(i,o),l=a.length;l--;)Ri!==a[l]&&a[l].kill(i,r);return this},e.getTweensOf=function(i,r){for(var o=[],a=Rn(i),l=this._first,c=mi(r),h;l;)l instanceof Ue?M1(l._targets,a)&&(c?(!Ri||l._initted&&l._ts)&&l.globalTime(0)<=r&&l.globalTime(l.totalDuration())>r:!r||l.isActive())&&o.push(l):(h=l.getTweensOf(a,r)).length&&o.push.apply(o,h),l=l._next;return o},e.tweenTo=function(i,r){r=r||{};var o=this,a=Tn(o,i),l=r,c=l.startAt,h=l.onStart,u=l.onStartParams,d=l.immediateRender,f,g=Ue.to(o,yn({ease:r.ease||"none",lazy:!1,immediateRender:!1,time:a,overwrite:"auto",duration:r.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale())||pe,onStart:function(){if(o.pause(),!f){var p=r.duration||Math.abs((a-(c&&"time"in c?c.time:o._time))/o.timeScale());g._dur!==p&&hr(g,p,0,1).render(g._time,!0,!0),f=1}h&&h.apply(g,u||[])}},r));return d?g.render(0):g},e.tweenFromTo=function(i,r,o){return this.tweenTo(r,yn({startAt:{time:Tn(this,i)}},o))},e.recent=function(){return this._recent},e.nextLabel=function(i){return i===void 0&&(i=this._time),mf(this,Tn(this,i))},e.previousLabel=function(i){return i===void 0&&(i=this._time),mf(this,Tn(this,i),1)},e.currentLabel=function(i){return arguments.length?this.seek(i,!0):this.previousLabel(this._time+pe)},e.shiftChildren=function(i,r,o){o===void 0&&(o=0);var a=this._first,l=this.labels,c;for(i=Me(i);a;)a._start>=o&&(a._start+=i,a._end+=i),a=a._next;if(r)for(c in l)l[c]>=o&&(l[c]+=i);return as(this)},e.invalidate=function(i){var r=this._first;for(this._lock=0;r;)r.invalidate(i),r=r._next;return s.prototype.invalidate.call(this,i)},e.clear=function(i){i===void 0&&(i=!0);for(var r=this._first,o;r;)o=r._next,this.remove(r),r=o;return this._dp&&(this._time=this._tTime=this._pTime=0),i&&(this.labels={}),as(this)},e.totalDuration=function(i){var r=0,o=this,a=o._last,l=An,c,h,u;if(arguments.length)return o.timeScale((o._repeat<0?o.duration():o.totalDuration())/(o.reversed()?-i:i));if(o._dirty){for(u=o.parent;a;)c=a._prev,a._dirty&&a.totalDuration(),h=a._start,h>l&&o._sort&&a._ts&&!o._lock?(o._lock=1,Gn(o,a,h-a._delay,1)._lock=0):l=h,h<0&&a._ts&&(r-=h,(!u&&!o._dp||u&&u.smoothChildTiming)&&(o._start+=Me(h/o._ts),o._time-=h,o._tTime-=h),o.shiftChildren(-h,!1,-1/0),l=0),a._end>r&&a._ts&&(r=a._end),a=c;hr(o,o===Se&&o._time>r?o._time:r,1,1),o._dirty=0}return o._tDur},t.updateRoot=function(i){if(Se._ts&&(jd(Se,xa(i,Se)),Zd=mn.frame),mn.frame>=uf){uf+=vn.autoSleep||120;var r=Se._first;if((!r||!r._ts)&&vn.autoSleep&&mn._listeners.length<2){for(;r&&!r._ts;)r=r._next;r||mn.sleep()}}},t})(io);yn(sn.prototype,{_lock:0,_hasPause:0,_forcing:0});var X1=function(t,e,n,i,r,o,a){var l=new an(this._pt,t,e,0,1,bp,null,r),c=0,h=0,u,d,f,g,_,p,m,y;for(l.b=n,l.e=i,n+="",i+="",(m=~i.indexOf("random("))&&(i=eo(i)),o&&(y=[n,i],o(y,t,e),n=y[0],i=y[1]),d=n.match(wl)||[];u=wl.exec(i);)g=u[0],_=i.substring(c,u.index),f?f=(f+1)%5:_.substr(-5)==="rgba("&&(f=1),g!==d[h++]&&(p=parseFloat(d[h-1])||0,l._pt={_next:l._pt,p:_||h===1?_:",",s:p,c:g.charAt(1)==="="?Js(p,g)-p:parseFloat(g)-p,m:f&&f<4?Math.round:0},c=wl.lastIndex);return l.c=c<i.length?i.substring(c,i.length):"",l.fp=a,(Xd.test(i)||m)&&(l.e=0),this._pt=l,l},Ph=function(t,e,n,i,r,o,a,l,c,h){Re(i)&&(i=i(r||0,t,o));var u=t[e],d=n!=="get"?n:Re(u)?c?t[e.indexOf("set")||!Re(t["get"+e.substr(3)])?e:"get"+e.substr(3)](c):t[e]():u,f=Re(u)?c?J1:Mp:Lh,g;if(ke(i)&&(~i.indexOf("random(")&&(i=eo(i)),i.charAt(1)==="="&&(g=Js(d,i)+(qe(d)||0),(g||g===0)&&(i=g))),!h||d!==i||Hc)return!isNaN(d*i)&&i!==""?(g=new an(this._pt,t,e,+d||0,i-(d||0),typeof u=="boolean"?K1:Sp,0,f),c&&(g.fp=c),a&&g.modifier(a,this,t),this._pt=g):(!u&&!(e in t)&&Th(e,i),X1.call(this,t,e,d,i,f,l||vn.stringFilter,c))},q1=function(t,e,n,i,r){if(Re(t)&&(t=Gr(t,r,e,n,i)),!Zn(t)||t.style&&t.nodeType||Ze(t)||Gd(t))return ke(t)?Gr(t,r,e,n,i):t;var o={},a;for(a in t)o[a]=Gr(t[a],r,e,n,i);return o},vp=function(t,e,n,i,r,o){var a,l,c,h;if(dn[t]&&(a=new dn[t]).init(r,a.rawVars?e[t]:q1(e[t],i,r,o,n),n,i,o)!==!1&&(n._pt=l=new an(n._pt,r,t,0,1,a.render,a,0,a.priority),n!==Ys))for(c=n._ptLookup[n._targets.indexOf(r)],h=a._props.length;h--;)c[a._props[h]]=l;return a},Ri,Hc,Dh=function s(t,e,n){var i=t.vars,r=i.ease,o=i.startAt,a=i.immediateRender,l=i.lazy,c=i.onUpdate,h=i.runBackwards,u=i.yoyoEase,d=i.keyframes,f=i.autoRevert,g=t._dur,_=t._startAt,p=t._targets,m=t.parent,y=m&&m.data==="nested"?m.vars.targets:p,x=t._overwrite==="auto"&&!Mh,v=t.timeline,E=i.easeReverse||u,R,T,C,M,S,L,F,O,z,W,H,Y,G;if(v&&(!d||!r)&&(r="none"),t._ease=ls(r,Kr.ease),t._rEase=E&&(ls(E)||t._ease),t._from=!v&&!!i.runBackwards,t._from&&(t.ratio=1),!v||d&&!i.stagger){if(O=p[0]?os(p[0]).harness:0,Y=O&&i[O.prop],R=va(i,Eh),_&&(_._zTime<0&&_.progress(1),e<0&&h&&a&&!f?_.render(-1,!0):_.revert(h&&g?ra:x1),_._lazy=0),o){if(Ni(t._startAt=Ue.set(p,yn({data:"isStart",overwrite:!1,parent:m,immediateRender:!0,lazy:!_&&rn(l),startAt:null,delay:0,onUpdate:c&&function(){return gn(t,"onUpdate")},stagger:0},o))),t._startAt._dp=0,t._startAt._sat=t,e<0&&(Ve||!a&&!f)&&t._startAt.revert(ra),a&&g&&e<=0&&n<=0){e&&(t._zTime=e);return}}else if(h&&g&&!_){if(e&&(a=!1),C=yn({overwrite:!1,data:"isFromStart",lazy:a&&!_&&rn(l),immediateRender:a,stagger:0,parent:m},R),Y&&(C[O.prop]=Y),Ni(t._startAt=Ue.set(p,C)),t._startAt._dp=0,t._startAt._sat=t,e<0&&(Ve?t._startAt.revert(ra):t._startAt.render(-1,!0)),t._zTime=e,!a)s(t._startAt,pe,pe);else if(!e)return}for(t._pt=t._ptCache=0,l=g&&rn(l)||l&&!g,T=0;T<p.length;T++){if(S=p[T],F=S._gsap||Rh(p)[T]._gsap,t._ptLookup[T]=W={},Nc[F.id]&&Ii.length&&_a(),H=y===p?T:y.indexOf(S),O&&(z=new O).init(S,Y||R,t,H,y)!==!1&&(t._pt=M=new an(t._pt,S,z.name,0,1,z.render,z,0,z.priority),z._props.forEach(function(ht){W[ht]=M}),z.priority&&(L=1)),!O||Y)for(C in R)dn[C]&&(z=vp(C,R,t,H,S,y))?z.priority&&(L=1):W[C]=M=Ph.call(t,S,C,"get",R[C],H,y,0,i.stringFilter);t._op&&t._op[T]&&t.kill(S,t._op[T]),x&&t._pt&&(Ri=t,Se.killTweensOf(S,W,t.globalTime(e)),G=!t.parent,Ri=0),t._pt&&l&&(Nc[F.id]=1)}L&&wp(t),t._onInit&&t._onInit(t)}t._onUpdate=c,t._initted=(!t._op||t._pt)&&!G,d&&e<=0&&v.render(An,!0,!0)},Y1=function(t,e,n,i,r,o,a,l){var c=(t._pt&&t._ptCache||(t._ptCache={}))[e],h,u,d,f;if(!c)for(c=t._ptCache[e]=[],d=t._ptLookup,f=t._targets.length;f--;){if(h=d[f][e],h&&h.d&&h.d._pt)for(h=h.d._pt;h&&h.p!==e&&h.fp!==e;)h=h._next;if(!h)return Hc=1,t.vars[e]="+=0",Dh(t,a),Hc=0,l?Qr(e+" not eligible for reset. Try splitting into individual properties"):1;c.push(h)}for(f=c.length;f--;)u=c[f],h=u._pt||u,h.s=(i||i===0)&&!r?i:h.s+(i||0)+o*h.c,h.c=n-h.s,u.e&&(u.e=Ce(n)+qe(u.e)),u.b&&(u.b=h.s+qe(u.b))},$1=function(t,e){var n=t[0]?os(t[0]).harness:0,i=n&&n.aliases,r,o,a,l;if(!i)return e;r=lr({},e);for(o in i)if(o in r)for(l=i[o].split(","),a=l.length;a--;)r[l[a]]=r[o];return r},Z1=function(t,e,n,i){var r=e.ease||i||"power1.inOut",o,a;if(Ze(e))a=n[t]||(n[t]=[]),e.forEach(function(l,c){return a.push({t:c/(e.length-1)*100,v:l,e:r})});else for(o in e)a=n[o]||(n[o]=[]),o==="ease"||a.push({t:parseFloat(t),v:e[o],e:r})},Gr=function(t,e,n,i,r){return Re(t)?t.call(e,n,i,r):ke(t)&&~t.indexOf("random(")?eo(t):t},xp=Ah+"repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert",yp={};on(xp+",id,stagger,delay,duration,paused,scrollTrigger",function(s){return yp[s]=1});var Ue=(function(s){Hd(t,s);function t(n,i,r,o){var a;typeof i=="number"&&(r.duration=i,i=r,r=null),a=s.call(this,o?i:Hr(i))||this;var l=a.vars,c=l.duration,h=l.delay,u=l.immediateRender,d=l.stagger,f=l.overwrite,g=l.keyframes,_=l.defaults,p=l.scrollTrigger,m=i.parent||Se,y=(Ze(n)||Gd(n)?mi(n[0]):"length"in i)?[n]:Rn(n),x,v,E,R,T,C,M,S;if(a._targets=y.length?Rh(y):Qr("GSAP target "+n+" not found. https://gsap.com",!vn.nullTargetWarn)||[],a._ptLookup=[],a._overwrite=f,g||d||qo(c)||qo(h)){i=a.vars;var L=i.easeReverse||i.yoyoEase;if(x=a.timeline=new sn({data:"nested",defaults:_||{},targets:m&&m.data==="nested"?m.vars.targets:y}),x.kill(),x.parent=x._dp=ri(a),x._start=0,d||qo(c)||qo(h)){if(R=y.length,M=d&&op(d),Zn(d))for(T in d)~xp.indexOf(T)&&(S||(S={}),S[T]=d[T]);for(v=0;v<R;v++)E=va(i,yp),E.stagger=0,L&&(E.easeReverse=L),S&&lr(E,S),C=y[v],E.duration=+Gr(c,ri(a),v,C,y),E.delay=(+Gr(h,ri(a),v,C,y)||0)-a._delay,!d&&R===1&&E.delay&&(a._delay=h=E.delay,a._start+=h,E.delay=0),x.to(C,E,M?M(v,C,y):0),x._ease=jt.none;x.duration()?c=h=0:a.timeline=0}else if(g){Hr(yn(x.vars.defaults,{ease:"none"})),x._ease=ls(g.ease||i.ease||"none");var F=0,O,z,W;if(Ze(g))g.forEach(function(H){return x.to(y,H,">")}),x.duration();else{E={};for(T in g)T==="ease"||T==="easeEach"||Z1(T,g[T],E,g.easeEach);for(T in E)for(O=E[T].sort(function(H,Y){return H.t-Y.t}),F=0,v=0;v<O.length;v++)z=O[v],W={ease:z.e,duration:(z.t-(v?O[v-1].t:0))/100*c},W[T]=z.v,x.to(y,W,F),F+=W.duration;x.duration()<c&&x.to({},{duration:c-x.duration()})}}c||a.duration(c=x.duration())}else a.timeline=0;return f===!0&&!Mh&&(Ri=ri(a),Se.killTweensOf(y),Ri=0),Gn(m,ri(a),r),i.reversed&&a.reverse(),i.paused&&a.paused(!0),(u||!c&&!g&&a._start===Me(m._time)&&rn(u)&&T1(ri(a))&&m.data!=="nested")&&(a._tTime=-pe,a.render(Math.max(0,-h)||0)),p&&np(ri(a),p),a}var e=t.prototype;return e.render=function(i,r,o){var a=this._time,l=this._tDur,c=this._dur,h=i<0,u=i>l-pe&&!h?l:i<pe?0:i,d,f,g,_,p,m,y,x;if(!c)A1(this,i,r,o);else if(u!==this._tTime||!i||o||!this._initted&&this._tTime||this._startAt&&this._zTime<0!==h||this._lazy){if(d=u,x=this.timeline,this._repeat){if(_=c+this._rDelay,this._repeat<-1&&h)return this.totalTime(_*100+i,r,o);if(d=Me(u%_),u===l?(g=this._repeat,d=c):(p=Me(u/_),g=~~p,g&&g===p?(d=c,g--):d>c&&(d=c)),m=this._yoyo&&g&1,m&&(d=c-d),p=cr(this._tTime,_),d===a&&!o&&this._initted&&g===p)return this._tTime=u,this;g!==p&&this.vars.repeatRefresh&&!m&&!this._lock&&d!==_&&this._initted&&(this._lock=o=1,this.render(Me(_*g),!0).invalidate()._lock=0)}if(!this._initted){if(ip(this,h?i:d,o,r,u))return this._tTime=0,this;if(a!==this._time&&!(o&&this.vars.repeatRefresh&&g!==p))return this;if(c!==this._dur)return this.render(i,r,o)}if(this._rEase){var v=d<a;if(v!==this._inv){var E=v?a:c-a;this._inv=v,this._from&&(this.ratio=1-this.ratio),this._invRatio=this.ratio,this._invTime=a,this._invRecip=E?(v?-1:1)/E:0,this._invScale=v?-this.ratio:1-this.ratio,this._invEase=v?this._rEase:this._ease}this.ratio=y=this._invRatio+this._invScale*this._invEase((d-this._invTime)*this._invRecip)}else this.ratio=y=this._ease(d/c);if(this._from&&(this.ratio=y=1-y),this._tTime=u,this._time=d,!this._act&&this._ts&&(this._act=1,this._lazy=0),!a&&u&&!r&&!p&&(gn(this,"onStart"),this._tTime!==u))return this;for(f=this._pt;f;)f.r(y,f.d),f=f._next;x&&x.render(i<0?i:x._dur*x._ease(d/this._dur),r,o)||this._startAt&&(this._zTime=i),this._onUpdate&&!r&&(h&&Oc(this,i,r,o),gn(this,"onUpdate")),this._repeat&&g!==p&&this.vars.onRepeat&&!r&&this.parent&&gn(this,"onRepeat"),(u===this._tDur||!u)&&this._tTime===u&&(h&&!this._onUpdate&&Oc(this,i,!0,!0),(i||!c)&&(u===this._tDur&&this._ts>0||!u&&this._ts<0)&&Ni(this,1),!r&&!(h&&!a)&&(u||a||m)&&(gn(this,u===l?"onComplete":"onReverseComplete",!0),this._prom&&!(u<l&&this.timeScale()>0)&&this._prom()))}return this},e.targets=function(){return this._targets},e.invalidate=function(i){return(!i||!this.vars.runBackwards)&&(this._startAt=0),this._pt=this._op=this._onUpdate=this._lazy=this.ratio=0,this._ptLookup=[],this.timeline&&this.timeline.invalidate(i),s.prototype.invalidate.call(this,i)},e.resetTo=function(i,r,o,a,l){no||mn.wake(),this._ts||this.play();var c=Math.min(this._dur,(this._dp._time-this._start)*this._ts),h;return this._initted||Dh(this,c),h=this._ease(c/this._dur),Y1(this,i,r,o,a,h,c,l)?this.resetTo(i,r,o,a,1):(Oa(this,0),this.parent||tp(this._dp,this,"_first","_last",this._dp._sort?"_start":0),this.render(0))},e.kill=function(i,r){if(r===void 0&&(r="all"),!i&&(!r||r==="all"))return this._lazy=this._pt=0,this.parent?Ir(this):this.scrollTrigger&&this.scrollTrigger.kill(!!Ve),this;if(this.timeline){var o=this.timeline.totalDuration();return this.timeline.killTweensOf(i,r,Ri&&Ri.vars.overwrite!==!0)._first||Ir(this),this.parent&&o!==this.timeline.totalDuration()&&hr(this,this._dur*this.timeline._tDur/o,0,1),this}var a=this._targets,l=i?Rn(i):a,c=this._ptLookup,h=this._pt,u,d,f,g,_,p,m;if((!r||r==="all")&&b1(a,l))return r==="all"&&(this._pt=0),Ir(this);for(u=this._op=this._op||[],r!=="all"&&(ke(r)&&(_={},on(r,function(y){return _[y]=1}),r=_),r=$1(a,r)),m=a.length;m--;)if(~l.indexOf(a[m])){d=c[m],r==="all"?(u[m]=r,g=d,f={}):(f=u[m]=u[m]||{},g=r);for(_ in g)p=d&&d[_],p&&((!("kill"in p.d)||p.d.kill(_)===!0)&&Ua(this,p,"_pt"),delete d[_]),f!=="all"&&(f[_]=1)}return this._initted&&!this._pt&&h&&Ir(this),this},t.to=function(i,r){return new t(i,r,arguments[2])},t.from=function(i,r){return Vr(1,arguments)},t.delayedCall=function(i,r,o,a){return new t(r,0,{immediateRender:!1,lazy:!1,overwrite:!1,delay:i,onComplete:r,onReverseComplete:r,onCompleteParams:o,onReverseCompleteParams:o,callbackScope:a})},t.fromTo=function(i,r,o){return Vr(2,arguments)},t.set=function(i,r){return r.duration=0,r.repeatDelay||(r.repeat=0),new t(i,r)},t.killTweensOf=function(i,r,o){return Se.killTweensOf(i,r,o)},t})(io);yn(Ue.prototype,{_targets:[],_lazy:0,_startAt:0,_op:0,_onInit:0});on("staggerTo,staggerFrom,staggerFromTo",function(s){Ue[s]=function(){var t=new sn,e=kc.call(arguments,0);return e.splice(s==="staggerFromTo"?5:4,0,0),t[s].apply(t,e)}});var Lh=function(t,e,n){return t[e]=n},Mp=function(t,e,n){return t[e](n)},J1=function(t,e,n,i){return t[e](i.fp,n)},j1=function(t,e,n){return t.setAttribute(e,n)},Ih=function(t,e){return Re(t[e])?Mp:Sh(t[e])&&t.setAttribute?j1:Lh},Sp=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e6)/1e6,e)},K1=function(t,e){return e.set(e.t,e.p,!!(e.s+e.c*t),e)},bp=function(t,e){var n=e._pt,i="";if(!t&&e.b)i=e.b;else if(t===1&&e.e)i=e.e;else{for(;n;)i=n.p+(n.m?n.m(n.s+n.c*t):Math.round((n.s+n.c*t)*1e4)/1e4)+i,n=n._next;i+=e.c}e.set(e.t,e.p,i,e)},Uh=function(t,e){for(var n=e._pt;n;)n.r(t,n.d),n=n._next},Q1=function(t,e,n,i){for(var r=this._pt,o;r;)o=r._next,r.p===i&&r.modifier(t,e,n),r=o},tM=function(t){for(var e=this._pt,n,i;e;)i=e._next,e.p===t&&!e.op||e.op===t?Ua(this,e,"_pt"):e.dep||(n=1),e=i;return!n},eM=function(t,e,n,i){i.mSet(t,e,i.m.call(i.tween,n,i.mt),i)},wp=function(t){for(var e=t._pt,n,i,r,o;e;){for(n=e._next,i=r;i&&i.pr>e.pr;)i=i._next;(e._prev=i?i._prev:o)?e._prev._next=e:r=e,(e._next=i)?i._prev=e:o=e,e=n}t._pt=r},an=(function(){function s(e,n,i,r,o,a,l,c,h){this.t=n,this.s=r,this.c=o,this.p=i,this.r=a||Sp,this.d=l||this,this.set=c||Lh,this.pr=h||0,this._next=e,e&&(e._prev=this)}var t=s.prototype;return t.modifier=function(n,i,r){this.mSet=this.mSet||this.set,this.set=eM,this.m=n,this.mt=r,this.tween=i},s})();on(Ah+"parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse",function(s){return Eh[s]=1});xn.TweenMax=xn.TweenLite=Ue;xn.TimelineLite=xn.TimelineMax=sn;Se=new sn({sortChildren:!1,defaults:Kr,autoRemoveChildren:!0,id:"root",smoothChildTiming:!0});vn.stringFilter=mp;var cs=[],aa={},nM=[],_f=0,iM=0,Cl=function(t){return(aa[t]||nM).map(function(e){return e()})},Vc=function(){var t=Date.now(),e=[];t-_f>2&&(Cl("matchMediaInit"),cs.forEach(function(n){var i=n.queries,r=n.conditions,o,a,l,c;for(a in i)o=Hn.matchMedia(i[a]).matches,o&&(l=1),o!==r[a]&&(r[a]=o,c=1);c&&(n.revert(),l&&e.push(n))}),Cl("matchMediaRevert"),e.forEach(function(n){return n.onMatch(n,function(i){return n.add(null,i)})}),_f=t,Cl("matchMedia"))},Tp=(function(){function s(e,n){this.selector=n&&zc(n),this.data=[],this._r=[],this.isReverted=!1,this.id=iM++,e&&this.add(e)}var t=s.prototype;return t.add=function(n,i,r){Re(n)&&(r=i,i=n,n=Re);var o=this,a=function(){var c=xe,h=o.selector,u;return c&&c!==o&&c.data.push(o),r&&(o.selector=zc(r)),xe=o,u=i.apply(o,arguments),Re(u)&&o._r.push(u),xe=c,o.selector=h,o.isReverted=!1,u};return o.last=a,n===Re?a(o,function(l){return o.add(null,l)}):n?o[n]=a:a},t.ignore=function(n){var i=xe;xe=null,n(this),xe=i},t.getTweens=function(){var n=[];return this.data.forEach(function(i){return i instanceof s?n.push.apply(n,i.getTweens()):i instanceof Ue&&!(i.parent&&i.parent.data==="nested")&&n.push(i)}),n},t.clear=function(){this._r.length=this.data.length=0},t.kill=function(n,i){var r=this;if(n?(function(){for(var a=r.getTweens(),l=r.data.length,c;l--;)c=r.data[l],c.data==="isFlip"&&(c.revert(),c.getChildren(!0,!0,!1).forEach(function(h){return a.splice(a.indexOf(h),1)}));for(a.map(function(h){return{g:h._dur||h._delay||h._sat&&!h._sat.vars.immediateRender?h.globalTime(0):-1/0,t:h}}).sort(function(h,u){return u.g-h.g||-1/0}).forEach(function(h){return h.t.revert(n)}),l=r.data.length;l--;)c=r.data[l],c instanceof sn?c.data!=="nested"&&(c.scrollTrigger&&c.scrollTrigger.revert(),c.kill()):!(c instanceof Ue)&&c.revert&&c.revert(n);r._r.forEach(function(h){return h(n,r)}),r.isReverted=!0})():this.data.forEach(function(a){return a.kill&&a.kill()}),this.clear(),i)for(var o=cs.length;o--;)cs[o].id===this.id&&cs.splice(o,1)},t.revert=function(n){this.kill(n||{})},s})(),sM=(function(){function s(e){this.contexts=[],this.scope=e,xe&&xe.data.push(this)}var t=s.prototype;return t.add=function(n,i,r){Zn(n)||(n={matches:n});var o=new Tp(0,r||this.scope),a=o.conditions={},l,c,h;xe&&!o.selector&&(o.selector=xe.selector),this.contexts.push(o),i=o.add("onMatch",i),o.queries=n;for(c in n)c==="all"?h=1:(l=Hn.matchMedia(n[c]),l&&(cs.indexOf(o)<0&&cs.push(o),(a[c]=l.matches)&&(h=1),l.addListener?l.addListener(Vc):l.addEventListener("change",Vc)));return h&&i(o,function(u){return o.add(null,u)}),this},t.revert=function(n){this.kill(n||{})},t.kill=function(n){this.contexts.forEach(function(i){return i.kill(n,!0)})},s})(),ya={registerPlugin:function(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];e.forEach(function(i){return fp(i)})},timeline:function(t){return new sn(t)},getTweensOf:function(t,e){return Se.getTweensOf(t,e)},getProperty:function(t,e,n,i){ke(t)&&(t=Rn(t)[0]);var r=os(t||{}).get,o=n?Qd:Kd;return n==="native"&&(n=""),t&&(e?o((dn[e]&&dn[e].get||r)(t,e,n,i)):function(a,l,c){return o((dn[a]&&dn[a].get||r)(t,a,l,c))})},quickSetter:function(t,e,n){if(t=Rn(t),t.length>1){var i=t.map(function(h){return cn.quickSetter(h,e,n)}),r=i.length;return function(h){for(var u=r;u--;)i[u](h)}}t=t[0]||{};var o=dn[e],a=os(t),l=a.harness&&(a.harness.aliases||{})[e]||e,c=o?function(h){var u=new o;Ys._pt=0,u.init(t,n?h+n:h,Ys,0,[t]),u.render(1,u),Ys._pt&&Uh(1,Ys)}:a.set(t,l);return o?c:function(h){return c(t,l,n?h+n:h,a,1)}},quickTo:function(t,e,n){var i,r=cn.to(t,yn((i={},i[e]="+=0.1",i.paused=!0,i.stagger=0,i),n||{})),o=function(l,c,h){return r.resetTo(e,l,c,h)};return o.tween=r,o},isTweening:function(t){return Se.getTweensOf(t,!0).length>0},defaults:function(t){return t&&t.ease&&(t.ease=ls(t.ease,Kr.ease)),ff(Kr,t||{})},config:function(t){return ff(vn,t||{})},registerEffect:function(t){var e=t.name,n=t.effect,i=t.plugins,r=t.defaults,o=t.extendTimeline;(i||"").split(",").forEach(function(a){return a&&!dn[a]&&!xn[a]&&Qr(e+" effect requires "+a+" plugin.")}),Tl[e]=function(a,l,c){return n(Rn(a),yn(l||{},r),c)},o&&(sn.prototype[e]=function(a,l,c){return this.add(Tl[e](a,Zn(l)?l:(c=l)&&{},this),c)})},registerEase:function(t,e){jt[t]=ls(e)},parseEase:function(t,e){return arguments.length?ls(t,e):jt},getById:function(t){return Se.getById(t)},exportRoot:function(t,e){t===void 0&&(t={});var n=new sn(t),i,r;for(n.smoothChildTiming=rn(t.smoothChildTiming),Se.remove(n),n._dp=0,n._time=n._tTime=Se._time,i=Se._first;i;)r=i._next,(e||!(!i._dur&&i instanceof Ue&&i.vars.onComplete===i._targets[0]))&&Gn(n,i,i._start-i._delay),i=r;return Gn(Se,n,0),n},context:function(t,e){return t?new Tp(t,e):xe},matchMedia:function(t){return new sM(t)},matchMediaRefresh:function(){return cs.forEach(function(t){var e=t.conditions,n,i;for(i in e)e[i]&&(e[i]=!1,n=1);n&&t.revert()})||Vc()},addEventListener:function(t,e){var n=aa[t]||(aa[t]=[]);~n.indexOf(e)||n.push(e)},removeEventListener:function(t,e){var n=aa[t],i=n&&n.indexOf(e);i>=0&&n.splice(i,1)},utils:{wrap:N1,wrapYoyo:O1,distribute:op,random:lp,snap:ap,normalize:U1,getUnit:qe,clamp:P1,splitColor:dp,toArray:Rn,selector:zc,mapRange:hp,pipe:L1,unitize:I1,interpolate:F1,shuffle:rp},install:Yd,effects:Tl,ticker:mn,updateRoot:sn.updateRoot,plugins:dn,globalTimeline:Se,core:{PropTween:an,globals:$d,Tween:Ue,Timeline:sn,Animation:io,getCache:os,_removeLinkedListItem:Ua,reverting:function(){return Ve},context:function(t){return t&&xe&&(xe.data.push(t),t._ctx=xe),xe},suppressOverwrites:function(t){return Mh=t}}};on("to,from,fromTo,delayedCall,set,killTweensOf",function(s){return ya[s]=Ue[s]});mn.add(sn.updateRoot);Ys=ya.to({},{duration:0});var rM=function(t,e){for(var n=t._pt;n&&n.p!==e&&n.op!==e&&n.fp!==e;)n=n._next;return n},oM=function(t,e){var n=t._targets,i,r,o;for(i in e)for(r=n.length;r--;)o=t._ptLookup[r][i],o&&(o=o.d)&&(o._pt&&(o=rM(o,i)),o&&o.modifier&&o.modifier(e[i],t,n[r],i))},Pl=function(t,e){return{name:t,headless:1,rawVars:1,init:function(i,r,o){o._onInit=function(a){var l,c;if(ke(r)&&(l={},on(r,function(h){return l[h]=1}),r=l),e){l={};for(c in r)l[c]=e(r[c]);r=l}oM(a,r)}}}},cn=ya.registerPlugin({name:"attr",init:function(t,e,n,i,r){var o,a,l;this.tween=n;for(o in e)l=t.getAttribute(o)||"",a=this.add(t,"setAttribute",(l||0)+"",e[o],i,r,0,0,o),a.op=o,a.b=l,this._props.push(o)},render:function(t,e){for(var n=e._pt;n;)Ve?n.set(n.t,n.p,n.b,n):n.r(t,n.d),n=n._next}},{name:"endArray",headless:1,init:function(t,e){for(var n=e.length;n--;)this.add(t,n,t[n]||0,e[n],0,0,0,0,0,1)}},Pl("roundProps",Bc),Pl("modifiers"),Pl("snap",ap))||ya;Ue.version=sn.version=cn.version="3.15.0";qd=1;bh()&&ur();jt.Power0;jt.Power1;jt.Power2;jt.Power3;jt.Power4;jt.Linear;jt.Quad;jt.Cubic;jt.Quart;jt.Quint;jt.Strong;jt.Elastic;jt.Back;jt.SteppedEase;jt.Bounce;jt.Sine;jt.Expo;jt.Circ;/*!
 * CSSPlugin 3.15.0
 * https://gsap.com
 *
 * Copyright 2008-2026, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license
 * @author: Jack Doyle, jack@greensock.com
*/var vf,Ci,js,Nh,ss,xf,Oh,aM=function(){return typeof window<"u"},gi={},Ki=180/Math.PI,Ks=Math.PI/180,ks=Math.atan2,yf=1e8,Fh=/([A-Z])/g,lM=/(left|right|width|margin|padding|x)/i,cM=/[\s,\(]\S/,Wn={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},Gc=function(t,e){return e.set(e.t,e.p,Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},hM=function(t,e){return e.set(e.t,e.p,t===1?e.e:Math.round((e.s+e.c*t)*1e4)/1e4+e.u,e)},uM=function(t,e){return e.set(e.t,e.p,t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},fM=function(t,e){return e.set(e.t,e.p,t===1?e.e:t?Math.round((e.s+e.c*t)*1e4)/1e4+e.u:e.b,e)},dM=function(t,e){var n=e.s+e.c*t;e.set(e.t,e.p,~~(n+(n<0?-.5:.5))+e.u,e)},Ep=function(t,e){return e.set(e.t,e.p,t?e.e:e.b,e)},Ap=function(t,e){return e.set(e.t,e.p,t!==1?e.b:e.e,e)},pM=function(t,e,n){return t.style[e]=n},mM=function(t,e,n){return t.style.setProperty(e,n)},gM=function(t,e,n){return t._gsap[e]=n},_M=function(t,e,n){return t._gsap.scaleX=t._gsap.scaleY=n},vM=function(t,e,n,i,r){var o=t._gsap;o.scaleX=o.scaleY=n,o.renderTransform(r,o)},xM=function(t,e,n,i,r){var o=t._gsap;o[e]=n,o.renderTransform(r,o)},we="transform",ln=we+"Origin",yM=function s(t,e){var n=this,i=this.target,r=i.style,o=i._gsap;if(t in gi&&r){if(this.tfm=this.tfm||{},t!=="transform")t=Wn[t]||t,~t.indexOf(",")?t.split(",").forEach(function(a){return n.tfm[a]=ai(i,a)}):this.tfm[t]=o.x?o[t]:ai(i,t),t===ln&&(this.tfm.zOrigin=o.zOrigin);else return Wn.transform.split(",").forEach(function(a){return s.call(n,a,e)});if(this.props.indexOf(we)>=0)return;o.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(ln,e,"")),t=we}(r||e)&&this.props.push(t,e,r[t])},Rp=function(t){t.translate&&(t.removeProperty("translate"),t.removeProperty("scale"),t.removeProperty("rotate"))},MM=function(){var t=this.props,e=this.target,n=e.style,i=e._gsap,r,o;for(r=0;r<t.length;r+=3)t[r+1]?t[r+1]===2?e[t[r]](t[r+2]):e[t[r]]=t[r+2]:t[r+2]?n[t[r]]=t[r+2]:n.removeProperty(t[r].substr(0,2)==="--"?t[r]:t[r].replace(Fh,"-$1").toLowerCase());if(this.tfm){for(o in this.tfm)i[o]=this.tfm[o];i.svg&&(i.renderTransform(),e.setAttribute("data-svg-origin",this.svgo||"")),r=Oh(),(!r||!r.isStart)&&!n[we]&&(Rp(n),i.zOrigin&&n[ln]&&(n[ln]+=" "+i.zOrigin+"px",i.zOrigin=0,i.renderTransform()),i.uncache=1)}},Cp=function(t,e){var n={target:t,props:[],revert:MM,save:yM};return t._gsap||cn.core.getCache(t),e&&t.style&&t.nodeType&&e.split(",").forEach(function(i){return n.save(i)}),n},Pp,Wc=function(t,e){var n=Ci.createElementNS?Ci.createElementNS((e||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),t):Ci.createElement(t);return n&&n.style?n:Ci.createElement(t)},_n=function s(t,e,n){var i=getComputedStyle(t);return i[e]||i.getPropertyValue(e.replace(Fh,"-$1").toLowerCase())||i.getPropertyValue(e)||!n&&s(t,fr(e)||e,1)||""},Mf="O,Moz,ms,Ms,Webkit".split(","),fr=function(t,e,n){var i=e||ss,r=i.style,o=5;if(t in r&&!n)return t;for(t=t.charAt(0).toUpperCase()+t.substr(1);o--&&!(Mf[o]+t in r););return o<0?null:(o===3?"ms":o>=0?Mf[o]:"")+t},Xc=function(){aM()&&window.document&&(vf=window,Ci=vf.document,js=Ci.documentElement,ss=Wc("div")||{style:{}},Wc("div"),we=fr(we),ln=we+"Origin",ss.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",Pp=!!fr("perspective"),Oh=cn.core.reverting,Nh=1)},Sf=function(t){var e=t.ownerSVGElement,n=Wc("svg",e&&e.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),i=t.cloneNode(!0),r;i.style.display="block",n.appendChild(i),js.appendChild(n);try{r=i.getBBox()}catch{}return n.removeChild(i),js.removeChild(n),r},bf=function(t,e){for(var n=e.length;n--;)if(t.hasAttribute(e[n]))return t.getAttribute(e[n])},Dp=function(t){var e,n;try{e=t.getBBox()}catch{e=Sf(t),n=1}return e&&(e.width||e.height)||n||(e=Sf(t)),e&&!e.width&&!e.x&&!e.y?{x:+bf(t,["x","cx","x1"])||0,y:+bf(t,["y","cy","y1"])||0,width:0,height:0}:e},Lp=function(t){return!!(t.getCTM&&(!t.parentNode||t.ownerSVGElement)&&Dp(t))},Oi=function(t,e){if(e){var n=t.style,i;e in gi&&e!==ln&&(e=we),n.removeProperty?(i=e.substr(0,2),(i==="ms"||e.substr(0,6)==="webkit")&&(e="-"+e),n.removeProperty(i==="--"?e:e.replace(Fh,"-$1").toLowerCase())):n.removeAttribute(e)}},Pi=function(t,e,n,i,r,o){var a=new an(t._pt,e,n,0,1,o?Ap:Ep);return t._pt=a,a.b=i,a.e=r,t._props.push(n),a},wf={deg:1,rad:1,turn:1},SM={grid:1,flex:1},Fi=function s(t,e,n,i){var r=parseFloat(n)||0,o=(n+"").trim().substr((r+"").length)||"px",a=ss.style,l=lM.test(e),c=t.tagName.toLowerCase()==="svg",h=(c?"client":"offset")+(l?"Width":"Height"),u=100,d=i==="px",f=i==="%",g,_,p,m;if(i===o||!r||wf[i]||wf[o])return r;if(o!=="px"&&!d&&(r=s(t,e,n,"px")),m=t.getCTM&&Lp(t),(f||o==="%")&&(gi[e]||~e.indexOf("adius")))return g=m?t.getBBox()[l?"width":"height"]:t[h],Ce(f?r/g*u:r/100*g);if(a[l?"width":"height"]=u+(d?o:i),_=i!=="rem"&&~e.indexOf("adius")||i==="em"&&t.appendChild&&!c?t:t.parentNode,m&&(_=(t.ownerSVGElement||{}).parentNode),(!_||_===Ci||!_.appendChild)&&(_=Ci.body),p=_._gsap,p&&f&&p.width&&l&&p.time===mn.time&&!p.uncache)return Ce(r/p.width*u);if(f&&(e==="height"||e==="width")){var y=t.style[e];t.style[e]=u+i,g=t[h],y?t.style[e]=y:Oi(t,e)}else(f||o==="%")&&!SM[_n(_,"display")]&&(a.position=_n(t,"position")),_===t&&(a.position="static"),_.appendChild(ss),g=ss[h],_.removeChild(ss),a.position="absolute";return l&&f&&(p=os(_),p.time=mn.time,p.width=_[h]),Ce(d?g*r/u:g&&r?u/g*r:0)},ai=function(t,e,n,i){var r;return Nh||Xc(),e in Wn&&e!=="transform"&&(e=Wn[e],~e.indexOf(",")&&(e=e.split(",")[0])),gi[e]&&e!=="transform"?(r=ro(t,i),r=e!=="transformOrigin"?r[e]:r.svg?r.origin:Sa(_n(t,ln))+" "+r.zOrigin+"px"):(r=t.style[e],(!r||r==="auto"||i||~(r+"").indexOf("calc("))&&(r=Ma[e]&&Ma[e](t,e,n)||_n(t,e)||Jd(t,e)||(e==="opacity"?1:0))),n&&!~(r+"").trim().indexOf(" ")?Fi(t,e,r,n)+n:r},bM=function(t,e,n,i){if(!n||n==="none"){var r=fr(e,t,1),o=r&&_n(t,r,1);o&&o!==n?(e=r,n=o):e==="borderColor"&&(n=_n(t,"borderTopColor"))}var a=new an(this._pt,t.style,e,0,1,bp),l=0,c=0,h,u,d,f,g,_,p,m,y,x,v,E;if(a.b=n,a.e=i,n+="",i+="",i.substring(0,6)==="var(--"&&(i=_n(t,i.substring(4,i.indexOf(")")))),i==="auto"&&(_=t.style[e],t.style[e]=i,i=_n(t,e)||i,_?t.style[e]=_:Oi(t,e)),h=[n,i],mp(h),n=h[0],i=h[1],d=n.match(qs)||[],E=i.match(qs)||[],E.length){for(;u=qs.exec(i);)p=u[0],y=i.substring(l,u.index),g?g=(g+1)%5:(y.substr(-5)==="rgba("||y.substr(-5)==="hsla(")&&(g=1),p!==(_=d[c++]||"")&&(f=parseFloat(_)||0,v=_.substr((f+"").length),p.charAt(1)==="="&&(p=Js(f,p)+v),m=parseFloat(p),x=p.substr((m+"").length),l=qs.lastIndex-x.length,x||(x=x||vn.units[e]||v,l===i.length&&(i+=x,a.e+=x)),v!==x&&(f=Fi(t,e,_,x)||0),a._pt={_next:a._pt,p:y||c===1?y:",",s:f,c:m-f,m:g&&g<4||e==="zIndex"?Math.round:0});a.c=l<i.length?i.substring(l,i.length):""}else a.r=e==="display"&&i==="none"?Ap:Ep;return Xd.test(i)&&(a.e=0),this._pt=a,a},Tf={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},wM=function(t){var e=t.split(" "),n=e[0],i=e[1]||"50%";return(n==="top"||n==="bottom"||i==="left"||i==="right")&&(t=n,n=i,i=t),e[0]=Tf[n]||n,e[1]=Tf[i]||i,e.join(" ")},TM=function(t,e){if(e.tween&&e.tween._time===e.tween._dur){var n=e.t,i=n.style,r=e.u,o=n._gsap,a,l,c;if(r==="all"||r===!0)i.cssText="",l=1;else for(r=r.split(","),c=r.length;--c>-1;)a=r[c],gi[a]&&(l=1,a=a==="transformOrigin"?ln:we),Oi(n,a);l&&(Oi(n,we),o&&(o.svg&&n.removeAttribute("transform"),i.scale=i.rotate=i.translate="none",ro(n,1),o.uncache=1,Rp(i)))}},Ma={clearProps:function(t,e,n,i,r){if(r.data!=="isFromStart"){var o=t._pt=new an(t._pt,e,n,0,0,TM);return o.u=i,o.pr=-10,o.tween=r,t._props.push(n),1}}},so=[1,0,0,1,0,0],Ip={},Up=function(t){return t==="matrix(1, 0, 0, 1, 0, 0)"||t==="none"||!t},Ef=function(t){var e=_n(t,we);return Up(e)?so:e.substr(7).match(Wd).map(Ce)},kh=function(t,e){var n=t._gsap||os(t),i=t.style,r=Ef(t),o,a,l,c;return n.svg&&t.getAttribute("transform")?(l=t.transform.baseVal.consolidate().matrix,r=[l.a,l.b,l.c,l.d,l.e,l.f],r.join(",")==="1,0,0,1,0,0"?so:r):(r===so&&!t.offsetParent&&t!==js&&!n.svg&&(l=i.display,i.display="block",o=t.parentNode,(!o||!t.offsetParent&&!t.getBoundingClientRect().width)&&(c=1,a=t.nextElementSibling,js.appendChild(t)),r=Ef(t),l?i.display=l:Oi(t,"display"),c&&(a?o.insertBefore(t,a):o?o.appendChild(t):js.removeChild(t))),e&&r.length>6?[r[0],r[1],r[4],r[5],r[12],r[13]]:r)},qc=function(t,e,n,i,r,o){var a=t._gsap,l=r||kh(t,!0),c=a.xOrigin||0,h=a.yOrigin||0,u=a.xOffset||0,d=a.yOffset||0,f=l[0],g=l[1],_=l[2],p=l[3],m=l[4],y=l[5],x=e.split(" "),v=parseFloat(x[0])||0,E=parseFloat(x[1])||0,R,T,C,M;n?l!==so&&(T=f*p-g*_)&&(C=v*(p/T)+E*(-_/T)+(_*y-p*m)/T,M=v*(-g/T)+E*(f/T)-(f*y-g*m)/T,v=C,E=M):(R=Dp(t),v=R.x+(~x[0].indexOf("%")?v/100*R.width:v),E=R.y+(~(x[1]||x[0]).indexOf("%")?E/100*R.height:E)),i||i!==!1&&a.smooth?(m=v-c,y=E-h,a.xOffset=u+(m*f+y*_)-m,a.yOffset=d+(m*g+y*p)-y):a.xOffset=a.yOffset=0,a.xOrigin=v,a.yOrigin=E,a.smooth=!!i,a.origin=e,a.originIsAbsolute=!!n,t.style[ln]="0px 0px",o&&(Pi(o,a,"xOrigin",c,v),Pi(o,a,"yOrigin",h,E),Pi(o,a,"xOffset",u,a.xOffset),Pi(o,a,"yOffset",d,a.yOffset)),t.setAttribute("data-svg-origin",v+" "+E)},ro=function(t,e){var n=t._gsap||new _p(t);if("x"in n&&!e&&!n.uncache)return n;var i=t.style,r=n.scaleX<0,o="px",a="deg",l=getComputedStyle(t),c=_n(t,ln)||"0",h,u,d,f,g,_,p,m,y,x,v,E,R,T,C,M,S,L,F,O,z,W,H,Y,G,ht,pt,Mt,Ot,Qt,$,lt;return h=u=d=_=p=m=y=x=v=0,f=g=1,n.svg=!!(t.getCTM&&Lp(t)),l.translate&&((l.translate!=="none"||l.scale!=="none"||l.rotate!=="none")&&(i[we]=(l.translate!=="none"?"translate3d("+(l.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+(l.rotate!=="none"?"rotate("+l.rotate+") ":"")+(l.scale!=="none"?"scale("+l.scale.split(" ").join(",")+") ":"")+(l[we]!=="none"?l[we]:"")),i.scale=i.rotate=i.translate="none"),T=kh(t,n.svg),n.svg&&(n.uncache?(G=t.getBBox(),c=n.xOrigin-G.x+"px "+(n.yOrigin-G.y)+"px",Y=""):Y=!e&&t.getAttribute("data-svg-origin"),qc(t,Y||c,!!Y||n.originIsAbsolute,n.smooth!==!1,T)),E=n.xOrigin||0,R=n.yOrigin||0,T!==so&&(L=T[0],F=T[1],O=T[2],z=T[3],h=W=T[4],u=H=T[5],T.length===6?(f=Math.sqrt(L*L+F*F),g=Math.sqrt(z*z+O*O),_=L||F?ks(F,L)*Ki:0,y=O||z?ks(O,z)*Ki+_:0,y&&(g*=Math.abs(Math.cos(y*Ks))),n.svg&&(h-=E-(E*L+R*O),u-=R-(E*F+R*z))):(lt=T[6],Qt=T[7],pt=T[8],Mt=T[9],Ot=T[10],$=T[11],h=T[12],u=T[13],d=T[14],C=ks(lt,Ot),p=C*Ki,C&&(M=Math.cos(-C),S=Math.sin(-C),Y=W*M+pt*S,G=H*M+Mt*S,ht=lt*M+Ot*S,pt=W*-S+pt*M,Mt=H*-S+Mt*M,Ot=lt*-S+Ot*M,$=Qt*-S+$*M,W=Y,H=G,lt=ht),C=ks(-O,Ot),m=C*Ki,C&&(M=Math.cos(-C),S=Math.sin(-C),Y=L*M-pt*S,G=F*M-Mt*S,ht=O*M-Ot*S,$=z*S+$*M,L=Y,F=G,O=ht),C=ks(F,L),_=C*Ki,C&&(M=Math.cos(C),S=Math.sin(C),Y=L*M+F*S,G=W*M+H*S,F=F*M-L*S,H=H*M-W*S,L=Y,W=G),p&&Math.abs(p)+Math.abs(_)>359.9&&(p=_=0,m=180-m),f=Ce(Math.sqrt(L*L+F*F+O*O)),g=Ce(Math.sqrt(H*H+lt*lt)),C=ks(W,H),y=Math.abs(C)>2e-4?C*Ki:0,v=$?1/($<0?-$:$):0),n.svg&&(Y=t.getAttribute("transform"),n.forceCSS=t.setAttribute("transform","")||!Up(_n(t,we)),Y&&t.setAttribute("transform",Y))),Math.abs(y)>90&&Math.abs(y)<270&&(r?(f*=-1,y+=_<=0?180:-180,_+=_<=0?180:-180):(g*=-1,y+=y<=0?180:-180)),e=e||n.uncache,n.x=h-((n.xPercent=h&&(!e&&n.xPercent||(Math.round(t.offsetWidth/2)===Math.round(-h)?-50:0)))?t.offsetWidth*n.xPercent/100:0)+o,n.y=u-((n.yPercent=u&&(!e&&n.yPercent||(Math.round(t.offsetHeight/2)===Math.round(-u)?-50:0)))?t.offsetHeight*n.yPercent/100:0)+o,n.z=d+o,n.scaleX=Ce(f),n.scaleY=Ce(g),n.rotation=Ce(_)+a,n.rotationX=Ce(p)+a,n.rotationY=Ce(m)+a,n.skewX=y+a,n.skewY=x+a,n.transformPerspective=v+o,(n.zOrigin=parseFloat(c.split(" ")[2])||!e&&n.zOrigin||0)&&(i[ln]=Sa(c)),n.xOffset=n.yOffset=0,n.force3D=vn.force3D,n.renderTransform=n.svg?AM:Pp?Np:EM,n.uncache=0,n},Sa=function(t){return(t=t.split(" "))[0]+" "+t[1]},Dl=function(t,e,n){var i=qe(e);return Ce(parseFloat(e)+parseFloat(Fi(t,"x",n+"px",i)))+i},EM=function(t,e){e.z="0px",e.rotationY=e.rotationX="0deg",e.force3D=0,Np(t,e)},$i="0deg",wr="0px",Zi=") ",Np=function(t,e){var n=e||this,i=n.xPercent,r=n.yPercent,o=n.x,a=n.y,l=n.z,c=n.rotation,h=n.rotationY,u=n.rotationX,d=n.skewX,f=n.skewY,g=n.scaleX,_=n.scaleY,p=n.transformPerspective,m=n.force3D,y=n.target,x=n.zOrigin,v="",E=m==="auto"&&t&&t!==1||m===!0;if(x&&(u!==$i||h!==$i)){var R=parseFloat(h)*Ks,T=Math.sin(R),C=Math.cos(R),M;R=parseFloat(u)*Ks,M=Math.cos(R),o=Dl(y,o,T*M*-x),a=Dl(y,a,-Math.sin(R)*-x),l=Dl(y,l,C*M*-x+x)}p!==wr&&(v+="perspective("+p+Zi),(i||r)&&(v+="translate("+i+"%, "+r+"%) "),(E||o!==wr||a!==wr||l!==wr)&&(v+=l!==wr||E?"translate3d("+o+", "+a+", "+l+") ":"translate("+o+", "+a+Zi),c!==$i&&(v+="rotate("+c+Zi),h!==$i&&(v+="rotateY("+h+Zi),u!==$i&&(v+="rotateX("+u+Zi),(d!==$i||f!==$i)&&(v+="skew("+d+", "+f+Zi),(g!==1||_!==1)&&(v+="scale("+g+", "+_+Zi),y.style[we]=v||"translate(0, 0)"},AM=function(t,e){var n=e||this,i=n.xPercent,r=n.yPercent,o=n.x,a=n.y,l=n.rotation,c=n.skewX,h=n.skewY,u=n.scaleX,d=n.scaleY,f=n.target,g=n.xOrigin,_=n.yOrigin,p=n.xOffset,m=n.yOffset,y=n.forceCSS,x=parseFloat(o),v=parseFloat(a),E,R,T,C,M;l=parseFloat(l),c=parseFloat(c),h=parseFloat(h),h&&(h=parseFloat(h),c+=h,l+=h),l||c?(l*=Ks,c*=Ks,E=Math.cos(l)*u,R=Math.sin(l)*u,T=Math.sin(l-c)*-d,C=Math.cos(l-c)*d,c&&(h*=Ks,M=Math.tan(c-h),M=Math.sqrt(1+M*M),T*=M,C*=M,h&&(M=Math.tan(h),M=Math.sqrt(1+M*M),E*=M,R*=M)),E=Ce(E),R=Ce(R),T=Ce(T),C=Ce(C)):(E=u,C=d,R=T=0),(x&&!~(o+"").indexOf("px")||v&&!~(a+"").indexOf("px"))&&(x=Fi(f,"x",o,"px"),v=Fi(f,"y",a,"px")),(g||_||p||m)&&(x=Ce(x+g-(g*E+_*T)+p),v=Ce(v+_-(g*R+_*C)+m)),(i||r)&&(M=f.getBBox(),x=Ce(x+i/100*M.width),v=Ce(v+r/100*M.height)),M="matrix("+E+","+R+","+T+","+C+","+x+","+v+")",f.setAttribute("transform",M),y&&(f.style[we]=M)},RM=function(t,e,n,i,r){var o=360,a=ke(r),l=parseFloat(r)*(a&&~r.indexOf("rad")?Ki:1),c=l-i,h=i+c+"deg",u,d;return a&&(u=r.split("_")[1],u==="short"&&(c%=o,c!==c%(o/2)&&(c+=c<0?o:-o)),u==="cw"&&c<0?c=(c+o*yf)%o-~~(c/o)*o:u==="ccw"&&c>0&&(c=(c-o*yf)%o-~~(c/o)*o)),t._pt=d=new an(t._pt,e,n,i,c,hM),d.e=h,d.u="deg",t._props.push(n),d},Af=function(t,e){for(var n in e)t[n]=e[n];return t},CM=function(t,e,n){var i=Af({},n._gsap),r="perspective,force3D,transformOrigin,svgOrigin",o=n.style,a,l,c,h,u,d,f,g;i.svg?(c=n.getAttribute("transform"),n.setAttribute("transform",""),o[we]=e,a=ro(n,1),Oi(n,we),n.setAttribute("transform",c)):(c=getComputedStyle(n)[we],o[we]=e,a=ro(n,1),o[we]=c);for(l in gi)c=i[l],h=a[l],c!==h&&r.indexOf(l)<0&&(f=qe(c),g=qe(h),u=f!==g?Fi(n,l,c,g):parseFloat(c),d=parseFloat(h),t._pt=new an(t._pt,a,l,u,d-u,Gc),t._pt.u=g||0,t._props.push(l));Af(a,i)};on("padding,margin,Width,Radius",function(s,t){var e="Top",n="Right",i="Bottom",r="Left",o=(t<3?[e,n,i,r]:[e+r,e+n,i+n,i+r]).map(function(a){return t<2?s+a:"border"+a+s});Ma[t>1?"border"+s:s]=function(a,l,c,h,u){var d,f;if(arguments.length<4)return d=o.map(function(g){return ai(a,g,c)}),f=d.join(" "),f.split(d[0]).length===5?d[0]:f;d=(h+"").split(" "),f={},o.forEach(function(g,_){return f[g]=d[_]=d[_]||d[(_-1)/2|0]}),a.init(l,f,u)}});var Op={name:"css",register:Xc,targetTest:function(t){return t.style&&t.nodeType},init:function(t,e,n,i,r){var o=this._props,a=t.style,l=n.vars.startAt,c,h,u,d,f,g,_,p,m,y,x,v,E,R,T,C,M;Nh||Xc(),this.styles=this.styles||Cp(t),C=this.styles.props,this.tween=n;for(_ in e)if(_!=="autoRound"&&(h=e[_],!(dn[_]&&vp(_,e,n,i,t,r)))){if(f=typeof h,g=Ma[_],f==="function"&&(h=h.call(n,i,t,r),f=typeof h),f==="string"&&~h.indexOf("random(")&&(h=eo(h)),g)g(this,t,_,h,n)&&(T=1);else if(_.substr(0,2)==="--")c=(getComputedStyle(t).getPropertyValue(_)+"").trim(),h+="",Ui.lastIndex=0,Ui.test(c)||(p=qe(c),m=qe(h),m?p!==m&&(c=Fi(t,_,c,m)+m):p&&(h+=p)),this.add(a,"setProperty",c,h,i,r,0,0,_),o.push(_),C.push(_,0,a[_]);else if(f!=="undefined"){if(l&&_ in l?(c=typeof l[_]=="function"?l[_].call(n,i,t,r):l[_],ke(c)&&~c.indexOf("random(")&&(c=eo(c)),qe(c+"")||c==="auto"||(c+=vn.units[_]||qe(ai(t,_))||""),(c+"").charAt(1)==="="&&(c=ai(t,_))):c=ai(t,_),d=parseFloat(c),y=f==="string"&&h.charAt(1)==="="&&h.substr(0,2),y&&(h=h.substr(2)),u=parseFloat(h),_ in Wn&&(_==="autoAlpha"&&(d===1&&ai(t,"visibility")==="hidden"&&u&&(d=0),C.push("visibility",0,a.visibility),Pi(this,a,"visibility",d?"inherit":"hidden",u?"inherit":"hidden",!u)),_!=="scale"&&_!=="transform"&&(_=Wn[_],~_.indexOf(",")&&(_=_.split(",")[0]))),x=_ in gi,x){if(this.styles.save(_),M=h,f==="string"&&h.substring(0,6)==="var(--"){if(h=_n(t,h.substring(4,h.indexOf(")"))),h.substring(0,5)==="calc("){var S=t.style.perspective;t.style.perspective=h,h=_n(t,"perspective"),S?t.style.perspective=S:Oi(t,"perspective")}u=parseFloat(h)}if(v||(E=t._gsap,E.renderTransform&&!e.parseTransform||ro(t,e.parseTransform),R=e.smoothOrigin!==!1&&E.smooth,v=this._pt=new an(this._pt,a,we,0,1,E.renderTransform,E,0,-1),v.dep=1),_==="scale")this._pt=new an(this._pt,E,"scaleY",E.scaleY,(y?Js(E.scaleY,y+u):u)-E.scaleY||0,Gc),this._pt.u=0,o.push("scaleY",_),_+="X";else if(_==="transformOrigin"){C.push(ln,0,a[ln]),h=wM(h),E.svg?qc(t,h,0,R,0,this):(m=parseFloat(h.split(" ")[2])||0,m!==E.zOrigin&&Pi(this,E,"zOrigin",E.zOrigin,m),Pi(this,a,_,Sa(c),Sa(h)));continue}else if(_==="svgOrigin"){qc(t,h,1,R,0,this);continue}else if(_ in Ip){RM(this,E,_,d,y?Js(d,y+h):h);continue}else if(_==="smoothOrigin"){Pi(this,E,"smooth",E.smooth,h);continue}else if(_==="force3D"){E[_]=h;continue}else if(_==="transform"){CM(this,h,t);continue}}else _ in a||(_=fr(_)||_);if(x||(u||u===0)&&(d||d===0)&&!cM.test(h)&&_ in a)p=(c+"").substr((d+"").length),u||(u=0),m=qe(h)||(_ in vn.units?vn.units[_]:p),p!==m&&(d=Fi(t,_,c,m)),this._pt=new an(this._pt,x?E:a,_,d,(y?Js(d,y+u):u)-d,!x&&(m==="px"||_==="zIndex")&&e.autoRound!==!1?dM:Gc),this._pt.u=m||0,x&&M!==h?(this._pt.b=c,this._pt.e=M,this._pt.r=fM):p!==m&&m!=="%"&&(this._pt.b=c,this._pt.r=uM);else if(_ in a)bM.call(this,t,_,c,y?y+h:h);else if(_ in t)this.add(t,_,c||t[_],y?y+h:h,i,r);else if(_!=="parseTransform"){Th(_,h);continue}x||(_ in a?C.push(_,0,a[_]):typeof t[_]=="function"?C.push(_,2,t[_]()):C.push(_,1,c||t[_])),o.push(_)}}T&&wp(this)},render:function(t,e){if(e.tween._time||!Oh())for(var n=e._pt;n;)n.r(t,n.d),n=n._next;else e.styles.revert()},get:ai,aliases:Wn,getSetter:function(t,e,n){var i=Wn[e];return i&&i.indexOf(",")<0&&(e=i),e in gi&&e!==ln&&(t._gsap.x||ai(t,"x"))?n&&xf===n?e==="scale"?_M:gM:(xf=n||{})&&(e==="scale"?vM:xM):t.style&&!Sh(t.style[e])?pM:~e.indexOf("-")?mM:Ih(t,e)},core:{_removeProperty:Oi,_getMatrix:kh}};cn.utils.checkPrefix=fr;cn.core.getStyleSaver=Cp;(function(s,t,e,n){var i=on(s+","+t+","+e,function(r){gi[r]=1});on(t,function(r){vn.units[r]="deg",Ip[r]=1}),Wn[i[13]]=s+","+t,on(n,function(r){var o=r.split(":");Wn[o[1]]=i[o[0]]})})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");on("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(s){vn.units[s]="px"});cn.registerPlugin(Op);var it=cn.registerPlugin(Op)||cn;it.core.Tween;class PM{constructor(){var t;this.intensity=0,this.time=0,this.shake=new A,this.sway=0,this.reduced=((t=window.matchMedia)==null?void 0:t.call(window,"(prefers-reduced-motion: reduce)").matches)??!1,this.tween=null}to(t,e=1.2){var n;return(n=this.tween)==null||n.kill(),this.tween=it.to(this,{intensity:t,duration:e,ease:"sine.inOut"}),this.tween}set(t){var e;(e=this.tween)==null||e.kill(),this.intensity=t}update(t){this.time+=t;const e=this.time,n=this.intensity*(this.reduced?.3:1);this.shake.set((Math.sin(e*23.1)*.6+Math.sin(e*37.7+1.3)*.4)*n,(Math.sin(e*29.3+.7)*.5+Math.sin(e*17.9)*.5)*n*.6,(Math.sin(e*19.7+2.1)*.7+Math.sin(e*31.1)*.3)*n),this.sway=Math.sin(e*3.4)*n}}const Q={red:"#ea5b4f",orange:"#f08a45",yellow:"#f9dc6b",green:"#5db65a",blue:"#5eaff2",lilac:"#cf94f2",paper:"#fffaf0",ink:"#3b2f4a",wood:"#e9a45e",woodDark:"#c4733f",leaf:"#4fae5b",pink:"#f4a3b4"},Rf=[Q.red,Q.orange,Q.yellow,Q.green,Q.lilac,Q.pink],Ll={night:{dusk:0,day:0,skyBright:.55,tint:"#7b6fd0",tintAmount:.45,fog:"#3a3768",fogNear:18,fogFar:60,hemiSky:"#9a9be8",hemiGround:"#34453b",hemiIntensity:1.35,sun:"#c9d2ff",sunIntensity:1.7,ground:"#3f6b4c",hills:"#4d7a63",mountains:"#5b5a8c",fireflies:1,dust:0,exposure:1},afternoon:{dusk:1,day:.25,skyBright:1.05,tint:"#ffd9c2",tintAmount:.18,fog:"#e8d6e4",fogNear:20,fogFar:70,hemiSky:"#fff1e0",hemiGround:"#9cc48a",hemiIntensity:1.35,sun:"#ffe2b8",sunIntensity:2.4,ground:"#93cc78",hills:"#b9e09a",mountains:"#dcd3ee",fireflies:0,dust:0,exposure:1},rumble:{dusk:1,day:.1,skyBright:.92,tint:"#d9c3e4",tintAmount:.3,fog:"#d6c7dd",fogNear:18,fogFar:62,hemiSky:"#f1e3ef",hemiGround:"#8fb487",hemiIntensity:1.25,sun:"#ffd7b0",sunIntensity:2,ground:"#88bf73",hills:"#acd394",mountains:"#cfc5e4",fireflies:0,dust:.25,exposure:.98},quake:{dusk:1,day:0,skyBright:.78,tint:"#a996cf",tintAmount:.45,fog:"#b9a9cd",fogNear:14,fogFar:52,hemiSky:"#d9cfee",hemiGround:"#7f9a83",hemiIntensity:1.15,sun:"#f6c9a8",sunIntensity:1.5,ground:"#7fae72",hills:"#9cc28c",mountains:"#b6abd2",fireflies:0,dust:1,exposure:.96},calming:{dusk:1,day:.15,skyBright:.9,tint:"#c7b7e4",tintAmount:.32,fog:"#cfc2e0",fogNear:18,fogFar:62,hemiSky:"#ece2f6",hemiGround:"#8db68a",hemiIntensity:1.2,sun:"#ffd9b8",sunIntensity:1.8,ground:"#86ba76",hills:"#a9d095",mountains:"#c9bfe2",fireflies:0,dust:.3,exposure:.98},still:{dusk:1,day:.35,skyBright:1,tint:"#e2d4f2",tintAmount:.22,fog:"#e3d8ec",fogNear:20,fogFar:70,hemiSky:"#f6efff",hemiGround:"#97c387",hemiIntensity:1.3,sun:"#ffe6c8",sunIntensity:2.1,ground:"#8fc679",hills:"#b5dc9e",mountains:"#d8d0ee",fireflies:0,dust:0,exposure:1},golden:{dusk:1,day:.2,skyBright:1.08,tint:"#ffc9a6",tintAmount:.28,fog:"#f1d2cf",fogNear:20,fogFar:70,hemiSky:"#ffe9d6",hemiGround:"#a2c785",hemiIntensity:1.35,sun:"#ffcf96",sunIntensity:2.5,ground:"#9acb74",hills:"#c3e19a",mountains:"#e6d2e6",fireflies:.35,dust:0,exposure:1.02},day:{dusk:1,day:1,skyBright:1,tint:"#ffffff",tintAmount:0,fog:"#dcebf7",fogNear:22,fogFar:75,hemiSky:"#eef6ff",hemiGround:"#9fd08a",hemiIntensity:1.45,sun:"#fff1d6",sunIntensity:2.6,ground:"#8fd171",hills:"#b6e39b",mountains:"#e4e6f4",fireflies:0,dust:0,exposure:1.02}},Cf={top:"#8fc6f2",horizon:"#e8f3ff"},Pf={cover:{pos:[0,2,10.4],target:[0,2.05,0]},open:{pos:[0,3.9,9.2],target:[0,1.05,-.3]},wide:{pos:[0,3.95,8.7],target:[0,1.1,-.45]},close:{pos:[0,3.35,7],target:[0,1.05,-.55]},route:{pos:[0,5.1,7.7],target:[0,.75,-.2]},patio:{pos:[.3,3.85,8.6],target:[.15,1.1,-.5]}},DM=4.3;class LM{constructor(t){this.camera=t,this.pos=new A,this.target=new A,this.pointer=new st,this.parallax=new st,this.parallaxAmount=1,this.tmp=new A,this.look=new A,this.current=null,window.addEventListener("pointermove",e=>{e.pointerType==="mouse"&&this.pointer.set(e.clientX/window.innerWidth*2-1,e.clientY/window.innerHeight*2-1)})}set(t){const e=Pf[t];this.current=t,this.pos.fromArray(e.pos),this.target.fromArray(e.target)}to(t,e=2.4){const n=Pf[t];if(!n||t===this.current)return null;this.current=t;const i=it.timeline();return i.to(this.pos,{x:n.pos[0],y:n.pos[1],z:n.pos[2],duration:e,ease:"power2.inOut"},0),i.to(this.target,{x:n.target[0],y:n.target[1],z:n.target[2],duration:e,ease:"power2.inOut"},0),i}update(t,e,n){const i=this.camera.aspect,o=this.pos.distanceTo(this.target)*Math.tan(rm.degToRad(this.camera.fov/2))*i,a=Math.max(1,DM/o),l=Math.min(1,t*1.8);this.parallax.x+=(this.pointer.x*this.parallaxAmount-this.parallax.x)*l,this.parallax.y+=(this.pointer.y*this.parallaxAmount-this.parallax.y)*l,this.tmp.subVectors(this.pos,this.target).multiplyScalar(a).add(this.target),this.tmp.x+=this.parallax.x*.35+Math.sin(e*.21)*.09,this.tmp.y+=-this.parallax.y*.18+Math.sin(e*.17)*.05,this.tmp.addScaledVector(n.shake,.05),this.look.copy(this.target),a>1&&i<1&&(this.look.y+=(a-1)*.9),this.look.addScaledVector(n.shake,.025),this.camera.position.copy(this.tmp),this.camera.lookAt(this.look)}}const IM=`
varying vec3 vDir;
void main() {
    vDir = position;
    vec4 p = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_Position = p.xyww;
}
`,UM=`
#define PI 3.141592653589793
uniform sampler2D tNight;
uniform sampler2D tDusk;
uniform float uDusk;
uniform float uDay;
uniform float uBright;
uniform float uTintAmount;
uniform float uRotNight;
uniform float uRotDusk;
uniform vec3 uTint;
uniform vec3 uDayTop;
uniform vec3 uDayHorizon;
uniform vec3 uFog;
varying vec3 vDir;

vec2 equirect(vec3 d, float rot) {
    float u = atan(d.z, d.x) / (2.0 * PI) + 0.5 + rot;
    float v = asin(clamp(d.y, -1.0, 1.0)) / PI + 0.5;
    return vec2(fract(u), v);
}

void main() {
    vec3 d = normalize(vDir);
    vec3 ds = normalize(vec3(d.x, max(d.y, 0.035), d.z));
    vec3 night = texture2D(tNight, equirect(ds, uRotNight)).rgb;
    vec3 dusk = texture2D(tDusk, equirect(ds, uRotDusk)).rgb;
    vec3 col = mix(night, dusk, uDusk);

    float h = clamp(d.y, 0.0, 1.0);
    vec3 day = mix(uDayHorizon, uDayTop, pow(h, 0.55));
    col = mix(col, day, uDay);

    float lum = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(col, uTint * (0.35 + lum * 1.25), uTintAmount);
    col *= uBright;

    float horizon = smoothstep(-0.03, 0.22, d.y);
    col = mix(uFog, col, horizon);

    gl_FragColor = vec4(col, 1.0);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
`;class NM{constructor(t){for(const e of[t.night,t.dusk])e.colorSpace=Pe,e.generateMipmaps=!1,e.minFilter=On,e.wrapS=nr;this.uniforms={tNight:{value:t.night},tDusk:{value:t.dusk},uDusk:{value:0},uDay:{value:0},uBright:{value:1},uTintAmount:{value:0},uRotNight:{value:.1},uRotDusk:{value:.6},uTint:{value:new Vt("#ffffff")},uDayTop:{value:new Vt("#8fc6f2")},uDayHorizon:{value:new Vt("#e8f3ff")},uFog:{value:new Vt("#ffffff")}},this.mesh=new Zt(new ps(150,48,24),new $n({uniforms:this.uniforms,vertexShader:IM,fragmentShader:UM,side:Ye,depthWrite:!1})),this.mesh.frustumCulled=!1,this.mesh.renderOrder=-10}}const Tr=new A;function wn(s,t,e,n,i,r){const o=2*Math.PI*i/4,a=Math.max(r-2*i,0),l=Math.PI/4;Tr.copy(t),Tr[n]=0,Tr.normalize();const c=.5*o/(o+a),h=1-Tr.angleTo(s)/l;return Math.sign(Tr[e])===1?h*c:a/(o+a)+c+c*(1-h)}class OM extends gs{constructor(t=1,e=1,n=1,i=2,r=.1){if(i=i*2+1,r=Math.min(t/2,e/2,n/2,r),super(1,1,1,i,i,i),i===1)return;const o=this.toNonIndexed();this.index=null,this.attributes.position=o.attributes.position,this.attributes.normal=o.attributes.normal,this.attributes.uv=o.attributes.uv;const a=new A,l=new A,c=new A(t,e,n).divideScalar(2).subScalar(r),h=this.attributes.position.array,u=this.attributes.normal.array,d=this.attributes.uv.array,f=h.length/6,g=new A,_=.5/i;for(let p=0,m=0;p<h.length;p+=3,m+=2)switch(a.fromArray(h,p),l.copy(a),l.x-=Math.sign(l.x)*_,l.y-=Math.sign(l.y)*_,l.z-=Math.sign(l.z)*_,l.normalize(),h[p+0]=c.x*Math.sign(a.x)+l.x*r,h[p+1]=c.y*Math.sign(a.y)+l.y*r,h[p+2]=c.z*Math.sign(a.z)+l.z*r,u[p+0]=l.x,u[p+1]=l.y,u[p+2]=l.z,Math.floor(p/f)){case 0:g.set(1,0,0),d[m+0]=wn(g,l,"z","y",r,n),d[m+1]=1-wn(g,l,"y","z",r,e);break;case 1:g.set(-1,0,0),d[m+0]=1-wn(g,l,"z","y",r,n),d[m+1]=1-wn(g,l,"y","z",r,e);break;case 2:g.set(0,1,0),d[m+0]=1-wn(g,l,"x","z",r,t),d[m+1]=wn(g,l,"z","x",r,n);break;case 3:g.set(0,-1,0),d[m+0]=1-wn(g,l,"x","z",r,t),d[m+1]=1-wn(g,l,"z","x",r,n);break;case 4:g.set(0,0,1),d[m+0]=1-wn(g,l,"x","y",r,t),d[m+1]=1-wn(g,l,"y","x",r,e);break;case 5:g.set(0,0,-1),d[m+0]=wn(g,l,"x","y",r,t),d[m+1]=1-wn(g,l,"y","x",r,e);break}}}const nn=new Map,FM=new Map,Fp=new oi(new A(0,1,0),0);function kp(s){return s.clippingPlanes=[Fp],s.clipShadows=!0,s}function Qe(s,t,e){let n=s.get(t);return n||(n=e(),s.set(t,n)),n}const _e=s=>Math.round(s*1e3)/1e3,X={box:(s,t,e)=>Qe(nn,`box|${_e(s)}|${_e(t)}|${_e(e)}`,()=>new gs(s,t,e)),rbox:(s,t,e,n=.03,i=3)=>Qe(nn,`rbox|${_e(s)}|${_e(t)}|${_e(e)}|${n}|${i}`,()=>new OM(s,t,e,i,Math.min(n,s/2,t/2,e/2)*.999)),sphere:(s,t=24,e=16)=>Qe(nn,`sph|${_e(s)}|${t}|${e}`,()=>new ps(s,t,e)),hemi:(s,t=24,e=10,n=.5)=>Qe(nn,`hemi|${_e(s)}|${t}|${e}|${n}`,()=>new ps(s,t,e,0,Math.PI*2,0,Math.PI*n)),cyl:(s,t,e,n=16,i=!1)=>Qe(nn,`cyl|${_e(s)}|${_e(t)}|${_e(e)}|${n}|${i}`,()=>new ho(s,t,e,n,1,i)),cone:(s,t,e=16,n=!1)=>Qe(nn,`cone|${_e(s)}|${_e(t)}|${e}|${n}`,()=>new Yr(s,t,e,1,n)),capsule:(s,t,e=6,n=14)=>Qe(nn,`cap|${_e(s)}|${_e(t)}|${e}|${n}`,()=>new dh(s,t,e,n)),torus:(s,t,e=8,n=24,i=Math.PI*2)=>Qe(nn,`tor|${_e(s)}|${_e(t)}|${e}|${n}|${_e(i)}`,()=>new gh(s,t,e,n,i)),plane:(s,t)=>Qe(nn,`pl|${_e(s)}|${_e(t)}`,()=>new uo(s,t)),circle:(s,t=32)=>Qe(nn,`cir|${_e(s)}|${t}`,()=>new Ca(s,t)),ring:(s,t,e=40)=>Qe(nn,`ring|${_e(s)}|${_e(t)}|${e}`,()=>new ph(s,t,e)),ico:(s,t=0)=>Qe(nn,`ico|${_e(s)}|${t}`,()=>new La(s,t)),tetra:s=>Qe(nn,`tet|${_e(s)}`,()=>new mh(s)),custom:(s,t)=>Qe(nn,`c|${s}`,t)},bi=(s,t)=>Qe(FM,s,()=>kp(t())),nt={clay:(s,t=.78)=>bi(`clay|${s}|${t}`,()=>new he({color:s,roughness:t,metalness:0})),paper:s=>bi(`paper|${s}`,()=>new he({color:s,roughness:.95,metalness:0,side:Un})),flat:s=>bi(`flat|${s}`,()=>new he({color:s,roughness:.9,flatShading:!0})),glow:(s,t=1)=>bi(`glow|${s}|${t}`,()=>new he({color:s,emissive:s,emissiveIntensity:t,roughness:.5})),glass:(s,t=.55)=>bi(`glass|${s}|${t}`,()=>new he({color:s,roughness:.08,metalness:.1,transparent:!0,opacity:t,depthWrite:!1})),basic:(s,t=1)=>bi(`basic|${s}|${t}`,()=>new or({color:s,transparent:t<1,opacity:t,depthWrite:t>=1})),hit:()=>bi("hit",()=>new or({visible:!1})),custom:(s,t)=>bi(`c|${s}`,t)};function es(s,t,{cast:e=!0,receive:n=!1}={}){const i=new Zt(s,t);return i.castShadow=e,i.receiveShadow=n,i}function j(s,t,e,[n=0,i=0,r=0]=[],o){const a=es(t,e,o);return a.position.set(n,i,r),s.add(a),a}let Er=null;function zh(){if(Er)return Er;const s=document.createElement("canvas");s.width=s.height=128;const t=s.getContext("2d"),e=t.createRadialGradient(64,64,0,64,64,64);return e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.25,"rgba(255,255,255,0.75)"),e.addColorStop(.6,"rgba(255,255,255,0.15)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),Er=new _s(s),Er.colorSpace=Pe,Er}function Fa(s="#ffffff",t=.5,e=1){const n=new ah({map:zh(),color:s,transparent:!0,opacity:e,depthWrite:!1,blending:ua});kp(n);const i=new wd(n);return i.scale.setScalar(t),i.userData.ownMaterial=!0,i}function kM(s){s.traverse(t=>{t.userData.ownMaterial&&t.material&&t.material.dispose(),t.userData.ownTexture&&t.userData.ownTexture.dispose(),t.userData.ownGeometry&&t.geometry&&t.geometry.dispose()})}function ki(s=1){let t=s>>>0;return()=>(t=t*1664525+1013904223>>>0,t/4294967296)}function Il(s,t,e,n=!0){var o;const i=s.attributes.position,r=new A;for(let a=0;a<i.count;a++){r.fromBufferAttribute(i,a);const l=Math.sin(r.x*12.9898+r.y*78.233+r.z*37.719+e)*43758.5453,c=l-Math.floor(l)-.5,h=Math.sin(r.x*39.3468+r.y*11.135+r.z*83.155+e)*24634.6345,u=h-Math.floor(h)-.5;n&&r.y<-.45*(((o=s.parameters)==null?void 0:o.height)??1)||i.setXYZ(a,r.x+c*t,r.y+u*t*.6,r.z+(u-c)*t*.7)}return s.computeVertexNormals(),s}class zM{constructor(){this.group=new Lt,this.trees=[],this.clouds=[],this.groundMat=new he({color:"#93cc78",roughness:1}),this.hillMat=new he({color:"#b9e09a",roughness:1}),this.mountainMat=new he({color:"#dcd3ee",roughness:1,flatShading:!0}),this.leafMats=[new he({color:"#86c24f",roughness:.9,flatShading:!0}),new he({color:"#6fae45",roughness:.9,flatShading:!0}),new he({color:"#9bcf5c",roughness:.9,flatShading:!0})],this.trunkMat=new he({color:"#c0643c",roughness:.85,flatShading:!0}),this.cloudMat=new he({color:"#ffffff",roughness:1,transparent:!0,opacity:.9,depthWrite:!1}),this.buildGround(),this.buildHills(),this.buildMountains(),this.buildTrees(),this.buildClouds()}buildGround(){const t=new Zt(new Ca(110,48),this.groundMat);t.rotation.x=-Math.PI/2,this.group.add(t)}buildHills(){const t=new ps(1,28,12,0,Math.PI*2,0,Math.PI/2),e=[[-22,-26,11,4.2,8],[-8,-32,13,5.5,9],[10,-30,12,4.6,8],[26,-24,10,3.8,7],[-32,-12,9,3.2,8],[34,-10,9,3.6,8],[0,-40,16,6,9]];for(const[n,i,r,o,a]of e){const l=new Zt(t,this.hillMat);l.position.set(n,-.2,i),l.scale.set(r,o,a),this.group.add(l)}}buildMountains(){const t=[0,1,2].map(n=>Il(new Yr(1,1,7,3),.18,n*3.1,!0));[[-46,-62,20,26],[-20,-72,24,32],[8,-66,18,24],[34,-70,26,30],[58,-56,18,22],[-64,-48,16,20]].forEach(([n,i,r,o],a)=>{const l=new Zt(t[a%3],this.mountainMat);l.position.set(n,o/2-1,i),l.scale.set(r,o,r),l.rotation.y=a*1.3,this.group.add(l)})}buildTrees(){const t=ki(42),e=[0,1,2].map(l=>Il(new Yr(.62,2.8,7,5),.16,l+10,!0)),n=[0,1,2].map(l=>Il(new La(1,1),.22,l+20,!1)),i=new ho(.1,.17,1,6),r=l=>{const c=new Lt,h=new Zt(e[l%3],this.leafMats[l%3]);h.position.y=1.85;const u=new Zt(i,this.trunkMat);return u.scale.set(1,.6,1),u.position.y=.3,c.add(h,u),c},o=l=>{const c=new Lt,h=new Zt(i,this.trunkMat);h.scale.set(1.5,2.2,1.5),h.position.y=1.1,h.rotation.z=(t()-.5)*.25,c.add(h);const u=new Zt(i,this.trunkMat);u.scale.set(.8,1.1,.8),u.position.set(.35,2,0),u.rotation.z=-.7,c.add(u);const d=3+l%2;for(let f=0;f<d;f++){const g=new Zt(n[(l+f)%3],this.leafMats[(l+f)%3]),_=f/d*Math.PI*2+t();g.position.set(Math.cos(_)*.75,2.75+t()*.5,Math.sin(_)*.45);const p=.9+t()*.45;g.scale.set(p*1.15,p*.85,p),c.add(g)}return c};[["c",-7.2,-3.2,1.25],["r",-10.5,-5.8,1.05],["c",-5.2,-7.5,1],["r",-13.5,-1,1.2],["c",-9.2,1.8,1.1],["r",8.6,-4.2,1.25],["c",6.8,-7.4,1.15],["c",11.2,-2,1],["r",13.6,2.2,1.1],["c",9.8,3.6,.95],["r",-2.5,-11.5,1.2],["c",2.6,-12,1.3],["r",5.5,-14.5,1],["c",-7.8,-13.2,1.1],["c",-15.5,-8.5,1.3],["r",17.5,-8,1.3],["c",16,-12.5,1],["r",-18.5,3.5,1.1]].forEach(([l,c,h,u],d)=>{const f=l==="c"?r(d):o(d);f.position.set(c,0,h),f.scale.setScalar(u),f.rotation.y=t()*Math.PI*2,f.userData.phase=t()*Math.PI*2,this.trees.push(f),this.group.add(f)})}buildClouds(){const t=new ps(1,16,10),e=ki(9),n=[[-24,15,-40],[6,18,-48],[30,14,-36],[-40,12,-24],[44,16,-30]];for(const[i,r,o]of n){const a=new Lt;for(let l=0;l<4;l++){const c=new Zt(t,this.cloudMat);c.position.set((l-1.5)*2.2,(e()-.3)*1.2,e()*1.5),c.scale.set(2.4+e()*1.5,1.4+e(),1.8),a.add(c)}a.position.set(i,r,o),a.userData.speed=.15+e()*.2,this.clouds.push(a),this.group.add(a)}}update(t,e,n,i){const r=n.intensity;for(const o of this.trees){const a=o.userData.phase;o.rotation.z=Math.sin(e*.8+a)*.015+n.shake.x*.06*Math.sin(e*9+a),o.rotation.x=Math.sin(e*.6+a)*.01+r*.03*Math.sin(e*11+a)}this.cloudMat.opacity=i;for(const o of this.clouds)o.position.x+=o.userData.speed*t,o.position.x>60&&(o.position.x=-60)}}function Bh({count:s,box:t,seed:e,color:n,size:i,vertex:r,blending:o}){const a=ki(e),l=new Float32Array(s*3),c=new Float32Array(s);for(let f=0;f<s;f++)l[f*3]=t[0][0]+a()*(t[0][1]-t[0][0]),l[f*3+1]=t[1][0]+a()*(t[1][1]-t[1][0]),l[f*3+2]=t[2][0]+a()*(t[2][1]-t[2][0]),c[f]=a();const h=new De;h.setAttribute("position",new He(l,3)),h.setAttribute("aRand",new He(c,1));const u=new $n({uniforms:{uTime:{value:0},uOpacity:{value:0},uSize:{value:i},uPixelRatio:{value:Math.min(window.devicePixelRatio,2)},uColor:{value:new Vt(n)},uMap:{value:zh()}},vertexShader:r,fragmentShader:`
            uniform vec3 uColor;
            uniform float uOpacity;
            uniform sampler2D uMap;
            varying float vAlpha;
            void main() {
                float a = texture2D(uMap, gl_PointCoord).a * vAlpha * uOpacity;
                if (a < 0.01) discard;
                gl_FragColor = vec4(uColor, a);
                #include <colorspace_fragment>
            }
        `,transparent:!0,depthWrite:!1,blending:o??ua}),d=new zm(h,u);return d.frustumCulled=!1,d}function BM(){return Bh({count:90,seed:3,box:[[-16,16],[.4,7],[-16,4]],color:"#ffe48a",size:150,vertex:`
            uniform float uTime;
            uniform float uSize;
            uniform float uPixelRatio;
            attribute float aRand;
            varying float vAlpha;
            void main() {
                vec3 p = position;
                float t = uTime * (0.25 + aRand * 0.35);
                p.x += sin(t + aRand * 31.0) * 0.9;
                p.y += sin(t * 1.3 + aRand * 17.0) * 0.5;
                p.z += cos(t * 0.8 + aRand * 11.0) * 0.9;
                vec4 mv = modelViewMatrix * vec4(p, 1.0);
                gl_Position = projectionMatrix * mv;
                float blink = 0.55 + 0.45 * sin(uTime * (1.5 + aRand * 2.0) + aRand * 40.0);
                vAlpha = blink;
                gl_PointSize = uSize * uPixelRatio * (0.35 + aRand * 0.65) / -mv.z;
            }
        `})}function HM(){return Bh({count:140,seed:5,box:[[-7,7],[0,6],[-5,4]],color:"#f3e6d0",size:34,blending:rs,vertex:`
            uniform float uTime;
            uniform float uSize;
            uniform float uPixelRatio;
            attribute float aRand;
            varying float vAlpha;
            void main() {
                vec3 p = position;
                float fall = mod(p.y - uTime * (0.25 + aRand * 0.45), 6.0);
                p.y = fall;
                p.x += sin(uTime * 1.7 + aRand * 20.0) * 0.25;
                p.z += cos(uTime * 1.3 + aRand * 13.0) * 0.25;
                vec4 mv = modelViewMatrix * vec4(p, 1.0);
                gl_Position = projectionMatrix * mv;
                vAlpha = smoothstep(0.0, 0.8, fall) * smoothstep(6.0, 4.5, fall) * 0.8;
                gl_PointSize = uSize * uPixelRatio * (0.4 + aRand * 0.6) / -mv.z;
            }
        `})}function VM(){return Bh({count:70,seed:11,box:[[-5,5],[.3,3.4],[-3,3]],color:"#fff2c4",size:26,vertex:`
            uniform float uTime;
            uniform float uSize;
            uniform float uPixelRatio;
            attribute float aRand;
            varying float vAlpha;
            void main() {
                vec3 p = position;
                float t = uTime * (0.08 + aRand * 0.1);
                p.x += sin(t * 2.0 + aRand * 25.0) * 0.6;
                p.y += sin(t * 1.4 + aRand * 13.0) * 0.35 + mod(uTime * 0.03 * (0.5 + aRand), 0.8);
                p.z += cos(t * 1.7 + aRand * 7.0) * 0.5;
                vec4 mv = modelViewMatrix * vec4(p, 1.0);
                gl_Position = projectionMatrix * mv;
                vAlpha = (0.35 + 0.65 * sin(uTime * (0.6 + aRand) + aRand * 30.0) * 0.5 + 0.5) * 0.55;
                gl_PointSize = uSize * uPixelRatio * (0.5 + aRand * 0.5) / -mv.z;
            }
        `})}const Ul=["tint","fog","hemiSky","hemiGround","sun","ground","hills","mountains"],Nl=["dusk","day","skyBright","tintAmount","fogNear","fogFar","hemiIntensity","sunIntensity","fireflies","dust","exposure"];class GM{constructor({scene:t,renderer:e,textures:n}){this.scene=t,this.renderer=e;const i=Ll.night;this.p={};for(const o of Nl)this.p[o]=i[o];for(const o of Ul)this.p[o]=new Vt(i[o]);this.sky=new NM(n),this.sky.uniforms.uDayTop.value.set(Cf.top),this.sky.uniforms.uDayHorizon.value.set(Cf.horizon),t.add(this.sky.mesh),t.fog=new oh(this.p.fog.clone(),this.p.fogNear,this.p.fogFar),this.hemi=new bg("#ffffff","#88aa77",1),t.add(this.hemi),this.sun=new Nu("#ffffff",2),this.sun.position.set(-4.5,9,5.5),this.sun.castShadow=!0,this.sun.shadow.mapSize.set(2048,2048);const r=this.sun.shadow.camera;r.left=-4.6,r.right=4.6,r.top=4.2,r.bottom=-4.2,r.near=2,r.far=22,this.sun.shadow.bias=-6e-4,this.sun.shadow.normalBias=.025,this.sun.shadow.radius=4,t.add(this.sun,this.sun.target),this.rim=new Nu("#cfe0ff",.9),this.rim.position.set(3,5,-7),t.add(this.rim),this.nature=new zM,t.add(this.nature.group),this.fireflies=BM(),this.dust=HM(),this.motes=VM(),t.add(this.fireflies,this.dust,this.motes),this.current="night",this.apply()}setMood(t,e=2.5){const n=Ll[t];if(!n||t===this.current)return null;this.current=t;const i=it.timeline(),r={};for(const o of Nl)r[o]=n[o];i.to(this.p,{...r,duration:e,ease:"sine.inOut"},0);for(const o of Ul){const a=new Vt(n[o]);i.to(this.p[o],{r:a.r,g:a.g,b:a.b,duration:e,ease:"sine.inOut"},0)}return i}setMoodInstant(t){const e=Ll[t];if(e){this.current=t;for(const n of Nl)this.p[n]=e[n];for(const n of Ul)this.p[n].set(e[n]);this.apply()}}apply(){const t=this.p,e=this.sky.uniforms;e.uDusk.value=t.dusk,e.uDay.value=t.day,e.uBright.value=t.skyBright,e.uTintAmount.value=t.tintAmount,e.uTint.value.copy(t.tint),e.uFog.value.copy(t.fog),this.scene.fog.color.copy(t.fog),this.scene.fog.near=t.fogNear,this.scene.fog.far=t.fogFar,this.hemi.color.copy(t.hemiSky),this.hemi.groundColor.copy(t.hemiGround),this.hemi.intensity=t.hemiIntensity,this.sun.color.copy(t.sun),this.sun.intensity=t.sunIntensity*(this.flicker??1),this.rim.color.copy(t.hemiSky),this.rim.intensity=.35+t.hemiIntensity*.45,this.nature.groundMat.color.copy(t.ground),this.nature.hillMat.color.copy(t.hills),this.nature.mountainMat.color.copy(t.mountains),this.renderer.toneMappingExposure=t.exposure,this.fireflies.material.uniforms.uOpacity.value=t.fireflies,this.fireflies.visible=t.fireflies>.01,this.dust.material.uniforms.uOpacity.value=t.dust,this.dust.visible=t.dust>.01}update(t,e,n,i){this.flicker=1+Math.sin(e*.37)*.035+Math.sin(e*1.13+1.7)*.015,this.sun.position.x=-4.5+Math.sin(e*.05)*.6,this.apply(),this.motes.material.uniforms.uTime.value=e,this.motes.material.uniforms.uOpacity.value=.25+this.p.dusk*.5*(1-this.p.dust),this.sky.mesh.position.copy(i.position),this.fireflies.material.uniforms.uTime.value=e,this.dust.material.uniforms.uTime.value=e,this.nature.update(t,e,n,this.p.dusk*(.35+this.p.day*.55))}}const $t=768,Ae=1024,oo="'Fredoka', 'Trebuchet MS', sans-serif",ba="'Pacifico', 'Brush Script MT', cursive";let zp=4;function WM(s){zp=Math.min(8,s)}function ka(s){const t=new _s(s);return t.colorSpace=Pe,t.anisotropy=zp,t.userData.disposable=!0,t}function fi(s,t,e,n,i,r){s.beginPath(),s.moveTo(t+r,e),s.arcTo(t+n,e,t+n,e+i,r),s.arcTo(t+n,e+i,t,e+i,r),s.arcTo(t,e+i,t,e,r),s.arcTo(t,e,t+n,e,r),s.closePath()}function XM(s,t){const e=ki(t);for(let n=0;n<1800;n++)s.fillStyle=e()>.5?"rgba(120,90,60,0.05)":"rgba(255,255,255,0.35)",s.fillRect(e()*$t,e()*Ae,1.5+e()*1.5,1.5+e()*1.5)}function Yo(s,t){s.fillStyle="#f4d6a6",s.fillRect(0,0,$t,Ae);const e=78;for(let n=0,i=0;i<Ae;n++,i+=e){let r=-(n*137%260);for(;r<$t;){const o=220+t()*180,a=t();s.fillStyle=a>.66?"#f0cd98":a>.33?"#f6dbb0":"#f2d2a1",s.fillRect(r+2,i+2,o-4,e-4),s.strokeStyle="rgba(196,130,70,0.18)",s.lineWidth=2,s.beginPath();const l=i+18+t()*(e-36);s.moveTo(r+20,l),s.bezierCurveTo(r+o*.3,l-6,r+o*.6,l+6,r+o-20,l),s.stroke(),r+=o}s.fillStyle="rgba(190,125,70,0.22)",s.fillRect(0,i,$t,3)}}function Ol(s,t,e=Ae*.5,n=360,i=300){const r=t==="left"?$t:0,o=[["#d9b2f0",1],["#f9dc6b",.9],["#fff3dc",.84],["#f4a3b4",.64],["#fff3dc",.58],["#9fd5f7",.36]];for(const[l,c]of o)s.fillStyle=l,s.beginPath(),s.ellipse(r,e,n*c,i*c,0,0,Math.PI*2),s.fill();const a=[Q.red,Q.orange,Q.green,Q.blue,Q.lilac];for(let l=0;l<26;l++){const c=l/26*Math.PI*2;s.fillStyle=a[l%a.length],s.beginPath(),s.arc(r+Math.cos(c)*n*.74,e+Math.sin(c)*i*.74,9,0,Math.PI*2),s.fill()}}function Df(s,t,e=!0){s.fillStyle="#bfe4a2",s.fillRect(0,0,$t,Ae);for(let i=0;i<40;i++)s.fillStyle=t()>.5?"rgba(214,240,190,0.7)":"rgba(160,210,130,0.45)",s.beginPath(),s.ellipse(t()*$t,t()*Ae,40+t()*90,26+t()*50,t()*3,0,Math.PI*2),s.fill();s.strokeStyle="rgba(110,175,90,0.55)",s.lineWidth=3,s.lineCap="round";for(let i=0;i<260;i++){const r=t()*$t,o=t()*Ae;s.beginPath(),s.moveTo(r,o),s.lineTo(r+(t()-.5)*8,o-10-t()*8),s.stroke()}if(!e)return;const n=[Q.red,Q.yellow,Q.lilac,"#ffffff",Q.orange];for(let i=0;i<34;i++){const r=t()*$t,o=t()*Ae;s.fillStyle=n[i%n.length];for(let a=0;a<5;a++){const l=a/5*Math.PI*2;s.beginPath(),s.arc(r+Math.cos(l)*7,o+Math.sin(l)*7,6,0,Math.PI*2),s.fill()}s.fillStyle="#ffe58a",s.beginPath(),s.arc(r,o,5,0,Math.PI*2),s.fill()}}function Fl(s,t){for(const[e,n,i]of t)s.fillStyle="rgba(120,100,90,0.18)",s.beginPath(),s.ellipse(e+4,n+6,i*1.2,i*.8,0,0,Math.PI*2),s.fill(),s.fillStyle="#efe6dc",s.beginPath(),s.ellipse(e,n,i*1.2,i*.8,0,0,Math.PI*2),s.fill()}function qM(s,t){s.fillStyle="#fff6e6",s.fillRect(0,0,$t,Ae),s.strokeStyle="rgba(240,190,140,0.28)",s.lineWidth=3;for(let n=0;n<$t;n+=64)s.beginPath(),s.moveTo(n,0),s.lineTo(n,Ae),s.stroke();for(let n=0;n<Ae;n+=64)s.beginPath(),s.moveTo(0,n),s.lineTo($t,n),s.stroke();const e=[Q.red,Q.orange,Q.yellow,Q.green,Q.blue,Q.lilac];for(let n=0;n<22;n++)s.fillStyle=e[n%e.length],s.globalAlpha=.85,s.beginPath(),s.arc(t()*$t,t()*Ae,8+t()*16,0,Math.PI*2),s.fill();s.globalAlpha=1}const Lf={room(s,t,e){Yo(s,e),Ol(s,t)},exit(s,t,e){Yo(s,e),Ol(s,t,Ae*.5,300,240)},underTable(s,t,e){Yo(s,e),Ol(s,t,Ae*.46,470,400)},route(s,t,e){t==="left"?Yo(s,e):(Df(s,e),Fl(s,[[90,560,30],[190,590,26],[290,560,28]]))},patio(s,t,e){Df(s,e),t==="left"?Fl(s,[[300,250,30],[400,330,28],[500,400,30],[600,470,26],[700,520,28]]):Fl(s,[[30,560,26]])},title(s,t,e){qM(s,e)}};function wa(s,t){const e=document.createElement("canvas");e.width=$t,e.height=Ae;const n=e.getContext("2d"),i=String(s.id??"x").split("").reduce((p,m)=>p+m.charCodeAt(0),0)+(t==="left"?11:37),r=ki(i);n.fillStyle=Q.paper,n.fillRect(0,0,$t,Ae);const o=34,a=14,l=34,c=128,h=t==="left"?o:a,u=t==="left"?$t-a:$t-o;n.save(),fi(n,h,l,u-h,Ae-l-c,26),n.clip(),(Lf[s.scene]??Lf.title)(n,t,r),n.restore(),n.strokeStyle="rgba(255,255,255,0.9)",n.lineWidth=6,fi(n,h,l,u-h,Ae-l-c,26),n.stroke(),n.textBaseline="middle";const f=Ae-c/2+6;if(t==="left"&&s.title&&(n.fillStyle=Q.ink,n.font=`600 44px ${oo}`,n.textAlign="left",n.fillText(s.title,o+8,f,$t-o-120)),t==="right"&&s.number!==void 0){const p=$t-o-36;n.fillStyle=Q.red,n.beginPath(),n.arc(p,f,36,0,Math.PI*2),n.fill(),n.fillStyle="#fff",n.font=`700 40px ${oo}`,n.textAlign="center",n.fillText(String(s.number),p,f+2),[Q.orange,Q.yellow,Q.green,Q.blue,Q.lilac].forEach((y,x)=>{n.fillStyle=y,n.beginPath(),n.arc(p-70-x*30,f,9,0,Math.PI*2),n.fill()})}const g=t==="left"?$t:0,_=n.createLinearGradient(g,0,t==="left"?$t-110:110,0);return _.addColorStop(0,"rgba(110,70,40,0.32)"),_.addColorStop(.35,"rgba(110,70,40,0.1)"),_.addColorStop(1,"rgba(110,70,40,0)"),n.fillStyle=_,n.fillRect(t==="left"?$t-110:0,0,110,Ae),XM(n,i),ka(e)}function If(s,t){const e=document.createElement("canvas");e.width=$t,e.height=Ae;const n=e.getContext("2d"),i=wa({id:"title",scene:"title"},s);if(n.drawImage(i.image,0,0),i.dispose(),n.textAlign="center",n.textBaseline="middle",s==="right"){n.fillStyle="rgba(255,250,240,0.85)",fi(n,90,280,$t-160,400,40),n.fill(),n.fillStyle=Q.red,n.font=`86px ${ba}`;const r=t.split(" ");[r.slice(0,2).join(" "),r.slice(2,4).join(" "),r.slice(4).join(" ")].filter(Boolean).forEach((a,l)=>n.fillText(a,$t/2+10,380+l*104))}else n.fillStyle="rgba(255,250,240,0.85)",fi(n,120,380,$t-200,250,40),n.fill(),n.fillStyle=Q.ink,n.font=`500 40px ${oo}`,Bp(n,t,$t/2-20,450,$t-280,54);return ka(e)}function Uf(s){const t=document.createElement("canvas");t.width=$t,t.height=Ae;const e=t.getContext("2d"),n=wa({id:"end",scene:"title"},s);return e.drawImage(n.image,0,0),n.dispose(),e.textAlign="center",e.textBaseline="middle",s==="left"?(e.fillStyle="rgba(255,250,240,0.88)",fi(e,110,300,$t-190,360,40),e.fill(),e.fillStyle=Q.red,e.font=`150px ${ba}`,e.fillText("Fin",$t/2-10,450),[Q.red,Q.orange,Q.yellow,Q.green,Q.blue,Q.lilac].forEach((r,o)=>{e.fillStyle=r,e.beginPath(),e.arc($t/2-135+o*50,590,13,0,Math.PI*2),e.fill()})):(e.fillStyle="rgba(255,250,240,0.88)",fi(e,90,330,$t-170,330,40),e.fill(),e.fillStyle="#4fae5b",e.beginPath(),e.ellipse($t/2-34,270,46,22,-.6,0,Math.PI*2),e.ellipse($t/2+26,270,46,22,.6,0,Math.PI*2),e.fill(),e.fillStyle=Q.ink,e.font=`500 42px ${oo}`,Bp(e,"Cuando haya peligro, yo te aviso… y tú te cuidas.",$t/2-4,420,$t-260,58),e.fillStyle="#3f9a3c",e.font=`600 34px ${oo}`,e.fillText("— el Guardián",$t/2,600)),ka(t)}function Bp(s,t,e,n,i,r){const o=t.split(" ");let a="",l=n;for(const c of o){const h=a?`${a} ${c}`:c;s.measureText(h).width>i&&a?(s.fillText(a,e,l),a=c,l+=r):a=h}s.fillText(a,e,l)}function Nf(s,t=null){const i=document.createElement("canvas");i.width=768,i.height=1024;const r=i.getContext("2d"),o=ki(7),a=r.createLinearGradient(0,0,768,1024);a.addColorStop(0,"#dd6a47"),a.addColorStop(1,"#c4532f"),r.fillStyle=a,r.fillRect(0,0,768,1024);for(let d=0;d<2600;d++)r.fillStyle=o()>.5?"rgba(255,220,190,0.05)":"rgba(90,30,10,0.06)",r.fillRect(o()*768,o()*1024,2,2);r.fillStyle="rgba(80,20,10,0.18)",r.fillRect(0,0,46,1024),r.fillStyle="rgba(255,220,190,0.18)",r.fillRect(46,0,4,1024),r.strokeStyle="rgba(255,231,184,0.9)",r.lineWidth=5,fi(r,90,60,628,904,34),r.stroke(),r.lineWidth=2,fi(r,108,78,592,868,26),r.stroke(),r.textAlign="center",r.textBaseline="middle",r.font=`104px ${ba}`,["El susurro","de la","Tierra"].forEach((d,f)=>{const g=250+f*128;r.fillStyle="rgba(110,30,15,0.55)",r.fillText(d,768/2+22,g+6),r.fillStyle="#ffe7b8",r.fillText(d,768/2+18,g)});const c=768/2+18,h=t?790:730;return r.fillStyle="rgba(255,231,184,0.95)",r.beginPath(),r.arc(c,h,62,0,Math.PI*2),r.fill(),r.fillStyle="#4fae5b",r.beginPath(),r.ellipse(c-20,h-6,30,15,-.6,0,Math.PI*2),r.ellipse(c+20,h-6,30,15,.6,0,Math.PI*2),r.fill(),r.fillStyle="#3b8d48",r.fillRect(c-3,h-4,6,40),[Q.red,Q.orange,Q.yellow,Q.green,Q.blue,Q.lilac].forEach((d,f)=>{r.fillStyle="#ffe7b8",r.beginPath(),r.arc(c-125+f*50,t?900:870,15,0,Math.PI*2),r.fill(),r.fillStyle=d,r.beginPath(),r.arc(c-125+f*50,t?900:870,11,0,Math.PI*2),r.fill()}),t&&(r.save(),r.translate(768/2+18,650),r.rotate(-.06),r.fillStyle=Q.yellow,fi(r,-130,-50,260,100,50),r.fill(),r.fillStyle=Q.red,r.font=`70px ${ba}`,r.fillText(t,0,2),r.restore()),ka(i)}function YM(){const s=document.createElement("canvas");s.width=64,s.height=64;const t=s.getContext("2d");t.fillStyle="#f6ead4",t.fillRect(0,0,64,64);for(let n=0;n<64;n+=4)t.fillStyle=n%8===0?"rgba(170,130,90,0.25)":"rgba(170,130,90,0.12)",t.fillRect(0,n,64,1);const e=new _s(s);return e.colorSpace=Pe,e}const li={PW:3.05,PD:4,M:.1,COVER_T:.07,BLOCK_T:.15},wi=24,zs=6,Of=.006,kl=2.35,Ff=.62,kf=-3.15/2,zl={amp:.12,tilt:.035,yaw:-.18},zf={amp:.03,tilt:.006,yaw:0};class $M{constructor(){const{PW:t,PD:e,M:n,COVER_T:i,BLOCK_T:r}=li;this.root=new Lt,this.root.name="book",this.pivot=new Lt,this.inner=new Lt,this.root.add(this.pivot),this.pivot.add(this.inner),this.stage=new Lt,this.stage.position.y=.003,this.inner.add(this.stage),this.baseY=kl,this.float={speed:.9,...zl},this.look=new st,this._n=new A,this._p=new A,this.leftTex=null,this.rightTex=null,this.turn=null,this.sheet={theta:0,curl:0,twist:0};const o=new he({color:"#cf5b3c",roughness:.62}),a=new he({map:YM(),roughness:.95}),l=es(X.rbox(t+n,i,e+2*n,.03),o,{cast:!0,receive:!0});l.position.set((t+n)/2,-r-i/2,0);const c=es(X.box(t,r,e),a,{cast:!1,receive:!0});c.position.set(t/2,-r/2,0),this.rightPage=this.makePagePlane(),this.rightPage.rotation.x=-Math.PI/2,this.rightPage.position.set(t/2,.0015,0),this.inner.add(l,c,this.rightPage),this.leftHinge=new Lt,this.inner.add(this.leftHinge);const h=es(X.rbox(t+n,i,e+2*n,.03),o,{cast:!0,receive:!0});h.position.set((t+n)/2,r+i/2,0);const u=es(X.box(t,r,e),a,{cast:!1,receive:!0});u.position.set(t/2,r/2,0),this.leftPage=this.makePagePlane(),this.leftPage.quaternion.setFromEuler(new zn(-Math.PI/2,0,Math.PI,"ZYX")),this.leftPage.position.set(t/2,-.0015,0),this.coverArt=new Zt(X.plane(t+n-.04,e+2*n-.04),new he({roughness:.55,map:Nf()})),this.coverArt.rotation.x=-Math.PI/2,this.coverArt.position.set((t+n)/2,r+i+.002,0),this.leftHinge.add(h,u,this.leftPage,this.coverArt),this.spine=es(X.cyl(r+i,r+i,e+2*n,18,!1),o),this.spine.rotation.x=Math.PI/2,this.spine.scale.set(.35,1,1),this.inner.add(this.spine),this.anchors={right:new ye,left:new ye,cover:new ye},this.anchors.right.position.set(t*.86,.05,e*.36),this.anchors.left.position.set(-t*.86,.05,e*.36),this.anchors.cover.position.set(t*.92,r+i+.02,e*.1),this.inner.add(this.anchors.right,this.anchors.left),this.leftHinge.add(this.anchors.cover),this.buildFlipper();const d=new or({map:zh(),color:"#1d1430",transparent:!0,opacity:.35,depthWrite:!1});this.shadow=new Zt(X.plane(1,1),d),this.shadow.rotation.x=-Math.PI/2,this.shadow.position.y=.02,this.shadow.renderOrder=-1,this.setClosed()}makePagePlane(){const t=new Zt(X.plane(li.PW,li.PD),new he({roughness:.92,color:"#ffffff"}));return t.receiveShadow=!0,t}buildFlipper(){const{PW:t,PD:e}=li,n=wi+1,i=zs+1,r=n*i,o=new He(new Float32Array(r*3),3),a=new He(new Float32Array(r*3),3),l=new Float32Array(r*2),c=new Float32Array(r*2);for(let f=0;f<i;f++)for(let g=0;g<n;g++){const _=f*n+g,p=g/wi,m=1-f/zs;l[_*2]=p,l[_*2+1]=m,c[_*2]=1-p,c[_*2+1]=m,o.setXYZ(_,p*t,0,-e/2+f/zs*e)}const h=[];for(let f=0;f<zs;f++)for(let g=0;g<wi;g++){const _=f*n+g,p=_+1,m=_+n,y=m+1;h.push(_,m,p,p,m,y)}const u=new De;u.setAttribute("position",o),u.setAttribute("normal",a),u.setAttribute("uv",new He(l,2)),u.setIndex(h);const d=new De;d.setAttribute("position",o),d.setAttribute("normal",a),d.setAttribute("uv",new He(c,2)),d.setIndex(h),this.flipGeo=u,this.flipFront=new Zt(u,new he({roughness:.92,side:di})),this.flipBack=new Zt(d,new he({roughness:.92,side:Ye}));for(const f of[this.flipFront,this.flipBack])f.frustumCulled=!1,f.castShadow=!0,f.receiveShadow=!0,f.visible=!1,this.inner.add(f);this.deform()}phi(t,e){const n=this.sheet,i=n.theta-n.curl*t+n.twist*t*e;return i<0?0:i>Math.PI?Math.PI:i}deform(){const{PW:t}=li,e=this.flipGeo.attributes.position,n=wi+1,i=t/wi;for(let r=0;r<=zs;r++){const o=-1+2*r/zs;let a=0,l=Of;for(let c=0;c<=wi;c++){if(c>0){const h=this.phi((c-.5)/wi,o);a+=Math.cos(h)*i,l+=Math.sin(h)*i}e.setX(r*n+c,a),e.setY(r*n+c,l)}}e.needsUpdate=!0,this.flipGeo.computeVertexNormals()}sheetFrame(t,e,n){const{PW:i}=li,r=Math.max(1,Math.ceil(t*wi)),o=t*i/r;let a=0,l=Of;for(let c=0;c<r;c++){const h=this.phi((c+.5)/r*t,e);a+=Math.cos(h)*o,l+=Math.sin(h)*o}return n.x=a,n.y=l,n.phi=this.phi(t,e),n}setSheet(t,e,n){this.sheet.theta=t,this.sheet.curl=e,this.sheet.twist=n,this.deform()}setPageMap(t,e){const n=t.material.map;t.material.map=e,!n!=!e&&(t.material.needsUpdate=!0)}disposeTex(t,e){t&&!e.includes(t)&&t.userData.disposable&&t.dispose()}setPages(t,e){const n=this.leftTex,i=this.rightTex;this.leftTex=t,this.rightTex=e,this.setPageMap(this.leftPage,t),this.setPageMap(this.rightPage,e),this.disposeTex(n,[t,e]),this.disposeTex(i,[t,e])}peek(t){const e=t>0?this.rightTex:this.leftTex;this.setPageMap(this.flipFront,e),this.setPageMap(this.flipBack,e),this.flipFront.visible=this.flipBack.visible=!0}endPeek(){this.turn||(this.flipFront.visible=this.flipBack.visible=!1)}beginTurn(t,e,n){this.turn={dir:t,newLeft:e,newRight:n,oldLeft:this.leftTex,oldRight:this.rightTex},t>0?(this.setPageMap(this.flipFront,this.rightTex),this.setPageMap(this.flipBack,e),this.setPageMap(this.rightPage,n)):(this.setPageMap(this.flipBack,this.leftTex),this.setPageMap(this.flipFront,n),this.setPageMap(this.leftPage,e)),this.flipFront.visible=this.flipBack.visible=!0}commitTurn(){const t=this.turn;t&&(this.turn=null,this.leftTex=t.newLeft,this.rightTex=t.newRight,this.setPageMap(this.leftPage,t.newLeft),this.setPageMap(this.rightPage,t.newRight),this.flipFront.visible=this.flipBack.visible=!1,this.disposeTex(t.oldLeft,[t.newLeft,t.newRight]),this.disposeTex(t.oldRight,[t.newLeft,t.newRight]))}cancelTurn(){const t=this.turn;t&&(this.turn=null,this.setPageMap(this.leftPage,t.oldLeft),this.setPageMap(this.rightPage,t.oldRight),this.flipFront.visible=this.flipBack.visible=!1,this.disposeTex(t.newLeft,[t.oldLeft,t.oldRight]),this.disposeTex(t.newRight,[t.oldLeft,t.oldRight]))}setCoverLabel(t){const e=this.coverArt.material.map;this.coverArt.material.map=Nf("El susurro de la Tierra",t),e==null||e.dispose()}setCoverAngle(t,e){this.leftHinge.rotation.z=t,this.inner.position.x=kf*(1-t/Math.PI),this.spine.visible=t<1.35,e&&(this.pivot.rotation.x=Math.PI/2-Math.sin(t*.5)*.22)}get coverAngle(){return this.leftHinge.rotation.z}setClosed(){this.pivot.rotation.set(Math.PI/2,0,0),this.leftHinge.rotation.z=0,this.inner.position.x=kf,this.baseY=kl,this.spine.visible=!0,Object.assign(this.float,zl)}setOpen(){this.pivot.rotation.set(0,0,0),this.leftHinge.rotation.z=Math.PI,this.inner.position.x=0,this.baseY=Ff,this.spine.visible=!1,Object.assign(this.float,zf)}finishOpen(){const t=it.timeline();return t.to(this.pivot.rotation,{x:0,duration:1.7,ease:"power2.inOut"},0),t.to(this,{baseY:Ff,duration:2.2,ease:"power2.inOut"},0),t.to(this.float,{...zf,duration:2,ease:"sine.inOut"},0),t.call(()=>{this.spine.visible=!1},null,.1),t}finishClose(){const t=it.timeline();return this.spine.visible=!0,t.to(this.pivot.rotation,{x:Math.PI/2,duration:1.8,ease:"power2.inOut"},0),t.to(this,{baseY:kl,duration:2.4,ease:"power2.inOut"},0),t.to(this.float,{...zl,duration:2.5,ease:"sine.inOut"},.6),t}update(t,e,n,i){const r=this.float,o=n.shake;i&&this.look.lerp(i,Math.min(1,t*2.5)),this.root.position.y=this.baseY+Math.sin(e*r.speed)*r.amp+o.y*.04,this.root.position.x=o.x*.05,this.root.rotation.z=Math.sin(e*.7)*r.tilt+o.z*.025-this.look.x*.018,this.root.rotation.x=Math.sin(e*.53)*r.tilt*.6+o.y*.01+this.look.y*.022,this.root.rotation.y=r.yaw+Math.sin(e*.31)*r.tilt*1.5+this.look.x*.035,this.stage.updateWorldMatrix(!0,!1),this._n.set(0,1,0).transformDirection(this.stage.matrixWorld),this._p.setFromMatrixPosition(this.stage.matrixWorld).addScaledVector(this._n,-.006),Fp.setFromNormalAndCoplanarPoint(this._n,this._p);const a=Math.max(0,this.root.position.y),l=1-this.pivot.rotation.x/(Math.PI/2),c=3.2+l*4.2;this.shadow.scale.set(c*(1+a*.15),2.2+l*3.6,1),this.shadow.material.opacity=.42/(1+a*.45)}}const Ti=Math.PI,ZM=8,JM=.45,Bf=.075,jM=.16,Bs={drag:{k:150,zeta:.78},commit:{k:62,zeta:.64},cancel:{k:85,zeta:.42},peek:{k:55,zeta:.72}},$o=new A;class KM{constructor({canvas:t,camera:e,book:n,pointer:i},r){this.canvas=t,this.camera=e,this.book=n,this.delegate=r,this.raycaster=new Nd,this.ndc=new st,this.state="idle",this.kind=null,this.dir=1,this.theta=0,this.vel=0,this.target=0,this.spring=Bs.peek,this.committing=!1,this.locked=!1,this.prepared=!1,this.grab=null,i.fallback=this}get active(){return this.state==="pending"||this.state==="drag"}get busy(){return this.state==="settle"||this.active}restAngle(t=this.kind,e=this.dir){return t==="page"?e>0?0:Ti:t==="cover"?0:Ti}endAngle(t=this.kind,e=this.dir){return t==="page"?e>0?Ti:0:t==="cover"?Ti:0}get progress(){const t=this.restAngle();return Math.abs(this.theta-t)/Ti}setNdc(t){const e=this.canvas.getBoundingClientRect();this.ndc.set((t.clientX-e.left)/e.width*2-1,-((t.clientY-e.top)/e.height)*2+1),this.raycaster.setFromCamera(this.ndc,this.camera)}hitTest(t){this.setNdc(t);const e=this.delegate.mode,n=this.book;if(e==="cover"){const o=this.raycaster.intersectObject(n.coverArt,!1)[0];return o?{kind:"cover",dir:1,point:o.point}:null}if(e!=="reading")return null;const r=this.raycaster.intersectObjects([n.rightPage,n.leftPage],!1)[0];return r?r.object===n.rightPage?{kind:"page",dir:1,point:r.point}:{kind:this.delegate.isEnd?"close":"page",dir:-1,point:r.point}:null}toScreen(t){$o.copy(t),this.book.inner.localToWorld($o).project(this.camera);const e=this.canvas.getBoundingClientRect();return{x:e.left+($o.x+1)/2*e.width,y:e.top+(1-$o.y)/2*e.height}}onDown(t){if(this.state==="settle")return!1;const e=this.hitTest(t);if(!e)return!1;const n=this.delegate.canTurn(e.kind,e.dir);if(n==="none")return!1;this.state==="peek"&&this.kind===e.kind&&this.dir===e.dir||this.resetTo(e.kind,e.dir),this.locked=n==="locked";const{PW:r,PD:o,M:a,BLOCK_T:l,COVER_T:c}=li,h=this.book.inner.worldToLocal(e.point.clone()),u=e.kind==="cover"?r+a:r,d=Math.min(1,Math.max(.5,Math.abs(h.x)/u)),f=Math.max(-1,Math.min(1,h.z/(o/2))),g=e.kind==="cover"?l+c:0,_=this.toScreen(new A(0,g,h.z));let p;if(e.kind==="cover")p=this.toScreen(new A(u,g,h.z)).x-_.x;else{const m=this.toScreen(new A(r,0,h.z)),y=this.toScreen(new A(-r,0,h.z));p=(m.x-y.x)/2}this.grab={x:t.clientX,y:t.clientY,spineX:_.x,half:Math.max(40,p),r:d,zn:f,id:t.pointerId},this.state="pending";try{this.canvas.setPointerCapture(t.pointerId)}catch{}return this.canvas.style.cursor="grabbing",!0}onMove(t){const e=this.grab;if(!e)return;if(this.state==="pending"){const r=t.clientX-e.x,o=t.clientY-e.y;if(Math.abs(r)<ZM||Math.abs(r)<Math.abs(o)*.6)return;this.startDrag()}if(this.state!=="drag")return;const n=(t.clientX-e.spineX)/(e.half*e.r);let i=Math.acos(Math.max(-1,Math.min(1,n)));if(this.locked){const r=this.restAngle(),o=i-r;i=r+Math.sign(o)*jM*Math.tanh(Math.abs(o)/.6)}this.target=i}onUp(t){var a,l;const e=this.grab;this.grab=null;try{e&&this.canvas.hasPointerCapture(e.id)&&this.canvas.releasePointerCapture(e.id)}catch{}if(this.canvas.style.cursor="",this.state==="pending"){this.target=this.restAngle(),this.state="peek",this.spring=Bs.peek;return}if(this.state!=="drag")return;const n=this.progress,i=this.vel*(this.kind==="page"?this.dir:this.kind==="cover"?1:-1)/Ti,r=n+i*.22;this.locked&&((l=(a=this.delegate).onLockedAttempt)==null||l.call(a));const o=!this.locked&&r>JM&&n>.1;this.committing=o,this.target=o?this.endAngle():this.restAngle(),this.spring=o?Bs.commit:Bs.cancel,this.state="settle",o&&this.delegate.commit(this.kind,this.dir)}hover(t,e){var r,o;if(this.state!=="idle"&&this.state!=="peek")return;const n=e?null:this.hitTest(t),i=n?this.delegate.canTurn(n.kind,n.dir):"none";if(n&&i!=="none"){if(this.canvas.style.cursor=i==="locked"?"not-allowed":"grab",i==="ok"&&(this.state==="idle"||this.kind!==n.kind||this.dir!==n.dir)){if(this.state==="peek"&&this.progress>.01)return;this.resetTo(n.kind,n.dir),this.state="peek",n.kind==="page"&&(this.book.peek(n.dir),(o=(r=this.delegate).peek)==null||o.call(r,n.dir))}if(this.state==="peek"){const a=this.restAngle();this.target=i==="ok"?a+(a===0?Bf:-Bf):a}}else e||(this.canvas.style.cursor=""),this.state==="peek"&&(this.target=this.restAngle())}resetTo(t,e){this.kind=t,this.dir=e,this.theta=this.restAngle(t,e),this.vel=0,this.target=this.theta,this.prepared=!1,this.spring=Bs.peek}startDrag(){var t,e,n,i;this.state="drag",this.spring=Bs.drag,this.kind==="page"&&(this.book.peek(this.dir),(e=(t=this.delegate).peek)==null||e.call(t,this.dir),this.locked||(this.prepared=this.delegate.prepare(this.dir))),(i=(n=this.delegate).dragStart)==null||i.call(n,this.kind,this.dir)}update(t){var l,c;if(this.state==="idle"||t<=0)return;const{k:e,zeta:n}=this.spring,i=2*n*Math.sqrt(e),r=3,o=Math.min(t,1/30)/r;for(let h=0;h<r;h++){const u=e*(this.target-this.theta)-i*this.vel;this.vel+=u*o,this.theta+=this.vel*o,this.theta<0&&(this.theta=0,this.vel=-this.vel*.28),this.theta>Ti&&(this.theta=Ti,this.vel=-this.vel*.28)}if(this.apply(),Math.abs(this.theta-this.target)<.004&&Math.abs(this.vel)<.06)if(this.theta=this.target,this.vel=0,this.apply(),this.state==="settle"){const{kind:h,dir:u,committing:d}=this;this.state="idle",this.kind=null,this.prepared=!1,d?this.delegate.finish(h,u):this.delegate.cancel(h,u)}else this.state==="peek"&&this.target===this.restAngle()&&(this.kind==="page"&&(this.book.endPeek(),(c=(l=this.delegate).endPeek)==null||c.call(l)),this.state="idle",this.kind=null)}apply(){var e,n,i;const t=this.theta;if(this.kind==="page"){const r=Math.sin(t),a=(Math.abs(this.vel)>.35?Math.sign(this.vel):this.dir)*r*(.55+Math.min(.6,Math.abs(this.vel)*.1)),l=this.dir*(((e=this.grab)==null?void 0:e.zn)??this.lastZn??.6)*.5*r;this.grab&&(this.lastZn=this.grab.zn),this.book.setSheet(t,a,l),(i=(n=this.delegate).progress)==null||i.call(n,this.progress,this.vel,this.prepared)}else this.kind&&this.book.setCoverAngle(t,this.kind==="cover")}reset(){this.state="idle",this.kind=null,this.grab=null,this.prepared=!1,this.book.endPeek()}}const Ea=class Ea extends Lt{constructor(){super(),this.name="guardian",this.home=new A,this.glow=.6,this.squash=0,this.appearT=1,this.worldPos=new A,this.viewerPoint=new A,this.viewerBlend=0,this.faceViewer=!1,this.wave=0,this.presence=1,this.presenceTarget=1,this.presenceVel=0,this.baseScale=1.4,this.target=new A,this.qLook=new Yn,this.qRest=new Yn,this.scale.setScalar(this.baseScale),this.build()}build(){this.inner=new Lt,this.add(this.inner),this.bodyMat=new he({color:"#9ff0a6",emissive:"#5db65a",emissiveIntensity:.45,roughness:.35});const t=new Zt(X.sphere(.12,28,20),this.bodyMat);t.scale.set(1,1.08,.95),t.castShadow=!0,t.userData.ownMaterial=!0,this.inner.add(t);const e=nt.clay("#1f2a22",.3);this.arms=[];for(const i of[-1,1]){j(this.inner,X.sphere(.019,12,8),e,[i*.042,.022,.107],{cast:!1}).scale.set(1,1.25,.6),j(this.inner,X.sphere(.006,6,4),nt.basic("#ffffff"),[i*.042+.006,.032,.118],{cast:!1}),j(this.inner,X.sphere(.02,10,6),nt.clay("#ff9aa6",.9),[i*.07,-.012,.095],{cast:!1}).scale.set(1,.55,.4);const a=j(this.inner,X.sphere(.032,12,8),this.bodyMat,[i*.115,-.03,.01]);a.scale.set(.7,1,.7),this.arms.push(a)}const n=j(this.inner,X.torus(.022,.006,6,14,Math.PI),nt.clay("#1f2a22",.4),[0,-.012,.112],{cast:!1});n.rotation.z=Math.PI,j(this.inner,X.cyl(.007,.009,.07,6),nt.clay("#3e8f4a"),[0,.155,0]);for(const i of[-1,1]){const r=j(this.inner,X.sphere(.04,12,8),nt.clay("#4fae5b",.6),[i*.035,.19,0]);r.scale.set(1,.3,.55),r.rotation.z=i*.55}this.halo=Fa("#c9f7a6",.7,.75),this.add(this.halo)}appear(t,e){this.position.copy(t),this.home.copy(e),this.appearT=0,this.visible=!0;const n=it.timeline();return n.fromTo(this.inner.scale,{x:.01,y:.01,z:.01},{x:1,y:1,z:1,duration:1.1,ease:"elastic.out(1, 0.55)"},.1),n.fromTo(this,{glow:2.5},{glow:.7,duration:1.6,ease:"power2.out"},0),n.to(this,{appearT:1,duration:1.4,ease:"power2.out"},0),n.add(this.speak(),.9),n}moveTo(t,e=1){return it.to(this.home,{x:t.x,y:t.y,z:t.z,duration:e,ease:"power2.inOut"})}speak(){return it.timeline().to(this,{squash:1,duration:.12,ease:"power2.out"}).to(this,{squash:0,duration:.6,ease:"elastic.out(1, 0.4)"})}pulse(t=2){const e=it.timeline();for(let n=0;n<t;n++)e.to(this,{glow:2.2,duration:.3,ease:"power2.out"}),e.to(this,{glow:.7,duration:.6,ease:"power2.in"});return e}greet(){return it.timeline().to(this,{wave:1,duration:.3,ease:"power2.out"}).add(this.speak(),.1).add(this.pulse(1),.1).to(this,{wave:0,duration:.5,ease:"power2.in"},1.6)}update(t,e,n){const r=120*(this.presenceTarget-this.presence)-.76*Math.sqrt(120)*this.presenceVel;this.presenceVel+=r*Math.min(t,1/30),this.presence=Math.max(0,this.presence+this.presenceVel*Math.min(t,1/30)),this.scale.setScalar(this.baseScale*Math.max(1e-4,this.presence)*(1+this.viewerBlend*.12)),this.target.copy(this.home).lerp(this.viewerPoint,this.viewerBlend);const o=1-Math.pow(.02,t*(.6+this.appearT*1.4+this.viewerBlend*2));if(this.position.lerp(this.target,o),this.qRest.identity(),n&&(this.faceViewer||this.viewerBlend>.01)){const u=this.quaternion.clone();this.lookAt(n.position),this.qLook.copy(this.quaternion),this.quaternion.copy(u),this.quaternion.slerp(this.faceViewer?this.qLook:this.qRest,Math.min(1,t*5))}else this.quaternion.slerp(this.qRest,Math.min(1,t*4));const a=this.wave;this.arms&&this.arms[1].position.set(.115+a*.03,-.03+a*(.12+Math.sin(e*14)*.035),.01+a*.03),this.inner.position.y=Math.sin(e*2.1)*.035,this.inner.rotation.y=Math.sin(e*.9)*.35*(1-this.viewerBlend*.8),this.inner.rotation.z=Math.sin(e*1.3)*.08;const l=this.squash;this.inner.scale.x=this.inner.scale.z=this.appearT<1?this.inner.scale.x:1+l*.14,this.appearT>=1&&(this.inner.scale.y=1-l*.12);const c=this.glow;this.bodyMat.emissiveIntensity=.3+c*.35,this.halo.material.opacity=.35+c*.35,this.halo.scale.setScalar(.55+c*.18+Math.sin(e*3)*.03);const h=Ea.light;h&&this.visible&&this.presence>.05&&(this.getWorldPosition(this.worldPos),h.position.copy(this.worldPos),h.intensity=(.25+c*.45)*Math.min(1,this.inner.scale.x)*Math.min(1,this.presence))}};Qh(Ea,"light",null);let hs=Ea;const si={characters:{nico:{name:"Nico",color:"#f08a45"},guardian:{name:"Guardián",color:"#4fae5b"}},cover:{mood:"night",camera:"cover"},ending:{mood:"day",camera:"cover",label:"Fin"},titleSpread:{left:"Un cuento sobre cómo cuidarnos cuando la tierra se mueve",right:"El susurro de la Tierra"},pages:[{id:"p1",type:"page",number:1,title:"Un gran sueño",scene:"room",setup:{tower:"empty",nico:"tower"},mood:"afternoon",camera:"wide",quake:0,beats:[{text:"Nico tenía siete años y un gran sueño: construir la torre de bloques más alta del mundo.",do:["tower.build"]},{text:"Esa tarde le faltaba solo un bloque. El azul, su favorito.",do:["nico.showBlock"]}]},{id:"p2",type:"page",number:2,title:"Un ruido extraño",scene:"room",setup:{tower:"built",nico:"tower"},mood:"afternoon",camera:"wide",quake:0,beats:[{text:"Estiró la mano con mucho cuidado y…",do:["nico.reach"]},{text:"El piso hizo un ruido extraño. Un ruido grave, como un gruñido que venía de muy abajo.",do:[["nico.face:o","rumble"]],quake:[.14,1.5],mood:"rumble"},{text:"Los vasos empezaron a tintinear en la cocina. Nico se quedó quieto, con el bloque azul en la mano.",dialogue:{who:"nico",text:"¿Qué fue eso?"},do:[["glasses.clink","nico.pose:show"]],quake:[.22,1.2]}]},{id:"p3",type:"page",number:3,title:"¡La casa tiembla!",scene:"room",setup:{tower:"built",nico:"tower",face:"o"},mood:"quake",camera:"wide",quake:.3,beats:[{text:"¡La casa empezó a temblar!",do:["nico.pose:worried"],quake:[.75,1.2]},{text:"La lámpara se balanceó de un lado a otro. La torre se derrumbó en mil pedazos.",do:[["tower.fall","wobble:lampara"]]},{text:"La tierra se estaba moviendo. Y justo en ese instante, algo se despertó dentro del pecho de Nico.",do:["nico.heart:2"],quake:[.5,1.5]}]},{id:"p4",type:"page",number:4,title:"Una voz valiente",scene:"room",setup:{tower:"fallen",nico:"center",face:"o",heart:!0},mood:"quake",camera:"wide",quake:.42,beats:[{text:"Era una voz pequeñita, pero muy valiente.",dialogue:{who:"guardian",text:"¡Aquí estoy! ¡Soy tu Guardián! Me desperté para cuidarte."},do:["guardian.appear","nico.face:smile"]},{text:"Nico quería correr hacia la puerta.",do:["nico.runToDoor"]},{dialogue:{who:"guardian",text:"¡Espera! Mientras la tierra se mueve, no se corre. Primero, nos protegemos."},do:["guardian.stop"]}]},{id:"p5",type:"page",number:5,title:"Mira a tu alrededor",scene:"room",setup:{tower:"fallen",nico:"center",guardian:!0},mood:"quake",camera:"wide",quake:.4,beats:[{dialogue:{who:"guardian",text:"Mira a tu alrededor. Aléjate de las ventanas y de las cosas que se pueden caer."},do:[["nico.lookAround","hazards.wobble"]]},{text:"Nico vio la mesa grande del comedor, fuerte y firme.",dialogue:{who:"guardian",text:"¡Allá! Vamos despacito."},do:["table.glow"]}]},{id:"a1",type:"activity",activity:"safePlace",samePage:!0},{id:"p6",type:"page",number:6,title:"Tres pasos mágicos",scene:"underTable",setup:{nicoPose:"kneel"},mood:"quake",camera:"close",quake:.38,beats:[{dialogue:{who:"guardian",text:"Ahora, tres pasos mágicos."},do:["guardian.glow"]},{text:"Nico se agachó debajo de la mesa, bien pequeñito, como una tortuga.",dialogue:{who:"guardian",text:"Uno: ¡agáchate!"},do:["nico.pose:crouch"]},{text:"Nico se tapó la cabeza y el cuello con los brazos.",dialogue:{who:"guardian",text:"Dos: ¡cúbrete!"},do:["nico.pose:cover"]}]},{id:"a2",type:"activity",activity:"protectSteps",samePage:!0},{id:"p7",type:"page",number:7,title:"¡Sujétate!",scene:"underTable",setup:{nicoPose:"cover"},mood:"quake",camera:"close",quake:.45,beats:[{text:"Nico agarró fuerte una pata de la mesa.",dialogue:{who:"guardian",text:"Tres: ¡sujétate!"},do:["nico.pose:hold"]},{text:"Afuera, las cosas seguían sonando: clin, clan, crac.",do:["sounds"]},{dialogue:{who:"guardian",text:"Aquí estoy contigo. No te sueltes. Ya va a pasar."},do:["guardian.hug"]}]},{id:"p8",type:"page",number:8,title:"Pum, pum, pum",scene:"underTable",setup:{nicoPose:"hold"},mood:"quake",camera:"close",quake:.4,beats:[{text:"Nico sentía el corazón como un tambor: pum, pum, pum.",do:["heartbeat"]},{dialogue:{who:"guardian",text:"Soy yo. Te doy energía para que estés atento."},do:["guardian.energy"]},{text:"Nico respiró hondo y se quedó quieto, bien agarrado. Poco a poco, el temblor se hizo más suave… más suave…",quake:[.06,6],mood:"calming"}]},{id:"p9",type:"page",number:9,title:"Silencio",scene:"underTable",setup:{nicoPose:"hold",shards:!0},mood:"still",camera:"close",quake:0,beats:[{text:"Hasta que la casa se quedó quieta. Silencio.",do:["silence"]},{dialogue:{who:"nico",text:"¿Ya puedo salir?"},do:["nico.peek"]},{dialogue:{who:"guardian",text:"Espera un momentito. Mira bien antes de moverte. Puede haber cosas rotas en el piso."},do:["shards.glint"]}]},{id:"p10",type:"page",number:10,title:"Sin correr",scene:"exit",setup:{},mood:"still",camera:"wide",quake:0,beats:[{text:"Nico salió despacito de debajo de la mesa.",do:["nico.crawlOut"]},{dialogue:{who:"guardian",text:"Ahora caminamos, sin correr y sin empujar. Con zapatos, por si hay vidrios."},do:[["shoes.glint","shards.glint"]]},{text:"Nico se puso los zapatos y caminó con cuidado hacia la puerta.",do:["nico.shoesOn","door.open"]}]},{id:"a3",type:"activity",activity:"safeRoute",number:"★",title:"Camino al lugar seguro",scene:"route",setup:{},mood:"still",camera:"route",quake:0},{id:"p11",type:"page",number:11,title:"Un lugar abierto",scene:"patio",setup:{nico:"door"},mood:"golden",camera:"patio",quake:0,beats:[{text:"Afuera, el Guardián le señaló un lugar abierto, en medio del patio.",do:["guardian.point","nico.walkTo:center"]},{dialogue:{who:"guardian",text:"Lejos de paredes, postes y cables. Aquí nada se nos puede caer encima."},do:["hazards.wobble"]},{text:"Nico se sentó allí. Esperaría a que llegara un adulto de confianza.",do:["nico.pose:sit"]}]},{id:"p12",type:"page",number:12,title:"La réplica",scene:"patio",setup:{nico:"center",nicoPose:"sit"},mood:"golden",camera:"patio",quake:0,beats:[{text:"De pronto, la tierra se movió otra vez, un poquito.",do:["nico.face:o"],quake:[.22,.8],mood:"rumble"},{dialogue:{who:"guardian",text:"Eso se llama réplica. Es un temblor más pequeño. Si pasa, haz lo mismo."},do:["guardian.glow"]},{text:"Nico se agachó, se cubrió la cabeza y esperó. Esta vez, ya sabía qué hacer.",do:["nico.pose:cover","calm"],quake:[0,4],mood:"golden"}]},{id:"p13",type:"page",number:13,title:"Gracias, Guardián",scene:"patio",setup:{nico:"center",nicoPose:"kneel"},mood:"golden",camera:"patio",quake:0,beats:[{text:"Cuando todo se calmó, Nico sonrió.",dialogue:{who:"nico",text:"Gracias, Guardián. Sin ti no habría sabido cómo protegerme."},do:[["nico.pose:idle","nico.face:smile"],"rainbow.show"]},{dialogue:{who:"guardian",text:"Para eso estoy. Cuando haya peligro, yo te aviso… y tú te cuidas."},do:["celebrate"]}]}]},QM={guardian:`<svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="18" r="11" fill="#b5f5b9"/>
        <path d="M16 7c-1-3-4-4-6-3 1 2 3 3 6 3zm0 0c1-3 4-4 6-3-1 2-3 3-6 3z" fill="#4fae5b"/>
        <ellipse cx="12.5" cy="17" rx="1.6" ry="2" fill="#1f2a22"/><ellipse cx="19.5" cy="17" rx="1.6" ry="2" fill="#1f2a22"/>
        <path d="M13 21.5q3 2.5 6 0" stroke="#1f2a22" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    </svg>`,nico:`<svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="17" r="11" fill="#f7d2b6"/>
        <path d="M5.5 15C6 8 11 5 16 5s10 3 10.5 10c-3-2-6-4-10.5-4S8.5 13 5.5 15z" fill="#7b4a2d"/>
        <circle cx="12.5" cy="18" r="1.6" fill="#2b2233"/><circle cx="19.5" cy="18" r="1.6" fill="#2b2233"/>
        <path d="M13.5 22q2.5 2 5 0" stroke="#7a2e3a" stroke-width="1.5" fill="none" stroke-linecap="round"/>
    </svg>`},tS={turtle:`<svg viewBox="0 0 64 48" aria-hidden="true">
        <ellipse cx="32" cy="30" rx="20" ry="13" fill="#5db65a"/>
        <path d="M18 28c3-9 25-9 28 0" stroke="#3f8f3c" stroke-width="2.5" fill="none"/>
        <path d="M32 18v24M22 22l5 16M42 22l-5 16" stroke="#3f8f3c" stroke-width="2" opacity=".6"/>
        <circle cx="55" cy="30" r="6" fill="#9fdc8f"/><circle cx="57" cy="28.5" r="1.3" fill="#2b2233"/>
        <ellipse cx="19" cy="42" rx="5" ry="3" fill="#9fdc8f"/><ellipse cx="45" cy="42" rx="5" ry="3" fill="#9fdc8f"/>
    </svg>`,cover:`<svg viewBox="0 0 64 48" aria-hidden="true">
        <circle cx="32" cy="28" r="12" fill="#f7d2b6"/>
        <path d="M20 26c0-8 5-12 12-12s12 4 12 12" fill="#7b4a2d"/>
        <path d="M10 30C12 14 22 8 32 8s20 6 22 22" stroke="#f6b94a" stroke-width="9" fill="none" stroke-linecap="round"/>
        <circle cx="10" cy="31" r="5" fill="#f7d2b6"/><circle cx="54" cy="31" r="5" fill="#f7d2b6"/>
        <circle cx="28" cy="30" r="1.6" fill="#2b2233"/><circle cx="36" cy="30" r="1.6" fill="#2b2233"/>
    </svg>`,hold:`<svg viewBox="0 0 64 48" aria-hidden="true">
        <rect x="6" y="6" width="52" height="8" rx="4" fill="#e9a45e"/>
        <rect x="40" y="12" width="8" height="34" rx="3" fill="#c4733f"/>
        <path d="M14 34c6-6 14-8 26-6" stroke="#f6b94a" stroke-width="9" fill="none" stroke-linecap="round"/>
        <rect x="35" y="22" width="16" height="12" rx="6" fill="#f7d2b6"/>
        <path d="M38 22v12M42 22v12M46 22v12" stroke="#e7b896" stroke-width="1.5"/>
    </svg>`},Ke=s=>document.querySelector(s),Ei=new A,eS={cover:{label:"Arrastra la tapa para abrir el cuento",anchor:"cover",dir:"left"},next:{label:"Arrastra la hoja para pasar la página",anchor:"right",dir:"left"},close:{label:"Arrastra la hoja para cerrar el libro",anchor:"left",dir:"right"}};function Hf(s){return s.split(" ").map((t,e)=>`<span class="w" style="--i:${e}">${la(t)} </span>`).join("")}function la(s){return s.replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}class nS{constructor(){this.el={loader:Ke("[data-loader]"),narration:Ke("[data-narration]"),dialogue:Ke("[data-dialogue]"),speaker:Ke("[data-speaker]"),dots:Ke("[data-dots]"),activity:Ke("[data-activity]"),activityTitle:Ke("[data-activity-title]"),activityStops:Ke("[data-activity-stops]"),tray:Ke("[data-tray]"),hotspots:Ke("[data-hotspots]"),hint:Ke("[data-hint]"),hintLabel:Ke("[data-hint-label]"),toast:Ke("[data-toast]"),gBubble:Ke("[data-guardian-bubble]"),veil:Ke("[data-veil]")},this.el.narrationText=this.el.narration.querySelector(".bubble__text"),this.el.dialogueText=this.el.dialogue.querySelector(".bubble__text"),this.el.gBubbleText=this.el.gBubble.querySelector(".g-bubble__text"),this.hint=null,this.gTarget=null,this.gDismiss=null,this.el.gBubble.addEventListener("click",()=>{var t;return(t=this.gDismiss)==null?void 0:t.call(this)})}hideLoader(){this.el.loader.classList.add("is-done"),setTimeout(()=>this.el.loader.remove(),1200)}showDragHint(t,e=0){clearTimeout(this.hintTimer),this.hintTimer=setTimeout(()=>{const n=eS[t];this.hint=n;const i=this.el.hint;this.el.hintLabel.textContent=n.label,i.dataset.dir=n.dir,i.hidden=!1,i.classList.remove("is-leaving")},e*1e3)}hideDragHint(){clearTimeout(this.hintTimer),!this.el.hint.hidden&&(this.el.hint.classList.add("is-leaving"),this.hint=null,setTimeout(()=>{this.hint||(this.el.hint.hidden=!0)},300))}toast(t){const e=this.el.toast;e.textContent=t,e.hidden=!1,e.classList.remove("is-in"),e.offsetWidth,e.classList.add("is-in"),clearTimeout(this.toastTimer),this.toastTimer=setTimeout(()=>{e.hidden=!0},2400)}showGuardianBubble(t,e,n){const i=this.el.gBubble;this.gTarget=e,this.gDismiss=n,this.el.gBubbleText.innerHTML=Hf(t),i.hidden=!1,i.classList.remove("is-leaving"),i.style.animation="none",i.offsetWidth,i.style.animation=""}hideGuardianBubble(){const t=this.el.gBubble;this.gDismiss=null,!t.hidden&&(t.classList.add("is-leaving"),setTimeout(()=>{t.classList.contains("is-leaving")&&(t.hidden=!0,this.gTarget=null)},320))}showVeil(t){this.el.veil.classList.toggle("is-on",t)}update(t,e){const n=window.innerWidth,i=window.innerHeight;if(this.hint&&!this.el.hint.hidden&&e){e.anchors[this.hint.anchor].getWorldPosition(Ei),Ei.project(t);const r=Math.min(n-120,Math.max(120,(Ei.x+1)/2*n)),o=Math.min(i-60,Math.max(60,(1-Ei.y)/2*i));this.el.hint.style.translate=`${r}px ${o}px`}if(this.gTarget&&!this.el.gBubble.hidden){this.gTarget.getWorldPosition(Ei),Ei.project(t);const r=(Ei.x+1)/2*n,o=(1-Ei.y)/2*i,a=r>n*.5,l=this.el.gBubble;l.dataset.side=a?"left":"right";const c=Math.min(150,n*.11),h=a?r-c:r+c;l.style.translate=`calc(${h}px - ${a?"100%":"0px"}) calc(${o}px - 50%)`}}showText({text:t,dialogue:e}={},n=null){this.setBubble(this.el.narration,this.el.narrationText,t),e?this.say(e.who,e.text):this.hideBubble(this.el.dialogue),this.setDots(t?n:null)}setDots(t){const e=this.el.dots;if(!t||t.steps<2){e.innerHTML="";return}e.innerHTML=Array.from({length:t.steps},(n,i)=>`<i class="${i<=t.step?"on":""}"></i>`).join("")}say(t,e,n=null){const i=this.el.dialogue,r=si.characters[t]??{name:t,color:"#5b4d6e"};this.el.speaker.innerHTML=`${QM[t]??""}<span>${la(r.name)}</span>`,this.el.speaker.style.setProperty("--speaker-color",r.color),i.classList.remove("is-ok","is-oops","is-leaving"),this.setBubble(i,this.el.dialogueText,e,!0),n&&i.classList.add(n==="ok"?"is-ok":"is-oops")}setBubble(t,e,n,i=!1){if(!n)return this.hideBubble(t);!i&&!t.hidden&&e.dataset.text===n||(e.dataset.text=n,e.innerHTML=Hf(n),t.classList.remove("is-leaving"),t.hidden=!1,t.style.animation="none",t.offsetWidth,t.style.animation="")}hideBubble(t){t.hidden||(t.classList.add("is-leaving"),clearTimeout(t._t),t._t=setTimeout(()=>{if(t.classList.contains("is-leaving")){t.hidden=!0,t.classList.remove("is-leaving");const e=t.querySelector(".bubble__text");e&&(e.dataset.text="")}},340))}clearText(){this.hideBubble(this.el.narration),this.hideBubble(this.el.dialogue)}showActivity(t,e=[]){const n=this.el.activity;this.el.activityTitle.textContent=t,this.el.activityStops.innerHTML=e.map((i,r)=>`<li data-i="${r}">${r+1}. ${la(i)}</li>`).join(""),n.classList.remove("is-complete"),n.querySelector(".activity-chip__label").textContent="Actividad",n.hidden=!1}setStop(t){this.el.activityStops.querySelectorAll("li").forEach((e,n)=>{e.classList.toggle("is-done",n<t),e.classList.toggle("is-current",n===t)})}completeActivity(){const t=this.el.activity;t.classList.add("is-complete"),t.querySelector(".activity-chip__label").textContent="¡Actividad lograda!",this.el.activityStops.querySelectorAll("li").forEach(e=>{e.classList.remove("is-current"),e.classList.add("is-done")})}shakeActivity(){const t=this.el.activity;t.hidden||(t.classList.remove("shake"),t.offsetWidth,t.classList.add("shake"))}hideActivity(){this.el.activity.hidden=!0}showSteps(t,e){const n=this.el.tray;n.innerHTML="",n.classList.add("glass"),t.forEach((i,r)=>{const o=document.createElement("button");o.type="button",o.className="step-btn glass",o.style.setProperty("--i",r),o.innerHTML=`<span class="step-btn__num">${r+1}</span>${tS[i.icon]??""}<span>${la(i.label)}</span>`,o.addEventListener("click",()=>e(r)),n.append(o)}),n.hidden=!1}markStep(t,e){const n=this.el.tray.children[t];if(n){if(e==="wrong"){n.classList.remove("is-wrong"),n.offsetWidth,n.classList.add("is-wrong");return}n.classList.toggle("is-done",e==="done")}}setNextStep(t){[...this.el.tray.children].forEach((e,n)=>e.classList.toggle("is-next",n===t))}hideSteps(){this.el.tray.hidden=!0,this.el.tray.innerHTML=""}}const Ar=new A;class iS{constructor(t,e){this.container=t,this.camera=e,this.items=new Map}add(t,e,{label:n="",onClick:i=null,className:r="",index:o=0,showLabel:a=!1,passive:l=!1}={}){this.remove(t);const c=document.createElement("button");return c.type="button",c.className=`hotspot ${r}`,c.style.setProperty("--i",o),c.setAttribute("aria-label",n),c.innerHTML=`<span class="hotspot__ring"></span>${n?`<span class="hotspot__label">${n}</span>`:""}`,a&&c.classList.add("show-label"),i&&c.addEventListener("click",h=>{h.stopPropagation(),i(t)}),(!i||l)&&(c.style.pointerEvents="none"),i||(c.tabIndex=-1),this.container.append(c),this.items.set(t,{el:c,object:e}),c}setClass(t,e,n=!0){var i;(i=this.items.get(t))==null||i.el.classList.toggle(e,n)}remove(t){const e=this.items.get(t);e&&(e.el.remove(),this.items.delete(t))}clear(){for(const t of[...this.items.keys()])this.remove(t)}update(){if(!this.items.size)return;const t=window.innerWidth,e=window.innerHeight;for(const{el:n,object:i}of this.items.values()){i.getWorldPosition(Ar),Ar.project(this.camera);const r=Ar.z<1&&i.visible!==!1;n.style.opacity=r?"":"0",n.style.transform=`translate(${(Ar.x+1)/2*t}px, ${(1-Ar.y)/2*e}px)`}}}class sS{constructor(t,e){this.canvas=t,this.camera=e,this.raycaster=new Nd,this.ndc=new st,this.plane=new oi(new A(0,1,0),0),this.hit=new A,this.clickables=new Map,this.draggables=new Map,this.drag=null,this.down=null,this.enabled=!0,this.fallback=null,t.addEventListener("pointerdown",n=>this.onDown(n)),t.addEventListener("pointermove",n=>this.onMove(n)),t.addEventListener("pointerup",n=>this.onUp(n)),t.addEventListener("pointercancel",n=>this.onUp(n,!0)),t.addEventListener("pointerleave",n=>{var i,r;n.pointerType==="mouse"&&!((i=this.fallback)!=null&&i.active)&&((r=this.fallback)==null||r.hover(n,!0))})}addClickable(t,e){this.clickables.set(t,e)}addDraggable(t,e){this.draggables.set(t,e)}remove(t){this.clickables.delete(t),this.draggables.delete(t)}clear(){this.clickables.clear(),this.draggables.clear(),this.drag=null,this.canvas.style.cursor=""}setNdc(t){const e=this.canvas.getBoundingClientRect();this.ndc.set((t.clientX-e.left)/e.width*2-1,-((t.clientY-e.top)/e.height)*2+1),this.raycaster.setFromCamera(this.ndc,this.camera)}pick(t){if(!t.size)return null;const e=this.raycaster.intersectObjects([...t.keys()],!0);for(const n of e){let i=n.object;for(;i;){if(t.has(i))return i;i=i.parent}}return null}planePoint(t){const e=new A;return t.getWorldPosition(e),this.plane.constant=-e.y,this.raycaster.ray.intersectPlane(this.plane,this.hit)?t.worldToLocal(this.hit.clone()):null}onDown(t){var i,r;if(!this.enabled)return;this.setNdc(t);const e=this.pick(this.draggables);if(e){const o=this.draggables.get(e);this.drag={object:e,opts:o};try{this.canvas.setPointerCapture(t.pointerId)}catch{}this.canvas.style.cursor="grabbing",(i=o.onStart)==null||i.call(o);return}const n=this.pick(this.clickables);!n&&((r=this.fallback)!=null&&r.onDown(t))||(this.down={x:t.clientX,y:t.clientY,object:n})}onMove(t){var e,n,i,r;if(this.enabled){if(this.setNdc(t),this.drag){const o=this.planePoint(this.drag.opts.space);o&&((n=(e=this.drag.opts).onMove)==null||n.call(e,o));return}if((i=this.fallback)!=null&&i.active)return this.fallback.onMove(t);if(t.pointerType==="mouse"){const o=this.pick(this.draggables)?"grab":this.pick(this.clickables)?"pointer":"";this.canvas.style.cursor=o,(r=this.fallback)==null||r.hover(t,!!o)}}}onUp(t,e=!1){var i,r,o;if((i=this.fallback)!=null&&i.active)return this.fallback.onUp(t);if(this.drag){const{opts:a}=this.drag;this.setNdc(t);const l=this.planePoint(a.space);this.drag=null,this.canvas.style.cursor="";try{this.canvas.hasPointerCapture(t.pointerId)&&this.canvas.releasePointerCapture(t.pointerId)}catch{}(r=a.onDrop)==null||r.call(a,l,e);return}const n=this.down;this.down=null,!(!n||!n.object||e)&&(Math.hypot(t.clientX-n.x,t.clientY-n.y)>12||(o=this.clickables.get(n.object))==null||o(n.object))}}const Bn={skin:"#f7d2b6",hair:"#7b4a2d",sweater:"#f6b94a",sweaterDark:"#ec9f35",pants:"#5eaff2",sock:"#ffffff",shoe:Q.red,cheek:"#f59a9a",eye:"#2b2233"},Vf=.24,Bl={idle:{armLx:.08,armLz:.12,armRx:.08,armRz:-.12,legLx:0,legRx:0,crouch:0,lean:0,headX:0,headY:0,headZ:0},show:{armLx:.1,armLz:.15,armRx:-1.35,armRz:-.25,legLx:0,legRx:0,crouch:0,lean:0,headX:.12,headY:-.25,headZ:.05},reach:{armLx:.2,armLz:.25,armRx:-2.75,armRz:-.15,legLx:.12,legRx:-.1,crouch:0,lean:-.08,headX:-.25,headY:0,headZ:0},worried:{armLx:-.5,armLz:.55,armRx:-1.2,armRz:-.5,legLx:.05,legRx:-.05,crouch:.05,lean:.05,headX:0,headY:0,headZ:.08},run:{armLx:-.6,armLz:.2,armRx:.5,armRz:-.2,legLx:0,legRx:0,crouch:0,lean:.18,headX:0,headY:0,headZ:0},stop:{armLx:.35,armLz:.5,armRx:.35,armRz:-.5,legLx:.25,legRx:-.15,crouch:0,lean:-.15,headX:-.1,headY:.15,headZ:0},kneel:{armLx:-.35,armLz:.2,armRx:-.35,armRz:-.2,legLx:-1.45,legRx:-1.45,crouch:.85,lean:.12,headX:.05,headY:0,headZ:0},crouch:{armLx:-.9,armLz:.1,armRx:-.9,armRz:-.1,legLx:-1.55,legRx:-1.55,crouch:1,lean:.55,headX:.25,headY:0,headZ:0},cover:{armLx:-2.85,armLz:.42,armRx:-2.85,armRz:-.42,legLx:-1.55,legRx:-1.55,crouch:1,lean:.55,headX:.35,headY:0,headZ:0},hold:{armLx:-2.85,armLz:.42,armRx:-1.15,armRz:-.85,legLx:-1.55,legRx:-1.55,crouch:1,lean:.5,headX:.3,headY:-.2,headZ:0},peek:{armLx:-.5,armLz:.3,armRx:-1.1,armRz:-.8,legLx:-1.5,legRx:-1.5,crouch:.9,lean:.2,headX:-.15,headY:.35,headZ:.1},sit:{armLx:-.2,armLz:.35,armRx:-.2,armRz:-.35,legLx:-1.5,legRx:-1.5,crouch:.95,lean:-.05,headX:-.05,headY:0,headZ:0},cheer:{armLx:-2.7,armLz:.45,armRx:-2.7,armRz:-.45,legLx:0,legRx:0,crouch:0,lean:-.05,headX:-.2,headY:0,headZ:0},dangle:{armLx:-2.4,armLz:.6,armRx:-2.4,armRz:-.6,legLx:.3,legRx:-.3,crouch:0,lean:0,headX:-.15,headY:0,headZ:0}};class rS extends Lt{constructor(){super(),this.name="nico",this.p={...Bl.idle,lift:0},this.walking=0,this.walkPhase=0,this.blink=0,this.nextBlink=2,this.heartGlow=0,this.build()}build(){const t=nt.clay(Bn.skin,.7),e=nt.clay(Bn.sweater),n=nt.clay(Bn.pants);this.hips=new Lt,this.hips.position.y=Vf,this.add(this.hips),this.legs=[-1,1].map(o=>{const a=new Lt;a.position.set(o*.07,0,0),j(a,X.capsule(.058,.12),n,[0,-.11,0]);const l=j(a,X.sphere(.062,16,12),nt.clay(Bn.sock),[0,-.205,.025]);l.scale.set(1,.62,1.4);const c=j(a,X.rbox(.13,.08,.2,.035),nt.clay(Bn.shoe,.6),[0,-.205,.03]);return c.visible=!1,a.userData.shoe=c,a.userData.sock=l,this.hips.add(a),a}),this.body=new Lt,this.hips.add(this.body),j(this.body,X.capsule(.145,.1,8,16),e,[0,.15,0]).scale.set(1,1,.9),j(this.body,X.torus(.1,.025,8,20),nt.clay(Bn.sweaterDark),[0,.3,0]).rotation.x=Math.PI/2,this.heart=Fa("#ffb36b",0,.95),this.heart.position.set(0,.17,.16),this.body.add(this.heart),this.arms=[-1,1].map(o=>{const a=new Lt;return a.position.set(o*.155,.26,0),j(a,X.capsule(.046,.12),e,[0,-.1,0]),j(a,X.sphere(.052,14,10),t,[0,-.2,0]),this.body.add(a),a}),this.armR=this.arms[0],this.armL=this.arms[1],this.hand=new Lt,this.hand.position.set(0,-.24,.02),this.armR.add(this.hand),this.head=new Lt,this.head.position.y=.5,this.body.add(this.head),j(this.head,X.sphere(.185,28,20),t,[0,0,0]);const r=j(this.head,X.hemi(.195,28,12,.55),nt.clay(Bn.hair,.85),[0,.012,-.012]);r.rotation.x=-.32;for(const[o,a,l,c]of[[-.08,.125,.115,.065],[0,.14,.125,.07],[.08,.125,.115,.065],[.15,.06,.07,.055],[-.15,.06,.07,.055]])j(this.head,X.sphere(c,14,10),nt.clay(Bn.hair,.85),[o,a,l]);j(this.head,X.sphere(.04,12,8),t,[.183,-.01,0]),j(this.head,X.sphere(.04,12,8),t,[-.183,-.01,0]),this.eyes=[-1,1].map(o=>{const a=new Lt;return a.position.set(o*.066,.005,.165),j(a,X.sphere(.026,14,10),nt.clay(Bn.eye,.3),[0,0,0],{cast:!1}),j(a,X.sphere(.009,8,6),nt.basic("#ffffff"),[.008,.01,.022],{cast:!1}),this.head.add(a),a});for(const o of[-1,1])j(this.head,X.sphere(.036,12,8),nt.clay(Bn.cheek,.9),[o*.112,-.055,.138],{cast:!1}).scale.set(1,.6,.45);this.mouths={smile:j(this.head,X.torus(.032,.009,6,16,Math.PI),nt.clay("#7a2e3a",.6),[0,-.055,.172],{cast:!1}),o:j(this.head,X.sphere(.024,12,10),nt.clay("#7a2e3a",.6),[0,-.068,.168],{cast:!1}),worried:j(this.head,X.torus(.026,.008,6,16,Math.PI),nt.clay("#7a2e3a",.6),[0,-.085,.17],{cast:!1})},this.mouths.smile.rotation.z=Math.PI,this.mouths.o.scale.set(.9,1.2,.5),this.face("smile"),this.hit=new Zt(X.box(.5,.95,.5),nt.hit()),this.hit.position.y=.47,this.add(this.hit)}face(t){for(const[e,n]of Object.entries(this.mouths))n.visible=e===t;this.currentFace=t}pose(t,e=.7,n="back.out(1.4)"){const i=Bl[t];return i?(this.currentPose=t,it.to(this.p,{...i,duration:e,ease:n,overwrite:"auto"})):it.timeline()}poseInstant(t){Object.assign(this.p,Bl[t]),this.currentPose=t}setShoes(t){for(const e of this.legs)e.userData.shoe.visible=t,e.userData.sock.visible=!t}hold(t){this.hand.clear(),t&&this.hand.add(t)}turnTo(t,e,n=.5){let r=Math.atan2(t-this.position.x,e-this.position.z)-this.rotation.y;return r=Math.atan2(Math.sin(r),Math.cos(r)),it.to(this.rotation,{y:this.rotation.y+r,duration:n,ease:"power2.out"})}walkTo(t,e,{speed:n=.75,face:i=!0,run:r=!1}={}){const o=Math.hypot(t-this.position.x,e-this.position.z),a=Math.max(.35,o/n),l=it.timeline();return i&&l.add(this.turnTo(t,e,.35),0),l.call(()=>{this.walking=r?1.6:1},null,.1),l.to(this.position,{x:t,z:e,duration:a,ease:"sine.inOut"},.1),l.call(()=>{this.walking=0}),l}heartbeat(t=3){const e=it.timeline();for(let n=0;n<t;n++)e.to(this,{heartGlow:1,duration:.14,ease:"power2.out"}),e.to(this,{heartGlow:.35,duration:.5,ease:"power2.in"});return e}hop(){return it.timeline().to(this.p,{lift:.12,duration:.18,ease:"power2.out"}).to(this.p,{lift:0,duration:.35,ease:"bounce.out"})}update(t,e,n){const i=this.p;let r=0,o=0;this.walking>0?(this.walkPhase+=t*10*this.walking,r=Math.sin(this.walkPhase)*.55,o=Math.abs(Math.cos(this.walkPhase))*.025):this.walkPhase=0;const a=Math.sin(e*2.2)*.012;this.hips.position.y=Vf-i.crouch*.19+i.lift+o,this.legs[0].rotation.x=i.legRx+r,this.legs[1].rotation.x=i.legLx-r,this.body.rotation.x=i.lean+a*.5,this.body.scale.y=1+a*.4,this.armR.rotation.x=i.armRx-r*.7,this.armR.rotation.z=i.armRz,this.armL.rotation.x=i.armLx+r*.7,this.armL.rotation.z=i.armLz,this.head.rotation.set(i.headX+a,i.headY,i.headZ),n.intensity>.01?(this.body.rotation.z=n.shake.x*.08,this.head.rotation.z+=n.shake.z*.06):this.body.rotation.z*=.9,this.nextBlink-=t,this.nextBlink<0&&(this.blink=.14,this.nextBlink=2+Math.random()*3),this.blink=Math.max(0,this.blink-t);const l=this.blink>0?.15:1;this.eyes[0].scale.y=this.eyes[1].scale.y=l;const c=this.heartGlow;this.heart.visible=c>.01,this.heart.scale.setScalar(.08+c*.38),this.heart.material.opacity=c}}function za({w:s=1.5,d:t=.92,h:e=.78}={}){const n=new Lt;n.name="mesa";const i=j(n,X.rbox(s,.08,t,.03),nt.clay(Q.wood,.7),[0,e-.04,0],{cast:!0,receive:!0});j(n,X.rbox(s-.12,.06,t-.12,.02),nt.clay(Q.woodDark,.75),[0,e-.1,0]);const r=e-.1;n.userData.legs=[];for(const a of[-1,1])for(const l of[-1,1]){const c=j(n,X.cyl(.042,.034,r,12),nt.clay(Q.woodDark,.75),[a*(s/2-.1),r/2,l*(t/2-.1)]);n.userData.legs.push(c)}n.userData.top=i,n.userData.height=e;const o=new Zt(X.box(s,e,t),nt.hit());return o.position.y=e/2,n.add(o),n}function Hp(){const s=new Lt;s.name="sofa";const t=nt.clay("#c792ea",.85),e=nt.clay("#dcb4f5",.85);j(s,X.rbox(1.15,.24,.55,.08),t,[0,.17,0]),j(s,X.rbox(1.15,.46,.16,.08),t,[0,.4,-.2]);for(const i of[-1,1])j(s,X.rbox(.16,.34,.55,.07),t,[i*.56,.27,0]),j(s,X.rbox(.44,.1,.42,.05),e,[i*.23,.33,.03]),j(s,X.cyl(.03,.025,.06,8),nt.clay(Q.woodDark),[i*.5,.03,.2]),j(s,X.cyl(.03,.025,.06,8),nt.clay(Q.woodDark),[i*.5,.03,-.2]);return j(s,X.rbox(.24,.22,.08,.06),nt.clay(Q.yellow),[-.32,.47,-.08]).rotation.set(-.2,.2,.15),s}function Hh(){const s=new Lt;s.name="estante";const t=nt.clay("#e07b53",.75),e=nt.clay("#f6c2a4",.9),n=.66,i=1.3,r=.3;j(s,X.rbox(.05,i,r,.015),t,[-n/2,i/2,0]),j(s,X.rbox(.05,i,r,.015),t,[n/2,i/2,0]),j(s,X.box(n,i,.02),e,[0,i/2,-r/2+.01]);const o=ki(12),a=[Q.red,Q.blue,Q.yellow,Q.green,Q.lilac,Q.orange];for(let c=0;c<4;c++){const h=.02+c*(i-.04)/3;if(j(s,X.rbox(n+.05,.045,r,.015),t,[0,h,0]),c===3)break;let u=-n/2+.06,d=0;for(;u<n/2-.1;){const f=.05+o()*.04,g=.22+o()*.12,_=j(s,X.rbox(f,g,.2,.012),nt.clay(a[(c*3+d)%a.length],.8),[u+f/2,h+.022+g/2,.01]);o()>.8&&(_.rotation.z=-.25,_.position.x+=.03),u+=f+.012,d++}}j(s,X.cyl(.07,.055,.1,12),nt.clay(Q.orange),[.15,i+.07,0]),j(s,X.sphere(.09,12,8),nt.clay(Q.green),[.15,i+.17,0]);const l=new Zt(X.box(n+.1,i+.2,r),nt.hit());return l.position.y=i/2,s.add(l),s}function Ba({w:s=.95,h:t=.78}={}){const e=new Lt;e.name="ventana";const n=nt.clay("#ffffff",.6),i=.06;j(e,X.rbox(s,i,.07,.02),n,[0,t/2,0]),j(e,X.rbox(s,i,.07,.02),n,[0,-t/2,0]),j(e,X.rbox(i,t,.07,.02),n,[-s/2,0,0]),j(e,X.rbox(i,t,.07,.02),n,[s/2,0,0]),j(e,X.box(.03,t,.04),n,[0,0,.01]),j(e,X.box(s,.03,.04),n,[0,0,.01]);const r=j(e,X.plane(s-.04,t-.04),nt.custom("windowGlass",()=>new he({color:"#bfe6ff",emissive:"#9fd6ff",emissiveIntensity:.35,roughness:.15,transparent:!0,opacity:.88})),[0,0,-.005],{cast:!1});e.userData.glass=r,j(e,X.rbox(s+.16,.05,.14,.02),n,[0,-t/2-.04,.04]);for(const a of[-1,1]){const l=j(e,X.rbox(.2,t+.18,.05,.05),nt.clay("#f28b82",.85),[a*(s/2+.1),.02,.06]);l.rotation.z=a*.04}const o=new Zt(X.box(s+.4,t+.25,.2),nt.hit());return e.add(o),e}let Zo=null;function Vh(){const s=new Lt;if(s.name="cuadro",j(s,X.rbox(.62,.48,.05,.02),nt.clay(Q.yellow,.6),[0,0,0]),!Zo){const e=document.createElement("canvas");e.width=256,e.height=200;const n=e.getContext("2d");n.fillStyle="#e8f4ff",n.fillRect(0,0,256,200),n.fillStyle="#9bd47e",n.beginPath(),n.ellipse(128,210,200,70,0,0,Math.PI*2),n.fill(),n.fillStyle="#f9dc6b",n.beginPath(),n.arc(200,50,26,0,Math.PI*2),n.fill(),n.fillStyle="#ea5b4f",n.beginPath(),n.moveTo(60,110),n.lineTo(110,70),n.lineTo(160,110),n.fill(),n.fillStyle="#fff3dc",n.fillRect(72,110,76,56),n.fillStyle="#5eaff2",n.fillRect(100,132,20,34),n.strokeStyle="#5b4d6e",n.lineWidth=3,n.beginPath(),n.arc(40,150,10,0,Math.PI*2),n.stroke(),n.beginPath(),n.moveTo(40,160),n.lineTo(40,185),n.stroke(),Zo=new _s(e),Zo.colorSpace=Pe}j(s,X.plane(.52,.38),nt.custom("frameArt",()=>new he({map:Zo,roughness:.8})),[0,0,.027],{cast:!1});const t=new Zt(X.box(.8,.65,.15),nt.hit());return s.add(t),s}function Gh({cord:s=.42}={}){const t=new Lt;t.name="lampara",j(t,X.sphere(.03,10,8),nt.clay("#5b4d6e"),[0,0,0]),j(t,X.cyl(.008,.008,s,6),nt.clay("#5b4d6e"),[0,-s/2,0],{cast:!1});const e=j(t,X.cone(.24,.2,24,!0),nt.custom("lampShade",()=>new he({color:Q.yellow,roughness:.7,side:Un})),[0,-s-.08,0]);j(t,X.sphere(.035,10,8),nt.clay(Q.yellow),[0,-s+.02,0]),j(t,X.sphere(.06,14,10),nt.glow("#fff1b0",1.6),[0,-s-.16,0],{cast:!1}),t.userData.shade=e;const n=new Zt(X.box(.6,s+.4,.6),nt.hit());return n.position.y=-(s+.2)/2,t.add(n),t}function ao(s,t=.17){return es(X.rbox(t,t,t,.028),nt.clay(s,.6))}function Wh(s=6){return Array.from({length:s},(t,e)=>Rf[e%Rf.length])}function Vp(){const s=new Lt;s.name="cocina",j(s,X.rbox(.82,.56,.42,.03),nt.clay("#fff1de",.8),[0,.28,0]),j(s,X.rbox(.88,.05,.46,.02),nt.clay("#8fd6c4",.6),[0,.585,0]);for(const e of[-1,1])j(s,X.rbox(.34,.4,.02,.02),nt.clay("#ffe2bf",.8),[e*.19,.28,.215]);s.userData.glasses=[];const t=nt.custom("cupGlass",()=>new he({color:"#d4efff",roughness:.1,transparent:!0,opacity:.6}));return[-.24,-.08,.1,.25].forEach((e,n)=>{const i=j(s,X.cyl(.045,.036,.13,14),t,[e,.675,n%2*.06-.03]);s.userData.glasses.push(i)}),j(s,X.cyl(.06,.07,.18,14),nt.clay(Q.blue,.5),[.33,.7,-.1]),s}function Ha({w:s=.62,h:t=1.12}={}){const e=new Lt;e.name="puerta";const n=nt.clay("#ffffff",.6);j(e,X.rbox(.07,t+.06,.08,.02),n,[-s/2-.035,(t+.06)/2,0]),j(e,X.rbox(.07,t+.06,.08,.02),n,[s/2+.035,(t+.06)/2,0]),j(e,X.rbox(s+.14,.07,.08,.02),n,[0,t+.035,0]),j(e,X.plane(s,t),nt.custom("doorLight",()=>new he({color:"#fff4c9",emissive:"#ffe9a8",emissiveIntensity:.9,roughness:1})),[0,t/2,-.03],{cast:!1});const i=new Lt;return i.position.set(-s/2,0,0),e.add(i),j(i,X.rbox(s,t,.05,.025),nt.clay(Q.blue,.6),[s/2,t/2,0]),j(i,X.rbox(s-.16,t*.34,.02,.02),nt.clay("#86c3f5",.6),[s/2,t*.7,.03]),j(i,X.rbox(s-.16,t*.34,.02,.02),nt.clay("#86c3f5",.6),[s/2,t*.28,.03]),j(i,X.sphere(.035,10,8),nt.clay(Q.yellow,.4),[s-.08,t*.5,.05]),e.userData.hinge=i,e}function Gp(){const s=new Lt;s.name="zapatos";for(const e of[-1,1]){const n=new Lt;n.position.set(e*.08,0,0),n.rotation.y=e*.12,j(n,X.rbox(.12,.075,.2,.035),nt.clay(Q.red,.6),[0,.05,0]),j(n,X.rbox(.13,.025,.21,.01),nt.clay("#ffffff",.7),[0,.012,0]),j(n,X.sphere(.02,8,6),nt.clay("#ffffff"),[0,.09,.03]),s.add(n)}const t=new Zt(X.box(.5,.3,.45),nt.hit());return t.position.y=.1,s.add(t),s}function Wp(s=7,t=3){const e=new Lt;e.name="vidrios";const n=ki(t),i=nt.custom("shard",()=>new he({color:"#d6f1ff",emissive:"#bfe8ff",emissiveIntensity:.2,roughness:.05,metalness:.2,transparent:!0,opacity:.85}));for(let r=0;r<s;r++){const o=j(e,X.tetra(.045+n()*.03),i,[(n()-.5)*.7,.015,(n()-.5)*.45]);o.rotation.set(n()*3,n()*3,n()*3),o.scale.y=.4}return e}let Hs=null;function Yc(s,t,e="#ffe3c8"){if(!Hs){const o=document.createElement("canvas");o.width=o.height=128;const a=o.getContext("2d");a.fillStyle="#ffffff",a.fillRect(0,0,128,128),a.fillStyle="rgba(234,91,79,0.16)";for(const[l,c]of[[32,32],[96,96]])a.beginPath(),a.arc(l,c,10,0,Math.PI*2),a.fill();a.fillStyle="rgba(93,182,90,0.14)";for(const[l,c]of[[96,32],[32,96]])a.beginPath(),a.arc(l,c,6,0,Math.PI*2),a.fill();Hs=new _s(o),Hs.colorSpace=Pe,Hs.wrapS=Hs.wrapT=nr}const n=Hs,i=nt.custom(`wall|${e}|${s}|${t}`,()=>{const o=n.clone();return o.repeat.set(s*2.2,t*2.2),o.needsUpdate=!0,new he({color:e,map:o,roughness:.95})}),r=new Lt;return j(r,X.rbox(s,t,.05,.02),i,[0,t/2,0],{cast:!0,receive:!0}),j(r,X.rbox(s,.09,.08,.02),nt.clay(Q.wood,.7),[0,.045,.03]),r}const oS=Math.PI/2-.015,Gf={front:{axis:"x",sign:1},back:{axis:"x",sign:-1},left:{axis:"z",sign:1},right:{axis:"z",sign:-1},none:{axis:null,sign:0}},Jo={x:new A(1,0,0),y:new A(0,1,0),z:new A(0,0,1)},Rr=new Yn,jo=new Yn,Wf=new Yn,Cr={x:0,y:0,phi:0},ca=s=>s<0?0:s>1?1:s,Vs=(s,t,e)=>{const n=ca((e-s)/(t-s));return n*n*(3-2*n)};class Xf{constructor(t,e={}){this.obj=t,this.foldName=e.fold??"back",this.parentPiece=e.parentPiece??null,this.follow=e.follow??null,this.delay=e.delay??0,this.stiffness=e.stiffness??1,this.explicitPivot=!!e.pivot,this.gate=e.gate??1,this.swing=!!e.swing,this.flatten=e.flatten??!e.parentPiece,this.hinge=new Lt,this.offset=new Lt,this.hinge.add(this.offset),e.parent.add(this.hinge),this.offset.add(t),this.pivot=new A,e.pivot&&this.pivot.copy(e.pivot),this.syncPivot(!0),this.e=0,this.v=0,this.phase=Math.random()*Math.PI*2,this.carried=null,this.carryDelay=0,this.start=0,this.span=.6}get side(){return this.pivot.x<0?"L":"R"}get fold(){const t=this.foldName==="side"?this.side==="R"?"right":"left":this.foldName;return Gf[t]??Gf.back}syncPivot(t=!1){!t&&(this.e<.98||this.explicitPivot)||(this.explicitPivot||this.pivot.set(this.obj.position.x,this.parentPiece?this.obj.position.y:0,this.obj.position.z),this.hinge.position.copy(this.pivot),this.offset.position.copy(this.pivot).negate())}schedule(){if(this.parentPiece){this.span=.34,this.start=Math.min(this.parentPiece.start+.2+this.delay,.99-this.span);return}const t=ca((this.pivot.z+2)/4);this.span=.58,this.start=Math.min(.02+t*.26+this.delay,.98-this.span)}target(t){const e=Math.min(this.start+this.carryDelay,.99-this.span);return Math.min(ca((t-e)/this.span),this.gate)}settle(t){this.e=this.target(t),this.v=0}update(t,e,n,i){if(this.follow)this.e=this.follow.e;else{let r=this.target(e);const o=r<this.e;r>.995&&(r+=Math.sin(n*.9+this.phase)*.004);const a=(o?150:70)*this.stiffness,c=2*(o?.95:.46)*Math.sqrt(a),h=Math.min(t,1/30)/2;for(let u=0;u<2;u++){const d=a*(r-this.e)-c*this.v-i*this.e*.8;this.v+=d*h,this.e+=this.v*h}this.e>r+.12&&o&&(this.e=r+.12),this.e<0&&(this.e=0,this.v=0),this.e>1.16&&(this.e=1.16,this.v=0)}this.apply()}apply(){const t=this.e,e=this.fold;this.hinge.visible=t>.004;const n=this.swing?t<=1?1-Vs(.16,.55,t):-(t-1)*.4:t<=1?1-Vs(.4,1,t):-(t-1)*.9;if(e.axis?Rr.setFromAxisAngle(Jo[e.axis],n*oS*e.sign):Rr.identity(),this.parentPiece){this.hinge.position.copy(this.pivot),this.hinge.quaternion.copy(Rr),this.hinge.scale.setScalar(1);return}const i=Vs(0,.22,t),r=Vs(.05,.65,t),o=this.side==="R"?1:-1;if(this.swing){const d=Vs(.45,1,t);jo.setFromAxisAngle(Jo.y,-o*(Math.PI/2-.09)*(1-d)+(t>1?o*(t-1)*.5:0))}else jo.setFromAxisAngle(Jo.y,o*.32*(1-r));const a=this.flatten?1-ca(n)*.985:1,l=(.82+.18*Vs(0,.6,t))*(t>1?1+(t-1)*.12:1);this.hinge.scale.set((e.axis==="z"?a:1)*l,l*(t>1?1-(t-1)*.1:1),(e.axis==="x"?a:1)*l);const c=this.pivot.x*r,h=-.16*(1-i),u=this.book;if(this.carried&&u){const d=Math.min(1,Math.abs(c)/li.PW),f=Math.max(-1,Math.min(1,this.pivot.z/(li.PD/2)));u.sheetFrame(d,f,Cr);const _=this.carried==="back"?Cr.phi-Math.PI:Cr.phi,p=-Math.sin(_),m=Math.cos(_);this.hinge.position.set(Cr.x+p*(h+this.pivot.y),Cr.y+m*(h+this.pivot.y),this.pivot.z),Wf.setFromAxisAngle(Jo.z,_),this.hinge.quaternion.multiplyQuaternions(Wf,jo).multiply(Rr)}else this.hinge.position.set(c,this.pivot.y+h,this.pivot.z),this.hinge.quaternion.multiplyQuaternions(jo,Rr)}}function aS(s,{axis:t="z",amount:e=.12,times:n=4,duration:i=.9}={}){const r=s.userData.wobbleBase??(s.userData.wobbleBase=s.rotation[t]),o=it.timeline(),a=i/(n*2);for(let l=0;l<n;l++){const c=e*(1-l/n);o.to(s.rotation,{[t]:r+c,duration:a,ease:"sine.inOut"}),o.to(s.rotation,{[t]:r-c,duration:a,ease:"sine.inOut"})}return o.to(s.rotation,{[t]:r,duration:a,ease:"sine.out"}),o}function ha(s,t=.12){const e=s.position.y,n=s.scale.clone();return it.timeline().to(s.scale,{x:n.x*1.08,y:n.y*.9,z:n.z*1.08,duration:.12,ease:"power2.out"}).to(s.position,{y:e+t,duration:.25,ease:"power2.out"},">").to(s.scale,{x:n.x*.95,y:n.y*1.08,z:n.z*.95,duration:.25},"<").to(s.position,{y:e,duration:.4,ease:"bounce.out"}).to(s.scale,{x:n.x,y:n.y,z:n.z,duration:.4,ease:"elastic.out(1,0.5)"},"<")}function Be(s,t,{color:e="#fff6c2",count:n=7,radius:i=.35,size:r=.22}={}){const o=it.timeline();for(let a=0;a<n;a++){const l=Fa(e,.001,1);l.position.copy(t),s.add(l);const c=a/n*Math.PI*2+Math.random()*.5,h=i*(.6+Math.random()*.6);o.to(l.position,{x:t.x+Math.cos(c)*h,y:t.y+.1+Math.random()*i,z:t.z+Math.sin(c)*h*.6,duration:.9,ease:"power2.out"},a*.03),o.to(l.scale,{x:r,y:r,duration:.25,ease:"back.out(2)"},a*.03),o.to(l.material,{opacity:0,duration:.5,ease:"power1.in"},a*.03+.5),o.call(()=>{s.remove(l),l.material.dispose()},null,a*.03+1.05)}return o}function qn(s,t,{color:e="#ffffff",size:n=.6}={}){const i=Fa(e,.001,1);return i.position.copy(t),s.add(i),it.timeline().to(i.scale,{x:n,y:n,duration:.35,ease:"back.out(2)"}).to(i.material,{opacity:0,duration:.6,ease:"power2.in"},.45).call(()=>{s.remove(i),i.material.dispose()})}const lS="'Fredoka', 'Trebuchet MS', sans-serif";function cS(s,t="#ea5b4f"){const e=document.createElement("canvas");e.width=512,e.height=256;const n=e.getContext("2d");n.font=`700 150px ${lS}`,n.textAlign="center",n.textBaseline="middle",n.lineJoin="round",n.lineWidth=26,n.strokeStyle="#ffffff",n.strokeText(s,256,132),n.fillStyle=t,n.fillText(s,256,132);const i=new _s(e);i.colorSpace=Pe;const r=new ah({map:i,transparent:!0,depthWrite:!1,depthTest:!1}),o=new wd(r);return o.renderOrder=10,o.userData.ownMaterial=!0,o.userData.ownTexture=i,o.scale.set(.001,5e-4,1),o}function qf(s,t,e,{color:n,size:i=.62,rise:r=.45,hold:o=.9}={}){const a=cS(t,n);return a.position.copy(e),a.material.rotation=(Math.random()-.5)*.4,s.add(a),it.timeline().to(a.scale,{x:i,y:i/2,duration:.45,ease:"elastic.out(1, 0.5)"}).to(a.position,{y:e.y+r,duration:o+.6,ease:"sine.out"},0).to(a.material,{opacity:0,duration:.5,ease:"power1.in"},o).call(()=>{s.remove(a),a.material.dispose(),a.userData.ownTexture.dispose()})}const Pr=new A,Hl=new A,Yf=new A,$f=new A(0,1,0),hS={grow:"back",drop:"back",front:"front",back:"back",left:"left",right:"right",none:"none"};class po{constructor(t,e={}){this.ctx=t,this.setup=e,this.group=new Lt,this.pieces=[],this.anchors={},this.hotspots={},this.markers={},this.wobbleCfg={},this.actions={},this.nico=null,this.guardian=null,this.guardianOffset=new A(.38,.95,.18),this.followNico=!0,this.openness=0,this.wind=0,this.carry=null,this.viewer=null,this.left=new Lt,this.right=new Lt,this.left.name="pagina-izquierda",this.right.name="pagina-derecha",this.group.add(this.left,this.right)}halfFor(t){return t<0?this.left:this.right}init(){this.build();for(const t of this.pieces)t.schedule();for(const t of this.pieces)t.settle(0),t.apply();return this.guardian&&(this.guardian.presence=0),this}build(){}piece(t,e="back",n=0,i={}){const r=e==="pop"?"side":hS[e],o=i.parent instanceof Xf?i.parent:null,a=i.pivot?i.pivot.x:t.position.x,l=o?o.obj:i.parent??this.halfFor(a),c=new Xf(t,{fold:r,delay:Math.min(.14,n*.25),parent:l,parentPiece:o,pivot:i.pivot,follow:i.follow,stiffness:i.stiffness??(r==="front"?.8:1),gate:i.gate,flatten:i.flatten,swing:i.swing});return this.pieces.push(c),t.userData.piece=c,t}backdrop(t,e,n,i="#ffe3c8"){const r=t/2,o=Yc(r-.02,e,i),a=Yc(r-.02,e,i);return o.position.set(-r/2-.01,0,n),a.position.set(r/2+.01,0,n),this.piece(o,"back",0,{pivot:new A(-.001,0,n),swing:!0,stiffness:.85}),this.piece(a,"back",.02,{pivot:new A(.001,0,n),swing:!0,stiffness:.85}),{L:o,R:a,attach:(c,h,u,d=.05)=>{const f=h<0?o:a;return c.position.set(h-f.position.x,u,d),f.add(c),c},pieceOf:c=>(c<0?o:a).userData.piece}}holder(t,e=0,n=0,i=0){const r=new Lt;return r.position.set(e,n,i),r.add(t),r}hotspot(t,e,n){this.hotspots[t]=e;const i=new ye;i.position.copy(n),e.add(i),this.markers[t]=i}addNico(t,e,{face:n=0,pose:i="idle",delay:r=.1}={}){const o=new rS;return o.position.set(t,0,e),o.rotation.y=n,o.poseInstant(i),this.nico=o,this.piece(o,"back",r,{stiffness:1.25}),o}addGuardian(t=!0){const e=new hs;return this.guardian=e,e.visible=t,e.presence=0,this.nico&&(e.home.copy(this.nico.position).add(this.guardianOffset),e.position.copy(e.home)),this.group.add(e),e}setOpenness(t){this.openness=t}openInstant(){this.openness=1;for(const t of this.pieces)t.settle(1),t.apply();this.guardian&&(this.guardian.presence=1)}beginCarry(t,e){const n=this.ctx.book;for(const i of this.pieces){if(i.parentPiece)continue;i.syncPivot();const r=this.halfFor(i.pivot.x);i.hinge.parent!==r&&r.add(i.hinge);const o=i.side===t;i.carried=o?e:null,i.carryDelay=o?.22:0,i.book=n}this.carry={side:t,face:e}}endCarry(){for(const t of this.pieces)t.carried=null,t.carryDelay=0;this.carry=null;for(const t of this.pieces)t.apply()}run(t){if(!t)return it.timeline();if(Array.isArray(t)){const r=it.timeline();for(const o of t)r.add(this.run(o),0);return r}const[e,n]=t.split(":"),i=this.actions[e]??uS[e];return i?i.call(this,n)||it.timeline():(console.warn(`[cuento] Acción desconocida: "${t}" en ${this.constructor.name}`),it.timeline())}runSequence(t=[]){const e=it.timeline();for(const n of t)e.add(this.run(n));return e}onDialogue(t){var e;t==="guardian"&&((e=this.guardian)!=null&&e.visible)&&this.guardian.speak(),t==="nico"&&this.nico&&it.fromTo(this.nico.p,{headX:this.nico.p.headX-.12},{headX:this.nico.p.headX,duration:.5,ease:"back.out(3)"})}localPos(t,e=new A){return t.getWorldPosition(e),this.group.worldToLocal(e)}wobble(t){const e=this.wobbleCfg[t]??{};if(e.custom)return e.custom();const n=this.hotspots[t];if(!n)return it.timeline();const i=it.timeline();return i.add(aS(n,{axis:e.axis??"z",amount:e.amount??.1,times:e.times??4,duration:e.duration??.9}),0),this.markers[t]&&i.add(qn(this.group,this.localPos(this.markers[t]),{color:"#ffd0c8",size:.5}),0),i}guardianToViewer(t){const e=this.guardian;if(!e)return;if(t)return this.viewer={t:0},e.visible=!0,e.presence=1,e.faceViewer=!0,it.to(this.viewer,{t:1,duration:1.5,ease:"power3.inOut"});e.faceViewer=!1;const n=this.viewer;if(n)return it.to(n,{t:0,duration:1.3,ease:"power2.inOut",onComplete:()=>{this.viewer=null}})}update(t,e,n){var o;const i=this.openness;this.wind*=Math.pow(.04,t);for(const a of this.pieces)a.update(t,i,e,this.wind);(o=this.nico)==null||o.update(t,e,n);const r=this.guardian;if(r){if(this.followNico&&this.nico&&!this.guardianPinned&&(Pr.copy(this.nico.position).add(this.guardianOffset),r.home.lerp(Pr,Math.min(1,t*2.5))),this.viewer){const a=this.ctx.camera;a.getWorldDirection(Hl),Yf.crossVectors(Hl,$f).normalize();const l=Math.min(.42,.3*a.aspect);Pr.copy(a.position).addScaledVector(Hl,2.6).addScaledVector(Yf,l).addScaledVector($f,-.12),this.group.worldToLocal(Pr),r.viewerPoint.copy(Pr),r.viewerBlend=this.viewer.t}else r.viewerBlend=0;this.viewer||(r.presenceTarget=i>.85?1:0),r.update(t,e,this.ctx.camera)}this.tick(t,e,n)}tick(){}dispose(){this.group.removeFromParent(),kM(this.group),hs.light&&(hs.light.intensity=0)}}const uS={"nico.pose"(s){var t;return(t=this.nico)==null?void 0:t.pose(s)},"nico.face"(s){var t;(t=this.nico)==null||t.face(s)},"nico.heart"(s){if(this.nico)return this.nico.heartbeat(Number(s)||3)},"nico.walkTo"(s){const t=this.anchors[s];if(!this.nico||!t)return;const e=it.timeline();return this.nico.p.crouch>.3&&e.add(this.nico.pose("idle",.5)),e.add(this.nico.walkTo(t.x,t.z,{speed:.7})),t.faceCamera!==!1&&e.add(it.to(this.nico.rotation,{y:0,duration:.5,ease:"power2.out"})),e},"nico.lookAround"(){if(!this.nico)return;const s=this.nico.p;return it.timeline().to(s,{headY:-.7,duration:.7,ease:"sine.inOut"}).to(s,{headY:.7,duration:1.1,ease:"sine.inOut"}).to(s,{headY:0,duration:.7,ease:"sine.inOut"})},"nico.hop"(){var s;return(s=this.nico)==null?void 0:s.hop()},"guardian.appear"(){const s=this.guardian;if(!s||!this.nico)return;const t=this.localPos(this.nico.heart),e=this.nico.position.clone().add(this.guardianOffset),n=it.timeline();return n.add(this.nico.heartbeat(1),0),n.add(Be(this.group,t,{color:"#d8ffc0",count:9}),.15),n.add(s.appear(t,e),.2),n},"guardian.glow"(){if(this.guardian)return it.timeline().add(this.guardian.pulse(2),0).add(Be(this.group,this.guardian.position,{color:"#d8ffc0",count:6,radius:.25}),0)},"guardian.energy"(){const s=this.guardian,t=this.nico;if(!s||!t)return;const e=it.timeline();e.add(s.pulse(1),0);const n=this.localPos(t.heart);for(let i=0;i<6;i++)e.add(Be(this.group,s.position.clone().lerp(n,i/5),{color:"#d8ffc0",count:3,radius:.12,size:.16}),.25+i*.12);return e.to(t,{heartGlow:.9,duration:.4},.9),e.to(t,{heartGlow:.25,duration:1.4},1.4),e.add(s.pulse(1),1),e},wobble(s){return this.wobble(s)},"hazards.wobble"(){const s=it.timeline();return(this.hazards??[]).forEach((t,e)=>s.add(this.wobble(t),e*.35)),s},calm(){}},Dr=.17,Zf=[[-.55,.15],[-.3,-.5],[.45,.6],[-.75,-.2],[.2,-.55],[-.35,.65]];class fS extends po{build(){const t=this.setup,e=this.backdrop(5.75,1.85,-1.72,"#ffe3c8"),n=Ba();this.windowHolder=e.attach(this.holder(n),1.42,1.08,.06),this.windowBaseX=this.windowHolder.position.x,this.hotspot("ventana",n,new A(0,0,.1));const i=Vh();this.frameHolder=e.attach(this.holder(i),-.55,1.22,.05),this.hotspot("cuadro",i,new A(0,0,.1)),this.door=e.attach(Ha(),2.45,0,.05);const r=Gh({cord:.45}),o=new Lt;j(o,X.rbox(.12,.06,1.4,.02),nt.clay(Q.woodDark),[0,0,.7]),this.lampHolder=this.holder(r,0,-.03,1.29),o.add(this.lampHolder),e.attach(o,.3,1.83,.03),this.piece(o,"front",.05,{parent:e.pieceOf(.3),pivot:o.position.clone()}),this.hotspot("lampara",r,new A(0,-.6,0)),this.lampAmp=0;const a=Hh();this.shelfHolder=this.holder(a,-2.4,0,-1.38),this.piece(this.shelfHolder,"grow",.25),this.hotspot("estante",a,new A(0,1,.2)),this.counter=Vp(),this.counter.position.set(-1.45,0,-1.42),this.piece(this.counter,"grow",.3);const l=za();this.tableHolder=this.holder(l,.3,0,-.5),this.piece(this.tableHolder,"grow",.4),this.hotspot("mesa",l,new A(.25,.45,.5)),this.table=l;const c=Hp();this.sofaHolder=this.holder(c,1.9,0,.42),c.rotation.y=-.35,this.piece(this.sofaHolder,"grow",.45),this.hotspot("sofa",c,new A(0,.62,0));const h=new Lt;j(h,X.cyl(.13,.1,.22,14),nt.clay(Q.blue),[0,.11,0]);for(const[g,_,p]of[[0,.38,0],[-.08,.3,.04],[.08,.32,-.03]])j(h,X.sphere(.12,12,8),nt.clay(Q.green),[g,_,p]);h.position.set(1.05,0,-1.35),this.piece(h,"grow",.5),this.towerPos=new A(-1.95,0,.75),this.tower=new Lt,this.tower.position.copy(this.towerPos),this.piece(this.tower,"pop",.5),this.blocks=Wh(6).map((g,_)=>{const p=ao(g,Dr);return p.userData.stack=new A(_%2?.012:-.01,Dr/2+_*Dr,0),p.userData.stackRot=(_%3-1)*.08,this.tower.add(p),p}),this.placeTower(t.tower??"built");const u={tower:{x:-1.25,z:.4},center:{x:-.55,z:.7}},d=u[t.nico]??u.tower,f=this.addNico(d.x,d.z,{face:t.nico==="tower"?-1.05:.2});t.face&&f.face(t.face),t.heart&&(f.heartGlow=.3),t.nico==="tower"&&(this.blueBlock=ao(Q.blue,.15),this.blueBlock.position.y=-.04,f.hold(this.blueBlock)),this.addGuardian(!!t.guardian),this.anchors={tableFront:new A(.3,0,.35),under:new A(.3,0,-.42),door:new A(1,0,.55)},this.hazards=["ventana","lampara","estante","cuadro"],this.wobbleCfg={lampara:{custom:()=>this.kickLamp()},ventana:{axis:"z",amount:.06,times:6,duration:.8},estante:{axis:"z",amount:.09,times:4,duration:1},cuadro:{axis:"z",amount:.3,times:4,duration:1},sofa:{custom:()=>ha(c,.08)},mesa:{custom:()=>ha(l,.04)}},this.actions={"tower.build":()=>this.buildTower(),"tower.fall":()=>this.fallTower(),"nico.showBlock":()=>this.showBlock(),"nico.reach":()=>this.reach(),"glasses.clink":()=>this.clink(),rumble:()=>this.dustPuffs(),"nico.runToDoor":()=>this.runToDoor(),"guardian.stop":()=>this.guardianStop(),"table.glow":()=>this.tableGlow(),"nico.hideUnderTable":()=>this.hideUnderTable()}}placeTower(t){this.blocks.forEach((e,n)=>{if(t==="fallen"){const[i,r]=Zf[n];e.position.set(i,Dr/2,r),e.rotation.set(0,n*.9,0)}else e.position.copy(e.userData.stack),e.rotation.set(0,e.userData.stackRot,0),e.visible=t!=="empty"}),this.towerState=t}buildTower(){const t=it.timeline();return this.blocks.forEach((e,n)=>{const i=e.userData.stack;t.call(()=>{e.visible=!0},null,n*.28),t.fromTo(e.position,{y:i.y+1.4},{y:i.y,duration:.6,ease:"bounce.out"},n*.28),t.fromTo(e.rotation,{y:e.userData.stackRot+1.5},{y:e.userData.stackRot,duration:.6,ease:"power2.out"},n*.28)}),t.call(()=>{this.towerState="built"}),t.add(Be(this.group,this.towerPos.clone().setY(1.15),{color:"#fff3b0"})),t.add(this.nico.pose("show"),.4),t.add(this.nico.pose("idle"),1.4),t}fallTower(){const t=it.timeline();return this.towerState="falling",[...this.blocks].reverse().forEach((e,n)=>{const i=this.blocks.indexOf(e),[r,o]=Zf[i],a=n*.07;t.to(e.position,{x:r,z:o,duration:.9,ease:"power2.out"},a),t.to(e.position,{keyframes:[{y:e.position.y+.18,duration:.2,ease:"power2.out"},{y:Dr/2,duration:.7,ease:"bounce.out"}]},a),t.to(e.rotation,{x:(i%2?1:-1)*Math.PI/2,y:i*.9,duration:.9,ease:"power2.out"},a)}),t.call(()=>{this.towerState="fallen"}),t.add(this.nico.pose("worried"),.1),t}showBlock(){const t=it.timeline();return t.add(this.nico.pose("show")),t.call(()=>{const e=this.localPos(this.blueBlock??this.nico.hand);Be(this.group,e,{color:"#bfe2ff",count:8}),qn(this.group,e,{color:"#bfe2ff",size:.7})},null,.6),t.to({},{duration:1}),t}reach(){const t=it.timeline();return t.add(this.nico.walkTo(-1.55,.55,{speed:.5})),t.add(this.nico.pose("reach",1.1,"power2.inOut")),t}clink(){const t=it.timeline();return this.counter.userData.glasses.forEach((e,n)=>{t.to(e.position,{keyframes:[{y:.705,duration:.08},{y:.675,duration:.1},{y:.695,duration:.07},{y:.675,duration:.1}]},n*.12),t.to(e.rotation,{keyframes:[{z:.12,duration:.09},{z:-.1,duration:.09},{z:0,duration:.1}]},n*.12)}),t.add(Be(this.group,new A(-1.45,.8,-1.4),{color:"#e6f6ff",count:6,radius:.3}),0),t}runToDoor(){const t=this.nico,e=it.timeline();return e.add(t.pose("run",.4)),e.add(t.walkTo(this.anchors.door.x,this.anchors.door.z,{speed:1.4,run:!0})),e}guardianStop(){const t=this.guardian,e=this.nico,n=it.timeline();return this.guardianPinned=!0,n.add(t.moveTo(new A(e.position.x+.45,.75,e.position.z+.15),.6),0),n.add(t.pulse(1),.3),n.add(e.pose("stop",.5),.35),n.add(e.turnTo(e.position.x,e.position.z+2,.6),.6),n.add(e.pose("idle",.8),1.2),n.call(()=>{this.guardianPinned=!1},null,1.6),n}tableGlow(){const t=it.timeline(),e=this.localPos(this.markers.mesa);return t.add(qn(this.group,e,{color:"#fff3c4",size:1.4}),0),t.add(Be(this.group,e,{color:"#fff3c4",count:10,radius:.6}),.1),t.add(ha(this.table,.04),.1),t.add(this.nico.turnTo(this.table.parent.position.x,this.table.parent.position.z,.6),0),t}hideUnderTable(){const t=this.nico,e=it.timeline();return e.to(this.guardianOffset,{x:.62,y:.42,z:.55,duration:1.5},0),t.p.crouch>.3&&e.add(t.pose("idle",.4)),e.add(t.walkTo(this.anchors.tableFront.x,this.anchors.tableFront.z,{speed:.55})),e.add(t.pose("kneel",.5)),e.add(t.walkTo(this.anchors.under.x,this.anchors.under.z,{speed:.35})),e.add(it.to(t.rotation,{y:0,duration:.5})),e.add(t.pose("crouch",.6)),e}dustPuffs(){const t=it.timeline();return[[-.8,.9],[.9,.7],[-.2,-.1],[1.6,-.6],[-2.3,-.4]].forEach(([e,n],i)=>{t.add(Be(this.group,new A(e,.05,n),{color:"#efe0c8",count:5,radius:.25,size:.18}),i*.18)}),t}kickLamp(){return this.lampAmp=Math.max(this.lampAmp,1),qn(this.group,this.localPos(this.markers.lampara),{color:"#fff1b0",size:.7})}onWind(t){this.lampAmp=Math.max(this.lampAmp,Math.min(.6,t*.35))}tick(t,e,n){const i=n.intensity,r=i*.9;this.lampAmp+=(r-this.lampAmp)*Math.min(1,t*(r>this.lampAmp?3:.6)),this.lampHolder.rotation.z=Math.sin(e*2.7)*this.lampAmp*.42,this.lampHolder.rotation.x=Math.cos(e*2.1)*this.lampAmp*.12,this.shelfHolder.rotation.z=n.shake.x*.03,this.frameHolder.rotation.z=n.shake.z*.08,this.windowHolder.position.x=this.windowBaseX+n.shake.x*.01,this.tableHolder.position.x=.3+n.shake.z*.012,i>.05&&(this.counter.userData.glasses.forEach((o,a)=>{o.position.y=.675+Math.max(0,Math.sin(e*34+a*1.7))*.012*i}),this.towerState==="built"&&this.blocks.forEach((o,a)=>{o.rotation.z=Math.sin(e*20+a)*.025*i*(a/5),o.position.x=o.userData.stack.x+Math.sin(e*18+a*.6)*.012*i*a}))}}class dS extends po{build(){const t=this.setup,e=this.backdrop(5.75,1.85,-1.75,"#ffe3c8"),n=Ba();n.rotation.z=.06,this.windowHolder=e.attach(this.holder(n),1.75,1.08,.06),this.windowBaseX=this.windowHolder.position.x,this.hotspot("ventana",n,new A(0,0,.1));const i=Vh();i.rotation.z=-.22,this.frameHolder=e.attach(this.holder(i),-1.05,1.2,.05),this.hotspot("cuadro",i,new A(0,0,.1));const r=Gh({cord:.32}),o=new Lt;j(o,X.rbox(.12,.06,1.25,.02),nt.clay(Q.woodDark),[0,0,.62]),this.lampHolder=this.holder(r,0,-.03,1.15),o.add(this.lampHolder),e.attach(o,.08,1.83,.03),this.piece(o,"front",.05,{parent:e.pieceOf(.08),pivot:o.position.clone()}),this.hotspot("lampara",r,new A(0,-.45,0)),this.lampAmp=.3;const a=Hh();a.rotation.z=.05,this.shelfHolder=this.holder(a,-2.45,0,-1.4),this.piece(this.shelfHolder,"grow",.2),this.hotspot("estante",a,new A(0,1,.2)),this.counter=Vp(),this.counter.position.set(-1.55,0,-1.45),this.piece(this.counter,"grow",.25);const l=Hp();l.position.set(2.25,0,.15),l.rotation.y=-.55,this.piece(l,"grow",.3),this.table=za({w:2,d:1.25,h:1.06}),this.tableHolder=this.holder(this.table,0,0,-.3),this.piece(this.tableHolder,"grow",.35);const c=[[-1.9,.75,.4],[-1.45,1.2,1.1],[-2.35,.25,2],[1.35,1.15,.7],[1.95,1.05,2.4],[-.95,1.45,.2]];Wh(6).forEach((u,d)=>{const f=ao(u,.17),[g,_,p]=c[d];f.position.set(g,.085,_),f.rotation.set(d%2?Math.PI/2:0,p,0),this.piece(f,"pop",.4)}),t.shards&&(this.shards=Wp(9,5),this.shards.position.set(1.55,0,-.95),this.piece(this.shards,"pop",.5)),this.addNico(-.6,-.05,{face:.12,pose:t.nicoPose??"crouch"}).face(t.face??"smile"),this.guardianOffset.set(.55,.62,.1),this.addGuardian(!0),this.soundSpots={clin:new A(-1.55,1.05,-1.3),clan:new A(.1,1.55,-.55),crac:new A(1.8,1.45,-1.55)},this.actions={sounds:()=>this.sounds(),heartbeat:()=>this.heartbeat(),"guardian.hug":()=>this.hug(),silence:()=>this.silence(),"nico.peek":()=>this.peek(),"shards.glint":()=>this.shardsGlint()}}sounds(){const t=it.timeline();return[["clin","clin",Q.blue],["clan","clan",Q.orange],["crac","crac",Q.red]].forEach(([n,i,r],o)=>{t.add(qf(this.group,n,this.soundSpots[i],{color:r,size:.75}),o*.65)}),t.call(()=>{this.lampAmp=1},null,.65),t.add(this.wobble("cuadro"),1.3),t.add(this.wobble("ventana"),1.3),t}heartbeat(){const t=it.timeline();t.add(this.nico.heartbeat(3),0);for(let e=0;e<3;e++)t.call(()=>{const n=this.localPos(this.nico.heart);n.x+=-.35+e*.35,n.y+=.55+e*.05,qf(this.group,"pum",n,{color:Q.red,size:.5,rise:.3,hold:.5})},null,e*.64);return t.to({},{duration:.6}),t}hug(){const t=this.guardian,e=it.timeline();return this.guardianPinned=!0,e.add(t.moveTo(new A(this.nico.position.x+.32,.55,this.nico.position.z+.3),.8),0),e.add(t.pulse(2),.5),e.to(this.nico,{heartGlow:.6,duration:.6,yoyo:!0,repeat:1},.6),e.call(()=>{this.guardianPinned=!1},null,2.4),e}silence(){const t=it.timeline();return t.to(this,{lampAmp:0,duration:2.2,ease:"power2.out"},0),t.add(this.nico.pose("kneel",1.2,"sine.inOut"),.6),t.add(this.guardian.pulse(1),1),t}peek(){const t=it.timeline();return t.add(this.nico.pose("peek",.9,"power2.out")),t.add(this.nico.hop(),.2),t}shardsGlint(){if(!this.shards)return;const t=it.timeline(),e=this.shards.position.clone().setY(.1);return t.add(qn(this.group,e,{color:"#dff4ff",size:1.1}),0),t.add(Be(this.group,e,{color:"#dff4ff",count:8,radius:.4}),.1),t.add(this.guardian.moveTo(new A(e.x-.3,.7,e.z+.4),.9),0),t.call(()=>{this.guardianPinned=!0},null,0),t.add(this.guardian.moveTo(new A(this.nico.position.x+.55,.62,this.nico.position.z+.1),1),2.2),t.call(()=>{this.guardianPinned=!1},null,3.2),t}onWind(t){this.lampAmp=Math.max(this.lampAmp,Math.min(.6,t*.35))}tick(t,e,n){const i=n.intensity,r=i*.9;this.lampAmp+=(r-this.lampAmp)*Math.min(1,t*(r>this.lampAmp?3:.5)),this.lampHolder.rotation.z=Math.sin(e*2.7)*this.lampAmp*.4,this.lampHolder.rotation.x=Math.cos(e*2.1)*this.lampAmp*.12,this.shelfHolder.rotation.z=n.shake.x*.035,this.frameHolder.rotation.z=n.shake.z*.1,this.windowHolder.position.x=this.windowBaseX+n.shake.x*.012,this.tableHolder.rotation.y=n.shake.z*.01,i>.05&&this.counter.userData.glasses.forEach((o,a)=>{o.position.y=.675+Math.max(0,Math.sin(e*34+a*1.7))*.012*i})}}class pS extends po{build(){const t=this.backdrop(5.75,1.85,-1.75,"#ffe3c8"),e=Ba();e.userData.glass.material=nt.glass("#cfeaff",.35),e.rotation.z=.05,t.attach(e,1.15,1.08,.06);const n=Vh();n.rotation.z=-.25,t.attach(n,.15,1.2,.05),this.door=t.attach(Ha(),2.35,0,.05);const i=Gh({cord:.4}),r=new Lt;j(r,X.rbox(.12,.06,1.3,.02),nt.clay(Q.woodDark),[0,0,.65]),i.position.set(0,-.03,1.22),r.add(i),this.lamp=i,t.attach(r,-.9,1.83,.03),this.piece(r,"front",.05,{parent:t.pieceOf(-.9),pivot:r.position.clone()});const o=Hh();o.rotation.z=.07,o.position.set(-2.45,0,-1.4),this.piece(o,"grow",.2),this.table=za(),this.table.position.set(-.9,0,-.6),this.piece(this.table,"grow",.3);const a=[[-2.1,.6],[-1.7,1.25],[.4,1.15],[.95,.4],[-2.4,.15],[1.5,1.3]];Wh(6).forEach((l,c)=>{const h=ao(l,.17);h.position.set(a[c][0],.085,a[c][1]),h.rotation.set(c%2?Math.PI/2:0,c,0),this.piece(h,"pop",.4)}),this.shards=Wp(10,9),this.shards.position.set(1.2,0,-.95),this.piece(this.shards,"pop",.45),this.shoes=Gp(),this.shoes.position.set(.15,0,.6),this.shoes.rotation.y=-.3,this.piece(this.shoes,"pop",.5),this.addNico(-.9,-.55,{face:0,pose:"kneel"}),this.guardianOffset.set(.45,.75,.25),this.addGuardian(!0),this.anchors={out:new A(-.75,0,.45),shoes:new A(.15,0,.32),door:new A(2.35,0,-1.2)},this.actions={"nico.crawlOut":()=>this.crawlOut(),"shoes.glint":()=>this.shoesGlint(),"shards.glint":()=>this.shardsGlint(),"nico.shoesOn":()=>this.shoesOn(),"door.open":()=>this.openDoor()}}crawlOut(){const t=this.nico,e=this.anchors.out,n=it.timeline();return n.add(t.pose("crouch",.5)),n.add(t.walkTo(e.x,e.z,{speed:.32})),n.add(it.to(t.rotation,{y:0,duration:.4})),n.add(t.pose("idle",.9,"back.out(1.2)")),n.add(t.hop()),n}shoesGlint(){const t=this.shoes.position.clone().setY(.15);return it.timeline().add(qn(this.group,t,{color:"#ffe0d8",size:.8}),0).add(ha(this.shoes,.1),.1)}shardsGlint(){const t=this.shards.position.clone().setY(.1);return it.timeline().add(qn(this.group,t,{color:"#dff4ff",size:1}),.3).add(Be(this.group,t,{color:"#dff4ff",count:7,radius:.4}),.4)}shoesOn(){const t=this.nico,e=this.shoes,n=this.anchors.shoes,i=it.timeline();return i.add(t.walkTo(n.x,n.z,{speed:.45})),i.add(it.to(t.rotation,{y:0,duration:.3})),i.to(e.position,{x:t.position.x,z:n.z,y:.25,duration:.45,ease:"power2.out"}),i.to(e.scale,{x:.01,y:.01,z:.01,duration:.3,ease:"back.in(2)"},"-=0.15"),i.call(()=>{t.setShoes(!0),e.visible=!1}),i.call(()=>Be(this.group,new A(n.x,.1,n.z+.05),{color:"#ffd0c8",count:6,radius:.25})),i.add(t.hop()),i}openDoor(){const t=this.nico,e=this.anchors.door,n=it.timeline();return n.add(t.walkTo(e.x-.1,e.z+.55,{speed:.45})),n.to(this.door.userData.hinge.rotation,{y:-1.7,duration:1,ease:"power2.inOut"}),n.add(qn(this.group,new A(e.x,.6,-1.65),{color:"#fff4c9",size:1.8}),"-=0.4"),n.add(it.to(t.rotation,{y:Math.PI,duration:.5}),"-=0.5"),n}}function Xp({h:s=1.9}={}){const t=new Lt;t.name="poste",j(t,X.cyl(.045,.06,s,10),nt.clay("#9b8678",.85),[0,s/2,0]),j(t,X.rbox(.56,.05,.06,.015),nt.clay("#7d6b60",.85),[0,s-.12,0]);for(const n of[-1,1])j(t,X.cyl(.02,.025,.06,8),nt.clay(Q.yellow),[n*.22,s-.07,0]);t.userData.top=new A(0,s-.06,0),t.userData.height=s;const e=new Zt(X.box(.5,s,.5),nt.hit());return e.position.y=s/2,t.add(e),t}function Ta(s,t,e=.25){const n=s.clone().lerp(t,.5);n.y-=e;const i=new uh(s,n,t),r=new Zt(new _h(i,20,.009,5,!1),nt.clay("#3b2f4a",.6));return r.castShadow=!0,r.userData.ownGeometry=!0,r}let Gs=null;function qp({w:s=1.7,h:t=1.4}={}){if(!Gs){const r=document.createElement("canvas");r.width=r.height=128;const o=r.getContext("2d");o.fillStyle="#f2b28c",o.fillRect(0,0,128,128),o.strokeStyle="rgba(255,240,225,0.9)",o.lineWidth=4;for(let a=0;a<4;a++){const l=a*32;o.beginPath(),o.moveTo(0,l),o.lineTo(128,l),o.stroke();const c=a%2?32:0;for(let h=0;h<3;h++)o.beginPath(),o.moveTo(c+h*64,l),o.lineTo(c+h*64,l+32),o.stroke()}Gs=new _s(r),Gs.colorSpace=Pe,Gs.wrapS=Gs.wrapT=nr}const e=nt.custom(`brick|${s}|${t}`,()=>{const r=Gs.clone();return r.repeat.set(s*2.5,t*2.5),r.needsUpdate=!0,new he({map:r,roughness:.95})}),n=new Lt;n.name="pared",j(n,X.rbox(s,t,.16,.03),e,[0,t/2,0],{cast:!0,receive:!0}),j(n,X.rbox(s+.06,.07,.2,.02),nt.clay("#e9876b",.8),[0,t+.03,0]);const i=new Zt(X.box(s,t,.4),nt.hit());return i.position.y=t/2,n.add(i),n}function mS({w:s=2.3,h:t=1.5}={}){const e=new Lt;e.name="casa",j(e,X.rbox(s,t,.12,.03),nt.clay("#fbe3a1",.85),[0,t/2,0],{cast:!0,receive:!0});const n=X.custom(`roof|${s}`,()=>{const i=new zr;return i.moveTo(-s/2-.15,0),i.lineTo(s/2+.15,0),i.lineTo(0,.6),i.closePath(),new jr(i,{depth:.22,bevelEnabled:!0,bevelSize:.03,bevelThickness:.03,bevelSegments:2})});return j(e,n,nt.clay(Q.red,.7),[0,t-.02,-.11]),e.userData.doorX=-.45,j(e,X.rbox(.12,.3,.12,.02),nt.clay("#c4533f",.8),[s/2-.35,t+.35,0]),j(e,X.torus(.16,.035,8,24),nt.clay("#ffffff",.6),[.55,t*.62,.07]),j(e,X.circle(.15,24),nt.custom("roundGlass",()=>new he({color:"#bfe6ff",emissive:"#9fd6ff",emissiveIntensity:.3})),[.55,t*.62,.065],{cast:!1}),e}function $c({color:s="#3f8f72",trunk:t="#ef95a9",s:e=1}={}){const n=new Lt;n.name="arbol";const i=X.custom("paperCanopy",()=>{const o=new zr,a=[[0,.95,.32],[-.3,.75,.3],[.32,.78,.3],[-.18,.5,.28],[.2,.5,.28]];o.absarc(0,.62,.42,0,Math.PI*2,!1);const l=a.map(([h,u,d])=>{const f=new zr;return f.absarc(h,u,d,0,Math.PI*2,!1),f}),c=[o,...l];return new jr(c,{depth:.05,bevelEnabled:!0,bevelSize:.02,bevelThickness:.02,bevelSegments:2,curveSegments:16})});j(n,i,nt.clay(s,.9),[0,0,-.025]);const r=X.custom("paperTrunk",()=>{const o=new zr;return o.moveTo(-.07,0),o.lineTo(.07,0),o.lineTo(.05,.4),o.lineTo(.14,.55),o.lineTo(.1,.58),o.lineTo(.02,.48),o.lineTo(-.05,.6),o.lineTo(-.09,.56),o.lineTo(-.04,.42),o.closePath(),new jr(o,{depth:.04,bevelEnabled:!1})});return j(n,r,nt.clay(t,.9),[0,0,-.02]),n.scale.setScalar(e),n}function Yp(s=Q.green){const t=new Lt,e=nt.clay(s,.85);return j(t,X.sphere(.16,14,10),e,[0,.1,0]),j(t,X.sphere(.12,12,8),e,[-.15,.07,.02]),j(t,X.sphere(.12,12,8),e,[.15,.07,.02]),t}function $p(s=Q.red){const t=new Lt;j(t,X.cyl(.008,.008,.16,5),nt.clay(Q.leaf),[0,.08,0],{cast:!1});for(let e=0;e<5;e++){const n=e/5*Math.PI*2;j(t,X.sphere(.025,8,6),nt.clay(s,.7),[Math.cos(n)*.03,.17,Math.sin(n)*.03],{cast:!1})}return j(t,X.sphere(.02,8,6),nt.clay(Q.yellow,.6),[0,.175,0],{cast:!1}),t}function gS({r:s=1.05}={}){const t=new Lt;t.name="arcoiris",[Q.red,Q.orange,Q.yellow,Q.green,Q.blue,Q.lilac].forEach((i,r)=>{const o=j(t,X.torus(s-r*.075,.04,8,40,Math.PI),nt.clay(i,.7),[0,0,0]);o.scale.z=.6});const n=nt.clay("#ffffff",.9);for(const i of[-1,1]){const r=i*(s-.19);j(t,X.sphere(.17,14,10),n,[r,.08,.05]),j(t,X.sphere(.12,12,8),n,[r-.15,.04,.06]),j(t,X.sphere(.12,12,8),n,[r+.15,.04,.06])}return t}function Zp(s=.36,t="#ffffff",e=.85){const n=new Zt(X.ring(s*.8,s,48),new or({color:t,transparent:!0,opacity:e,depthWrite:!1}));return n.rotation.x=-Math.PI/2,n.position.y=.012,n.userData.ownMaterial=!0,n}function _S(s="#8f6a55"){const t=new Lt,e=nt.basic(s,.75);for(const n of[-1,1]){const i=j(t,X.circle(.05,20),e,[n*.055,.011,n*.04],{cast:!1});i.rotation.x=-Math.PI/2,i.scale.set(.75,1.15,1);const r=j(t,X.circle(.018,10),e,[n*.055,.011,n*.04-.07],{cast:!1});r.rotation.x=-Math.PI/2}return t}class vS extends po{build(){const t=Yc(2.75,1.6,"#ffe3c8");t.position.set(-1.6,0,-1.72),this.piece(t,"front",0);const e=Ba({w:.75,h:.6});e.position.set(-.55,.95,.06),t.add(e);const n=za({w:1.2,d:.75,h:.72});n.position.set(-2.2,0,-.85),this.piece(n,"grow",.2);const i=ao(Q.yellow);i.position.set(-2.55,.085,.95),i.rotation.y=.6,this.piece(i,"pop",.3);const r=Ha({w:.6,h:1.1});r.position.set(-.05,0,-1.25),r.userData.hinge.rotation.y=-1.5,this.piece(r,"front",.15);const o=j(this.group,X.rbox(.62,.02,.4,.01),nt.clay(Q.lilac,.9),[-.05,.01,.25],{cast:!1});this.piece(o,"none"),this.shoes=Gp(),this.shoes.position.set(-1.25,0,1.15),this.shoes.rotation.y=.4,this.piece(this.shoes,"pop",.5),this.footprints=[[-1.55,.2],[-1.15,.38],[-.75,.22],[-.35,.36],[.05,.25]].map(([f,g],_)=>{const p=_S();return p.position.set(f,0,g),p.rotation.y=-Math.PI/2+(_%2?.15:-.15),p.visible=!1,this.piece(p,"none"),p}),this.wall=qp({w:1.7,h:1.4}),this.wallHolder=this.holder(this.wall,1.5,0,-1.62),this.piece(this.wallHolder,"front",.1),this.pole=Xp({h:1.9}),this.poleHolder=this.holder(this.pole,2.62,0,1.05),this.piece(this.poleHolder,"back",.05);const a=this.pole.userData.top.clone().add(this.poleHolder.position),l=this.poleHolder.userData.piece,c=Ta(a.clone().add(new A(-.22,0,0)),new A(2.3,1.42,-1.62),.3),h=Ta(a.clone().add(new A(.22,0,0)),new A(3,1.6,-1.9),.25);this.piece(c,"back",0,{follow:l,pivot:this.poleHolder.position.clone()}),this.piece(h,"back",0,{follow:l,pivot:this.poleHolder.position.clone()});const u=$c({s:1});u.position.set(2.55,0,-.55),this.piece(u,"front",.35);for(const[f,g,_]of[[.55,-1.25,Q.green],[2.85,.15,"#7cc96b"]]){const p=Yp(_);p.position.set(f,0,g),this.piece(p,"pop",.5)}for(const[f,g,_]of[[.6,1.4,Q.red],[.8,1.6,Q.yellow],[2,1.55,Q.lilac],[1,-.65,Q.orange]]){const p=$p(_);p.position.set(f,0,g),this.piece(p,"pop",.6)}this.zones={centro:new A(1.5,0,.3),poste:new A(2.38,0,.85),pared:new A(1.5,0,-1.08)},this.zoneRings={};for(const[f,g]of Object.entries(this.zones)){const _=Zp(.34,"#ffffff",.9);_.position.x=g.x,_.position.z=g.z,_.visible=!1,this.piece(_,"none"),this.zoneRings[f]=_;const p=new ye;p.position.set(g.x,.15,g.z),this.group.add(p),this.markers[f]=p}this.hotspots.poste=this.pole,this.hotspots.pared=this.wall,this.wobbleCfg={poste:{axis:"z",amount:.08,times:4},pared:{axis:"x",amount:.05,times:4}},this.patioStart=new A(.55,0,.28),this.addNico(-2.05,.3,{face:.3,pose:"idle"}).setShoes(!1),this.guardianOffset.set(.4,.9,.15),this.addGuardian(!0)}tick(t,e,n){const i=1+Math.sin(e*3)*.05;for(const r of Object.values(this.zoneRings))r.visible&&r.scale.setScalar(i)}}class xS extends po{build(){const t=this.setup,e=mS({w:2.3,h:1.45});e.position.set(-1.65,0,-1.6),this.piece(e,"front",0);const n=Ha({w:.55,h:1});n.position.set(-.45,0,.07),n.userData.hinge.rotation.y=-1.4,e.add(n),this.wall=qp({w:1.6,h:1.35}),this.wallHolder=this.holder(this.wall,1.75,0,-1.65),this.piece(this.wallHolder,"front",.1),this.pole=Xp({h:1.95}),this.poleHolder=this.holder(this.pole,2.6,0,.95),this.piece(this.poleHolder,"back",.05);const i=this.poleHolder.userData.piece,r=this.pole.userData.top.clone().add(this.poleHolder.position),o=this.poleHolder.position.clone();this.piece(Ta(r.clone().add(new A(-.22,0,0)),new A(-.55,1.5,-1.55),.35),"back",0,{follow:i,pivot:o}),this.piece(Ta(r.clone().add(new A(.22,0,0)),new A(2.5,1.4,-1.65),.25),"back",0,{follow:i,pivot:o});const a=$c({s:1.15});a.position.set(-2.7,0,1.05),this.piece(a,"front",.3);const l=$c({s:.9,color:"#5fae74",trunk:"#f08a45"});l.position.set(.75,0,-1.55),this.piece(l,"front",.32);for(const[f,g,_]of[[-2.25,1.55,Q.green],[2.85,-.3,"#7cc96b"],[-.25,-1.3,"#6dbb63"]]){const p=Yp(_);p.position.set(f,0,g),this.piece(p,"pop",.45)}const c=[[-1.6,1.45,Q.red],[-1.35,1.6,Q.yellow],[1.3,1.5,Q.lilac],[1.6,1.35,Q.red],[-.6,1.5,Q.orange],[2,-.6,Q.yellow]];for(const[f,g,_]of c){const p=$p(_);p.position.set(f,0,g),this.piece(p,"pop",.55)}this.center=new A(.3,0,.3),this.ring=Zp(.48,"#ffffff",.75),this.ring.position.x=this.center.x,this.ring.position.z=this.center.z,this.piece(this.ring,"none"),this.rainbow=gS({r:1.1}),this.rainbow.position.set(.3,0,-.95),this.rainbow.scale.setScalar(1.25),this.piece(this.rainbow,"back",.1,{gate:t.rainbow?1:0,stiffness:.7});const h={door:new A(-2.1,0,-1.05),center:this.center},u=h[t.nico]??h.door;this.addNico(u.x,u.z,{face:0,pose:t.nicoPose??"idle"}).setShoes(!0),this.addGuardian(!0),this.anchors={center:this.center},this.hotspots.pared=this.wall,this.hotspots.poste=this.pole,this.markers.pared=this.wallHolder,this.markers.poste=this.poleHolder,this.hazards=["pared","poste"],this.wobbleCfg={pared:{axis:"x",amount:.05},poste:{axis:"z",amount:.08}},this.actions={"guardian.point":()=>this.point(),"rainbow.show":()=>this.showRainbow(),celebrate:()=>this.celebrate()}}point(){const t=this.guardian,e=this.center,n=it.timeline();return this.guardianPinned=!0,n.add(t.moveTo(new A(e.x,.9,e.z),1.1),0),n.add(t.pulse(1),.8),n.add(qn(this.group,e.clone().setY(.05),{color:"#fffbe0",size:1.6}),.9),n.add(Be(this.group,e.clone().setY(.1),{color:"#fffbe0",count:10,radius:.5}),1),n.to(this.ring.material,{opacity:1,duration:.4,yoyo:!0,repeat:3},.9),n.call(()=>{this.guardianPinned=!1},null,2.6),n}showRainbow(){const t=this.rainbow;return it.timeline().to(t.userData.piece,{gate:1,duration:1.4,ease:"power2.out"},0).add(Be(this.group,t.position.clone().setY(1.2),{color:"#fff6c2",count:12,radius:.9}),.3)}celebrate(){const t=it.timeline();return t.add(this.nico.pose("cheer",.6),0),t.add(this.nico.hop(),.2),t.add(this.guardian.pulse(2),0),t.add(Be(this.group,this.nico.position.clone().setY(1.1),{color:"#fff6c2",count:12,radius:.6}),.3),t.add(this.nico.pose("idle",.8),1.6),t}tick(t,e,n){this.poleHolder.rotation.z=n.shake.x*.04,this.wallHolder.rotation.x=n.shake.z*.015}}const yS={room:fS,underTable:dS,exit:pS,route:vS,patio:xS};function Jf(s,t,e){const n=yS[s];if(!n)throw new Error(`Escenario desconocido: ${s}`);return new n(t,e).init()}const MS=s=>new Promise(t=>it.delayedCall(s,t));class Xh{constructor(t,e,n){this.ctx=t,this.data=e,this.scene=n,this.done=!1,this.timers=[],this.disposed=!1,this.onBegin=null}async start(){var t;return this.promise=new Promise(e=>{this.resolve=e}),this.ctx.ui.showText({}),await this.intro(),this.disposed?this.promise:((t=this.onBegin)==null||t.call(this),this.begin(),this.promise)}async intro(){const t=this.scene.guardian,e=this.data.guide;if(!t||!e)return;const{ui:n}=this.ctx;if(n.showVeil(!0),await this.scene.guardianToViewer(!0),this.disposed||(await t.greet(),await MS(.25),this.disposed))return;const i=2.6+e.split(/\s+/).length*.34;await new Promise(r=>{const o=it.delayedCall(i,r);n.showGuardianBubble(e,t,()=>{o.kill(),r()}),this.skipIntro=()=>{o.kill(),r()}}),n.hideGuardianBubble(),n.showVeil(!1),!this.disposed&&(t.speak(),await this.scene.guardianToViewer(!1))}begin(){}say(t,e){this.ctx.ui.say("guardian",t,e),this.scene.onDialogue("guardian")}later(t,e){this.timers.push(setTimeout(t,e))}finish(t){var e;this.finished||(this.finished=!0,t&&this.say(t,"ok"),this.ctx.ui.completeActivity(),this.cleanup(),(e=this.resolve)==null||e.call(this))}cleanup(){this.ctx.hotspots.clear(),this.ctx.pointer.clear()}dispose(){var e,n;this.disposed=!0,(e=this.skipIntro)==null||e.call(this),this.timers.forEach(clearTimeout),this.cleanup();const{ui:t}=this.ctx;t.hideGuardianBubble(),t.showVeil(!1),t.hideSteps(),t.hideActivity(),(n=this.resolve)==null||n.call(this)}}class SS extends Xh{begin(){const{ui:t,hotspots:e,pointer:n}=this.ctx,i=this.data;t.showActivity(i.title),this.say(i.intro),Object.entries(i.targets).forEach(([r,o],a)=>{const l=this.scene.markers[r],c=this.scene.hotspots[r];!l||!c||(e.add(r,l,{label:o.label,onClick:()=>this.choose(r),index:a}),n.addClickable(c,()=>this.choose(r)))})}choose(t){var o;if(this.done)return;const e=this.data,n=e.targets[t],{hotspots:i,pointer:r}=this.ctx;if(!n.safe){this.scene.wobble(t),this.say(((o=e.wrongBy)==null?void 0:o[t])??e.wrong,"oops"),i.setClass(t,"is-wrong");return}this.done=!0,i.clear(),r.clear(),this.say(e.success,"ok"),this.scene.wobble("mesa"),this.scene.run("nico.hideUnderTable").then(()=>this.finish())}}class bS extends Xh{begin(){const{ui:t,quake:e}=this.ctx,n=this.data;t.showActivity(n.title),this.say(n.intro),e.to(.3,1.2),this.scene.nico.pose("kneel",.8),this.expected=0,t.showSteps(n.steps,i=>this.pick(i)),t.setNextStep(0)}pick(t){if(this.done||t<this.expected)return;const{ui:e,quake:n}=this.ctx,i=this.data;if(t!==this.expected){e.markStep(t,"wrong"),this.say(i.wrongOrder,"oops");return}const r=i.steps[t];e.markStep(t,"done"),this.scene.nico.pose(r.pose,.7),Be(this.scene.group,this.scene.nico.position.clone().setY(.6),{color:"#fff6c2",count:6,radius:.35}),this.expected++,e.setNextStep(this.expected),this.expected===i.steps.length&&(this.done=!0,n.to(.06,3),this.scene.run("guardian.glow"),this.finish(i.success),this.later(()=>e.hideSteps(),1600))}cleanup(){super.cleanup()}}const Ko=(s,t,e)=>Math.max(t,Math.min(e,s));class wS extends Xh{async begin(){const{ui:t}=this.ctx,e=this.data;t.showActivity(e.title,e.stops.map(n=>n.short)),await this.stopShoes(e.stops[0]),await this.wait(700),await this.stopWalk(e.stops[1]),await this.wait(400),await this.stopOpen(e.stops[2]),this.finish(e.success)}wait(t){return new Promise(e=>this.later(e,t))}stopShoes(t){const{ui:e,hotspots:n,pointer:i}=this.ctx,r=this.scene,o=r.shoes,a=r.nico,l=o.position.clone();return e.setStop(0),this.say(t.prompt),new Promise(c=>{let h=!1;const u=()=>n.add("shoes",o,{label:"Zapatos",showLabel:!0,passive:!0,onClick:()=>d()}),d=()=>{if(h)return;h=!0,i.remove(o),n.remove("shoes");const f=it.timeline();f.to(o.position,{x:a.position.x,z:a.position.z+.05,y:.2,duration:.45,ease:"power2.out"}),f.to(o.scale,{x:.01,y:.01,z:.01,duration:.3,ease:"back.in(2)"},"-=0.15"),f.call(()=>{o.visible=!1,a.setShoes(!0),Be(r.group,a.position.clone().setY(.1),{color:"#ffd0c8",count:8,radius:.3})}),f.add(a.hop()),f.call(c)};u(),i.addDraggable(o,{space:r.group,onStart:()=>{n.remove("shoes"),it.to(o.position,{y:.18,duration:.2})},onMove:f=>{o.position.x=Ko(f.x,-2.9,2.9),o.position.z=Ko(f.z,-1.9,1.9)},onDrop:()=>{if(Math.hypot(o.position.x-a.position.x,o.position.z-a.position.z)<.6)return d();it.to(o.position,{x:l.x,y:0,z:l.z,duration:.6,ease:"back.out(1.5)",onComplete:u})}})})}stopWalk(t){const{ui:e,hotspots:n}=this.ctx,i=this.scene,r=i.nico,o=i.footprints;return e.setStop(1),this.say(t.prompt),new Promise(a=>{let l=0,c=!1,h=0;const u=()=>{o.forEach((g,_)=>{n.setClass(`step${_}`,"is-dim",_!==l)})},d=()=>{this.say(t.tooFast,"oops"),it.fromTo(r.p,{lean:-.25},{lean:0,duration:.6,ease:"elastic.out(1, 0.4)"})},f=g=>{if(g<l)return;if(c||g!==l||performance.now()-h<200)return d();c=!0,n.remove(`step${g}`);const _=o[g];r.walkTo(_.position.x,_.position.z,{speed:.55}).then(()=>{if(c=!1,h=performance.now(),qn(i.group,_.position.clone().setY(.05),{color:"#fff6c2",size:.4}),l++,l<o.length)return u();r.walkTo(i.patioStart.x,i.patioStart.z,{speed:.55}).then(()=>{it.to(r.rotation,{y:0,duration:.4}),o.forEach(p=>it.to(p.scale,{x:.01,y:.01,z:.01,duration:.4,onComplete:()=>{p.visible=!1}})),a()})})};o.forEach((g,_)=>{g.visible=!0,it.fromTo(g.scale,{x:.01,y:.01,z:.01},{x:1,y:1,z:1,duration:.5,delay:_*.12,ease:"back.out(2)"}),n.add(`step${_}`,g,{label:`Paso ${_+1}`,className:"is-step",index:_,onClick:()=>f(_)})}),u()})}stopOpen(t){const{ui:e,hotspots:n,pointer:i}=this.ctx,r=this.scene,o=r.nico;return e.setStop(2),this.say(t.prompt),new Promise(a=>{let l=!1;const c=r.patioStart;Object.entries(t.zones).forEach(([u,d],f)=>{const g=r.zoneRings[u];g.visible=!0,it.fromTo(g.scale,{x:.01,y:.01,z:.01},{x:1,y:1,z:1,duration:.5,delay:f*.1,ease:"back.out(2)"}),n.add(`zone-${u}`,r.markers[u],{label:d.label,showLabel:!0,index:f,onClick:()=>h(u,!0)})});const h=(u,d=!1)=>{var p;if(l)return;const f=t.zones[u],g=r.zones[u];if(!f.safe){r.wobble(u),this.say(((p=t.wrongBy)==null?void 0:p[u])??"Uy, ¡busca otro!","oops"),n.setClass(`zone-${u}`,"is-wrong"),d?o.walkTo(g.x,g.z+.25,{speed:.9}).then(()=>o.walkTo(c.x,c.z,{speed:.9})):it.to(o.position,{x:c.x,z:c.z,duration:.8,ease:"power2.inOut"});return}l=!0,i.clear(),n.clear(),(d?o.walkTo(g.x,g.z,{speed:.6}):it.to(o.position,{x:g.x,z:g.z,duration:.5,ease:"power2.out"})).then(()=>{it.to(o.rotation,{y:0,duration:.4}),o.pose("sit",.8),o.face("smile"),Be(r.group,g.clone().setY(.2),{color:"#fffbe0",count:12,radius:.5}),r.zoneRings.poste.visible=r.zoneRings.pared.visible=!1,this.later(a,700)})};n.add("nico",o.hit,{label:"Nico",index:3,passive:!0}),i.addDraggable(o,{space:r.group,onStart:()=>{n.remove("nico"),o.pose("dangle",.3),it.to(o.p,{lift:.22,duration:.25})},onMove:u=>{o.position.x=Ko(u.x,.2,2.9),o.position.z=Ko(u.z,-1.5,1.6)},onDrop:()=>{it.to(o.p,{lift:0,duration:.4,ease:"bounce.out"}),o.pose("idle",.5);let u=null,d=.6;for(const[f,g]of Object.entries(r.zones)){const _=Math.hypot(g.x-o.position.x,g.z-o.position.z);_<d&&(u=f,d=_)}if(u)return h(u);it.to(o.position,{x:c.x,z:c.z,duration:.7,ease:"power2.inOut"}),n.add("nico",o.hit,{label:"Nico",index:3,passive:!0})}})})}}const TS={safePlace:{title:"¿Dónde me protejo?",guide:"¡Psst! Sí, tú, que estás leyendo. Nico necesita tu ayuda: toca el lugar donde estará más seguro.",intro:"¡Ayúdame a encontrar el lugar más seguro!",targets:{mesa:{label:"Mesa",safe:!0},ventana:{label:"Ventana"},lampara:{label:"Lámpara"},estante:{label:"Estante"},cuadro:{label:"Cuadro"},sofa:{label:"Sofá"}},wrong:"Uy, esto se puede caer. ¡Busca otro!",wrongBy:{sofa:"Uy, aquí nada te cubre la cabeza. ¡Busca otro!"},success:"¡Eso es! Lejos de ventanas y de cosas que se caen."},protectSteps:{title:"Agáchate, cúbrete y sujétate",guide:"¡Ahora te toca a ti! Practica con Nico: toca los tres pasos mágicos, en orden.",intro:"Toca los tres pasos mágicos, uno detrás de otro.",steps:[{id:"agachate",label:"Agáchate",icon:"turtle",pose:"crouch"},{id:"cubrete",label:"Cúbrete",icon:"cover",pose:"cover"},{id:"sujetate",label:"Sujétate",icon:"hold",pose:"hold"}],wrongOrder:"Primero agáchate, luego cúbrete y después sujétate.",success:"¡Lo lograste! Ya sabes cómo protegerte."},safeRoute:{title:"Camino al lugar seguro",guide:"¡Hola otra vez! Ayúdame a sacar a Nico: primero los zapatos, luego pasitos lentos y al final un lugar abierto.",stops:[{id:"shoes",short:"Zapatos",prompt:"Arrastra los zapatos hasta los pies de Nico."},{id:"walk",short:"Sin correr",prompt:"Toca los pasos de Nico, uno por uno.",tooFast:"Despacito, sin correr."},{id:"open",short:"Lugar abierto",prompt:"Arrastra a Nico al lugar más seguro del patio.",zones:{centro:{label:"Centro del patio",safe:!0},poste:{label:"Poste con cables"},pared:{label:"Pared alta"}},wrongBy:{poste:"Uy, el poste y los cables se pueden caer. ¡Busca otro!",pared:"Uy, la pared alta se puede caer. ¡Busca otro!"}}],success:"Aquí nada se puede caer sobre nosotros. Ahora esperamos a un adulto de confianza."}},ES={safePlace:SS,protectSteps:bS,safeRoute:wS};function AS(s,t,e){const n=ES[s];if(!n)throw new Error(`Actividad desconocida: ${s}`);return new n(t,TS[s],e)}const jf=s=>s?s.trim().split(/\s+/).length:0;function RS(s){const t=[{kind:"title",id:"title",mood:"afternoon",camera:"open",quake:0}];for(const e of s){if(e.type==="activity"&&e.samePage){t[t.length-1].activity=e;continue}t.push({kind:e.type==="activity"?"activity":"page",id:e.id,page:e,scene:e.scene,setup:e.setup,mood:e.mood,camera:e.camera,quake:e.quake??0})}return t.push({kind:"end",id:"end",mood:"golden",camera:"open",quake:0}),t}class CS{constructor(t){this.ctx=t,this.spreads=RS(si.pages),this.index=0,this.scene=null,this.incoming=null,this.activity=null,this.mode="cover",this.phase="idle",this.completed=new Set,this.beat=0,this.beatTimer=null,this.beatTl=null}get spread(){return this.spreads[this.index]}get isEnd(){var t;return((t=this.spread)==null?void 0:t.kind)==="end"}texturesFor(t){return t.kind==="title"?[If("left",si.titleSpread.left),If("right",si.titleSpread.right)]:t.kind==="end"?[Uf("left"),Uf("right")]:[wa(t.page,"left"),wa(t.page,"right")]}pendingActivity(t=this.spread){return t.kind==="activity"?!this.completed.has(t.id):!!t.activity&&!this.completed.has(t.activity.id)}showCover(){const{book:t,env:e,rig:n,quake:i,ui:r}=this.ctx;this.mode="cover",this.index=0,i.set(0),t.setClosed();const[o,a]=this.texturesFor(this.spreads[0]);t.setPages(o,a),e.setMoodInstant(si.cover.mood),n.set(si.cover.camera),r.showDragHint("cover")}afterOpen(){const{book:t,env:e,rig:n,ui:i}=this.ctx;this.mode="opening",i.hideDragHint(),t.setCoverLabel(null);const r=it.timeline();r.add(t.finishOpen(),0),r.add(n.to("open",3)??it.timeline(),0),r.add(e.setMood("afternoon",3.4)??it.timeline(),0),r.call(()=>{this.mode="reading",this.index=0,this.enterSpread()})}afterClose(){const{book:t,env:e,rig:n,quake:i,ui:r}=this.ctx;this.mode="closing",r.clearText(),i.to(0,1);const o=it.timeline();o.add(t.finishClose(),0),o.add(n.to(si.ending.camera,3.2)??it.timeline(),0),o.add(e.setMood(si.ending.mood,3.5)??it.timeline(),0),o.call(()=>{const[a,l]=this.texturesFor(this.spreads[0]);t.setPages(a,l),this.completed.clear(),this.index=0,this.mode="cover",r.showDragHint("cover")})}canTurn(t,e){return this.mode==="cover"?t==="cover"?"ok":"none":this.mode!=="reading"?"none":t==="close"?"ok":t!=="page"?"none":this.phase==="intro"||this.phase==="activity"?"locked":e>0?this.index>=this.spreads.length-1?"none":this.pendingActivity()?"locked":"ok":this.index>0?"ok":"none"}peek(t){var e;(e=this.scene)==null||e.beginCarry(t>0?"R":"L",t>0?"front":"back")}endPeek(){var t;(t=this.scene)==null||t.endCarry()}prepare(t){const e=this.spreads[this.index+t];if(!e)return!1;const[n,i]=this.texturesFor(e);return this.ctx.book.beginTurn(t,n,i),e.scene&&(this.incoming=Jf(e.scene,this.ctx,e.setup??{}),this.ctx.book.stage.add(this.incoming.group),this.incoming.beginCarry(t>0?"L":"R",t>0?"back":"front")),!0}dragStart(t){const{ui:e,book:n}=this.ctx;e.hideDragHint(),t==="close"&&n.setCoverLabel(si.ending.label)}progress(t,e){var o,a;const n=Math.min(2.5,Math.abs(e)*.5),i=Math.max(0,1-t*2),r=Math.max(0,t*2-1);this.scene&&(this.scene.setOpenness(i),this.scene.wind=Math.max(this.scene.wind,n),(a=(o=this.scene).onWind)==null||a.call(o,n)),this.incoming&&(this.incoming.setOpenness(r),this.incoming.wind=Math.max(this.incoming.wind,n*.6))}commit(t,e){var l;const{ui:n,env:i,rig:r,quake:o}=this.ctx;if(t==="cover"){this.mode="opening";return}if(t==="close"){this.mode="closing",n.clearText();return}this.stopBeats(),n.clearText(),n.hideDragHint(),(l=this.activity)==null||l.dispose(),this.activity=null;const a=this.spreads[this.index+e];i.setMood(a.mood??"afternoon",2.6),r.to(a.camera??"open",2.6),o.to(a.quake??0,1.6)}finish(t,e){var n,i,r;if(t==="cover")return this.afterOpen();if(t==="close")return this.afterClose();this.ctx.book.commitTurn(),(n=this.scene)==null||n.dispose(),this.scene=this.incoming,this.incoming=null,(i=this.scene)==null||i.endCarry(),(r=this.scene)==null||r.setOpenness(1),this.index+=e,this.enterSpread()}cancel(t){var e,n,i;if(t!=="page"){this.mode==="cover"?this.ctx.ui.showDragHint("cover",1.2):this.isEnd&&this.ctx.ui.showDragHint("close",1.2);return}this.ctx.book.cancelTurn(),(e=this.incoming)==null||e.dispose(),this.incoming=null,(n=this.scene)==null||n.endCarry(),(i=this.scene)==null||i.setOpenness(1),this.phase==="done"&&this.ctx.ui.showDragHint(this.isEnd?"close":"next",1.5)}onLockedAttempt(){const{ui:t}=this.ctx,e=this.phase==="intro"?"Escucha al Guardián…":this.phase==="beats"?"Espera un poquito: Nico va a necesitar tu ayuda aquí":"Primero ayuda a Nico con la actividad";t.toast(e),t.shakeActivity()}enterSpread(){const t=this.spread,{ui:e}=this.ctx;this.phase="idle",e.hideActivity(),t.kind==="page"?(this.phase="beats",this.beatTimer=it.delayedCall(.6,()=>this.playBeat(0))):t.kind==="activity"?this.completed.has(t.id)?this.done():this.beatTimer=it.delayedCall(.8,()=>this.startActivity(t.page)):this.done()}playBeat(t){var h,u,d;const e=this.spread,n=e.page.beats[t],{ui:i,quake:r,env:o}=this.ctx;if(this.beat=t,i.showText({text:n.text,dialogue:n.dialogue},{step:t,steps:e.page.beats.length}),n.dialogue&&((h=this.scene)==null||h.onDialogue(n.dialogue.who)),n.quake!==void 0){const[f,g]=Array.isArray(n.quake)?n.quake:[n.quake,1.2];r.to(f,g)}n.mood&&o.setMood(n.mood,2.5),this.beatTl=this.scene?this.scene.runSequence(n.do??[]):null;const a=2+(jf(n.text)+jf((u=n.dialogue)==null?void 0:u.text))*.4,l=Math.max(a,(((d=this.beatTl)==null?void 0:d.duration())??0)+.8),c=t===e.page.beats.length-1;this.beatTimer=it.delayedCall(l,()=>c?this.afterBeats():this.playBeat(t+1))}afterBeats(){const t=this.spread;if(t.activity&&!this.completed.has(t.activity.id))return this.startActivity(t.activity);this.done()}stopBeats(){var t,e;(t=this.beatTimer)==null||t.kill(),this.beatTimer=null,(e=this.beatTl)!=null&&e.isActive()&&this.beatTl.progress(1),this.beatTl=null}async startActivity(t){if(!this.scene)return;const e=AS(t.activity,this.ctx,this.scene);this.activity=e,this.phase="intro",e.onBegin=()=>{this.activity===e&&(this.phase="activity")},await e.start(),this.activity===e&&(this.completed.add(t.id),this.done())}done(){this.phase="done",this.ctx.ui.showDragHint(this.isEnd?"close":"next",this.spread.kind==="title"?.6:1.4)}update(t,e,n){var i,r;(i=this.scene)==null||i.update(t,e,n),(r=this.incoming)==null||r.update(t,e,n)}jumpTo(t){var d;const e=Number(t);let n=this.spreads.findIndex(f=>{var g,_;return f.id===t||Number.isInteger(e)&&((g=f.page)==null?void 0:g.number)===e||((_=f.activity)==null?void 0:_.id)===t});if(n<0)return this.showCover();const i=this.spreads[n],{book:r,env:o,rig:a,quake:l,ui:c}=this.ctx;this.mode="reading",this.index=n,r.setOpen();const[h,u]=this.texturesFor(i);if(r.setPages(h,u),o.setMoodInstant(i.mood??"afternoon"),a.set(i.camera??"open"),l.set(i.quake??0),c.hideDragHint(),i.scene&&(this.scene=Jf(i.scene,this.ctx,i.setup??{}),r.stage.add(this.scene.group),it.to(this.scene,{openness:1,duration:1.8,ease:"power1.inOut"})),((d=i.activity)==null?void 0:d.id)===t){this.phase="beats",this.beatTimer=it.delayedCall(1.6,()=>this.startActivity(i.activity));return}this.enterSpread()}}class PS{constructor(t,e){this.canvas=t,this.renderer=new h1({canvas:t,antialias:!0,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.outputColorSpace=Pe,this.renderer.toneMapping=ed,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Qf,this.renderer.localClippingEnabled=!0,WM(this.renderer.capabilities.getMaxAnisotropy()),this.scene=new Um,this.camera=new pn(35,window.innerWidth/window.innerHeight,.1,400),this.scene.add(this.camera),this.quake=new PM,this.rig=new LM(this.camera),this.env=new GM({scene:this.scene,renderer:this.renderer,textures:e}),hs.light=new Tg("#bff5a0",0,2.4,2),this.scene.add(hs.light),this.book=new $M,this.scene.add(this.book.root,this.book.shadow),this.ui=new nS,this.hotspots=new iS(this.ui.el.hotspots,this.camera),this.pointer=new sS(t,this.camera),this.story=new CS({book:this.book,env:this.env,rig:this.rig,quake:this.quake,ui:this.ui,hotspots:this.hotspots,pointer:this.pointer,camera:this.camera}),this.turner=new KM({canvas:t,camera:this.camera,book:this.book,pointer:this.pointer},this.story),this.resize(),window.addEventListener("resize",()=>this.resize()),it.ticker.remove(it.updateRoot),this.last=0,this.elapsed=0,this.tick=this.tick.bind(this)}resize(){const t=window.innerWidth,e=window.innerHeight;this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,e),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))}warmUp(){this.rig.update(0,0,this.quake),this.renderer.compile(this.scene,this.camera),this.renderer.render(this.scene,this.camera)}start(){requestAnimationFrame(this.tick)}tick(t){requestAnimationFrame(this.tick);const e=this.last?Math.min((t-this.last)/1e3,1/20):0;this.last=t,this.elapsed+=e;const n=this.elapsed;it.updateRoot(t/1e3),this.quake.update(e),this.env.update(e,n,this.quake,this.camera),this.book.update(e,n,this.quake,this.rig.parallax),this.turner.update(e),this.story.update(e,n,this.quake),this.rig.update(e,n,this.quake),this.hotspots.update(),this.ui.update(this.camera,this.book),this.renderer.render(this.scene,this.camera)}}async function DS(){if(!document.fonts)return;const s=["500 32px Fredoka","600 32px Fredoka","700 32px Fredoka","64px Pacifico"],t=new Promise(e=>setTimeout(e,3500));await Promise.race([Promise.all(s.map(e=>document.fonts.load(e))),t]).catch(()=>{})}function LS(){const s=new Sg,t=e=>new Promise((n,i)=>s.load(e,n,void 0,i));return Promise.all([t("./textures/sky/night.jpg"),t("./textures/sky/dusk.jpg")]).then(([e,n])=>({night:e,dusk:n}))}async function IS(){const s=document.querySelector("canvas.webgl"),[,t]=await Promise.all([DS(),LS()]),e=new PS(s,t);window.experience=e;const i=new URLSearchParams(location.search).get("pagina");e.start(),i?e.story.jumpTo(i):e.story.showCover(),e.warmUp(),requestAnimationFrame(()=>e.ui.hideLoader())}IS().catch(s=>{console.error(s);const t=document.querySelector(".loader__text");t&&(t.textContent="No se pudo abrir el cuento. Recarga la página.")});
//# sourceMappingURL=index-CSJXSdjv.js.map
