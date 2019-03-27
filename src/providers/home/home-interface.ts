//登录实体类
interface homeParams{
    depotStatus:number;
    pageIndex:number;
    pageSize:number;
}

interface returnList{
    brandId: string;
    depotId: string;
    organizationId: string;
    systemId: string;
}

export{
    homeParams,
    returnList
}
  