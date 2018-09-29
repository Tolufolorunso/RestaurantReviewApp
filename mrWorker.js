'use strict';

const swName = 'v1';

const cachesFiles = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/404.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
];

//install EventListener

self.addEventListener('install', (e) => {
    console.log('installed');

    e.waitUntil(
        caches
        .open(swName)
        .then((cache) => {
            console.log('working');
            return cache.addAll(cachesFiles);
        })
        .then(() => self.skipWaiting())
    );
});




//activate EventListener

self.addEventListener('activate', (e) => {
    console.log('activate');
    //removing unwanted cache
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== swName) {
                        console.log('good');
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});




//fetch EventListener

self.addEventListener('fetch', (e) => {
    console.log('fetching');
    e.respondWith(
        caches.match(e.request)
        .then((response) => {
            if (response) {
                console.log(e.request);
                return response;
            } else {
                console.log(e.request);
                return fetch(e.request)
                    .then((response) => {
                        //clone the response
                        let clonedRes = response.clone();
                        //open cache
                        caches.open(swName)
                            .then((cache) => {
                                cache.put(e.request, clonedRes);
                            })
                        return response;
                    })
                    .catch((err) => caches.match('404.html'));
            }

        })
    );
});
