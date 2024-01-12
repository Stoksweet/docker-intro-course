
# Exercise 7

In this exercise we will take a look at docker-compose. Working with containerized applications can be tedius especially if you are using the cli for deploying a multi-service backend application meaning that you have multiple containers to deploy. This is where docker-compose comes in. We can use it to describe our services in YAML form and then have docker 'compose' it for us - meaning that it will do the work to ensure that what you have described is deployed.

https://docs.docker.com/compose/




## Steps

First think is first, lets ensure that the docker daemon and client is up and running.

Step 1 - Open Command Prompt on Windows or Terminal on linux and type:
```bash
  docker ps -a
```
This command will show you all the containers that you have instantiated on your machine. This command will also show you containers that have exited. If you are getting an error on windows ensure that you have opened the docker desktop app. 

Go ahead and navigate to the Lesson 7 folder/directory in your code editor, command prompt, terminal. Ensure that your run all CLI commands from here. By default, your machine should have docker-compose if you have installed docker, no need to worry about installing anything.

Let's take a look at the folder. For this exercise we have two main services that we will deploy a ```/backend``` and a ```/frontend``` nodejs service as seen by the folder. In addition to that we also have the ```docker-compose.yaml``` file. We will use that compose file to explain to docker what we want to have deployed.

Step 2 - Open the ```docker-compose.yaml``` file (Linux): 
```bash
  nano docker-compose.yaml
```

Or on windows, from the command prompt you can open the lesson folder in VS Code using the following. Be sure to click on the ```docker-compose.yaml``` file thereafter.

Open the folder (Winodws): 
```bash
  code .
```

Now, let's go through this file step by step. Starting with the version, it comes at the top of the file and specifies the compose version to use.

```yaml
  version: "1"
```

Then we have our services. Note that with services, we add the service key and then indent the list of services beneath it. In this case we have a frontend and a backend service.

Each service also has properties that can be added to it, these properties are basically the parameters you use when instantiating a container. So for example instead of using ```-p 3000:000``` with the CLI you would pass a list of ```ports:``` under the service.


```yaml
  services: 
  frontend:
    build: ./frontend
    ports: 
      - "3000:3000"
  backend:
    build: ./backend
    ports:
      - "3100:3100"
```

The ```build:``` parameter specifies the folder were the Dockerfile is located to be used in the build of that service. In this case, both the ```/frontend``` and the ```/backend``` folders have Dockerfiles describing the images to be built. As you can see we are passing the directory as a parameter to the build here. 

Its important to keep in mind that your terminal/cmd has to be in the same directory as the ```docker-compose.yaml``` file. We will use the ```docker-compose up``` command to deploy our services and ```docker-compose down``` to undeploy it.

Before we get to deployment, let's take a look at the code inside our two folders. We'll start with the ```/backend``` folder. The app here is a simple ExpressJS NodeJS API that will send a GET request to the Chuck Norris Jokes API. Have a look at the ```/app/index.js``` file. This node app will be served on port 3100.

It will return the following JSON data when requested:
```json
    {
        "joke": "When there's something bad in your neighborhood... Who you gonna call? CHUCK NORRIS!"
    }
```

Aside from our app, we have our other dependancies mainly ```/node_modules```, ```package.json``` and ```package-lock.json```. This is the basic structure of a containerized NodeJS application.

Now, let's jump to the ```/frontend``` folder. Here we have a similar structure as above, the only difference here is that we are also using our server to serve the ```/public``` folder which houses our ```styles.css``` file. Thi application just returns HTML code containing the joke that we got from our REST API running on 3100.

The server serves the ```/public``` using the folling code:
```js
    app.use(express.static('public'));
```

With all of that in order, let's docker-compose for a spin shall we? 

First navigate back to the root lesson folder. Then run the following:

Step 3 - Run docker-compose from current directory: 
```bash
  docker-compose up -d
```

The command above will look for the ```docker-compose.yaml``` file in our current directory and build and run the deployment. Once completed you can visit ```localhost:3000``` in your browser and you should see our app. The ```-d``` will run this in the background once build has completed.

Once completed, let's see what conatiners are running.

Step 4 - Run docker-compose from current directory: 
```bash
  docker ps -a
```

Here you should see a ```lesson-7-docker-compose-backend``` and a ```lesson-7-docker-compose-frontend``` containers instantiated. 

Docker-compose has also created a network specially for our composition. Lets take a look.

Step 5 - View networks: 
```bash
  docker network list
```

Here we should see a ```lesson-7-docker-compose_default``` network listed that uses the ```bridge``` adapter. That a neat touch.

If you want stop your compose, run ```docker-compose down```. This will stop the conatiners and delete any created resources like the network, aside from the image. The image will still be in cache.

Step 6 - Shutdown docker-compose from current directory: 
```bash
  docker-compose down
```

There is so much more that you can do with docker-compose such as specifying networks, volumes and basically anything you could do with the CLI but for your projects you will most likely use it as we have. I would encourage you to study the documentation and sample applications created with docker compose. 

Here are some links below:

https://github.com/docker/awesome-compose/tree/master

That's it for our lesson on compose. Let's now finish off by working with image registries, they are basically repo's for your docker image that you can host on the Cloud. In our case we will use DockerHub.
