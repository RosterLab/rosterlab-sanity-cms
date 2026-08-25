import Script from "next/script";

interface GoogleTagManagerHeadProps {
  gtmId: string;
}

export default function GoogleTagManagerHead({
  gtmId,
}: GoogleTagManagerHeadProps) {
  if (!gtmId) return null;

  return (
    /*
      The dataLayer and the gtm.start timestamp are created immediately — they
      cost nothing and any dataLayer.push() made before the container arrives is
      queued, then replayed by gtm.js on load. Only the container download/parse
      is deferred, because GTM pulls in GA4 behind it and the two together were
      the largest block of main-thread time during hydration.

      Load triggers, whichever comes first:
        - the first real user interaction (pointer/keyboard/scroll), so an
          engaged visitor is tracked promptly, or
        - the first idle slot after `load` (hard-capped), so bounces are still
          captured without competing with LCP and hydration.
    */
    <Script
      id="gtm-base"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
            var loaded=false;
            var events=['pointerdown','keydown','scroll','touchstart'];
            function inject(){
              if(loaded)return;
              loaded=true;
              events.forEach(function(ev){
                w.removeEventListener(ev,inject,{capture:true});
              });
              var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),
                  dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            }
            function afterLoad(){
              if(w.requestIdleCallback){
                w.requestIdleCallback(inject,{timeout:2000});
              }else{
                w.setTimeout(inject,1000);
              }
            }
            events.forEach(function(ev){
              w.addEventListener(ev,inject,{capture:true,passive:true,once:true});
            });
            if(d.readyState==='complete'){
              afterLoad();
            }else{
              w.addEventListener('load',afterLoad,{once:true});
            }
          })(window,document,'script','dataLayer','${gtmId}');
        `,
      }}
    />
  );
}
