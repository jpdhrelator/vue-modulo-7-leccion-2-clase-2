import apiBackendEducativo from "./AxioConfig";


export async function obtenerListadoItems() {    


    const resp= await apiBackendEducativo.get('/items');
  
    return resp.data;
}


export async function crearItem(item) {    

    try {
        const resp= await apiBackendEducativo.post('/items',item);
  
        return resp.data;


    } catch (error) {
        //console.log(error.message);
        //return `Error Crear Item: ${error.message}`;
        throw new Error(`Error Crear Item: ${error.message}`);
        
    }   
    
}