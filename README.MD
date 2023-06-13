# Runpod Client Documentation

This unofficial runpod.io client provides functionality to interact with the Runpod.io API.

| Statements                                                                                 | Branches                                                                    | Functions                                                                              | Lines                                                                            |
| ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| ![Statements](https://img.shields.io/badge/statements-96.15%25-brightgreen.svg?style=flat) | ![Branches](https://img.shields.io/badge/branches-73.07%25-red.svg?style=flat) | ![Functions](https://img.shields.io/badge/functions-100%25-brightgreen.svg?style=flat) | ![Lines](https://img.shields.io/badge/lines-96.15%25-brightgreen.svg?style=flat) |

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
const pods = await rp({ action: "list" });
for (const pod of pods) {
	console.log(pod);
}
```

## Get a specific pod

```javascript
const pod = await rp({ action: "get", id: POD_ID }); //Replace POD_ID your existing pod id
console.log(pod);
```

## Start a pod

```javascript
const pod = await rp({ action: "start", id: POD_ID }); //Replace POD_ID your existing pod id
console.log(pod);
```

## Stop a pod

```javascript
const pod = await rp({ action: "stop", id: POD_ID }); //Replace POD_ID your existing pod id
console.log(pod);
```

## List GPU types available

```javascript
const gpuTypes = await rp({ action: "getGPUTypes" });
for (const gpuType of gpuTypes) {
	console.log(gpuType);
}
```

## List GPU type by ID

```javascript
const gpuTypes = await rp({
	action: "getGPU",
	id: "NVIDIA GeForce RTX 3090",
	count: 1,
});
for (const gpuType of gpuTypes) {
	console.log(gpuType);
}
```
