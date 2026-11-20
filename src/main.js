import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const motion = gsap.matchMedia();
motion.add('(prefers-reduced-motion: no-preference)', () => {
  gsap.from('.truck', {x:'-110%', opacity:0, duration:1.6, ease:'power3.out'});
  gsap.from('.hero-copy', {y:24, opacity:0, duration:1});
  gsap.to('.truck img', {rotation:-3, y:-25, transformOrigin:'75% 80%', scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
  gsap.to('.sun', {y:90,scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
});
document.querySelector('#year').textContent = new Date().getFullYear();
document.querySelector('#partnership').addEventListener('submit', event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const body = 'Name / company: '+data.get('name')+'\nEmail: '+data.get('email')+'\nPhone: '+data.get('phone')+'\n\n'+data.get('message');
  window.location.href = 'mailto:admin@mavericktow.com?subject='+encodeURIComponent('Property partnership inquiry')+'&body='+encodeURIComponent(body);
  document.querySelector('#form-status').textContent = 'Your email app will open. Send the prepared email to complete your inquiry.';
});
const schema = document.createElement('script');
schema.type = 'application/ld+json';
schema.textContent = JSON.stringify({'@context':'https://schema.org','@type':'AutomotiveBusiness',name:'Maverick Recovery & Towing',telephone:'+16028290000',email:'admin@mavericktow.com',address:{'@type':'PostalAddress',streetAddress:'8829 N 143rd Ave',addressLocality:'Waddell',addressRegion:'AZ',postalCode:'85355',addressCountry:'US'},areaServed:'Phoenix metropolitan area',openingHours:'Mo-Su 00:00-23:59'});
document.head.append(schema);
