var cacheName='Ricette28k_v20240304.1';
var filesToCache=[
 './',
 'apple-touch-icon.png',
 'index.htm',
 'index.html',
 'sw.js',
 'css/bootstrap.min.css',
 'fonts/glyphicons-halflings-regular.eot',
 'fonts/glyphicons-halflings-regular.svg',
 'fonts/glyphicons-halflings-regular.ttf',
 'fonts/glyphicons-halflings-regular.woff',
 'fonts/glyphicons-halflings-regular.woff2',
 'js/bootstrap.min.js',
 'js/jquery-1.12.4.min.js'
];

self.addEventListener('install',e=>{
 console.log('PWA installazione Service Worker.');
 e.waitUntil(
  caches.open(cacheName).then(cache=>{
   return cache.addAll(filesToCache).then(()=>self.skipWaiting());
  })
 )
});

self.addEventListener('activate',event=>{
 console.log('PWA attivazione Service Worker.');
 event.waitUntil(self.clients.claim());

 var cacheVersion=[cacheName];
 event.waitUntil(
  caches.keys().then(keyList=>{
   return Promise.all(keyList.map(key=>{
    if (cacheVersion.indexOf(key)===-1){
     return caches.delete(key);
    }
   }));
  })
 );
});

self.addEventListener('fetch',event=>{
 event.respondWith(
  caches.match(event.request).then(response=>{
   return response||fetch(event.request);
  })
 );
});
