## ECDSA Node

This project is an example of using a client and server to facilitate transfers between different addresses. Since there is just a single server on the back-end handling transfers, this is clearly very centralized. We won't worry about distributed consensus for this project.

However, something that we would like to incoporate is Public Key Cryptography. By using Elliptic Curve Digital Signatures we can make it so the server only allows transfers that have been signed for by the person who owns the associated address.

### Video instructions
For an overview of this project as well as getting started instructions, check out the following video:

https://www.loom.com/share/0d3c74890b8e44a5918c4cacb3f646c4
 
### Client

The client folder contains a [react app](https://reactjs.org/) using [vite](https://vitejs.dev/). To get started, follow these steps:

1. Open up a terminal in the `/client` folder
2. Run `npm install` to install all the depedencies
3. Run `npm run dev` to start the application 
4. Now you should be able to visit the app at http://127.0.0.1:5173/

### Server

The server folder contains a node.js server using [express](https://expressjs.com/). To run the server, follow these steps:

1. Open a terminal within the `/server` folder 
2. Run `npm install` to install all the depedencies 
3. Run `node index` to start the server 

The application should connect to the default server port (3042) automatically! 

_Hint_ - Use [nodemon](https://www.npmjs.com/package/nodemon) instead of `node` to automatically restart the server on any changes.

### Private keys for initial accounts
```
const KEY_PAIRS = [
  {
    privateKey: '5069cdb566971152edd52bed26474d8538a40cedd7bcc6b9a8dfd2daf2dd0242',
    publicKey: '0271f71f626aa96b75aca9ed9ae44dc8eba6409d54a8e16b4cd08a15066b419d1b',
  },
  {
    privateKey: '6df533a6213301189841b08244f3d76aca1e25acf674910459fb042240fcfa7a',
    publicKey: '037de7befad2e7939b2995b2ded3e32ab0c0feb1c6e45302f8302a377ac22e0d06',
  },
  {
    privateKey: '15bb614cc5b2fa53295fd9d4d9f1396c1b855d47cea6f13471f974899b8926c8',
    publicKey: '028bf14b14bffbc1376380687bee2fa439e387a6cdf3dba81229bc4f4557e406f0',
  },
]
```
