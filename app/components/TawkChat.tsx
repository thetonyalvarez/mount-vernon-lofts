'use client'

import Script from 'next/script'

declare global {
  interface Window {
    Tawk_API: Record<string, unknown>
    Tawk_LoadStart: Date
  }
}

export function TawkChat() {
  return (
    <Script
      id="tawk-chat"
      strategy="lazyOnload"
      dangerouslySetInnerHTML={{
        __html: `
          var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
          (function(){
            var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
            s1.async = true;
            s1.src = 'https://embed.tawk.to/6997607e8e6a0f1c3404e03d/1jhrl1rmn';
            s1.charset = 'UTF-8';
            s1.setAttribute('crossorigin', '*');
            s0.parentNode.insertBefore(s1, s0);
          })();
        `,
      }}
      onError={(error) => {
        console.error('[Tawk.to] Failed to load script:', error)
      }}
    />
  )
}

export default TawkChat
