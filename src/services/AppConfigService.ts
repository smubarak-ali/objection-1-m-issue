import { AppConfigRepository } from "../repositories";
import { ConfigKeyEn } from "../utils";
import { AppConfigDto } from "../objects";

export class AppConfigService {
    private readonly configRepository: AppConfigRepository;

    constructor() {
        this.configRepository = new AppConfigRepository();
    }

    public getAppDisableConfig = async () => {
        const val = await this.configRepository.getConfig(ConfigKeyEn.APP_VALIDITY);
        if (val) {
            const obj: AppConfigDto = {
                id: val.id,
                configKey: val.configKey,
                configValue: val.configValue,
            }
            return obj;
        }
        return null;
    }

    public async getAppConfigByKey(key: string) {
        const val = await this.configRepository.getConfig(key);
        if (val) {
            const obj: AppConfigDto = {
                id: val.id,
                configKey: val.configKey,
                configValue: val.configValue,
            }
            return obj;
        }
        return null;
    }
 }
