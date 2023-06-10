# Runcloud Client Documentation

This unofficial runpod.io client provides functionality to interact with the Runpod.io API.

| Statements                                                                                 | Branches                                                                          | Functions                                                                              | Lines                                                                            |
| ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| ![Statements](https://img.shields.io/badge/statements-96.29%25-brightgreen.svg?style=flat) | ![Branches](https://img.shields.io/badge/branches-83.33%25-yellow.svg?style=flat) | ![Functions](https://img.shields.io/badge/functions-100%25-brightgreen.svg?style=flat) | ![Lines](https://img.shields.io/badge/lines-96.15%25-brightgreen.svg?style=flat) |

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

## License

MIT © JOHN MARTIN DISUANCO
