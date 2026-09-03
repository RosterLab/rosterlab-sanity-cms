import Script from "next/script";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "777741693485350";

export default function MetaPixel() {
  return (
    <>
      {/*
        The fbq stub and the PageView call run immediately — they're inline and
        cost nothing. Only the 105 KiB fbevents.js download/parse is deferred,
        because fbq queues calls made before the library arrives and fbevents.js
        replays that queue on load. So no events are lost, but the bundle stops
        competing with LCP and hydration for bandwidth and main-thread time.

        Load triggers, whichever comes first:
          - the first real user interaction (pointer/keyboard/scroll), so a
            visitor who engages is tracked promptly, or
          - the first idle slot after `load` (hard-capped), so bounces are
            captured too without racing the LCP image for bandwidth.
      */}
      <Script
        id="meta-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[]}(window, document,'script');
            fbq('init', '${PIXEL_ID}');
            fbq('track', 'PageView');

            (function(w,d){
              var loaded=false;
              var events=['pointerdown','keydown','scroll','touchstart'];
              function inject(){
                if(loaded)return;
                loaded=true;
                events.forEach(function(ev){
                  w.removeEventListener(ev,inject,{capture:true});
                });
                var t=d.createElement('script');
                t.async=true;
                t.src='https://connect.facebook.net/en_US/fbevents.js';
                var s=d.getElementsByTagName('script')[0];
                s.parentNode.insertBefore(t,s);
              }
              function afterLoad(){
                // Schedule into the first idle slot after load, with a hard
                // cap so it always runs.
                if(w.requestIdleCallback){
                  w.requestIdleCallback(inject,{timeout:2000});
                }else{
                  w.setTimeout(inject,1000);
                }
              }
              // Early trigger: a visitor who engages gets tracked right away.
              events.forEach(function(ev){
                w.addEventListener(ev,inject,{capture:true,passive:true,once:true});
              });
              // Otherwise wait for the load event, so the pixel never competes
              // with the LCP image or any other critical resource.
              if(d.readyState==='complete'){
                afterLoad();
              }else{
                w.addEventListener('load',afterLoad,{once:true});
              }
            })(window,document);
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}
