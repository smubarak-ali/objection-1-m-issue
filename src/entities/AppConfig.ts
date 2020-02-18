import { Model } from "objection";

export class AppConfig extends Model {
    public readonly id: number;
    public configKey: string;
    public configValue: string;

    public static tableName = "app_config";
}
