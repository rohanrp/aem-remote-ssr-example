
# AEM SSR loosely coupled framework

This project shows how to connect an AEM application loosely to an SSR application like Next JS 14 with app router. This version will continue to work with all future versions of next JS because it is loosely coupled i.e. not tied to specific nextjs internal features like the current official remote spa plugin. It is a more robust version of the original aem remotepagenext (remote spa) plugin by extracting out the html of a NextJS application and manually inserting it into the head and body of the current AEM editor page. See the second commit to see the diff between the raw aem and next js applications versus the updated code.

To read more about the different approaches visit https://www.linkedin.com/pulse/approaches-integrating-adobe-experience-manager-aem-front-pereira-rbmlc/

![Alt text](demo.png?raw=true)


## Deployment

1. Set up your local AEM SDK anywhere on your machine and get AEM running under the default http://localhost:4502

```bash
  java -jar java -jar aem-sdk-quickstart-2024.8.17465.20240813T175259Z-240700.jar 
```


2. Set up the local next JS application on default port 3000

```bash
  cd nextjs-14
  npm install
  npm run dev
```


3. Set up the AEM application using a modified version of the remote spa plugin

```bash
  mvn clean install -PautoInstallSinglePackage
```


4. Login into AEM and edit the root 'web' page under en folder


```bash
  http://localhost:4502/editor.html/content/wknd-app/us/en/web.html
```


5. Click on page properties and the spa tab. Set the remote host as your nextjs front end host

```bash
  http://localhost:3000
```


6. Drop a text component onto the page. If it doesnt work first time, just reload the page. Edit the text component with some random text and publish.




## How it works

1. When you edit an AEM page on author, the remotepagenext plugin first calls an API on the next JS front end called 'getAEMPage' with the model path of the page to view.
2. 'getAEMPage' fetches its own front end site to get the HTML of the page.
3. 'getAEMPage' then returns the html of the fetched page back to AEM
4. the remotepagenext plugin takes the head section of the returned HTML and adds it to its own HTML. It does the same with the body HTML.
5. The AEM editor now behaves exactly how a remote spa should behave by pirating the html of the actual spa.