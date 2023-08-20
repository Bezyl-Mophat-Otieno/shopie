import mssql from "mssql";
interface dataInput {
    [key: string]: any;
}
declare class DB {
    static executeProcedure(procedureName: string, data?: dataInput): Promise<mssql.IProcedureResult<any>>;
}
export default DB;
