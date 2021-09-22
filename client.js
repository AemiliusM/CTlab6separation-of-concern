import net from 'net';

const client = net.connect(5050, 'localhost', () => {
  client.write('Hello');
});
