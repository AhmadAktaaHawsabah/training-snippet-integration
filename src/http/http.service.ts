import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom, timeout } from 'rxjs';
@Injectable()
export class HttpWrapperService {
  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  async request<T>(
    method: 'get' | 'post' | 'patch' | 'delete',
    serviceName: string,
    endpoint: string,
    data?: any,
  ) {
    const baseUrl = this.config.get<string>(serviceName);
    if (!baseUrl) throw new Error(`URL for ${serviceName} not found`);
    const response$ = this.http
      .request({ method, url: `${baseUrl}/${endpoint}`, data })
      .pipe(timeout(5000));

    const response = await firstValueFrom(response$);

    return response.data;
  }
}
