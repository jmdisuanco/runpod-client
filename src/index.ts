// const create = async ({
// 	url,
// 	cloudType,
// 	name,
// 	env,
// 	gpuCount,
// 	volumeInGb,
// 	containerDiskInGb,
// 	minVcpuCount,
// 	minMemoryInGb,
// 	gpuTypeId,
// 	dockerArgs,
// 	ports,
// 	volumeMountPath,
// 	imageName,
// }: ICreatePod) => {
// 	try {
// 		const response = await fetch(url, {
// 			method: "POST",
// 			headers: { "Content-Type": "application/json" },
// 			body: JSON.stringify({
// 				query: `mutation {
//   podFindAndDeployOnDemand(
//     input: {
//       cloudType: ${cloudType}
//       gpuCount: ${gpuCount}
//       volumeInGb: ${volumeInGb}
//       containerDiskInGb: ${containerDiskInGb}
//       minVcpuCount: ${minVcpuCount}
//       minMemoryInGb: ${minMemoryInGb}
//       gpuTypeId: "${gpuTypeId}"
//       name: "${name}"
//       imageName: "${imageName}"
//       dockerArgs: "${dockerArgs}"
//       ports: "${ports}"
//       volumeMountPath: "${volumeMountPath}"
//       env: ${env}
//     }
//   ) {
//     id
//     imageName
//     env
//     machineId
//     machine {
//       podHostId
//     }
//   }
// }`,
// 			}),
// 		});
// 		const res = await response.json();
// 		return res.data;
// 	} catch (error) {
// 		console.error(error);
// 		return error;
// 	}
// };

const list = async (url: string) => {
	const response = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			query: `
                query
                    Pods {
                        myself {
                            pods {
                                id
                                name
                                runtime {
                                    uptimeInSeconds
                                    ports {
                                            ip
                                            isIpPublic
                                            privatePort
                                            publicPort
                                            type
                                        }
                                    gpus {
                                            id
                                            gpuUtilPercent
                                            memoryUtilPercent
                                        } container {
                                            cpuPercent
                                            memoryPercent
                                        }
                                }
                            }
                        }
                    }
                    `,
		}),
	});
	const res = await response.json();
	return res.data.myself.pods;
};
const getGPUTypes = async (url: string) => {
	const response = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			query: `
                query GpuTypes {
                    gpuTypes {
                        id
                        displayName
                        memoryInGb
                    }
                }
                    `,
		}),
	});
	const res = await response.json();
	return res.data.gpuTypes;
};

const start = async (url: string, id: string, count = 1) => {
	const response = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			query: `
                  mutation {
                    podResume(
                        input: {
                            podId: "${id}", 
                            gpuCount: ${count} 
                        } )
                        {
                            id
                            desiredStatus
                            imageName
                            env
                            machineId
                            machine {
                                podHostId
                            }
                        }
                    }`,
		}),
	});
	const res = await response.json();
	return res.data;
};

const stop = async (url: string, id: string) => {
	const response = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			query: `
                 mutation {
                    podStop(
                        input:
                        {podId: "${id}"
                    })
                    {
                        id
                        desiredStatus
                    }
                }`,
		}),
	});
	const res = await response.json();
	return res.data;
};

const get = async (url: string, id: string) => {
	const response = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			query: `
                 query
                    Pod {
                        pod(
                            input: {
                                podId: "${id}"
                            }
                            )
                             {
                                id
                                name
                                runtime {
                                    uptimeInSeconds
                                    ports {
                                        ip
                                        isIpPublic
                                        privatePort
                                        publicPort
                                        type
                                    }
                                    gpus {
                                        id
                                        gpuUtilPercent
                                        memoryUtilPercent
                                    } container {
                                        cpuPercent
                                        memoryPercent
                                    }
                                }
                            }
                        }`,
		}),
	});
	const res = await response.json();
	return res.data;
};
const getGPU = async (url: string, id: string, count: number) => {
	const response = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			query: `
                 query GpuTypes {
                    gpuTypes(input: {id: "NVIDIA GeForce RTX 3090"}) {
                        id
                        displayName
                        memoryInGb
                        secureCloud
                        communityCloud
                        lowestPrice(input: {gpuCount: ${count || 1}}) {
                        minimumBidPrice
                        uninterruptablePrice
                        }
                    }
                }
            `,
		}),
	});
	const res = await response.json();
	if (res.errors) {
		console.log(res.errors[0].message);
	} else {
		return res.data.gpuTypes;
	}
};

const runpod = (key: string) => (args: any) => {
	const { action, id, count } = args;
	const url = "https://api.runpod.io/graphql?api_key=" + key;
	switch (action) {
		case "list":
			return list(url);

		case "start":
			return start(url, id, count);

		case "stop":
			return stop(url, id);

		case "get":
			return get(url, id);

		case "getGPU":
			return getGPU(url, id, count);

		case "getGPUTypes":
			return getGPUTypes(url);
		// case "create":
		// 	return create({ url, ...args });
		// 	break;
		default:
			break;
	}
};
export default runpod;
