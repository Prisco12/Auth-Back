const os = require('os');
const cluster = require('cluster');

const runPrimaryProcess = () => {
  const processCount = 13;
  console.log(`Primary ${process.pid} is running`);
  console.log(`Forking Server with ${processCount} processes \n`);
  for (let i = 0; i < processCount; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} died with code: ${code}, and signal: ${signal}`,
    );
    console.log('Starting a new worker');
    cluster.fork();
  });
};

const runWorkerProcess = async () => {
  await import('./main');
};

cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess();