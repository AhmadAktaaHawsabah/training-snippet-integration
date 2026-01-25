import { Module } from '@nestjs/common';
import { HttpWrapperService } from './http.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
@Module({
    imports: [HttpModule , ConfigModule],
    providers: [HttpWrapperService],
    exports: [HttpWrapperService]
})
export class RequestModule { }
