# Runcloud Client Documentation

![test](https://img.shields.io/appveyor/tests/jmdisuanco/runpod-client)

This API provides functionality to interact with the Runpod.io API.

## Installation

```bash
npm install runpod-client
```

## Import runcloud-client

```javascript
import runpod from "runpod-client";
```

## Initialize:

```javascript
const rp = runpod(API_KEY); //make ure to add your api key here
```

## List all pods

```javascript
const pods = await rp("list");
for (const pod of pods) {
	console.log(pod);
}
```

## Get a specific pod

```javascript
const pod = await rp("get", POD_ID); //Replace POD_ID your existing pod id
console.log(pod);
```

## Start a pod

```javascript
const pod = await rp("start", POD_ID); //Replace POD_ID your existing pod id
console.log(pod);
```

## Stop a pod

```javascript
const pod = await rp("stop", POD_ID); //Replace POD_ID your existing pod id
console.log(pod);
```
