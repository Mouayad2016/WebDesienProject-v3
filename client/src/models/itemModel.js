import api from '../api';

export default class ItemModel{
    resursUrl="";
    constructor(resursUrl){
        this.resursUrl = resursUrl;
        
    }


    async getAll(){
      const result = await api.get(this.resursUrl);
            if(result.status === 200)               
            return result.data;
            else{
              console.log(result.status)
              console.log(result.data)
            }
            return [];
          }

      async getAuctionbyId(id){
            const result = await api.get(`auction/${id}`);
                  if(result.status === 200)               
                  return result.data;
                  else{
                    console.log(result.status)
                    console.log(result.data)
                  }
                  return [];
                }
          
    async getById(id,token){

            const result = await api.get(
              `${this.resursUrl}/${id}`,
              {
                headers:{"token":token}
              });
                  if(result.status === 200)               
                  return result.data;
                  else{
                    console.log(result.status)
                    console.log(result.data)
                  }
                  return [];
                }
                
  async update(id,object,token) {
    const result = await api.put(`/item/${id}/edit`, object,
      {headers:{"token":token}
    });
    if (result.status === 200) return result.data;
    else {
      console.log(result.status);
      console.log(result.data);
    }
    return {};
  }

  
  async create(resource,token) {
    const result = await api.post('/item/',resource,
    {
      headers:{"token":token}
      // {token:`Bearer ${token}`}
    }
    );
    if (result.status === 200) return result.data;
    else {
      console.log(result.status);
      console.log(result.data);
    }
    return {};
  }
  async createAuction(id,resource,token) {
    const result = await api.post(`/auction/${id}`,resource,
    {
      headers:{"token":token}
      // {token:`Bearer ${token}`}
    }
    );
   console.log(resource)
    if (result.status === 200) return result.data;
    else {
      console.log(result.status);
      console.log(result.data);
    }
    return {};
  }

  
  async GetAuction(id,resource,token) {
    const result = await api.get(`/auction/${id}`,
    {
      headers:{"token":token}
      // {token:`Bearer ${token}`}
    }
    );
   console.log(resource)
    if (result.status === 200) return result.data;
    else {
      console.log(result.status);
      console.log(result.data);
    }
    return {};
  }
  async remove(id,token) {
    const result = await api.delete(`item/delet/${id}`,
    {
      headers:{"token":token}
    } 
    );
    if (result.status === 200) return result.data;
    else {
      console.log(result.status);
      console.log(result.data);
    }
    return {};
  }
  async addBid(resource,token) {
    const result = await api.post(`/bid/`,resource,
    {
      headers:{"token":token}
    } 
    );
    if (result.status === 200) return result.data;
    else {
      console.log(result.status);
      console.log(result.data);
    }
    return {};
  }
        }
        
