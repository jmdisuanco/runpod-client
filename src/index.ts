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
// 	const query = `
//                 mutation {
//                     podFindAndDeployOnDemand(
//                         input: {
//                         cloudType: ${cloudType || "ALL"}
//                         gpuCount: ${gpuCount || 1}
//                         volumeInGb: ${volumeInGb || 40}
//                         containerDiskInGb: ${containerDiskInGb || 40}
//                         minVcpuCount: ${minVcpuCount || 1}
//                         minMemoryInGb: ${minMemoryInGb || 15}
//                         gpuTypeId: "${gpuTypeId}"
//                         name: "${name}"
//                         imageName: "${imageName}"
//                         dockerArgs: "${dockerArgs || ""}"
//                         ports: "${ports || "8888/http"}"
//                         volumeMountPath: "${volumeMountPath || "/workspace"}"
//                         env: ${JSON.stringify(env)}
//                     ) {
//                         id
//                         imageName
//                         env
//                         machineId
//                         machine {
//                         podHostId
//                         }
//                     }
//                     }
//                 `;
// 	try {
// 		const response = await fetch(url, {
// 			method: "POST",
// 			headers: { "Content-Type": "application/json" },
// 			body: JSON.stringify({
// 				query: query,
// 			}),
// 		});
// 		const res = await response.json();
// 		if (res.errors) {
// 			console.log(res.errors[0].message);
// 			return res;
// 		} else {
// 			return res.data;
// 		}
// 	} catch (error) {
// 		console.error(error);
// 		return error;
// 	}
// };

import { ACTIONS } from "./types";

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
const getGPU = async (url: string, id: string, count?: number) => {
	const response = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			query: `
                 query GpuTypes {
                    gpuTypes(input: {id: "${id}"}) {
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

const runpod =
	(key: string) =>
	({ action, id, count }: { action: ACTIONS; id?: string; count?: number }) => {
		const url = "https://api.runpod.io/graphql?api_key=" + key;
		switch (action) {
			case ACTIONS.list:
				return list(url);

			case ACTIONS.start:
				return id ? start(url, id, count) : "Please provide a pod id";

			case ACTIONS.stop:
				return id ? stop(url, id) : "Please provide a pod id";

			case ACTIONS.get:
				return id ? get(url, id) : "Please provide a pod id";

			case ACTIONS.getGPU:
				return id ? getGPU(url, id, count) : "Please provide a gpu id";

			case ACTIONS.getGPUTypes:
				return getGPUTypes(url);
			// case "create":
			// 	return create({ url, ...args });

			default:
				break;
		}
	};
export default runpod;
