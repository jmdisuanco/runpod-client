import runpod from "./index";
require("dotenv").config();
const key = process.env.API_KEY || "";
// test("create function", async () => {
// 	const createdPod = await runpod(key)({
// 		action: "create",
// 		cloudType: "ALL",
// 		name: "RunPod Tensorflow",
// 		env: [{ key: "JUPYTER_PASSWORD", value: "rn51hunbpgtltcpac3ol" }],
// 		gpuCount: 1,
// 		volumeInGb: 40,
// 		containerDiskInGb: 40,
// 		minVcpuCount: 2,
// 		minMemoryInGb: 15,
// 		gpuTypeId: "NVIDIA RTX A6000",
// 		dockerArgs: "",
// 		ports: "8888/http",
// 		volumeMountPath: "/workspace",
// 		imageName: "runpod/tensorflow",
// 	});
// 	expect(createdPod.podFindAndDeployOnDemand.id).toBeDefined();
// });

test("list function", async () => {
	const pods = await runpod(key)({
		action: "list",
		// url: "https://api.runpod.io/graphql",
	});
	expect(pods.length).toBeGreaterThan(0);
});

test("start function", async () => {
	const pods = await runpod(key)({
		action: "list",
		// url: "https://api.runpod.io/graphql",
	});
	const podToStart = pods[0];
	const startedPod = await runpod(key)({
		action: "start",
		// url: "https://api.runpod.io/graphql",
		id: podToStart.id,
	});
	expect(startedPod.podResume.id).toBe(podToStart.id);
});

test("stop function", async () => {
	const pods = await runpod(key)({
		action: "list",
		// url: "https://api.runpod.io/graphql",
	});
	const podToStop = pods[0];
	const stoppedPod = await runpod(key)({
		action: "stop",
		// url: "https://api.runpod.io/graphql",
		id: podToStop.id,
	});
	expect(stoppedPod.podStop.id).toBe(podToStop.id);
});

test("get function", async () => {
	const pods = await runpod(key)({
		action: "list",
		url: "https://api.runpod.io/graphql",
	});
	const podToGet = pods[0];
	const gotPod = await runpod(key)({
		action: "get",
		// url: "https://api.runpod.io/graphql",
		id: podToGet.id,
	});
	expect(gotPod.pod.runtime).toBeDefined();
});
