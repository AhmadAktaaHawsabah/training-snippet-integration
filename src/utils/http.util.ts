import axios from 'axios';
import { SendEmailNotificationDto } from 'src/notifications/dto/emailDto';
import { SendSmsNotificationDto } from 'src/notifications/dto/smsDto';

interface dtoData {
  data : SendEmailNotificationDto | SendSmsNotificationDto;
}

export async function HttpWrapperService<T>(
  method: 'get' | 'post' | 'patch' | 'delete',
  serviceName: string,
  endpoint: string,
  data?: dtoData,

): Promise<T> {
  const baseUrl = this.config.get(serviceName);
  if (!baseUrl) throw new Error(`URL for ${serviceName} not found`);
  const response = await axios.request<T>({
    method,
    url: `${serviceName}/${endpoint}`,
    data,
  });

  return response.data;
}
