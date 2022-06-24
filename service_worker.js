self.addEventListener('install', function(event){
    console.log('SW installed');

    caches.open('static')
    .then(function(cache){
        cache.addAll([
            '/',
            '/assets/js/script.js',
            '/assets/css/main.css'
        ]);
    })
});

self.addEventListener('activate', function(event){
    console.log('SW activated');
});

self.addEventListener('fetch', function(event){
    event.respondWith(
        caches.match(event.request)
            .then(function(res) {
                if(res){
                    return res;
                }else{
                    return fetch(event.request);
                }
            })
        )
    });