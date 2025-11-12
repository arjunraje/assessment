
export interface ProductResponse{
    
    success: boolean,
    message:string,
    data:{
        data:Product[]
    
        total: number,
        currentPage: number,
        totalPages: number
    }

}

export interface Product{
    id: string,
    name: string,
    price:number,
    stock: number,
    taxPercentage:number,
    createdAt: Date,
    updateAt: Date
}