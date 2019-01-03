export const environment = {
  production: true,
  local: false
};

export const SERVER_HOST = environment.production == true ? window.location.origin : 'http://localhost:9000' 

