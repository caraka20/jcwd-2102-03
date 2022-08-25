module.exports = {
  apps: [
    {
      name: 'JCWD-2102-03-BE', // Format JCWD-{batchcode}-{groupnumber}
      script: './packages/server/src/index.js',
      env: {
        NODE_ENV: 'production',
        PORT: 8203, //format groupnumber and batch ex: 8401
      },
      time: true,
    },
  ],
};
