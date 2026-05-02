import DataValueModel from "./DataValueModel";
import PaymentModel from "./PaymentModel";
import ProjectModel from "./ProjectModel";
import SocialModel from "./SocialModel";


export interface DataModel {
    configuration: DataValueModel | null;
    payment: PaymentModel | null;
    project: ProjectModel[] | null;
    complexity: DataValueModel[] | null;
    category: DataValueModel[] | null;
    social: SocialModel[] | null;
}

export interface DataContextModel {
    data: DataModel | null;
    loading: boolean;
    error: string | null;
}