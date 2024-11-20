import React, { useState } from 'react'
import { useGetCloudProviderResourceTypes } from '../../../../../api/api-services/cloudProviderQuery';
import { CloudProviderCloudProviderResourceTypesList200Response } from '../../../../../api/axios-client';


const Index = () => {
    const [allServices, setAllServices] = useState<any[]>([]);
    const { data } = useGetCloudProviderResourceTypes({
        page: 1,
        pageSize: 1000,
      });

      const datastsr: CloudProviderCloudProviderResourceTypesList200Response | any =
      data;
    
  return (
    <div className="w-full px-10 mt-[32px]">
              <div className="flex items-center justify-between flex-row gap-[10px]">

              </div>
    </div>
  )
}

export default Index