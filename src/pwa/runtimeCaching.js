/**
 * 缓存列表
 */
module.exports = [
  {
    urlPattern: /.*\.js/,
    handler: 'networkFirst',
    options: {
      // Use a custom cache name for this route.
      cacheName: 'my-js-cache',
      expiration: {
        maxEntries: 5,
        maxAgeSeconds: 60,
      },
      backgroundSync: {
        name: 'my-jsqueue-name',
        options: {
          maxRetentionTime: 60 * 60,
        },
      },
      broadcastUpdate: {
        channelName: 'my-jsupdate-channel',
      },
      plugins: [],
      matchOptions: {
        ignoreSearch: true,
      },
      cacheableResponse: {
        statuses: [200],
      },
    },
  },
];
