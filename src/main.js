import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const motion = gsap.matchMedia();
const truckImages = [...document.querySelectorAll('.truck img')];
Promise.all(truckImages.map(image => image.decode().catch(() => {}))).then(() => {
  motion.add('(prefers-reduced-motion: no-preference)', () => {
    const arrival = gsap.timeline();
    arrival.fromTo('.truck', {xPercent:-150, opacity:0}, {
      xPercent:0, opacity:1, duration:2.4, ease:'power2.out'
    }, 0);
    arrival.fromTo('.wheel .sprite', {rotation:-540}, {
      rotation:0, duration:2.4, ease:'power2.out'
    }, 0);
    arrival.fromTo('.hero-copy', {y:25, opacity:0}, {
      y:0, opacity:1, duration:0.8
    }, 0.2);
    arrival.to('.rig-body', {y:3, duration:0.12, yoyo:true, repeat:3}, 2.1);

    const drive = gsap.timeline({scrollTrigger:{
      trigger:'.hero', start:'top top',
      end:() => '+=' + window.innerHeight,
      pin:true, scrub:0.6, invalidateOnRefresh:true
    }});
    // The ram's lower pin stays on the subframe; its upper pin follows the arm.
    const lift = {angle:0};
    const updateLift = () => {
      const radians = lift.angle * Math.PI / 180;
      const pivot = {x:54, y:410};
      const upper = {
        x:pivot.x + 276 * Math.cos(radians) + 135 * Math.sin(radians),
        y:pivot.y + 276 * Math.sin(radians) - 135 * Math.cos(radians)
      };
      const dx = upper.x - 280;
      const dy = upper.y - 460;
      gsap.set('.boom-arm', {rotation:lift.angle});
      gsap.set('.boom-hydraulic', {
        width:Math.hypot(dx, dy) / 726 * 100 + '%',
        rotation:Math.atan2(dy, dx) * 180 / Math.PI
      });
    };
    updateLift();
    drive.to(lift, {angle:-16, ease:'none', duration:1, onUpdate:updateLift}, 0);
    drive.to('.sun-haze', {y:-18, ease:'none', duration:1}, 0);
    const sunlight = gsap.to('.sun-haze', {
      opacity:0.9, scale:1.06, duration:7, repeat:-1, yoyo:true, ease:'sine.inOut'
    });
    drive.to('.scroll-progress', {scaleX:1, ease:'none', duration:1}, 0);

    const replay = () => arrival.restart();
    const replayButton = document.querySelector('.replay');
    replayButton.addEventListener('click', replay);
    gsap.utils.toArray('.services article, .section-heading, .photo-section>div').forEach(element => {
      gsap.from(element, {y:35,opacity:0,duration:0.8,
        scrollTrigger:{trigger:element,start:'top 90%',once:true}});
    });
    return () => {
      sunlight.kill();
      replayButton.removeEventListener('click', replay);
    };
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
