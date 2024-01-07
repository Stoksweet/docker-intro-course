
# Exercise 6

In this exercise we will take a look into the concept of network isolation using docker. Why do we want this? Well, it offers better security among other benefits that allow you to build up resilient systems. For this exercise we will take a look at how you can create and work with networks using the ```BusyBox``` container image. It is a fun little image packed with everything well need to do some network testing.

https://hub.docker.com/_/busybox




## Steps

First think is first, lets ensure that the docker daemon and client is up and running.

Step 1 - Open Command Prompt on Windows or Terminal on linux and type:
```bash
  docker ps -a
```
This command will show you all the containers that you have instantiated on your machine. This command will also show you containers that have exited. If you are getting an error on windows ensure that you have opened the docker desktop app. 

Go ahead and navigate to the Lesson 6 folder/directory in your code editor, command prompt, terminal. Ensure that your run all CLI commands from here. 

Let's view our current list of images. If the image you created in the previous lesson is not their, rebuild it using the files you copied above.

Step 2 - View your list of images. 
```bash
  docker images
```

We will be using the BusyBox image, let's go ahead and pull it:

Step 3 - Pull BusyBox Image
```bash
  docker pull busybox
```

Now let's create a network to use for this exercise:

Step 4 - Create new docker network
```bash
  docker network create test-first-network
```

Step 5 - Run two BusyBox containers connected to the network: 
```bash
    docker run -d --name container1 --network test-first-network busybox sleep 1000
    docker run -d --name container2 --network test-first-network busybox sleep 1000
```

Let's have a deeper look into our network:
```bash
    docker network inspect test-first-network
```

This will return JSON data describing our network. Common info can be found here related to the network as well info about containers running on the network and their IP addresses. We will need those IP's soon.

Let's start off by jumping into container1 and pinging container2. Each container has been named during creation and we can ping them by container name.

Step 6 - Exec into container1 and ping 2: 
```bash
    docker exec -it container1 ping container2
```

These containers also have access to the internet thanks to the default driver. You can test this by pinging Google.

```bash
    docker exec -it container1 ping google.com
```

In both cases we should see packets transmitted and received successfully as seen in the ping response.

Now let's take it a step further. With our first network and two containers up, let's create an additional custom network and connect two containers to it.

Step 7 - Create a user defined bridged network called custom-network: 
```bash
    docker network create --driver=bridge custom-network
```

Step 8 - Add two BusyBox containers to the custom network:
```bash
    docker run -d --name container3 --network custom-network busybox sleep 1000
    docker run -d --name container4 --network custom-network busybox sleep 1000
```

Docker comes witha few by deafult as a part of the docker architecture. When you run a container without specifying the network it is added to the  ```bridge``` network in the list. 

Each network has drivers, a driver refers to the network interface used by containers running on the host machine. In most cases you will simply use the ```bridge``` driver to get the job done. Now let's see all the networks we have. We will use the ```docker network list``` command.

Step 9 - List docker networks: 
```bash
    docker network ls
```

You should see our two newly created networks on the list. Now let's jump into the containers in our custom network.

Step 10 - Exec into container3 and ping 4: 
```bash
    docker exec -it container3 ping container4
```

Once again we should see a successfull ping result. Both container3 and container4 are in the same network. We can confirm this by inspecting our custom network.

Step 11 - Inspect custom network: 
```bash
    docker network inspect custom-network
```

Once again we are returned JSON data specifying the network configuartion. As you can see here, container3 and container4 are present under the ```"Containers"``` key.

Under the ```IPAM``` we can see the network driver used and some important info about the network such as Subnet and Gateway. In our case the subnet range is ```172.20.0.0/16``` and Gateway is ```172.20.0.1``` which is localhost. This driver is bridged to the host pc network aka localhost.

What will happen when we try to ping container1 or container2 from container3? 1 and 2 are connected to the first network we created and 2 and 3 are connected to our custom network.

Step 12 - Ping container1 from 3: 
```bash
    docker exec -it container3 ping container1
```

You should see an error returned with the following message: ```ping: bad address 'container1'```. The same applies for container2. This an example of network isolation and in many cases it makes sense to have your containerized workloads running and managed in their own networks.

Lastly, we might want to disconnect a container from our network or remove the network entirely.

Step 13 - Disconnect container1 and container2: 
```bash
    docker network disconnect my-test-network container1
    docker network disconnect my-test-network container2
```

Step 14 - Inspect my-test-network network: 
```bash
    docker network inspect my-test-network
```

As you can see from the inspection above we have no containers connected to this network. Let's clean up our custom network too.

Step 15 - Disconnect container1 and container2: 
```bash
    docker network disconnect custom-network container3
    docker network disconnect custom-network container4
```

Step 16 - Inspect my-test-network network: 
```bash
    docker network inspect my-test-network
```

We have now confirmed all containers are disconnected. Let's finally clean up the networks shall we?

Step 17 - Delete the two networks: 
```bash
    docker network rm my-test-network
    docker network rm custom-network
```

Step 18 - List docker networks: 
```bash
    docker network ls
```

Step 19 - Lets delete those container instances all at once:
```bash
    docker rm container1 container2 container3 container4
```

And there you have it. A hands on intro to Docker networks. This is a very powerful tool for a lot more than just application development, these skills extend into networking, cybersecurity and more. 