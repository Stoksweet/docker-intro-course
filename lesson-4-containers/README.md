
# Exercise 4

In this exercise we will go through the key ```Docker``` conatiner lifecycle and associated commands. We already know how to create conatiner images and run them. But its worth noting that there's a lot more that we can do with Docker when it comes to managing your conatiner workloads. We will take a look at how to monitor, manage, connect to, debug and inspect containers using the lovely Docker CLI.




## Steps

First think is first, lets ensure that the docker daemon and client is up and running.

Step 1 - Open Command Prompt on Windows or Terminal on linux and type:
```bash
  docker ps -a
```
This command will show you all the containers that you have instantiated on your machine. This command will also show you containers that have exited. If you are getting an error on windows ensure that you have opened the docker desktop app. 

Go ahead and navigate to the Lesson 4 folder/directory in your code editor, command prompt, terminal. Ensure that your run all CLI commands from here. Please copy over your image ```Dockerfile``` and ```/app``` directory from the previous lesson in to this one. 

Let's view our current list of images. If the image you created in the previous lesson is not their, rebuild it using the files you copied above.

Step 2 - View your list of images. 
```bash
  docker images
```

Find the name of the image you created previously.

Step 3 - Run your container.
```bash
  docker run -p 3000:3000 <your-image-name>
```

View the containers that are running only. You should see your container with a status of ```UP```.

Step 4 - View running containers only.
```bash
  docker ps
```

To view all the conatiners even those that are closed:

Step 5 - View all containers.
```bash
  docker ps -a
```

Step 6 - Stop a container.
```bash
  docker stop <conatinerID or name>
```

To start a container that has been stopped:

Step 7 - Start a container.
```bash
  docker start <conatinerID or name>
```

Imagine that you went into a container and made a change that you want to debug or test but without rebuilding an image. In this case you can go into the container, made the change and then exit it and restart the container. You can also just restart a container for any operational reasons.

Step 8 - Restart a container.
```bash
  docker restart <conatinerID or name>
```

Need to pause a container for any reason and save the current state? You can.

Step 9 - Pause a container.
```bash
  docker pause <conatinerID or name>
```

Step 10 - Unpause a container.
```bash
  docker unpause <conatinerID or name>
```

Or maybe you just want to delete a container altogether?

Step 11 - Delete a container.
```bash
  docker rm <conatinerID or name>
```

One of the coolest things about containers is that you can connect to them and tinker around and see whats going on from inside as though you were on the inside of a regular computer. To do this we use the ```docker exec``` command.

Step 12 - Exec a container.
```bash
  docker exec -it <conatinerID or name> <execute comand>

  eg:
  docker exec -it myFirstContainer npm install
```
 
 or

Step 12 - Exec a container as a interactive shell.
```bash
  docker exec -it <conatinerID or name> <shell type>

  eg:
  docker exec -it myFirstContainer sh
```

The command above is basically like doing a ssh into a VM accept its not ssh, you are just connecting to the shell(terminal/command prompt) on the container. After running that command you will be able to run commands from the terminal inside the container.

But maybe you don't want to teleport into the container, maybe you just want to keep an eye on the logs to quickly debug something. For this we will use the ```docker logs``` command which will spit out the recent logs from the container. In our case you should see the log that the nodejs server is running. ```Server is running at http://localhost:3000```

Step 13 - Get container logs.
```bash
  docker logs <conatinerID or name> 
```

Step 14 - Watch container logs as they come in. (Follow)
```bash
  docker logs <conatinerID or name> -f 
```

So that should arm you with the tools to look through, tinker, fix, update, run, rerun conatiners for any project needs. These are tasks you might run from time to time. The last command I have saved for last because it is one worth spending time looking at.

This command is the ```docker inspect``` command and it will allow you to inspect the container metadata. This is very useful and the inpect command in general in the infrastructure management space is crucial for understanding the metadata for any resource.

Step 15 - Docker inspect container.
```bash
  docker inspect <conatinerID or name> 
```

The inpect command will also become more useful as we navigate the course. If you can learn to understand the model or schema of a container resource it will bring you closer to what a conatiner is and also what it isn't. These subtle details will become more important as you work with conatiners. But don't worry, it's really not too bad.