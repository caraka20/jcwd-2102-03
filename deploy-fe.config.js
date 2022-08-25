module.exports = {
  apps: [
    {
      name: 'JCWD-2102-03-FE', // Format JCWD-{batchcode}-{groupnumber}
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production',
        PORT: 3203, //format groupnumber and batch ex: 3401
      },
    },
  ],
};
