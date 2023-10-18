import { Module } from '@nestjs/common';
import { CloudinaryProvider } from './config/cloudinary';
import { CommonService } from './common.service';

@Module({
  providers: [CloudinaryProvider, CommonService],
  exports: [CommonService, CloudinaryProvider],
})
export class CommonModule {}
