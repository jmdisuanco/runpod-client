export interface ICreatePod {
	url: URL;
	cloudType: string;
	name: string;
	env?: {}[];
	gpuCount: number;
	volumeInGb: number;
	containerDiskInGb: number;
	minVcpuCount: number;
	minMemoryInGb: number;
	gpuTypeId: string;
	dockerArgs: string;
	ports: string;
	volumeMountPath: string;
	imageName: string;
}

export enum ACTIONS {
	create = "create",
	list = "list",
	start = "start",
	stop = "stop",
	get = "get",
	getGPUTypes = "getGPUTypes",
	getGPU = "getGPU",
}

export enum RUNTYPES {
	run = "run",
	runSync = "runSync",
}
export enum SD_SCHEDULERS {
	KLMS = "KLMS",
}
export interface IimageInference {
	prompt: string;
	width: number;
	height: number;
	guidance_scale: number;
	num_inference_steps: number;
	num_outputs: number;
	prompt_strength: number;
	scheduler: "KLMS";
	negative_prompt: "string";
	init_image: "string";
	mask: "string";
	seed: "integer";
}
