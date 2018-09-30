'use strict';

const swName = 'v1';

const cachesFiles = [
    '/',
    '/index.html',
    '/restaurant.html',
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

    e.waitUntil(
        caches
        .open(swName)
        .then((cache) => {
            return cache.addAll(cachesFiles);
        })
        .then(() => self.skipWaiting())
    );
});




//activate EventListener

self.addEventListener('activate', (e) => {
    //removing unwanted cache
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== swName) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});




//fetch EventListener

self.addEventListener('fetch', (e) => {
    //    console.log('fetching');
    e.respondWith(
        caches.match(e.request)
        .then((response) => {
            if (response) {
                return response;
            } else {
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
                    .catch((err) => console.error(err));
            }

        })
    );
});
