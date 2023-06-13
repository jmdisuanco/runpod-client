import runpod from "./index";
import { ACTIONS } from "./types";
require("dotenv").config();
const key = process.env.API_KEY || "";

// test("create function", async () => {
// 	//getGPUTypes
// 	const gpus = await runpod(key)({
// 		action: "getGPUTypes",
// 	});
// 	const GPUtoGet = gpus[0];
// 	const createdPod = await runpod(key)({
// 		action: "create",
// 		cloudType: "ALL",
// 		name: "RunPod Pytorch 2-test",
// 		env: [{ key: "JUPYTER_PASSWORD", value: "rn51hunbpgtltcpac3ol" }],
// 		gpuCount: 1,
// 		volumeInGb: 20,
// 		containerDiskInGb: 20,
// 		minVcpuCount: 2,
// 		minMemoryInGb: GPUtoGet.memoryInGb,
// 		gpuTypeId: GPUtoGet.id,
// 		dockerArgs: "",
// 		ports: "8888/http",
// 		volumeMountPath: "/workspace",
// 		imageName: "runpod/pytorch:3.10-2.0.0-117",
// 	});
// 	expect(createdPod.podFindAndDeployOnDemand.id).toBeDefined();
// });

test("list function", async () => {
	const pods = await runpod(key)({
		action: ACTIONS.list,
	});
	expect(pods.length).toBeGreaterThan(0);
});

test("getGPUTypes function", async () => {
	const gpus = await runpod(key)({
		action: ACTIONS.getGPUTypes,
	});
	expect(gpus.length).toBeGreaterThan(0);
});

test("start function", async () => {
	const pods = await runpod(key)({
		action: ACTIONS.list,
	});
	const podToStart = pods[0];
	const startedPod = await runpod(key)({
		action: ACTIONS.start,
		id: podToStart.id,
	});
	expect(startedPod.podResume.id).toBe(podToStart.id);
});

test("stop function", async () => {
	const pods = await runpod(key)({
		action: ACTIONS.list,
	});
	const podToStop = pods[0];
	const stoppedPod = await runpod(key)({
		action: ACTIONS.stop,
		id: podToStop.id,
	});
	expect(stoppedPod.podStop.id).toBe(podToStop.id);
});

test("get function", async () => {
	const pods = await runpod(key)({
		action: ACTIONS.list,
	});
	const podToGet = pods[0];
	const gotPod = await runpod(key)({
		action: ACTIONS.get,
		id: podToGet.id,
	});
	expect(gotPod.pod.runtime).toBeDefined();
});

test("getGPU function", async () => {
	const gpus = await runpod(key)({
		action: ACTIONS.getGPUTypes,
	});
	const GPUtoGet = gpus[0];
	const gotGPU = await runpod(key)({
		action: ACTIONS.getGPU,
		id: GPUtoGet,
		count: 1,
	});
	expect(gotGPU.length).toBeGreaterThanOrEqual(0);
});
