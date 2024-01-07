
# Exercise 5

In this exercise we will take a look into the concept of persistant storage using Docker Volumes. As you already know, our containers can be exited and restarted which in most cases will result in the restoration of the desired container state. This is very reliable but what happends when we want to persist state for a database container, application state, cache or have multiple containers work with directories on the host system? This is where volumes come in.




## Steps

First think is first, lets ensure that the docker daemon and client is up and running.

Step 1 - Open Command Prompt on Windows or Terminal on linux and type:
```bash
  docker ps -a
```
This command will show you all the containers that you have instantiated on your machine. This command will also show you containers that have exited. If you are getting an error on windows ensure that you have opened the docker desktop app. 

Go ahead and navigate to the Lesson 5 folder/directory in your code editor, command prompt, terminal. Ensure that your run all CLI commands from here. 

Please take note of the following file structure: ```/images``` contains some example images we will be using to work with Docker volumes, the ```/my-volume-path``` is the directory we will use as a volume.

Let's view our current list of images. If the image you created in the previous lesson is not their, rebuild it using the files you copied above.

Step 2 - View your list of images. 
```bash
  docker images
```

We will be using the ```file-watcher``` image in the ```/images``` folder. Navigate into the folder.

Step 3 - Change directory into /file-watcher.
```bash
  cd images/file-watcher
```

The application in the ```/app``` folder is a simple node app that watches the current working directory. It will list all the files in the directory and keep watching for file events. Whenever an event takes place it will console log the event and path. 

Let's build the image and start using it.

Step 4 - Build the file watcher image.
```bash
  docker build -t file-watcher .
```

You should now see the ```file-watcher``` image in the list of images.

Step 5 - View your list of images. 
```bash
  docker images
```

Let's run a container using the image and mount it to the ```/my-volume-path``` directory in the lesson. 

Step 6 - Navigate to volume path.
```bash
  cd ..
  cd ..
  cd my-volume-path
```

Step 7 - Run the file watcher container and bind the path. Here we will mount the ```/my-volume-mount``` folder on the host to the ```/usr/src/app/watch-folder``` directory in the conatiner:
```bash
  docker run -v <full_path_on_host>:/usr/src/app/watch-folder file-watcher
```

Note that you have to use abosule full paths for host and container paths passed after the ```-v``` flag. This flag will mount the volume to the container the when it is run. In my case the full command is as follows:
```bash
  docker run -v /home/stig/Documents/docker-intro-course/lesson-5-volumes/my-volume-path:/usr/src/app/watch-folder file-watcher
```

The app inside the container has been setup to watch and log all the changes made to the ```/watch-folder``` on the container. We have now essentially merged the ```/watch-folder``` in the container to the ```/my-volume-path``` in this lessons folder.

Step 8 - Let's create a file from within the host machine named ```file-from-host.txt``` and add it to the directory on host. We are still in the /my-volume-path folder: 

(Linux)
```bash
  touch file-from-host.txt
```
(Windows)
```bash
  echo file-from-host.txt
```

Now let's find the running container so we can take a look into the container logs to see the event.

Step 8 - Get container ID:
```bash
  docker ps
```

Step 9 - Get conatiner logs:
```bash
  docker logs <container_ID or conainer_name>
```

You should see a log entry with ```New File Event:  add Path:  watch-folder/file-from-host.txt``` in the list.

Now let's create a file from within the conatiner. This will demonstrate that a file created inside the container can be seen and is persisted on the host.

Step 10 - Exec into the container:
```bash
  docker exec -it <container_ID or conainer_name> sh
```

Step 11 - Inside the conatiner create file ```file-from-container.txt```:
```bash
  cd /watch-folder
  touch file-from-container.txt
  exit
```

Step 12 - Get conatiner logs again:
```bash
  docker logs <container_ID or conainer_name>
```

You should see a ```New File Event:  add Path:  watch-folder/test-file-from-container.txt``` event logged from the container.

What if you just want to copy a folder over to a running container? Well, its possible using the ```docker cp``` command. Let's create and copy a file over from the host to container.

Step 13 - Inside the host in the ```/my-volume-path``` folder create file called ```send-to-container.txt```:
(Linux)
```bash
  touch send-to-container.txt
```
(Windows)
```bash
  echo send-to-container.txt
```

Step 14 - Copy the file to the container:
```bash
  docker cp sent-to-container.txt <container_ID or container_name>:<container_path>
```

In my case the full command is as follows:
```bash
    docker cp sent-to-container.txt 4ee:/usr/src/app/watch-folder
```

You should see a ```Successfully copied 1.54kB to 4ee:/usr/src/app/watch-folder``` message returned in the console.

Lastly, we can also debug or inspect the container volume using the ```docker inspect``` command. 

Step 15 - Inspect the container mounts:
```bash
  docker inspect <container_ID or conainer_name>
```

This will return a lot of info about the container in object form. We are looking for the ```"Mounts"``` key which is an array of volume mount objects associated with the container. Here you can confirm the ```Source``` and ```Desitination``` paths for each volume mounted.

```json
{
    "Type": "bind",
    "Source": "/home/stig/Documents/docker-intro-course/lesson-5-volumes/my-volume-path",
    "Destination": "/usr/src/app/watch-folder",
    "Mode": "",
    "RW": true,
    "Propagation": "rprivate"
}
```

You can also use the following command to return just the Mounts from the inspect command:
```bash
    docker inspect --format='{{.Mounts}}' <container_id or container_name>
```

The purpose of this exercise is really just to familiarise you with the common docker volume commands. In a real world scenario you will need to use a combination of these tools for your use case. We will explore the concept of volumes a little more when we get to the Docker Compose section of the course. 