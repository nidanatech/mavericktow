import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const motion = gsap.matchMedia();
const truckImage = document.querySelector('.truck img');
truckImage.decode().catch(() => {}).then(() => {
motion.add('(prefers-reduced-motion: no-preference)', () => {
  const arrival = gsap.timeline();
  arrival.fromTo('.truck', {xPercent:-140, opacity:0}, {xPercent:0, opacity:1, duration:2.2, ease:'power3.out'})
    .fromTo('.hero-copy', {y:35, opacity:0}, {y:0, opacity:1, duration:1}, 0.3);
  const drive = gsap.timeline({scrollTrigger:{
    trigger:'.hero', start:'top top', end:() => '+=' + window.innerHeight * 1.4,
    pin:true, scrub:0.7, invalidateOnRefresh:true
  }});
  drive.to('.truck img', {rotation:-9, yPercent:-10, scale:1.06, transformOrigin:'20% 82%', ease:'none'},0)
    .to('.sun', {y:100, scale:1.2, ease:'none'},0)
    .to('.road', {backgroundPosition:'-600px 0',ease:'none'},0)
    .to('.hero-copy', {y:-35,opacity:0.7,ease:'none'},0)
    .to('.scroll-progress', {scaleX:1,ease:'none'},0);
  document.querySelector('.replay').addEventListener('click', () => arrival.restart());
  gsap.utils.toArray('.services article, .section-heading, .photo-section>div').forEach(element => {
    gsap.from(element, {y:45,opacity:0,duration:0.8,scrollTrigger:{trigger:element,start:'top 90%',once:true}});
  });
  return () => arrival.kill();
});
ScrollTrigger.refresh();
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
