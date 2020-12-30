export const GET_EXPERIMENTS = "GET_EXPERIMENTS";
export const GET_EXPERIMENTS_SUCCESS = "GET_EXPERIMENTS_SUCCESS";
export const GET_EXPERIMENTS_ERROR = "GET_EXPERIMENTS_ERROR";
export const CREATE_EXPERIMENT = "CREATE_EXPERIMENT";
export const CREATE_EXPERIMENT_SUCCESS = "CREATE_EXPERIMENT_SUCCESS";
export const CREATE_EXPERIMENT_ERROR = "CREATE_EXPERIMENT_ERROR";

export function getExperiments(data) {
  return { type: GET_EXPERIMENTS, payload: data };
}

export function createExperiment(data) {
  return { type: CREATE_EXPERIMENT, payload: data };
}
