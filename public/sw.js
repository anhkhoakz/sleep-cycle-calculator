// Service Worker for Sleep Cycle Calculator PWA
const CACHE_NAME = "sleep-calculator-v1";
const urlsToCache = [
	"/",
	"/_next/static/css/",
	"/_next/static/js/",
	"/manifest.json",
	"/vite.svg",
];

// Install event - cache resources
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			console.log("Opened cache");
			return cache.addAll(urlsToCache);
		}),
	);
});

// Fetch event - serve from cache when offline
self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			// Return cached version or fetch from network
			return response || fetch(event.request);
		}),
	);
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (cacheName !== CACHE_NAME) {
						console.log("Deleting old cache:", cacheName);
						return caches.delete(cacheName);
					}
				}),
			);
		}),
	);
});

// Background sync for notifications (if supported)
self.addEventListener("sync", (event) => {
	if (event.tag === "sleep-reminder") {
		event.waitUntil(
			// Handle background sync for sleep reminders
			console.log("Background sync for sleep reminders"),
		);
	}
});

// Push event for notifications
self.addEventListener("push", (event) => {
	if (event.data) {
		const data = event.data.json();
		const options = {
			body: data.body,
			icon: "/vite.svg",
			badge: "/vite.svg",
			vibrate: [100, 50, 100],
			data: {
				dateOfArrival: Date.now(),
				primaryKey: 1,
			},
			actions: [
				{
					action: "explore",
					title: "Open App",
					icon: "/vite.svg",
				},
				{
					action: "close",
					title: "Close",
					icon: "/vite.svg",
				},
			],
		};

		event.waitUntil(self.registration.showNotification(data.title, options));
	}
});

// Notification click event
self.addEventListener("notificationclick", (event) => {
	event.notification.close();

	if (event.action === "explore") {
		event.waitUntil(clients.openWindow("/"));
	}
});
