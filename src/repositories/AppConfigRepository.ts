import { AppConfig } from "../entities";

export class AppConfigRepository {

    public getConfig = async (key: string) => {
        try {
            const config = await AppConfig.query()
                .where("config_key", key)
                .first();
            return config;
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
}
