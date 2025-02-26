import { Injectable, OnModuleInit } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import * as path from 'path';
import AdmZip = require('adm-zip'); // ✅ Fix import

@Injectable()
export class ProtoService implements OnModuleInit {
  private readonly PROTO_ZIP_URL = 'http://localhost:3100/proto/all';
  private readonly LOCAL_PROTO_PATH = path.join(__dirname, '../../protos');
  private readonly LOCAL_ZIP_PATH = path.join(__dirname, '../../proto.zip');

  async downloadAndExtractProtoFiles() {
    try {
      console.log('📥 Downloading proto.zip...');
      const response = await axios.get(this.PROTO_ZIP_URL, { responseType: 'arraybuffer' });

      fs.writeFileSync(this.LOCAL_ZIP_PATH, response.data);
      console.log('✅ Download complete.');

      if (!fs.existsSync(this.LOCAL_PROTO_PATH)) {
        fs.mkdirSync(this.LOCAL_PROTO_PATH, { recursive: true });
      }

      console.log('📂 Extracting proto files...');
      const zip = new AdmZip(this.LOCAL_ZIP_PATH); // ✅ Fix lỗi
      zip.extractAllTo(this.LOCAL_PROTO_PATH, true);
      console.log('✅ Extraction complete.');

      fs.unlinkSync(this.LOCAL_ZIP_PATH);
      console.log('🗑️ Deleted zip file.');
    } catch (error) {
      console.error('❌ Error downloading/extracting proto files:', error);
    }
  }

  async onModuleInit() {
    await this.downloadAndExtractProtoFiles();
  }
}
