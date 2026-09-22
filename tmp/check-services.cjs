const { chromium } = require('playwright');
const details = require('../lib/service-details.json');
const output = 'C:/Users/Fowosere/.codex/visualizations/2026/09/21/01a0c471-204a-7153-981e-9183f06ab13a';
(async () => {
 const browser = await chromium.launch({headless:true, channel:'msedge'});
 try {
  const page = await browser.newPage({viewport:{width:1440,height:900}});
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://localhost:3000/services',{waitUntil:'networkidle'});
  await page.screenshot({path:output+'/services-new-hero.png'});
  const panels=page.locator('#our-services article');
  await panels.nth(4).evaluate(e=>window.scrollTo(0,e.offsetTop+e.parentElement.getBoundingClientRect().top+scrollY-212));
  await page.waitForTimeout(500);
  console.log('stack',await panels.evaluateAll(es=>es.map(e=>({top:Math.round(e.getBoundingClientRect().top),height:e.offsetHeight,position:getComputedStyle(e).position}))));
  await page.screenshot({path:output+'/services-new-stack.png'});
  await page.setViewportSize({width:390,height:844});
  await page.goto('http://localhost:3000/services',{waitUntil:'networkidle'});
  console.log('mobile overflow',await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
  await panels.first().scrollIntoViewIfNeeded();
  await page.screenshot({path:output+'/services-new-mobile.png'});
  for(const [slug,copy] of Object.entries(details)) {
   const response=await page.goto('http://localhost:3000/services/'+slug,{waitUntil:'networkidle'});
   console.log(slug,response.status(),await page.locator('h1').innerText()===copy.heading,await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
  }
  await page.screenshot({path:output+'/services-detail-mobile.png'});
  await page.setViewportSize({width:1440,height:900});
  await page.goto('http://localhost:3000/services/intelligence-fusion',{waitUntil:'networkidle'});
  await page.screenshot({path:output+'/services-detail-desktop.png'});
  console.log('errors',errors);
 } finally {await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
