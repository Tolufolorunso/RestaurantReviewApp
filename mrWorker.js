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
    '/data/restaurant.json',
    '/1.jpg',
    '/2.jpg',
    '/3.jpg',
    '/4.jpg',
    '/5.jpg',
    '/6.jpg',
    '/7.jpg',
    '/8.jpg',
    '/9.jpg',
    '/10.jpg'
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
});




//fetch EventListener

//self.addEventListener('fetch', (e) => {
//    console.log('fetch');
//});
