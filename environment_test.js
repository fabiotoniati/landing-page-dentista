const net = require('net');
const http = require('http');
const https = require('https');

const portsToTest = [8080, 3306, 5432, 27017, 6379, 8000, 9000];

async function testPort(port) {
    return new Promise((resolve) => {
        const server = net.createServer();
        server.on('error', (err) => {
            resolve({ port, status: 'ERROR', message: err.code });
        });
        server.listen(port, '127.0.0.1', () => {
            const address = server.address();
            server.close(() => {
                resolve({ port, status: 'SUCCESS', message: 'Accessible' });
            });
        });
    });
}

function checkInternet() {
    return new Promise((resolve) => {
        https.get('https://www.google.com', (res) => {
            resolve({ service: 'Google', status: res.statusCode === 200 ? 'SUCCESS' : 'FAILED' });
        }).on('error', (e) => {
            resolve({ service: 'Google', status: 'FAILED', message: e.message });
        });
    });
}

async function runTests() {
    console.log('--- Port Connectivity Tests (Listening) ---');
    const portResults = await Promise.all(portsToTest.map(testPort));
    console.table(portResults);

    console.log('\n--- Network Connectivity Tests (Outgoing) ---');
    const internetResults = await Promise.all([checkInternet()]);
    console.table(internetResults);

    console.log('\n--- Environment Info ---');
    console.log(`OS: ${process.platform} ${process.arch}`);
    console.log(`Node Version: ${process.version}`);
    console.log(`Working Directory: ${process.cwd()}`);
}

runTests();
