interface ICreatePod {
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

enum ACTIONS {
	create = "create",
	list = "list",
	start = "start",
	stop = "stop",
	get = "get",
}
