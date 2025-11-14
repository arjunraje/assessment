
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
    sku:string,
    price:number,
    currentStock: number,
    taxPercentage:number,
    createdAt: Date,
    updateAt: Date
}

