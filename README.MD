# API Documentation

This API provides functionality to interact with the Runpod.io API. It exports a function called runpod that takes an API key as a parameter. This function returns another function that accepts an object with an action field and other fields depending on the value of the action.

## Initialize:

```javascript
runpod Javascript const runpod = (key: string) => (args: any) => {...}

```

- key: API key for the Runpod.io API. args: an object with an action field and other fields depending on the value of the action. Return a call to one of the following functions based on the value of args.action: list, start, stop, get, or create.

## List

```javascript
const list = async (url:string) => {...}
```

- url: URL for the Runpod.io API. Return a list of all pods associated with the API key.

## Start

```javascript
const start = async (url: string, id: string, count = 1) => {...}
```

- url: URL for the Runpod.io API. id: ID of the pod to be started. count: GPU count of the pod to be started (default value is 1). Resume a paused pod with the specified ID and GPU count, and return information about the pod.

## Stop

```javascript
const stop = async (url: string, id: string) => {...}
```

- url: URL for the Runpod.io API. id: ID of the pod to be stopped. Stop a running pod with the specified ID, and return information about the pod.

## Get

```javascript
const get = async (url: string, id: string) => {...}
```

- url: URL for the Runpod.io API. id: ID of the pod to get information about. Return information about the pod with the specified ID.

## ~Create~ (WIP)

```javascript
const create = async ({ url, cloudType, name, env, gpu, volumeInGb, containerDiskInGb, minVcpuCount, minMemoryInGb, gpuTypeId, dockerArgs, ports, volumeMountPath, imageName, }: ICreatePod) => {...}
```

- ICreatePod: an interface containing fields required to create a pod. Create and deploy a pod based on the input parameters passed in the interface ICreatePod, and return information about the created pod.

Note: All HTTP requests made by the above functions use the fetch API to send data in JSON format and include a "Content-Type" header of "application/json". The response data from each function is parsed as JSON format.
